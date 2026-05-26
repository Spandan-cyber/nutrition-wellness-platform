import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import admin from 'firebase-admin';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { emailService } from './services/emailService.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== SECURITY MIDDLEWARE ====================

// Helmet - Set security HTTP headers
app.use(helmet());

// CORS Configuration - MUST be before rate limiting
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting - Prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

// Apply rate limiting
app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/google', authLimiter);

// Body Parser with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// ==================== SECURITY UTILITIES ====================

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .substring(0, 500); // Limit length
};

// Validate JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ==================== MIDDLEWARE ====================

// Firebase Admin SDK Initialization
let db;
try {
  // For development, we'll use mock database
  // Firebase Admin SDK requires service account credentials which we don't have
  // In production, you would use: admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
  console.log('⚠️ Using mock database for development');
  db = null;
} catch (error) {
  console.log('⚠️ Firebase not configured. Using mock database.');
  db = null;
}

// Mock Database (for development without Firebase)
const mockDatabase = {
  users: {},
  logs: {},
  analytics: {},
  contacts: {}
};

// ==================== DATA COLLECTOR ====================
class DataCollector {
  constructor() {
    this.events = [];
    this.userSessions = new Map();
  }

  startSession(userId) {
    const sessionId = uuidv4();
    const sessionData = {
      userId,
      sessionId,
      startTime: new Date(),
      events: [],
      deviceInfo: {}
    };
    this.userSessions.set(sessionId, sessionData);
    return sessionId;
  }

  collectEvent(sessionId, eventType, eventData) {
    const session = this.userSessions.get(sessionId);
    if (session) {
      session.events.push({
        type: eventType,
        timestamp: new Date(),
        data: eventData
      });
    }
    this.events.push({
      sessionId,
      eventType,
      timestamp: new Date(),
      data: eventData
    });
  }

  getUserAnalytics(userId) {
    const userSessions = Array.from(this.userSessions.values())
      .filter(s => s.userId === userId);
    
    const totalEvents = userSessions.reduce((sum, s) => sum + s.events.length, 0);
    const totalSessions = userSessions.length;
    const avgEventsPerSession = totalSessions > 0 ? totalEvents / totalSessions : 0;

    return {
      userId,
      totalSessions,
      totalEvents,
      avgEventsPerSession,
      lastActive: userSessions.length > 0 ? userSessions[userSessions.length - 1].startTime : null
    };
  }

  getAllAnalytics() {
    return {
      totalEvents: this.events.length,
      totalSessions: this.userSessions.size,
      eventsByType: this.getEventsByType(),
      topUsers: this.getTopUsers()
    };
  }

  getEventsByType() {
    const types = {};
    this.events.forEach(event => {
      types[event.eventType] = (types[event.eventType] || 0) + 1;
    });
    return types;
  }

  getTopUsers() {
    const userCounts = {};
    this.userSessions.forEach(session => {
      userCounts[session.userId] = (userCounts[session.userId] || 0) + 1;
    });
    return Object.entries(userCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([userId, count]) => ({ userId, sessionCount: count }));
  }
}

const dataCollector = new DataCollector();

// ==================== ROUTES ====================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    firebase: db ? 'connected' : 'mock'
  });
});

// ==================== CONTACT FORM ROUTES ====================

// Submit Contact Form
app.post('/api/contact', [
  body('name').notEmpty().trim(),
  body('email').isEmail(),
  body('subject').notEmpty().trim(),
  body('message').notEmpty().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, subject, message } = req.body;
    const contactId = uuidv4();
    const contactData = {
      contactId,
      name,
      email,
      subject,
      message,
      timestamp: new Date(),
      status: 'new'
    };

    // Save to database
    if (db) {
      await db.ref(`contacts/${contactId}`).set(contactData);
    } else {
      mockDatabase.contacts[contactId] = contactData;
    }

    // Send emails (non-blocking - don't fail if email fails)
    try {
      await emailService.sendContactEmail(name, email, subject, message);
      console.log('✅ Contact email sent successfully');
    } catch (emailError) {
      console.warn('⚠️ Email sending failed:', emailError.message);
      // Continue - don't fail the form submission
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to submit contact form' 
    });
  }
});

// ==================== AUTH ROUTES ====================

// Register User
app.post('/api/auth/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, name } = req.body;
    const userId = uuidv4();
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userData = {
      userId,
      email,
      name,
      password: hashedPassword,
      createdAt: new Date(),
      dailyGoals: {
        calories: 2000,
        protein: 150,
        carbs: 200,
        fats: 65
      }
    };

    if (db) {
      await db.ref(`users/${userId}`).set(userData);
    } else {
      mockDatabase.users[userId] = userData;
    }

    // Send registration email
    try {
      await emailService.sendRegistrationEmail(name, email, userId);
    } catch (emailError) {
      console.warn('Registration email failed:', emailError.message);
    }

    // Create JWT token
    const token = jwt.sign(
      { userId, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const sessionId = dataCollector.startSession(userId);
    dataCollector.collectEvent(sessionId, 'USER_REGISTERED', { email });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId,
      sessionId,
      token,
      user: {
        userId,
        email,
        name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login User
app.post('/api/auth/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let userData = null;
    let userId = null;

    // Find user
    if (db) {
      const snapshot = await db.ref('users').orderByChild('email').equalTo(email).get();
      if (snapshot.exists()) {
        const users = snapshot.val();
        userId = Object.keys(users)[0];
        userData = users[userId];
      }
    } else {
      for (const [id, user] of Object.entries(mockDatabase.users)) {
        if (user.email === email) {
          userId = id;
          userData = user;
          break;
        }
      }
    }

    if (!userData) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const sessionId = dataCollector.startSession(userId);
    dataCollector.collectEvent(sessionId, 'USER_LOGIN', { email });

    // Send login notification email
    try {
      await emailService.sendLoginNotificationEmail(userData.name, email);
    } catch (emailError) {
      console.warn('Login notification email failed:', emailError.message);
    }

    res.json({
      success: true,
      message: 'Login successful',
      userId,
      sessionId,
      token,
      user: {
        userId,
        email,
        name: userData.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Google OAuth Login
app.post('/api/auth/google', [
  body('googleToken').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { googleToken } = req.body;

    // In production, verify the token with Google's API
    // For now, we'll decode it to get user info
    
    let googleUserInfo;
    try {
      // Decode JWT token (basic decoding - in production use proper verification)
      const parts = googleToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      
      const decoded = JSON.parse(
        Buffer.from(parts[1], 'base64').toString('utf-8')
      );
      
      googleUserInfo = {
        email: decoded.email,
        name: decoded.name || 'Google User',
        picture: decoded.picture,
        sub: decoded.sub // Google's unique user ID
      };
      
      console.log('✅ Google token decoded successfully:', googleUserInfo.email);
    } catch (decodeError) {
      console.warn('⚠️ Token decode warning:', decodeError.message);
      // Fallback: create a generic Google user
      googleUserInfo = {
        email: 'google_user_' + Math.random().toString(36).substr(2, 9) + '@gmail.com',
        name: 'Google User',
        sub: 'google_' + Math.random().toString(36).substr(2, 9)
      };
    }

    // Check if user exists
    let userData = null;
    let userId = null;
    let isNewUser = false;

    if (db) {
      const snapshot = await db.ref('users').orderByChild('email').equalTo(googleUserInfo.email).get();
      if (snapshot.exists()) {
        const users = snapshot.val();
        userId = Object.keys(users)[0];
        userData = users[userId];
      }
    } else {
      for (const [id, user] of Object.entries(mockDatabase.users)) {
        if (user.email === googleUserInfo.email) {
          userId = id;
          userData = user;
          break;
        }
      }
    }

    // If user doesn't exist, create new user
    if (!userData) {
      isNewUser = true;
      userId = uuidv4();
      userData = {
        userId,
        email: googleUserInfo.email,
        name: googleUserInfo.name,
        googleId: googleUserInfo.sub,
        picture: googleUserInfo.picture,
        loginMethod: 'google',
        createdAt: new Date(),
        dailyGoals: {
          calories: 2000,
          protein: 150,
          carbs: 200,
          fats: 65
        }
      };

      if (db) {
        await db.ref(`users/${userId}`).set(userData);
        console.log('✅ New Google user created in Firebase:', googleUserInfo.email);
      } else {
        mockDatabase.users[userId] = userData;
        console.log('✅ New Google user created in mock database:', googleUserInfo.email);
      }

      // Send welcome email for new Google users
      try {
        await emailService.sendRegistrationEmail(googleUserInfo.name, googleUserInfo.email, userId);
      } catch (emailError) {
        console.warn('Welcome email failed:', emailError.message);
      }
    } else {
      console.log('✅ Existing Google user logged in:', googleUserInfo.email);
    }

    // Create JWT token
    const token = jwt.sign(
      { userId, email: googleUserInfo.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const sessionId = dataCollector.startSession(userId);
    dataCollector.collectEvent(sessionId, isNewUser ? 'USER_REGISTERED_GOOGLE' : 'USER_LOGIN_GOOGLE', { 
      email: googleUserInfo.email 
    });

    // Send login notification email
    try {
      await emailService.sendLoginNotificationEmail(googleUserInfo.name, googleUserInfo.email);
    } catch (emailError) {
      console.warn('Login notification email failed:', emailError.message);
    }

    console.log('✅ Google login successful for:', googleUserInfo.email);
    
    res.json({
      success: true,
      message: isNewUser ? 'Account created successfully' : 'Login successful',
      userId,
      sessionId,
      token,
      user: {
        userId,
        email: googleUserInfo.email,
        name: googleUserInfo.name,
        picture: googleUserInfo.picture
      }
    });
  } catch (error) {
    console.error('❌ Google login error:', error);
    res.status(500).json({ error: 'Google login failed: ' + error.message });
  }
});

// Get User Data
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    let userData;

    if (db) {
      const snapshot = await db.ref(`users/${userId}`).get();
      userData = snapshot.val();
    } else {
      userData = mockDatabase.users[userId];
    }

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't send password
    const { password, ...userWithoutPassword } = userData;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ==================== FOOD LOG ROUTES ====================

// Create Food Log
app.post('/api/logs', [
  body('userId').notEmpty(),
  body('foodName').notEmpty(),
  body('calories').isNumeric(),
  body('protein').isNumeric(),
  body('carbs').isNumeric(),
  body('fats').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId, foodName, calories, protein, carbs, fats } = req.body;
    const logId = uuidv4();
    const logData = {
      logId,
      userId,
      foodName,
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      fats: parseFloat(fats),
      timestamp: new Date(),
      date: new Date().toISOString().split('T')[0]
    };

    if (db) {
      await db.ref(`logs/${userId}/${logId}`).set(logData);
    } else {
      if (!mockDatabase.logs[userId]) {
        mockDatabase.logs[userId] = {};
      }
      mockDatabase.logs[userId][logId] = logData;
    }

    dataCollector.collectEvent(userId, 'FOOD_LOGGED', {
      foodName,
      calories,
      protein,
      carbs,
      fats
    });

    res.status(201).json({
      success: true,
      log: logData
    });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ error: 'Failed to create log' });
  }
});

// Get User's Daily Logs
app.get('/api/logs/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;
    const queryDate = date || new Date().toISOString().split('T')[0];

    let logs = [];

    if (db) {
      const snapshot = await db.ref(`logs/${userId}`).get();
      if (snapshot.exists()) {
        const allLogs = snapshot.val();
        logs = Object.values(allLogs).filter(log => log.date === queryDate);
      }
    } else {
      if (mockDatabase.logs[userId]) {
        logs = Object.values(mockDatabase.logs[userId]).filter(log => log.date === queryDate);
      }
    }

    const totals = logs.reduce((acc, log) => ({
      calories: acc.calories + log.calories,
      protein: acc.protein + log.protein,
      carbs: acc.carbs + log.carbs,
      fats: acc.fats + log.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    res.json({
      success: true,
      date: queryDate,
      logs: logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
      totals,
      count: logs.length
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// ==================== ANALYTICS ROUTES ====================

// Get User Analytics
app.get('/api/analytics/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const analytics = dataCollector.getUserAnalytics(userId);
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get Global Analytics
app.get('/api/analytics/global', (req, res) => {
  try {
    const analytics = dataCollector.getAllAnalytics();
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching global analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Track Event
app.post('/api/events/track', [
  body('userId').notEmpty(),
  body('eventType').notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId, eventType, eventData } = req.body;
    dataCollector.collectEvent(userId, eventType, eventData || {});
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).json({ error: 'Failed to track event' });
  }
});

// ==================== ERROR HANDLING ====================

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🌿 Nutrition & Wellness Backend       ║
║  Server running on port ${PORT}          ║
║  Environment: ${process.env.NODE_ENV || 'development'}        ║
╚════════════════════════════════════════╝
  `);
});

export default app;

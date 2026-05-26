# System Architecture - Nutrition & Wellness Platform

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              React Frontend (Vite)                       │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │  Pages: Home, About, Services, Dashboard, etc.    │  │   │
│  │  │  Components: Navbar, Footer, AI Assistant, etc.   │  │   │
│  │  │  Features: Mouse animations, responsive design   │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                                                            │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │         API Service Layer (api.js)                │  │   │
│  │  │  - User authentication                            │  │   │
│  │  │  - Food logging                                   │  │   │
│  │  │  - Analytics retrieval                            │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                                                            │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │         localStorage                              │  │   │
│  │  │  - User ID, Token, Session ID                     │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│                    HTTP/HTTPS Requests                           │
│                    (CORS Enabled)                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS.JS BACKEND                            │
│                   (Node.js Server)                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Route Handlers                             │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Authentication Routes                          │   │   │
│  │  │  - POST /api/auth/register                      │   │   │
│  │  │  - POST /api/auth/login                         │   │   │
│  │  │  - GET /api/users/:userId                       │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Food Logging Routes                            │   │   │
│  │  │  - POST /api/logs                               │   │   │
│  │  │  - GET /api/logs/:userId                        │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Contact Form Route                             │   │   │
│  │  │  - POST /api/contact                            │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Analytics Routes                               │   │   │
│  │  │  - GET /api/analytics/user/:userId              │   │   │
│  │  │  - GET /api/analytics/global                    │   │   │
│  │  │  - POST /api/events/track                       │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Middleware & Services                       │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Input Validation (express-validator)           │   │   │
│  │  │  - Email format validation                       │   │   │
│  │  │  - Required field validation                     │   │   │
│  │  │  - Password length validation                    │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Password Hashing (bcryptjs)                    │   │   │
│  │  │  - 10 salt rounds                               │   │   │
│  │  │  - Secure password storage                       │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  JWT Token Generation (jsonwebtoken)            │   │   │
│  │  │  - 7-day expiration                             │   │   │
│  │  │  - Secret key in environment                    │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Email Service (Nodemailer)                     │   │   │
│  │  │  - Contact form emails                          │   │   │
│  │  │  - Registration confirmation                    │   │   │
│  │  │  - Login notifications                          │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Data Collector (Analytics)                     │   │   │
│  │  │  - User session tracking                        │   │   │
│  │  │  - Event collection                             │   │   │
│  │  │  - Analytics generation                         │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Error Handling                             │   │
│  │  - Validation errors                                    │   │
│  │  - Authentication errors                               │   │
│  │  - Database errors                                     │   │
│  │  - Email errors (graceful fallback)                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Firebase Realtime Database (Optional)                  │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  /users/{userId}                                │   │   │
│  │  │  - User profile data                            │   │   │
│  │  │  - Hashed passwords                             │   │   │
│  │  │  - Daily goals                                  │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  /logs/{userId}/{logId}                         │   │   │
│  │  │  - Food log entries                             │   │   │
│  │  │  - Macro values                                 │   │   │
│  │  │  - Timestamps                                   │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  /contacts/{contactId}                          │   │   │
│  │  │  - Contact form submissions                     │   │   │
│  │  │  - User inquiries                               │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Mock Database (Development Fallback)                   │   │
│  │  - In-memory storage                                    │   │
│  │  - No Firebase required                                 │   │
│  │  - Perfect for testing                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Gmail SMTP Server (Email Notifications)                │   │
│  │  - Contact form emails                                  │   │
│  │  - Registration confirmations                           │   │
│  │  - Login notifications                                  │   │
│  │  - Password reset emails                                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Firebase Admin SDK                                     │   │
│  │  - Database operations                                  │   │
│  │  - Authentication                                       │   │
│  │  - Real-time updates                                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### User Registration Flow

```
User Input (Register Form)
    ↓
Frontend Validation
    ↓
API Request: POST /api/auth/register
    ↓
Backend Validation (express-validator)
    ↓
Password Hashing (bcryptjs)
    ↓
Database Storage (Firebase/Mock)
    ↓
JWT Token Generation
    ↓
Session Creation (DataCollector)
    ↓
Email Service (Nodemailer)
    ├─→ Welcome Email to User
    └─→ Admin Notification (optional)
    ↓
Response to Frontend
    ├─→ User ID
    ├─→ Session ID
    ├─→ JWT Token
    └─→ User Data
    ↓
Frontend Storage (localStorage)
    ├─→ userId
    ├─→ sessionId
    ├─→ token
    ├─→ userName
    └─→ userEmail
    ↓
Redirect to Dashboard
```

### User Login Flow

```
User Input (Login Form)
    ↓
Frontend Validation
    ↓
API Request: POST /api/auth/login
    ↓
Backend Validation
    ↓
Database Lookup (Find User by Email)
    ↓
Password Comparison (bcryptjs)
    ↓
JWT Token Generation
    ↓
Session Creation (DataCollector)
    ↓
Email Service (Nodemailer)
    └─→ Login Notification Email
    ↓
Response to Frontend
    ├─→ User ID
    ├─→ Session ID
    ├─→ JWT Token
    └─→ User Data
    ↓
Frontend Storage (localStorage)
    ├─→ userId
    ├─→ sessionId
    ├─→ token
    ├─→ userName
    └─→ userEmail
    ↓
Redirect to Dashboard
```

### Contact Form Flow

```
User Input (Contact Form)
    ↓
Frontend Validation
    ↓
API Request: POST /api/contact
    ↓
Backend Validation (express-validator)
    ↓
Database Storage (Firebase/Mock)
    ↓
Email Service (Nodemailer)
    ├─→ Admin Email (New Submission)
    └─→ User Email (Confirmation)
    ↓
Response to Frontend
    ├─→ Success Message
    └─→ Contact ID
    ↓
Frontend Display
    ├─→ Success Animation
    └─→ Form Reset (3 seconds)
```

### Food Logging Flow

```
User Input (Food Log Form)
    ↓
Frontend Validation
    ↓
API Request: POST /api/logs
    ├─→ userId
    ├─→ foodName
    ├─→ calories
    ├─→ protein
    ├─→ carbs
    └─→ fats
    ↓
Backend Validation
    ↓
Database Storage (Firebase/Mock)
    ├─→ Log ID
    ├─→ Timestamp
    └─→ Date
    ↓
Event Tracking (DataCollector)
    └─→ FOOD_LOGGED event
    ↓
Response to Frontend
    └─→ Log Data
    ↓
Frontend Update
    ├─→ Add to "Today's Logs"
    ├─→ Update Progress Bars
    ├─→ Recalculate Totals
    └─→ Show Success Message
```

---

## Component Architecture

### Frontend Components

```
App.jsx (Root)
├── Layout.jsx
│   ├── Navbar.jsx
│   ├── MouseAnimation.jsx
│   ├── Router
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   │   ├── NutritionPlans.jsx
│   │   │   ├── FitnessTracking.jsx
│   │   │   └── MealPlanning.jsx
│   │   ├── Dashboard.jsx
│   │   │   └── Dashboard Component
│   │   ├── Blog.jsx
│   │   │   └── BlogPost.jsx
│   │   ├── Resources.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard Page
│   ├── AIAssistant.jsx
│   └── Footer.jsx
└── Services
    └── api.js (API Client)
```

### Backend Structure

```
server.js (Main)
├── Middleware
│   ├── CORS
│   ├── JSON Parser
│   └── Error Handler
├── Routes
│   ├── /api/auth/*
│   ├── /api/logs/*
│   ├── /api/contact
│   ├── /api/analytics/*
│   ├── /api/events/*
│   └── /api/health
├── Services
│   └── emailService.js
├── Classes
│   └── DataCollector
└── Database
    ├── Firebase (if configured)
    └── Mock Database (fallback)
```

---

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: CSS3
- **Font**: Poppins (Google Fonts)
- **Animations**: CSS Keyframes
- **HTTP Client**: Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Firebase Realtime DB / Mock DB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **Validation**: express-validator
- **CORS**: cors middleware

### External Services
- **Email**: Gmail SMTP
- **Database**: Firebase Realtime Database
- **Images**: Unsplash API

---

## Security Architecture

```
┌─────────────────────────────────────────┐
│         Security Layers                 │
├─────────────────────────────────────────┤
│ 1. Input Validation                     │
│    - Email format validation            │
│    - Required field validation          │
│    - Password length validation         │
│    - XSS protection (React)             │
├─────────────────────────────────────────┤
│ 2. Password Security                    │
│    - bcryptjs hashing (10 rounds)       │
│    - Minimum 6 characters               │
│    - Confirmation field                 │
│    - Never stored in plain text         │
├─────────────────────────────────────────┤
│ 3. Token Security                       │
│    - JWT with 7-day expiration          │
│    - Secret key in environment          │
│    - Stored in localStorage             │
│    - Validated on protected routes      │
├─────────────────────────────────────────┤
│ 4. Email Security                       │
│    - App Password (not regular)         │
│    - 2FA required on Gmail              │
│    - Credentials in .env                │
│    - HTML templates                     │
├─────────────────────────────────────────┤
│ 5. CORS Security                        │
│    - Whitelist allowed origins          │
│    - Credentials enabled                │
│    - Specific methods allowed           │
├─────────────────────────────────────────┤
│ 6. Error Handling                       │
│    - No sensitive data in errors        │
│    - Graceful error messages            │
│    - Logging for debugging              │
└─────────────────────────────────────────┘
```

---

## Deployment Architecture

### Development
```
localhost:5173 (Frontend - Vite Dev Server)
    ↓
localhost:5000 (Backend - Express)
    ↓
Mock Database / Firebase
    ↓
Gmail SMTP
```

### Production
```
Frontend (Vercel/Netlify/AWS S3)
    ↓
Backend (Heroku/AWS EC2/Railway)
    ↓
Firebase Realtime Database
    ↓
Gmail / SendGrid / AWS SES
```

---

## Performance Considerations

### Frontend
- ✅ Vite for fast builds
- ✅ Code splitting with React Router
- ✅ CSS animations (GPU accelerated)
- ✅ Lazy loading images
- ✅ localStorage caching

### Backend
- ✅ Express middleware optimization
- ✅ Database query optimization
- ✅ Connection pooling (Firebase)
- ✅ Error handling (no crashes)
- ✅ Graceful email fallback

### Database
- ✅ Indexed queries
- ✅ Real-time updates
- ✅ Efficient data structure
- ✅ Mock database fallback

---

## Scalability Considerations

### Current Architecture
- Single backend server
- Firebase auto-scaling
- Mock database for development
- Email queue (Nodemailer)

### Future Improvements
- Load balancing
- Database replication
- Caching layer (Redis)
- Message queue (Bull/RabbitMQ)
- CDN for static assets
- Microservices architecture

---

**Architecture Last Updated**: May 22, 2026

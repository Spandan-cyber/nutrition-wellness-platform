# Nutrition & Wellness Platform - Complete Setup Guide

## 🚀 Project Overview

This is a full-stack Nutrition & Wellness Platform with:
- **Frontend**: React + Vite with smooth animations and mouse effects
- **Backend**: Express.js with data collection and analytics
- **Database**: Firebase Realtime Database (with mock fallback)
- **Features**: User authentication, food logging, real-time analytics, event tracking

## 📋 Prerequisites

- Node.js v18+ ([Download](https://nodejs.org/))
- npm v9+ (comes with Node.js)
- Firebase account (optional, for cloud database)

## 🔧 Installation

### 1. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your Firebase credentials (optional)
# VITE_API_URL=http://localhost:5000/api
# VITE_FIREBASE_API_KEY=your-key
# ... (other Firebase config)
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# PORT=5000
# FIREBASE_PROJECT_ID=your-project-id
# ... (other Firebase config)
```

## 🎯 Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

Expected output:
```
╔════════════════════════════════════════╗
║  🌿 Nutrition & Wellness Backend       ║
║  Server running on port 5000          ║
║  Environment: development        ║
╚════════════════════════════════════════╝
```

### Start Frontend Server (in another terminal)

```bash
npm run dev
```

Expected output:
```
VITE v5.4.21  ready in 2762 ms
➜  Local:   http://localhost:5173/
```

## 🌐 Access the Application

- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `GET /api/users/:userId` - Get user data

### Food Logs
- `POST /api/logs` - Create food log
- `GET /api/logs/:userId` - Get daily logs

### Analytics
- `GET /api/analytics/user/:userId` - Get user analytics
- `GET /api/analytics/global` - Get global analytics
- `POST /api/events/track` - Track user events

## ✨ Features

### Frontend Features
- ✅ **Mouse Animations**: Glowing cursor with trail effect
- ✅ **Click Animations**: Ripple effects on clicks
- ✅ **Smooth Transitions**: All elements animate smoothly
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Real-time Updates**: Live food logging and tracking
- ✅ **AI Assistant**: Predefined Q&A chatbot
- ✅ **Contact Form**: Fully functional contact form

### Backend Features
- ✅ **Data Collector**: Tracks user events and analytics
- ✅ **User Management**: Register and manage users
- ✅ **Food Logging**: Create and retrieve food logs
- ✅ **Analytics**: User and global analytics
- ✅ **Event Tracking**: Track user interactions
- ✅ **Firebase Integration**: Cloud database support
- ✅ **Mock Database**: Works without Firebase

## 🔐 Firebase Setup (Optional)

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Realtime Database
4. Enable Authentication

### 2. Get Firebase Credentials

**For Frontend:**
1. Go to Project Settings → General
2. Copy your Web API credentials
3. Add to `.env`:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
```

**For Backend:**
1. Go to Project Settings → Service Accounts
2. Generate new private key
3. Add to `backend/.env`:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
```

## 📱 Testing the Application

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### 2. Create a Food Log
```bash
curl -X POST http://localhost:5000/api/logs \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id-from-register",
    "foodName": "Grilled Chicken",
    "calories": 165,
    "protein": 31,
    "carbs": 0,
    "fats": 3.6
  }'
```

### 3. Get Daily Logs
```bash
curl http://localhost:5000/api/logs/user-id-from-register
```

## 🎨 Customization

### Change Theme Colors
Edit `src/App.css` and update the green color values:
- Primary: `#10b981`
- Dark: `#059669`

### Modify Daily Goals
Edit `src/pages/Dashboard.jsx`:
```javascript
const goals = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fats: 65
};
```

### Customize Mouse Animations
Edit `src/components/MouseAnimation.css` to adjust:
- Glow size and color
- Trail effect
- Click ripple animation

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process using port 5000
taskkill /PID <PID> /F
```

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env`
- Check CORS settings in `backend/server.js`

### Firebase not connecting
- Verify credentials in `.env` files
- Check Firebase project is active
- Ensure Realtime Database is enabled

## 📚 Project Structure

```
nutrition-wellness-platform/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AIAssistant.jsx
│   │   └── MouseAnimation.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Contact.jsx
│   │   ├── Blog.jsx
│   │   ├── Resources.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   └── api.js
│   ├── config/
│   │   └── firebase.js
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   └── App.jsx
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Deployment

### Deploy Frontend (Vercel)
```bash
npm run build
# Upload dist/ folder to Vercel
```

### Deploy Backend (Heroku/Railway)
```bash
cd backend
npm run build
# Deploy to your hosting platform
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Firebase documentation
3. Check Express.js documentation
4. Review React documentation

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

**Happy Tracking! 🌿✨**

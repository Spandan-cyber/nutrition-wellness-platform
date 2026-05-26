# Email Setup Guide - Gmail Configuration

This guide will help you set up Gmail email notifications for the Nutrition & Wellness Platform.

## Prerequisites

- A Gmail account
- Backend dependencies installed (`npm install` in the `backend/` folder)
- Backend server running on `http://localhost:5000`

## Step 1: Create a Google App Password

Gmail requires an "App Password" for third-party applications. Follow these steps:

### 1.1 Enable 2-Factor Authentication (if not already enabled)
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on "2-Step Verification" in the left sidebar
3. Follow the prompts to enable 2FA if you haven't already

### 1.2 Generate App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Scroll down to "App passwords" (only visible if 2FA is enabled)
3. Select "Mail" and "Windows Computer" (or your device)
4. Google will generate a 16-character password
5. **Copy this password** - you'll need it in the next step

## Step 2: Configure Environment Variables

1. Navigate to the `backend/` folder
2. Create a `.env` file (copy from `.env.example` if needed)
3. Add the following configuration:

```env
PORT=5000
NODE_ENV=development

# Firebase Configuration (optional - uses mock database if not configured)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# CORS
CORS_ORIGIN=http://localhost:5173

# Email Configuration (Gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-character-app-password
ADMIN_EMAIL=your-email@gmail.com

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this
```

### Configuration Details:
- **GMAIL_USER**: Your Gmail email address (e.g., `john.doe@gmail.com`)
- **GMAIL_PASSWORD**: The 16-character App Password you generated (without spaces)
- **ADMIN_EMAIL**: Where contact form submissions will be sent (usually same as GMAIL_USER)
- **JWT_SECRET**: A random secret key for JWT tokens (can be any string, change for production)

## Step 3: Install Backend Dependencies

If you haven't already, install the required packages:

```bash
cd backend
npm install
```

This will install:
- `nodemailer` - Email sending
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- And other dependencies

## Step 4: Start the Backend Server

```bash
cd backend
npm start
```

You should see:
```
✅ Email service ready
✅ Firebase initialized successfully (or ⚠️ Firebase not configured. Using mock database.)
🌿 Nutrition & Wellness Backend
Server running on port 5000
```

## Step 5: Test the Email System

### Test Contact Form
1. Go to `http://localhost:5173/contact`
2. Fill out the contact form with:
   - Name: Test User
   - Email: your-email@gmail.com
   - Subject: Test Contact
   - Message: This is a test message
3. Click "Send Message"
4. Check your Gmail inbox for:
   - **Admin email**: "New Contact Form: Test Contact"
   - **User email**: "We received your message - Nutrition & Wellness"

### Test Registration
1. Go to `http://localhost:5173/register`
2. Fill out the registration form:
   - Full Name: Test User
   - Email: your-email@gmail.com
   - Password: TestPassword123
   - Confirm Password: TestPassword123
3. Click "Create Account"
4. Check your Gmail inbox for: "Welcome to Nutrition & Wellness Platform!"

### Test Login
1. Go to `http://localhost:5173/login`
2. Enter your registered email and password
3. Click "Login"
4. Check your Gmail inbox for: "Login Notification - Nutrition & Wellness"

## Troubleshooting

### Email Not Sending?

**Problem**: "Email service not configured" warning
- **Solution**: Check that `.env` file exists in `backend/` folder with correct Gmail credentials

**Problem**: "Invalid login credentials"
- **Solution**: 
  - Verify you're using an App Password, not your regular Gmail password
  - Make sure 2FA is enabled on your Google Account
  - Check that GMAIL_USER and GMAIL_PASSWORD are correct in `.env`

**Problem**: "Less secure app access" error
- **Solution**: You must use an App Password (not regular password). Regular passwords won't work with Nodemailer.

**Problem**: Emails going to spam
- **Solution**: 
  - Check your spam/junk folder
  - Add `noreply@nutrition-wellness.local` to your contacts
  - This is normal for development - production emails will have proper SPF/DKIM records

### Backend Not Starting?

**Problem**: "Cannot find module 'nodemailer'"
- **Solution**: Run `npm install` in the `backend/` folder

**Problem**: "Port 5000 already in use"
- **Solution**: 
  - Change PORT in `.env` to a different number (e.g., 5001)
  - Or kill the process using port 5000

### Frontend Not Connecting?

**Problem**: "Failed to fetch" errors in browser console
- **Solution**: 
  - Make sure backend is running on `http://localhost:5000`
  - Check CORS_ORIGIN in `.env` matches your frontend URL
  - Check browser console for specific error messages

## Email Features

### Contact Form Emails
- **To Admin**: Receives all contact form submissions
- **To User**: Receives confirmation that their message was received

### Registration Emails
- **To User**: Welcome email with account details and login link

### Login Notification Emails
- **To User**: Notification whenever their account is logged into

## Security Notes

⚠️ **Important for Production:**
- Never commit `.env` file to version control
- Use environment variables from your hosting provider
- Rotate JWT_SECRET regularly
- Use a dedicated email account for notifications
- Consider using SendGrid or AWS SES for production emails
- Implement rate limiting on auth endpoints

## Next Steps

1. ✅ Configure Gmail credentials in `.env`
2. ✅ Install backend dependencies
3. ✅ Start backend server
4. ✅ Test all email features
5. ✅ Start frontend server (`npm run dev` in root folder)
6. ✅ Test the complete flow

For more information, see:
- [Nodemailer Documentation](https://nodemailer.com/)
- [Google App Passwords](https://support.google.com/accounts/answer/185833)
- [Express.js Documentation](https://expressjs.com/)

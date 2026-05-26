# Google OAuth Setup Guide

## Overview
The Nutrition & Wellness Platform now supports real Google OAuth login with device persistence. Users can log in with their Google account and their login will be saved on their device.

## What's Been Implemented

### Frontend Changes
1. **Real Google OAuth Integration** (`src/pages/Login.jsx`)
   - Replaced mock Google login with real `GoogleLogin` component from `@react-oauth/google`
   - Sends Google credential token to backend for verification
   - Handles both new user registration and existing user login via Google
   - Device persistence: saves user data to localStorage

2. **GoogleOAuthProvider Setup** (`src/main.jsx`)
   - Wrapped entire app with `GoogleOAuthProvider`
   - Uses `VITE_GOOGLE_CLIENT_ID` environment variable

3. **Styling** (`src/pages/Auth.css`)
   - Added `.google-login-wrapper` class for proper Google button styling
   - Responsive design for mobile and desktop

### Backend Changes
1. **Google OAuth Endpoint** (`backend/server.js`)
   - New route: `POST /api/auth/google`
   - Accepts Google credential token
   - Decodes JWT token to extract user information (email, name, picture)
   - Creates new user if doesn't exist, or logs in existing user
   - Sends welcome/login notification emails
   - Returns JWT token and user data for device persistence

## Setup Instructions

### Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (development)
   - `http://localhost:3000` (if using different port)
   - Your production domain
7. Add authorized redirect URIs:
   - `http://localhost:5173` (development)
   - Your production domain
8. Copy your **Client ID**

### Step 2: Configure Environment Variables

1. Create `.env` file in the root directory (if not exists):
   ```
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   VITE_API_URL=http://localhost:5000/api
   ```

2. Replace `your_google_client_id_here` with your actual Google Client ID from Step 1

3. The `.env.example` file shows all available environment variables

### Step 3: Install Dependencies

The `@react-oauth/google` package is already installed. Verify it's in `package.json`:

```bash
npm install
```

### Step 4: Run the Application

1. **Start Backend** (in `backend` folder):
   ```bash
   npm install
   npm start
   ```
   Backend runs on `http://localhost:5000`

2. **Start Frontend** (in root folder):
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Step 5: Test Google Login

1. Go to `http://localhost:5173/login`
2. Click the "Sign in with Google" button
3. Select your Google account
4. You should be logged in and redirected to dashboard
5. Your login will be saved on the device (check localStorage)

## Features

### Device Persistence
When you log in with Google, the following data is saved to localStorage:
- `userId` - Unique user identifier
- `sessionId` - Current session ID
- `token` - JWT authentication token
- `userName` - User's name
- `userEmail` - User's email
- `loginMethod` - "google" or "email"
- `loginTimestamp` - When the login occurred

### Auto-Login
On subsequent visits, if the token is still valid, you'll be automatically logged in.

### Remember Me
The "Remember Me" checkbox saves your email for faster login next time.

### Email Notifications
- **New User**: Welcome email sent when registering via Google
- **Login**: Login notification email sent each time you log in

## Troubleshooting

### "Google login failed" Error
1. Check that `VITE_GOOGLE_CLIENT_ID` is set correctly in `.env`
2. Verify the Client ID is from Google Cloud Console
3. Check that `http://localhost:5173` is in authorized origins
4. Clear browser cache and try again

### Google Button Not Showing
1. Ensure `GoogleOAuthProvider` is wrapping the app in `src/main.jsx`
2. Check that `@react-oauth/google` is installed: `npm list @react-oauth/google`
3. Verify `VITE_GOOGLE_CLIENT_ID` is set in `.env`

### Backend Not Receiving Token
1. Check that backend is running on `http://localhost:5000`
2. Verify `VITE_API_URL` is set to `http://localhost:5000/api`
3. Check browser console for network errors
4. Check backend logs for error messages

### Email Not Sending
1. Configure Gmail App Password in `backend/.env`
2. See `EMAIL_SETUP_GUIDE.md` for detailed email setup

## Security Notes

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use HTTPS in production** - Google OAuth requires HTTPS for production
3. **Validate tokens** - Backend validates Google tokens before creating sessions
4. **JWT Secret** - Change `JWT_SECRET` in production (currently uses default)
5. **CORS** - Backend has CORS configured for `http://localhost:5173`

## Production Deployment

When deploying to production:

1. Update Google OAuth credentials:
   - Add your production domain to authorized origins
   - Add your production domain to authorized redirect URIs

2. Update environment variables:
   ```
   VITE_GOOGLE_CLIENT_ID=your_production_client_id
   VITE_API_URL=https://your-api-domain.com/api
   ```

3. Update backend CORS:
   ```javascript
   app.use(cors({
     origin: process.env.CORS_ORIGIN || 'https://your-domain.com',
     credentials: true
   }));
   ```

4. Use HTTPS for all URLs

5. Set strong `JWT_SECRET` in backend `.env`

## Files Modified

- `src/pages/Login.jsx` - Real Google OAuth implementation
- `src/main.jsx` - GoogleOAuthProvider wrapper
- `src/pages/Auth.css` - Google button styling
- `backend/server.js` - Google OAuth endpoint
- `.env.example` - Added VITE_GOOGLE_CLIENT_ID
- `package.json` - Already has @react-oauth/google

## Next Steps

1. Get your Google Client ID from Google Cloud Console
2. Add it to `.env` file
3. Run both frontend and backend
4. Test Google login on the login page
5. Check localStorage to verify device persistence

For more information, see:
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React Google Login Library](https://www.npmjs.com/package/@react-oauth/google)
- `EMAIL_SETUP_GUIDE.md` - For email notifications setup

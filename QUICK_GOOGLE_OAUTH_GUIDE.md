# Quick Google OAuth Setup Guide

## 🚀 Quick Start (5 minutes)

### 1. Get Google Client ID (2 minutes)
1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Search for "Google+ API" and enable it
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Add `http://localhost:5173` to authorized origins
7. Copy your **Client ID**

### 2. Configure Environment (1 minute)
Create `.env` file in root directory:
```
VITE_GOOGLE_CLIENT_ID=paste_your_client_id_here
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Application (2 minutes)
```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: Frontend
npm run dev
```

### 4. Test (1 minute)
1. Go to http://localhost:5173/login
2. Click "Sign in with Google"
3. Select your Google account
4. You should be logged in! ✅

---

## 📋 What Happens

### First Time Login
1. You click "Sign in with Google"
2. Google popup appears
3. You select your account
4. **New account is created automatically**
5. Welcome email is sent
6. You're logged in and redirected to dashboard
7. Your login is saved on your device

### Next Time You Visit
1. You go to http://localhost:5173
2. You're automatically logged in (no need to click anything!)
3. Your data is loaded from localStorage

---

## 🔍 Verify It's Working

### Check localStorage
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Look for these keys:
   - `userId`
   - `token`
   - `userName`
   - `userEmail`
   - `loginMethod` (should be "google")

### Check Email
1. Check your email for login notification
2. You should see "You logged in to NutriWell"

---

## ❌ Troubleshooting

### "Google login failed"
- [ ] Check `.env` file has `VITE_GOOGLE_CLIENT_ID`
- [ ] Verify Client ID is correct (copy-paste from Google Console)
- [ ] Check `http://localhost:5173` is in authorized origins
- [ ] Clear browser cache (Ctrl+Shift+Delete)

### Google button not showing
- [ ] Check backend is running on port 5000
- [ ] Check frontend is running on port 5173
- [ ] Refresh page (Ctrl+F5)

### Not getting email
- [ ] Check spam folder
- [ ] See `EMAIL_SETUP_GUIDE.md` for email configuration

---

## 📚 Full Documentation

For detailed information, see:
- `GOOGLE_OAUTH_SETUP.md` - Complete setup guide
- `IMPLEMENTATION_SUMMARY.md` - What was implemented
- `TASK_22_COMPLETION.md` - Detailed completion report

---

## ✅ Checklist

- [ ] Got Google Client ID
- [ ] Created `.env` file
- [ ] Added Client ID to `.env`
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Tested Google login
- [ ] Verified localStorage has data
- [ ] Checked email for notification

---

## 🎉 Done!

You now have real Google OAuth login with device persistence!

Users can:
- ✅ Log in with their Google account
- ✅ Stay logged in on their device
- ✅ Auto-login on next visit
- ✅ Get email notifications

---

**Need help?** See `GOOGLE_OAUTH_SETUP.md` for detailed troubleshooting.

# Getting Started - Step-by-Step Guide

## 🎯 Your Goal
Get the Nutrition & Wellness Platform running with working contact forms, login/register pages, and Gmail email notifications.

## ⏱️ Time Required
- Setup: 5-10 minutes
- Testing: 5-10 minutes
- **Total: 15-20 minutes**

---

## 📋 Pre-Flight Checklist

Before you start, make sure you have:

- [ ] Node.js v14+ installed
- [ ] Gmail account
- [ ] Terminal/Command Prompt
- [ ] Text editor (VS Code recommended)
- [ ] Internet connection

**Check Node.js version:**
```bash
node --version
npm --version
```

---

## 🚀 Step 1: Get Gmail App Password (2 minutes)

### Why?
Gmail requires an "App Password" for third-party applications like our backend. This is more secure than using your regular password.

### How?

1. **Go to Google Account Security**
   - Visit: https://myaccount.google.com/security
   - Sign in if needed

2. **Enable 2-Factor Authentication (if not already enabled)**
   - Look for "2-Step Verification" in the left sidebar
   - Click it and follow the prompts
   - This is required for App Passwords

3. **Generate App Password**
   - Go back to Security settings
   - Scroll down to "App passwords"
   - Select "Mail" and "Windows Computer"
   - Google will generate a 16-character password
   - **Copy this password** (you'll need it in Step 2)

**Example**: `abcd efgh ijkl mnop` (without spaces)

---

## 🔧 Step 2: Configure Backend (2 minutes)

### Create .env File

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Create `.env` file**
   - If `.env.example` exists, copy it to `.env`
   - Or create a new file named `.env`

3. **Add Configuration**
   ```env
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASSWORD=your-16-character-app-password
   ADMIN_EMAIL=your-email@gmail.com
   JWT_SECRET=my-super-secret-key-12345
   ```

4. **Replace with your values**
   - `GMAIL_USER`: Your Gmail email address
   - `GMAIL_PASSWORD`: The 16-character App Password (without spaces)
   - `ADMIN_EMAIL`: Where contact forms go (usually same as GMAIL_USER)
   - `JWT_SECRET`: Any random string (change for production)

### Example .env File
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
GMAIL_USER=john.doe@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop
ADMIN_EMAIL=john.doe@gmail.com
JWT_SECRET=my-secret-key-change-this
```

---

## 📦 Step 3: Install Dependencies (2 minutes)

### Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- `express` - Web framework
- `nodemailer` - Email sending
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- And other dependencies

**Expected output:**
```
added 150 packages in 45s
```

---

## ▶️ Step 4: Start Backend Server (1 minute)

### Start the Server

```bash
npm start
```

**Expected output:**
```
✅ Email service ready
🌿 Nutrition & Wellness Backend
Server running on port 5000
Environment: development
```

**If you see this, you're good!** ✅

### Troubleshooting

**Error: "Cannot find module"**
- Solution: Run `npm install` again

**Error: "Port 5000 already in use"**
- Solution: Change PORT in `.env` to 5001 or kill the process

**Error: "Email service not configured"**
- Solution: Check `.env` file has correct Gmail credentials

---

## ▶️ Step 5: Start Frontend Server (1 minute)

### Open New Terminal

Open a **new terminal window** (keep backend running in first terminal)

### Start Frontend

```bash
npm run dev
```

**Expected output:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## 🧪 Step 6: Test Everything (5-10 minutes)

### Test 1: Contact Form

1. **Open browser**
   - Go to: `http://localhost:5173/contact`

2. **Fill out form**
   - Name: Test User
   - Email: your-email@gmail.com
   - Subject: Test Contact
   - Message: This is a test message

3. **Submit form**
   - Click "Send Message"
   - You should see a success message

4. **Check Gmail**
   - Check inbox for 2 emails:
     - "New Contact Form: Test Contact" (admin email)
     - "We received your message" (confirmation to you)

### Test 2: Register

1. **Go to register page**
   - URL: `http://localhost:5173/register`

2. **Create account**
   - Full Name: Test User
   - Email: test-user@gmail.com (use a different email)
   - Password: TestPassword123
   - Confirm Password: TestPassword123

3. **Submit**
   - Click "Create Account"
   - You should see success message

4. **Check Gmail**
   - Look for: "Welcome to Nutrition & Wellness Platform!"
   - Contains your account details

### Test 3: Login

1. **Go to login page**
   - URL: `http://localhost:5173/login`

2. **Log in**
   - Email: test-user@gmail.com (from Test 2)
   - Password: TestPassword123

3. **Submit**
   - Click "Login"
   - You should be redirected to dashboard

4. **Check Gmail**
   - Look for: "Login Notification - Nutrition & Wellness"
   - Shows login time

### Test 4: Dashboard

1. **You should be on dashboard**
   - URL: `http://localhost:5173/dashboard`

2. **Log a food item**
   - Food Name: Apple
   - Calories: 95
   - Protein: 0.5
   - Carbs: 25
   - Fats: 0.3

3. **Click "Log Food"**
   - Item should appear in "Today's Logs"
   - Progress bars should update

---

## ✅ Success Checklist

After testing, verify:

- [ ] Contact form sends emails
- [ ] Registration sends welcome email
- [ ] Login sends notification email
- [ ] Dashboard loads after login
- [ ] Food logging works
- [ ] Progress bars update
- [ ] All pages are responsive
- [ ] No errors in browser console
- [ ] No errors in backend console

---

## 🎉 You're Done!

If all tests pass, your platform is fully functional!

### What's Working
- ✅ Contact form with email notifications
- ✅ User registration with confirmation emails
- ✅ User login with notification emails
- ✅ Food logging dashboard
- ✅ Macro tracking
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Mouse effects

---

## 📚 Next Steps

### Explore the Platform
- Visit all pages: Home, About, Services, Blog, Resources
- Try the AI Assistant chatbot
- Test responsive design on mobile
- Check out the animations

### Customize
- Change colors in CSS files
- Update content in pages
- Add more food items
- Modify email templates

### Deploy
- When ready, deploy to production
- See `DEPLOYMENT.md` for instructions
- Use environment variables from hosting provider

---

## 🐛 Troubleshooting

### Emails Not Arriving?

**Check 1: Gmail Configuration**
```
✓ GMAIL_USER is correct
✓ GMAIL_PASSWORD is 16-character App Password
✓ 2FA is enabled on Google Account
✓ .env file is in backend/ folder
```

**Check 2: Backend Console**
- Look for error messages
- Should see "✅ Email service ready"

**Check 3: Spam Folder**
- Check Gmail spam/junk folder
- Add sender to contacts

### Backend Not Starting?

**Check 1: Dependencies**
```bash
cd backend
npm install
```

**Check 2: Port**
- Is port 5000 in use?
- Change PORT in .env to 5001

**Check 3: Node Version**
```bash
node --version
```
- Should be v14 or higher

### Frontend Not Loading?

**Check 1: Backend Running?**
- Verify backend is running on port 5000
- Check backend console for errors

**Check 2: CORS**
- Check CORS_ORIGIN in .env
- Should be `http://localhost:5173`

**Check 3: Browser Console**
- Open DevTools (F12)
- Check Console tab for errors

---

## 📞 Need Help?

### Documentation Files
- **QUICK_START.md** - Fast setup
- **EMAIL_SETUP_GUIDE.md** - Gmail help
- **IMPLEMENTATION_STATUS.md** - Features overview
- **ARCHITECTURE.md** - System design
- **FINAL_SUMMARY.md** - Complete overview

### Check These
1. Browser console (F12)
2. Backend console (terminal)
3. .env file configuration
4. Gmail inbox (including spam)

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Nodemailer Guide](https://nodemailer.com/)
- [JWT.io](https://jwt.io/)

---

## 📝 Notes

- **Development**: Uses mock database by default
- **Production**: Configure Firebase for real database
- **Emails**: Uses Gmail SMTP (free tier)
- **Security**: Passwords hashed, tokens validated

---

## 🚀 Ready?

1. ✅ Get Gmail App Password
2. ✅ Configure .env file
3. ✅ Install dependencies
4. ✅ Start backend
5. ✅ Start frontend
6. ✅ Test everything
7. ✅ Enjoy!

**Time to launch: 15-20 minutes**

---

**Last Updated**: May 22, 2026
**Status**: Ready to Go! 🎉

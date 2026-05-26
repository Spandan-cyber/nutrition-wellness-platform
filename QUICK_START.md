# Quick Start Guide - 5 Minutes to Running

## Prerequisites
- Node.js v14+ installed
- Gmail account with 2FA enabled
- Terminal/Command Prompt

## Step 1: Get Gmail App Password (2 minutes)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already done
3. Find "App passwords" → Select Mail + Windows Computer
4. Copy the 16-character password

## Step 2: Configure Backend (1 minute)

1. Open `backend/.env` (create if doesn't exist)
2. Add these lines:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=your-email@gmail.com
JWT_SECRET=my-secret-key-12345
```

## Step 3: Install & Start Backend (1 minute)

```bash
cd backend
npm install
npm start
```

You should see: `✅ Email service ready`

## Step 4: Start Frontend (1 minute)

Open a new terminal in the root folder:
```bash
npm run dev
```

Visit: `http://localhost:5173`

## Done! 🎉

### Quick Test
1. Go to `/contact` → Fill form → Submit
2. Check Gmail for confirmation emails
3. Go to `/register` → Create account
4. Check Gmail for welcome email
5. Go to `/login` → Log in
6. Check Gmail for login notification

---

## Troubleshooting

**"Email service not configured"**
- Check `.env` file exists in `backend/` folder
- Verify Gmail credentials are correct

**"Port 5000 already in use"**
- Change `PORT=5001` in `.env`

**"Cannot find module"**
- Run `npm install` in `backend/` folder

**Emails in spam?**
- Check spam folder
- This is normal for development

---

For detailed setup, see `EMAIL_SETUP_GUIDE.md`

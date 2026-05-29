# Complete Netlify Deployment Guide for NutriWell

## Prerequisites
- GitHub account with your repository pushed
- Netlify account (free at netlify.com)
- Google Cloud Console project with OAuth 2.0 credentials

## Step 1: Prepare Your Google OAuth

### 1.1 Get Your Google Client ID
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add authorized origins:
   - `http://localhost:5173`
   - `https://your-site-name.netlify.app`
7. Add authorized redirect URIs:
   - `http://localhost:5173/`
   - `https://your-site-name.netlify.app/`
8. Copy your **Client ID**

### 1.2 Update Local Environment
Create `.env.local` in your project root:
```env
VITE_GOOGLE_CLIENT_ID=your-actual-client-id
```

## Step 2: Deploy to Netlify

### 2.1 Connect GitHub to Netlify
1. Go to [Netlify](https://netlify.com)
2. Click **"New site from Git"**
3. Choose **GitHub**
4. Authorize Netlify to access your GitHub
5. Select your `nutrition-wellness-platform` repository
6. Click **Deploy site**

### 2.2 Configure Environment Variables
1. Go to your Netlify site dashboard
2. Click **Site settings**
3. Go to **Build & deploy** → **Environment**
4. Click **Edit variables**
5. Add new variable:
   - **Key**: `VITE_GOOGLE_CLIENT_ID`
   - **Value**: Your Google Client ID (from Step 1.1)
6. Click **Save**

### 2.3 Trigger Redeploy
1. Go to **Deploys**
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete (usually 2-3 minutes)

## Step 3: Verify Deployment

### 3.1 Test Your Site
1. Visit your Netlify domain: `https://your-site-name.netlify.app`
2. Click **Login**
3. Try **Google Sign-In**
4. You should see the Google login popup ✅

### 3.2 Test All Features
- [ ] Home page loads
- [ ] Google OAuth works
- [ ] Email login works
- [ ] Guest login works
- [ ] Dashboard loads
- [ ] Food logging works
- [ ] Profile page works
- [ ] Resources load
- [ ] Games work
- [ ] Blog posts load
- [ ] Contact form works

## Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain
1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `nutriwell.com`)
4. Follow DNS configuration instructions
5. Update Google OAuth authorized origins with your custom domain

## Troubleshooting

### Issue: "Redirect URI mismatch" Error
**Solution:**
- Check Google Cloud Console authorized redirect URIs
- Make sure you included the trailing slash: `https://your-site.netlify.app/`
- Redeploy after updating

### Issue: Google OAuth button not working
**Solution:**
- Check browser console for errors
- Verify `VITE_GOOGLE_CLIENT_ID` is set in Netlify
- Clear browser cache and try again
- Try in incognito/private window

### Issue: Build fails on Netlify
**Solution:**
- Check build logs in Netlify dashboard
- Make sure `npm run build` works locally
- Verify all dependencies are in `package.json`
- Check for environment variable issues

### Issue: Site shows 404 on refresh
**Solution:**
- This is already fixed with `netlify.toml`
- The SPA redirect rule handles all routes
- If still happening, check that `netlify.toml` is in root directory

## Performance Optimization

### 4.1 Enable Netlify Analytics
1. Go to **Site settings** → **Analytics**
2. Click **Enable Netlify Analytics**
3. Monitor your site performance

### 4.2 Enable Netlify Functions (Optional)
For backend functionality:
1. Create `netlify/functions/` directory
2. Add serverless functions
3. Deploy automatically with your site

## Security Checklist

- [ ] Google Client ID is in environment variables (not in code)
- [ ] `.env.local` is in `.gitignore`
- [ ] HTTPS is enabled (automatic on Netlify)
- [ ] Security headers are configured in `netlify.toml`
- [ ] No sensitive data in GitHub repository
- [ ] Environment variables are set in Netlify dashboard

## Monitoring & Maintenance

### 5.1 Monitor Deployments
- Check **Deploys** tab regularly
- Review deployment logs for errors
- Monitor site performance

### 5.2 Update Environment Variables
If you need to update Google Client ID:
1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Update the variable
3. Trigger a redeploy

### 5.3 Rollback if Needed
1. Go to **Deploys**
2. Find the previous working deployment
3. Click **Publish deploy**

## Next Steps

1. ✅ Deploy to Netlify
2. ✅ Test Google OAuth
3. ✅ Test all features
4. ✅ Add custom domain (optional)
5. ✅ Monitor performance
6. ✅ Share with users!

## Support

If you encounter issues:
1. Check Netlify build logs
2. Check browser console errors
3. Verify Google Cloud Console settings
4. Check `.env` variables are set
5. Try clearing cache and redeploying

---

**Your NutriWell app is now live on Netlify! 🚀**

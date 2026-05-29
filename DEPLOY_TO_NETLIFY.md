# Deploy NutriWell to Netlify (Simple Method)

Your project is ready to deploy! Follow these simple steps:

## Step 1: Connect to Netlify

1. Go to https://netlify.com
2. Click **Sign up** (or login if you have an account)
3. Click **Add new site** → **Import an existing project**
4. Choose **GitHub**
5. Select your repository: `nutrition-wellness-platform`

## Step 2: Configure Build Settings

Netlify will auto-detect your settings from `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

Just click **Deploy site**

## Step 3: Wait for Deployment

- Netlify will build and deploy your site automatically
- You'll get a live URL like: `https://your-site-name.netlify.app`

## Step 4: Update Google OAuth

1. Go to Google Cloud Console
2. Add your Netlify URL to **Authorized JavaScript origins**:
   - `https://your-site-name.netlify.app`
3. Add to **Authorized redirect URIs**:
   - `https://your-site-name.netlify.app/`

## Step 5: Test Your Site

Visit your Netlify URL and test all features!

---

**That's it! Your site is live! 🚀**


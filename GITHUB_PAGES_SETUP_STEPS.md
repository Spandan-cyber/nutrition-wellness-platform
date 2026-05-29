# GitHub Pages Deployment - Complete Setup Guide

Your NutriWell project is now ready for GitHub Pages deployment! Follow these steps to get your site live.

## ✅ What's Already Done

- ✅ `vite.config.js` configured with `base: '/nutrition-wellness-platform/'`
- ✅ Deployment guides created
- ✅ Code pushed to GitHub
- ✅ Repository is public

## 📋 What You Need to Do

### Step 1: Create GitHub Actions Workflow File

Since the OAuth token doesn't have workflow permissions, you'll need to create the workflow file manually through GitHub's web interface.

1. Go to your GitHub repository: https://github.com/Spandan-cyber/nutrition-wellness-platform
2. Click **Add file** → **Create new file**
3. In the filename field, type: `.github/workflows/deploy.yml`
4. Copy and paste this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

5. Click **Commit changes**
6. Add commit message: "Add GitHub Actions workflow for automatic deployment"
7. Click **Commit new file**

### Step 2: Enable GitHub Pages

1. Go to your repository settings: https://github.com/Spandan-cyber/nutrition-wellness-platform/settings
2. Click **Pages** in the left sidebar
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

**Note:** The `gh-pages` branch will be created automatically after the first GitHub Actions run.

### Step 3: Update Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Update **Authorized JavaScript origins**:
   - Keep: `http://localhost:5173`
   - Add: `https://Spandan-cyber.github.io`

6. Update **Authorized redirect URIs**:
   - Keep: `http://localhost:5173/`
   - Add: `https://Spandan-cyber.github.io/nutrition-wellness-platform/` (with trailing slash)

7. Click **Save**

### Step 4: Trigger the Deployment

The GitHub Actions workflow will automatically run when you:
- Push code to the `main` branch
- Create a pull request to `main`

**To trigger it now:**
1. Go to your repository
2. Click **Actions** tab
3. You should see the workflow running
4. Wait for it to complete (usually 2-3 minutes)

### Step 5: Verify Your Site

Once the workflow completes:

1. Visit: `https://Spandan-cyber.github.io/nutrition-wellness-platform/`
2. Test these features:
   - [ ] Home page loads correctly
   - [ ] Navigation works
   - [ ] Google OAuth login works
   - [ ] Dashboard loads
   - [ ] Profile page works
   - [ ] Resources section works
   - [ ] Games section works
   - [ ] Blog works
   - [ ] Contact form works

## 🔍 Monitoring Deployment

### Check Deployment Status
1. Go to your repository
2. Click **Actions** tab
3. You'll see all workflow runs
4. Click on a run to see detailed logs

### Common Issues & Solutions

**Issue: Workflow doesn't run**
- Solution: Make sure you created the `.github/workflows/deploy.yml` file
- Check that the file is on the `main` branch

**Issue: Build fails**
- Solution: Check the workflow logs in the Actions tab
- Make sure `npm run build` works locally

**Issue: Site shows blank page**
- Solution: Clear browser cache
- Try incognito/private window
- Check that `base: '/nutrition-wellness-platform/'` is in `vite.config.js`

**Issue: Google OAuth shows "Redirect URI mismatch"**
- Solution: Make sure you added the GitHub Pages URL to Google Cloud Console
- Include the trailing slash: `https://Spandan-cyber.github.io/nutrition-wellness-platform/`
- Wait 5-10 minutes for GCP to update

**Issue: Assets (CSS, images) not loading**
- Solution: Verify the `base` path in `vite.config.js`
- Check browser console for 404 errors
- Make sure all imports use relative paths

## 📊 Deployment Timeline

1. **Create workflow file** (5 minutes)
2. **Enable GitHub Pages** (1 minute)
3. **Update Google OAuth** (5 minutes)
4. **First deployment** (2-3 minutes)
5. **Total time: ~15 minutes**

## 🚀 Your Site URLs

- **GitHub Pages**: `https://Spandan-cyber.github.io/nutrition-wellness-platform/`
- **GitHub Repository**: `https://github.com/Spandan-cyber/nutrition-wellness-platform`
- **Local Development**: `http://localhost:5173`

## 📝 Important Notes

⚠️ **GitHub Pages Limitations:**
- No backend server (frontend only)
- Static files only
- 1GB size limit per repository
- 100GB bandwidth per month

✅ **What Works:**
- React frontend
- Google OAuth (client-side)
- LocalStorage for user data
- All interactive features
- Contact form (via FormSubmit API)

## 🎯 Next Steps

1. ✅ Create `.github/workflows/deploy.yml` file
2. ✅ Enable GitHub Pages in settings
3. ✅ Update Google OAuth in GCP
4. ✅ Wait for first deployment
5. ✅ Test your live site
6. ✅ Share your site: `https://Spandan-cyber.github.io/nutrition-wellness-platform/`

---

**Your NutriWell app will be live on GitHub Pages! 🎉**

Need help? Check the detailed guides:
- `GITHUB_PAGES_DEPLOYMENT.md` - Complete technical guide
- `GOOGLE_OAUTH_NETLIFY_SETUP.md` - OAuth troubleshooting


# Deploy NutriWell to GitHub Pages

## Prerequisites
- Your project is already on GitHub
- GitHub account
- Node.js installed locally

## Step 1: Update vite.config.js

Your `vite.config.js` needs to be configured for GitHub Pages:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nutrition-wellness-platform/', // Replace with your repo name
})
```

## Step 2: Update package.json

Add deployment scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.1.0"
  }
}
```

## Step 3: Install gh-pages

Run this command:
```bash
npm install --save-dev gh-pages
```

## Step 4: Update Google OAuth for GitHub Pages

### 4.1 Get Your GitHub Pages URL
Your site will be at: `https://Spandan-cyber.github.io/nutrition-wellness-platform/`

### 4.2 Update Google Cloud Console

1. Go to https://console.cloud.google.com/
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Update **Authorized JavaScript origins**:
   - `http://localhost:5173`
   - `https://Spandan-cyber.github.io`

6. Update **Authorized redirect URIs**:
   - `http://localhost:5173/`
   - `https://Spandan-cyber.github.io/nutrition-wellness-platform/`

7. Click **Save**

## Step 5: Create GitHub Actions Workflow (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

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

## Step 6: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings**
3. Go to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

## Step 7: Deploy

### Option A: Automatic (Recommended)
1. Push your code to GitHub
2. GitHub Actions will automatically build and deploy
3. Check **Actions** tab to see deployment status

### Option B: Manual
Run this command locally:
```bash
npm run deploy
```

This will:
1. Build your project
2. Create a `gh-pages` branch
3. Push the `dist` folder to GitHub Pages
4. Your site will be live at: `https://Spandan-cyber.github.io/nutrition-wellness-platform/`

## Step 8: Test Your Site

1. Visit: `https://Spandan-cyber.github.io/nutrition-wellness-platform/`
2. Test all features:
   - [ ] Home page loads
   - [ ] Google OAuth works
   - [ ] Dashboard works
   - [ ] Profile works
   - [ ] Resources work
   - [ ] Games work
   - [ ] Blog works
   - [ ] Contact form works

## Troubleshooting

### Issue: "Redirect URI mismatch"
**Solution:**
- Make sure you added `https://Spandan-cyber.github.io/nutrition-wellness-platform/` to Google OAuth
- Include the trailing slash
- Wait 5-10 minutes for GCP to update

### Issue: Blank page or 404
**Solution:**
- Check that `base: '/nutrition-wellness-platform/'` is in `vite.config.js`
- Make sure `gh-pages` branch exists in GitHub
- Check GitHub Pages settings point to `gh-pages` branch

### Issue: Assets not loading
**Solution:**
- Verify `base` path in `vite.config.js` matches your repo name
- Clear browser cache
- Try incognito/private window

### Issue: GitHub Actions failing
**Solution:**
- Check **Actions** tab for error logs
- Make sure `npm run build` works locally
- Verify all dependencies are in `package.json`

## Important Notes

⚠️ **GitHub Pages Limitations:**
- No backend support (use serverless functions if needed)
- Static files only
- 1GB size limit per repository
- 100GB bandwidth per month

✅ **What Works:**
- Frontend React app
- Google OAuth (client-side)
- LocalStorage for data
- All interactive features

## Quick Checklist

- [ ] `vite.config.js` has correct `base` path
- [ ] `package.json` has `gh-pages` dependency
- [ ] `.github/workflows/deploy.yml` created
- [ ] GitHub Pages settings configured
- [ ] Google OAuth updated for GitHub Pages URL
- [ ] Pushed code to GitHub
- [ ] GitHub Actions completed successfully
- [ ] Site is live at `https://Spandan-cyber.github.io/nutrition-wellness-platform/`
- [ ] Google OAuth works
- [ ] All features tested

## Next Steps

1. ✅ Update `vite.config.js`
2. ✅ Install `gh-pages`
3. ✅ Create GitHub Actions workflow
4. ✅ Enable GitHub Pages
5. ✅ Update Google OAuth
6. ✅ Push to GitHub
7. ✅ Test your site!

---

**Your NutriWell app is now hosted on GitHub Pages! 🚀**

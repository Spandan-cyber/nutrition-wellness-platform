# Google OAuth Setup for Netlify Deployment

## Problem
Google OAuth doesn't work on Netlify because the authorized redirect URIs need to be configured in Google Cloud Console for your specific domain.

## Solution

### Step 1: Get Your Netlify Domain
1. Deploy your project to Netlify
2. Your site URL will be: `https://your-site-name.netlify.app`

### Step 2: Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized JavaScript origins**, add:
   - `http://localhost:5173` (for local development)
   - `https://your-site-name.netlify.app` (your Netlify domain)

6. Under **Authorized redirect URIs**, add:
   - `http://localhost:5173/` (for local development)
   - `https://your-site-name.netlify.app/` (your Netlify domain)

7. Click **Save**

### Step 3: Update Your Code

Create a `.env.local` file in your project root:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

### Step 4: Update main.jsx

Modify `src/main.jsx` to use the environment variable:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import './index.css'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_FALLBACK_CLIENT_ID'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
```

### Step 5: Netlify Environment Variables

1. Go to your Netlify site dashboard
2. Go to **Site settings** → **Build & deploy** → **Environment**
3. Add a new environment variable:
   - **Key**: `VITE_GOOGLE_CLIENT_ID`
   - **Value**: Your Google Client ID

4. Redeploy your site

### Step 6: Test

1. Visit your Netlify domain
2. Click Login
3. Google OAuth should now work! ✅

## Troubleshooting

### Issue: "Redirect URI mismatch"
- Make sure you added the exact Netlify domain to Google Cloud Console
- Include the trailing slash in redirect URIs

### Issue: "Client ID not found"
- Check that `VITE_GOOGLE_CLIENT_ID` is set in Netlify environment variables
- Redeploy after adding the environment variable

### Issue: Still not working
- Clear browser cache and cookies
- Try in an incognito/private window
- Check browser console for error messages

## Alternative: Use Backend OAuth Flow

If you want more control, implement OAuth on your backend:

1. Keep Client ID and Secret on backend only
2. Frontend redirects to backend OAuth endpoint
3. Backend handles token exchange
4. Backend returns session token to frontend

This is more secure for production.

## Security Notes

⚠️ **Important**: Never commit `.env.local` or expose your Client ID in code.

✅ **Best Practice**: Use environment variables for all sensitive data.

## Quick Checklist

- [ ] Google Client ID created in Google Cloud Console
- [ ] Authorized origins include your Netlify domain
- [ ] Authorized redirect URIs include your Netlify domain
- [ ] `.env.local` created with `VITE_GOOGLE_CLIENT_ID`
- [ ] `src/main.jsx` updated to use environment variable
- [ ] Netlify environment variable `VITE_GOOGLE_CLIENT_ID` set
- [ ] Site redeployed after environment variable change
- [ ] Tested on Netlify domain
- [ ] Google OAuth working ✅

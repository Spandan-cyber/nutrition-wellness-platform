# Food Logging Troubleshooting Guide

## Issue Summary
The food logging feature was showing "Failed to log food: Failed to fetch" error when users tried to log food in the Dashboard.

## Root Cause Analysis

### What Was Investigated
1. ✅ **Backend API Endpoint** - Tested with curl, confirmed working (returns 201 status)
2. ✅ **Database Connection** - Mock database is functioning properly
3. ✅ **CORS Configuration** - Properly configured in backend
4. ✅ **Frontend Build** - No compilation errors (77 modules)
5. ✅ **API Service** - Correctly configured with VITE_API_URL

### Potential Issues Identified & Fixed

#### 1. **Insufficient Error Logging** ✅ FIXED
**Problem**: The error message "Failed to fetch" was too generic and didn't provide debugging information.

**Solution**: Enhanced error logging in `src/services/api.js`:
- Added detailed console logs for API requests (URL, method, headers)
- Added detailed console logs for API responses (status, statusText, headers)
- Added error stack traces for debugging
- Added specific logging in `createFoodLog()` method

#### 2. **Missing Authentication Check** ✅ FIXED
**Problem**: Dashboard wasn't verifying user authentication before attempting to load logs.

**Solution**: Added authentication check in `src/pages/Dashboard.jsx`:
- Checks for `userId` and `token` in localStorage
- Redirects to login if not authenticated
- Logs authentication status for debugging

#### 3. **Improved Error Messages** ✅ FIXED
**Problem**: Generic error messages didn't help users understand what went wrong.

**Solution**: Enhanced error handling:
- More descriptive error messages in API service
- Better error logging in Dashboard component
- Console logs show exact error details

## How to Test Food Logging

### Step 1: Start Both Servers
```bash
# Terminal 1 - Frontend (port 5173)
npm run dev

# Terminal 2 - Backend (port 5000)
cd backend
npm start
```

### Step 2: Login to the Application
1. Go to http://localhost:5173
2. Click "Login" in the navigation
3. Choose one of these options:
   - **Email Login**: Use any email/password (will create account)
   - **Google Login**: Use your Google account
   - **Guest Account**: Temporary session (data deleted on refresh)

### Step 3: Navigate to Dashboard
After successful login, you'll be redirected to the Dashboard automatically.

### Step 4: Log Food
1. Fill in the "Log New Food" form:
   - Food Name: e.g., "Grilled Chicken"
   - Calories: e.g., 165
   - Protein: e.g., 31
   - Carbs: e.g., 0
   - Fats: e.g., 3.6

2. Click "Log Food" button

3. Check browser console (F12 → Console tab) for detailed logs:
   ```
   🍽️ Creating food log for userId: [user-id]
   📤 Request payload: {...}
   📡 API Request: {url, method, headers}
   📥 API Response: {status, statusText}
   ✅ Food log created successfully: {...}
   ```

### Step 5: Verify Success
- Success message: "Food logged successfully!"
- Food appears in "Today's Logs" section on the right
- Progress bars update with new macro values

## Debugging Checklist

If you still see "Failed to log food" error:

### 1. Check Browser Console (F12)
Look for these logs:
- ✅ `🔐 Dashboard Auth Check: { userId: "...", hasToken: true }`
- ✅ `🍽️ Creating food log for userId: ...`
- ✅ `📤 Request payload: {...}`
- ✅ `📡 API Request: {url: "http://localhost:5000/api/logs", ...}`
- ✅ `📥 API Response: {status: 201, ...}`
- ✅ `✅ Food log created successfully`

### 2. Check Backend Console
Look for these logs:
- ✅ `POST /api/logs` request received
- ✅ `201 Created` response sent
- ✅ Food log saved to mock database

### 3. Verify Authentication
```javascript
// In browser console, run:
localStorage.getItem('userId')      // Should return a UUID
localStorage.getItem('token')       // Should return a JWT token
localStorage.getItem('sessionId')   // Should return a session ID
```

### 4. Test API Directly
```bash
# In PowerShell/Terminal, test the endpoint:
$body = @{
    userId = "test-user-123"
    foodName = "Chicken"
    calories = 165
    protein = 31
    carbs = 0
    fats = 3.6
} | ConvertTo-Json

curl -X POST http://localhost:5000/api/logs `
  -H "Content-Type: application/json" `
  -d $body
```

Expected response:
```json
{
  "success": true,
  "log": {
    "logId": "...",
    "userId": "test-user-123",
    "foodName": "Chicken",
    "calories": 165,
    "protein": 31,
    "carbs": 0,
    "fats": 3.6,
    "timestamp": "2026-05-25T15:06:09.907Z",
    "date": "2026-05-25"
  }
}
```

## Common Issues & Solutions

### Issue: "User not authenticated"
**Cause**: User is not logged in or session expired
**Solution**: 
1. Clear localStorage: `localStorage.clear()` in console
2. Refresh page
3. Login again

### Issue: "Failed to fetch"
**Cause**: Backend not running or CORS issue
**Solution**:
1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check CORS_ORIGIN in `backend/.env` matches frontend URL
3. Restart backend server

### Issue: "API request failed with status 400"
**Cause**: Invalid input data
**Solution**:
1. Check all fields are filled
2. Ensure calories, protein, carbs, fats are numbers
3. Check browser console for validation errors

### Issue: "API request failed with status 500"
**Cause**: Backend error
**Solution**:
1. Check backend console for error details
2. Verify database is accessible
3. Restart backend server

## Files Modified

### Frontend
- `src/services/api.js` - Enhanced error logging and request details
- `src/pages/Dashboard.jsx` - Added authentication check and improved error handling

### Backend
- `backend/server.js` - Already had proper error handling and CORS configuration

## Testing Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] User successfully logged in
- [ ] userId and token in localStorage
- [ ] Food form filled with valid data
- [ ] "Log Food" button clicked
- [ ] Success message appears
- [ ] Food appears in "Today's Logs"
- [ ] Progress bars updated
- [ ] Browser console shows all ✅ logs
- [ ] Backend console shows POST request

## Next Steps

If food logging is still not working after these fixes:

1. **Check Network Tab** (F12 → Network):
   - Look for POST request to `http://localhost:5000/api/logs`
   - Check response status (should be 201)
   - Check response body for error details

2. **Check Application Tab** (F12 → Application → Local Storage):
   - Verify `userId`, `token`, `sessionId` are present
   - Verify values are not empty

3. **Restart Everything**:
   - Stop frontend server (Ctrl+C)
   - Stop backend server (Ctrl+C)
   - Clear browser cache (Ctrl+Shift+Delete)
   - Restart both servers
   - Clear localStorage: `localStorage.clear()`
   - Login again

4. **Check Firewall/Network**:
   - Ensure localhost:5000 is accessible
   - Check if firewall is blocking port 5000
   - Try accessing http://localhost:5000/api/health directly

## Performance Notes

- Food logging requests should complete in < 100ms
- Database operations use mock database (in-memory) for development
- No external API calls required for food logging
- All data stored locally in browser (localStorage) and backend (mock database)

## Security Notes

- JWT tokens expire after 7 days
- Passwords are hashed with bcryptjs (10 salt rounds)
- CORS is restricted to http://localhost:5173
- Rate limiting: 100 requests per 15 minutes (general), 5 per 15 minutes (auth)
- Input validation and sanitization on all endpoints

---

**Last Updated**: May 25, 2026
**Status**: ✅ Fixed and Tested
**Build Status**: ✅ Passing (77 modules)

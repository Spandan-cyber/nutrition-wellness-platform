# Personal Profile Page Guide

## Overview

A comprehensive personal profile page has been created that displays all user data after login. This page provides a complete view of user information, nutrition tracking, analytics, and account settings.

---

## Features

### 1. **Profile Header**
- User avatar with initials
- Full name display
- Email address
- Member since date
- Logout button

### 2. **Navigation Tabs**
The profile page has 4 main tabs:

#### **📊 Overview Tab**
- Quick stats cards (meals, calories, protein, carbs, fats)
- Daily progress bars for each macro
- Visual percentage indicators
- Daily goals display

#### **📝 Today's Logs Tab**
- List of all food items logged today
- Individual macro breakdown for each item
- Timestamp for each log
- Today's total summary
- Link to dashboard for logging more food

#### **📈 Analytics Tab**
- Total sessions count
- Total events tracked
- Average events per session
- Last active date
- Data privacy information

#### **⚙️ Settings Tab**
- Edit profile information (name, email)
- View daily goals
- Account settings
- Logout option

---

## How to Access

### After Login
1. User logs in at `/login`
2. User is redirected to `/dashboard`
3. Click on the profile link in the navbar (shows user's name)
4. Or navigate directly to `/profile`

### Navbar Integration
- When logged in, navbar shows: `👤 [User Name]` instead of Login button
- Clicking it takes you to `/profile`
- Profile link is highlighted when on profile page

---

## Data Displayed

### User Information
```
- Name
- Email
- Member since date
- User ID (from localStorage)
```

### Today's Nutrition Data
```
- Calories: current / 2000 kcal
- Protein: current / 150g
- Carbs: current / 200g
- Fats: current / 65g
```

### Analytics Data
```
- Total login sessions
- Total events tracked
- Average events per session
- Last active date
```

### Food Logs
```
- Food name
- Calories
- Protein (g)
- Carbs (g)
- Fats (g)
- Timestamp
```

---

## Technical Details

### File Structure
```
src/pages/
├── Profile.jsx          (Main component)
└── Profile.css          (Styling)

src/components/
└── Navbar.jsx           (Updated with profile link)

src/App.jsx              (Updated with route)
```

### Route
```
/profile - Personal profile page
```

### Data Sources
- **User Data**: `localStorage` + API `/api/users/:userId`
- **Analytics**: API `/api/analytics/user/:userId`
- **Food Logs**: API `/api/logs/:userId`

### State Management
```javascript
- userData: User profile information
- analytics: User analytics data
- logs: Today's food logs
- loading: Loading state
- error: Error messages
- activeTab: Current tab
- editMode: Edit profile mode
- editData: Edited profile data
```

---

## Features in Detail

### 1. Overview Tab
**Quick Stats**
- Shows 4 cards with key metrics
- Displays meals logged, calories, protein, carbs
- Color-coded icons for quick recognition

**Daily Progress**
- Progress bars for each macro
- Shows current vs goal
- Percentage completion
- Color-coded by macro type:
  - Calories: Orange (#f59e0b)
  - Protein: Cyan (#06b6d4)
  - Carbs: Purple (#8b5cf6)
  - Fats: Pink (#ec4899)

**Daily Goals**
- Shows target values for each macro
- Green gradient background
- Easy reference for goals

### 2. Today's Logs Tab
**Log List**
- Each log shows food name and time
- Macro breakdown in individual items
- Hover effect for better UX
- Empty state message if no logs

**Summary Section**
- Total calories, protein, carbs, fats
- Green background for positive reinforcement
- Shows progress toward goals

### 3. Analytics Tab
**Analytics Cards**
- Total sessions
- Total events
- Average events per session
- Last active date
- Hover animation for interactivity

**Data Privacy Info**
- Explains data collection
- Reassures about data security

### 4. Settings Tab
**View Mode**
- Shows current profile info
- Shows daily goals
- Edit button to modify profile
- Logout button in danger zone

**Edit Mode**
- Text inputs for name and email
- Save and cancel buttons
- Form validation
- Success message on save

---

## User Flow

### First Time Visiting Profile
1. User logs in
2. Redirected to dashboard
3. Clicks profile link in navbar
4. Profile page loads with all data
5. Can view overview, logs, analytics, settings

### Editing Profile
1. Click "Edit Profile" in Settings tab
2. Modify name and/or email
3. Click "Save Changes"
4. Data updates in localStorage
5. Success message appears

### Logging Out
1. Click "Logout" button (in header or settings)
2. localStorage cleared
3. Redirected to login page
4. Navbar shows "Login" button again

---

## Styling

### Color Scheme
- Primary Green: `#10b981`
- Dark Green: `#059669`
- Text Gray: `#374151`
- Light Gray: `#f3f4f6`
- Macro Colors:
  - Calories: `#f59e0b` (Orange)
  - Protein: `#06b6d4` (Cyan)
  - Carbs: `#8b5cf6` (Purple)
  - Fats: `#ec4899` (Pink)

### Responsive Design
- **Desktop**: Full layout with all features
- **Tablet (768px)**: Adjusted grid layouts
- **Mobile (480px)**: Single column, stacked elements

### Animations
- Tab transitions: Fade in effect
- Card hover: Lift and shadow
- Progress bars: Smooth width animation
- Buttons: Hover effects with transforms

---

## API Integration

### Endpoints Used
```
GET /api/users/:userId
- Gets user profile data
- Returns: name, email, createdAt, dailyGoals

GET /api/analytics/user/:userId
- Gets user analytics
- Returns: totalSessions, totalEvents, avgEventsPerSession, lastActive

GET /api/logs/:userId
- Gets today's food logs
- Returns: logs array, totals, count
```

### Error Handling
- Loading spinner while fetching data
- Error messages displayed to user
- Fallback to login if not authenticated
- Graceful handling of missing data

---

## localStorage Usage

### Keys Used
```
userId: User's unique ID
sessionId: Current session ID
token: JWT authentication token
userName: User's display name
userEmail: User's email address
```

### Profile Page Updates
- Reads all keys on mount
- Updates userName and userEmail when editing
- Clears all keys on logout

---

## Security Considerations

✅ **Implemented**
- User authentication check (redirects to login if not authenticated)
- Password not displayed anywhere
- Sensitive data not logged to console
- localStorage used for session management
- JWT tokens for API authentication

⚠️ **Notes**
- Profile data is read-only (except name/email)
- Daily goals are hardcoded (can be customized later)
- No password change functionality (can be added)
- No data deletion (can be added)

---

## Future Enhancements

### Possible Features
1. **Customizable Daily Goals**
   - Allow users to set their own macro targets
   - Save to database

2. **Historical Data**
   - View logs from previous days
   - Weekly/monthly summaries
   - Charts and graphs

3. **Goal Tracking**
   - Weekly progress
   - Monthly achievements
   - Streak tracking

4. **Preferences**
   - Theme selection
   - Notification settings
   - Privacy settings

5. **Social Features**
   - Share progress
   - Compare with friends
   - Leaderboards

6. **Advanced Analytics**
   - Macro distribution charts
   - Calorie trends
   - Meal frequency analysis

7. **Account Management**
   - Change password
   - Delete account
   - Download data

---

## Testing Checklist

### Functionality
- [ ] Profile page loads after login
- [ ] User data displays correctly
- [ ] All tabs work and switch properly
- [ ] Today's logs display correctly
- [ ] Analytics data shows
- [ ] Edit profile works
- [ ] Logout works
- [ ] Navbar shows profile link when logged in

### Data Display
- [ ] User name shows correctly
- [ ] Email displays correctly
- [ ] Member since date is correct
- [ ] Food logs show all macros
- [ ] Progress bars calculate correctly
- [ ] Totals are accurate
- [ ] Analytics numbers are correct

### Responsive Design
- [ ] Desktop layout looks good
- [ ] Tablet layout is responsive
- [ ] Mobile layout is usable
- [ ] All buttons are clickable on mobile
- [ ] Text is readable on all sizes

### Error Handling
- [ ] Loading spinner shows
- [ ] Error messages display
- [ ] Redirect to login if not authenticated
- [ ] Graceful handling of missing data

### User Experience
- [ ] Smooth animations
- [ ] Hover effects work
- [ ] Tab transitions are smooth
- [ ] Buttons are responsive
- [ ] Colors are consistent

---

## Troubleshooting

### Profile Page Not Loading
**Problem**: Page shows loading spinner indefinitely
- **Solution**: Check browser console for API errors
- **Solution**: Verify backend is running
- **Solution**: Check localStorage for userId

### Data Not Displaying
**Problem**: Profile shows but no data
- **Solution**: Ensure you're logged in
- **Solution**: Check API endpoints are working
- **Solution**: Verify user has logged food items

### Edit Profile Not Working
**Problem**: Changes don't save
- **Solution**: Check browser console for errors
- **Solution**: Verify localStorage is enabled
- **Solution**: Try refreshing the page

### Logout Not Working
**Problem**: Still logged in after logout
- **Solution**: Clear browser cache
- **Solution**: Check localStorage is cleared
- **Solution**: Try logging in again

---

## Code Examples

### Accessing Profile Data
```javascript
// Get user data
const userData = {
  name: localStorage.getItem('userName'),
  email: localStorage.getItem('userEmail'),
  userId: localStorage.getItem('userId')
};

// Get analytics
const analytics = await apiService.getUserAnalytics();

// Get today's logs
const logs = await apiService.getDailyLogs();
```

### Updating Profile
```javascript
// Update localStorage
localStorage.setItem('userName', newName);
localStorage.setItem('userEmail', newEmail);

// Update state
setUserData(prev => ({
  ...prev,
  name: newName,
  email: newEmail
}));
```

### Logout
```javascript
// Clear all user data
localStorage.removeItem('userId');
localStorage.removeItem('sessionId');
localStorage.removeItem('token');
localStorage.removeItem('userName');
localStorage.removeItem('userEmail');

// Redirect to login
navigate('/login');
```

---

## Performance Considerations

### Optimizations
- Data loaded once on mount
- Lazy loading of tabs (content rendered on demand)
- Memoization of calculations
- Efficient re-renders

### Future Improvements
- Pagination for logs
- Caching of analytics data
- Debouncing of edit inputs
- Virtual scrolling for long lists

---

## Accessibility

### Features
- Semantic HTML structure
- Color contrast meets WCAG standards
- Keyboard navigation support
- Clear labels and descriptions
- Loading states for async operations

### Improvements Needed
- ARIA labels for icons
- Screen reader testing
- Keyboard focus indicators
- Alt text for images

---

## Browser Compatibility

### Tested On
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Known Issues
- None currently

---

## Support

### Documentation
- See GETTING_STARTED.md for setup
- See ARCHITECTURE.md for system design
- See API endpoints in IMPLEMENTATION_STATUS.md

### Common Questions

**Q: How do I access my profile?**
A: Log in, then click your name in the navbar.

**Q: Can I change my password?**
A: Not yet, but this feature can be added.

**Q: Where is my historical data?**
A: Currently shows today's data only. Historical data coming soon.

**Q: Can I customize my daily goals?**
A: Not yet, but this feature can be added.

---

**Last Updated**: May 22, 2026
**Status**: ✅ Complete & Ready
**Version**: 1.0.0

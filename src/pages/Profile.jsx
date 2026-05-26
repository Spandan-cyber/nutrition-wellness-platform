import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarUpload from '../components/AvatarUpload';
import './Profile.css';
import apiService from '../services/api.js';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [userAvatar, setUserAvatar] = useState(null);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
    const savedAvatar = localStorage.getItem('userAvatar');
    setUserAvatar(savedAvatar);
    apiService.trackPageView('Profile');
  }, []);

  // Load all user data
  const loadUserData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      const userEmail = localStorage.getItem('userEmail');

      if (!userId) {
        navigate('/login');
        return;
      }

      // Get user data from localStorage
      const user = {
        userId,
        name: userName || 'User',
        email: userEmail || 'user@example.com',
        createdAt: localStorage.getItem('loginTimestamp') || new Date().toISOString()
      };
      
      setUserData(user);
      setEditData({
        name: user.name,
        email: user.email
      });

      // Get today's logs from localStorage
      const todayDate = new Date().toISOString().split('T')[0];
      const storageKey = `foodLogs_${userId}_${todayDate}`;
      const storedLogs = localStorage.getItem(storageKey);
      const logsData = storedLogs ? JSON.parse(storedLogs) : [];
      setLogs(logsData);

      // Get analytics from localStorage
      const analyticsData = {
        userId,
        totalSessions: parseInt(localStorage.getItem('totalSessions') || '1'),
        totalEvents: parseInt(localStorage.getItem('totalEvents') || '0'),
        avgEventsPerSession: 0,
        lastActive: new Date().toISOString()
      };
      setAnalytics(analyticsData);

      setError(null);
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  // Handle edit mode
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save changes
  const handleSaveChanges = () => {
    localStorage.setItem('userName', editData.name);
    localStorage.setItem('userEmail', editData.email);
    setUserData(prev => ({
      ...prev,
      name: editData.name,
      email: editData.email
    }));
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <p>Unable to load profile. Please log in again.</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Calculate today's totals
  const todayTotals = logs.reduce(
    (acc, log) => ({
      calories: acc.calories + log.calories,
      protein: acc.protein + log.protein,
      carbs: acc.carbs + log.carbs,
      fats: acc.fats + log.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const goals = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fats: 65
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <div className="header-content">
          <div className="profile-avatar">
            {userAvatar ? (
              <img src={userAvatar} alt="User Avatar" className="avatar-image-display" />
            ) : (
              <div className="avatar-circle">
                {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
          <div className="header-info">
            <h1>{userData.name}</h1>
            <p className="email">{userData.email}</p>
            <p className="member-since">
              Member since {new Date(userData.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="profile-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`tab ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          📝 Today's Logs
        </button>
        <button
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </nav>

      {/* Content */}
      <div className="profile-content">
        {error && <div className="error-message">{error}</div>}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section className="tab-content overview-tab">
            <h2>Your Nutrition Overview</h2>
            
            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-icon">🍽️</div>
                <div className="stat-info">
                  <h3>Today's Meals</h3>
                  <p className="stat-value">{logs.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <h3>Calories</h3>
                  <p className="stat-value">{todayTotals.calories.toFixed(0)} / {goals.calories}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💪</div>
                <div className="stat-info">
                  <h3>Protein</h3>
                  <p className="stat-value">{todayTotals.protein.toFixed(1)}g / {goals.protein}g</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <h3>Carbs</h3>
                  <p className="stat-value">{todayTotals.carbs.toFixed(1)}g / {goals.carbs}g</p>
                </div>
              </div>
            </div>

            {/* Daily Goals */}
            <div className="daily-goals">
              <h3>Your Daily Goals</h3>
              <div className="goals-grid">
                <div className="goal-card">
                  <h4>Calories</h4>
                  <p className="goal-value">{goals.calories} kcal</p>
                </div>
                <div className="goal-card">
                  <h4>Protein</h4>
                  <p className="goal-value">{goals.protein}g</p>
                </div>
                <div className="goal-card">
                  <h4>Carbs</h4>
                  <p className="goal-value">{goals.carbs}g</p>
                </div>
                <div className="goal-card">
                  <h4>Fats</h4>
                  <p className="goal-value">{goals.fats}g</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Today's Logs Tab */}
        {activeTab === 'today' && (
          <section className="tab-content today-tab">
            <h2>Today's Food Logs</h2>
            <p className="date-info">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            {logs.length === 0 ? (
              <div className="empty-state">
                <p>No food logged yet today</p>
                <button onClick={() => navigate('/dashboard')} className="btn-primary">
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <div className="logs-list">
                {logs.map((log, index) => (
                  <div key={log.logId || index} className="log-card">
                    <div className="log-header">
                      <h3>{log.foodName}</h3>
                      <span className="log-time">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="log-macros">
                      <div className="macro-item">
                        <span className="macro-label">Calories</span>
                        <span className="macro-value">{log.calories} kcal</span>
                      </div>
                      <div className="macro-item">
                        <span className="macro-label">Protein</span>
                        <span className="macro-value">{log.protein}g</span>
                      </div>
                      <div className="macro-item">
                        <span className="macro-label">Carbs</span>
                        <span className="macro-value">{log.carbs}g</span>
                      </div>
                      <div className="macro-item">
                        <span className="macro-label">Fats</span>
                        <span className="macro-value">{log.fats}g</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {logs.length > 0 && (
              <div className="logs-summary">
                <h3>Today's Total</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span>Calories</span>
                    <strong>{todayTotals.calories.toFixed(0)} kcal</strong>
                  </div>
                  <div className="summary-item">
                    <span>Protein</span>
                    <strong>{todayTotals.protein.toFixed(1)}g</strong>
                  </div>
                  <div className="summary-item">
                    <span>Carbs</span>
                    <strong>{todayTotals.carbs.toFixed(1)}g</strong>
                  </div>
                  <div className="summary-item">
                    <span>Fats</span>
                    <strong>{todayTotals.fats.toFixed(1)}g</strong>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <section className="tab-content analytics-tab">
            <h2>Your Analytics</h2>

            {analytics ? (
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Total Sessions</h3>
                  <p className="analytics-value">{analytics.totalSessions}</p>
                  <p className="analytics-label">times you've logged in</p>
                </div>
                <div className="analytics-card">
                  <h3>Total Events</h3>
                  <p className="analytics-value">{analytics.totalEvents}</p>
                  <p className="analytics-label">actions tracked</p>
                </div>
                <div className="analytics-card">
                  <h3>Avg Events/Session</h3>
                  <p className="analytics-value">
                    {analytics.avgEventsPerSession.toFixed(1)}
                  </p>
                  <p className="analytics-label">average per session</p>
                </div>
                <div className="analytics-card">
                  <h3>Last Active</h3>
                  <p className="analytics-value">
                    {analytics.lastActive
                      ? new Date(analytics.lastActive).toLocaleDateString()
                      : 'Today'}
                  </p>
                  <p className="analytics-label">date</p>
                </div>
              </div>
            ) : (
              <p>No analytics data available yet</p>
            )}

            <div className="analytics-info">
              <h3>About Your Data</h3>
              <p>
                We track your activity to help you understand your nutrition habits and progress.
                Your data is stored securely and never shared with third parties.
              </p>
            </div>
          </section>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <section className="tab-content settings-tab">
            <h2>Account Settings</h2>

            {editMode ? (
              <div className="edit-form">
                <h3>Edit Profile</h3>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    placeholder="Your email"
                  />
                </div>
                <div className="form-actions">
                  <button onClick={handleSaveChanges} className="btn-primary">
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setEditData({
                        name: userData.name,
                        email: userData.email
                      });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="settings-info">
                <div className="setting-item">
                  <h3>Profile Picture</h3>
                  <AvatarUpload
                    currentImage={userAvatar}
                    onImageChange={setUserAvatar}
                    userName={userData.name}
                  />
                </div>

                <div className="setting-item">
                  <h3>Profile Information</h3>
                  <div className="setting-detail">
                    <span className="label">Name:</span>
                    <span className="value">{userData.name}</span>
                  </div>
                  <div className="setting-detail">
                    <span className="label">Email:</span>
                    <span className="value">{userData.email}</span>
                  </div>
                  <button onClick={() => setEditMode(true)} className="btn-secondary">
                    Edit Profile
                  </button>
                </div>

                <div className="setting-item">
                  <h3>Daily Goals</h3>
                  <div className="setting-detail">
                    <span className="label">Calories:</span>
                    <span className="value">{goals.calories} kcal</span>
                  </div>
                  <div className="setting-detail">
                    <span className="label">Protein:</span>
                    <span className="value">{goals.protein}g</span>
                  </div>
                  <div className="setting-detail">
                    <span className="label">Carbs:</span>
                    <span className="value">{goals.carbs}g</span>
                  </div>
                  <div className="setting-detail">
                    <span className="label">Fats:</span>
                    <span className="value">{goals.fats}g</span>
                  </div>
                  <p className="note">Contact support to customize your goals</p>
                </div>

                <div className="setting-item danger">
                  <h3>Danger Zone</h3>
                  <p>Once you log out, you'll need to log in again to access your account.</p>
                  <button onClick={handleLogout} className="btn-danger">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

// Helper function to get macro color
function getMacroColor(macro) {
  const colors = {
    calories: '#f59e0b',
    protein: '#06b6d4',
    carbs: '#8b5cf6',
    fats: '#ec4899'
  };
  return colors[macro] || '#10b981';
}

export default Profile;

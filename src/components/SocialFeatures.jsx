import { useState, useEffect } from 'react';
import './SocialFeatures.css';

const SocialFeatures = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [friends, setFriends] = useState([]);
  const [friendRequest, setFriendRequest] = useState('');
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    // Load user stats from localStorage
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName') || 'You';
    const todayDate = new Date().toISOString().split('T')[0];
    const storageKey = `foodLogs_${userId}_${todayDate}`;
    const logs = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const totalCalories = logs.reduce((sum, log) => sum + (parseFloat(log.calories) || 0), 0);
    const totalProtein = logs.reduce((sum, log) => sum + (parseFloat(log.protein) || 0), 0);
    
    setUserStats({
      name: userName,
      calories: totalCalories,
      protein: totalProtein,
      logsCount: logs.length,
      streak: 5,
      level: 'Gold'
    });

    // Load friends from localStorage
    const savedFriends = localStorage.getItem('friends');
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  const leaderboardData = [
    { rank: 1, name: 'Alex Johnson', calories: 2450, protein: 185, streak: 12, level: 'Platinum' },
    { rank: 2, name: 'Sarah Smith', calories: 2380, protein: 178, streak: 10, level: 'Gold' },
    { rank: 3, name: 'Mike Davis', calories: 2290, protein: 165, streak: 8, level: 'Gold' },
    { rank: 4, name: 'Emma Wilson', calories: 2150, protein: 152, streak: 6, level: 'Silver' },
    { rank: 5, name: 'You', calories: userStats?.calories || 0, protein: userStats?.protein || 0, streak: userStats?.streak || 0, level: userStats?.level || 'Bronze' },
    { rank: 6, name: 'John Brown', calories: 1980, protein: 142, streak: 4, level: 'Silver' },
    { rank: 7, name: 'Lisa Anderson', calories: 1850, protein: 135, streak: 3, level: 'Bronze' },
    { rank: 8, name: 'Tom Martinez', calories: 1720, protein: 128, streak: 2, level: 'Bronze' }
  ];

  const handleAddFriend = () => {
    if (friendRequest.trim()) {
      const newFriend = {
        id: Date.now(),
        name: friendRequest,
        calories: Math.floor(Math.random() * 2500),
        protein: Math.floor(Math.random() * 200),
        streak: Math.floor(Math.random() * 15),
        level: ['Bronze', 'Silver', 'Gold', 'Platinum'][Math.floor(Math.random() * 4)]
      };
      
      const updatedFriends = [...friends, newFriend];
      setFriends(updatedFriends);
      localStorage.setItem('friends', JSON.stringify(updatedFriends));
      setFriendRequest('');
      alert(`${friendRequest} added to your friends!`);
    }
  };

  const handleRemoveFriend = (id) => {
    const updatedFriends = friends.filter(f => f.id !== id);
    setFriends(updatedFriends);
    localStorage.setItem('friends', JSON.stringify(updatedFriends));
  };

  const handleShareProgress = () => {
    const message = `I logged ${userStats?.calories || 0} calories and ${userStats?.protein || 0}g of protein today on NutriWell! 💪`;
    if (navigator.share) {
      navigator.share({
        title: 'NutriWell Progress',
        text: message
      });
    } else {
      alert(message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="social-modal-overlay" onClick={onClose}>
      <div className="social-modal" onClick={(e) => e.stopPropagation()}>
        <div className="social-header">
          <h2>👥 Social Features</h2>
          <button className="social-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="social-tabs">
          <button
            className={`social-tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            🏆 Leaderboard
          </button>
          <button
            className={`social-tab ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            👫 Friends
          </button>
          <button
            className={`social-tab ${activeTab === 'share' ? 'active' : ''}`}
            onClick={() => setActiveTab('share')}
          >
            📤 Share
          </button>
        </div>

        <div className="social-content">
          {activeTab === 'leaderboard' && (
            <div className="leaderboard">
              <h3>🏆 Global Leaderboard</h3>
              <div className="leaderboard-list">
                {leaderboardData.map((user) => (
                  <div key={user.rank} className={`leaderboard-item ${user.name === 'You' ? 'highlight' : ''}`}>
                    <div className="rank-badge">
                      {user.rank === 1 && '🥇'}
                      {user.rank === 2 && '🥈'}
                      {user.rank === 3 && '🥉'}
                      {user.rank > 3 && user.rank}
                    </div>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-level">{user.level}</div>
                    </div>
                    <div className="user-stats">
                      <span className="stat">🔥 {user.calories}</span>
                      <span className="stat">💪 {user.protein}g</span>
                      <span className="stat">🔥 {user.streak}d</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="friends-section">
              <h3>👫 My Friends</h3>
              
              <div className="add-friend">
                <input
                  type="text"
                  placeholder="Enter friend's username..."
                  value={friendRequest}
                  onChange={(e) => setFriendRequest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFriend()}
                  className="friend-input"
                />
                <button onClick={handleAddFriend} className="add-friend-btn">
                  ➕ Add Friend
                </button>
              </div>

              {friends.length > 0 ? (
                <div className="friends-list">
                  {friends.map((friend) => (
                    <div key={friend.id} className="friend-card">
                      <div className="friend-header">
                        <div className="friend-info">
                          <div className="friend-name">{friend.name}</div>
                          <div className="friend-level">{friend.level}</div>
                        </div>
                        <button
                          onClick={() => handleRemoveFriend(friend.id)}
                          className="remove-friend-btn"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="friend-stats">
                        <div className="friend-stat">
                          <span className="stat-label">Calories</span>
                          <span className="stat-value">{friend.calories}</span>
                        </div>
                        <div className="friend-stat">
                          <span className="stat-label">Protein</span>
                          <span className="stat-value">{friend.protein}g</span>
                        </div>
                        <div className="friend-stat">
                          <span className="stat-label">Streak</span>
                          <span className="stat-value">{friend.streak}d</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-friends">
                  <p>No friends yet. Add your first friend to get started! 👋</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'share' && (
            <div className="share-section">
              <h3>📤 Share Your Progress</h3>
              
              {userStats && (
                <div className="share-card">
                  <div className="share-header">
                    <h4>Today's Achievement</h4>
                    <div className="achievement-badge">{userStats.level}</div>
                  </div>

                  <div className="share-stats">
                    <div className="share-stat">
                      <div className="share-stat-icon">🔥</div>
                      <div className="share-stat-content">
                        <div className="share-stat-label">Calories</div>
                        <div className="share-stat-value">{userStats.calories}</div>
                      </div>
                    </div>
                    <div className="share-stat">
                      <div className="share-stat-icon">💪</div>
                      <div className="share-stat-content">
                        <div className="share-stat-label">Protein</div>
                        <div className="share-stat-value">{userStats.protein}g</div>
                      </div>
                    </div>
                    <div className="share-stat">
                      <div className="share-stat-icon">📝</div>
                      <div className="share-stat-content">
                        <div className="share-stat-label">Logs</div>
                        <div className="share-stat-value">{userStats.logsCount}</div>
                      </div>
                    </div>
                    <div className="share-stat">
                      <div className="share-stat-icon">🔥</div>
                      <div className="share-stat-content">
                        <div className="share-stat-label">Streak</div>
                        <div className="share-stat-value">{userStats.streak}d</div>
                      </div>
                    </div>
                  </div>

                  <button onClick={handleShareProgress} className="share-btn">
                    📤 Share on Social Media
                  </button>

                  <div className="share-message">
                    <p>I logged {userStats.calories} calories and {userStats.protein}g of protein today on NutriWell! 💪</p>
                  </div>
                </div>
              )}

              <div className="share-tips">
                <h4>💡 Sharing Tips</h4>
                <ul>
                  <li>Share your daily progress to stay motivated</li>
                  <li>Inspire your friends with your consistency</li>
                  <li>Build a supportive community</li>
                  <li>Celebrate your milestones together</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialFeatures;

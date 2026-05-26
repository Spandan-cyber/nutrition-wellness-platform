import { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    foodName: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  // Daily goals
  const goals = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fats: 65
  };

  // Calculate totals from logs
  const totals = logs.reduce(
    (acc, log) => ({
      calories: acc.calories + log.calories,
      protein: acc.protein + log.protein,
      carbs: acc.carbs + log.carbs,
      fats: acc.fats + log.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.foodName.trim()) {
      alert('Please enter a food name');
      return;
    }

    const newLog = {
      id: Date.now(),
      foodName: formData.foodName,
      calories: parseFloat(formData.calories) || 0,
      protein: parseFloat(formData.protein) || 0,
      carbs: parseFloat(formData.carbs) || 0,
      fats: parseFloat(formData.fats) || 0,
      timestamp: new Date().toLocaleTimeString()
    };

    setLogs(prev => [newLog, ...prev]);
    
    // Reset form
    setFormData({
      foodName: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: ''
    });
  };

  // Progress bar component
  const ProgressCard = ({ label, current, goal, unit, color }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    
    return (
      <div className="progress-card">
        <div className="progress-header">
          <span className="progress-label">{label}</span>
          <span className="progress-values">
            {current.toFixed(1)} / {goal} {unit}
          </span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: color
            }}
          />
        </div>
        <div className="progress-percentage">{percentage.toFixed(0)}%</div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Nutrition & Wellness Dashboard</h1>
        <p className="dashboard-date">{new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </header>

      {/* Top Section - Progress Cards */}
      <section className="progress-section">
        <ProgressCard 
          label="Calories" 
          current={totals.calories} 
          goal={goals.calories} 
          unit="kcal"
          color="#f59e0b"
        />
        <ProgressCard 
          label="Protein" 
          current={totals.protein} 
          goal={goals.protein} 
          unit="g"
          color="#06b6d4"
        />
        <ProgressCard 
          label="Carbs" 
          current={totals.carbs} 
          goal={goals.carbs} 
          unit="g"
          color="#8b5cf6"
        />
        <ProgressCard 
          label="Fats" 
          current={totals.fats} 
          goal={goals.fats} 
          unit="g"
          color="#ec4899"
        />
      </section>

      {/* Main Content - Form and Logs */}
      <div className="main-content">
        {/* Left Column - Food Logging Form */}
        <section className="form-section">
          <h2>Log New Food</h2>
          <form onSubmit={handleSubmit} className="food-form">
            <div className="form-group">
              <label htmlFor="foodName">Food Name</label>
              <input
                type="text"
                id="foodName"
                name="foodName"
                value={formData.foodName}
                onChange={handleInputChange}
                placeholder="e.g., Grilled Chicken"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="calories">Calories (kcal)</label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={formData.calories}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="protein">Protein (g)</label>
              <input
                type="number"
                id="protein"
                name="protein"
                value={formData.protein}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="carbs">Carbs (g)</label>
              <input
                type="number"
                id="carbs"
                name="carbs"
                value={formData.carbs}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fats">Fats (g)</label>
              <input
                type="number"
                id="fats"
                name="fats"
                value={formData.fats}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="0.1"
              />
            </div>

            <button type="submit" className="submit-button">
              Log Food
            </button>
          </form>
        </section>

        {/* Right Column - Today's Logs */}
        <section className="logs-section">
          <h2>Today's Logs</h2>
          <div className="logs-container">
            {logs.length === 0 ? (
              <p className="empty-state">No food logged yet today. Start tracking your nutrition!</p>
            ) : (
              logs.map(log => (
                <div key={log.id} className="log-item">
                  <div className="log-header">
                    <h3>{log.foodName}</h3>
                    <span className="log-time">{log.timestamp}</span>
                  </div>
                  <div className="log-macros">
                    <span className="macro-badge calories">
                      {log.calories} kcal
                    </span>
                    <span className="macro-badge protein">
                      P: {log.protein}g
                    </span>
                    <span className="macro-badge carbs">
                      C: {log.carbs}g
                    </span>
                    <span className="macro-badge fats">
                      F: {log.fats}g
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

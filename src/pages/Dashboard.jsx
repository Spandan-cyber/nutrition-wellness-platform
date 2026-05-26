import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Dashboard.css';
import apiService from '../services/api.js';
import { searchFoods } from '../data/foodDatabase.js';
import NutritionAI from '../components/NutritionAI.jsx';
import BarcodeScanner from '../components/BarcodeScanner.jsx';
import RecipeBuilder from '../components/RecipeBuilder.jsx';
import MealPlans from '../components/MealPlans.jsx';
import SocialFeatures from '../components/SocialFeatures.jsx';
import { BotIcon, BarcodeIcon, ChefIcon, PlateIcon, UsersIcon } from '../components/Icons.jsx';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    foodName: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    category: 'Breakfast'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [showAlert, setShowAlert] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [weight, setWeight] = useState(0);
  const [weightHistory, setWeightHistory] = useState([]);
  const [showWeightTracker, setShowWeightTracker] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const navigate = useNavigate();

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
      calories: acc.calories + (parseFloat(log.calories) || 0),
      protein: acc.protein + (parseFloat(log.protein) || 0),
      carbs: acc.carbs + (parseFloat(log.carbs) || 0),
      fats: acc.fats + (parseFloat(log.fats) || 0)
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  // Check if over/under calorie goal
  const calorieStatus = () => {
    if (totals.calories > goals.calories * 1.1) return 'over';
    if (totals.calories < goals.calories * 0.9) return 'under';
    return 'good';
  };

  // Group logs by category
  const logsByCategory = () => {
    const grouped = {};
    logs.forEach(log => {
      const cat = log.category || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(log);
    });
    return grouped;
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get date string for a specific day offset
  const getDateForOffset = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split('T')[0];
  };

  // Get day name from date
  const getDayName = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Load weekly analytics
  const loadWeeklyAnalytics = () => {
    try {
      const userId = localStorage.getItem('userId');
      const weekData = [];

      // Get last 7 days
      for (let i = -6; i <= 0; i++) {
        const date = getDateForOffset(i);
        const storageKey = `foodLogs_${userId}_${date}`;
        const storedLogs = localStorage.getItem(storageKey);
        const dayLogs = storedLogs ? JSON.parse(storedLogs) : [];

        const dayTotals = dayLogs.reduce(
          (acc, log) => ({
            calories: acc.calories + (parseFloat(log.calories) || 0),
            protein: acc.protein + (parseFloat(log.protein) || 0),
            carbs: acc.carbs + (parseFloat(log.carbs) || 0),
            fats: acc.fats + (parseFloat(log.fats) || 0)
          }),
          { calories: 0, protein: 0, carbs: 0, fats: 0 }
        );

        weekData.push({
          date,
          day: getDayName(date),
          ...dayTotals,
          logCount: dayLogs.length
        });
      }

      setWeeklyData(weekData);
    } catch (err) {
      console.error('Error loading weekly analytics:', err);
    }
  };

  // Load logs from localStorage
  const loadLogs = () => {
    try {
      const userId = localStorage.getItem('userId');
      const todayDate = getTodayDate();
      const storageKey = `foodLogs_${userId}_${todayDate}`;
      const storedLogs = localStorage.getItem(storageKey);
      
      if (storedLogs) {
        const parsedLogs = JSON.parse(storedLogs);
        setLogs(parsedLogs);
      } else {
        setLogs([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error loading logs:', err);
      setError('Failed to load logs');
      setLogs([]);
    }
  };

  // Load logs on mount
  useEffect(() => {
    // Check if user is authenticated
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    console.log('🔐 Dashboard Auth Check:', { userId, hasToken: !!token });
    
    if (!userId || !token) {
      console.warn('⚠️ User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }

    loadLogs();
    loadWeeklyAnalytics();
    loadWeightHistory();
    
    // Load water intake
    const todayDate = getTodayDate();
    const savedWater = localStorage.getItem(`waterIntake_${todayDate}`);
    if (savedWater) {
      setWaterIntake(parseInt(savedWater));
    }

    apiService.trackPageView('Dashboard');
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingId) {
      setEditData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission (Create or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const currentData = editingId ? editData : formData;
    
    if (!currentData.foodName.trim()) {
      alert('Please enter a food name');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const userId = localStorage.getItem('userId');
      const todayDate = getTodayDate();
      const storageKey = `foodLogs_${userId}_${todayDate}`;
      
      if (editingId) {
        // Edit existing log
        const updatedLogs = logs.map(log => 
          log.id === editingId 
            ? {
                ...log,
                foodName: currentData.foodName.trim(),
                calories: parseFloat(currentData.calories) || 0,
                protein: parseFloat(currentData.protein) || 0,
                carbs: parseFloat(currentData.carbs) || 0,
                fats: parseFloat(currentData.fats) || 0,
                category: currentData.category || 'Breakfast'
              }
            : log
        );
        
        localStorage.setItem(storageKey, JSON.stringify(updatedLogs));
        setLogs(updatedLogs);
        setEditingId(null);
        setEditData(null);
        alert('Food log updated successfully!');
      } else {
        // Create new log
        const newLog = {
          id: Date.now().toString(),
          foodName: currentData.foodName.trim(),
          calories: parseFloat(currentData.calories) || 0,
          protein: parseFloat(currentData.protein) || 0,
          carbs: parseFloat(currentData.carbs) || 0,
          fats: parseFloat(currentData.fats) || 0,
          category: currentData.category || 'Breakfast',
          timestamp: new Date().toISOString(),
          date: todayDate
        };

        const storedLogs = localStorage.getItem(storageKey);
        const existingLogs = storedLogs ? JSON.parse(storedLogs) : [];
        const updatedLogs = [...existingLogs, newLog];
        
        localStorage.setItem(storageKey, JSON.stringify(updatedLogs));
        setLogs(updatedLogs);
        alert('Food logged successfully!');
      }
      
      // Reset form
      setFormData({
        foodName: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        category: 'Breakfast'
      });
      
      setError(null);
      apiService.trackButtonClick('Log Food');
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to log food: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete food log
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this food log?')) {
      try {
        const userId = localStorage.getItem('userId');
        const todayDate = getTodayDate();
        const storageKey = `foodLogs_${userId}_${todayDate}`;
        
        const updatedLogs = logs.filter(log => log.id !== id);
        localStorage.setItem(storageKey, JSON.stringify(updatedLogs));
        setLogs(updatedLogs);
        alert('Food log deleted successfully!');
      } catch (err) {
        console.error('Error deleting log:', err);
        setError('Failed to delete food log');
      }
    }
  };

  // Start editing
  const handleEdit = (log) => {
    setEditingId(log.id);
    setEditData({
      foodName: log.foodName,
      calories: log.calories,
      protein: log.protein,
      carbs: log.carbs,
      fats: log.fats,
      category: log.category || 'Breakfast'
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  // Add water
  const addWater = () => {
    const newWater = waterIntake + 1;
    setWaterIntake(newWater);
    localStorage.setItem(`waterIntake_${getTodayDate()}`, newWater.toString());
    if (newWater >= 8) {
      setShowAlert('🎉 Great job! You\'ve reached your daily water goal!');
      setTimeout(() => setShowAlert(null), 3000);
    }
  };

  // Remove water
  const removeWater = () => {
    if (waterIntake > 0) {
      const newWater = waterIntake - 1;
      setWaterIntake(newWater);
      localStorage.setItem(`waterIntake_${getTodayDate()}`, newWater.toString());
    }
  };

  // Calculate weekly averages
  const getWeeklyAverages = () => {
    if (weeklyData.length === 0) return null;
    
    const totals = weeklyData.reduce(
      (acc, day) => ({
        calories: acc.calories + day.calories,
        protein: acc.protein + day.protein,
        carbs: acc.carbs + day.carbs,
        fats: acc.fats + day.fats,
        logCount: acc.logCount + day.logCount
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, logCount: 0 }
    );

    return {
      avgCalories: (totals.calories / 7).toFixed(0),
      avgProtein: (totals.protein / 7).toFixed(1),
      avgCarbs: (totals.carbs / 7).toFixed(1),
      avgFats: (totals.fats / 7).toFixed(1),
      totalLogs: totals.logCount,
      maxCalories: Math.max(...weeklyData.map(d => d.calories)),
      minCalories: Math.min(...weeklyData.map(d => d.calories))
    };
  };

  // Search foods
  const handleFoodSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchFoods(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Select food from search
  const selectFood = (food) => {
    setFormData({
      ...formData,
      foodName: food.name,
      calories: food.calories.toString(),
      protein: food.protein.toString(),
      carbs: food.carbs.toString(),
      fats: food.fats.toString()
    });
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
  };

  // Add weight
  const addWeight = () => {
    if (weight > 0) {
      const todayDate = getTodayDate();
      const storageKey = `weightHistory_${localStorage.getItem('userId')}`;
      const history = weightHistory.length > 0 ? weightHistory : [];
      
      const newEntry = {
        date: todayDate,
        weight: parseFloat(weight),
        timestamp: new Date().toISOString()
      };

      const updatedHistory = [...history, newEntry];
      localStorage.setItem(storageKey, JSON.stringify(updatedHistory));
      setWeightHistory(updatedHistory);
      setWeight(0);
      alert('Weight logged successfully!');
    }
  };

  // Load weight history
  const loadWeightHistory = () => {
    try {
      const userId = localStorage.getItem('userId');
      const storageKey = `weightHistory_${userId}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setWeightHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error loading weight history:', err);
    }
  };



  // Handle barcode selection
  const handleBarcodeSelect = (food) => {
    setFormData({
      ...formData,
      foodName: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fats: food.fats
    });
  };

  // Handle recipe selection
  const handleRecipeSelect = (recipe) => {
    setFormData({
      ...formData,
      foodName: recipe.name,
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fats: recipe.fats
    });
  };

  // Progress bar component - Status Badge Style
  const ProgressCard = ({ label, current, goal, unit, color }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    
    // Determine status
    let status = 'empty';
    if (percentage >= 100) status = 'complete';
    else if (percentage >= 75) status = 'almost';
    else if (percentage >= 50) status = 'halfway';
    else if (percentage > 0) status = 'started';
    
    return (
      <div className="progress-card">
        <div className="progress-header">
          <span className="progress-label">{label}</span>
          <span className="progress-values">
            {current.toFixed(1)} / {goal} {unit}
          </span>
        </div>
        <div className="status-badge-container">
          <div className={`status-badge status-${status}`} style={{ '--badge-color': color }}>
            <div className="badge-content">
              <span className="badge-percentage">{percentage.toFixed(0)}%</span>
              <span className="badge-status">
                {percentage >= 100 ? '✓ Complete' : 
                 percentage >= 75 ? 'Almost there' : 
                 percentage >= 50 ? 'Halfway' : 
                 percentage > 0 ? 'Started' : 'Not started'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-top">
          <div>
            <h1>Nutrition & Wellness Dashboard</h1>
            <p className="dashboard-date">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="header-buttons">
            <button 
              className="ai-button"
              onClick={() => setShowAI(true)}
              title="Open AI Assistant"
            >
              <BotIcon size={20} color="white" />
            </button>
            <button 
              className="barcode-button"
              onClick={() => setShowBarcode(true)}
              title="Scan Barcode"
            >
              <BarcodeIcon size={20} color="white" />
            </button>
            <button 
              className="recipe-button"
              onClick={() => setShowRecipe(true)}
              title="Recipe Builder"
            >
              <ChefIcon size={20} color="white" />
            </button>
            <button 
              className="mealplan-button"
              onClick={() => setShowMealPlan(true)}
              title="Meal Plans"
            >
              <PlateIcon size={20} color="white" />
            </button>
            <button 
              className="social-button"
              onClick={() => setShowSocial(true)}
              title="Social Features"
            >
              <UsersIcon size={20} color="white" />
            </button>

          </div>
        </div>
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

      {/* Analytics Toggle Button */}
      <div className="analytics-toggle">
        <button 
          className="toggle-btn"
          onClick={() => {
            setShowAnalytics(!showAnalytics);
            if (!showAnalytics) loadWeeklyAnalytics();
          }}
        >
          {showAnalytics ? '📊 Hide Analytics' : '📊 View Weekly Analytics'}
        </button>
      </div>

      {/* Weekly Analytics Section */}
      {showAnalytics && (
        <section className="analytics-section">
          <h2>📊 Weekly Analytics</h2>
          {weeklyData.length > 0 && getWeeklyAverages() && (
            <>
              {/* Summary Cards */}
              <div className="analytics-summary">
                <div className="summary-card">
                  <div className="summary-icon">🔥</div>
                  <div className="summary-content">
                    <div className="summary-label">Avg Calories</div>
                    <div className="summary-value">{getWeeklyAverages().avgCalories}</div>
                    <div className="summary-detail">kcal/day</div>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon">💪</div>
                  <div className="summary-content">
                    <div className="summary-label">Avg Protein</div>
                    <div className="summary-value">{getWeeklyAverages().avgProtein}</div>
                    <div className="summary-detail">g/day</div>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon">⚡</div>
                  <div className="summary-content">
                    <div className="summary-label">Avg Carbs</div>
                    <div className="summary-value">{getWeeklyAverages().avgCarbs}</div>
                    <div className="summary-detail">g/day</div>
                  </div>
                </div>
                <div className="summary-card">
                  <div className="summary-icon">🧈</div>
                  <div className="summary-content">
                    <div className="summary-label">Avg Fats</div>
                    <div className="summary-value">{getWeeklyAverages().avgFats}</div>
                    <div className="summary-detail">g/day</div>
                  </div>
                </div>
              </div>

              {/* Daily Breakdown */}
              <div className="daily-breakdown">
                <h3>Daily Breakdown</h3>
                <div className="daily-chart">
                  {weeklyData.map((day, idx) => (
                    <div key={idx} className="daily-bar">
                      <div className="bar-label">{day.day}</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill"
                          style={{ 
                            height: `${(day.calories / goals.calories) * 100}%`,
                            backgroundColor: day.calories > goals.calories * 1.1 ? '#ef4444' : 
                                           day.calories < goals.calories * 0.9 ? '#fbbf24' : '#10b981'
                          }}
                          title={`${day.calories} cal`}
                        ></div>
                      </div>
                      <div className="bar-value">{day.calories}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="analytics-stats">
                <div className="stat">
                  <span className="stat-label">Total Logs:</span>
                  <span className="stat-value">{getWeeklyAverages().totalLogs}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Highest Day:</span>
                  <span className="stat-value">{getWeeklyAverages().maxCalories} cal</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Lowest Day:</span>
                  <span className="stat-value">{getWeeklyAverages().minCalories} cal</span>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* Main Content - Form and Logs */}
      <div className="main-content">
        {/* Left Column - Food Logging Form */}
        <section className="form-section">
          <h2>{editingId ? '✏️ Edit Food' : '🍽️ Log New Food'}</h2>
          {error && <div className="error-message">{error}</div>}
          {showAlert && <div className="success-message">{showAlert}</div>}
          
          {/* Food Search */}
          <div className="food-search">
            <button 
              className="search-toggle-btn"
              onClick={() => setShowSearch(!showSearch)}
            >
              🔍 {showSearch ? 'Hide' : 'Search'} Food Database
            </button>
            
            {showSearch && (
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => handleFoodSearch(e.target.value)}
                  className="search-input"
                />
                {searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map((food, idx) => (
                      <div 
                        key={idx}
                        className="search-result-item"
                        onClick={() => selectFood(food)}
                      >
                        <div className="result-name">{food.name}</div>
                        <div className="result-macros">
                          {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="food-form">
            <div className="form-group">
              <label htmlFor="category">Meal Category</label>
              <select
                id="category"
                name="category"
                value={editingId ? editData?.category : formData.category}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="Breakfast">🌅 Breakfast</option>
                <option value="Lunch">🌞 Lunch</option>
                <option value="Dinner">🌙 Dinner</option>
                <option value="Snack">🍿 Snack</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="foodName">Food Name</label>
              <input
                type="text"
                id="foodName"
                name="foodName"
                value={editingId ? editData?.foodName : formData.foodName}
                onChange={handleInputChange}
                placeholder="e.g., Grilled Chicken"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="calories">Calories (kcal)</label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={editingId ? editData?.calories : formData.calories}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="0.1"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="protein">Protein (g)</label>
              <input
                type="number"
                id="protein"
                name="protein"
                value={editingId ? editData?.protein : formData.protein}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="0.1"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="carbs">Carbs (g)</label>
              <input
                type="number"
                id="carbs"
                name="carbs"
                value={editingId ? editData?.carbs : formData.carbs}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="0.1"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fats">Fats (g)</label>
              <input
                type="number"
                id="fats"
                name="fats"
                value={editingId ? editData?.fats : formData.fats}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                step="0.1"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Saving...' : editingId ? '✏️ Update Food' : '➕ Log Food'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  ✕ Cancel
                </button>
              )}
            </div>
          </form>

          {/* Water Tracker */}
          <div className="water-tracker">
            <h3>💧 Water Intake</h3>
            <div className="water-display">
              <div className="water-count">{waterIntake}/8</div>
              <div className="water-label">glasses</div>
            </div>
            <div className="water-buttons">
              <button onClick={addWater} className="water-add-btn" disabled={loading}>
                ➕ Add Water
              </button>
              <button onClick={removeWater} className="water-remove-btn" disabled={loading || waterIntake === 0}>
                ➖ Remove
              </button>
            </div>
            <div className="water-progress">
              <div className="water-bar" style={{ width: `${(waterIntake / 8) * 100}%` }}></div>
            </div>
          </div>

          {/* Weight Tracker */}
          <div className="weight-tracker">
            <h3>⚖️ Weight Tracker</h3>
            <div className="weight-input-group">
              <input
                type="number"
                placeholder="Enter weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                step="0.1"
                min="0"
                className="weight-input"
              />
              <button 
                onClick={addWeight}
                className="weight-add-btn"
                disabled={weight <= 0}
              >
                ➕ Log Weight
              </button>
            </div>
            
            {weightHistory.length > 0 && (
              <div className="weight-history">
                <h4>Recent Weights</h4>
                <div className="weight-list">
                  {weightHistory.slice(-5).reverse().map((entry, idx) => (
                    <div key={idx} className="weight-entry">
                      <span className="weight-date">{new Date(entry.date).toLocaleDateString()}</span>
                      <span className="weight-value">{entry.weight} kg</span>
                    </div>
                  ))}
                </div>
                {weightHistory.length > 1 && (
                  <div className="weight-change">
                    <span>Change: </span>
                    <span className={weightHistory[weightHistory.length - 1].weight < weightHistory[0].weight ? 'positive' : 'negative'}>
                      {(weightHistory[weightHistory.length - 1].weight - weightHistory[0].weight).toFixed(1)} kg
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Right Column - Today's Logs */}
        <section className="logs-section">
          <h2>📝 Today's Logs</h2>
          <div className="logs-container">
            {loading && logs.length === 0 ? (
              <p className="empty-state">Loading logs...</p>
            ) : logs.length === 0 ? (
              <p className="empty-state">No food logged yet today. Start tracking your nutrition!</p>
            ) : (
              Object.entries(logsByCategory()).map(([category, categoryLogs]) => (
                <div key={category} className="category-section">
                  <h3 className="category-title">
                    {category === 'Breakfast' && '🌅'}
                    {category === 'Lunch' && '🌞'}
                    {category === 'Dinner' && '🌙'}
                    {category === 'Snack' && '🍿'}
                    {category === 'Other' && '🍽️'}
                    {' '}{category}
                  </h3>
                  {categoryLogs.map(log => (
                    <div key={log.id} className="log-item">
                      <div className="log-header">
                        <h3>{log.foodName}</h3>
                        <span className="log-time">{new Date(log.timestamp).toLocaleTimeString()}</span>
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
                      <div className="log-actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(log)}
                          title="Edit this log"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(log.id)}
                          title="Delete this log"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* NutritionAI Modal */}
      <NutritionAI isOpen={showAI} onClose={() => setShowAI(false)} />

      {/* BarcodeScanner Modal */}
      <BarcodeScanner 
        isOpen={showBarcode} 
        onClose={() => setShowBarcode(false)}
        onSelectFood={handleBarcodeSelect}
      />

      {/* RecipeBuilder Modal */}
      <RecipeBuilder 
        isOpen={showRecipe} 
        onClose={() => setShowRecipe(false)}
        onSelectRecipe={handleRecipeSelect}
      />

      {/* MealPlans Modal */}
      <MealPlans 
        isOpen={showMealPlan} 
        onClose={() => setShowMealPlan(false)}
      />

      {/* SocialFeatures Modal */}
      <SocialFeatures 
        isOpen={showSocial} 
        onClose={() => setShowSocial(false)}
      />
    </div>
  );
};

export default Dashboard;

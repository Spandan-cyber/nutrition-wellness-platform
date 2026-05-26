import { useState } from 'react';
import '../Resources.css';

const CalorieCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'moderate'
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateCalories = (e) => {
    e.preventDefault();
    
    const { age, gender, height, weight, activityLevel } = formData;
    
    if (!age || !height || !weight) {
      alert('Please fill in all fields');
      return;
    }

    // Harris-Benedict Formula
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: Math.round(tdee - 500),
      weightGain: Math.round(tdee + 500),
      macros: {
        protein: Math.round((tdee * 0.3) / 4),
        carbs: Math.round((tdee * 0.45) / 4),
        fats: Math.round((tdee * 0.25) / 9)
      }
    });
  };

  return (
    <div className="resource-detail-page">
      <div className="resource-hero">
        <h1>🧮 Calorie Calculator</h1>
        <p>Calculate your daily caloric needs</p>
      </div>

      <div className="resource-content">
        <section className="guide-section">
          <h2>Calculate Your Daily Calories</h2>
          
          <form className="calculator-form" onSubmit={calculateCalories}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age (years)</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                  min="1"
                  max="120"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="180"
                  min="100"
                  max="250"
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="75"
                  min="30"
                  max="300"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="activityLevel">Activity Level</label>
              <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="veryActive">Very Active (intense exercise daily)</option>
              </select>
            </div>

            <button type="submit" className="calculate-btn">Calculate</button>
          </form>

          {result && (
            <div className="calculator-result">
              <h3>Your Results</h3>
              
              <div className="result-card">
                <h4>Basal Metabolic Rate (BMR)</h4>
                <p className="result-value">{result.bmr} calories/day</p>
                <p className="result-desc">Calories burned at rest</p>
              </div>

              <div className="result-card">
                <h4>Total Daily Energy Expenditure (TDEE)</h4>
                <p className="result-value">{result.tdee} calories/day</p>
                <p className="result-desc">Calories burned with your activity level</p>
              </div>

              <div className="result-card">
                <h4>Weight Loss Goal</h4>
                <p className="result-value">{result.weightLoss} calories/day</p>
                <p className="result-desc">500 calorie deficit for ~0.5kg loss per week</p>
              </div>

              <div className="result-card">
                <h4>Weight Gain Goal</h4>
                <p className="result-value">{result.weightGain} calories/day</p>
                <p className="result-desc">500 calorie surplus for ~0.5kg gain per week</p>
              </div>

              <div className="macros-breakdown">
                <h4>Recommended Macro Split (30% Protein, 45% Carbs, 25% Fats)</h4>
                <div className="macros-grid">
                  <div className="macro-card">
                    <span className="macro-name">Protein</span>
                    <span className="macro-amount">{result.macros.protein}g</span>
                  </div>
                  <div className="macro-card">
                    <span className="macro-name">Carbs</span>
                    <span className="macro-amount">{result.macros.carbs}g</span>
                  </div>
                  <div className="macro-card">
                    <span className="macro-name">Fats</span>
                    <span className="macro-amount">{result.macros.fats}g</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CalorieCalculator;

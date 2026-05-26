import { useState } from 'react';
import '../Resources.css';

const BMICalculator = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    unit: 'metric'
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateBMI = (e) => {
    e.preventDefault();
    
    const { height, weight, unit } = formData;
    
    if (!height || !weight) {
      alert('Please fill in all fields');
      return;
    }

    let bmi;
    if (unit === 'metric') {
      // BMI = weight (kg) / (height (m))^2
      const heightInMeters = height / 100;
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      // BMI = (weight (lbs) / (height (inches))^2) * 703
      bmi = (weight / (height * height)) * 703;
    }

    let category, color, advice;
    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#3b82f6';
      advice = 'Consider consulting a healthcare provider about healthy weight gain strategies.';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      color = '#10b981';
      advice = 'Great! Maintain your current lifestyle with balanced nutrition and regular exercise.';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = '#f59e0b';
      advice = 'Consider increasing physical activity and reviewing your diet for healthier choices.';
    } else {
      category = 'Obese';
      color = '#ef4444';
      advice = 'Consult a healthcare provider for personalized weight management strategies.';
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      color,
      advice
    });
  };

  return (
    <div className="resource-detail-page">
      <div className="resource-hero">
        <h1>⚖️ BMI Calculator</h1>
        <p>Check your body mass index</p>
      </div>

      <div className="resource-content">
        <section className="guide-section">
          <h2>Calculate Your BMI</h2>
          
          <form className="calculator-form" onSubmit={calculateBMI}>
            <div className="form-group">
              <label htmlFor="unit">Unit System</label>
              <select name="unit" value={formData.unit} onChange={handleChange}>
                <option value="metric">Metric (kg, cm)</option>
                <option value="imperial">Imperial (lbs, inches)</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">
                  Height ({formData.unit === 'metric' ? 'cm' : 'inches'})
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder={formData.unit === 'metric' ? '180' : '70'}
                  min="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">
                  Weight ({formData.unit === 'metric' ? 'kg' : 'lbs'})
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder={formData.unit === 'metric' ? '75' : '165'}
                  min="1"
                />
              </div>
            </div>

            <button type="submit" className="calculate-btn">Calculate BMI</button>
          </form>

          {result && (
            <div className="bmi-result">
              <div className="bmi-display" style={{ borderColor: result.color }}>
                <h3>Your BMI</h3>
                <p className="bmi-value" style={{ color: result.color }}>{result.bmi}</p>
                <p className="bmi-category" style={{ color: result.color }}>{result.category}</p>
              </div>

              <div className="bmi-advice">
                <h4>Recommendation</h4>
                <p>{result.advice}</p>
              </div>

              <div className="bmi-chart">
                <h4>BMI Categories</h4>
                <div className="category-item">
                  <span className="category-label">Underweight</span>
                  <span className="category-range">BMI &lt; 18.5</span>
                </div>
                <div className="category-item">
                  <span className="category-label">Normal Weight</span>
                  <span className="category-range">BMI 18.5 - 24.9</span>
                </div>
                <div className="category-item">
                  <span className="category-label">Overweight</span>
                  <span className="category-range">BMI 25 - 29.9</span>
                </div>
                <div className="category-item">
                  <span className="category-label">Obese</span>
                  <span className="category-range">BMI ≥ 30</span>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="guide-section">
          <h2>About BMI</h2>
          <div className="guide-card">
            <h3>What is BMI?</h3>
            <p>Body Mass Index (BMI) is a measure of body fat based on height and weight. It's calculated as weight (kg) divided by height (m) squared.</p>
          </div>

          <div className="guide-card">
            <h3>Important Notes</h3>
            <ul className="tips-list">
              <li>✓ BMI is a screening tool, not a diagnostic measure</li>
              <li>✓ It doesn't account for muscle mass vs. fat mass</li>
              <li>✓ Athletes may have high BMI due to muscle</li>
              <li>✓ Consult a healthcare provider for personalized advice</li>
              <li>✓ BMI is most accurate for adults 18-65 years old</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BMICalculator;

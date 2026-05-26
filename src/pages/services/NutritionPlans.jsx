import './ServicePage.css';

const NutritionPlans = () => {
  return (
    <div className="service-detail-page">
      <div className="service-detail-hero">
        <h1>🥗 Personalized Nutrition Plans</h1>
        <p>Custom meal plans designed by certified nutritionists</p>
      </div>
      <div className="service-detail-content">
        <h2>What's Included</h2>
        <ul className="feature-list">
          <li>✓ Custom macro calculations based on your goals</li>
          <li>✓ Weekly meal plans with recipes</li>
          <li>✓ Grocery shopping lists</li>
          <li>✓ Nutritionist consultations</li>
          <li>✓ Progress tracking and adjustments</li>
        </ul>
        <h2>Plans Available</h2>
        <div className="plans-grid">
          <div className="plan-card">
            <h3>Weight Loss</h3>
            <p>Sustainable calorie deficit with balanced macros</p>
          </div>
          <div className="plan-card">
            <h3>Muscle Gain</h3>
            <p>High protein plans for building lean muscle</p>
          </div>
          <div className="plan-card">
            <h3>Maintenance</h3>
            <p>Balanced nutrition for overall health</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPlans;

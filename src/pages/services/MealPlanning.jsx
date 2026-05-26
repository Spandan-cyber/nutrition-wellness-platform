import './ServicePage.css';

const MealPlanning = () => {
  return (
    <div className="service-detail-page">
      <div className="service-detail-hero">
        <h1>🍽️ Meal Planning</h1>
        <p>Smart meal planning with recipes and shopping lists</p>
      </div>
      <div className="service-detail-content">
        <h2>Benefits</h2>
        <ul className="feature-list">
          <li>✓ Weekly meal plans</li>
          <li>✓ Hundreds of healthy recipes</li>
          <li>✓ Automated shopping lists</li>
          <li>✓ Meal prep instructions</li>
          <li>✓ Dietary preference filters</li>
        </ul>
      </div>
    </div>
  );
};

export default MealPlanning;

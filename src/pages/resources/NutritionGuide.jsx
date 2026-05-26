import '../Resources.css';

const NutritionGuide = () => {
  return (
    <div className="resource-detail-page">
      <div className="resource-hero">
        <h1>📚 Nutrition Guide</h1>
        <p>Complete guide to macronutrients and micronutrients</p>
      </div>

      <div className="resource-content">
        <section className="guide-section">
          <h2>Macronutrients</h2>
          
          <div className="guide-card">
            <h3>Proteins</h3>
            <p><strong>Role:</strong> Build and repair muscles, enzymes, and hormones</p>
            <p><strong>Daily Intake:</strong> 0.8-1g per pound of body weight</p>
            <p><strong>Sources:</strong> Chicken, fish, eggs, beans, tofu, Greek yogurt</p>
            <p><strong>Calories:</strong> 4 calories per gram</p>
          </div>

          <div className="guide-card">
            <h3>Carbohydrates</h3>
            <p><strong>Role:</strong> Primary energy source for the body and brain</p>
            <p><strong>Daily Intake:</strong> 45-65% of total calories</p>
            <p><strong>Sources:</strong> Whole grains, fruits, vegetables, legumes</p>
            <p><strong>Calories:</strong> 4 calories per gram</p>
          </div>

          <div className="guide-card">
            <h3>Fats</h3>
            <p><strong>Role:</strong> Energy storage, hormone production, nutrient absorption</p>
            <p><strong>Daily Intake:</strong> 20-35% of total calories</p>
            <p><strong>Sources:</strong> Olive oil, nuts, avocados, fatty fish, seeds</p>
            <p><strong>Calories:</strong> 9 calories per gram</p>
          </div>
        </section>

        <section className="guide-section">
          <h2>Micronutrients</h2>
          
          <div className="guide-card">
            <h3>Vitamins</h3>
            <p><strong>Vitamin A:</strong> Vision, immune function - Carrots, sweet potatoes</p>
            <p><strong>Vitamin C:</strong> Immune support, collagen - Citrus, berries, peppers</p>
            <p><strong>Vitamin D:</strong> Bone health, calcium absorption - Sunlight, fatty fish</p>
            <p><strong>B Vitamins:</strong> Energy metabolism - Whole grains, meat, eggs</p>
          </div>

          <div className="guide-card">
            <h3>Minerals</h3>
            <p><strong>Iron:</strong> Oxygen transport - Red meat, spinach, legumes</p>
            <p><strong>Calcium:</strong> Bone health - Dairy, leafy greens, fortified foods</p>
            <p><strong>Potassium:</strong> Heart health - Bananas, potatoes, beans</p>
            <p><strong>Magnesium:</strong> Muscle function - Nuts, seeds, whole grains</p>
          </div>
        </section>

        <section className="guide-section">
          <h2>Nutrition Tips</h2>
          <ul className="tips-list">
            <li>✓ Eat a variety of colorful foods to get different nutrients</li>
            <li>✓ Balance macronutrients at each meal</li>
            <li>✓ Stay hydrated - drink at least 8 glasses of water daily</li>
            <li>✓ Read nutrition labels to understand portion sizes</li>
            <li>✓ Plan meals ahead to make healthier choices</li>
            <li>✓ Limit processed foods and added sugars</li>
            <li>✓ Include fiber-rich foods for digestive health</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default NutritionGuide;

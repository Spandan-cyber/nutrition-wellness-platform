import '../Resources.css';

const MealPrepTips = () => {
  return (
    <div className="resource-detail-page">
      <div className="resource-hero">
        <h1>🥘 Meal Prep Tips</h1>
        <p>Save time with effective meal preparation strategies</p>
      </div>

      <div className="resource-content">
        <section className="guide-section">
          <h2>Getting Started with Meal Prep</h2>
          
          <div className="guide-card">
            <h3>Step 1: Plan Your Meals</h3>
            <p>Decide what meals you'll prepare for the week. Aim for 3-4 different meals to avoid boredom.</p>
            <p>Consider your macronutrient goals and dietary preferences.</p>
          </div>

          <div className="guide-card">
            <h3>Step 2: Make a Shopping List</h3>
            <p>List all ingredients needed for your planned meals.</p>
            <p>Buy in bulk for better prices and less packaging waste.</p>
          </div>

          <div className="guide-card">
            <h3>Step 3: Prep Your Ingredients</h3>
            <p>Wash, chop, and portion vegetables and proteins.</p>
            <p>Cook grains and proteins in bulk to save time during the week.</p>
          </div>
        </section>

        <section className="guide-section">
          <h2>Best Practices</h2>
          
          <div className="guide-card">
            <h3>Storage Tips</h3>
            <ul className="tips-list">
              <li>✓ Use glass containers - they last longer and don't stain</li>
              <li>✓ Label containers with date and contents</li>
              <li>✓ Store in the coldest part of your fridge</li>
              <li>✓ Most meals last 3-4 days in the fridge</li>
              <li>✓ Freeze meals for longer storage (up to 3 months)</li>
            </ul>
          </div>

          <div className="guide-card">
            <h3>Time-Saving Hacks</h3>
            <ul className="tips-list">
              <li>✓ Use a slow cooker or instant pot for hands-off cooking</li>
              <li>✓ Prep multiple meals simultaneously</li>
              <li>✓ Buy pre-cut vegetables to save time</li>
              <li>✓ Cook double portions at dinner for next day's lunch</li>
              <li>✓ Use frozen vegetables - just as nutritious as fresh</li>
            </ul>
          </div>
        </section>

        <section className="guide-section">
          <h2>Easy Meal Prep Ideas</h2>
          
          <div className="guide-card">
            <h3>Breakfast Prep</h3>
            <p><strong>Overnight Oats:</strong> Mix oats, milk, yogurt, and toppings in jars</p>
            <p><strong>Egg Muffins:</strong> Bake eggs with vegetables in muffin tins</p>
            <p><strong>Smoothie Packs:</strong> Freeze fruit and greens in bags</p>
          </div>

          <div className="guide-card">
            <h3>Lunch & Dinner Prep</h3>
            <p><strong>Grain Bowls:</strong> Combine grains, protein, and vegetables</p>
            <p><strong>Sheet Pan Meals:</strong> Roast protein and veggies together</p>
            <p><strong>Slow Cooker Meals:</strong> Set and forget for tender, flavorful dishes</p>
          </div>

          <div className="guide-card">
            <h3>Snack Prep</h3>
            <p><strong>Protein Boxes:</strong> Nuts, cheese, fruit, and crackers</p>
            <p><strong>Energy Balls:</strong> Dates, nuts, and protein powder</p>
            <p><strong>Veggie Packs:</strong> Cut vegetables with hummus or dip</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MealPrepTips;

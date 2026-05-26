import '../Resources.css';

const RecipeDatabase = () => {
  const recipes = [
    {
      name: 'Grilled Chicken Salad',
      calories: 350,
      protein: 45,
      carbs: 15,
      fats: 10,
      ingredients: ['Chicken breast', 'Mixed greens', 'Tomatoes', 'Cucumber', 'Olive oil dressing'],
      instructions: '1. Grill chicken breast until cooked. 2. Chop vegetables. 3. Combine and dress with olive oil.'
    },
    {
      name: 'Salmon & Broccoli',
      calories: 420,
      protein: 40,
      carbs: 30,
      fats: 15,
      ingredients: ['Salmon fillet', 'Broccoli', 'Lemon', 'Olive oil', 'Garlic'],
      instructions: '1. Bake salmon at 400°F for 15 min. 2. Steam broccoli. 3. Season with lemon and garlic.'
    },
    {
      name: 'Quinoa Buddha Bowl',
      calories: 380,
      protein: 15,
      carbs: 50,
      fats: 12,
      ingredients: ['Quinoa', 'Chickpeas', 'Sweet potato', 'Kale', 'Tahini dressing'],
      instructions: '1. Cook quinoa. 2. Roast sweet potato and chickpeas. 3. Assemble bowl with kale and dressing.'
    },
    {
      name: 'Turkey Meatballs',
      calories: 280,
      protein: 35,
      carbs: 20,
      fats: 8,
      ingredients: ['Ground turkey', 'Oats', 'Egg', 'Tomato sauce', 'Herbs'],
      instructions: '1. Mix turkey with oats and egg. 2. Form meatballs. 3. Bake at 375°F for 20 min. 4. Serve with sauce.'
    },
    {
      name: 'Vegetable Stir Fry',
      calories: 250,
      protein: 12,
      carbs: 35,
      fats: 8,
      ingredients: ['Mixed vegetables', 'Tofu', 'Brown rice', 'Soy sauce', 'Ginger'],
      instructions: '1. Cook rice. 2. Stir fry vegetables and tofu. 3. Add soy sauce and ginger. 4. Serve over rice.'
    },
    {
      name: 'Protein Pancakes',
      calories: 320,
      protein: 25,
      carbs: 40,
      fats: 6,
      ingredients: ['Protein powder', 'Eggs', 'Oats', 'Banana', 'Berries'],
      instructions: '1. Blend protein powder, eggs, and oats. 2. Cook on griddle. 3. Top with banana and berries.'
    }
  ];

  return (
    <div className="resource-detail-page">
      <div className="resource-hero">
        <h1>🍳 Recipe Database</h1>
        <p>500+ healthy recipes with nutrition info</p>
      </div>

      <div className="resource-content">
        <section className="guide-section">
          <h2>Featured Recipes</h2>
          <div className="recipes-grid">
            {recipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <h3>{recipe.name}</h3>
                <div className="recipe-macros">
                  <div className="macro">
                    <span className="macro-label">Calories</span>
                    <span className="macro-value">{recipe.calories}</span>
                  </div>
                  <div className="macro">
                    <span className="macro-label">Protein</span>
                    <span className="macro-value">{recipe.protein}g</span>
                  </div>
                  <div className="macro">
                    <span className="macro-label">Carbs</span>
                    <span className="macro-value">{recipe.carbs}g</span>
                  </div>
                  <div className="macro">
                    <span className="macro-label">Fats</span>
                    <span className="macro-value">{recipe.fats}g</span>
                  </div>
                </div>
                <div className="recipe-details">
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                  <h4>Instructions:</h4>
                  <p>{recipe.instructions}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="guide-section">
          <h2>Recipe Tips</h2>
          <ul className="tips-list">
            <li>✓ Prep ingredients before cooking to save time</li>
            <li>✓ Use fresh, whole ingredients whenever possible</li>
            <li>✓ Experiment with herbs and spices for flavor without calories</li>
            <li>✓ Batch cook and freeze portions for easy meals</li>
            <li>✓ Substitute ingredients based on dietary preferences</li>
            <li>✓ Track macros to align with your fitness goals</li>
            <li>✓ Don't be afraid to try new recipes and cuisines</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RecipeDatabase;

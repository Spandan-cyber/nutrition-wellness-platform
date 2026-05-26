import { useState } from 'react';
import { searchRecipes, getAllRecipes } from '../data/recipeDatabase.js';
import './RecipeBuilder.css';

const RecipeBuilder = ({ isOpen, onClose, onSelectRecipe }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(getAllRecipes());
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [servings, setServings] = useState(1);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchRecipes(query);
      setSearchResults(results);
    } else {
      setSearchResults(getAllRecipes());
    }
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleAddRecipe = () => {
    if (selectedRecipe) {
      const caloriesPerServing = (selectedRecipe.totalCalories / selectedRecipe.servings) * servings;
      const proteinPerServing = (selectedRecipe.totalProtein / selectedRecipe.servings) * servings;
      const carbsPerServing = (selectedRecipe.totalCarbs / selectedRecipe.servings) * servings;
      const fatsPerServing = (selectedRecipe.totalFats / selectedRecipe.servings) * servings;

      onSelectRecipe({
        name: `${selectedRecipe.name} (${servings} serving${servings > 1 ? 's' : ''})`,
        calories: caloriesPerServing.toFixed(1),
        protein: proteinPerServing.toFixed(1),
        carbs: carbsPerServing.toFixed(1),
        fats: fatsPerServing.toFixed(1)
      });

      setSelectedRecipe(null);
      setSearchQuery('');
      setSearchResults(getAllRecipes());
      setServings(1);
      onClose();
    }
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  if (!isOpen) return null;

  return (
    <div className="recipe-modal-overlay" onClick={onClose}>
      <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
        <div className="recipe-header">
          <h2>👨‍🍳 Recipe Builder</h2>
          <button className="recipe-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="recipe-content">
          {!selectedRecipe ? (
            <>
              <div className="recipe-search">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="recipe-search-input"
                />
              </div>

              <div className="recipe-list">
                {searchResults.length > 0 ? (
                  searchResults.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="recipe-item"
                      onClick={() => handleSelectRecipe(recipe)}
                    >
                      <div className="recipe-item-header">
                        <h3>{recipe.name}</h3>
                        <span className="recipe-category">{recipe.category}</span>
                      </div>
                      <div className="recipe-item-macros">
                        <span className="macro-badge">
                          {recipe.totalCalories} cal
                        </span>
                        <span className="macro-badge">
                          P: {recipe.totalProtein.toFixed(1)}g
                        </span>
                        <span className="macro-badge">
                          C: {recipe.totalCarbs.toFixed(1)}g
                        </span>
                        <span className="macro-badge">
                          F: {recipe.totalFats.toFixed(1)}g
                        </span>
                      </div>
                      <div className="recipe-item-servings">
                        Servings: {recipe.servings}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-results">No recipes found</p>
                )}
              </div>
            </>
          ) : (
            <div className="recipe-detail">
              <button className="back-btn" onClick={handleBack}>
                ← Back
              </button>

              <div className="recipe-detail-header">
                <h2>{selectedRecipe.name}</h2>
                <span className="recipe-category">{selectedRecipe.category}</span>
              </div>

              <div className="servings-selector">
                <label htmlFor="servings">Servings:</label>
                <div className="servings-control">
                  <button
                    onClick={() => setServings(Math.max(0.5, servings - 0.5))}
                    className="servings-btn"
                  >
                    −
                  </button>
                  <input
                    id="servings"
                    type="number"
                    value={servings}
                    onChange={(e) => setServings(Math.max(0.5, parseFloat(e.target.value) || 1))}
                    min="0.5"
                    step="0.5"
                    className="servings-input"
                  />
                  <button
                    onClick={() => setServings(servings + 0.5)}
                    className="servings-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="recipe-macros">
                <h3>Nutritional Info (Total)</h3>
                <div className="macros-grid">
                  <div className="macro-card">
                    <div className="macro-icon">🔥</div>
                    <div className="macro-value">
                      {((selectedRecipe.totalCalories / selectedRecipe.servings) * servings).toFixed(0)}
                    </div>
                    <div className="macro-label">Calories</div>
                  </div>
                  <div className="macro-card">
                    <div className="macro-icon">💪</div>
                    <div className="macro-value">
                      {((selectedRecipe.totalProtein / selectedRecipe.servings) * servings).toFixed(1)}g
                    </div>
                    <div className="macro-label">Protein</div>
                  </div>
                  <div className="macro-card">
                    <div className="macro-icon">⚡</div>
                    <div className="macro-value">
                      {((selectedRecipe.totalCarbs / selectedRecipe.servings) * servings).toFixed(1)}g
                    </div>
                    <div className="macro-label">Carbs</div>
                  </div>
                  <div className="macro-card">
                    <div className="macro-icon">🧈</div>
                    <div className="macro-value">
                      {((selectedRecipe.totalFats / selectedRecipe.servings) * servings).toFixed(1)}g
                    </div>
                    <div className="macro-label">Fats</div>
                  </div>
                </div>
              </div>

              <div className="recipe-ingredients">
                <h3>Ingredients</h3>
                <ul className="ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>
                      {ingredient.name} - {ingredient.amount} {ingredient.unit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="recipe-instructions">
                <h3>Instructions</h3>
                <p>{selectedRecipe.instructions}</p>
              </div>

              <div className="recipe-actions">
                <button
                  onClick={handleAddRecipe}
                  className="add-recipe-btn"
                >
                  ✅ Add to Log
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeBuilder;

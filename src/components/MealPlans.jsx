import { useState } from 'react';
import './MealPlans.css';

const MealPlans = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const mealPlans = [
    {
      id: 1,
      name: 'Weight Loss Plan',
      emoji: '⚖️',
      description: 'Calorie deficit for healthy weight loss',
      dailyCalories: 1800,
      dailyProtein: 150,
      dailyCarbs: 150,
      dailyFats: 60,
      days: [
        {
          day: 'Monday',
          meals: [
            { name: 'Breakfast: Egg White Omelette', calories: 200, protein: 25, carbs: 5, fats: 8 },
            { name: 'Lunch: Grilled Chicken Salad', calories: 350, protein: 45, carbs: 15, fats: 10 },
            { name: 'Dinner: Salmon & Broccoli', calories: 400, protein: 40, carbs: 30, fats: 15 },
            { name: 'Snack: Greek Yogurt', calories: 150, protein: 20, carbs: 10, fats: 3 }
          ]
        },
        {
          day: 'Tuesday',
          meals: [
            { name: 'Breakfast: Oatmeal with Berries', calories: 250, protein: 10, carbs: 40, fats: 5 },
            { name: 'Lunch: Turkey Wrap', calories: 320, protein: 35, carbs: 30, fats: 8 },
            { name: 'Dinner: Lean Beef Tacos', calories: 380, protein: 40, carbs: 35, fats: 12 },
            { name: 'Snack: Apple with Almond Butter', calories: 200, protein: 8, carbs: 25, fats: 10 }
          ]
        },
        {
          day: 'Wednesday',
          meals: [
            { name: 'Breakfast: Greek Yogurt Parfait', calories: 280, protein: 20, carbs: 35, fats: 6 },
            { name: 'Lunch: Tuna Salad', calories: 300, protein: 40, carbs: 10, fats: 10 },
            { name: 'Dinner: Chicken Stir Fry', calories: 420, protein: 45, carbs: 40, fats: 12 },
            { name: 'Snack: Protein Shake', calories: 150, protein: 25, carbs: 5, fats: 2 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Muscle Gain Plan',
      emoji: '💪',
      description: 'Calorie surplus for muscle building',
      dailyCalories: 2800,
      dailyProtein: 200,
      dailyCarbs: 300,
      dailyFats: 90,
      days: [
        {
          day: 'Monday',
          meals: [
            { name: 'Breakfast: Protein Pancakes', calories: 500, protein: 35, carbs: 60, fats: 15 },
            { name: 'Lunch: Salmon & Rice Bowl', calories: 650, protein: 50, carbs: 70, fats: 20 },
            { name: 'Dinner: Beef & Sweet Potato', calories: 700, protein: 55, carbs: 80, fats: 22 },
            { name: 'Snack: Protein Shake & Banana', calories: 350, protein: 30, carbs: 50, fats: 8 }
          ]
        },
        {
          day: 'Tuesday',
          meals: [
            { name: 'Breakfast: Eggs & Toast', calories: 450, protein: 30, carbs: 50, fats: 16 },
            { name: 'Lunch: Chicken & Pasta', calories: 700, protein: 55, carbs: 80, fats: 18 },
            { name: 'Dinner: Steak & Potatoes', calories: 750, protein: 60, carbs: 75, fats: 25 },
            { name: 'Snack: Nuts & Dried Fruit', calories: 300, protein: 10, carbs: 35, fats: 15 }
          ]
        },
        {
          day: 'Wednesday',
          meals: [
            { name: 'Breakfast: Oatmeal with Protein', calories: 480, protein: 32, carbs: 65, fats: 12 },
            { name: 'Lunch: Tuna & Rice', calories: 620, protein: 48, carbs: 75, fats: 14 },
            { name: 'Dinner: Chicken Breast & Veggies', calories: 680, protein: 58, carbs: 70, fats: 18 },
            { name: 'Snack: Protein Bar', calories: 250, protein: 20, carbs: 30, fats: 8 }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Balanced Plan',
      emoji: '⚖️',
      description: 'Maintenance calories for overall health',
      dailyCalories: 2200,
      dailyProtein: 165,
      dailyCarbs: 220,
      dailyFats: 73,
      days: [
        {
          day: 'Monday',
          meals: [
            { name: 'Breakfast: Scrambled Eggs & Toast', calories: 350, protein: 20, carbs: 35, fats: 12 },
            { name: 'Lunch: Chicken Salad', calories: 420, protein: 40, carbs: 25, fats: 14 },
            { name: 'Dinner: Salmon & Brown Rice', calories: 550, protein: 45, carbs: 55, fats: 18 },
            { name: 'Snack: Yogurt & Granola', calories: 250, protein: 15, carbs: 35, fats: 6 }
          ]
        },
        {
          day: 'Tuesday',
          meals: [
            { name: 'Breakfast: Oatmeal with Fruit', calories: 320, protein: 12, carbs: 50, fats: 8 },
            { name: 'Lunch: Turkey Sandwich', calories: 400, protein: 35, carbs: 40, fats: 12 },
            { name: 'Dinner: Lean Beef & Vegetables', calories: 520, protein: 48, carbs: 45, fats: 16 },
            { name: 'Snack: Apple & Peanut Butter', calories: 250, protein: 10, carbs: 30, fats: 12 }
          ]
        },
        {
          day: 'Wednesday',
          meals: [
            { name: 'Breakfast: Greek Yogurt Parfait', calories: 340, protein: 22, carbs: 45, fats: 8 },
            { name: 'Lunch: Tuna Wrap', calories: 380, protein: 38, carbs: 35, fats: 11 },
            { name: 'Dinner: Chicken Stir Fry', calories: 480, protein: 42, carbs: 50, fats: 14 },
            { name: 'Snack: Protein Shake', calories: 200, protein: 25, carbs: 15, fats: 4 }
          ]
        }
      ]
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setSelectedDay(plan.days[0]);
  };

  const handleBack = () => {
    setSelectedPlan(null);
    setSelectedDay(null);
  };

  if (!isOpen) return null;

  return (
    <div className="mealplan-modal-overlay" onClick={onClose}>
      <div className="mealplan-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mealplan-header">
          <h2>🍽️ Meal Plans</h2>
          <button className="mealplan-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="mealplan-content">
          {!selectedPlan ? (
            <div className="plans-grid">
              {mealPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="plan-card"
                  onClick={() => handleSelectPlan(plan)}
                >
                  <div className="plan-emoji">{plan.emoji}</div>
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-macros">
                    <div className="plan-macro">
                      <span className="macro-label">Calories</span>
                      <span className="macro-value">{plan.dailyCalories}</span>
                    </div>
                    <div className="plan-macro">
                      <span className="macro-label">Protein</span>
                      <span className="macro-value">{plan.dailyProtein}g</span>
                    </div>
                    <div className="plan-macro">
                      <span className="macro-label">Carbs</span>
                      <span className="macro-value">{plan.dailyCarbs}g</span>
                    </div>
                    <div className="plan-macro">
                      <span className="macro-label">Fats</span>
                      <span className="macro-value">{plan.dailyFats}g</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="plan-detail">
              <button className="back-btn" onClick={handleBack}>
                ← Back to Plans
              </button>

              <div className="plan-detail-header">
                <h2>{selectedPlan.emoji} {selectedPlan.name}</h2>
                <p>{selectedPlan.description}</p>
              </div>

              <div className="plan-daily-macros">
                <h3>Daily Targets</h3>
                <div className="daily-macros-grid">
                  <div className="daily-macro-card">
                    <div className="daily-macro-icon">🔥</div>
                    <div className="daily-macro-value">{selectedPlan.dailyCalories}</div>
                    <div className="daily-macro-label">Calories</div>
                  </div>
                  <div className="daily-macro-card">
                    <div className="daily-macro-icon">💪</div>
                    <div className="daily-macro-value">{selectedPlan.dailyProtein}g</div>
                    <div className="daily-macro-label">Protein</div>
                  </div>
                  <div className="daily-macro-card">
                    <div className="daily-macro-icon">⚡</div>
                    <div className="daily-macro-value">{selectedPlan.dailyCarbs}g</div>
                    <div className="daily-macro-label">Carbs</div>
                  </div>
                  <div className="daily-macro-card">
                    <div className="daily-macro-icon">🧈</div>
                    <div className="daily-macro-value">{selectedPlan.dailyFats}g</div>
                    <div className="daily-macro-label">Fats</div>
                  </div>
                </div>
              </div>

              <div className="day-selector">
                <h3>Select Day</h3>
                <div className="day-buttons">
                  {selectedPlan.days.map((day, idx) => (
                    <button
                      key={idx}
                      className={`day-btn ${selectedDay?.day === day.day ? 'active' : ''}`}
                      onClick={() => setSelectedDay(day)}
                    >
                      {day.day}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDay && (
                <div className="day-meals">
                  <h3>{selectedDay.day} Meals</h3>
                  <div className="meals-list">
                    {selectedDay.meals.map((meal, idx) => (
                      <div key={idx} className="meal-item">
                        <div className="meal-name">{meal.name}</div>
                        <div className="meal-macros">
                          <span className="meal-macro">{meal.calories} cal</span>
                          <span className="meal-macro">P: {meal.protein}g</span>
                          <span className="meal-macro">C: {meal.carbs}g</span>
                          <span className="meal-macro">F: {meal.fats}g</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="day-totals">
                    <h4>Day Total</h4>
                    <div className="totals-grid">
                      <div className="total-item">
                        <span className="total-label">Calories</span>
                        <span className="total-value">
                          {selectedDay.meals.reduce((sum, m) => sum + m.calories, 0)}
                        </span>
                      </div>
                      <div className="total-item">
                        <span className="total-label">Protein</span>
                        <span className="total-value">
                          {selectedDay.meals.reduce((sum, m) => sum + m.protein, 0)}g
                        </span>
                      </div>
                      <div className="total-item">
                        <span className="total-label">Carbs</span>
                        <span className="total-value">
                          {selectedDay.meals.reduce((sum, m) => sum + m.carbs, 0)}g
                        </span>
                      </div>
                      <div className="total-item">
                        <span className="total-label">Fats</span>
                        <span className="total-value">
                          {selectedDay.meals.reduce((sum, m) => sum + m.fats, 0)}g
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlans;

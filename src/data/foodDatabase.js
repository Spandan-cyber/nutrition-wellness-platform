// Common Foods Database
export const FOOD_DATABASE = [
  // Proteins
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6, category: 'Protein' },
  { name: 'Salmon', calories: 280, protein: 25, carbs: 0, fats: 17, category: 'Protein' },
  { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fats: 11, category: 'Protein' },
  { name: 'Beef', calories: 250, protein: 26, carbs: 0, fats: 15, category: 'Protein' },
  { name: 'Turkey', calories: 135, protein: 30, carbs: 0, fats: 1, category: 'Protein' },
  { name: 'Tuna', calories: 132, protein: 29, carbs: 0, fats: 1.3, category: 'Protein' },
  { name: 'Tofu', calories: 76, protein: 8, carbs: 1.9, fats: 4.8, category: 'Protein' },
  { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.3, fats: 0.4, category: 'Protein' },

  // Carbs
  { name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23, fats: 0.9, category: 'Carbs' },
  { name: 'White Rice', calories: 130, protein: 2.7, carbs: 28, fats: 0.3, category: 'Carbs' },
  { name: 'Oats', calories: 389, protein: 17, carbs: 66, fats: 6.9, category: 'Carbs' },
  { name: 'Whole Wheat Bread', calories: 247, protein: 8.2, carbs: 43, fats: 3.3, category: 'Carbs' },
  { name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fats: 0.1, category: 'Carbs' },
  { name: 'Pasta', calories: 131, protein: 5, carbs: 25, fats: 1.1, category: 'Carbs' },
  { name: 'Quinoa', calories: 120, protein: 4.4, carbs: 21, fats: 1.9, category: 'Carbs' },
  { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fats: 0.3, category: 'Carbs' },

  // Vegetables
  { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fats: 0.4, category: 'Vegetables' },
  { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, category: 'Vegetables' },
  { name: 'Carrots', calories: 41, protein: 0.9, carbs: 10, fats: 0.2, category: 'Vegetables' },
  { name: 'Tomato', calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, category: 'Vegetables' },
  { name: 'Bell Pepper', calories: 31, protein: 1, carbs: 6, fats: 0.3, category: 'Vegetables' },
  { name: 'Cucumber', calories: 16, protein: 0.7, carbs: 3.6, fats: 0.1, category: 'Vegetables' },
  { name: 'Lettuce', calories: 15, protein: 1.2, carbs: 2.9, fats: 0.2, category: 'Vegetables' },

  // Fruits
  { name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fats: 0.2, category: 'Fruits' },
  { name: 'Orange', calories: 47, protein: 0.9, carbs: 12, fats: 0.3, category: 'Fruits' },
  { name: 'Strawberry', calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, category: 'Fruits' },
  { name: 'Blueberry', calories: 57, protein: 0.7, carbs: 14, fats: 0.3, category: 'Fruits' },
  { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fats: 15, category: 'Fruits' },
  { name: 'Watermelon', calories: 30, protein: 0.6, carbs: 7.6, fats: 0.2, category: 'Fruits' },

  // Common Meals
  { name: 'Chicken & Rice', calories: 400, protein: 35, carbs: 45, fats: 8, category: 'Meals' },
  { name: 'Salmon & Broccoli', calories: 350, protein: 40, carbs: 15, fats: 15, category: 'Meals' },
  { name: 'Pasta Carbonara', calories: 450, protein: 20, carbs: 50, fats: 20, category: 'Meals' },
  { name: 'Caesar Salad', calories: 300, protein: 15, carbs: 20, fats: 18, category: 'Meals' },
  { name: 'Grilled Cheese', calories: 350, protein: 15, carbs: 30, fats: 20, category: 'Meals' },
  { name: 'Burger', calories: 540, protein: 30, carbs: 40, fats: 28, category: 'Meals' },
  { name: 'Pizza Slice', calories: 285, protein: 12, carbs: 36, fats: 10, category: 'Meals' },
  { name: 'Sushi Roll', calories: 200, protein: 8, carbs: 30, fats: 5, category: 'Meals' },

  // Snacks
  { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fats: 50, category: 'Snacks' },
  { name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fats: 50, category: 'Snacks' },
  { name: 'Granola Bar', calories: 150, protein: 4, carbs: 20, fats: 6, category: 'Snacks' },
  { name: 'Protein Bar', calories: 200, protein: 20, carbs: 15, fats: 7, category: 'Snacks' },
  { name: 'Chips', calories: 152, protein: 2, carbs: 15, fats: 10, category: 'Snacks' },
  { name: 'Popcorn', calories: 387, protein: 12, carbs: 77, fats: 4, category: 'Snacks' },
];

// Search foods by name
export const searchFoods = (query) => {
  if (!query || query.length < 1) return [];
  const lowerQuery = query.toLowerCase();
  return FOOD_DATABASE.filter(food =>
    food.name.toLowerCase().includes(lowerQuery)
  ).slice(0, 10); // Return top 10 results
};

// Get foods by category
export const getFoodsByCategory = (category) => {
  return FOOD_DATABASE.filter(food => food.category === category);
};

// Get all categories
export const getAllCategories = () => {
  return [...new Set(FOOD_DATABASE.map(food => food.category))];
};

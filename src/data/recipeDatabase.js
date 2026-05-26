// Recipe Database - Pre-built recipes with macro calculations
export const recipeDatabase = [
  // Breakfast Recipes
  {
    id: 1,
    name: 'Protein Pancakes',
    category: 'Breakfast',
    servings: 2,
    ingredients: [
      { name: 'Oats', amount: 100, unit: 'g', calories: 389, protein: 17, carbs: 66, fats: 7 },
      { name: 'Eggs', amount: 2, unit: 'large', calories: 156, protein: 12, carbs: 1.2, fats: 10 },
      { name: 'Banana', amount: 1, unit: 'medium', calories: 105, protein: 1.3, carbs: 27, fats: 0.3 },
      { name: 'Honey', amount: 1, unit: 'tbsp', calories: 64, protein: 0, carbs: 17, fats: 0 }
    ],
    totalCalories: 714,
    totalProtein: 30.3,
    totalCarbs: 111.2,
    totalFats: 17.3,
    perServingCalories: 357,
    perServingProtein: 15.15,
    perServingCarbs: 55.6,
    perServingFats: 8.65,
    instructions: '1. Mix oats, eggs, and mashed banana\n2. Cook on griddle until golden\n3. Top with honey and berries'
  },
  {
    id: 2,
    name: 'Greek Yogurt Parfait',
    category: 'Breakfast',
    servings: 1,
    ingredients: [
      { name: 'Greek Yogurt', amount: 200, unit: 'g', calories: 118, protein: 20, carbs: 6.6, fats: 0.8 },
      { name: 'Granola', amount: 50, unit: 'g', calories: 220, protein: 5, carbs: 30, fats: 10 },
      { name: 'Blueberries', amount: 100, unit: 'g', calories: 57, protein: 0.7, carbs: 14, fats: 0.3 },
      { name: 'Honey', amount: 1, unit: 'tbsp', calories: 64, protein: 0, carbs: 17, fats: 0 }
    ],
    totalCalories: 459,
    totalProtein: 25.7,
    totalCarbs: 67.6,
    totalFats: 11.1,
    perServingCalories: 459,
    perServingProtein: 25.7,
    perServingCarbs: 67.6,
    perServingFats: 11.1,
    instructions: '1. Layer yogurt in bowl\n2. Add granola and blueberries\n3. Drizzle with honey'
  },

  // Lunch Recipes
  {
    id: 3,
    name: 'Grilled Chicken Salad',
    category: 'Lunch',
    servings: 1,
    ingredients: [
      { name: 'Chicken Breast', amount: 150, unit: 'g', calories: 247.5, protein: 46.5, carbs: 0, fats: 5.4 },
      { name: 'Mixed Greens', amount: 200, unit: 'g', calories: 46, protein: 5.4, carbs: 8, fats: 0.8 },
      { name: 'Olive Oil', amount: 1, unit: 'tbsp', calories: 119, protein: 0, carbs: 0, fats: 13.5 },
      { name: 'Lemon Juice', amount: 2, unit: 'tbsp', calories: 14, protein: 0.2, carbs: 4.5, fats: 0.1 }
    ],
    totalCalories: 426.5,
    totalProtein: 52.1,
    totalCarbs: 12.5,
    totalFats: 19.8,
    perServingCalories: 426.5,
    perServingProtein: 52.1,
    perServingCarbs: 12.5,
    perServingFats: 19.8,
    instructions: '1. Grill chicken breast until cooked\n2. Slice and place on greens\n3. Drizzle with olive oil and lemon'
  },
  {
    id: 4,
    name: 'Salmon & Brown Rice Bowl',
    category: 'Lunch',
    servings: 1,
    ingredients: [
      { name: 'Salmon Fillet', amount: 150, unit: 'g', calories: 312, protein: 30, carbs: 0, fats: 19.5 },
      { name: 'Brown Rice', amount: 150, unit: 'g', calories: 166.5, protein: 3.9, carbs: 34.5, fats: 1.35 },
      { name: 'Broccoli', amount: 150, unit: 'g', calories: 51, protein: 4.2, carbs: 10.5, fats: 0.6 },
      { name: 'Olive Oil', amount: 0.5, unit: 'tbsp', calories: 59.5, protein: 0, carbs: 0, fats: 6.75 }
    ],
    totalCalories: 589,
    totalProtein: 38.1,
    totalCarbs: 45,
    totalFats: 28.2,
    perServingCalories: 589,
    perServingProtein: 38.1,
    perServingCarbs: 45,
    perServingFats: 28.2,
    instructions: '1. Bake salmon at 400°F for 12-15 min\n2. Cook brown rice\n3. Steam broccoli and combine'
  },

  // Dinner Recipes
  {
    id: 5,
    name: 'Lean Beef Tacos',
    category: 'Dinner',
    servings: 2,
    ingredients: [
      { name: 'Ground Beef (93/7)', amount: 200, unit: 'g', calories: 300, protein: 40, carbs: 0, fats: 15 },
      { name: 'Corn Tortillas', amount: 4, unit: 'pieces', calories: 208, protein: 5.2, carbs: 43.2, fats: 2.4 },
      { name: 'Lettuce', amount: 100, unit: 'g', calories: 15, protein: 1.2, carbs: 2.9, fats: 0.2 },
      { name: 'Tomato', amount: 150, unit: 'g', calories: 27, protein: 1.35, carbs: 5.85, fats: 0.3 }
    ],
    totalCalories: 550,
    totalProtein: 47.75,
    totalCarbs: 51.95,
    totalFats: 17.9,
    perServingCalories: 275,
    perServingProtein: 23.875,
    perServingCarbs: 25.975,
    perServingFats: 8.95,
    instructions: '1. Brown ground beef with spices\n2. Warm tortillas\n3. Assemble with lettuce and tomato'
  },
  {
    id: 6,
    name: 'Vegetable Stir Fry',
    category: 'Dinner',
    servings: 2,
    ingredients: [
      { name: 'Tofu', amount: 200, unit: 'g', calories: 152, protein: 16, carbs: 3.8, fats: 9.6 },
      { name: 'Broccoli', amount: 200, unit: 'g', calories: 68, protein: 5.6, carbs: 14, fats: 0.8 },
      { name: 'Bell Pepper', amount: 150, unit: 'g', calories: 46.5, protein: 1.5, carbs: 9, fats: 0.45 },
      { name: 'Sesame Oil', amount: 1, unit: 'tbsp', calories: 120, protein: 0, carbs: 0, fats: 13.6 }
    ],
    totalCalories: 386.5,
    totalProtein: 23.1,
    totalCarbs: 26.8,
    totalFats: 24.45,
    perServingCalories: 193.25,
    perServingProtein: 11.55,
    perServingCarbs: 13.4,
    perServingFats: 12.225,
    instructions: '1. Heat sesame oil in wok\n2. Stir fry tofu until golden\n3. Add vegetables and cook 5-7 min'
  },

  // Snack Recipes
  {
    id: 7,
    name: 'Protein Energy Balls',
    category: 'Snack',
    servings: 12,
    ingredients: [
      { name: 'Peanut Butter', amount: 200, unit: 'g', calories: 1520, protein: 64, carbs: 56, fats: 128 },
      { name: 'Oats', amount: 100, unit: 'g', calories: 389, protein: 17, carbs: 66, fats: 7 },
      { name: 'Honey', amount: 100, unit: 'g', calories: 304, protein: 0, carbs: 82, fats: 0 },
      { name: 'Dark Chocolate', amount: 50, unit: 'g', calories: 283, protein: 5, carbs: 27, fats: 20 }
    ],
    totalCalories: 2496,
    totalProtein: 86,
    totalCarbs: 231,
    totalFats: 155,
    perServingCalories: 208,
    perServingProtein: 7.17,
    perServingCarbs: 19.25,
    perServingFats: 12.92,
    instructions: '1. Mix peanut butter, oats, honey\n2. Roll into balls\n3. Coat with melted chocolate\n4. Refrigerate'
  },
  {
    id: 8,
    name: 'Hummus & Veggie Plate',
    category: 'Snack',
    servings: 1,
    ingredients: [
      { name: 'Hummus', amount: 100, unit: 'g', calories: 166, protein: 5.5, carbs: 14.5, fats: 9.6 },
      { name: 'Carrots', amount: 100, unit: 'g', calories: 41, protein: 0.9, carbs: 10, fats: 0.2 },
      { name: 'Celery', amount: 100, unit: 'g', calories: 16, protein: 0.7, carbs: 3.7, fats: 0.1 },
      { name: 'Bell Pepper', amount: 100, unit: 'g', calories: 31, protein: 1, carbs: 6, fats: 0.3 }
    ],
    totalCalories: 254,
    totalProtein: 8.1,
    totalCarbs: 34.2,
    totalFats: 10.2,
    perServingCalories: 254,
    perServingProtein: 8.1,
    perServingCarbs: 34.2,
    perServingFats: 10.2,
    instructions: '1. Place hummus in center of plate\n2. Arrange cut vegetables around it\n3. Dip and enjoy'
  }
];

// Search recipes
export const searchRecipes = (query) => {
  const lowerQuery = query.toLowerCase();
  return recipeDatabase.filter(recipe =>
    recipe.name.toLowerCase().includes(lowerQuery) ||
    recipe.category.toLowerCase().includes(lowerQuery)
  );
};

// Get recipes by category
export const getRecipesByCategory = (category) => {
  return recipeDatabase.filter(recipe => recipe.category === category);
};

// Get all recipes
export const getAllRecipes = () => {
  return recipeDatabase;
};

// Barcode Database - Common Food Products
// Format: { barcode: string, name: string, calories: number, protein: number, carbs: number, fats: number, category: string }

export const barcodeDatabase = [
  // Proteins
  { barcode: '5901234123457', name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fats: 3.6, category: 'Protein' },
  { barcode: '5901234123458', name: 'Ground Beef (100g)', calories: 250, protein: 26, carbs: 0, fats: 17, category: 'Protein' },
  { barcode: '5901234123459', name: 'Salmon Fillet (100g)', calories: 208, protein: 20, carbs: 0, fats: 13, category: 'Protein' },
  { barcode: '5901234123460', name: 'Eggs (1 large)', calories: 78, protein: 6, carbs: 0.6, fats: 5, category: 'Protein' },
  { barcode: '5901234123461', name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 3.3, fats: 0.4, category: 'Protein' },
  { barcode: '5901234123462', name: 'Tofu (100g)', calories: 76, protein: 8, carbs: 1.9, fats: 4.8, category: 'Protein' },
  
  // Carbs
  { barcode: '5901234123463', name: 'Brown Rice (100g)', calories: 111, protein: 2.6, carbs: 23, fats: 0.9, category: 'Carbs' },
  { barcode: '5901234123464', name: 'Whole Wheat Bread (1 slice)', calories: 80, protein: 4, carbs: 14, fats: 1, category: 'Carbs' },
  { barcode: '5901234123465', name: 'Sweet Potato (100g)', calories: 86, protein: 1.6, carbs: 20, fats: 0.1, category: 'Carbs' },
  { barcode: '5901234123466', name: 'Oatmeal (100g)', calories: 389, protein: 17, carbs: 66, fats: 7, category: 'Carbs' },
  { barcode: '5901234123467', name: 'Pasta (100g)', calories: 131, protein: 5, carbs: 25, fats: 1.1, category: 'Carbs' },
  { barcode: '5901234123468', name: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27, fats: 0.3, category: 'Carbs' },
  
  // Vegetables
  { barcode: '5901234123469', name: 'Broccoli (100g)', calories: 34, protein: 2.8, carbs: 7, fats: 0.4, category: 'Vegetables' },
  { barcode: '5901234123470', name: 'Spinach (100g)', calories: 23, protein: 2.7, carbs: 3.6, fats: 0.4, category: 'Vegetables' },
  { barcode: '5901234123471', name: 'Carrot (100g)', calories: 41, protein: 0.9, carbs: 10, fats: 0.2, category: 'Vegetables' },
  { barcode: '5901234123472', name: 'Bell Pepper (100g)', calories: 31, protein: 1, carbs: 6, fats: 0.3, category: 'Vegetables' },
  { barcode: '5901234123473', name: 'Tomato (100g)', calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, category: 'Vegetables' },
  
  // Fruits
  { barcode: '5901234123474', name: 'Apple (1 medium)', calories: 95, protein: 0.5, carbs: 25, fats: 0.3, category: 'Fruits' },
  { barcode: '5901234123475', name: 'Orange (1 medium)', calories: 62, protein: 1.2, carbs: 15, fats: 0.3, category: 'Fruits' },
  { barcode: '5901234123476', name: 'Blueberries (100g)', calories: 57, protein: 0.7, carbs: 14, fats: 0.3, category: 'Fruits' },
  { barcode: '5901234123477', name: 'Strawberries (100g)', calories: 32, protein: 0.8, carbs: 7.7, fats: 0.3, category: 'Fruits' },
  { barcode: '5901234123478', name: 'Avocado (100g)', calories: 160, protein: 2, carbs: 9, fats: 15, category: 'Fruits' },
  
  // Snacks
  { barcode: '5901234123479', name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fats: 14, category: 'Snacks' },
  { barcode: '5901234123480', name: 'Protein Bar', calories: 200, protein: 20, carbs: 22, fats: 5, category: 'Snacks' },
  { barcode: '5901234123481', name: 'Granola (50g)', calories: 220, protein: 5, carbs: 30, fats: 10, category: 'Snacks' },
  { barcode: '5901234123482', name: 'Dark Chocolate (30g)', calories: 170, protein: 3, carbs: 16, fats: 12, category: 'Snacks' },
  { barcode: '5901234123483', name: 'Peanut Butter (2 tbsp)', calories: 188, protein: 8, carbs: 7, fats: 16, category: 'Snacks' },
  
  // Beverages
  { barcode: '5901234123484', name: 'Protein Shake (250ml)', calories: 150, protein: 25, carbs: 5, fats: 2, category: 'Beverages' },
  { barcode: '5901234123485', name: 'Orange Juice (250ml)', calories: 110, protein: 2, carbs: 26, fats: 0.5, category: 'Beverages' },
  { barcode: '5901234123486', name: 'Milk (250ml)', calories: 149, protein: 7.7, carbs: 11.7, fats: 7.9, category: 'Beverages' },
  { barcode: '5901234123487', name: 'Almond Milk (250ml)', calories: 30, protein: 1, carbs: 1, fats: 2.5, category: 'Beverages' },
  
  // Meals
  { barcode: '5901234123488', name: 'Grilled Chicken Salad', calories: 350, protein: 40, carbs: 15, fats: 12, category: 'Meals' },
  { barcode: '5901234123489', name: 'Salmon with Rice', calories: 450, protein: 35, carbs: 45, fats: 15, category: 'Meals' },
  { barcode: '5901234123490', name: 'Vegetable Stir Fry', calories: 280, protein: 15, carbs: 35, fats: 8, category: 'Meals' },
];

// Search barcode in database
export const searchBarcode = (barcode) => {
  return barcodeDatabase.find(item => item.barcode === barcode);
};

// Get all barcodes
export const getAllBarcodes = () => {
  return barcodeDatabase;
};

// Get barcodes by category
export const getBarcodesByCategory = (category) => {
  return barcodeDatabase.filter(item => item.category === category);
};

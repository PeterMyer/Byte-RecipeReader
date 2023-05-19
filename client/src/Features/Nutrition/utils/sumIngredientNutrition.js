export function sumIngredientNutrition(recipeNutrition) {
  let recipeNutritionTotal = {
    Energy: { amount: 0, unit: null },
    'Fatty acids, total monounsaturated': { amount: 0, unit: 'g' },
    'Fatty acids, total polyunsaturated': { amount: 0, unit: 'g' },
    'Fatty acids, total saturated': { amount: 0, unit: 'g' },
    Cholesterol: { amount: 0, unit: 'mg' },
    'Sodium, Na': { amount: 0, unit: 'mg' },
    'Fiber, total dietary': { amount: 0, unit: 'g' },
    Protein: { amount: 0, unit: 'g' },
    'Sugars, total including NLEA': { amount: 0, unit: 'g' },
    'Vitamin D (D2 + D3)': { amount: 0, unit: 'mcg' },
    'Calcium, Ca': { amount: 0, unit: 'mg' },
    'Iron, Fe': { amount: 0, unit: 'mg' },
    'Potassium, K': { amount: 0, unit: 'mg' },
    'Total lipid (fat)': { amount: 0, unit: 'g' },
    'Carbohydrate, by difference': { amount: 0, unit: 'g' },
    'Fatty acids, total trans': { amount: 0, unit: 'g' },
  };

  for (let ingredient in recipeNutrition.ingredients) {
    const ingredientObj = recipeNutrition.ingredients[ingredient];

    for (let nutrient in ingredientObj.ingredientNutrition) {
      const nutrientVal = ingredientObj.ingredientNutrition[nutrient]['amount'];
      recipeNutritionTotal[nutrient]['amount'] += nutrientVal;
    }
  }
  return recipeNutritionTotal;
}

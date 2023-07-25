export function sumIngredientNutrition(recipeNutrition) {
  let recipeNutritionTotal = {
    calories: { amount: 0, unit: null },
    totalFat: { amount: 0, unit: 'g' },
    saturatedFat: { amount: 0, unit: 'g' },
    transFat: { amount: 0, unit: 'g' },
    cholesteral: { amount: 0, unit: 'mg' },
    sodium: { amount: 0, unit: 'mg' },
    totalCarbs: { amount: 0, unit: 'g' },
    dietaryFibers: { amount: 0, unit: 'g' },
    sugars: { amount: 0, unit: 'g' },
    vitaminD: { amount: 0, unit: 'mcg' },
    calcium: { amount: 0, unit: 'mg' },
    iron: { amount: 0, unit: 'mg' },
    pottassium: { amount: 0, unit: 'mg' },
    protien: { amount: 0, unit: 'g' },
  };

  for (let ingredient in recipeNutrition.ingredients) {
    const ingredientObj = recipeNutrition.ingredients[ingredient];

    for (let nutrient in ingredientObj.ingredientNutrition) {
      const nutrientVal = ingredientObj.ingredientNutrition[nutrient]['amount'];
      if (nutrientVal) {
        recipeNutritionTotal[nutrient]['amount'] += nutrientVal;
      }
    }
  }
  return recipeNutritionTotal;
}

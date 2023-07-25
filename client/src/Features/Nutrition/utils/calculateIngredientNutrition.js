import { handleQuantityInts } from './handleQuantityInts';

export function calculateIngredientNutrition(
  nutritionValues,
  gramWeight,
  quantity,
  servings
) {
  let ingredientNutritionTotal = {
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

  for (let nutrient in nutritionValues) {
    let scaledGramWeight = gramWeight * quantity;
    ingredientNutritionTotal[nutrient]['amount'] +=
      ((scaledGramWeight / 100) * nutritionValues[nutrient].amount) / servings;
  }
  return ingredientNutritionTotal;
}

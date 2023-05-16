import { handleQuantityInts } from './handleQuantityInts';

export function calculateIngredientNutrition(
  ingredient,
  ingredientNutrition,
  currentFood,
  servings
) {
  let ingredientNutritionTotal = {
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
  };

  const defaultGramWeight =
    currentFood.foodMeasures.length > 0
      ? currentFood.foodMeasures[currentFood.foodMeasures.length - 1].gramWeight
      : 0;

  const quantity = ingredient.measurementQuantity.qtyAmount
    ? handleQuantityInts(ingredient.measurementQuantity.qtyAmount)
    : 1;

  let unitGramWeight = ingredient.measurementUnit.unitGrams
    ? ingredient.measurementUnit.unitGrams
    : defaultGramWeight;

  for (let nutrient in ingredientNutrition) {
    let scaledGramWeight = unitGramWeight * quantity;
    ingredientNutritionTotal[nutrient]['amount'] +=
      ((scaledGramWeight / 100) * ingredientNutrition[nutrient].value) /
      servings;
  }
  console.log('ingredientNutritionTotal', ingredientNutritionTotal);

  return ingredientNutritionTotal;
}

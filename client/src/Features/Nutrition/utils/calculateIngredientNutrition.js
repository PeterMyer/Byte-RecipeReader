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
    'Total lipid (fat)': { amount: 0, unit: 'g' },
    'Carbohydrate, by difference': { amount: 0, unit: 'g' },
    'Fatty acids, total trans': { amount: 0, unit: 'g' },
  };

  // This needs to be reworked. Local copies do not have a foodMeasure property so always go default
  const defaultGramWeight =
    currentFood.foodMeasures?.length > 0
      ? currentFood.foodMeasures[currentFood.foodMeasures.length - 1].gramWeight
      : 10;

  const quantity = ingredient.measurementQuantity.qtyAmount
    ? handleQuantityInts(ingredient.measurementQuantity.qtyAmount)
    : 1;

  let unitGramWeight = ingredient.measurementUnit.unitGrams
    ? ingredient.measurementUnit.unitGrams
    : defaultGramWeight;

  for (let nutrient in ingredientNutrition) {
    console.log('nutrient', nutrient);

    let scaledGramWeight = unitGramWeight * quantity;
    ingredientNutritionTotal[nutrient]['amount'] +=
      ((scaledGramWeight / 100) * ingredientNutrition[nutrient].value) /
      servings;
  }

  return ingredientNutritionTotal;
}

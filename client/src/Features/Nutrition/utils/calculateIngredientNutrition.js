import { handleQuantityInts } from './handleQuantityInts';

export function calculateIngredientNutrition(
  ingredient,
  ingredientNutrition,
  currentFood,
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

  console.log('currentFood', currentFood);

  const defaultGramWeight =
    currentFood.foodMeasures?.length > 0
      ? currentFood.foodMeasures[currentFood.foodMeasures.length - 1].gramWeight
      : currentFood.servingSize;

  const quantity = ingredient.measurementQuantity.qtyAmount
    ? handleQuantityInts(ingredient.measurementQuantity.qtyAmount)
    : 1;

  let unitGramWeight = ingredient.measurementUnit.unitGrams
    ? ingredient.measurementUnit.unitGrams
    : defaultGramWeight;

  console.log('unit gram weight', unitGramWeight);

  for (let nutrient in ingredientNutrition) {
    let scaledGramWeight = unitGramWeight * quantity;
    ingredientNutritionTotal[nutrient]['amount'] +=
      ((scaledGramWeight / 100) * ingredientNutrition[nutrient].amount) /
      servings;
  }

  return ingredientNutritionTotal;
}

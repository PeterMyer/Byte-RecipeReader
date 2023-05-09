import { buildRecipeNutrition } from './buildRecipeNutrition';

export function calculateNutrition(ingredients, nutritionData, servings) {
  const recipeNutrition = buildRecipeNutrition(
    ingredients,
    nutritionData,
    servings
  );
  console.log('Recipe Nutrition:', recipeNutrition);

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
  };

  // ingredients.map((ingredient, index) => {
  //   recipeNutrition['ingredients'][ingredient.recipeIngredient.text] = {
  //     nurtritionPer100G: {},
  //     matchedIndex: 0,
  //     matchedIndexItem: nutritionData[index].foods[0],
  //     allUsdaOptions: nutritionData[index].foods,
  //   };

  //   let currentFood = nutritionData[index].foods[0];

  //   // Defaults the unit of measurements (tbs/cup/etc) to 'Quantity not specified' which appears last in list of options
  //   let defaultGramWeight =
  //     currentFood.foodMeasures.length > 0
  //       ? currentFood.foodMeasures[currentFood.foodMeasures.length - 1]
  //           .gramWeight
  //       : 0;

  //   let ingredientNutrition = filterNutrientValues(currentFood);

  //   recipeNutrition['ingredients'][
  //     ingredient.recipeIngredient.text
  //   ].nurtritionPer100G = {
  //     ...ingredientNutrition,
  //   };

  //   sumNutritionTotals(
  //     ingredient,
  //     ingredientNutrition,
  //     defaultGramWeight,
  //     servings,
  //     recipeNutritionTotal
  //   );
  // });

  recipeNutrition.totalNutrition = { ...recipeNutritionTotal };

  return recipeNutrition;
}

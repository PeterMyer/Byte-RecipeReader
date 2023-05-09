import { calculateIngredientNutrition } from './calculateIngredientNutrition';
import { filterNutrientValues } from './filterNutrientValues';

export function buildRecipeNutrition(ingredients, nutritionData, servings) {
  const recipeNutrition = {
    ingredients: {},
    totalNutrition: {},
  };

  ingredients.map((ingredient, index) => {
    recipeNutrition['ingredients'][ingredient.recipeIngredient.text] = {
      nurtritionPer100G: {},
      matchedIndex: 0,
      matchedIndexItem: nutritionData[index].foods[0],
      allUsdaOptions: nutritionData[index].foods,
      ingredientNutrition: {},
    };

    let currentFood = nutritionData[index].foods[0];

    let nutritionValues = filterNutrientValues(currentFood);

    recipeNutrition['ingredients'][
      ingredient.recipeIngredient.text
    ].nurtritionPer100G = {
      ...nutritionValues,
    };

    const ingredientNutritionCalculated = calculateIngredientNutrition(
      ingredient,
      nutritionValues,
      currentFood,
      servings
    );

    recipeNutrition['ingredients'][
      ingredient.recipeIngredient.text
    ].ingredientNutrition = {
      ...ingredientNutritionCalculated,
    };
  });

  return recipeNutrition;
}

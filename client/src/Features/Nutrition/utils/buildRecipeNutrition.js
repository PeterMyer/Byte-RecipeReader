import { calculateIngredientNutrition } from './calculateIngredientNutrition';
import { filterNutrientValues } from './filterNutrientValues';
import { formatNutrientData } from './formatNutritionData';

export function buildRecipeNutrition(ingredients, nutritionData, servings) {
  const recipeNutrition = {
    ingredients: {},
    totalNutrition: {},
    servings: servings,
  };

  ingredients.map((ingredient, index) => {
    let currentFood =
      ingredient.component.foodItemNutritions[0] || nutritionData[index][0];

    recipeNutrition['ingredients'][ingredient.recipeIngredient.text] = {
      nurtritionPer100G: {},
      matchedIndex: 0,
      matchedIndexItem: currentFood,
      allUsdaOptions: [currentFood, ...nutritionData[index]],
      ingredientNutrition: {},
      recipeData: ingredient,
    };

    let nutritionValues = currentFood.fdcId
      ? filterNutrientValues(currentFood.nutrition)
      : JSON.parse(currentFood.nutrition);

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

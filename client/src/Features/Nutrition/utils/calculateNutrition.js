import { buildRecipeNutrition } from './buildRecipeNutrition';
import { sumIngredientNutrition } from './sumIngredientNutrition';

export function calculateNutrition(ingredients, nutritionData, servings) {
  const recipeNutrition = buildRecipeNutrition(
    ingredients,
    nutritionData,
    servings
  );

  console.log('recipeNutrition', recipeNutrition);

  recipeNutrition.totalNutrition = sumIngredientNutrition(recipeNutrition);
  console.log('Recipe Nutrition:', recipeNutrition);

  return recipeNutrition;
}

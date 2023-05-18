import { buildRecipeNutrition } from './buildRecipeNutrition';
import { sumIngredientNutrition } from './sumIngredientNutrition';

export function calculateNutrition(ingredients, nutritionData, servings) {
  const recipeNutrition = buildRecipeNutrition(
    ingredients,
    nutritionData,
    servings
  );
  recipeNutrition.totalNutrition = sumIngredientNutrition(recipeNutrition);
  return recipeNutrition;
}

import { buildRecipeNutrition } from './buildRecipeNutrition';
import { sumIngredientNutrition } from './sumIngredientNutrition';

export function calculateNutrition(ingredients, usdaData, servings,userFoods) {
  const recipeNutrition = buildRecipeNutrition(
    ingredients,
    usdaData,
    servings,
    userFoods
  );
  recipeNutrition.totalNutrition = sumIngredientNutrition(recipeNutrition);
  return recipeNutrition;
}

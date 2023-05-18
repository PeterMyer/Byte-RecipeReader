import React from 'react';
import Select from 'react-select';
import { sumIngredientNutrition } from '../utils/sumIngredientNutrition';
import { calculateIngredientNutrition } from '../utils/calculateIngredientNutrition';
import { buildSelectOptions } from '../utils/buildSelectOptions';

export function IngredientSelect({
  allUsdaOptions,
  recipeNutrition,
  ingredientName,
  setRecipeNutrition,
}) {
  const options = buildSelectOptions(allUsdaOptions);

  const handleChange = (event) => {
    const recipeNutritionCopy = { ...recipeNutrition };
    recipeNutritionCopy.ingredients[ingredientName].matchedIndex = event.value;
    recipeNutritionCopy.ingredients[ingredientName].matchedIndexItem =
      allUsdaOptions[event.value];

    recipeNutritionCopy.ingredients[ingredientName].ingredientNutrition =
      calculateIngredientNutrition(
        recipeNutritionCopy.ingredients[ingredientName].recipeData,
        recipeNutritionCopy.ingredients[ingredientName].nurtritionPer100G,
        recipeNutritionCopy.ingredients[ingredientName].matchedIndexItem,
        recipeNutritionCopy.servings
      );

    recipeNutritionCopy.totalNutrition =
      sumIngredientNutrition(recipeNutrition);
    setRecipeNutrition(recipeNutritionCopy);
  };

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      onChange={handleChange}
    />
  );
}

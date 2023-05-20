import React, { useEffect } from 'react';
import Select from 'react-select';
import { sumIngredientNutrition } from '../utils/sumIngredientNutrition';
import { calculateIngredientNutrition } from '../utils/calculateIngredientNutrition';
import { buildSelectOptions } from '../utils/buildSelectOptions';
import { filterNutrientValues } from '../utils';

export function IngredientSelect({
  allUsdaOptions,
  recipeNutrition,
  ingredientName,
  setRecipeNutrition,
}) {
  const options = buildSelectOptions(allUsdaOptions);
  const selectedValue =
    options[recipeNutrition.ingredients[ingredientName].matchedIndex];

  const handleChange = (event) => {
    const recipeNutritionCopy = { ...recipeNutrition };
    recipeNutritionCopy.ingredients[ingredientName].matchedIndex = event.value;
    recipeNutritionCopy.ingredients[ingredientName].matchedIndexItem =
      allUsdaOptions[event.value];

    let currentFood =
      recipeNutritionCopy.ingredients[ingredientName].matchedIndexItem;

    let nutritionValues = currentFood.fdcId
      ? filterNutrientValues(currentFood.nutrition)
      : JSON.parse(currentFood.nutrition);

    recipeNutritionCopy.ingredients[ingredientName].nurtritionPer100G = {
      ...nutritionValues,
    };
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
    <Select options={options} value={selectedValue} onChange={handleChange} />
  );
}

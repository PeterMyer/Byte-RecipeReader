import React from 'react';
import Select from 'react-select';
import { sumIngredientNutrition } from '../utils/sumIngredientNutrition';
import { calculateIngredientNutrition } from '../utils/calculateIngredientNutrition';
import { buildSelectOptions } from '../utils/buildSelectOptions';
import { filterNutrientValues } from '../utils';
import { findDefaultFoodMeasure } from '../utils/findDefaultFoodMeasure';

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

    const {
      currentMeasurement,
      gramWeight,
      measureOptions,
      matchedMeasurementIndex,
    } = findDefaultFoodMeasure(
      recipeNutrition.ingredients[ingredientName].measurementUnitName,
      currentFood.foodMeasures
    );

    recipeNutritionCopy.ingredients[ingredientName].currentMeasurement =
      currentMeasurement;
    recipeNutritionCopy.ingredients[ingredientName].gramWeight = gramWeight;
    recipeNutritionCopy.ingredients[ingredientName].measurementOptions =
      measureOptions;
    recipeNutritionCopy.ingredients[ingredientName].matchedMeasurementIndex =
      matchedMeasurementIndex;

    let nutritionValues = currentFood.fdcId
      ? filterNutrientValues(currentFood.nutrition)
      : JSON.parse(currentFood.nutrition);

    recipeNutritionCopy.ingredients[ingredientName].nurtritionPer100G = {
      ...nutritionValues,
    };

    recipeNutritionCopy.ingredients[ingredientName].ingredientNutrition =
      calculateIngredientNutrition(
        //nutrtionValues
        recipeNutritionCopy.ingredients[ingredientName].nurtritionPer100G,
        //gramWeight
        gramWeight,
        //quantity
        recipeNutritionCopy.ingredients[ingredientName].quantity,
        //servings
        recipeNutritionCopy.servings
      );

    recipeNutritionCopy.totalNutrition =
      sumIngredientNutrition(recipeNutritionCopy);
    setRecipeNutrition(recipeNutritionCopy);
  };

  return (
    <Select options={options} value={selectedValue} onChange={handleChange} />
  );
}

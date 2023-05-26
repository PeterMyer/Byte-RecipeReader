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
  IngredientEdit,
  setIngredientEdit,
}) {
  const options = buildSelectOptions(allUsdaOptions);
  const selectedValue = options[IngredientEdit.matchedIndex];

  const handleChange = (event) => {
    // const recipeNutritionCopy = { ...recipeNutrition };
    const IngredientEditCopy = { ...IngredientEdit };
    // recipeNutritionCopy.ingredients[ingredientName].matchedIndex = event.value;
    IngredientEditCopy.matchedIndex = event.value;
    // recipeNutritionCopy.ingredients[ingredientName].matchedIndexItem =
    //   allUsdaOptions[event.value];
    IngredientEditCopy.matchedIndexItem = allUsdaOptions[event.value];

    // let currentFood =
    //   recipeNutritionCopy.ingredients[ingredientName].matchedIndexItem;
    let currentFood = IngredientEditCopy.matchedIndexItem;

    const {
      currentMeasurement,
      gramWeight,
      measureOptions,
      matchedMeasurementIndex,
    } = findDefaultFoodMeasure(
      recipeNutrition.ingredients[ingredientName].measurementUnitName,
      currentFood.foodMeasures
    );

    console.log('gramWeight', gramWeight);

    // recipeNutritionCopy.ingredients[ingredientName].currentMeasurement =
    //   currentMeasurement;
    IngredientEditCopy.currentMeasurement = currentMeasurement;
    // recipeNutritionCopy.ingredients[ingredientName].gramWeight = gramWeight;
    IngredientEditCopy.gramWeight = gramWeight;
    // recipeNutritionCopy.ingredients[ingredientName].measurementOptions =
    //   measureOptions;
    IngredientEditCopy.measurementOptions = measureOptions;
    // recipeNutritionCopy.ingredients[ingredientName].matchedMeasurementIndex =
    //   matchedMeasurementIndex;
    IngredientEditCopy.matchedMeasurementIndex = matchedMeasurementIndex;

    let nutritionValues = currentFood.fdcId
      ? filterNutrientValues(currentFood.nutrition)
      : JSON.parse(currentFood.nutrition);

    // recipeNutritionCopy.ingredients[ingredientName].nurtritionPer100G = {
    //   ...nutritionValues,
    // };
    IngredientEditCopy.nurtritionPer100G = { ...nutritionValues };

    IngredientEditCopy.ingredientNutrition = calculateIngredientNutrition(
      //nutrtionValues
      IngredientEditCopy.nurtritionPer100G,
      //gramWeight
      gramWeight,
      //quantity
      IngredientEditCopy.quantity,
      //servings
      recipeNutrition.servings
    );

    console.log('IngredientEdit', IngredientEdit);

    console.log('IngredientEditCopy', IngredientEditCopy);

    setIngredientEdit(IngredientEditCopy);

    // recipeNutritionCopy.totalNutrition =
    //   sumIngredientNutrition(recipeNutritionCopy);
    // setRecipeNutrition(recipeNutritionCopy);
  };

  return (
    <Select options={options} value={selectedValue} onChange={handleChange} />
  );
}

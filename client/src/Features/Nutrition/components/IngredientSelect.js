import React from 'react';
import Select from 'react-select';
import { calculateIngredientNutrition } from '../utils/calculateIngredientNutrition';
import { buildSelectOptions } from '../utils/buildSelectOptions';
import { filterNutrientValues } from '../utils';
import { findDefaultFoodMeasure } from '../utils/findDefaultFoodMeasure';

export function IngredientSelect({
  recipeNutrition,
  ingredientName,
  IngredientEdit,
  setIngredientEdit,
}) {
  const options = buildSelectOptions(IngredientEdit.allUsdaOptions);
  const selectedValue = options[IngredientEdit.matchedIndex];

  const handleChange = (event) => {
    const IngredientEditCopy = { ...IngredientEdit };

    console.log('IngredientEditCopy', IngredientEditCopy);
    IngredientEditCopy.matchedIndex = event.value;
    IngredientEditCopy.matchedIndexItem =
      IngredientEdit.allUsdaOptions[event.value];

    let currentFood = IngredientEditCopy.matchedIndexItem;

    const {
      currentMeasurement,
      gramWeight,
      measureOptions,
      matchedMeasurementIndex,
    } = findDefaultFoodMeasure(
      IngredientEditCopy.measurementUnitName,
      currentFood.foodMeasures
    );

    IngredientEditCopy.currentMeasurement = currentMeasurement;
    IngredientEditCopy.gramWeight = gramWeight;
    IngredientEditCopy.measurementOptions = measureOptions;
    IngredientEditCopy.matchedMeasurementIndex = matchedMeasurementIndex;

    let nutritionValues = currentFood.fdcId
      ? filterNutrientValues(currentFood.nutrition)
      : JSON.parse(currentFood.nutrition);

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

    setIngredientEdit(IngredientEditCopy);
  };

  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={handleChange}
      className="calculator-edit-form-ingredient-select-field"
    />
  );
}

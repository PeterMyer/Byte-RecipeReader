import Select from 'react-select';
import { useEffect, useState } from 'react';
import { calculateIngredientNutrition, sumIngredientNutrition } from '../utils';

export function UnitSelect({
  measures,
  recipeNutrition,
  ingredientName,
  setRecipeNutrition,
}) {
  const currentMeasureIndex =
    recipeNutrition.ingredients[ingredientName].matchedMeasurementIndex;

  const genericMeasurements = [
    { name: 'tsp', gramWeight: 4 },
    { name: 'tbsp', gramWeight: 14.5 },
    { name: 'oz', gramWeight: 29 },
    { name: 'cup', gramWeight: 232 },
    { name: 'lb', gramWeight: 453 },
  ];

  const handleChange = (event) => {
    const recipeNutritionCopy = { ...recipeNutrition };
    recipeNutritionCopy.ingredients[ingredientName].matchedMeasurementIndex =
      event.value;
    recipeNutritionCopy.ingredients[ingredientName].currentMeasurement =
      measures[event.value];

    recipeNutritionCopy.ingredients[ingredientName].gramWeight =
      recipeNutritionCopy.ingredients[
        ingredientName
      ].currentMeasurement.gramWeight;

    recipeNutritionCopy.ingredients[ingredientName].ingredientNutrition =
      calculateIngredientNutrition(
        //nutrtionValues
        recipeNutritionCopy.ingredients[ingredientName].nurtritionPer100G,
        //gramWeight
        recipeNutritionCopy.ingredients[ingredientName].gramWeight,
        //quantity
        recipeNutritionCopy.ingredients[ingredientName].quantity,
        //servings
        recipeNutritionCopy.servings
      );

    recipeNutritionCopy.totalNutrition =
      sumIngredientNutrition(recipeNutritionCopy);
    setRecipeNutrition(recipeNutritionCopy);
  };

  let measureOptions;
  if (measures.length > 0) {
    measureOptions = measures.map((measure, index) => {
      return {
        value: `${index}`,
        label: `${measure.name} (${measure.gramWeight}g)`,
      };
    });
  } else {
    measureOptions = genericMeasurements.map((measure, index) => {
      return {
        value: `${index}`,
        label: `${measure.name} - ${measure.gramWeight}g`,
      };
    });
  }
  return (
    <Select
      options={measureOptions}
      value={measureOptions[currentMeasureIndex]}
      onChange={handleChange}
    />
  );
}

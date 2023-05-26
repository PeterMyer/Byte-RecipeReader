import Select from 'react-select';
import { useEffect, useState } from 'react';
import { calculateIngredientNutrition, sumIngredientNutrition } from '../utils';

export function UnitSelect({
  measures,
  recipeNutrition,
  // ingredientName,
  // setRecipeNutrition,
  IngredientEdit,
  setIngredientEdit,
}) {
  const currentMeasureIndex = IngredientEdit.matchedMeasurementIndex;

  const genericMeasurements = [
    { name: 'tsp', gramWeight: 4 },
    { name: 'tbsp', gramWeight: 14.5 },
    { name: 'oz', gramWeight: 29 },
    { name: 'cup', gramWeight: 232 },
    { name: 'lb', gramWeight: 453 },
  ];

  const handleChange = (event) => {
    console.log('measures', measures);
    console.log('index', event.value);

    let IngredientEditCopy = { ...IngredientEdit };
    // const recipeNutritionCopy = { ...recipeNutrition };
    // recipeNutritionCopy.ingredients[ingredientName].matchedMeasurementIndex =
    //   event.value;
    IngredientEditCopy.matchedMeasurementIndex = event.value;
    // recipeNutritionCopy.ingredients[ingredientName].currentMeasurement =
    //   measures[event.value];
    IngredientEditCopy.currentMeasurement = measures[event.value];

    // recipeNutritionCopy.ingredients[ingredientName].gramWeight =
    //   recipeNutritionCopy.ingredients[
    //     ingredientName
    //   ].currentMeasurement.gramWeight;
    IngredientEditCopy.gramWeight =
      IngredientEditCopy.currentMeasurement.gramWeight;

    console.log('IngredientEditCopy', IngredientEditCopy);

    IngredientEditCopy.ingredientNutrition = calculateIngredientNutrition(
      //nutrtionValues
      IngredientEditCopy.nurtritionPer100G,
      //gramWeight
      IngredientEditCopy.gramWeight,
      //quantity
      IngredientEditCopy.quantity,
      //servings
      recipeNutrition.servings
    );

    setIngredientEdit(IngredientEditCopy);

    // recipeNutritionCopy.totalNutrition =
    //   sumIngredientNutrition(recipeNutritionCopy);
    // setRecipeNutrition(recipeNutritionCopy);
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

import { useEffect, useState } from 'react';
import Select from 'react-select';
import { calculateIngredientNutrition } from '../utils';

export function UnitSelect({
  measures,
  recipeNutrition,
  IngredientEdit,
  setIngredientEdit,
}) {
  const currentMeasureIndex = IngredientEdit.matchedMeasurementIndex;
  const [measureSelectOptions, setMeasures] = useState(measures);

  const genericMeasurements = [
    { name: 'tsp', gramWeight: 4 },
    { name: 'tbsp', gramWeight: 14.5 },
    { name: 'oz', gramWeight: 29 },
    { name: 'cup', gramWeight: 232 },
    { name: 'lb', gramWeight: 453 },
  ];

  useEffect(() => {
    setMeasures(measures);
  }, [measures]);

  const handleChange = (event) => {
    let IngredientEditCopy = { ...IngredientEdit };
    IngredientEditCopy.matchedMeasurementIndex = event.value;
    IngredientEditCopy.currentMeasurement = measureSelectOptions[event.value];

    IngredientEditCopy.gramWeight =
      IngredientEditCopy.currentMeasurement.gramWeight;

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
  };

  const handleuseGeneric = (event) => {
    event.preventDefault();
    setMeasures(genericMeasurements);
  };

  let measureOptions;
  if (measureSelectOptions.length > 0) {
    measureOptions = measureSelectOptions.map((measure, index) => {
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
    <div className="caculator-edit-form-select-container ">
      <Select
        options={measureOptions}
        value={measureOptions[currentMeasureIndex]}
        onChange={handleChange}
        className="calculator-edit-form-unit-select-field"
      />
      <button onClick={(event) => handleuseGeneric(event)}>Use Generic</button>
    </div>
  );
}

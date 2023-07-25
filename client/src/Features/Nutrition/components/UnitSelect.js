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
  let defaultUnits = false;

  const genericMeasurements = [
    { name: 'tsp', gramWeight: 4 },
    { name: 'tbsp', gramWeight: 14.5 },
    { name: 'oz', gramWeight: 29 },
    { name: 'cup', gramWeight: 232 },
    { name: 'lb', gramWeight: 453 },
  ];

  useEffect(() => {
    let switchStatus = document.querySelector('.switch input');
    switchStatus.checked = false;

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

  const handleSwitch = () => {
    let switchStatus = document.querySelector('.switch input');
    if (switchStatus.checked) {
      setMeasures(genericMeasurements);
    } else {
      setMeasures(measures);
    }
  };

  let currentMeasures = measureSelectOptions;
  if (measureSelectOptions.length === 0) {
    currentMeasures = genericMeasurements;
  }

  let selectOptions = currentMeasures.map((measure, index) => {
    return {
      value: `${index}`,
      label: `${measure.name} (${measure.gramWeight}g)`,
    };
  });

  return (
    <div className="caculator-edit-form-select-container ">
      <Select
        options={selectOptions}
        value={selectOptions[currentMeasureIndex]}
        onChange={handleChange}
        className="calculator-edit-form-unit-select-field"
      />
      <div>
        Default Units{' '}
        <label class="switch" onClick={handleSwitch}>
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  );
}

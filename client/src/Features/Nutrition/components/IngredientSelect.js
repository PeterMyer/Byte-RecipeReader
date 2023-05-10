import React from 'react';
import Select from 'react-select';

export function IngredientSelect({
  allUsdaOptions,
  recipeNutrition,
  ingredientName,
}) {
  const options = allUsdaOptions.map((option, index) => {
    return { value: `${index}`, label: option.description };
  });

  const handleChange = (event) => {
    recipeNutrition.ingredients[ingredientName].matchedIndex = event.value;
    recipeNutrition.ingredients[ingredientName].matchedIndexItem =
      allUsdaOptions[event.value];
    console.log(recipeNutrition);
  };

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      onChange={handleChange}
    />
  );
}

import React from 'react';
import Select from 'react-select';

export function IngredientSelect({ allUsdaOptions }) {
  const options = allUsdaOptions.map((option, index) => {
    return { value: `${index}`, label: option.description };
  });

  return <Select options={options} defaultValue={options[0]} />;
}

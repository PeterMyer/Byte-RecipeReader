import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export function IngredientSelect({ allUsdaOptions }) {
  const options = allUsdaOptions.map((option, index) => {
    return { value: `${index}`, label: option.description };
  });

  console.log(options);
  return <Select options={options} defaultValue={options[0]} />;
}

import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useState } from 'react';

export const RatingSelect = ({ control }) => {
  const options = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  return (
    <div className="recipeform-input-container">
      <Controller
        name="rating"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            value={options[value]}
            options={options}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};

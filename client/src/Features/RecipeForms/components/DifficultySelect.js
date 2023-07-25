import Select from 'react-select';
import { Controller } from 'react-hook-form';

export const DifficultySelect = ({ control }) => {
  const options = [
    { value: null, label: '' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ];

  return (
    <div className="recipeform-input-container">
      <Controller
        name="difficulty"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            value={value}
            options={options}
            onChange={onChange}
            isClearable={true}
            backspaceRemovesValue={true}
          />
        )}
      />
    </div>
  );
};

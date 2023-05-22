import Select from 'react-select';

export function UnitSelect({ measures }) {
  const genericMeasurements = [
    { name: 'teaspoon', gramWeight: 4 },
    { name: 'tablespoon', gramWeight: 14.5 },
    { name: 'oz', gramWeight: 29 },
    { name: 'cup', gramWeight: 232 },
    { name: 'pound', gramWeight: 453 },
  ];
  let measureOptions;

  if (measures.length > 0) {
    measureOptions = measures.map((measure, index) => {
      return {
        value: `${index}`,
        label: `${measure.disseminationText.slice(
          measure.disseminationText.indexOf(' ')
        )}`,
      };
    });
  } else {
    measureOptions = genericMeasurements.map((measure, index) => {
      return { value: `${index}`, label: `${measure.name}` };
    });
  }
  return <Select options={measureOptions} defaultValue={measureOptions[0]} />;
}

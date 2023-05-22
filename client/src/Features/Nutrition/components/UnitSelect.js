import Select from 'react-select';

export function UnitSelect({ measures }) {
  const genericMeasurements = [
    { name: 'tsp', gramWeight: 4 },
    { name: 'tbsp', gramWeight: 14.5 },
    { name: 'oz', gramWeight: 29 },
    { name: 'cup', gramWeight: 232 },
    { name: 'lb', gramWeight: 453 },
  ];
  let measureOptions;

  if (measures.length > 0) {
    measureOptions = measures
      .filter(
        (measure) => measure.disseminationText !== 'Quantity not specified'
      )
      .map((measure, index) => {
        return {
          value: `${index}`,
          label: `${measure.disseminationText} (${measure.gramWeight}g)`,
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
  return <Select options={measureOptions} defaultValue={measureOptions[0]} />;
}

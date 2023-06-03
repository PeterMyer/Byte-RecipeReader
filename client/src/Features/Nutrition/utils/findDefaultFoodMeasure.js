import { genericMeasurements } from './genericMeasurements';

export function findDefaultFoodMeasure(measurementUnit, measurementOptions) {
  let measureOptions = [];
  let matchedMeasurement = null;
  let matchedIndex = null;
  let defaultIndex = 0;

  if (measurementOptions.length > 0) {
    console.log('measure options', measurementOptions);

    measureOptions = measurementOptions.map((measure, index) => {
      if (measure.name.includes(measurementUnit)) {
        matchedMeasurement = measurementOptions[index];
        matchedIndex = index;
      } else if (measure.name === 'Quantity not specified') {
        defaultIndex = index;
      }
      return {
        name: measure.name,
        gramWeight: measure.gramWeight,
      };
    });
  } else {
    measurementOptions = genericMeasurements;
    measurementOptions.map((measure, index) => {
      if (measure.name.includes(measurementUnit)) {
        matchedMeasurement = measurementOptions[index];
        matchedIndex = index;
      }
    });
  }

  if (matchedMeasurement === null) {
    matchedMeasurement = measurementOptions[defaultIndex];
    matchedIndex = defaultIndex;
  }

  return {
    currentMeasurement: matchedMeasurement,
    gramWeight: matchedMeasurement.gramWeight,
    measureOptions: measureOptions,
    matchedMeasurementIndex: matchedIndex,
  };
}

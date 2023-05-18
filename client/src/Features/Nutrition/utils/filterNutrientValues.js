export function filterNutrientValues(currentFood) {
  let ingredientNutrition = {};

  currentFood
    .filter(
      (obj) =>
        obj.nutrientNumber === '203' ||
        obj.nutrientNumber === '208' ||
        obj.nutrientNumber === '606' ||
        obj.nutrientNumber === '645' ||
        obj.nutrientNumber === '646' ||
        obj.nutrientNumber === '601' ||
        obj.nutrientNumber === '307' ||
        obj.nutrientNumber === '291' ||
        obj.nutrientNumber === '269' ||
        obj.nutrientNumber === '328' ||
        obj.nutrientNumber === '301' ||
        obj.nutrientNumber === '303' ||
        obj.nutrientNumber === '306'
    )
    .map((item) => {
      ingredientNutrition = {
        ...ingredientNutrition,
        [item.nutrientName]: { value: item.value, unit: item.unitName },
      };
    });

  return ingredientNutrition;
}

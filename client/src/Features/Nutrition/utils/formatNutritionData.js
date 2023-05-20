export function formatNutrientData(currentFood) {
  function formatNutrient(keyString) {
    const formattedNutrient = {
      amount: Math.round(currentFood[keyString]?.value),
      unit: currentFood[keyString]?.unit,
    };
    return formattedNutrient;
  }

  const ingredientNutrition = {
    calories: formatNutrient('Energy'),
    totalFat: formatNutrient('Total lipid (fat)'),
    saturatedFat: formatNutrient('Fatty acids, total saturated'),
    transFat: formatNutrient('Fatty acids, total trans'),
    cholesteral: formatNutrient('Cholesterol'),
    sodium: formatNutrient('Sodium, Na'),
    totalCarbs: formatNutrient('Carbohydrate, by difference'),
    dietaryFibers: formatNutrient('Fiber, total dietary'),
    sugars: formatNutrient('Sugars, total including NLEA'),
    protien: formatNutrient('Protein'),
    vitaminD: formatNutrient('Vitamin D (D2 + D3)'),
    calcium: formatNutrient('Calcium, Ca'),
    iron: formatNutrient('Iron, Fe'),
    pottassium: formatNutrient('Potassium, K'),
  };

  return ingredientNutrition;
}

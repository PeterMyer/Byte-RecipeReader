export function buildLabelData(recipeNutrition) {
  console.log('labelmaker_recipeNutrition', recipeNutrition);

  function createLabelItem(keyString, dailyValue) {
    let amount = Math.round(recipeNutrition.totalNutrition[keyString]?.amount);
    let labelItem = {
      amount: amount + recipeNutrition.totalNutrition[keyString]?.unit,
      DV: dailyValue ? Math.round((amount / dailyValue) * 100) : null,
    };
    return labelItem;
  }

  const labelData = {
    servings: recipeNutrition.servings,
    calories: createLabelItem('Energy'),
    totalFat: createLabelItem('Total lipid (fat)', 65),
    saturatedFat: createLabelItem('Fatty acids, total saturated', 20),
    transFat: createLabelItem('Fatty acids, total trans'),
    cholesteral: createLabelItem('Cholesterol', 300),
    sodium: createLabelItem('Sodium, Na', 1500),
    totalCarbs: createLabelItem('Carbohydrate, by difference', 225),
    dietaryFibers: createLabelItem('Fiber, total dietary', 25),
    sugars: createLabelItem('Sugars, total including NLEA', 50),
    protien: createLabelItem('Protein'),
    vitamenD: createLabelItem('Vitamin D (D2 + D3)', 15),
    calcium: createLabelItem('Calcium, Ca', 1300),
    iron: createLabelItem('Iron, Fe', 18),
    pottasium: createLabelItem('Potassium, K', 4700),
  };

  return labelData;
}

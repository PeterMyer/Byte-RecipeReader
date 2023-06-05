export function buildLabelData(nutritionData, servings) {
  function createLabelItem(keyString, dailyValue) {
    let amount = Math.round(nutritionData[keyString]?.amount);
    let labelItem = {
      amount: amount + nutritionData[keyString]?.unit,
      DV: dailyValue ? Math.round((amount / dailyValue) * 100) : null,
    };
    return labelItem;
  }

  const labelData = {
    servings: servings,
    calories: createLabelItem('calories'),
    totalFat: createLabelItem('totalFat', 65),
    saturatedFat: createLabelItem('saturatedFat', 20),
    transFat: createLabelItem('transFat'),
    cholesteral: createLabelItem('cholesteral', 300),
    sodium: createLabelItem('sodium', 1500),
    totalCarbs: createLabelItem('totalCarbs', 225),
    dietaryFibers: createLabelItem('dietaryFibers', 25),
    sugars: createLabelItem('sugars', 50),
    protien: createLabelItem('protien'),
    vitaminD: createLabelItem('vitaminD', 15),
    calcium: createLabelItem('calcium', 1300),
    iron: createLabelItem('iron', 18),
    pottassium: createLabelItem('pottassium', 4700),
  };

  return labelData;
}

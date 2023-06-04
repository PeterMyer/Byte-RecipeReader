import { calculateIngredientNutrition } from './calculateIngredientNutrition';
import { filterNutrientValues } from './filterNutrientValues';
import { formatNutrientData } from './formatNutritionData';
import { findDefaultFoodMeasure } from './findDefaultFoodMeasure';
import { handleQuantityInts } from './handleQuantityInts';

export function buildRecipeNutrition(
  ingredients,
  nutritionData,
  servings,
  userFoods
) {
  const recipeNutrition = {
    ingredients: {},
    totalNutrition: {},
    servings: servings,
  };

  ingredients.map((ingredient, index) => {
    let currentFood =
      ingredient.component.foodItemNutritions[0] || nutritionData[index][0];
    let ingredientQuantity = handleQuantityInts(
      ingredient.measurementQuantity.qtyAmount
    );

    let currentUserFoods = [];
    if (userFoods[index].length > 0) {
      console.log('user food', userFoods[index]);
      currentUserFoods = userFoods[index].map((food) => {
        return {
          name: food.name,
          nutrition: food.nutrition,
          source: food.source,
          foodMeasures: JSON.parse(food.foodItemMeasureOption.options),
        };
      });
    }

    recipeNutrition['ingredients'][ingredient.recipeIngredient.text] = {
      nurtritionPer100G: {},
      matchedIndex: 0,
      matchedIndexItem: currentFood,
      allUsdaOptions: [
        currentFood,
        ...currentUserFoods.filter((item) => item.name !== currentFood.name),
        ...nutritionData[index].filter(
          (item) => item.fdcId !== currentFood.fdcId
        ),
      ],
      ingredientNutrition: {},
      recipeData: ingredient,
      measurementOptions: [],
      currentMeasurement: null,
      quantity: ingredientQuantity,
      measurementUnitName: ingredient.measurementUnit.unitDescription,
      gramWeight: 0,
    };

    let nutritionValues = currentFood.fdcId
      ? filterNutrientValues(currentFood.nutrition)
      : JSON.parse(currentFood.nutrition);

    recipeNutrition['ingredients'][
      ingredient.recipeIngredient.text
    ].nurtritionPer100G = {
      ...nutritionValues,
    };

    const {
      currentMeasurement,
      gramWeight,
      measureOptions,
      matchedMeasurementIndex,
    } = findDefaultFoodMeasure(
      ingredient.measurementUnit.unitDescription,
      currentFood.foodMeasures
    );

    recipeNutrition['ingredients'][
      ingredient.recipeIngredient.text
    ].matchedMeasurementIndex = matchedMeasurementIndex;

    recipeNutrition['ingredients'][
      ingredient.recipeIngredient.text
    ].currentMeasurement = currentMeasurement;

    recipeNutrition['ingredients'][
      ingredient.recipeIngredient.text
    ].gramWeight = gramWeight;

    recipeNutrition['ingredients'][
      ingredient.recipeIngredient.text
    ].measurementOptions = measureOptions;

    const ingredientNutritionCalculated = calculateIngredientNutrition(
      nutritionValues,
      gramWeight,
      ingredientQuantity,
      servings
    );

    recipeNutrition['ingredients'][
      ingredient.recipeIngredient.text
    ].ingredientNutrition = {
      ...ingredientNutritionCalculated,
    };
  });

  return recipeNutrition;
}

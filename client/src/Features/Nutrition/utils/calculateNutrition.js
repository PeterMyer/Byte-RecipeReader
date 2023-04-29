import { sumNutritionTotals } from "./sumNutritionTotals"
import { filterNutrientValues } from "./filterNutrientValues"

export function calculateNutrition( ingredients, nutritionData, servings ) {
  let recipeNutrition = {
    "Energy": { amount: 0, unit: null },
    "Fatty acids, total monounsaturated": { amount: 0, unit: "g" },
    "Fatty acids, total polyunsaturated": { amount: 0, unit: "g" },
    "Fatty acids, total saturated": { amount: 0, unit: "g" },
    "Cholesterol": {amount: 0, unit:"mg"},
    "Sodium, Na": {amount: 0, unit:"mg"},
    "Fiber, total dietary": {amount: 0, unit:"g"},
    "Protein":{amount: 0, unit:"g"},
    "Sugars, total including NLEA":{amount: 0, unit:"g"},
    "Vitamin D (D2 + D3)":{amount: 0, unit:"mcg"},
    "Calcium, Ca":{amount: 0, unit:"mg"},
    "Iron, Fe":{amount: 0, unit:"mg"},
    "Potassium, K":{amount: 0, unit:"mg"}
  }

    ingredients.map(( ingredient,index ) => {
      let currentFood = nutritionData[ index ].foods[ 0 ]
      let defaultGramWeight = currentFood.foodMeasures.length > 0 ?
      currentFood.foodMeasures[ currentFood.foodMeasures.length - 1 ].gramWeight : 0
          
      let ingredientNutrition = filterNutrientValues( currentFood )

      sumNutritionTotals(
          ingredient,
          ingredientNutrition,
          defaultGramWeight,
          servings,
          recipeNutrition
        )
      })   

    return recipeNutrition
}
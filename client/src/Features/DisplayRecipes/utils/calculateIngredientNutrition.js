import {aggregateNutritionTotals} from './aggregateNutritionTotals'
import { filterNutrientValues } from './filterNutrientValues'

export function calculateRecipeNutrition(ingredients, nutritionData, servings){
  let recipeNutrition ={
    "Energy": 0,
    "Fatty acids, total monounsaturated": 0,
    "Fatty acids, total polyunsaturated": 0,
    "Fatty acids, total saturated": 0,
    "Cholesterol": 0,
    "Sodium, Na":0,
    "Fiber, total dietary": 0,
    "Protein":0,
    "Sugars, total including NLEA":0,
    "Vitamin D (D2 + D3)":0,
    "Calcium, Ca":0,
    "Iron, Fe":0,
    "Potassium, K":0
  }

    ingredients.map((ingredient,index)=>{
      let selectedFood = nutritionData[index].foods[0]
      let defaultGramWeight = selectedFood.foodMeasures.length > 0 ?
          selectedFood.foodMeasures[selectedFood.foodMeasures.length-1].gramWeight : 0
          
      let ingredientNutrition = filterNutrientValues(selectedFood)

      aggregateNutritionTotals(
          ingredient,
          ingredientNutrition,
          defaultGramWeight,
          servings,
          recipeNutrition
        )
      })   

    return recipeNutrition
}
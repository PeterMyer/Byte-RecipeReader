import { handleQuantityInts } from "./handleQuantityInts"

export function aggregateNutritionTotals(ingredient, nutritionObj, defaultWeight, servings, recipeNutrition){
    let calculatedRecipeNutrition = recipeNutrition
    let calculatedNutrition = {}
  
    const quantity = ingredient.measurementQuantity.qtyAmount? handleQuantityInts(ingredient.measurementQuantity.qtyAmount):1
    let unitGramWeight = ingredient.measurementUnit.unitGrams? ingredient.measurementUnit.unitGrams :defaultWeight
  
    for(let nutrient in nutritionObj){
      let scaledGramWeight = unitGramWeight*quantity
      calculatedNutrition[nutrient] = ((scaledGramWeight/100)*nutritionObj[nutrient])/servings 
    }
  
    for(let nutrient in calculatedNutrition){
      calculatedRecipeNutrition[nutrient]['amount'] += calculatedNutrition[nutrient]
    }
  }
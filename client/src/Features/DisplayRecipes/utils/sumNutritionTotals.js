import { handleQuantityInts } from "./handleQuantityInts"

export function sumNutritionTotals(ingredient, ingredientNutrition, defaultWeight, servings, recipeNutrition){
  
    const quantity = ingredient.measurementQuantity.qtyAmount? handleQuantityInts(ingredient.measurementQuantity.qtyAmount):1
    let unitGramWeight = ingredient.measurementUnit.unitGrams? ingredient.measurementUnit.unitGrams :defaultWeight
  
    for(let nutrient in ingredientNutrition){
      let scaledGramWeight = unitGramWeight*quantity
      recipeNutrition[nutrient]['amount'] += ((scaledGramWeight/100)*ingredientNutrition[nutrient])/servings 
    }
  }
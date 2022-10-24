

// Create Blob file from URL
  // ref: https://www.geeksforgeeks.org/how-to-convert-data-uri-to-file-then-append-to-formdata/

export function blobCreationFromURL(inputURI) {
  var byteString = atob(inputURI.split(',')[1]);
  var mimeString = inputURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([ab], {type: mimeString});
  return blob;
// return new File([], "img-file",{type: "image/png"});
}

export function parseEditorContentStates(contentArray){
  let ingredients = contentArray.filter((obj)=>obj.location === 'Ingredients')
  .map((obj)=>{return obj.recipeEditorContent.blocks
      .map((block)=>{return block.text })})

  let instructionContent = contentArray.filter((obj)=>obj.location === 'Instructions').map((obj)=>{return obj.recipeEditorContent})
  let instructions = instructionContent.shift()
  instructionContent.map((obj)=>obj.blocks.map((block)=>instructions.blocks.push(block)))

  return {ingredients,instructions}
}

export function partitionIngredients(recipeDataIngredients, editFormIngredients){
  let newIngredient =[]
  let formatChanges = []
  let toDelete = []

  const recipeDataLookup = recipeDataIngredients.reduce((obj, item) => (obj[item.id] = item, obj) ,{});

  for(const ingredient of editFormIngredients){
    if(!recipeDataLookup[ingredient.id]){
      newIngredient.push(ingredient.value)
    }
    else if(ingredient.value===recipeDataLookup[ingredient.id].recipeIngredient.text){
      continue
    }
    else if(ingredient.value.toLowerCase()===recipeDataLookup[ingredient.id].normText){
      formatChanges.push(ingredient)
    }
    else{
      newIngredient.push(ingredient.value)
      toDelete.push({id: ingredient.id})
    }
  }
  return {newIngredient, formatChanges,toDelete}
}

export function splitFraction(qty){
  if(qty.includes('/')){
    let splitFraction = qty.split('/')
    qty = parseInt(splitFraction[0],10)/parseInt(splitFraction[1],10)
  }
  return qty
}

export function calculateIngredientNutrition(ingredient, nutritionObj, defaultWeight, servings, recipeNutrition,setRecipeNutrition){
  let calculatedRecipeNutrition = recipeNutrition
  let calculatedNutrition = {}
  const quantity = ingredient.measurementQuantity.qtyAmount? splitFraction(ingredient.measurementQuantity.qtyAmount):1
  let unitGramWeight = ingredient.measurementUnit.unitGrams? ingredient.measurementUnit.unitGrams :defaultWeight
  // console.log('ingredient:',ingredient.normText)

  for(let nutrient in nutritionObj){
    let scaledGramWeight = unitGramWeight*quantity
    calculatedNutrition[nutrient] = ((scaledGramWeight/100)*nutritionObj[nutrient])/servings 
    // console.log('recipe Nutrition addition:',nutrient,':',recipeNutrition[nutrient])
    // console.log('post Nutrition addition:',nutrient,':',recipeNutrition[nutrient])
  }

  for(let nutrient in calculatedNutrition){
    calculatedRecipeNutrition[nutrient] += calculatedNutrition[nutrient]
  }
  // console.log('Calculated Ingredient Nutrition',calculatedNutrition)
  // console.log('Current Recipe Nutrition',recipeNutrition)


}
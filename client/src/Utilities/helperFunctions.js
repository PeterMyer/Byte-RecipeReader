
import {EditorState,ContentState} from 'draft-js'

// Create Blob file from URL
  // ref: https://www.geeksforgeeks.org/how-to-convert-data-uri-to-file-then-append-to-formdata/

export function blobCreationFromURL(inputURI) {
  var byteString = window.atob(inputURI.split(',')[1]);
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

export function splitMixedNumber(qty){
  let splitNumber = qty.split(' ')
  let wholeNum = parseInt(splitNumber[0])
  let fraction = splitFraction(splitNumber[1])
  qty = wholeNum + fraction
  return qty
}

export function handleQuantityInts(qty){
  if(qty.includes(' ')){
    qty = splitMixedNumber(qty)
    return qty
  } else if (qty.includes('/')){
    qty = splitFraction(qty)
    return qty
  } else {
  return qty}
}

export function calculateIngredientNutrition(ingredient, nutritionObj, defaultWeight, servings, recipeNutrition,setRecipeNutrition){
  let calculatedRecipeNutrition = recipeNutrition
  let calculatedNutrition = {}

  const quantity = ingredient.measurementQuantity.qtyAmount? handleQuantityInts(ingredient.measurementQuantity.qtyAmount):1
  let unitGramWeight = ingredient.measurementUnit.unitGrams? ingredient.measurementUnit.unitGrams :defaultWeight

  for(let nutrient in nutritionObj){
    let scaledGramWeight = unitGramWeight*quantity
    calculatedNutrition[nutrient] = ((scaledGramWeight/100)*nutritionObj[nutrient])/servings 
  }

  for(let nutrient in calculatedNutrition){
    calculatedRecipeNutrition[nutrient] += calculatedNutrition[nutrient]
  }
}

export function createParentEditorState(recipeData){
  let editorStateObj = {}

  recipeData.forEach((recipeObj)=>{
    const recipeId = recipeObj.id
    const editorState = EditorState.createWithContent(ContentState.createFromText(recipeObj.OcrResult.data.text))
    const localEditorObj = {[recipeId]:editorState}

    editorStateObj= {...editorStateObj,...localEditorObj}
  })

  return editorStateObj
}

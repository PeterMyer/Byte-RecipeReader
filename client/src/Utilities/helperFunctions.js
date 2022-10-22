

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
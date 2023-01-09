export function partitionIngredients( recipeDataIngredients, editFormIngredients ) {
  let newIngredient = []
  let formatChanges = []
  let toDelete = []
  const recipeDataLookup = recipeDataIngredients.reduce(( obj, item ) => ( obj[item.id] = item, obj ),{});
  
  for ( const ingredient of editFormIngredients ) {
    if ( !recipeDataLookup[ingredient.id] ) {
      newIngredient.push( ingredient.value )
    }
    else if ( ingredient.value === recipeDataLookup[ingredient.id].recipeIngredient.text ) {
      continue
    }
    else if ( ingredient.value.toLowerCase() === recipeDataLookup[ingredient.id].normText ) {
      formatChanges.push(ingredient)
    }
    else {
      newIngredient.push( ingredient.value )
      toDelete.push( { id: ingredient.id } )
    }
  }
  return { newIngredient, formatChanges, toDelete }
}
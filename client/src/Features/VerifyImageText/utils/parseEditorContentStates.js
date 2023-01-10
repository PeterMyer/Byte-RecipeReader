export function parseEditorContentStates( contentArray ) {
  let ingredients = contentArray.filter(( obj ) => obj.location === "ingredients" )
  .map(( obj ) => { 
    return obj.recipeEditorContent.blocks
      .map(( block ) => { 
        return block.text 
      })
  })

  let instructionContent = contentArray.filter(( obj ) => obj.location === "instructions" )
    .map(( obj ) =>{
      return obj.recipeEditorContent
    })
  let instructions = instructionContent.shift()
  instructionContent.map(( obj ) => obj.blocks
    .map(( block ) => instructions.blocks.push( block ))
  )

  return { ingredients, instructions }
}
import {EditorState,ContentState} from 'draft-js'

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
  
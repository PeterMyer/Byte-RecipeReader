import {Editor, EditorState, ContentState} from 'draft-js'
import apiService from "./apiService";
import React from 'react'


export default function RecipeEditor(props){
    const [editorState, setEditorState] = React.useState(() => EditorState.createWithContent(ContentState.createFromText(props.readImgText)))
    
    const handleSubmit = async ()=>{
        let currentContent = editorState.getCurrentContent().getPlainText()
        let splitContent = currentContent.split('\n')

        let input = JSON.stringify(splitContent)

        let response = await apiService.upload.classifyText(input)

        for(let i=0; i<response.data.length; i++){
            console.log("   ")
            console.log(response.data[0])}
        }


    return(
        <div>
            <Editor
                editorState={editorState}
                onChange = {setEditorState}
            />
            <button onClick={handleSubmit} >Save Recipe</button>
            <button>Classify Recipe </button>
        </div>
    )
}
import {Editor, EditorState} from 'draft-js'
import React from 'react'


export default function RecipeEditor(){
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())


    return(
        <div>
            <Editor
                editorState={editorState}
                onChange = {setEditorState}
            />
        </div>
    )
}
import {Editor, EditorState, ContentState} from 'draft-js'
import React from 'react'


export default function RecipeEditor(props){
    const [editorState, setEditorState] = React.useState(() => EditorState.createWithContent(ContentState.createFromText(props.readImgText)))

    return(
        <div>
            <Editor
                editorState={editorState}
                onChange = {setEditorState}
            />
        </div>
    )
}
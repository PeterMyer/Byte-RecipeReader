import {Editor, EditorState, ContentState} from 'draft-js'
import React, { useContext , useEffect} from 'react'
import {Context} from './VerifyImgTxtContainer'

export function VerifyTextEditor(props){
    const data = useContext(Context)
    const [editorState, setEditorState] = React.useState(() => EditorState.createWithContent(ContentState.createFromText(props.readImgText)))
    const setParentEditorState = data.setParentEditorState
    const parentEditorState = data.parentEditorState
    const recipeId = props.recipeId


    useEffect(()=>{
        const updateEditorState = ()=>{
            const localEditorObj = {[recipeId]:editorState}
            setParentEditorState({...parentEditorState,...localEditorObj})
        }
        updateEditorState()
    },[editorState])

    return(
        <div className = 'verifyTextBox'>
            <Editor 
                editorState={editorState}
                onChange = {setEditorState}
            />
        </div>
    )
}
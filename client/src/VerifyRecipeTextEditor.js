import {Editor, EditorState, ContentState} from 'draft-js'
import React, { useContext , useEffect,useRef} from 'react'
import {Context} from './VerifyImgTxt'

export default function VerifyTextEditor(props){
    const data = useContext(Context)
    const [editorState, setEditorState] = React.useState(() => EditorState.createWithContent(ContentState.createFromText(props.readImgText)))
    const setParentEditorState = data.setParentEditorState
    const parentEditorState = data.parentEditorState
    const recipeId = props.recipeId

    const updateEditorState =()=>{
        const localEditorObj = {[recipeId]:editorState}
        setParentEditorState({...parentEditorState,...localEditorObj})
    }
    
    useEffect(()=>{
        updateEditorState()
    },[])

    return(
        <div className = 'verifyTextBox'>
            <Editor 
                editorState={editorState}
                onChange = {setEditorState}
            />
        </div>
    )
}
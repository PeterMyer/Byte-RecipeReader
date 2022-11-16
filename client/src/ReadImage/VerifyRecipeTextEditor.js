import {Editor, EditorState, ContentState} from 'draft-js'
import React, { useContext , useEffect} from 'react'
import {Context} from './VerifyImgTxt'

export default function VerifyTextEditor(props){
    const data = useContext(Context)
    const [editorState, setEditorState] = React.useState(() => EditorState.createWithContent(ContentState.createFromText(props.readImgText)))
    const setParentEditorState = data.setParentEditorState
    const parentEditorState = data.parentEditorState
    const recipeId = props.recipeId


    useEffect(()=>{
        const updateEditorState = ()=>{
            console.log('trip', recipeId)
            console.log('parentEditorState', parentEditorState)
    
    
            const localEditorObj = {[recipeId]:editorState}
            console.log('localEditorObj', localEditorObj)
    
            setParentEditorState({...parentEditorState,...localEditorObj})
            console.log('parentEditorState', parentEditorState)
            console.log('hello')
    
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
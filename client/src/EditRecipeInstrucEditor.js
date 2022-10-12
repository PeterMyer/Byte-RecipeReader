import {Editor, EditorState} from 'draft-js'
import React from 'react'
import { Controller } from 'react-hook-form'


export default function RecipeEditor({control}){

    return(
        <div>
            <Controller
                name="DraftJs"
                control={control}
                render={({field: {value, onChange} }) => (
                    <Editor 
                        editorState={value}
                        onChange={onChange}/>
                )}
            />
        </div>
    )
}
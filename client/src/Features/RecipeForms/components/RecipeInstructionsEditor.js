import {Editor, EditorState, RichUtils} from 'draft-js'
import React, {useCallback, useState} from 'react'
import { Controller } from 'react-hook-form'

export function RecipeInstructionsEditor({control}){

    return(
        <div className = "recipeform-input-instructions-container">
            <Controller
                name="DraftJs"
                control={control}
                render={({field: {value, onChange} }) => (
                    <Editor 
                        editorState={value}
                        onChange={onChange}
                    />
                )}
            />
        </div>
    )
}
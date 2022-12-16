import React, {useState, useContext} from "react";
import ImageCropper from "./ImageCropper";
import FabricCanvas from "./FabricCanvas";
import {Context} from './CreateNewRecipe'

export default function RecipeSectionSelection(){
    const context = useContext(Context)
    const showCropper = context.showCropper
    const fabricCanvas = context.fabricCanvas
    const height = context.height

    return(
    <div className='test-parent' >
        <span className="create-new-recipe-header">
            <h1>Recipe Reader</h1>
        </span>
        <> 
         {showCropper?

            <ImageCropper/>
        :
            <FabricCanvas/>}
        </>
    </div>
    )
}

import React, {useContext} from "react";
import ImageCropper from "./ImageCropper";
import FabricCanvas from "./FabricCanvasContainer";
import {Context} from './ContextProvider'

export default function SelectionContainer(){
    const context = useContext(Context)
    const showCropper = context.showCropper

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

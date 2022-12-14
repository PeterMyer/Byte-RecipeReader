import React, {useState, useContext} from "react";
import ImageCropper from "./ImageCropper";
import FabricCanvas from "./FabricCanvas";
import {Context} from './CreateNewRecipe'


export default function RecipeSectionSelection(){
    const context = useContext(Context)
    const showCropper = context.showCropper

    return(
    <>
        {showCropper?
           <ImageCropper/>
            :
            <FabricCanvas/>
        }
    </>
    )
}

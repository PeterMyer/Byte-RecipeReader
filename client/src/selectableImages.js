import React from "react";
import RenderSelectableImage from "./RenderSelectableImg";
import {useContext, } from 'react'
import { Context } from "./CreateRecipeImages";

export default function SelectableImages () {
    const data = useContext(Context);
    let retrievedImages = Object.values(data.ImgData)

    return(
      <div>
        Selectable Images
        <div>
         {retrievedImages !== null ?
         retrievedImages.map((image)=>{
          return(
            <div>
              <RenderSelectableImage filePath={image} />
            </div>)
          })
          :
          <div>
            You have no images
          </div>}
        </div>
      </div>
  )}

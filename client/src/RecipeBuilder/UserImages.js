import React from "react";
import RenderImage from "./RenderImg";
import {useContext, } from 'react'
import { Context } from "./RecipeBuilder";

export default function UserImages () {
    const data = useContext(Context);
    let userImages = Object.values(data.ImgData)

    return(
      <div>
        Available Images
        <div className = "recipebuilder_availableImages">
         {userImages !== null ?
         userImages.map((image)=>{
          return(
            <div>
              <RenderImage key = {image.id} imgData={image} />
            </div>)
          })
          :
          <div>
            You have no images
          </div>}
        </div>
      </div>
  )}

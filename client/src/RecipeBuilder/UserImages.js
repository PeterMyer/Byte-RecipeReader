import React from "react";
import RenderImage from "./RenderImg";
import {useContext, } from 'react'
import { Context } from "./RecipeBuilder";

export default function UserImages () {
    const data = useContext(Context);
    let userImages = Object.values(data.ImgData)

    return(
      <div>
        Your Images
        <div>
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

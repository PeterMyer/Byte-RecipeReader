import React, {useContext, useState,useEffect} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {createBlobFromDataURL} from '../utils/createBlobFromDataURL'
import { fabric, Rectangle } from 'fabric'
import { Context } from "./CreateNewRecipe";
import {v4 as uuidv4} from 'uuid';

export default function ImageCropper(props) {
    const context = useContext(Context)
    const result = context.result
    const showCropper = context.showCropper
    const setShowCropper = context.setShowCropper
    const section = context.section
    const instructions = context.instructions
    const setInstructions = context.setInstructions
    const ingredients = context.ingredients
    const setIngredients = context.setIngredients
    const fabricCanvas = context.fabricCanvas
    const cropObjects = context.cropObjects
    const setCropObjects = context.setCropObjects
    const recipeImg = context.recipeImg
    const setRecipeImg = context.setRecipeImg
    const height = context.height

    const [imgData ] = useState(props.imgData)
    const [cropper, setCropper] = useState(null);
    const { user } = useAuth0();
    const images = props.images
    const setImages = props.setImages
    const setShow = props.setShow

 const getCropData = async () => {
    if (cropper !== null) {
      const croppedImg = cropper.getCroppedCanvas().toDataURL('image/jpeg')
      let cropperBlob = createBlobFromDataURL(croppedImg)
      let imgObjURL = URL.createObjectURL(cropperBlob);
      const index = uuidv4()
      switch(section){
        case 'instructions':
          setCropObjects({...cropObjects, [index]: {id:index,imgObjURL:imgObjURL, location:"instructions", coordinates:cropper.getCropBoxData(cropper)}})
          break
        case 'ingredients':
          setCropObjects({...cropObjects, [index]: {id:index,imgObjURL:imgObjURL, location:"ingredients", coordinates:cropper.getCropBoxData(cropper)}})
          break
        case 'image':
          setRecipeImg({[index]: {id:index,imgObjURL:imgObjURL, imgBlob: cropperBlob,location:"image", coordinates:cropper.getCropBoxData(cropper)}})
          break
        default:
          break
      }
      setShowCropper(false)
    }
  };

  const handleCancel=()=>{
    setShowCropper(false)
  }

    return(
      <div id="cropper-container" className="recipe-section-selection-container">
        <div className = "section-selection-buttons-container">
          <button onClick = {getCropData} >
              Accept
          </button>
          <button onClick = {handleCancel} >
              Cancel
          </button>
        </div>
        <div id="cropper-id">
        <Cropper
            style={{ width: 400, height: height}}
            zoomTo={.15}
            initialAspectRatio={3/2}
            src={fabricCanvas}
            viewMode={2}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={.75}
            zoomable={false}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
                setCropper(instance);
            }}
            guides={true}
        />
        </div>
      </div>
    )
  }

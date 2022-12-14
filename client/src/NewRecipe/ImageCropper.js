import React, {useContext, useState,useEffect} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import apiService from "../Utilities/apiService";
import {blobCreationFromURL} from '../Utilities/helperFunctions'
import { fabric, Rectangle } from 'fabric'
import { Context } from "./CreateNewRecipe";

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


    const [imgData ] = useState(props.imgData)
    const [cropper, setCropper] = useState(null);
    const { user } = useAuth0();
    const images = props.images
    const setImages = props.setImages
    const setShow = props.setShow

 const getCropData = async () => {
    if (cropper !== null) {
      const croppedImg = cropper.getCroppedCanvas().toDataURL('image/jpeg')
      let cropperBlob = blobCreationFromURL(croppedImg)
      let imgObjURL = URL.createObjectURL(cropperBlob);

      switch(section){
        case 'instructions':
          setInstructions([...instructions,{imgObjURL:imgObjURL, coordinates:cropper.getCropBoxData(cropper)}])
          break
        case 'ingredients':
          setIngredients([...ingredients, {imgObjURL:imgObjURL, coordinates:cropper.getCropBoxData(cropper)}])
          break
        default:
            break
      }
      setShowCropper(false)
    }
  };

    return(
      <>
        <Cropper
            style={{ width: 400}}
            zoomTo={.15}
            initialAspectRatio={1}
            src={fabricCanvas}
            viewMode={2}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            zoomable={false}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
                setCropper(instance);
            }}
            guides={true}
        />
        <div>
          <button onClick = {getCropData} >
              Accept
          </button>
          {/* {cropper === null ? null: (<button onClick={()=>cropper.setDragMode("move")} > Drag </button>)}
          {cropper === null ? null: (<button onClick={()=>cropper.setDragMode("crop")} > Crop </button>)} */}
          {/* {cropper === null ? null: (<button onClick={()=>cropper.zoom(0.1)} > Zoom In </button>)}
          {cropper === null ? null: (<button onClick={()=>cropper.zoom(-0.1)} > Zoom Out </button>)} */}
        </div>
      </>
    )
  }

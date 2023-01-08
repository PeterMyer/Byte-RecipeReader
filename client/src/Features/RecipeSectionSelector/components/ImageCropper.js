import React, { useContext, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {createBlobFromDataURL} from '../utils/createBlobFromDataURL'
import { fabric } from 'fabric'
import { Context } from "./ContextProvider";
import {v4 as uuidv4} from 'uuid';

export default function ImageCropper(props) {
    const context = useContext(Context)
    const setShowCropper = context.setShowCropper
    const section = context.section
    const fabricCanvas = context.fabricCanvas
    const cropObjects = context.cropObjects
    const setCropObjects = context.setCropObjects
    const setRecipeImg = context.setRecipeImg
    const height = context.height
    const [cropper, setCropper] = useState(null);

 const handleCrop = async () => {
    if (cropper !== null) {
      const croppedImgDataURL = cropper.getCroppedCanvas().toDataURL('image/jpeg')
      let cropperBlob = createBlobFromDataURL(croppedImgDataURL)
      let imgObjectURL = URL.createObjectURL(cropperBlob);
      const index = uuidv4()
      switch(section){
        case 'instructions':
          setCropObjects({...cropObjects, [index]: {id:index,imgObjURL:imgObjectURL, location:"instructions", coordinates:cropper.getCropBoxData(cropper)}})
          break
        case 'ingredients':
          setCropObjects({...cropObjects, [index]: {id:index,imgObjURL:imgObjectURL, location:"ingredients", coordinates:cropper.getCropBoxData(cropper)}})
          break
        case 'image':
          setRecipeImg({[index]: {id:index, imgObjectURL:imgObjectURL, imgBlob:cropperBlob, location:"image", coordinates:cropper.getCropBoxData(cropper)}})
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
          <button onClick = {handleCrop} >
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

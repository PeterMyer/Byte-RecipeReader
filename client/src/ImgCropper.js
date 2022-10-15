import React, {useState, useEffect, useRef} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useLocation } from 'react-router-dom';
import apiService from "./Utilities/apiService";
import {blobCreationFromURL} from './Utilities/helperFunctions'

function ImgCropper() {
  const {state} = useLocation()
  const [imgData, setImageData] = useState(state.imgData)
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState(<any/>);

 const getCropData = async () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL('image/jpeg'))

      let cropperBlob = blobCreationFromURL(cropData)

      let blobFile = new File([cropperBlob], imgData.filepath , { type: 'image/jpeg' });

      const data = new FormData()
      data.append("uploaded_file", blobFile)
      apiService.upload.saveImage(data)
    }
  };

    return(
      <div className = "editor">
        <div>Edit Image</div>
        <Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          src={imgData.imgBlob}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={true}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
        <div>
          <button onClick = {getCropData} >
              Crop
          </button>
        </div>
      </div>
    )
  }

export default ImgCropper


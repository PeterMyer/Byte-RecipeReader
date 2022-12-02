import React, {useState} from "react";
import { useAuth0 } from '@auth0/auth0-react';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import apiService from "../Utilities/apiService";
import {blobCreationFromURL} from '../Utilities/helperFunctions'

function ImgCropper(props) {
  const [imgData ] = useState(props.imgData)
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const { user } = useAuth0();

  const images = props.images
  const setImages = props.setImages
  const setShow = props.setShow

 const getCropData = async () => {
    if (cropper !== null) {
      const croppedImg = cropper.getCroppedCanvas().toDataURL('image/jpeg')
      setCropData(croppedImg)
      let cropperBlob = blobCreationFromURL(croppedImg)
      let blobFile = new File([cropperBlob], imgData.filepath , { type: 'image/jpeg' });
      const data = new FormData()
      data.append("uploaded_file", blobFile)
      let response = await apiService.upload.saveImage(data, user.sub)
      let updatedState = [...images,...response.data.result]
      setImages(Object.assign(updatedState))
      setShow(false)
    }
  };

    return(
      <div className = "editor">
        <Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={.15}
          initialAspectRatio={1}
          src={imgData.imgBlob}
          viewMode={2}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
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
              Accept
          </button>
          {cropper === null ? null: (<button onClick={()=>cropper.setDragMode("move")} > Drag </button>)}
          {cropper === null ? null: (<button onClick={()=>cropper.setDragMode("crop")} > Crop </button>)}
          {cropper === null ? null: (<button onClick={()=>cropper.zoom(0.1)} > Zoom In </button>)}
          {cropper === null ? null: (<button onClick={()=>cropper.zoom(-0.1)} > Zoom Out </button>)}
        </div>
      </div>
    )
  }

export default ImgCropper


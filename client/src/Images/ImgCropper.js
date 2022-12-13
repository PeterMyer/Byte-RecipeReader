import React, {useState} from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import apiService from "../Utilities/apiService";
import {blobCreationFromURL} from '../Utilities/helperFunctions'
import { fabric, Rectangle } from 'fabric'

function ImgCropper(props) {
  const [imgData ] = useState(props.imgData)
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const { user } = useAuth0();
  const images = props.images
  const setImages = props.setImages
  const setShow = props.setShow
  const section = props.section
  const instructions = props.instructions
  const setInstructions = props.setInstructions
  const ingredients = props.ingredients
  const setIngredients = props.setIngredients
  const modalUse = props.modalUse
  const setModalUse = props.setModalUse



 const getCropData = async () => {
    if (cropper !== null) {
      const croppedImg = cropper.getCroppedCanvas().toDataURL('image/jpeg')
      let cropperBlob = blobCreationFromURL(croppedImg)
      let blobFile = new File([cropperBlob], imgData.filepath , { type: 'image/jpeg' });
      const data = new FormData()
      data.append("uploaded_file", blobFile)

      console.log('coordinates:',cropper.getCropBoxData(cropper))

      switch(section){
        case 'instructions':
          setInstructions([...instructions,{data:data, coordinates:cropper.getCropBoxData(cropper)}])
          break
        case 'ingredients':
          setIngredients([...ingredients, {data:data, coordinates:cropper.getCropBoxData(cropper)}])
          break
        default:
          setShow(false)
      }
      setModalUse('default')
      // cropper.destory()
      // setShow(false)
    }
  };

    return(
      <div className = "editor">
        <Cropper
          style={{ width: "100%" }}
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


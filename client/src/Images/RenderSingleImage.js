import React, { useState, useEffect } from "react";
import apiService from "../Utilities/apiService";
import { Link } from "react-router-dom";
import ImgModal from './ImgModal'


export default function RenderSingleImage(props) {
  const filePath = props.filePath
  const imgMetaData  = props.imgMetaData
  const [imgData, setImgData] = useState(<any/>)
  const [show, setShow] = useState(false)
  const images = props.images
  const setImages = props.setImages
  const [edit,setEdit] = useState(false)

  useEffect(()=> {
    fetchData(filePath)
  },[])

  const fetchData = async (filePath) =>{
      let response = await apiService.import.retrieveFile(filePath)
      setImgData({...imgMetaData, 'imgBlob': response})
  }

  const handleDelete = async ()=>{
    await apiService.upload.deleteImage({id: imgMetaData.id, filePath})
    setImages(images.filter((imgObj)=>imgObj.id !==imgMetaData.id))
  }

  return(
 <div class = "imgContainer">
    <img
      src={imgData.imgBlob}
      height="250"
      width="250"
      alt="null"/>
      <div className = "imgCardButtonContainer">
        <button onClick={()=> setShow(true)}
          title = "expand"
          className ="imgCardButton">
          <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
        </button>
          <ImgModal 
            onClose={() => setShow(false)} 
            show={show}
            imgSrc = {imgData}
            useCase ="default"
            edit ={edit}
            setEdit = {setEdit}
            images = {images}
            setImages = {setImages}
            setShow = {setShow}
          />
        <button onClick={()=> handleDelete()}
          title ="delete"
          className = "imgCardButton">
          <i class="fa-solid fa-trash"></i>
      </button>
      </div>
    </div>
  )
}

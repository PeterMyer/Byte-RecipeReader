import React, { useState, useEffect } from "react";
import apiService from "../Utilities/apiService";
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
      console.log('aws response', response)
      setImgData({...imgMetaData, 'imgBlob': response})
  }

  const handleDelete = async ()=>{
    await apiService.upload.deleteImage({id: imgMetaData.id, filePath})
    setImages(images.filter((imgObj)=>imgObj.id !==imgMetaData.id))
  }

  return(
 <div class = "imgContainer">
    <button 
    onClick={()=> setShow(true)}
    className = "imgcardButton_ModalOpen">
      <img
        src={imgData.imgBlob}
        height="250"
        width="250"
        alt="null"/>
    </button>
      <div className = "imgCardButtonContainer">
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

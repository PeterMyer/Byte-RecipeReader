import React, {useState, useEffect} from "react";
import apiService from "../Utilities/apiService";
import RenderSingleImage from "./RenderSingleImage"
import ImgModal from './ImgModal'
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from "../Sidebar/ImagesSidebar";


export default function UserImages () {
  const [images, setImages] = useState(null)
  const [show, setShow] = useState(false)
  const [upload, setUpload] = useState(false)
  const { user } = useAuth0();


  const getImages = async() => {
    console.log(user.sub)
    let imgs = await apiService.import.retrieveFilePaths(user.sub)
    setImages(imgs)
    }

    useEffect(()=>{
      getImages()
    },[])

    const handleUpload = async()=>{
      setUpload(true)
      setShow(true)}

    return(
      <section className = "userImagesPage">
        <Sidebar/>
        <div className = "userImagesContent">
          <div className="imagesHeader">
          <h1>Your Images</h1>
          <button onClick={()=> handleUpload()}>Add Image</button>
          <ImgModal 
            onClose={() => setShow(false)} 
            upload = {upload}
            show={show}
            setShow={setShow}
            setUpload={setUpload}
            images = {images}
            setImages = {setImages}
          />
        </div>

        
        <div className="imagesContainer">
          {images !== null ?
          images.map((image)=>{
            return(
              <div>
                <RenderSingleImage 
                  key = {image.id}
                  onDelete ={()=> setImages()}
                  filePath={image.filepath} 
                  imgMetaData = {image}
                  images = {images}
                  setImages = {setImages}
          
                />
              </div>
            )
          })
          :
          <div>
            No Images
          </div>}
      </div>
      </div>
    </section>
  )}

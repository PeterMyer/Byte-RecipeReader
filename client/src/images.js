import React from "react";
import apiService from "./apiService";
import { Link } from "react-router-dom";


class UserImages extends React.Component {
  constructor() {
    super()
    this.state = {
     images: null
    }
  }

  componentDidMount = async() => {
    let imgs = await apiService.import.retrieveImage()
    console.log(imgs)
    this.setState({images:imgs})
    }

  // renderImages(){
  //   let retrievedImages = this.state.images
  //   if(retrievedImages !== null){
  //     const imagesElement = document.querySelector('.images')
  //     imagesElement.innerHTML = '';
  //     retrievedImages.images.forEach(image => {
  //       const img = document.createElement('img');
  //       img.src = image.filePath;
  //       img.height = '200'
  //       imagesElement.appendChild(img)
  //     });
  //     return (
  //       <div>
  //         {imagesElement}
  //      </div>)
  //   }


  render() {
    const retrievedImages = this.state.images
    return(
    <div>
     <div>Your Images</div>
        <div>
        {retrievedImages !== null ?
        retrievedImages.map((image)=>{
          const imgfile = document.createElement('img')
          let serverImgSrc = 'http://localhost:3001/images'
          imgfile.src = serverImgSrc+image.filepath
          return(
            <img
            src={imgfile.src}
            height="250"
            width="250"/>
          )
        })
        :
        <div>
        No Images
        </div>}

      </div>

     <Link to="/">Home</Link>|{" "}
     <Link to="/upload">Upload New Files </Link> |{" "}
    </div>
  )}}


export default UserImages

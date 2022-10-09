import React from "react";
import apiService from "./apiService";
import { Link } from "react-router-dom";
import RenderImage from "./RenderUserImage"


class UserImages extends React.Component {
  constructor() {
    super()
    this.state = {
     images: null
    }
  }

  componentDidMount = async() => {
    let imgs = await apiService.import.retrieveFilePaths()
    this.setState({images:imgs})
    }

  render() {
    const retrievedImages = this.state.images
    return(
      <div>
    <div>
     <div>Your Images</div>
        <div>
         {retrievedImages !== null ?
         retrievedImages.map((image)=>{
          return(
            <div>
              <RenderImage filePath={image.filepath} imgMetaData = {image} />
            </div>
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
    </div>
  )}}


export default UserImages

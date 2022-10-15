import React from "react";
import apiService from "../Utilities/apiService";
import { Link } from "react-router-dom";
import RenderSingleImage from "./RenderSingleImage"

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
      <section>
        <div>
          <h1>Your Images</h1>
          <Link to="/upload">Upload New Image</Link> 
        </div>
        <div className="imagesContainer">
          {retrievedImages !== null ?
          retrievedImages.map((image)=>{
            return(
              <div>
                <RenderSingleImage filePath={image.filepath} imgMetaData = {image} />
              </div>
            )
          })
          :
          <div>
            No Images
          </div>}
      </div>
    </section>
  )}}


export default UserImages

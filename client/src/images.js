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
          const imgFile = document.createElement('img')
          let serverImgSrc = 'http://localhost:3001/images'
          imgFile.src = serverImgSrc+image.filepath
          return(
            <div class = "imgContainer">
              <img
              src={imgFile.src}
              height="250"
              width="250"
              alt="null"/>
              <Link to={"/edit"} state= {{filePath:imgFile.src}}>
                <button>
                  Edit
                </button>
              </Link>
              <button>
                Use
              </button>
              <button>
                Delete
              </button>
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

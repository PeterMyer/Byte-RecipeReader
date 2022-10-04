import React from "react";
import apiService from "./apiService";
import RenderSelectableImage from "./RenderSelectableImg";


class SelectableImages extends React.Component {
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
        Selectable Images
        <div>
         {retrievedImages !== null ?
         retrievedImages.map((image)=>{
          return(
            <div>
              <RenderSelectableImage filePath={image.filepath} />
            </div>
          )
        })
        :
        <div>
          You have no images
        </div>}
      </div>
    </div>
  )}}


export default SelectableImages

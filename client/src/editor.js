import React, {useState, useEffect} from "react";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { useLocation } from 'react-router-dom';

function Editor() {
  const {state} = useLocation()
  const [imagePath, setImagePath] = useState(state.filePath)

  useEffect(()=>{
  let htmlimage = document.getElementById("recipeImg");
  let cropper = new Cropper(htmlimage)})

    return(
      <div className = "editor">
        <div>Edit Image</div>
        <div className="image-container">
          <img id="recipeImg" src={imagePath} alt="null"/>
        </div>
      </div>
    )
  }




export default Editor


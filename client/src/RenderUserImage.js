import React, { useState, useEffect } from "react";
import apiService from "./apiService";
import { Link } from "react-router-dom";

export default function RenderImage(props) {
  const filePath = props.filePath
  const [imgData, setImgData] = useState(<any/>)


  useEffect(()=> {
    fetchData(filePath)
  },[])

  const fetchData = async (filePath) =>{
      let response = await apiService.import.retrieveFile(filePath)
      setImgData(response)
  }

  return(
 <div class = "imgContainer">
    <img
      src={imgData}
      height="250"
      width="250"
      alt="null"/>
      <Link
        to={"/edit"}
        state= {{imgData}}>
        <button>
          Edit
        </button>
      </Link>
      <Link
        to={"/read"}
        state= {{imgData}}>
        <button>
          Read this Img
        </button>
      </Link>
      <button>
        Delete
      </button>

    </div>
  )
}

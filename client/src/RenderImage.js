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
        console.log(filePath)
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
        state= {{
          filePath: filePath,
          imgData: imgData
       }}>
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
}

import React, { useState, useEffect } from "react";
import apiService from "./apiService";
import { useDrag } from 'react-dnd'


export default function RenderSelectableImage(props) {
  const filePath = props.filePath
  const [imgData, setImgData] = useState(null)

  useEffect(()=> {
    fetchData(filePath)
  },[])

  const fetchData = async (filePath) =>{
      let response = await apiService.import.retrieveFile(filePath)
      setImgData(response)
  }

  const [{isDragging}, dragRef] = useDrag(()=>({
    type: 'img',
    item: {imgData},
    collect: (monitor)=>({
        isDragging: !!monitor.isDragging()
    })
}),[imgData])

  return(
    <div class = "imgContainer" ref={dragRef}>
        <img
        src={imgData}
        height="150"
        width="150"
        alt="null"
        />
    </div>
  )
}

import React, { useState, useEffect } from "react";
import { useDrag } from 'react-dnd'

export default function RenderSelectableImage(props) {
  const imgData = props.imgData

  const [{isDragging}, dragRef] = useDrag(()=>({
    type: 'imgData',
    item: {imgData},
    collect: (monitor)=>({
        isDragging: !!monitor.isDragging()
    })
}),[imgData])

  return(
    <div class = "imgContainer" ref={dragRef}>
        <img
        src={imgData.imgBlob}
        height="150"
        width="150"
        alt="null"
        />
    </div>
  )
}

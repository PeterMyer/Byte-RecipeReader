import React, { useState, useEffect } from "react";
import { useDrag } from 'react-dnd'

export default function RenderSelectableImage(props) {
  const imgData = props.filePath
  // console.log('render selectable', imgData)

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

import React, { useState, useEffect, useContext } from "react";
import { useDrag } from 'react-dnd'
import { Context } from "./CreateRecipeImages";

export default function RenderSelectableImage(props) {
  const ImgData = props.imgData
  const data = useContext(Context)
  const basketState = data.basketState
  const setBasketState = data.setBasketState


  const [{isDragging}, dragRef] = useDrag(()=>({
    type: 'imgData',
    item: ImgData,
    end:(item, monitor)=>{
      const dropResult = monitor.getDropResult()
      if(dropResult && item.location !== dropResult.location){
        // item.location = dropResult.location
        setBasketState((basketState) =>
          basketState.map(obj =>{ 
            console.log('basketState',basketState)
            if(obj.id===item.id){
              return {...obj, location:  dropResult.location}
            }
            return obj}
        ))
      }
    },
    collect: (monitor)=>({
        isDragging: !!monitor.isDragging()
    })
}),[ImgData])

  return(
    <div class = "imgContainer" ref={dragRef}>
        <img
        src={ImgData.imgBlob}
        height="150"
        width="150"
        alt="null"
        />
    </div>
  )
}

import React, { useContext, useRef, useState } from "react";
import { useDrag, useDrop } from 'react-dnd'
import { Context } from "./RecipeBuilder";
import Modal from './RecipeBuilderModal'

export default function RenderSelectableImage({imgData, index}) {
  const data = useContext(Context)
  const basketState = data.basketState
  const setBasketState = data.setBasketState
  const [show, setShow] = useState(false)

  const ref = useRef(null)

  const moveItemHandler = (dragIndex, hoverIndex) => {
    const dragItem = basketState[dragIndex]
    if(dragItem){
        setBasketState((prevState=>{
            const coppiedStateArray = [...prevState]
            const prevItem = coppiedStateArray.splice(hoverIndex, 1);
            coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
            return coppiedStateArray
        }))
    }
  }
  const [,dropRef] = useDrop({
      accept: 'imgData',
      item: {...imgData, ...index},
      hover(item, monitor) {
          if (!ref.current) {
              return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          if (dragIndex === hoverIndex) {
              return;
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
          }
          moveItemHandler(dragIndex, hoverIndex);
          item.index = hoverIndex;
      }}
  )

  const [{isDragging}, dragRef] = useDrag(()=>({
    type: 'imgData',
    item: {...imgData, ...index},
    end:(item, monitor)=>{
      const dropResult = monitor.getDropResult()
      if(dropResult && item.location !== dropResult.location){
        setBasketState((basketState) =>
          basketState.map(obj =>{ 
            if(obj.id===item.id){
              return {...obj, location:  dropResult.location}
            }
            return obj}
        ))
      }
    },
    collect: (monitor)=>({
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag()
    })
}),[imgData])

dragRef(dropRef(ref))

  return(
    <div  class = "imgContainer" ref={ref}>
        <button className = "imgcardButton_ModalOpen" onClick={()=> setShow(true)}>
          <img
          src={imgData.imgBlob}
          height="150"
          width="150"
          alt="null"
          />
        </button >
         <Modal
          show={show}
          imgSrc = {imgData.imgBlob}
          onClose={() => setShow(false)} 
         />
    </div>
  )
}

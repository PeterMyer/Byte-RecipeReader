import React, { useState, useContext, Fragment } from 'react'
import { useDrop } from 'react-dnd';
import { Context } from './CreateRecipeImages';
import RenderSelectableImage from './RenderSelectableImg'

export default function  Basket ({title}){
    const data = useContext(Context);
    let basketState = data.basketState
    let setBasketState = data.setBasketState

    const [{ isOver }, dropRef] = useDrop({
        accept: 'imgData',
        drop: (item) => (setBasketState((basketState) => 
                            !basketState.includes(item) ? [...basketState, item] : basketState),
                         {location: title}),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    })
    return (
            <div  ref={dropRef}>
                {title}
                <div className = "basket" >
                    {basketState.filter((img)=>img.location===title).map(img=> { 
                        return( 
                            <div>
                                <RenderSelectableImage key={img.id} imgData={img} />
                            </div>
                        )})}
                    {isOver && <div>Drop Here!</div>}
                </div>
            </div>
    )
}
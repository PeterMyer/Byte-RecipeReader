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
        drop: (item) => setBasketState((basketState) => 
                            !basketState.includes(item) ? [...basketState, item] : basketState),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    return (
        <React.Fragment>
            <div  ref={dropRef}>
                <div className = "basket" >
                    {title}
                    {basketState.map(img=> { 
                        return( 
                            <div>
                                <RenderSelectableImage imgData={img.imgData} />
                            </div>
                        )})}
                    {isOver && <div>Drop Here!</div>}
                </div>
            </div>
        </React.Fragment>
    )
}
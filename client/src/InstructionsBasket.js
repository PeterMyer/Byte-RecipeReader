import React, { useState, useContext } from 'react'
import { useDrop } from 'react-dnd';
import { Context } from './CreateRecipeImages';
import RenderSelectableImage from "./RenderSelectableImg";


export default function  InstructionsBasket (){
    const data = useContext(Context);
    let InstructionsBasketState = data.InstructionsBasketState
    let setInstructionsBasketState = data.setInstructionsBasketState

    const [{ isOver }, dropRef] = useDrop({
        accept: 'imgData',
        drop: (item) => setInstructionsBasketState((InstructionsBasketState) => 
                            !InstructionsBasketState.includes(item) ? [...InstructionsBasketState, item] : InstructionsBasketState),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    return (
        <React.Fragment>
            <div ref={dropRef}>
                Instructions
                <div className = "basket">
                    {InstructionsBasketState.map((img)=> { 
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
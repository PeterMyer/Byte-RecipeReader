import React, { useState, useContext } from 'react'
import { useDrop } from 'react-dnd';
import { Context } from './CreateRecipeImages';


export default function  InstructionsBasket (){
    const data = useContext(Context);
    let InstructionsBasketState = data.InstructionsBasketState
    let setInstructionsBasketState = data.setInstructionsBasketState

    const [{ isOver }, dropRef] = useDrop({
        accept: 'img',
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
                    {InstructionsBasketState.map(img=>   
                    <img
                        src= {img.imgData}
                        height="150"
                        width="150"
                        alt="null"
                        />)}
                    {isOver && <div>Drop Here!</div>}
                </div>
            </div>
        </React.Fragment>
    )
}
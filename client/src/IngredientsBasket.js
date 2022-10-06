import React, { useState, useContext } from 'react'
import { useDrop } from 'react-dnd';
import { Context } from './CreateRecipeImages';

export default function  IngredientsBasket (){
    const data = useContext(Context);
    let IngredientsBasketState = data.IngredientsBasketState
    let setIngredientsBasketState = data.setIngredientsBasketState

    const [{ isOver }, dropRef] = useDrop({
        accept: 'imgData',
        drop: (item) => setIngredientsBasketState((IngredientsBasketState) => 
                            !IngredientsBasketState.includes(item) ? [...IngredientsBasketState, item] : IngredientsBasketState),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })


    return (
        <React.Fragment>
            <div  ref={dropRef}>
                Ingredients 
                {/* Will become {name} */}
                <div className = "basket">
                    {IngredientsBasketState.map(img=>   
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
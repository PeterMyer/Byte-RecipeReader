import React, { useState } from 'react'
import { useDrop } from 'react-dnd';

export default function  Basket (){
    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: 'img',
        drop: (item) => setBasket((basket) => 
                            !basket.includes(item) ? [...basket, item] : basket),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })
    return (
        <React.Fragment>
            <div className='basket' ref={dropRef}>
                Instructions
                {basket.map(img=>   
                <img
                    src= {img.imgData}
                    height="150"
                    width="150"
                    alt="null"
                    />)}
                {isOver && <div>Drop Here!</div>}
            </div>
        </React.Fragment>
    )
}
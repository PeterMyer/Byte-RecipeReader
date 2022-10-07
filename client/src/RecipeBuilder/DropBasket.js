import React, { useContext } from 'react'
import { useDrop } from 'react-dnd';
import { Context } from './RecipeBuilder';
import RenderImage from './RenderImg'

export default function  Basket ({title}){
    const data = useContext(Context);
    let basketState = data.basketState
    let setBasketState = data.setBasketState

    const [{ isOver }, dropRef] = useDrop({
        accept: 'imgData',
        drop: (item) => (setBasketState((basketState ) => 
                        !basketState.map(item=>item.id).includes(item.id) ? [...basketState, item] : basketState),
                        {location: title}),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    })

    return (
            <div  ref={dropRef}>
                {title}
                <div className = "basket" >
                    {basketState.filter((img)=>img.location===title).map((img,index)=> { 
                        return( 
                            <div>
                                <RenderImage 
                                key={img.id} 
                                imgData={img}
                                index = {index}
                                />
                            </div>
                        )})}
                    {isOver && <div>Drop Here!</div>}
                </div>
            </div>
    )
}
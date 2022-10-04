
import { DndProvider } from 'react-dnd'
import { useDrop } from 'react-dnd';
import React, { useState } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SelectableImages from "./selectableImages"
import Basket from "./InstructionsBasket" 
import IngredientsBasket from "./IngredientsBasket" 



export default function CreateRecipeImages(){

    return(
        <div>
            <div>
                <div>Preview</div>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div ><Basket/></div>
                <div><IngredientsBasket/></div>
                <div><SelectableImages/></div>
            </DndProvider>
        </div>
    )
}
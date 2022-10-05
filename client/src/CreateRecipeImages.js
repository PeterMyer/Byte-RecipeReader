
import { DndProvider } from 'react-dnd'
import { useDrop } from 'react-dnd';
import React, { useState } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SelectableImages from "./SelectableImages"
import InstructionsBasket from "./InstructionsBasket" 
import IngredientsBasket from "./IngredientsBasket" 
import { useEffect, createContext } from 'react';
import apiService from './apiService';

export const Context = React.createContext()

export default function CreateRecipeImages(){
    const [filePathData, setFilePathData] = useState(null)
    const [ImgData, setImgData] = useState({})
    const [IngredientsBasketState, setIngredientsBasketState] = useState([])
    const [InstructionsBasketState, setInstructionsBasketState] = useState([])

    useEffect(()=> {
        const fetchImgs = async()=>{
            let filePaths =  await apiService.import.retrieveFilePaths()
            setFilePathData(filePaths)
            let newImgData = filePaths.map(async(file)=>{ 
                let response = await apiService.import.retrieveFile(file.filepath)
                 return [[file.filepath],response]
            })
            let result = await Promise.all(newImgData)
            let resultObj = Object.fromEntries(result)
            setImgData({...ImgData,...resultObj})
        }

        fetchImgs()
    },[])

    

    return(
        <div >
            <Context.Provider value = {{
                ImgData,setImgData, 
                IngredientsBasketState,setIngredientsBasketState,
                InstructionsBasketState, setInstructionsBasketState 
                }}>
                <DndProvider backend={HTML5Backend}>
                    <div id="recipeBuilder">
            `           <div>
                            <div>Preview</div>
                            <div><InstructionsBasket/></div>
                            <div><IngredientsBasket/></div>
                        </div>
                        <div>
                            <div><SelectableImages/></div>
                        </div>
                    </div>
                </DndProvider>`
            </Context.Provider>
        </div>
    )
}
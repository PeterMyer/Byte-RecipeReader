
import { DndProvider } from 'react-dnd'
import { useDrop } from 'react-dnd';
import React, { useState } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SelectableImages from "./SelectableImages"
// import InstructionsBasket from "./InstructionsBasket" 
// import IngredientsBasket from "./IngredientsBasket" 
import Basket from "./ImgBasket"
import { useEffect, createContext } from 'react';
import apiService from './apiService';

export const Context = React.createContext()

export default function CreateRecipeImages(){
    const [filePathData, setFilePathData] = useState(null)
    const [ImgData, setImgData] = useState({})
    // const [IngredientsBasketState, setIngredientsBasketState] = useState([])
    // const [InstructionsBasketState, setInstructionsBasketState] = useState([])
    const [basketState, setBasketState] =useState([])

    useEffect(()=> {
        const fetchImgs = async()=>{
            let filePaths =  await apiService.import.retrieveFilePaths()
            setFilePathData(filePaths)
            let newImgData = filePaths.map(async(file)=>{ 
                let response = await apiService.import.retrieveFile(file.filepath)
                 return [['id', file.id],['fileName',file.filepath],['imgBlob',response],['location','selection']]
            })
            let result = await Promise.all(newImgData)
            let resultOjbCollection = []
            console.log('result',result)
            
            result.forEach(array =>{
                let resultObj = Object.fromEntries(array)
                resultOjbCollection.push(resultObj)
            })
            console.log('resultObjCollect', resultOjbCollection)
            setImgData(resultOjbCollection)
        }

        fetchImgs()
    },[])

    return(
        <div >
            <Context.Provider value = {{
                ImgData,setImgData, 
                basketState, setBasketState
                }}>
                <DndProvider backend={HTML5Backend}>
                    <div id="recipeBuilder">
            `           <div>
                            <div>Preview</div>
                            Ingredients
                            <div title="Ingredients"><Basket/></div>
                            Instructions
                            <div title="Instructions"><Basket/></div>
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
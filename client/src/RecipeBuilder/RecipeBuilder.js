
import { DndProvider } from 'react-dnd'
import React, { useState, useEffect, createContext } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import UserImages from "./UserImages"
import Basket from "./DropBasket"
import apiService from '../apiService';
import {Link} from "react-router-dom"

export const Context = React.createContext()

export default function CreateRecipeImages(){
    const [ImgData, setImgData] = useState({})
    const [basketState, setBasketState] =useState([])

    useEffect(()=> {
        const fetchImgs = async()=>{
            let filePaths =  await apiService.import.retrieveFilePaths()

            let newImgData = filePaths.map(async(file)=>{ 
                let response = await apiService.import.retrieveFile(file.filepath)
                 return [['id', file.id],['fileName',file.filepath],['imgBlob',response],['location','Selections']]
            })

            let result = await Promise.all(newImgData)
            let resultOjbCollection = {}
            
            result.forEach(array =>{
                let resultObj = Object.fromEntries(array)
                resultOjbCollection = {...resultOjbCollection, ...{[resultObj.id]:resultObj}}
            })
            setImgData({...ImgData,...resultOjbCollection})
        }
        fetchImgs()
    },[])



    return(
        <div >
            <Context.Provider value = {{
                ImgData,setImgData, 
                basketState, setBasketState,
                }}>
                <DndProvider backend={HTML5Backend}>
                    <div id="recipeBuilder">
            `           <div>
                            <Basket title="Ingredients"/>
                            <Basket title="Instructions"/>
                                <Link
                                    to={"/readMany"}
                                    state= {{basketState}}>
                                    <button>
                                        Read this Img
                                    </button>
                                </Link>
                        </div>
                        <div>
                            <div><UserImages title="Selections"/></div>
                        </div>
                    </div>
                </DndProvider>`
            </Context.Provider>
        </div>
    )
}
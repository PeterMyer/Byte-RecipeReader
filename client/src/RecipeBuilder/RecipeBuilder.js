
import { DndProvider } from 'react-dnd'
import React, { useState, useEffect, createContext } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import UserImages from "./UserImages"
import Basket from "./DropBasket"
import apiService from '../Utilities/apiService';
import {Link} from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react';


// import UserImages from '../Images/DisplayImagesGrid'

export const Context = React.createContext()

export default function CreateRecipeImages(){
    const [ImgData, setImgData] = useState({})
    const [basketState, setBasketState] =useState([])
    const { user } = useAuth0();


    useEffect(()=> {
        const fetchImgs = async()=>{
            let filePaths =  await apiService.import.retrieveFilePaths(user.sub)

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
            <h1>Create Recipe</h1>
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
                                        Build
                                    </button>
                                </Link>
                        </div>
                        <UserImages title="Selections"/>
                    </div>
                </DndProvider>`
            </Context.Provider>
        </div>
    )
}
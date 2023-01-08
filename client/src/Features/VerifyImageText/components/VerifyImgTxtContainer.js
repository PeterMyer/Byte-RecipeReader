import React, { useState, createContext} from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { convertToRaw} from 'draft-js';
import {parseEditorContentStates, createParentEditorState} from '../utils'
import VerifySidebar from "../../../Components/Sidebar/VerifySideBar";
import { ImgTextComparison } from "./ImgTextComparison";

export const Context = React.createContext()

export const VerifyImgTextContainer=()=>{
    const {state} = useLocation()
    const [recipeData] = useState(state.readImgText)
    const [recipeImg] = useState(state.recipeImg)
    const [parentEditorState, setParentEditorState] = useState(createParentEditorState (recipeData))
    const navigate = useNavigate();

    const handleAccept=()=>{
        recipeData.map((recipeObj)=>{
            recipeObj.recipeEditorContent = convertToRaw(parentEditorState[recipeObj.id].getCurrentContent())
        })
        let parsedContent = parseEditorContentStates(recipeData)
        
        navigate('/recipeForm/new',{
            state: {
                'recipeData':parsedContent, 
                'recipeImg':recipeImg
            }
        })
    }

    return(
        <article className = "verify-text-page">
           <VerifySidebar/>
            <div className = "verify-recipe">
                <Context.Provider value = {{
                parentEditorState,setParentEditorState
                }}>
                    <div className = "verify-text-header">
                        <h1>Verify Recipe Results</h1>
                        <button id="acceptTextButton" onClick={(handleAccept)}>Accept Results</button>
                    </div>
                    <h2>Instructions</h2>
                    <ImgTextComparison recipeData = {recipeData} location = {"instructions"}/>
                    <h2 >Ingredients</h2>
                    <ImgTextComparison recipeData = {recipeData} location = {"ingredients"}/>
                </Context.Provider>
            </div>
        </article>
    )
}
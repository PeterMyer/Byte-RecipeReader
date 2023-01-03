import {VerifyTextEditor} from "./VerifyTextEditor"
import React, { useState, createContext} from 'react'
import { useNavigate } from "react-router-dom";
import { convertToRaw} from 'draft-js';
import {parseEditorContentStates, createParentEditorState} from '../utils'
import VerifySidebar from "../../../Sidebar/VerifySideBar";

export const Context = React.createContext()

export function VerifyImgText(props){
    const [recipeData] = useState(props.readImgText)
    const [recipeImg,] = useState(props.recipeImg)
    const [parentEditorState, setParentEditorState] = useState(createParentEditorState(recipeData))
    const navigate = useNavigate();

    const handleAccept=()=>{
        recipeData.map((recipeObj)=>{
            recipeObj.recipeEditorContent = convertToRaw(parentEditorState[recipeObj.id].getCurrentContent())
        })
        let parsedContent = parseEditorContentStates(recipeData)
        navigate('/newRecipeForm',{state: {'recipeData':parsedContent, 'recipeImg':recipeImg}})
    }

    return(
        <div className = "verify-text-page">
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
                <div className = "recipeSegment-container">
                    {recipeData.filter((imgObj)=>imgObj.location==="instructions").map((imgObj)=>{
                        return(
                            <div className = "recipeSegment" >
                                <VerifyTextEditor readImgText={imgObj.OcrResult.data.text} recipeId ={imgObj.id}/> 
                                <img className ="recipeImg"
                                    src={imgObj.imgObjURL}
                                    alt="null"/>                
                            </div>)})}
                </div>
                <h2 >Ingredients</h2>
                <div className = "recipeSegment-container" >
                    {recipeData.filter((imgObj)=>imgObj.location==="ingredients").map((imgObj)=>{
                        return(
                            <div className = "recipeSegment">
                                <VerifyTextEditor  readImgText={imgObj.OcrResult.data.text} recipeId ={imgObj.id}/> 
                                <img className ="recipeImg"
                                    src={imgObj.imgObjURL}
                                    alt="null"/>                
                            </div>)})}
                </div>
            </Context.Provider>
        </div>
        </div>
    )
}
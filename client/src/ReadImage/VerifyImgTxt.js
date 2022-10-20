import VerifyTextEditor from "./VerifyRecipeTextEditor"
import React, { useState, createContext} from 'react'
import { useNavigate } from "react-router-dom";
import { convertToRaw} from 'draft-js';
import {parseEditorContentStates} from '../Utilities/helperFunctions'

export const Context = React.createContext()

export default function VerifyImgText(props){
    const [recipeData, setRecipeData] = useState(props.readImgText)
    const [parentEditorState, setParentEditorState] = useState({})
    const navigate = useNavigate();

    const handleAccept=()=>{
        recipeData.map((recipeObj)=>{
            recipeObj.recipeEditorContent = convertToRaw(parentEditorState[recipeObj.id].getCurrentContent())
        })

        let parsedContent = parseEditorContentStates(recipeData)

        navigate('/newRecipeForm',{state: {'recipeData':parsedContent}})
    }


    return(
        <div className = "verify-recipe">
            <Context.Provider value = {{
                parentEditorState,setParentEditorState
                }}>
                <header > 
                    <button id="acceptTextButton" onClick={(handleAccept)}>Accept Results</button>
                </header>
                <h1>Verify Recipe Results</h1>
                <h2>Instructions</h2>
                <div className = "recipeSegment-container">
                    {recipeData.filter((imgObj)=>imgObj.location==="Instructions").map((imgObj)=>{
                        return(
                            <div className = "recipeSegment" >
                                <VerifyTextEditor readImgText={imgObj.OcrResult.data.text} recipeId ={imgObj.id}/> 
                                <img className ="recipeImg"
                                    src={imgObj.imgBlob}
                                    alt="null"/>                
                            </div>)})}
                </div>
                <h2 >Ingredients</h2>
                <div className = "recipeSegment-container" >
                    {recipeData.filter((imgObj)=>imgObj.location==="Ingredients").map((imgObj)=>{
                        return(
                            <div className = "recipeSegment">
                                <VerifyTextEditor  readImgText={imgObj.OcrResult.data.text} recipeId ={imgObj.id}/> 
                                <img className ="recipeImg"
                                    src={imgObj.imgBlob}
                                    alt="null"/>                
                            </div>)})}
                </div>
            </Context.Provider>
        </div>
    )
}
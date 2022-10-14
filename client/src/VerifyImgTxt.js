import VerifyTextEditor from "./VerifyRecipeTextEditor"
import React, { useState, createContext} from 'react'
import { useNavigate } from "react-router-dom";
import { convertToRaw} from 'draft-js';



export const Context = React.createContext()

export default function VerifyImgText(props){
    const [recipeData, setRecipeData] = useState(props.readImgText)
    const [parentEditorState, setParentEditorState] = useState({})
    const navigate = useNavigate();



    const handleAccept=()=>{
        //PENDING UPDATE FOR ALIGNING WITH INPUT FROM RECIPE DISPLAY
        // recipeData.ingredients = recipeData.filter((obj)=>obj.location === 'Ingredients')
        // .map((obj)=>{return convertToRaw(parentEditorState[obj.id].getCurrentContent()).blocks
        // .map((block)=>{return block.text })})

        // recipeData.instructions = recipeData.filter((obj)=>obj.location === 'Instructions').map((obj)=>{
        //     return convertToRaw(parentEditorState[obj.id].getCurrentContent())

        // })


        recipeData.map((recipeObj)=>{
            recipeObj.recipeEditorContent = convertToRaw(parentEditorState[recipeObj.id].getCurrentContent())

        })
        console.log(recipeData)
        navigate('/editRecipeForm',{state: {'recipeData':recipeData}}
           )
    }


    return(
        <div>
            <Context.Provider value = {{
                parentEditorState,setParentEditorState
                }}>
                <header id="acceptText"> Verify Recipe Results
                    <button onClick={(handleAccept)}>Accept Results</button>
                </header>
                <h1 >Instructions</h1>
                <div >
                    {recipeData.filter((imgObj)=>imgObj.location==="Instructions").map((imgObj)=>{
                        return(
                            <div className = "recipeSegment" >
                                <VerifyTextEditor readImgText={imgObj.OcrResult.data.text} recipeId ={imgObj.id}/> 
                                <img className ="recipeImg"
                                    src={imgObj.imgBlob}
                                    height="250"
                                    width="250"
                                    alt="null"/>                
                            </div>)})}
                </div>
                <h1 >Ingredients</h1>
                <div  >
                    {recipeData.filter((imgObj)=>imgObj.location==="Ingredients").map((imgObj)=>{
                        return(
                            <div className = "recipeSegment">
                                <VerifyTextEditor  readImgText={imgObj.OcrResult.data.text} recipeId ={imgObj.id}/> 
                                <img className ="recipeImg"
                                    src={imgObj.imgBlob}
                                    height="250"
                                    width="250"
                                    alt="null"/>                
                            </div>)})}
                </div>
            </Context.Provider>
        </div>
    )
}
import { useState, useEffect } from "react"
import { useParams , useLocation } from "react-router-dom";
import apiService from "../Utilities/apiService";
import { Editor, convertFromRaw, createWithContent, EditorState } from "draft-js";

export default function DisplayUserRecipe(){
    const [recipeData, setRecipeData] = useState(null)
    const { id } = useParams()

    useEffect(()=>{
        fetchRecipe(id)
    },[])

    const fetchRecipe= async(id)=>{
        let recipe = await apiService.recipe.retrieveRecipe(id)
        setRecipeData({...recipe.data})
    }

    return(
        <article>
            {recipeData !==null?
                <div>
                    <h1>{recipeData.name}</h1>
                    <div>
                        <div>Servings</div>
                        <div>{recipeData.servings}</div>
                    </div>
                    <div>
                        <h2>Ingredients</h2>
                        <ul>
                            {recipeData.ingredients.map(
                                (ingredient)=>{
                                        return(
                                            <li>{ingredient.originalText}</li>)})}
                        </ul>
                    </div>
                    <div>
                        <h2>Instructions</h2>
                        <Editor 
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(recipeData.instructions)))}
                        readOnly= "true"/>
                    </div>
                    <h2>Nutrition</h2>
                </div>
            :
                <div>
                    No data
                </div>}
        </article>
    )
}
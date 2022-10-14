import { useState, useEffect } from "react"
import { useParams , useLocation } from "react-router-dom";
import apiService from "./apiService";
import { Editor, convertFromRaw, createWithContent, EditorState } from "draft-js";

export default function DisplayUserRecipe(){
    const [recipeData, setRecipeData] = useState(null)
    const { id } = useParams()

    useEffect(()=>{
        fetchRecipe(id)
    },[])

    const fetchRecipe= async(id)=>{
        let recipe = await apiService.recipe.retrieveRecipe(id)
        let instruction = convertFromRaw(JSON.parse(recipe.data.instructions))
        setRecipeData({...recipe.data})
    }

    let options = {
        defaultBlockTag: 'div',}


    return(
        <div>
            
            {recipeData !==null?
                <div>
                    <div>
                        {console.log(id)}
                        <div>"User Recipe"</div>
                        <div>Servings</div>
                            <div>{recipeData.servings}</div>
                        </div>
                        <div>
                            <div>Ingredients</div>
                            <ul>
                                {recipeData.ingredients.map(
                                    (ingredient)=>{
                                            return(
                                                <li>{ingredient.originalText}</li>)})}
                            </ul>
                        </div>
                        <div>
                            <div>Instructions</div>
                            <Editor 
                            editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(recipeData.instructions)))}
                            readOnly= "true"/>
                        </div>
                        <div>Nutrition</div>
                    </div>
            :
            <div>
                No data
            </div>}
        </div>
    )
}
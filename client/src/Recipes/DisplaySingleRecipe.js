import { useState, useEffect } from "react"
import { useParams , useLocation, useNavigate } from "react-router-dom";
import apiService from "../Utilities/apiService";
import { Editor, convertFromRaw, createWithContent, EditorState } from "draft-js";

export default function DisplayUserRecipe(){
    const [recipeData, setRecipeData] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate();


    useEffect(()=>{
        fetchRecipe(id)
    },[])

    const fetchRecipe= async(id)=>{
        let recipe = await apiService.recipe.retrieveRecipe(id)
        setRecipeData({...recipe.data})
    }

    const handleEdit =()=>{
        const recipeObj = {
            id: id,
            name: recipeData.name,
            servings: recipeData.servings,
            instructions: recipeData.instructions,
            source: recipeData.source,
            ingredients: recipeData.ingredients
        }
        navigate(`/editRecipeForm/${id}`,{state: {'recipeData':recipeObj}})
    }

    const getNurition=async(id)=>{
        let nutrition = await apiService.nutrition.search(id)
        console.log('nutrition',nutrition)
    }

    return(
        <article className = 'recipe-page-single'>
            {recipeData !==null?
                <div className = 'recipe-display-container'>
                    <div className="recipe-display-header">
                        <h1>{recipeData.name}</h1>
                        <button onClick={(handleEdit)} id="edit-button"><i class="fa-regular fa-pen-to-square"></i></button>
                    </div>
                    <section>
                        <strong>Servings</strong>
                        <div>{recipeData.servings}</div>
                    </section>
                    <section>
                        <h2>Ingredients</h2>
                        <ul id="recipie-display-ingredient-list">
                            {recipeData.ingredients.map(
                                (ingredient)=>{
                                        return(
                                            <li>{ingredient.recipeIngredient.text}</li>)})}
                        </ul>
                    </section>
                    <section>
                        <h2>Instructions</h2>
                        <Editor 
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(recipeData.instructions)))}
                        readOnly= "true"/>
                    </section>
                    <h2>Nutrition</h2>
                    <button onClick={()=>getNurition(id)}>Get Nutrition</button>
                </div>
            :
                <div>
                    No data
                </div>}
        </article>
    )
}
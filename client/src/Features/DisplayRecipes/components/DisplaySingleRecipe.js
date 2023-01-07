import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import {getRecipe, deleteRecipe} from '../api'
import { Editor, convertFromRaw, createWithContent, EditorState } from "draft-js";
import {NutritionContainer} from "./NutritionContainer"
import { DisplayIngredients } from "./DisplayIngredients";

export function DisplaySingleRecipe(){
    const [recipeData, setRecipeData] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate();

    const fetchRecipe= async(id)=>{
        let recipe = await getRecipe(id)
        setRecipeData({...recipe.data})
    }

    const handleEdit =()=>{
        const recipeObj = {
            id: id,
            name: recipeData.name,
            servings: recipeData.servings,
            instructions: recipeData.instructions,
            source: recipeData.source,
            ingredients: recipeData.ingredients,
            recipeImg: recipeData.image
        }
        navigate(`/editRecipeForm/${id}`,{state: {'recipeData':recipeObj}})
    }

    const handleDelete =async()=>{
        let result = await deleteRecipe(id)
        navigate(`/recipes`)
    }

    useEffect(()=>{
        fetchRecipe(id)
    },[])

    return(
        <article className = 'recipe-page-single'>
            {recipeData !==null?
                <div className = 'recipe-display-container'>
                    <div className="recipe-display-header">
                        <h1>{recipeData.name}</h1>
                        <div className="recipe-display-header-buttons">
                        <button onClick={(handleEdit)} id="edit-button"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onClick={(handleDelete)} id="edit-button"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                    <section id="recipe-summary"className = "recipe-display-section">
                        <div className="recipe-display-img-container">
                            <img 
                                src ={ recipeData.image? recipeData.image.filepath:"/RecipeIcon.png"}
                                alt="RecipeIcon.png"
                                className="responsive-image"/>
                        </div>
                            <div id = "recipe-summary-info-container" className="recipe-display-subsection"> 
                                <strong>Servings:</strong>
                                <div>
                                    {recipeData.servings}
                                </div>
                                {/* <strong>Source:</strong> */}
                            </div>
                    </section>
                    <section className="recipe-display-section">
                        <div className="recipe-display-subsection">
                            <h2>Ingredients</h2>
                            <DisplayIngredients ingredients={recipeData.ingredients}/>
                        </div>
                        <div className="recipe-display-subsection">
                            <h2>Instructions</h2>
                            <Editor 
                                editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(recipeData.instructions)))}
                                readOnly= "true"/>
                        </div>
                    </section>
                    <h2>Nutrition</h2>
                    <NutritionContainer id={id} ingredients={recipeData.ingredients} servings={recipeData.servings}/>
                </div>
            :
                <div>
                    No data
                </div>
            }
        </article>
    )
}
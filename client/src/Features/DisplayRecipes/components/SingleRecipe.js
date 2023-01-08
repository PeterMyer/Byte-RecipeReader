import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { getRecipe, deleteRecipe } from '../api'
import { Editor, convertFromRaw, createWithContent, EditorState } from "draft-js";
import { NutritionContainer } from "./Nutrition"
import { DisplayIngredients } from "./Ingredients";

export function SingleRecipe(){
    const [recipeData, setRecipeData] = useState(null)
    const { recipeId } = useParams()
    const navigate = useNavigate();

    const handleGetRecipe= async(recipeId)=>{
        let recipe = await getRecipe(recipeId)
        setRecipeData({...recipe.data})
    }

    const handleEditRecipe =()=>{
        const recipeDataObject = {
            id: recipeId,
            name: recipeData.name,
            servings: recipeData.servings,
            instructions: recipeData.instructions,
            source: recipeData.source,
            ingredients: recipeData.ingredients,
            recipeImg: recipeData.image
        }
        navigate(`/recipeForm/edit/${recipeId}`,{state: {'recipeData':recipeDataObject}})
    }

    const handleDeleteRecipe =async()=>{
        await deleteRecipe(recipeId)
        navigate(`/recipes`)
    }

    useEffect(()=>{
        handleGetRecipe(recipeId)
    },[])

    return(
        <article className = 'recipe-page-single'>
            {recipeData !==null?
                <div className = 'recipe-display-container'>
                    <div className="recipe-display-header">
                        <h1>{recipeData.name}</h1>
                        <div className="recipe-display-header-buttons">
                        <button onClick={(handleEditRecipe)} id="edit-button"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onClick={(handleDeleteRecipe)} id="edit-button"><i class="fa-solid fa-trash"></i></button>
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
                    <section className="recipe-display-section">
                        <h2>Nutrition</h2>
                        <NutritionContainer recipeId={recipeId} ingredients={recipeData.ingredients} servings={recipeData.servings}/>
                    </section>
                </div>
            :
                <div>
                    No data
                </div>
            }
        </article>
    )
}
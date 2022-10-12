
import {useState} from 'react'
import { useLocation } from 'react-router-dom';

export default function RecipeForm(){
    const {state} = useLocation()
    const [recipeData, setRecipeData] = useState(state.recipeData)

    let rawIngredients = recipeData.filter((obj)=>obj.location === 'Ingredients')
    .map((obj)=>{return obj.recipeEditorContent.blocks
        .map((block)=>{return block.text })})

    let ingredients = rawIngredients.join("<br />")

    return(
    <div>
        <form>
            <div>
                <input
                    type="text"
                    name = "Name"
                    placeholder = "Recipe Name"
                />
            </div>
            <div>
                <input 
                    type="text"
                    name="servings"
                    placeholder="Servings"/>
                <textarea
                    type="text"
                    rows = "30"
                    columns = "50"
                    name="instructions"
                    placeholder="Instructions"
                />
                <textarea
                    type="text"
                    rows = "30"
                    columns = "50"
                    name="ingredients"
                    placeholder="Ingredients"
                    value ={ingredients}
                />
                <input
                type="text"
                name="nutrition"
                placeholder="Nutrition"/>

            </div>
        </form>
    </div>
)}
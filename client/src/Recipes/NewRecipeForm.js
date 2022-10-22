
import {useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useForm, useFieldArray } from "react-hook-form";
import {EditorState, createWithContent,convertFromRaw, convertToRaw} from "draft-js";
import RecipeEditor from './RecipeInstrucEditor'
import apiService from "../Utilities/apiService";
import { useNavigate } from "react-router-dom";


export default function RecipeForm(){
    const {state} = useLocation()
    const [ingredients, setIngredients] = useState(state?state.recipeData.ingredients:null)
    const [instructions, setInstructions] = useState(state? state.recipeData.instructions:null)
    const navigate = useNavigate();

    const { register, handleSubmit,control, watch, formState: { errors } } = useForm({
        defaultValues:{
            DraftJs: instructions ? EditorState.createWithContent(convertFromRaw(instructions)) : EditorState.createEmpty(),
            Ingredients: ingredients?ingredients[0].map((ingredient)=> {return({value:ingredient})}):null
        }
    });

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "Ingredients", // unique name for your Field Array
      });
      
    const onSubmit = async (data) => {
        let recipePayload = {
            name: data.recipeName,
            servings: data.servings,
            ingredients: JSON.stringify(data.Ingredients.map((ingredient)=>ingredient.value)),
            instructions: JSON.stringify(convertToRaw(data.DraftJs.getCurrentContent())),
            nutrition: data.nutrition
        }
        let response = await apiService.recipe.create(recipePayload)
        console.log('response',response)
        navigate(`/recipe/${response.data.id}`)
    };

    return(
    <div className = "recipeform-container">
        <div className = "recipeform-outside-box">
        <form className = "recipeform" onSubmit={handleSubmit(onSubmit)}>
            <h1> Create A New Recipe </h1>
            <section className ="recipeform-section">
                <label className = "recipeform-input-label"><strong>Recipe Name</strong>
                    <div className = "recipeform-input-container" >
                        <input
                            {...register("recipeName",{required:true})}
                            type="text"
                            placeholder = "Recipe Name"
                            className = "recipeform-input-field"
                        />
                    </div>
                </label>
                    <label className = "recipeform-input-label"><strong>Servings</strong>
                        <div className = "recipeform-input-container" >
                            <input 
                                {...register("servings")}
                                type="text"
                                placeholder="Servings"
                                className = "recipeform-input-field"/>
                        </div>
                    </label>
            </section>
            <section className ="recipeform-section" id="ingredient">
                <label className = "recipeform-input-label"><strong>Ingredients</strong>
                {fields.map((field,index)=>{
                    return(
                        <div className = "recipeform-input-container" >
                            <input 
                                key = {field.id}
                                {...register(`Ingredients.${index}.value`)}
                                type = "text"
                                placeholder = "Ingredient"
                                className = "recipeform-input-field-ingredients"
                            /><button type="button" className = "recipeform-input-hiddenbutton" 
                                onClick={()=>remove(index)}><i class="fa-solid fa-circle-xmark"></i></button>
                        </div>)}
                )}
                <button type="button" id = "addButton" onClick={()=> append({value:""})}><i class="fa-solid fa-circle-plus"></i></button>
                </label>
            </section>
            <section className ="recipeform-section">
                <label className = "recipeform-input-label"><strong>Instructions</strong>
                    <RecipeEditor  control = {control}/>
                </label>
            </section>
            <section className ="recipeform-section"x>
            <button id="save-recipe" type="submit" 
            value="Save Recipe">Save Recipe</button>
            </section>
        </form>
        </div>
    </div>
)}
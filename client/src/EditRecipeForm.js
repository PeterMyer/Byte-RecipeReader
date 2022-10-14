
import {useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Editor,EditorState, createWithContent,convertFromRaw, ContentState, convertToRaw} from "draft-js";
import RecipeEditor from './EditRecipeInstrucEditor'
import apiService from "./apiService";
import { useNavigate } from "react-router-dom";


export default function RecipeForm(){
    const {state} = useLocation()
    const [recipeData, setRecipeData] = useState(state.recipeData)
    const navigate = useNavigate();


    let rawIngredients = recipeData.filter((obj)=>obj.location === 'Ingredients')
    .map((obj)=>{return obj.recipeEditorContent.blocks
        .map((block)=>{return block.text })})

    let editorContent = recipeData.filter((obj)=>obj.location === 'Instructions')
    .map((obj)=>{return obj.recipeEditorContent})

    const { register, handleSubmit,control, watch, formState: { errors } } = useForm({
        defaultValues:{
            DraftJs: EditorState.createWithContent(convertFromRaw(editorContent[0])),
            Ingredients: rawIngredients[0].map((ingredient)=> {return({value:ingredient})})
        }
    });
    const { fields, append } = useFieldArray({
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
        navigate(`/recipe/${response.data.id}`)
    };


    return(
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    {...register("recipeName")}
                    type="text"
                    placeholder = "Recipe Name"
                />
            </div>
            <div>
                <input 
                    {...register("servings")}
                    type="text"
                    placeholder="Servings"/>
                <div>
                <label>Ingredients</label>
                {fields.map((field,index)=>{
                    return(
                    <input
                        key = {field.id}
                        {...register(`Ingredients.${index}.value`)}
                        type = "text"
                        placeholder = "Ingredient"
                    />)}
                )}
                <button onClick={()=> append({value:""})}>Add Ingredient</button>
                </div>
                <section>
                    <label>Instructions</label>
                    <RecipeEditor control = {control}/>
                </section>
                <input
                {...register("nutrition")}
                type="text"
                placeholder="Nutrition"/>
            </div>
            <input type="submit" 
            value="Save Recipe"/>
        </form>
    </div>
)}
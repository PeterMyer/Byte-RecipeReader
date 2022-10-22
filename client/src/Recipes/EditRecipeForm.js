
import {useState} from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useForm, useFieldArray, useFormState } from "react-hook-form";
import {EditorState, createWithContent,convertFromRaw, convertToRaw} from "draft-js";
import RecipeEditor from './RecipeInstrucEditor'
import apiService from "../Utilities/apiService";
import { useNavigate } from "react-router-dom";
import {partitionIngredients} from '../Utilities/helperFunctions'


export default function RecipeForm(){
    const {state} = useLocation()
    const { id } = useParams()
    const [recipeName] = useState(state?state.recipeData.name: null)
    const [servings] = useState(state?state.recipeData.servings: null)
    const [source] = useState(state?state.recipeData.source: null)
    const [ingredients] = useState(state?state.recipeData.ingredients:null)
    const [instructions] = useState(state? state.recipeData.instructions:null)
    const [deleted, setDeleted] = useState([])
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: {error},getValues} = useForm({
        defaultValues:{
            recipeName: recipeName? recipeName: null,
            servings:servings? servings:null,
            source: source? source: null,
            DraftJs: instructions ? EditorState.createWithContent(convertFromRaw(JSON.parse(instructions))) : EditorState.createEmpty(),
            Ingredients: ingredients?ingredients.map((ingredient)=> {return({value:ingredient.recipeIngredient.text, id:ingredient.id})}):null,
        }
    });
    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "Ingredients", // unique name for your Field Array
      });

    const handleDelete=(index)=>{
        let removedIndex = getValues(`Ingredients.${index}`)
        remove(index)
        setDeleted([...deleted,removedIndex])
    }
    
    const onSubmit = async (data) => {
        const editFormIngredients = data.Ingredients.map((ingredient)=>({value:ingredient.value ,id: ingredient.id}))
        const {newIngredient,formatChanges,toDelete} = partitionIngredients(state.recipeData.ingredients,editFormIngredients)

        const recipePayload = {
            name: data.recipeName,
            servings: data.servings,
            source: data.source,
            ingredients: JSON.stringify([...newIngredient]),
            instructions: JSON.stringify(convertToRaw(data.DraftJs.getCurrentContent())),
            nutrition: data.nutrition,
            deletedIngredients: [...toDelete,...deleted],
            changedFormat: formatChanges,
        }
        console.log('recipePayload', recipePayload)
        let response = await apiService.recipe.update(id,recipePayload)
        navigate(`/recipe/${response.data.id}`)
    };

    return(
    <div className = "recipeform-container">
        <div className = "recipeform-outside-box">
        <form className = "recipeform" onSubmit={handleSubmit(onSubmit)}>
            <h1> Edit Recipe </h1>
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
                        <div key = {field.id} className = "recipeform-input-container" >
                            <input 
                                key = {field.id}
                                {...register(`Ingredients.${index}.value`)}
                                type = "text"
                                placeholder = "Ingredient"
                                className = "recipeform-input-field-ingredients"
                                defaultValue={field.value}
                            />
                            <button 
                                type="button"
                                className = "recipeform-input-hiddenbutton" 
                                onClick={()=>handleDelete(index)}><i className="fa-solid fa-circle-xmark"></i></button> 
                        </div>)}
                    )}
                    <button
                    type="button"
                    id = "addButton" 
                    onClick={()=> append({value:"",id:null})}><i className="fa-solid fa-circle-plus"></i></button>
                </label>
            </section>
            <section className ="recipeform-section">
                <label className = "recipeform-input-label"><strong>Instructions</strong>
                    <RecipeEditor  control = {control}/>
                </label>
            </section>
            <section className ="recipeform-section"x>
                <button 
                id="save-recipe" type="submit" 
                value="Save Recipe">Save Recipe</button>
            </section>
        </form>
        </div>
    </div>
)}
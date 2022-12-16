
import {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from "react-hook-form";
import {EditorState, createWithContent,convertFromRaw, convertToRaw} from "draft-js";
import RecipeEditor from './RecipeInstrucEditor'
import apiService from "../Utilities/apiService";
import { useAuth0 } from '@auth0/auth0-react';

export default function RecipeForm(){
    const { user } = useAuth0();
    const {state} = useLocation()
    const [ingredients] = useState(state?state.recipeData.ingredients:null)
    const [instructions] = useState(state? state.recipeData.instructions:null)
    const [recipeImg, setRecipeImg] = useState(state? [Object.values(state.recipeImg)[0].imgObjURL]: null)
    const navigate = useNavigate();

    const { register, handleSubmit,control, formState: { errors } } = useForm({
        defaultValues:{
            DraftJs: instructions ? EditorState.createWithContent(convertFromRaw(instructions)) : EditorState.createEmpty(),
            Ingredients: ingredients? ingredients[0].map((ingredient)=> {return({value:ingredient})}):[{value: ""}],
            RecipeImg: recipeImg? recipeImg : null
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
            ingredients: JSON.stringify(data.Ingredients.map((ingredient)=>ingredient.value.toLowerCase())),
            instructions: JSON.stringify(convertToRaw(data.DraftJs.getCurrentContent())),
            nutrition: data.nutrition,
            userId: user.sub
        }
        let response = await apiService.recipe.create(recipePayload)
        navigate(`/recipe/${response.data.id}`)
    };

    const onChange = async (e)=>{ 
        const file = e.target.files[0]
        let reader = new FileReader()
        const data = new FormData()
        data.append("uploaded_file", file)

        reader.onload = function(e){
            setRecipeImg(e.target.result)
        }

        reader.onerror = function(){
            console.log("error", reader.error)
        }
        reader.readAsDataURL(file)
    }

    return(
    <div className = "recipeform-container">
        <div className = "recipeform-outside-box">
        <form className = "recipeform" onSubmit={handleSubmit(onSubmit)}>
            <h1> Create A New Recipe </h1>
            <section className ="recipeform-section">
                <div className = "recipeform-subsection">
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
                    </div>
                    <div className='recipeform-subsection'>
                        <strong>Recipe Image</strong>
                        <div className= 'recipeform-img-container'>
                            <img src={recipeImg} alt="" style={{'max-width':200}}/>
                        </div>
                        <label id="recipeform-img-upload" className = "recipeform-input-label">
                            <input 
                                {...register("RecipeImg",{required:false})}
                                type="file"
                                accept="image/png, image/jpeg"
                                encType="multipart/form-data" 
                                onChange={onChange}
                                hidden
                            />
                            <i id="img-upload-icon" class="fa-solid fa-arrow-up-from-bracket"></i> Upload Image
                        </label>
                    </div>
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
                <label className = "recipeform-instructions-label"><strong>Instructions</strong>
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
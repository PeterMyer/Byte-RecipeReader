
import {useState} from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useForm, useFieldArray } from "react-hook-form";
import {EditorState, createWithContent,convertFromRaw, convertToRaw} from "draft-js";
import {RecipeInstructionsEditor} from './RecipeInstructionsEditor'
import { useNavigate } from "react-router-dom";
import {partitionIngredients} from '../utils/partitionIngredients'
import { useAuth0 } from '@auth0/auth0-react';
import {updateRecipe} from '../api/updateRecipe'
import {saveImage} from '../api/saveImage'

export function EditRecipeForm(){
    const { user } = useAuth0();
    const {state} = useLocation()
    const { id } = useParams()
    const [recipeName] = useState(state?state.recipeData.name: null)
    const [servings] = useState(state?state.recipeData.servings: null)
    const [source] = useState(state?state.recipeData.source: null)
    const [ingredients] = useState(state?state.recipeData.ingredients:null)
    const [instructions] = useState(state? state.recipeData.instructions:null)
    const [recipeImg, setRecipeImg] = useState(state.recipeData.recipeImg? state.recipeData.recipeImg: null)
    const [imgPreview, setImgPreview] = useState(state.recipeData.recipeImg? state.recipeData.recipeImg.filepath: "/RecipeIcon.png")
    const [deleted, setDeleted] = useState([])
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: {error},getValues} = useForm({
        defaultValues:{
            recipeName: recipeName? recipeName: null,
            servings:servings? servings:null,
            source: source? source: null,
            DraftJs: instructions ? EditorState.createWithContent(convertFromRaw(JSON.parse(instructions))) : EditorState.createEmpty(),
            Ingredients: ingredients? ingredients.map((ingredient)=> {return({value:ingredient.recipeIngredient.text, id:ingredient.id})}):null,
            ImgFile: recipeImg? recipeImg.filepath: null
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

    const onChange = async (e)=>{ 
        const file = e.target.files[0]
        let reader = new FileReader()

        reader.onload = function(e){
            setImgPreview(e.target.result)
        }

        reader.onerror = function(){
            console.log("error", reader.error)
        }
        reader.readAsDataURL(file)
    }
    
    const onSubmit = async (data) => {
        const editFormIngredients = data.Ingredients.map((ingredient)=>({value:ingredient.value ,id: ingredient.id}))
        const {newIngredient,formatChanges,toDelete} = partitionIngredients(state.recipeData.ingredients,editFormIngredients)

        let imgResponse = null
        let recipeImgId = recipeImg? recipeImg.id : null

        if(data.ImgFile !== recipeImg){
            const fileData = new FormData()
            fileData.append("uploaded_file", data.ImgFile[0])
            let userId = user.sub
            imgResponse = await saveImage(fileData, userId)
        }

        const recipePayload = {
            name: data.recipeName,
            servings: data.servings,
            source: data.source,
            ingredients: JSON.stringify([...newIngredient]),
            instructions: JSON.stringify(convertToRaw(data.DraftJs.getCurrentContent())),
            nutrition: data.nutrition,
            deletedIngredients: [...toDelete,...deleted],
            changedFormat: formatChanges,
            imgId: imgResponse ? imgResponse.data.result[0].id: recipeImgId
        }
        let response = await updateRecipe(id,recipePayload)
        navigate(`/recipe/${response.data.id}`)
    };

    return(
    <div className = "recipeform-container">
        <div className = "recipeform-outside-box">
        <form className = "recipeform" onSubmit={handleSubmit(onSubmit)}>
            <h1> Edit Recipe </h1>
            <section className ="recipeform-section">
                <div className = "recipeform-subsection">
                <label className = "recipeform-input-label">
                    <strong>Recipe Name</strong>
                    <div className = "recipeform-input-container" >
                        <input
                            {...register("recipeName",{required:true})}
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
                                className = "recipeform-input-field"
                            />
                        </div>
                    </label>
                </div>
                <div className='recipeform-subsection'>
                        <strong>Recipe Image</strong>
                        <div className= 'recipeform-img-container'>
                            <img 
                                src={imgPreview} 
                                alt="" 
                                style={{'max-width':200}}
                            />
                        </div>
                        <label id="recipeform-img-upload" className = "recipeform-input-label">
                            <input 
                                {...register("ImgFile",{required:false})}
                                type="file"
                                accept="image/png, image/jpeg"
                                encType="multipart/form-data" 
                                onChange={onChange}
                            />
                        </label>
                    </div>
            </section>
            <section className ="recipeform-section" id="ingredient">
                <label className = "recipeform-input-label">
                    <strong>Ingredients</strong>
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
                                    onClick={()=>handleDelete(index)}>
                                    <i className="fa-solid fa-circle-xmark"></i>
                                </button> 
                            </div>)}
                        )}
                    <button
                        type="button"
                        id = "addButton" 
                        onClick={()=> append({value:"",id:null})}>
                        <i className="fa-solid fa-circle-plus"></i>
                    </button>
                </label>
            </section>
            <section className ="recipeform-section">
                <label className = "recipeform-input-label">
                    <strong>Instructions</strong>
                    <RecipeInstructionsEditor  
                        control = {control}
                    />
                </label>
            </section>
            <section className ="recipeform-section"x>
                <button 
                    id="save-recipe" 
                    type="submit" 
                    value="Save Recipe">
                    Save Recipe
                </button>
            </section>
        </form>
        </div>
    </div>
)}
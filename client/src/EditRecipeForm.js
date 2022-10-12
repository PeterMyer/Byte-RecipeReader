
import {useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Editor,EditorState, createWithContent,convertFromRaw, ContentState } from "draft-js";
import RecipeEditor from './EditRecipeInstrucEditor'


export default function RecipeForm(){
    const {state} = useLocation()
    const [recipeData, setRecipeData] = useState(state.recipeData)

    let rawIngredients = recipeData.filter((obj)=>obj.location === 'Ingredients')
    .map((obj)=>{return obj.recipeEditorContent.blocks
        .map((block)=>{return block.text })})

    let editorContent = recipeData.filter((obj)=>obj.location === 'Instructions')
    .map((obj)=>{return obj.recipeEditorContent})

    const { register, handleSubmit,control, watch, formState: { errors } } = useForm({
        defaultValues:{
            DraftJs: EditorState.createWithContent(convertFromRaw(editorContent[0])),
            // DraftJs: EditorState.createEmpty(),
            Ingredients: rawIngredients[0].map((ingredient)=> {return({value:ingredient})})
        }
    });
    const { fields, append } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "Ingredients", // unique name for your Field Array
      });
      
    const onSubmit = data => console.log();


    return(
    <div>
        {/* {console.log(EditorState.createWithContent(convertFromRaw(editorContent[0])))} */}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                hello
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
                    <label>DraftJS</label>
                    <RecipeEditor control = {control}/>
                </section>
                <input
                {...register("nutrition")}
                type="text"
                placeholder="Nutrition"/>
            </div>
        </form>
    </div>
)}
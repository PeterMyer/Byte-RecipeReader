import { useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { EditorState, createWithContent, convertFromRaw } from "draft-js";
import { RecipeInstructionsEditor } from "./RecipeInstructionsEditor"
import { updateRecipe, saveImage, createRecipe  } from "../api";
import { useAuth0 } from "@auth0/auth0-react";
import { createEditRecipePayload, createNewRecipePayload } from "../utils";
import ByteIcon  from "../../../Assets/ByteIcon.png"

export function RecipeForm(){
    const { user } = useAuth0();
	const { state } = useLocation()
	const { id } = useParams()
	const useCase = (state? state.useCase : null)

	const [ recipeName ] = useState( state ? state.recipeData.name : null )
	const [ servings ] = useState( state ? state.recipeData.servings : null )
	const [ source ] = useState( state ? state.recipeData.source : null)
	const [ ingredients ] = useState( state ? 
		state.recipeData.ingredients ? state.recipeData.ingredients : null 
		:
		null )
	const [ instructions ] = useState( state ? 
		state.recipeData.instructions ? state.recipeData.instructions : null
		:
		null )
	const [ recipeImg, setRecipeImg ] = useState( useCase === "edit"?
		state.recipeData.recipeImg ? state.recipeData.recipeImg : null
		:
		state ? 
			state.recipeImg ? Object.values(state.recipeImg)[0] 
			: 
			null 
		: 
		null)
	const [ imgPreview, setImgPreview ] = useState( useCase === "edit"?
		state.recipeData.recipeImg ? state.recipeData.recipeImg.filepath : { ByteIcon }
		:
		state? state.recipeImg ? 
			URL.createObjectURL(Object.values(state.recipeImg)[0].imgBlob)
			: 
			{ ByteIcon }
		:
		{ ByteIcon} )
	const [ deleted, setDeleted ] = useState([])
	const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
        defaultValues:{
            recipeName: recipeName ? recipeName : null,
            servings: servings ? servings : null,
            source: source ? source : null,
            DraftJs: useCase === "edit" ? 
                instructions ? EditorState.createWithContent(convertFromRaw(JSON.parse( instructions ))) : EditorState.createEmpty()
                :
                instructions ? EditorState.createWithContent(convertFromRaw(instructions)) : EditorState.createEmpty(),
            Ingredients: useCase === "edit" ? 
                ingredients ? ingredients.map(( ingredient ) => { return({ value:ingredient.recipeIngredient.text, id:ingredient.id })}) : [{value: ""}]
                :
                ingredients ? ingredients[0].map((ingredient)=> {return({value:ingredient})}):[{value: ""}],
            ImgFile: useCase === "edit" ? 
                recipeImg ? recipeImg.filepath : null
                :
                recipeImg? recipeImg.imgBlob : null
        }
    });

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "Ingredients", // unique name for your Field Array
      });

      const handleDelete = ( index ) => {
		let removedIndex = getValues( `Ingredients.${ index }` )
		remove( index )
		setDeleted([...deleted, removedIndex])
	}

    const onChange = async ( e ) => { 
		const file = e.target.files[0]
		let reader = new FileReader()

		reader.onload = function( e ) {
			setImgPreview( e.target.result )
		}
		reader.onerror = function() {
			console.log( "error", reader.error )
		}
		reader.readAsDataURL(file)
	}

    const onSubmit = async (data) => {
        let recipePayload = null
		let response = null
		let userId = user.sub

        if ( useCase === "edit" ){
            recipePayload = await createEditRecipePayload (data, userId, state.recipeData.ingredients, deleted, recipeImg)
        } else {
            recipePayload = await createNewRecipePayload(data, userId)
        }

		if ( useCase === "edit" ){
        	response = await updateRecipe( id, recipePayload )
		}
		else {
			response = await createRecipe(recipePayload)
		}
		navigate( `/recipes/${ response.data.id }` )
	};

    return(
		<div className = "recipeform-container">
			<div className = "recipeform-outside-box">
				<form 
					className = "recipeform" 
					onSubmit = { handleSubmit( onSubmit ) }>
						{
							useCase === "edit" ?
								<h1> Edit Recipe </h1>
								:
								<h1>New Recipe</h1>
						}
					<section className = "recipeform-section">
						<div className = "recipeform-subsection">
							<label className = "recipeform-input-label">
								<strong>Recipe Name</strong>
								<div className = "recipeform-input-container">
									<input
										{...register( "recipeName", { required: true })}
										placeholder = "Recipe Name"
										className = "recipeform-input-field"
									/>
								</div>
							</label>
							<label className = "recipeform-input-label">
								<strong>Servings</strong>
								<div className = "recipeform-input-container">
									<input 
										{...register("servings")}
										type = "text"
										placeholder = "Servings"
										className = "recipeform-input-field"/>
								</div>
							</label>
						</div>
						<div className = "recipeform-subsection">
							<strong>Recipe Image</strong>
							<div className = "recipeform-img-container">
								<img 
									src = { imgPreview } 
									alt = "" 
									style = {{ "max-width": 200 }}/>
							</div>
							<label id = "recipeform-img-upload" className = "recipeform-input-label">
								<input 
									{...register( "ImgFile", { required: false })}
									type = "file"
									accept = "image/png, image/jpeg"
									encType = "multipart/form-data" 
									onChange = { onChange }/>
							</label>
						</div>
					</section>
					<section className ="recipeform-section" id="ingredient">
						<label className = "recipeform-input-label">
							<strong>Ingredients</strong>
							{fields.map(( field, index ) => {
								return(
									<div key = { field.id } className = "recipeform-input-container" >
										<input 
												key = { field.id }
												{...register( `Ingredients.${index}.value` )}
												type = "text"
												placeholder = "Ingredient"
												className = "recipeform-input-field-ingredients"
												defaultValue = { field.value }/>
											<button 
												type = "button"
												className = "recipeform-input-hiddenbutton" 
												onClick = {() => handleDelete( index )}>
												<i className = "fa-solid fa-circle-xmark"></i>
											</button> 
									</div>
								)
							})}
							<button
								type = "button"
								id = "addButton" 
								onClick = {() => append({ 
									value: "", 
									id: null 
								})}>
								<i className="fa-solid fa-circle-plus"></i>
							</button>
						</label>
					</section>
					<section className = "recipeform-section">
						<label className = "recipeform-input-label">
							<strong>Instructions</strong>
							<RecipeInstructionsEditor  
								control = { control }/>
						</label>
					</section>
					<section className = "recipeform-section">
						<button 
								id = "save-recipe" 
								type = "submit" 
								value = "Save Recipe">
								Save Recipe
						</button>
					</section>
        </form>
      </div>
    </div>
	)
}

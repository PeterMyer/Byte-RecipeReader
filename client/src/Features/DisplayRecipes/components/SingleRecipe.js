import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getRecipe, deleteRecipe } from "../api"
import { Editor, convertFromRaw, createWithContent, EditorState } from "draft-js"
import { Nutrition } from "./Nutrition"
import { DisplayIngredients } from "./Ingredients"
import ByteIcon from "../../../Assets/ByteIcon.png"

export function SingleRecipe() {
	const [ recipeData, setRecipeData ] = useState( null )
	const { recipeId } = useParams()
	const navigate = useNavigate();

	const handleGetRecipe = async( recipeId ) => {
		let recipe = await getRecipe( recipeId )
		setRecipeData({ ...recipe.data })
	}

	const handleEditRecipe = () => {
		const recipeDataObject = {
			id: recipeId,
			name: recipeData.name,
			servings: recipeData.servings,
			instructions: recipeData.instructions,
			source: recipeData.source,
			ingredients: recipeData.ingredients,
			recipeImg: recipeData.image
		}
		navigate( `/recipeForm/edit/${recipeId}`, { 
			state:{ 
				"recipeData": recipeDataObject, 
				"useCase": "edit" 
			}
		})
	}

	const handleDeleteRecipe = async() => {
		await deleteRecipe( recipeId )
		navigate(`/recipes`)
	}

	useEffect(() => {
		handleGetRecipe( recipeId )
	},[])

	return(
		<article className = "page-content">
			{ recipeData !== null ?
				<div className = "recipe-page-single">
					<div className = "recipe-display-header-buttons">
						<button
							onClick = {( handleEditRecipe )} 
							id = "edit-button">
							<i class = "fa-regular fa-pen-to-square"></i>
						</button>
						<button 
							onClick = {( handleDeleteRecipe )} 
							id = "edit-button">
							<i class = "fa-solid fa-trash"></i>
						</button>
						</div>
					<div className = "recipe-display-container">
						<div className = "recipe-display-header">
							<div className = "display-header-text">
							<h1>{ recipeData.name }</h1>
							<strong>Servings:</strong>
								<div>
									{ recipeData.servings }
								</div>
							</div>
							<div className = "recipe-display-img-container">
								<img 
									src = { recipeData.image? recipeData.image.filepath: ByteIcon}
									alt = "ByteIcon"
									className = "responsive-image"
								/>
							</div>
						</div>
						<section className = "recipe-display-section">
								<h2>Ingredients</h2>
								<DisplayIngredients 
									ingredients = { recipeData.ingredients }
								/>
							</section>

							<section className = "recipe-display-section">
								<h2>Instructions</h2>
								<div className = "recipe-display-instructions-container">
								<Editor 
									editorState = { EditorState.createWithContent(convertFromRaw(JSON.parse( recipeData.instructions ))) }
									readOnly = "true"/>
								</div>
									
						</section>
						<section className = "recipe-display-section" id = "recipe-display-nutrition-data">
							<h2>Nutrition</h2>
							<Nutrition 
								recipeId = { recipeId } 
								ingredients = { recipeData.ingredients } 
								servings = { recipeData.servings }
							/>
						</section>
					</div>
			</div>
			:
			<div>
					No data
			</div>
			}
		</article>
  )
}
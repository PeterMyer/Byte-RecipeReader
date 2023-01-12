import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllRecipes}  from "../api/getAllRecipes"
import ByteIcon from "../../../Assets/ByteIcon.png"
import { useNavigate } from "react-router-dom";


export function AllRecipes() {
  const [ recipes, setRecipes ] = useState([])
  const { user } = useAuth0();
  const navigate = useNavigate();


	const handleGetAllRecipes = async () => {
		let response = await getAllRecipes( user.sub )
		setRecipes( response.data )
	}

	const handleClick = ( location ) => {
		navigate( location )
	}


	useEffect(() => {
		handleGetAllRecipes()
	}, [])

	return(
		<section className = "page-content">
			<h1 className="page-title">Recipes</h1>
			<div className = "allRecipesContainer">
				{ recipes.length !== 0 ? 
					recipes.map(( recipe ) => {
						return(
							<div className = "singleRecipeContainer">
								<Link to = { `/recipes/${recipe.id}` }>
									<img 
										src = { recipe.image ? recipe.image.filepath : ByteIcon }
										alt = "RecipePageIcon.png"
										className = "singleRecipeDisplayIcon"/>
									<div className = "recipecontainer-name">
										{ recipe.name }
									</div>
								</Link>
							</div>
						)
					})
					:
					<div className = "display-recipes-no-recipes">
						<div>You have no recipes! To get started choose an option below</div>
						<div className = "display-recipes-no-recipes-button-container">
							<button 
								onClick = {() => handleClick("/recipeForm/new")}>
								CREATE RECIPE MANUALLY
							</button>
							<button 
								onClick = {() => handleClick("/recipeImageIntake")}>
								CREATE RECIPE FROM IMAGE
							</button>
						</div>
					</div>}
				</div>
		</section>
	)
}

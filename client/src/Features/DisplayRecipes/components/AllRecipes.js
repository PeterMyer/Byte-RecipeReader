import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllRecipes}  from "../api/getAllRecipes"

export function AllRecipes() {
  const [ recipes, setRecipes ] = useState([])
  const { user } = useAuth0();

	const handleGetAllRecipes = async () => {
		let response = await getAllRecipes( user.sub )
		setRecipes( response.data )
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
										src = { recipe.image ? recipe.image.filepath : "RecipeIcon.png" }
										alt = "RecipeIcon.png"
										className = "singleRecipeDisplayIcon"/>
									<div className = "recipecontainer-name">
										{ recipe.name }
									</div>
								</Link>
							</div>
						)
					})
					:
					<div>
							You have no recipes!
					</div>
				}
			</div>
		</section>
	)
}

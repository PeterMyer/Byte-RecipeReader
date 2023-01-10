import { Route, Routes } from "react-router-dom";
import { AllRecipes } from "../../DisplayRecipes"
import { SingleRecipe } from "../../DisplayRecipes"

export const RecipeRoutes = () => {
	return(
		<Routes>
			<Route
				path = ""
				element = { <AllRecipes/> }
			/>
			<Route
				path = ":recipeId"
				element = { <SingleRecipe/> } 
			/>
		</Routes>
  )
}
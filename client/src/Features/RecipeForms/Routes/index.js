import { Route, Routes } from "react-router-dom";
import { NewRecipeForm } from  "../../RecipeForms";
import { EditRecipeForm } from "../../RecipeForms";

export const RecipeFormRoutes = () => {
	return(
		<Routes>
			<Route
				path = "new"
				element = { <NewRecipeForm/> }/>
			<Route
				path = "edit/:id"
				element = { <EditRecipeForm/> }/>
		</Routes>
	)
}
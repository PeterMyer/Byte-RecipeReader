import { Route, Routes } from "react-router-dom";
import { RecipeForm } from "../components/RecipeForm"

export const RecipeFormRoutes = () => {
	return(
		<Routes>
			<Route
				path = "new"
				element = { <RecipeForm/> }/>
			<Route
				path = "edit/:id"
				element = { <RecipeForm/> }/>
		</Routes>
	)
}
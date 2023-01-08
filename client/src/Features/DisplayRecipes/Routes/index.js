import { Route, Routes } from 'react-router-dom';
import {DisplayAllRecipes} from '../../DisplayRecipes'
import {DisplaySingleRecipe} from '../../DisplayRecipes'

export const RecipeRoutes=()=>{
    return(
        <Routes>
            <Route
                path=""
                element={<DisplayAllRecipes/>}/>
            <Route
                path=":recipeId"
                element={<DisplaySingleRecipe/>} />
        </Routes>
    )
}
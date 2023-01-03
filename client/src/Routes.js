import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Home from './Home'
import TesseractScheduler from './ReadImage/TesseractScheduler';
import RecipeForm from './Recipes/EditRecipeForm'
import UserRecipes from "./Recipes/DisplayRecipesGrid"
import NewRecipeForm from './Recipes/NewRecipeForm'
import VerifyTextEditor from './ReadImage/VerifyRecipeTextEditor';
import DisplayUserRecipe from './Recipes/DisplaySingleRecipe';
import {ProtectedRoute} from './Features/Auth';
import {Loading} from './Features/Auth/components/Loading';
import CreateNewRecipe from './Features/NewRecipe/components/CreateNewRecipe';
const { v4: uuidv4 } = require("uuid")



export default function AppRoutes(){
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
      }
    
    return(
    <div className = 'main-content-container'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route 
                path="/newRecipe" 
                element={<ProtectedRoute component={CreateNewRecipe}/>}  />
            <Route 
                path="/readMany" 
                element={<ProtectedRoute component={TesseractScheduler}/>} /> 
            <Route 
                path="/recipes" 
                element={<ProtectedRoute component={UserRecipes}/>} />
            <Route 
                path="/newRecipeForm" 
                element={<ProtectedRoute component={NewRecipeForm}/>} />
            <Route 
                path="/editRecipeForm/:id" 
                element={<ProtectedRoute component={RecipeForm}/>} />  
            <Route 
                path="/verifyText" 
                element={<ProtectedRoute component={VerifyTextEditor}/>} />   
            <Route 
                path="/recipe/:id" 
                element={<ProtectedRoute component={DisplayUserRecipe}/>} />  
        </Routes>
    </div>
)}
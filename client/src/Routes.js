import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Home from './Home'
import UserImages from './Images/DisplayImagesGrid';
import NewRecipe from "./Images/ImgUpload"
import ImgCropper from './Images/ImgCropper';
import TesseractScheduler from './ReadImage/TesseractScheduler';
import RecipeForm from './Recipes/EditRecipeForm'
import UserRecipes from "./Recipes/DisplayRecipesGrid"
import NewRecipeForm from './Recipes/NewRecipeForm'
import CreateRecipeImages from './RecipeBuilder/RecipeBuilder';
import VerifyTextEditor from './ReadImage/VerifyRecipeTextEditor';
import DisplayUserRecipe from './Recipes/DisplaySingleRecipe';
import ProtectedRoute from './Auth/protected-route';
import User from './User'
import {Loading} from './Auth/Loading';


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
                path="/files" 
                element={<ProtectedRoute component={UserImages}/>} />  
            <Route 
                path="/upload" 
                element={<ProtectedRoute component={NewRecipe}/>} />  
            <Route 
                path="/edit" 
                element={<ProtectedRoute component={ImgCropper}/>} />  
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
                path="/newRecipeImages" 
                element={<ProtectedRoute component={CreateRecipeImages}/>} />   
            <Route 
                path="/verifyText" 
                element={<ProtectedRoute component={VerifyTextEditor}/>} />   
            <Route 
                path="/recipe/:id" 
                element={<ProtectedRoute component={DisplayUserRecipe}/>} />  
        </Routes>
    </div>
)}
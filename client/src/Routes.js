import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './Home'
import {CreateNewRecipe} from './Features/NewRecipe';
import {TesseractScheduler, VerifyTextEditor} from './Features/ReadImage';
import {NewRecipeForm, EditRecipeForm} from './Features/RecipeForms'
import { DisplayRecipes, DisplaySingleRecipe } from './Features/DisplayRecipes';
import UserRecipes from "./Features/DisplayRecipes"
import {ProtectedRoute} from './Features/Auth';
import {Loading} from './Features/Auth/components/Loading';
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
                element={<ProtectedRoute component={DisplayRecipes}/>} />
            <Route 
                path="/newRecipeForm" 
                element={<ProtectedRoute component={NewRecipeForm}/>} />
            <Route 
                path="/editRecipeForm/:id" 
                element={<ProtectedRoute component={EditRecipeForm}/>} />  
            <Route 
                path="/verifyText" 
                element={<ProtectedRoute component={VerifyTextEditor}/>} />   
            <Route 
                path="/recipe/:id" 
                element={<ProtectedRoute component={DisplaySingleRecipe}/>} />  
        </Routes>
    </div>
)}
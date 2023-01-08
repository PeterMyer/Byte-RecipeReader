import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Landing from '../Features/Misc/Landing'
import {CreateNewRecipe} from '../Features/RecipeSectionSelector';
import {TesseractContainer, VerifyTextEditor} from '../Features/ReadImage';
import {NewRecipeForm, EditRecipeForm} from '../Features/RecipeForms'
import { DisplayAllRecipes, DisplaySingleRecipe } from '../Features/DisplayRecipes';
import {ProtectedRoute} from '../Features/Auth';
import {Loading} from '../Features/Auth/components/Loading';
const { v4: uuidv4 } = require("uuid")

export default function AppRoutes(){
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
      }
    
    return(
    <div className = 'main-content-container'>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route 
                path="/newRecipe" 
                element={<ProtectedRoute component={CreateNewRecipe}/>}  />
            <Route 
                path="/readMany" 
                element={<ProtectedRoute component={TesseractContainer}/>} /> 
            <Route 
                path="/recipes" 
                element={<ProtectedRoute component={DisplayAllRecipes}/>} />
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
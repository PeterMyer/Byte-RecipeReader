import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Landing from '../Features/Misc/Landing'
import {CreateNewRecipe} from '../Features/RecipeSectionSelector';
import {TesseractContainer} from '../Features/ImageParser';
import { VerifyImgTextContainer } from '../Features/VerifyImageText';
import {ProtectedRoute} from '../Features/Auth';
import {Loading} from '../Features/Auth/components/Loading';
import { RecipeRoutes } from '../Features/DisplayRecipes/Routes';
import { RecipeFormRoutes } from '../Features/RecipeForms/Routes';

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
                path="/parseImage" 
                element={<ProtectedRoute component={TesseractContainer}/>} /> 
            <Route 
                path="/recipes/*" 
                element={<ProtectedRoute component={RecipeRoutes}/>} />
            <Route 
                path="/recipeForm/*" 
                element={<ProtectedRoute component={RecipeFormRoutes}/>} /> 
            <Route 
                path="/verifyText" 
                element={<ProtectedRoute component={VerifyImgTextContainer}/>} />   
        </Routes>
    </div>
)}
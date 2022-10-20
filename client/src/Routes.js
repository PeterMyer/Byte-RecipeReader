import { Routes, Route } from 'react-router-dom';
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


export default function AppRoutes(){
    return(
    <div className = 'main-content-container'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="files" element={<UserImages />} />
            <Route path="upload" element={<NewRecipe />} />
            <Route path="edit" element ={<ImgCropper/>}/>
            <Route path="readMany" element ={<TesseractScheduler/>}/>
            <Route path="recipes" element = {<UserRecipes/>}/>
            <Route path="newRecipeForm" element = {<NewRecipeForm/>}/>
            <Route path="editRecipeForm/:id" element = {<RecipeForm/>}/>
            <Route path="newRecipeImages" element = {<CreateRecipeImages/>}/>
            <Route path="verifyText" element ={<VerifyTextEditor/>}/>
            <Route exact path="recipe/:id" element = {<DisplayUserRecipe/>}/>
        </Routes>
    </div>
)}
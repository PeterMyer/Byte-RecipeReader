import { Routes, Route } from 'react-router-dom';
import Home from './Home'
import UserImages from './Images/DisplayImagesGrid';
import NewRecipe from "./Images/ImgUpload"
import ImgCropper from './Images/ImgCropper';
import TesseractScheduler from './TesseractScheduler';
import TesseractWorker from './TesseractWorker';
import RecipeEditor from './RecipeEditor';
import UserRecipes from "./Recipes/DisplayRecipesGrid"
import EditRecipeForm from './Recipes/EditRecipeForm'
import CreateRecipeImages from './RecipeBuilder/RecipeBuilder';
import VerifyTextEditor from './VerifyRecipeTextEditor';
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
            <Route path="read" element ={<TesseractWorker/>}/>
            <Route path="editRecipe" element = {<RecipeEditor/>}/>
            <Route path="recipes" element = {<UserRecipes/>}/>
            <Route path="EditRecipeForm" element = {<EditRecipeForm/>}/>
            <Route path="newRecipeImages" element = {<CreateRecipeImages/>}/>
            <Route path="verifyText" element ={<VerifyTextEditor/>}/>
            <Route exact path="recipe/:id" element = {<DisplayUserRecipe/>}/>
        </Routes>
    </div>
)}
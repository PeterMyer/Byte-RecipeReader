import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import reportWebVitals from './reportWebVitals';
import UserImages from "./images"
import NewRecipe from "./ImgUpload"
import ImgCropper from "./ImgCropper"
import RecipeEditor from "./RecipeEditor"
import TesseractWorker from "./TesseractWorker"
import UserRecipes from "./UserRecipes"
import EditRecipeForm from './EditRecipeForm';
import CreateRecipeImages from './RecipeBuilder/RecipeBuilder';
import TesseractScheduler from './TesseractScheduler';
import VerifyTextEditor from './VerifyRecipeTextEditor'


const historyInstance = createBrowserHistory();   


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router history = {historyInstance}>
      <Routes>
        <Route path="/" element={<App />} />
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
     </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

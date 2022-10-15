import apiService from "../Utilities/apiService";
import React, { useState, useEffect } from "react";
import DisplayUserRecipe from "./DisplaySingleRecipe";
import { Link } from "react-router-dom";


export default function DisplayRecipes(){
    const [recipes, setRecipes] = useState(null)

    const getRecipes = async () =>{
          let response = await apiService.recipe.getAll()
          setRecipes(response.data)
      }

    useEffect(()=> {
        getRecipes()
    },[])

    return(
        <section>
            <h1>Your Recipes</h1>
            <div className = "allRecipesContainer" >
                {recipes !==null ? 
                    recipes.map((recipe)=>{
                        return(
                            <div className = "singleRecipeContainer" >
                                <Link to={`/recipe/${recipe.id}`}>
                                    <figure>
                                        <img className = "singleRecipeDisplayIcon"
                                        alt= "defeaultImg"
                                        src = "RecipeIcon.png"
                                        />
                                        <div>{recipe.name}</div>
                                    </figure>
                                </Link>
                            </div>
                            )
                    }):
                <div>
                    No Recipes
                </div>
                }
            </div>
        </section>
            )
}

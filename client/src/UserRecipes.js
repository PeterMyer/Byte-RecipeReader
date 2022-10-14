import apiService from "./apiService";
import React, { useState, useEffect } from "react";
import DisplayUserRecipe from "./DisplayUserRecipe";
import { Link } from "react-router-dom";


export default function Recipes(){
    const [recipes, setRecipes] = useState(null)

    const getRecipes = async () =>{
          let response = await apiService.recipe.getAll()
          setRecipes(response.data)
      }

    useEffect(()=> {
        getRecipes()
    },[])

    return(
        <div>
            <div>Your Recipes</div>
                <div>
                    {recipes !==null ? 
                        recipes.map((recipe)=>{
                            return(
                                <Link to={`/recipe/${recipe.id}`}>
                                    <div className = "recipeContainer">
                                        <img
                                        alt= "defeaultImg"
                                        src = "logo192.png"
                                        />
                                        
                                        <div>{recipe.name}</div>
                                    </div>
                                </Link>
                                )
                        }):
                    <div>
                        No Recipes
                    </div>
                    }
            </div>
        </div>
            )

}

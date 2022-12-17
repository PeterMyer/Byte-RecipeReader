import apiService from "../Utilities/apiService";
import React, { useState, useEffect } from "react";
import DisplayUserRecipe from "./DisplaySingleRecipe";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";




export default function DisplayRecipes(){
    const [recipes, setRecipes] = useState([])
    const { user } = useAuth0();


    const getRecipes = async () =>{
        // const domain = "dev-y3c8dp4tuvq4d5da.us.auth0.com";
        // try {
        //     const accessToken = await getAccessTokenSilently({
        //       audience: `https://byte-recide-reader.com`,
        //       scope: "view:recipe",
        //     });
            let response = await apiService.recipe.getAll(user.sub)
            setRecipes(response.data)
        // } catch (e) {
        //     console.log(e.message);
        //   }
      }

    useEffect(()=> {
        getRecipes()
    },[])

    return(
        <section>
            <h1>Your Recipes</h1>
            <div className = "allRecipesContainer" >
                {recipes.length !==0 ? 
                    recipes.map((recipe)=>{
                        return(
                            <div className = "singleRecipeContainer" >
                                <Link to={`/recipe/${recipe.id}`}>
                                    <figure>                              
                                            <img className = "singleRecipeDisplayIcon"
                                            alt= "defeaultImg"
                                            src ={ recipe.image? recipe.image.filepath:"RecipeIcon.png"}/>

                                        <div>{recipe.name}</div>
                                    </figure>
                                </Link>
                            </div>
                            )
                    }):
                <div>
                    You have no recipes! To get started go to the Images page and upload pictures of your favorite recipe ingredients and instructions!
                </div>
                }
            </div>
        </section>
            )
}

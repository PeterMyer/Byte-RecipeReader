import apiService from "./apiService";
import React, { useState, useEffect } from "react";

export default function Recipes(){
    const [recipes, setRecipes] = useState(<any/>)

    const getRecipes = async () =>{
          let response = await apiService.recipes.getAll()
          console.log(response)
          setRecipes(response)
      }

    useEffect(()=> {
        getRecipes()
    },[])

    return(
        <div>
            {recipes}
        </div>)

}

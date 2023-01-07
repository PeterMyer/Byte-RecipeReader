import { useState, useEffect } from "react"
import {calculateRecipeNutrition} from '../utils/calculateRecipeNutrition'
import { DisplayNutritionData } from "./DisplayNutritionData"
import {searchGovNutrition, getNutrition, saveNutrition} from '../api'

export function NutritionContainer(props){
    const id = props.id
    const servings = props.servings
    const ingredients = props.ingredients
    const [recipeNutrition, setRecipeNutrition] = useState(null)
    const [existingNutrition, setSavedNutrition]=  useState(null)
    const [nutritionCalulated, toggleNutritionCalulated] = useState(false)

    const handleSearchGovNutrition = async(id)=>{
        let nutrition = await searchGovNutrition(id)
        let calculatedNutrition = calculateRecipeNutrition(ingredients, nutrition.data, servings)
        toggleNutritionCalulated(true)
        setRecipeNutrition(calculatedNutrition)
    }

    const fetchNurition = async(id)=>{
        let response = await getNutrition(id)
        setSavedNutrition (JSON.parse(response.data.nutritionData))
    }

    const handleSaveNutrition = async(id, recipeNutrition)=>{
        let nutritionPayload = {
            nutrition: JSON.stringify(recipeNutrition)
        }
        let response = await saveNutrition(id, nutritionPayload)
        setSavedNutrition (JSON.parse(response.data.nutritionData))
    }

    useEffect(()=>{
        fetchNurition(id)
    },[])

    return(
        <> 
        {existingNutrition?   
            <DisplayNutritionData nutrition={existingNutrition}/>
            :
            <div>
                {
                    nutritionCalulated? 
                        <button onClick={()=>handleSaveNutrition(id,recipeNutrition)}>Save Nutrition</button>
                        : 
                        <button onClick={()=>handleSearchGovNutrition(id)}>Get Nutrition</button>
                }
                {
                    recipeNutrition? 
                        <DisplayNutritionData nutrition={recipeNutrition}/>
                        : null
                }
            </div>}
        </>
    )
}
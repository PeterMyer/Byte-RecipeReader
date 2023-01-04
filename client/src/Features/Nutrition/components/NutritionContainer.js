import { useState, useEffect } from "react"
import apiService from "../../../Utilities/apiService";
import {calculateIngredientNutrition} from '../../../Utilities/helperFunctions'

export function NutritionContainer(props){
    const id = props.id
    const servings = props.servings
    const ingredients = props.ingredients
    const [savedNutrition, setSavedNutrition]=  useState(null)
    const [nutritionData, setNutritionData] = useState(null)
    let recipeNutrition ={
        "Energy": 0,
        "Fatty acids, total monounsaturated": 0,
        "Fatty acids, total polyunsaturated": 0,
        "Fatty acids, total saturated": 0,
        "Cholesterol": 0,
        "Sodium, Na":0,
        "Fiber, total dietary": 0,
        "Protein":0,
        "Sugars, total including NLEA":0,
        "Vitamin D (D2 + D3)":0,
        "Calcium, Ca":0,
        "Iron, Fe":0,
        "Potassium, K":0

    }
    const [calculatedNatrition, toggleCalculatedNutrition] = useState(false)

    const getNurition = async(id)=>{
        let nutrition = await apiService.nutrition.search(id)
        setNutritionData(nutrition.data)
        toggleCalculatedNutrition(true)
    }

    const loadNurition = async(id)=>{
        let response = await apiService.nutrition.retrieve(id)
        setSavedNutrition (JSON.parse(response.data.nutritionData))
    }

    const handleSaveNutrition = async(id, recipeNutrition)=>{
        let nutritionPayload = {
            nutrition: JSON.stringify(recipeNutrition)
        }

        let response = await apiService.recipe.saveNutrition(id, nutritionPayload)
        setSavedNutrition (JSON.parse(response.data.nutritionData))
    }

    useEffect(()=>{
        loadNurition(id)
    },[])

    return(
        <> {savedNutrition?           
            <div>
                <h3>Per Serving</h3>
                {
                    Object.entries(savedNutrition).map(([nutrient, value])=> {
                        return(
                            <div className = 'nutrient-display'>  
                                {nutrient==='Energy'?
                                    <strong className= "nutrient-name">Calories:</strong>:
                                    <strong className= "nutrient-name">{nutrient}:</strong>}
                                <div className="nutrient-value" > {Math.round(value*100)/100}</div>
                            </div>
                        )
                })
                }
            </div>:
            <div>
            {calculatedNatrition? 
                <button onClick={()=>handleSaveNutrition(id,recipeNutrition)}>Save Nutrition</button>
                : 
                <button onClick={()=>getNurition(id)}>Get Nutrition</button>}
             

            {nutritionData?ingredients.map((ingredient,index)=>{
                let ingredientNutrition = {}
                let selectedFood = nutritionData[index].foods[0]
                let defaultGramWeight = selectedFood.foodMeasures.length > 0 ?
                    selectedFood.foodMeasures[selectedFood.foodMeasures.length-1].gramWeight: 
                    0
                console.log("ingredient",ingredient)

                console.log("selectedFood",selectedFood)
                return(
                    <>
                        {Object.values(selectedFood.foodNutrients)
                            .filter((obj)=> obj.nutrientNumber === "203"
                                || obj.nutrientNumber === "208"
                                || obj.nutrientNumber === "606"
                                || obj.nutrientNumber === "645"
                                || obj.nutrientNumber === "646"
                                || obj.nutrientNumber === "601"
                                || obj.nutrientNumber === "307"
                                || obj.nutrientNumber === "291"
                                || obj.nutrientNumber === "269"
                                || obj.nutrientNumber === "328"
                                || obj.nutrientNumber === "301"
                                || obj.nutrientNumber === "303"
                                || obj.nutrientNumber === "306")
                                .map((item)=>{
                                    ingredientNutrition = {...ingredientNutrition,[item.nutrientName]: item.value}
                                })
                        }
                        {calculateIngredientNutrition(
                            ingredient,
                            ingredientNutrition,
                            defaultGramWeight,
                            servings,
                            recipeNutrition
                            )}
                    </>
                )
            })
            :null}
            {calculatedNatrition? 
            <div>
                {
                    Object.entries(recipeNutrition).map(([nutrient, value])=> {
                        return(
                            <div className = 'nutrient-display'>  
                                {nutrient==='Energy'?
                                    <strong className= "nutrient-name">Calories:</strong>:
                                    <strong className= "nutrient-name">{nutrient}:</strong>}
                                <div className="nutrient-value" > {Math.round(value*100)/100}</div>
                            </div >
                        )
                })
                }
            </div>
            : null}
        </div>}</>
    )
}
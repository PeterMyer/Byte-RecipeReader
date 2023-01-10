import { useState, useEffect } from "react"
import { calculateNutrition } from "../utils/calculateNutrition"
import { DisplayNutritionData } from "./NutritionData"
import { lookupNutrition, getNutrition, saveNutrition } from "../api"

export function Nutrition( props ) {
	const recipeId = props.recipeId
	const servings = props.servings
	const ingredients = props.ingredients
	const [ newNutrition, setNewNutrition ] = useState( null )
	const [ existingNutrition, setExistingNutrition ] =  useState( null )
	const [ nutritionCalulated, toggleNutritionCalulated ] = useState( false )

	const handleLookupNutrition = async( id ) => {
		let nutrition = await lookupNutrition( id )
		let totalNutrition = calculateNutrition( ingredients, nutrition.data, servings )
		toggleNutritionCalulated( true )
		setNewNutrition( totalNutrition )
	}

	const handleGethNurition = async( id ) => {
		let response = await getNutrition( id )
		setExistingNutrition ( JSON.parse( response.data.nutritionData ))
	}

	const handleSaveNutrition = async( id, newNutrition ) => {
		let nutritionPayload = {
			nutrition: JSON.stringify( newNutrition )
		}
		let response = await saveNutrition( id, nutritionPayload )
		setExistingNutrition( JSON.parse( response.data.nutritionData ))
	}

	useEffect(() => {
		handleGethNurition( recipeId )
	}, [])

	return(
		<> 
		{
			existingNutrition ?   
				<DisplayNutritionData nutrition = { existingNutrition }/>
			:
				<div>
					{
						nutritionCalulated ? 
							<button onClick = {() => handleSaveNutrition( recipeId,newNutrition )}>
								Save Nutrition
							</button>
						: 
							<button onClick = {() => handleLookupNutrition( recipeId )}>
								Get Nutrition
							</button>
					}
					{
						newNutrition ? 
							<DisplayNutritionData 
								nutrition={newNutrition}
							/>
						: 
							null
					}
				</div>
		}
		</>
	)
}
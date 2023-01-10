import { axiosClient } from "../../../Lib/axios"

export const createRecipe = async( payload ) => {
	try { let response = await axiosClient.post( "/api/recipes", payload )
		return response
	} catch( error ) {
		console.log(error)
	}
}
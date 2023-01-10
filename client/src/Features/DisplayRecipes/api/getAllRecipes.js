import { axiosClient } from "../../../Lib/axios"

export const getAllRecipes = async( payload ) => {
    try {
      let response = await axiosClient.get( "/api/recipes", {
        params: { userId: payload }
      })
      return response
    } catch( error ) {
      console.log( error )
    }
  }
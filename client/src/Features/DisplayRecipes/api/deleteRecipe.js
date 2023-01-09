import { axiosClient } from "../../../Lib/axios"

export const deleteRecipe = async( id ) => {
    try {
      let response = await axiosClient.delete( `/api/recipes/${id}` )
      return response
    } catch( error ) {
      console.log( error )
    }
  }
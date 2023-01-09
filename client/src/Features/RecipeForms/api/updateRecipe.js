import { axiosClient } from "../../../Lib/axios"

export const updateRecipe = async( id, payload ) => {
    try{
      let response = await axiosClient.put( `/api/recipes/${ id }`, payload )
      return response
    } catch ( error ) {
      console.log( error )
    }
  }
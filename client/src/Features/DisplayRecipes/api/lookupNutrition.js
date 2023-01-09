import { axiosClient } from "../../../Lib/axios"

export const lookupNutrition =  async( id ) => {
    let response = await axiosClient.post( `/api/nutrition/${id}` )
    return response
  }
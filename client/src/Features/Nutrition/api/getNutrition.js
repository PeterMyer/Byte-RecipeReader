import { axiosClient } from "../../../Lib/axios"

export const getNutrition = async( id ) => {
  console.log('id', id)
    let response = await axiosClient.get( `/api/nutrition/${id}` )
    return response
  }
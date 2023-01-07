import { axiosClient } from "../../../Lib/axios"

export const saveNutrition = async (id, payload)=>{
    try{ 
      let response = await axiosClient.post(`/api/recipes/${id}/nutrition`, payload)
      return response
    } catch(error){
        console.log(error)
    }
  }
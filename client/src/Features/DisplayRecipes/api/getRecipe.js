import { axiosClient } from "../../../Lib/axios"

export const getRecipe = async(id)=>{
    try{
      let response = await axiosClient.get(`/api/recipes/${id}`)
      return response
    } catch(error){
        console.log(error)
    }
  }
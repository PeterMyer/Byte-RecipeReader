import axios from "axios"

export const updateRecipe = async(id, payload)=> {
    try{
      let response = await axios.put(`/api/recipes/${id}`, payload)
      return response

    } catch (error){
      console.log(error)
    }
  }
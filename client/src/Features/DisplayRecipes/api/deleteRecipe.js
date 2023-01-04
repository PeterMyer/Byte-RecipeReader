import axios from "axios"

export const deleteRecipe = async(id)=>{
    try{
      let response = await axios.delete(`/api/recipes/${id}`)
      return response
    } catch(error){
      console.log(error)
    }
  }
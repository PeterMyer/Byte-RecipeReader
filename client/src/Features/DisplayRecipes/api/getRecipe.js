import axios from "axios"

export const getRecipe = async(id)=>{
    try{
      let response = await axios.get(`/api/recipes/${id}`)
      return response
    } catch(error){
        console.log(error)
    }
  }
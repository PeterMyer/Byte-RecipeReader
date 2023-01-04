import axios from "axios"

export const getAllRecipes = async(payload)=>{
    try {
      let response = await axios.get('/api/recipes',{
        params: {userId: payload}
      })
      console.log(response)
      return response
    } catch(error){
      console.log(error)
    }
  }
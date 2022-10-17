/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"


const apiClient = axios.create({
  baseURL: 'http://localhost:3001'
})

export default {
  recipe:{
    create: async(payload)=>{
      try { let response = await apiClient.post('/recipes', payload )
        return response
      } catch(error){
        console.log(error)
      }},
    getAll: async(payload)=>{
      try {
        let response = await apiClient.get('/recipes', payload)
        return response
      } catch(error){
        console.log(error)
      }
    },
    retrieveRecipe: async(id)=>{
      try{
        let response = await apiClient.get(`/recipes/${id}`)
        return response
      } catch(error){
        console.log(error)
      }
    }
  },

  upload: {
   saveImage:  async (payload) => {
    try {
      let response = await apiClient.post(`/uploads/`, payload, {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
       return response
  } catch(error){
        console.log(error)
      }
    },
    deleteImage: async (payload) => {
      try {
        let response = await apiClient.delete(`/uploads/${payload.id}`,{data:payload})
          console.log('response',response)
          return response
      } catch(error) {
          console.log(error)
      }
    },

    classifyText: async (payload) =>{
      try {
        let response = await apiClient.post('/classification', {
          headers:{
            'Content-Type' : 'json'
          },
          data:payload
        })
         return response
        } catch(error){
          console.log(error)
        }
    },
    searchUSDA: async(ingredient)=>{
      try {
      // let headers= {'api_key': process.env.REACT_APP_USDA_API_KEY}
      let params = {'query': ingredient}
      let response = await apiClient.post(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_USDA_API_KEY}`,
      params
      )
      return response
      } catch(error){
        console.log(error)
      }
    }
  },
  import: {
    retrieveFilePaths: async () => {
      try {
        let {data} = await apiClient.get('/uploads')
        return data
      } catch (error){
        console.log(error)
      }
    },
    retrieveFile:  async(fileName)=>{
    try{
      let response = await apiClient.get(`/images${fileName}`,
      { responseType: 'blob'})
      let resBlob = response.data
      let objectURL = URL.createObjectURL(resBlob);
      let myImage = new Image();
      myImage.src = objectURL;
      return objectURL

    }
    catch(error){
      console.log(error)
    }

  }
  }
}

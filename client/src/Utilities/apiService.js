/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const apiClient = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  recipe:{
    create: async(payload)=>{
      try { let response = await apiClient.post('/api/recipes', payload )
        return response
      } catch(error){
        console.log(error)
      }},
    getAll: async(payload)=>{
      try {
        let response = await apiClient.get('/api/recipes',{
          params: {userId: payload}
        })
        console.log(response)
        return response
      } catch(error){
        console.log(error)
      }
    },
    retrieveRecipe: async(id)=>{
      try{
        let response = await apiClient.get(`/api/recipes/${id}`)
        return response
      } catch(error){
          console.log(error)
      }
    }, 
    update: async(id, payload)=>{
      try{
        let response = await apiClient.put(`/api/recipes/${id}`, payload)
        return response

      } catch (error){
        console.log(error)
      }
    },
    delete: async(id)=>{
      try{
        let response = await apiClient.delete(`/api/recipes/${id}`)
        return response
      } catch(error){
        console.log(error)
      }
    },
    saveNutrition: async (id, payload)=>{
      try{ 
        console.log(payload)
        let response = await apiClient.post(`/api/recipes/${id}/nutrition`, payload)
        console.log(response)
        return response
      } catch(error){
          console.log(error)
      }
    }
  },

  upload: {
   saveImage:  async (payload,userId) => {
    try {
      console.log('userId')
      let response = await apiClient.post(`/api/uploads/`, payload, {
        headers:{
          "Content-Type": "multipart/form-data"
        },
        params:{userId:userId}
      })
       return response
    } catch(error){
        console.log(error)
      }
    },
    deleteImage: async (payload) => {
      try {
        let response = await apiClient.delete(`/api/uploads/${payload.id}`,{data:payload})
          console.log('response',response)
          return response
      } catch(error) {
          console.log(error)
      }
    },
    classifyText: async (payload) =>{
      try {
        let response = await apiClient.post('/api/classification', {
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
    // searchUSDA: async(ingredient)=>{
    //   try {
    //   // let headers= {'api_key': process.env.REACT_APP_USDA_API_KEY}
    //   let params = {'query': ingredient}
    //   let response = await apiClient.post(
    //   `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_USDA_API_KEY}`,
    //   params
    //   )
    //   return response
    //   } catch(error){
    //     console.log(error)
    //   }
    // }
  },
  import: {
    retrieveFilePaths: async (userId) => {
      try {
        let {data} = await apiClient.get('/api/uploads',{params:{userId:userId}})
        console.log('data',data)
        return data
      } catch (error){
        console.log(error)
      }
    },
    retrieveFile:  async(fileName)=>{
    try {
      let response = await apiClient.get(`/images${fileName}`,
      { responseType: 'blob'})
      let resBlob = response.data
      let objectURL = URL.createObjectURL(resBlob);
      let myImage = new Image();
      myImage.src = objectURL;
      console.log('response',myImage)
      
      return objectURL
    }
    catch(error){
      console.log(error)
    }
  }},
  nutrition:{
    search: async(id)=>{
      let response = await apiClient.post(`/api/nutrition/${id}`)
      return response
    },
    retrieve: async(id)=>{
      let response = await apiClient.get(`/api/nutrition/${id}`)
      return response
    }
  }
}

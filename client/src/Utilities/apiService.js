/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,             
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
}));


export default {
  recipe:{
    create: async(payload)=>{
      try { let response = await axios.post('/api/recipes', payload )
        return response
      } catch(error){
        console.log(error)
      }},
    getAll: async(payload)=>{
      try {
        let response = await axios.get('/api/recipes',{
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
        let response = await axios.get(`/api/recipes/${id}`)
        return response
      } catch(error){
          console.log(error)
      }
    }, 
    update: async(id, payload)=>{
      try{
        let response = await axios.put(`/api/recipes/${id}`, payload)
        return response

      } catch (error){
        console.log(error)
      }
    },
    delete: async(id)=>{
      try{
        let response = await axios.delete(`/api/recipes/${id}`)
        return response
      } catch(error){
        console.log(error)
      }
    },
    saveNutrition: async (id, payload)=>{
      try{ 
        let response = await apiClient.post(`/api/recipes/${id}/nutrition`, payload)
        return response
      } catch(error){
          console.log(error)
      }
    }
  },

  upload: {
   saveImage:  async (payload,userId) => {
    try {
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

          return response
      } catch(error) {
          console.log(error)
      }
    },
    classifyText: async (payload) =>{
      try {
        let response = await axios.post('/api/classification', {
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
  },
  import: {
    retrieveFilePaths: async (userId) => {
      try {
        let {data} = await axios.get('/api/uploads',{params:{userId:userId}})
        return data
      } catch (error){
        console.log(error)
      }
    },
    retrieveFile:  async(filePath)=>{
    try {
      let response = await fetch(filePath,
        {
          cache: 'no-cache',
        })
      let resBlob = await response.blob()
      let objectURL = URL.createObjectURL(resBlob);
      let myImage = new Image();
      myImage.src = objectURL;
      return objectURL
    }
    catch(error){
      console.log(error)
    }
  }},
  nutrition:{
    search: async(id)=>{
      let response = await axios.post(`/api/nutrition/${id}`)
      return response
    },
    retrieve: async(id)=>{
      let response = await axios.get(`/api/nutrition/${id}`)
      return response
    }
  }
}

/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2'
}));


const apiClient = axios.create({
  baseURL: 'http://localhost:3001'
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
        console.log('filePaths',data)
        return data
      } catch (error){
        console.log(error)
      }
    },
    retrieveFile:  async(filePath)=>{
    try {
      // console.log('bucket:',process.env.REACT_APP_S3_BUCKET_NAME)
      // console.log('file:',fileName)
      // console.log('key:',process.env.REACT_APP_AWS_ACCESS_KEY_ID)
      // console.log('s_key:',process.env.REACT_APP_AWS_SECRET_ACCESS_KEY)

      // const params = {
      //   Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
      //   Key: fileName
      // }
      // s3.getObject(params, function(err, data) {
      //   if (err) {
      //     console.log(err, err.stack)
      //   }else  {   
      //     console.log('aws data',data)
      //     return data}}
      //   )

      // let response = await apiClient.get(`/images${fileName}`,
      // { responseType: 'blob'})
      // let resBlob = response.data
      // let objectURL = URL.createObjectURL(resBlob);
      // let myImage = new Image();
      // myImage.src = objectURL;
      // console.log('response',myImage)
      // return objectURL

      let response = await fetch(filePath,
        {
          cache: 'no-cache',
        })
      let resBlob = await response.blob()
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

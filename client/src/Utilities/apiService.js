/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3(({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,             
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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
        console.log(payload)
        let response = await axios.post(`/api/recipes/${id}/nutrition`, payload)
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
      let response = await axios.post(`/api/uploads/`, payload, {
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
        let response = await axios.delete(`/api/uploads/${payload.id}`,{data:payload})
          console.log('response',response)
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
    }
  },
  import: {
    retrieveFilePaths: async (userId) => {
      try {
        let {data} = await axios.get('/api/uploads',{params:{userId:userId}})
        console.log('filePaths',data)
        return data
      } catch (error){
        console.log(error)
      }
    },
    retrieveFile:  async(fileName)=>{
    try {
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName
      }
      s3.getObject(params, function(err, data) {
        if (err) {
          console.log(err, err.stack)
        }else  {   
          console.log('aws data',data)
          return data}}
        )
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

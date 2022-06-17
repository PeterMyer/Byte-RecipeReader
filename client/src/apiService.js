/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const apiClient = axios.create({
  baseURL: 'http://localhost:3001'
})

export default {
  uploads: {
   saveImage:  async (payload) => {
    try {
         let response = await apiClient.post('/uploads', 'hi')
         console.log('this works')
         return response
  } catch(error){
        console.log(error)
      }
    }
  }}

/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const apiClient = axios.create({
  baseURL: 'http://localhost:3001'
})

export default {
  upload: {
   saveImage:  async (payload) => {
    try {
      let response = await apiClient.post('/uploads', payload, {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
       return response
  } catch(error){
        console.log(error)
      }
    }
  },
  import: {
    retrieveImage: async () => {
      try {
        let {data} = await apiClient.get('/uploads')
        return data
      } catch (error){
        console.log(error)
      }
    }
  }
}

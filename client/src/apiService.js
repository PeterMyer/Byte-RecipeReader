/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const apiClient = axios.create({
  baseURL: 'http://localhost:3001'
})

export default {
  upload: {
   saveImage:  async (payload) => {
    console.log(payload)
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

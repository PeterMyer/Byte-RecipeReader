import axios from "axios"

export const saveImage =  async (payload,userId) => {
    try {
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
    }
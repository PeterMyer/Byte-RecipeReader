import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.BASE_URL ?process.env.BASE_URL :"http://localhost:3001"
})
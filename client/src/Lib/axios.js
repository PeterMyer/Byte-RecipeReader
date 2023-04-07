import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.baseURL || "http://localhost:3000"
})
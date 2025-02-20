import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://cyberminds-server.onrender.com/api",
  // withCredentials: true,
});
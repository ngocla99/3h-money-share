import axios from "axios";
// Set config defaults when creating the instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosClient;

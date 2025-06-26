import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  withCredentials: true, //cookies (for sessions, etc)
})



export default api;

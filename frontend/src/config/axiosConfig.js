import axios from "axios";
import { API_URL } from "./endpoints";
import { getAccessToken, logout } from "../service/userServices";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  });
  
  // attach token to outgoing req
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
//response interceptor for token expire & refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    //check for unauth & check not login/refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry){
      //mark req so no loop
      originalRequest._retry = true;

      console.warn("Unauthorized request. Logging out due to 401 error");
      logout();
      window.location.href = '/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
  

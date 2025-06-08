import axios from "axios";
import axiosInstance from "../config/axiosConfig";

//import all the api
import {
    SIGNUP,
    LOGIN,
    LOGOUT,
    PUT_RESET_PASSWORD,
    PROFILE,
} from "../config/endpoints"

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Store token in local storage & update axiosInstance def header
 * @param {string} accessToken
 * @param {string} refreshToken
 */
const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

/**
 * grab the token from locStrg, for req interceptor
 * @returns {string|null} null if not found
 */
const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * gets the refreshed one
 * @returns same like getAccessToken
 */
const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Rm token & clear auth header
 * mostly logout / invalid tokens
 */
const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  // rm the auth header, so no stale tokens
  delete axiosInstance.defaults.headers.common['Authorization'];
};

//api processes
const login = async ({email, password}) => {
    try {
      const response = await axiosInstance.post(LOGIN, {email, password});
      const {access, refresh} = response.data;
      setTokens(access, refresh);
      //return full res data
      return response.data;
    } catch (error) {
      console.error("Error logging in: ", error);
      removeTokens();
      if (error.response) {
        throw new Error(
           error.response.data.message || error.response.data.detail || "Incorrect email or password"
        );
      } else {
        throw new Error("Network error or server unavailable");
      }
    }
  };

  /**
   * 
   * @param {object} data - user data {email, pass, uname}
   * @returns 
   */
  const register = async (data) => {
    try {
      const response = await axiosInstance.post(SIGNUP, data);
      // if auto-login & return token, call setTokens
      // const userId = response.data.user.id;
      // localStorage.setItem("token", token);
      // localStorage.setItem("userId", userId);
      return response.data;
    } catch (error) {
      console.error("Error signing up: ", error);
      if (error.response) {
        throw new Error(error.response.data.message || error.response.data.detail || "Registration failed");      
      } else {
        throw new Error("Network error");
      }
    }
  };

  //invalidate token
  const logout = async () => {
    try{
      await axiosInstance.post(LOGOUT);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      removeTokens()
    }
  }

  const putResetPassword = async ({ email, password }) => {
    const data = { email, password };
    try {
      const res = await axiosInstance.put(PUT_RESET_PASSWORD, data);
      return res;
    } catch (error) {
      console.error("Error resetting password: ", error);
      if(error.response) {
        throw new Error(error.response.data.message || error.response.data.detail || "Failed to reset password");
      } else {
      throw Error("Network error");
      }
    }
  };
  
// Get Profile Datas
const fetchProfileData = async (data) => {
    try {
      //assumes PROFILE_DATA is get endpoint
      const res = await axiosInstance.post(PROFILE_DATA, data);
      return res.data;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized or session expired. Please log in again");
      }
      throw error;
    }
  };

// make all process available
  export {
    login,
    logout,
    register,
    putResetPassword,
    fetchProfileData,
    getAccessToken,
    getRefreshToken,
    setTokens,
    removeTokens
  };
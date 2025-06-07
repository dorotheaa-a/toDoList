import axios from "axios";
import axiosInstance from "../config/axiosConfig";

//import all the api
import {
    API_URL,
    SIGNUP,
    LOGIN,
    LOGOUT,
    POST_FORGOT_PASSWORD,
    PUT_RESET_PASSWORD,
    PROFILE_DATA,
    API_NOTES,
    API_NOTE_DETAIL,
    API_NOTE_COLLABORATORS,
    API_PROJECTS,
    API_PROJECT_DETAIL,
    API_PROJECT_COLLABORATORS,
    API_REMINDERS,
    API_REMINDER_DETAIL
} from "../config/endpoints"

//api processes
const login = async (data) => {
    try {
      const response = await axiosInstance.post(LOGIN, data);
      const token = response.data.token;
      const userId = response.data.user.id;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      return response.data;
    } catch (error) {
      console.error("Error logging in: ", error);
      if (error.response) {
        throw new Error(
          error.response.data.message[0].msg || "Incorrrect email or password"
        );
      } else {
        throw new Error("Network error");
      }
    }
  };

  const register = async (data) => {
    try {
      const response = await axiosInstance.post(SIGNUP, data);
      const token = response.data.token;
      const userId = response.data.user.id;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      return response.data;
    } catch (error) {
      console.error("Error signing up: ", error);
      if (error.response) {
        throw new Error(error.response.data.message[0].msg);
      } else {
        throw new Error("Network error");
      }
    }
  };

  const putResetPassword = async ({ email, password }) => {
    const data = { email, password };
    try {
      const res = await axiosInstance.put(PUT_RESET_PASSWORD, data);
      return res;
    } catch (error) {
      console.error("Error resetting password: ", error);
      throw error;
    }
  };
  
// Get Profile Datas
const fetchProfileData = async (data) => {
    try {
      const res = await axiosInstance.post(PROFILE_DATA, data);
      return res.data;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      throw error;
    }
  };

// make all process available
  export {
    login,
    register,
    putResetPassword,
    fetchProfileData
  };
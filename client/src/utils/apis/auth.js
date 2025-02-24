import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth"; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Server error" };
  }
};



export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || "Something went wrong";
    }
  };


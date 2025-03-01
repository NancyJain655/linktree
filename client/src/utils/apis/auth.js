import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASEURL; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData, {
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
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
  
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || "Something went wrong";
    }
  };

  export const updateUser = async (userData, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/auth/update`, userData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
          "Content-Type": "application/json",
        },
      });
  
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Something went wrong";
    }
  };
  export const updateUserAgain = async (token, username, category) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/users/profile`,
        { username, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      throw error;
    }
  };


  export const getUserData = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`,{
        headers: {
        Authorization: `Bearer ${token}`,
      },});
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  export const updateProfile = async (Bio,backColor,token) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/users/profile1`, 
        {
          Bio: Bio, 
          backColor: backColor.trim(), // Ensure correct format
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update profile" };
    }
  };
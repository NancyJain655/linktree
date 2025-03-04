import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASEURL; 

export const createLink = async (type, title, url) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/links`,
      { type, title, url },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } // Assuming you use JWT authentication
    );
    return response.data;
  } catch (error) {
    console.error("Error creating link:", error.response?.data || error.message);
    throw error;
  }
};

export const getLinks = async (token) => {
    console.log("API Request Started with Token:", token);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/links`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching links:", error);
      return [];
    }
  };

  export const deleteLink = async (id, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/links/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting link:", error);
      throw error;
    }
  };
  export const trackLinkClick = async (linkId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/analytics/${linkId}`);
      return response.data; // You can use this data if you need to handle something after the click
    } catch (error) {
      console.error('Error tracking link click:', error);
    }
  };
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASEURL; 

export const getLayout = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/layout/appearance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.appearance;
  } catch (error) {
    console.error("Error fetching layout:", error);
    return null;
  }
};
import axios from "axios";
import { base_url } from "../../utils/base-url"; // ✅ Make sure this is the correct path

const login = async (userData) => {
  try {
    const loginUrl = `${base_url}/user/admin-login`;
    console.log("Sending request to:", loginUrl);
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post(loginUrl, userData, config);
    
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    console.error("Login error details:", {
      url: `${base_url}/user/admin-login`,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
};
const authService = { login };
export default authService;



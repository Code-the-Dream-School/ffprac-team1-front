import axios from "axios";

const jwtToken = sessionStorage.getItem("jwtToken");

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${jwtToken}`
};

export const register = async ({ firstName, lastName, email, password }) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/v1/users/register`, {  
      firstName,
      lastName,
      email,
      password
    }, { headers });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/v1/users/login`, { 
      email, 
      password 
    }, { headers });
    const token = response.data.token;
    sessionStorage.setItem('jwtToken', token);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  return await axios.post(`http://localhost:8000/api/v1/users/logout`, {}, { headers }); 
}

export const fetchUserProfile = async (userId) => {  
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/profiles/${userId}`, { headers });
    return response.data.profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error.response?.data || 'Error fetching user profile';
  }
};
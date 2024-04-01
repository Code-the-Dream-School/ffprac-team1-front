import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api/v1/users';

export const register = async ({ firstName, lastName, email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      firstName,
      lastName,
      email,
      password
    });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { 
      email, 
      password 
    });
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async (setIsLoggedIn) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    setIsLoggedIn(false);
    sessionStorage.removeItem('jwtToken');
    return response.status === 200; 
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  } 
};
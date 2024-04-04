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

export const logout = async () => {
  return await axios.post(`${API_BASE_URL}/logout`)
}


export const fetchProjects = async (searchQuery, isLoggedIn) => {
  let url = 'http://localhost:8000/api/v1/projects';
  
  if (searchQuery) {
    url = `${url}?search=${encodeURIComponent(searchQuery)}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
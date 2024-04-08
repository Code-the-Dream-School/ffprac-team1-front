import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api/v1/users';

export const register = async ({ firstName, lastName, email, password }) => {
  try {
   const response = await axios.post(`${API_BASE_URL}/register`, {
    firstName,
    lastName,
    email,
    password
   }, { withCredentials: true });
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
   }, { withCredentials: true });
   return response;
  } catch (error) {
   throw error.response.data;
  }
};

export const logout = async () => {
  return await axios.post(`${API_BASE_URL}/logout`, {} , { withCredentials: true });
}

export const fetchProjects = async (search, page, limit) => {
  let url = 'http://localhost:8000/api/v1/projects';
  
  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append('search', search);
  }
  if (page) {
    queryParams.append('page', page);
  }
  if (limit) {
    queryParams.append('limit', limit);
  }

  if (queryParams.toString()) {
    url += '?' + queryParams.toString();
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { data: [], totalPages: 0 };
  }
};

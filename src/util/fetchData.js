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
  const baseUrl = 'http://localhost:8000/api/v1/projects';
  const queryParams = new URLSearchParams();

  const params = { search, page, limit };
  Object.keys(params).forEach(key => {
    if (params[key]) queryParams.append(key, params[key]);
  });

  const url = queryParams.toString() ? `${baseUrl}?${queryParams.toString()}` : baseUrl;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { data: [], totalPages: 0 };
  }
};


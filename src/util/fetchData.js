import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api/v1/users';

const API_BASE_URL_PROJECTS = 'http://localhost:8000/api/v1/projects';

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
 };

 export const createProject = async ({ title, description, rolesNeeded }) => {
  try {
   const response = await axios.post(`${API_BASE_URL_PROJECTS}r`, {
    title,
    description,
    rolesNeeded
   }, { withCredentials: true });
   return response;
  } catch (error) {
   throw error.response.data;
  }
 };
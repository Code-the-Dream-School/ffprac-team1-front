import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const register = async ({ firstName, lastName, email, password }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/register`,
      {
        firstName,
        lastName,
        email,
        password,
      },
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  return await axios.post(`${API_BASE_URL}/users/logout`, {}, { withCredentials: true });
};

export const fetchProjects = async (search, page, limit) => {
  const baseUrl = 'http://localhost:8000/api/v1/projects';
  const queryParams = new URLSearchParams();

  const params = { search, page, limit };
  Object.keys(params).forEach(key => {
    if (params[key]) queryParams.append(key, params[key]);
  });

  const url = queryParams.toString() ? `${baseUrl}?${queryParams.toString()}` : baseUrl;

  try {
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return { data: [], totalPages: 0 };
  }
};

export const likeProject = async projectId => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData.totalLikes;
    } else {
      throw new Error('Failed to like project');
    }
  } catch (error) {
    console.error('An error occurred while processing your request:', error);
    throw error;
  }
};

export const fetchProfile = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/v1/profiles/myProfile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const profileData = await response.json();
      return profileData;
    } else {
      console.error('Failed to fetch profile:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles/myProfile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProfile = async profileDetails => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/profiles/myProfile`, profileDetails, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  register,
  login,
  logout,
  fetchProjects,
  likeProject,
  fetchUserProfile,
  updateProfile,
  fetchProfile,
};

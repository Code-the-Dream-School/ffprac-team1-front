import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';
const API_BASE_URL_PROJECTS = 'http://localhost:8000/api/v1/projects';

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

export const fetchProject = async (projectId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/projects/${projectId}`, {
      withCredentials: 'include',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const fetchSearchSuggestions = async (query) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/projects/suggestions?q=${query}`);
    // console.log(response.data)
    return response.data; 
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    return [];
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

export const createProject = async ( { title, description, rolesNeeded } ) => {
  try {
   const response = await axios.post(
    `${API_BASE_URL_PROJECTS}`, 
    {
    title,
    description,
    rolesNeeded
   }, { withCredentials: true })
   return response;
  } catch (error) {
   throw error.response.data;
  }
 };

 export const updateProject = async (projectId, updatedProject) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to update project');
    }

    return true;
  } catch (error) {
    throw new Error('Failed to update project. Please try again later.');
  }
};

 export const applyForProject = async (projectId, selectedRole) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/projects/${projectId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: selectedRole }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit application');
    }

    return true;
  } catch (error) {
    throw new Error(error.message || 'Error submitting application');
  }
};

export const uploadProfileImage = async (profileId, file, isCover = false) => {
  try {
    const formData = new FormData();
    formData.append(isCover ? 'coverProfilePicture' : 'profilePicture', file);

    const response = await axios.patch(`http://localhost:8000/api/v1/profiles/myProfile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return isCover ? response.data.profileCoverPictureUrl : response.data.profilePictureUrl;
  } catch (error) {
    throw new Error('Error uploading profile image');
  }
};

export default {
  register,
  login,
  logout,
  fetchProjects,
  fetchProject,
  likeProject,
  fetchUserProfile,
  updateProfile,
  fetchProfile,
  createProject,
  updateProject,
  fetchSearchSuggestions,
  applyForProject,
  uploadProfileImage
};

import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8000/api/v1';
const API_BASE_URL = 'https://dev-connexion-g6sv.onrender.com/api/v1';

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
  const baseUrl = `${API_BASE_URL}/projects`;
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

export const fetchProject = async projectId => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`, {
      withCredentials: 'include',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const fetchSearchSuggestions = async query => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/projects/suggestions?q=${query}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    return [];
  }
};

export const likeProject = async projectId => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/like`, {
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
    const response = await fetch(`${API_BASE_URL}/profiles/myProfile`, {
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

export const createProject = async ({ title, description, rolesNeeded }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/projects`,
      {
        title,
        description,
        rolesNeeded,
      },
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProject = async (projectId, updatedProject) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
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
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/apply`, {
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

    const response = await axios.patch(
      `${API_BASE_URL}/profiles/myProfile`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      },
    );

    return isCover ? response.data.profileCoverPictureUrl : response.data.profilePictureUrl;
  } catch (error) {
    throw new Error('Error uploading profile image');
  }
};

export const uploadProjectImage = async (projectId, file, isCover = false) => {
  try {
    const formData = new FormData();
    formData.append(isCover ? 'coverProjectPicture' : 'projectPicture', file);

    const response = await axios.patch(
      `${API_BASE_URL}/projects/${projectId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      },
    );

    return isCover ? response.data.projectCoverPictureUrl : response.data.projectPictureUrl;
  } catch (error) {
    throw new Error('Error uploading project image');
  }
};

export const fetchParticipantsData = async project => {
  try {
    if (!project || !project.participants) return [];
    const participantsRequests = project.participants.map(async participant => {
      const response = await axios.get(
        `${API_BASE_URL}/profiles/${participant.user}`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: 'include',
        },
      );
      return response.data.profile;
    });

    const participantsData = await Promise.all(participantsRequests);
    return participantsData;
  } catch (error) {
    console.error('Error fetching participants data:', error);
    return [];
  }
};

export const fetchCreatorData = async (
  isLoggedIn,
  project,
  setCreatorFirstName,
  setCreatorLastName,
  setCreatorProfilePictureUrl,
) => {
  try {
    if (!isLoggedIn || !project || !project.project || !project.project.createdBy) return;
    const response = await axios.get(
      `${API_BASE_URL}/profiles/${project.project.createdBy}`,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    );
    setCreatorFirstName(response.data.profile.firstName);
    setCreatorLastName(response.data.profile.lastName);
    setCreatorProfilePictureUrl(response.data.profile.profilePictureUrl);
  } catch (error) {
    console.error('Error updating project:', error.response ? error.response.data : error.message);
  }
};

export const removeParticipant = async (
  projectId,
  participantId,
  setParticipantsData,
  participantsData,
) => {
  try {
    await axios.delete(
      `${API_BASE_URL}/projects/${projectId}/participants/${participantId}`,
      {
        withCredentials: true,
      },
    );
    setParticipantsData(participantsData.filter(participant => participant._id !== participantId));
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchApplicantsData = async (ownProjects, setApplicantsData, setLoading) => {
  if (!ownProjects || ownProjects.length === 0) {
    setLoading(false);
    return;
  }

  setLoading(true);

  try {
    const applicantsRequests = ownProjects.flatMap(project =>
      project.applicants.map(applicant =>
        axios
          .get(`${API_BASE_URL}/profiles/${applicant.user}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, 
          })
          .then(response => ({
            ...response.data.profile,
            projectId: project._id,
            userId: applicant.user,
          }))
          .catch(error => {
            console.error(`Error fetching applicant ${applicant.user}:`, error);
            return null; 
          })
      )
    );

    const applicantsDataArray = await Promise.all(applicantsRequests);
    const validApplicantsData = applicantsDataArray.filter(data => data !== null);

    const applicantsData = validApplicantsData.reduce((acc, data) => {
      acc[data.userId] = data;
      return acc;
    }, {});

    setApplicantsData(applicantsData);
  } catch (error) {
    console.error('Error fetching applicants data:', error);
  } finally {
    setLoading(false);
  }
};

export const approveApplicant = async (
  projectId,
  applicantId,
  ownProjects,
  applicantsData,
  setSuccessMessage,
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/projects/${projectId}/approve/${applicantId}`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: 'include',
      },
    );
    const projectName = ownProjects.find(project => project._id === projectId)?.title;
    const applicant = applicantsData[applicantId];
    const applicantName = applicant ? `${applicant.firstName} ${applicant.lastName}` : '';
    setSuccessMessage(`Applicant successfully added to the project "${projectName}".`);
  } catch (error) {
    console.error('Error approving applicant:', error);
    if (error.response) {
      console.error('Server response:', error.response.data);
    }
  }
};

export const declineApplicant = async (
  projectId,
  applicantId,
  ownProjects,
  applicantsData,
  setDeclineMessage,
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/projects/${projectId}/reject/${applicantId}`,
      {},
      {
        withCredentials: 'include',
      },
    );
    const projectName = ownProjects.find(project => project._id === projectId)?.title;
    const applicant = applicantsData[applicantId];
    const applicantName = applicant ? `${applicant.firstName} ${applicant.lastName}` : '';
    setDeclineMessage(`Applicant has been successfully declined for the project "${projectName}".`);
  } catch (error) {
    console.error('Error declining applicant:', error);
    if (error.response) {
      console.error('Server response:', error.response.data);
    }
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
  uploadProfileImage,
  uploadProjectImage,
  fetchParticipantsData,
  fetchCreatorData,
  removeParticipant,
  fetchApplicantsData,
  approveApplicant,
  declineApplicant,
};

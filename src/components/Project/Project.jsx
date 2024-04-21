import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Modal from '../Modal_Components/Modal.jsx';
import UploadImage from '../Modal_Components/UploadImages.jsx';
import { IconButton } from '@material-tailwind/react';
import { Avatar, Tooltip } from '@material-tailwind/react';
import { useAuth } from '../../AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { likeProject } from '../../util/fetchData.js';
import EditProject from '../Modal_Components/EditProject.jsx';
import EditIcon from '../Modal_Components/EditIcon.jsx';
import Apply from '../Modal_Components/Apply.jsx';
import { fetchUserProfile, fetchProject } from '../../util/fetchData';

const Project = () => {
  const { isLoggedIn } = useAuth();
  const [project, setProject] = useState();
  const [profile, setProfile] = useState();
  const { projectId } = useParams();
  const [likes, setLikes] = useState();
  const [participantsData, setParticipantsData] = useState([]);
  const [creatorFirstName, setCreatorFirstName] = useState('');
  const [creatorLastName, setCreatorLastName] = useState('');
  const [creatorProfilePictureUrl, setCreatorProfilePictureUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await fetchProject(projectId);
        setProject(projectData);
        setLikes(projectData.project.likeCount);
      } catch (error) {
        console.error('Error in component:', error);
      }
    };

    fetchData();
  }, [projectId]);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        if (!isLoggedIn) return;
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('The profile is unavailable. Try again later please');
      }
    };

    fetchUserProfileData();
  }, []);

  useEffect(() => {
    const fetchParticipantsData = async () => {
      try {
        if (!project || !project.project.participants) return;
        const participantsRequests = project.project.participants.map(async participant => {
          const response = await axios.get(
            `http://localhost:8000/api/v1/profiles/${participant.user}`,
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: 'include',
            },
          );
          return response.data.profile;
        });

        const participantsData = await Promise.all(participantsRequests);
        setParticipantsData(participantsData);
      } catch (error) {
        console.error('Error fetching participants data:', error);
      }
    };

    fetchParticipantsData();
  }, [project]);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        if (!isLoggedIn || !project || !project.project || !project.project.createdBy) return;
        const response = await axios.get(
          `http://localhost:8000/api/v1/profiles/${project.project.createdBy}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        );
        setCreatorFirstName(response.data.profile.firstName);
        setCreatorLastName(response.data.profile.lastName);
        setCreatorProfilePictureUrl(response.data.profile.profilePictureUrl);
      } catch (error) {
        console.error(
          'Error updating project:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    if (isLoggedIn && project) {
      fetchCreator();
    }
  }, [isLoggedIn, project]);

  const imageButton = () => {
    return (
      <Tooltip content="Upload Image" className="bg-blue/10" placement="right-end">
        <img
          size="sm"
          variant="circular"
          alt="project logo"
          src={project.project.projectPictureUrl}
          className="border-4 border-blue/50 h-36 w-36 rounded-full bject-cover object-center hover:cursor-pointer hover:border-green"
        />
      </Tooltip>
    );
  };

  const coverImageButton = () => {
    return (
      <Tooltip content="Upload Image" className="bg-blue/10" placement="right-end">
        <div className="w-full">
          <img
            src={project.project.projectCoverPictureUrl}
            alt="project img"
            className="object-cover  w-[100vw] h-64  rounded-t-2xl  object-center hover:cursor-pointer hover:opacity-80"
          />
        </div>
      </Tooltip>
    );
  };

  const handleLikeClick = async () => {
    try {
      const newLikes = await likeProject(projectId);
      setLikes(newLikes);
    } catch (error) {
      console.error('An error occurred while processing your request:', error);
    }
  };

  const handleLoginPrompt = () => {
    alert('Please register or sign in to perform this action.');
  };

  const renderProjectTechnologies = technologies => {
    if (!technologies) return null;
    const allTech = Object.values(technologies).flat();
    return (
      <div>
        {allTech.map(tech => (
          <li key={uuidv4()}>• {tech}</li>
        ))}
      </div>
    );
  };

  const renderParticipants = () => {
    return participantsData.map((participant, index) => {
      const role = project.project.rolesNeeded[index];
      return (
        <div key={index} className="py-4 flex flex-row">
          <Tooltip content={`${participant.firstName} ${participant.lastName}`}>
            <Avatar
              size="sm"
              variant="circular"
              alt={`${participant.firstName} ${participant.lastName}`}
              src={participant.profilePictureUrl}
              className="border-2 border-gray h-10 w-10 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
            />
          </Tooltip>
          <div className="pl-4">
            <header>{`${participant.firstName} ${participant.lastName}`}</header>
            <p className="font-sans font-extralight italic text-[11px] text-blue">{role}</p>
          </div>
        </div>
      );
    });
  };

  const handleModalClose = () => {
    window.location.reload();
  };
  
  return (
    <div className="container-primary xl:px-60 flex flex-col text-gray">
      {project && (
        <>
          <Modal
            buttonClassName={''}
            openModalButton={coverImageButton()}
            modalBody={
              <UploadImage
                projectId={projectId}
                isCoverImage={true}
                closeModal={handleModalClose}
              />
            }
          />
          <div className="py-10">
            <div className="flex flex-row">
              <div className="flex flex-col w-1/2">
                <div className="text-2xl font-medium pb-4 pl-4">{project.project.title}</div>
                <Modal
                  buttonClassName={'pl-4'}
                  openModalButton={imageButton()}
                  modalBody={
                    <UploadImage
                      projectId={projectId}
                      isCoverImage={false}
                      closeModal={handleModalClose}
                    />
                  }
                />
              </div>
              <div className="flex flex-col w-1/2 items-end">
                <div className="flex items-center justify-between mt-7 sm:mr-8 md:mr-4">
                  <h2 className="text-[20px] font-semibold text-right text-blue">
                    Project Status:
                    <p className="font-sans text-[15px] font-medium pb-3">
                      {project.project.status}
                    </p>
                  </h2>
                </div>
                <div className="pt-2 sm:mr-8 md:mr-4">
                  {isLoggedIn ? (
                    <IconButton
                      variant="outlined"
                      className="text-blue rounded-lg bg-blue mr-2"
                      onClick={handleLikeClick}
                    >
                      <i className="fas fa-heart fa-xl text-black" />
                      <p className="text-black">{likes}</p>
                    </IconButton>
                  ) : (
                    <IconButton
                      variant="outlined"
                      className=" rounded-lg bg-blue mr-4 text-black"
                      onClick={handleLoginPrompt}
                    >
                      <i className="fas fa-heart fa-xl" />
                      <p className="text-black">{likes}</p>
                    </IconButton>
                  )}
                </div>
                <div className="pt-6 pr-2 sm:mr-8 md:mr-4"></div>
                {isLoggedIn &&
                  profile &&
                  profile.profile &&
                  profile.profile._id === project.project.createdBy && (
                    <div>
                      <Modal
                        openModalButton={<EditIcon openModalButtonText={'Edit Project'} />}
                        modalBody={
                          <EditProject
                            projectId={projectId}
                            projectTitle={project.project.title}
                            projectDesc={project.project.description}
                            projectRolesNeeded={project.project.rolesNeeded}
                            closeModal={handleModalClose}
                          />
                        }
                      />
                    </div>
                  )}
              </div>
            </div>
            <div className="my-10">
              <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
                <header className="pb-3 text-xl text-blue ">About the project:</header>
                <p className="font-sans font-extralight text-sm">{project.project.description}</p>
              </div>
              <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
                <h3 className="text-lg text-green/80">Technologies:</h3>
                <ul>{renderProjectTechnologies(project.project.technologies)}</ul>
                {project.project.status !== 'In Progress' &&
                  project.project.status !== 'Completed' && (
                    <div>
                      <h3 className="pt-4 text-lg text-green/80 pb-2">Roles Needed:</h3>
                      {project.project.rolesNeeded.map((role, index) => (
                        <div key={index}>
                          <p className="pl-2"> {role}</p>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
              {isLoggedIn && (
                <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
                  <h3 className="text-lg text-green/80">Project Creator:</h3>
                  {profile &&
                  profile.profile &&
                  profile.profile._id === project.project.createdBy ? (
                    <div className="py-4 flex flex-row">
                      <Tooltip content={`${profile.profile.firstName} ${profile.profile.lastName}`}>
                        <Avatar
                          size="sm"
                          variant="circular"
                          alt="{profile.profile._id}"
                          src={profile.profile.profilePictureUrl}
                          className="border-2 border-gray h-12 w-12 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                        />
                      </Tooltip>
                      <div className="pl-4">
                        <header>
                          {profile && profile.profile._id === project.project.createdBy
                            ? `${profile.profile.firstName} ${profile.profile.lastName}`
                            : `${creatorFirstName} ${creatorLastName}`}
                        </header>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 flex flex-row">
                      <Tooltip content="User">
                        <Avatar
                          size="sm"
                          variant="circular"
                          alt="User"
                          src={creatorProfilePictureUrl}
                          className="border-2 border-gray h-12 w-12 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                        />
                      </Tooltip>
                      <div className="pl-4">
                        <header>
                          {profile && profile.profile._id === project.project.createdBy
                            ? `${profile.profile.firstName} ${profile.profile.lastName}`
                            : `${creatorFirstName} ${creatorLastName}`}
                        </header>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {isLoggedIn && (
                <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
                  <h3 className="text-lg text-green/80">Team:</h3>
                  <div className="py-4 flex flex-row">
                    {project.project.participants && project.project.participants.length > 0 ? (
                      <div className="pl-4">
                        <header>{renderParticipants()}</header>
                      </div>
                    ) : (
                      <p>No team members yet.</p>
                    )}
                  </div>
                </div>
              )}
              {isLoggedIn &&
                project.project.status !== 'In Progress' &&
                project.project.status !== 'Completed' && (
                  <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5 flex flex-col items-center">
                    <Modal
                      openModalButton={'Apply'}
                      buttonClassName={'btn-primary font-[Jura] min-w-44'}
                      modalBody={
                        <Apply
                          projectId={projectId}
                          projectTitle={project.project.title}
                          projectRolesNeeded={project.project.rolesNeeded}
                          closeModal={handleModalClose}
                        />
                      }
                    />
                  </div>
                )}

              {!isLoggedIn && (
                <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5 flex flex-col items-center ">
                  <p className="text-center">
                    <em>
                      To see more details about this project or to{' '}
                      <strong>
                        <Link to="/register">Sign Up</Link>
                      </strong>
                    </em>
                  </p>
                  <Link to="/register" className="btn-primary w-32 mt-4 text-center">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Project;

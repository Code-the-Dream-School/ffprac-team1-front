import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import { Avatar, Tooltip } from '@material-tailwind/react';
import Modal from '../Modal_Components/Modal.jsx';
import UploadImage from '../Modal_Components/UploadImages.jsx';
import { useAuth } from '../../AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { likeProject } from '../../util/fetchData.js';
import EditProject from '../Modal_Components/EditProject.jsx';
import EditIcon from '../Modal_Components/EditIcon.jsx';
import axios from 'axios';
import Apply from '../Modal_Components/Apply.jsx';

const Project = () => {
  const { isLoggedIn } = useAuth();
  const {
    state: {
      projectId,
      projectTitle,
      projectDesc,
      projectStatus,
      projectTechnologies,
      projectRolesNeeded,
      projectLikes,
      projectCreator,
      projectImage,
      projectCoverImage,
      projectParticipants,
      participateInProject,
      profile,
    },
  } = useLocation();
  

  const [likes, setLikes] = useState(projectLikes);
  const [creatorFirstName, setCreatorFirstName] = useState('');
  const [creatorLastName, setCreatorLastName] = useState('');
  const [projectPictureUrl, setProjectPictureUrl] = useState('');
  const [projectCoverPictureUrl, setProjectCoverPictureUrl] = useState('');
  const [participantsData, setParticipantsData] = useState([]);

  const handleLikeClick = async () => {
    try {
      const newLikes = await likeProject(projectId);
      setLikes(newLikes);
    } catch (error) {
      console.error('An error occurred while processing your request:', error);
    }
  };


  useEffect(() => {
    const fetchCreator = async () => {
      try {
        if (!isLoggedIn) return;
        const response = await axios.get(
          `http://localhost:8000/api/v1/profiles/${projectCreator}`,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: 'include',
          },
        );

        setCreatorFirstName(response.data.profile.firstName);
        setCreatorLastName(response.data.profile.lastName);
        if (response.status === 200) {
        }
      } catch (error) {
        console.error(
          'Error updating project:',
          error.response ? error.response.data : error.message,
        );
      }
    };
    if (isLoggedIn) {
      fetchCreator();
    }
  }, [isLoggedIn, projectCreator]);

  useEffect(() => {
    const fetchParticipantsData = async () => {
      try {
        if (!projectParticipants) return; // Проверяем, существует ли projectParticipants
        const participantsRequests = projectParticipants.map(async participant => {
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
  }, [projectParticipants]);

  useEffect(() => {
    const fetchProjectPicture = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/projects/${projectId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: 'include',
        });
        setProjectPictureUrl(response.data.project.projectPictureUrl);
        setProjectCoverPictureUrl(response.data.project.projectCoverPictureUrl);
      } catch (error) {
        console.error(
          'Error fetching project picture:',
          error.response ? error.response.data : error.message,
        );
      }
    };
    fetchProjectPicture();
  }, [projectId]);

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
      const role = projectRolesNeeded[index];
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

  const imageButton = () => {
    return (
      <Tooltip content="Upload Image" className="bg-blue/10" placement="right-end">
        <img
          size="sm"
          variant="circular"
          alt="project logo"
          src={projectImage}
          className="border-4 border-blue/50 h-36 w-36 rounded-full bject-cover object-center hover:cursor-pointer hover:border-green"
        />
      </Tooltip>
    );
  };

  const coverImageButton = () => {
    return (
      <Tooltip content="Upload Image" className="bg-blue/10" placement="right-end">
        <div  className="w-full">
          <img
            src={projectCoverImage}
            alt="project img"
            className="object-cover  w-[100vw] h-64  rounded-t-2xl  object-center hover:cursor-pointer hover:opacity-80"
          />
        </div>
      </Tooltip>
    );
  };

  return (
    <div className="contanier-primary xl:px-60 flex flex-col text-gray">
      <Modal
        buttonClassName={''}
        openModalButton={coverImageButton()}
        modalBody={<UploadImage projectId={projectId} isCoverImage={true} />}
      />{' '}
      <div className="py-10">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <div className="text-2xl font-medium pb-4 pl-4">{projectTitle} </div>
            <Modal
              buttonClassName={'pl-4'}
              openModalButton={imageButton()}
              modalBody={<UploadImage projectId={projectId} isCoverImage={false} />}
            />{' '}
          </div>
          <div className="flex flex-col w-1/2 items-end">
            <div className="flex items-center justify-between mt-7 sm:mr-8 md:mr-4">
              <h2 className="text-[20px] font-semibold text-right text-blue">
                Project Status:
                <p className="font-sans text-[15px] font-medium pb-3">{projectStatus}</p>
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
              {/* <IconButton variant="outlined" className="text-blue rounded-lg bg-blue">
              <i className="fas fa-thumbs-up fa-xl text-black" />
            </IconButton> */}
            </div>
            <div className="pt-6 pr-2 sm:mr-8 md:mr-4">
              {isLoggedIn && profile.profile._id === projectCreator && (
                  <div>
                    <Modal
                      openModalButton={<EditIcon openModalButtonText={"Edit Project"} />}
                      modalBody={
                        <EditProject
                          projectId={projectId}
                          projectTitle={projectTitle}
                          projectDesc={projectDesc}
                          projectRolesNeeded={projectRolesNeeded}
                        />
                      }
                    />
                  </div>
                )}
              </div>
          </div>
        </div>
        {/* <hr className="my-3 text-grey/80"></hr> */}
        <div className="my-10">
          <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
            <header className="pb-3 text-xl text-blue ">About the project:</header>
            <p className="font-sans font-extralight text-sm">{projectDesc}</p>
          </div>
          <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
            <h3 className="text-lg text-green/80">Technologies and languages:</h3>
            <ul>{renderProjectTechnologies(projectTechnologies)}</ul>
            {projectStatus !== 'In Progress' && projectStatus !== 'Completed' && (
              <div>
                <h3 className="pt-4 text-lg text-green/80 pb-2">Roles Needed:</h3>
                {/* <p>{projectRolesNeeded.join(', ')}</p> */}
                { projectRolesNeeded.map((role, index) => (
                  <div key={ index }> 
                    <p className="pl-2"> { role }</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {isLoggedIn ? (
            <>
              <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
                <h3 className="text-lg text-green/80">Project Creator:</h3>
                <div className="py-4 flex flex-row">
                  {profile && profile.profile._id === projectCreator ? (
                    <Tooltip content={`${profile.profile.firstName} ${profile.profile.lastName}`}>
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt="{profile.profile._id}"
                        src={profile.profile.profilePictureUrl}
                        className="border-2 border-gray h-12 w-12 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip content="User">
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt="User"
                        src="{participant.profilePictureUrl}"
                        className="border-2 border-gray h-12 w-12 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                      />
                    </Tooltip>
                  )}
                  <div className="pl-4">
                    <header>
                      {profile && profile.profile._id === projectCreator
                        ? `${profile.profile.firstName} ${profile.profile.lastName}`
                        : `${creatorFirstName} ${creatorLastName}`}
                    </header>
                  </div>
                </div>
              </div>
              <div className="my-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
                <h3 className="text-lg text-green/80">Team:</h3>
                <div className="py-4 flex flex-row">
                  {projectParticipants && projectParticipants.length > 0 ? (
                    <div className="pl-4">
                      <header>{renderParticipants()}</header>
                    </div>
                  ) : (
                    <p>No team members yet.</p>
                  )}
                </div>
              </div>
              {isLoggedIn && profile.profile._id !== projectCreator && (
                <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5 flex flex-col items-center">
                  {' '}
                  <Modal
                    openModalButton="Apply"
                    modalBody={
                      <Apply
                        projectId={projectId}
                        projectTitle={projectTitle}
                        projectRolesNeeded={projectRolesNeeded}
                      />
                    }
                  />
                </div>
              )}
            </>
          ) : (
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
    </div>
  );
};
export default Project;

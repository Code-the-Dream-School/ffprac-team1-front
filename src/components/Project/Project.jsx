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
      profile,
    },
  } = useLocation();
  const [likes, setLikes] = useState(projectLikes);
  const [creatorFirstName, setCreatorFirstName] = useState('');
  const [creatorLastName, setCreatorLastName] = useState('');
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
  const imageButton = () => {
    return (
      <Tooltip content="Upload Image" className="bg-blue/10" placement="right-end">
        <img
          size="sm"
          variant="circular"
          alt="tania andrew"
          src="https://source.unsplash.com/a-rubik-cube-is-shown-on-a-white-background-fd6K_OFlnRA"
          className="border-4 border-transparent h-36 w-36 rounded-full bject-cover object-center hover:cursor-pointer hover:border-green"
        />
      </Tooltip>
    );
  };
  return (
    <div className="contanier-primary px-64 flex flex-col text-gray">
      <img
        src="https://source.unsplash.com/white-and-gray-optical-illusion-7JX0-bfiuxQ"
        alt="project img"
        className="max-h-60 object-cover object-center"
      />
      <div className="p-10">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <div className="text-2xl font-medium pb-4">{projectTitle} </div>
            <Modal
              buttonClassName={''}
              openModalButton={imageButton()}
              modalBody={<UploadImage projectId={projectId} />}
            />{' '}
          </div>
          <div className="flex flex-col w-1/2 items-end">
            <div className="flex items-center justify-between mt-7">
              <h2 className="text-[20px] font-semibold text-right text-blue mr-2">
                Project Status:
                <p className="font-sans text-[15px] font-medium pb-3">{projectStatus}</p>
              </h2>
              {isLoggedIn && profile.profile._id === projectCreator && (
                <div>
                  <Modal
                    openModalButton={<EditIcon />}
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
            <div className="pt-2">
              {isLoggedIn ? (
                <IconButton
                  variant="outlined"
                  className="text-blue rounded-lg bg-blue mr-4"
                  onClick={handleLikeClick}
                >
                  <i className="fas fa-heart fa-xl text-black" />
                  {likes}
                </IconButton>
              ) : (
                <IconButton
                  variant="outlined"
                  className="text-blue rounded-lg bg-blue mr-4"
                  onClick={handleLoginPrompt}
                >
                  <i className="fas fa-heart fa-xl text-black" />
                  {likes}
                </IconButton>
              )}
              {/* <IconButton variant="outlined" className="text-blue rounded-lg bg-blue">
              <i className="fas fa-thumbs-up fa-xl text-black" />
            </IconButton> */}
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
                <h3 className="pt-4 text-lg text-green/80">Roles Needed:</h3>
                <p>{projectRolesNeeded.join(', ')}</p>
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
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="border-2 border-gray h-12 w-12 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip content="User">
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt="User"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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
                    <p className="font-sans font-extralight italic text-[11px] text-blue">
                      {' '}
                      Project Manager
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
                <h3 className="text-lg text-green/80">Team:</h3>
                <div className="py-4 flex flex-row">
                  <Tooltip content="Tania Andrew">
                    <Avatar
                      size="sm"
                      variant="circular"
                      alt="tania andrew"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      className="border-2 border-gray h-10 w-10 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                    />
                  </Tooltip>
                  <div className="pl-4">
                    <header>Tania Andrew</header>
                    <p className="font-sans font-extralight italic text-[11px] text-blue">
                      {' '}
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                <div className="py-4 flex flex-row">
                  <Tooltip content="Tania Andrew">
                    <Avatar
                      size="sm"
                      variant="circular"
                      alt="tania andrew"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      className="border-2 border-gray h-10 w-10 rounded-full hover:z-10 hover:border-green hover:cursor-pointer"
                    />
                  </Tooltip>
                  <div className="pl-4">
                    <header>Tania Andrew</header>
                    <p className="font-sans font-extralight italic text-[11px] text-blue">
                      {' '}
                      Designer
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5 flex flex-col items-center">
                <Link to="/apply" className="btn-primary w-32 mt-4 text-center">
                  Apply
                </Link>
              </div>
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

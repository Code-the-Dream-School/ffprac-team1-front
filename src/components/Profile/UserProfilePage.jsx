import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProfile } from '../Profile/ProfileContext';
import { fetchUserProfile } from '../../util/fetchData';
import ProjectCard from '../Project/ProjectCard';
import Modal from '../Modal_Components/Modal';
import CreateProject from '../Modal_Components/CreateProject';
import EditIcon from '../Modal_Components/EditIcon';

const UserProfilePage = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileData = await fetchUserProfile(userId);
        console.log('User Profile Data:', userProfileData);
        updateProfile(userProfileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    if (userId) {
      fetchData();
    }
  }, [userId, updateProfile]);

  console.log('Profile State:', profile);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="container-primary px-64 flex flex-col text-gray">
      <div className="flex flex-col w-full border border-transparent rounded-lg bg-gray/5">
        <img
          src="https://source.unsplash.com/white-and-gray-optical-illusion-7JX0-bfiuxQ"
          alt="project img"
          className="max-h-60 object-cover object-center border rounded-t-lg"
        />
        <div className="px-8 pb-8">
          <img
            size="sm"
            variant="circular"
            alt="tania andrew"
            src="https://source.unsplash.com/a-rubik-cube-is-shown-on-a-white-background-fd6K_OFlnRA"
            className="border-[5px] border-white h-36 w-36 rounded-full object-cover object-center -mt-24"
          />
          <div className="flex flex-row pt-4">
            <div className="flex flex-col w-1/2">
              {profile ? ( // Render user info
                <>
                  <div className="text-2xl font-bold pb-1">{profile.firstName + ' ' + profile.lastName}</div>
                </>
              ) : (
                <div className="text-1xl font-bold pb-1">No user data available.</div>
              )}
            </div>
            <div className="flex flex-col w-1/2 items-end">
              <Modal
                buttonClassName={''}
                openModalButton={EditIcon()}
                modalBody={''}
                onClick={handleOpenEditModal}
              />
            </div>
          </div>
        </div>
      </div>

      {/* About, Offer, Links sections */}
      <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
        <header className="pb-3 text-xl text-green/85">About:</header>
        <p className="font-sans font-extralight text-sm">{profile ? profile.about : 'No profile data'}</p>
      </div>
      <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
        <header className="pb-3 text-xl text-green/85">What can I bring to the table:</header>
        <p className="font-sans font-extralight text-sm">{profile ? profile.offer : 'No profile data'}</p>
      </div>
      <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
        <h3 className="text-lg text-green/80">Links:</h3>
        {profile &&
          Object.keys(profile.links).map((item, index) => (
            <li key={index} className="font-sans font-extralight text-[14px]">
              {item + ', '}
            </li>
          ))}
      </div>

      {/* User's Projects part */}
      <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
        <div className="flex flex-row w-full justify-between">
          <h3 className="text-lg text-green/80">Your Projects:</h3>
          <div>
            <Modal
              openModalButton={'+ Add New Project'}
              buttonClassName={'btn-primary font-[Jura] min-w-44'}
              modalBody={CreateProject()}
              className=""
            />
          </div>
        </div>
        <div className="py-4 flex flex-row">
          {profile &&
            profile.projects &&
            profile.projects.length > 0 ? (
              profile.projects.map(project => <ProjectCard key={project._id} project={project} />)
            ) : (
              <p className="font-sans font-extralight text-sm">{ 'No projects available'}</p>
            )}
        </div>
      </div>

      {/* Projects the user involved in */}
      <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
        <h3 className="text-lg text-green/80">Projects you are involved in:</h3>
        <div className="py-4 flex flex-row">
          {profile ? (

            <p>Content related to projects the user involved in.</p>
          ) : (
            <p className="font-sans font-extralight text-sm">{ 'No profile data'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

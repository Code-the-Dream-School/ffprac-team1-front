import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@material-tailwind/react';
import ProjectCard from '../Project/ProjectCard.jsx';
import Modal from '../Modal_Components/Modal.jsx';
import CreateProject from '../Modal_Components/CreateProject.jsx';
import EditIcon from '../Modal_Components/EditIcon.jsx';
import EditProfile from '../Profile/EditProfile.jsx';
import { fetchUserProfile, fetchProject } from '../../util/fetchData';
import Slider from 'react-slick';
import UploadProfileImage from '../Modal_Components/UploadProfileImages.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [profileCoverPictureUrl, setProfileCoverPictureUrl] = useState('');
  const [participatingProjectsList, setParticipatingProjectsList] = useState(null);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  const [coruselItems, setCoruselItems] = useState();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    if (screenSize.width > 1700) {
      setCoruselItems(5);
    }
    if (screenSize.width < 1700) {
      setCoruselItems(4);
    }
    if (screenSize.width < 1480) {
      setCoruselItems(3);
    }
    if (screenSize.width < 950) {
      setCoruselItems(2);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenSize]);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
        setError('');
        setProfilePictureUrl(userProfile.profilePictureUrl);
        setProfileCoverPictureUrl(userProfile.profileCoverPictureUrl);

        let participatingProjectsData = [];

        if (
          userProfile.profile.participatingProjects &&
          userProfile.profile.participatingProjects.length > 0
        ) {
          for (const participatingProject of userProfile.profile.participatingProjects) {
            // console.log('Fetching project:', participatingProject.project);
            const project = await fetchProject(participatingProject.project);
            // console.log('Fetched project:', project.project.title);
            participatingProjectsData.push({
              title: project.project.title,
              role: participatingProject.role,
            });
          }
          setParticipatingProjectsList(participatingProjectsData);
        } else {
          setParticipatingProjectsList([{ title: 'No participating projects found.', role: '' }]);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('The profile is unavailable. Try again later please');
      }
    };

    fetchUserProfileData();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const updatedProfile = await fetchUserProfile();
      setProfile(updatedProfile);
      setSuccess('Profile successfully updated.');
      setError('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('We could not update your profile. Try again later please.');
      setSuccess('');
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: coruselItems,
    slidesToScroll: 1,
  };

  const handleModalClose = () => {
    window.location.reload();
  };

  const imageButton = () => {
    return (
      <Tooltip content="Upload Image" className="bg-blue/10" placement="right-end">
        <img
          size="sm"
          variant="circular"
          alt="profile picture"
          src={profile.profile.profilePictureUrl}
          className="border-4 border-transparent h-36 w-36 rounded-full bject-cover object-center hover:cursor-pointer hover:border-green hover:opacity-80"
        />
      </Tooltip>
    );
  };

  const coverImageButton = () => {
    return (
      <Tooltip content="Upload Image" className="bg-blue/10" placement="right-end">
        <div className="w-full">
          <img
            src={profile.profile.profileCoverPictureUrl}
            alt="profile cover picture "
            className="object-cover h-64  w-[100vw] border-1 border-transparent rounded-t-2xl  object-center hover:cursor-pointer hover:opacity-80"
          />
          {/* <div className="absolute inset-0 pt-100 bg-transparent object-cover h-64  w-[100vw] border-1 border-transparent rounded-t-2xl  object-center
            hover:bg-black/30"></div> */}
        </div>
      </Tooltip>
    );
  };

  return (
    <div className="contanier-primary flex flex-col text-gray xl:px-60 pb-10">
      <div className="flex flex-col w-full border border-transparent rounded-lg bg-gray/5">
        <Modal
          buttonClassName={''}
          openModalButton={coverImageButton()}
          modalBody={<UploadProfileImage profileId={profile.profile._id} isCoverImage={true} />}
        />{' '}
        <div className="px-8 pb-4 pt-4 w-[100vw]">
          <Modal
            buttonClassName={''}
            openModalButton={imageButton()}
            modalBody={<UploadProfileImage profileId={profile.profile._id} isCoverImage={false} />}
          />{' '}
          <div className="flex flex-row w-[100vw] pt-4">
            <div className="flex flex-col w-full">
              <div className="text-2xl font-bold  pb-1">
                {profile.profile.firstName + ' ' + profile.profile.lastName}{' '}
              </div>
              {/* <div className="font-sans font-extralight text-sm text-blue italic pb-2">{profile.profile.title} </div> */}
              <div className="w-full mt-2">
                <Modal
                  buttonClassName={''}
                  openModalButton={<EditIcon openModalButtonText={'Edit Profile'} />}
                  modalBody={
                    <EditProfile
                      profileData={profile}
                      onSave={handleProfileUpdate}
                      closeModal={handleModalClose}
                    />
                  }
                />
                {/* <div className="font-sans font-extralight text-xs italic pb-2 pr-2">
                Looking for:{' '}
              </div>
              <div className="flex flex-row items-end">
                <div className="font-sans font-extralight text-[13px] p-0.5 px-4 ml-2 border rounded-full text-green/80">
                  {profile.profile.lookingFor[0]}{' '}
                </div>
                <div className="font-sans font-extralight text-[13px] p-0.5 px-4 ml-2 border rounded-full text-green/80">
                  {profile.profile.lookingFor[1]}{' '}
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
          <header className="pb-3 text-xl text-green/85">About:</header>
          <p className="font-sans font-extralight text-sm">{profile.profile.about}</p>
        </div>
        <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
          <header className="pb-3 text-xl text-green/85">What can I bring to the table:</header>
          <p className="font-sans font-extralight text-sm">{profile.profile.offer}</p>
        </div>
        <div className="my-4 p-8 border border-transparent rounded-lg bg-gray/5">
          <h3 className="text-lg text-green/80">Contacts:</h3>
          {profile.profile.contacts.linkedIn && (
            <p>
              LinkedIn:{' '}
              <a href={profile.profile.contacts.linkedIn}>{profile.profile.contacts.linkedIn}</a>
            </p>
          )}
          {profile.profile.contacts.github && (
            <p>
              GitHub:{' '}
              <a href={profile.profile.contacts.github}>{profile.profile.contacts.github}</a>
            </p>
          )}
          {profile.profile.contacts.portfolioWebsite && (
            <p>
              Portfolio Website:{' '}
              <a href={profile.profile.contacts.portfolioWebsite}>
                {profile.profile.contacts.portfolioWebsite}
              </a>
            </p>
          )}
        </div>
        <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
          <div className="flex flex-row w-full justify-between">
            <h3 className="text-lg text-green/80">Your Projects:</h3>
            <div>
              <Modal
                openModalButton={'+ Add New Project'}
                buttonClassName={'btn-primary font-[Jura] min-w-44'}
                modalBody={<CreateProject />}
                className=""
              />
            </div>
          </div>
          <div className="mt-4">
            <Slider {...settings} {...(settings.slideshow = 1)}>
              {profile.profile.ownProjects.map((project, index) => (
                <div key={index} className="flex justify-center">
                  <div className="mx-6">
                    <ProjectCard
                      project={{
                        _id: project._id,
                        title: project.title,
                        status: project.status,
                        description: project.description,
                        technologies: project.technologies,
                        rolesNeeded: project.rolesNeeded,
                        createdBy: profile.profile._id,
                        projectPictureUrl: project.projectPictureUrl,
                        projectCoverPictureUrl: project.projectCoverPictureUrl,
                        participants: project.participants,
                        likeCount: project.likeCount,
                      }}
                      profile={profile}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* <div className="py-4 flex flex-row">
            < ProjectCard /> */}
          {/* <div className="max-w-[13rem] min-w-[12rem] overflow-hidden bg-gray/10 rounded-xl border border-transparent hover:border-blue/30 mb-6 mr-8 p-4">
            <i className="fa-sharp fa-thin fa-plus fa-2xl text-blue/40 rounded-xl border border-blue/40 hover:border-gray px-3 py-5"></i>
            </div> */}
        </div>
      </div>
      <div className="mt-4 mb-1 py-4 px-8 border border-transparent rounded-lg bg-gray/5">
        <h3 className="text-lg text-green/80">Projects you participate in:</h3>

        <div className="py-4 flex flex-row"></div>
        <div className="mx-6">
          {participatingProjectsList &&
            participatingProjectsList.map((project, index) => (
              <div key={index} className="flex justify-center">
               - {project.title} - {project.role} 
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Profile;

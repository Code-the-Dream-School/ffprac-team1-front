import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../util/fetchData';

const EditProfile = ({ profileData, onSave }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    about: '',
    offer: '',
    links: '',
    ownProjects: '',
    participatingProjects: ''
  });

  useEffect(() => {
    if (profileData) {
      setProfile({
        about: profileData.profile.about || '',
        offer: profileData.profile.offer || '',
        links: JSON.stringify(profileData.profile.links || []),
        ownProjects: JSON.stringify(profileData.profile.ownProjects || []),
        participatingProjects: JSON.stringify(profileData.profile.participatingProjects || [])
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const profileDetails = {
        about: profile.about,
        offer: profile.offer,
        links: JSON.parse(profile.links),
        ownProjects: JSON.parse(profile.ownProjects),
        participatingProjects: JSON.parse(profile.participatingProjects),
      };

        await updateProfile(profileDetails);
        onSave();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg ">
      <div className="space-y-6">
        <h1 className="pt-4 pb-3 text-xl text-white/85">Edit your profile</h1>

        <label className="pb-4 text-xl text-green/85">About</label>
        <textarea
          name="about"
          value={profile.about}
          onChange={handleChange}
          className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
        />

        <label className="pb-4 text-xl text-green/85">What can I bring to the table?</label>
        <textarea
          name="offer"
          value={profile.offer}
          onChange={handleChange}
          className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
        />

        <label className="pb-3 text-xl text-green/85">Links</label>
        <textarea
          name="links"
          value={profile.links}
          onChange={handleChange}
          className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
        />

        <label className="pb-3 text-xl text-green/85">Your Projects</label>
        <textarea
          name="ownProjects"
          value={profile.ownProjects}
          onChange={handleChange}
          className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
        />

        <label className="pb-3 text-xl text-green/85">Projects you are involved in</label>
        <textarea
          name="participatingProjects"
          value={profile.participatingProjects}
          onChange={handleChange}
          className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
        />

        <div className="flex justify-center pt-4 ">
            <button
              type="submit"
              className="text-white btn-secondary text-black w-[15%] mr-8"
            >
              Save Changes
            </button>
          </div>
      </div>
    </form>
  );
};

export default EditProfile;
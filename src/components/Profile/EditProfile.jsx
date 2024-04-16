import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../util/fetchData';

const EditProfile = ({ profileData, onSave }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    about: '',
    offer: '',
    links: '',
    contacts: {
      linkedIn: '',
      github: '',
      portfolioWebsite: '',
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (profileData) {
      setProfile({
        firstName: profileData.profile.firstName || '',
        lastName: profileData.profile.lastName || '',
        about: profileData.profile.about || '',
        offer: profileData.profile.offer || '',
        contacts: {
          linkedIn: profileData.profile.contacts?.linkedIn || '',
          github: profileData.profile.contacts?.github || '',
          portfolioWebsite: profileData.profile.contacts?.portfolioWebsite || '',
        },
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contacts.")) {
      const fieldName = name.split(".")[1];
      setProfile(prev => ({
        ...prev,
        contacts: {
          ...prev.contacts,
          [fieldName]: value,
        },
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
  '(\\#[-a-z\\d_]*)?$','i');

  const isValidUrl = url => {
    return !url || urlPattern.test(url); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { linkedIn, github, portfolioWebsite } = profile.contacts;
    
    if ((linkedIn && !isValidUrl(linkedIn)) || 
        (github && !isValidUrl(github)) || 
        (portfolioWebsite && !isValidUrl(portfolioWebsite))) {
      setError("Please enter valid URLs for contacts or leave them blank.");
      return;
    }

    try {
      const profileDetails = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        about: profile.about,
        offer: profile.offer,
        contacts: profile.contacts,
      };
        
        await updateProfile(profileDetails);
        setSuccess('Profile updated successfully!');
        onSave();
    } catch (error) {
      setError('We could not update your profile. Try again later please.');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-h-[700px] overflow-y-auto p-4 rounded-lg">
    <form onSubmit={handleSubmit} className="p-4 rounded-lg ">
      <div className="space-y-6">
        <h1 className="pb-10 text-xl text-white/85">Edit your profile</h1>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green/85">{success}</div>}

        <label className="pb-4 text-xl text-green/85">First Name</label>
        <input
          type="text"
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
          className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
        />

        <label className="pb-4 text-xl text-green/85">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
          className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
        />

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
        
        <div className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent">
          <h2 className="bg-green-600 text-xl text-green/85">Contacts</h2>
            <p className="text-sm text-white/30">Please enter URLs in the following format:</p>
            <div className="space-y-4 bg-gray/700 p-3 rounded">
              <label className="text-green/85">LinkedIn</label>
              <input
                type="text"
                name="contacts.linkedIn"
                placeholder="http://www.linkedin.com/in/yourusername"
                value={profile.contacts.linkedIn}
                onChange={handleChange}
                className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
              />

              <label className="text-green/85">GitHub</label>
              <input
                type="text"
                name="contacts.github"
                placeholder="http://github.com/yourusername"
                value={profile.contacts.github}
                onChange={handleChange}
                className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
              />

              <label className="text-green/85">Portfolio Website</label>
              <input
                type="text"
                name="contacts.portfolioWebsite"
                placeholder="http://yourwebsite.com"
                value={profile.contacts.portfolioWebsite}
                onChange={handleChange}
                className="w-full bg-gray/5 text-white/80 p-2 rounded border border-transparent"
              />
            </div>
          </div>

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
    </div>
  );
};

export default EditProfile;
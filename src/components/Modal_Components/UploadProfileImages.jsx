import React, { useState } from 'react';
import profileImageUpload from './profileImageUpload';

const UploadProfileImage = ({ profileId, isCoverImage, closeModal, currentProfilePictureUrl, currentProfileCoverPictureUrl }) => {
  const { file, handleChange, handleSubmit } = profileImageUpload(profileId, isCoverImage, closeModal);
  const [uploadSuccess, setUploadSuccess] = useState(false); 

  const handleSuccess = () => {
    setUploadSuccess(true);
  };
  return (
    <>
      <header className="text-center text-xl pb-6 font-bold text-green"> Upload Profile Image</header>
      <input type="file" onChange={(e) => handleChange(e)} className="hover:cursor-pointer" />
      <div className="content-center">
        <header className="text-center text-ld pb-6 font-bold text-gray"> Image preview</header>
        <img
          src={file ? URL.createObjectURL(file) : isCoverImage ? currentProfileCoverPictureUrl : currentProfilePictureUrl}
          className={isCoverImage ? "h-56 w-full rounded-lg object-cover object-center bg-black" : "h-56 w-56 rounded-full object-cover object-center bg-black"}
        />
      </div>
      {uploadSuccess && <div className="text-green-500 text-center">Image uploaded successfully!</div>}
      <button
        onClick={() => { handleSubmit(); handleSuccess(); }} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
    </>
  );
};

export default UploadProfileImage;

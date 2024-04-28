import React from 'react';
import projectImageUpload from './projectImageUpload';

const UploadImage = ({ projectId, isCoverImage, closeModal, currentProjectPictureUrl, currentProjectCoverPictureUrl }) => {
  const { file, handleChange, handleSubmit } = projectImageUpload(projectId, isCoverImage, closeModal);

  return (
    <>
      <header className="text-center text-xl pb-6 font-bold text-green"> Upload Image</header>
      <input type="file" onChange={(e) => handleChange(e)} className="hover:cursor-pointer" />
      <div className="content-center">
        <header className="text-center text-ld pb-6 font-bold text-gray"> Image preview</header>
        <img
          src={file ? URL.createObjectURL(file) : isCoverImage ? currentProjectCoverPictureUrl : currentProjectPictureUrl}
          className={isCoverImage ? "h-56 w-full rounded-lg object-cover object-center bg-black" : "h-56 w-56 rounded-full object-cover object-center bg-black"}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
    </>
  );
};

export default UploadImage;

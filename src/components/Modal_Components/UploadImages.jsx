import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ projectId }) => {
  const [file, setFile] = useState();
  const [coverProjectPicture, setCoverProjectPicture] = useState();

  function handleChange(e) {
    const imageFile = e.target.files[0];
    setFile(imageFile);
  }

  function handleCoverPictureChange(e) {
    const coverImageFile = e.target.files[0];
    setCoverProjectPicture(coverImageFile);
  }

  function handleSubmit() {
    const formData = new FormData();
    if (file) {
      formData.append('projectPicture', file);
      axios
        .patch(`http://localhost:8000/api/v1/projects/${projectId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.error('No file selected');
    }
  }

  return (
    <>
      <header className="text-center text-xl pb-6 font-bold text-green"> Upload Image</header>
      <div>
        <label htmlFor="projectPicture">Project Picture:</label>
        <input
          type="file"
          id="projectPicture"
          name="projectPicture"
          onChange={handleChange}
          className="hover:cursor-pointer"
        />
      </div>
      <div>
        <label htmlFor="coverProjectPicture">Cover Project Picture:</label>
        <input
          type="file"
          id="coverProjectPicture"
          name="coverProjectPicture"
          onChange={handleCoverPictureChange}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="content-center">
        <header className="text-center text-ld pb-6 font-bold text-gray"> Image preview</header>
        <img
          src={file ? URL.createObjectURL(file) : ''}
          className="h-56 w-56 rounded-full object-cover object-center bg-black"
          alt="Preview"
        />
        <img
          src={coverProjectPicture ? URL.createObjectURL(coverProjectPicture) : ''}
          className="h-56 w-56 rounded-full object-cover object-center bg-black"
          alt="Cover Preview"
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

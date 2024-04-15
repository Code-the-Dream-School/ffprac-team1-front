import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = ({ projectId }) => {
  const [file, setFile] = useState();
  

  function handleChange(e) {
    const image = e.target.files[0];
    setFile(image);
  }


  function handleSubmit() {
    const formData = new FormData();
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
  }

  return (
    <>
      <header className="text-center text-xl pb-6 font-bold text-green"> Upload Image</header>
      <input type="file" onChange={e => handleChange(e)} className="hover:cursor-pointer" />
      <div className="content-center">
        <header className="text-center text-ld pb-6 font-bold text-gray"> Image preview</header>
        <img
          src={file ? URL.createObjectURL(file) : ''}
          className="h-56 w-56 rounded-full object-cover object-center bg-black"
          alt="Preview"
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
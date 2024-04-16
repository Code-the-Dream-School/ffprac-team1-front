import { useState } from 'react';
import axios from 'axios';

const projectImageUpload = (projectId) => {
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('projectPicture', file);
    axios
      .patch(`http://localhost:8000/api/v1/projects/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (typeof onSuccess === 'function') {
            onSuccess(response.data.projectPictureUrl);
          }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { file, handleChange, handleSubmit };
};

export default projectImageUpload;

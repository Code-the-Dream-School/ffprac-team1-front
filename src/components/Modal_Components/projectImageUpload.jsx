import { useState } from 'react';
import axios from 'axios';

const projectImageUpload = (projectId, isCover = false) => {
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const handleSubmit = (onSuccess) => {
    const formData = new FormData();
    formData.append(isCover ? 'coverProjectPicture' : 'projectPicture', file);
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
          onSuccess(isCover ? response.data.projectCoverPictureUrl : response.data.projectPictureUrl);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { file, handleChange, handleSubmit };
};

export default projectImageUpload;

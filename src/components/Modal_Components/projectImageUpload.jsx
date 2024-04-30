import { useState } from 'react';
import { uploadProjectImage } from '../../util/fetchData';

const projectImageUpload = (projectId, isCover = false, closeModal) => {
  const [file, setFile] = useState();

  const handleChange = e => {
    const image = e.target.files[0];
    setFile(image);
  };

  const handleSubmit = async () => {
    try {
      const imageUrl = await uploadProjectImage(projectId, file, isCover);
      closeModal();
      navigate(`/projects/${projectId}`);
      if (typeof onSuccess === 'function') {
        onSuccess(imageUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { file, handleChange, handleSubmit };
};

export default projectImageUpload;

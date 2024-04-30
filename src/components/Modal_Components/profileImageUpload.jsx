import { useState } from 'react';
import { uploadProfileImage } from '../../util/fetchData';

const profileImageUpload = (profileId, isCover = false, closeModal) => {
  const [file, setFile] = useState();

  const handleChange = e => {
    const image = e.target.files[0];
    setFile(image);
  };

  const handleSubmit = async () => {
    try {
      const imageUrl = await uploadProfileImage(profileId, file, isCover);
      closeModal();
      navigate(`/profile`);
      if (typeof onSuccess === 'function') {
        onSuccess(imageUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { file, handleChange, handleSubmit };
};

export default profileImageUpload;

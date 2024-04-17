import { useState } from 'react';
import axios from 'axios';

const profileImageUpload = (profileId, isCover = false) => {
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };

  const handleSubmit = (onSuccess) => {
    const formData = new FormData();
    formData.append(isCover ? 'coverProfilePicture' : 'profilePicture', file);
    axios
      .patch(`http://localhost:8000/api/v1/profiles/myProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        if (typeof onSuccess === 'function') {
            onSuccess(isCover ? response.data.profileCoverPictureUrl : response.data.profilePictureUrl);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { file, handleChange, handleSubmit };
};

export default profileImageUpload;

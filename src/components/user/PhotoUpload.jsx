import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    // 1. Create a FormData object and append the file
    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      // 2. Make an API call to the backend to upload the file
      const response = await axios.post('/api/uploadPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 3. Extract the image URL from the response and save it in the state
      const { imageUrl } = response.data.data;
      setImageUrl(imageUrl);

      // Optionally: dispatch an action to save the image URL in your Redux store
      dispatch({ type: 'auth/setProfileImage', payload: imageUrl });
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Photo</button>
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={imageUrl}
            alt="Profile"
            style={{ width: '150px', height: '150px' }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;

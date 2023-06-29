import React, { useState } from 'react';
import Placeholder from '../assets/placeholder.png';
import Axios from 'axios';
import {url} from '../utilis.jsx'
import './Profile.css';
function Profile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const { token } = user;


  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validTypes.indexOf(file.type) === -1) {
      alert('File format is incorrect. Please use .jpeg, .png, or .jpg files.');
      return false;
    } else if (file.size > 1024 * 1024 * 5) {
      alert('File size is too large. Please select a smaller file.');
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateAvatar = async () => {
    if (!file) {
      alert('Please select an image');
      return;
    }

    if (!validateFile(file)) {
      return;
    }

    const formData = new FormData();
    formData.append('profile_image', file);

    try {
      
      setLoading(true);
      console.log(formData);
      await Axios.post(`${url}/updateProfileAvatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: token,
        },
      });
      alert('Profile picture updated successfully!');
    
    } catch (error) {
      alert('Failed to update profile picture. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setLoading(true);
      await Axios.post(`${url}/deleteProfileAvatar`,{
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: token,
        },
      });
      alert('Profile picture deleted successfully!');
      
    } catch (error) {
      alert('Failed to delete profile picture. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <h5>loading ...</h5>}
      <h3>Profile Avatar</h3>
      
      <hr />
      <div className="row-form">
        <div className="upload-form">
          <div className="upload-form_display">
            {file ? (
              <img className="displayImg" src={URL.createObjectURL(file)} alt="No pic" />
            ) : (
              <img className="displayImg" src={Placeholder} alt="No pic" />
            )}
          </div>
          <div className="upload-form_inputs">
            <input type="file" name="profile_image" id="fileInput" onChange={handleFileChange} />
            <button type="button" onClick={handleUpdateAvatar}>
              {loading ? 'Loading...' : 'Update Profile Avatar'}
            </button>
            <button type="button" onClick={handleDeleteAvatar}>
              {loading ? 'Loading...' : 'Delete Profile Picture'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

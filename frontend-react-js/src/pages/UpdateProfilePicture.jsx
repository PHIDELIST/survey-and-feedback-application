import React, { useState } from "react";
import axios from "axios";
import './UpdateProfilePicture.css'
import {url} from '../utilis.jsx'

const UploadProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preSignedUrl, setPreSignedUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(`${url}/upload-profile-picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful!", response.data);
      setPreSignedUrl(response.data.signedUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div id="updateprofilepicture">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadProfilePicture;

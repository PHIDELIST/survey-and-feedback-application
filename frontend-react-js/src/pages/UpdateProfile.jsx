import React from 'react';
import Axios from 'axios';
import './UpdateProfile.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Profile from '../components/Profile.jsx'

export default function UpdateProfile({ onClose }) {
  const schema = yup.object().shape({
    Country: yup.string(),
    City: yup.string(),
    OrganizationType: yup.string(),
    OrganizationName: yup.string(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const { token } = user;

  const onSubmit = (data) => {
    Axios.post('http://localhost:8081/profile', data, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then((response) => {
        response.data.message && alert(response.data.message);
        onClose(); // Close the popup after successful submit
      })
      .catch(({ response }) => {
        alert(response.data.error);
      });
  };

  const handleCancelClick = () => {
    onClose(); // Close the popup when cancel button is clicked
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Update Profile</h2>
        <Profile />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Country:</label>
          <input type="text" name="Country" {...register('Country')} />
          <p>{errors.Country?.message}</p>
          <label>City:</label>
          <input type="text" name="City" {...register('City')} />
          <p>{errors.City?.message}</p>
          <label>OrganizationType:</label>
          <input type="text" name="OrganizationType" {...register('OrganizationType')} />
          <p>{errors.OrganizationType?.message}</p>
          <label>OrganizationName:</label>
          <input type="text" name="OrganizationName" {...register('OrganizationName')} />
          <p>{errors.OrganizationName?.message}</p>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

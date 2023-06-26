import React, { useContext, useState, useEffect } from 'react';
import './ProfilePage.css';
import { Context } from '../context/UserContext/Context';
import avatarbg from '../assets/420.jpg';
import data from '../assets/data.jpeg';
import UpdateProfile from './UpdateProfile';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user,dispatch } = useContext(Context);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [adminDetails, setAdminDetails] = useState(null);

  const handleLogout = () => {  
    dispatch({type: "LOGOUT"});

  };

  const handleUpdateClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
    const { token } = user;

      try {
        const response = await axios.get('http://localhost:8081/profile',{
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        });
        setAdminDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminDetails();
  }, []);

  
  return (
    <>
      <div id='profilepage-main'>
        <div className="card">
          <div className="card__img">
            <img src={avatarbg} alt="avatar background" />
          </div>
          <div className="card__avatar">
            <img src={data} alt="" />
          </div>
          <div className="card__title">Name: {user.AdminName}</div>
          <div className="card__subtitle">Email: {user.Email}</div>
          <Link to ="/" onClick={handleLogout}>logout</Link>
          </div>
            <div id='admin-details'>
          {adminDetails && (
            <div id='profiledetails'>
              <h2>Organization Details</h2>
              <ul>
                <li>Country: {adminDetails.Country}</li>
                <li>City: {adminDetails.City}</li>
                <li>Organization Type: {adminDetails.OrganizationType}</li>
                <li>Organization Name: {adminDetails.OrganizationName}</li>
              </ul>
            </div>
          )}
          <div className="card__wrapper">
            <button className="card__btn" onClick={handleUpdateClick}>
              Update
            </button>
          </div>
        </div>
        
      </div>
        {isPopupVisible && (
          <div className="popup-container">
            <div className="popup">
              <h2>Update Profile</h2>
              <UpdateProfile onClose={handleClosePopup} />
            </div>
          </div>
        )}
      
    </>
  );
}

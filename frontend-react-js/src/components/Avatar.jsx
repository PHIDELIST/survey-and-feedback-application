import React from 'react';
import { url } from '../utilis.jsx';

export default function Avatar() {
  const admin = JSON.parse(localStorage.getItem('user'));
  // Destructure admin or use an empty object if it's null this will help handle situation where user is not logged in
  const { AdminID } = admin || {}; 

  return (
    <div>
      {admin && <img id="profileicon" src={`${url}/images/${AdminID}.jpeg`} alt="Profile pic" />}
    </div>
  );
}

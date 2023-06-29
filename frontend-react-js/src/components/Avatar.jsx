import React from 'react'
import {url} from '../utilis.jsx'
const admin = JSON.parse(localStorage.getItem('user'));
const {AdminID} = admin;

export default function Avatar() {
  return (
    <div><img id="profileicon" src={`${url}/images/${AdminID}.jpeg`} alt="Profile pic" /></div>
  )
}

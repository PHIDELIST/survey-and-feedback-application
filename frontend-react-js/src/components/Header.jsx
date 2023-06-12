import { FaHome } from 'react-icons/fa'
import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'

function Header() {
  return (
    <>
    <div id='NavItems'>
    <div id='NavImg'>
      <Link to ="/"><FaHome id='HomeIcon'/></Link>
      <Link to ="/"><img src={logo} alt="" /></Link>
      </div>
      <div id='NavLinks'> 
      <label>Filter by Organization Type</label>
            <select > 
            <option value="1">Travel</option>
            <option value="2">Cleaning company</option>
            <option value="3">IT company</option>
            <option value="4">Logistics</option>
            <option value="5">Hospital</option>
            <option value="6">Restaurant</option>   
            <option value="7">Construction</option>
            </select>
            
        <label>Filter by Country</label>
            <select >
            <option value="1">Kenya</option>
            <option value="2">Uganda</option>
            <option value="3">Tanzania</option>
            <option value="4">Congo</option>
            <option value="5">DRC</option>
            <option value="6">Ethiopia</option>   
            <option value="7">South Sudan</option>
            </select>
                
          <ul id='links'>
              
              <Link to ="/about">About</Link>
              <Link to ="/login">Admin</Link>
          </ul>
         <Link to="/userloginpage"><button id='PlansBtn'>SURVEY</button></Link> 
      </div>
      
    </div>
    </>
  )
}
export default Header;
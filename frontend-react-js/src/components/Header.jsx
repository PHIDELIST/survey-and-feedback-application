import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'

function Header() {
  return (
    <>
    <div id='NavItems'>
      <div id='NavImg'> <img src={logo} alt="" /></div>
      <div id='NavLinks'> 
          <ul id='links'>
              <Link to ="/login">Login</Link>
          </ul>
          <button id='PlansBtn'>VIEW PLANS</button>
      </div>
    </div>
    </>
  )
}
export default Header;
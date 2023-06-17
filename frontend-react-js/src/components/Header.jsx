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

          <ul id='links'>
              
              <Link to ="/about">About</Link>
              <Link to ="/login">Admin</Link>
          </ul>
         
      </div>
      
    </div>
    </>
  )
}
export default Header;
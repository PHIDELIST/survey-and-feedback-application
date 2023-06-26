import { FaUser } from 'react-icons/fa'
import './Header.css'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'
import { useContext } from 'react'
import { Context } from '../context/UserContext/Context'
import data from '../assets/data.jpeg'
function Header() {
  const {user,dispatch} = useContext(Context);

  return (

    <>
    <div id='NavItems'>
    <div id='NavImg'>
      <Link to ="/"><img src={logo} alt="" /></Link>
      </div>
      <div id='NavLinks'> 
          <ul id='links'> 
              <Link id='loginbtn' to ="/about">About</Link>
              <Link id='loginbtn' to ="/login">Login</Link>
              <div id="arrow-wrapper">
            <div id="arrow"></div>
                </div>
               
              {
                user && (
                  <>
                  <Link to ="/profile"><img id='profileicon'  src={data} alt="" /></Link>
                  
                  </>
                )
                  
              }              
              
              
          </ul>
         
      </div>
      
    </div>
    </>
  )
}
export default Header;
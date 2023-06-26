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
          <div id='links'> 
              <Link id='loginbtn' to ="/about">About</Link>
              
              {!user && <Link id='loginbtn' to ="/login">Login</Link>} 
              
              {
                user && (
                  <>
                  
                  <Link id='loginbtn' to ="/adminpage">Dashboard</Link>
                  <Link to ="/profile"><img id='profileicon'  src={data} alt= "<FaUser />" /></Link>
                  </>
                )
                  
              }              
              
              
          </div>
         
      </div>
      
    </div>
    </>
  )
}
export default Header;
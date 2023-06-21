import { FaUser } from 'react-icons/fa'
import './Header.css'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'
import { useContext } from 'react'
import { Context } from '../context/UserContext/Context'

function Header() {
  const {user} = useContext(Context);
  const handleLogout = () => {  
    dispatch({type: "LOGOUT"});

  };
  return (

    <>
    <div id='NavItems'>
    <div id='NavImg'>
      <Link to ="/"><img src={logo} alt="" /></Link>
      </div>
      <div id='NavLinks'> 
          <ul id='links'> 
              <Link to ="/about">About</Link>
              <Link to ="/login">Login</Link>   
              {
                user && (
                  <>
                  <Link to ="/adminprofile"><FaUser id='profileicon'/></Link>
                  <Link to ="/" onClick={handleLogout}>logout</Link>
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
import React from 'react'
import './Footer.css'
import logo from '../assets/logo.png'
import {Link} from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <>
    <div id='FooterMain'>
        <div id='FooterHeader'>
        <div><Link to ="/"><img src={logo} alt="" /></Link></div>
        <div id='iconsFooter'>
        <FaFacebook />
        <FaTwitter />
        <FaInstagram />
        <FaYoutube />
        <FaLinkedin />
        </div>
        </div>
    
        <div id='FooterContent'>
            <div id='Browse'>
            <h4>MAIN CATEGORIES</h4>
            <li>Travel</li>
            <li>Cleaning companies</li>
            <li>IT companies</li>
            <li>Construction companies</li>
            <li>Insurance companies</li>
            <li>Logistics companies</li>
            </div>
            <div id='HelpMe'>
            <h4>HELP ME</h4>
            <li> FAQ</li>
            <li>Terms Of Use</li>
            <li>Privacy Policy</li>
            <li>Cookies</li> 
            </div>
            <div id='Resources'>
            <h4>RESOURCES</h4>
            <li>Blog</li>
            <li>Help center</li>
            <li>Community</li>
            <li>FAQs</li>
            <li>Partner with us</li>
            <li>Developers / API</li>
            </div>
            <div id='KnowUs'>
            <h4>GET TO KNOW US</h4>
            <li>About us</li>
            <li>Contact us</li>
            <li>News</li>
            <li>Terms & conditions</li>
            </div>
        </div>
        <div id='FooterBottom'>
        <p>© 2022 All Rights Reserved</p>
        </div>
    </div>

    </>
  )
}
export default Footer;
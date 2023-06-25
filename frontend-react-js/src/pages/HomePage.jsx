import React from 'react'
import './HomePage.css'
import IntroPhoto from '../assets/introPhoto.jpg'
import { Link } from 'react-router-dom'
import sarova from '../assets/sarova.png'
import kilele from'../assets/kilele.jpg'
import mtKenya from '../assets/mtKenya.jpg'
import gym from '../assets/gym.jpg'
import FeedBackForm from '../forms/FeedBackForm'

export default function HomePage() {
  return (
   <>
   <div id='MainHomeContainer'>
       <div id='HomePageIntro'>
        <div id='intro'>
        <h2>Welcome to our Surveys Platform</h2>
        <p>
        Discover valuable insights, make informed decisions, and shape the future with our powerful survey platform
        Empower your organization, engage your audience, and unlock the voice of your stakeholders with our comprehensive survey tools
      </p>
       
      </div>
      <img src={IntroPhoto} id="IntroPhoto" alt="" />
       </div>
      <div id='Explanations'>
      <div>
        <div id="testimonial">
        <h2>What our users say</h2>
            <blockquote>"Taking surveys on this platform has been an insightful experience. Highly recommended!"</blockquote>
            <cite>- Phidel oluoch</cite>
            <blockquote>"I've gained valuable knowledge and contributed to important research through these surveys."</blockquote>
            <cite>- Delphi Omuya</cite>
            <h2>Get Started Now</h2>
          <p>Join our community and share your opinions through our surveys.</p>
          <Link to="/userpage"><button id='PlansBtn'>TAKE SURVEY</button></Link>
          </div>
        </div>
        <div id='survey-cards-main'>
          <div id="survey-card">
              <img src={sarova} alt="Survey Image" />
              <h3>Sarova Whitesands Beach Resort</h3>
              <p>we will like to know how was your experince at our beach hotel</p>
              <div id='PlansBtn'><FeedBackForm /> </div>
          </div>
          <div id="survey-card">
          <img src={kilele} alt="Survey Image" />
            <h3>KIRINYAGA UNIVERSITY</h3>
            <p>We value your experience on our site take survey to help us make it better</p>
            
            <div id='PlansBtn'><FeedBackForm /> </div>
          </div>
          <div id="survey-card">
          <img src={gym} alt="Survey Image" />
            <h3>DELPHI GYM</h3>
            <div className="progress-bar">
              <div className="progress"></div>
            </div>
            <p>Please tell us how you feel about our gym</p>
            <div id='PlansBtn'><FeedBackForm /> </div>
  
          </div>
          <div id="survey-card">
          <img src={mtKenya} alt="Survey Image" />
            <h3>Mount Kenya Safaris</h3>
            <div className="ratings">
              <span className="rating">&#9733;</span>
              <span className="rating">&#9733;</span>
              <span className="rating">&#9733;</span>
              <span className="rating">&#9734;</span>
              <span className="rating">&#9734;</span>
            </div>
            <p>How was your experience with our safaris</p>
            <div id='PlansBtn'><FeedBackForm /> </div>
          </div>



        </div>

        </div>
   </div>
   </>
  )
}

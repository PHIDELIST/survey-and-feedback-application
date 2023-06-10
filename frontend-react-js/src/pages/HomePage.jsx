import React from 'react'
import './HomePage.css'
import IntroPhoto from '../assets/introPhoto.jpg'

export default function HomePage() {
  return (
   <>
   <div id='MainHomeContainer'>
       <div id='HomePageIntro'>
        <div id='intro'>
        <h2>Survey Questions and Feedback : This Will Help Enhance Customer Satisfaction</h2>
        <p>
        Need some help writing survey questions? We've got you. 
        Dive into our survey question examples and write kick-ass survey questions.
      </p>
      </div>
      <img src={IntroPhoto} id="IntroPhoto" alt="" />
       </div>
      <div id='Explanations'>
      <h1>Types of survey questions</h1>
      <h2>This is what you came for—the good stuff.</h2>
      <h3>Here are the types of survey questions you should be using to get more survey responses:</h3>

              <li>Open-ended questions</li>

              <li>Closed-ended questions</li>

              <li>Rating questions</li>

              <li>Likert scale questions</li>

              <li>Multiple choice questions</li>

              <li>Picture choice questions</li>

              <li>Demographic questions</li>
        <p>
        Maybe that’s exactly what you needed—seven types of sample survey questions. Great. But maybe you’re looking for more.
        Maybe, you want some of our juiciest tips for writing better questions. The questions you should be asking to potential customers. 
        Or maybe you want to hear what a psychology researcher-turned-marketer thinks you should do. Then you should read on. Definitely.
        </p>
        </div>
   </div>
   </>
  )
}

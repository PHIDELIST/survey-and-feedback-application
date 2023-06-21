import React, { useEffect, useState } from 'react';
import './UserPage.css';

import SurveyResponseForm from '../Forms/SurveyResponseForm';
import { Axios } from 'axios';

function UserPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const {Surveys,getSurveys} = useState([])

  const getSurveys = async () => {
    const res = await Axios.get('http://localhost:8081/surveyfeedbacks/surveys',
    {
      headers:{
       
      }
    });
    
  
  }
  useEffect(() => {
    getSurveys();
    
    }
  ,[])
  console.log(Surveys)
  const handleTakeSurvey = (survey) => {
    setSelectedSurvey(survey);
    setShowPopup(true);
  };

  const handleFinishSurvey = (data) => {
    console.log('Form data:', data);
    setShowPopup(false);
  };

  return (
    <div id="Mainuserpage">
      <h1>AVAILABLE SURVEYS</h1>
      <div id='usercontainerdashboard'>
      {showPopup && selectedSurvey && (
        <div id="popup-container">
          <div id="popup">
            <button id="popup-close" onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <SurveyResponseForm survey={selectedSurvey} onSubmit={handleFinishSurvey} />
          </div>
        </div>
      )}
      {!showPopup && (
        <div id="survey-cards-container">
          {Surveys.map((survey) => (
            <div id="userpagesurvey-card" key={survey.SurveyID}>
              <h3>{survey.Title}</h3>
              <p>{survey.Description}</p>
              <p>Expires on: {survey.EndDate}</p>
              <button onClick={() => handleTakeSurvey(survey)}>Take Survey</button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default UserPage;

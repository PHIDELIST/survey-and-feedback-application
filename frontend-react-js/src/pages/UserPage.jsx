import React, { useState, useEffect } from 'react';
import './UserPage.css';
import SurveyResponseForm from '../Forms/SurveyResponseForm';
import axios from 'axios';

function UserPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [uniqueSurveys, setUniqueSurveys] = useState([]);

  const getSurveys = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { token } = user;

      const response = await axios.get('http://localhost:8081/questions', {
        headers: {
          authorization: token,
        },
      });

      const surveysData = response.data.survey;
      const unique = Array.from(new Map(surveysData.map((survey) => [survey.SurveyID, survey])).values());
      setSurveys(surveysData);
      setUniqueSurveys(unique);
      console.log('Surveys:', surveysData);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }
  };

  useEffect(() => {
    getSurveys();
  }, []);

  const handleTakeSurvey = (survey) => {
    setSelectedSurvey(survey);
    setShowPopup(true);
  };

  const handleFinishSurvey = (data) => {
    console.log('Form data:', data);
    setShowPopup(false);
  };

  const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const expiryDate = new Date(endDate);
    const timeDifference = expiryDate.getTime() - today.getTime();
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining >= 0 ? daysRemaining : 'Expired';
  };
  
  return (
    <div id="Mainuserpage">
      <h1>AVAILABLE SURVEYS</h1>
      <div id="usercontainerdashboard">
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
            {uniqueSurveys.map((survey, index) => {
                const daysRemaining = calculateDaysRemaining(survey.EndDate);
                if (daysRemaining >= 0) {
                    return (
                        <div id="userpagesurvey-card" key={`${survey.SurveyID}-${index}`}>
                            <h3>{survey.Title}</h3>
                            <p>{survey.Description}</p>
                            <p>Expires in: {daysRemaining} days</p>
                            <button onClick={() => handleTakeSurvey(survey)}>Take Survey</button>
                        </div>
                    );
                
              } else {
                return null; // Don't render the survey if remaining days is negative
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;

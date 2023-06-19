import React, { useState } from 'react';
import './UserPage.css';
import SurveyResponseForm from '../Forms/SurveyResponseForm';

const sampleSurveys = [
  {
    id: 1,
    title: 'Survey feedback   website',
    description: 'I am dummy.',
    expiration_date: '2024-07-07',
    questions: [
      {
        text: 'Question 1',
        type: 'yes_no',
      },
      {
        text: 'Question 2',
        type: 'multiple_response',
        choices: [
          { text: 'Choice 1', checked: true },
          { text: 'Choice 2', checked: false },
          { text: 'Choice 3', checked: true },
        ],
      },
      {
        text: 'Question 3',
        type: 'text_input',
        answer: '',
      },
    ],
  },
  {
    id: 2,
    title: 'Sarova white sands hotel &',
    description: 'lets try it out.',
    expiration_date: '2024-07-08',
    questions: [
      {
        text: 'Question 1',
        type: 'yes_no',
      },
      {
        text: 'Question 2',
        type: 'multiple_response',
        choices: [
          { text: 'Choice 1', checked: true },
          { text: 'Choice 2', checked: false },
          { text: 'Choice 3', checked: true },
        ],
      },
      {
        text: 'Question 3',
        type: 'text_input',
        answer: '',
      },
    ],
  },

];

function UserPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

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
          {sampleSurveys.map((survey) => (
            <div id="userpagesurvey-card" key={survey.id}>
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>
              <p>Expires on: {survey.expiration_date}</p>
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

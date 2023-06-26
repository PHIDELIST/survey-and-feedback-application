import './AdminSideNav.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AdminSideNav() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const getSurveys = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { token } = user;

        const response = await axios.get('http://localhost:8081/surveyfeedbacks', {
          headers: {
            authorization: token,
          },
        });
        setSurveys(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSurveys();
  }, []);

  const deleteSurvey = async (id) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { token } = user;

        await axios.delete(`http://localhost:8081/surveyfeedback/${id}`, {
          headers: {
            authorization: token,
          },
        });

        setSurveys(surveys.filter((survey) => survey.SurveyID !== id));
      } catch (error) {
        console.error('Failed to delete survey:', error);
      }
    }
  };

  return (
    <div id="Surveys-main">
      <h1>Surveys</h1>
      {surveys && surveys.map((survey) => (
        <div id='survey' key={survey.SurveyID}>
          <h3>{survey.Title}</h3>
          <button id='deletesurvey' onClick={() => deleteSurvey(survey.SurveyID)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

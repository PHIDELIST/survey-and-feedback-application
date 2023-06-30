import './AdminSideNav.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {url} from '../utilis.jsx'

function AdminSideNav() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSurveys = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { token } = user;

        const response = await axios.get(`${url}/surveyfeedbacks`, {
          headers: {
            authorization: token,
          },
        });

        setSurveys(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getSurveys();
  }, []);

  const deleteSurvey = async (id) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { token } = user;

        await axios.delete(`${url}/${id}`, {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="Surveys-sidebar-main">
      <h1>Surveys</h1>
      {surveys.length === 0 ? (
        <div>No available surveys</div>
      ) : (
        surveys.map((survey) => (
          <div id='survey' key={survey.SurveyID}>
            <h3>{survey.Title}</h3>
            <button id='deletesurvey' onClick={() => deleteSurvey(survey.SurveyID)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
export default AdminSideNav;
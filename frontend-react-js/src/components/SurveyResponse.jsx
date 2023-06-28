import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SurveyResponse.css';

const SurveyResponse = () => {
  const [surveyID, setSurveyID] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLimitedResponses, setShowLimitedResponses] = useState(true);
  const [inputReset, setInputReset] = useState(false);

  const fetchSurveyResponses = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { token } = user;
      const response = await axios.get(`http://localhost:8081/statistics/${surveyID}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      });
      setResponses(response.data);
      setLoading(false);
      setInputReset(true);
    } catch (error) {
      setResponses([]);
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setSurveyID(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSurveyResponses();
  };

  const toggleShowLimitedResponses = () => {
    setShowLimitedResponses((prevValue) => !prevValue);
  };

  const downloadResponses = () => {
    const dataStr = JSON.stringify(responses, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUri;
    downloadLink.download = 'survey_responses.json';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleEndViewing = () => {
    setResponses([]);
    setInputReset(true);
  };

  useEffect(() => {
    if (inputReset) {
      setSurveyID('');
      setInputReset(false);
    }
  }, [inputReset]);

  return (
    <div className="survey-response">
      <h1>Survey Responses</h1>
      <form onSubmit={handleSubmit}>
        <input id="surveyIDsearch" type="text" value={surveyID} onChange={handleInputChange} placeholder="Enter Survey ID" disabled={loading} />
        <button type="submit" disabled={loading}>
          Fetch Responses
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {responses.length === 0 ? (
            <div>No responses available</div>
          ) : (
            <>
              <h2>Responses:</h2>
              <ul>
                {showLimitedResponses
                  ? responses.slice(0, 5).map((response) => <li key={response.id}>{response.answerValue}</li>)
                  : responses.map((response) => <li key={response.id}>{response.answerValue}</li>)}
              </ul>
              <button onClick={toggleShowLimitedResponses}>
                {showLimitedResponses ? 'Show All Responses' : 'Show Limited Responses'}
              </button>
              <div className="btn-container">
                <button onClick={downloadResponses}>Download Responses</button>
                <button onClick={handleEndViewing}>End Viewing</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyResponse;

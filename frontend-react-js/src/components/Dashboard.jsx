import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import SurveyResponse from './SurveyResponse';

const Dashboard = () => {
  const [responseCounts, setResponseCounts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { token } = user;
    try {
      const response = await axios.get('http://localhost:8081/statistics', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = response.data;
      setResponseCounts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id='main-dashboard-stats'>
      <div id='response-count-by-survey'>
      <h1>Survey Response Count</h1>
      <table >
        <thead>
          <tr>
            <th>Survey ID</th>
            <th>Survey Title</th>
            <th>Response Count</th>
          </tr>
        </thead>
        <tbody>
          {responseCounts.length > 0 ? (
            responseCounts.map((item) => (
              <tr key={item.SurveyID}>
                <td>{item.SurveyID}</td>
                <td>{item.Title}</td>
                <td>{item.ResponseCount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No survey statistics available</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <SurveyResponse />
    </div>
  );
};

export default Dashboard;

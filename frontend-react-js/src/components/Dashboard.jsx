import React, { useState, useEffect } from 'react';
import './Dashboard.css'

function Dashboard() {
  const [questionData, setQuestionData] = useState([]);

  // Mock data for demonstration
  const mockResponseData = [
    { question: 'Question 1', responses: ['Option A', 'Option A', 'Option B', 'Option C'] },
    { question: 'Question 2', responses: ['Option B', 'Option B', 'Option B', 'Option A'] },
    { question: 'Question 3', responses: ['Option C', 'Option C', 'Option C', 'Option A'] },
  ];

  useEffect(() => {
    // Calculate percentages for each question
    const calculatePercentages = () => {
      const newData = mockResponseData.map((item) => {
        const responseCount = item.responses.length;
        const optionCounts = {};

        item.responses.forEach((response) => {
          if (!optionCounts[response]) {
            optionCounts[response] = 0;
          }
          optionCounts[response]++;
        });

        const optionPercentages = {};
        for (const option in optionCounts) {
          optionPercentages[option] = (optionCounts[option] / responseCount) * 100;
        }

        return {
          question: item.question,
          percentages: optionPercentages,
        };
      });

      setQuestionData(newData);
    };

    calculatePercentages();
  }, []);

  return (
    <div>
      <div id='maindashboardcontainer'>
       <h1>Admin Dashboard</h1>
      <div id='dashboardmain'>
      {questionData.map((item) => (
        <div className="card" key={item.question}>
          <div className="card-header">
            <h3>{item.question}</h3>
          </div>
          <div className="card-body">
            <ul>
              {Object.entries(item.percentages).map(([option, percentage]) => (
                <li key={option}>
                  {option}: {percentage.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
}

export default Dashboard;

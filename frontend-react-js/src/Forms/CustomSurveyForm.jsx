import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CustomSurveyForm() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { token } = user;

    axios
      .get('http://localhost:8081/questions', {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      })
      .then((response) => {
        console.log('API response:', response.data);
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log('Updated questions state:', questions);

  return (
    <div>
      <h1>Questions</h1>
      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question.questionId}>
            <h3>{question.question}</h3>
            <ul>
              {question.choices &&
                question.choices.map((choice, index) => (
                  <li key={`${question.questionId}-${index}`}>
                    {choice.choice}
                  </li>
                ))}
            </ul>
          </div>
        ))
      ) : (
        <div>No questions available</div>
      )}
    </div>
  );
}

export default CustomSurveyForm;

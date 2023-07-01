import React, { useState } from 'react';
import axios from 'axios';
import './SurveyResponseForm.css';
import {url} from '../utilis.jsx'
import { Link } from 'react-router-dom';
const SurveyResponseForm = ({ survey, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedAnswer({
      ...selectedAnswer,
      [currentQuestionIndex]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (onSubmit) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const { token } = user;
        console.log('Submitting survey response:', {
          SurveyID: survey.SurveyID,
          answerValue: selectedAnswer,
        });
        const response = await axios.post(
          `${url}/surveyresponse`,
          {
            SurveyID: survey.SurveyID,
            answerValue: selectedAnswer,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: token,
            },
          }
        );
        
      
      } catch (error) {
        
   
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = survey.questions[currentQuestionIndex];

  return (
    <form onSubmit={handleSubmit} id='surveyresponsepopped'>
      <h3>{survey.Title}</h3>
      <p>{survey.Description}</p>

      <div id='surveyquestions'>
        <p>{currentQuestion.text}</p>
        {/* Render the appropriate input based on the question type */}
        {currentQuestion.type === 'yes-no' && (
          <>
            <label>
              <input
                type="radio"
                name="answer"
                value="yes"
                onChange={handleOptionChange}
                checked={selectedAnswer[currentQuestionIndex] === 'yes'}
              />{' '}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="answer"
                value="no"
                onChange={handleOptionChange}
                checked={selectedAnswer[currentQuestionIndex] === 'no'}
              />{' '}
              No
            </label>
          </>
        )}

        {currentQuestion.type === 'multiple-choice' && (
          <>
            {currentQuestion.choices.map((choice, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name="answer"
                  value={choice.OptionText}
                  onChange={handleOptionChange}
                  checked={selectedAnswer[currentQuestionIndex] === choice.OptionText}
                />{' '}
                {choice.OptionText}
              </label>
            ))}
          </>
        )}

        {currentQuestion.type === 'text_input' && (
          <textarea
            name="answer"
            rows="4"
            cols="50"
            onChange={handleOptionChange}
            value={selectedAnswer[currentQuestionIndex] || ''}
          />
        )}
      </div>

      <button type="button" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
        Previous
      </button>
      <button type="button" onClick={handleNext} disabled={currentQuestionIndex === survey.questions.length - 1}>
        Next
      </button>

      {currentQuestionIndex === survey.questions.length - 1 && <Link to="/"><button type="submit">Submit</button></Link>}
    </form>
  );
};

export default SurveyResponseForm;

import React, { useState, useReducer } from 'react';
import './SurveyResponseForm.css';

const SurveyResponseForm = ({ survey, onSubmit }) => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (questionIndex < survey.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // HERE IS WHERE IS HANDLE SENDING DATA TO THE DATBASE
  
    if (onSubmit) {
      onSubmit();
    }
  };

  if (!survey || !survey.questions || survey.questions.length === 0) {
    return null; 
  }
  const currentQuestion = survey.questions[questionIndex];
  return (
    <div id='surveyresponse-form'>
    <form onSubmit={handleSubmit}>
      <h3>{survey.title}</h3>
      <p>{survey.description}</p>

      <div>
        <p>{currentQuestion.text}</p>
        {/* Here we Render the appropriate input based on the question type */}
        {currentQuestion.type === 'yes_no' && (
          <>
            <label>
              <input type="radio" name="answer" value="yes" /> Yes
            </label>
            <label>
              <input type="radio" name="answer" value="no" /> No
            </label>
          </>
        )}

        {currentQuestion.type === 'multiple_response' && (
          <>
            {currentQuestion.choices.map((choice, index) => (
              <label key={index}>
                <input type="checkbox" name="answer" value={choice.text}
                />{' '}
                {choice.text}
              </label>
            ))}
          </>
        )}

        {currentQuestion.type === 'text_input' && (
          <textarea name="answer" rows="4" cols="50" />
        )}
      </div>

      {questionIndex < survey.questions.length - 1 && (
        <button type="button" onClick={handleNextQuestion}>Next Question</button>
      )}

      {questionIndex === survey.questions.length - 1 && (
        <button type="submit">Submit</button>
      )}
    </form>
    </div>
  );
};

export default SurveyResponseForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyResponseForm = ({ onSubmit }) => {
  const [survey, setSurvey] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);

  useEffect(() => {
    const fetchSurvey = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const { token } = user;
      try {
        const response = await axios.get('http://localhost:8081/questions', {
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        });
        console.log('Response Data:', response.data);
        setSurvey(response.data);
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };

    fetchSurvey();
  }, []);

  const handleNextQuestion = () => {
    if (questionIndex < survey.survey.length - 1) {
      const question = survey.survey[questionIndex];
      if (question.type === 'multiple-choice') {
        const selected = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(
          (checkbox) => checkbox.value
        );
        setSelectedChoices((prevSelectedChoices) => [...prevSelectedChoices, selected]);
      } else {
        setSelectedChoices((prevSelectedChoices) => [...prevSelectedChoices, null]);
      }
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = {};

    for (let [name, value] of formData.entries()) {
      // Check if the field is an array (e.g., multiple checkboxes)
      if (formValues[name] && Array.isArray(formValues[name])) {
        formValues[name].push(value);
      } else if (formValues[name]) {
        formValues[name] = [formValues[name], value];
      } else {
        formValues[name] = value;
      }
    }

    if (selectedChoices.length > 0) {
      formValues.choices = selectedChoices;
    }

    console.log('Form Data:', formValues);

   
    if (onSubmit) {
      onSubmit();
    }
  };

  if (!survey || !survey.survey || survey.survey.length === 0) {
    return <p>Loading...</p>; 
  }

  const currentQuestion = survey.survey[questionIndex];

  return (
    <form onSubmit={handleSubmit}>
      <h3>{currentQuestion.Title}</h3>
      <p>{currentQuestion.Description}</p>

      <div>
        <p>{currentQuestion.text}</p>
        {/* Render the appropriate input based on the question type */}
        {currentQuestion.type === 'yes-no' && (
          <>
            <label>
              <input type="radio" name="answer" value="yes" /> Yes
            </label>
            <label>
              <input type="radio" name="answer" value="no" /> No
            </label>
          </>
        )}

        {currentQuestion.type === 'multiple-choice' && (
          <>
            {currentQuestion.choices.map((choice, index) => (
              <label key={index}>
                <input type="checkbox" name="answer" value={choice.OptionText} /> {choice.OptionText}
              </label>
            ))}
          </>
        )}

        {currentQuestion.type === 'text_input' && <textarea name="answer" rows="4" cols="50" />}
      </div>

      {questionIndex < survey.survey.length - 1 && (
        <button type="button" onClick={handleNextQuestion}>
          Next Question
        </button>
      )}

      {questionIndex === survey.survey.length - 1 && <button type="submit">Submit</button>}
    </form>
  );
};

export default SurveyResponseForm;

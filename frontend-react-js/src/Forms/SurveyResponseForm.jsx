import React, { useState } from 'react';

const SurveyResponseForm = ({ survey, onSubmit }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);

  const handleNextQuestion = () => {
    if (questionIndex < survey.questions.length - 1) {
      const question = survey.questions[questionIndex];
      if (question.type === 'multiple_response') {
        const selected = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map((checkbox) => checkbox.value);
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

    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit();
    }
  };

  if (!survey || !survey.questions || survey.questions.length === 0) {
    return null; // or display a message indicating no questions found
  }

  const currentQuestion = survey.questions[questionIndex];

  return (
    <form onSubmit={handleSubmit}>
      <h3>{survey.Title}</h3>
      <p>{survey.Description}</p>

      <div>
        <p>{currentQuestion.text}</p>
        {/* Render the appropriate input based on the question type */}
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
                <input
                  type="checkbox"
                  name="answer"
                  value={choice.text}
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
        <button type="button" onClick={handleNextQuestion}>
          Next Question
        </button>
      )}

      {questionIndex === survey.questions.length - 1 && (
        <button type="submit">Submit</button>
      )}
    </form>
  );
};

export default SurveyResponseForm;

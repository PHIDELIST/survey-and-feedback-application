import React, { useState } from 'react';

const SurveyResponseForm = ({ survey, onSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({ surveyId: survey.SurveyID, answer: selectedAnswer });
    }
  };
console.log(survey);
  return (
    <form onSubmit={handleSubmit}>
      <h3>{survey.Title}</h3>
      <p>{survey.Description}</p>

      <div>
        <p>{survey.text}</p>
        {/* Render the appropriate input based on the question type */}
        {survey.type === 'yes-no' && (
          <>
            <label>
              <input type="radio" name="answer" value="yes" onChange={handleOptionChange} /> Yes
            </label>
            <label>
              <input type="radio" name="answer" value="no" onChange={handleOptionChange} /> No
            </label>
          </>
        )}

        {survey.type === 'multiple-choice' && (
          <>
            {survey.choices.map((choice, index) => (
              <label key={index}>
                <input type="checkbox" name="answer" value={choice.OptionText} onChange={handleOptionChange} /> {choice.OptionText}
              </label>
            ))}
          </>
        )}

        {survey.type === 'text_input' && <textarea name="answer" rows="4" cols="50" onChange={handleOptionChange} />}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SurveyResponseForm;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function SurveyResponseForm() {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    // Fetch surveys from the backend and set the surveys state
    const fetchSurveys = async () => {
      try {
        const response = await fetch('/api/surveys');
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.log('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  const handleSurveyChange = async (event) => {
    const surveyId = parseInt(event.target.value);
    const selectedSurvey = surveys.find((survey) => survey.id === surveyId);
    setSelectedSurvey(selectedSurvey);

    // Fetch questions for the selected survey from the backend
    try {
      const response = await fetch(`/api/surveys/${surveyId}/questions`);
      const data = await response.json();
      setSelectedSurvey((prevSurvey) => ({
        ...prevSurvey,
        questions: data.questions,
      }));
    } catch (error) {
      console.log('Error fetching questions:', error);
    }
  };

  const handleFormSubmit = (data) => {
    // You can customize this function to send the user responses to the backend
    console.log('Form data:', data);
  };

  const renderQuestionField = (question) => {
    if (question.type === 'multiple_choice') {
      return (
        <div key={question.id}>
          <label>{question.text}</label>
          <select name={`question_${question.id}`} ref={register}>
            {question.choices.map((choice) => (
              <option key={choice.id} value={choice.id}>
                {choice.text}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (question.type === 'text_input') {
      return (
        <div key={question.id}>
          <label>{question.text}</label>
          <textarea name={`question_${question.id}`} ref={register}></textarea>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Survey Response Form</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label>Select a survey:</label>
        <select name="survey" onChange={handleSurveyChange} ref={register}>
          <option value="">Select a survey</option>
          {surveys.map((survey) => (
            <option key={survey.id} value={survey.id}>
              {survey.title}
            </option>
          ))}
        </select>

        {selectedSurvey && (
          <div>
            <h3>{selectedSurvey.title}</h3>
            <p>{selectedSurvey.description}</p>
            {selectedSurvey.questions.map((question) =>
              renderQuestionField(question)
            )}
          </div>
        )}

        {selectedSurvey && (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}

export default SurveyResponseForm;

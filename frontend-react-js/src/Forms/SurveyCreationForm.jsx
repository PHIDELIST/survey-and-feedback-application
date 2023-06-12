import React, { useState } from 'react';

function SurveyCreationForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], text: event.target.value };
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', choices: [] }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices[choiceIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddChoice = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices.push('');
    setQuestions(updatedQuestions);
  };

  const handleRemoveChoice = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices.splice(choiceIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation and submit the survey data to the backend
    const surveyData = {
      title,
      description,
      startDate,
      endDate,
      questions,
    };

    console.log(surveyData);
    // Make API request to store survey data in the database
  };

  return (
    <div>
      <h1>Create Survey</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />

        <label>Questions:</label>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <input
              type="text"
              value={question.text}
              onChange={(event) => handleQuestionChange(questionIndex, event)}
            />

            <label>Choices:</label>
            {question.choices.map((choice, choiceIndex) => (
              <div key={choiceIndex}>
                <input
                  type="text"
                  value={choice}
                  onChange={(event) => handleChoiceChange(questionIndex, choiceIndex, event)}
                />
                <button type="button" onClick={() => handleRemoveChoice(questionIndex, choiceIndex)}>
                  Remove Choice
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddChoice(questionIndex)}>
              Add Choice
            </button>

            <button type="button" onClick={() => handleRemoveQuestion(questionIndex)}>
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
}

export default SurveyCreationForm;

import React, { useState } from 'react';
import axios from 'axios';
import './SurveyCreationForm.css';
import {url} from '../utilis.jsx'

function SurveyCreationForm() {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [Questions, setQuestions] = useState([]);

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...Questions];
    updatedQuestions[index] = { ...updatedQuestions[index], text: event.target.value };
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (index, event) => {
    const updatedQuestions = [...Questions];
    updatedQuestions[index] = { ...updatedQuestions[index], type: event.target.value };
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...Questions, { text: '', type: '', options: [] }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...Questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...Questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...Questions];
    updatedQuestions[questionIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...Questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const surveyData = { Title, Description, StartDate, EndDate, Questions };

    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const { token } = user
      const response = await axios.post(`${url}/surveyfeedbacks`, surveyData, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        }
      });

      console.log('Survey created:', response.data);
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setQuestions([]);
    } catch (error) {
      console.error('Failed to create survey:', error);
    }
  };

  return (
    <div id="create-survey">
      <form onSubmit={handleSubmit} id="surveycreation-form">
        <label>Title:</label>
        <input type="text" id="title" value={Title} onChange={(event) => setTitle(event.target.value)} />

        <label>Description:</label>
        <textarea value={Description} onChange={(event) => setDescription(event.target.value)} id="description"></textarea>

        <label>Start Date:</label>
        <input id="startDate" value={StartDate} onChange={(event) => setStartDate(event.target.value)} type="date" />

        <label>End Date:</label>
        <input type="date" id="endDate" value={EndDate} onChange={(event) => setEndDate(event.target.value)} />

        <label>Questions:</label>
        {Questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <input type="text" value={question.text} onChange={(event) => handleQuestionChange(questionIndex, event)} />
            <select value={question.type} onChange={(event) => handleTypeChange(questionIndex, event)}>
              <option value="">Select Type</option>
              <option value="single-choice">Single Choice</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="yes-no">Yes/No</option>
            </select>

            <label>Options:</label>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input type="text" value={option} onChange={(event) => handleOptionChange(questionIndex, optionIndex, event)} />
                <button type="button" onClick={() => handleRemoveOption(questionIndex, optionIndex)}>Remove Option</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddOption(questionIndex)}>Add Option</button>

            <button type="button" onClick={() => handleRemoveQuestion(questionIndex)}>Remove Question</button>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>Add Question</button>

        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
}

export default SurveyCreationForm;

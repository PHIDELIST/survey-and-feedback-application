import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import SurveyCreationForm from '../forms/SurveyCreationForm';
import './AdminPage.css';


function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {setShowForm(!showForm);
  };

  return (
    <>
    <div id="dashboard">
      <Dashboard />
    </div>
      <div id="templates">
      <h4>CREATE A CUSTOM SURVEY</h4>
    <div id="createform">
        <button id="btn-createsurvey" onClick={toggleForm}>
          Create Survey
        </button>
        {showForm && (
          <div id="survey-form-overlay">
            <div id="survey-form-popup">
              <button id="btn-close" onClick={toggleForm}>
                Close
              </button><div id='survey-form-poped'>
              <SurveyCreationForm />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default AdminPage;

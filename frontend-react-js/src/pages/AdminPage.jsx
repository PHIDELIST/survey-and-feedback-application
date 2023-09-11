import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import SurveyCreationForm from '../Forms/SurveyCreationForm.jsx';
import './AdminPage.css';
import AdminSideNav from './AdminSideNav';


function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {setShowForm(!showForm);
  };

  return (
    <>
    <div id="admin-page-main">
    <div id="admin-sidenav">
    <AdminSideNav />
      </div>
        <div id="templates">
        <Dashboard />
        <h4>Create a Survey</h4>
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
    </div>
    </>
  );
}

export default AdminPage;

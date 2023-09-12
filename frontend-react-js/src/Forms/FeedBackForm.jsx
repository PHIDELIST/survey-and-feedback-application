import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './FeedBackForm.css'
import {url} from '../utilis.jsx'
import {Link} from 'react-router-dom';

function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { token } = user;
      const response = await axios.post(`${url}/feedback`, {
        feedbackType,
        feedbackText,
      },{
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      });

      if (response.status === 200) {
        alert('Thank you for your feedback!');
        setFeedbackType('');
        setFeedbackText('');
        setIsModalOpen(false);
      } else {
        
      }
    } catch (err) {
      
    }
  };

  const openModal = (type) => {
    setFeedbackType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id='feedback-formthumbs'>
      <div className="feedback-options">
        <button onClick={() => openModal('thumbs-up 👍')}>
          <span role="img" aria-label="Thumbs Up">👍</span>
        </button>
        <button onClick={() => openModal('thumbs-down 👎')}>
          <span role="img" aria-label="Thumbs Down">👎</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Feedback Form">
        <h2>Provide additional feedback</h2>
        <form onSubmit={handleFormSubmit}>
          <p>{feedbackType}</p>
          <label htmlFor="feedbackText">Additional Comments:</label>
          <textarea id="feedbackText" value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} rows={4}/>
          <button type="submit" onClick={closeModal}>
            Submit Feedback
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default FeedbackForm;

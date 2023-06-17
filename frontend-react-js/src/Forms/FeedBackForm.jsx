//make sure to run yarn add react-modal//
import React, { useState } from 'react';
import Modal from 'react-modal';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  content: {
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: '#fff',
  },
};

function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();


    console.log('Feedback submitted:', feedbackType, feedbackText);


    setFeedbackType('');
    setFeedbackText('');


    setIsModalOpen(false);
  };

  const openModal = (type) => {
    setFeedbackType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <div className="feedback-options">
        <button onClick={() => openModal('thumbs-up')}>
          <span role="img" aria-label="Thumbs Up">👍</span>
        </button>
        <button onClick={() => openModal('thumbs-down')}>
          <span role="img" aria-label="Thumbs Down">👎</span>
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Feedback Form"
        style={modalStyles}
      >
        <h2>Feedback Form</h2>
        <form onSubmit={handleFormSubmit}>
          <p>{feedbackType}</p>

          <label htmlFor="feedbackText">Additional Comments:</label>
          <textarea
            id="feedbackText"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows={4}
          />

          <button type="submit">
            Submit Feedback
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default FeedbackForm;

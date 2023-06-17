import React from 'react';
import { useForm } from 'react-hook-form';

function UserFeedbackForm() {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      // Send user feedback to the backend and store it in the UserFeedback table
      const response = await fetch('/api/user-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('User feedback submitted successfully');
        
        reset();
      } else {
        console.log('Error submitting user feedback');
      }
    } catch (error) {
      console.log('Error submitting user feedback:', error);
    }
  };

  return (
    <div>
      <h2>User Feedback Form</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="feedbackText">Feedback:</label>
        <textarea id="feedbackText" name="feedbackText" ref={register}></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserFeedbackForm;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function UserProfilePage() {
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
   
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/user/profile'); // Fetch user profile data from the backend and populate the form fields
        const data = await response.json();

        
        setValue('firstName', data.firstName);
        setValue('email', data.email);
        setValue('country', data.country);
        setValue('password', data.password);
      } catch (error) {
        console.log('Error fetching user profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      
      const response = await fetch('/api/user/profile', {// Send updated user profile data to the backend to update the user's profile
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('User profile updated successfully');
        
        reset();
      } else {
        console.log('Error updating user profile');
      }
    } catch (error) {
      console.log('Error updating user profile:', error);
    }
  };

  return (
    <div>
      <h2>User Profile Page</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" ref={register} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" ref={register} />

        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" ref={register} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" ref={register} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default UserProfilePage;

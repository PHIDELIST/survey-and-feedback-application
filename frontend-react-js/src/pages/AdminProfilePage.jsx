import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function AdminProfilePage() {
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    // Fetch admin profile data from the backend and populate the form fields
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/admin/profile');
        const data = await response.json();

        // Populate the form fields with the profile data
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('email', data.email);
        setValue('phone', data.phone);
        setValue('country', data.country);
        setValue('organization', data.organization);
        setValue('password', data.password);
      } catch (error) {
        console.log('Error fetching admin profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      // Send updated admin profile data to the backend to update the admin's profile
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Admin profile updated successfully');
        // Reset the form after successful submission
        reset();
      } else {
        console.log('Error updating admin profile');
      }
    } catch (error) {
      console.log('Error updating admin profile:', error);
    }
  };

  return (
    <div>
      <h2>Admin Profile Page</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" ref={register} />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" ref={register} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" ref={register} />

        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" ref={register} />

        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" ref={register} />

        <label htmlFor="organization">Organization:</label>
        <input type="text" id="organization" name="organization" ref={register} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" ref={register} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default AdminProfilePage;

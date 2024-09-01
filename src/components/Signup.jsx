import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/Login.module.css'; // Import the same CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    password: '',
    roleID: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchFamilyDoctors = async () => {
    const propName = "Profession"; 
    const propValue = "Family";
    try {
      const response = await fetch('http://localhost:3001/api/doctors/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propName, propValue}), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch doctors");
      }

      const data = await response.json();
      return data; // This should be an array of doctors
    } catch (error) {
      console.error("Error fetching family doctors:", error.message);
      alert(`Error: ${error.message}`);
      return []; // Return an empty array if there's an error
    }
  };

  // Assign doctor to user
  const assignDoctorToUser = async (userId, doctorId) => {
    try {
      const response = await fetch('http://localhost:3001/api/patients/connectDoctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, doctorId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to assign doctor");
      }

      return await response.json();
    } catch (error) {
      console.error("Error assigning doctor:", error.message);
      alert(`Error: ${error.message}`);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError('All required fields must be filled');
      return;
    }
  
    if (formData.password.length < 8 || formData.password.length > 10) {
      setError('Password must be between 8 and 10 characters');
      return;
    }
  
    try {
      // Create the user
      const response = await fetch('http://localhost:3001/api/patients/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${text}`);
      }
  
      const result = await response.json();
      const userId = result.insertId; // Adjust based on your actual response
  
      if (!userId) {
        throw new Error('User ID is not defined in the response');
      }
  
      // Fetch family doctors
      const familyDoctors = await fetchFamilyDoctors();
  
      // Randomly select a family doctor if any are found
      let assignedDoctorId = null;
      if (familyDoctors.length > 0) {
        const randomIndex = Math.floor(Math.random() * familyDoctors.length);
        assignedDoctorId = familyDoctors[randomIndex].DoctorID;
      }
  
      // Assign the selected doctor to the user
      if (assignedDoctorId) {
        await assignDoctorToUser(userId, assignedDoctorId);
      }
  
      setSuccessMessage('User created and doctor assigned successfully');
      setError('');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error.message);
      setError('An error occurred while creating the user or assigning the doctor.');
    }
  };

  return (
    <div > {/* Apply similar styles */}
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Birth Date:
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Role ID:
          <input
            type="number"
            name="roleID"
            value={formData.roleID}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Sign Up</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default SignUp;





import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classes from '../styles/App.module.css';

const Login = () => {
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Define fetchDoctor function at the top
  const fetchDoctor = async (userId) => {
    try {
      const response = await fetch('http://localhost:3001/api/doctors/id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propName: 'UserID', propValue: userId }), // Send propName and propValue
      });
      const data = await response.json();
      return data; // Adjust based on your actual API response
    } catch (error) {
      console.error('Error fetching doctor:', error);
      return null; // Default value in case of error
    }
  };

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/patients/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        console.log('Login successful:', data);
        console.log('LOGIN', data.user);
        
        // Redirect to home page or wherever you want
        localStorage.clear();
        if (userType === 'patient') {
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/home');
        } else {
          const doctorData = await fetchDoctor(data.user.id); // Ensure fetchDoctor is called after data is available
          if (doctorData && doctorData.DoctorID) {
            localStorage.setItem('doctor', JSON.stringify(doctorData));
            localStorage.setItem('userdoctor', JSON.stringify(data.user));
            navigate('/homeD');
          } else {
            setError('Access denied: Doctor not in the system');
          }
        }
      } else {
        // Handle errors such as incorrect login details
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <img src='clinic.png' className={classes.myImage} alt="Clinic Logo" />
      {!userType ? (
        <div>
          <h2>Login as:</h2>
          <button onClick={() => handleUserTypeSelection('doctor')}>Doctor</button>
          <button onClick={() => handleUserTypeSelection('patient')}>Patient</button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <h2>{userType === 'doctor' ? 'Doctor Login' : 'Patient Login'}</h2>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  required
                />
              </label>
            </div>
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>{userType === 'doctor' ? '' : <Link to="/signup">Click here to signup</Link>}</div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;





import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classes from '../styles/App.module.css';

const Login = () => {
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        // Redirect to home page or wherever you want
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
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
      <img src='clinic.png'  className={classes.myImage} />
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
          </form>
          <div>{userType === 'doctor' ? '' : <Link to="/signup">Click here to signup</Link>}</div>
        </>
      )}
    </div>
  );
};

export default Login;



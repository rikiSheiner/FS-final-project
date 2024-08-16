import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(`Logging in as ${userType}:`, credentials);
        navigate('/home'); // Adjust the navigation path as needed
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred');
    }
};


  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
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
              Username:
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
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



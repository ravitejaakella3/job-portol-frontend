import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(credentials);
      console.log('User data:', userData);
      setAuth(userData);
      
      // Alert for successful login
      alert('Login successful!');

      if (userData.role === 'Recruiter') {
        navigate('/recruiter-dashboard');
      } else {
        navigate('/jobs');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Alert for failed login
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;







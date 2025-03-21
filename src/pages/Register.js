import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Job Seeker'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    console.log('Sending data:', formData);

    try {
      const response = await fetch('https://job-portol-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.username.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          role: formData.role
        })
      });

      const responseText = await response.text();
      console.log('Raw server response:', responseText);

      let data;
      try {
        if (responseText.startsWith('{') || responseText.startsWith('[')) {
          data = JSON.parse(responseText);
        } else {
          data = { message: responseText };
        }
      } catch (e) {
        console.error('Response parsing error:', e);
        data = { message: responseText || 'Unknown server error' };
      }

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      console.log('Registration successful:', data);

      // Show alert message and redirect
      window.alert('Registration successful! Redirecting to login...');
      navigate('/login');

    } catch (err) {
      console.error('Registration error details:', err);
      setError(err.message.includes('Server error') 
        ? 'The server encountered an issue. Please try again later.' 
        : err.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange} 
            required 
            minLength="6"
          />
        </div>
        <div className="form-group">
          <select 
            name="role" 
            onChange={handleChange} 
            value={formData.role}
          >
            <option value="JobSeeker">Job Seeker</option>
            <option value="Recruiter">Recruiter</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;


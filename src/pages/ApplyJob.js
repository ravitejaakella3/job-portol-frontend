import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ApplyJob.css';

const ApplyJob = () => {
  const { jobId } = useParams(); // Get the jobId from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  console.log('Job ID from URL:', jobId); // Log the job ID to verify it's being retrieved correctly

  const [formData, setFormData] = useState({
    skills: '',
    qualifications: '',
    experience: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  //console.log('Submitting application for job ID:', jobId); // Log job ID
    try {
      const res = await fetch(`https://job-portol-backend.onrender.com/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Applied successfully!');
        navigate('/applied-jobs'); // Navigate to the applied jobs page
      } else {
        const errorMessage = await res.text(); // Get the error message from the response
        setError(`Failed to apply: ${errorMessage}`);
      }
    } catch (err) {
      setError('An error occurred while applying for the job.');
      console.error(err);
    }
  };

  return (
    <div className='apply-job-form'>
      <h2>Apply for Job</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="skills" placeholder="Skills" onChange={handleChange} required />
        <input type="text" name="qualifications" placeholder="Qualifications" onChange={handleChange} required />
        <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;


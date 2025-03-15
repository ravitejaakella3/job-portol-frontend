import React, { useEffect, useState } from 'react';
import { fetchAppliedJobs } from '../services/api'; // Import your API function
import { useAuth } from '../context/AuthContext';
import './AppliedJobs.css';

const AppliedJobs = () => {
  const { auth } = useAuth(); // Get the auth context
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppliedJobs = async () => {
      if (!auth || !auth.userId) {
        setError('User ID is not available');
        setLoading(false);
        return;
      }

      try {
        const jobs = await fetchAppliedJobs(auth.userId); // Fetch applied jobs from the API
        setAppliedJobs(jobs);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setError('Failed to fetch applied jobs');
      } finally {
        setLoading(false);
      }
    };

    loadAppliedJobs();
  }, [auth]);

  if (loading) {
    return <div>Loading applied jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (appliedJobs.length === 0) {
    return <div>No applied jobs found.</div>;
  }

  return (
    <div className='applied-jobs'>
      <h2>Applied Jobs</h2>
      <ul>
        {appliedJobs.map((application) => (
          <li key={application._id}>
            <h3>Title: {application.jobId.title}</h3>
            <p>Description: {application.jobId.description}</p>
            <p>Skills: {application.skills}</p>
            <p>Qualifications: {application.qualifications}</p>
            <p>Experience: {application.experience} years</p>
            <p>Status: {application.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobs;
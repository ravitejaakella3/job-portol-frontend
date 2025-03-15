import React, { useEffect, useState } from 'react';
import { fetchRecruiterJobs } from '../services/api'; // Import your API function
import { Link } from 'react-router-dom';
import './RecruiterDashboard.css';

const RecruiterDashboard = () => {
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    const loadPostedJobs = async () => {
      try {
        const jobs = await fetchRecruiterJobs(); // Fetch jobs for the logged-in recruiter
        setPostedJobs(jobs);
      } catch (error) {
        console.error('Error fetching posted jobs:', error);
      }
    };

    loadPostedJobs();
  }, []);

  return (
    <div className='dashboard-container'>
      <h2>Recruiter Dashboard</h2>
      <h3>Your Posted Jobs</h3>
      <ul>
        {postedJobs.length > 0 ? (
          postedJobs.map((job) => (
            <li key={job._id}>
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
              <p>Salary: {job.salary}</p>
              <Link to={`/jobs/${job._id}/applications`}>View Applications</Link>
            </li>
          ))
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </ul>
    </div>
  );
};

export default RecruiterDashboard;

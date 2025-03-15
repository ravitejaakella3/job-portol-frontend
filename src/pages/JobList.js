import React, { useEffect, useState } from 'react';
import { fetchJobs, fetchAppliedJobs } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './JobList.css';

const JobList = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [jobList, setJobList] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobs = await fetchJobs();
        setJobList(jobs);
      } catch (error) {
        if (error.message === 'Token expired') {
          navigate('/'); // Redirect to login if token is expired
        } else {
          setError('Error fetching jobs: ' + error.message);
        }
      }
    };

    const loadAppliedJobs = async () => {
      if (auth && auth.userId) {
        const jobs = await fetchAppliedJobs(auth.userId); // Fetch applied jobs
        setAppliedJobs(jobs.map(job => job.jobId._id)); // Store applied job IDs
      }
    };

    loadJobs();
    loadAppliedJobs();
  }, [auth, navigate]);

  const handleApply = async (jobId) => {
    ///console.log('Applying for job ID:', jobId);
    // Call your API to apply for the job here
    // await applyForJob(jobId); // Uncomment and implement this function
    setAppliedJobs(prev => [...prev, jobId]); // Update the state to reflect the applied job
    navigate(`/apply/${jobId}`); // Navigate to the ApplyJob page
  };

  return (
    <div className='job-listing'>
      <h2>Job Listings</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {jobList.map((job) => (
          <li key={job._id}>
            <h2>Company Name:<span>{job.company}</span></h2>
            <h3>Role: <span>{job.title}</span></h3>
            <p>Description: <span>{job.description}</span></p>
            <p>Location: <span>{job.location}</span></p>
            <p>Salary: <span>{job.salary}</span></p>
            {auth && auth.role === "Job Seeker" && (
              appliedJobs.includes(job._id) ? (
                <button disabled>Applied</button> // Show "Applied" button if already applied
              ) : (
                <button onClick={() => handleApply(job._id)}>Apply</button> // Show "Apply" button if not applied
              )
            )}
            {auth && auth.role === "Recruiter" && (
              <NavLink to={`/jobs/${job._id}/applications`}>View Applications</NavLink>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/applied-jobs')}>View Applied Jobs</button>
    </div>
  );
};

JobList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default JobList;










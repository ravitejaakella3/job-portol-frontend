import React, { useEffect, useState } from 'react';
import { fetchAppliedJobs } from '../services/api'; // Import your API function
import { useAuth } from '../context/AuthContext';
import './AppliedJobs.css';

const AppliedJobs = () => {
  const { auth } = useAuth(); // Get the auth context
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadAppliedJobs = async () => {
      if (!auth?.userId) {
        setLoading(false);
        return;
      }

      try {
        const jobs = await fetchAppliedJobs(auth.userId);
        if (isMounted) {
          setAppliedJobs(jobs || []);
        }
      } catch (error) {
        console.log('Error loading applied jobs:', error);
        if (isMounted) {
          setAppliedJobs([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAppliedJobs();

    return () => {
      isMounted = false;
    };
  }, [auth]);

  if (loading) {
    return (
      <div className="applied-jobs">
        <h2>Applied Jobs</h2>
        <div className="loading-message">Loading applied jobs...</div>
      </div>
    );
  }

  return (
    <div className='applied-jobs'>
      <h2>Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p className="no-jobs-message">You haven't applied to any jobs yet.</p>
      ) : (
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
      )}
    </div>
  );
};

export default AppliedJobs;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobApplications, acceptApplication, rejectApplication, fetchJobDetails } from '../services/api'; // Import your API functions
import './ViewApplications.css';

const ViewApplications = () => {
  const { jobId } = useParams(); // Get jobId from URL parameters
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
       // console.log('Fetching job details for Job ID:', jobId); // Log the job ID
        await fetchJobDetails(jobId); // Fetch job details first, but we don't need to store the title

        //console.log('Fetching applications for Job ID:', jobId); // Log the job ID
        const response = await fetchJobApplications(jobId); // Fetch applications for the jobId
        //console.log('Applications fetched:', response); // Log the applications response

        // Set applications from the response
        setApplications(response.applications); // Extract applications array from the response
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to load applications. Please try again later.'); // Set error message
      }
    };

    loadApplications();
  }, [jobId]);

  const handleAccept = async (applicationId) => {
    try {
      await acceptApplication(jobId, applicationId); // Call the API to accept the application
      setApplications((prev) => prev.map(app => app._id === applicationId ? { ...app, status: 'accepted' } : app));
    } catch (err) {
      setError('Failed to accept application');
      console.error(err);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await rejectApplication(jobId, applicationId); // Call the API to reject the application
      setApplications((prev) => prev.map(app => app._id === applicationId ? { ...app, status: 'rejected' } : app));
    } catch (err) {
      setError('Failed to reject application');
      console.error(err);
    }
  };

  return (
    <div className='application-container'>
      <h2>Applications</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {Array.isArray(applications) && applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {Array.isArray(applications) ? (
            applications.map((application) => (
              <li key={application._id}>
                <p>Name: {application.userId.name}</p>
                <p>Email: {application.userId.email}</p>
                <p>Skills: {application.skills}</p>
                <p>Qualifications: {application.qualifications}</p>
                <p>Experience: {application.experience}</p>
                <p>Status: {application.status}</p>
                <button onClick={() => handleAccept(application._id)}>Accept</button>
                <button onClick={() => handleReject(application._id)}>Reject</button>
              </li>
            ))
          ) : (
            <p>Failed to load applications. Please try again later.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ViewApplications; 
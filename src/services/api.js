const API_BASE = "http://localhost:5030";

const isTokenExpired = (token) => {
  if (!token) return true;
  console.log('Token before decoding:', token); // Log the token
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
    return payload.exp * 1000 < Date.now(); // Check if the token is expired
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Treat invalid tokens as expired
  }
};

export const fetchJobs = async () => {
  const token = localStorage.getItem('token'); // Get the token from local storage

  if (isTokenExpired(token)) {
    throw new Error('Token expired'); // Handle token expiration
  }

  const response = await fetch(`${API_BASE}/jobs`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the headers
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return await response.json(); // Return the list of jobs
};

export const postJob = async (jobData, token) => {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(jobData),
  });

  if (!res.ok) {
    throw new Error('Failed to post job');
  }
  return res.json();
};

// New function to fetch applied jobs
export const fetchAppliedJobs = async (userId) => {
  const token = localStorage.getItem('token'); // Get the token from local storage
  console.log('Token before fetching applied jobs:', token); // Log the token
  const response = await fetch(`${API_BASE}/jobs/users/${userId}/applied-jobs`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch applied jobs');
  }

  return response.json(); // Return the response data
};

// Example of how to define loginUser in your api.js
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  console.log('Login response data:', data); // Log the response data

  // Check if userId is present in the response
  if (!data.userId || !data.token) {
    throw new Error('User ID or token is missing in the login response');
  }

  // Save the token in local storage
  localStorage.setItem('token', data.token); 
  return {
    userId: data.userId,
    role: data.role,
  }; // Return user data
};

export const fetchRecruiterJobs = async () => {
  const response = await fetch(`${API_BASE}/jobs/my-jobs`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token for authentication
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posted jobs');
  }

  return await response.json(); // Return the list of jobs
};

// Fetch applications for a specific job
export const fetchJobApplications = async (jobId) => {
  const token = localStorage.getItem('token'); // Get the token from local storage

  const response = await fetch(`${API_BASE}/jobs/${jobId}/applications`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the headers
    },
  });

  console.log('Response status:', response.status); // Log the response status

  // Read the response body only once
  const responseBody = await response.json(); // Read the response body

  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }

  return responseBody; // Return the list of applications
};

// Accept an application
export const acceptApplication = async (jobId, applicationId) => {
  const response = await fetch(`${API_BASE}/jobs/${jobId}/applications/${applicationId}/accept`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to accept application');
  }

  return await response.json(); // Return the accepted application
};

// Reject an application
export const rejectApplication = async (jobId, applicationId) => {
  const response = await fetch(`${API_BASE}/jobs/${jobId}/applications/${applicationId}/reject`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to reject application');
  }

  return await response.json(); // Return the rejected application
};

export const fetchJobDetails = async (jobId) => {
  const token = localStorage.getItem('token'); // Get the token from local storage

  const response = await fetch(`${API_BASE}/jobs/${jobId}/applications`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the headers
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch job details');
  }

  return await response.json(); // Return the job details
};




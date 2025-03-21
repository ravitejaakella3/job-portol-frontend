import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PostJob from './pages/PostJob';
import JobList from './pages/JobList';
import ApplyJob from './pages/ApplyJob';
import AppliedJobs from './pages/AppliedJobs';
import ViewApplications from './pages/ViewApplications';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/jobs/:jobId/applications" element={<ViewApplications />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;








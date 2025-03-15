import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import JobList from "../pages/JobList";
import RecruiterDashboard from "../pages/RecruiterDashboard";
import PostJob from "../pages/PostJob";

const AppRoutes = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole); // Update role if it changes
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobs" element={<JobList />} />

      {/* Recruiter Routes */}
      {role === "Recruiter" ? (
        <>
          <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
          <Route path="/post-job" element={<PostJob />} />
        </>
      ) : (
        <Route path="/recruiter-dashboard" element={<Navigate to="/jobs" />} />
      )}

      {/* Default Fallback */}
      <Route path="*" element={<Navigate to="/jobs" />} />
    </Routes>
  );
};

export default AppRoutes;



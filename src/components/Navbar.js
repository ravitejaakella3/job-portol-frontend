import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './Navbar.css';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  console.log("Current auth state:", auth);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Job Portal</h2>
      <div className="nav-links">
        {!auth ? (
          <>
            <NavLink to="/" activeClassName="active">Login</NavLink>
            <NavLink to="/register" activeClassName="active">Register</NavLink>
          </>
        ) : (
          <>
            {auth.role !== "Recruiter" && (
              <NavLink to="/jobs" activeClassName="active">All Jobs</NavLink>
            )}
            {auth.role === "Recruiter" && (
              <>
                <NavLink to="/recruiter-dashboard" activeClassName="active">Dashboard</NavLink>
                <NavLink to="/post-job" activeClassName="active">Post Job</NavLink>
                
              </>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



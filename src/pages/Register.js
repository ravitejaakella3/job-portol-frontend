import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "JobSeeker" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://job-portol-backend.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(data.message || "Error registering");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error registering");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="name" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="JobSeeker">Job Seeker</option>
          <option value="Recruiter">Recruiter</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;


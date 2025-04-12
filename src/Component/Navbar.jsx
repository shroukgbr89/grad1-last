import React from 'react';
import { Link } from 'react-router-dom';
import m1 from '../assets/img/m1.jpg'; 
import '../assets/HomePage.css';

export default function Navbar() {
  // Retrieve logged-in user data
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const isAdmin = userData?.admin; // Check if the user is an admin
  const doctorId = localStorage.getItem('doctorId'); // Check if the user is a doctor

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={m1} alt="Health Care Logo" className="logo" />
          <span className="brand-name">Health Care</span>
        </div>
        <div className="nav-links">
          <div className="dropdown">
            <Link to="#" className="dropdown-link">Appointment</Link>
            <div className="dropdown-content">
              <Link to="/ListAppointment" className="dropdown-item">List Appointment</Link>
            </div>
          </div>

          {/* Conditionally render the "Doctors" dropdown based on admin status */}
          {isAdmin && (
            <div className="dropdown">
              <Link to="#" className="dropdown-link">Doctors</Link>
              <div className="dropdown-content">
                <Link to="/DoctorList" className="dropdown-item">Doctor List View</Link>
                <Link to="/Add" className="dropdown-item">Add New Doctor</Link>
                <Link to="/Edit" className="dropdown-item">Edit Profile Doctor</Link>
              </div>
            </div>
          )}

          {/* Render the Profile and Drugs links if doctorId exists */}
          {doctorId && (
            <>
              <Link to={`/profile/${doctorId}`} className="nav-link" style={{ marginLeft: '8px' }}>
                My Profile
              </Link>
              {/* <Link to="/Drugs" className="nav-link" style={{ marginLeft: '8px' }}>
                Drugs
              </Link> */}
            </>
          )}

          <Link to="/HomePage" className="nav-link">Home</Link>

          <div className="auth-buttons">
            <Link to="/signup" className="sign-up-btn">Sign up</Link>
            <Link to="/Login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>
    </>
  );
}

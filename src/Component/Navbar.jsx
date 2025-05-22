import React from 'react';
import { Link } from 'react-router-dom';
import m1 from '../assets/img/m1.jpg'; 
import '../assets/HomePage.css';

export default function Navbar() {
  // Retrieve logged-in user data
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const isAdmin = userData?.admin; // Check if the user is an admin
  const doctorId = localStorage.getItem('doctorId'); // Check if the user is a doctor
  const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src={m1} alt="Health Care Logo" className="logo" />
          <span className="brand-name">Health Care</span>
        </div>
        <div className="nav-links">
          {/* Appointments Dropdown */}
          <div className="dropdown">
            <Link to="#" className="dropdown-link">Appointments</Link>
            <div className="dropdown-content">
              <Link to="/ListAppointment" className="dropdown-item">List Appointments</Link>
              {!isAdmin && (
                <Link to="/Prescriptions" className="dropdown-item">Prescriptions</Link>
              )}
            </div>
          </div>

          {/* Doctors Dropdown (Admin only) */}
          {isAdmin && (
            <div className="dropdown">
              <Link to="#" className="dropdown-link">Manage Doctors</Link>
              <div className="dropdown-content">
                <Link to="/DoctorList" className="dropdown-item">Doctor List</Link>
                <Link to="/Add" className="dropdown-item">Add New Doctor</Link>
                <Link to="/Edit" className="dropdown-item">Edit Doctors</Link>
              </div>
            </div>
          )}

          {/* Patient Histories - for both doctors and admins */}
          {(doctorId || isAdmin) && (
            <Link to="/Histories" className="nav-link">Patient Histories</Link>
          )}

          {/* My Profile (Doctors only) */}
          {doctorId && (
            <Link to={`/profile/${doctorId}`} className="nav-link">My Profile</Link>
          )}

          {/* Home Link */}
          <Link to="/HomePage" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/Contact" className="nav-link">Contact</Link>


          {/* Authentication Buttons */}
          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/signup" className="sign-up-btn">Sign up</Link>
                <Link to="/Login" className="login-btn">Login</Link>
              </>
            ) : (
              <Link 
                to="/Login" 
                className="logout-btn"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/Login';
                }}
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import m1 from '../assets/img/m1.jpg'; 
import '../assets/HomePage.css';

export default function Navbar() {
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const isAdmin = userData?.admin;
  const doctorId = localStorage.getItem('doctorId');
  const isLoggedIn = !!localStorage.getItem('userData');

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={m1} alt="Health Care Logo" className="logo" />
        <span className="brand-name">Health Care</span>
      </div>

      <div className="nav-links">
        {/* Common Links */}
        <Link to="/HomePage" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/Contact" className="nav-link">Contact</Link>
        <Link to="/Blog" className="nav-link">Blog</Link>


        {/* If not logged in */}
        {!isLoggedIn && (
          <div className="auth-buttons">
            <Link to="/signup" className="sign-up-btn">Sign up</Link>
            <Link to="/Login" className="login-btn">Login</Link>
          </div>
        )}

        {/* If logged in */}
        {isLoggedIn && (
          <>
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

            {/* Manage Doctors (Admin only) */}
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

            {/* Patient Histories for both */}
            {(isAdmin || doctorId) && (
              <Link to="/Histories" className="nav-link">Patient Histories</Link>
            )}

            {/* My Profile for doctor only */}
            {doctorId && (
              <Link to={`/profile/${doctorId}`} className="nav-link">My Profile</Link>
            )}

            {/* Logout */}
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
          </>
        )}
      </div>
    </nav>
  );
}

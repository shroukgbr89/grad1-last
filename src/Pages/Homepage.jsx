import React from 'react';
import doctorImage from '../assets/img/docc.png';
import appoint from '../assets/img/appointment_img-DzbZlMsi.png';

import { Link } from 'react-router-dom';

import '../assets/HomePage.css';

export default function Homepage() {
  return (
    <>
      <div className="content">
        <div className="paragrah">
          <h1>
            Medical Clinic That You Can Trust{' '}
            <span>
              <i className="fa-regular fa-face-laugh-wink"></i>
            </span>
          </h1>
          <p>
            Welcome to Health Care, your trusted companion in healthcare! <br />
            Whether you're a patient seeking personalized care or a doctor <br />
            looking to streamline your practice, our platform offers seamless <br />
            appointment booking, expert consultations, and AI-driven support <br />
            for all your medical needs. Join us today and experience a smarter
            approach to health.
          </p>
          <div className="media-link">
            <Link to="https://www.facebook.com/theclinic.eg" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </Link>
            <Link to="https://www.instagram.com/solitaire_clinics/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link to="https://x.com/mayoclinicme?lang=ar" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </Link>
          </div>
        </div>
        <div className="photo">
          <img src={appoint} alt="Doctor" />
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Expert Doctors</h3>
            <p>Board-certified physicians with years of experience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Quick Appointments</h3>
            <p>Same-day availability for urgent needs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>Online Booking</h3>
            <p>Schedule anytime from anywhere</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Data</h3>
            <p>Your health information is safe with us</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h3>24/7 Support</h3>
            <p>We're here for you, day or night</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Patient-Centric Care</h3>
            <p>Your health is our priority</p>
          </div>
        </div>
      </section>

      <div class="appointment-hero-container">
  <div class="hero-text-content">
    <h1>Welcome, Doctor </h1>
    <p class="hero-subtitle">Join 100+ Trusted Medical Professionals </p>
    <a href="/signup" class="hero-cta-button">Sign Up to Get Started</a>
  </div>
  <div class="hero-image-container">
    <img
  src={doctorImage}
  alt="Team of professional doctors"
  className="hero-image"
/>

  </div>
</div>

    </>
  );
}
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/HomePage.css'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h4>About Us</h4>
            <p>
              Providing reliable and comprehensive healthcare solutions. <br />
              Our mission is to improve lives through innovative <br />
              medical technologies and exceptional patient care.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>
              <i className="fas fa-envelope"></i>{' '}
              <a href="mailto:info@medicalsystem.com">info@medicalsystem.com</a>
            </p>
            <p>
              <i className="fas fa-phone"></i>{' '}
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> 123 Health St, Wellness City, USA
            </p>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Medical System. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

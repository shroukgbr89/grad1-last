import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/HomePage.css'

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2 className="footer-logo">Healt Care</h2>
            <p className="footer-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          <div className="footer-company">
            <h4 className="footer-heading">COMPANY</h4>
            <ul className="footer-list">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About us</a></li>
              <li><a href="/contact">Contact us</a></li>
              <li><a href="/privacy">Privacy policy</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">GET IN TOUCH</h4>
            <ul className="footer-list">
              <li><i className="fas fa-phone"></i> +1-212-456-7890</li>
              <li><i className="fas fa-envelope"></i> greatstockdev@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2024 GreatStock - All Right Reserved.</p>
        </div>
      </footer>
    </>
  );
}

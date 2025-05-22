import React from "react";
import contactImg from "../assets/img/contact_image-IJu_19v_.png"; 
import "../assets/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">
        CONTACT <span>US</span>
      </h1>
      <div className="contact-content">
        <div className="contact-image">
          <img src={contactImg} alt="Doctor and patient" />
        </div>
        <div className="contact-info">
          <div className="office-section">
            <h2>OUR OFFICE</h2>
            <p>4 Sheikh Nour Eldin<br />
            off Thawra St. 11345, Egypt       
     </p>
            <p>
              Tel: (000) 000-0000<br />
              Email: shroukAnwar@gmail.com
            </p>
          </div>
          <div className="careers-section">
            <h2>CAREERS AT PRESCRIPTO</h2>
            <p>Learn more about our teams and job openings.</p>
            <a href="##" className="explore-jobs-btn">Explore Jobs</a>
          </div>
        </div>
      </div>
    </div>
  );
}
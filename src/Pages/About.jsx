import React from "react";
import aboutImg from "../assets/img/a.png";
import "../assets/About.css"
const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image" style={{height: "400px"}}>
          <img src={aboutImg} alt="Healthcare professionals" />
        </div>
        
        <div className="about-text">
          <h1>ABOUT <span>US</span></h1>
          
          <div className="about-description">
            <p>
              Welcome to our health care , your trusted partner in managing your healthcare needs conveniently and efficiently. 
              At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments 
              and managing their health records.
            </p>
            <p>
              health care is committed to excellence in healthcare technology. We continuously strive to enhance our platform, 
              integrating the latest advancements to improve user experience and deliver superior service. Whether you're 
              booking your first appointment or managing ongoing care, health care is here to support you every step of the way.
            </p>
          </div>
          
          <div className="vision-section">
            <h2>Our Vision</h2>
            <p>
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap 
              between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>
      
      <div className="why-choose-us">
        <h2>WHY <span>CHOOSE US</span></h2>
        
        <div className="features-grid">
          <div className="feature-box">
            <h3>EFFICIENCY:</h3>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          
          <div className="feature-box">
            <h3>CONVENIENCE:</h3>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          
          <div className="feature-box">
            <h3>PERSONALIZATION:</h3>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
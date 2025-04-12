import React from 'react';
import doctorImage from '../assets/img/docc.png';
import { Link } from 'react-router-dom';
import costImage from '../assets/img/money.svg';
import certifiedImage from '../assets/img/stethoscope.svg';
import securityImage from '../assets/img/security.svg';
import serviceImage from '../assets/img/services.svg';
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
            <Link Link="https://www.facebook.com/theclinic.eg" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </Link>
            <Link Link="https://www.instagram.com/solitaire_clinics/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link Link="https://x.com/mayoclinicme?lang=ar" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </Link>
          </div>
        </div>
        <div className="photo">
          <img src={doctorImage} alt="Doctor" />
        </div>
      </div>

      <div className="service">
        <div className="cost">
          <div className="cost-img">
            <img
              src={costImage}
              alt="Cost"
              style={{ width: '70px', height: '70px' }}
            />
          </div>
          <div className="c-paragrah">
            <p>
              Reasonable cost <br /> Healthcare services with <br /> different subscription <br /> packages
            </p>
          </div>
        </div>

        <div className="Certified">
          <div className="Certified-img">
            <img
              src={certifiedImage}
              alt="Certified"
              style={{ width: '70px', height: '70px' }}
            />
          </div>
          <div className="Certified-paragrah">
            <p>
              Certified Doctors <br /> Direct medical consultations <br /> with doctors
            </p>
          </div>
        </div>

        <div className="security">
          <div className="security-img">
            <img
              src={securityImage}
              alt="Security"
              style={{ width: '70px', height: '70px' }}
            />
          </div>
          <div className="security-paragrah">
            <p>
              Privacy and Security <br /> Your health data is <br />
              safe with us.
            </p>
          </div>
        </div>

        <div className="service-box">
          <div className="service-img">
            <img
              src={serviceImage}
              alt="Service"
              style={{ width: '70px', height: '70px' }}
            />
          </div>
          <div className="service-paragrah">
            <p>
              24/7 service <br /> No need to <br /> wait in clinics.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import '../assets/privacy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
      </header>

      <main className="privacy-content">
        <section>
          <h2>Introduction</h2>
          <p>
            [Our Healthcare] is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you visit our website [http://localhost:3000/HomePage]. Please read this privacy policy carefully. 
            If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section>
          <h2>HIPAA Compliance</h2>
          <p>
            As a healthcare provider, we are committed to complying with the Health Insurance Portability 
            and Accountability Act (HIPAA) and other applicable laws regarding protected health information (PHI). 
            We maintain appropriate administrative, physical, and technical safeguards to protect the confidentiality, 
            integrity, and availability of your health information.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, date of birth, contact information, insurance details, and medical history.</li>
            <li><strong>Health Information:</strong> Medical conditions, treatments, medications, and other health-related data.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, operating system, and usage details.</li>
            <li><strong>Cookies:</strong> We may use cookies to enhance your experience on our site.</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide and maintain our medical services</li>
            <li>To process appointments and medical requests</li>
            <li>To communicate with you about your health care</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
            <li>For billing and payment processing</li>
          </ul>
        </section>

        <section>
          <h2>Disclosure of Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul>
            <li>With healthcare providers involved in your treatment</li>
            <li>With your insurance company for payment purposes</li>
            <li>When required by law or to protect rights</li>
            <li>With service providers who assist in our operations (under confidentiality agreements)</li>
            <li>With your explicit consent for other purposes</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal and health information. 
            These include encryption, access controls, secure servers, and regular security assessments. 
            However, no electronic transmission or storage is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li>Right to access and receive a copy of your health records</li>
            <li>Right to request corrections to inaccurate information</li>
            <li>Right to request restrictions on certain uses and disclosures</li>
            <li>Right to receive an accounting of disclosures</li>
            <li>Right to request deletion of your data in certain circumstances</li>
          </ul>
          <p>To exercise these rights, please contact us using the information below.</p>
        </section>

        <section>
          <h2>Third-Party Websites</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
            or content of these external sites. We encourage you to review their privacy policies before providing any information.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
            information from children under 13. If we learn we have collected such information, we will delete it promptly.
          </p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy 
            Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <address>
            [Shrouk Anwar Gbr]<br />
            [Address]<br />
            [4 Sheikh Nour Eldin,off Thawra St. 11345, Egypt]<br />
            Phone: [+2011793252231]<br />
            Email: [S.Anwar4432@gmail.com]<br />
          </address>
        </section>
      </main>

      <footer className="privacy-footer">
        <p>© {new Date().getFullYear()} [Your Medical Website Name]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
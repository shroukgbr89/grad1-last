import React, { useState } from 'react';
import '../assets/signup.css';
import img1 from '../assets/img/dd.jpg';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../config/firebase"; // Adjust path if needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    Email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { fullName, Email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,Email, password);
      const user = userCredential.user;
  
      // Save user details to Firestore under /Doctors/
      await setDoc(doc(db, "Doctors", user.uid), {
        fullName: fullName,
        Email: Email, // Save the normalized email to Firestore
        password: password, // Store password in Firestore (not recommended for production)
      });
      setSuccess("Account created successfully!");
      console.log("User registered and stored in Firestore:", fullName, Email);
      navigate('/Login'); // Redirect to Login page
  
      // Clear the form
      setFormData({
        fullName: '',
        Email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setError(error.message);
      console.error("Error creating account:", error);
    }
  };  

  return (
    <div className="container">
      <div className="form-container">
        <h1>Sign Up</h1>
        <p>Enter your credentials to create your account</p>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <input
            type="Email"
            name="Email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="image-container">
        <img src={img1} alt="Doctor Icon" className="doctor-icon" />
      </div>
    </div>
  );
};

export default Signup;

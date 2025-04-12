import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Login.css';
import doctor from '../assets/img/login.webp';
import { app } from '../config/firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
  
    try {
      const db = getFirestore(app);
      const usersCollection = collection(db, 'Doctors');
      const q = query(usersCollection, where('Email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
  
        if (userData.password === password) {
          setMessage({ text: 'Login successful!', type: 'success' });
          const isAdmin = email === 'admin@gmail.com' && password === 'adminuser123';
          const userWithAdminFlag = { ...userData, admin: isAdmin };
  
          localStorage.setItem('userData', JSON.stringify(userWithAdminFlag)); // Store user data
          onLogin(email, userDoc.id);
  
          if (isAdmin) {
            setTimeout(() => navigate('/homepage'), 1000);
          } else {
            setTimeout(() => navigate('/appointments'), 1000);
          }
        } else {
          setMessage({ text: 'Invalid password. Please try again.', type: 'error' });
        }
      } else {
        setMessage({ text: 'No user found with this email.', type: 'error' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage({ text: 'An error occurred during login. Please try again.', type: 'error' });
  }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1>Get Started Now</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="xyz@xyz.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {message.text && (
            <p className={message.type === 'success' ? 'success-message' : 'error-message'}>
              {message.text}
            </p>
          )}

          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      <div className="image-section">
        <img src={doctor} alt="Doctor Icon" />
        <div className="decorative-shapes"></div>
      </div>
    </div>
  );
};

export default LoginPage;
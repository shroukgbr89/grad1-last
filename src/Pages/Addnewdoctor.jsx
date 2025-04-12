import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating random UID
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../assets/Add.css";

export default function Addnewdoctor() {
  const [form, setForm] = useState({
    fullName: '',
    Email: '',
    Specialization: '',
    about: '',
    Days: [], 
    Start: '',
    Duration: '',
    Visits: '',
    UID: uuidv4() 
  });
  const db = getFirestore(app);
  const navigate = useNavigate();
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Days') {
      // Update Days as an array
      setForm({ ...form, Days: value.split(',').map(day => day.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  // Handle form submission to add new doctor
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'Doctors'), form); // Add document to Firestore
      alert('Doctor added successfully!');
      setForm({ 
        fullName: '',
        Email: '',
        Specialization: '',
        about: '',
        Days: [], 
        Start: '',
        Duration: '',
        Visits: '',
        UID: uuidv4() 
      });
      navigate('/doctorlist');
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add New Doctor</h1>
      <form onSubmit={handleAddDoctor} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </label>
        <label>
          Specialization:
          <input
            type="text"
            name="Specialization"
            value={form.Specialization}
            onChange={handleInputChange}
            placeholder="Specialization"
          />
        </label>
        <label>
          About:
          <textarea
            name="about"
            value={form.about}
            onChange={handleInputChange}
            placeholder="About"
          />
        </label>
        <label>
          Days Available (comma separated):
          <input
            type="text"
            name="Days"
            value={form.Days.join(', ')}
            onChange={handleInputChange}
            placeholder="Days Available (e.g., Monday, Tuesday)"
          />
        </label>
        <label>
          Start Time:
          <input
            type="text"
            name="Start"
            value={form.Start}
            onChange={handleInputChange}
            placeholder="Start Time"
          />
        </label>
        <label>
          Duration:
          <input
            type="text"
            name="Duration"
            value={form.Duration}
            onChange={handleInputChange}
            placeholder="Duration"
          />
        </label>
        <label>
          Visits:
          <input
            type="number"
            name="Visits"
            value={form.Visits}
            onChange={handleInputChange}
            placeholder="Visits"
          />
        </label>
        <button type="submit" style={{ marginTop: '20px', padding: '10px', color: '#fff' }}>
          Add Doctor
        </button>
      </form>
    </div>
  );
}

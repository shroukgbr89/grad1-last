import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase';
import "../assets/Edit.css";

export default function Edit() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState({});
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const docRef = doc(db, 'Doctors', doctorId); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDoctor(data);
          // Ensure Days is properly formatted for the input
          setForm({
            ...data,
            Days: Array.isArray(data.Days) ? data.Days : []
          });
        } else {
          console.error('No such doctor!');
        }
      } catch (error) {
        console.error('Error fetching doctor:', error);
      }
    };

    fetchDoctor();
  }, [db, doctorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Days') {
      setForm({
        ...form,
        [name]: value.split(',').map(day => day.trim()).filter(day => day)
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const docRef = doc(db, 'Doctors', doctorId);
      await updateDoc(docRef, form);
      alert('Doctor updated successfully!');
      navigate('/DoctorList');
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('Failed to update doctor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-container">
      <h1 className="edit-title">Edit Doctor</h1>
      <form onSubmit={handleUpdate} className="edit-form">
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={form.fullName || ''}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
          />
        </label>
        
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={form.Email || ''}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </label>
        
        <label>
          Specialization:
          <input
            type="text"
            name="Specialization"
            value={form.Specialization || ''}
            onChange={handleInputChange}
            placeholder="Specialization"
            required
          />
        </label>
        
        <label>
          About:
          <textarea
            name="about"
            value={form.about || ''}
            onChange={handleInputChange}
            placeholder="About the doctor"
          />
        </label>
        
        <label className="days-input">
          Days Available:
          <input
            type="text"
            name="Days"
            value={Array.isArray(form.Days) ? form.Days.join(', ') : ''}
            onChange={handleInputChange}
            placeholder="Monday, Wednesday, Friday"
            required
          />
        </label>
        
        <label>
          Start Time:
          <input
            type="text"
            name="Start"
            value={form.Start || ''}
            onChange={handleInputChange}
            placeholder="e.g., 9 pm"
            required
          />
        </label>
        
        <label>
          Duration:
          <input
            type="text"
            name="Duration"
            value={form.Duration || ''}
            onChange={handleInputChange}
            placeholder="e.g., 20 min"
            required
          />
        </label>
        
        <label>
          Max Visits:
          <input
            type="number"
            name="Visits"
            value={form.Visits || ''}
            onChange={handleInputChange}
            placeholder="e.g., 7"
            min="1"
            required
          />
        </label>
        
        <button type="submit" className="edit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
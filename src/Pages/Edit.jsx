import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase';

export default function Edit() {
  const { doctorId } = useParams(); // Retrieve doctorId from the URL
  const [doctor, setDoctor] = useState({});
  const [form, setForm] = useState({});
  const db = getFirestore(app);
  const navigate = useNavigate();

  // Fetch doctor's data by UID
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const docRef = doc(db, 'Doctors', doctorId); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDoctor(docSnap.data()); // Store fetched data
          setForm(docSnap.data()); // Pre-fill form with data
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
        [name]: value.split(',').map((day) => day.trim()), 
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // Handle form submission and save changes
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'Doctors', doctorId);
      await updateDoc(docRef, form); // Update Firestore document
      alert('Doctor updated successfully!');
      navigate('/DoctorList'); // Redirect back to the list
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Doctor</h1>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={form.fullName || ''}
            onChange={handleInputChange}
            placeholder="Full Name"
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
          />
        </label>
        <label>
          About:
          <textarea
            name="about"
            value={form.about || ''}
            onChange={handleInputChange}
            placeholder="About"
          />
        </label>
        <label>
          Days Available:
          <input
            type="text"
            name="Days"
            value={Array.isArray(form.Days) ? form.Days.join(', ') : ''} // Check if Days is an array before calling join
            onChange={handleInputChange}
            placeholder="Days Available (e.g., Monday, Tuesday)"
          />
        </label>
        <label>
          Start Time:
          <input
            type="text"
            name="Start"
            value={form.Start || ''}
            onChange={handleInputChange}
            placeholder="Start Time"
          />
        </label>
        <label>
          Duration:
          <input
            type="text"
            name="Duration"
            value={form.Duration || ''}
            onChange={handleInputChange}
            placeholder="Duration"
          />
        </label>
        <label>
          Visits:
          <input
            type="number"
            name="Visits"
            value={form.Visits || ''}
            onChange={handleInputChange}
            placeholder="Visits"
          />
        </label>
        <button type="submit" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#357ab7', color: '#fff' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

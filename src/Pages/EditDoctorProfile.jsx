import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/Profile.css';

const Profile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const db = getFirestore(app);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorRef = doc(db, 'Doctors', doctorId);
        const doctorDoc = await getDoc(doctorRef);

        if (doctorDoc.exists()) {
          const normalizedDoctor = Object.keys(doctorDoc.data()).reduce((acc, key) => {
            acc[key.toLowerCase()] = doctorDoc.data()[key];
            return acc;
          }, {});

          setDoctor(normalizedDoctor);
          setFormData(normalizedDoctor);
        } else {
          setError('Doctor not found.');
        }
      } catch (err) {
        console.error('Error fetching doctor: ', err);
        setError('Failed to load doctor data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [db, doctorId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const doctorRef = doc(db, 'Doctors', doctorId);
      await updateDoc(doctorRef, formData);
      setDoctor(formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating doctor profile:', err);
      setError('Failed to update profile.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="profile-container">
      {doctor && (
        <>
          <h1>{isEditing ? <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} /> : doctor.fullname}</h1>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Specialization:</strong> {isEditing ? <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} /> : doctor.specialization || 'Not specified'}</p>
          <p><strong>About:</strong> {isEditing ? <textarea name="about" value={formData.about} onChange={handleChange} /> : doctor.about || 'Not specified'}</p>

          {!doctor.admin && (
            <>
              <p><strong>Days Available:</strong> {isEditing ? <input type="text" name="days" value={formData.days} onChange={handleChange} /> : (doctor.days && Array.isArray(doctor.days) ? doctor.days.join(', ') : 'Not specified')}</p>
              <p><strong>Start Time:</strong> {isEditing ? <input type="text" name="start" value={formData.start} onChange={handleChange} /> : doctor.start || 'Not specified'}</p>
              <p><strong>Duration:</strong> {isEditing ? <input type="text" name="duration" value={formData.duration} onChange={handleChange} /> : doctor.duration || 'Not specified'}</p>
              <p><strong>Visits:</strong> {isEditing ? <input type="text" name="visits" value={formData.visits} onChange={handleChange} /> : doctor.visits || 'Not specified'}</p>
            </>
          )}

          {isEditing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;

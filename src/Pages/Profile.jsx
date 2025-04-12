import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/Profile.css';

const Profile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const db = getFirestore(app);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorRef = doc(db, 'Doctors', doctorId);
        const doctorDoc = await getDoc(doctorRef);

        if (doctorDoc.exists()) {
          // Normalize the keys to lowercase
          const normalizedDoctor = Object.keys(doctorDoc.data()).reduce((acc, key) => {
            acc[key.toLowerCase()] = doctorDoc.data()[key];
            return acc;
          }, {});

          setDoctor(normalizedDoctor);
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
          <h1>{doctor.fullname}</h1>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Specialization:</strong> {doctor.specialization || 'Not specified'}</p>
          <p><strong>About:</strong> {doctor.about || 'Not specified'}</p>

          {/* Show additional fields only if the user is not an admin */}
          {!doctor.admin && (
            <>
              <p><strong>Days Available:</strong> {doctor.days && Array.isArray(doctor.days) ? doctor.days.join(', ') : 'Not specified'}</p>
              <p><strong>Start Time:</strong> {doctor.start || 'Not specified'}</p>
              <p><strong>Duration:</strong> {doctor.duration || 'Not specified'}</p>
              <p><strong>Visits:</strong> {doctor.visits || 'Not specified'}</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/Profile.css';

const Profile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
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
          const data = doctorDoc.data();
          const normalizedDoctor = {
            fullname: data.fullName || data.fullname || '',
            email: data.Email || data.email || '',
            specialization: data.Specialization || data.specialization || '',
            about: data.about || '',
            days: Array.isArray(data.Days) ? data.Days : (data.days || []),
            start: data.Start || data.start || '',
            duration: data.Duration || data.duration || '',
            visits: data.Visits || data.visits || '',
            admin: data.admin || false
          };
          
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDaysChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      days: value.split(',').map(day => day.trim())
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const doctorRef = doc(db, 'Doctors', doctorId);
      
      // Prepare data for Firestore (using original field names)
      const updateData = {
        fullName: formData.fullname,
        Email: formData.email,
        Specialization: formData.specialization,
        about: formData.about,
        Days: formData.days,
        Start: formData.start,
        Duration: formData.duration,
        Visits: formData.visits
      };

      await updateDoc(doctorRef, updateData);
      setDoctor(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating doctor: ', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner"></div>
        <p style={{ textAlign: 'center' }}>Loading doctor information...</p>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="profile-container">
      {doctor && (
        <>
          <div className="profile-header">
            <h1>Dr. {doctor.fullname}</h1>
            {!doctor.admin && (
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="edit-button"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Specialization:</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>About:</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Days Available (comma separated):</label>
                <input
                  type="text"
                  value={formData.days.join(', ')}
                  onChange={handleDaysChange}
                />
              </div>

              <div className="form-group">
                <label>Start Time:</label>
                <input
                  type="text"
                  name="start"
                  value={formData.start}
                  onChange={handleInputChange}
                  placeholder="e.g. 9 AM"
                />
              </div>

              <div className="form-group">
                <label>Duration:</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g. 30 min"
                />
              </div>

              <div className="form-group">
                <label>Max Visits:</label>
                <input
                  type="number"
                  name="visits"
                  value={formData.visits}
                  onChange={handleInputChange}
                />
              </div>

              <button onClick={handleSave} className="save-button">
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <div className="profile-section">
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Specialization:</strong> {doctor.specialization || 'Not specified'}</p>
                <p><strong>About:</strong> {doctor.about || 'Not specified'}</p>
              </div>

              {!doctor.admin && (
                <div className="availability-section">
                  <h2>Availability</h2>
                  <p><strong>Days Available:</strong> {doctor.days && doctor.days.length > 0 ? doctor.days.join(', ') : 'Not specified'}</p>
                  <p><strong>Start Time:</strong> {doctor.start || 'Not specified'}</p>
                  <p><strong>Duration:</strong> {doctor.duration || 'Not specified'}</p>
                  <p><strong>Max Visits:</strong> {doctor.visits || 'Not specified'}</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
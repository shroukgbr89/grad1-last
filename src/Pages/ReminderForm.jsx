import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import '../assets/ReminderForm.css'; 

const ReminderForm = ({ patientId }) => {
  const [formData, setFormData] = useState({
    medication: '',
    dosage: '',
    time: '',
    frequency: 'daily',
    startDate: '',
    endDate: '',
    instructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, 'patients', patientId, 'reminders'), {
        ...formData,
        createdAt: serverTimestamp(),
        isActive: true,
        lastNotified: null
      });
      
      alert('Reminder set successfully!');
      // Reset form
      setFormData({
        medication: '',
        dosage: '',
        time: '',
        frequency: 'daily',
        startDate: '',
        endDate: '',
        instructions: ''
      });
      
    } catch (error) {
      console.error('Error setting reminder:', error);
      alert(`Failed to set reminder: ${error.message}`);
    }
  };

  return (
    <div className="reminder-form-container">
      <h2>Create New Medication Reminder</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="medication">Medication Name*</label>
          <input
            id="medication"
            name="medication"
            type="text"
            value={formData.medication}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dosage">Dosage*</label>
          <input
            id="dosage"
            name="dosage"
            type="text"
            value={formData.dosage}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time*</label>
          <input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="frequency">Frequency*</label>
          <select
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="as_needed">As Needed</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date*</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Additional Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="submit-btn">
          Create Reminder
        </button>
      </form>
    </div>
  );
};

export default ReminderForm;
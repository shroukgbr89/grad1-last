import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import "../assets/Add.css";
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

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
    password: '',
    UID: uuidv4()
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const db = getFirestore(app);
  const navigate = useNavigate();

  const specializationOptions = [
    "General", "Dentist", "Lungs Specialist", "Cardio", "Orthopedic", 
    "Cardiologist", "Surgeon", "Psychiatrist"
  ];

  const weekDays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      Days: checked 
        ? [...prev.Days, value] 
        : prev.Days.filter(day => day !== value)
    }));
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    if (!form.fullName || !form.Email || !form.Specialization || form.Days.length === 0 || !form.password) {
      alert('Please fill in all required fields');
      return;
    }

    // Format the data exactly as specified
    const doctorData = {
      Days: form.Days,
      Duration: `${form.Duration} min`,
      Email: form.Email,
      Specialization: form.Specialization,
      Start: `${form.Start} ${form.TimePeriod || 'am'}`,
      Visits: form.Visits.toString(),
      about: form.about,
      fullName: form.fullName,
      password: form.password,
      UID: form.UID
    };

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'Doctors'), doctorData);
      alert('Doctor added successfully!');
      navigate('/doctorlist');
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-container" style={{width:"100%"}}>
      <h1 className="title">Add New Doctor</h1>
      <form onSubmit={handleAddDoctor} className="form-container" style={{width:"100%", backgroundColor:"white"}}>
        <label>
          Full Name:
          <input 
            type="text" 
            name="fullName" 
            value={form.fullName} 
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
            value={form.Email} 
            onChange={handleInputChange} 
            placeholder="Email" 
            required 
          />
        </label>

        <label>
          Password:
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleInputChange} 
            placeholder="Password" 
            required 
          />
        </label>
        
        <label>
          Specialization:
          <select 
            name="Specialization" 
            value={form.Specialization} 
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Specialization --</option>
            {specializationOptions.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
        </label>
        
        <label>
          About:
          <textarea 
            name="about" 
            value={form.about} 
            onChange={handleInputChange} 
            placeholder="About the doctor" 
          />
        </label>
        
        <fieldset className="days-section">
          <legend>Days Available: (Select at least one)</legend>
          <div className="days-grid">
            {weekDays.map((day, index) => (
              <label key={index} className="day-checkbox">
                <input
                  type="checkbox"
                  value={day}
                  checked={form.Days.includes(day)}
                  onChange={handleCheckboxChange}
                />
                {day}
              </label>
            ))}
          </div>
        </fieldset>
        
        <div className="time-inputs">
          <label>
            Start Time:
            <input 
              type="number" 
              name="Start" 
              value={form.Start} 
              onChange={handleInputChange} 
              placeholder="Hour (e.g., 9)" 
              min="1"
              max="12"
              required
            />
          </label>
          
          <label>
            AM/PM:
            <select 
              name="TimePeriod" 
              value={form.TimePeriod} 
              onChange={handleInputChange}
              required
            >
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </label>
        </div>
        
        <label>
          Duration (minutes):
          <input 
            type="number" 
            name="Duration" 
            value={form.Duration} 
            onChange={handleInputChange} 
            placeholder="e.g., 20" 
            min="1"
            required
          />
        </label>
        
        <label>
          Max Visits per Day:
          <input 
            type="number" 
            name="Visits" 
            value={form.Visits} 
            onChange={handleInputChange} 
            placeholder="e.g., 7" 
            min="1"
            required
          />
        </label>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Doctor'}
        </button>
      </form>
    </div>
  );
}
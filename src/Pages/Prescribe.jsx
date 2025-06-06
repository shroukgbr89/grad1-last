import React, { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc
} from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/Prescribe.css';
import drugsData from '../assets/Dataset/drugs.json'; // Import the JSON file

const Prescribe = () => {
  const [patient, setPatient] = useState(null);
  const [drugName, setDrugName] = useState('');
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const timeOptions = [
    '8 am', '9 am', '10 am', '11 am', '12 pm',
    '1 pm', '2 pm', '3 pm', '4 pm', '5 pm',
    '6 pm', '7 pm', '8 pm', '9 pm', '10 pm',
    '11 pm', '12 am', '1 am', '2 am', '3 am',
    '4 am', '5 am', '6 am', '7 am'
  ];

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('selectedPatient'));
    setPatient(selected);
  }, []);

  // Load drug suggestions based on input
  const loadSuggestions = (input) => {
    if (input.length > 0) {
      const filtered = drugsData.filter(drug => 
        drug.drugName && drug.drugName.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleDrugNameChange = (e) => {
    const value = e.target.value;
    setDrugName(value);
    loadSuggestions(value);
  };

  const handleTimeChange = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSuggestionClick = (drug) => {
    setDrugName(drug.drugName);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);

    if (!drugName || selectedTimes.length === 0) {
      alert('Please enter a drug name and select at least one time.');
      return;
    }

    const newMedication = {
      name: drugName.trim(),
      times: selectedTimes.sort()
    };

    try {
      const q = query(collection(db, 'Drugs'), where('patientId', '==', patient.patientId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const existingData = querySnapshot.docs[0].data();

        const updatedMedications = [...existingData.medications || [], newMedication];

        await updateDoc(docRef, {
          medications: updatedMedications,
          updatedAt: new Date(),
        });

        alert('Prescription updated successfully');
      } else {
        const prescriptionData = {
          doctorId: patient.doctorId,
          patientId: patient.patientId,
          medications: [newMedication],
          createdAt: new Date(),
        };

        await addDoc(collection(db, 'Drugs'), prescriptionData);

        alert('Prescription saved successfully');
      }

      window.location.href = '/appointments';
    } catch (error) {
      console.error('Error saving prescription:', error);
      alert('Failed to save prescription');
    }
  };

  if (!patient) return <p>Loading patient data...</p>;

  return (
    <div className="prescribe-container">
      <h2>Prescribe Medication for {patient.patientName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="drug-input-container">
          <input
            type="text"
            value={drugName}
            onChange={handleDrugNameChange}
            placeholder="Enter drug name..."
            required
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((drug, index) => (
                <li 
                  key={index}
                  onClick={() => handleSuggestionClick(drug)}
                >
                  {drug.drugName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="time-options">
          <label>Select times:</label>
          <div className="checkbox-grid">
            {timeOptions.map((time) => (
              <label key={time}>
                <input
                  type="checkbox"
                  value={time}
                  checked={selectedTimes.includes(time)}
                  onChange={() => handleTimeChange(time)}
                />
                <span>{time}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit">Submit Prescription</button>
      </form>
    </div>
  );
};

export default Prescribe;
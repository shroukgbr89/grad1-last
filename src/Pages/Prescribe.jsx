import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/Prescribe.css';

const Prescribe = () => {
  const [patient, setPatient] = useState(null);
  const [medication, setMedication] = useState('');

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('selectedPatient'));
    setPatient(selected);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);

    try {
      // Split the medication string by commas to create an array of medications
      const medicationArray = medication.split(',').map(item => item.trim()); // Remove extra spaces

      // Query the 'Drugs' collection to check if a prescription for this patient already exists
      const q = query(collection(db, 'Drugs'), where('patientId', '==', patient.patientId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a prescription already exists, update the medications array
        const docRef = querySnapshot.docs[0].ref;
        const existingData = querySnapshot.docs[0].data();

        // Add the new medications at the beginning of the array and remove duplicates
        const updatedMedications = [...new Set([...medicationArray, ...existingData.medications])];

        // Update the document with the new medications array
        await updateDoc(docRef, {
          medications: updatedMedications,
          updatedAt: new Date(), // Update timestamp for modification
        });

        alert('Prescription updated successfully');
      } else {
        // If no prescription exists, create a new one
        const prescriptionData = {
          doctorId: patient.doctorId, // Doctor's ID
          patientId: patient.patientId, // Patient's ID
          medications: medicationArray, // Store medications as an array
          createdAt: new Date(),
        };

        // Add prescription data to the 'Drugs' collection
        await addDoc(collection(db, 'Drugs'), prescriptionData);

        alert('Prescription saved successfully');
      }

      window.location.href = '/appointments'; // redirect back
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
        <textarea
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          placeholder="Enter prescription details separated by commas..."
          required
        />
        <button type="submit">Submit Prescription</button>
      </form>
    </div>
  );
};

export default Prescribe;

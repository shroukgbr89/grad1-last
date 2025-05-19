import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { app } from '../config/firebase';
import '../assets/Prescriptions.css'; // Optional: For your styling

const Prescriptions = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const db = getFirestore(app);
      const userDoctorId = localStorage.getItem('doctorId'); // Get doctor ID from localStorage

      try {
        const q = query(
          collection(db, 'Reservations'),
          where('doctorId', '==', userDoctorId)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handlePrescribe = (patient) => {
    const selectedPatient = {
      patientId: patient.patientId,
      patientName: patient.patientName,
      doctorId: patient.doctorId
    };

    localStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
    navigate('/prescribe');
  };

  if (loading) return <p>Loading patient list...</p>;

  return (
    <div className="prescriptions-container">
      <h2>Write Patient Prescriptions</h2>
      <table className="prescriptions-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Patient Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{patient.patientName}</td>
                <td>
                  <button
                    className="prescribe-button"
                    onClick={() => handlePrescribe(patient)}
                  >
                    Prescribe
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No patients found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Prescriptions;

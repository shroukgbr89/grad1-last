import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import '../assets/Histories.css'; 
import { db } from "../config/firebase";

export default function Histories() {
  const [histories, setHistories] = useState([]);
  const doctorId = localStorage.getItem('doctorId');
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const isAdmin = userData.admin;

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Drugs'));
        const data = [];

        for (const docSnapshot of querySnapshot.docs) {
          const record = docSnapshot.data();

          // For doctors, show only their own records
          if (!isAdmin && record.doctorId !== doctorId) {
            continue; // skip record if not admin and doctorId doesn't match
          }

          // Fetch patient name
          const userDocRef = doc(db, 'users', record.patientId);
          const userDocSnapshot = await getDoc(userDocRef);
          const patientName = userDocSnapshot.exists() ? userDocSnapshot.data().name : 'Unknown Patient';

          // Fetch doctor name only for admins
          let doctorName = '';
          if (isAdmin && record.doctorId) {
            const doctorDocRef = doc(db, 'Doctors', record.doctorId);
            const doctorDocSnapshot = await getDoc(doctorDocRef);
            doctorName = doctorDocSnapshot.exists() ? doctorDocSnapshot.data().fullName : 'Unknown Doctor';
          }

          data.push({ id: docSnapshot.id, ...record, patientName, doctorName });
        }

        setHistories(data);
      } catch (error) {
        console.error('Error fetching patient histories:', error);
      }
    };

    fetchHistories();
  }, [doctorId, isAdmin]);

  return (
    <div className="histories-container">
      <h2>Patient Medical Histories</h2>
      {histories.length === 0 ? (
        <p>No medical histories found for your patients.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              {isAdmin && <th>Doctor Name</th>}
              <th>Medications</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((history) => (
              <tr key={history.id}>
                <td>{history.patientName}</td>
                {isAdmin && <td>{history.doctorName || 'Unknown Doctor'}</td>}
                <td>
                  {history.medications && history.medications.length > 0 ? (
                    <ul>
                      {history.medications.map((med, index) => (
                        <li key={index}>
                          <strong>{med.name}</strong>: {med.times.join(', ')}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'No medications'
                  )}
                </td>
                <td>{history.createdAt?.toDate().toLocaleString() || 'No date'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

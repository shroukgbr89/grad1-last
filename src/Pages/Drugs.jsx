// import React, { useEffect, useState } from 'react';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   getFirestore,
//   doc,
//   setDoc,
//   updateDoc,
// } from 'firebase/firestore';
// import { app } from '../config/firebase';
// import '../assets/Drugs.css';

// const Drugs = ({ doctorId }) => {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [medications, setMedications] = useState(['']);
//   const [loading, setLoading] = useState(true);
//   const [doctorDetails, setDoctorDetails] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const fetchPatients = async () => {
//       const db = getFirestore(app);
//       const reservationsRef = collection(db, 'Reservations');

//       try {
//         const q = query(reservationsRef, where('doctorId', '==', doctorId));
//         const querySnapshot = await getDocs(q);

//         const patientMap = new Map();
//         querySnapshot.forEach((docSnap) => {
//           const data = docSnap.data();
//           if (!patientMap.has(data.patientID)) {
//             patientMap.set(data.patientID, {
//               patientID: data.patientID,
//               patientName: data.patientName,
//               patientPhone: data.patientPhone,
//             });
//           }
//         });

//         setPatients(Array.from(patientMap.values()));

//         if (!querySnapshot.empty) {
//           const firstDoc = querySnapshot.docs[0].data();
//           setDoctorDetails({
//             doctorName: firstDoc.doctorName,
//             specialization: firstDoc.specialization,
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching patients:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (doctorId) {
//       fetchPatients();
//     }
//   }, [doctorId]);

//   const handlePatientSelect = async (patientId) => {
//     const db = getFirestore(app);
//     const drugsRef = collection(db, 'Drugs');

//     try {
//       const q = query(
//         drugsRef,
//         where('doctorId', '==', doctorId),
//         where('patientID', '==', patientId)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const docData = querySnapshot.docs[0].data();
//         setMedications(docData.medications || ['']);
//       } else {
//         setMedications(['']);
//       }

//       setSelectedPatient(patientId);
//     } catch (error) {
//       console.error('Error fetching medications:', error);
//     }
//   };

//   const handleMedicationChange = (index, value) => {
//     const newMedications = [...medications];
//     newMedications[index] = value;
//     setMedications(newMedications);
//   };

//   const addMedicationField = () => {
//     setMedications([...medications, '']);
//   };

//   const removeMedicationField = (index) => {
//     if (medications.length > 1) {
//       const newMedications = [...medications];
//       newMedications.splice(index, 1);
//       setMedications(newMedications);
//     }
//   };

//   const saveMedications = async () => {
//     if (!selectedPatient) {
//       alert('Please select a patient first');
//       return;
//     }

//     const db = getFirestore(app);
//     const drugsRef = collection(db, 'Drugs');

//     try {
//       const q = query(
//         drugsRef,
//         where('doctorId', '==', doctorId),
//         where('patientID', '==', selectedPatient)
//       );
//       const querySnapshot = await getDocs(q);

//       const filteredMeds = medications.filter((med) => med.trim() !== '');

//       if (querySnapshot.empty) {
//         const newDocRef = doc(drugsRef);
//         await setDoc(newDocRef, {
//           doctorId,
//           patientID: selectedPatient,
//           medications: filteredMeds,
//         });
//       } else {
//         const docRef = doc(db, 'Drugs', querySnapshot.docs[0].id);
//         await updateDoc(docRef, {
//           medications: filteredMeds,
//         });
//       }

//       setSuccessMessage('Medications saved successfully!');
//       setTimeout(() => setSuccessMessage(''), 3000);
//     } catch (error) {
//       console.error('Error saving medications:', error);
//       alert('Failed to save medications');
//     }
//   };

//   if (loading) {
//     return <p>Loading patient data...</p>;
//   }

//   return (
//     <div className="drugs-container">
//       <div className="doctor-details">
//         <h2 className="greeting">
//           Hello Dr. {doctorDetails?.doctorName || 'N/A'}, Prescribe Medications
//         </h2>
//       </div>

//       <div className="patient-selection">
//         <h3>Select Patient:</h3>
//         <div className="patient-list">
//           {patients.length > 0 ? (
//             patients.map((patient) => (
//               <button
//                 key={patient.patientID}
//                 className={`patient-button ${selectedPatient === patient.patientID ? 'active' : ''}`}
//                 onClick={() => handlePatientSelect(patient.patientID)}
//               >
//                 {patient.patientName} ({patient.patientPhone})
//               </button>
//             ))
//           ) : (
//             <p>No patients found for this doctor.</p>
//           )}
//         </div>
//       </div>

//       {selectedPatient && (
//         <div className="medications-form">
//           <h3>
//             Medications for{' '}
//             {patients.find((p) => p.patientID === selectedPatient)?.patientName}
//           </h3>

//           {medications.map((med, index) => (
//             <div key={index} className="medication-row">
//               <input
//                 type="text"
//                 value={med}
//                 onChange={(e) => handleMedicationChange(index, e.target.value)}
//                 placeholder="Enter medication name and dosage"
//               />
//               <button
//                 className="remove-button"
//                 onClick={() => removeMedicationField(index)}
//                 disabled={medications.length <= 1}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <div className="buttons-group">
//             <button className="add-button" onClick={addMedicationField}>
//               Add Another Medication
//             </button>
//             <button className="save-button" onClick={saveMedications}>
//               Save Medications
//             </button>
//           </div>

//           {successMessage && <div className="success-message">{successMessage}</div>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Drugs;

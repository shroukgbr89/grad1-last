import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/ListAppointment.css';
import { useNavigate } from 'react-router-dom';

const ListAppointment = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handlePrescribe = (appointment) => {
    navigate('/prescribe', { state: { patientData: appointment } });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setLoggedInUser(userData);

    const fetchAppointments = async () => {
      const db = getFirestore(app);
      const appointmentsRef = collection(db, 'Reservations');

      try {
        let q;

        if (userData?.admin) {
          q = query(appointmentsRef);
        } else if (doctorId) {
          q = query(appointmentsRef, where('doctorId', '==', doctorId));
        } else {
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(q);
        const fetchedAppointments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(fetchedAppointments);

        if (fetchedAppointments.length > 0 && doctorId) {
          const doctorData = fetchedAppointments[0];
          setDoctorDetails({
            doctorName: doctorData.doctorName,
            specialization: doctorData.specialization,
          });
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleCancel = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    const db = getFirestore(app);
    try {
      await deleteDoc(doc(db, 'Reservations', appointmentId));
      setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
      alert('Appointment canceled successfully.');
    } catch (error) {
      console.error('Error canceling appointment:', error);
      alert('Failed to cancel the appointment.');
    }
  };

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  return (
    <div className="appointments-container">
      {loggedInUser?.admin ? (
        <div className="doctor-details">
          <h2 className="greeting">Hello, Admin - All Appointments</h2>
        </div>
      ) : (
        <div className="doctor-details">
          <h2 className="greeting">
            Hello Dr. {doctorDetails?.doctorName || 'N/A'}, Your Appointments
          </h2>
        </div>
      )}
      
      {appointments.length === 0 ? (
        <div className="no-appointments">No appointments found</div>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Time</th>
              <th>Day</th>
              <th>Patient Phone</th>
              <th>Doctor Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.time}</td>
                <td>{appointment.day}</td>
                <td>{appointment.patientPhone}</td>
                <td>{appointment.doctorName || 'N/A'}</td>
                <td>{appointment.status || 'Scheduled'}</td>
                <td className="actions">
                  <button 
                    className="cancel-button" 
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </button>
                  {/* <button 
                    className="prescribe-button" 
                    onClick={() => handlePrescribe(appointment)}
                  >
                    Prescribe
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListAppointment;
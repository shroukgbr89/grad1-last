import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const PatientReminders = ({ doctorId }) => {
  const { patientId } = useParams();
  const [reminders, setReminders] = React.useState([]);

  React.useEffect(() => {
    if (!patientId) return;
    
    const q = query(
      collection(db, 'patients', patientId, 'reminders'),
      where('doctorId', '==', doctorId)
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const remindersData = [];
      querySnapshot.forEach((doc) => {
        remindersData.push({ id: doc.id, ...doc.data() });
      });
      setReminders(remindersData);
    });

    return () => unsubscribe();
  }, [patientId, doctorId]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Medication Reminders</h2>
        <Link 
          to={`/patient/${patientId}/reminders/new`}
          className="btn btn-primary"
        >
          + Add New Reminder
        </Link>
      </div>
      
      <div className="list-group">
        {reminders.length > 0 ? (
          reminders.map(reminder => (
            <div key={reminder.id} className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{reminder.medication}</h5>
                <small>{reminder.time}</small>
              </div>
              <p className="mb-1">Dosage: {reminder.dosage}</p>
              <small>Frequency: {reminder.frequency}</small>
            </div>
          ))
        ) : (
          <div className="alert alert-info">No reminders set for this patient</div>
        )}
      </div>
    </div>
  );
};

export default PatientReminders;
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, getFirestore, addDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../config/firebase';
import '../assets/DoctorChat.css';

const DoctorChat = ({ doctorId }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const db = getFirestore(app);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsQuery = query(collection(db, 'Reservations'), where('doctorId', '==', doctorId));
        const querySnapshot = await getDocs(patientsQuery);

        const fetchedPatients = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPatients(fetchedPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [doctorId, db]);

  const fetchMessages = (patientId) => {
    const messagesQuery = query(collection(db, 'Chats'), where('doctorId', '==', doctorId), where('patientId', '==', patientId));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return unsubscribe;
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setMessages([]); 
    fetchMessages(patient.patientId);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'Chats'), {
        doctorId,
        patientId: selectedPatient.patientId,
        sender: 'doctor',
        message: newMessage.trim(),
        timestamp: new Date(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="doctor-chat-container">
      <div className="patients-list">
        <h2>Your Patients</h2>
        <ul>
          {patients.map((patient) => (
            <li
              key={patient.id}
              className={selectedPatient?.id === patient.id ? 'active' : ''}
              onClick={() => handlePatientSelect(patient)}
            >
              {patient.patientName}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-section">
        {selectedPatient ? (
          <>
            <h2>Chat with {selectedPatient.patientName}</h2>
            <div className="messages-container">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'doctor' ? 'sent' : 'received'}`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="message-input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <p>Select a patient to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default DoctorChat;
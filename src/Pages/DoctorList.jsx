import React, { useEffect, useState, useCallback } from 'react';
import '../assets/Doctorlist.css';
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { app } from "../config/firebase";
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import docc from '../assets/img/q.jpg';

const SPECIALISTS = [
  "General",
  "Dentist",
  "Lungs Specialist",
  "Cardio",
  "Orthopedic",
  "Cardiologist",
  "Surgeon",
  "psychiatrist"
];

export default function Doctorlist() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const navigate = useNavigate();

  const db = getFirestore(app);

  const fetchDoctors = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Doctors"));
      const doctorsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const filteredList = doctorsList.filter(doctor => {
        return doctor.email !== "admin@gmail.com" &&
          doctor.fullName !== "Admin User" &&
          doctor.Specialization !== "Monitor" &&
          doctor.about !== "I am responsible for managing and overseeing all administrative functions, including user registrations, appointment scheduling, and data updates, ensuring seamless operation and efficient healthcare service delivery.";
      });

      setDoctors(filteredList);
      setFilteredDoctors(filteredList);
    } catch (error) {
      console.error("Error fetching doctors: ", error);
    }
  }, [db]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // Filter by specialist
  const handleSpecialistClick = (specialist) => {
    setSelectedSpecialist(specialist);
    if (specialist === '') {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(
        doctors.filter(doctor =>
          doctor.Specialization &&
          doctor.Specialization.toLowerCase().includes(specialist.toLowerCase())
        )
      );
    }
    setSearchQuery('');
  };

  // Search by name
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredDoctors(
      doctors.filter(doctor =>
        doctor.fullName.toLowerCase().includes(query.toLowerCase()) &&
        (selectedSpecialist === '' ||
          (doctor.Specialization &&
            doctor.Specialization.toLowerCase().includes(selectedSpecialist.toLowerCase())))
      )
    );
  };

  const handleViewProfile = (doctorId) => {
    navigate(`/profile/${doctorId}`);
  };

  const handleDelete = async (doctorId) => {
    try {
      await deleteDoc(doc(db, "Doctors", doctorId));
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
      setFilteredDoctors(filteredDoctors.filter(doctor => doctor.id !== doctorId));
      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error("Error deleting doctor: ", error);
    }
  };

  return (
    <section className="doctor-list-page">
      <div className="doctor-list-header">
        <h2>Browse through doctors specialist:</h2>
      </div>
      <div className="doctor-list-content">
        <aside className="doctor-sidebar">
          {SPECIALISTS.map((spec, idx) => (
            <button
              key={spec}
              className={`sidebar-btn${selectedSpecialist === spec ? ' active' : ''}`}
              onClick={() => handleSpecialistClick(spec)}
            >
              {spec}
            </button>
          ))}
          <button
            className={`sidebar-btn${selectedSpecialist === '' ? ' active' : ''}`}
            onClick={() => handleSpecialistClick('')}
          >
            All
          </button>
        </aside>
        <main className="doctor-main">
          <div className="doctor-controls">
           
            <button
              className="btn-add"
              onClick={() => navigate('/add')}
            >
              Add Doctor
            </button>
          </div>
          <div className="cards">
            {filteredDoctors.map(doctor => (
              <div className="card" key={doctor.id}>
                <img src={docc} alt="Doctor" />

                <div className="card-status">
                  <span className="dot-available"></span>
                  <span className="available-text">Available</span>
                </div>
                <h2>Dr. {doctor.fullName}</h2>
                <h5>{doctor.Specialization || "Not specified"}</h5>
                <p>{doctor.about || "Not specified"}</p>
                <div className="actions">
                  <button
                    className="edit"
                    onClick={() => navigate(`/Edit/${doctor.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="view-profile"
                    onClick={() => handleViewProfile(doctor.id)}
                  >
                    <FaEye size={18} color="#6BC2E5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}
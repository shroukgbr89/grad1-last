import React, { useEffect, useState } from 'react';
import '../assets/Doctorlist.css';
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { app } from "../config/firebase"; // Adjust path if needed
import { FaEye } from 'react-icons/fa'; // Import the view profile icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function Doctorlist() {
  const [doctors, setDoctors] = useState([]); // State to store all doctors
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query
  const [filteredDoctors, setFilteredDoctors] = useState([]); // State to store filtered doctors
  const navigate = useNavigate(); // Initialize useNavigate

  const db = getFirestore(app);

  // Fetch all doctors from Firestore
  const fetchDoctors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Doctors"));
      const doctorsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      // Filter out the admin user by matching fullName, email, or any other relevant fields
      const filteredList = doctorsList.filter(doctor => {
        // Filter based on email or other fields you want to check
        return doctor.email !== "admin@gmail.com" &&
               doctor.fullName !== "Admin User" &&
               doctor.Specialization !== "Monitor" &&
               doctor.about !== "I am responsible for managing and overseeing all administrative functions, including user registrations, appointment scheduling, and data updates, ensuring seamless operation and efficient healthcare service delivery.";
      });
  
      setDoctors(filteredList); // Set all doctors excluding the admin
      setFilteredDoctors(filteredList); // Initialize filtered doctors with all doctors except the admin
    } catch (error) {
      console.error("Error fetching doctors: ", error);
    }
  };
  

  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, [db]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter doctors locally based on the search query
    const filtered = doctors.filter(doctor =>
      doctor.fullName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  // Function to handle view profile
  const handleViewProfile = (doctorId) => {
    navigate(`/profile/${doctorId}`); // Navigate to the profile page with doctor ID
  };

  // Function to handle delete
  const handleDelete = async (doctorId) => {
    try {
      await deleteDoc(doc(db, "Doctors", doctorId)); // Delete document from Firestore
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId)); // Update local state
      setFilteredDoctors(filteredDoctors.filter(doctor => doctor.id !== doctorId)); // Update filtered state
      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error("Error deleting doctor: ", error);
    }
  };

  // Function to handle "ALL" button click
  const handleAllClick = () => {
    setSearchQuery(''); // Clear the search query
    fetchDoctors(); // Re-fetch all doctors
  };

  return (
    <>
      <section className="doctor-list">
        <div className="controls">
          <button
            className="btn-all"
            style={{ width: '80px', height: '50px' }}
            onClick={handleAllClick} // Handle "ALL" button click
          >
            ALL
          </button>
          <input
            type="text"
            style={{ width: '170px', height: '52px', marginRight: "900px", marginTop: "8px" }}
            placeholder="Search Doctor Name"
            value={searchQuery}
            onChange={handleSearchChange} // Handle search input change
          />
          <button
            className="btn-add"
            onClick={() => navigate('/add')} // Navigate to Add Doctor page
            style={{ width: '300px', height: '40px' }}
          >
            Add Doctor
          </button>
        </div>
        <div className="cards">
          {filteredDoctors.map(doctor => (
            <div className="card" key={doctor.id}>
              <h2>{doctor.fullName}</h2>
              <h5>{doctor.Specialization || "Not specified"}</h5> {/* Display specialization */}
              <p>{doctor.about || "Not specified"}</p> {/* Display about */}
              <p>Days Available: {doctor.Days && Array.isArray(doctor.Days) ? doctor.Days.join(', ') : 'No days specified'}</p>
              <p>Start Time: {doctor.Start || "Not specified"}</p> {/* Display start time */}
              <p>Visits: {doctor.Visits || "Not specified"}</p> {/* Display visits */}
              <div className="actions">
                <button
                  className="edit"
                  onClick={() => navigate(`/Edit/${doctor.id}`)} // Pass doctor.id dynamically
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => handleDelete(doctor.id)} // Handle delete
                >
                  Delete
                </button>
                {/* Add view profile icon */}
                <button
                  className="view-profile"
                  onClick={() => handleViewProfile(doctor.id)} // Navigate to profile page
                >
                  <FaEye size={18} color="#6BC2E5" /> {/* Adjust size and color as needed */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

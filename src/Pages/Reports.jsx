import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import "../assets/Reports.css";
import { collection, onSnapshot } from 'firebase/firestore';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Line, CartesianGrid, ComposedChart
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const COLORS = ['#1976d2', '#26a69a', '#ffb300', '#ef5350', '#8e24aa', '#43a047', '#f4511e'];

// List of allowed specializations
const ALLOWED_SPECIALIZATIONS = [
  "General",
  "Dentist",
  "Lungs Specialist",
  "Cardio",
  "Orthopedic",
  "Cardiologist",
  "Surgeon",
  "psychiatrist"
];

const Reports = () => {
  const [doctors, setDoctors] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Doctor Statistics
  const [specializationData, setSpecializationData] = useState([]);
  const [doctorVisitsData, setDoctorVisitsData] = useState([]);
  const [availabilityData, setAvailabilityData] = useState([]);

  // Drug Statistics
  const [medicationFrequencyData, setMedicationFrequencyData] = useState([]);
  const [prescriptionTrendData, setPrescriptionTrendData] = useState([]);

  // Reservation Statistics
  const [appointmentsByDayData, setAppointmentsByDayData] = useState([]);
  const [appointmentsByDoctorData, setAppointmentsByDoctorData] = useState([]);

  // User Statistics
  const [userGenderData, setUserGenderData] = useState([]);
  const [userAgeData, setUserAgeData] = useState([]);
  const [userLocationData, setUserLocationData] = useState([]);

  useEffect(() => {
    const unsubDoctors = onSnapshot(collection(db, 'Doctors'), (snap) => {
      const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(docs);

      // Specialization Distribution - filter only allowed specializations
      const specCounts = {};
      ALLOWED_SPECIALIZATIONS.forEach(spec => {
        specCounts[spec] = 0; // Initialize all allowed specializations
      });
      
      docs.forEach(doc => {
        const spec = doc.Specialization || 'Unknown';
        if (ALLOWED_SPECIALIZATIONS.includes(spec)) {
          specCounts[spec] = (specCounts[spec] || 0) + 1;
        }
      });
      
      setSpecializationData(
        Object.entries(specCounts)
          .map(([name, value]) => ({ name, value }))
          .filter(item => item.value > 0) // Only show specializations with doctors
      );

      // Doctor Visits Ranking
      const visitsData = docs
        .filter(doc => doc.Visits && ALLOWED_SPECIALIZATIONS.includes(doc.Specialization))
        .map(doc => ({
          name: doc.fullName,
          visits: parseInt(doc.Visits, 10),
          specialization: doc.Specialization
        }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 5);
      setDoctorVisitsData(visitsData);

      // Availability Heatmap
      const dayCounts = {
        Monday: 0, Tuesday: 0, Wednesday: 0, 
        Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
      };
      docs.forEach(doc => {
        if (ALLOWED_SPECIALIZATIONS.includes(doc.Specialization) && doc.Days && Array.isArray(doc.Days)) {
          doc.Days.forEach(day => {
            if (dayCounts.hasOwnProperty(day)) {
              dayCounts[day]++;
            }
          });
        }
      });
      setAvailabilityData(Object.entries(dayCounts).map(([name, value]) => ({ name, value })));
    });

    const unsubDrugs = onSnapshot(collection(db, 'Drugs'), (snap) => {
      const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDrugs(docs);

      // Medication Frequency
      const medCounts = {};
      docs.forEach(doc => {
        if (doc.medications && Array.isArray(doc.medications)) {
          doc.medications.forEach(med => {
            medCounts[med.name] = (medCounts[med.name] || 0) + 1;
          });
        }
      });
      setMedicationFrequencyData(
        Object.entries(medCounts)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5)
      );

      // Prescription Trend
      const trend = {};
      docs.forEach(doc => {
        if (doc.updatedAt && doc.updatedAt.toDate) {
          const date = doc.updatedAt.toDate();
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          trend[month] = (trend[month] || 0) + 1;
        }
      });
      setPrescriptionTrendData(
        Object.entries(trend)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    });

    const unsubReservations = onSnapshot(collection(db, 'Reservations'), (snap) => {
      const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(docs);

      // Appointments by Day
      const dayCounts = {
        Monday: 0, Tuesday: 0, Wednesday: 0, 
        Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
      };
      docs.forEach(doc => {
        if (dayCounts.hasOwnProperty(doc.day)) {
          dayCounts[doc.day]++;
        }
      });
      setAppointmentsByDayData(Object.entries(dayCounts).map(([name, value]) => ({ name, value })));

      // Appointments by Doctor
      const doctorCounts = {};
      docs.forEach(doc => {
        const doctor = doc.doctorName || 'Unknown';
        doctorCounts[doctor] = (doctorCounts[doctor] || 0) + 1;
      });
      setAppointmentsByDoctorData(
        Object.entries(doctorCounts)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5)
      );
    });

    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
      const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(docs);

      // Gender Distribution
      const genderCounts = { Male: 0, Female: 0};
      docs.forEach(doc => {
        const gender = doc.gender;
        if (gender === 'Male' || gender === 'Female') {
        genderCounts[gender]++;
      }
    });
      setUserGenderData(Object.entries(genderCounts).map(([name, value]) => ({ name, value })));

      // Age Distribution
      const ageGroups = { '0-18': 0, '19-30': 0, '31-50': 0, '51+': 0 };
      docs.forEach(doc => {
        if (doc.dob) {
          const dobParts = doc.dob.split('/');
          if (dobParts.length === 3) {
            const birthYear = parseInt(dobParts[2], 10);
            const age = new Date().getFullYear() - birthYear;
            
            if (age <= 18) ageGroups['0-18']++;
            else if (age <= 30) ageGroups['19-30']++;
            else if (age <= 50) ageGroups['31-50']++;
            else ageGroups['51+']++;
          }
        }
      });
      setUserAgeData(Object.entries(ageGroups).map(([name, value]) => ({ name, value })));

      // Location Distribution
      const locationCounts = {};
      docs.forEach(doc => {
        const location = doc.address || 'Unknown';
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      });
      setUserLocationData(
        Object.entries(locationCounts)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10) // Limit to top 10 locations
      );
    });

    setLoading(false);

    return () => {
      unsubDoctors();
      unsubDrugs();
      unsubReservations();
      unsubUsers();
    };
  }, []);

  if (loading) return <div className="loading">Loading statistics...</div>;

  // Scorecard stats
  const scorecards = [
    { label: 'Doctors', value: doctors.length, icon: '👨‍⚕️' },
    { label: 'Drugs', value: drugs.length, icon: '💊' },
    { label: 'Reservations', value: reservations.length, icon: '📅' },
    { label: 'Patients', value: users.length, icon: '👥' },
    { label: 'Specializations', value: specializationData.length, icon: '🏥' },
    { label: 'Medications', value: medicationFrequencyData.length, icon: '🩺' }
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Healthcare Analytics Dashboard</h1>
      
      {/* Scorecards */}
      <div className="scorecards-container">
        {scorecards.map((card, index) => (
          <div key={index} className="scorecard">
            <div className="scorecard-icon">{card.icon}</div>
            <div className="scorecard-value">{card.value}</div>
            <div className="scorecard-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Doctors Section */}
      <div className="section">
        <h2>Doctors Analytics</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Specialization Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={specializationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {specializationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} doctors`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Top Doctors by Visits</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={doctorVisitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} visits`, 'Visits']}
                  labelFormatter={(name) => {
                    const doctor = doctorVisitsData.find(d => d.name === name);
                    return doctor ? `${name} (${doctor.specialization})` : name;
                  }}
                />
                <Legend />
                <Bar dataKey="visits" fill="#1976d2" name="Number of Visits" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Doctor Availability by Day</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={availabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} doctors`, 'Count']} />
                <Legend />
                <Bar dataKey="value" fill="#26a69a" name="Doctors Available" />
                <Line type="monotone" dataKey="value" stroke="#ffb300" name="Trend" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Reservations Section */}
      <div className="section">
        <h2>Appointment Analytics</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Appointments by Day</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentsByDayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} appointments`, 'Count']} />
                <Legend />
                <Bar dataKey="value" fill="#43a047" name="Appointments" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
              <h3>Top Doctors by Appointments</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  layout="vertical"
                  data={appointmentsByDoctorData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value} appointments`, 'Count']} />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Appointments" />
                </BarChart>
              </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="section">
        <h2>Patient Demographics</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Gender Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userGenderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {userGenderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Age Groups</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userAgeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} patients`, 'Count']} />
                <Legend />
                <Bar dataKey="value" fill="#f4511e" name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Patient Locations</h3>
            <div style={{ height: 300, width: '100%' }}>
              <MapContainer 
                center={[30.0444, 31.2357]} // Default to Cairo coordinates
                zoom={12} 
                style={{ height: '100%', width: '100%', borderRadius: '8px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {userLocationData.filter(loc => loc.name !== 'Unknown').map((location, index) => (
                  <Marker 
                    key={index} 
                    position={[30.0444 + (Math.random() * 0.1 - 0.05), 31.2357 + (Math.random() * 0.1 - 0.05)]} // Randomize near Cairo
                  >
                    <Popup>
                      <strong>{location.name}</strong><br />
                      {location.value} {location.value === 1 ? 'patient' : 'patients'}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
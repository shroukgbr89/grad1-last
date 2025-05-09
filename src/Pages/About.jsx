import React from 'react';
import team1 from '../assets/team/team1.jpg';
import team2 from '../assets/team/team2.jpg';
import team3 from '../assets/team/team3.jpg';
import team4 from '../assets/team/team4.jpg';
import team5 from '../assets/team/team5.jpg';
import '../assets/About.css';

export default function About() {
  const team = [
    {
      image: team1,
      name: 'Dr. Sarah Khaled',
      role: 'Cardiologist',
      description: 'Expert in heart care with 10+ years of clinical experience and research in cardiovascular health.'
    },
    {
      image: team2,
      name: 'Dr. Ahmed Nour',
      role: 'Neurologist',
      description: 'Specialist in brain and nervous system disorders, known for a compassionate approach to patients.'
    },
    {
      image: team3,
      name: 'Dr. Layla Hassan',
      role: 'Pediatrician',
      description: 'Dedicated to children’s health and development, making visits enjoyable for young patients.'
    },
    {
      image: team4,
      name: 'Dr. Omar Fathy',
      role: 'Orthopedic Surgeon',
      description: 'Focused on bone and joint health, providing modern treatment and rehabilitation programs.'
    },
    {
      image: team5,
      name: 'Dr. Mariam Saleh',
      role: 'Dermatologist',
      description: 'Experienced in skin care and cosmetic dermatology with a patient-first approach.'
    }
  ];

  return (
    <div className="about-container">
      <h2>Meet Our Team</h2>
      <div className="team-grid">
        {team.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.image} alt={member.name} className="team-photo" />
            <h3>{member.name}</h3>
            <h4>{member.role}</h4>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

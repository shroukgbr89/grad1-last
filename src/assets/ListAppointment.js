// let appointmentData = []; 
// let currentPage = 1; 
// const rowsPerPage = 50; 

// function loadCSV() {
//     fetch('https://raw.githubusercontent.com/shroukgbr89/Dataset/main/Documents/grad/first%20implement/Dataset/Ourdataset1.csv')
//     .then(response => response.text())
//     .then(data => {
//         Papa.parse(data, {
//             header: true, 
//             skipEmptyLines: true,
//             complete: function(results) {
//                 appointmentData = results.data;
//                 populateTable(appointmentData);
//             },
//             error: function(error) {
//                 console.error('Error loading CSV:', error);
//             }
//         });
//     })
//     .catch(error => {
//         console.error('Failed to fetch CSV:', error);
//     });
// }

// function sortAppointments() {
//     const sortOption = document.getElementById('sort').value;
//     const sortedData = [...appointmentData]; // Copy the data before sorting

//     sortedData.sort((a, b) => {
//         // Sort by 'AppointmentDay' and 'Time'
//         const timeA = a['Time'] ? new Date('1970-01-01T' + a['Time'] + 'Z') : new Date(0);
//         const timeB = b['Time'] ? new Date('1970-01-01T' + b['Time'] + 'Z') : new Date(0);
        
//         // First compare by time
//         if (timeA < timeB) return sortOption === 'asc' ? -1 : 1;
//         if (timeA > timeB) return sortOption === 'asc' ? 1 : -1;

//         // If 'Time' is the same, compare by 'AppointmentDay' (Date)
//         const dateA = a['AppointmentDay'] ? new Date(a['AppointmentDay']) : new Date();
//         const dateB = b['AppointmentDay'] ? new Date(b['AppointmentDay']) : new Date();
        
//         // Compare dates next
//         return sortOption === 'asc' ? dateA - dateB : dateB - dateA;
//     });

//     populateTable(sortedData);
// }


// // Function to populate the table with data
// function populateTable(data) {
//     const tableBody = document.querySelector('.appointment-table tbody');
//     tableBody.innerHTML = '';  // Clear existing rows

//     data.forEach(row => {
//         const tr = document.createElement('tr');
        
//         // Create and append each table cell using the row data
//         const patientIdTd = document.createElement('td');
//         patientIdTd.textContent = row['PatientId'] || 'N/A';
//         tr.appendChild(patientIdTd);

//         const patientNameTd = document.createElement('td');
//         patientNameTd.textContent = row['Patient Name'] || 'N/A';
//         tr.appendChild(patientNameTd);
        
//         const genderTd = document.createElement('td');
//         genderTd.textContent = row['Gender'] || 'N/A';
//         tr.appendChild(genderTd);
        
//         const ageTd = document.createElement('td');
//         ageTd.textContent = row['Age'] || 'N/A';
//         tr.appendChild(ageTd);
        
//         const timeTd = document.createElement('td');
//         timeTd.textContent = row['Time'] || 'N/A';
//         tr.appendChild(timeTd);

//         const appointmentIdTd = document.createElement('td');
//         appointmentIdTd.textContent = row['AppointmentID'] || 'N/A';
//         tr.appendChild(appointmentIdTd);

//         const scheduledDayTd = document.createElement('td');
//         scheduledDayTd.textContent = row['ScheduledDay'] || 'N/A';
//         tr.appendChild(scheduledDayTd);

//         const appointmentDayTd = document.createElement('td');
//         appointmentDayTd.textContent = row['AppointmentDay'] || 'N/A';
//         tr.appendChild(appointmentDayTd);

//         const examinationPlaceTd = document.createElement('td');
//         examinationPlaceTd.textContent = row['Examination place'] || 'N/A';
//         tr.appendChild(examinationPlaceTd);

//         const actionsTd = document.createElement('td');
//         actionsTd.classList.add('actions-cell');
//         actionsTd.innerHTML = `
//             <button class="btn accept-btn">Accept</button>
//             <button class="btn cancel-btn">Cancel</button>
//         `;
//         tr.appendChild(actionsTd);

//         // Append the row to the table body
//         tableBody.appendChild(tr);
//     });
// }

// document.addEventListener('DOMContentLoaded', loadCSV);

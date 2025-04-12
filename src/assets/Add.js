const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Add.html'));
});

// Route to handle form submission
app.post('/submit-doctor', (req, res) => {
  const newDoctor = [
    req.body['doctor-name'],
    req.body.specialization,
    req.body['contact-number'],
    req.body.email,
    req.body.gender,
    req.body.age,
    req.body['date-of-birth'],
    req.body.address,
    req.body['clinic-address'],
  ];

  const filePath = 'Doctors_Dataset.csv';


  const csvLine = `\n${newDoctor.join(',')}`;
  fs.appendFile(filePath, csvLine, (err) => {
    if (err) {
      console.error('Error updating dataset:', err);
      return res.status(500).send('Failed to save doctor.');
    }
    res.send('Doctor added successfully.');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

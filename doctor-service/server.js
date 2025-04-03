const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3004;
let doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', schedule: 'Mon-Fri 9-5' },
    { id: 2, name: 'Dr. Johnson', specialty: 'Pediatrics', schedule: 'Mon-Wed 8-4' }
];

// Get all doctors
app.get('/doctors', (req, res) => {
    res.json(doctors);
});

// Get doctor by ID
app.get('/doctors/:id', (req, res) => {
    const doctor = doctors.find(d => d.id === parseInt(req.params.id));
    if (!doctor) return res.status(404).send('Doctor not found');
    res.json(doctor);
});

app.listen(PORT, () => {
    console.log(`Doctor service running on port ${PORT}`);
});
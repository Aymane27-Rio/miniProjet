const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3001;
let patients = [
    { id: 1, name: 'John Doe', age: 35, medicalHistory: 'Hypertension' },
    { id: 2, name: 'Jane Smith', age: 28, medicalHistory: 'Diabetes' }
];

// Get all patients
app.get('/patients', (req, res) => {
    res.json(patients);
});

// Get patient by ID
app.get('/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    if (!patient) return res.status(404).send('Patient not found');
    res.json(patient);
});

// Create new patient
app.post('/patients', (req, res) => {
    const patient = {
        id: patients.length + 1,
        name: req.body.name,
        age: req.body.age,
        medicalHistory: req.body.medicalHistory
    };
    patients.push(patient);
    res.status(201).json(patient);
});

app.listen(PORT, () => {
    console.log(`Patient service running on port ${PORT}`);
});
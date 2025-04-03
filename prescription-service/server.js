const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3005;
let prescriptions = [
    { id: 1, patientId: 1, doctorId: 1, medication: 'Lisinopril 10mg', dosage: 'Once daily' },
    { id: 2, patientId: 2, doctorId: 2, medication: 'Metformin 500mg', dosage: 'Twice daily' }
];

// Get all prescriptions
app.get('/prescriptions', (req, res) => {
    res.json(prescriptions);
});

// Create new prescription
app.post('/prescriptions', (req, res) => {
    const prescription = {
        id: prescriptions.length + 1,
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        medication: req.body.medication,
        dosage: req.body.dosage
    };
    prescriptions.push(prescription);
    res.status(201).json(prescription);
});

app.listen(PORT, () => {
    console.log(`Prescription service running on port ${PORT}`);
});
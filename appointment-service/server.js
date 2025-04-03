const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3002;
let appointments = [
    { id: 1, patientId: 1, doctorId: 1, date: '2025-04-10', time: '10:00' },
    { id: 2, patientId: 2, doctorId: 2, date: '2025-04-11', time: '14:30' }
];

// Get all appointments
app.get('/appointments', (req, res) => {
    res.json(appointments);
});

// Create new appointment
app.post('/appointments', (req, res) => {
    const appointment = {
        id: appointments.length + 1,
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        date: req.body.date,
        time: req.body.time
    };
    appointments.push(appointment);
    res.status(201).json(appointment);
});

// Get appointments by doctor
app.get('/appointments/doctor/:doctorId', (req, res) => {
    const doctorAppointments = appointments.filter(a => a.doctorId === parseInt(req.params.doctorId));
    res.json(doctorAppointments);
});

app.listen(PORT, () => {
    console.log(`Appointment service running on port ${PORT}`);
});
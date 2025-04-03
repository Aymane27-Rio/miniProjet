const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3002;
let appointments = [
    { id: 1, patientId: 1, doctorId: 1, date: '2025-05-10', time: '09:00', status: 'confirmed' },
    { id: 2, patientId: 2, doctorId: 2, date: '2025-05-11', time: '14:30', status: 'pending' }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Appointment Service</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #fef6f6; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #e74c3c; padding-bottom: 10px; }
            .card { background: #fdedec; padding: 15px; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #e74c3c; }
            .status { display: inline-block; padding: 3px 8px; border-radius: 3px; font-size: 0.8em; }
            .confirmed { background: #d5f5e3; color: #27ae60; }
            .pending { background: #fef9e7; color: #f39c12; }
            .api-link { display: inline-block; margin: 20px 5px; padding: 8px 15px; background: #e74c3c; color: white; text-decoration: none; border-radius: 4px; }
            form { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
            input, select { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #e74c3c; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
            .flex { display: flex; justify-content: space-between; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="flex">
                <h1>Appointment Service</h1>
                <span style="color:#e74c3c">PORT: ${PORT}</span>
            </div>
            
            <h2>Appointments</h2>
            ${appointments.map(a => `
                <div class="card">
                    <h3>Appointment #${a.id}</h3>
                    <p><strong>Patient ID:</strong> ${a.patientId}</p>
                    <p><strong>Doctor ID:</strong> ${a.doctorId}</p>
                    <p><strong>Date:</strong> ${a.date} at ${a.time}</p>
                    <p><strong>Status:</strong> <span class="status ${a.status}">${a.status}</span></p>
                </div>
            `).join('')}
            
            <form id="appointmentForm">
                <h3>Create Appointment</h3>
                <input type="number" name="patientId" placeholder="Patient ID" required>
                <input type="number" name="doctorId" placeholder="Doctor ID" required>
                <input type="date" name="date" required>
                <input type="time" name="time" required>
                <select name="status">
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                </select>
                <button type="submit">Create Appointment</button>
            </form>
            
            <a href="/appointments" class="api-link">View Raw API Data</a>
            <a href="/" class="api-link" style="background:#2c3e50">Refresh</a>
        </div>
        
        <script>
            document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const form = e.target;
                const response = await fetch('/appointments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patientId: parseInt(form.patientId.value),
                        doctorId: parseInt(form.doctorId.value),
                        date: form.date.value,
                        time: form.time.value,
                        status: form.status.value
                    })
                });
                const result = await response.json();
                alert('Appointment created with ID: ' + result.id);
                location.reload();
            });
        </script>
    </body>
    </html>
    `);
});

// REST API endpoints
app.get('/appointments', (req, res) => res.json(appointments));
app.post('/appointments', (req, res) => {
    const appointment = { id: appointments.length + 1, ...req.body };
    appointments.push(appointment);
    res.status(201).json(appointment);
});

app.listen(PORT, () => console.log(`Appointment service running on http://localhost:${PORT}`));
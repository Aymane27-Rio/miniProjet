const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3005;
let prescriptions = [
    { id: 1, patientId: 1, doctorId: 1, medication: 'Lisinopril 10mg', dosage: 'Once daily', date: '2025-04-01' },
    { id: 2, patientId: 2, doctorId: 2, medication: 'Metformin 500mg', dosage: 'Twice daily', date: '2025-04-02' }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Prescription Service</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #fff8f0; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #e67e22; padding-bottom: 10px; }
            .card { background: #fdebd0; padding: 15px; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #e67e22; }
            .api-link { display: inline-block; margin: 20px 5px; padding: 8px 15px; background: #e67e22; color: white; text-decoration: none; border-radius: 4px; }
            form { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
            input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #e67e22; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
            .flex { display: flex; justify-content: space-between; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="flex">
                <h1>Prescription Service</h1>
                <span style="color:#e67e22">PORT: ${PORT}</span>
            </div>
            
            <h2>Prescriptions</h2>
            ${prescriptions.map(p => `
                <div class="card">
                    <h3>Prescription #${p.id}</h3>
                    <p><strong>Patient ID:</strong> ${p.patientId}</p>
                    <p><strong>Doctor ID:</strong> ${p.doctorId}</p>
                    <p><strong>Medication:</strong> ${p.medication}</p>
                    <p><strong>Dosage:</strong> ${p.dosage}</p>
                    <p><strong>Date:</strong> ${p.date}</p>
                </div>
            `).join('')}
            
            <form id="prescriptionForm">
                <h3>Create Prescription</h3>
                <input type="number" name="patientId" placeholder="Patient ID" required>
                <input type="number" name="doctorId" placeholder="Doctor ID" required>
                <input type="text" name="medication" placeholder="Medication" required>
                <input type="text" name="dosage" placeholder="Dosage" required>
                <input type="date" name="date" required>
                <button type="submit">Create Prescription</button>
            </form>
            
            <a href="/prescriptions" class="api-link">View Raw API Data</a>
            <a href="/" class="api-link" style="background:#2c3e50">Refresh</a>
        </div>
        
        <script>
            document.getElementById('prescriptionForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const form = e.target;
                const response = await fetch('/prescriptions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patientId: parseInt(form.patientId.value),
                        doctorId: parseInt(form.doctorId.value),
                        medication: form.medication.value,
                        dosage: form.dosage.value,
                        date: form.date.value
                    })
                });
                const result = await response.json();
                alert('Prescription created with ID: ' + result.id);
                location.reload();
            });
        </script>
    </body>
    </html>
    `);
});

// REST API endpoints
app.get('/prescriptions', (req, res) => res.json(prescriptions));
app.post('/prescriptions', (req, res) => {
    const prescription = { id: prescriptions.length + 1, ...req.body };
    prescriptions.push(prescription);
    res.status(201).json(prescription);
});

app.listen(PORT, () => console.log(`Prescription service running on http://localhost:${PORT}`));
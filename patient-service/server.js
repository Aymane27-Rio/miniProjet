const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3001;
let patients = [
    { id: 1, name: 'John Doe', age: 35, medicalHistory: 'Hypertension' },
    { id: 2, name: 'Jane Smith', age: 28, medicalHistory: 'Diabetes' }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Patient Service</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f9fc; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
            .card { background: #eaf7fd; padding: 15px; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #3498db; }
            .api-link { display: inline-block; margin: 20px 5px; padding: 8px 15px; background: #3498db; color: white; text-decoration: none; border-radius: 4px; }
            form { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
            input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #3498db; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
            .flex { display: flex; justify-content: space-between; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="flex">
                <h1>Patient Service</h1>
                <span style="color:#3498db">PORT: ${PORT}</span>
            </div>
            
            <h2>Patients</h2>
            ${patients.map(p => `
                <div class="card">
                    <h3>${p.name} (ID: ${p.id})</h3>
                    <p><strong>Age:</strong> ${p.age}</p>
                    <p><strong>Medical History:</strong> ${p.medicalHistory}</p>
                </div>
            `).join('')}
            
            <form id="patientForm">
                <h3>Add New Patient</h3>
                <input type="text" name="name" placeholder="Name" required>
                <input type="number" name="age" placeholder="Age" required>
                <textarea name="medicalHistory" placeholder="Medical History"></textarea>
                <button type="submit">Add Patient</button>
            </form>
            
            <a href="/patients" class="api-link">View Raw API Data</a>
            <a href="/" class="api-link" style="background:#2c3e50">Refresh</a>
        </div>
        
        <script>
            document.getElementById('patientForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const form = e.target;
                const response = await fetch('/patients', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: form.name.value,
                        age: form.age.value,
                        medicalHistory: form.medicalHistory.value
                    })
                });
                const result = await response.json();
                alert('Patient added with ID: ' + result.id);
                location.reload();
            });
        </script>
    </body>
    </html>
    `);
});

// REST API endpoints
app.get('/patients', (req, res) => res.json(patients));
app.get('/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    res.json(patient || { error: 'Patient not found' });
});
app.post('/patients', (req, res) => {
    const patient = { id: patients.length + 1, ...req.body };
    patients.push(patient);
    res.status(201).json(patient);
});

app.listen(PORT, () => console.log(`Patient service running on http://localhost:${PORT}`));
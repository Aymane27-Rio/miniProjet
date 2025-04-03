const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3004;
let doctors = [
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', schedule: 'Mon-Fri 9am-5pm' },
    { id: 2, name: 'Dr. Johnson', specialty: 'Pediatrics', schedule: 'Mon-Wed 8am-4pm' }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Doctor Service</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f8f5ff; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #9b59b6; padding-bottom: 10px; }
            .card { background: #f0ebfa; padding: 15px; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #9b59b6; }
            .api-link { display: inline-block; margin: 20px 5px; padding: 8px 15px; background: #9b59b6; color: white; text-decoration: none; border-radius: 4px; }
            form { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
            input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #9b59b6; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
            .flex { display: flex; justify-content: space-between; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="flex">
                <h1>Doctor Service</h1>
                <span style="color:#9b59b6">PORT: ${PORT}</span>
            </div>
            
            <h2>Doctors</h2>
            ${doctors.map(d => `
                <div class="card">
                    <h3>${d.name} (ID: ${d.id})</h3>
                    <p><strong>Specialty:</strong> ${d.specialty}</p>
                    <p><strong>Schedule:</strong> ${d.schedule}</p>
                </div>
            `).join('')}
            
            <form id="doctorForm">
                <h3>Add New Doctor</h3>
                <input type="text" name="name" placeholder="Name" required>
                <input type="text" name="specialty" placeholder="Specialty" required>
                <input type="text" name="schedule" placeholder="Schedule" required>
                <button type="submit">Add Doctor</button>
            </form>
            
            <a href="/doctors" class="api-link">View Raw API Data</a>
            <a href="/" class="api-link" style="background:#2c3e50">Refresh</a>
        </div>
        
        <script>
            document.getElementById('doctorForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const form = e.target;
                const response = await fetch('/doctors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: form.name.value,
                        specialty: form.specialty.value,
                        schedule: form.schedule.value
                    })
                });
                const result = await response.json();
                alert('Doctor added with ID: ' + result.id);
                location.reload();
            });
        </script>
    </body>
    </html>
    `);
});

// REST API endpoints
app.get('/doctors', (req, res) => res.json(doctors));
app.post('/doctors', (req, res) => {
    const doctor = { id: doctors.length + 1, ...req.body };
    doctors.push(doctor);
    res.status(201).json(doctor);
});

app.listen(PORT, () => console.log(`Doctor service running on http://localhost:${PORT}`));
const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3006;
let labTests = [
    { id: 1, patientId: 1, testType: 'Blood Test', result: 'Normal', status: 'completed', date: '2025-04-01' },
    { id: 2, patientId: 2, testType: 'X-Ray', result: 'Pending', status: 'in-progress', date: '2025-04-02' }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Lab Service</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f0f9fb; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #1abc9c; padding-bottom: 10px; }
            .card { background: #e0f7fa; padding: 15px; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #1abc9c; }
            .status { display: inline-block; padding: 3px 8px; border-radius: 3px; font-size: 0.8em; }
            .completed { background: #d5f5e3; color: #27ae60; }
            .in-progress { background: #fef9e7; color: #f39c12; }
            .api-link { display: inline-block; margin: 20px 5px; padding: 8px 15px; background: #1abc9c; color: white; text-decoration: none; border-radius: 4px; }
            form { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
            input, select, textarea { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #1abc9c; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
            .flex { display: flex; justify-content: space-between; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="flex">
                <h1>Lab Service</h1>
                <span style="color:#1abc9c">PORT: ${PORT}</span>
            </div>
            
            <h2>Lab Tests</h2>
            ${labTests.map(t => `
                <div class="card">
                    <h3>Test #${t.id} (${t.testType})</h3>
                    <p><strong>Patient ID:</strong> ${t.patientId}</p>
                    <p><strong>Status:</strong> <span class="status ${t.status.replace(' ', '-')}">${t.status}</span></p>
                    <p><strong>Result:</strong> ${t.result}</p>
                    <p><strong>Date:</strong> ${t.date}</p>
                </div>
            `).join('')}
            
            <form id="labTestForm">
                <h3>Create Lab Test</h3>
                <input type="number" name="patientId" placeholder="Patient ID" required>
                <input type="text" name="testType" placeholder="Test Type" required>
                <input type="date" name="date" required>
                <select name="status">
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <textarea name="result" placeholder="Result">Pending</textarea>
                <button type="submit">Create Test</button>
            </form>
            
            <a href="/labtests" class="api-link">View Raw API Data</a>
            <a href="/" class="api-link" style="background:#2c3e50">Refresh</a>
        </div>
        
        <script>
            document.getElementById('labTestForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const form = e.target;
                const response = await fetch('/labtests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        patientId: parseInt(form.patientId.value),
                        testType: form.testType.value,
                        date: form.date.value,
                        status: form.status.value,
                        result: form.result.value
                    })
                });
                const result = await response.json();
                alert('Lab test created with ID: ' + result.id);
                location.reload();
            });
        </script>
    </body>
    </html>
    `);
});

// REST API endpoints
app.get('/labtests', (req, res) => res.json(labTests));
app.post('/labtests', (req, res) => {
    const labTest = { id: labTests.length + 1, ...req.body };
    labTests.push(labTest);
    res.status(201).json(labTest);
});

app.listen(PORT, () => console.log(`Lab service running on http://localhost:${PORT}`));
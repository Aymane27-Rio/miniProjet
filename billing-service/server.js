const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3003;
let bills = [
    { id: 1, appointmentId: 1, amount: 150.00, status: 'paid', date: '2025-04-01' },
    { id: 2, appointmentId: 2, amount: 200.00, status: 'pending', date: '2025-04-02' }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Billing Service</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f0fdf0; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #2ecc71; padding-bottom: 10px; }
            .card { background: #e8f8f0; padding: 15px; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #2ecc71; }
            .status { display: inline-block; padding: 3px 8px; border-radius: 3px; font-size: 0.8em; }
            .paid { background: #d5f5e3; color: #27ae60; }
            .pending { background: #fef9e7; color: #f39c12; }
            .api-link { display: inline-block; margin: 20px 5px; padding: 8px 15px; background: #2ecc71; color: white; text-decoration: none; border-radius: 4px; }
            form { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
            input, select { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #2ecc71; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
            .flex { display: flex; justify-content: space-between; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="flex">
                <h1>Billing Service</h1>
                <span style="color:#2ecc71">PORT: ${PORT}</span>
            </div>
            
            <h2>Bills</h2>
            ${bills.map(b => `
                <div class="card">
                    <h3>Bill #${b.id}</h3>
                    <p><strong>Appointment ID:</strong> ${b.appointmentId}</p>
                    <p><strong>Amount:</strong> $${b.amount.toFixed(2)}</p>
                    <p><strong>Status:</strong> <span class="status ${b.status}">${b.status}</span></p>
                    <p><strong>Date:</strong> ${b.date}</p>
                </div>
            `).join('')}
            
            <form id="billForm">
                <h3>Create Bill</h3>
                <input type="number" name="appointmentId" placeholder="Appointment ID" required>
                <input type="number" step="0.01" name="amount" placeholder="Amount" required>
                <input type="date" name="date" required>
                <select name="status">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                </select>
                <button type="submit">Create Bill</button>
            </form>
            
            <a href="/bills" class="api-link">View Raw API Data</a>
            <a href="/" class="api-link" style="background:#2c3e50">Refresh</a>
        </div>
        
        <script>
            document.getElementById('billForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const form = e.target;
                const response = await fetch('/bills', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        appointmentId: parseInt(form.appointmentId.value),
                        amount: parseFloat(form.amount.value),
                        date: form.date.value,
                        status: form.status.value
                    })
                });
                const result = await response.json();
                alert('Bill created with ID: ' + result.id);
                location.reload();
            });
        </script>
    </body>
    </html>
    `);
});

// REST API endpoints
app.get('/bills', (req, res) => res.json(bills));
app.post('/bills', (req, res) => {
    const bill = { id: bills.length + 1, ...req.body };
    bills.push(bill);
    res.status(201).json(bill);
});

app.listen(PORT, () => console.log(`Billing service running on http://localhost:${PORT}`));
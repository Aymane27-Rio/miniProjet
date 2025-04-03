const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3007;
let notifications = [
    { id: 1, recipientId: 1, message: 'Your appointment is confirmed', type: 'appointment', date: '2025-04-01', read: false },
    { id: 2, recipientId: 2, message: 'Your lab results are ready', type: 'lab', date: '2025-04-02', read: true }
];

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Notification Service</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #fffdf0; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #f1c40f; padding-bottom: 10px; }
            .card { background: #fef9e7; padding: 15px; margin-bottom: 15px; border-radius: 5px; border-left: 4px solid #f1c40f; }
            .unread { border-left: 4px solid #e74c3c; background: #fdedec; }
            .type { display: inline-block; padding: 3px 8px; border-radius: 3px; font-size: 0.8em; }
            .appointment { background: #eaf2f8; color: #3498db; }
            .lab { background: #e8f8f0; color: #2ecc71; }
            .api-link { display: inline-block; margin: 20px 5px; padding: 8px 15px; background: #f1c40f; color: white; text-decoration: none; border-radius: 4px; }
            form { margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 5px; }
            input, select, textarea { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #f1c40f; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
            .flex { display: flex; justify-content: space-between; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="flex">
                <h1>Notification Service</h1>
                <span style="color:#f1c40f">PORT: ${PORT}</span>
            </div>
            
            <h2>Notifications</h2>
            ${notifications.map(n => `
                <div class="card ${n.read ? '' : 'unread'}">
                    <h3>${n.message}</h3>
                    <p><strong>Recipient ID:</strong> ${n.recipientId}</p>
                    <p><strong>Type:</strong> <span class="type ${n.type}">${n.type}</span></p>
                    <p><strong>Date:</strong> ${n.date}</p>
                    <p><strong>Status:</strong> ${n.read ? 'Read' : 'Unread'}</p>
                </div>
            `).join('')}
            
            <form id="notificationForm">
                <h3>Send Notification</h3>
                <input type="number" name="recipientId" placeholder="Recipient ID" required>
                <input type="text" name="message" placeholder="Message" required>
                <select name="type">
                    <option value="appointment">Appointment</option>
                    <option value="lab">Lab</option>
                    <option value="payment">Payment</option>
                </select>
                <input type="date" name="date" required>
                <select name="read">
                    <option value="false">Unread</option>
                    <option value="true">Read</option>
                </select>
                <button type="submit">Send Notification</button>
            </form>
            
            <a href="/notifications" class="api-link">View Raw API Data</a>
            <a href="/" class="api-link" style="background:#2c3e50">Refresh</a>
        </div>
        
        <script>
            document.getElementById('notificationForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const form = e.target;
                const response = await fetch('/notifications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        recipientId: parseInt(form.recipientId.value),
                        message: form.message.value,
                        type: form.type.value,
                        date: form.date.value,
                        read: form.read.value === 'true'
                    })
                });
                const result = await response.json();
                alert('Notification sent with ID: ' + result.id);
                location.reload();
            });
        </script>
    </body>
    </html>
    `);
});

// REST API endpoints
app.get('/notifications', (req, res) => res.json(notifications));
app.post('/notifications', (req, res) => {
    const notification = { id: notifications.length + 1, ...req.body };
    notifications.push(notification);
    res.status(201).json(notification);
});

app.listen(PORT, () => console.log(`Notification service running on http://localhost:${PORT}`));
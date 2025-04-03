const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3007;
let notifications = [
    { id: 1, recipientId: 1, message: 'Your appointment is confirmed', type: 'appointment' },
    { id: 2, recipientId: 2, message: 'Your lab results are ready', type: 'lab' }
];

// Get all notifications
app.get('/notifications', (req, res) => {
    res.json(notifications);
});

// Create notification
app.post('/notifications', (req, res) => {
    const notification = {
        id: notifications.length + 1,
        recipientId: req.body.recipientId,
        message: req.body.message,
        type: req.body.type
    };
    notifications.push(notification);
    console.log(`Notification sent: ${notification.message}`);
    res.status(201).json(notification);
});

app.listen(PORT, () => {
    console.log(`Notification service running on port ${PORT}`);
});
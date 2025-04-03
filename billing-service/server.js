const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3003;
let bills = [
    { id: 1, appointmentId: 1, amount: 150, status: 'paid' },
    { id: 2, appointmentId: 2, amount: 200, status: 'pending' }
];

// Get all bills
app.get('/bills', (req, res) => {
    res.json(bills);
});

// Create bill for appointment
app.post('/bills', (req, res) => {
    const bill = {
        id: bills.length + 1,
        appointmentId: req.body.appointmentId,
        amount: req.body.amount,
        status: 'pending'
    };
    bills.push(bill);
    res.status(201).json(bill);
});

// Update bill status
app.patch('/bills/:id', (req, res) => {
    const bill = bills.find(b => b.id === parseInt(req.params.id));
    if (!bill) return res.status(404).send('Bill not found');
    bill.status = req.body.status;
    res.json(bill);
});

app.listen(PORT, () => {
    console.log(`Billing service running on port ${PORT}`);
});
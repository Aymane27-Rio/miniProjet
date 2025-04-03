const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3006;
let labTests = [
    { id: 1, patientId: 1, testType: 'Blood Test', result: 'Normal', status: 'completed' },
    { id: 2, patientId: 2, testType: 'X-Ray', result: 'Pending', status: 'in-progress' }
];

// Get all lab tests
app.get('/labtests', (req, res) => {
    res.json(labTests);
});

// Create lab test
app.post('/labtests', (req, res) => {
    const labTest = {
        id: labTests.length + 1,
        patientId: req.body.patientId,
        testType: req.body.testType,
        result: 'Pending',
        status: 'in-progress'
    };
    labTests.push(labTest);
    res.status(201).json(labTest);
});

// Update lab test result
app.patch('/labtests/:id', (req, res) => {
    const labTest = labTests.find(t => t.id === parseInt(req.params.id));
    if (!labTest) return res.status(404).send('Lab test not found');
    labTest.result = req.body.result;
    labTest.status = 'completed';
    res.json(labTest);
});

app.listen(PORT, () => {
    console.log(`Lab service running on port ${PORT}`);
});
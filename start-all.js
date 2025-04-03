const { exec } = require('child_process');

const services = [
    { name: 'Patient', port: 3001, path: './patient-service' },
    { name: 'Appointment', port: 3002, path: './appointment-service' },
    { name: 'Billing', port: 3003, path: './billing-service' },
    { name: 'Doctor', port: 3004, path: './doctor-service' },
    { name: 'Prescription', port: 3005, path: './prescription-service' },
    { name: 'Lab', port: 3006, path: './lab-service' },
    { name: 'Notification', port: 3007, path: './notification-service' }
];

services.forEach(service => {
    exec(`cd ${service.path} && npm start`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting ${service.name} service: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr from ${service.name} service: ${stderr}`);
            return;
        }
        console.log(`${service.name} service started on port ${service.port}`);
    });
});
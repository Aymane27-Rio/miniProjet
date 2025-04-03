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
    console.log(`Starting ${service.name} service...`);
    exec(`node ${service.path}/server.js`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting ${service.name} service: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr from ${service.name} service: ${stderr}`);
            return;
        }
        console.log(stdout);
    });
});

console.log('All services are starting...');
console.log('Access them at:');
services.forEach(service => {
    console.log(`${service.name}: http://localhost:${service.port}`);
});
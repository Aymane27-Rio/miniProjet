## Project structure

myheart-healthcare/
├── patient-service/         # Patient management

├── appointment-service/     # Appointment scheduling

├── billing-service/         # Financial transactions

├── doctor-service/          # Doctor information

├── prescription-service/    # Medication prescriptions

├── lab-service/            # Lab test management

├── notification-service/    # Notification system

├── start-all.js            # Script to start all services

└── README.md               # This documentation (you are here by the way)

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git

## To make it work
```bash
cd patient-service && npm install && cd ..
cd appointment-service && npm install && cd ..
cd billing-service && npm install && cd ..
cd doctor-service && npm install && cd ..
cd prescription-service && npm install && cd ..
cd lab-service && npm install && cd ..
cd notification-service && npm install && cd ..
```
then in the root folder
```bash
node start-all.js


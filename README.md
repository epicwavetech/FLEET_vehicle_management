# FLEET - Admin Dashboard

### Developed by Epicewave/SUGOGOi

[Live Demo](https://vehicle-management-client-one.vercel.app/)

---

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

---

## About the Project
FLEET is a comprehensive MERN stack admin dashboard designed for efficient vehicle and client management. It features robust table management functionalities, JWT-based authentication for secure access, and state-of-the-art file storage integration using Cloudinary. The dashboard supports data export in XLSX format, ensuring seamless data sharing and analysis.

---

## Features
- **Authentication**:
  - Secure JWT cookies-based authentication.
  - Role-based access control.

- **Data Management**:
  - Dynamic tables for managing clients, vehicles, and other entities.
  - Download data in XLSX format for offline use.

- **File Storage**:
  - Integrated with Cloudinary for efficient and secure file uploads and storage.

- **State Management**:
  - Powered by Zustand for efficient and scalable state handling.


- **Testing Deployment**:
  - Live version available at [https://vehicle-management-client-one.vercel.app/](https://vehicle-management-client-one.vercel.app/).

---

## Technologies Used
- **Frontend**:
  - React.js
  - Zustand (State Management)
  - SCSS (for styling)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Database)
  - JWT (Authentication)

- **File Storage**:
  - Cloudinary

- **Other Tools**:
  - XLSX.js (for data export)
  - Vercel (for deployment)

---

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or cloud-based)
- Cloudinary account for file storage

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SUGOGOi/FLEET_vehicle_management
   cd FLEET
   ```

2. **Backend Setup**:
   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     FRONTEND_URL=your_frontend_url
     NODE_ENV=dev_or_production
     CLOUDINARY_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the `client` directory:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the following:
     ```env
     REACT_APP_API_URL=your_backend_api_url
     ```
   - Start the frontend application:
     ```bash
     npm start
     ```

4. **Access the Application**:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)

---

## Usage
- Log in using your admin credentials.
- Manage clients, vehicles, and other entities via dynamic tables.
- Upload files to Cloudinary for secure storage.
- Download client data in XLSX format.

---

## Screenshots

### Login Page
![Login Page](https://res.cloudinary.com/dikx4aj2f/image/upload/v1735596127/Screenshot_23_drtvf1.png)

### Dashboard Overview
![Dashboard](https://res.cloudinary.com/dikx4aj2f/image/upload/v1735596127/Screenshot_27_kswvx7.png)

### Table Management
![Table Management](https://res.cloudinary.com/dikx4aj2f/image/upload/v1735596127/Screenshot_25_zvqsyq.png)

---

## Future Enhancements
- Add user activity logs.
- Implement advanced filtering and sorting for tables.
- Support for additional export formats (CSV, PDF).
- Add multi-language support.



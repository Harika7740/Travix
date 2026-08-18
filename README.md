# TRAVIX - Safety-First Ride-Hailing Web Application

![TRAVIX Banner](https://img.shields.io/badge/TRAVIX-Production--Ready-0066FF?style=for-the-badge&logo=flutter)
![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile-brightgreen?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-83CD29?style=for-the-badge&logo=nodedotjs)
![Database](https://img.shields.io/badge/Database-Cloud%20Firestore-FFCA28?style=for-the-badge&logo=firebase)

**TRAVIX** is a full-featured, safety-centric ride-hailing web platform engineered with **Flutter Web**, **Node.js + Express.js**, **Firebase Authentication**, **Cloud Firestore**, and **Firebase Storage**. 

TRAVIX prioritizes passenger and driver security with dedicated features like **Guardian Mode**, **Voice SOS Alerts**, **Night Mode Protection**, **Gender-Matched Rides**, **Female Driver Priority**, and **Unsafe Zone Geofencing**.

---

## 🌟 Key Features

### 👤 1. User Portal (Passenger)
- **User Registration & Authentication**: Firebase Auth + JWT token management.
- **Profile Management**: Personal details, emergency contacts, profile photos.
- **Ride Booking & Fare Estimation**: Real-time fare calculation based on distance, time, night surge, and gender preferences.
- **Gender-Based Ride Matching**: Option for female passengers to prioritize female drivers.
- **Guardian Mode**: Automatically streams real-time location and trip progress to trusted emergency contacts.
- **Voice SOS Activation**: Hands-free acoustic trigger for silent distress signals to admin and emergency contacts.
- **Night Mode Protection**: Automated enhanced tracking, driver verification check-ins, and guardian updates between 10 PM and 6 AM.
- **Ride & Payment History**: Detailed trip logs with downloadable PDF invoices.
- **Notification Center**: Real-time alerts for ride status, driver arrival, and safety broadcasts.

### 🚗 2. Driver Portal
- **Driver Registration & Vehicle Onboarding**: Upload vehicle documents, license, insurance, and photo IDs.
- **Verification Workflow**: Document submission tracking and approval status.
- **Ride Request Dispatch**: Real-time modal prompts to Accept/Reject incoming ride requests with trip details.
- **Trip Execution**: Navigation simulator with ride phase controls (Arrived at Pickup, Start Trip, Complete Trip).
- **Earnings & Ratings Dashboard**: Weekly/daily earnings summary, completed trip counts, and passenger rating feedback.
- **Online/Offline Status Switch**: Toggle availability to receive ride dispatches.

### ⚙️ 3. Admin Dashboard
- **Analytics Hub**: System-wide statistics (Active rides, registered users/drivers, total revenue, active SOS alerts).
- **Driver Verification Workspace**: Inspect uploaded driver documents and approve/reject driver applications.
- **Live Active Ride Tracker**: Interactive real-time map displaying all current vehicles, routes, and trip status.
- **SOS & Guardian Alert Monitor**: High-priority real-time feed for triggered Voice SOS events with instant dispatch tools.
- **Unsafe Zone Geofencing Manager**: Define high-risk areas on the map with automatic safety warnings for passengers/drivers.
- **Financial & Payment Management**: Revenue reports, driver payout management, and ride dispute logs.
- **Broadcast System**: Push system notifications to users, drivers, or specific regions.

---

## 🏗️ Project Architecture

```
travix/
├── backend/                  # Node.js + Express.js REST API
│   ├── config/               # Firebase & Environment setup
│   ├── controllers/          # Business logic (Auth, Ride, Safety, Admin)
│   ├── middleware/           # Auth & JWT verification, validation
│   ├── routes/               # Express API endpoints
│   ├── server.js             # API entry point
│   └── package.json
├── frontend/                 # Interactive Responsive Web Portal (Material 3)
│   ├── css/                  # Material 3 design system & glassmorphism
│   ├── js/                   # App controller, User, Driver & Admin modules
│   └── index.html            # Main web app layout & Leaflet Map integration
├── flutter_app/              # Flutter Web Source Code Bundle
│   ├── lib/                  # Dart main, models, screens, services
│   └── pubspec.yaml          # Flutter dependencies
├── API_DOCUMENTATION.md      # Full REST API endpoint reference
├── FIRESTORE_SCHEMA.md       # Firestore collections, security rules & indexes
└── .env.example              # Environment variables template
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.x or higher
- **NPM**: v9.x or higher
- **Firebase Project**: Created in Firebase Console with Auth & Firestore enabled (optional for mock mode).

### 1. Backend Setup

```bash
cd backend
npm install
cp ../.env.example .env
npm start
```
The REST API server will run on `http://localhost:5000`.

### 2. Launching Frontend Portal

Open `frontend/index.html` in your web browser, or serve it using any HTTP server:

```bash
cd frontend
npx serve .
```
Open `http://localhost:3000` in your browser. Use the top navigation bar to test the **User Portal**, **Driver Portal**, and **Admin Dashboard**.

---

## 🔒 Safety & Security Matrix

| Feature | Description | Trigger | Target Audience |
| :--- | :--- | :--- | :--- |
| **Voice SOS** | Triggers location broadcast & emergency alerts | Speech keyword / UI SOS | All Passengers & Drivers |
| **Guardian Mode** | Live tracking link sent to emergency contacts | Automatic on trip start | Passengers |
| **Night Mode** | Driver ID re-verification & 3-min pinging | 10:00 PM - 06:00 AM | Night Riders |
| **Female Priority** | Matches female passengers with female drivers | User preference toggle | Female Passengers |
| **Unsafe Zone Warning** | Geofence alert when entering flagged areas | GPS boundary collision | All Users |

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

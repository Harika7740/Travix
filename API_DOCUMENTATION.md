# TRAVIX REST API Documentation

Base URL: `http://localhost:5000/api/v1`

---

## Authentication Endpoints (`/auth`)

### 1. Register User / Passenger
- **POST** `/auth/register`
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "Jane Doe",
  "phone": "+1234567890",
  "gender": "female"
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "user": {
    "uid": "usr_99812",
    "email": "user@example.com",
    "fullName": "Jane Doe",
    "role": "passenger",
    "gender": "female"
  }
}
```

### 2. Driver Registration
- **POST** `/auth/register-driver`
- **Body**:
```json
{
  "email": "driver@example.com",
  "password": "SecurePassword123!",
  "fullName": "Sarah Smith",
  "phone": "+1987654321",
  "gender": "female",
  "vehicle": {
    "make": "Toyota",
    "model": "Camry",
    "year": 2022,
    "plateNumber": "TRX-8899",
    "color": "Silver"
  }
}
```

### 3. Login
- **POST** `/auth/login`
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

---

## Ride Management Endpoints (`/rides`)

### 1. Estimate Fare
- **POST** `/rides/estimate`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "pickup": { "lat": 37.7749, "lng": -122.4194, "address": "Downtown SF" },
  "dropoff": { "lat": 37.7833, "lng": -122.4167, "address": "Union Square SF" },
  "femaleDriverPriority": true
}
```
- **Response** (`200 OK`):
```json
{
  "distanceKm": 4.2,
  "durationMins": 12,
  "baseFare": 15.50,
  "femalePriorityFee": 0.00,
  "nightModeSurge": 0.00,
  "totalFare": 15.50,
  "currency": "USD"
}
```

### 2. Request Ride
- **POST** `/rides/request`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "pickup": { "lat": 37.7749, "lng": -122.4194, "address": "Downtown SF" },
  "dropoff": { "lat": 37.7833, "lng": -122.4167, "address": "Union Square SF" },
  "fare": 15.50,
  "femaleDriverPriority": true,
  "guardianModeEnabled": true
}
```

### 3. Driver Accept / Reject Ride
- **PUT** `/rides/:rideId/respond`
- **Headers**: `Authorization: Bearer <driver_token>`
- **Body**:
```json
{
  "action": "accept" // or "reject"
}
```

### 4. Update Ride Status
- **PUT** `/rides/:rideId/status`
- **Body**: `{ "status": "in_progress" }` // Options: arrived, in_progress, completed, cancelled

---

## Safety & Emergency Endpoints (`/safety`)

### 1. Trigger Voice SOS
- **POST** `/safety/sos`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "rideId": "ride_102",
  "location": { "lat": 37.7749, "lng": -122.4194 },
  "triggerType": "voice_keyword" // or "manual_button"
}
```

### 2. Manage Emergency Contacts
- **GET** `/safety/contacts`
- **POST** `/safety/contacts`
- **Body**:
```json
{
  "name": "Mom",
  "phone": "+1555019283",
  "relation": "Parent"
}
```

### 3. Update Safety Preferences
- **PUT** `/safety/preferences`
- **Body**:
```json
{
  "voiceSosEnabled": true,
  "guardianModeAutoStart": true,
  "nightModeProtection": true
}
```

---

## Admin Endpoints (`/admin`)

### 1. Dashboard Analytics
- **GET** `/admin/analytics`

### 2. Driver Document Verification
- **GET** `/admin/drivers/pending`
- **PUT** `/admin/drivers/:driverId/verify`
- **Body**: `{ "status": "approved", "notes": "Documents verified clean" }`

### 3. Active SOS Alert Feed
- **GET** `/admin/sos-alerts`

### 4. Unsafe Zones Geofence Management
- **GET** `/admin/unsafe-zones`
- **POST** `/admin/unsafe-zones`
- **Body**:
```json
{
  "name": "High Alert District B",
  "center": { "lat": 37.7812, "lng": -122.4111 },
  "radiusMeters": 500,
  "severity": "high"
}
```

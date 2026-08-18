# Cloud Firestore Database Schema & Security Rules

## Collections Overview

### 1. `users` Collection
Document ID: `uid` (Firebase Auth UID)
```json
{
  "uid": "usr_99812",
  "email": "user@example.com",
  "fullName": "Jane Doe",
  "phone": "+1234567890",
  "gender": "female",
  "role": "passenger",
  "profilePictureUrl": "https://storage.googleapis.com/travix/users/usr_99812.jpg",
  "safetyPreferences": {
    "voiceSosEnabled": true,
    "guardianModeAutoStart": true,
    "nightModeProtection": true,
    "femaleDriverPriority": true
  },
  "emergencyContacts": [
    {
      "contactId": "c_1",
      "name": "Sarah Doe",
      "phone": "+1555019283",
      "relation": "Sister"
    }
  ],
  "createdAt": "2026-07-28T22:00:00Z"
}
```

### 2. `drivers` Collection
Document ID: `uid`
```json
{
  "uid": "drv_44102",
  "email": "driver@example.com",
  "fullName": "Sarah Smith",
  "phone": "+1987654321",
  "gender": "female",
  "role": "driver",
  "isOnline": true,
  "verificationStatus": "approved", // "pending", "approved", "rejected"
  "vehicle": {
    "make": "Toyota",
    "model": "Camry",
    "year": 2022,
    "plateNumber": "TRX-8899",
    "color": "Silver"
  },
  "documents": {
    "licenseUrl": "https://storage.googleapis.com/travix/docs/license_44102.pdf",
    "insuranceUrl": "https://storage.googleapis.com/travix/docs/insurance_44102.pdf",
    "backgroundCheckUrl": "https://storage.googleapis.com/travix/docs/bg_44102.pdf"
  },
  "location": {
    "lat": 37.7749,
    "lng": -122.4194,
    "heading": 180,
    "updatedAt": "2026-07-28T22:40:00Z"
  },
  "rating": 4.9,
  "totalTrips": 342,
  "totalEarnings": 4820.50
}
```

### 3. `rides` Collection
Document ID: `rideId`
```json
{
  "rideId": "ride_8819",
  "passengerId": "usr_99812",
  "driverId": "drv_44102",
  "status": "in_progress", // "requested", "accepted", "arrived", "in_progress", "completed", "cancelled"
  "pickup": {
    "lat": 37.7749,
    "lng": -122.4194,
    "address": "742 Market St, San Francisco"
  },
  "dropoff": {
    "lat": 37.7833,
    "lng": -122.4167,
    "address": "Union Square, San Francisco"
  },
  "fare": {
    "amount": 18.50,
    "currency": "USD",
    "paymentMethod": "card", // "card", "wallet", "cash"
    "paymentStatus": "paid"
  },
  "safetyFlags": {
    "femalePriorityRequested": true,
    "guardianModeActive": true,
    "nightModeActive": false,
    "sosTriggered": false
  },
  "createdAt": "2026-07-28T22:30:00Z",
  "completedAt": null
}
```

### 4. `sos_alerts` Collection
Document ID: `alertId`
```json
{
  "alertId": "sos_3301",
  "rideId": "ride_8819",
  "userId": "usr_99812",
  "triggerType": "voice_keyword",
  "location": {
    "lat": 37.7780,
    "lng": -122.4180
  },
  "status": "active", // "active", "investigating", "resolved"
  "resolvedBy": null,
  "createdAt": "2026-07-28T22:35:10Z"
}
```

### 5. `unsafe_zones` Collection
Document ID: `zoneId`
```json
{
  "zoneId": "zone_09",
  "name": "High Incident Area - Sector 4",
  "center": {
    "lat": 37.7812,
    "lng": -122.4111
  },
  "radiusMeters": 600,
  "severity": "high",
  "activeTimes": "22:00 - 05:00",
  "createdAt": "2026-07-28T20:00:00Z"
}
```

---

## Firestore Security Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && request.auth.token.role == 'admin';
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) || isAdmin();
    }

    // Drivers collection
    match /drivers/{driverId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(driverId) || isAdmin();
    }

    // Rides collection
    match /rides/{rideId} {
      allow read: if isAuthenticated() && (
        resource.data.passengerId == request.auth.uid ||
        resource.data.driverId == request.auth.uid ||
        isAdmin()
      );
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (
        resource.data.passengerId == request.auth.uid ||
        resource.data.driverId == request.auth.uid ||
        isAdmin()
      );
    }

    // SOS Alerts collection
    match /sos_alerts/{alertId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAdmin();
    }

    // Unsafe Zones collection
    match /unsafe_zones/{zoneId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
  }
}
```

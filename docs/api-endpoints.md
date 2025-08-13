# API Endpoints Documentation

## Overview
This document outlines all the API endpoints used in the individual user signup flow. All endpoints are hosted on `http://localhost:3001`.

## Base URL
```
http://localhost:3001
```

## Authentication
Currently, no authentication is required for signup endpoints. All endpoints are publicly accessible.

## Error Response Format
All endpoints return errors in the following format:
```json
{
  "success": false,
  "error": "Error message description"
}
```

## Endpoints

### 1. IPRS Verification

#### `GET /api/iprs/{idNumber}`
Verifies user identity using the Integrated Population Registration System.

**Path Parameters:**
- `idNumber` (string, required): 8-digit National ID number

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "cme9pje650001lmotxoiomzvt",
    "id_no": "32049143",
    "passport_no": null,
    "first_name": "JOHN",
    "middle_name": "KIMANI",
    "last_name": "KARANJA",
    "nationality": "Kenya",
    "gender": "m",
    "county_of_birth": "THIKA EAST",
    "district_of_birth": null,
    "division_of_birth": null,
    "location_of_birth": null,
    "date_of_birth": "1998-05-13T00:00:00.000Z",
    "email_address": null,
    "phone_no": null,
    "current_county": null,
    "current_sub_county": null,
    "mug_shot": null,
    "createdAt": "2025-08-13T08:27:33.630Z",
    "updatedAt": "2025-08-13T08:27:33.630Z"
  },
  "message": "IPRS record retrieved successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "IPRS record not found"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request (invalid ID number)
- `404`: Not Found (ID number not in system)

---

### 2. Entity Creation

#### `POST /api/entities`
Creates an entity record for the verified user.

**Request Body:**
```json
{
  "userType": "individual",
  "designation": "string",
  "phoneNumber": "string",
  "iprs_id": "string"
}
```

**Validation:**
```javascript
body('userType').notEmpty().withMessage('User type is required'),
body('designation').notEmpty().withMessage('Designation is required'),
body('phoneNumber').notEmpty().withMessage('Phone number is required'),
body('iprs_id').notEmpty().withMessage('IPRS ID is required')
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "entity-id",
    "userType": "individual",
    "designation": "string",
    "phoneNumber": "string",
    "iprs_id": "string",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "Entity created successfully"
}
```

**Status Codes:**
- `201`: Created
- `400`: Bad Request (validation errors)
- `409`: Conflict (entity already exists)

---

### 3. User Creation

#### `POST /api/users/create-with-entity`
Creates a user account with entity association.

**Request Body:**
```json
{
  "iprsID": "string",
  "phoneNumber": "string",
  "email": "string",
  "entityID": "string"
}
```

**Validation:**
```javascript
body('iprsID').notEmpty().withMessage('IPRS ID is required'),
body('phoneNumber').notEmpty().withMessage('Phone number is required'),
body('email').isEmail().withMessage('Valid email is required'),
body('entityID').notEmpty().withMessage('Entity ID is required')
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "iprsID": "string",
    "phoneNumber": "string",
    "email": "string",
    "entityID": "string",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "User created successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Failed to create user with entity: User already exists for this IPRS record"
}
```

**Status Codes:**
- `201`: Created
- `400`: Bad Request (validation errors)
- `409`: Conflict (user already exists)

---

### 4. OTP Operations

#### `POST /api/otp/send`
Sends OTP to the specified delivery method.

**Request Body:**
```json
{
  "userId": "string",
  "type": "EMAIL" | "SMS"
}
```

**Validation:**
```javascript
body('userId').notEmpty().withMessage('User ID is required'),
body('type').isIn(['EMAIL', 'SMS']).withMessage('Type must be EMAIL or SMS')
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "type": "EMAIL",
    "sentAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "OTP sent successfully"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request (validation errors)
- `404`: User not found

---

#### `POST /api/otp/verify`
Verifies the submitted OTP code.

**Request Body:**
```json
{
  "userId": "string",
  "code": "123456",
  "type": "EMAIL" | "SMS"
}
```

**Validation:**
```javascript
body('userId').notEmpty().withMessage('User ID is required'),
body('code').isLength({ min: 6, max: 6 }).withMessage('OTP code must be 6 digits'),
body('type').isIn(['EMAIL', 'SMS']).withMessage('Type must be EMAIL or SMS')
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "verified": true,
    "verifiedAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "OTP verified successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid OTP code"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid OTP)

---

#### `POST /api/otp/resend`
Resends OTP to the specified delivery method.

**Request Body:**
```json
{
  "userId": "string",
  "type": "EMAIL" | "SMS"
}
```

**Validation:**
```javascript
body('userId').notEmpty().withMessage('User ID is required'),
body('type').isIn(['EMAIL', 'SMS']).withMessage('Type must be EMAIL or SMS')
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "type": "EMAIL",
    "resentAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "OTP resent successfully"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request (validation errors)
- `404`: User not found

---

### 5. PIN Operations

#### `POST /api/pin/create`
Creates a PIN for the user account.

**Request Body:**
```json
{
  "userId": "string",
  "pin": "1234"
}
```

**Validation:**
```javascript
body('userId').notEmpty().withMessage('User ID is required'),
body('pin').isLength({ min: 4, max: 4 }).withMessage('PIN must be 4 digits')
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "pinCreated": true,
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "PIN created successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "PIN already exists for this user"
}
```

**Status Codes:**
- `201`: Created
- `400`: Bad Request (validation errors)
- `409`: Conflict (PIN already exists)

---

#### `POST /api/pin/verify`
Verifies the submitted PIN.

**Request Body:**
```json
{
  "userId": "string",
  "pin": "1234"
}
```

**Validation:**
```javascript
body('userId').notEmpty().withMessage('User ID is required'),
body('pin').isLength({ min: 4, max: 4 }).withMessage('PIN must be 4 digits')
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "verified": true,
    "verifiedAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "PIN verified successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid PIN"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid PIN)

---

#### `PUT /api/pin/:userId`
Updates the user's PIN.

**Path Parameters:**
- `userId` (string, required): User ID

**Request Body:**
```json
{
  "pin": "5678"
}
```

**Validation:**
```javascript
body('pin').isLength({ min: 4, max: 4 }).withMessage('PIN must be 4 digits')
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "pinUpdated": true,
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "message": "PIN updated successfully"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request (validation errors)
- `404`: User not found

---

## Rate Limiting
Currently, no rate limiting is implemented. Consider implementing rate limiting for:
- OTP sending (prevent spam)
- PIN verification attempts (prevent brute force)
- IPRS verification (prevent abuse)

## Security Considerations

### Data Validation
- All endpoints implement server-side validation
- Input sanitization to prevent injection attacks
- Proper error messages without exposing internals

### Data Transmission
- All endpoints use HTTPS (in production)
- Sensitive data (PIN, OTP) should be encrypted in transit
- Consider implementing request signing for sensitive operations

### Error Handling
- Generic error messages to prevent information leakage
- Proper HTTP status codes
- Consistent error response format

## Testing

### Test Data
Use the following test data for development:
- **IPRS ID**: `35029142` (valid test ID)
- **Email**: `test@example.com`
- **Phone**: `+254700000000`
- **PIN**: `1234`
- **OTP**: `123456`

### Test Scenarios
1. **Happy Path**: Complete signup flow with valid data
2. **Invalid IPRS**: Test with non-existent ID
3. **Duplicate User**: Test creating user with existing IPRS
4. **Invalid OTP**: Test with wrong OTP code
5. **Invalid PIN**: Test with wrong PIN
6. **Network Errors**: Test with slow/unstable connections

## Monitoring and Logging

### Recommended Logging
- All API requests and responses
- Error occurrences with stack traces
- Performance metrics (response times)
- Security events (failed attempts)

### Metrics to Track
- Signup completion rate
- OTP verification success rate
- PIN creation success rate
- Error rates by endpoint
- Response times by endpoint

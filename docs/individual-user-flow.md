# Individual User Signup Flow Documentation

## Overview
This document outlines the complete signup flow for individual users in the Sukari application. The flow involves identity verification, user creation, OTP verification, and PIN setup.

## Flow Architecture
The signup process is built using Next.js with React Query for API management, custom hooks for data persistence, and a multi-step form approach.

## Prerequisites
- Backend server running on `http://localhost:3001`
- All required API endpoints implemented
- React Query provider configured
- Toast notifications setup

## Step-by-Step Flow

### Step 1: User Type Selection (`/signup/user-type`)
**Purpose**: Determine if the user is registering as an individual or company

**Components**:
- User type selection cards
- Navigation to verification step

**Data Collected**:
- `userType`: "individual" or "company"

**Navigation**: 
- Next: `/signup/verification`

---

### Step 2: Identity Verification (`/signup/verification`)
**Purpose**: Verify user identity using IPRS (Integrated Population Registration System)

**Components**:
- National ID input field
- IPRS verification integration
- User information display
- Continue button

**API Integration**:
```typescript
// IPRS Verification
POST http://localhost:3001/api/iprs/{idNumber}
```

**Request/Response**:
```json
// Response
{
  "success": true,
  "data": {
    "id": "cme9pje650001lmotxoiomzvt",
    "id_no": "32049143",
    "first_name": "JOHN",
    "middle_name": "KIMANI",
    "last_name": "KARANJA",
    "nationality": "Kenya",
    "gender": "m",
    "date_of_birth": "1998-05-13T00:00:00.000Z",
    "county_of_birth": "THIKA EAST"
  },
  "message": "IPRS record retrieved successfully"
}
```

**Data Collected**:
- `iprsData`: Raw IPRS response
- `verificationData`: Formatted IPRS data
- `userType`: From previous step
- `designation`: User designation
- `phoneNumber`: User phone number

**Data Persistence**:
```typescript
// Stored in localStorage via useSignupData hook
{
  iprsData: IPRSResponse,
  verificationData: {
    fullName: string,
    idNumber: string,
    dateOfBirth: string,
    gender: string,
    nationality: string,
    countyOfBirth: string,
    userType: string,
    designation: string,
    phoneNumber: string
  }
}
```

**Navigation**:
- Next: `/signup/authentication`

---

### Step 3: Entity Creation (Continue Action)
**Purpose**: Create entity record for the verified user

**API Integration**:
```typescript
// Entity Creation
POST http://localhost:3001/api/entities
```

**Request Body**:
```json
{
  "userType": "individual",
  "designation": "string",
  "phoneNumber": "string",
  "iprs_id": "string"
}
```

**Data Persistence**:
```typescript
// Additional data stored
{
  entityData: ContinueData,
  entityResponse: EntityResponse
}
```

---

### Step 4: Authentication Setup (`/signup/authentication`)
**Purpose**: Collect user authentication credentials

**Components**:
- Email input field (pre-filled from IPRS)
- Phone number input field (pre-filled from IPRS)
- Submit button

**Data Validation**:
- Email format validation
- Phone number validation
- Required field validation

**API Integration**:
```typescript
// User Creation with Entity
POST http://localhost:3001/api/users/create-with-entity
```

**Request Body**:
```json
{
  "iprsID": "string",
  "phoneNumber": "string",
  "email": "string",
  "entityID": "string"
}
```

**Data Collected**:
- `authenticationData`: Email and phone information
- `userCreationData`: User creation request data
- `userCreationResponse`: Created user response

**Data Persistence**:
```typescript
// Additional data stored
{
  authenticationData: {
    telephone: string,
    email: string,
    iprs_id: string,
    userType: string
  },
  userCreationData: CreateUserRequest,
  userCreationResponse: UserResponse
}
```

**Navigation**:
- Next: `/signup/otp-verification`

---

### Step 5: OTP Method Selection (`/signup/otp-verification`)
**Purpose**: Choose OTP delivery method

**Components**:
- Email option (with user's email)
- SMS option (with user's phone)
- Method selection interface
- Send OTP button

**API Integration**:
```typescript
// Send OTP
POST http://localhost:3001/api/otp/send
```

**Request Body**:
```json
{
  "userId": "string",
  "type": "EMAIL" | "SMS"
}
```

**Data Displayed**:
- User's full name
- User's email address
- User's phone number
- User creation success status

**Navigation**:
- Next: `/signup/otp-submission`

---

### Step 6: OTP Submission (`/signup/otp-submission`)
**Purpose**: Enter and verify OTP code

**Components**:
- 6-digit OTP input fields
- Resend OTP functionality
- Verify button
- Countdown timer

**API Integration**:
```typescript
// Verify OTP
POST http://localhost:3001/api/otp/verify

// Resend OTP
POST http://localhost:3001/api/otp/resend
```

**Request Bodies**:
```json
// Verify OTP
{
  "userId": "string",
  "code": "123456",
  "type": "EMAIL" | "SMS"
}

// Resend OTP
{
  "userId": "string",
  "type": "EMAIL" | "SMS"
}
```

**Features**:
- Auto-focus navigation between input fields
- Real-time validation
- Resend functionality with 27-second timer
- Error handling with toast notifications

**Navigation**:
- Next: `/signup/create-password`

---

### Step 7: PIN Creation (`/signup/create-password`)
**Purpose**: Create 4-digit PIN for account security

**Components**:
- 4-digit PIN input field
- PIN confirmation field
- PIN requirements display
- Complete signup button

**PIN Requirements**:
- Exactly 4 digits
- Only numbers (0-9)
- PIN and confirmation must match

**API Integration**:
```typescript
// Create PIN
POST http://localhost:3001/api/pin/create
```

**Request Body**:
```json
{
  "userId": "string",
  "pin": "1234"
}
```

**Data Persistence**:
```typescript
// Final data stored
{
  pinData: {
    pin: string,
    confirmPin: string
  }
}
```

**Features**:
- PIN visibility toggle
- Real-time requirement validation
- Visual requirement indicators
- Success feedback

**Navigation**:
- Next: `/login?signup=success`

---

## Data Flow and Persistence

### useSignupData Hook
The entire signup flow uses a centralized data management hook that persists data in localStorage:

```typescript
interface SignupData {
  iprsData?: IPRSResponse;
  verificationData?: {
    fullName: string;
    idNumber: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    countyOfBirth: string;
    userType: string;
    designation: string;
    phoneNumber: string;
  };
  entityData?: ContinueData;
  entityResponse?: EntityResponse;
  authenticationData?: {
    telephone: string;
    email: string;
    iprs_id: string;
    userType: string;
  };
  userCreationData?: CreateUserRequest;
  userCreationResponse?: UserResponse;
  pinData?: {
    pin: string;
    confirmPin: string;
  };
}
```

### Data Loading States
Each page implements loading states to prevent premature redirects:
- `isLoading` state from `useSignupData`
- Loading spinners during data loading
- Proper error handling for missing data

## Error Handling

### API Error Format
All API errors follow the format:
```json
{
  "success": false,
  "error": "Error message description"
}
```

### Error Handling Strategy
- React Query error handling with retry logic
- Toast notifications for user feedback
- Graceful fallbacks for missing data
- Proper error messages for validation failures

## Custom Hooks

### useIPRSVerification
- Handles IPRS API calls
- Data formatting and validation
- Error handling and retry logic

### useVerificationContinue
- Manages entity creation
- Handles continue action data
- Error handling and success feedback

### useCreateUser
- Manages user creation with entity
- Handles authentication data
- Error handling and validation

### useSendOTP
- Manages OTP sending
- Handles delivery method selection
- Error handling and success feedback

### useResendOTP
- Manages OTP resending
- Handles resend functionality
- Timer management and error handling

### useVerifyOTP
- Manages OTP verification
- Handles 6-digit code validation
- Error handling and success feedback

### useCreatePIN
- Manages PIN creation
- Handles 4-digit PIN validation
- Error handling and success feedback

## Security Considerations

### Data Validation
- Client-side validation for all inputs
- Server-side validation via API endpoints
- Real-time validation feedback

### Data Persistence
- Sensitive data stored in localStorage (temporary)
- Data cleared after successful signup
- No sensitive data in URL parameters

### API Security
- Proper error handling without exposing internals
- Validation on all API endpoints
- Secure data transmission

## Testing Considerations

### Flow Testing
- Test complete flow from start to finish
- Test error scenarios at each step
- Test data persistence across steps
- Test navigation between steps

### API Testing
- Test all API endpoints with valid data
- Test API endpoints with invalid data
- Test error handling and retry logic
- Test loading states and user feedback

### Edge Cases
- Test with slow network connections
- Test with missing or corrupted data
- Test with browser refresh during flow
- Test with multiple browser tabs

## Future Enhancements

### Potential Improvements
- Add progress indicators
- Implement step validation
- Add data export functionality
- Implement analytics tracking
- Add accessibility improvements
- Implement offline support

### API Enhancements
- Add rate limiting
- Implement request caching
- Add request/response logging
- Implement API versioning
- Add webhook support

## Conclusion

The individual user signup flow provides a comprehensive, secure, and user-friendly experience for account creation. The implementation follows best practices for data management, error handling, and user experience design.

The modular architecture with custom hooks makes the code maintainable and testable, while the centralized data management ensures consistency across all steps of the signup process.

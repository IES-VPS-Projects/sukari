# Sukari Signup Flow Documentation

## Overview
This documentation folder contains comprehensive guides for the individual user signup flow implementation in the Sukari application.

## Documentation Structure

### 📋 [Individual User Flow](./individual-user-flow.md)
Complete step-by-step documentation of the individual user signup process, including:
- **7-Step Flow**: From user type selection to PIN creation
- **Data Flow**: How data persists across steps
- **API Integration**: All backend endpoints and their usage
- **Error Handling**: Comprehensive error management strategy
- **Custom Hooks**: Detailed explanation of all custom hooks
- **Security Considerations**: Data validation and security measures
- **Testing Strategy**: Unit, integration, and E2E testing approaches

### 🔌 [API Endpoints](./api-endpoints.md)
Complete API reference for all endpoints used in the signup flow:
- **IPRS Verification**: `GET /api/iprs/{idNumber}`
- **Entity Creation**: `POST /api/entities`
- **User Creation**: `POST /api/users/create-with-entity`
- **OTP Operations**: Send, verify, and resend OTP
- **PIN Operations**: Create, verify, and update PIN
- **Validation Rules**: Server-side validation requirements
- **Error Responses**: Consistent error handling format
- **Testing Data**: Sample data for development and testing

### 🛠️ [Technical Implementation](./technical-implementation.md)
Deep dive into the technical architecture and implementation details:
- **Technology Stack**: Complete list of technologies used
- **Project Structure**: File organization and architecture
- **Core Architecture**: React Query setup and data persistence
- **Custom Hook Patterns**: Consistent implementation patterns
- **Page Implementation**: Standard page structure and patterns
- **Data Flow**: How data moves through the application
- **Error Handling**: Multi-layered error management
- **Validation Patterns**: Client and server-side validation
- **Performance Optimizations**: Caching and loading strategies
- **Security Considerations**: Data protection and validation
- **Testing Strategy**: Comprehensive testing approach
- **Deployment Considerations**: Production readiness

## Quick Start Guide

### Prerequisites
1. **Backend Server**: Ensure backend is running on `http://localhost:3001`
2. **Dependencies**: Install all required packages
3. **Environment**: Set up proper environment variables

### Getting Started
1. **Read the Flow**: Start with [Individual User Flow](./individual-user-flow.md) to understand the complete process
2. **API Reference**: Review [API Endpoints](./api-endpoints.md) for backend integration details
3. **Implementation**: Use [Technical Implementation](./technical-implementation.md) for development guidance

### Development Workflow
1. **Setup**: Configure React Query provider and data persistence
2. **Implementation**: Follow the established patterns for each page
3. **Testing**: Use the provided testing strategies
4. **Integration**: Connect with backend APIs using the documented endpoints

## Key Features

### 🔄 **Data Persistence**
- Centralized data management with `useSignupData` hook
- localStorage-based temporary storage
- Automatic data cleanup after completion

### 🎯 **API Integration**
- Direct backend communication (no Next.js API routes)
- Consistent error handling and retry logic
- React Query for optimal caching and state management

### 🛡️ **Security**
- Client and server-side validation
- Secure data transmission
- Proper error handling without information leakage

### 📱 **User Experience**
- Real-time validation feedback
- Loading states and progress indicators
- Toast notifications for user feedback
- Responsive design with Tailwind CSS

### 🧪 **Testing**
- Unit testing for custom hooks
- Integration testing for API calls
- E2E testing for complete flow validation

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Type     │───▶│   Verification  │───▶│ Authentication  │
│   Selection     │    │   (IPRS)        │    │   Setup         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PIN Creation  │◀───│   OTP Submit    │◀───│   OTP Verify    │
│   & Complete    │    │   & Verify      │    │   Method Select │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Data Flow

```
User Input → Validation → API Call → Response → Data Storage → Next Step
    │           │           │          │           │           │
    ▼           ▼           ▼          ▼           ▼           ▼
localState → Client → Backend → Success/ → localStorage → Navigation
            Validation  API    Error
```

## Custom Hooks

| Hook | Purpose | API Endpoint |
|------|---------|--------------|
| `useSignupData` | Data persistence and management | N/A (localStorage) |
| `useIPRSVerification` | IPRS identity verification | `GET /api/iprs/{id}` |
| `useVerificationContinue` | Entity creation | `POST /api/entities` |
| `useCreateUser` | User account creation | `POST /api/users/create-with-entity` |
| `useSendOTP` | OTP delivery | `POST /api/otp/send` |
| `useResendOTP` | OTP resending | `POST /api/otp/resend` |
| `useVerifyOTP` | OTP verification | `POST /api/otp/verify` |
| `useCreatePIN` | PIN creation | `POST /api/pin/create` |

## Error Handling Strategy

### API Errors
```json
{
  "success": false,
  "error": "Error message description"
}
```

### User Feedback
- **Toast Notifications**: Success and error messages
- **Form Validation**: Real-time input validation
- **Loading States**: Visual feedback during operations
- **Graceful Fallbacks**: Proper handling of missing data

## Testing Strategy

### Unit Tests
- Custom hook functionality
- Data persistence logic
- Validation functions

### Integration Tests
- API endpoint integration
- Form submission flows
- Error handling scenarios

### E2E Tests
- Complete signup flow
- Error scenarios
- Data persistence across steps

## Security Considerations

### Data Protection
- **Client-side**: Input validation and sanitization
- **Server-side**: Comprehensive validation rules
- **Transmission**: HTTPS in production
- **Storage**: Temporary localStorage with cleanup

### Error Handling
- **Generic Messages**: No sensitive data in errors
- **Proper Status Codes**: HTTP status code compliance
- **Logging**: Secure error logging without data exposure

## Performance Optimizations

### React Query
- **Caching**: 1-minute stale time
- **Retry Logic**: 1 retry with 1-second delay
- **Background Updates**: Optimized refetching

### Loading States
- **Prevent Premature Redirects**: Loading state management
- **Optimistic Updates**: Immediate UI feedback
- **Debounced Updates**: Efficient localStorage updates

## Future Enhancements

### Planned Improvements
- **Progress Indicators**: Visual flow progress
- **Step Validation**: Enhanced validation logic
- **Analytics Integration**: User behavior tracking
- **Accessibility**: WCAG compliance improvements
- **Offline Support**: Service worker implementation

### API Enhancements
- **Rate Limiting**: Prevent abuse and spam
- **Request Caching**: Improved performance
- **API Versioning**: Backward compatibility
- **Webhook Support**: Real-time notifications

## Support and Maintenance

### Development
- **Code Reviews**: Follow established patterns
- **Testing**: Maintain comprehensive test coverage
- **Documentation**: Keep documentation updated
- **Performance**: Monitor and optimize regularly

### Production
- **Monitoring**: Track API performance and errors
- **Logging**: Comprehensive error and access logging
- **Backup**: Regular data backup procedures
- **Updates**: Regular dependency and security updates

---

## Contributing

When contributing to the signup flow:

1. **Follow Patterns**: Use established implementation patterns
2. **Update Documentation**: Keep documentation current
3. **Add Tests**: Include appropriate test coverage
4. **Security Review**: Ensure security best practices
5. **Performance**: Consider performance implications

## Contact

For questions or issues related to the signup flow implementation:
- **Technical Issues**: Review the technical implementation guide
- **API Questions**: Check the API endpoints documentation
- **Flow Questions**: Refer to the individual user flow documentation

# Security Implementation Guide

## Overview
This document outlines the security measures implemented in the Nutrition & Wellness Platform.

---

## Backend Security

### 1. **Helmet.js - Security Headers**
- Sets various HTTP headers to protect against common vulnerabilities
- Includes:
  - Content Security Policy (CSP)
  - X-Frame-Options (Clickjacking protection)
  - X-Content-Type-Options (MIME type sniffing protection)
  - Strict-Transport-Security (HTTPS enforcement)

### 2. **Rate Limiting**
- **General API**: 100 requests per 15 minutes per IP
- **Auth Endpoints**: 5 requests per 15 minutes per IP
- Prevents brute force attacks and DDoS attempts
- Applies to:
  - `/api/auth/login`
  - `/api/auth/register`
  - `/api/auth/google`

### 3. **CORS (Cross-Origin Resource Sharing)**
- Restricted to `http://localhost:5173` (development)
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS
- Credentials enabled for secure cookie handling

### 4. **Input Validation & Sanitization**
- All user inputs validated using `express-validator`
- Dangerous characters removed (< > tags)
- Input length limited to 500 characters
- Email format validation
- Password strength requirements

### 5. **Authentication & Authorization**
- JWT (JSON Web Tokens) for session management
- Tokens expire after 7 days
- Password hashing with bcryptjs (10 salt rounds)
- Token verification middleware for protected routes

### 6. **Request Size Limits**
- JSON payload limited to 10KB
- URL-encoded payload limited to 10KB
- Prevents large payload attacks

### 7. **Error Handling**
- Generic error messages to prevent information leakage
- Detailed errors logged server-side only
- No sensitive data in error responses

---

## Frontend Security

### 1. **Input Sanitization**
- All user inputs sanitized before sending to backend
- XSS (Cross-Site Scripting) prevention
- HTML special characters removed
- Input length limited to 255 characters

### 2. **Token Management**
- JWT tokens stored in localStorage
- Token expiration validation
- Automatic token refresh on expiration
- Secure token transmission with Authorization header

### 3. **Password Security**
- Password strength validation:
  - Minimum 6 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
- Password strength indicator
- No password logging or display

### 4. **Data Protection**
- Sensitive data cleared on logout
- Session data stored securely
- No sensitive data in URLs
- HTTPS recommended for production

### 5. **Security Utilities** (`src/utils/security.js`)
- `sanitizeInput()` - Remove dangerous characters
- `isValidEmail()` - Email format validation
- `isStrongPassword()` - Password strength check
- `getPasswordStrength()` - Password strength scoring
- `isTokenExpired()` - Token expiration check
- `clearSensitiveData()` - Secure logout
- `logSecurityEvent()` - Security event logging

---

## Email Security

### 1. **Gmail App Password**
- Uses App Password instead of account password
- Requires 2-Factor Authentication enabled
- Credentials stored in `.env` (not in code)

### 2. **Email Validation**
- Recipient email validated before sending
- Sender email verified
- Email content sanitized

### 3. **Contact Form Security**
- CSRF protection (form validation)
- Rate limiting on submissions
- Input validation and sanitization
- Confirmation emails sent to user

---

## Database Security

### 1. **Firebase Security**
- Real-time database rules configured
- User data isolated by user ID
- Authentication required for access
- Data encryption in transit (HTTPS)

### 2. **Mock Database** (Development)
- Used when Firebase credentials unavailable
- Data stored in memory (not persistent)
- For development/testing only

---

## Environment Variables

### Required `.env` Variables:
```
# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# JWT
JWT_SECRET=your-secret-key-change-in-production

# Email
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=nutriwelldiet@gmail.com

# Firebase (Optional)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_DATABASE_URL=your-database-url
```

### Security Best Practices:
- ✅ Never commit `.env` to version control
- ✅ Use strong, unique JWT_SECRET
- ✅ Rotate secrets regularly
- ✅ Use environment-specific values
- ✅ Limit access to `.env` files

---

## Production Recommendations

### 1. **HTTPS/TLS**
- Enable HTTPS for all connections
- Use valid SSL certificates
- Enforce HTTPS redirects

### 2. **Environment Configuration**
- Use strong JWT_SECRET (32+ characters)
- Enable CORS only for trusted domains
- Set NODE_ENV=production

### 3. **Database**
- Use Firebase Admin SDK with service account
- Enable database rules
- Regular backups
- Encryption at rest

### 4. **Monitoring & Logging**
- Implement security event logging
- Monitor failed login attempts
- Track API usage and anomalies
- Set up alerts for suspicious activity

### 5. **Dependency Management**
- Keep dependencies updated
- Run `npm audit` regularly
- Use `npm audit fix` for vulnerabilities
- Review security advisories

### 6. **API Security**
- Implement API key authentication
- Use OAuth 2.0 for third-party access
- Implement request signing
- Add API versioning

### 7. **Data Protection**
- Implement data encryption at rest
- Use secure password hashing (bcryptjs)
- Implement data retention policies
- GDPR compliance measures

---

## Security Checklist

- [x] Helmet.js security headers
- [x] Rate limiting on auth endpoints
- [x] CORS configuration
- [x] Input validation & sanitization
- [x] JWT authentication
- [x] Password hashing (bcryptjs)
- [x] Email validation
- [x] Error handling
- [x] Environment variables
- [x] Frontend input sanitization
- [x] Token expiration validation
- [x] Secure logout
- [ ] HTTPS/TLS (production)
- [ ] Database encryption (production)
- [ ] Security monitoring (production)
- [ ] Penetration testing (production)

---

## Incident Response

### If Security Breach Detected:
1. Immediately revoke all active tokens
2. Force password reset for all users
3. Review access logs
4. Notify affected users
5. Update security measures
6. Conduct security audit

---

## Support & Reporting

For security issues or vulnerabilities:
- Email: nutriwelldiet@gmail.com
- Do not publicly disclose vulnerabilities
- Allow 48 hours for response
- Provide detailed reproduction steps

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Last Updated**: May 24, 2026
**Version**: 1.0.0

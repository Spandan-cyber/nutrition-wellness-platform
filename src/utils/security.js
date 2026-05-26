/**
 * Security Utilities for Frontend
 */

// Sanitize user input to prevent XSS attacks
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .substring(0, 500); // Limit length
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isStrongPassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

// Get password strength score
export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;
  
  return strength;
};

// Encrypt sensitive data (basic - use proper encryption in production)
export const encryptData = (data, key) => {
  try {
    return btoa(JSON.stringify(data)); // Base64 encoding (not secure, for demo only)
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

// Decrypt sensitive data (basic - use proper decryption in production)
export const decryptData = (encryptedData, key) => {
  try {
    return JSON.parse(atob(encryptedData)); // Base64 decoding (not secure, for demo only)
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Validate token expiration
export const isTokenExpired = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    const decoded = JSON.parse(atob(parts[1]));
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    
    return Date.now() >= expirationTime;
  } catch (error) {
    console.error('Token validation error:', error);
    return true;
  }
};

// Clear sensitive data from localStorage
export const clearSensitiveData = () => {
  const sensitiveKeys = ['token', 'sessionId', 'userId'];
  sensitiveKeys.forEach(key => {
    localStorage.removeItem(key);
  });
};

// Validate CSRF token (if needed)
export const generateCSRFToken = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Log security events
export const logSecurityEvent = (eventType, details) => {
  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    details,
    userAgent: navigator.userAgent
  };
  
  console.warn('[SECURITY EVENT]', event);
  
  // In production, send to security monitoring service
  // await fetch('/api/security/log', { method: 'POST', body: JSON.stringify(event) });
};

export default {
  sanitizeInput,
  isValidEmail,
  isStrongPassword,
  getPasswordStrength,
  encryptData,
  decryptData,
  isTokenExpired,
  clearSensitiveData,
  generateCSRFToken,
  logSecurityEvent
};

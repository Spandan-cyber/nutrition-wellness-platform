import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { UserIcon } from '../components/Icons';
import './Auth.css';
import apiService from '../services/api.js';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Load saved email if "Remember Me" was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedRemember = localStorage.getItem('rememberMe') === 'true';
    if (savedEmail && savedRemember) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Sanitize input - remove potentially dangerous characters
    const sanitized = value.replace(/[<>]/g, '').substring(0, 255);
    setFormData({
      ...formData,
      [name]: sanitized
    });
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const saveLoginToDevice = (userData) => {
    // Save user data to localStorage for device persistence
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('sessionId', userData.sessionId);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userName', userData.user.name);
    localStorage.setItem('userEmail', userData.user.email);
    localStorage.setItem('loginMethod', userData.loginMethod || 'email');
    localStorage.setItem('loginTimestamp', new Date().toISOString());

    // Save email if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem('savedEmail', userData.user.email);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.setItem('rememberMe', 'false');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('🔐 Login attempt with:', { email: formData.email });
      
      const data = await apiService.login(formData.email, formData.password);

      console.log('✅ Login successful:', data);

      // Save login to device
      saveLoginToDevice({ ...data, loginMethod: 'email' });

      // Dispatch custom event to notify Navbar
      window.dispatchEvent(new Event('userLoggedIn'));

      // Show success message
      alert(`Welcome back, ${data.user.name}! Check your email for login notification.`);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔐 Google login started...');
      
      // Decode the JWT token to get user info (no backend needed)
      const token = credentialResponse.credential;
      const parts = token.split('.');
      
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      
      // Decode the payload
      const decoded = JSON.parse(
        atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
      );
      
      console.log('✅ Google token decoded:', decoded.email);

      // Create user data from Google token
      const userData = {
        userId: 'google_' + decoded.sub,
        sessionId: 'session_' + Date.now(),
        token: token,
        user: {
          name: decoded.name || 'Google User',
          email: decoded.email,
          picture: decoded.picture
        },
        loginMethod: 'google'
      };

      // Save login to device
      saveLoginToDevice(userData);

      // Dispatch custom event to notify Navbar
      window.dispatchEvent(new Event('userLoggedIn'));

      // Show success message
      alert(`Welcome, ${userData.user.name}! Logged in with Google.`);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Google login error:', err);
      setError(err.message || 'Google login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    setError('Google login failed. Please try again.');
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Show warning about guest account data deletion
      const confirmed = window.confirm(
        '⚠️ Guest Account Warning\n\n' +
        'You are logging in as a guest. Your data will be stored temporarily in your browser.\n\n' +
        '⚠️ IMPORTANT: Your data will be deleted after you refresh the page or close the browser.\n\n' +
        'To save your data permanently, please create a full account with email or Google.\n\n' +
        'Continue as guest?'
      );

      if (!confirmed) {
        setLoading(false);
        return;
      }

      // Create guest session
      const guestId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      const guestData = {
        userId: guestId,
        sessionId: guestId,
        token: guestId,
        user: {
          name: 'Guest User',
          email: 'guest@temporary.local'
        },
        loginMethod: 'guest'
      };

      // Save guest login to device
      saveLoginToDevice(guestData);

      // Dispatch custom event to notify Navbar
      window.dispatchEvent(new Event('userLoggedIn'));

      // Show success message
      alert('Welcome, Guest! Your session is temporary and will be cleared on refresh.');
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to create guest session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Floating Food Icons */}
      <div className="floating-food-icon icon-1">🍕</div>
      <div className="floating-food-icon icon-2">🍔</div>
      <div className="floating-food-icon icon-3">🥗</div>
      <div className="floating-food-icon icon-4">🍜</div>
      <div className="floating-food-icon icon-5">🥑</div>
      <div className="floating-food-icon icon-6">🍎</div>
      <div className="floating-food-icon icon-7">🥕</div>
      <div className="floating-food-icon icon-8">🍌</div>
      
      <div className="auth-container">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to your NutriWell account</p>
        
        {error && <div className="error-message">{error}</div>}
        
        {/* Social Login Options */}
        <div className="social-login">
          <div className="google-login-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              text="signin_with"
              theme="light"
              size="large"
              locale="en"
            />
          </div>
          
          <button 
            type="button" 
            className="social-btn guest-btn"
            onClick={handleGuestLogin}
            disabled={loading}
            aria-label="Login as Guest"
          >
            <UserIcon size={20} color="white" />
            <span>Guest Account</span>
          </button>
        </div>

        <div className="divider">
          <span>Or continue with email</span>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            aria-label="Email address"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            aria-label="Password"
          />
          
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMe}
              disabled={loading}
            />
            <label htmlFor="rememberMe">Remember me on this device</label>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-link">Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LeafIcon, MoonIcon, SunIcon, UserIcon, LogoutIcon, ChevronDownIcon } from './Icons';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in - validate token exists
    const checkLoginStatus = () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('userName');
      const email = localStorage.getItem('userEmail');
      
      // Only consider user logged in if both userId and token exist
      if (userId && token) {
        setIsLoggedIn(true);
        setUserName(name || '');
        setUserEmail(email || '');
      } else {
        setIsLoggedIn(false);
        setUserName('');
        setUserEmail('');
        // Clear any stale data
        localStorage.removeItem('userId');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
      }
      setIsInitialized(true);
    };

    checkLoginStatus();

  }, []);

  const isActive = (path) => location.pathname === path;

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem('userId');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    // Update state
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setIsOpen(false);
    setProfileOpen(false);
    
    // Redirect to home
    navigate('/');
  };

  // Don't render until we've checked login status
  if (!isInitialized) {
    return (
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <Link to="/" className="nav-logo" aria-label="NutriWell Home">
            <span className="logo-icon" aria-hidden="true">🌿</span>
            <span className="logo-text">NutriWell</span>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="NutriWell Home">
          <Logo size={32} variant="icon" />
          <span className="logo-text">NutriWell</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`} role="menubar">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={handleMenuClose}
            role="menuitem"
          >
            Home
          </Link>
          
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={handleMenuClose}
            role="menuitem"
          >
            About
          </Link>

          <div 
            className="nav-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={servicesOpen}
          >
            <Link 
              to="/services" 
              className={`nav-link ${location.pathname.startsWith('/services') ? 'active' : ''}`}
            >
              Services <ChevronDownIcon size={16} color="currentColor" style={{ display: 'inline', marginLeft: '4px' }} />
            </Link>
            {servicesOpen && (
              <div className="dropdown-menu" role="menu">
                <Link to="/services/nutrition-plans" className="dropdown-item" role="menuitem">
                  Nutrition Plans
                </Link>
                <Link to="/services/fitness-tracking" className="dropdown-item" role="menuitem">
                  Fitness Tracking
                </Link>
                <Link to="/services/meal-planning" className="dropdown-item" role="menuitem">
                  Meal Planning
                </Link>
              </div>
            )}
          </div>

          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={handleMenuClose}
            role="menuitem"
          >
            Dashboard
          </Link>

          <Link 
            to="/resources" 
            className={`nav-link ${isActive('/resources') ? 'active' : ''}`}
            onClick={handleMenuClose}
            role="menuitem"
          >
            Resources
          </Link>

          <Link 
            to="/games" 
            className={`nav-link nav-games ${isActive('/games') ? 'active' : ''}`}
            onClick={handleMenuClose}
            role="menuitem"
          >
            🎮 Games
          </Link>

          <Link 
            to="/blog" 
            className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
            onClick={handleMenuClose}
            role="menuitem"
          >
            Blog
          </Link>

          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={handleMenuClose}
            role="menuitem"
          >
            Contact
          </Link>

          {isLoggedIn ? (
            <div 
              className="nav-dropdown profile-dropdown"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={profileOpen}
            >
              <button 
                className={`nav-link nav-profile-btn ${profileOpen ? 'active' : ''}`}
                aria-label={`Profile - ${userName}`}
              >
                <UserIcon size={18} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} />
                {userName || 'Profile'}
                <ChevronDownIcon size={16} color="currentColor" style={{ display: 'inline', marginLeft: '6px' }} />
              </button>
              {profileOpen && (
                <div className="profile-dropdown-menu" role="menu">
                  <Link 
                    to="/profile" 
                    className="profile-menu-item"
                    onClick={() => {
                      setProfileOpen(false);
                      handleMenuClose();
                    }}
                    role="menuitem"
                  >
                    <UserIcon size={16} color="currentColor" style={{ marginRight: '8px' }} />
                    View Profile
                  </Link>
                  <button 
                    className="profile-menu-item logout-item"
                    onClick={handleLogout}
                    role="menuitem"
                    aria-label="Logout"
                  >
                    <LogoutIcon size={16} color="currentColor" style={{ marginRight: '8px' }} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="nav-link nav-btn"
              onClick={handleMenuClose}
              role="menuitem"
            >
              Login
            </Link>
          )}
        </div>

        <button 
          className="nav-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

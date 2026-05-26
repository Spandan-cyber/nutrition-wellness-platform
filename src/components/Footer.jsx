import { Link } from 'react-router-dom';
import { HomeIcon, InfoIcon, SettingsIcon, BarChart3Icon, UtensilsIcon, ActivityIcon, PhoneIcon, MailIcon, MapPinIcon, LockIcon, FileTextIcon, PlateIcon } from './Icons';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
            <Logo size={24} variant="icon" />
            NutriWell
          </h3>
          <p className="footer-description">
            Your trusted partner in achieving optimal health through personalized nutrition and wellness tracking.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook" title="Facebook">
              <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h3v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h3z"></path>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram" title="Instagram">
              <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <circle cx="17.5" cy="6.5" r="1.5"></circle>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Twitter" title="Twitter">
              <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 7-7 7-7"></path>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn" title="LinkedIn">
              <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">
            Quick Links
          </h4>
          <ul className="footer-links">
            <li><Link to="/"><HomeIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> Home</Link></li>
            <li><Link to="/about"><InfoIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> About Us</Link></li>
            <li><Link to="/services"><SettingsIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> Services</Link></li>
            <li><Link to="/dashboard"><BarChart3Icon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> Dashboard</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">
            Services
          </h4>
          <ul className="footer-links">
            <li><Link to="/services/nutrition-plans"><UtensilsIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> Nutrition Plans</Link></li>
            <li><Link to="/services/fitness-tracking"><ActivityIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> Fitness Tracking</Link></li>
            <li><Link to="/services/meal-planning"><PlateIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> Meal Planning</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">
            Contact
          </h4>
          <ul className="footer-contact">
            <li><MailIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> nutriwelldiet@gmail.com</li>
            <li><PhoneIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> +1 (555) 123-4567</li>
            <li><MapPinIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> 123 Health St, Wellness City</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 NutriWell. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy"><LockIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> Privacy Policy</Link>
          <Link to="/terms"><FileTextIcon size={16} color="currentColor" style={{ display: 'inline', marginRight: '6px' }} /> Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

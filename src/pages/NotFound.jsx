import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-heading">Page Not Found</h2>
          <p className="not-found-description">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          
          <div className="not-found-illustration">
            🥗
          </div>

          <div className="not-found-actions">
            <Link to="/" className="btn-home">
              Go Back Home
            </Link>
            <Link to="/resources" className="btn-resources">
              Explore Resources
            </Link>
          </div>

          <div className="not-found-suggestions">
            <h3>Here are some helpful links:</h3>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

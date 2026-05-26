import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Comprehensive nutrition and wellness solutions tailored to your goals</p>
      </div>

      <div className="services-content">
        <div className="service-card-large">
          <span className="service-icon-large">🥗</span>
          <div className="service-info">
            <h2>Personalized Nutrition Plans</h2>
            <p>Get custom meal plans designed by certified nutritionists based on your goals, dietary preferences, and lifestyle.</p>
            <Link to="/services/nutrition-plans" className="service-link">Learn More →</Link>
          </div>
        </div>

        <div className="service-card-large">
          <span className="service-icon-large">📊</span>
          <div className="service-info">
            <h2>Fitness Tracking</h2>
            <p>Monitor your workouts, track calories burned, and sync with your nutrition data for complete wellness insights.</p>
            <Link to="/services/fitness-tracking" className="service-link">Learn More →</Link>
          </div>
        </div>

        <div className="service-card-large">
          <span className="service-icon-large">🍽️</span>
          <div className="service-info">
            <h2>Meal Planning</h2>
            <p>Plan your weekly meals with our smart meal planner. Get recipes, shopping lists, and prep instructions.</p>
            <Link to="/services/meal-planning" className="service-link">Learn More →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

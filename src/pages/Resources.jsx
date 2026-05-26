import { Link } from 'react-router-dom';
import './Resources.css';

const Resources = () => {
  const resources = [
    { title: 'Nutrition Guide', icon: '📚', path: '/resources/nutrition-guide' },
    { title: 'Meal Prep Tips', icon: '🥘', path: '/resources/meal-prep-tips' },
    { title: 'Workout Plans', icon: '💪', path: '/resources/workout-plans' },
    { title: 'Recipe Database', icon: '🍳', path: '/resources/recipe-database' },
    { title: 'Calorie Calculator', icon: '🧮', path: '/resources/calorie-calculator' },
    { title: 'BMI Calculator', icon: '⚖️', path: '/resources/bmi-calculator' }
  ];

  return (
    <div className="resources-page">
      <div className="resources-hero">
        <h1>Resources</h1>
        <p>Tools and guides to support your wellness journey</p>
      </div>
      <div className="resources-content">
        <div className="resources-grid">
          {resources.map((resource, index) => (
            <Link key={index} to={resource.path} className="resource-card-link">
              <div className="resource-card">
                <span className="resource-icon">{resource.icon}</span>
                <h3>{resource.title}</h3>
                <button className="resource-btn">Access →</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;

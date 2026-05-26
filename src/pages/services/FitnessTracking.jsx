import './ServicePage.css';

const FitnessTracking = () => {
  return (
    <div className="service-detail-page">
      <div className="service-detail-hero">
        <h1>📊 Fitness Tracking</h1>
        <p>Monitor your workouts and sync with nutrition data</p>
      </div>
      <div className="service-detail-content">
        <h2>Features</h2>
        <ul className="feature-list">
          <li>✓ Track workouts and exercises</li>
          <li>✓ Monitor calories burned</li>
          <li>✓ Sync with wearable devices</li>
          <li>✓ Progress charts and analytics</li>
          <li>✓ Workout history and trends</li>
        </ul>
      </div>
    </div>
  );
};

export default FitnessTracking;

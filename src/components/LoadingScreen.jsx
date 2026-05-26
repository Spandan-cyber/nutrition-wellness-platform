import { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
  const [displayLoading, setDisplayLoading] = useState(isLoading);
  const [motivationIndex, setMotivationIndex] = useState(0);

  const motivations = [
    "🥗 Eat well, live well!",
    "🍎 An apple a day keeps the doctor away!",
    "💪 Fuel your body, fuel your dreams!",
    "🥕 Nutrition is the foundation of health!",
    "🍌 Healthy choices, happy life!",
    "🥦 Grow stronger with every meal!",
    "🍽️ Nourish your body, elevate your mind!",
    "🌱 Small steps to big health goals!",
    "💚 Your health is your wealth!",
    "🎯 Every bite counts towards your goals!"
  ];

  useEffect(() => {
    if (isLoading) {
      setDisplayLoading(true);
      // Rotate through motivations every 800ms
      const motivationInterval = setInterval(() => {
        setMotivationIndex(prev => (prev + 1) % motivations.length);
      }, 800);
      return () => clearInterval(motivationInterval);
    } else {
      // Delay hiding to allow fade out animation
      const timer = setTimeout(() => setDisplayLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, motivations.length]);

  if (!displayLoading) return null;

  return (
    <div className={`loading-screen ${isLoading ? 'active' : 'fade-out'}`}>
      <div className="loading-container">
        {/* Food plate animation */}
        <div className="food-plate">
          <div className="plate-item apple">🍎</div>
          <div className="plate-item banana">🍌</div>
          <div className="plate-item carrot">🥕</div>
          <div className="plate-item tomato">🍅</div>
          <div className="plate-item broccoli">🥦</div>
          <div className="plate-center">🍽️</div>
        </div>

        {/* Loading text */}
        <div className="loading-text">
          <h2>NutriWell</h2>
          <p className="loading-subtitle">Preparing your wellness journey...</p>
        </div>

        {/* Animated progress bar */}
        <div className="loading-progress">
          <div className="progress-bar"></div>
        </div>

        {/* Motivational quote */}
        <div className="motivation-quote">
          <p>{motivations[motivationIndex]}</p>
        </div>

        {/* Loading dots */}
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Background gradient */}
      <div className="loading-background"></div>
    </div>
  );
};

export default LoadingScreen;

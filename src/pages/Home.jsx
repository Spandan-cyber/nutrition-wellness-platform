import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        {/* Floating Food Icons */}
        <div className="floating-food-icon icon-1">🍕</div>
        <div className="floating-food-icon icon-2">🍔</div>
        <div className="floating-food-icon icon-3">🥗</div>
        <div className="floating-food-icon icon-4">🍜</div>
        <div className="floating-food-icon icon-5">🥑</div>
        <div className="floating-food-icon icon-6">🍎</div>
        <div className="floating-food-icon icon-7">🥕</div>
        <div className="floating-food-icon icon-8">🍌</div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Health with <span className="highlight">Smart Nutrition</span>
          </h1>
          <p className="hero-subtitle">
            Track your macros, plan your meals, and achieve your wellness goals with our AI-powered platform
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started Free</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-card">
            <div className="stat">
              <span className="stat-icon">🔥</span>
              <div>
                <p className="stat-value">2,000</p>
                <p className="stat-label">Calories Tracked</p>
              </div>
            </div>
            <div className="stat">
              <span className="stat-icon">💪</span>
              <div>
                <p className="stat-value">150g</p>
                <p className="stat-label">Protein Goal</p>
              </div>
            </div>
            <div className="stat">
              <span className="stat-icon">🎯</span>
              <div>
                <p className="stat-value">85%</p>
                <p className="stat-label">Goal Progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Showcase Section */}
      <section className="logo-showcase">
        <div className="logo-showcase-content">
          <h2 className="section-title">Meet NutriWell</h2>
          <p className="section-subtitle">Your Personal Nutrition & Wellness Companion</p>
          <p className="logo-description">
            NutriWell is your all-in-one platform for tracking nutrition, planning meals, and achieving your wellness goals. 
            With AI-powered insights and real-time analytics, we make healthy living simple and sustainable.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose NutriWell?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>Real-Time Tracking</h3>
            <p>Monitor your calories, protein, carbs, and fats with instant visual feedback</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤖</span>
            <h3>AI Assistant</h3>
            <p>Get instant answers to your nutrition questions with our smart chatbot</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🍽️</span>
            <h3>Meal Planning</h3>
            <p>Create personalized meal plans tailored to your dietary goals</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📈</span>
            <h3>Progress Analytics</h3>
            <p>Visualize your journey with detailed charts and insights</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and protected with AWS security</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Mobile Friendly</h3>
            <p>Access your dashboard anywhere, on any device</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Start Your Wellness Journey?</h2>
        <p>Join thousands of users achieving their health goals</p>
        <Link to="/register" className="btn btn-primary btn-large">
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default Home;

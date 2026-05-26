import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Floating Food Icons */}
      <div className="floating-food-icon icon-1">🍕</div>
      <div className="floating-food-icon icon-2">🍔</div>
      <div className="floating-food-icon icon-3">🥗</div>
      <div className="floating-food-icon icon-4">🍜</div>
      <div className="floating-food-icon icon-5">🥑</div>
      <div className="floating-food-icon icon-6">🍎</div>
      <div className="floating-food-icon icon-7">🥕</div>
      <div className="floating-food-icon icon-8">🍌</div>
      
      <div className="about-hero">
        <h1>About NutriWell</h1>
        <p>Empowering healthier lives through smart nutrition tracking</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At NutriWell, we believe that everyone deserves access to simple, effective tools for managing their nutrition and wellness. Our mission is to make healthy eating accessible, trackable, and achievable for people of all backgrounds and fitness levels.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, NutriWell was born from a simple observation: tracking nutrition shouldn't be complicated. Our team of nutritionists, developers, and wellness experts came together to create a platform that combines cutting-edge technology with evidence-based nutrition science.
          </p>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍⚕️</div>
              <h3>Dr. Sarah Johnson</h3>
              <p className="member-role">Chief Nutritionist</p>
              <p>15+ years in clinical nutrition</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Michael Chen</h3>
              <p className="member-role">Lead Developer</p>
              <p>AWS & Full-Stack Expert</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍🔬</div>
              <h3>Dr. Emily Rodriguez</h3>
              <p className="member-role">Research Director</p>
              <p>PhD in Nutritional Science</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🎨</div>
              <h3>David Kim</h3>
              <p className="member-role">UX Designer</p>
              <p>Creating intuitive experiences</p>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">🎯</span>
              <h3>Accuracy</h3>
              <p>Evidence-based nutrition data you can trust</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🔒</span>
              <h3>Privacy</h3>
              <p>Your health data is secure and confidential</p>
            </div>
            <div className="value-card">
              <span className="value-icon">💡</span>
              <h3>Innovation</h3>
              <p>Leveraging AI and cloud technology</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🤝</span>
              <h3>Support</h3>
              <p>Always here to help you succeed</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './DynamicBackground.css';

const DynamicBackground = () => {
  const location = useLocation();
  const [backgroundImage, setBackgroundImage] = useState('');
  const [overlayColor, setOverlayColor] = useState('rgba(16, 185, 129, 0.7)');

  // Background images for different pages
  const backgroundMap = {
    '/': {
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.6)',
      title: 'Home - Wellness Journey'
    },
    '/about': {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.65)',
      title: 'About Us - Our Mission'
    },
    '/services': {
      image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.7)',
      title: 'Services - Your Health'
    },
    '/services/nutrition-plans': {
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.65)',
      title: 'Nutrition Plans'
    },
    '/services/fitness-tracking': {
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.7)',
      title: 'Fitness Tracking'
    },
    '/services/meal-planning': {
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.65)',
      title: 'Meal Planning'
    },
    '/dashboard': {
      image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.7)',
      title: 'Dashboard - Track Progress'
    },
    '/profile': {
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.75)',
      title: 'Your Profile'
    },
    '/resources': {
      image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.65)',
      title: 'Resources - Learn More'
    },
    '/blog': {
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.7)',
      title: 'Blog - Health Tips'
    },
    '/contact': {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.65)',
      title: 'Contact Us'
    },
    '/login': {
      image: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.7)',
      title: 'Login - Secure Access'
    },
    '/register': {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.65)',
      title: 'Register - Join Us'
    }
  };

  useEffect(() => {
    // Get background for current page
    const pageBackground = backgroundMap[location.pathname] || {
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80',
      overlay: 'rgba(16, 185, 129, 0.7)',
      title: 'Nutrition & Wellness'
    };

    setBackgroundImage(pageBackground.image);
    setOverlayColor(pageBackground.overlay);

    // Preload next image for smooth transition
    const img = new Image();
    img.src = pageBackground.image;
  }, [location.pathname]);

  return (
    <div
      className="dynamic-background"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div
        className="background-overlay"
        style={{
          backgroundColor: overlayColor
        }}
      />
    </div>
  );
};

export default DynamicBackground;

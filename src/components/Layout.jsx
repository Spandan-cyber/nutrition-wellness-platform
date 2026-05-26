import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIAssistant from './AIAssistant';
import MouseAnimation from './MouseAnimation';
import FoodDoodleBackground from './FoodDoodleBackground';
import LoadingScreen from './LoadingScreen';
import './Layout.css';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 4 seconds
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="layout">
      <LoadingScreen isLoading={isLoading} />
      <FoodDoodleBackground />
      <MouseAnimation />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Layout;

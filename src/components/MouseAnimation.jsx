import { useEffect, useState } from 'react';
import './MouseAnimation.css';

const MouseAnimation = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e) => {
      const clickId = Date.now();
      const newClick = {
        id: clickId,
        x: e.clientX,
        y: e.clientY
      };

      setClicks(prev => [...prev, newClick]);

      // Remove click animation after 600ms
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== clickId));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Mouse Cursor Glow */}
      <div
        className="mouse-glow"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />

      {/* Click Ripples */}
      {clicks.map(click => (
        <div
          key={click.id}
          className="click-ripple"
          style={{
            left: `${click.x}px`,
            top: `${click.y}px`
          }}
        />
      ))}

      {/* Cursor Trail */}
      <div
        className="cursor-trail"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />
    </>
  );
};

export default MouseAnimation;

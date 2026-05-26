import { useEffect, useRef } from 'react';
import './FoodDoodleBackground.css';

const FoodDoodleBackground = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Track mouse position
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Food doodles array
    const doodles = [];

    class FoodDoodle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Much slower movement - just gentle floating
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        this.size = Math.random() * 30 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01; // Slower rotation
        this.type = Math.floor(Math.random() * 6); // 6 different food types
        this.opacity = Math.random() * 0.5 + 0.3;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = (Math.random() - 0.5) * 0.005; // Much slower wobble
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.wobble += this.wobbleSpeed;

        // Bounce off edges
        if (this.x - this.size < 0 || this.x + this.size > canvas.width) {
          this.vx *= -1;
          this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
        }
        if (this.y - this.size < 0 || this.y + this.size > canvas.height) {
          this.vy *= -1;
          this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
        }

        // React to cursor - gentle repel away from mouse
        const dx = this.x - mousePos.current.x;
        const dy = this.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150; // Distance at which doodles start reacting

        if (distance < repelRadius && distance > 0) {
          const angle = Math.atan2(dy, dx);
          const repelForce = (repelRadius - distance) / repelRadius * 0.5; // Reduced from 2 to 0.5
          this.vx += Math.cos(angle) * repelForce;
          this.vy += Math.sin(angle) * repelForce;
        }

        // Add very slight wobble
        this.x += Math.sin(this.wobble) * 0.2;
        this.y += Math.cos(this.wobble) * 0.2;
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        switch (this.type) {
          case 0: // Apple
            this.drawApple(ctx);
            break;
          case 1: // Banana
            this.drawBanana(ctx);
            break;
          case 2: // Carrot
            this.drawCarrot(ctx);
            break;
          case 3: // Tomato
            this.drawTomato(ctx);
            break;
          case 4: // Broccoli
            this.drawBroccoli(ctx);
            break;
          case 5: // Leaf
            this.drawLeaf(ctx);
            break;
        }

        ctx.restore();
      }

      drawApple(ctx) {
        // Apple body
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // Apple stem
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.lineTo(0, -this.size / 2 - 8);
        ctx.stroke();

        // Apple leaf
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.ellipse(8, -this.size / 2 - 4, 6, 4, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      drawBanana(ctx) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = this.size / 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI, false);
        ctx.stroke();

        // Banana spots
        ctx.fillStyle = '#f59e0b';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(-this.size / 4 + i * this.size / 6, this.size / 4, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      drawCarrot(ctx) {
        // Carrot body
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(-this.size / 3, -this.size / 2);
        ctx.lineTo(this.size / 3, -this.size / 2);
        ctx.lineTo(0, this.size / 2);
        ctx.closePath();
        ctx.fill();

        // Carrot top (leaves)
        ctx.fillStyle = '#10b981';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.ellipse(
            -this.size / 4 + i * this.size / 4,
            -this.size / 2 - 5,
            3,
            8,
            (i - 1) * 0.3,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      drawTomato(ctx) {
        // Tomato body
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // Tomato shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(-this.size / 6, -this.size / 6, this.size / 6, 0, Math.PI * 2);
        ctx.fill();

        // Tomato stem
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.lineTo(0, -this.size / 2 - 6);
        ctx.stroke();
      }

      drawBroccoli(ctx) {
        // Broccoli head
        ctx.fillStyle = '#10b981';
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2;
          const x = Math.cos(angle) * this.size / 3;
          const y = Math.sin(angle) * this.size / 3;
          ctx.beginPath();
          ctx.arc(x, y, this.size / 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Broccoli stem
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, this.size / 3);
        ctx.lineTo(0, this.size / 2);
        ctx.stroke();
      }

      drawLeaf(ctx) {
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 2, this.size / 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Leaf vein
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-this.size / 4, -this.size / 4);
        ctx.lineTo(this.size / 4, this.size / 4);
        ctx.stroke();
      }
    }

    // Create initial doodles
    for (let i = 0; i < 30; i++) {
      doodles.push(new FoodDoodle());
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent background
      ctx.fillStyle = 'rgba(240, 253, 244, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw doodles
      doodles.forEach((doodle) => {
        doodle.update();
        doodle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="food-doodle-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)'
      }}
    />
  );
};

export default FoodDoodleBackground;

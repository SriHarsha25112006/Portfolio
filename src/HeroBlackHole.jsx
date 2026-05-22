import React, { useEffect, useRef } from 'react';

export default function HeroBlackHole() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 800;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 600 + 50, // Distance from center
        speed: (Math.random() * 0.02) + 0.005,
        size: Math.random() * 2.5 + 0.5,
        color: Math.random() > 0.5 ? '#06b6d4' : (Math.random() > 0.5 ? '#a855f7' : '#ec4899')
      });
    }

    let mouseX = centerX;
    let mouseY = centerY;
    let targetX = centerX;
    let targetY = centerY;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; // Trailing effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smoothly move center of gravity towards mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Draw singularity center (black hole)
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.shadowBlur = 50;
      ctx.shadowColor = '#a855f7';
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Spiral inwards slightly, reset if too close
        p.radius -= p.speed * 20;
        p.angle += p.speed;

        if (p.radius < 40) {
          p.radius = Math.random() * 600 + 200;
          p.angle = Math.random() * Math.PI * 2;
        }

        const x = mouseX + Math.cos(p.angle) * p.radius;
        // Squash Y axis for 3D perspective effect
        const y = mouseY + Math.sin(p.angle) * (p.radius * 0.4); 

        // Brighter / bigger closer to center
        const intensity = Math.max(0.1, 1 - (p.radius / 600));
        
        ctx.beginPath();
        ctx.arc(x, y, p.size * intensity * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = intensity;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden">
      <canvas ref={canvasRef} className="block" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

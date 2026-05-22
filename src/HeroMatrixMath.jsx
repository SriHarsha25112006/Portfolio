import React, { useEffect, useRef } from 'react';

export default function HeroMatrixMath() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mathSymbols = [
      '∫', '∑', '∇', '∂</', '∞', 'π', 'θ', 'λ', 'μ', 'σ', 
      'P(Y|X)', 'w=(C+αI)⁻¹', 'MI(X;Y)', 'log(P)', 'O(n²)', 'W^T x',
      '0', '1', 'f(x)', 'Δ', 'Ω'
    ];

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start off screen
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Calculate distance to mouse
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let drawX = x;
        let drawY = y;
        let alpha = 1;

        // Mouse repelling effect
        if (dist < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - dist) / 150;
          drawX += Math.cos(angle) * force * 50;
          drawY += Math.sin(angle) * force * 50;
          alpha = 1 - force; // Fade out slightly near mouse
        }

        // Random cyan/purple colors
        const colorOpt = Math.random() > 0.5 ? 'rgba(6, 182, 212,' : 'rgba(168, 85, 247,';
        ctx.fillStyle = `${colorOpt} ${alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = Math.random() > 0.5 ? '#06b6d4' : '#a855f7';

        ctx.fillText(text, drawX, drawY);
        ctx.shadowBlur = 0; // Reset

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#050505]">
      <canvas ref={canvasRef} className="block" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </div>
  );
}

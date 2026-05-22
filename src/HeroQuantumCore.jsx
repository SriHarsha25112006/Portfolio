import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';

const Cube = ({ size, color, reverse }) => {
  const half = size / 2;
  
  // Base face styles
  const faceClass = `absolute flex items-center justify-center border-2 border-${color}-500/50 bg-${color}-500/5 backdrop-blur-[2px] shadow-[0_0_15px_rgba(var(--${color}-rgb),0.3)_inset]`;
  const style = { width: size, height: size };

  return (
    <motion.div 
      className="absolute"
      style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
      animate={{
        rotateX: reverse ? [-360, 0] : [0, 360],
        rotateY: reverse ? [-360, 0] : [0, 360],
        rotateZ: reverse ? [360, 0] : [0, 360],
      }}
      transition={{
        duration: reverse ? 25 : 20,
        ease: "linear",
        repeat: Infinity
      }}
    >
      {/* Front */}
      <div className={faceClass} style={{ ...style, transform: `translateZ(${half}px)` }} />
      {/* Back */}
      <div className={faceClass} style={{ ...style, transform: `rotateY(180deg) translateZ(${half}px)` }} />
      {/* Right */}
      <div className={faceClass} style={{ ...style, transform: `rotateY(90deg) translateZ(${half}px)` }} />
      {/* Left */}
      <div className={faceClass} style={{ ...style, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
      {/* Top */}
      <div className={faceClass} style={{ ...style, transform: `rotateX(90deg) translateZ(${half}px)` }} />
      {/* Bottom */}
      <div className={faceClass} style={{ ...style, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
    </motion.div>
  );
};

export default function HeroQuantumCore() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative hidden lg:flex justify-center items-center z-20 h-[500px]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>

      {/* 3D Container */}
      <div className="relative flex items-center justify-center w-full h-full cursor-none" style={{ perspective: '1200px' }}>
        
        {/* The Quantum Core (Tesseract) */}
        <motion.div 
          className="relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Inner Brain Core */}
          <motion.div 
            className="absolute z-50 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute w-20 h-20 bg-cyan-400/30 rounded-full blur-[20px]"></div>
            <FaBrain className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse" />
          </motion.div>

          {/* Inner Cube (Purple) */}
          <Cube size={120} color="purple" reverse={true} />

          {/* Outer Cube (Cyan) */}
          <Cube size={240} color="cyan" reverse={false} />

          {/* Orbital Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            >
              <div 
                className="w-full h-full rounded-full" 
                style={{ transform: `translateZ(${160 + Math.random() * 40}px)` }}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
      
      {/* Holographic Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center w-full pointer-events-none">
        <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase bg-black/50 inline-block px-6 py-2 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          Quantum Engine Active
        </div>
      </div>
    </motion.div>
  );
}

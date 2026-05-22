import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroHologram() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-[500px] flex justify-center items-center overflow-hidden rounded-[2rem] border border-cyan-500/30 bg-black/50 backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.15)] group cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1200px' }}
    >
      {/* Background Ambient Hologram Glow */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-[100px] pointer-events-none"
        animate={{
          background: isHovered 
            ? 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, rgba(0,0,0,0) 70%)' 
            : 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(0,0,0,0) 70%)'
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Hologram Projector Beam (from bottom) */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[400px] bg-gradient-to-t from-cyan-500/40 via-cyan-500/5 to-transparent blur-[20px] pointer-events-none origin-bottom"
        animate={{ opacity: isHovered ? 0.8 : 0.4, scaleY: isHovered ? 1.2 : 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-48 h-12 bg-cyan-500/50 rounded-[100%] blur-[10px]" />

      {/* 3D Holographic Core */}
      <motion.div 
        className="relative w-[300px] h-[300px] flex items-center justify-center pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ 
          rotateX: isHovered ? [0, 15, -15, 0] : 0,
          rotateY: [0, 360],
          scale: isHovered ? 1.15 : 1
        }}
        transition={{ 
          rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        
        {/* Inner Solid Energy Core */}
        <motion.div 
          className="absolute w-20 h-20 bg-cyan-300 rounded-full shadow-[0_0_50px_rgba(34,211,238,1)]"
          animate={{ scale: isHovered ? [1, 1.2, 1] : [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ring 1: Fast dashed data ring (Equator) */}
        <motion.div 
          className="absolute w-[240px] h-[240px] rounded-full border-[3px] border-dashed border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.5)_inset]"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: 90, rotateZ: [360, 0] }}
          transition={{ duration: isHovered ? 5 : 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Ring 2: Vertical Polar Ring */}
        <motion.div 
          className="absolute w-[260px] h-[260px] rounded-full border-2 border-cyan-500/60"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: 90, rotateX: [0, 360] }}
          transition={{ duration: isHovered ? 8 : 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_#fff] -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        {/* Ring 3: Diagonal Orbit 1 */}
        <motion.div 
          className="absolute w-[280px] h-[280px] rounded-full border border-cyan-300/40 border-t-cyan-300/90 border-r-cyan-300/90"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: 45, rotateY: 45, rotateZ: [0, 360] }}
          transition={{ duration: isHovered ? 6 : 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Ring 4: Diagonal Orbit 2 */}
        <motion.div 
          className="absolute w-[280px] h-[280px] rounded-full border border-blue-500/40 border-b-blue-400/90 border-l-blue-400/90"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: -45, rotateY: -45, rotateZ: [360, 0] }}
          transition={{ duration: isHovered ? 7 : 14, repeat: Infinity, ease: "linear" }}
        />

        {/* Outer Sphere Mesh (Wireframe representation) */}
        <motion.div 
          className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/20"
          style={{ transformStyle: 'preserve-3d', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(6,182,212,0.1) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(6,182,212,0.1) 20px)' }}
          animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

      </motion.div>

      {/* Floating Holographic Labels / Data Readouts */}
      <div className="absolute top-6 left-6 text-cyan-400 font-mono text-[10px] uppercase tracking-widest opacity-70 pointer-events-none">
        <p>SYS.CORE.V3 // ONLINE</p>
        <p className="mt-1">INTEGRITY: 100%</p>
        {isHovered && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-white">
            OVERRIDE ENGAGED
          </motion.p>
        )}
      </div>

      <div className="absolute top-6 right-6 flex flex-col gap-1 items-end pointer-events-none opacity-70">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i} 
            className="h-1 bg-cyan-400"
            initial={{ width: '10px' }}
            animate={{ width: isHovered ? `${Math.random() * 40 + 20}px` : `${Math.random() * 20 + 10}px` }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Main Bottom Label */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full pointer-events-none">
        <motion.div 
          className="text-cyan-400 font-mono text-xs tracking-widest uppercase bg-black/60 inline-block px-6 py-2 rounded-sm border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-md"
          animate={{
            borderColor: isHovered ? 'rgba(34,211,238,1)' : 'rgba(34,211,238,0.5)',
            boxShadow: isHovered ? '0 0 40px rgba(6,182,212,0.8)' : '0 0 20px rgba(6,182,212,0.3)',
            color: isHovered ? '#fff' : '#22d3ee'
          }}
        >
          {isHovered ? "J.A.R.V.I.S. PROTOCOL ACTIVE" : "HOLOGRAPHIC CORE"}
        </motion.div>
      </div>

      {/* Scanning Laser Line (Sweeps top to bottom on hover) */}
      {isHovered && (
        <motion.div 
          className="absolute left-0 w-full h-0.5 bg-cyan-300 shadow-[0_0_15px_#22d3ee] pointer-events-none z-50"
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

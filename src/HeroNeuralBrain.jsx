import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brainNodes, brainEdges } from './brainData';

const HeroNeuralBrain = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activePulses, setActivePulses] = useState([]);

  // Generate random pulses across random edges over time
  useEffect(() => {
    // Generate new pulses
    const interval = setInterval(() => {
      // Create 3 to 8 simultaneous pulses depending on hover state
      const numPulses = isHovered ? Math.floor(Math.random() * 6) + 5 : Math.floor(Math.random() * 3) + 1;
      const newPulses = [];
      
      for (let i = 0; i < numPulses; i++) {
        const randomEdge = brainEdges[Math.floor(Math.random() * brainEdges.length)];
        newPulses.push({
          id: Math.random().toString(36).substr(2, 9),
          source: randomEdge.source,
          target: randomEdge.target,
          length: randomEdge.length
        });
      }

      setActivePulses(prev => [...prev.slice(-40), ...newPulses]); // keep array from getting too large
      
    }, isHovered ? 200 : 800);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div
      className="relative w-full h-full min-h-[500px] flex items-center justify-center cursor-none group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Background Aura */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent rounded-full blur-[80px]"
        animate={{ 
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.4 : 0.2
        }}
        transition={{ duration: 1 }}
      />

      <motion.div
        animate={{ 
          scale: isHovered ? 1.15 : 1,
          rotateY: isHovered ? [0, 5, -5, 0] : 0,
          rotateX: isHovered ? [0, -5, 5, 0] : 0
        }}
        transition={{
          scale: { duration: 0.5 },
          rotateY: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="relative w-full max-w-[600px] aspect-square flex items-center justify-center transform-style-3d drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]"
      >
        <svg 
          viewBox="-250 -250 500 500" 
          className="w-full h-full overflow-visible"
        >
          <defs>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
            
            <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base Synapse Lines */}
          <g opacity={isHovered ? 0.3 : 0.15}>
            {brainEdges.map((edge, i) => {
              const src = brainNodes[edge.source];
              const tgt = brainNodes[edge.target];
              return (
                <line
                  key={`edge-${i}`}
                  x1={src.x} y1={src.y}
                  x2={tgt.x} y2={tgt.y}
                  stroke="url(#nodeGlow)"
                  strokeWidth="0.5"
                />
              );
            })}
          </g>

          {/* Animated Synapse Pulses */}
          <AnimatePresence>
            {activePulses.map((pulse) => {
              const src = brainNodes[pulse.source];
              const tgt = brainNodes[pulse.target];
              return (
                <motion.line
                  key={pulse.id}
                  x1={src.x} y1={src.y}
                  x2={tgt.x} y2={tgt.y}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? "2" : "1.5"}
                  strokeLinecap="round"
                  filter="url(#pulseGlow)"
                  initial={{ strokeDasharray: `0 ${pulse.length}`, strokeDashoffset: 0, opacity: 1 }}
                  animate={{ 
                    strokeDasharray: `${pulse.length * 0.4} ${pulse.length}`,
                    strokeDashoffset: -pulse.length,
                    opacity: 0
                  }}
                  transition={{ duration: isHovered ? 0.4 : 0.8, ease: "linear" }}
                  onAnimationComplete={() => {
                    setActivePulses(prev => prev.filter(p => p.id !== pulse.id));
                  }}
                />
              );
            })}
          </AnimatePresence>

          {/* Brain Nodes */}
          {brainNodes.map((node) => (
            <motion.circle
              key={`node-${node.id}`}
              cx={node.x}
              cy={node.y}
              r={node.z > 0 ? 2 : 1.2}
              fill={node.z > 20 ? "#a855f7" : "#22d3ee"}
              opacity={node.z > 0 ? 0.8 : 0.4}
              filter={node.z > 20 ? "url(#pulseGlow)" : "none"}
              animate={{
                r: isHovered ? (node.z > 0 ? 3 : 1.5) : (node.z > 0 ? 2 : 1.2),
                opacity: isHovered ? 1 : (node.z > 0 ? 0.8 : 0.4)
              }}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default HeroNeuralBrain;

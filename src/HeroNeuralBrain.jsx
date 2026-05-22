import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';

export default function HeroNeuralBrain() {
  const [isHovered, setIsHovered] = useState(false);

  // Define nodes that vaguely shape a side-profile brain
  const nodes = [
    { id: 1, x: 150, y: 100 }, { id: 2, x: 250, y: 80 }, { id: 3, x: 350, y: 100 },
    { id: 4, x: 100, y: 180 }, { id: 5, x: 200, y: 160 }, { id: 6, x: 300, y: 150 },
    { id: 7, x: 400, y: 180 }, { id: 8, x: 80,  y: 260 }, { id: 9, x: 180, y: 250 },
    { id: 10, x: 280, y: 230 }, { id: 11, x: 380, y: 260 }, { id: 12, x: 440, y: 240 },
    { id: 13, x: 120, y: 340 }, { id: 14, x: 220, y: 320 }, { id: 15, x: 320, y: 330 },
    { id: 16, x: 400, y: 330 }, { id: 17, x: 200, y: 400 }, { id: 18, x: 300, y: 410 },
    { id: 19, x: 260, y: 470 }, { id: 20, x: 150, y: 260 }, { id: 21, x: 250, y: 380 },
    { id: 22, x: 350, y: 180 }, { id: 23, x: 250, y: 280 }, { id: 24, x: 160, y: 310 },
    { id: 25, x: 350, y: 280 },
  ];

  // Define edges (synapses)
  const edges = [
    [1, 2], [2, 3], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [3, 7], [4, 5], [5, 6], [6, 7],
    [4, 8], [4, 9], [5, 9], [5, 10], [6, 10], [6, 22], [7, 22], [7, 12], [8, 9], [9, 10],
    [10, 23], [22, 25], [12, 11], [8, 13], [9, 20], [20, 24], [23, 25], [23, 14], [25, 15],
    [11, 16], [13, 14], [14, 15], [15, 16], [14, 21], [15, 18], [21, 17], [17, 18], [18, 19],
    [21, 19], [24, 13], [20, 9], [10, 6], [22, 11], [25, 16], [4, 20], [7, 11]
  ];

  // Generate impulses (data packets traveling along edges)
  // We'll map multiple impulses to each edge for a highly active network
  const impulses = [];
  edges.forEach((edge, index) => {
    const nodeA = nodes.find(n => n.id === edge[0]);
    const nodeB = nodes.find(n => n.id === edge[1]);
    
    // Add forward impulse
    impulses.push({
      id: `f-${index}`,
      startX: nodeA.x, startY: nodeA.y,
      endX: nodeB.x, endY: nodeB.y,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 1.5,
      color: '#22d3ee' // cyan
    });
    
    // Add backward impulse for dense connections
    if (Math.random() > 0.4) {
      impulses.push({
        id: `b-${index}`,
        startX: nodeB.x, startY: nodeB.y,
        endX: nodeA.x, endY: nodeA.y,
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 1.5,
        color: '#a855f7' // purple
      });
    }
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative hidden lg:flex justify-center items-center z-20 h-[550px] w-full cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Glow */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-[120px] pointer-events-none"
        animate={{
          background: isHovered 
            ? 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(168,85,247,0.4) 100%)' 
            : 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0.15) 100%)'
        }}
        transition={{ duration: 0.5 }}
      />

      <motion.div 
        className="relative w-full h-full max-w-[500px]"
        animate={{ 
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Faint solid brain icon in the background for shape reinforcement */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <FaBrain className="w-full h-full text-white" />
        </div>

        {/* Neural Network SVG */}
        <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          {/* Edges (Synapses) */}
          {edges.map((edge, index) => {
            const nodeA = nodes.find(n => n.id === edge[0]);
            const nodeB = nodes.find(n => n.id === edge[1]);
            return (
              <motion.line
                key={`edge-${index}`}
                x1={nodeA.x} y1={nodeA.y}
                x2={nodeB.x} y2={nodeB.y}
                stroke="url(#synapse-gradient)"
                strokeWidth={isHovered ? "2.5" : "1.5"}
                opacity={isHovered ? 0.6 : 0.3}
                animate={{ strokeWidth: isHovered ? [2, 3, 2] : [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
              />
            );
          })}

          {/* Impulses (Data firing along synapses) */}
          {impulses.map((impulse) => (
            <motion.circle
              key={impulse.id}
              r={isHovered ? "4" : "2.5"}
              fill={impulse.color}
              initial={{ cx: impulse.startX, cy: impulse.startY, opacity: 0 }}
              animate={{ 
                cx: [impulse.startX, impulse.endX], 
                cy: [impulse.startY, impulse.endY],
                opacity: isHovered ? [0, 1, 1, 0] : [0, 0.8, 0.8, 0] 
              }}
              transition={{
                duration: isHovered ? impulse.duration * 0.4 : impulse.duration,
                ease: "linear",
                repeat: Infinity,
                delay: impulse.delay
              }}
              className="drop-shadow-[0_0_10px_currentColor]"
            />
          ))}

          {/* Nodes (Neurons) */}
          {nodes.map((node) => (
            <motion.circle
              key={`node-${node.id}`}
              cx={node.x} cy={node.y}
              r={isHovered ? "6" : "4"}
              fill="#fff"
              className="drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
              animate={{ 
                r: isHovered ? [5, 8, 5] : [3, 5, 3],
                fill: isHovered ? ["#ffffff", "#22d3ee", "#ffffff"] : ["#ffffff", "#a855f7", "#ffffff"]
              }}
              transition={{ 
                duration: 1 + Math.random(), 
                repeat: Infinity, 
                delay: Math.random() 
              }}
            />
          ))}

          {/* Definitions */}
          <defs>
            <linearGradient id="synapse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central Intense Core Glow that pulses heavily on hover */}
        {isHovered && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400/20 rounded-full blur-[30px] pointer-events-none"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Holographic Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center w-full pointer-events-none">
        <motion.div 
          className="text-cyan-400 font-mono text-sm tracking-widest uppercase bg-black/50 inline-block px-6 py-2 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          animate={{
            borderColor: isHovered ? 'rgba(34,211,238,0.8)' : 'rgba(34,211,238,0.3)',
            boxShadow: isHovered ? '0 0 30px rgba(6,182,212,0.6)' : '0 0 20px rgba(6,182,212,0.2)',
            color: isHovered ? '#fff' : '#22d3ee'
          }}
        >
          {isHovered ? "Synaptic Overdrive Active" : "Neural Network Active"}
        </motion.div>
      </div>
    </motion.div>
  );
}

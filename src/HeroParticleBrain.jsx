import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function HeroParticleBrain() {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-[2rem] overflow-hidden border border-cyan-500/20 bg-black/40 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] group">
      <Particles
        id="tsparticles-brain"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          fullScreen: { enable: false },
          background: {
            color: { value: "transparent" },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 200,
                links: {
                  opacity: 0.8,
                  color: "#06b6d4"
                }
              },
              push: {
                quantity: 4,
              },
            },
          },
          particles: {
            color: {
              value: ["#06b6d4", "#a855f7", "#ec4899"],
            },
            links: {
              color: "#ffffff",
              distance: 120,
              enable: true,
              opacity: 0.2,
              width: 1,
              triangles: {
                enable: true,
                opacity: 0.05
              }
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 120,
            },
            opacity: {
              value: { min: 0.1, max: 0.6 },
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
              }
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 4 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 1,
              }
            },
          },
          detectRetina: true,
        }}
      />
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-full blur-[80px] pointer-events-none group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>

      {/* Holographic Text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center w-full pointer-events-none">
        <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase bg-black/50 inline-block px-4 py-1.5 rounded-full border border-cyan-500/30">
          Particle Brain Active
        </div>
      </div>
    </div>
  );
}

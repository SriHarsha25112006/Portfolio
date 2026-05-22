import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function HeroParticleBrain() {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Particles
        id="tsparticles-brain"
        init={particlesInit}
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />
    </div>
  );
}

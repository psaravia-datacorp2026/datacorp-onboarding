import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

/**
 * Rich Mesh/Radial Gradient + Ambient react-tsparticles Network Background.
 * Particles float quietly without reacting to the user's cursor.
 */
export default function ParticleNetworkBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-950">
      {/* Rich Dark Mesh & Radial Gradients (Deep Indigo, Electric Blue, Soft Teal, Subtle Coral) */}
      <div
        className="absolute inset-0 opacity-95"
        style={{
          backgroundImage: `
            radial-gradient(at 15% 15%, rgba(49, 46, 129, 0.48) 0px, transparent 52%),
            radial-gradient(at 85% 20%, rgba(20, 184, 166, 0.22) 0px, transparent 48%),
            radial-gradient(at 50% 55%, rgba(37, 99, 235, 0.24) 0px, transparent 58%),
            radial-gradient(at 82% 85%, rgba(244, 63, 94, 0.16) 0px, transparent 50%),
            radial-gradient(at 18% 88%, rgba(30, 58, 138, 0.42) 0px, transparent 55%)
          `,
        }}
      />

      {/* Ambient Floating Blur Orbs for Extra Depth */}
      <div className="absolute -top-44 left-1/3 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-indigo-900/25 blur-[145px]" />
      <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-teal-900/20 blur-[135px]" />
      <div className="absolute -bottom-24 left-1/4 h-80 w-96 rounded-full bg-rose-900/15 blur-[140px]" />

      {/* Ambient react-tsparticles Layer (Non-interactive) */}
      <Particles
        id="datacorp-tsparticles"
        init={particlesInit}
        className="pointer-events-none absolute inset-0 h-full w-full"
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          detectRetina: true,
          background: {
            color: { value: 'transparent' },
          },
          interactivity: {
            events: {
              onHover: {
                enable: false,
              },
              onClick: {
                enable: false,
              },
              resize: true,
            },
          },
          particles: {
            number: {
              value: 58,
              density: {
                enable: true,
                area: 900,
              },
            },
            color: {
              value: ['#3B82F6', '#6366F1', '#14B8A6', '#F43F5E', '#38BDF8'],
            },
            links: {
              enable: true,
              distance: 145,
              color: '#60A5FA',
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.9,
              direction: 'none',
              random: true,
              straight: false,
              outModes: {
                default: 'bounce',
              },
            },
            opacity: {
              value: { min: 0.25, max: 0.7 },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1.5, max: 3.5 },
            },
          },
        }}
      />
    </div>
  );
}

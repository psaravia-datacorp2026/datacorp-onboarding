import React from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { STAGES } from '../data/onboardingData';
import ParticleNetworkBackground from './ParticleNetworkBackground';
import logoSvg from '../assets/Logo.svg';

export default function Layout({ children }) {
  const activeParticipant = useOnboardingStore((state) => state.activeParticipant);
  const unlockedStage = useOnboardingStore((state) => state.unlockedStage);

  const totalStages = STAGES.length;
  const completedCount = Math.min(unlockedStage - 1, totalStages);
  const progressPercent = Math.round((completedCount / totalStages) * 100);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Animated Technological Particle Network Background */}
      <ParticleNetworkBackground />

      {/* Global header: hidden completely until participant completes identification */}
      {activeParticipant && (
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
            {/* Brand Logo + ONBOARDING Badge */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <img
                src={logoSvg}
                alt="Datasur · ImexDBusiness · Datlas"
                width="432"
                height="45"
                className="h-auto max-h-5 w-auto max-w-[145px] object-contain sm:max-h-7 sm:max-w-[230px] md:max-h-8 md:max-w-none"
              />
              <span className="inline-block shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Onboarding
              </span>
            </div>

            {/* Compact Progress Indicator X/4 */}
            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 shadow-inner">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className="text-blue-400">{completedCount}</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">{totalStages}</span>
              </div>
              <div className="h-2 w-16 sm:w-24 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#14B8A6] shadow-[0_0_10px_#3B82F6]"
                />
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}

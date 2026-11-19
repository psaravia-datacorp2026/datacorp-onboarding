import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LogOut, FastForward } from 'lucide-react';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { STAGES } from '../data/onboardingData';
import ParticleNetworkBackground from './ParticleNetworkBackground';
import logoSvg from '../assets/Logo.svg';

export default function Layout({ children }) {
  const { userCode, userArea, unlockedStage, unlockNextStage, logout } = useOnboardingStore();

  const totalStages = STAGES.length;
  const completedCount = Math.min(unlockedStage - 1, totalStages);
  const progressPercent = Math.round((completedCount / totalStages) * 100);
  const isDevMode = import.meta.env.DEV;

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Animated Technological Particle Network Background */}
      <ParticleNetworkBackground />

      {/* Compact Glassmorphic Top Navbar */}
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

          {/* Right / Center Section: Compact Progress Indicator + Area Badge + Logout */}
          {userCode && userArea ? (
            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Compact Progress Bar & X/5 Counter */}
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
                {isDevMode && unlockedStage <= totalStages && (
                  <button
                    type="button"
                    onClick={unlockNextStage}
                    title="Simular avance de etapa (Solo modo desarrollo)"
                    className="ml-0.5 flex items-center gap-1 rounded-full border border-blue-400/30 bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-200 transition hover:bg-blue-500/35 hover:text-white cursor-pointer"
                  >
                    <FastForward className="h-3 w-3" />
                    <span className="hidden md:inline">Demo</span>
                  </button>
                )}
              </div>

              {/* Assigned Area Pill */}
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/15 via-blue-600/10 to-transparent px-3 py-1.5 text-xs font-medium text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.18)]">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-slate-400">Área:</span>
                <span className="font-semibold text-white">{userArea}</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                title="Cerrar sesión"
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-200 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6]" />
              <span>Portal de Ingreso 2026</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}

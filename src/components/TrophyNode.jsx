import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sparkles,
  Lock,
  Mail,
  CheckCircle2,
  ClipboardList,
} from 'lucide-react';
import { TROPHY_STAGE, FINAL_CHECKLIST_ITEMS } from '../data/onboardingData';
import { useOnboardingStore } from '../store/useOnboardingStore';

/**
 * Fires a multi-burst pyrotechnic confetti celebration using canvas-confetti.
 */
export function triggerGrandFinaleConfetti() {
  const colors = ['#1689F8', '#60A5FA', '#F59E0B', '#FDE047', '#38BDF8'];

  confetti({
    particleCount: 55,
    angle: 60,
    spread: 58,
    origin: { x: 0.15, y: 0.75 },
    colors,
  });
  confetti({
    particleCount: 55,
    angle: 120,
    spread: 58,
    origin: { x: 0.85, y: 0.75 },
    colors,
  });

  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 95,
      startVelocity: 40,
      origin: { x: 0.5, y: 0.6 },
      colors,
    });
  }, 200);
}

/**
 * Final Goal Node (ID: 5) — Unifies the Trophy, Onboarding Congratulations,
 * and the 5-item Informative Deliverables & Accesses List.
 */
export default function TrophyNode({ unlockedStage }) {
  const isUnlocked = unlockedStage >= TROPHY_STAGE.id;
  const prefersReducedMotion = useReducedMotion();
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const trophyCelebrated = useOnboardingStore((state) => state.trophyCelebrated);
  const markTrophyCelebrated = useOnboardingStore(
    (state) => state.markTrophyCelebrated
  );

  // Trigger graduation confetti once per participant upon reaching the Trophy stage
  useEffect(() => {
    if (!isUnlocked || trophyCelebrated) return;

    setIsPanelOpen(true);
    if (!prefersReducedMotion) {
      triggerGrandFinaleConfetti();
    }
    markTrophyCelebrated();
  }, [isUnlocked, trophyCelebrated, prefersReducedMotion, markTrophyCelebrated]);

  const handleTrophyClick = () => {
    if (!isUnlocked) return;
    setIsPanelOpen(true);
    if (!prefersReducedMotion) {
      triggerGrandFinaleConfetti();
    }
  };

  const button3DStyle = isUnlocked
    ? {
        boxShadow:
          '0 10px 0 #92400E, 0 18px 48px rgba(245, 158, 11, 0.65), 0 0 70px rgba(22, 137, 248, 0.35)',
      }
    : {
        boxShadow: '0 10px 0 #0f172a, 0 15px 28px rgba(2, 6, 23, 0.9)',
      };

  return (
    <div
      id="datacorp-trophy-finale"
      className="group relative z-10 mt-2 flex w-full flex-col items-center"
    >
      {/* Floating Crown Badge when Unlocked */}
      {isUnlocked && (
        <motion.div
          animate={
            prefersReducedMotion
              ? { y: 0 }
              : { y: [0, -6, 0], scale: [1, 1.03, 1] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-4 flex items-center gap-1.5 rounded-full border border-amber-300/50 bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-amber-500/25 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.45)] backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>Meta Final Desbloqueada</span>
        </motion.div>
      )}

      {/* Large 3D Trophy Button Wrapper */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={
            prefersReducedMotion
              ? { scale: 1, opacity: 0.4 }
              : isUnlocked
              ? { scale: [1, 1.24, 1], opacity: [0.65, 0.15, 0.65] }
              : { scale: [1, 1.06, 1], opacity: [0.22, 0.1, 0.22] }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={[
            'pointer-events-none absolute -inset-4 rounded-full border-2 blur-[1px]',
            isUnlocked
              ? 'border-amber-400 bg-amber-500/20'
              : 'border-slate-700 bg-slate-800/20',
          ].join(' ')}
        />

        <motion.button
          type="button"
          disabled={!isUnlocked}
          onClick={handleTrophyClick}
          style={button3DStyle}
          aria-label={
            isUnlocked
              ? 'Trofeo de graduación desbloqueado. Pulsa para celebrar y ver tu checklist'
              : 'Trofeo bloqueado. Completa las 4 etapas anteriores para desbloquearlo'
          }
          animate={
            prefersReducedMotion
              ? { y: 0, scale: 1 }
              : isUnlocked
              ? { y: [0, -8, 0], scale: [1, 1.05, 1] }
              : { y: 0, scale: 1 }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileTap={
            isUnlocked
              ? {
                  y: 6,
                  scale: 0.97,
                  boxShadow:
                    '0 4px 0 #92400E, 0 10px 24px rgba(245, 158, 11, 0.55)',
                }
              : undefined
          }
          className={[
            'relative flex h-32 w-32 items-center justify-center rounded-full border-4 select-none transition-all duration-200',
            isUnlocked
              ? 'border-amber-200/90 bg-gradient-to-b from-[#FDE047] via-[#F59E0B] to-[#D97706] text-slate-950 cursor-pointer hover:brightness-110'
              : 'border-slate-700/80 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-slate-500 cursor-not-allowed',
          ].join(' ')}
        >
          <span
            className={[
              'pointer-events-none absolute top-2.5 left-1/2 -translate-x-1/2 h-8 w-20 rounded-full bg-gradient-to-b from-white/50 to-transparent',
              !isUnlocked && 'opacity-15',
            ]
              .filter(Boolean)
              .join(' ')}
          />

          <Trophy
            className={[
              'h-14 w-14 transition-transform duration-300',
              isUnlocked
                ? 'text-slate-950 drop-shadow-[0_3px_6px_rgba(255,255,255,0.45)]'
                : 'text-slate-600',
            ].join(' ')}
          />

          {!isUnlocked && (
            <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-950 bg-slate-800 text-slate-400 shadow-lg">
              <Lock className="h-4 w-4" />
            </span>
          )}
        </motion.button>

        {/* Locked Hover Tooltip */}
        {!isUnlocked && (
          <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 z-30 hidden whitespace-nowrap rounded-xl border border-white/15 bg-slate-900/95 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-2xl backdrop-blur-md group-hover:block">
            Completa las 4 etapas para desbloquear tu Trofeo
            <div className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-slate-900/95" />
          </div>
        )}
      </div>

      {/* LOCKED CAPTION CARD */}
      {!isUnlocked && (
        <div className="mt-5 w-72 sm:w-80 rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-center opacity-70 backdrop-blur-md">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/5 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Meta Final
          </span>
          <h3 className="mt-2 text-lg font-extrabold tracking-tight text-slate-400 sm:text-xl">
            {TROPHY_STAGE.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
            Completa el recorrido para desbloquear tu graduación y el detalle de tus entregas y accesos.
          </p>
        </div>
      )}

      {/* UNLOCKED GRADUATION + INFORMATIVE DELIVERABLES BLOCK */}
      {isUnlocked && isPanelOpen && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mt-6 w-full max-w-xl overflow-hidden rounded-3xl border border-amber-300/35 bg-gradient-to-b from-[#14294D]/95 via-[#0F1D38]/95 to-slate-950/95 p-6 sm:p-8 text-white shadow-[0_24px_70px_rgba(2,6,23,0.9),0_0_50px_rgba(245,158,11,0.18)] backdrop-blur-xl"
        >
          {/* Top Golden/Electric-Blue Accent Line */}
          <div className="pointer-events-none -mx-8 -mt-8 mb-6 h-1.5 bg-gradient-to-r from-[#F59E0B] via-[#FDE047] to-[#1689F8]" />

          {/* 1. Congratulations Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/35 bg-amber-400/15 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" />
              Capacitación Completada
            </span>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              ¡Felicitaciones, completaste tu onboarding!
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-[#DDEEFF]/90">
              Ya conoces mejor a Datacorp, su equipo y cómo trabajamos. Antes de comenzar, revisa tus entregas y accesos.
            </p>
          </div>

          {/* 2. Informative Deliverables & Accesses List */}
          <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.04] p-5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3.5">
              <ClipboardList className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Entregas y accesos de tu ingreso
              </h3>
            </div>

            <ul className="mt-4 space-y-2.5">
              {FINAL_CHECKLIST_ITEMS.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-left text-xs sm:text-sm font-semibold text-slate-100"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full bg-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.75)]"
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>

            {/* 3. Support Contact Message */}
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#60A5FA]/25 bg-[#1689F8]/10 px-4 py-3 text-left text-xs sm:text-sm leading-relaxed text-[#DDEEFF]">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#60A5FA]" aria-hidden="true" />
              <p>
                Si aún no has recibido alguno de estos elementos, escribe a Felipe Osorio:{' '}
                <a
                  href="mailto:fosorio@datasur.com"
                  className="font-bold text-[#93C5FD] underline decoration-[#60A5FA]/60 underline-offset-2 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] rounded"
                >
                  fosorio@datasur.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

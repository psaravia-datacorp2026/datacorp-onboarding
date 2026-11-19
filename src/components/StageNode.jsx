import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, RotateCcw, Play } from 'lucide-react';

/**
 * Reusable 3D Duolingo-style StageNode component.
 * - Handles 3D raised/embossed button depth (bottom lip shadow + active press-down transform)
 * - Continuous Framer Motion floating/bouncing animation when ACTIVE
 * - Re-playable when COMPLETED (clickable)
 * - Unclickable with tooltip when LOCKED
 * - Zigzag horizontal offset positioning
 */
export default function StageNode({ stage, unlockedStage, onSelect }) {
  const isCompleted = stage.id < unlockedStage;
  const isActive = stage.id === unlockedStage;
  const isLocked = stage.id > unlockedStage;
  const isInteractive = isCompleted || isActive;

  const { Icon, theme, xOffset } = stage;

  // Dynamic 3D box-shadow (8px raised lip + outer glow for unlocked nodes)
  const button3DStyle = isLocked
    ? {
        boxShadow: '0 8px 0 #0f172a, 0 12px 20px rgba(2, 6, 23, 0.85)',
      }
    : {
        boxShadow: `0 8px 0 ${theme.lipColor}, 0 14px 32px ${
          isActive ? theme.glowColor : 'rgba(15, 23, 42, 0.75)'
        }`,
      };

  const handleClick = () => {
    if (isInteractive) {
      onSelect(stage, isCompleted ? 'completed' : 'active');
    }
  };

  return (
    <div
      style={{ transform: `translateX(${xOffset}px)` }}
      className="group relative z-10 flex flex-col items-center transition-transform duration-300"
    >
      {/* Floating "EMPEZAR" Crown Tooltip for the ACTIVE Node */}
      {isActive && (
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-3 flex items-center gap-1.5 rounded-xl border border-white/25 bg-slate-900/95 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-[0_8px_25px_rgba(37,99,235,0.5)] backdrop-blur-md"
        >
          <span
            className="h-2 w-2 rounded-full animate-ping"
            style={{ backgroundColor: theme.strokeColor }}
          />
          <span>Etapa Actual</span>
          <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/25 bg-slate-900/95" />
        </motion.div>
      )}

      {/* 3D Node Button Wrapper */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Pulsing Base Ring for ACTIVE Node */}
        {isActive && (
          <motion.div
            animate={{
              scale: [1, 1.24, 1],
              opacity: [0.65, 0.12, 0.65],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ borderColor: theme.strokeColor }}
            className="pointer-events-none absolute -inset-3.5 rounded-full border-2 bg-white/5 blur-[1px]"
          />
        )}

        {/* 3D Embossed Circular Button */}
        <motion.button
          type="button"
          disabled={isLocked}
          onClick={handleClick}
          style={button3DStyle}
          animate={isActive ? { y: [0, -8, 0] } : { y: 0 }}
          transition={
            isActive
              ? {
                  duration: 1.9,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : undefined
          }
          whileTap={
            isInteractive
              ? {
                  y: 5,
                  boxShadow: `0 3px 0 ${theme.lipColor}, 0 6px 14px rgba(2, 6, 23, 0.7)`,
                }
              : undefined
          }
          className={[
            'relative flex h-24 w-24 items-center justify-center rounded-full border-2 select-none transition-transform duration-150',
            isInteractive && `bg-gradient-to-b ${theme.topBg} ${theme.ringColor} text-white cursor-pointer hover:brightness-110`,
            isLocked &&
              'border-slate-700/70 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-500 cursor-not-allowed',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {/* Inner 3D Specular Top Shine (Duolingo dome shine effect) */}
          <span
            className={[
              'pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 h-6 w-14 rounded-full bg-gradient-to-b from-white/35 to-transparent',
              isLocked && 'opacity-20',
            ]
              .filter(Boolean)
              .join(' ')}
          />

          {/* Main Stage Icon */}
          {isLocked ? (
            <Lock className="h-8 w-8 text-slate-500 drop-shadow" />
          ) : (
            <Icon className="h-9 w-9 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]" />
          )}

          {/* Completed Checkmark Badge */}
          {isCompleted && (
            <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-emerald-500 text-white shadow-[0_3px_0_#047857]">
              <Check className="h-4 w-4 stroke-[3]" />
            </span>
          )}
        </motion.button>

        {/* Hover Tooltip for LOCKED Stage */}
        {isLocked && (
          <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 z-30 hidden whitespace-nowrap rounded-xl border border-white/15 bg-slate-900/95 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-2xl backdrop-blur-md group-hover:block">
            Completa la etapa anterior para desbloquear
            <div className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-slate-900/95" />
          </div>
        )}
      </div>

      {/* Stage Title & Humanized Description Pill Card */}
      <div
        onClick={handleClick}
        className={[
          'mt-4 w-64 sm:w-72 rounded-2xl border p-4 text-center backdrop-blur-md transition-all duration-300',
          isActive &&
            'border-white/25 bg-slate-900/85 shadow-[0_12px_35px_rgba(2,6,23,0.85)] cursor-pointer hover:border-white/40',
          isCompleted &&
            'border-white/15 bg-slate-900/70 cursor-pointer hover:border-white/30 hover:bg-slate-900/85',
          isLocked &&
            'border-white/5 bg-slate-950/55 opacity-65 cursor-not-allowed',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex items-center justify-center gap-2">
          <span
            className={[
              'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
              isLocked
                ? 'border-white/5 bg-white/5 text-slate-500'
                : `${theme.badgeBg} ${theme.badgeText}`,
            ].join(' ')}
          >
            Etapa {stage.id}
          </span>

          {isCompleted && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
              <RotateCcw className="h-2.5 w-2.5" />
              Repasar
            </span>
          )}

          {isActive && (
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-400/30 bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-200">
              <Play className="h-2.5 w-2.5 fill-current" />
              Jugar
            </span>
          )}
        </div>

        <h3
          className={[
            'mt-2 text-base font-extrabold tracking-tight sm:text-lg',
            isLocked ? 'text-slate-500' : 'text-white',
          ].join(' ')}
        >
          {stage.title}
        </h3>

        <p
          className={[
            'mt-1 text-xs leading-relaxed',
            isLocked ? 'text-slate-600' : 'text-slate-300',
          ].join(' ')}
        >
          {stage.subtitle}
        </p>
      </div>
    </div>
  );
}

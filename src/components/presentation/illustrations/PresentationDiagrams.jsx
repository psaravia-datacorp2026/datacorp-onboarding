import React from 'react';
import { motion } from 'framer-motion';

/**
 * Flowing electric-blue editorial ribbon curve (inspired by ref. page 3).
 */
export function EditorialBlueCurve({ className = '', reducedMotion = false }) {
  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <defs>
        <linearGradient id="dcEditorialRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#258AFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#1689F8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 410 -30 C 445 140, 385 280, 240 270 C 110 260, 105 95, 235 90 C 370 85, 440 255, 435 530"
        stroke="url(#dcEditorialRibbon)"
        strokeWidth="10"
        strokeLinecap="round"
        initial={reducedMotion ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      />
    </svg>
  );
}

/**
 * B2B2B Connection SVG Diagram (Empresa -> Aliado -> Empresas) for Slide 08 (Datlas & EXIM).
 * Unified Navy + Electric Blue + Soft Pastel Blue palette.
 */
export function B2B2BFlowDiagram({ reducedMotion = false }) {
  return (
    <svg
      viewBox="0 0 820 96"
      fill="none"
      role="img"
      aria-label="Esquema del modelo B2B2B: Datacorp EXIM conecta con Aliados y éstos con múltiples Empresas usuarias"
      className="w-full max-w-3xl h-auto"
    >
      <defs>
        <linearGradient id="b2bBlueGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#14294D" />
          <stop offset="50%" stopColor="#1689F8" />
          <stop offset="100%" stopColor="#258AFF" />
        </linearGradient>
      </defs>

      {/* Connecting animated path */}
      <motion.path
        d="M 210 48 L 320 48 M 500 48 L 610 48"
        stroke="url(#b2bBlueGrad)"
        strokeWidth="3"
        strokeDasharray="6 6"
        initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.75, ease: 'easeOut', delay: 0.2 }}
      />

      {/* Arrowheads */}
      <polygon points="316,42 328,48 316,54" fill="#1689F8" />
      <polygon points="606,42 618,48 606,54" fill="#258AFF" />

      {/* Node 1: Datacorp / EXIM */}
      <g transform="translate(16, 12)">
        <rect width="194" height="72" rx="16" fill="#14294D" />
        <text x="97" y="29" textAnchor="middle" fill="#60A5FA" fontSize="10" fontWeight="700" letterSpacing="1">
          EMPRESA ORIGEN (B2B)
        </text>
        <text x="97" y="51" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="800">
          Datlas · EXIM
        </text>
      </g>

      {/* Node 2: Aliado (Cámaras, Partners, White Label) */}
      <g transform="translate(328, 12)">
        <rect width="172" height="72" rx="16" fill="#EAF4FF" stroke="#1689F8" strokeWidth="1.5" />
        <text x="86" y="29" textAnchor="middle" fill="#1689F8" fontSize="10" fontWeight="700" letterSpacing="1">
          ALIADO CANAL
        </text>
        <text x="86" y="51" textAnchor="middle" fill="#14294D" fontSize="14" fontWeight="800">
          Cámaras y Partners
        </text>
      </g>

      {/* Node 3: Empresas finales */}
      <g transform="translate(618, 12)">
        <rect width="186" height="72" rx="16" fill="#FFFFFF" stroke="#14294D" strokeOpacity="0.18" strokeWidth="1.5" />
        <text x="93" y="29" textAnchor="middle" fill="#1689F8" fontSize="10" fontWeight="700" letterSpacing="1">
          USUARIOS FINALES (2B)
        </text>
        <text x="93" y="51" textAnchor="middle" fill="#14294D" fontSize="14" fontWeight="800">
          Empresas y Equipos
        </text>
      </g>
    </svg>
  );
}

/**
 * Editorial Pill Eyebrow Badge (inspired by BRIX AI ref. pages 1, 3, 7, 13, 15).
 * Strictly uses Electric Blue, Soft Pastel Blue, or Deep Navy.
 */
export function EditorialEyebrow({ children, variant = 'electric' }) {
  const styles = {
    electric:
      'bg-gradient-to-r from-[#1689F8] to-[#258AFF] text-white shadow-[0_6px_18px_rgba(22,137,248,0.28)] border-transparent',
    pastel:
      'bg-[#EAF4FF] text-[#1689F8] border-[#1689F8]/20',
    navy:
      'bg-[#14294D] text-white border-white/10',
    darkGlass:
      'bg-[#1689F8]/20 text-[#60A5FA] border-[#258AFF]/35 backdrop-blur-md',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] ${
        styles[variant] || styles.electric
      }`}
    >
      {children}
    </span>
  );
}

/**
 * Soft Blue Icon Badge (inspired by BRIX AI ref. pages 6, 7, 8, 9, 22).
 */
export function SoftBlueIconOrb({ children, dark = false, size = 'md' }) {
  const dims = size === 'lg' ? 'h-12 w-12 rounded-2xl' : 'h-10 w-10 rounded-xl';
  return (
    <div
      className={`flex shrink-0 items-center justify-center ${dims} ${
        dark
          ? 'bg-[#1689F8]/20 border border-[#60A5FA]/30 text-[#60A5FA] shadow-[0_0_20px_rgba(22,137,248,0.2)]'
          : 'bg-gradient-to-br from-[#EAF4FF] to-[#DDEEFF] border border-[#1689F8]/15 text-[#1689F8] shadow-xs'
      }`}
    >
      {children}
    </div>
  );
}

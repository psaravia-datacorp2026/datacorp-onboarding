import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Cpu,
  Zap,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Terminal,
  LockOpen,
  RotateCcw,
} from 'lucide-react';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { STAGE4_TARGET_CORRECT } from '../services/onboardingPersistence';

const TARGET_CORRECT = STAGE4_TARGET_CORRECT;

/**
 * Banco de 15 preguntas de comprensión general, claras y cotidianas (sin tecnicismos ni cifras de memoria),
 * cada una con su explicación específica basada en la presentación de Datacorp.
 */
export const CORE_QUIZ_POOL = [
  {
    id: 1,
    question: '¿Qué busca hacer Datacorp con los datos de comercio exterior?',
    options: [
      'Convertirlos en información útil para decidir.',
      'Guardarlos sin cambios en archivos privados.',
      'Usarlos únicamente para trámites internos.',
    ],
    correctAnswer: 'Convertirlos en información útil para decidir.',
    explanation:
      'El propósito de Datacorp es transformar los registros de comercio exterior en inteligencia accionable para respaldar mejores decisiones comerciales y estratégicas.',
  },
  {
    id: 2,
    question: '¿Cuántas empresas comerciales integran el ecosistema?',
    options: ['Tres.', 'Una sola.', 'Cinco.'],
    correctAnswer: 'Tres.',
    explanation:
      'El ecosistema comercial de Datacorp está integrado por tres empresas especializadas: Datasur/Macroscope, Imexdbusiness y Datlas.',
  },
  {
    id: 3,
    question: '¿Qué plataforma corresponde a Datasur/Macroscope?',
    options: ['DComex.', 'EXIM.', 'Zoho One.'],
    correctAnswer: 'DComex.',
    explanation:
      'DComex es la plataforma comercial de Datasur/Macroscope orientada a ofrecer inteligencia de mercados en Latinoamérica.',
  },
  {
    id: 4,
    question: '¿Qué plataforma corresponde a Datlas?',
    options: ['EXIM.', 'DComex.', 'Gestor.'],
    correctAnswer: 'EXIM.',
    explanation:
      'EXIM es la plataforma de Datlas diseñada para integrar inteligencia comercial en ecosistemas de aliados y partners bajo un modelo B2B2B.',
  },
  {
    id: 5,
    question: '¿Cuál es el papel principal de Imexdbusiness?',
    options: [
      'Llevar soluciones e inteligencia comercial a clientes internacionales.',
      'Atender únicamente a pequeñas tiendas locales.',
      'Administrar los recursos humanos del grupo.',
    ],
    correctAnswer:
      'Llevar soluciones e inteligencia comercial a clientes internacionales.',
    explanation:
      'Imexdbusiness actúa como puente hacia mercados internacionales como Asia y Europa mediante venta consultiva enterprise, Bulk Data, White Label e inteligencia embebida.',
  },
  {
    id: 6,
    question: '¿Qué comparten las tres empresas?',
    options: [
      'Capacidades de producción de datos, desarrollo e innovación.',
      'Un único nombre comercial para todos los clientes.',
      'El mismo equipo de ventas en una sola oficina.',
    ],
    correctAnswer:
      'Capacidades de producción de datos, desarrollo e innovación.',
    explanation:
      'Las tres empresas se apoyan en una misma fábrica corporativa que unifica Producción de Datos, Desarrollo e Innovación para reutilizar componentes y evitar duplicidades.',
  },
  {
    id: 7,
    question: '¿Las tres empresas usan exactamente la misma plataforma comercial?',
    options: [
      'No, mantienen plataformas e identidades independientes.',
      'Sí, todas venden desde un único sitio web idéntico.',
      'No tienen plataformas propias de atención.',
    ],
    correctAnswer: 'No, mantienen plataformas e identidades independientes.',
    explanation:
      'Compartir la capacidad productiva en Datacorp no implica una única interfaz: cada empresa mantiene su plataforma e identidad comercial adaptada a su mercado.',
  },
  {
    id: 8,
    question: '¿Para qué sirve el Data Core?',
    options: [
      'Preparar datos confiables que puedan usarse en varios productos.',
      'Reemplazar la atención comercial a los clientes.',
      'Diseñar campañas publicitarias en redes sociales.',
    ],
    correctAnswer:
      'Preparar datos confiables que puedan usarse en varios productos.',
    explanation:
      'El Data Core centraliza la captura, limpieza, homologación y gobierno del dato una sola vez para alimentar de forma confiable a DComex, IMEX y EXIM.',
  },
  {
    id: 9,
    question: '¿Qué busca el Data Lab?',
    options: [
      'Probar ideas y comprobar su valor antes de escalarlas.',
      'Lanzar cualquier idea al mercado sin probarla antes.',
      'Archivar reportes antiguos de contabilidad.',
    ],
    correctAnswer: 'Probar ideas y comprobar su valor antes de escalarlas.',
    explanation:
      'El Data Lab aplica un método de observación, prototipado y validación con evidencia para escalar solo las soluciones que demuestran valor real.',
  },
  {
    id: 10,
    question: '¿Cuál es el mercado principal de Datasur?',
    options: ['Latinoamérica.', 'Asia y Medio Oriente.', 'Solo Europa.'],
    correctAnswer: 'Latinoamérica.',
    explanation:
      'Datasur/Macroscope concentra su operación comercial en Latinoamérica (Perú, Chile, Colombia, México, Ecuador y Paraguay), sosteniendo la base de clientes y flujo de caja del grupo.',
  },
  {
    id: 11,
    question: '¿Cómo quiere crecer Datlas?',
    options: [
      'Mediante tecnología, EXIM y alianzas con otras organizaciones.',
      'Solo con llamadas telefónicas puerta a puerta.',
      'Cerrando sus plataformas digitales.',
    ],
    correctAnswer:
      'Mediante tecnología, EXIM y alianzas con otras organizaciones.',
    explanation:
      'Datlas impulsa su crecimiento con un modelo B2B2B que integra EXIM, capacidades de IA y APIs en cámaras, partners tecnológicos y plataformas de terceros.',
  },
  {
    id: 12,
    question: '¿Qué significa reducir la deuda técnica?',
    options: [
      'Mejorar sistemas y disminuir problemas y tareas manuales.',
      'Pedir un préstamo bancario para comprar oficinas.',
      'Hacer todos los reportes a mano en papel.',
    ],
    correctAnswer: 'Mejorar sistemas y disminuir problemas y tareas manuales.',
    explanation:
      'Pagar la deuda técnica moderniza plataformas, automatiza procesos repetitivos y reduce dependencias rígidas y riesgos operativos para ganar velocidad.',
  },
  {
    id: 13,
    question: '¿Qué hace un Gestor de Negocios?',
    options: [
      'Comprende necesidades y asesora al cliente.',
      'Despacha contenedores físicos en el puerto.',
      'Se limita a enviar enlaces de descarga sin hablar con el cliente.',
    ],
    correctAnswer: 'Comprende necesidades y asesora al cliente.',
    explanation:
      'Un Gestor de Negocios evoluciona desde la venta improvisada hacia la asesoría consultiva, diagnosticando el problema del cliente con apoyo de CRM y datos.',
  },
  {
    id: 14,
    question: '¿Qué buscamos al integrar información de CRM y ERP?',
    options: [
      'Tomar mejores decisiones con datos confiables.',
      'Tener más planillas sueltas en cada área.',
      'Dejar de atender a los clientes actuales.',
    ],
    correctAnswer: 'Tomar mejores decisiones con datos confiables.',
    explanation:
      'Integrar CRM, Gestor y ERP en Zoho One permite contar con información consistente dentro de Datacorp para analizar resultados y anticipar decisiones.',
  },
  {
    id: 15,
    question: '¿Qué significa Accountability en Datacorp?',
    options: [
      'Compromiso, autonomía y responsabilidad con transparencia.',
      'Controlar horarios estrictos sin confianza en el equipo.',
      'Trabajar de forma aislada sin compartir avances.',
    ],
    correctAnswer:
      'Compromiso, autonomía y responsabilidad con transparencia.',
    explanation:
      'En nuestra cultura, Accountability combina autonomía y claridad sobre los resultados esperados con transparencia y feedback bidireccional, nunca fiscalización.',
  },
];

const BUBBLES = [
  { id: 'b1', left: '18%', size: 7, delay: 0, duration: 2.8 },
  { id: 'b2', left: '42%', size: 5, delay: 0.9, duration: 2.3 },
  { id: 'b3', left: '66%', size: 8, delay: 0.4, duration: 3.1 },
  { id: 'b4', left: '80%', size: 4, delay: 1.4, duration: 2.5 },
];

/**
 * Native Fisher-Yates shuffle helper.
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Prepares a shuffled deck of questions with shuffled options, excluding already-solved IDs
 * and avoiding repeating `lastQuestionId` immediately when alternatives exist.
 */
export function createShuffledDeck(excludeIds = [], lastQuestionId = null) {
  const pool = CORE_QUIZ_POOL.filter((q) => !excludeIds.includes(q.id));
  const source = pool.length > 0 ? pool : CORE_QUIZ_POOL;
  const shuffled = shuffleArray(source).map((item) => ({
    ...item,
    shuffledOptions: shuffleArray(item.options),
  }));

  if (
    lastQuestionId !== null &&
    shuffled.length > 1 &&
    shuffled[0].id === lastQuestionId
  ) {
    const altIdx = shuffled.findIndex((q) => q.id !== lastQuestionId);
    if (altIdx > 0) {
      [shuffled[0], shuffled[altIdx]] = [shuffled[altIdx], shuffled[0]];
    }
  }

  return shuffled;
}

function formatChargePercent(chargePercent) {
  return Number.isInteger(chargePercent)
    ? `${chargePercent}%`
    : `${String(chargePercent).replace('.', ',')}%`;
}

/**
 * Left Column Visual: Transparent Futuristic Energy Tank / Data Core Reactor.
 */
function DataCoreVisualizer({
  correctCount,
  isErrorPulse,
  isWon,
  prefersReducedMotion,
}) {
  const clampedCount = Math.min(Math.max(correctCount, 0), TARGET_CORRECT);
  const chargeRatio = clampedCount / TARGET_CORRECT;
  const chargePercent = chargeRatio * 100;
  const chargePercentLabel = formatChargePercent(chargePercent);

  const statusText = isErrorPulse
    ? `Error registrado · Carga preservada (${chargePercentLabel})`
    : isWon
    ? 'Depósito al 100% · Carga completa'
    : clampedCount > 0
    ? `Energía en carga · ${chargePercentLabel}`
    : 'Depósito listo para cargar';

  return (
    <div
      data-testid="datacore-tank-card"
      className={[
        'relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border bg-gradient-to-b from-slate-900/90 via-indigo-950/65 to-slate-950/95 p-5 sm:p-7 backdrop-blur-xl transition-colors duration-300 shadow-[0_20px_70px_rgba(2,6,23,0.9)]',
        isErrorPulse
          ? 'border-rose-400/75 shadow-[0_0_45px_rgba(244,63,94,0.38)]'
          : isWon
          ? 'border-cyan-300/60 shadow-[0_0_55px_rgba(56,189,248,0.35)]'
          : 'border-white/15',
      ].join(' ')}
    >
      {/* Ambient Aura Behind Tank */}
      <div
        aria-hidden="true"
        style={{
          opacity: isErrorPulse ? 0.52 : 0.16 + chargeRatio * 0.45,
          transform: `scale(${0.88 + chargeRatio * 0.28})`,
        }}
        className={[
          'pointer-events-none absolute h-56 w-56 rounded-full blur-[85px] transition-all duration-500',
          isErrorPulse
            ? 'bg-rose-500'
            : isWon
            ? 'bg-cyan-400'
            : 'bg-blue-500',
        ].join(' ')}
      />

      {/* Top Status Chip & Clear Instruction */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-200">
          <Cpu className="h-3.5 w-3.5 text-sky-400" />
          <span>Estado del Data Core</span>
        </div>

        <p className="mt-2.5 max-w-xs text-xs sm:text-sm font-medium leading-snug text-slate-200">
          Consigue 8 respuestas correctas para cargar el Data Core
        </p>
      </div>

      {/* Futuristic Transparent Reactor Tank + 8 Side Segments */}
      <div className="relative z-10 my-5 flex items-center justify-center gap-4 sm:gap-5">
        {/* Tank Assembly */}
        <div
          role="progressbar"
          aria-label="Carga del Data Core"
          aria-valuemin={0}
          aria-valuemax={TARGET_CORRECT}
          aria-valuenow={clampedCount}
          aria-valuetext={`${clampedCount} de ${TARGET_CORRECT} núcleos activados (${chargePercentLabel})`}
          className="relative flex flex-col items-center"
        >
          {/* Metallic Top Cap */}
          <div className="z-10 flex h-4 w-24 sm:w-28 items-center justify-between rounded-t-xl border border-b-0 border-sky-300/35 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 px-3 shadow-[0_-4px_12px_rgba(14,165,233,0.2)]">
            <span
              className={[
                'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                isErrorPulse
                  ? 'bg-rose-400 shadow-[0_0_8px_#FB7185]'
                  : isWon
                  ? 'bg-cyan-300 shadow-[0_0_8px_#67E8F9]'
                  : 'bg-sky-400/80',
              ].join(' ')}
            />
            <span className="h-1 w-8 rounded-full bg-white/20" />
            <span
              className={[
                'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                isErrorPulse
                  ? 'bg-rose-400 shadow-[0_0_8px_#FB7185]'
                  : isWon
                  ? 'bg-cyan-300 shadow-[0_0_8px_#67E8F9]'
                  : 'bg-sky-400/80',
              ].join(' ')}
            />
          </div>

          {/* Transparent Glass Vessel */}
          <div
            data-testid="datacore-tank-chamber"
            className={[
              'relative h-52 w-32 sm:h-64 sm:w-40 overflow-hidden rounded-[1.6rem] border-2 bg-slate-950/75 shadow-[inset_0_0_32px_rgba(15,23,42,0.95),0_12px_36px_rgba(2,6,23,0.85)] transition-colors duration-300',
              isErrorPulse
                ? 'border-rose-400/90 shadow-[inset_0_0_30px_rgba(244,63,94,0.45),0_0_24px_rgba(244,63,94,0.4)]'
                : isWon
                ? 'border-cyan-300/85 shadow-[inset_0_0_32px_rgba(34,211,238,0.35),0_0_30px_rgba(56,189,248,0.45)]'
                : 'border-sky-300/35',
            ].join(' ')}
          >
            {/* Subtle Inner Background Grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.12) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Liquid Column Anchored to Bottom */}
            <motion.div
              data-testid="datacore-liquid"
              initial={false}
              animate={{ height: `${chargePercent}%` }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.2, ease: 'linear' }
                  : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
              className="absolute inset-x-0 bottom-0 overflow-visible"
            >
              {/* Luminous Cyan / Electric Blue Fluid Body */}
              <div
                className={[
                  'relative h-full w-full transition-colors duration-300',
                  isWon
                    ? 'bg-gradient-to-t from-[#1D4ED8] via-[#0EA5E9] to-[#67E8F9] shadow-[0_0_32px_rgba(56,189,248,0.8)]'
                    : 'bg-gradient-to-t from-[#1E40AF] via-[#2563EB] to-[#38BDF8] shadow-[0_0_24px_rgba(56,189,248,0.55)]',
                ].join(' ')}
              >
                {/* Internal vertical core glow */}
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent" />

                {/* Subtle Rising Bubbles inside Liquid */}
                {!prefersReducedMotion && clampedCount > 0 && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {BUBBLES.map((bubble) => (
                      <motion.span
                        key={bubble.id}
                        style={{
                          left: bubble.left,
                          width: bubble.size,
                          height: bubble.size,
                        }}
                        animate={{
                          y: [0, -140],
                          opacity: [0, 0.7, 0],
                          scale: [0.8, 1.15, 0.9],
                        }}
                        transition={{
                          duration: bubble.duration,
                          repeat: Infinity,
                          delay: bubble.delay,
                          ease: 'easeOut',
                        }}
                        className="absolute bottom-2 rounded-full bg-cyan-100/80 shadow-[0_0_6px_rgba(255,255,255,0.75)]"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* SVG Luminous Wave Surface (Meniscus) */}
              {clampedCount > 0 && (
                <div className="pointer-events-none absolute -top-2.5 inset-x-0 h-3 overflow-hidden">
                  <motion.svg
                    viewBox="0 0 200 16"
                    preserveAspectRatio="none"
                    animate={
                      prefersReducedMotion
                        ? { x: 0 }
                        : { x: ['0%', '-50%'] }
                    }
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : {
                            duration: 3.2,
                            repeat: Infinity,
                            ease: 'linear',
                          }
                    }
                    className="h-full w-[200%]"
                  >
                    <path
                      d="M0 9 Q 25 3, 50 9 T 100 9 T 150 9 T 200 9 L 200 16 L 0 16 Z"
                      fill="#7DD3FC"
                      fillOpacity="0.9"
                    />
                    <path
                      d="M0 9 Q 25 3, 50 9 T 100 9 T 150 9 T 200 9"
                      fill="none"
                      stroke="#E0F2FE"
                      strokeWidth="2"
                    />
                  </motion.svg>
                </div>
              )}
            </motion.div>

            {/* Brief Red Reaction Overlay on Error (does NOT reduce fluid height) */}
            <AnimatePresence>
              {isErrorPulse && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.12 : 0.2 }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-rose-600/20 via-rose-500/25 to-rose-400/30"
                />
              )}
            </AnimatePresence>

            {/* 7 Horizontal Measurement Ticks Dividing Tank Into 8 Equal 12.5% Levels */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              {Array.from({ length: TARGET_CORRECT - 1 }).map((_, idx) => {
                const bottomPercent = ((idx + 1) / TARGET_CORRECT) * 100;
                const isLevelReached = idx + 1 <= clampedCount;
                return (
                  <div
                    key={idx}
                    style={{ bottom: `${bottomPercent}%` }}
                    className="absolute inset-x-0 flex items-center justify-between px-2"
                  >
                    <span
                      className={[
                        'h-px w-3.5 transition-colors duration-300',
                        isLevelReached ? 'bg-cyan-100/80' : 'bg-white/25',
                      ].join(' ')}
                    />
                    <span className="h-px flex-1 border-t border-dashed border-white/10" />
                    <span
                      className={[
                        'h-px w-3.5 transition-colors duration-300',
                        isLevelReached ? 'bg-cyan-100/80' : 'bg-white/25',
                      ].join(' ')}
                    />
                  </div>
                );
              })}
            </div>

            {/* Vertical Glass Reflection Streaks */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-3 left-2.5 w-2.5 rounded-full bg-gradient-to-b from-white/35 via-white/10 to-white/20 blur-[0.5px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-5 right-2.5 w-1 rounded-full bg-gradient-to-b from-white/20 via-transparent to-white/15"
            />

            {/* Readable Centered Energy Percentage Readout */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-2 text-center">
              <div className="flex flex-col items-center rounded-2xl border border-white/20 bg-slate-950/65 px-3.5 py-2 backdrop-blur-sm shadow-lg">
                <Zap
                  className={[
                    'h-5 w-5 transition-colors duration-300',
                    isErrorPulse
                      ? 'text-rose-300'
                      : isWon
                      ? 'text-cyan-200'
                      : 'text-sky-300',
                  ].join(' ')}
                />
                <span className="mt-0.5 font-mono text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  {chargePercentLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Metallic Base Pedestal */}
          <div className="z-10 flex h-5 w-28 sm:w-32 items-center justify-center rounded-b-xl border border-t-0 border-sky-300/35 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-[0_6px_16px_rgba(2,6,23,0.9)]">
            <span className="h-1 w-14 rounded-full bg-sky-400/35" />
          </div>
        </div>

        {/* 8 Discrete Charge Segments Column (Top = 8 down to Bottom = 1) */}
        <div
          aria-hidden="true"
          className="flex h-52 sm:h-64 flex-col justify-between py-1"
        >
          {Array.from({ length: TARGET_CORRECT }).map((_, idx) => {
            const levelNumber = TARGET_CORRECT - idx;
            const isCharged = levelNumber <= clampedCount;
            return (
              <div key={levelNumber} className="flex items-center gap-2">
                <div
                  className={[
                    'h-4 sm:h-5 w-6 sm:w-7 rounded-md border transition-all duration-300 flex items-center justify-center text-[10px] font-mono font-bold',
                    isCharged
                      ? 'border-cyan-200/80 bg-gradient-to-r from-blue-500 to-cyan-300 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.75)]'
                      : isErrorPulse
                      ? 'border-rose-400/45 bg-rose-950/50 text-rose-300/70'
                      : 'border-white/12 bg-slate-900/80 text-slate-500',
                  ].join(' ')}
                >
                  {levelNumber}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exact Visible Counter & Accessible Non-Color Status */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-sm sm:text-base font-extrabold text-white">
          <span className="text-cyan-300">{clampedCount}</span> de{' '}
          <span>{TARGET_CORRECT}</span> núcleos activados
        </p>
        <span
          className={[
            'mt-1.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-[11px] font-bold',
            isErrorPulse
              ? 'border-rose-400/40 bg-rose-500/15 text-rose-200'
              : isWon
              ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200'
              : 'border-sky-400/25 bg-sky-500/10 text-sky-200',
          ].join(' ')}
        >
          {statusText}
        </span>
      </div>
    </div>
  );
}

export default function Stage4View({ onBackToPath }) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const activeParticipantId = useOnboardingStore(
    (state) => state.activeParticipantId
  );
  const correctCount = useOnboardingStore((state) => state.stage4CorrectCount);
  const solvedIds = useOnboardingStore((state) => state.stage4SolvedIds);
  const recordStage4Correct = useOnboardingStore(
    (state) => state.recordStage4Correct
  );
  const resetStage4Quiz = useOnboardingStore((state) => state.resetStage4Quiz);
  const completeStage = useOnboardingStore((state) => state.completeStage);

  const [deck, setDeck] = useState(() =>
    createShuffledDeck(useOnboardingStore.getState().stage4SolvedIds)
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [turnCount, setTurnCount] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [isErrorPulse, setIsErrorPulse] = useState(false);
  const [holdWinTransition, setHoldWinTransition] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const correctTimerRef = useRef(null);
  const errorPulseTimerRef = useRef(null);
  const continueButtonRef = useRef(null);

  const clearPendingTimers = useCallback(() => {
    if (correctTimerRef.current) {
      clearTimeout(correctTimerRef.current);
      correctTimerRef.current = null;
    }
    if (errorPulseTimerRef.current) {
      clearTimeout(errorPulseTimerRef.current);
      errorPulseTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearPendingTimers();
  }, [clearPendingTimers]);

  // Reset local turn UI & reshuffle for the new participant without cross-sharing
  useEffect(() => {
    clearPendingTimers();
    const initialSolved = useOnboardingStore.getState().stage4SolvedIds || [];
    setDeck(createShuffledDeck(initialSolved));
    setQuestionIndex(0);
    setTurnCount(0);
    setAnswerFeedback(null);
    setIsErrorPulse(false);
    setHoldWinTransition(false);
    setLiveAnnouncement('');
  }, [activeParticipantId, clearPendingTimers]);

  // Autofocus Continue button when an incorrect-answer explanation opens
  useEffect(() => {
    if (answerFeedback?.status === 'wrong') {
      const frame = requestAnimationFrame(() => {
        continueButtonRef.current?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [answerFeedback]);

  const isWon = correctCount >= TARGET_CORRECT;
  const showWinScreen = isWon && !holdWinTransition;

  const currentQuestion = useMemo(
    () => deck[questionIndex] || deck[0],
    [deck, questionIndex]
  );

  const advanceToNextQuestion = useCallback(
    (updatedSolvedIds, currentQId) => {
      setTurnCount((prev) => prev + 1);
      if (questionIndex + 1 < deck.length) {
        const candidate = deck[questionIndex + 1];
        if (candidate && candidate.id !== currentQId) {
          setQuestionIndex((prev) => prev + 1);
          return;
        }
      }
      setDeck(createShuffledDeck(updatedSolvedIds, currentQId));
      setQuestionIndex(0);
    },
    [questionIndex, deck]
  );

  const handleOptionClick = useCallback(
    (option) => {
      if (answerFeedback !== null || isWon || holdWinTransition || !currentQuestion) {
        return;
      }

      if (option === currentQuestion.correctAnswer) {
        const nextScore = Math.min(correctCount + 1, TARGET_CORRECT);
        const nextSolved = solvedIds.includes(currentQuestion.id)
          ? solvedIds
          : [...solvedIds, currentQuestion.id];

        if (nextScore >= TARGET_CORRECT) {
          setHoldWinTransition(true);
        }

        setAnswerFeedback({
          status: 'correct',
          selectedOption: option,
          explanation: currentQuestion.explanation,
        });

        recordStage4Correct(currentQuestion.id);

        setLiveAnnouncement(
          `Respuesta correcta. ${nextScore} de ${TARGET_CORRECT} núcleos activados.`
        );

        const advanceDelay = prefersReducedMotion ? 320 : 720;
        correctTimerRef.current = setTimeout(() => {
          correctTimerRef.current = null;
          setAnswerFeedback(null);
          if (nextScore >= TARGET_CORRECT) {
            setHoldWinTransition(false);
          } else {
            advanceToNextQuestion(nextSolved, currentQuestion.id);
          }
        }, advanceDelay);
      } else {
        setAnswerFeedback({
          status: 'wrong',
          selectedOption: option,
          correctAnswer: currentQuestion.correctAnswer,
          explanation: currentQuestion.explanation,
        });

        setIsErrorPulse(true);
        errorPulseTimerRef.current = setTimeout(
          () => {
            errorPulseTimerRef.current = null;
            setIsErrorPulse(false);
          },
          prefersReducedMotion ? 260 : 480
        );

        setLiveAnnouncement(
          `Respuesta incorrecta. Respuesta correcta: ${currentQuestion.correctAnswer}. ${currentQuestion.explanation} Pulsa Continuar para seguir con ${correctCount} de ${TARGET_CORRECT} núcleos activados.`
        );
      }
    },
    [
      answerFeedback,
      isWon,
      holdWinTransition,
      currentQuestion,
      correctCount,
      solvedIds,
      recordStage4Correct,
      prefersReducedMotion,
      advanceToNextQuestion,
    ]
  );

  const handleContinueAfterError = useCallback(() => {
    if (answerFeedback?.status !== 'wrong' || !currentQuestion) return;
    setAnswerFeedback(null);
    setIsErrorPulse(false);
    advanceToNextQuestion(solvedIds, currentQuestion.id);
  }, [answerFeedback, currentQuestion, solvedIds, advanceToNextQuestion]);

  // Keyboard shortcuts (1/2/3 or A/B/C) while answering a question
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target?.tagName?.toLowerCase();
      if (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        e.target?.isContentEditable
      ) {
        return;
      }

      if (answerFeedback !== null || showWinScreen || !currentQuestion) {
        return;
      }

      const key = e.key.toLowerCase();
      const optionIndex =
        key === '1' || key === 'a'
          ? 0
          : key === '2' || key === 'b'
          ? 1
          : key === '3' || key === 'c'
          ? 2
          : -1;

      if (
        optionIndex >= 0 &&
        currentQuestion.shuffledOptions?.[optionIndex]
      ) {
        e.preventDefault();
        handleOptionClick(currentQuestion.shuffledOptions[optionIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [answerFeedback, showWinScreen, currentQuestion, handleOptionClick]);

  const handleFinishStage = () => {
    completeStage(4);
    if (onBackToPath) {
      onBackToPath();
    }
  };

  const handleReplayPractice = () => {
    clearPendingTimers();
    resetStage4Quiz();
    setDeck(createShuffledDeck([]));
    setQuestionIndex(0);
    setTurnCount((prev) => prev + 1);
    setAnswerFeedback(null);
    setIsErrorPulse(false);
    setHoldWinTransition(false);
    setLiveAnnouncement('Práctica reiniciada. 0 de 8 núcleos activados.');
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-6 sm:py-8 sm:px-6">
      {/* Screen-reader Live Status Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Top Bar */}
      <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onBackToPath}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-white/15 bg-slate-900/75 px-3.5 py-2 text-xs font-semibold text-slate-200 backdrop-blur-md transition hover:border-sky-400/40 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Camino</span>
        </button>

        <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-indigo-400/30 bg-indigo-500/15 px-4 py-1.5 text-xs font-bold text-indigo-200 backdrop-blur-md">
          <Terminal className="h-3.5 w-3.5 text-sky-400" />
          <span>Etapa 4 • Desafío del Data Core</span>
        </div>
      </div>

      {/* Main Two-Column Grid: Left = Energy Tank Visual, Right = Quiz / Win Card */}
      <div className="grid grid-cols-1 items-center gap-6 lg:gap-8 lg:grid-cols-12">
        {/* Left Column: Energy Tank Visual */}
        <div className="lg:col-span-5">
          <DataCoreVisualizer
            correctCount={correctCount}
            isErrorPulse={isErrorPulse}
            isWon={isWon}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        {/* Right Column: Quiz Glass Card or Win State */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!showWinScreen ? (
              <motion.div
                key={`quiz-card-${currentQuestion.id}-${turnCount}`}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 12 }
                }
                animate={
                  isErrorPulse && !prefersReducedMotion
                    ? {
                        opacity: 1,
                        y: 0,
                        x: [0, -10, 10, -7, 7, -3, 3, 0],
                      }
                    : { opacity: 1, y: 0, x: 0 }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -12 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0.14 : 0.28,
                  ease: 'easeInOut',
                }}
                className={[
                  'relative overflow-hidden rounded-3xl border p-5 sm:p-8 lg:p-9 backdrop-blur-xl transition-colors duration-200 shadow-[0_25px_80px_rgba(2,6,23,0.9)]',
                  answerFeedback?.status === 'wrong'
                    ? 'border-rose-500/75 bg-gradient-to-br from-rose-950/45 via-slate-900/95 to-slate-950/95 shadow-[0_0_45px_rgba(244,63,94,0.28)]'
                    : 'border-white/15 bg-gradient-to-br from-slate-900/90 via-indigo-950/70 to-slate-950/95',
                ].join(' ')}
              >
                {/* Top Accent Line */}
                <div
                  className={[
                    'absolute inset-x-0 top-0 h-1 transition-colors duration-200',
                    answerFeedback?.status === 'wrong'
                      ? 'bg-gradient-to-r from-rose-500 via-red-400 to-rose-500'
                      : answerFeedback?.status === 'correct'
                      ? 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500'
                      : 'bg-gradient-to-r from-blue-500 via-sky-400 to-teal-400',
                  ].join(' ')}
                />

                {/* Question Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-300">
                    <Sparkles className="h-3 w-3 text-sky-400" />
                    Protocolo de Carga (+12,5%)
                  </span>

                  {answerFeedback?.status === 'wrong' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-300">
                      <ShieldAlert className="h-4 w-4 text-rose-400" />
                      Revisa la explicación para continuar
                    </span>
                  )}

                  {answerFeedback?.status === 'correct' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ¡Acierto! +12,5% de energía cargada
                    </span>
                  )}
                </div>

                {/* Question Title */}
                <h2 className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-white sm:text-2xl md:text-[1.65rem]">
                  {currentQuestion.question}
                </h2>

                <p className="mt-1.5 text-xs text-slate-400">
                  Elige una opción (o usa las teclas A, B, C / 1, 2, 3) para cargar el depósito.
                </p>

                {/* 3 Answer Options */}
                <div
                  role="group"
                  aria-label="Opciones de respuesta"
                  className="mt-6 space-y-3"
                >
                  {currentQuestion.shuffledOptions.map((option, idx) => {
                    const isFeedbackActive = answerFeedback !== null;
                    const isCorrectOption =
                      option === currentQuestion.correctAnswer;
                    const isSelectedOption =
                      answerFeedback?.selectedOption === option;

                    const isHighlightedRight =
                      isFeedbackActive &&
                      ((answerFeedback.status === 'correct' &&
                        isSelectedOption) ||
                        (answerFeedback.status === 'wrong' && isCorrectOption));

                    const isHighlightedWrong =
                      isFeedbackActive &&
                      answerFeedback.status === 'wrong' &&
                      isSelectedOption;

                    const isNeutralDimmed =
                      isFeedbackActive &&
                      !isHighlightedRight &&
                      !isHighlightedWrong;

                    const optionLetter = ['A', 'B', 'C'][idx];

                    return (
                      <motion.button
                        key={option}
                        type="button"
                        disabled={isFeedbackActive}
                        whileHover={
                          isFeedbackActive || prefersReducedMotion
                            ? undefined
                            : { scale: 1.01, x: 3 }
                        }
                        whileTap={
                          isFeedbackActive || prefersReducedMotion
                            ? undefined
                            : { scale: 0.99 }
                        }
                        onClick={() => handleOptionClick(option)}
                        aria-label={`Opción ${optionLetter}: ${option}`}
                        className={[
                          'group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4 text-left text-sm sm:text-base font-bold transition-all duration-200',
                          isFeedbackActive
                            ? 'cursor-default'
                            : 'cursor-pointer',
                          isHighlightedRight &&
                            'border-emerald-400 bg-emerald-500/20 text-white shadow-[0_0_26px_rgba(16,185,129,0.4)]',
                          isHighlightedWrong &&
                            'border-rose-500 bg-rose-500/25 text-rose-100 shadow-[0_0_26px_rgba(244,63,94,0.4)]',
                          isNeutralDimmed &&
                            'border-white/10 bg-slate-950/40 text-slate-400 opacity-65',
                          !isFeedbackActive &&
                            'border-blue-400/35 bg-slate-950/60 text-slate-100 shadow-[0_0_18px_rgba(37,99,235,0.18)] hover:border-sky-400 hover:bg-blue-500/15 hover:text-white hover:shadow-[0_0_28px_rgba(56,189,248,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span
                            className={[
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-extrabold transition-colors',
                              isHighlightedRight
                                ? 'border-emerald-300 bg-emerald-500 text-slate-950'
                                : isHighlightedWrong
                                ? 'border-rose-300 bg-rose-500 text-white'
                                : 'border-blue-400/40 bg-blue-500/15 text-sky-300 group-hover:border-sky-300 group-hover:bg-sky-400 group-hover:text-slate-950',
                            ].join(' ')}
                          >
                            {optionLetter}
                          </span>
                          <span className="leading-snug">{option}</span>
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5">
                          {isHighlightedRight && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-200">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                              <span className="hidden sm:inline">Correcta</span>
                            </span>
                          )}
                          {isHighlightedWrong && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/25 px-2.5 py-0.5 text-[11px] font-extrabold text-rose-200">
                              <XCircle className="h-3.5 w-3.5 text-rose-300" />
                              <span className="hidden sm:inline">Tu elección</span>
                            </span>
                          )}
                          {!isFeedbackActive && (
                            <Zap className="h-4 w-4 text-sky-400 opacity-0 transition-opacity group-hover:opacity-100" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explained Feedback Panel on Error (NO auto-advance timeout) */}
                <AnimatePresence>
                  {answerFeedback?.status === 'wrong' && (
                    <motion.div
                      key="wrong-feedback-panel"
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.12 : 0.22 }}
                      role="region"
                      aria-label="Explicación de la respuesta correcta"
                      className="mt-5 rounded-2xl border border-emerald-400/35 bg-slate-950/85 p-4 sm:p-5 shadow-[0_12px_30px_rgba(2,6,23,0.7)]"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                        <div className="min-w-0 flex-1 space-y-1.5">
                          <p className="text-xs sm:text-sm font-extrabold text-emerald-300">
                            Respuesta correcta:{' '}
                            <span className="text-white">
                              {answerFeedback.correctAnswer}
                            </span>
                          </p>
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                            {answerFeedback.explanation}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button
                          ref={continueButtonRef}
                          type="button"
                          onClick={handleContinueAfterError}
                          className="inline-flex items-center gap-2 rounded-xl border border-blue-300/50 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-[0_4px_16px_rgba(37,99,235,0.45)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 cursor-pointer"
                        >
                          <span>Continuar</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* WIN STATE CARD (correctCount === 8) */
              <motion.div
                key="core-win-state"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.94, y: 16 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.16 }
                    : { type: 'spring', stiffness: 250, damping: 22 }
                }
                className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-gradient-to-br from-blue-950/90 via-indigo-950/90 to-slate-950 p-7 sm:p-11 text-center backdrop-blur-xl shadow-[0_0_70px_rgba(56,189,248,0.35)]"
              >
                <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-cyan-400/25 blur-[90px]" />

                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-300/50 bg-gradient-to-br from-cyan-400/30 to-blue-600/40 shadow-[0_0_40px_rgba(56,189,248,0.6)]">
                  <LockOpen className="h-10 w-10 text-cyan-200" />
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Data Core al 100% de Capacidad
                </span>

                <h2 className="mt-4 bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-transparent">
                  ¡Sistema Central Desbloqueado!
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-blue-100/90">
                  Completaste el repaso con 8 respuestas correctas y cargaste el depósito del Data Core al máximo. Ya estás listo para pasar a la última etapa de tu bienvenida.
                </p>

                <div className="mt-7 flex flex-col items-center gap-3.5">
                  <motion.button
                    type="button"
                    onClick={handleFinishStage}
                    animate={
                      prefersReducedMotion ? undefined : { scale: [1, 1.04, 1] }
                    }
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                    }
                    whileTap={
                      prefersReducedMotion ? undefined : { scale: 0.96 }
                    }
                    className="flex items-center gap-2.5 rounded-2xl border border-sky-300/70 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#0EA5E9] px-8 py-4 text-sm sm:text-base font-extrabold text-white shadow-[0_6px_0_#1D4ED8,0_0_40px_rgba(56,189,248,0.8)] active:translate-y-[3px] transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Finalizar Etapa</span>
                  </motion.button>

                  <button
                    type="button"
                    onClick={handleReplayPractice}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:border-sky-400/35 hover:bg-white/[0.08] hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-sky-400" />
                    <span>Volver a practicar el quiz</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

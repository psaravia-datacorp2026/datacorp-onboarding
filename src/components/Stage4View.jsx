import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Zap,
  ShieldAlert,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Terminal,
  LockOpen,
} from 'lucide-react';
import { useOnboardingStore } from '../store/useOnboardingStore';

const TARGET_CORRECT = 8;

/**
 * Banco de 15 preguntas de comprensión general, claras y cotidianas (sin tecnicismos ni cifras de memoria).
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
  },
  {
    id: 2,
    question: '¿Cuántas empresas comerciales integran el ecosistema?',
    options: ['Tres.', 'Una sola.', 'Cinco.'],
    correctAnswer: 'Tres.',
  },
  {
    id: 3,
    question: '¿Qué plataforma corresponde a Datasur/Macroscope?',
    options: ['DComex.', 'EXIM.', 'Zoho One.'],
    correctAnswer: 'DComex.',
  },
  {
    id: 4,
    question: '¿Qué plataforma corresponde a Datlas?',
    options: ['EXIM.', 'DComex.', 'Gestor.'],
    correctAnswer: 'EXIM.',
  },
  {
    id: 5,
    question: '¿Cuál es el papel principal de Imexdbusiness?',
    options: [
      'Llevar soluciones e inteligencia comercial a clientes internacionales.',
      'Atender únicamente a pequeñas tiendas locales.',
      'Administrar los recursos humanos del grupo.',
    ],
    correctAnswer: 'Llevar soluciones e inteligencia comercial a clientes internacionales.',
  },
  {
    id: 6,
    question: '¿Qué comparten las tres empresas?',
    options: [
      'Capacidades de producción de datos, desarrollo e innovación.',
      'Un único nombre comercial para todos los clientes.',
      'El mismo equipo de ventas en una sola oficina.',
    ],
    correctAnswer: 'Capacidades de producción de datos, desarrollo e innovación.',
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
  },
  {
    id: 8,
    question: '¿Para qué sirve el Data Core?',
    options: [
      'Preparar datos confiables que puedan usarse en varios productos.',
      'Reemplazar la atención comercial a los clientes.',
      'Diseñar campañas publicitarias en redes sociales.',
    ],
    correctAnswer: 'Preparar datos confiables que puedan usarse en varios productos.',
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
  },
  {
    id: 10,
    question: '¿Cuál es el mercado principal de Datasur?',
    options: ['Latinoamérica.', 'Asia y Medio Oriente.', 'Solo Europa.'],
    correctAnswer: 'Latinoamérica.',
  },
  {
    id: 11,
    question: '¿Cómo quiere crecer Datlas?',
    options: [
      'Mediante tecnología, EXIM y alianzas con otras organizaciones.',
      'Solo con llamadas telefónicas puerta a puerta.',
      'Cerrando sus plataformas digitales.',
    ],
    correctAnswer: 'Mediante tecnología, EXIM y alianzas con otras organizaciones.',
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
  },
  {
    id: 15,
    question: '¿Qué significa Accountability en Datacorp?',
    options: [
      'Compromiso, autonomía y responsabilidad con transparencia.',
      'Controlar horarios estrictos sin confianza en el equipo.',
      'Trabajar de forma aislada sin compartir avances.',
    ],
    correctAnswer: 'Compromiso, autonomía y responsabilidad con transparencia.',
  },
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
 * Prepares a shuffled deck of questions with shuffled options, excluding already-solved IDs.
 */
function createShuffledDeck(excludeIds = []) {
  const pool = CORE_QUIZ_POOL.filter((q) => !excludeIds.includes(q.id));
  const source = pool.length > 0 ? pool : CORE_QUIZ_POOL;
  return shuffleArray(source).map((item) => ({
    ...item,
    shuffledOptions: shuffleArray(item.options),
  }));
}

/**
 * Left Column Visual: The Interactive "Data Core" SVG Circular Progress Ring & Dynamic Orb.
 */
function DataCoreVisualizer({ correctCount, isErrorFlash, isWon }) {
  const chargeRatio = Math.min(correctCount / TARGET_CORRECT, 1);
  const chargePercent = chargeRatio * 100; // 12.5% per correct answer

  // SVG Ring Geometry
  const size = 280;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - chargeRatio);

  // Dynamic Orb Scale & Glow Intensity based on (correctCount / 8)
  const orbScale = 0.82 + chargeRatio * 0.36;
  const glowRadius = Math.round(25 + chargeRatio * 75);
  const glowAlpha = (0.35 + chargeRatio * 0.6).toFixed(2);

  const orbBoxShadow = isErrorFlash
    ? '0 0 65px rgba(244, 63, 94, 0.9), inset 0 0 30px rgba(255, 255, 255, 0.5)'
    : isWon
    ? '0 0 110px rgba(56, 189, 248, 1), 0 0 160px rgba(37, 99, 235, 0.95), inset 0 0 45px rgba(255, 255, 255, 0.85)'
    : `0 0 ${glowRadius}px rgba(59, 130, 246, ${glowAlpha}), 0 0 ${Math.round(
        glowRadius * 1.4
      )}px rgba(14, 165, 233, ${(chargeRatio * 0.65).toFixed(
        2
      )}), inset 0 0 28px rgba(255, 255, 255, 0.45)`;

  return (
    <div className="relative flex flex-col items-center justify-center rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/85 via-indigo-950/60 to-slate-950/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_70px_rgba(2,6,23,0.9)]">
      {/* Ambient Background Aura behind the Core */}
      <div
        style={{
          opacity: 0.2 + chargeRatio * 0.6,
          transform: `scale(${0.85 + chargeRatio * 0.4})`,
        }}
        className={[
          'pointer-events-none absolute h-64 w-64 rounded-full blur-[90px] transition-all duration-500',
          isErrorFlash
            ? 'bg-rose-500'
            : isWon
            ? 'bg-cyan-400'
            : 'bg-blue-500',
        ].join(' ')}
      />

      {/* Top Status Chip */}
      <div className="relative z-10 mb-3 flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-200">
        <Cpu className="h-3.5 w-3.5 text-sky-400" />
        <span>Estado del Data Core</span>
      </div>

      {/* SVG Circular Progress Ring + Central Glowing Orb */}
      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 transform overflow-visible"
        >
          <defs>
            <linearGradient id="coreChargeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>

          <circle
            cx={center}
            cy={center}
            r={radius + 14}
            fill="none"
            stroke="rgba(148, 163, 184, 0.12)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(15, 23, 42, 0.9)"
            strokeWidth={strokeWidth}
          />

          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={isErrorFlash ? '#F43F5E' : 'url(#coreChargeGradient)'}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              filter: isErrorFlash
                ? 'drop-shadow(0 0 12px rgba(244, 63, 94, 0.85))'
                : `drop-shadow(0 0 ${8 + chargeRatio * 14}px rgba(56, 189, 248, 0.8))`,
            }}
          />
        </svg>

        {/* Central Glowing Orb */}
        <motion.div
          animate={{
            scale: isWon ? [orbScale, orbScale * 1.08, orbScale] : orbScale,
          }}
          transition={
            isWon
              ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
              : { type: 'spring', stiffness: 220, damping: 18 }
          }
          style={{ boxShadow: orbBoxShadow }}
          className={[
            'absolute flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 transition-colors duration-300',
            isErrorFlash
              ? 'border-rose-300 bg-gradient-to-br from-rose-500 via-red-600 to-rose-900'
              : isWon
              ? 'border-white bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-600'
              : 'border-sky-300/80 bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-900',
          ].join(' ')}
        >
          <span className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 h-6 w-16 rounded-full bg-gradient-to-b from-white/50 to-transparent" />

          <Zap
            className={[
              'h-8 w-8 transition-transform duration-300',
              isWon ? 'text-white scale-110' : 'text-sky-100',
            ].join(' ')}
          />
          <span className="mt-1 font-mono text-2xl font-extrabold tracking-tight text-white drop-shadow">
            {chargePercent}%
          </span>
        </motion.div>
      </div>

      {/* 8 Energy Segment Pills */}
      <div className="relative z-10 mt-4 flex flex-col items-center">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TARGET_CORRECT }).map((_, idx) => {
            const isCharged = idx < correctCount;
            return (
              <div
                key={idx}
                className={[
                  'h-2.5 w-6 rounded-full transition-all duration-300',
                  isCharged
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-300 shadow-[0_0_10px_#38BDF8]'
                    : 'bg-slate-800 border border-white/10',
                ].join(' ')}
              />
            );
          })}
        </div>
        <p className="mt-2.5 text-xs font-semibold text-slate-300">
          Núcleos activados:{' '}
          <span className="font-extrabold text-sky-300">
            {correctCount} / {TARGET_CORRECT}
          </span>
        </p>
      </div>
    </div>
  );
}

export default function Stage4View({ onBackToPath }) {
  const [deck, setDeck] = useState(() => createShuffledDeck());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);
  const [isErrorShake, setIsErrorShake] = useState(false);
  const [selectedWrongOption, setSelectedWrongOption] = useState(null);
  const [selectedRightOption, setSelectedRightOption] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const { completeStage } = useOnboardingStore();
  const isWon = correctCount >= TARGET_CORRECT;

  const currentQuestion = useMemo(
    () => deck[questionIndex] || deck[0],
    [deck, questionIndex]
  );

  const advanceToNextQuestion = (updatedSolvedIds) => {
    if (questionIndex + 1 < deck.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setDeck(createShuffledDeck(updatedSolvedIds));
      setQuestionIndex(0);
    }
  };

  const handleOptionClick = (option) => {
    if (isLocked || isWon || !currentQuestion) return;
    setIsLocked(true);

    if (option === currentQuestion.correctAnswer) {
      setSelectedRightOption(option);
      const nextScore = correctCount + 1;
      const nextSolved = [...solvedIds, currentQuestion.id];
      setCorrectCount(nextScore);
      setSolvedIds(nextSolved);

      setTimeout(() => {
        setSelectedRightOption(null);
        setIsLocked(false);
        if (nextScore < TARGET_CORRECT) {
          advanceToNextQuestion(nextSolved);
        }
      }, 360);
    } else {
      // Incorrect Answer: Red Flash + Punchy 0.3s Horizontal Shake, then load next question
      setSelectedWrongOption(option);
      setIsErrorShake(true);

      setTimeout(() => {
        setIsErrorShake(false);
        setSelectedWrongOption(null);
        setIsLocked(false);
        advanceToNextQuestion(solvedIds);
      }, 340);
    }
  };

  const handleFinishStage = () => {
    completeStage(4);
    if (onBackToPath) {
      onBackToPath();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-8 sm:px-6">
      {/* Top Bar */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
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
          <span>Etapa 4 • Escape Room: Sincronización del Data Core</span>
        </div>
      </div>

      {/* Main Two-Column Grid: Left = Data Core Visual, Right = Quiz / Win Card */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* Left Column: Data Core Visual */}
        <div className="lg:col-span-5">
          <DataCoreVisualizer
            correctCount={correctCount}
            isErrorFlash={isErrorShake}
            isWon={isWon}
          />
        </div>

        {/* Right Column: Quiz Glass Card or Win State */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!isWon ? (
              <motion.div
                key={`quiz-card-${currentQuestion.id}-${questionIndex}`}
                initial={{ opacity: 0, y: 14 }}
                animate={
                  isErrorShake
                    ? {
                        opacity: 1,
                        y: 0,
                        x: [0, -14, 14, -10, 10, -5, 5, 0],
                      }
                    : { opacity: 1, y: 0, x: 0 }
                }
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={[
                  'relative overflow-hidden rounded-3xl border p-7 sm:p-10 backdrop-blur-xl transition-colors duration-200 shadow-[0_25px_80px_rgba(2,6,23,0.9)]',
                  isErrorShake
                    ? 'border-rose-500/80 bg-rose-950/40 shadow-[0_0_50px_rgba(244,63,94,0.45)]'
                    : 'border-white/15 bg-gradient-to-br from-slate-900/90 via-indigo-950/70 to-slate-950/95',
                ].join(' ')}
              >
                {/* Top Accent Line */}
                <div
                  className={[
                    'absolute inset-x-0 top-0 h-1 transition-colors duration-200',
                    isErrorShake
                      ? 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-500'
                      : 'bg-gradient-to-r from-blue-500 via-sky-400 to-teal-400',
                  ].join(' ')}
                />

                {/* Question Header */}
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sky-300">
                    <Sparkles className="h-3 w-3 text-sky-400" />
                    Protocolo de Carga (+12.5%)
                  </span>

                  {isErrorShake && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400">
                      <ShieldAlert className="h-4 w-4" />
                      Respuesta incorrecta • Cargando siguiente...
                    </span>
                  )}
                </div>

                {/* Question Title */}
                <h2 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-white sm:text-2xl md:text-3xl">
                  {currentQuestion.question}
                </h2>

                <p className="mt-2 text-xs text-slate-400">
                  Elige la opción que mejor resume lo que vimos en el recorrido para cargar el Data Core.
                </p>

                {/* 3 Glowing Outline Answer Buttons */}
                <div className="mt-7 space-y-3.5">
                  {currentQuestion.shuffledOptions.map((option, idx) => {
                    const isWrongSelected = selectedWrongOption === option;
                    const isRightSelected = selectedRightOption === option;
                    const optionLetter = ['A', 'B', 'C'][idx];

                    return (
                      <motion.button
                        key={option}
                        type="button"
                        disabled={isLocked}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleOptionClick(option)}
                        className={[
                          'group flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer',
                          isRightSelected &&
                            'border-emerald-400 bg-emerald-500/20 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]',
                          isWrongSelected &&
                            'border-rose-500 bg-rose-500/25 text-rose-100 shadow-[0_0_30px_rgba(244,63,94,0.5)]',
                          !isRightSelected &&
                            !isWrongSelected &&
                            'border-blue-400/35 bg-slate-950/60 text-slate-100 shadow-[0_0_18px_rgba(37,99,235,0.18)] hover:border-sky-400 hover:bg-blue-500/15 hover:text-white hover:shadow-[0_0_28px_rgba(56,189,248,0.45)]',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <div className="flex items-center gap-3.5">
                          <span
                            className={[
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-extrabold transition-colors',
                              isRightSelected
                                ? 'border-emerald-300 bg-emerald-500 text-slate-950'
                                : isWrongSelected
                                ? 'border-rose-300 bg-rose-500 text-white'
                                : 'border-blue-400/40 bg-blue-500/15 text-sky-300 group-hover:border-sky-300 group-hover:bg-sky-400 group-hover:text-slate-950',
                            ].join(' ')}
                          >
                            {optionLetter}
                          </span>
                          <span>{option}</span>
                        </div>

                        <Zap
                          className={[
                            'h-4 w-4 shrink-0 transition-opacity',
                            isRightSelected
                              ? 'text-emerald-300 opacity-100'
                              : 'text-sky-400 opacity-0 group-hover:opacity-100',
                          ].join(' ')}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* WIN STATE CARD (correctCount === 8) */
              <motion.div
                key="core-win-state"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-gradient-to-br from-blue-950/90 via-indigo-950/90 to-slate-950 p-8 sm:p-12 text-center backdrop-blur-xl shadow-[0_0_70px_rgba(56,189,248,0.35)]"
              >
                <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-cyan-400/25 blur-[90px]" />

                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-300/50 bg-gradient-to-br from-cyan-400/30 to-blue-600/40 shadow-[0_0_40px_rgba(56,189,248,0.6)]">
                  <LockOpen className="h-10 w-10 text-cyan-200" />
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Data Core al 100% de Capacidad
                </span>

                <h2 className="mt-4 bg-gradient-to-r from-white via-sky-100 to-cyan-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                  ¡Sistema Central Desbloqueado!
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-blue-100/90">
                  Completaste el repaso con 8 respuestas correctas y cargaste el Data Core al máximo. Ya estás listo para pasar a la última etapa de tu bienvenida.
                </p>

                <div className="mt-8 flex justify-center">
                  <motion.button
                    type="button"
                    onClick={handleFinishStage}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2.5 rounded-2xl border border-sky-300/70 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#0EA5E9] px-8 py-4 text-base font-extrabold text-white shadow-[0_6px_0_#1D4ED8,0_0_45px_rgba(56,189,248,0.9)] active:translate-y-[3px] transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Finalizar Etapa</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

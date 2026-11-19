import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { VALID_CODES } from '../data/onboardingData';
import { useOnboardingStore } from '../store/useOnboardingStore';

export default function LoginView() {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const login = useOnboardingStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedCode = inputCode.trim().toUpperCase();

    if (!normalizedCode) {
      setError('Por favor ingresa tu código de invitación.');
      return;
    }

    const assignedArea = VALID_CODES[normalizedCode];
    if (assignedArea) {
      setError('');
      login(normalizedCode, assignedArea);
    } else {
      setError('Código de acceso inválido. Verifica con Talent & Culture.');
    }
  };

  const handleQuickFill = (code) => {
    setInputCode(code);
    setError('');
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Decorative Outer Glow */}
        <div className="pointer-events-none absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-blue-500/30 via-blue-600/5 to-transparent opacity-70 blur-xl" />

        {/* Glassmorphism Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] via-slate-900/80 to-slate-950/90 p-8 backdrop-blur-md shadow-[0_20px_60px_rgba(2,6,23,0.9)]">
          {/* Subtle Top Accent Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

          {/* Icon Badge */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/15 shadow-[0_0_25px_rgba(59,130,246,0.3)]">
              <KeyRound className="h-6 w-6 text-blue-400" />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              Acceso Empleados
            </span>
          </div>

          {/* Humanized Copy */}
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Bienvenido a DataCorp.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Ingresa tu código para comenzar tu recorrido.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
            <div>
              <label
                htmlFor="invite-code"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Código de Invitación
              </label>
              <div className="relative">
                <input
                  id="invite-code"
                  type="text"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Ej. DEV2026"
                  autoComplete="off"
                  autoFocus
                  className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm font-semibold tracking-wider text-white uppercase placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                />
              </div>

              {/* Subtle Validation Error */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2.5 flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Glowing Electric Blue 3D-feel Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl border border-blue-300/40 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_5px_0_#1D4ED8,0_0_25px_rgba(37,99,235,0.55)] active:translate-y-[3px] active:shadow-[0_2px_0_#1D4ED8,0_0_20px_rgba(37,99,235,0.5)] transition-all cursor-pointer"
            >
              <span>Comenzar Recorrido</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </form>

          {/* Demo Helper: Quick Invite Codes */}
          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
              Códigos de prueba disponibles:
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(VALID_CODES).map(([code, area]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleQuickFill(code)}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-300 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white cursor-pointer"
                >
                  <span className="font-mono font-semibold text-blue-400">{code}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[11px] text-slate-400">{area}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

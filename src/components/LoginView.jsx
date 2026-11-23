import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { isValidAccessCode } from '../data/onboardingData';
import { useOnboardingStore } from '../store/useOnboardingStore';
import logoSvg from '../assets/Logo.svg';

export default function LoginView() {
  const [step, setStep] = useState('code');
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [nameError, setNameError] = useState('');
  const [roleError, setRoleError] = useState('');

  const registerParticipant = useOnboardingStore(
    (state) => state.registerParticipant
  );

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const trimmedCode = inputCode.trim();

    if (!trimmedCode) {
      setCodeError('Por favor ingresa tu código de invitación.');
      return;
    }

    if (!isValidAccessCode(trimmedCode)) {
      setCodeError('Código de acceso inválido. Verifica con Talent & Culture.');
      return;
    }

    setCodeError('');
    setStep('profile');
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const trimmedName = nombre.trim();
    const trimmedRole = cargo.trim();

    const nextNameError = trimmedName ? '' : 'Por favor ingresa tu nombre.';
    const nextRoleError = trimmedRole ? '' : 'Por favor ingresa tu cargo.';

    setNameError(nextNameError);
    setRoleError(nextRoleError);

    if (nextNameError || nextRoleError) {
      return;
    }

    registerParticipant({ nombre: trimmedName, cargo: trimmedRole });
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

          {/* Corporate Logos Block */}
          <div className="mb-7 w-full px-1 pt-1">
            <img
              src={logoSvg}
              alt="Datasur · ImexDBusiness · Datlas"
              width="432"
              height="45"
              className="block h-auto w-full object-contain"
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 'code' ? (
              <motion.div
                key="login-step-code"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Bienvenido a DataCorp.
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Ingresa tu código para comenzar tu recorrido.
                </p>

                <form
                  onSubmit={handleCodeSubmit}
                  className="mt-7 space-y-5"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="invite-code"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
                    >
                      Código de Invitación
                    </label>
                    <input
                      id="invite-code"
                      type="text"
                      value={inputCode}
                      onChange={(e) => {
                        setInputCode(e.target.value);
                        if (codeError) setCodeError('');
                      }}
                      placeholder="Ingresa tu código"
                      autoComplete="off"
                      autoFocus
                      className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm font-semibold tracking-wider text-white uppercase placeholder:font-normal placeholder:tracking-normal placeholder:normal-case placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                    />

                    <AnimatePresence mode="wait">
                      {codeError && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2.5 flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                          <span>{codeError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

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
              </motion.div>
            ) : (
              <motion.div
                key="login-step-profile"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Completa tu registro.
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Ingresa tu nombre y cargo para iniciar tu recorrido.
                </p>

                <form
                  onSubmit={handleProfileSubmit}
                  className="mt-7 space-y-5"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="participant-name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
                    >
                      ¿Cuál es tu nombre?
                    </label>
                    <input
                      id="participant-name"
                      type="text"
                      value={nombre}
                      onChange={(e) => {
                        setNombre(e.target.value);
                        if (nameError) setNameError('');
                      }}
                      placeholder="Tu nombre y apellido"
                      autoComplete="name"
                      autoFocus
                      className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm font-medium text-white placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                    />

                    <AnimatePresence mode="wait">
                      {nameError && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2.5 flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                          <span>{nameError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label
                      htmlFor="participant-role"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300"
                    >
                      ¿Cuál es tu cargo?
                    </label>
                    <input
                      id="participant-role"
                      type="text"
                      value={cargo}
                      onChange={(e) => {
                        setCargo(e.target.value);
                        if (roleError) setRoleError('');
                      }}
                      placeholder="Tu cargo en Datacorp"
                      autoComplete="organization-title"
                      className="w-full rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3.5 text-sm font-medium text-white placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                    />

                    <AnimatePresence mode="wait">
                      {roleError && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2.5 flex items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                          <span>{roleError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl border border-blue-300/40 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_5px_0_#1D4ED8,0_0_25px_rgba(37,99,235,0.55)] active:translate-y-[3px] active:shadow-[0_2px_0_#1D4ED8,0_0_20px_rgba(37,99,235,0.5)] transition-all cursor-pointer"
                  >
                    <span>Continuar</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

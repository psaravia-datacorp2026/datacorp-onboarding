import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { useOnboardingStore } from '../store/useOnboardingStore';

export default function Stage1View({ onBackToPath }) {
  const { unlockedStage, completeStage } = useOnboardingStore();
  const isAlreadyCompleted = unlockedStage > 1;

  const [videoEnded, setVideoEnded] = useState(isAlreadyCompleted);
  const [manualConfirmed, setManualConfirmed] = useState(false);
  const iframeRef = useRef(null);

  const canFinish = videoEnded || manualConfirmed;

  // Listen to YouTube IFrame Player API postMessage events (`enablejsapi=1`)
  useEffect(() => {
    const iframeWindow = iframeRef.current?.contentWindow;
    if (iframeWindow) {
      try {
        iframeWindow.postMessage(
          JSON.stringify({ event: 'listening', id: 'datacorp-welcome-video' }),
          '*'
        );
      } catch {
        // Ignore cross-origin init errors
      }
    }

    const handleMessage = (event) => {
      if (typeof event.data !== 'string') return;
      try {
        const data = JSON.parse(event.data);
        // YouTube playerState 0 === YT.PlayerState.ENDED
        if (
          (data.event === 'onStateChange' && data.info === 0) ||
          (data.event === 'infoDelivery' && data.info?.playerState === 0)
        ) {
          setVideoEnded(true);
        }
      } catch {
        // Ignore non-JSON postMessages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleFinishStage = () => {
    if (!canFinish) return;
    // Idempotently unlock Stage 2 and return directly to the Path
    completeStage(1);
    if (onBackToPath) {
      onBackToPath();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-between px-4 py-6 sm:px-6">
      {/* Top Navigation */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToPath}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-4 py-2 text-xs font-bold text-slate-200 backdrop-blur-md transition hover:border-sky-400/50 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al camino</span>
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1689F8]/35 bg-[#1689F8]/15 px-3.5 py-1 text-xs font-bold text-[#93C5FD]">
          <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" />
          <span>Etapa 1 · Video de Bienvenida</span>
        </span>
      </div>

      {/* Main Video Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#14294D]/90 via-slate-900/90 to-slate-950/95 p-5 sm:p-8 backdrop-blur-xl shadow-[0_24px_70px_rgba(2,6,23,0.9)]"
      >
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Mensaje de Bienvenida a Datacorp
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Reproduce el video introductorio para conocer nuestra visión y dar inicio a tu recorrido.
            </p>
          </div>
        </div>

        {/* Responsive 16:9 YouTube Embed with enablejsapi=1 */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-[0_0_40px_rgba(22,137,248,0.2)]">
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/_IBNvHygt60?enablejsapi=1&rel=0"
            title="Video de bienvenida a Datacorp"
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer Completion Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row">
          <label className="flex cursor-pointer items-center gap-3 text-xs sm:text-sm text-slate-200 select-none">
            <input
              type="checkbox"
              checked={canFinish}
              onChange={(e) => setManualConfirmed(e.target.checked)}
              className="h-4 w-4 rounded border-white/25 bg-slate-900 text-[#1689F8] focus:ring-2 focus:ring-[#1689F8] cursor-pointer"
            />
            <span>
              {videoEnded
                ? 'Reproducción completada. Ya puedes finalizar la etapa.'
                : 'Confirmo que ya vi el video de bienvenida completo.'}
            </span>
          </label>

          <button
            type="button"
            disabled={!canFinish}
            onClick={handleFinishStage}
            className={[
              'inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs sm:text-sm font-extrabold transition-all',
              canFinish
                ? 'bg-gradient-to-r from-[#1689F8] to-[#258AFF] text-white shadow-[0_6px_22px_rgba(22,137,248,0.45)] hover:brightness-110 active:translate-y-0.5 cursor-pointer'
                : 'border border-white/10 bg-slate-800/70 text-slate-500 cursor-not-allowed',
            ].join(' ')}
          >
            {canFinish ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <PlayCircle className="h-4 w-4" />
            )}
            <span>Ya vi el video · Finalizar etapa</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

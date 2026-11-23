import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ListOrdered,
  Check,
  Circle,
  X,
  Compass,
} from 'lucide-react';
import SlideRenderer from './SlideRenderer';

const PAGE_VARIANTS = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 1,
    zIndex: 2,
  }),
  center: {
    x: '0%',
    opacity: 1,
    zIndex: 2,
    transition: {
      x: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2 },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 1,
    zIndex: 1,
    pointerEvents: 'none',
    transition: {
      x: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2 },
    },
  }),
};

const REDUCED_PAGE_VARIANTS = {
  enter: { opacity: 0, x: '0%', zIndex: 2 },
  center: { opacity: 1, x: '0%', zIndex: 2, transition: { duration: 0.14 } },
  exit: {
    opacity: 0,
    x: '0%',
    zIndex: 1,
    pointerEvents: 'none',
    transition: { duration: 0.12 },
  },
};

export default function PresentationViewer({
  slides,
  currentSlideIndex,
  visitedSlideIds,
  onSelectSlideIndex,
  onBackToPath,
  onFinishStage,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [navMeta, setNavMeta] = useState(() => ({
    index: currentSlideIndex,
    direction: 1,
    seq: 0,
  }));

  if (navMeta.index !== currentSlideIndex) {
    setNavMeta({
      index: currentSlideIndex,
      direction: currentSlideIndex > navMeta.index ? 1 : -1,
      seq: navMeta.seq + 1,
    });
  }

  const direction = navMeta.direction;
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerContainerRef = useRef(null);
  const wasNativeFsRef = useRef(false);
  const touchStartRef = useRef(null);

  const totalSlides = slides.length; // 20
  const activeSlide = slides[currentSlideIndex] || slides[0];
  const slideRenderKey = `${activeSlide.id}-${navMeta.seq}`;
  const visitedCount = visitedSlideIds.length;
  const allSlidesVisited = visitedCount >= totalSlides;
  const visitedPercent = Math.round((visitedCount / totalSlides) * 100);

  const goToSlide = useCallback(
    (nextIndex) => {
      if (nextIndex < 0 || nextIndex >= totalSlides || nextIndex === currentSlideIndex) {
        return;
      }
      onSelectSlideIndex(nextIndex);
    },
    [currentSlideIndex, totalSlides, onSelectSlideIndex]
  );

  const handleNext = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, totalSlides, goToSlide]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }, [currentSlideIndex, goToSlide]);

  const handleJumpToFirstMissing = useCallback(() => {
    const firstMissingIndex = slides.findIndex(
      (s) => !visitedSlideIds.includes(s.id)
    );
    if (firstMissingIndex !== -1) {
      goToSlide(firstMissingIndex);
    }
  }, [slides, visitedSlideIds, goToSlide]);

  // Fullscreen toggle with synchronous CSS overlay + non-blocking native Fullscreen API
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (
        document.fullscreenEnabled &&
        !document.fullscreenElement &&
        typeof document.documentElement?.requestFullscreen === 'function'
      ) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      setIsFullscreen(false);
      if (
        document.fullscreenElement &&
        typeof document.exitFullscreen === 'function'
      ) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFsChange = () => {
      const nativeActive = Boolean(document.fullscreenElement);
      if (nativeActive) {
        wasNativeFsRef.current = true;
        setIsFullscreen(true);
      } else if (wasNativeFsRef.current) {
        wasNativeFsRef.current = false;
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      if (
        document.fullscreenElement &&
        typeof document.exitFullscreen === 'function'
      ) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  // Keyboard navigation (ArrowRight, ArrowLeft, Home, End, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target?.isContentEditable) {
        return;
      }

      if (e.key === 'Escape') {
        if (isIndexOpen) {
          setIsIndexOpen(false);
          return;
        }
        if (isFullscreen && !document.fullscreenElement) {
          setIsFullscreen(false);
          return;
        }
      }

      if (isIndexOpen) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, goToSlide, totalSlides, isIndexOpen, isFullscreen]);

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    if (isIndexOpen) return;
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (isIndexOpen || !touchStartRef.current) {
      touchStartRef.current = null;
      return;
    }
    const touch = e.changedTouches[0];
    if (!touch) {
      touchStartRef.current = null;
      return;
    }
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    touchStartRef.current = null;
  };

  const viewerContent = (
    <div
      ref={viewerContainerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={[
        'flex flex-col justify-between px-3 py-2 sm:px-5 sm:py-2.5 transition-all',
        isFullscreen
          ? 'fixed inset-0 z-[100] h-dvh w-screen overflow-hidden bg-[#0B1326]'
          : 'relative h-[calc(100dvh-4rem)] w-full overflow-hidden',
      ].join(' ')}
    >
      {/* 1. HEADER BAND: Controlled compact height */}
      <div className="relative z-20 mx-auto flex h-9 w-full max-w-[1440px] shrink-0 items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onBackToPath}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.12] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1689F8] cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver al camino</span>
          </button>

          <button
            type="button"
            onClick={() => setIsIndexOpen(true)}
            aria-expanded={isIndexOpen}
            aria-label="Abrir índice de las 20 diapositivas"
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.12] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1689F8] cursor-pointer"
          >
            <ListOrdered className="h-3.5 w-3.5 text-[#60A5FA]" />
            <span>Índice ({totalSlides})</span>
          </button>
        </div>

        {/* Center Status: Diapositiva X de 20 & Visited Progress */}
        <div className="flex items-center gap-2 text-xs">
          <span className="hidden md:inline-block font-medium text-slate-400">
            Etapa 3 · {activeSlide.section}
          </span>
          <span className="rounded-full bg-[#1689F8]/15 px-3 py-1 font-bold text-[#93C5FD]">
            Diapositiva {currentSlideIndex + 1} de {totalSlides}
          </span>
          <span
            title={`Has visitado ${visitedCount} de ${totalSlides} diapositivas`}
            className="hidden sm:inline-block rounded-full bg-white/[0.06] px-2.5 py-1 font-semibold text-slate-300"
          >
            {visitedPercent}% leído
          </span>
        </div>

        {/* Right Control: Fullscreen only */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.12] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1689F8] cursor-pointer"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-3.5 w-3.5 text-[#60A5FA]" />
                <span className="hidden sm:inline">Salir</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-3.5 w-3.5 text-[#60A5FA]" />
                <span className="hidden sm:inline">Pantalla completa</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. FLEXIBLE SLIDE AREA: Non-collapsing 16:9 stage fitted via container query units */}
      <div
        className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 items-center justify-center py-1.5"
        style={{ containerType: 'size' }}
      >
        <div
          data-testid="presentation-stage"
          className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#0F1B35] shadow-[0_20px_60px_-15px_rgba(7,14,30,0.65)] ring-1 ring-white/10 lg:w-[min(100cqw,177.7778cqh)] lg:h-[min(100cqh,56.25cqw)]"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.article
              key={slideRenderKey}
              custom={direction}
              variants={prefersReducedMotion ? REDUCED_PAGE_VARIANTS : PAGE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              aria-label={`Diapositiva ${activeSlide.id} de ${totalSlides}: ${activeSlide.title}`}
              className="absolute inset-0 h-full w-full overflow-y-auto overflow-x-hidden dc-custom-scroll will-change-transform"
            >
              <SlideRenderer
                slide={activeSlide}
                allSlidesVisited={allSlidesVisited}
                visitedCount={visitedCount}
                totalSlides={totalSlides}
                onJumpToFirstMissing={handleJumpToFirstMissing}
                onFinishStage={onFinishStage}
              />
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. RESERVED COMPACT FOOTER BAND: Thin 3px progress track + compact 32px buttons */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] shrink-0 space-y-1.5 pt-0.5">
        {/* Thin 3px 20-Segment Progress Track */}
        <div
          role="group"
          aria-label="Progreso por las 20 diapositivas"
          className="grid grid-cols-20 gap-1"
        >
          {slides.map((s, idx) => {
            const isCurrent = idx === currentSlideIndex;
            const isVisited = visitedSlideIds.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(idx)}
                title={`Ir a diapositiva ${s.number}: ${s.title}`}
                aria-label={`Diapositiva ${s.number}: ${s.title}${
                  isVisited ? ' (visitada)' : ''
                }`}
                className={[
                  'h-[3px] rounded-full transition-all cursor-pointer focus:outline-none',
                  isCurrent
                    ? 'bg-[#1689F8] scale-y-125'
                    : isVisited
                    ? 'bg-[#60A5FA]/60 hover:bg-[#60A5FA]'
                    : 'bg-white/12 hover:bg-white/25',
                ].join(' ')}
              />
            );
          })}
        </div>

        {/* Compact Navigation Buttons Row (32px height) */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={[
              'inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#1689F8]',
              currentSlideIndex === 0
                ? 'bg-white/[0.03] text-slate-600 cursor-not-allowed'
                : 'bg-white/[0.08] text-slate-200 hover:bg-white/[0.15] hover:text-white cursor-pointer',
            ].join(' ')}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Anterior</span>
          </button>

          {currentSlideIndex < totalSlides - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#1689F8] px-4 text-xs font-bold text-white shadow-[0_4px_14px_rgba(22,137,248,0.3)] transition hover:bg-[#258AFF] focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer"
            >
              <span>Siguiente</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : allSlidesVisited ? (
            <button
              type="button"
              onClick={onFinishStage}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#1689F8] px-4 text-xs font-bold text-white shadow-[0_4px_16px_rgba(22,137,248,0.4)] transition hover:bg-[#258AFF] focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Finalizar presentación</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleJumpToFirstMissing}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#60A5FA]/40 bg-[#14294D] px-3.5 text-xs font-bold text-[#DDEEFF] transition hover:bg-[#193360] cursor-pointer"
            >
              <Compass className="h-3.5 w-3.5 text-[#60A5FA]" />
              <span>Ver láminas pendientes ({totalSlides - visitedCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Accessible Slide Index Modal Drawer */}
      <AnimatePresence>
        {isIndexOpen && (
          <motion.div
            key="slide-index-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsIndexOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1326]/80 p-4 backdrop-blur-md"
          >
            <motion.div
              key="slide-index-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Índice de diapositivas de la Etapa 3"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#101D38] text-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <h2 className="text-lg font-extrabold text-white">
                    Índice de la Presentación ({visitedCount} de {totalSlides} visitadas)
                  </h2>
                  <p className="text-xs text-slate-300">
                    Selecciona cualquier lámina para navegar. Recorre las 20 para habilitar el cierre de etapa.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsIndexOpen(false)}
                  aria-label="Cerrar índice"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5 overflow-y-auto p-6 sm:grid-cols-2 dc-custom-scroll">
                {slides.map((s, idx) => {
                  const isCurrent = idx === currentSlideIndex;
                  const isVisited = visitedSlideIds.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        goToSlide(idx);
                        setIsIndexOpen(false);
                      }}
                      className={[
                        'flex items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition cursor-pointer',
                        isCurrent
                          ? 'border-[#1689F8] bg-[#1689F8]/20 text-white'
                          : isVisited
                          ? 'border-white/10 bg-white/[0.05] text-slate-100 hover:border-[#60A5FA]/40'
                          : 'border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={[
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-extrabold',
                            isCurrent
                              ? 'bg-[#1689F8] text-white'
                              : isVisited
                              ? 'bg-[#1689F8]/25 text-[#93C5FD]'
                              : 'bg-white/10 text-slate-400',
                          ].join(' ')}
                        >
                          {s.number}
                        </span>
                        <div className="min-w-0">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#60A5FA]">
                            {s.section}
                          </span>
                          <span className="block truncate text-xs sm:text-sm font-bold">
                            {s.title}
                          </span>
                        </div>
                      </div>

                      {isVisited ? (
                        <Check className="h-4 w-4 shrink-0 text-[#60A5FA]" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-slate-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return isFullscreen && typeof document !== 'undefined'
    ? createPortal(viewerContent, document.body)
    : viewerContent;
}

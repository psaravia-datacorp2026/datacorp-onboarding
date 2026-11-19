import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function PresentationViewer({
  slides,
  currentSlideIndex,
  visitedSlideIds,
  onSelectSlideIndex,
  onBackToPath,
  onFinishStage,
}) {
  const [direction, setDirection] = useState(1);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerContainerRef = useRef(null);
  const touchStartXRef = useRef(null);

  const totalSlides = slides.length; // 20
  const activeSlide = slides[currentSlideIndex] || slides[0];
  const visitedCount = visitedSlideIds.length;
  const allSlidesVisited = visitedCount >= totalSlides;
  const visitedPercent = Math.round((visitedCount / totalSlides) * 100);

  const goToSlide = useCallback(
    (nextIndex) => {
      if (nextIndex < 0 || nextIndex >= totalSlides || nextIndex === currentSlideIndex) {
        return;
      }
      setDirection(nextIndex > currentSlideIndex ? 1 : -1);
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

  // Fullscreen toggle with native API + fallback state
  const toggleFullscreen = useCallback(async () => {
    const elem = viewerContainerRef.current;
    if (!elem) return;

    try {
      if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
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
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartXRef.current;
    if (Math.abs(deltaX) > 55) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      ref={viewerContainerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={[
        'relative flex flex-col justify-between px-3 py-2 sm:px-5 sm:py-2.5 transition-all',
        isFullscreen
          ? 'fixed inset-0 z-50 h-dvh w-screen overflow-hidden bg-[#0B1326]'
          : 'h-[calc(100dvh-4rem)] w-full overflow-hidden',
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

        {/* Right Control: Fullscreen only (Profundizar removed) */}
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

      {/* 2. FLEXIBLE SLIDE AREA: 16:9 stage fitted to available vertical and horizontal space */}
      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 items-center justify-center py-1.5">
        <div className="relative flex h-full max-h-full w-full items-center justify-center">
          <div className="relative h-full w-full lg:aspect-video lg:h-full lg:w-auto lg:max-w-full">
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <SlideRenderer
                key={activeSlide.id}
                slide={activeSlide}
                direction={direction}
                allSlidesVisited={allSlidesVisited}
                visitedCount={visitedCount}
                totalSlides={totalSlides}
                onJumpToFirstMissing={handleJumpToFirstMissing}
                onFinishStage={onFinishStage}
              />
            </AnimatePresence>
          </div>
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
}

import React, { useEffect, useMemo } from 'react';
import { PRESENTATION_SLIDES } from '../data/presentationSlides';
import { useOnboardingStore } from '../store/useOnboardingStore';
import PresentationViewer from './presentation/PresentationViewer';

export { PRESENTATION_SLIDES };

export default function Stage3View({ onBackToPath }) {
  const {
    completeStage,
    stage3SlideIndex,
    stage3VisitedSlides,
    setStage3Progress,
  } = useOnboardingStore();

  const totalSlides = PRESENTATION_SLIDES.length; // 20
  const safeSlideIndex =
    typeof stage3SlideIndex === 'number' &&
    stage3SlideIndex >= 0 &&
    stage3SlideIndex < totalSlides
      ? stage3SlideIndex
      : 0;

  const visitedIds = useMemo(
    () =>
      Array.isArray(stage3VisitedSlides) && stage3VisitedSlides.length > 0
        ? stage3VisitedSlides
        : [PRESENTATION_SLIDES[0].id],
    [stage3VisitedSlides]
  );

  useEffect(() => {
    const activeSlide = PRESENTATION_SLIDES[safeSlideIndex];
    if (activeSlide && !visitedIds.includes(activeSlide.id)) {
      setStage3Progress(safeSlideIndex, activeSlide.id);
    }
  }, [safeSlideIndex, visitedIds, setStage3Progress]);

  const handleSelectSlideIndex = (nextIndex) => {
    const clampedIndex = Math.min(
      Math.max(Number(nextIndex) || 0, 0),
      totalSlides - 1
    );
    const targetSlide = PRESENTATION_SLIDES[clampedIndex];
    if (targetSlide) {
      setStage3Progress(clampedIndex, targetSlide.id);
    }
  };

  const handleFinishStage = () => {
    const hasVisitedAll = visitedIds.length >= totalSlides;
    const isOnLastSlide = safeSlideIndex === totalSlides - 1;

    if (!hasVisitedAll || !isOnLastSlide) {
      return;
    }

    // Idempotently mark Stage 3 completed (unlocks Stage 4 once) and always return to the Path
    completeStage(3);

    if (onBackToPath) {
      onBackToPath();
    }
  };

  return (
    <PresentationViewer
      slides={PRESENTATION_SLIDES}
      currentSlideIndex={safeSlideIndex}
      visitedSlideIds={visitedIds}
      onSelectSlideIndex={handleSelectSlideIndex}
      onBackToPath={onBackToPath}
      onFinishStage={handleFinishStage}
    />
  );
}

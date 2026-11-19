import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CoverHeroLayout,
  PurposeShiftLayout,
  IdentitySplitLayout,
  SixFocusGridLayout,
} from './layouts/StrategicIntroLayouts';
import {
  EcosystemTableLayout,
  DatasurSpotlightLayout,
  ImexDualPanelLayout,
  DatlasHorizonLayout,
  OkrAmbitionsLayout,
} from './layouts/CommercialEcosystemLayouts';
import {
  SectionDividerLayout,
  ThreeLayerArchitectureLayout,
  DataLakePipelineLayout,
  TechDebtVelocityLayout,
  DataLabProcessLayout,
} from './layouts/TechAndInnovationLayouts';
import {
  SalesToManagersLayout,
  HabitShiftsLayout,
  ZohoIntelligenceLayout,
  CultureAccountabilityLayout,
  DayOneActionsLayout,
  ClosingFinaleLayout,
} from './layouts/CultureAndClosingLayouts';

const LAYOUT_REGISTRY = {
  'cover-hero': CoverHeroLayout,
  'purpose-shift': PurposeShiftLayout,
  'identity-split': IdentitySplitLayout,
  'six-focus-grid': SixFocusGridLayout,
  'ecosystem-table': EcosystemTableLayout,
  'company-spotlight-datasur': DatasurSpotlightLayout,
  'company-imex-dual': ImexDualPanelLayout,
  'company-datlas-horizon': DatlasHorizonLayout,
  'okr-ambitions': OkrAmbitionsLayout,
  'section-divider': SectionDividerLayout,
  'three-layer-architecture': ThreeLayerArchitectureLayout,
  'datalake-pipeline': DataLakePipelineLayout,
  'tech-debt-velocity': TechDebtVelocityLayout,
  'datalab-process': DataLabProcessLayout,
  'sales-to-managers': SalesToManagersLayout,
  'habit-shifts': HabitShiftsLayout,
  'zoho-intelligence': ZohoIntelligenceLayout,
  'culture-accountability': CultureAccountabilityLayout,
  'day-one-actions': DayOneActionsLayout,
  'closing-finale': ClosingFinaleLayout,
};

export default function SlideRenderer({
  slide,
  direction,
  allSlidesVisited,
  visitedCount,
  totalSlides,
  onJumpToFirstMissing,
  onFinishStage,
}) {
  const prefersReducedMotion = useReducedMotion();

  // Slide-to-slide transition: 0.48s, smooth directional curve, no bounce
  const slideVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : {
        enter: (dir) => ({
          x: dir > 0 ? 44 : -44,
          opacity: 0,
        }),
        center: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.48,
            ease: [0.22, 1, 0.36, 1],
            when: 'beforeChildren',
            staggerChildren: 0.095,
            delayChildren: 0.04,
          },
        },
        exit: (dir) => ({
          x: dir > 0 ? -44 : 44,
          opacity: 0,
          transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1],
          },
        }),
      };

  // Standard element reveal (eyebrow, title, subtitle, footer note)
  const itemVariants = prefersReducedMotion
    ? {
        enter: { opacity: 1, y: 0 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : {
        enter: { opacity: 0, y: 18 },
        center: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
        },
        exit: { opacity: 0, y: 6, transition: { duration: 0.2 } },
      };

  // Nested grid/list container that staggers its own cards/rows
  const groupVariants = prefersReducedMotion
    ? {
        enter: { opacity: 1 },
        center: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        enter: { opacity: 0 },
        center: {
          opacity: 1,
          transition: {
            staggerChildren: 0.085,
            delayChildren: 0.05,
          },
        },
        exit: { opacity: 0 },
      };

  // Individual card / data module entrance
  const cardVariants = prefersReducedMotion
    ? {
        enter: { opacity: 1, y: 0 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : {
        enter: { opacity: 0, y: 16 },
        center: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
        },
        exit: { opacity: 0, y: 6 },
      };

  // Intentional photography reveal: clip-path + subtle scale (1.035 -> 1) over 0.72s
  const photoVariants = prefersReducedMotion
    ? {
        enter: { opacity: 1, scale: 1 },
        center: { opacity: 1, scale: 1 },
        exit: { opacity: 1, scale: 1 },
      }
    : {
        enter: {
          opacity: 0,
          scale: 1.035,
          clipPath: 'inset(6% 6% 6% 6% round 24px)',
        },
        center: {
          opacity: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
          transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
        },
        exit: { opacity: 0, scale: 1.01, transition: { duration: 0.22 } },
      };

  const LayoutComponent = LAYOUT_REGISTRY[slide.layoutType] || CoverHeroLayout;

  return (
    <motion.article
      key={slide.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      aria-label={`Diapositiva ${slide.id} de ${totalSlides}: ${slide.title}`}
      className="relative h-full w-full overflow-y-auto dc-custom-scroll rounded-[22px] shadow-[0_20px_60px_-15px_rgba(7,14,30,0.65)] ring-1 ring-white/10"
    >
      <LayoutComponent
        slide={slide}
        itemVariants={itemVariants}
        groupVariants={groupVariants}
        cardVariants={cardVariants}
        photoVariants={photoVariants}
        reducedMotion={Boolean(prefersReducedMotion)}
        allSlidesVisited={allSlidesVisited}
        visitedCount={visitedCount}
        totalSlides={totalSlides}
        onJumpToFirstMissing={onJumpToFirstMissing}
        onFinishStage={onFinishStage}
      />
    </motion.article>
  );
}

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

// Variantes estables a nivel de módulo para evitar recreaciones en re-renders
// y animar los elementos internos sin bloquear la visibilidad de la lámina.
const NORMAL_CONTENT_VARIANTS = {
  enter: { opacity: 1 },
  center: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.055,
    },
  },
};

const REDUCED_CONTENT_VARIANTS = {
  enter: { opacity: 1 },
  center: { opacity: 1 },
};

const NORMAL_ITEM_VARIANTS = {
  enter: { opacity: 0, y: 14 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const REDUCED_ITEM_VARIANTS = {
  enter: { opacity: 1, y: 0 },
  center: { opacity: 1, y: 0 },
};

const NORMAL_GROUP_VARIANTS = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const REDUCED_GROUP_VARIANTS = {
  enter: { opacity: 1 },
  center: { opacity: 1 },
};

const NORMAL_CARD_VARIANTS = {
  enter: { opacity: 0, y: 14 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

const REDUCED_CARD_VARIANTS = {
  enter: { opacity: 1, y: 0 },
  center: { opacity: 1, y: 0 },
};

const NORMAL_PHOTO_VARIANTS = {
  enter: {
    opacity: 0,
    scale: 1.03,
    clipPath: 'inset(6% 6% 6% 6% round 24px)',
  },
  center: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0% round 24px)',
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

const REDUCED_PHOTO_VARIANTS = {
  enter: { opacity: 1, scale: 1 },
  center: { opacity: 1, scale: 1 },
};

export default function SlideRenderer({
  slide,
  allSlidesVisited,
  visitedCount,
  totalSlides,
  onJumpToFirstMissing,
  onFinishStage,
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const LayoutComponent = LAYOUT_REGISTRY[slide.layoutType] || CoverHeroLayout;

  return (
    <motion.div
      initial="enter"
      animate="center"
      variants={
        prefersReducedMotion
          ? REDUCED_CONTENT_VARIANTS
          : NORMAL_CONTENT_VARIANTS
      }
      className="h-full w-full"
    >
      <LayoutComponent
        slide={slide}
        itemVariants={
          prefersReducedMotion ? REDUCED_ITEM_VARIANTS : NORMAL_ITEM_VARIANTS
        }
        groupVariants={
          prefersReducedMotion ? REDUCED_GROUP_VARIANTS : NORMAL_GROUP_VARIANTS
        }
        cardVariants={
          prefersReducedMotion ? REDUCED_CARD_VARIANTS : NORMAL_CARD_VARIANTS
        }
        photoVariants={
          prefersReducedMotion ? REDUCED_PHOTO_VARIANTS : NORMAL_PHOTO_VARIANTS
        }
        reducedMotion={prefersReducedMotion}
        allSlidesVisited={allSlidesVisited}
        visitedCount={visitedCount}
        totalSlides={totalSlides}
        onJumpToFirstMissing={onJumpToFirstMissing}
        onFinishStage={onFinishStage}
      />
    </motion.div>
  );
}

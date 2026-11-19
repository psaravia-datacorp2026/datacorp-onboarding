import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { STAGES, TROPHY_STAGE } from '../data/onboardingData';
import { useOnboardingStore } from '../store/useOnboardingStore';
import StageNode from './StageNode';
import TrophyNode from './TrophyNode';

/**
 * Renders a smooth S-curve road segment between two zigzagged nodes.
 */
function CurvedRoadSegment({ fromX, toX, isUnlocked, accentColor }) {
  const center = 200;
  const startX = center + fromX;
  const endX = center + toX;
  const height = 110;

  const d = `M ${startX} 0 C ${startX} ${height * 0.55}, ${endX} ${height * 0.45}, ${endX} ${height}`;

  return (
    <div className="pointer-events-none relative -my-2 flex w-full justify-center">
      <svg
        width="400"
        height={height}
        viewBox={`0 0 400 ${height}`}
        fill="none"
        className="overflow-visible"
      >
        <path
          d={d}
          stroke={isUnlocked ? 'rgba(30, 58, 138, 0.55)' : 'rgba(15, 23, 42, 0.85)'}
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d={d}
          stroke={isUnlocked ? accentColor : '#1e293b'}
          strokeOpacity={isUnlocked ? 0.85 : 0.9}
          strokeWidth="8"
          strokeLinecap="round"
          style={
            isUnlocked
              ? { filter: `drop-shadow(0 0 10px ${accentColor})` }
              : undefined
          }
        />
        <path
          d={d}
          stroke={isUnlocked ? '#DBEAFE' : '#334155'}
          strokeOpacity={isUnlocked ? 0.75 : 0.45}
          strokeWidth="2.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function PathView({ onOpenStage }) {
  const { userArea, unlockedStage } = useOnboardingStore();

  const handleSelectStage = (stage) => {
    if (onOpenStage && stage.id >= 1 && stage.id <= STAGES.length) {
      onOpenStage(stage.id);
    }
  };

  const lastRegularStage = STAGES[STAGES.length - 1];
  const isTrophyRoadUnlocked = unlockedStage >= TROPHY_STAGE.id;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-4 pt-10 pb-20 sm:px-6">
      {/* Prominent Welcome Header with Text-Gradient */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12 max-w-2xl text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-200 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Ruta de {userArea || 'Onboarding'} • 4 Misiones + Trofeo Final</span>
        </div>

        <h1 className="bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl leading-tight">
          Te damos la bienvenida al onboarding de Datacorp
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm text-slate-300 sm:text-base">
          Recorre cada estación para conocer al equipo, nuestra cultura y desbloquear tu graduación oficial.
        </p>
      </motion.div>

      {/* Duolingo-Style Curved Zigzag Path (Stages 1 to 4 + Final Trophy Goal) */}
      <div className="relative flex w-full flex-col items-center py-2">
        {STAGES.map((stage, index) => {
          const isLastRegular = index === STAGES.length - 1;
          const nextStage = !isLastRegular ? STAGES[index + 1] : null;
          const isSegmentUnlocked = stage.id < unlockedStage;

          return (
            <React.Fragment key={stage.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="flex w-full justify-center"
              >
                <StageNode
                  stage={stage}
                  unlockedStage={unlockedStage}
                  onSelect={handleSelectStage}
                />
              </motion.div>

              {!isLastRegular && nextStage && (
                <CurvedRoadSegment
                  fromX={stage.xOffset}
                  toX={nextStage.xOffset}
                  isUnlocked={isSegmentUnlocked}
                  accentColor={stage.theme.strokeColor}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Curved Road Segment from Stage 4 into the Final Trophy Node */}
        <CurvedRoadSegment
          fromX={lastRegularStage.xOffset}
          toX={TROPHY_STAGE.xOffset}
          isUnlocked={isTrophyRoadUnlocked}
          accentColor={TROPHY_STAGE.theme.strokeColor}
        />

        {/* Final Goal Node: Trophy + Congratulations + Checklist */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex w-full justify-center"
        >
          <TrophyNode unlockedStage={unlockedStage} />
        </motion.div>
      </div>
    </div>
  );
}

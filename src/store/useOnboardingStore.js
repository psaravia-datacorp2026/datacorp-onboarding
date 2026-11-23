import { create } from 'zustand';
import { STAGES, TROPHY_STAGE } from '../data/onboardingData.js';
import {
  SCHEMA_VERSION,
  STAGE4_TARGET_CORRECT,
  createDefaultProgress,
  createDefaultStage4Quiz,
  onboardingPersistence,
} from '../services/onboardingPersistence.js';

function projectState(registry, pendingScrollTargetStageId = null) {
  const safeRegistry = registry || {
    schemaVersion: SCHEMA_VERSION,
    activeParticipantId: null,
    participants: {},
  };
  const activeId = safeRegistry.activeParticipantId || null;
  const activeParticipant =
    activeId && safeRegistry.participants?.[activeId]
      ? safeRegistry.participants[activeId]
      : null;

  const progress = activeParticipant?.progress || createDefaultProgress();

  return {
    schemaVersion: safeRegistry.schemaVersion || SCHEMA_VERSION,
    activeParticipantId: activeParticipant ? activeParticipant.participantId : null,
    activeParticipant,
    participants: safeRegistry.participants || {},
    unlockedStage: progress.unlockedStage,
    stage2VisitedProfiles: progress.stage2VisitedProfiles,
    stage3SlideIndex: progress.stage3SlideIndex,
    stage3VisitedSlides: progress.stage3VisitedSlides,
    stage4CorrectCount: progress.stage4Quiz?.correctCount ?? 0,
    stage4SolvedIds: progress.stage4Quiz?.solvedIds ?? [],
    trophyCelebrated: progress.trophyCelebrated,
    pendingScrollTargetStageId,
  };
}

function mutateActiveParticipant(state, updater, nextPendingScrollTarget) {
  const activeId = state.activeParticipantId;
  const current = activeId ? state.participants?.[activeId] : null;
  if (!activeId || !current) return state;

  const updatedParticipant = updater(current);
  if (!updatedParticipant || updatedParticipant === current) return state;

  const resolvedScrollTarget =
    nextPendingScrollTarget !== undefined
      ? nextPendingScrollTarget
      : state.pendingScrollTargetStageId ?? null;

  const nextRegistry = {
    schemaVersion: state.schemaVersion || SCHEMA_VERSION,
    activeParticipantId: activeId,
    participants: {
      ...state.participants,
      [activeId]: updatedParticipant,
    },
  };

  onboardingPersistence.saveRegistry(nextRegistry);
  return projectState(nextRegistry, resolvedScrollTarget);
}

const initialRegistry = onboardingPersistence.loadRegistry();

export const useOnboardingStore = create((set) => ({
  ...projectState(initialRegistry),

  registerParticipant: ({ nombre, cargo }) => {
    const cleanNombre = String(nombre || '').trim();
    const cleanCargo = String(cargo || '').trim();
    if (!cleanNombre || !cleanCargo) return null;

    const record = onboardingPersistence.createParticipantRecord({
      nombre: cleanNombre,
      cargo: cleanCargo,
    });

    set((state) => {
      const nextRegistry = {
        schemaVersion: state.schemaVersion || SCHEMA_VERSION,
        activeParticipantId: record.participantId,
        participants: {
          ...state.participants,
          [record.participantId]: record,
        },
      };
      onboardingPersistence.saveRegistry(nextRegistry);
      return projectState(nextRegistry);
    });

    return record;
  },

  startNewRegistration: () =>
    set((state) => {
      const nextRegistry = {
        schemaVersion: state.schemaVersion || SCHEMA_VERSION,
        activeParticipantId: null,
        participants: state.participants || {},
      };
      onboardingPersistence.saveRegistry(nextRegistry);
      return projectState(nextRegistry);
    }),

  rehydrateFromStorage: () =>
    set(() => {
      const reloaded = onboardingPersistence.loadRegistry();
      return projectState(reloaded);
    }),

  // Idempotent stage completion: completing stage N unlocks at most stage N + 1
  // Completing Stage 4 records estado='Completado' and fechaCompletado once.
  completeStage: (stageId) =>
    set((state) => {
      const activeId = state.activeParticipantId;
      const current = activeId ? state.participants?.[activeId] : null;
      if (!activeId || !current) return state;

      const progress = current.progress || createDefaultProgress();
      const targetStage = Math.min(stageId + 1, TROPHY_STAGE.id);
      const previousUnlocked = progress.unlockedStage ?? 1;
      const wasNewlyUnlocked = targetStage > previousUnlocked;
      const nextUnlocked = Math.max(previousUnlocked, targetStage);

      const isFinalPlayableStage = stageId === STAGES.length;
      const alreadyCompleted =
        current.estado === 'Completado' &&
        Boolean(current.fechaCompletado);

      const nextEstado =
        isFinalPlayableStage || alreadyCompleted
          ? 'Completado'
          : current.estado;

      const nextFechaCompletado =
        isFinalPlayableStage && !alreadyCompleted
          ? new Date().toISOString()
          : current.fechaCompletado;

      const hasProgressChange =
        nextUnlocked !== previousUnlocked ||
        nextEstado !== current.estado ||
        nextFechaCompletado !== current.fechaCompletado;

      if (!hasProgressChange) {
        return state.pendingScrollTargetStageId == null
          ? state
          : { ...state, pendingScrollTargetStageId: null };
      }

      const updatedParticipant = {
        ...current,
        estado: nextEstado,
        fechaCompletado: nextFechaCompletado,
        progress: {
          ...progress,
          unlockedStage: nextUnlocked,
        },
      };

      const nextRegistry = {
        schemaVersion: state.schemaVersion || SCHEMA_VERSION,
        activeParticipantId: activeId,
        participants: {
          ...state.participants,
          [activeId]: updatedParticipant,
        },
      };

      onboardingPersistence.saveRegistry(nextRegistry);
      return projectState(
        nextRegistry,
        wasNewlyUnlocked ? targetStage : null
      );
    }),

  markOrgProfileVisited: (profileId) =>
    set((state) =>
      mutateActiveParticipant(state, (participant) => {
        const progress = participant.progress || createDefaultProgress();
        const current = progress.stage2VisitedProfiles || [];
        if (current.includes(profileId)) return participant;

        return {
          ...participant,
          progress: {
            ...progress,
            stage2VisitedProfiles: [...current, profileId],
          },
        };
      })
    ),

  setStage3Progress: (slideIndex, slideId) =>
    set((state) =>
      mutateActiveParticipant(state, (participant) => {
        const progress = participant.progress || createDefaultProgress();
        const visited = progress.stage3VisitedSlides || [1];
        const nextVisited = visited.includes(slideId)
          ? visited
          : [...visited, slideId].sort((a, b) => a - b);

        return {
          ...participant,
          progress: {
            ...progress,
            stage3SlideIndex: slideIndex,
            stage3VisitedSlides: nextVisited,
          },
        };
      })
    ),

  recordStage4Correct: (questionId) =>
    set((state) =>
      mutateActiveParticipant(state, (participant) => {
        const progress = participant.progress || createDefaultProgress();
        const quiz = progress.stage4Quiz || createDefaultStage4Quiz();
        if (quiz.correctCount >= STAGE4_TARGET_CORRECT) return participant;

        const currentSolved = Array.isArray(quiz.solvedIds) ? quiz.solvedIds : [];
        if (Number.isInteger(questionId) && currentSolved.includes(questionId)) {
          return participant;
        }

        const nextSolved = Number.isInteger(questionId)
          ? [...currentSolved, questionId]
          : currentSolved;

        const nextCorrectCount = Math.min(
          quiz.correctCount + 1,
          STAGE4_TARGET_CORRECT
        );

        return {
          ...participant,
          progress: {
            ...progress,
            stage4Quiz: {
              correctCount: nextCorrectCount,
              solvedIds: nextSolved,
            },
          },
        };
      })
    ),

  resetStage4Quiz: () =>
    set((state) =>
      mutateActiveParticipant(state, (participant) => {
        const progress = participant.progress || createDefaultProgress();
        return {
          ...participant,
          progress: {
            ...progress,
            stage4Quiz: createDefaultStage4Quiz(),
          },
        };
      })
    ),

  clearPendingScrollTarget: () =>
    set((state) =>
      state.pendingScrollTargetStageId == null
        ? state
        : { ...state, pendingScrollTargetStageId: null }
    ),

  markTrophyCelebrated: () =>
    set((state) =>
      mutateActiveParticipant(state, (participant) => {
        const progress = participant.progress || createDefaultProgress();
        if (progress.trophyCelebrated) return participant;

        return {
          ...participant,
          progress: {
            ...progress,
            trophyCelebrated: true,
          },
        };
      })
    ),
}));

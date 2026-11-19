import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STAGES, TROPHY_STAGE } from '../data/onboardingData';

const DEFAULT_CHECKLIST = {
  'internal-email': false,
  'buk-access': false,
  'computer-equipment': false,
  'office-access-card': false,
};

export const useOnboardingStore = create(
  persist(
    (set) => ({
      userCode: null,
      userArea: null,
      unlockedStage: 1,

      // Stage 2 Interactive Org Chart persistent visited profiles
      stage2VisitedProfiles: [],

      // Stage 3 Interactive Presentation persistent reading state
      stage3SlideIndex: 0,
      stage3VisitedSlides: [1],

      // Final Trophy & Administrative Checklist state
      checklistItems: { ...DEFAULT_CHECKLIST },
      trophyCelebrated: false,
      pendingTrophyScroll: false,

      login: (code, area) =>
        set((state) => {
          const isSameUser = state.userCode === code;
          return {
            userCode: code,
            userArea: area,
            unlockedStage: isSameUser
              ? Math.min(state.unlockedStage, TROPHY_STAGE.id)
              : 1,
            stage2VisitedProfiles: isSameUser
              ? state.stage2VisitedProfiles || []
              : [],
            stage3SlideIndex: isSameUser ? state.stage3SlideIndex : 0,
            stage3VisitedSlides: isSameUser ? state.stage3VisitedSlides : [1],
            checklistItems: isSameUser
              ? state.checklistItems || { ...DEFAULT_CHECKLIST }
              : { ...DEFAULT_CHECKLIST },
            trophyCelebrated: isSameUser ? Boolean(state.trophyCelebrated) : false,
            pendingTrophyScroll: false,
          };
        }),

      // Idempotent stage completion: completing stage N unlocks at most stage N + 1
      completeStage: (stageId) =>
        set((state) => {
          const targetStage = Math.min(stageId + 1, TROPHY_STAGE.id);
          const nextUnlocked = Math.max(state.unlockedStage, targetStage);
          return {
            unlockedStage: nextUnlocked,
            pendingTrophyScroll:
              stageId === 4 ? true : state.pendingTrophyScroll,
          };
        }),

      // Demo helper in dev mode
      unlockNextStage: () =>
        set((state) => ({
          unlockedStage: Math.min(state.unlockedStage + 1, TROPHY_STAGE.id),
        })),

      markOrgProfileVisited: (profileId) =>
        set((state) => {
          const current = state.stage2VisitedProfiles || [];
          if (current.includes(profileId)) return state;
          return {
            stage2VisitedProfiles: [...current, profileId],
          };
        }),

      setStage3Progress: (slideIndex, slideId) =>
        set((state) => {
          const visited = state.stage3VisitedSlides || [1];
          const nextVisited = visited.includes(slideId)
            ? visited
            : [...visited, slideId].sort((a, b) => a - b);
          return {
            stage3SlideIndex: slideIndex,
            stage3VisitedSlides: nextVisited,
          };
        }),

      toggleChecklistItem: (itemId) =>
        set((state) => {
          const current = state.checklistItems || { ...DEFAULT_CHECKLIST };
          return {
            checklistItems: {
              ...current,
              [itemId]: !current[itemId],
            },
          };
        }),

      clearPendingTrophyScroll: () =>
        set({
          pendingTrophyScroll: false,
        }),

      markTrophyCelebrated: () =>
        set({
          trophyCelebrated: true,
        }),

      logout: () =>
        set({
          userCode: null,
          userArea: null,
          unlockedStage: 1,
          stage2VisitedProfiles: [],
          stage3SlideIndex: 0,
          stage3VisitedSlides: [1],
          checklistItems: { ...DEFAULT_CHECKLIST },
          trophyCelebrated: false,
          pendingTrophyScroll: false,
        }),
    }),
    {
      name: 'datacorp-onboarding-storage',
    }
  )
);

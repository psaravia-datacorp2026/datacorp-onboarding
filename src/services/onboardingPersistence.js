export const SCHEMA_VERSION = 2;
export const STORAGE_KEY = 'datacorp-onboarding-registry-v2';
export const LEGACY_STORAGE_KEY = 'datacorp-onboarding-storage';

export const STAGE4_TARGET_CORRECT = 8;
const MAX_STAGE_ID = 5;

export function createDefaultStage4Quiz() {
  return {
    correctCount: 0,
    solvedIds: [],
  };
}

export function createDefaultProgress() {
  return {
    unlockedStage: 1,
    stage2VisitedProfiles: [],
    stage3SlideIndex: 0,
    stage3VisitedSlides: [1],
    stage4Quiz: createDefaultStage4Quiz(),
    trophyCelebrated: false,
  };
}

export function generateParticipantId() {
  if (typeof globalThis !== 'undefined' && typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createEmptyRegistry() {
  return {
    schemaVersion: SCHEMA_VERSION,
    activeParticipantId: null,
    participants: {},
  };
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isValidIsoDateString(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  const parsed = Date.parse(value);
  return !Number.isNaN(parsed);
}

function sanitizeStage4Quiz(rawQuiz) {
  if (!isPlainObject(rawQuiz)) {
    return createDefaultStage4Quiz();
  }

  const solvedIds = Array.isArray(rawQuiz.solvedIds)
    ? Array.from(
        new Set(
          rawQuiz.solvedIds.filter(
            (id) => Number.isInteger(id) && id >= 1 && id <= 15
          )
        )
      )
    : [];

  const rawCount = Number(rawQuiz.correctCount);
  const correctCount = Number.isInteger(rawCount)
    ? Math.min(Math.max(rawCount, 0), STAGE4_TARGET_CORRECT)
    : Math.min(solvedIds.length, STAGE4_TARGET_CORRECT);

  return {
    correctCount,
    solvedIds,
  };
}

function sanitizeProgress(rawProgress) {
  const defaults = createDefaultProgress();
  if (!isPlainObject(rawProgress)) return defaults;

  const rawStage = Number(rawProgress.unlockedStage);
  const unlockedStage = Number.isInteger(rawStage)
    ? Math.min(Math.max(rawStage, 1), MAX_STAGE_ID)
    : defaults.unlockedStage;

  const stage2VisitedProfiles = Array.isArray(rawProgress.stage2VisitedProfiles)
    ? Array.from(
        new Set(
          rawProgress.stage2VisitedProfiles.filter(
            (item) => typeof item === 'string' && item.trim().length > 0
          )
        )
      )
    : [];

  const rawSlideIndex = Number(rawProgress.stage3SlideIndex);
  const stage3SlideIndex =
    Number.isInteger(rawSlideIndex) && rawSlideIndex >= 0 ? rawSlideIndex : 0;

  const visitedSlidesRaw = Array.isArray(rawProgress.stage3VisitedSlides)
    ? rawProgress.stage3VisitedSlides.filter(
        (id) => Number.isInteger(id) && id >= 1
      )
    : [];
  const stage3VisitedSlides =
    visitedSlidesRaw.length > 0
      ? Array.from(new Set(visitedSlidesRaw)).sort((a, b) => a - b)
      : [1];

  return {
    unlockedStage,
    stage2VisitedProfiles,
    stage3SlideIndex,
    stage3VisitedSlides,
    stage4Quiz: sanitizeStage4Quiz(rawProgress.stage4Quiz),
    trophyCelebrated: Boolean(rawProgress.trophyCelebrated),
  };
}

function sanitizeParticipantRecord(rawRecord, fallbackKey) {
  if (!isPlainObject(rawRecord)) return null;

  const participantId =
    typeof rawRecord.participantId === 'string' && rawRecord.participantId.trim()
      ? rawRecord.participantId.trim()
      : typeof fallbackKey === 'string' && fallbackKey.trim()
      ? fallbackKey.trim()
      : '';

  const nombre = typeof rawRecord.nombre === 'string' ? rawRecord.nombre.trim() : '';
  const cargo = typeof rawRecord.cargo === 'string' ? rawRecord.cargo.trim() : '';

  if (!participantId || !nombre || !cargo) {
    return null;
  }

  const fechaIngreso = isValidIsoDateString(rawRecord.fechaIngreso)
    ? rawRecord.fechaIngreso
    : new Date().toISOString();

  const fechaCompletado = isValidIsoDateString(rawRecord.fechaCompletado)
    ? rawRecord.fechaCompletado
    : null;

  const estado =
    rawRecord.estado === 'Completado' && fechaCompletado
      ? 'Completado'
      : rawRecord.estado === 'Completado'
      ? 'Completado'
      : 'Incompleto';

  return {
    participantId,
    nombre,
    cargo,
    fechaIngreso,
    fechaCompletado,
    estado,
    progress: sanitizeProgress(rawRecord.progress),
  };
}

/**
 * Crea un adaptador local versionable para el registro de participantes.
 * Puede sustituirse en fases futuras por un adaptador remoto (API corporativa).
 */
export function createLocalOnboardingAdapter(storageOverride) {
  const resolveStorage = () => {
    if (storageOverride) return storageOverride;
    try {
      return typeof globalThis !== 'undefined' ? globalThis.localStorage || null : null;
    } catch {
      return null;
    }
  };

  return {
    loadRegistry() {
      const storage = resolveStorage();
      if (!storage) return createEmptyRegistry();

      try {
        // Leer exclusivamente STORAGE_KEY; ignorar el esquema previo LEGACY_STORAGE_KEY.
        const raw = storage.getItem(STORAGE_KEY);
        if (!raw) return createEmptyRegistry();

        const parsed = JSON.parse(raw);
        if (
          !isPlainObject(parsed) ||
          parsed.schemaVersion !== SCHEMA_VERSION ||
          !isPlainObject(parsed.participants)
        ) {
          return createEmptyRegistry();
        }

        const sanitizedParticipants = {};
        for (const [key, rawRecord] of Object.entries(parsed.participants)) {
          const cleanRecord = sanitizeParticipantRecord(rawRecord, key);
          if (cleanRecord) {
            sanitizedParticipants[cleanRecord.participantId] = cleanRecord;
          }
        }

        const candidateActiveId =
          typeof parsed.activeParticipantId === 'string'
            ? parsed.activeParticipantId.trim()
            : null;

        const activeParticipantId =
          candidateActiveId && sanitizedParticipants[candidateActiveId]
            ? candidateActiveId
            : null;

        return {
          schemaVersion: SCHEMA_VERSION,
          activeParticipantId,
          participants: sanitizedParticipants,
        };
      } catch {
        return createEmptyRegistry();
      }
    },

    saveRegistry(registry) {
      const storage = resolveStorage();
      if (!storage || !isPlainObject(registry)) return;

      const payload = {
        schemaVersion: SCHEMA_VERSION,
        activeParticipantId: registry.activeParticipantId || null,
        participants: isPlainObject(registry.participants) ? registry.participants : {},
      };

      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {
        // Ignorar errores de cuota o bloqueo de almacenamiento local
      }
    },

    createParticipantRecord({ nombre, cargo }) {
      const cleanNombre = String(nombre || '').trim();
      const cleanCargo = String(cargo || '').trim();

      return {
        participantId: generateParticipantId(),
        nombre: cleanNombre,
        cargo: cleanCargo,
        fechaIngreso: new Date().toISOString(),
        fechaCompletado: null,
        estado: 'Incompleto',
        progress: createDefaultProgress(),
      };
    },

    listParticipants(registry) {
      if (!isPlainObject(registry) || !isPlainObject(registry.participants)) {
        return [];
      }
      return Object.values(registry.participants);
    },
  };
}

export const onboardingPersistence = createLocalOnboardingAdapter();

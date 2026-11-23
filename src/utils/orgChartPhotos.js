/**
 * Helper de resolución y matching inteligente de fotos del Organigrama
 * usando exclusivamente `src/assets/organigrama-fotos/**` vía Vite `import.meta.glob`.
 */

const PHOTO_MODULES = import.meta.glob(
  '../assets/organigrama-fotos/**/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' }
);

/**
 * Mapeo explícito y prioritario por `personId` para las 16 fotografías WebP actualizadas.
 * Si el archivo manual no existiera en el bundle, devuelve `null` (avatar genérico) sin caer en fotos antiguas.
 */
export const MANUAL_PHOTO_PATHS = {
  'person-angela-chavez':
    'src/assets/organigrama-fotos/Comercial/angela-chavez-actualizada.webp',
  'person-armando-villanueva':
    'src/assets/organigrama-fotos/Comercial/armando-villanueva-actualizada.webp',
  'person-camila-vera':
    'src/assets/organigrama-fotos/Desarrollo/camila-vera-actualizada.webp',
  'person-claudia-santana':
    'src/assets/organigrama-fotos/Comercial/claudia-santana-actualizada.webp',
  'person-dante-aspee':
    'src/assets/organigrama-fotos/Inteligencia/dante-aspee-actualizada.webp',
  'person-david-pazan':
    'src/assets/organigrama-fotos/Desarrollo/david-pazan-actualizada.webp',
  'person-eduardo-henriquez':
    'src/assets/organigrama-fotos/Desarrollo/eduardo-henriques-actualizada.webp',
  'person-eluney-moncada':
    'src/assets/organigrama-fotos/Comercial/eluney-moncada-actualizada.webp',
  'person-esteban-huenupil':
    'src/assets/organigrama-fotos/Desarrollo/esteban-huenupil-actualizada.webp',
  'person-francisco-morales':
    'src/assets/organigrama-fotos/Comercial/francisco-morales-actualizada.webp',
  'person-francisco-toro':
    'src/assets/organigrama-fotos/Comercial/francisco-toro-actualizada.webp',
  'person-ignacio-valdivia':
    'src/assets/organigrama-fotos/Comercial/ignacio-valdivia-actualizada.webp',
  'person-jose-mirabal':
    'src/assets/organigrama-fotos/Desarrollo/jose-mirabal-actualizada.webp',
  'person-josefa-gonzalez':
    'src/assets/organigrama-fotos/Comercial/josefa-gonzalez-actualizada.webp',
  'person-lina-villegas':
    'src/assets/organigrama-fotos/Clientes/lina-villegas-actualizada.webp',
  'person-renato-andrades':
    'src/assets/organigrama-fotos/Comercial/renato-andrades-actualizada.webp',
};

const MANUAL_PHOTO_PATH_SET = new Set(Object.values(MANUAL_PHOTO_PATHS));

/**
 * Exclusiones explícitas por `personId` sin fotografía verificada.
 * David Pazan, Esteban Huenupil y Eluney Moncada usan exclusivamente su ruta en `MANUAL_PHOTO_PATHS`.
 */
export const EXCLUDED_PHOTO_PERSON_IDS = new Set([]);

export function isPhotoExcludedForPerson(personId) {
  return typeof personId === 'string' && EXCLUDED_PHOTO_PERSON_IDS.has(personId);
}

const ACCESSORY_WORDS = new Set([
  'correcto',
  'editadas',
  'editada',
  'jpg',
  'jpeg',
  'png',
  'webp',
  'heic',
]);

/**
 * Normaliza cadenas: minúsculas, sin tildes/diéresis, sin extensiones ni sufijos accesorios.
 */
function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\(\d+\)/g, ' ')
    .replace(/[_\-.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extrae tokens significativos de un nombre o nombre de archivo.
 */
function tokenizeName(value) {
  return normalizeText(value)
    .split(' ')
    .filter((t) => t.length > 0 && !ACCESSORY_WORDS.has(t));
}

/**
 * Distancia de Levenshtein para tolerar variantes menores (ej. Stefania/Steffania, Aspee/Aspe).
 */
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

/**
 * Comprueba si dos tokens representan el mismo nombre o una variante ortográfica cercana.
 */
function tokensMatch(tokenA, tokenB) {
  if (tokenA === tokenB) return { matched: true, exact: true, distance: 0 };

  const maxLen = Math.max(tokenA.length, tokenB.length);
  if (maxLen >= 4) {
    const dist = levenshtein(tokenA, tokenB);
    if (dist <= 1) {
      return { matched: true, exact: false, distance: dist };
    }
    if (
      dist === 2 &&
      tokenA.length === tokenB.length &&
      tokenA.split('').sort().join('') === tokenB.split('').sort().join('')
    ) {
      return { matched: true, exact: false, distance: 1 };
    }
  }
  return { matched: false, exact: false, distance: 99 };
}

/**
 * Indexa todos los archivos de imagen disponibles en `src/assets/organigrama-fotos`.
 */
const INDEXED_PHOTOS = Object.entries(PHOTO_MODULES).map(([rawPath, url]) => {
  const cleanPath = rawPath.replace(/\\/g, '/');
  const fileNameWithExt = cleanPath.split('/').pop() || '';
  const extMatch = fileNameWithExt.match(/\.([^.]+)$/);
  const ext = extMatch ? extMatch[1].toLowerCase() : '';
  const baseName = fileNameWithExt.replace(/\.[^.]+$/, '');
  const isEdited = /\/editadas\//i.test(cleanPath);
  const tokens = tokenizeName(baseName);
  const relativePath = cleanPath.replace(/^\.\.\/assets\//, 'src/assets/');

  return {
    rawPath: cleanPath,
    relativePath,
    url,
    ext,
    baseName,
    normalizedBase: normalizeText(baseName),
    isEdited,
    tokens,
  };
});

const PHOTOS_BY_RELATIVE_PATH = new Map(
  INDEXED_PHOTOS.map((file) => [file.relativePath.toLowerCase(), file])
);

function resolveManualPhotoEntry(personId) {
  if (!personId || !Object.prototype.hasOwnProperty.call(MANUAL_PHOTO_PATHS, personId)) {
    return null;
  }
  const manualPath = MANUAL_PHOTO_PATHS[personId];
  const indexed = PHOTOS_BY_RELATIVE_PATH.get(manualPath.toLowerCase());
  if (indexed) {
    return {
      url: indexed.url,
      relativePath: indexed.relativePath,
    };
  }
  const globKey = manualPath.replace(/^src\/assets\//, '../assets/');
  const directUrl = PHOTO_MODULES[globKey];
  return directUrl ? { url: directUrl, relativePath: manualPath } : null;
}

/**
 * Construye un mapa `{ personId -> { url, relativePath } }` para todas las personas del organigrama,
 * priorizando `MANUAL_PHOTO_PATHS` por `personId` y respetando exclusiones explícitas.
 */
export function buildOrgPhotoMap(people) {
  const uniquePeopleMap = new Map();
  for (const entry of people || []) {
    if (!entry || typeof entry.personId !== 'string' || !entry.personId) {
      continue;
    }
    if (!uniquePeopleMap.has(entry.personId)) {
      const personTokens = tokenizeName(entry.name);
      uniquePeopleMap.set(entry.personId, {
        personId: entry.personId,
        name: entry.name,
        normPerson: normalizeText(entry.name),
        tokens: personTokens,
        firstName: personTokens[0] || '',
        lastNames: personTokens.slice(1),
      });
    }
  }

  const uniquePeople = Array.from(uniquePeopleMap.values());
  const photoMap = {};

  for (const person of uniquePeople) {
    const { personId, normPerson, tokens, firstName, lastNames } = person;

    if (isPhotoExcludedForPerson(personId)) {
      photoMap[personId] = null;
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(MANUAL_PHOTO_PATHS, personId)) {
      photoMap[personId] = resolveManualPhotoEntry(personId);
      continue;
    }

    if (tokens.length === 0) {
      photoMap[personId] = null;
      continue;
    }

    const conflictingFirstNames = uniquePeople.filter(
      (other) =>
        other.personId !== personId &&
        other.firstName &&
        tokensMatch(firstName, other.firstName).matched
    ).length;
    const isFirstNameUnique = conflictingFirstNames === 0;

    const candidates = [];

    for (const file of INDEXED_PHOTOS) {
      if (MANUAL_PHOTO_PATH_SET.has(file.relativePath)) {
        continue;
      }
      if (file.tokens.length === 0 || /^\d+$/.test(file.tokens[0])) {
        continue;
      }

      const firstMatch = file.tokens
        .map((ft) => tokensMatch(firstName, ft))
        .find((m) => m.matched);

      if (!firstMatch) continue;

      let matchedLastNameCount = 0;
      let totalDistance = firstMatch.distance;

      for (const ln of lastNames) {
        const lnMatch = file.tokens
          .map((ft) => tokensMatch(ln, ft))
          .find((m) => m.matched);
        if (lnMatch) {
          matchedLastNameCount += 1;
          totalDistance += lnMatch.distance;
        }
      }

      const fileHasExtraNameTokens = file.tokens.length > 1;

      if (fileHasExtraNameTokens && matchedLastNameCount === 0) {
        continue;
      }

      if (matchedLastNameCount === 0 && !isFirstNameUnique) {
        continue;
      }

      const hasFullNameMatch = matchedLastNameCount > 0;
      const isCorrectoPreferred = /correcto/i.test(file.baseName) ? 1 : 0;

      const score =
        (hasFullNameMatch ? 10000 : 1000) +
        matchedLastNameCount * 500 +
        (file.isEdited ? 200 : 0) +
        (file.ext === 'webp' ? 50 : 0) +
        isCorrectoPreferred * 20 -
        totalDistance * 10 -
        Math.abs(file.normalizedBase.length - normPerson.length) * 0.1;

      candidates.push({
        file,
        score,
      });
    }

    if (candidates.length === 0) {
      photoMap[personId] = null;
    } else {
      candidates.sort((a, b) => b.score - a.score);
      const best = candidates[0].file;
      photoMap[personId] = {
        url: best.url,
        relativePath: best.relativePath,
      };
    }
  }

  return photoMap;
}

/**
 * Obtiene la URL de foto resuelta para una persona dada desde el mapa indexado por `personId`.
 */
export function resolvePersonPhoto(photoMap, personId) {
  if (!personId || isPhotoExcludedForPerson(personId)) {
    return null;
  }
  return photoMap?.[personId]?.url || resolveManualPhotoEntry(personId)?.url || null;
}

/**
 * Normaliza texto para búsqueda insensible a tildes, diéresis y mayúsculas.
 */
export function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const BRANCH_DISPLAY_LABELS = {
  'branch-comercial': 'Comercial',
  'branch-innovacion': 'Innovación y Desarrollo',
  'branch-experiencia': 'Experiencia',
};

/**
 * Construye una lista plana de todos los puestos del organigrama conservando rama y conteo de cargos por `personId`.
 */
export function collectOrgPositions(structure) {
  if (!structure) return [];

  const rawPositions = [
    { ...structure.root, branchId: 'root', branchLabel: 'Dirección General' },
    {
      ...structure.companyDivisions.left.leader,
      branchId: 'root',
      branchLabel: 'Imexdbusiness',
    },
    ...structure.companyDivisions.left.team.map((m) => ({
      ...m,
      branchId: 'root',
      branchLabel: 'Imexdbusiness',
    })),
    {
      ...structure.companyDivisions.right.leader,
      branchId: 'root',
      branchLabel: 'Datlas BI',
    },
    ...structure.companyDivisions.right.team.map((m) => ({
      ...m,
      branchId: 'root',
      branchLabel: 'Datlas BI',
    })),
    ...structure.functionalBranches.flatMap((branch) => {
      const label = BRANCH_DISPLAY_LABELS[branch.id] || branch.id;
      return [
        { ...branch.leader, branchId: branch.id, branchLabel: label },
        ...branch.units.flatMap((unit) => [
          { ...unit.head, branchId: branch.id, branchLabel: label },
          ...unit.members.map((member) => ({
            ...member,
            branchId: branch.id,
            branchLabel: label,
          })),
        ]),
      ];
    }),
  ];

  const countsByPersonId = {};
  for (const pos of rawPositions) {
    countsByPersonId[pos.personId] = (countsByPersonId[pos.personId] || 0) + 1;
  }

  return rawPositions.map((pos) => ({
    ...pos,
    positionCount: countsByPersonId[pos.personId] || 1,
    normalizedName: normalizeSearchText(pos.name),
    normalizedRole: normalizeSearchText(pos.role),
    searchIndex: normalizeSearchText(`${pos.name} ${pos.role}`),
  }));
}

/**
 * Filtra puestos por nombre o cargo de forma insensible a tildes y mayúsculas.
 */
export function filterOrgPositions(positions, query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];

  const tokens = normalizedQuery.split(' ').filter(Boolean);
  const matches = positions.filter((pos) =>
    tokens.every((token) => pos.searchIndex.includes(token))
  );

  return matches.sort((a, b) => {
    const aNameMatch = a.normalizedName.includes(normalizedQuery) ? 0 : 1;
    const bNameMatch = b.normalizedName.includes(normalizedQuery) ? 0 : 1;
    if (aNameMatch !== bNameMatch) return aNameMatch - bNameMatch;

    const aStarts = a.normalizedName.startsWith(normalizedQuery) ? 0 : 1;
    const bStarts = b.normalizedName.startsWith(normalizedQuery) ? 0 : 1;
    return aStarts - bStarts;
  });
}

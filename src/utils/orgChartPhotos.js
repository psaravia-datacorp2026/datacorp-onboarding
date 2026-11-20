/**
 * Helper de resolución y matching inteligente de fotos del Organigrama
 * usando exclusivamente `src/assets/organigrama-fotos/**` vía Vite `import.meta.glob`.
 */

const PHOTO_MODULES = import.meta.glob(
  '../assets/organigrama-fotos/**/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' }
);

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
 * Distancia de Levenshtein para tolerar variantes menores (ej. Eluney/Elueny, Stefania/Steffania, Aspee/Aspe).
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

  // Variantes con transposición simple (ej. eluney <-> elueny) o 1-2 caracteres de diferencia en palabras >= 4 letras
  const maxLen = Math.max(tokenA.length, tokenB.length);
  if (maxLen >= 4) {
    const dist = levenshtein(tokenA, tokenB);
    if (dist <= 1) {
      return { matched: true, exact: false, distance: dist };
    }
    // Transposición adyacente exacta (ej. eluney / elueny -> dist 2 pero mismos caracteres)
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

/**
 * Construye un mapa { normalizedPersonName -> { url, relativePath } } para todas las personas del organigrama,
 * evitando ambigüedades entre personas que comparten el primer nombre.
 */
export function buildOrgPhotoMap(allPersonNames) {
  // Contar frecuencia de cada primer nombre dentro del organigrama para detectar ambigüedades
  const uniquePeople = Array.from(
    new Set(allPersonNames.map((n) => normalizeText(n)))
  );
  const firstNameCounts = {};
  for (const normName of uniquePeople) {
    const first = tokenizeName(normName)[0];
    if (first) {
      firstNameCounts[first] = (firstNameCounts[first] || 0) + 1;
    }
  }

  const photoMap = {};

  for (const personName of allPersonNames) {
    const normPerson = normalizeText(personName);
    if (photoMap[normPerson] !== undefined) continue;

    const personTokens = tokenizeName(personName);
    if (personTokens.length === 0) {
      photoMap[normPerson] = null;
      continue;
    }

    const firstName = personTokens[0];
    const lastNames = personTokens.slice(1);
    const isFirstNameUnique = firstNameCounts[firstName] === 1;

    const candidates = [];

    for (const file of INDEXED_PHOTOS) {
      // Ignorar archivos genéricos con solo fechas/códigos (ej. 20260219_093256, DSC_3655)
      if (file.tokens.length === 0 || /^\d+$/.test(file.tokens[0])) {
        continue;
      }

      // Buscar coincidencia de primer nombre en los tokens del archivo
      const firstMatch = file.tokens
        .map((ft) => tokensMatch(firstName, ft))
        .find((m) => m.matched);

      if (!firstMatch) continue;

      // Buscar coincidencia de apellido(s)
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

      // Regla de seguridad anti-ambigüedad:
      // - Si el archivo tiene nombre + apellido(s) y NINGÚN apellido coincide con la persona, descartar
      //   (evita asignar "Ricardo Flores" a "Ricardo Rodriguez", o "Luis Gonzalez" a "Luis Macaya").
      if (fileHasExtraNameTokens && matchedLastNameCount === 0) {
        continue;
      }

      // - Si solo coincide el primer nombre (archivo de 1 solo token), solo permitir si ese primer nombre
      //   no es ambiguo dentro del organigrama.
      if (matchedLastNameCount === 0 && !isFirstNameUnique) {
        continue;
      }

      // Puntuación según prioridad obligatoria:
      // 1. Coincidencia nombre + apellido (tier 2) > nombre solo (tier 1)
      // 2. Carpeta Editadas/
      // 3. Extensión .webp
      // 4. Menor distancia / nombre más cercano
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
      photoMap[normPerson] = null;
    } else {
      candidates.sort((a, b) => b.score - a.score);
      const best = candidates[0].file;
      photoMap[normPerson] = {
        url: best.url,
        relativePath: best.relativePath,
      };
    }
  }

  return photoMap;
}

/**
 * Obtiene la URL de foto resuelta para una persona dada desde el mapa precomputado.
 */
export function resolvePersonPhoto(photoMap, personName) {
  const key = normalizeText(personName);
  return photoMap[key]?.url || null;
}

import {
  Video,
  Network,
  Presentation,
  Gamepad2,
  Trophy,
} from 'lucide-react';

export const SHARED_ACCESS_CODE = 'DATACORP2026';

export function isValidAccessCode(code) {
  return String(code || '').trim().toUpperCase() === SHARED_ACCESS_CODE;
}

/**
 * 4 Playable Onboarding Stages + Final Graduation Trophy Node (ID: 5).
 */
export const STAGES = [
  {
    id: 1,
    title: 'Video',
    subtitle: 'Video de bienvenida',
    Icon: Video,
    xOffset: -80, // Zigzag left
    theme: {
      name: 'electric-blue',
      topBg: 'from-[#60A5FA] via-[#3B82F6] to-[#2563EB]',
      lipColor: '#1D4ED8',
      glowColor: 'rgba(59, 130, 246, 0.65)',
      ringColor: 'border-blue-300/80',
      badgeText: 'text-blue-300',
      badgeBg: 'bg-blue-500/15 border-blue-400/30',
      strokeColor: '#3B82F6',
    },
  },
  {
    id: 2,
    title: 'Organigrama',
    subtitle: 'Conoce al equipo',
    Icon: Network,
    xOffset: 80, // Zigzag right
    theme: {
      name: 'deep-indigo',
      topBg: 'from-[#818CF8] via-[#6366F1] to-[#4338CA]',
      lipColor: '#312E81',
      glowColor: 'rgba(99, 102, 241, 0.65)',
      ringColor: 'border-indigo-300/80',
      badgeText: 'text-indigo-300',
      badgeBg: 'bg-indigo-500/15 border-indigo-400/30',
      strokeColor: '#6366F1',
    },
  },
  {
    id: 3,
    title: 'Presentaciones',
    subtitle: 'Cultura y estrategia',
    Icon: Presentation,
    xOffset: -80, // Zigzag left
    theme: {
      name: 'soft-teal',
      topBg: 'from-[#2DD4BF] via-[#14B8A6] to-[#0D9488]',
      lipColor: '#115E59',
      glowColor: 'rgba(20, 184, 166, 0.65)',
      ringColor: 'border-teal-300/80',
      badgeText: 'text-teal-300',
      badgeBg: 'bg-teal-500/15 border-teal-400/30',
      strokeColor: '#14B8A6',
    },
  },
  {
    id: 4,
    title: 'Juego Final',
    subtitle: 'Quiz del Data Core',
    Icon: Gamepad2,
    xOffset: 80, // Zigzag right
    theme: {
      name: 'subtle-coral',
      topBg: 'from-[#FB7185] via-[#F43F5E] to-[#E11D48]',
      lipColor: '#9F1239',
      glowColor: 'rgba(244, 63, 94, 0.65)',
      ringColor: 'border-rose-300/80',
      badgeText: 'text-rose-300',
      badgeBg: 'bg-rose-500/15 border-rose-400/30',
      strokeColor: '#F43F5E',
    },
  },
];

export const TROPHY_STAGE = {
  id: 5,
  title: 'Graduación DataCorp',
  subtitle: '¡Felicitaciones, completaste tu onboarding!',
  Icon: Trophy,
  xOffset: 0, // Centered Grand Finale
  theme: {
    name: 'grand-finale-gold',
    topBg: 'from-[#FDE047] via-[#F59E0B] to-[#D97706]',
    lipColor: '#92400E',
    glowColor: 'rgba(245, 158, 11, 0.75)',
    strokeColor: '#F59E0B',
  },
};

/**
 * Fuente oficial del Organigrama Completo Datacorp (Untitled.png).
 * Cada puesto tiene un `id` único por posición y un `personId` que identifica a la persona
 * (Pablo Morales y Felipe Osorio ocupan dos posiciones cada uno).
 * `photoUrl` queda en `null` listo para ser reemplazado por fotografías reales en la siguiente fase.
 */
export const ORG_CHART_STRUCTURE = {
  // A. Dirección General y Dirección de Empresas (Parte Superior)
  root: {
    id: 'pos-gerente-general',
    personId: 'person-pablo-morales',
    name: 'Pablo Morales',
    role: 'Gerente General',
    parentId: null,
    tier: 'executive-root',
    photoUrl: null,
  },
  companyDivisions: {
    left: {
      leader: {
        id: 'pos-ceo-imex',
        personId: 'person-renato-andrades',
        name: 'Renato Andrades',
        role: 'CEO Imexdbusiness',
        parentId: 'pos-gerente-general',
        tier: 'company-ceo',
        photoUrl: null,
      },
      team: [
        {
          id: 'pos-bd-asia',
          personId: 'person-francisco-morales',
          name: 'Francisco Morales',
          role: 'Business Development Asia',
          parentId: 'pos-ceo-imex',
          tier: 'specialist',
          photoUrl: null,
        },
      ],
    },
    right: {
      leader: {
        id: 'pos-ceo-datlas',
        personId: 'person-felipe-osorio',
        name: 'Felipe Osorio',
        role: 'CEO Datlas BI',
        parentId: 'pos-gerente-general',
        tier: 'company-ceo',
        photoUrl: null,
      },
      team: [
        {
          id: 'pos-jdn-datlas',
          personId: 'person-alexis-robledo',
          name: 'Alexis Robledo',
          role: 'Jefe Desarrollo de Negocios',
          parentId: 'pos-ceo-datlas',
          tier: 'specialist',
          photoUrl: null,
        },
        {
          id: 'pos-eeu-datlas',
          personId: 'person-eluney-moncada',
          name: 'Eluney Moncada',
          role: 'Ejecutiva Experiencia Usuarios',
          parentId: 'pos-ceo-datlas',
          tier: 'specialist',
          photoUrl: null,
        },
      ],
    },
  },

  // B, C, D, E. Tres Ramas Funcionales Principales (Mismo Nivel Horizontal)
  functionalBranches: [
    // C. Rama Izquierda: Gerencia Comercial
    {
      id: 'branch-comercial',
      accent: 'blue',
      leader: {
        id: 'pos-gerente-comercial',
        personId: 'person-pablo-morales',
        name: 'Pablo Morales',
        role: 'Gerente Comercial',
        parentId: 'pos-gerente-general',
        tier: 'functional-director',
        photoUrl: null,
      },
      units: [
        {
          head: {
            id: 'pos-jefe-admin-finanzas',
            personId: 'person-tomas-morillo',
            name: 'Tomas Morillo',
            role: 'Jefe Administración y Finanzas',
            parentId: 'pos-gerente-comercial',
            tier: 'unit-head',
            photoUrl: null,
          },
          members: [
            {
              id: 'pos-asist-admin-fin',
              personId: 'person-armando-villanueva',
              name: 'Armando Villanueva',
              role: 'Asistente Administrativo',
              parentId: 'pos-jefe-admin-finanzas',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-bi-controller',
              personId: 'person-ignacio-valdivia',
              name: 'Ignacio Valdivia',
              role: 'Business Intelligence Controller',
              parentId: 'pos-jefe-admin-finanzas',
              tier: 'member',
              photoUrl: null,
            },
          ],
        },
        {
          head: {
            id: 'pos-jefe-area-comercial',
            personId: 'person-francisco-toro',
            name: 'Francisco Toro',
            role: 'Jefe Área Comercial',
            parentId: 'pos-gerente-comercial',
            tier: 'unit-head',
            photoUrl: null,
          },
          members: [
            {
              id: 'pos-asist-admin-com',
              personId: 'person-lucas-sanchez',
              name: 'Lucas Sanchez',
              role: 'Asistente Administrativa',
              parentId: 'pos-jefe-area-comercial',
              tier: 'member',
              photoUrl: null,
            },
          ],
        },
        {
          head: {
            id: 'pos-coord-marketing',
            personId: 'person-claudia-santana',
            name: 'Claudia Santana',
            role: 'Coordinadora de Marketing',
            parentId: 'pos-gerente-comercial',
            tier: 'unit-head',
            photoUrl: null,
          },
          members: [
            {
              id: 'pos-analista-seo',
              personId: 'person-ignacio-matus',
              name: 'Ignacio Matus',
              role: 'Analista Inteligencia SEO',
              parentId: 'pos-coord-marketing',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-seo-specialist',
              personId: 'person-josefa-gonzalez',
              name: 'Josefa Gonzalez',
              role: 'SEO Specialist',
              parentId: 'pos-coord-marketing',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-disenadora-contenido',
              personId: 'person-angela-chavez',
              name: 'Angela Chavez',
              role: 'Diseñadora de Contenido Visual',
              parentId: 'pos-coord-marketing',
              tier: 'member',
              photoUrl: null,
            },
          ],
        },
      ],
    },

    // D. Rama Central: Gerencia de Innovación y Desarrollo
    {
      id: 'branch-innovacion',
      accent: 'indigo',
      leader: {
        id: 'pos-gerente-innovacion',
        personId: 'person-felipe-osorio',
        name: 'Felipe Osorio',
        role: 'Gerente de Innovación y Desarrollo',
        parentId: 'pos-gerente-general',
        tier: 'functional-director',
        photoUrl: null,
      },
      units: [
        {
          head: {
            id: 'pos-jefe-inteligencia-prod',
            personId: 'person-diego-vera',
            name: 'Diego Vera',
            role: 'Jefe Inteligencia de Productos',
            parentId: 'pos-gerente-innovacion',
            tier: 'unit-head',
            photoUrl: null,
          },
          members: [
            {
              id: 'pos-disenadora-ux',
              personId: 'person-maria-latuff',
              name: 'Maria Latuff',
              role: 'Diseñadora Experiencia de Usuario',
              parentId: 'pos-jefe-inteligencia-prod',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-analista-inteligencia-prod',
              personId: 'person-aaron-izaguirre',
              name: 'Aaron Izaguirre',
              role: 'Analista Inteligencia de Productos',
              parentId: 'pos-jefe-inteligencia-prod',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-analista-datos-ip',
              personId: 'person-dante-aspee',
              name: 'Dante Aspee',
              role: 'Analista de Datos',
              parentId: 'pos-jefe-inteligencia-prod',
              tier: 'member',
              photoUrl: null,
            },
          ],
        },
        {
          head: {
            id: 'pos-jefe-desarrollo-prod',
            personId: 'person-ricardo-rodriguez',
            name: 'Ricardo Rodriguez',
            role: 'Jefe Desarrollo de Productos',
            parentId: 'pos-gerente-innovacion',
            tier: 'unit-head',
            photoUrl: null,
          },
          members: [
            {
              id: 'pos-fullstack-1',
              personId: 'person-esteban-huenupil',
              name: 'Esteban Huenupil',
              role: 'Full Stack Developer',
              parentId: 'pos-jefe-desarrollo-prod',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-fullstack-2',
              personId: 'person-ernesto-gutierrez',
              name: 'Ernesto Gutierrez',
              role: 'Full Stack Developer',
              parentId: 'pos-jefe-desarrollo-prod',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-fullstack-3',
              personId: 'person-camila-vera',
              name: 'Camila Vera',
              role: 'Full Stack Developer',
              parentId: 'pos-jefe-desarrollo-prod',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-data-developer',
              personId: 'person-david-pazan',
              name: 'David Pazan',
              role: 'Data Developer',
              parentId: 'pos-jefe-desarrollo-prod',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-ing-procesos',
              personId: 'person-eduardo-henriquez',
              name: 'Eduardo Henriquez',
              role: 'Ing. en Procesos',
              parentId: 'pos-jefe-desarrollo-prod',
              tier: 'member',
              photoUrl: null,
            },
          ],
        },
        {
          head: {
            id: 'pos-jefe-produccion-datos',
            personId: 'person-jorge-arana',
            name: 'Jorge Arana',
            role: 'Jefe Área de Producción de Datos',
            parentId: 'pos-gerente-innovacion',
            tier: 'unit-head',
            photoUrl: null,
          },
          members: [
            {
              id: 'pos-coord-produccion-datos',
              personId: 'person-luis-macaya',
              name: 'Luis Macaya',
              role: 'Coordinador Producción de Datos',
              parentId: 'pos-jefe-produccion-datos',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-analista-datos-pd1',
              personId: 'person-ricardo-jaque',
              name: 'Ricardo Jaque',
              role: 'Analista de Datos',
              parentId: 'pos-jefe-produccion-datos',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-analista-datos-pd2',
              personId: 'person-raul-nunez',
              name: 'Raul Nuñez',
              role: 'Analista de Datos',
              parentId: 'pos-jefe-produccion-datos',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-analista-datos-pd3',
              personId: 'person-joshua-kornich',
              name: 'Joshua Kornich',
              role: 'Analista de Datos',
              parentId: 'pos-jefe-produccion-datos',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-analista-datos-pd4',
              personId: 'person-kevin-madrid',
              name: 'Kevin Madrid',
              role: 'Analista de Datos',
              parentId: 'pos-jefe-produccion-datos',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-analista-qa',
              personId: 'person-jose-mirabal',
              name: 'Jose Mirabal',
              role: 'Analista QA',
              parentId: 'pos-jefe-produccion-datos',
              tier: 'member',
              photoUrl: null,
            },
          ],
        },
      ],
    },

    // E. Rama Derecha: Chief Experience Officer
    {
      id: 'branch-experiencia',
      accent: 'teal',
      leader: {
        id: 'pos-cxo',
        personId: 'person-rodolfo-de-laire',
        name: 'Rodolfo De Laire',
        role: 'Chief Experience Officer',
        parentId: 'pos-gerente-general',
        tier: 'functional-director',
        photoUrl: null,
      },
      units: [
        {
          head: {
            id: 'pos-coord-experiencia-usuarios',
            personId: 'person-rocio-gonzalez',
            name: 'Rocio Gonzalez',
            role: 'Coordinadora Experiencia Usuarios',
            parentId: 'pos-cxo',
            tier: 'unit-head',
            photoUrl: null,
          },
          members: [
            {
              id: 'pos-ejec-experiencia-usuarios',
              personId: 'person-stefania-guerrero',
              name: 'Stefania Guerrero',
              role: 'Ejecutiva Experiencia Usuarios',
              parentId: 'pos-coord-experiencia-usuarios',
              tier: 'member',
              photoUrl: null,
            },
            {
              id: 'pos-gestor-comercial-cartera',
              personId: 'person-lina-villegas',
              name: 'Lina Villegas',
              role: 'Gestor Comercial de Cartera',
              parentId: 'pos-coord-experiencia-usuarios',
              tier: 'member',
              photoUrl: null,
            },
          ],
        },
        {
          head: {
            id: 'pos-coord-estudios-reporteria',
            personId: 'person-paz-acevedo',
            name: 'Paz Acevedo',
            role: 'Coordinadora Estudios y Reportería',
            parentId: 'pos-cxo',
            tier: 'unit-head',
            photoUrl: null,
          },
          members: [
            {
              id: 'pos-asist-estudios-reporteria',
              personId: 'person-kenia-martinez',
              name: 'Kenia Martinez',
              role: 'Asistente de Estudios y Reportería',
              parentId: 'pos-coord-estudios-reporteria',
              tier: 'member',
              photoUrl: null,
            },
          ],
        },
        {
          head: {
            id: 'pos-coord-bases-datos',
            personId: 'person-nayade-soto',
            name: 'Nayade Soto',
            role: 'Coordinadora de Bases de Datos',
            parentId: 'pos-cxo',
            tier: 'unit-head',
            photoUrl: null,
          },
          members: [],
        },
      ],
    },
  ],
};

export const FINAL_CHECKLIST_ITEMS = [
  {
    id: 'internal-email',
    label: 'Creación de correo electrónico interno',
  },
  {
    id: 'buk-access',
    label: 'Accesos para BUK (portal y registro de asistencia)',
  },
  {
    id: 'computer-equipment',
    label: 'Entrega de equipo computacional interno',
  },
  {
    id: 'office-access-card',
    label: 'Tarjeta de acceso a la oficina',
  },
  {
    id: 'corporate-backpack',
    label: 'Entrega de mochila corporativa',
  },
];

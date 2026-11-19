// Local photographic assets in src/assets/
import imgCargoShip from '../assets/comercio-internacional (3).jpg';
import imgLogisticsHub from '../assets/comercio-exterior.webp';
import imgTeamCollaboration from '../assets/ingles-para-operaciones-de-comercio-exterior-1536x1024.webp';
import imgGlobalTradeTech from '../assets/comercio-exterior-importaciones.jpg';

/**
 * Fuente de verdad de las 20 diapositivas oficiales de la Etapa 3 (PPT Onboarcing.pdf).
 * Prohibido agregar estadísticas inventadas o marcas externas.
 */
export const PRESENTATION_SLIDES = [
  {
    id: 1,
    number: '01',
    section: 'Bienvenida',
    theme: 'navy-hero',
    layoutType: 'cover-hero',
    eyebrow: 'ONBOARDING · 2026',
    title: 'Te damos la bienvenida',
    subtitle:
      'De tres empresas independientes a un sistema que multiplica valor en el comercio internacional.',
    body: 'Recorre esta guía a tu ritmo: aquí encontrarás todo lo esencial sobre quiénes somos, cómo trabajamos y hacia dónde vamos.',
    brands: [
      {
        name: 'DATASUR / MACROSCOPE',
        detail: 'DComex · Latinoamérica',
        badge: 'LATAM',
      },
      {
        name: 'IMEXDBUSINESS',
        detail: 'Monetización global · Asia y Europa',
        badge: 'GLOBAL',
      },
      {
        name: 'DATLAS',
        detail: 'EXIM · Plataformas y partners B2B2B',
        badge: 'B2B2B',
      },
    ],
    image: imgCargoShip,
    imageAlt: 'Buque portacontenedores de comercio internacional',
    deepDive:
      'Datacorp articula tres marcas comerciales especializadas (Datasur/Macroscope, Imexdbusiness y Datlas) respaldadas por una misma capacidad productiva tecnológica y de datos.',
  },
  {
    id: 2,
    number: '02',
    section: 'Propósito',
    theme: 'light-editorial',
    layoutType: 'purpose-shift',
    eyebrow: 'NUESTRO PROPÓSITO',
    title: 'No vendemos solo datos: ayudamos a decidir',
    subtitle:
      'Nuestro verdadero valor está en transformar registros de comercio exterior en inteligencia accionable.',
    comparison: {
      before: {
        tag: 'ANTES · ACCEDER AL DATO',
        title: 'Consultas y descargas aisladas',
        description:
          'Entregar registros crudos de importación y exportación en portales separados.',
      },
      after: {
        tag: 'HACIA DÓNDE VAMOS · USAR INTELIGENCIA',
        title: 'Soluciones para decidir mejor',
        description:
          'Descubrir oportunidades de mercado con módulos analíticos, APIs e IA integrada.',
      },
    },
    chain: [
      {
        step: '1. Datos confiables',
        detail: 'El punto de partida limpio.',
      },
      {
        step: '2. Productos y APIs',
        detail: 'Hacen usable la información.',
      },
      {
        step: '3. Mejores decisiones',
        detail: 'El valor real que creamos.',
      },
    ],
    deepDive:
      'Pasamos de entregar archivos crudos para que el cliente los procese por su cuenta a ofrecer inteligencia lista para respaldar decisiones comerciales y estratégicas.',
  },
  {
    id: 3,
    number: '03',
    section: 'Identidad',
    theme: 'pastel-editorial',
    layoutType: 'identity-split',
    eyebrow: 'NUESTRA IDENTIDAD',
    title: 'Qué es Datacorp y cómo operamos',
    paragraphs: [
      'Somos una infraestructura de inteligencia para negocios internacionales. Nos definimos por las capacidades compartidas que construimos, no solo por los productos actuales.',
      'Unificamos Producción de Datos, Desarrollo e Innovación en una sola fábrica corporativa para eliminar duplicidades y reutilizar cada componente.',
    ],
    callout: {
      headline: 'Producimos desde Datacorp. Comercializamos desde cada empresa.',
      warning:
        'Importante: capacidad productiva compartida ≠ plataforma única para el usuario.',
    },
    image: imgLogisticsHub,
    imageAlt: 'Terminal portuaria iluminada al atardecer representando infraestructura global',
    deepDive:
      'Compartir la fábrica corporativa (datos, desarrollo e innovación) no significa obligar a todos los clientes a usar una única interfaz: cada empresa adapta la experiencia a su mercado.',
  },
  {
    id: 4,
    number: '04',
    section: 'Rumbo 2030',
    theme: 'light-editorial',
    layoutType: 'six-focus-grid',
    eyebrow: 'RUMBO ESTRATÉGICO · 30 PROPÓSITOS (2027–2028)',
    title: 'Seis focos que guían la evolución hacia 2030',
    subtitle:
      'Toda iniciativa del grupo se alinea con estos seis pilares estratégicos interconectados.',
    pillars: [
      {
        code: 'FOCO I · PRODUCCIÓN COMÚN',
        title: 'Una fábrica corporativa',
        description: 'Data Core modular reutilizable.',
        iconKey: 'factory',
        accent: 'coral',
      },
      {
        code: 'FOCO II · INNOVACIÓN',
        title: 'Método en Data Lab',
        description: 'Prototipos validados con evidencia.',
        iconKey: 'flask',
        accent: 'blue',
      },
      {
        code: 'FOCO III · VALOR COMERCIAL',
        title: 'Cartera y ecosistemas',
        description: 'Recurrencia en tres mercados.',
        iconKey: 'globe',
        accent: 'coral',
      },
      {
        code: 'FOCO IV · ESCALABILIDAD',
        title: 'Crecer sin multiplicar costos',
        description: 'Siete palancas económicas sostenibles.',
        iconKey: 'trending',
        accent: 'navy',
      },
      {
        code: 'FOCO V · INTELIGENCIA INTERNA',
        title: 'Dirigir con anticipación',
        description: 'CRM, ERP y métricas integradas.',
        iconKey: 'gauge',
        accent: 'blue',
      },
      {
        code: 'FOCO VI · CULTURA Y TALENTO',
        title: 'Profesionalización continua',
        description: 'Procesos claros, Accountability y feedback.',
        iconKey: 'users',
        accent: 'navy',
      },
    ],
    deepDive:
      'Los 30 propósitos del ciclo 2027–2028 se agrupan en estos 6 focos estratégicos para asegurar que tecnología, negocio y cultura evolucionen de manera sincronizada.',
  },
  {
    id: 5,
    number: '05',
    section: 'Ecosistema Comercial',
    theme: 'pastel-editorial',
    layoutType: 'ecosystem-table',
    eyebrow: 'SECCIÓN 01 · ECOSISTEMA COMERCIAL',
    title: 'Tres empresas, un motor común',
    subtitle:
      'Centralizamos la eficiencia técnica en Datacorp, pero especializamos nuestra ventaja comercial en cada territorio.',
    columns: [
      'Empresa y Plataforma',
      'Territorio Foco',
      'Modelo Comercial',
      'Papel en el Grupo',
    ],
    rows: [
      {
        company: 'Datasur / Macroscope (DComex)',
        territory: 'Latinoamérica (Chile y Colombia)',
        model: 'SaaS y Product-Led Growth',
        role: 'Adquisición, experiencia y caja base',
        accent: '#1689F8',
      },
      {
        company: 'Imexdbusiness (Oferta global)',
        territory: 'Asia (India) y Europa',
        model: 'Venta consultiva high-ticket',
        role: 'Monetización global y validación',
        accent: '#E05D34',
      },
      {
        company: 'Datlas (EXIM)',
        territory: 'México, EE. UU. y Europa',
        model: 'B2B2B, IA y partners',
        role: 'Escalabilidad y valorización futura',
        accent: '#14294D',
      },
    ],
    keyIdea:
      'Idea clave: Cada relación comercial abre todo el catálogo de Datacorp (cross-selling). Especializamos cómo llegamos al cliente, no lo que podemos ofrecerle.',
    deepDive:
      'Gracias al motor técnico común, cualquier cliente captado por una de las tres marcas puede acceder a soluciones del catálogo completo mediante venta cruzada (cross-selling).',
  },
  {
    id: 6,
    number: '06',
    section: 'Ecosistema Comercial',
    theme: 'light-editorial',
    layoutType: 'company-spotlight-datasur',
    eyebrow: 'EMPRESA 01 · LATINOAMÉRICA',
    title: 'Datasur / Macroscope: crecer desde la experiencia',
    subtitle:
      'Datasur busca pasar de ser un portal de descargas (DComex) a liderar la inteligencia de mercados en Latinoamérica, sosteniendo gran parte del flujo de caja del grupo.',
    image: imgTeamCollaboration,
    imageAlt: 'Equipo colaborando frente a un portátil analizando reportes de mercado',
    bullets: [
      {
        label: 'DComex renovado:',
        text: 'Mejor usabilidad, cobertura de países y nuevos módulos del Data Core.',
      },
      {
        label: 'SaaS y Product-Led Growth:',
        text: 'El producto freemium y educativo atrae, activa y retiene usuarios.',
      },
      {
        label: 'Fidelización y renovaciones:',
        text: 'La experiencia de servicio sostiene ingresos recurrentes y mayor ARPU.',
      },
      {
        label: 'Alianzas y asesoría:',
        text: 'SEO orgánico, gremios y vendedores evolucionados a Gestores de Negocios.',
      },
    ],
    deepDive:
      'En Latinoamérica, Datasur y Macroscope impulsan un modelo SaaS apoyado en Product-Led Growth (PLG): el propio producto educa y demuestra valor desde el primer uso.',
  },
  {
    id: 7,
    number: '07',
    section: 'Ecosistema Comercial',
    theme: 'navy-cards',
    layoutType: 'company-imex-dual',
    eyebrow: 'EMPRESA 02 · ASIA Y EUROPA',
    title: 'Imexdbusiness: llevar el dato a negocios globales',
    subtitle:
      'Es el puente hacia clientes sofisticados: Asia primero (India como base; Medio Oriente y Singapur como focos tácticos) y Europa.',
    identityPanel: {
      heading: 'Qué ES y qué NO es',
      items: [
        {
          type: 'positive',
          label: 'Sí es:',
          text: 'Venta consultiva enterprise y contratos de alto valor (high-ticket).',
        },
        {
          type: 'positive',
          label: 'Sí es:',
          text: 'Validador de módulos avanzados y administrador de fuentes globales.',
        },
        {
          type: 'negative',
          label: 'No es:',
          text: 'Plataforma B2C masiva ni empresa que compite solo por precio.',
        },
      ],
    },
    modelsPanel: {
      heading: 'Sus 3 modelos de negocio',
      models: [
        {
          name: 'Bulk Data:',
          description:
            'Datasets históricos, APIs privadas y contratos para equipos analíticos.',
        },
        {
          name: 'White Label:',
          description:
            'Plataformas con marca de cámaras, asociaciones y comunidades.',
        },
        {
          name: 'Embedded Intelligence:',
          description:
            'Inteligencia integrada en bancos, fintechs y marketplaces.',
        },
      ],
    },
    deepDive:
      'Imexdbusiness no compite por volumen masivo de bajo precio: se especializa en contratos enterprise de alto valor, licenciamiento White Label e inteligencia embebida.',
  },
  {
    id: 8,
    number: '08',
    section: 'Ecosistema Comercial',
    theme: 'light-editorial',
    layoutType: 'company-datlas-horizon',
    eyebrow: 'EMPRESA 03 · INFRAESTRUCTURA TECNOLÓGICA GLOBAL',
    title: 'Datlas y EXIM: inteligencia en las decisiones',
    subtitle:
      'EXIM es el vehículo para integrar inteligencia comercial dentro de plataformas de terceros con un modelo B2B2B (Empresa → aliado → empresas): cámaras, partners tecnológicos, APIs y White Label.',
    horizons: [
      {
        period: 'CORTO PLAZO · 0 A 3 MESES',
        title: 'Capacidades base',
        description:
          'Primeros módulos, infraestructura base y validación temprana B2B2B.',
        tone: 'light',
      },
      {
        period: 'MEDIANO PLAZO · 3 A 12 MESES',
        title: 'Expansión con aliados',
        description:
          'Módulos funcionales y operación en México, EE. UU., Europa y Asia.',
        tone: 'pastel',
      },
      {
        period: 'LARGO PLAZO · 12 A 24 MESES',
        title: 'Actor global de IA',
        description:
          'Inteligencia predictiva automatizada e ingresos recurrentes escalables.',
        tone: 'navy',
      },
    ],
    contribution:
      'Aporte a Datacorp: Impulsa la evolución del grupo hacia una compañía tecnológica altamente valorizable, menos dependiente de la venta directa tradicional.',
    deepDive:
      'El modelo B2B2B de Datlas y EXIM permite escalar llegando a miles de empresas finales a través de aliados estratégicos (cámaras, bancos y plataformas tecnológicas).',
  },
  {
    id: 9,
    number: '09',
    section: 'Metas y OKR',
    theme: 'pastel-editorial',
    layoutType: 'okr-ambitions',
    eyebrow: 'METAS Y OKR ESTRATÉGICOS',
    title: 'Ambiciones concretas por empresa',
    disclaimer:
      'Aclaración clave: Estas cifras son objetivos propuestos para evaluar con evidencia, no resultados ya conseguidos.',
    groups: [
      {
        company: 'DATASUR / MACROSCOPE',
        accent: '#E05D34',
        metrics: [
          { highlight: '+100%', label: 'tráfico orgánico SEO.' },
          { highlight: '≥ 8%', label: 'conversión visitante a usuario.' },
          { highlight: '−30%', label: 'costo de adquisición (CAC).' },
        ],
      },
      {
        company: 'IMEXDBUSINESS',
        accent: '#1689F8',
        metrics: [
          {
            highlight: '20%',
            label: 'facturación vía Embedded Intelligence.',
          },
          {
            highlight: '> 10.000',
            label: 'usuarios en plataformas distribuidas.',
          },
          {
            highlight: 'Liderazgo',
            label: 'rentable en obtención de datos.',
          },
        ],
      },
      {
        company: 'DATLAS / EXIM',
        accent: '#14294D',
        metrics: [
          {
            highlight: '5 módulos',
            label: 'validados internacionalmente.',
          },
          {
            highlight: '> 250.000',
            label: 'usuarios registrados globales.',
          },
          {
            highlight: '> 10%',
            label: 'crecimiento mensual de activos.',
          },
        ],
      },
    ],
    deepDive:
      'Todas las metas aquí listadas son OKR y objetivos estratégicos propuestos para guiar y evaluar el desempeño con evidencia real, no métricas históricas ya cerradas.',
  },
  {
    id: 10,
    number: '10',
    section: 'Tecnología y Datos',
    theme: 'navy-divider',
    layoutType: 'section-divider',
    ghostNumber: '02',
    eyebrow: 'SECCIÓN 02 · TECNOLOGÍA, DATOS E INNOVACIÓN',
    title: 'Cómo producimos datos y validamos soluciones',
    subtitle:
      'Detrás de nuestras tres marcas existe una sola arquitectura modular, un proceso industrializado del dato y un laboratorio de innovación que valida antes de escalar.',
    pillarsSummary: [
      'Arquitectura Modular de 3 Capas',
      'Pipeline DataLake + Data Core',
      'Data Lab con Validación por Evidencia',
    ],
    deepDive:
      'En esta segunda sección exploramos el motor tecnológico compartido que permite producir datos una sola vez y desplegarlos en múltiples mercados.',
  },
  {
    id: 11,
    number: '11',
    section: 'Tecnología y Datos',
    theme: 'light-editorial',
    layoutType: 'three-layer-architecture',
    eyebrow: 'DISEÑO MODULAR CORPORATIVO',
    title: 'Arquitectura corporativa de tres capas',
    subtitle:
      'Pasamos de desarrollar productos desde cero a configurar soluciones: iguales donde conviene producir, diferentes donde conviene competir.',
    layers: [
      {
        id: 'layer-3',
        title: 'Capa 3 · Plataforma Modular',
        description:
          'Configura idiomas, marcas, permisos y dashboards sin rehacer código (ej.: un observatorio para una cámara en México).',
        verb: 'Competir',
        tone: 'warm-pastel',
      },
      {
        id: 'layer-2',
        title: 'Capa 2 · Servicios de Datos (API-First)',
        description:
          'APIs estandarizadas, datasets listos y motores analíticos diseñados para integrarse con clientes y partners.',
        verb: 'Conectar',
        tone: 'cool-pastel',
      },
      {
        id: 'layer-1',
        title: 'Capa 1 · Producción del Dato (Data Core)',
        description:
          'Captura, limpieza, normalización, enriquecimiento, calidad, seguridad y fuente única de verdad.',
        verb: 'Producir',
        tone: 'deep-navy',
      },
    ],
    deepDive:
      'La Capa 1 (Producir) estandariza la fuente única de verdad; la Capa 2 (Conectar) expone servicios vía API-First; y la Capa 3 (Competir) configura experiencias a medida sin reescribir código.',
  },
  {
    id: 12,
    number: '12',
    section: 'Tecnología y Datos',
    theme: 'pastel-editorial',
    layoutType: 'datalake-pipeline',
    eyebrow: 'PRODUCCIÓN COMPARTIDA DEL DATO',
    title: 'DataLake + Data Core: procesar una vez',
    subtitle:
      'Un dato capturado, limpiado y gobernado una sola vez alimenta productos de las tres empresas sin duplicar esfuerzos.',
    stages: [
      {
        step: '1 · FUENTES',
        title: 'Registros Comex',
        description: 'Archivos CSV, SQL, TXT y Excel originales.',
        tone: 'light',
      },
      {
        step: '2 · DATALAKE',
        title: 'Bronze y Silver',
        description: 'Preservar crudo y homologar con canónicos.',
        tone: 'light',
      },
      {
        step: '3 · DATA CORE',
        title: 'Golden PostgreSQL',
        description: 'Reglas comunes, linaje y vistas materializadas.',
        tone: 'light',
      },
      {
        step: '4 · CONSUMO',
        title: 'Marts y APIs',
        description: 'Contratos propios para DComex, IMEX y EXIM.',
        tone: 'navy',
      },
    ],
    statusNote:
      'Estado actual 2026: Esta arquitectura sigue en evolución activa; algunas capas de acceso (Golden y Marts) y validaciones continúan en proceso de habilitación.',
    deepDive:
      'El flujo va desde las fuentes originales hasta Bronze/Silver en el DataLake, pasa a Golden PostgreSQL en el Data Core y se consume vía Marts y APIs con contratos específicos para cada marca.',
  },
  {
    id: 13,
    number: '13',
    section: 'Tecnología y Datos',
    theme: 'light-editorial',
    layoutType: 'tech-debt-velocity',
    eyebrow: 'RETOS TÉCNICOS · MODERNIZACIÓN 2026',
    title: 'Pagar deuda técnica compra velocidad',
    subtitle:
      'Modernizar no es un lujo: corrige procesos manuales, dependencias rígidas y riesgos de seguridad en 4 frentes (Plataformas, Automatización, BBDD y Gobernanza).',
    heroMetric: {
      value: '< 10 min',
      badge: 'META AUTOMATIZADA',
      description:
        'Meta automatizada por archivo con validación, logs y cuarentena sin detener el flujo.',
    },
    bars: [
      {
        label: 'Antes · Preparación manual y QA dependiente de personas',
        timeText: '2 a 4 horas / archivo',
        widthPercent: 92,
        tone: 'muted',
      },
      {
        label: 'Ahora · Pipeline industrializado + Login unificado y API de logs',
        timeText: 'Menos de 10 minutos (Meta)',
        widthPercent: 14,
        tone: 'accent',
      },
    ],
    fronts: ['Plataformas', 'Automatización', 'BBDD', 'Gobernanza'],
    footerNote:
      'Avance transparente: DComex, IMEX y EXIM ya muestran entregas verificables, mientras continúan validaciones y migraciones pendientes.',
    deepDive:
      'Reducir el procesamiento de 2–4 horas manuales a una meta automatizada de menos de 10 minutos por archivo libera capacidad operativa y asegura trazabilidad con logs y cuarentena automática.',
  },
  {
    id: 14,
    number: '14',
    section: 'Tecnología y Datos',
    theme: 'pastel-editorial',
    layoutType: 'datalab-process',
    eyebrow: 'INNOVACIÓN SISTEMÁTICA · I+D+I APLICADA',
    title: 'Data Lab: validar antes de escalar',
    subtitle:
      'El Data Lab convierte observaciones del mercado en soluciones comprobadas con agilidad flexible, evitando ser una fábrica de ideas sueltas.',
    fourStagesLabel: '4 ETAPAS CLAVE · CICLO DE 8 PASOS',
    fourStages: ['1. Observar', '2. Explorar', '3. Prototipar', '4. Validar'],
    eightSteps: [
      'Hallazgo',
      'Insight',
      'Hipótesis',
      'Prototipo',
      'MVP',
      'Validación',
      'Producto',
      'Escalamiento',
    ],
    measurementNote:
      'Se mide por tasa de MVP/prototipos y tiempo al mercado. Descartar a tiempo también es un buen resultado.',
    image: imgGlobalTradeTech,
    imageAlt: 'Equipo validando hipótesis y prototipos de inteligencia comercial',
    deepDive:
      'En el Data Lab, descartar temprano una hipótesis que no demuestra valor ahorra meses de ingeniería y permite invertir fuerte únicamente en productos validados.',
  },
  {
    id: 15,
    number: '15',
    section: 'Evolución Comercial y Cultural',
    theme: 'light-editorial',
    layoutType: 'sales-to-managers',
    eyebrow: 'SECCIÓN 03 · EVOLUCIÓN COMERCIAL Y CULTURAL',
    title: 'De vendedores a Gestores de Negocios',
    subtitle:
      'Dejamos atrás las ventas improvisadas para operar con venta consultiva, CRM disciplinado y foco en rentabilidad.',
    pillars: [
      {
        title: 'Perfil Gestor de Negocios:',
        text: 'Asesor consultivo con dominio analítico, CRM y métricas claras.',
      },
      {
        title: 'Modelo Land & Expand:',
        text: 'Entrar con una solución y ampliar valor (ARPU, LTV y menor churn).',
      },
      {
        title: 'Ecosistema como cuarto vendedor:',
        text: 'Alianzas, gremios y partners con metas medibles (sin acuerdos decorativos).',
      },
      {
        title: 'Automatización comercial:',
        text: 'Libera tareas repetitivas en leads y renovaciones para dedicar tiempo al cliente.',
      },
    ],
    funnelTitle: 'Embudo de 9 etapas medibles en CRM:',
    funnelSteps: [
      'Lead',
      'Prospecto',
      'Oportunidad',
      'Cotización',
      'Venta',
      'Activación',
      'Uso',
      'Renovación',
      'Expansión',
    ],
    deepDive:
      'Observa que el embudo en CRM no termina en la Venta: continúa con Activación, Uso, Renovación y Expansión para materializar la estrategia Land & Expand.',
  },
  {
    id: 16,
    number: '16',
    section: 'Evolución Comercial y Cultural',
    theme: 'pastel-editorial',
    layoutType: 'habit-shifts',
    eyebrow: 'RETOS ORGANIZACIONALES',
    title: 'Para crecer, también cambiamos hábitos',
    subtitle:
      'La transformación comercial y cultural importa tanto como la tecnología para desacoplar ingresos de costos.',
    habits: [
      {
        title: 'De vender a asesorar',
        description: 'Diagnosticar el problema del cliente antes de ofrecer.',
        iconKey: 'handshake',
        accent: 'coral',
      },
      {
        title: 'De silos a colaboración',
        description:
          'Integrar comercial, producto, datos, tecnología y finanzas.',
        iconKey: 'network',
        accent: 'navy',
      },
      {
        title: 'De actividades a resultados',
        description: 'Gestionar por KPIs, dueños claros y rentabilidad real.',
        iconKey: 'target',
        accent: 'navy',
      },
      {
        title: 'De manualidad a escala',
        description: 'Automatizar tareas y crecer mediante aliados útiles.',
        iconKey: 'scale',
        accent: 'coral',
      },
    ],
    deepDive:
      'Desacoplar ingresos de costos exige cambiar nuestros hábitos diarios: colaborar entre áreas sin silos, medir por resultados y apoyarnos en la automatización.',
  },
  {
    id: 17,
    number: '17',
    section: 'Gestión Corporativa',
    theme: 'light-editorial',
    layoutType: 'zoho-intelligence',
    eyebrow: 'GESTIÓN CORPORATIVA · ZOHO ONE',
    title: 'Decidir con datos empieza dentro de Datacorp',
    subtitle:
      'La calidad de nuestras decisiones nunca superará la calidad de nuestra información. Registrar bien en CRM y ERP es clave.',
    systems: [
      {
        code: 'CRM',
        description: 'Relación comercial, oportunidades y seguimiento.',
      },
      {
        code: 'GESTOR',
        description: 'Información operacional, uso y clientes.',
      },
      {
        code: 'ERP',
        description: 'Control de recursos, facturación y finanzas.',
      },
    ],
    biHeading:
      'Con estas fuentes integradas respondemos los 4 niveles de inteligencia de negocio:',
    biLevels: [
      {
        level: '1. DESCRIPTIVA',
        question: '¿Qué está pasando?',
      },
      {
        level: '2. DIAGNÓSTICA',
        question: '¿Por qué ocurre?',
      },
      {
        level: '3. PREDICTIVA',
        question: '¿Qué podría pasar?',
      },
      {
        level: '4. PRESCRIPTIVA',
        question: '¿Qué conviene hacer?',
      },
    ],
    deepDive:
      'Al integrar CRM, Gestor y ERP sobre Zoho One podemos evolucionar desde saber qué ocurrió (descriptiva) hasta anticipar escenarios (predictiva) y decidir qué acción tomar (prescriptiva).',
  },
  {
    id: 18,
    number: '18',
    section: 'Cultura',
    theme: 'pastel-editorial',
    layoutType: 'culture-accountability',
    eyebrow: 'NUESTRA CULTURA',
    title: 'Autonomía con claridad y Accountability',
    subtitle:
      'Accountability significa compromiso, autonomía y transparencia — nunca fiscalización. Queremos que te conviertas en un mejor profesional trabajando aquí.',
    image: imgTeamCollaboration,
    imageAlt: 'Equipo de trabajo estrechando manos en señal de compromiso y confianza',
    principles: [
      {
        label: 'Responsabilidad clara:',
        text: 'Cada cargo conoce sus resultados esperados y KPIs.',
      },
      {
        label: 'Feedback bidireccional:',
        text: 'Conversaciones frecuentes y útiles en ambas direcciones.',
      },
      {
        label: 'Decisiones con evidencia:',
        text: 'Hipótesis e indicadores por sobre la intuición sola.',
      },
      {
        label: 'Trabajo compartido:',
        text: 'Documentar procesos con SLA internos y reducir dependencias.',
      },
      {
        label: 'Crecimiento real:',
        text: 'Formación continua, mentorías, biblioteca con IA y reconocimiento.',
      },
    ],
    deepDive:
      'El Accountability en Datacorp combina autonomía para actuar con claridad sobre los resultados esperados, documentando procesos con SLA internos para no depender de héroes aislados.',
  },
  {
    id: 19,
    number: '19',
    section: 'Tu Rol',
    theme: 'light-editorial',
    layoutType: 'day-one-actions',
    eyebrow: 'TU ROL EN ESTA HISTORIA',
    title: 'Cómo aportar desde tu primer día',
    subtitle:
      'La Datacorp de 2030 se construye en cada decisión cotidiana mediante cuatro acciones simples:',
    actions: [
      {
        title: 'Conecta',
        description: 'Mira cómo impacta tu trabajo en otras áreas.',
        iconKey: 'link',
      },
      {
        title: 'Mide',
        description: 'Registra bien los datos y argumenta con evidencia.',
        iconKey: 'chart',
      },
      {
        title: 'Mejora',
        description: 'Cuestiona duplicidades y propón soluciones reutilizables.',
        iconKey: 'sparkles',
      },
      {
        title: 'Aprende',
        description: 'Comparte tu conocimiento y escucha feedback activo.',
        iconKey: 'book',
      },
    ],
    selfAssessment: {
      tag: 'AUTOEVALUACIÓN PREVIA AL QUIZ',
      text: 'Antes de responder el quiz, comprueba si puedes explicar con tus palabras: (1) qué comparte el grupo, (2) qué hace cada una de las tres empresas y (3) qué cambios técnicos y culturales estamos impulsando.',
    },
    deepDive:
      'Conectar, Medir, Mejorar y Aprender son las 4 acciones prácticas que conectan tu rol diario con los 6 focos estratégicos hacia 2030.',
  },
  {
    id: 20,
    number: '20',
    section: 'Cierre',
    theme: 'navy-hero',
    layoutType: 'closing-finale',
    eyebrow: 'BIENVENIDO/A AL EQUIPO · 2026–2030',
    title: 'Cada persona es vital para lograrlo',
    body: 'Todos los que estamos hoy y quienes se suman ahora somos necesarios. Construimos capacidades compartidas, resolvemos necesidades reales y crecemos multiplicando productividad.',
    quote: 'Con firmeza, calidez y profesionalismo, siempre. ¡Mucho éxito!',
    ctaLabel: 'Finalizar presentación',
    deepDive:
      'Has recorrido las 20 láminas oficiales de nuestra estrategia 2026–2030. Ahora estás listo para poner a prueba lo aprendido en el desafío del Data Core.',
  },
];

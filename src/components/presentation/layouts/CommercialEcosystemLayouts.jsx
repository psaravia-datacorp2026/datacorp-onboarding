import React from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Minus,
  Globe2,
  Layers,
  MapPin,
  Briefcase,
  Compass,
} from 'lucide-react';
import {
  B2B2BFlowDiagram,
  EditorialEyebrow,
  SoftBlueIconOrb,
} from '../illustrations/PresentationDiagrams';

/**
 * SLIDE 05 — «Tres empresas, un motor común»
 * Comparative 3-column company cards (ref. p.16 & p.17) instead of a cramped table.
 */
export function EcosystemTableLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  return (
    <div className="relative flex min-h-full w-full flex-col justify-between bg-gradient-to-b from-[#F8FAFF] to-[#EAF4FF] px-6 py-5 sm:px-8 sm:py-5 lg:px-10 lg:py-6 text-[#14213D]">
      {/* Header */}
      <div className="max-w-4xl space-y-1">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl lg:text-[2rem] xl:text-[2.35rem] font-extrabold tracking-tight text-[#14294D] leading-[1.1]"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm lg:text-[15px] leading-snug text-[#526382]"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      {/* 3 Equal Comparative Company Cards (ref. p.17) */}
      <motion.div
        variants={groupVariants}
        className="my-auto grid grid-cols-1 gap-4 py-2 lg:grid-cols-3"
      >
        {slide.rows.map((row, idx) => {
          const isMiddle = idx === 1;
          return (
            <motion.div
              key={row.company}
              variants={cardVariants}
              className={[
                'flex flex-col rounded-[22px] p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-0.5',
                isMiddle
                  ? 'bg-[#14294D] text-white shadow-[0_20px_44px_-12px_rgba(20,41,77,0.35)]'
                  : 'dc-editorial-card text-[#14213D]',
              ].join(' ')}
            >
              {/* Card Header */}
              <div className="border-b border-current/10 pb-2.5">
                <span
                  className={[
                    'inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider',
                    isMiddle
                      ? 'bg-[#1689F8] text-white'
                      : 'bg-[#EAF4FF] text-[#1689F8]',
                  ].join(' ')}
                >
                  Empresa 0{idx + 1}
                </span>
                <h3
                  className={[
                    'mt-1.5 text-base lg:text-[17px] font-extrabold leading-tight',
                    isMiddle ? 'text-white' : 'text-[#14294D]',
                  ].join(' ')}
                >
                  {row.company}
                </h3>
              </div>

              {/* 3 Structured Comparative Attributes */}
              <div className="mt-3 space-y-2.5 text-xs sm:text-[13px]">
                <div className="flex items-start gap-2.5">
                  <MapPin
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isMiddle ? 'text-[#60A5FA]' : 'text-[#1689F8]'
                    }`}
                  />
                  <div>
                    <span
                      className={`block text-[10px] font-bold uppercase tracking-wider ${
                        isMiddle ? 'text-[#93C5FD]' : 'text-[#526382]'
                      }`}
                    >
                      {slide.columns[1]}
                    </span>
                    <span className="block font-bold leading-snug">{row.territory}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Briefcase
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isMiddle ? 'text-[#60A5FA]' : 'text-[#1689F8]'
                    }`}
                  />
                  <div>
                    <span
                      className={`block text-[10px] font-bold uppercase tracking-wider ${
                        isMiddle ? 'text-[#93C5FD]' : 'text-[#526382]'
                      }`}
                    >
                      {slide.columns[2]}
                    </span>
                    <span className="block font-bold leading-snug">{row.model}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Compass
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isMiddle ? 'text-[#60A5FA]' : 'text-[#1689F8]'
                    }`}
                  />
                  <div>
                    <span
                      className={`block text-[10px] font-bold uppercase tracking-wider ${
                        isMiddle ? 'text-[#93C5FD]' : 'text-[#526382]'
                      }`}
                    >
                      {slide.columns[3]}
                    </span>
                    <span className="block font-bold leading-snug">{row.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Key Idea Bar */}
      <motion.div
        variants={itemVariants}
        className="dc-glass-light rounded-xl px-4 py-2.5 text-xs sm:text-[13px] leading-snug text-[#14294D]"
      >
        <p>
          <strong className="font-extrabold text-[#1689F8]">Idea clave:</strong>{' '}
          Cada relación comercial abre todo el catálogo de Datacorp (cross-selling). Especializamos cómo llegamos al cliente, no lo que podemos ofrecerle.
        </p>
      </motion.div>
    </div>
  );
}

/**
 * SLIDE 06 — «Datasur / Macroscope: crecer desde la experiencia»
 * Framed left photography + right value proposition and 4 aligned points (ref. p.3 & p.16).
 */
export function DatasurSpotlightLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
  photoVariants,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-[#FFFFFF] px-[6%] py-[5%] text-[#14213D]">
      {/* Header */}
      <div className="space-y-2">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="pastel">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#14294D] leading-[1.1]"
        >
          {slide.title}
        </motion.h2>
      </div>

      {/* Main Split: Photo Left (5 cols) + Aligned Proposal Right (7 cols) */}
      <div className="my-auto grid grid-cols-1 items-center gap-8 pt-3 lg:grid-cols-12">
        <motion.div variants={photoVariants} className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[24px] border border-[#14294D]/10 shadow-[0_22px_48px_-12px_rgba(20,41,77,0.16)]">
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading="lazy"
              className="aspect-[4/3.4] w-full object-cover"
            />
          </div>
        </motion.div>

        <div className="space-y-4 lg:col-span-7">
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed text-[#14213D]"
          >
            Datasur busca pasar de ser un portal de descargas (
            <strong className="font-extrabold text-[#1689F8]">DComex</strong>) a liderar la inteligencia de mercados en Latinoamérica, sosteniendo gran parte del flujo de caja del grupo.
          </motion.p>

          <motion.div
            variants={groupVariants}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {slide.bullets.map((item, idx) => (
              <motion.div
                key={item.label}
                variants={cardVariants}
                className="rounded-[18px] border border-[#14294D]/8 bg-[#F8FAFF] p-4 transition-colors hover:border-[#1689F8]/35"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1689F8] text-xs font-extrabold text-white">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#14294D]">
                    {item.label.replace(/:$/, '')}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#526382]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/**
 * SLIDE 07 — «Imexdbusiness: llevar el dato a negocios globales»
 * Editorial navy & light cards showcasing the 3 uniform business models (ref. p.17 & p.10).
 */
export function ImexDualPanelLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#101D38] via-[#14294D] to-[#0D172E] dc-slide-grid-dark px-[6%] py-[5%] text-white">
      {/* Subtle electric blue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-96 rounded-full bg-[#1689F8]/20 blur-[120px]"
      />

      {/* Header */}
      <div className="relative z-10 max-w-4xl space-y-2">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.1]"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-lg text-[#DDEEFF]/90"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      {/* Main Content: 3 Uniform Business Model Cards + Identity Strip */}
      <div className="relative z-10 my-auto space-y-5 py-2">
        {/* 3 Uniform Business Model Cards (ref. p.17) */}
        <motion.div
          variants={groupVariants}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {slide.modelsPanel.models.map((m, idx) => (
            <motion.div
              key={m.name}
              variants={cardVariants}
              className="flex flex-col justify-between rounded-[22px] bg-white p-6 text-[#14213D] shadow-[0_20px_45px_rgba(7,14,30,0.45)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#EAF4FF] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#1689F8]">
                    Modelo 0{idx + 1}
                  </span>
                  <SoftBlueIconOrb>
                    <Layers className="h-4 w-4" />
                  </SoftBlueIconOrb>
                </div>
                <h3 className="mt-4 text-xl font-extrabold text-[#14294D]">
                  {m.name.replace(/:$/, '')}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526382]">
                  {m.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Glass Strip: Qué ES y qué NO es */}
        <motion.div
          variants={groupVariants}
          className="dc-glass-navy rounded-[20px] p-5"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#60A5FA]">
            <Globe2 className="h-4 w-4" />
            <span>{slide.identityPanel.heading}</span>
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {slide.identityPanel.items.map((item, idx) => {
              const isPositive = item.type === 'positive';
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="flex items-start gap-3 rounded-xl bg-white/[0.06] px-4 py-3"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                      isPositive
                        ? 'bg-[#1689F8] text-white'
                        : 'bg-white/15 text-slate-300'
                    }`}
                  >
                    {isPositive ? (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    ) : (
                      <Minus className="h-3.5 w-3.5 stroke-[3]" />
                    )}
                  </span>
                  <p className="text-xs sm:text-sm leading-snug text-slate-100">
                    <strong className="font-extrabold text-white">
                      {item.label}
                    </strong>{' '}
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * SLIDE 08 — «Datlas y EXIM: inteligencia en las decisiones»
 * Connected horizontal timeline (0-3m, 3-12m, 12-24m) + B2B2B diagram (ref. p.21 & p.23).
 */
export function DatlasHorizonLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
  reducedMotion,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-[#F8FAFF] px-[6%] py-[5%] text-[#14213D]">
      {/* Header */}
      <div className="max-w-4xl space-y-2">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold tracking-tight text-[#14294D] leading-[1.1]"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base lg:text-lg text-[#526382]"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      {/* B2B2B SVG Diagram */}
      <motion.div variants={itemVariants} className="my-1 flex justify-center">
        <B2B2BFlowDiagram reducedMotion={reducedMotion} />
      </motion.div>

      {/* Connected 3-Horizon Timeline (ref. p.21) */}
      <div className="relative my-auto py-2">
        {/* Horizontal Connecting Line on Desktop */}
        <motion.div
          initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          style={{ transformOrigin: 'left center' }}
          className="pointer-events-none absolute top-1/2 left-12 right-12 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-[#DDEEFF] via-[#1689F8] to-[#14294D] lg:block"
        />

        <motion.div
          variants={groupVariants}
          className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {slide.horizons.map((h, idx) => {
            const isNavy = h.tone === 'navy';
            return (
              <motion.div
                key={h.period}
                variants={cardVariants}
                className={[
                  'flex flex-col justify-between rounded-[22px] p-6 transition-transform duration-200 hover:-translate-y-0.5',
                  isNavy
                    ? 'bg-[#14294D] text-white shadow-[0_18px_40px_-10px_rgba(20,41,77,0.35)]'
                    : 'dc-editorial-card text-[#14213D]',
                ].join(' ')}
              >
                <div>
                  <span
                    className={[
                      'inline-block rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider',
                      isNavy
                        ? 'bg-[#1689F8] text-white'
                        : 'bg-[#EAF4FF] text-[#1689F8]',
                    ].join(' ')}
                  >
                    {h.period}
                  </span>
                  <h3
                    className={[
                      'mt-3 text-lg sm:text-xl font-extrabold',
                      isNavy ? 'text-white' : 'text-[#14294D]',
                    ].join(' ')}
                  >
                    0{idx + 1}. {h.title}
                  </h3>
                  <p
                    className={[
                      'mt-2 text-sm sm:text-base leading-relaxed',
                      isNavy ? 'text-[#DDEEFF]/90' : 'text-[#526382]',
                    ].join(' ')}
                  >
                    {h.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Contribution Note */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-[#1689F8]/20 bg-[#EAF4FF] px-6 py-3 text-sm sm:text-base text-[#14294D]"
      >
        <p>
          <strong className="font-extrabold text-[#1689F8]">
            Aporte a Datacorp:
          </strong>{' '}
          Impulsa la evolución del grupo hacia una compañía tecnológica altamente valorizable, menos dependiente de la venta directa tradicional.
        </p>
      </motion.div>
    </div>
  );
}

/**
 * SLIDE 09 — «Prioridades estratégicas de crecimiento»
 * Three qualitative editorial columns aligned by company without unvalidated numeric KPIs.
 */
export function OkrAmbitionsLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  return (
    <div className="relative flex min-h-full w-full flex-col justify-between bg-[#FFFFFF] dc-slide-dots-light px-6 py-4 sm:px-8 sm:py-5 lg:px-9 lg:py-5 text-[#14213D]">
      {/* Header */}
      <div className="max-w-4xl space-y-1">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="pastel">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.25rem] font-extrabold tracking-tight text-[#14294D] leading-[1.1]"
        >
          {slide.title}
        </motion.h2>
        {slide.subtitle && (
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm lg:text-[15px] leading-snug text-[#526382]"
          >
            {slide.subtitle}
          </motion.p>
        )}
      </div>

      {/* 3 Qualitative Priority Columns */}
      <motion.div
        variants={groupVariants}
        className="my-auto grid grid-cols-1 gap-4 pt-2 lg:grid-cols-3"
      >
        {slide.groups.map((group) => (
          <motion.div
            key={group.company}
            variants={cardVariants}
            className="dc-editorial-card flex flex-col rounded-[22px] p-4"
          >
            <div className="flex flex-col gap-1 border-b border-[#14294D]/8 pb-2">
              <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-[#14294D]">
                {group.company}
              </span>
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#EAF4FF] px-2.5 py-0.5 text-[10px] font-extrabold text-[#1689F8]">
                <Compass className="h-3 w-3 shrink-0" />
                {group.focus}
              </span>
            </div>

            <div className="mt-2.5 space-y-1.5">
              {group.priorities.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#14294D]/6 bg-[#F8FAFF] px-3 py-2"
                >
                  <div className="text-xs sm:text-[13px] font-extrabold leading-tight text-[#14294D]">
                    {item.title}
                  </div>
                  <p className="mt-0.5 text-[11px] sm:text-xs leading-snug text-[#526382]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Database,
  Layers,
  Cpu,
  ChevronRight,
} from 'lucide-react';
import { EditorialEyebrow } from '../illustrations/PresentationDiagrams';

/**
 * SLIDE 10 — «Cómo producimos datos y validamos soluciones»
 * Full-screen navy divider with large ghost number and subtle radial glow (ref. p.5).
 */
export function SectionDividerLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#162B54] via-[#111F3E] to-[#0B1428] dc-slide-grid-dark px-[6%] py-[5%] text-center text-white">
      {/* Large Centered Ghost Number (ref. p.5) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[14rem] sm:text-[20rem] lg:text-[24rem] font-extrabold leading-none text-white/[0.04]"
      >
        {slide.ghostNumber}
      </div>

      {/* Top Electric Blue Ambient Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-80 w-[38rem] rounded-full bg-[#1689F8]/25 blur-[130px]"
      />

      <div className="relative z-10 max-w-4xl space-y-5">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight text-white leading-[1.08]"
        >
          {slide.title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl text-base sm:text-xl leading-relaxed text-[#DDEEFF]/90"
        >
          {slide.subtitle}
        </motion.p>

        {slide.pillarsSummary && (
          <motion.div
            variants={groupVariants}
            className="flex flex-wrap items-center justify-center gap-3 pt-4"
          >
            {slide.pillarsSummary.map((item) => (
              <motion.span
                key={item}
                variants={cardVariants}
                className="dc-glass-navy rounded-full px-5 py-2 text-xs sm:text-sm font-bold text-[#DDEEFF]"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/**
 * SLIDE 11 — «Arquitectura corporativa de tres capas»
 * Three hierarchical stepped layers with numbered blue badges (ref. p.13).
 */
export function ThreeLayerArchitectureLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  const layerIcons = [Layers, Cpu, Database];

  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFF] to-[#EAF4FF] px-[6%] py-[5%] text-[#14213D]">
      {/* Header */}
      <div className="max-w-4xl space-y-2">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#14294D] leading-[1.1]"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-lg text-[#526382]"
        >
          Pasamos de desarrollar productos desde cero a configurar soluciones:{' '}
          <strong className="font-extrabold text-[#14294D]">
            iguales donde conviene producir, diferentes donde conviene competir.
          </strong>
        </motion.p>
      </div>

      {/* Stacked 3-Layer Diagram (Competir -> Conectar -> Producir) */}
      <motion.div
        variants={groupVariants}
        className="my-auto flex flex-col gap-4 py-3"
      >
        {slide.layers.map((layer, idx) => {
          const isBaseCore = layer.tone === 'deep-navy';
          const isMiddle = layer.tone === 'cool-pastel';
          const IconComp = layerIcons[idx] || Layers;
          const layerNum = 3 - idx;

          return (
            <motion.div
              key={layer.id}
              variants={cardVariants}
              className={[
                'flex flex-col justify-between gap-4 rounded-[22px] px-6 py-5 sm:flex-row sm:items-center transition-transform duration-200 hover:-translate-y-0.5',
                isBaseCore
                  ? 'bg-[#14294D] text-white shadow-[0_18px_40px_-10px_rgba(20,41,77,0.35)]'
                  : isMiddle
                  ? 'border border-[#1689F8]/25 bg-[#EAF4FF] text-[#14294D]'
                  : 'dc-editorial-card text-[#14294D]',
              ].join(' ')}
            >
              <div className="flex items-start gap-4 sm:items-center">
                <div
                  className={[
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-extrabold shadow-xs',
                    isBaseCore
                      ? 'bg-[#1689F8] text-white'
                      : 'bg-gradient-to-br from-[#1689F8] to-[#258AFF] text-white',
                  ].join(' ')}
                >
                  <IconComp className="h-5 w-5" />
                </div>

                <div>
                  <h3
                    className={[
                      'text-lg sm:text-xl font-extrabold',
                      isBaseCore ? 'text-white' : 'text-[#14294D]',
                    ].join(' ')}
                  >
                    {layer.title}
                  </h3>
                  <p
                    className={[
                      'mt-1 text-sm sm:text-base leading-relaxed',
                      isBaseCore ? 'text-[#DDEEFF]/90' : 'text-[#526382]',
                    ].join(' ')}
                  >
                    {layer.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <span
                  className={[
                    'inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider',
                    isBaseCore
                      ? 'bg-white/12 text-[#60A5FA] border border-white/15'
                      : 'bg-white text-[#1689F8] border border-[#1689F8]/20 shadow-2xs',
                  ].join(' ')}
                >
                  <span>0{layerNum} · {layer.verb}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/**
 * SLIDE 12 — «DataLake + Data Core: procesar una vez»
 * Visual 4-station horizontal pipeline with coherent connecting arrows (ref. p.8 & p.13).
 */
export function DataLakePipelineLayout({
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
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#14294D] leading-[1.1]"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-lg text-[#526382]"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      {/* 4-Station Horizontal Pipeline with Animated Connecting Track */}
      <div className="relative my-auto py-3">
        <motion.div
          initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
          style={{ transformOrigin: 'left center' }}
          className="pointer-events-none absolute top-1/2 left-10 right-10 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-[#DDEEFF] via-[#1689F8] to-[#14294D] lg:block"
        />

        <motion.div
          variants={groupVariants}
          className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {slide.stages.map((st, idx) => {
            const isNavy = st.tone === 'navy';
            return (
              <motion.div
                key={st.step}
                variants={cardVariants}
                className={[
                  'flex flex-col justify-between rounded-[22px] p-6 transition-transform duration-200 hover:-translate-y-0.5',
                  isNavy
                    ? 'bg-[#14294D] text-white shadow-[0_18px_40px_-10px_rgba(20,41,77,0.35)]'
                    : 'dc-editorial-card text-[#14213D]',
                ].join(' ')}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={[
                        'inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold',
                        isNavy
                          ? 'bg-[#1689F8] text-white'
                          : 'bg-[#EAF4FF] text-[#1689F8]',
                      ].join(' ')}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={[
                        'text-[11px] font-extrabold uppercase tracking-wider',
                        isNavy ? 'text-[#60A5FA]' : 'text-[#1689F8]',
                      ].join(' ')}
                    >
                      {st.step.split('·')[1]?.trim() || st.step}
                    </span>
                  </div>

                  <h3
                    className={[
                      'mt-4 text-lg sm:text-xl font-extrabold',
                      isNavy ? 'text-white' : 'text-[#14294D]',
                    ].join(' ')}
                  >
                    {st.title}
                  </h3>
                  <p
                    className={[
                      'mt-2 text-sm sm:text-base leading-relaxed',
                      isNavy ? 'text-[#DDEEFF]/90' : 'text-[#526382]',
                    ].join(' ')}
                  >
                    {st.description}
                  </p>
                </div>

                {idx < slide.stages.length - 1 && (
                  <div className="mt-4 flex items-center justify-end text-xs font-bold text-[#1689F8]">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Active Evolution Status Note */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-[#1689F8]/20 bg-[#EAF4FF] px-6 py-3.5 text-sm sm:text-base text-[#14294D]"
      >
        <p>
          <strong className="font-extrabold text-[#1689F8]">
            Estado actual 2026:
          </strong>{' '}
          Esta arquitectura sigue en evolución activa; algunas capas de acceso (Golden y Marts) y validaciones continúan en proceso de habilitación.
        </p>
      </motion.div>
    </div>
  );
}

/**
 * SLIDE 13 — «Pagar deuda técnica compra velocidad»
 * Hero time KPI + elegant comparison bars (ref. p.11 & p.19).
 */
export function TechDebtVelocityLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
  reducedMotion,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#101D38] via-[#14294D] to-[#0D172E] dc-slide-grid-dark px-[6%] py-[5%] text-white">
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

      {/* Middle Hero KPI + 4 Modernization Fronts */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 my-auto grid grid-cols-1 items-center gap-6 py-2 lg:grid-cols-12"
      >
        <div className="lg:col-span-4 flex flex-col items-start">
          <span className="rounded-full bg-[#1689F8]/25 border border-[#60A5FA]/40 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#60A5FA]">
            {slide.heroMetric.badge}
          </span>
          <div className="mt-2 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#60A5FA] leading-none">
            {slide.heroMetric.value}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-3.5">
          <p className="text-lg sm:text-2xl font-extrabold text-white leading-snug">
            {slide.heroMetric.description}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {slide.fronts.map((front) => (
              <span
                key={front}
                className="rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-xs sm:text-sm font-bold text-[#DDEEFF]"
              >
                Frente: {front}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Elegant Horizontal Comparison Bars (ref. p.19) */}
      <motion.div
        variants={groupVariants}
        className="relative z-10 dc-glass-navy rounded-[22px] p-5 sm:p-6 space-y-4"
      >
        {slide.bars.map((bar) => {
          const isAccent = bar.tone === 'accent';
          return (
            <motion.div
              key={bar.label}
              variants={cardVariants}
              className="space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-base">
                <span
                  className={
                    isAccent
                      ? 'font-extrabold text-white'
                      : 'font-medium text-slate-300'
                  }
                >
                  {bar.label}
                </span>
                <span
                  className={
                    isAccent
                      ? 'font-extrabold text-[#60A5FA]'
                      : 'font-bold text-slate-200'
                  }
                >
                  {bar.timeText}
                </span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
                <motion.div
                  initial={
                    reducedMotion ? { width: `${bar.widthPercent}%` } : { width: 0 }
                  }
                  animate={{ width: `${bar.widthPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                  className={[
                    'h-full rounded-full',
                    isAccent
                      ? 'bg-gradient-to-r from-[#1689F8] to-[#60A5FA] shadow-[0_0_16px_rgba(22,137,248,0.65)]'
                      : 'bg-slate-400/45',
                  ].join(' ')}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Transparent Progress Note */}
      <motion.p
        variants={itemVariants}
        className="relative z-10 pt-2 text-xs sm:text-sm text-[#DDEEFF]/85"
      >
        <strong className="font-extrabold text-[#60A5FA]">
          Avance transparente:
        </strong>{' '}
        DComex, IMEX y EXIM ya muestran entregas verificables, mientras continúan validaciones y migraciones pendientes.
      </motion.p>
    </div>
  );
}

/**
 * SLIDE 14 — «Data Lab: validar antes de escalar»
 * 4 key stages + 8-step readable sequence + lateral framed photograph (ref. p.21 & p.22).
 */
export function DataLabProcessLayout({
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

      {/* Main Split: 4 Stages & 8-Step Flow Left (7 cols) + Photo Right (5 cols) */}
      <div className="my-auto grid grid-cols-1 items-center gap-8 pt-3 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed text-[#14213D]"
          >
            El{' '}
            <strong className="font-extrabold text-[#1689F8]">Data Lab</strong>{' '}
            convierte observaciones del mercado en soluciones comprobadas con agilidad flexible, evitando ser una fábrica de ideas sueltas.
          </motion.p>

          {/* 4 Key Stages + 8-Step Complete Cycle Card */}
          <motion.div
            variants={groupVariants}
            className="rounded-[22px] border border-[#1689F8]/20 bg-[#F8FAFF] p-6 space-y-4"
          >
            <span className="block text-xs font-extrabold uppercase tracking-[0.14em] text-[#1689F8]">
              {slide.fourStagesLabel}
            </span>

            {/* 4 Key Stages */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {slide.fourStages.map((stage) => (
                <motion.div
                  key={stage}
                  variants={cardVariants}
                  className="rounded-xl bg-[#14294D] px-3.5 py-2.5 text-center text-xs sm:text-sm font-extrabold text-white shadow-xs"
                >
                  {stage}
                </motion.div>
              ))}
            </div>

            {/* 8-Step Complete Journey */}
            <div className="border-t border-[#14294D]/10 pt-3.5">
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#526382]">
                Recorrido completo (8 pasos):
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                {slide.eightSteps.map((step, idx) => (
                  <React.Fragment key={step}>
                    <span className="rounded-lg border border-[#14294D]/12 bg-white px-3 py-1 text-xs sm:text-sm font-bold text-[#14294D]">
                      {step}
                    </span>
                    {idx < slide.eightSteps.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-[#1689F8]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base leading-relaxed text-[#526382]"
          >
            Se mide por{' '}
            <strong className="font-extrabold text-[#14294D]">
              tasa de MVP/prototipos y tiempo al mercado
            </strong>
            . Descartar a tiempo también es un buen resultado.
          </motion.p>
        </div>

        {/* Lateral Framed Photo */}
        <motion.div variants={photoVariants} className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[24px] border border-[#14294D]/10 shadow-[0_22px_48px_-12px_rgba(20,41,77,0.18)]">
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading="lazy"
              className="aspect-[4/3.4] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

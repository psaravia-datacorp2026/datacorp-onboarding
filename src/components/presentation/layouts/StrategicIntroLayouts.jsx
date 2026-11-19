import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Factory,
  FlaskConical,
  Globe2,
  TrendingUp,
  Gauge,
  Users,
  Info,
} from 'lucide-react';
import {
  EditorialBlueCurve,
  EditorialEyebrow,
  SoftBlueIconOrb,
} from '../illustrations/PresentationDiagrams';

const PILLAR_ICONS = {
  factory: Factory,
  flask: FlaskConical,
  globe: Globe2,
  trending: TrendingUp,
  gauge: Gauge,
  users: Users,
};

/**
 * SLIDE 01 — «Te damos la bienvenida»
 * Editorial Hero (ref. p.1 & p.3): Deep Navy + Electric Blue, framed rounded photography,
 * and 3 aligned company identity modules at the base.
 */
export function CoverHeroLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
  photoVariants,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0F1B35] via-[#14294D] to-[#0D172E] dc-slide-grid-dark px-[6%] py-[5%] text-white">
      {/* Subtle radial electric-blue ambient halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-1/4 h-96 w-96 rounded-full bg-[#1689F8]/20 blur-[120px]"
      />

      {/* Top 12-Column Editorial Hero Grid */}
      <div className="relative z-10 my-auto grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* Left 7 Columns: Eyebrow, Huge Display Title, Lead & Subtitle */}
        <div className="space-y-4 lg:col-span-7">
          <motion.div variants={itemVariants}>
            <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-white leading-[1.05]"
          >
            {slide.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-xl lg:text-[1.35rem] font-normal leading-snug text-[#DDEEFF]"
          >
            {slide.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="pt-1">
            <div className="h-1 w-16 rounded-full bg-[#258AFF]" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-sm sm:text-base leading-relaxed text-slate-300"
          >
            {slide.body}
          </motion.p>
        </div>

        {/* Right 5 Columns: Intentionally Cropped Framed Photograph (ref. p.1/3) */}
        <motion.div variants={photoVariants} className="hidden lg:block lg:col-span-5">
          <div className="relative overflow-hidden rounded-[24px] border border-white/15 shadow-[0_24px_50px_rgba(7,14,30,0.6)]">
            <img
              src={slide.image}
              alt={slide.imageAlt}
              className="aspect-[4/3] w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1B35]/60 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Bottom 3 Brand Modules on Shared 12-Column Grid */}
      <motion.div
        variants={groupVariants}
        className="relative z-10 mt-6 grid grid-cols-1 gap-4 border-t border-white/12 pt-5 sm:grid-cols-3"
      >
        {slide.brands.map((brand, idx) => (
          <motion.div
            key={brand.name}
            variants={cardVariants}
            className="dc-glass-navy flex flex-col justify-between rounded-2xl px-5 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
                0{idx + 1} · {brand.name}
              </span>
              <span className="rounded-full bg-[#1689F8]/25 px-2.5 py-0.5 text-[11px] font-bold text-white">
                {brand.badge}
              </span>
            </div>
            <p className="mt-1.5 text-sm sm:text-base font-medium text-white">
              {brand.detail}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * SLIDE 02 — «No vendemos solo datos: ayudamos a decidir»
 * Clean two-column Before/Now contrast + 3-step horizontal sequence (ref. p.6 & p.7).
 */
export function PurposeShiftLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-[#FFFFFF] px-[6%] py-[5%] text-[#14213D]">
      {/* Soft pastel top-right glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#EAF4FF] blur-3xl"
      />

      {/* Editorial Header */}
      <div className="relative z-10 max-w-4xl space-y-2.5">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-tight text-[#14294D] leading-[1.1]"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-[#526382]"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      {/* Two Clean Contrast Columns (Before vs Where We Are Going) */}
      <motion.div
        variants={groupVariants}
        className="relative z-10 my-auto grid grid-cols-1 items-stretch gap-6 py-3 lg:grid-cols-12"
      >
        {/* Left 5 Columns: ANTES */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-5 flex flex-col justify-center rounded-[22px] border border-[#14294D]/10 bg-[#F8FAFF] p-6 sm:p-8"
        >
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#526382]">
            {slide.comparison.before.tag}
          </span>
          <h3 className="mt-2.5 text-xl sm:text-2xl font-extrabold text-[#14294D]">
            {slide.comparison.before.title}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#526382]">
            {slide.comparison.before.description}
          </p>
        </motion.div>

        {/* Center 2 Columns: Directional Bridge */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-2 flex items-center justify-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4FF] text-[#1689F8] shadow-xs">
            <ArrowRight className="h-5 w-5 stroke-[2.5]" />
          </div>
        </motion.div>

        {/* Right 5 Columns: HACIA DÓNDE VAMOS */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-5 flex flex-col justify-center rounded-[22px] border border-[#1689F8]/25 bg-gradient-to-br from-[#EAF4FF] to-[#DDEEFF]/70 p-6 sm:p-8 shadow-[0_16px_38px_-12px_rgba(22,137,248,0.16)]"
        >
          <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1689F8]">
            {slide.comparison.after.tag}
          </span>
          <h3 className="mt-2.5 text-xl sm:text-2xl font-extrabold text-[#14294D]">
            {slide.comparison.after.title}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#14294D]/85">
            {slide.comparison.after.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom 3-Step Value Chain Bar in Deep Navy */}
      <motion.div
        variants={groupVariants}
        className="relative z-10 rounded-[20px] bg-[#14294D] px-7 py-4.5 text-white shadow-[0_16px_36px_-10px_rgba(20,41,77,0.3)]"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {slide.chain.map((node, index) => (
            <motion.div
              key={node.step}
              variants={cardVariants}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1689F8] text-xs font-extrabold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-white">
                    {node.step.replace(/^\d+\.\s*/, '')}
                  </p>
                  <p className="text-xs sm:text-sm text-[#DDEEFF]/85">
                    {node.detail}
                  </p>
                </div>
              </div>
              {index < slide.chain.length - 1 && (
                <div className="hidden sm:block h-px w-8 bg-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * SLIDE 03 — «Qué es Datacorp y cómo operamos»
 * Editorial composition: flowing blue curve, clear typography, single glass callout,
 * and framed large photograph (ref. p.3 & p.4).
 */
export function IdentitySplitLayout({
  slide,
  itemVariants,
  photoVariants,
  reducedMotion,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFF] to-[#EAF4FF] px-[6%] py-[5%] text-[#14213D]">
      {/* Signature BRIX Blue Ribbon Curve in background (ref. p.3) */}
      <EditorialBlueCurve
        reducedMotion={reducedMotion}
        className="absolute right-[18%] -top-12 h-[32rem] w-[32rem] opacity-85"
      />

      <div className="relative z-10 my-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Left 7 Columns: Title, Editorial Text & Single Glass Callout */}
        <div className="space-y-5 lg:col-span-7">
          <motion.div variants={itemVariants}>
            <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[2.95rem] font-extrabold tracking-tight text-[#14294D] leading-[1.08]"
          >
            {slide.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed text-[#14213D]"
          >
            Somos una{' '}
            <strong className="font-extrabold text-[#14294D]">
              infraestructura de inteligencia para negocios internacionales
            </strong>
            . Nos definimos por las capacidades compartidas que construimos, no solo por los productos actuales.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed text-[#526382]"
          >
            {slide.paragraphs[1]}
          </motion.p>

          {/* Single Protagonist Glass Callout Card */}
          <motion.div
            variants={itemVariants}
            className="dc-glass-light rounded-[22px] p-6"
          >
            <p className="text-base sm:text-lg font-extrabold text-[#14294D]">
              {slide.callout.headline}
            </p>
            <p className="mt-2 flex items-center gap-2.5 text-sm sm:text-base font-bold text-[#1689F8]">
              <Info className="h-4 w-4 shrink-0" />
              <span>{slide.callout.warning}</span>
            </p>
          </motion.div>
        </div>

        {/* Right 5 Columns: Tall Framed Rounded Photography */}
        <motion.div variants={photoVariants} className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[24px] border-4 border-white shadow-[0_24px_50px_-12px_rgba(20,41,77,0.2)]">
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading="lazy"
              className="aspect-[4/4.2] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * SLIDE 04 — «Seis focos que guían la evolución hacia 2030»
 * Impeccable 3x2 grid of 6 equal modules on a split white/pastel backdrop (ref. p.8 & p.22).
 */
export function SixFocusGridLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#FFFFFF] px-[6%] py-[5%] text-[#14213D]">
      {/* Bottom half pastel blue backdrop (ref. p.8) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[#F2F7FF]"
      />

      {/* Header */}
      <div className="relative z-10 max-w-4xl space-y-2">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="pastel">{slide.eyebrow}</EditorialEyebrow>
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

      {/* 3x2 Equal Modules Grid */}
      <motion.div
        variants={groupVariants}
        className="relative z-10 my-auto grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {slide.pillars.map((pillar) => {
          const IconComponent = PILLAR_ICONS[pillar.iconKey] || Factory;

          return (
            <motion.div
              key={pillar.code}
              variants={cardVariants}
              className="dc-editorial-card flex flex-col justify-between rounded-[20px] p-5 sm:p-6 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#1689F8]">
                  {pillar.code}
                </span>
                <SoftBlueIconOrb>
                  <IconComponent className="h-5 w-5" />
                </SoftBlueIconOrb>
              </div>

              <div className="mt-4">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#14294D]">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-[#526382]">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

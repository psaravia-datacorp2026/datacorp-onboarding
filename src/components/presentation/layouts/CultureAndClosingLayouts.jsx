import React from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  ChevronRight,
  Handshake,
  Users,
  Target,
  TrendingUp,
  Link2,
  BarChart3,
  Sparkles,
  BookOpen,
  Lock,
  ArrowRight,
  Compass,
} from 'lucide-react';
import {
  EditorialEyebrow,
  SoftBlueIconOrb,
} from '../illustrations/PresentationDiagrams';

const HABIT_ICONS = {
  handshake: Handshake,
  network: Users,
  target: Target,
  scale: TrendingUp,
};

const ACTION_ICONS = {
  link: Link2,
  chart: BarChart3,
  sparkles: Sparkles,
  book: BookOpen,
};

/**
 * SLIDE 15 — «De vendedores a Gestores de Negocios»
 * Split editorial layout (ref. p.10 & p.23): Left navy panel + Right 4 pillars & 9-stage CRM funnel.
 */
export function SalesToManagersLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  return (
    <div className="relative grid h-full w-full grid-cols-1 overflow-hidden bg-[#FFFFFF] text-[#14213D] lg:grid-cols-12">
      {/* Left 5 Columns: Deep Navy Editorial Panel (ref. p.10) */}
      <div className="relative flex flex-col justify-between bg-gradient-to-b from-[#162C56] via-[#14294D] to-[#0E1B34] p-7 sm:p-10 text-white lg:col-span-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#1689F8]/25 blur-[90px]"
        />

        <div className="relative z-10 my-auto space-y-4">
          <motion.div variants={itemVariants}>
            <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-white leading-[1.1]"
          >
            {slide.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#DDEEFF]/90"
          >
            {slide.subtitle}
          </motion.p>
        </div>

        {/* Bottom 9-Stage CRM Funnel inside Navy Column */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mt-6 rounded-2xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-sm"
        >
          <p className="mb-2.5 text-xs font-extrabold uppercase tracking-wider text-[#60A5FA]">
            {slide.funnelTitle}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {slide.funnelSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <span
                  className={[
                    'rounded-lg px-2.5 py-1 text-xs font-bold',
                    idx >= 5
                      ? 'bg-[#1689F8] text-white'
                      : 'bg-white/10 text-white',
                  ].join(' ')}
                >
                  {idx + 1}. {step}
                </span>
                {idx < slide.funnelSteps.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-[#60A5FA]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right 7 Columns: 4 Pillared Capsules (ref. p.10) */}
      <div className="flex flex-col justify-center bg-[#F8FAFF] p-7 sm:p-10 lg:col-span-7">
        <motion.div variants={groupVariants} className="space-y-3.5">
          {slide.pillars.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="dc-editorial-card flex items-start gap-4 rounded-[20px] px-6 py-4.5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1689F8] to-[#258AFF] text-white shadow-xs">
                <Check className="h-4 w-4 stroke-[3]" />
              </span>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#14213D]">
                <strong className="font-extrabold text-[#14294D]">
                  {item.title}
                </strong>{' '}
                <span className="text-[#526382]">{item.text}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/**
 * SLIDE 16 — «Para crecer, también cambiamos hábitos»
 * Four aligned DE -> HACIA comparison modules in a 2x2 grid (ref. p.22 & p.24).
 */
export function HabitShiftsLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-[#F8FAFF] dc-slide-dots-light px-[6%] py-[5%] text-[#14213D]">
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

      {/* 2x2 Grid of Aligned Habit Shifts */}
      <motion.div
        variants={groupVariants}
        className="my-auto grid grid-cols-1 gap-5 pt-4 sm:grid-cols-2"
      >
        {slide.habits.map((habit, idx) => {
          const IconComponent = HABIT_ICONS[habit.iconKey] || Handshake;
          return (
            <motion.div
              key={habit.title}
              variants={cardVariants}
              className="dc-editorial-card flex items-start gap-5 rounded-[22px] p-6 sm:p-7 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <SoftBlueIconOrb size="lg">
                <IconComponent className="h-6 w-6" />
              </SoftBlueIconOrb>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#1689F8]">
                  Cambio 0{idx + 1}
                </span>
                <h3 className="mt-1 text-lg sm:text-2xl font-extrabold text-[#14294D]">
                  {habit.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526382]">
                  {habit.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/**
 * SLIDE 17 — «Decidir con datos empieza dentro de Datacorp» (Zoho One)
 * Three connected systems (CRM, Gestor, ERP) feeding 4 Business Intelligence levels (ref. p.8 & p.22).
 */
export function ZohoIntelligenceLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-[#FFFFFF] px-[6%] py-[5%] text-[#14213D]">
      {/* Header */}
      <div className="max-w-4xl space-y-2">
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

      {/* Top 3 Deep Navy System Modules: CRM, GESTOR, ERP */}
      <motion.div
        variants={groupVariants}
        className="my-auto grid grid-cols-1 gap-5 py-3 sm:grid-cols-3"
      >
        {slide.systems.map((sys, idx) => (
          <motion.div
            key={sys.code}
            variants={cardVariants}
            className="rounded-[22px] bg-[#14294D] p-6 text-white shadow-[0_18px_40px_-10px_rgba(20,41,77,0.3)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#60A5FA]">
                Sistema 0{idx + 1}
              </span>
              <span className="rounded-full bg-[#1689F8] px-3 py-0.5 text-xs font-extrabold text-white">
                {sys.code}
              </span>
            </div>
            <p className="mt-4 text-base sm:text-lg font-medium leading-relaxed text-[#DDEEFF]">
              {sys.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom 4 Business Intelligence Levels */}
      <motion.div
        variants={groupVariants}
        className="rounded-[22px] border border-[#1689F8]/20 bg-[#F2F7FF] p-5 sm:p-6"
      >
        <p className="text-sm sm:text-base font-extrabold text-[#14294D]">
          {slide.biHeading}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {slide.biLevels.map((bi) => (
            <motion.div
              key={bi.level}
              variants={cardVariants}
              className="rounded-2xl bg-white px-5 py-4 shadow-xs border border-[#14294D]/6"
            >
              <span className="block text-xs font-extrabold uppercase tracking-wider text-[#1689F8]">
                {bi.level}
              </span>
              <p className="mt-1.5 text-base sm:text-lg font-extrabold text-[#14294D]">
                {bi.question}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * SLIDE 18 — «Autonomía con claridad y Accountability»
 * Large photograph on left + 5 well-organized cultural principles on right (ref. p.16 & p.24).
 */
export function CultureAccountabilityLayout({
  slide,
  itemVariants,
  groupVariants,
  cardVariants,
  photoVariants,
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFF] to-[#EAF4FF] px-[6%] py-[5%] text-[#14213D]">
      {/* Header */}
      <div className="space-y-2">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[#14294D] leading-[1.1]"
        >
          {slide.title}
        </motion.h2>
      </div>

      {/* Main Split: Framed Photo Left (5 cols) + 5 Cultural Principles Right (7 cols) */}
      <div className="my-auto grid grid-cols-1 items-center gap-8 pt-3 lg:grid-cols-12">
        <motion.div variants={photoVariants} className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[24px] border-4 border-white shadow-[0_24px_50px_-12px_rgba(20,41,77,0.2)]">
            <img
              src={slide.image}
              alt={slide.imageAlt}
              loading="lazy"
              className="aspect-[4/3.6] w-full object-cover"
            />
          </div>
        </motion.div>

        <div className="space-y-4 lg:col-span-7">
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed text-[#14213D]"
          >
            <strong className="font-extrabold text-[#1689F8]">
              Accountability
            </strong>{' '}
            significa compromiso, autonomía y transparencia — nunca fiscalización. Queremos que te conviertas en un mejor profesional trabajando aquí.
          </motion.p>

          <motion.div
            variants={groupVariants}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {slide.principles.map((p, idx) => (
              <motion.div
                key={p.label}
                variants={cardVariants}
                className={[
                  'dc-editorial-card rounded-2xl p-4',
                  idx === slide.principles.length - 1 ? 'sm:col-span-2' : '',
                ].join(' ')}
              >
                <span className="block text-sm sm:text-base font-extrabold text-[#14294D]">
                  {p.label.replace(/:$/, '')}
                </span>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#526382]">
                  {p.text}
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
 * SLIDE 19 — «Cómo aportar desde tu primer día»
 * 4 aligned cards (Conecta / Mide / Mejora / Aprende) + pre-quiz check (ref. p.8 & p.14).
 */
export function DayOneActionsLayout({
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-[#F2F7FF]"
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

      {/* 4 Action Cards: Conecta, Mide, Mejora, Aprende */}
      <motion.div
        variants={groupVariants}
        className="relative z-10 my-auto grid grid-cols-1 gap-5 py-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {slide.actions.map((act, idx) => {
          const IconComponent = ACTION_ICONS[act.iconKey] || Sparkles;
          return (
            <motion.div
              key={act.title}
              variants={cardVariants}
              className="dc-editorial-card flex flex-col justify-between rounded-[22px] p-6 text-center items-center transition-transform duration-200 hover:-translate-y-0.5"
            >
              <SoftBlueIconOrb size="lg">
                <IconComponent className="h-6 w-6" />
              </SoftBlueIconOrb>

              <div className="mt-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1689F8]">
                  Acción 0{idx + 1}
                </span>
                <h3 className="mt-1 text-xl font-extrabold text-[#14294D]">
                  {act.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#526382]">
                  {act.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Pre-Quiz Self-Assessment Banner */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 dc-glass-light rounded-2xl px-6 py-4"
      >
        <span className="block text-xs font-extrabold uppercase tracking-[0.14em] text-[#1689F8]">
          {slide.selfAssessment.tag}
        </span>
        <p className="mt-1 text-sm sm:text-base font-bold leading-relaxed text-[#14294D]">
          {slide.selfAssessment.text}
        </p>
      </motion.div>
    </div>
  );
}

/**
 * SLIDE 20 — «Cada persona es vital para lograrlo»
 * High-impact navy hero finale + final quote + existing CTA (ref. p.5 & p.28).
 */
export function ClosingFinaleLayout({
  slide,
  itemVariants,
  allSlidesVisited,
  visitedCount,
  totalSlides,
  onJumpToFirstMissing,
  onFinishStage,
}) {
  const remainingCount = totalSlides - visitedCount;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#162C56] via-[#111F3E] to-[#0B1428] dc-slide-grid-dark px-[6%] py-[5%] text-center text-white">
      {/* Ambient Electric Blue Radial Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-96 w-[42rem] rounded-full bg-[#1689F8]/25 blur-[130px]"
      />

      <div className="relative z-10 max-w-3xl space-y-5">
        <motion.div variants={itemVariants}>
          <EditorialEyebrow variant="electric">{slide.eyebrow}</EditorialEyebrow>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.06]"
        >
          {slide.title}
        </motion.h2>

        <motion.div variants={itemVariants} className="flex justify-center py-1">
          <div className="h-1 w-16 rounded-full bg-[#258AFF]" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl text-base sm:text-xl leading-relaxed text-[#DDEEFF]"
        >
          {slide.body}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="pt-1 text-base sm:text-xl font-extrabold text-[#60A5FA]"
        >
          {slide.quote}
        </motion.p>

        {/* Action / Completion Verification Block */}
        <motion.div variants={itemVariants} className="pt-5">
          {allSlidesVisited ? (
            <div className="flex flex-col items-center gap-3.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#60A5FA]/35 bg-[#1689F8]/20 px-4 py-1 text-xs sm:text-sm font-bold text-[#DDEEFF]">
                <Check className="h-4 w-4 text-[#60A5FA]" />
                Has completado las {totalSlides} diapositivas de formación
              </span>

              <button
                type="button"
                onClick={onFinishStage}
                className="group inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-gradient-to-r from-[#1689F8] to-[#258AFF] px-8 py-4 text-sm sm:text-base font-extrabold text-white shadow-[0_14px_35px_rgba(22,137,248,0.45)] transition-all hover:brightness-110 active:translate-y-0.5 cursor-pointer"
              >
                <span>{slide.ctaLabel}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ) : (
            <div className="dc-glass-navy mx-auto max-w-md rounded-2xl p-5 text-center">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#93C5FD]">
                <Lock className="h-4 w-4" />
                <span>
                  Te falta recorrer {remainingCount}{' '}
                  {remainingCount === 1 ? 'diapositiva' : 'diapositivas'} ({visitedCount}/{totalSlides} visitadas)
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
                Recorre las 20 láminas de esta guía para desbloquear el juego final.
              </p>
              <button
                type="button"
                onClick={onJumpToFirstMissing}
                className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-[#1689F8] px-4 py-2 text-xs sm:text-sm font-extrabold text-white shadow-md hover:bg-[#258AFF] transition cursor-pointer"
              >
                <Compass className="h-4 w-4" />
                <span>Ir a la primera diapositiva pendiente</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

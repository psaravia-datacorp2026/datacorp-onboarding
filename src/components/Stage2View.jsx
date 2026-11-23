import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Network,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  User,
  Move,
  Search,
  X,
  Crosshair,
} from 'lucide-react';
import { ORG_CHART_STRUCTURE } from '../data/onboardingData';
import { useOnboardingStore } from '../store/useOnboardingStore';
import {
  buildOrgPhotoMap,
  resolvePersonPhoto,
  isPhotoExcludedForPerson,
  collectOrgPositions,
  filterOrgPositions,
} from '../utils/orgChartPhotos';

const MIN_ZOOM = 0.65;
const MAX_ZOOM = 1.25;
const ZOOM_STEP = 0.1;

const BRANCH_SHORTCUTS = [
  { id: 'branch-comercial', label: 'Comercial' },
  { id: 'branch-innovacion', label: 'Innovación / Desarrollo' },
  { id: 'branch-experiencia', label: 'Experiencia' },
];

/**
 * Uniform photo slot supporting real photos with clean fallback to neutral avatar on null or load error.
 */
function NeutralPhotoPlaceholder({ photoUrl, name, tier, isHighlighted }) {
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    setHasLoadError(false);
  }, [photoUrl]);

  const isExecutive =
    tier === 'executive-root' ||
    tier === 'company-ceo' ||
    tier === 'functional-director';

  const sizeClasses = isExecutive ? 'h-11 w-11' : 'h-9 w-9';

  if (photoUrl && !hasLoadError) {
    return (
      <img
        src={photoUrl}
        alt={name}
        loading="lazy"
        onError={() => setHasLoadError(true)}
        className={[
          sizeClasses,
          'shrink-0 rounded-full border object-cover object-top transition-all duration-200',
          isHighlighted
            ? 'border-[#60A5FA] shadow-[0_0_16px_rgba(22,137,248,0.45)]'
            : isExecutive
            ? 'border-[#60A5FA]/50'
            : 'border-white/25',
        ].join(' ')}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={[
        sizeClasses,
        'relative flex shrink-0 items-center justify-center rounded-full border transition-all duration-200',
        isHighlighted
          ? 'border-[#60A5FA] bg-[#1689F8]/30 text-white shadow-[0_0_16px_rgba(22,137,248,0.45)]'
          : isExecutive
          ? 'border-[#60A5FA]/45 bg-gradient-to-br from-[#1689F8]/30 to-[#14294D] text-[#93C5FD]'
          : 'border-white/15 bg-slate-800/90 text-slate-400',
      ].join(' ')}
    >
      <User className={isExecutive ? 'h-5 w-5' : 'h-4 w-4'} />
    </div>
  );
}

/**
 * Individual Org Chart Card.
 * Displays ONLY 3 elements: (1) Photo slot, (2) Full Name, (3) Role.
 * Non-clickable (`cursor-default`); provides subtle hover elevation and highlights parent connector.
 */
function OrgPositionCard({
  position,
  photoMap,
  hoveredId,
  hoveredParentId,
  focusedPositionId,
  cardRef,
  onHoverStart,
  onHoverEnd,
}) {
  const { id, personId, parentId, name, role, tier, photoUrl } = position;
  const resolvedPhotoUrl = isPhotoExcludedForPerson(personId)
    ? null
    : photoUrl || resolvePersonPhoto(photoMap, personId);
  const isSelfHovered = hoveredId === id;
  const isParentOfHovered = hoveredParentId === id;
  const isSearchFocused = focusedPositionId === id;
  const isHighlighted = isSelfHovered || isParentOfHovered || isSearchFocused;

  const tierStyles = {
    'executive-root':
      'w-[230px] border-[#1689F8]/70 bg-gradient-to-b from-[#162C56] to-[#0F1E3C] shadow-[0_14px_34px_rgba(22,137,248,0.25)]',
    'company-ceo':
      'w-[220px] border-[#60A5FA]/45 bg-gradient-to-b from-[#14294D] to-[#0F1B35] shadow-[0_12px_28px_rgba(2,6,23,0.7)]',
    'functional-director':
      'w-[228px] border-[#38BDF8]/50 bg-gradient-to-b from-[#14294D] to-[#0F1D38] shadow-[0_12px_30px_rgba(14,165,233,0.18)]',
    'unit-head':
      'w-[204px] border-white/20 bg-[#111E38]/95 shadow-[0_10px_24px_rgba(2,6,23,0.65)]',
    specialist:
      'w-[204px] border-white/12 bg-[#0D172B]/95 shadow-[0_8px_20px_rgba(2,6,23,0.55)]',
    member:
      'w-[204px] border-white/10 bg-[#0B1426]/95 shadow-[0_6px_18px_rgba(2,6,23,0.5)]',
  };

  return (
    <motion.div
      ref={cardRef}
      data-position-id={id}
      data-person-id={personId}
      tabIndex={0}
      onMouseEnter={() => onHoverStart(id, parentId)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onHoverStart(id, parentId)}
      onBlur={onHoverEnd}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={[
        'group relative flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left select-none cursor-default transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1689F8]',
        tierStyles[tier] || tierStyles.member,
        isSelfHovered &&
          'border-[#60A5FA] shadow-[0_16px_36px_rgba(22,137,248,0.32)]',
        isParentOfHovered &&
          'border-[#38BDF8]/80 ring-1 ring-[#38BDF8]/40',
        isSearchFocused &&
          'border-cyan-300 ring-2 ring-[#38BDF8]/85 shadow-[0_0_32px_rgba(56,189,248,0.55)]',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Subtle Top Tier Accent Line for Directors & Root */}
      {(tier === 'executive-root' ||
        tier === 'company-ceo' ||
        tier === 'functional-director') && (
        <span className="pointer-events-none absolute inset-x-4 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent" />
      )}

      {/* 1. Photo Placeholder / Real Photo Slot */}
      <NeutralPhotoPlaceholder
        photoUrl={resolvedPhotoUrl}
        name={name}
        tier={tier}
        isHighlighted={isHighlighted}
      />

      {/* 2. Full Name & 3. Role (up to 2 lines, no truncation) */}
      <div className="min-w-0 flex-1">
        <p
          className={[
            'font-extrabold tracking-tight leading-snug text-white transition-colors',
            tier === 'executive-root' ? 'text-sm sm:text-[15px]' : 'text-[13px] sm:text-sm',
            isHighlighted ? 'text-[#93C5FD]' : '',
          ].join(' ')}
        >
          {name}
        </p>
        <p
          className={[
            'mt-0.5 text-[11px] sm:text-xs font-medium leading-tight',
            tier === 'executive-root' ||
            tier === 'company-ceo' ||
            tier === 'functional-director'
              ? 'text-[#93C5FD]'
              : 'text-slate-400',
          ].join(' ')}
        >
          {role}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Renders a Sub-Unit Column (Unit Head + Vertical Stack of Individual Collaborator Cards)
 * connected by an orthogonal vertical SVG spine.
 */
function FunctionalUnitColumn({
  unit,
  photoMap,
  hoveredId,
  hoveredParentId,
  focusedPositionId,
  registerCardRef,
  onHoverStart,
  onHoverEnd,
}) {
  const { head, members } = unit;
  const isUnitSpineHighlighted =
    hoveredParentId === head.id || hoveredId === head.id;

  return (
    <div className="relative flex flex-col items-center">
      {/* Unit Head Card */}
      <OrgPositionCard
        position={head}
        photoMap={photoMap}
        hoveredId={hoveredId}
        hoveredParentId={hoveredParentId}
        focusedPositionId={focusedPositionId}
        cardRef={registerCardRef(head.id)}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
      />

      {/* Subordinate Collaborators Stack */}
      {members.length > 0 && (
        <div className="relative flex flex-col items-center pt-4">
          {/* Vertical SVG Spine connecting Unit Head through all team members */}
          <div
            aria-hidden="true"
            className={[
              'pointer-events-none absolute top-0 bottom-6 left-1/2 -translate-x-1/2 w-[1.5px] transition-colors duration-200',
              isUnitSpineHighlighted
                ? 'bg-[#60A5FA] shadow-[0_0_8px_#1689F8]'
                : 'bg-slate-700/80',
            ].join(' ')}
          />

          <div className="relative z-10 flex flex-col gap-2.5">
            {members.map((member) => (
              <OrgPositionCard
                key={member.id}
                position={member}
                photoMap={photoMap}
                hoveredId={hoveredId}
                hoveredParentId={hoveredParentId}
                focusedPositionId={focusedPositionId}
                cardRef={registerCardRef(member.id)}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Renders one of the 3 Main Functional Branches (Comercial, Innovación y Desarrollo, Experiencia).
 * Includes the Functional Director card, orthogonal SVG 3-way fork, and the 3 unit columns.
 */
function FunctionalBranchBlock({
  branch,
  photoMap,
  hoveredId,
  hoveredParentId,
  focusedPositionId,
  registerCardRef,
  branchRef,
  onHoverStart,
  onHoverEnd,
  reducedMotion,
  delayOrder = 0,
}) {
  const { leader, units } = branch;
  const isBranchForkHighlighted =
    hoveredId === leader.id || hoveredParentId === leader.id;

  const strokeColor = isBranchForkHighlighted
    ? '#60A5FA'
    : 'rgba(100, 116, 139, 0.55)';

  return (
    <div
      ref={branchRef}
      data-branch-id={branch.id}
      className="flex flex-col items-center"
    >
      {/* Functional Director Card (Stage 4 of Choreography) */}
      <motion.div
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, delay: 0.3 + delayOrder * 0.05, ease: 'easeOut' }}
      >
        <OrgPositionCard
          position={leader}
          photoMap={photoMap}
          hoveredId={hoveredId}
          hoveredParentId={hoveredParentId}
          focusedPositionId={focusedPositionId}
          cardRef={registerCardRef(leader.id)}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      </motion.div>

      {/* Orthogonal SVG 3-Way Connector Fork from Functional Director to 3 Unit Heads */}
      <div aria-hidden="true" className="relative flex w-full justify-center">
        <svg
          width="660"
          height="42"
          viewBox="0 0 660 42"
          fill="none"
          className="overflow-visible"
        >
          {/* Center drop from Director */}
          <motion.path
            d="M 330 0 L 330 42"
            stroke={strokeColor}
            strokeWidth="1.75"
            initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, delay: 0.38 }}
          />
          {/* Left & Right orthogonal branches with rounded corners */}
          <motion.path
            d="M 110 42 L 110 26 Q 110 18 118 18 L 542 18 Q 550 18 550 26 L 550 42"
            stroke={strokeColor}
            strokeWidth="1.75"
            fill="none"
            initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          />
          <circle cx="330" cy="18" r="3" fill="#38BDF8" />
        </svg>
      </div>

      {/* 3 Unit Columns (Stage 5 of Choreography — Grouped Reveal) */}
      <motion.div
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.44 + delayOrder * 0.06, ease: 'easeOut' }}
        className="grid grid-cols-3 items-start gap-4"
      >
        {units.map((unit) => (
          <FunctionalUnitColumn
            key={unit.head.id}
            unit={unit}
            photoMap={photoMap}
            hoveredId={hoveredId}
            hoveredParentId={hoveredParentId}
            focusedPositionId={focusedPositionId}
            registerCardRef={registerCardRef}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Stage2View({ onBackToPath }) {
  const prefersReducedMotion = useReducedMotion();
  const completeStage = useOnboardingStore((state) => state.completeStage);

  const [zoom, setZoom] = useState(0.88);
  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredParentId, setHoveredParentId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const [focusedPositionId, setFocusedPositionId] = useState(null);
  const [activeShortcut, setActiveShortcut] = useState('root');

  const viewportRef = useRef(null);
  const searchContainerRef = useRef(null);
  const cardRefs = useRef({});
  const branchRefs = useRef({});
  const focusTimerRef = useRef(null);
  const dragStartRef = useRef({
    active: false,
    hasMoved: false,
    x: 0,
    y: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const { root, companyDivisions, functionalBranches } = ORG_CHART_STRUCTURE;
  const isRootForkHighlighted =
    hoveredId === root.id || hoveredParentId === root.id;

  const allPositions = useMemo(
    () => collectOrgPositions(ORG_CHART_STRUCTURE),
    []
  );

  const photoMap = useMemo(
    () =>
      buildOrgPhotoMap(
        allPositions.map(({ personId, name }) => ({ personId, name }))
      ),
    [allPositions]
  );

  const searchResults = useMemo(
    () => filterOrgPositions(allPositions, searchQuery),
    [allPositions, searchQuery]
  );

  const registerCardRef = useCallback(
    (positionId) => (el) => {
      if (el) {
        cardRefs.current[positionId] = el;
      } else {
        delete cardRefs.current[positionId];
      }
    },
    []
  );

  const registerBranchRef = useCallback(
    (branchId) => (el) => {
      if (el) {
        branchRefs.current[branchId] = el;
      } else {
        delete branchRefs.current[branchId];
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      if (focusTimerRef.current) {
        clearTimeout(focusTimerRef.current);
      }
    };
  }, []);

  // Close search dropdown on outside pointer down
  useEffect(() => {
    const handlePointerDownOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDownOutside);
    return () =>
      document.removeEventListener('pointerdown', handlePointerDownOutside);
  }, []);

  // Ensure mouse drag never sticks if button released outside viewport
  useEffect(() => {
    const endDrag = () => {
      if (dragStartRef.current.active) {
        dragStartRef.current.active = false;
        dragStartRef.current.hasMoved = false;
        setIsDragging(false);
      }
    };
    window.addEventListener('mouseup', endDrag);
    return () => window.removeEventListener('mouseup', endDrag);
  }, []);

  const handleHoverStart = useCallback((id, parentId) => {
    if (dragStartRef.current.active || dragStartRef.current.hasMoved) return;
    setHoveredId(id);
    setHoveredParentId(parentId);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredId(null);
    setHoveredParentId(null);
  }, []);

  const scrollTargetIntoView = useCallback(
    (targetEl, { verticalMode = 'center' } = {}) => {
      const container = viewportRef.current;
      if (!container || !targetEl) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const targetCenterX =
        container.scrollLeft +
        (targetRect.left - containerRect.left) +
        targetRect.width / 2;
      const rawLeft = targetCenterX - container.clientWidth / 2;
      const maxLeft = Math.max(0, container.scrollWidth - container.clientWidth);
      const desiredLeft = Math.min(Math.max(0, rawLeft), maxLeft);

      const rawTop =
        verticalMode === 'top'
          ? container.scrollTop + (targetRect.top - containerRect.top) - 24
          : container.scrollTop +
            (targetRect.top - containerRect.top) +
            targetRect.height / 2 -
            container.clientHeight / 2;
      const maxTop = Math.max(0, container.scrollHeight - container.clientHeight);
      const desiredTop = Math.min(Math.max(0, rawTop), maxTop);

      container.scrollTo({
        left: desiredLeft,
        top: desiredTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion]
  );

  // Center viewport horizontally on Pablo Morales (Gerente General) at top
  const centerViewOnRoot = useCallback(
    (targetZoom = 0.88) => {
      setActiveShortcut('root');
      const needsZoomChange = Math.abs(zoom - targetZoom) > 0.001;
      if (needsZoomChange) {
        setZoom(targetZoom);
      }

      const runScroll = () => {
        const container = viewportRef.current;
        if (!container) return;
        const rootEl = cardRefs.current[root.id];
        if (rootEl) {
          scrollTargetIntoView(rootEl, { verticalMode: 'top' });
        } else {
          const scrollLeft = Math.max(
            0,
            (container.scrollWidth - container.clientWidth) / 2
          );
          container.scrollTo({
            left: scrollLeft,
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
      };

      requestAnimationFrame(() => {
        if (needsZoomChange) {
          requestAnimationFrame(runScroll);
        } else {
          runScroll();
        }
      });
    },
    [zoom, root.id, scrollTargetIntoView, prefersReducedMotion]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = viewportRef.current;
      if (!container) return;
      container.scrollLeft = Math.max(
        0,
        (container.scrollWidth - container.clientWidth) / 2
      );
      container.scrollTop = 0;
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectSearchResult = useCallback(
    (position) => {
      if (!position) return;

      setIsSearchOpen(false);
      setActiveShortcut(position.branchId || 'root');
      setFocusedPositionId(position.id);

      if (focusTimerRef.current) {
        clearTimeout(focusTimerRef.current);
      }
      focusTimerRef.current = setTimeout(() => {
        focusTimerRef.current = null;
        setFocusedPositionId(null);
      }, 3200);

      // Adjust zoom only when too zoomed out for comfortable reading
      const targetZoom = zoom < 0.85 ? 0.9 : zoom;
      const needsZoomChange = Math.abs(zoom - targetZoom) > 0.001;
      if (needsZoomChange) {
        setZoom(targetZoom);
      }

      const runScroll = () => {
        const el = cardRefs.current[position.id];
        if (el) {
          scrollTargetIntoView(el, { verticalMode: 'center' });
        }
      };

      requestAnimationFrame(() => {
        if (needsZoomChange) {
          requestAnimationFrame(runScroll);
        } else {
          runScroll();
        }
      });
    },
    [zoom, scrollTargetIntoView]
  );

  const handleJumpToBranch = useCallback(
    (branchId) => {
      setActiveShortcut(branchId);
      setIsSearchOpen(false);
      requestAnimationFrame(() => {
        const el = branchRefs.current[branchId];
        if (el) {
          scrollTargetIntoView(el, { verticalMode: 'top' });
        }
      });
    },
    [scrollTargetIntoView]
  );

  const handleSearchKeyDown = (e) => {
    if (!isSearchOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsSearchOpen(true);
      return;
    }

    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      return;
    }

    if (searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveResultIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveResultIndex((prev) =>
        (prev - 1 + searchResults.length) % searchResults.length
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = searchResults[activeResultIndex] || searchResults[0];
      if (target) {
        handleSelectSearchResult(target);
      }
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) =>
      Math.min(MAX_ZOOM, Number((prev + ZOOM_STEP).toFixed(2)))
    );
  };

  const handleZoomOut = () => {
    setZoom((prev) =>
      Math.max(MIN_ZOOM, Number((prev - ZOOM_STEP).toFixed(2)))
    );
  };

  // Mouse drag-to-pan handlers with 4px movement threshold
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const container = viewportRef.current;
    if (!container) return;

    setIsSearchOpen(false);
    dragStartRef.current = {
      active: true,
      hasMoved: false,
      x: e.clientX,
      y: e.clientY,
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragStartRef.current.active) return;
    const container = viewportRef.current;
    if (!container) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (!dragStartRef.current.hasMoved) {
      if (Math.hypot(dx, dy) < 4) return;
      dragStartRef.current.hasMoved = true;
      setIsDragging(true);
      setHoveredId(null);
      setHoveredParentId(null);
    }

    container.scrollLeft = dragStartRef.current.scrollLeft - dx;
    container.scrollTop = dragStartRef.current.scrollTop - dy;
  };

  const handleMouseUp = () => {
    dragStartRef.current.active = false;
    dragStartRef.current.hasMoved = false;
    setIsDragging(false);
  };

  const handleFinishStage = () => {
    completeStage(2);
    if (onBackToPath) {
      onBackToPath();
    }
  };

  return (
    <div className="flex h-[calc(100dvh-4rem)] w-full flex-col justify-between overflow-hidden px-3 py-2 sm:px-6 sm:py-3">
      {/* 1. COMPACT TOP BAR: Navigation, Title, Search, Branch Shortcuts, Zoom & Completion */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-30 mx-auto w-full max-w-[1560px] shrink-0 space-y-2 pb-2"
      >
        {/* Row 1: Back, Stage Title & Finish Button */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBackToPath}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/[0.07] px-3 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.14] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1689F8] cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Volver al camino</span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1689F8]/35 bg-[#1689F8]/15 px-3 py-1 text-xs font-bold text-[#93C5FD]">
                <Network className="h-3.5 w-3.5 text-[#60A5FA]" />
                <span>Etapa 2 · Organigrama Oficial Datacorp</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFinishStage}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1689F8] to-[#258AFF] px-3.5 sm:px-4 text-xs font-extrabold text-white shadow-[0_4px_16px_rgba(22,137,248,0.4)] transition hover:brightness-110 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer"
          >
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">He revisado el organigrama · Finalizar etapa</span>
          </button>
        </div>

        {/* Row 2: Compact Search + Discreet Branch Shortcuts + Zoom */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Compact Search Box with Dropdown Results */}
          <div
            ref={searchContainerRef}
            className="relative w-full sm:w-72 md:w-80 shrink-0"
          >
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-sky-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveResultIndex(0);
                  setIsSearchOpen(true);
                }}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) setIsSearchOpen(true);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Buscar por nombre o cargo..."
                aria-label="Buscar persona o cargo en el organigrama"
                aria-expanded={isSearchOpen && searchQuery.trim().length > 0}
                autoComplete="off"
                className="h-8 w-full rounded-full border border-white/15 bg-slate-900/90 pl-8 pr-8 text-xs font-medium text-white placeholder:text-slate-500 focus:border-[#1689F8] focus:outline-none focus:ring-2 focus:ring-[#1689F8]/35"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-2 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Search Results / Empty State Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div
                role="listbox"
                aria-label="Resultados del organigrama"
                className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto dc-custom-scroll rounded-2xl border border-white/15 bg-slate-900/95 p-1.5 shadow-[0_20px_50px_rgba(2,6,23,0.95)] backdrop-blur-xl"
              >
                {searchResults.length > 0 ? (
                  searchResults.map((pos, idx) => {
                    const isActiveItem = idx === activeResultIndex;
                    return (
                      <button
                        key={pos.id}
                        type="button"
                        role="option"
                        aria-selected={isActiveItem}
                        onClick={() => handleSelectSearchResult(pos)}
                        onMouseEnter={() => setActiveResultIndex(idx)}
                        className={[
                          'flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left transition cursor-pointer',
                          isActiveItem
                            ? 'bg-[#1689F8]/20 text-white'
                            : 'text-slate-200 hover:bg-white/[0.06]',
                        ].join(' ')}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate text-xs font-bold text-white">
                              {pos.name}
                            </span>
                            {pos.positionCount > 1 && (
                              <span className="shrink-0 rounded-full border border-sky-400/35 bg-sky-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sky-200">
                                2 cargos
                              </span>
                            )}
                          </div>
                          <p className="truncate text-[11px] text-slate-400">
                            {pos.role} · <span className="text-sky-300/90">{pos.branchLabel}</span>
                          </p>
                        </div>
                        <Crosshair className="h-3.5 w-3.5 shrink-0 text-sky-400" />
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-4 text-center">
                    <p className="text-xs font-semibold text-slate-200">
                      Sin resultados para «{searchQuery.trim()}»
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Prueba con otro nombre o cargo.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Group: Discreet Branch Shortcuts + Zoom Controls */}
          <div className="flex w-full sm:w-auto flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2 min-w-0">
            {/* Discreet Branch Shortcuts */}
            <div className="flex max-w-full items-center gap-1 overflow-x-auto dc-custom-scroll pb-0.5 sm:pb-0">
              <button
                type="button"
                onClick={() => centerViewOnRoot(0.88)}
                title="Centrar vista en Gerencia General"
                className={[
                  'inline-flex h-7 shrink-0 items-center gap-1 rounded-full border px-2.5 text-[11px] font-semibold transition cursor-pointer whitespace-nowrap',
                  activeShortcut === 'root'
                    ? 'border-[#1689F8]/55 bg-[#1689F8]/20 text-white'
                    : 'border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.12] hover:text-white',
                ].join(' ')}
              >
                <RotateCcw className="h-3 w-3 text-[#60A5FA]" />
                <span>Centrar en Gerencia</span>
              </button>

              {BRANCH_SHORTCUTS.map((shortcut) => (
                <button
                  key={shortcut.id}
                  type="button"
                  onClick={() => handleJumpToBranch(shortcut.id)}
                  className={[
                    'inline-flex h-7 shrink-0 items-center rounded-full border px-2.5 text-[11px] font-semibold transition cursor-pointer whitespace-nowrap',
                    activeShortcut === shortcut.id
                      ? 'border-[#1689F8]/55 bg-[#1689F8]/20 text-white'
                      : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.12] hover:text-white',
                  ].join(' ')}
                >
                  {shortcut.label}
                </button>
              ))}
            </div>

            {/* Compact Zoom Controls */}
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-slate-900/90 px-2 py-0.5 shadow-inner">
              <span className="hidden xl:inline-flex items-center gap-1 pr-1 text-[11px] font-medium text-slate-400">
                <Move className="h-3 w-3 text-sky-400" />
                <span>Arrastra</span>
              </span>

              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= MIN_ZOOM}
                title="Alejar vista"
                aria-label="Alejar organigrama"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-slate-200 transition hover:bg-white/15 disabled:opacity-35 cursor-pointer"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>

              <span className="min-w-[2.75rem] text-center font-mono text-xs font-bold text-[#93C5FD]">
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= MAX_ZOOM}
                title="Acercar vista"
                aria-label="Acercar organigrama"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-slate-200 transition hover:bg-white/15 disabled:opacity-35 cursor-pointer"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. INTERACTIVE PAN & ZOOM ORG CHART CANVAS */}
      <div
        ref={viewportRef}
        data-testid="orgchart-viewport"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={[
          'relative mx-auto flex-1 w-full max-w-[1560px] overflow-auto overscroll-contain dc-custom-scroll rounded-3xl border border-white/12 bg-slate-950/75 shadow-[inset_0_2px_25px_rgba(2,6,23,0.85)] backdrop-blur-md',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        ].join(' ')}
      >
        {/* Scaled Diagram Wrapper (preserves scrollable bounding box around 2120px wide diagram) */}
        <div
          style={{
            width: `${Math.round(2140 * zoom)}px`,
            minHeight: `${Math.round(1080 * zoom)}px`,
          }}
          className="mx-auto flex justify-center py-8"
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              width: '2100px',
            }}
            className="flex flex-col items-center"
          >
            {/* =====================================================================
                A. UPPER EXECUTIVE BLOCK: GERENTE GENERAL & COMPANY DIVISIONS
               ===================================================================== */}
            <div className="relative flex w-full flex-col items-center">
              {/* 1. Root Node: Pablo Morales — Gerente General (Stage 2 of Choreography) */}
              <motion.div
                initial={
                  prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: 0.08, ease: 'easeOut' }}
                className="relative z-10"
              >
                <OrgPositionCard
                  position={root}
                  photoMap={photoMap}
                  hoveredId={hoveredId}
                  hoveredParentId={hoveredParentId}
                  focusedPositionId={focusedPositionId}
                  cardRef={registerCardRef(root.id)}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                />
              </motion.div>

              {/* Upper SVG Connector System */}
              <div className="relative flex w-[1320px] items-start justify-between pt-2">
                {/* Background SVG Orthogonal Lines for Block A */}
                <svg
                  aria-hidden="true"
                  width="1320"
                  height="250"
                  viewBox="0 0 1320 250"
                  fill="none"
                  className="pointer-events-none absolute inset-x-0 top-0 overflow-visible"
                >
                  {/* Central Vertical Trunk from Gerente General down to Functional Branches */}
                  <motion.path
                    d="M 660 0 L 660 250"
                    stroke={
                      isRootForkHighlighted
                        ? '#38BDF8'
                        : 'rgba(96, 165, 250, 0.55)'
                    }
                    strokeWidth="2"
                    initial={
                      prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }
                    }
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 0.16 }}
                  />

                  {/* Upper Horizontal Split to Left (Renato Andrades, X=230) & Right (Felipe Osorio, X=980) */}
                  <motion.path
                    d="M 230 34 L 230 22 Q 230 14 238 14 L 972 14 Q 980 14 980 22 L 980 34"
                    stroke={
                      isRootForkHighlighted
                        ? '#60A5FA'
                        : 'rgba(100, 116, 139, 0.65)'
                    }
                    strokeWidth="1.75"
                    fill="none"
                    initial={
                      prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }
                    }
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 0.18 }}
                  />
                  <circle cx="660" cy="14" r="3.5" fill="#1689F8" />
                </svg>

                {/* Left Division: Renato Andrades (CEO Imexdbusiness) -> Francisco Morales */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.2, ease: 'easeOut' }}
                  className="relative z-10 mt-[34px] flex w-[460px] flex-col items-center"
                >
                  <OrgPositionCard
                    position={companyDivisions.left.leader}
                    photoMap={photoMap}
                    hoveredId={hoveredId}
                    hoveredParentId={hoveredParentId}
                    focusedPositionId={focusedPositionId}
                    cardRef={registerCardRef(companyDivisions.left.leader.id)}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                  />

                  {/* Vertical connector to Francisco Morales */}
                  <div
                    aria-hidden="true"
                    className={[
                      'h-6 w-[1.75px] transition-colors',
                      hoveredParentId === companyDivisions.left.leader.id ||
                      hoveredId === companyDivisions.left.leader.id
                        ? 'bg-[#60A5FA]'
                        : 'bg-slate-600/75',
                    ].join(' ')}
                  />

                  {companyDivisions.left.team.map((member) => (
                    <OrgPositionCard
                      key={member.id}
                      position={member}
                      photoMap={photoMap}
                      hoveredId={hoveredId}
                      hoveredParentId={hoveredParentId}
                      focusedPositionId={focusedPositionId}
                      cardRef={registerCardRef(member.id)}
                      onHoverStart={handleHoverStart}
                      onHoverEnd={handleHoverEnd}
                    />
                  ))}
                </motion.div>

                {/* Right Division: Felipe Osorio (CEO Datlas BI) -> Alexis Robledo & Eluney Moncada */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.22, ease: 'easeOut' }}
                  className="relative z-10 mt-[34px] flex w-[680px] flex-col items-center"
                >
                  <OrgPositionCard
                    position={companyDivisions.right.leader}
                    photoMap={photoMap}
                    hoveredId={hoveredId}
                    hoveredParentId={hoveredParentId}
                    focusedPositionId={focusedPositionId}
                    cardRef={registerCardRef(companyDivisions.right.leader.id)}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                  />

                  {/* Orthogonal 2-way SVG Fork to Alexis Robledo & Eluney Moncada */}
                  <svg
                    aria-hidden="true"
                    width="440"
                    height="26"
                    viewBox="0 0 440 26"
                    fill="none"
                  >
                    <path
                      d="M 220 0 L 220 12 M 110 26 L 110 18 Q 110 12 116 12 L 324 12 Q 330 12 330 18 L 330 26"
                      stroke={
                        hoveredParentId === companyDivisions.right.leader.id ||
                        hoveredId === companyDivisions.right.leader.id
                          ? '#60A5FA'
                          : 'rgba(100, 116, 139, 0.65)'
                      }
                      strokeWidth="1.75"
                      fill="none"
                    />
                  </svg>

                  <div className="flex items-start justify-center gap-4">
                    {companyDivisions.right.team.map((member) => (
                      <OrgPositionCard
                        key={member.id}
                        position={member}
                        photoMap={photoMap}
                        hoveredId={hoveredId}
                        hoveredParentId={hoveredParentId}
                        focusedPositionId={focusedPositionId}
                        cardRef={registerCardRef(member.id)}
                        onHoverStart={handleHoverStart}
                        onHoverEnd={handleHoverEnd}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* =====================================================================
                B. HORIZONTAL BRIDGE TO THE 3 MAIN FUNCTIONAL BRANCHES
               ===================================================================== */}
            <div aria-hidden="true" className="relative flex w-full justify-center">
              <svg
                width="2060"
                height="44"
                viewBox="0 0 2060 44"
                fill="none"
                className="overflow-visible"
              >
                {/* Center Continuation from Gerente General to Felipe Osorio (Gerente Innovación) */}
                <motion.path
                  d="M 1030 0 L 1030 44"
                  stroke={
                    isRootForkHighlighted
                      ? '#38BDF8'
                      : 'rgba(96, 165, 250, 0.6)'
                  }
                  strokeWidth="2"
                  initial={
                    prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }
                  }
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, delay: 0.26 }}
                />

                {/* Wide Orthogonal Bridge connecting Left (X=340), Center (X=1030), Right (X=1720) */}
                <motion.path
                  d="M 340 44 L 340 24 Q 340 14 350 14 L 1710 14 Q 1720 14 1720 24 L 1720 44"
                  stroke={
                    isRootForkHighlighted
                      ? '#60A5FA'
                      : 'rgba(100, 116, 139, 0.65)'
                  }
                  strokeWidth="2"
                  fill="none"
                  initial={
                    prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }
                  }
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 0.28 }}
                />
                <circle cx="1030" cy="14" r="4" fill="#1689F8" />
              </svg>
            </div>

            {/* =====================================================================
                C, D, E. THREE FUNCTIONAL BRANCHES (SAME HORIZONTAL LEVEL)
               ===================================================================== */}
            <div className="grid w-[2060px] grid-cols-3 items-start gap-8">
              {functionalBranches.map((branch, idx) => (
                <FunctionalBranchBlock
                  key={branch.id}
                  branch={branch}
                  photoMap={photoMap}
                  hoveredId={hoveredId}
                  hoveredParentId={hoveredParentId}
                  focusedPositionId={focusedPositionId}
                  registerCardRef={registerCardRef}
                  branchRef={registerBranchRef(branch.id)}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                  reducedMotion={Boolean(prefersReducedMotion)}
                  delayOrder={idx}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

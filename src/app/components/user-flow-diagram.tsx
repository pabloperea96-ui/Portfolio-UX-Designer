import { MotionReveal } from './ds';

/* ========================================
   UserFlowDiagram — Case-study-specific visualization
   ========================================
   Two-layer layout:
     Layer 1 — Flow: phase labels, step cards, directional arrows
     Layer 2 — Tooltips: always-visible annotation cards aligned
               beneath their corresponding step cards

   Both layers share identical flex proportions so columns align.
   On viewports < MacBook Pro 16" the diagram scrolls horizontally;
   on larger screens it fits without scroll.

   All colors use DS foundation tokens from theme.css.
   Typography uses DS composite text classes.
   ======================================== */

/** Tooltip position relative to the step card */
type TooltipPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'left';

interface FlowStep {
  /** First line of text */
  line1: string;
  /** Optional second line — renders on its own line */
  line2?: string;
  /** Optional always-visible tooltip */
  tooltip?: {
    title: string;
    description: string;
    /** Position of the tooltip relative to the step card. Default: 'bottom-center' */
    position?: TooltipPosition;
  };
}

interface FlowPhase {
  name: string;
  steps: FlowStep[];
}

interface UserFlowDiagramProps {
  /** Phases with their steps */
  phases: FlowPhase[];
  /** Additional className */
  className?: string;
}

/* ── Horizontal arrow ── */
function FlowArrow() {
  return (
    <svg
      className="w-[28px] h-[12px] shrink-0"
      viewBox="0 0 28 12"
      fill="none"
      aria-hidden
    >
      <line
        x1="0"
        y1="6"
        x2="20"
        y2="6"
        stroke="var(--ds-border-default)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <path
        d="M19 2L24 6L19 10"
        stroke="var(--ds-border-default)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Arrow-width spacer (keeps tooltip row aligned with flow row) ── */
function ArrowSpacer() {
  return <div className="w-[28px] shrink-0" aria-hidden />;
}

/* ── Tooltip pointer (triangle) ── */
function TooltipPointer({ position = 'bottom-center' }: { position?: TooltipPosition }) {
  const fill = 'var(--ds-surface-inverse)';
  const t = 'transparent';
  const s = '8px solid';

  const shared: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
  };

  switch (position) {
    case 'top-left':
    case 'top-center':
    case 'top-right': {
      // Arrow points DOWN — tooltip is above
      const hClass =
        position === 'top-left'
          ? 'left-ds-16'
          : position === 'top-right'
            ? 'right-ds-16'
            : 'left-1/2 -translate-x-1/2';
      return (
        <div
          className={hClass}
          style={{
            ...shared,
            bottom: '-8px',
            borderTop: `${s} ${fill}`,
            borderRight: `${s} ${t}`,
            borderBottom: 'none',
            borderLeft: `${s} ${t}`,
          }}
        />
      );
    }
    case 'bottom-left':
    case 'bottom-center':
    case 'bottom-right': {
      // Arrow points UP — tooltip is below
      const hClass =
        position === 'bottom-left'
          ? 'left-ds-16'
          : position === 'bottom-right'
            ? 'right-ds-16'
            : 'left-1/2 -translate-x-1/2';
      return (
        <div
          className={hClass}
          style={{
            ...shared,
            top: '-8px',
            borderTop: 'none',
            borderRight: `${s} ${t}`,
            borderBottom: `${s} ${fill}`,
            borderLeft: `${s} ${t}`,
          }}
        />
      );
    }
    case 'left':
      // Arrow points RIGHT — tooltip is to the left
      return (
        <div
          className="top-1/2 -translate-y-1/2"
          style={{
            ...shared,
            right: '-8px',
            borderTop: `${s} ${t}`,
            borderRight: 'none',
            borderBottom: `${s} ${t}`,
            borderLeft: `${s} ${fill}`,
          }}
        />
      );
    case 'right':
      // Arrow points LEFT — tooltip is to the right
      return (
        <div
          className="top-1/2 -translate-y-1/2"
          style={{
            ...shared,
            left: '-8px',
            borderTop: `${s} ${t}`,
            borderRight: `${s} ${fill}`,
            borderBottom: `${s} ${t}`,
            borderLeft: 'none',
          }}
        />
      );
    default:
      return null;
  }
}

/* ── Tooltip alignment wrapper classes ── */
function getTooltipWrapperClasses(position: TooltipPosition): string {
  switch (position) {
    case 'top-left':
    case 'bottom-left':
      return 'justify-start';
    case 'top-center':
    case 'bottom-center':
      return 'justify-center';
    case 'top-right':
    case 'bottom-right':
      return 'justify-end';
    case 'left':
      return 'justify-end';
    case 'right':
      return 'justify-start';
    default:
      return 'justify-center';
  }
}

export function UserFlowDiagram({
  phases,
  className = '',
}: UserFlowDiagramProps) {
  /* Check if any step has a tooltip */
  const hasTooltips = phases.some((p) => p.steps.some((s) => s.tooltip));

  return (
    <MotionReveal margin="-80px" className={className}>
      {/* Scrollable wrapper — horizontal only, hidden scrollbar */}
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-ds-16" style={{ minWidth: 'max-content' }}>

          {/* ── Layer 1: Flow ── */}
          <div className="flex items-start gap-ds-12">
            {phases.map((phase, pi) => (
              <div key={phase.name} className="flex items-start gap-ds-12 flex-1">
                {/* Inter-phase arrow */}
                {pi > 0 && (
                  <div className="flex items-center self-stretch pt-[48px]">
                    <FlowArrow />
                  </div>
                )}

                {/* Phase group */}
                <div className="flex flex-col gap-ds-12 flex-1">
                  {/* Phase label */}
                  <div className="flex items-center justify-center bg-ds-surface-inverse text-ds-text-inverse rounded-ds-sm px-ds-16 py-ds-8">
                    <span className="ds-text-heading-compact whitespace-nowrap">
                      {phase.name}
                    </span>
                  </div>

                  {/* Steps row */}
                  <div className="flex items-center gap-ds-8">
                    {phase.steps.map((step, si) => (
                      <div
                        key={step.line1}
                        className="flex items-center gap-ds-8 flex-1"
                      >
                        {si > 0 && <FlowArrow />}

                        <div
                          className="flex items-center justify-center bg-ds-surface-page text-ds-text-primary border border-ds-border-subtle rounded-ds-sm px-ds-16 py-ds-12 flex-1 text-center"
                        >
                          <span className="ds-text-heading-compact">
                            {step.line2 ? (
                              <>
                                {step.line1}
                                <br />
                                {step.line2}
                              </>
                            ) : (
                              step.line1
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Layer 2: Tooltips ── */}
          {hasTooltips && (
            <div className="flex items-start gap-ds-12">
              {phases.map((phase, pi) => (
                <div key={phase.name} className="flex items-start gap-ds-12 flex-1">
                  {/* Spacer matching inter-phase arrow */}
                  {pi > 0 && <ArrowSpacer />}

                  {/* Tooltip slots — mirrors the steps row structure */}
                  <div className="flex items-start gap-ds-8 flex-1">
                    {phase.steps.map((step, si) => (
                      <div
                        key={step.line1}
                        className="flex items-start gap-ds-8 flex-1"
                      >
                        {si > 0 && <ArrowSpacer />}

                        <div className="flex-1 flex justify-center">
                          {step.tooltip ? (() => {
                            const pos = step.tooltip.position ?? 'bottom-center';
                            return (
                              <div className={`flex-1 flex ${getTooltipWrapperClasses(pos)}`}>
                                <div className="relative w-max">
                                  <TooltipPointer position={pos} />
                                  <div className="bg-ds-surface-inverse text-ds-text-inverse p-ds-12 rounded-ds-sm text-left">
                                    <div className="ds-text-body-compact font-medium mb-ds-4 whitespace-nowrap">
                                      {step.tooltip.title}
                                    </div>
                                    <p className="ds-text-label-sm text-ds-text-inverse/80 leading-snug whitespace-pre-line">
                                      {step.tooltip.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })() : (
                            /* Empty spacer to preserve column alignment */
                            <div className="flex-1" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </MotionReveal>
  );
}
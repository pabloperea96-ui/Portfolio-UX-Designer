import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

/* ========================================
   StepList — Vertical stepper with sync'd mockup frames
   ========================================
   A numbered vertical stepper designed to sit inside the children
   slot of TechnicalSheet (via ProjectCard). Each step maps 1-to-1
   with a frame in IPhoneMockup — clicking either side advances both.

   BEHAVIOUR:
     • Bidirectional sync — clicking a step updates the shared parent
       state, which in turn advances the IPhoneMockup to the matching
       frame (and vice-versa when the phone is clicked).
     • Active step: pill filled green, title bold, description expanded.
     • Inactive step: pill outlined, title secondary, description hidden.
     • Hover on inactive: pill border + title shift to primary colours.
     • Description animates open/closed with a smooth height transition.

   LAYOUT:
     Left column  → number pill (32px circle) + vertical connector line
     Right column → step title (always visible) + description (active only)

   The connector line uses flex-grow to stretch exactly to the height of
   each step's content, so it adapts automatically when a description
   expands without any fixed heights.

   USAGE (inside ProjectCard children slot):
   ─────────────────────────────────────────
   // Parent page holds the shared state:
   const [activeStep, setActiveStep] = useState(0);

   <ProjectCard
     imageVariant="mockup"
     mockupFrames={[screen1, screen2, screen3]}
     activeMockupFrame={activeStep}
     onMockupFrameChange={setActiveStep}
     title="Feature Name"
     description="Brief context"
   >
     <StepList
       steps={[
         { title: 'Step 1', description: 'What this screen solves.' },
         { title: 'Step 2', description: 'Design decision rationale.' },
         { title: 'Step 3', description: 'Outcome for the user.' },
       ]}
       activeStep={activeStep}
       onStepChange={setActiveStep}
     />
   </ProjectCard>
   ======================================== */

export interface StepItem {
  /** Short label displayed next to the number pill */
  title: string;
  /** Expanded copy shown only when this step is active */
  description?: string;
}

export interface StepListProps {
  /** Ordered list of steps, each mapping to one IPhoneMockup frame */
  steps: StepItem[];
  /** Index of the currently active step (controlled, owned by parent) */
  activeStep: number;
  /** Fires when the user selects a step — update the same state that
   *  drives activeMockupFrame on ProjectCard */
  onStepChange: (index: number) => void;
  /** Optional className on the outer wrapper */
  className?: string;
}

export function StepList({
  steps,
  activeStep,
  onStepChange,
  className = '',
}: StepListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={className}
      role="list"
      aria-label="Step navigation"
    >
      {steps.map((step, i) => {
        const isActive  = i === activeStep;
        const isLast    = i === steps.length - 1;
        const isHovered = hoveredIndex === i && !isActive;

        /* ── Derived style values ─────────────────────────────────── */
        const pillBg     = isActive ? 'var(--ds-action-primary)'  : 'transparent';
        const pillBorder = isActive ? 'var(--ds-action-primary)'  : 'var(--ds-border-default)';
        const pillColor  = isActive
          ? 'var(--ds-text-inverse)'
          : isHovered
            ? 'var(--ds-text-primary)'
            : 'var(--ds-text-tertiary)';

        const titleColor = isActive || isHovered
          ? 'var(--ds-text-primary)'
          : 'var(--ds-text-secondary)';

        const titleWeight = isActive
          ? 'var(--ds-font-weight-medium)'
          : 'var(--ds-font-weight-regular)';

        return (
          <div
            key={i}
            role="listitem"
            style={{ display: 'flex', alignItems: 'flex-start' }}
          >
            {/* ════════════════════════════════════════════════════
                LEFT COLUMN — number pill + vertical connector line
                ════════════════════════════════════════════════════ */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
                marginRight: 'var(--ds-space-16)',
              }}
            >
              {/* Number pill */}
              <button
                onClick={() => onStepChange(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${i + 1}: ${step.title}`}
                style={{
                  /* Size */
                  width:  'var(--ds-space-32)',
                  height: 'var(--ds-space-32)',
                  flexShrink: 0,

                  /* Shape */
                  borderRadius: 'var(--ds-radius-pill)',

                  /* Colour */
                  backgroundColor: pillBg,
                  border: `var(--ds-border-width-default) solid ${pillBorder}`,
                  color: pillColor,

                  /* Typography */
                  fontFamily:    'var(--ds-font-family)',
                  fontSize:      'var(--ds-font-size-label-lg)',
                  fontWeight:    'var(--ds-font-weight-medium)',
                  lineHeight:    '1',

                  /* Layout */
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',

                  /* Behaviour */
                  cursor:     isActive ? 'default' : 'pointer',
                  outline:    'none',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow =
                    `0 0 0 var(--ds-border-width-focus) var(--ds-border-focus)`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {i + 1}
              </button>

              {/* Vertical connector — stretches to match row height */}
              {!isLast && (
                <div
                  style={{
                    flex:            1,
                    width:           'var(--ds-border-width-default)',
                    backgroundColor: 'var(--ds-border-subtle)',
                    marginTop:       'var(--ds-space-4)',
                    marginBottom:    'var(--ds-space-4)',
                    minHeight:       'var(--ds-space-16)',
                  }}
                />
              )}
            </div>

            {/* ════════════════════════════════════════════════════
                RIGHT COLUMN — title (always) + description (active)
                ════════════════════════════════════════════════════ */}
            <div
              style={{
                flex:          1,
                paddingBottom: isLast ? 0 : 'var(--ds-space-24)',
                /* Optical alignment: nudge text down to centre with pill */
                paddingTop:    'var(--ds-space-4)',
                cursor:        isActive ? 'default' : 'pointer',
              }}
              onClick={() => !isActive && onStepChange(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Step title */}
              <p
                style={{
                  margin:        0,
                  fontFamily:    'var(--ds-font-family)',
                  fontSize:      'var(--ds-font-size-body-compact)',
                  fontWeight:    titleWeight,
                  color:         titleColor,
                  letterSpacing: 'var(--ds-tracking-body-compact)',
                  lineHeight:    'var(--ds-line-height-body-compact)',
                  transition:    'color 0.2s ease',
                  userSelect:    'none',
                }}
              >
                {step.title}
              </p>

              {/* Description — animated height open/close */}
              <AnimatePresence initial={false}>
                {isActive && step.description && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      style={{
                        margin:        0,
                        marginTop:     'var(--ds-space-8)',
                        fontFamily:    'var(--ds-font-family)',
                        fontSize:      'var(--ds-font-size-body-compact)',
                        fontWeight:    'var(--ds-font-weight-regular)',
                        color:         'var(--ds-text-secondary)',
                        letterSpacing: 'var(--ds-tracking-body-compact)',
                        lineHeight:    'var(--ds-line-height-body-compact)',
                      }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

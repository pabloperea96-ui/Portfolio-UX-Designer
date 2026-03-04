import { type ReactNode } from 'react';
import { MotionReveal } from './motion-reveal';
import { TechnicalSheet } from './technical-sheet';
import { IPhoneMockup } from './iphone-mockup';

/* ========================================
   ResultCard + ResultGrid — Design System composition
   ========================================
   Dark-background metric cards used in case study
   "Results & Impact" sections.

   ResultGrid composes:
     - TechnicalSheet (centered, hasBadges/showCta off) for the section header
     - ResultCard for each metric

   Replaces the repeated pattern:
     <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center">
       <p className="ds-text-heading-page mb-3">{metric}</p>
       <p className="ds-text-label-sm opacity-70">{description}</p>
     </div>
   ======================================== */

interface ResultCardProps {
  /** The big metric number/value */
  metric: string;
  /** Description text */
  description: string;
}

export function ResultCard({ metric, description }: ResultCardProps) {
  return (
    <div className="bg-primary text-primary-foreground rounded-ds-md p-ds-32 text-center">
      <p className="ds-text-heading-page mb-ds-12">{metric}</p>
      <p className="ds-text-label-sm opacity-70">{description}</p>
    </div>
  );
}

/* ── ResultGrid ── */

interface ResultGridProps {
  /** Section eyebrow label */
  eyebrow: string;
  /** Section heading (supports JSX for italics) */
  heading: ReactNode;
  /** Array of metric results — required only when mockupFrames is not provided */
  results?: ResultCardProps[];
  /**
   * When provided, replaces the metric-card grid with a centred IPhoneMockup.
   * Accepts the same frame types as IPhoneMockup: image URL strings, video URL
   * strings, or ReactNode screens.
   */
  mockupFrames?: (string | ReactNode)[];
  /** Max width of the IPhoneMockup. Default: '320px' */
  mockupMaxWidth?: string;
  /**
   * When true, shows the "Haz scrolling" chip below the mockup.
   * Use only when mockupFrames contains scrollable ReactNode screens.
   */
  scrollHint?: boolean;
  /**
   * When true, enables Figma-style interactive hotspot discovery on the mockup.
   * Forwarded directly to IPhoneMockup's `interactiveHint` prop.
   * Prototype screens must mark interactive elements with `data-hotspot`.
   */
  interactiveHint?: boolean;
}

export function ResultGrid({
  eyebrow,
  heading,
  results = [],
  mockupFrames,
  mockupMaxWidth = '320px',
  scrollHint = false,
  interactiveHint = false,
}: ResultGridProps) {
  return (
    <>
      <MotionReveal margin="-80px" className="mb-ds-64">
        <TechnicalSheet
          align="centered"
          subtitle={eyebrow}
          title={heading}
          hasBadges={false}
          showCta={false}
        />
      </MotionReveal>

      {mockupFrames ? (
        <MotionReveal margin="-80px">
          <div
            className="flex justify-center"
          >
            <div style={{ width: '100%', maxWidth: mockupMaxWidth }}>
              <IPhoneMockup
                frames={mockupFrames}
                className="w-full"
                scrollHint={scrollHint}
                interactiveHint={interactiveHint}
              />
            </div>
          </div>
        </MotionReveal>
      ) : (
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-ds-24">
          {results.map((result, index) => (
            <MotionReveal
              key={result.description}
              delay={index * 0.1}
              duration={0.6}
              margin="-80px"
            >
              <ResultCard metric={result.metric} description={result.description} />
            </MotionReveal>
          ))}
        </div>
      )}
    </>
  );
}
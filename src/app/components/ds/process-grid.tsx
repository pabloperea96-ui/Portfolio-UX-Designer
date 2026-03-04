import { type ReactNode } from 'react';
import { MotionReveal } from './motion-reveal';
import { ProcessStep } from './process-step';
import { TechnicalSheet } from './technical-sheet';

/* ========================================
   ProcessGrid — Design System composition component
   ========================================
   Numbered 4-column process steps grid used in case studies.

   Composes <ProcessStep /> for each step, wrapped in <MotionReveal />
   for staggered scroll-reveal animation.
   ======================================== */

interface ProcessStepData {
  number: string;
  title: string;
  description: string;
}

interface ProcessGridProps {
  /** Section eyebrow label */
  eyebrow: string;
  /** Section heading (supports JSX for italics) */
  heading: ReactNode;
  /** Array of process steps */
  steps: ProcessStepData[];
  /** Optional wireframe image below the grid */
  wireframeImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export function ProcessGrid({
  eyebrow,
  heading,
  steps,
  wireframeImage,
}: ProcessGridProps) {
  return (
    <>
      <MotionReveal margin="-80px" className="mb-ds-64">
        <TechnicalSheet
          subtitle={eyebrow}
          title={heading}
          hasBadges={false}
          showCta={false}
          className="max-w-3xl"
        />
      </MotionReveal>

      <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-ds-xl overflow-hidden">
        {steps.map((step, index) => (
          <MotionReveal
            key={step.number}
            delay={index * 0.1}
            duration={0.6}
            margin="-80px"
            className="h-full"
          >
            <ProcessStep
              number={step.number}
              title={step.title}
              description={step.description}
              className="h-full"
            />
          </MotionReveal>
        ))}
      </div>

      {wireframeImage && (
        <MotionReveal margin="-100px" className="mt-ds-64">
          <div className="aspect-[16/9] rounded-ds-xl overflow-hidden">
            <img
              src={wireframeImage.src}
              alt={wireframeImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
          {wireframeImage.caption && (
            <p className="ds-text-label-sm text-ds-text-tertiary mt-ds-16 text-center">
              {wireframeImage.caption}
            </p>
          )}
        </MotionReveal>
      )}
    </>
  );
}
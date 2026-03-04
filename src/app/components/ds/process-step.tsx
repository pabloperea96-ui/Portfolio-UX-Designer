/**
 * ProcessStep — Design System primitive
 *
 * A numbered process step card showing a large faded step number,
 * title, and description in a vertical stack.
 *
 * Pure visual component — animation is handled by the parent
 * composition (e.g. ProcessGrid wraps each step in MotionReveal
 * for staggered entrance).
 *
 * Uses DS tokens:
 *   Spacing   → --ds-space-32, --ds-space-24, --ds-space-16
 *   Typography → ds-text-heading-page (number), ds-text-heading-compact (title),
 *                ds-text-body-compact (description)
 *   Color     → ds-text-primary, ds-text-secondary
 */

interface ProcessStepProps {
  /** Display number, e.g. "01" */
  number: string;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Additional classes on the outer container */
  className?: string;
}

export function ProcessStep({
  number,
  title,
  description,
  className = '',
}: ProcessStepProps) {
  return (
    <div
      className={`bg-background p-ds-32 lg:p-ds-48 flex flex-col ${className}`}
    >
      <span className="ds-text-heading-page text-ds-text-secondary/30 mb-ds-24">
        {number}
      </span>
      <h3 className="ds-text-heading-compact text-ds-text-primary mb-ds-16">
        {title}
      </h3>
      <p className="ds-text-body-compact text-ds-text-secondary flex-1">
        {description}
      </p>
    </div>
  );
}

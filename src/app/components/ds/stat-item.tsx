/**
 * StatItem — Design System primitive
 *
 * A lightweight inline stat display: large metric value + small label.
 * Used in case study research/analysis sections for key figures.
 *
 * Uses DS tokens:
 *   Typography → ds-text-heading-section (stat), ds-text-label-sm (label)
 *   Color     → ds-text-primary (stat), ds-text-tertiary (label)
 *   Spacing   → mt-ds-4 between stat and label
 */

interface StatItemProps {
  /** The metric value, e.g. "6", "15+", "40+" */
  stat: string;
  /** Descriptive label below the stat */
  label: string;
  /** Additional classes on the outer container */
  className?: string;
}

export function StatItem({ stat, label, className = '' }: StatItemProps) {
  return (
    <div className={className}>
      <p className="ds-text-heading-section">{stat}</p>
      <p className="ds-text-label-sm text-ds-text-tertiary mt-ds-4">{label}</p>
    </div>
  );
}
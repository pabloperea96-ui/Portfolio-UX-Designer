import * as React from 'react';

interface DesignBadgeProps {
  /** The label text displayed inside the badge */
  children: React.ReactNode;
  /** Optional className for the outer wrapper */
  className?: string;
}

/**
 * A pill-shaped badge component mapped from the Figma "Badge" frame.
 *
 * Uses 3 CSS variables from the design system (in theme.css):
 *   --badge-bg       Background fill           (#ffffff)
 *   --badge-text     Label text color           (#141411)
 *   --badge-border   Border color               (#acacac)
 */
export function DesignBadge({ children, className = '' }: DesignBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-ds-lg border border-badge-border bg-badge-bg px-ds-16 py-ds-8 ${className}`}
    >
      <span className="shrink-0 ds-text-label-sm text-badge-text">
        {children}
      </span>
    </span>
  );
}

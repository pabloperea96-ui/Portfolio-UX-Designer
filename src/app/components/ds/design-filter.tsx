import * as React from 'react';
import { useState } from 'react';

interface DesignFilterProps {
  /** The label text displayed inside the filter pill */
  children: React.ReactNode;
  /** Whether this filter is currently active/selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Optional className for the outer wrapper */
  className?: string;
}

/**
 * A pill-shaped filter chip mapped from the Figma "Filter" component
 * (Idle / Selected / Hovered variants).
 *
 * Uses 7 CSS variables from the design system (in theme.css):
 *   --filter-bg              Idle background            (#ffffff)
 *   --filter-bg-hover        Hovered background         (#f6f6f6)
 *   --filter-bg-selected     Selected background        (#292925)
 *   --filter-text            Idle text color             (#6c6262)
 *   --filter-text-hover      Hovered text color          (#141411)
 *   --filter-text-selected   Selected text color         (#ffffff)
 *   --filter-border          Border color (all states)   (#acacac)
 */
export function DesignFilter({
  children,
  selected = false,
  onClick,
  className = '',
}: DesignFilterProps) {
  const [hovered, setHovered] = useState(false);

  const backgroundColor = selected
    ? 'var(--filter-bg-selected)'
    : hovered
      ? 'var(--filter-bg-hover)'
      : 'var(--filter-bg)';

  const textColor = selected
    ? 'var(--filter-text-selected)'
    : hovered
      ? 'var(--filter-text-hover)'
      : 'var(--filter-text)';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex items-center justify-center rounded-ds-lg border border-filter-border px-ds-16 py-ds-12 cursor-pointer transition-colors duration-200 ${className}`}
      style={{ backgroundColor, color: textColor }}
    >
      <span className="shrink-0 ds-text-label-eyebrow">
        {children}
      </span>
    </button>
  );
}

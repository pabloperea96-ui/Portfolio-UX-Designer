import * as React from 'react';

/**
 * Reusable icon-thumbnail mapped from the Figma Card instances.
 *
 *   solid        — Dark bg (#292925), white icon (skill cards in About)
 *   interactive  — White idle (#ffffff) → dark on parent hover; icon inverts
 *                  (social cards in Contact). Expects a parent with class
 *                  `group/card` to drive the hover transition.
 *
 * Uses 4 CSS variables from the design system (in theme.css):
 *   --dthumb-bg        Dark background          (#292925 / surface-inverse)
 *   --dthumb-bg-idle   Idle background           (#ffffff / surface-page)
 *   --dthumb-icon      Icon on dark bg           (#ffffff / text-inverse)
 *   --dthumb-icon-idle Icon on idle bg           (#141411 / text-primary)
 */

export type DesignThumbnailVariant = 'solid' | 'interactive';

interface DesignThumbnailProps {
  /** @default 'solid' */
  variant?: DesignThumbnailVariant;
  /** Icon ReactNode rendered inside the thumbnail */
  icon: React.ReactNode;
  className?: string;
}

export function DesignThumbnail({
  variant = 'solid',
  icon,
  className = '',
}: DesignThumbnailProps) {
  /* Shared base styles */
  const base =
    'shrink-0 size-ds-48 rounded-ds-sm flex items-center justify-center p-ds-12';

  if (variant === 'interactive') {
    return (
      <div
        className={`${base} bg-dthumb-bg-idle group-hover/card:bg-dthumb-bg text-dthumb-icon-idle group-hover/card:text-dthumb-icon transition-colors duration-200 ${className}`}
      >
        {icon}
      </div>
    );
  }

  /* solid (default) */
  return (
    <div className={`${base} bg-dthumb-bg text-dthumb-icon ${className}`}>
      {icon}
    </div>
  );
}

import * as React from 'react';

/**
 * DesignLabel — Design System primitive
 *
 * A pill-shaped label used to denote categories, project types,
 * or contextual tags (e.g. "Proyecto conceptual", "2025").
 *
 * Supports two variants:
 *   - `filled` (default): solid dark background, inverted text
 *   - `subtle`: transparent background, tertiary text
 *
 * Uses CSS variables from theme.css:
 *   --label-filled-bg      Filled background       (--primary)
 *   --label-filled-text     Filled text color        (--primary-foreground)
 *
 * Uses DS tokens:
 *   Typography → ds-text-body-compact (14px / 22px / -0.15px)
 *   Spacing    → --ds-space-16 (px), --ds-space-8 (py)
 *   Radius     → rounded-full (fully rounded pill)
 */

type DesignLabelVariant = 'filled' | 'subtle';

interface DesignLabelProps {
  /** The label text */
  children: React.ReactNode;
  /** Visual variant. Default: 'filled' */
  variant?: DesignLabelVariant;
  /** Additional classes on the outer element */
  className?: string;
}

const variantClasses: Record<DesignLabelVariant, string> = {
  filled: 'bg-label-filled-bg text-label-filled-text',
  subtle: 'text-ds-text-tertiary',
};

export function DesignLabel({
  children,
  variant = 'filled',
  className = '',
}: DesignLabelProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-ds-16 py-ds-8 ds-text-body-compact ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

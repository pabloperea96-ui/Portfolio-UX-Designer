import * as React from 'react';

type ChevronDirection = 'right' | 'left' | 'up' | 'down';

interface ChevronProps {
  /** The direction the chevron points */
  direction?: ChevronDirection;
  /** Size in pixels (default: 14) */
  size?: number;
  /** Fill color — defaults to the --icon-foreground CSS variable */
  color?: string;
  /** Optional className */
  className?: string;
}

/**
 * Rotation angles for each direction.
 * The base SVG path points right (→), so we rotate from there.
 */
const rotationMap: Record<ChevronDirection, number> = {
  right: 0,
  down: 90,
  left: 180,
  up: 270,
};

/**
 * Base chevron path pointing right, drawn in a 14×14 viewBox.
 * Matches the Figma "Chevron / Right" component.
 */
const CHEVRON_PATH =
  'M5.54 2.04a.58.58 0 0 0-.42.17.58.58 0 0 0 0 .83L9.36 7l-4.24 3.96a.58.58 0 0 0 0 .83.58.58 0 0 0 .83 0l4.66-4.37a.58.58 0 0 0 0-.84L5.95 2.21a.58.58 0 0 0-.41-.17Z';

export function Chevron({
  direction = 'right',
  size = 14,
  color = 'var(--icon-foreground)',
  className = '',
}: ChevronProps) {
  const rotation = rotationMap[direction];

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="block size-full"
        fill="none"
        viewBox="0 0 14 14"
        aria-hidden="true"
      >
        <path
          d={CHEVRON_PATH}
          fill={color}
          transform={rotation !== 0 ? `rotate(${rotation} 7 7)` : undefined}
        />
      </svg>
    </div>
  );
}

import * as React from 'react';
import svgPaths from '../../../imports/svg-6a34l7e38r';

/**
 * All available arrow directions.
 *
 * Cardinal:  down, up, left, right
 * Diagonal:  down-left, up-left, up-right, down-right
 */
export type DesignArrowDirection =
  | 'down'
  | 'up'
  | 'left'
  | 'right'
  | 'down-left'
  | 'up-left'
  | 'up-right'
  | 'down-right';

interface DesignArrowProps {
  /** Arrow direction (default "right") */
  direction?: DesignArrowDirection;
  /** Icon size in px (default 24) */
  size?: number;
  /** Arrow color — defaults to currentColor so it inherits from parent text */
  color?: string;
  /** Additional className applied to the <svg> element */
  className?: string;
}

/** Map each direction to its dedicated SVG path key */
const pathMap: Record<DesignArrowDirection, string> = {
  down: svgPaths.pd96ec00,
  up: svgPaths.p1e0ab200,
  left: svgPaths.p2dc85f00,
  right: svgPaths.p34baf580,
  'down-left': svgPaths.p25661380,
  'up-left': svgPaths.p2bfd780,
  'up-right': svgPaths.p24dfe880,
  'down-right': svgPaths.p10af0972,
};

/**
 * Reusable arrow icon component mapped from Figma's "Arrow" instances.
 *
 * Each of the 8 directions uses its own dedicated SVG path (no CSS rotation),
 * ensuring pixel-perfect rendering at every angle.
 *
 * Color defaults to `currentColor` (inherits from parent text color).
 *
 * Usage:
 *   <DesignArrow direction="up-right" />
 *   <DesignArrow direction="down" size={20} color="var(--icon-foreground)" />
 *   <DesignArrow direction="left" className="w-5 h-5" />
 */
export function DesignArrow({
  direction = 'right',
  size = 24,
  color = 'currentColor',
  className = '',
}: DesignArrowProps) {
  return (
    <svg
      className={`block shrink-0 ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={pathMap[direction]} fill={color} />
    </svg>
  );
}

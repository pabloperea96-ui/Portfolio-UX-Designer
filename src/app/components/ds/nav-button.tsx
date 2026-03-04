import * as React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import svgPaths from '../../../imports/svg-w63k1cm92i';

interface NavButtonProps {
  /** The button label text */
  children: React.ReactNode;
  /** Whether this nav button is the currently active/selected item */
  selected?: boolean;
  /** Whether to show the back-arrow icon to the left of the label */
  icon?: boolean;
  /** Whether to show the underline bar when selected (defaults to true) */
  underline?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Optional className override */
  className?: string;
  /** Optional layout ID for animated underline (useful when shared across a group) */
  layoutId?: string;
}

function ArrowIcon({ color }: { color: string }) {
  return (
    <div className="relative shrink-0 size-[14px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <path d={svgPaths.p25a94b80} fill={color} />
      </svg>
    </div>
  );
}

export function NavButton({
  children,
  selected = false,
  icon = false,
  underline = true,
  onClick,
  className = '',
  layoutId,
}: NavButtonProps) {
  const [hovered, setHovered] = useState(false);

  // Determine current visual state
  const isIdle = !selected && !hovered;
  const isHovered = !selected && hovered;

  // Resolve colors from CSS variables based on state
  const textColor = selected
    ? 'var(--nav-btn-text)'
    : isHovered
      ? 'var(--nav-btn-text-hover)'
      : 'var(--nav-btn-text-idle)';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center rounded-ds-sm px-ds-4 py-px ds-text-action-inline transition-opacity cursor-pointer ${
        isIdle ? 'opacity-75' : 'opacity-100'
      } ${selected ? 'flex-col gap-ds-4 justify-center' : 'gap-ds-8 justify-center'} ${className}`}
      style={{ color: textColor }}
    >
      {/* Back arrow icon (idle & hovered states only, when icon=true) */}
      {icon && !selected && <ArrowIcon color={textColor} />}

      {/* Label */}
      <span className="relative shrink-0 w-full text-center leading-normal">
        {children}
      </span>

      {/* Selected underline indicator */}
      {selected && underline && (
        <motion.div
          layoutId={layoutId}
          className="h-[2px] w-full shrink-0"
          style={{ backgroundColor: 'var(--nav-btn-underline)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}
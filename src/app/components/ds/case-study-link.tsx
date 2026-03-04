import * as React from 'react';
import { motion } from 'motion/react';
import { DesignArrow } from './design-arrow';

interface CaseStudyLinkProps {
  /** The label text (defaults to "View Case Study") */
  children?: React.ReactNode;
  /** Visual variant: plain inline link or pill with border */
  variant?: 'default' | 'stroked';
  /** Click handler */
  onClick?: () => void;
  /** Optional className for the outer wrapper */
  className?: string;
}

/**
 * A "View Case Study" link component mapped from the Figma frame.
 *
 * Two variants:
 *   - `default`  — Plain inline text + arrow. On hover the arrow translates up-right.
 *   - `stroked`  — Pill shape with background and border. On hover the background subtly darkens.
 *
 * Uses 4 CSS variables from the design system (in theme.css):
 *   --case-link-text     Label text color         (#141411)
 *   --case-link-icon     Arrow icon color         (#141411)
 *   --case-link-bg       Stroked variant bg       (#f6f6f6)
 *   --case-link-border   Stroked variant border   (#d2d2d2)
 */
export function CaseStudyLink({
  children = 'View Case Study',
  variant = 'default',
  onClick,
  className = '',
}: CaseStudyLinkProps) {
  if (variant === 'stroked') {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`group/link inline-flex items-center gap-ds-8 rounded-ds-lg border py-ds-8 pl-ds-12 pr-ds-8 cursor-pointer transition-colors ${className}`}
        style={{
          backgroundColor: 'var(--case-link-bg)',
          borderColor: 'var(--case-link-border)',
        }}
      >
        <span className="shrink-0 ds-text-action-inline text-case-link-text">
          {children}
        </span>
        <span className="shrink-0 size-[16px] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
          <DesignArrow direction="up-right" size={16} color="var(--case-link-icon)" />
        </span>
      </motion.button>
    );
  }

  /* default variant — plain inline link */
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={`group/link inline-flex items-center gap-ds-8 cursor-pointer ${className}`}
    >
      <span className="shrink-0 ds-text-action-inline text-case-link-text">
        {children}
      </span>
      <span className="shrink-0 size-[16px] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
        <DesignArrow direction="up-right" size={16} color="var(--case-link-icon)" />
      </span>
    </motion.button>
  );
}

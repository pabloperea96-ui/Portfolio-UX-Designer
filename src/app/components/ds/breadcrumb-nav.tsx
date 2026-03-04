import * as React from 'react';
import { motion } from 'motion/react';
import { NavButton } from './nav-button';
import { Chevron } from './chevron';

export interface BreadcrumbItem {
  /** Display label for this breadcrumb level */
  label: string;
  /** Click handler — typically navigates back to that level */
  onClick?: () => void;
}

interface BreadcrumbNavProps {
  /** Ordered list of breadcrumb levels (first = root, last = current page) */
  items: BreadcrumbItem[];
  /** Extra classes for the outer <nav> (e.g. positioning overrides) */
  className?: string;
}

/**
 * Navigation / Breadcrumb variant
 *
 * Renders a fixed, pill-shaped breadcrumb bar that reuses NavButton and Chevron.
 *
 * - First item shows the back-arrow icon (NavButton `icon` variant).
 * - Last item shows the selected/active state (NavButton `selected` variant).
 * - Intermediate items show default idle NavButtons.
 * - Chevrons separate each level.
 *
 * All visual tokens are sourced from theme.css CSS variables.
 */
export function BreadcrumbNav({ items, className = '' }: BreadcrumbNavProps) {
  if (items.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      aria-label="Breadcrumb"
      className={`fixed z-50 ${className}`}
    >
      {/* Pill container — glass-morphism surface with border & shadow */}
      <div className="relative flex items-center bg-ds-surface-page/80 backdrop-blur-[30px] border border-ds-border-subtle rounded-full px-ds-24 py-ds-8 shadow-sm">
        <ol className="flex items-center gap-ds-4">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <li key={item.label} className="flex items-center gap-ds-4">
                {/* Chevron separator (every level after the first) */}
                {!isFirst && (
                  <Chevron
                    direction="right"
                    size={14}
                    color="var(--nav-btn-text-idle)"
                  />
                )}

                {/* NavButton: icon on first, selected on last, plain otherwise */}
                <NavButton
                  icon={isFirst}
                  selected={isLast}
                  underline={false}
                  onClick={item.onClick}
                  className={item.onClick ? 'cursor-pointer' : ''}
                >
                  {item.label}
                </NavButton>
              </li>
            );
          })}
        </ol>
      </div>
    </motion.nav>
  );
}
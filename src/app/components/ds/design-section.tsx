import * as React from 'react';

/**
 * Section layout variants mapped from Figma:
 *
 *   hero        → horizontal, center-aligned, gap-48, py-72, overflow-clip
 *   projects    → vertical,   centered,       gap-72, py-48
 *   cta         → vertical,   centered,       gap-48, py-72, overflow-clip
 *   contact     → horizontal, top-aligned,    gap-48, py-72, overflow-clip
 *   footer      → horizontal, top-aligned,    gap-48, pt-16 pb-72
 *   pageFooter  → responsive row, center-aligned, gap-24, pt-48, border-top subtle
 *   projectGrid → vertical,   centered,       gap-72, py-48
 */
export type DesignSectionVariant =
  | 'hero'
  | 'projects'
  | 'cta'
  | 'contact'
  | 'footer'
  | 'pageFooter'
  | 'projectGrid';

interface DesignSectionProps {
  /** Layout variant preset */
  variant?: DesignSectionVariant;
  children: React.ReactNode;
  /** Optional className appended to the outer wrapper */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Variant → Tailwind class map                                       */
/* ------------------------------------------------------------------ */
const variantClasses: Record<DesignSectionVariant, string> = {
  hero:        'flex gap-ds-48 items-center py-ds-72 overflow-clip',
  projects:    'flex flex-col gap-ds-72 items-center py-ds-48',
  cta:         'flex flex-col gap-ds-48 items-center py-ds-72 overflow-clip',
  contact:     'flex gap-ds-48 items-start py-ds-72 overflow-clip',
  footer:      'flex gap-ds-48 items-start pt-ds-16 pb-ds-72',
  pageFooter:  'flex flex-col md:flex-row justify-between items-center gap-ds-24 pt-ds-48 border-t border-ds-border-subtle',
  projectGrid: 'flex flex-col gap-ds-72 items-center py-ds-48',
};

/**
 * DesignSection — a reusable layout container mapped from the Figma "Section" frame.
 *
 * It sets the flex direction, alignment, gap, padding, and overflow based on the
 * selected variant, then renders children inside.
 *
 * All spacing references DS tokens so Comfortable ↔ Compact switching works automatically.
 */
export function DesignSection({
  variant = 'projects',
  children,
  className = '',
}: DesignSectionProps) {
  return (
    <div className={`w-full ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionHeader — subtitle + title + description block               */
/* ------------------------------------------------------------------ */

interface SectionHeaderProps {
  /** Small subtitle text above the title */
  subtitle?: string;
  /** Large hero-sized title */
  title: string;
  /** Body-sized description below the title */
  description?: string;
  /** Optional className for the outer wrapper */
  className?: string;
}

/**
 * SectionHeader — the heading block used inside Section / Projects and
 * Section / ProjectGrid.
 *
 * Relationship to TechnicalSheet:
 *   Both render the same eyebrow + title + description pattern, but from
 *   different Figma frames with intentionally different spacing:
 *     - SectionHeader: flat layout, uniform gap-ds-4, heading-hero
 *     - TechnicalSheet: nested layout, gap-ds-24/8/4, configurable size
 *
 *   SectionHeader is a specialized, simpler API for page-level section
 *   headings. TechnicalSheet is the universal text block primitive with
 *   instance-swap props (size, subtitleVariant, ctaType, children slot).
 *
 *   Both share the same DS typography tokens, so updating theme.css
 *   keeps them in sync.
 *
 * Structure (gap-ds-4, items-start, full-width):
 *   subtitle    → label-eyebrow / text-tertiary / leading-none (line-height:1, eliminates half-leading so gap maps to glyph spacing)
 *   title       → heading-hero / text-primary  / leading-none (same reason)
 *   description → body-default / text-secondary
 */
export function SectionHeader({
  subtitle,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-ds-4 items-start w-full ${className}`}>
      {subtitle && (
        <p className="ds-text-label-eyebrow text-ds-text-tertiary w-full leading-none">
          {subtitle}
        </p>
      )}

      <p className="ds-text-heading-hero text-ds-text-primary w-full leading-none">
        {title}
      </p>

      {description && (
        <p className="ds-text-body-default text-ds-text-secondary w-full">
          {description}
        </p>
      )}
    </div>
  );
}
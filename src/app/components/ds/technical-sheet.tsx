import * as React from 'react';
import { DesignBadge } from './design-badge';
import { CaseStudyLink } from './case-study-link';
import { DesignButton } from './design-button';

/**
 * Alignment variants mapped from Figma:
 *   - `left`     → Technical Sheet / Left     — all content left-aligned
 *   - `centered` → Technical Sheet / Centered — all content center-aligned
 */
export type TechnicalSheetAlign = 'left' | 'centered';

/**
 * Size variants mapped from Figma:
 *   - `default` → Technical Sheet / [align] — heading-page title, body-default description
 *   - `small`   → Technical Sheet / Small / [align] — heading-overview title, body-emphasis description
 *   - `large`   → Technical Sheet / Large / [align] — heading-hero title, body-emphasis description
 *   - `section` → Technical Sheet / Section / [align] — heading-section title, body-default description
 */
export type TechnicalSheetSize = 'default' | 'small' | 'large' | 'section';

/**
 * Subtitle style variant (instance swap):
 *   - `eyebrow` → label-eyebrow, uppercase  (section headers, page titles)
 *   - `label`   → label-sm                  (sub-sections, numbered steps)
 */
export type TechnicalSheetSubtitleVariant = 'eyebrow' | 'label';

/**
 * CTA instance swap: which component renders in the CTA slot.
 *   - `link`   → CaseStudyLink (default variant, inline text + arrow)
 *   - `button` → DesignButton
 */
export type TechnicalSheetCtaType = 'link' | 'button';

interface TechnicalSheetProps {
  /** Alignment variant */
  align?: TechnicalSheetAlign;
  /** Size variant (default uses heading-page, small uses heading-overview) */
  size?: TechnicalSheetSize;
  /** Subtitle display style — 'eyebrow' (uppercase label) or 'label' (smaller, plain) */
  subtitleVariant?: TechnicalSheetSubtitleVariant;
  /** Project subtitle (e.g. category label) */
  subtitle: string;
  /** Project title (plain string or rich ReactNode with inline markup) */
  title: React.ReactNode;
  /** Project description (plain string or rich ReactNode for multi-paragraph content) */
  description?: React.ReactNode;
  /** Flexible content slot below description — BulletList, stat grids, custom badges, etc. */
  children?: React.ReactNode;
  /** Skill / tag labels rendered as DesignBadge instances */
  tags?: string[];
  /** Whether to show the badges row (default true) */
  hasBadges?: boolean;
  /** Whether to show the CTA slot (default true) */
  showCta?: boolean;
  /** Which CTA component to render */
  ctaType?: TechnicalSheetCtaType;
  /** CTA label text */
  ctaLabel?: string;
  /** CTA click handler */
  onCtaClick?: () => void;
  /** DesignButton variant (only used when ctaType is 'button') */
  buttonVariant?: 'primary' | 'secondary';
  /** Optional className for the outer wrapper */
  className?: string;
}

/**
 * A reusable "Technical Sheet" component mapped from the Figma frame.
 *
 * Structure (top → bottom, outer gap-ds-24):
 *   1. Text block  (gap-ds-8: Subtitle+Title container [gap-ds-4, leading-none on both p] + Description)
 *   2. Children    — flexible content slot (BulletList, stat grids, custom content)
 *   3. Tags row    — controlled by `hasBadges`
 *   4. CTA slot    — controlled by `showCta`, instance-swaps between CaseStudyLink and DesignButton
 *
 * Instance-swap props:
 *   - `size`            → heading typography variant (default / small / large / section)
 *   - `subtitleVariant` → subtitle style (eyebrow / label)
 *   - `ctaType`         → CTA component (link / button)
 *   - `children`        → flexible content slot below description
 *
 * All colors, spacing, and typography reference DS tokens from theme.css.
 */
export function TechnicalSheet({
  align = 'left',
  size = 'default',
  subtitleVariant = 'eyebrow',
  subtitle,
  title,
  description,
  children,
  tags,
  hasBadges = true,
  showCta = true,
  ctaType = 'link',
  ctaLabel = 'View Case Study',
  onCtaClick,
  buttonVariant = 'primary',
  className = '',
}: TechnicalSheetProps) {
  const isCentered = align === 'centered';
  const isSmall = size === 'small';
  const isLarge = size === 'large';
  const isSection = size === 'section';

  return (
    <div
      className={`flex flex-col gap-ds-24 w-full ${
        isCentered ? 'items-center' : 'items-start'
      } ${className}`}
    >
      {/* ── Text block ─────────────────────────────────────────── */}
      <div
        className={`flex flex-col gap-ds-8 w-full ${
          isCentered ? 'items-center text-center' : 'items-start'
        }`}
      >
        {/* Subtitle + Title container */}
        <div
          className={`flex flex-col gap-ds-4 w-full ${
            isCentered ? 'items-center' : 'items-start'
          }`}
        >
          <p
            className={`${
              subtitleVariant === 'eyebrow'
                ? 'ds-text-label-eyebrow text-ds-text-tertiary'
                : 'ds-text-label-sm text-ds-text-tertiary'
            } w-full leading-none`}
          >
            {subtitle}
          </p>
          <p
            className={`${isLarge ? 'ds-text-heading-hero' : isSmall ? 'ds-text-heading-overview' : isSection ? 'ds-text-heading-section' : 'ds-text-heading-page'} text-ds-text-primary w-full leading-none`}
          >
            {title}
          </p>
        </div>

        {description && (
          typeof description === 'string' ? (
            <p
              className={`${isSmall || isLarge ? 'ds-text-body-emphasis' : 'ds-text-body-default'} text-ds-text-secondary w-full ${
                isCentered ? 'max-w-[672px]' : ''
              }`}
            >
              {description}
            </p>
          ) : (
            <div
              className={`${isSmall || isLarge ? 'ds-text-body-emphasis' : 'ds-text-body-default'} text-ds-text-secondary w-full ${
                isCentered ? 'max-w-[672px]' : ''
              }`}
            >
              {description}
            </div>
          )
        )}
      </div>

      {/* ── Children slot (BulletList, stat grids, custom content) ── */}
      {children}

      {/* ── Skills / Tags ──────────────────────────────────────── */}
      {hasBadges && tags && tags.length > 0 && (
        <div
          className={`flex flex-wrap gap-ds-8 items-center w-full ${
            isCentered ? 'justify-center' : ''
          }`}
        >
          {tags.map((tag) => (
            <DesignBadge key={tag}>{tag}</DesignBadge>
          ))}
        </div>
      )}

      {/* ── CTA slot ───────────────────────────────────────────── */}
      {showCta && (
        <>
          {ctaType === 'link' ? (
            <CaseStudyLink onClick={onCtaClick}>{ctaLabel}</CaseStudyLink>
          ) : (
            <DesignButton variant={buttonVariant} onClick={onCtaClick}>
              {ctaLabel}
            </DesignButton>
          )}
        </>
      )}
    </div>
  );
}
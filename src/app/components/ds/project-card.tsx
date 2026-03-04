import * as React from 'react';
import { type ReactNode } from 'react';
import { ProjectThumbnail } from './project-thumbnail';
import { ContentImage } from './content-image';
import { IPhoneMockup } from './iphone-mockup';
import { TechnicalSheet } from './technical-sheet';
import { MotionReveal } from './motion-reveal';
import type {
  TechnicalSheetAlign,
  TechnicalSheetCtaType,
  TechnicalSheetSize,
  TechnicalSheetSubtitleVariant,
} from './technical-sheet';

/* ========================================
   ProjectCard — Unified image + text layout primitive
   ========================================
   Consolidates the former ProjectCard and SolutionBlock into one
   component. Controls two orthogonal axes independently:

   LAYOUT AXIS (how image and text are arranged):
     'left'  → horizontal — image left, text right
     'right' → horizontal — text left, image right
     'top'   → vertical   — image top, text below

   IMAGE AXIS (visual treatment of the image):
     'thumbnail' → ProjectThumbnail: rounded container, hover-zoom +
                   gradient overlay. Used on portfolio listing cards.
     'editorial' → ContentImage: plain, full-bleed rounded image.
                   Used in case study solution sections.
     'mockup'    → IPhoneMockup: scalable iPhone 16 Natural Titanium SVG
                   frame with screen content + user-controlled frame
                   navigation. Use mockupFrames to provide screenshots.

   ANIMATION:
     scrollReveal={false} (default) — no scroll animation; the
       parent (e.g. MotionReveal in ProjectsSection) handles it.
     scrollReveal={true} — each column gets its own MotionReveal;
       used in case study editorial blocks where each block is
       independent and needs its own reveal.

   SPACING:
     spaced={true} — adds mb-ds-96 below the block. Useful when
       multiple ProjectCards are stacked without a parent gap.

   All TechnicalSheet slots are forwarded through:
     subtitle, subtitleVariant, title, description, sheetAlign,
     sheetSize, children (BulletList / custom content), tags,
     hasBadges, showCta, ctaType, ctaLabel, onCtaClick,
     buttonVariant.
   ======================================== */

export type ProjectCardLayout = 'left' | 'right' | 'top';
export type ProjectCardImageVariant = 'thumbnail' | 'editorial' | 'mockup';

interface ProjectCardProps {
  // ── Layout ──────────────────────────────────────────────────────────
  /** Arrangement of image vs text. Default: 'left' */
  layout?: ProjectCardLayout;
  /**
   * Adds mb-ds-96 below the block — use when stacking multiple
   * ProjectCards without a parent gap utility. Default: false
   */
  spaced?: boolean;
  /** className on the outer wrapper */
  className?: string;

  // ── Image (thumbnail / editorial variants) ───────────────────────────
  /**
   * Image source URL.
   * Required for 'thumbnail' and 'editorial' variants.
   * Not used when imageVariant='mockup' — use mockupFrames instead.
   */
  image?: string;
  /** Accessible alt text for the image */
  alt?: string;
  /**
   * Visual treatment of the image.
   * 'thumbnail' → ProjectThumbnail with hover-zoom & gradient overlay.
   * 'editorial' → ContentImage (plain rounded image, no hover effects).
   * 'mockup'    → IPhoneMockup (iPhone 16 SVG frame, use mockupFrames).
   * Default: 'thumbnail'
   */
  imageVariant?: ProjectCardImageVariant;
  /**
   * CSS aspect-ratio string passed to thumbnail and editorial variants.
   * Ignored for 'mockup' (the phone SVG has a fixed 390:804 aspect ratio).
   * Default: '4/3'
   */
  imageAspectRatio?: string;
  /**
   * Tailwind rounded class forwarded to ContentImage.
   * Only used when imageVariant='editorial'. Default: 'rounded-ds-xl'
   */
  imageRounded?: string;
  /**
   * Optional caption rendered below ContentImage.
   * Only used when imageVariant='editorial'.
   */
  imageCaption?: string;
  /**
   * className for the inner <img> element inside ProjectThumbnail.
   * Only used when imageVariant='thumbnail'.
   */
  imageClassName?: string;
  /**
   * Base zoom level applied to the image inside ProjectThumbnail.
   * Only used when imageVariant='thumbnail'. Default: 1
   */
  zoom?: number;

  // ── Mockup variant ──────────────────────────────────────────────────
  /**
   * Array of screenshot / frame image URLs or React nodes displayed inside the
   * iPhone 16 screen. Required when imageVariant='mockup'.
   * Single item → static screen. Multiple items → dot-navigable frames.
   * Accepts strings (image/video URLs) or ReactNode (e.g. <AssetInfoScreen />).
   */
  mockupFrames?: (string | ReactNode)[];
  /**
   * Max-width constraint for the IPhoneMockup column.
   * Accepts any CSS width value (e.g. '280px', '60%').
   * Default: '280px'
   */
  mockupMaxWidth?: string;
  /**
   * Controlled active-frame index for IPhoneMockup.
   * Omit to let the mockup manage its own state.
   */
  activeMockupFrame?: number;
  /**
   * Controlled callback — fires when the active mockup frame changes.
   * Use together with activeMockupFrame for external prototype control.
   */
  onMockupFrameChange?: (index: number) => void;

  // ── Text (TechnicalSheet) ────────────────────────────────────────────
  /** Eyebrow / label above the title */
  subtitle?: string;
  /**
   * How the subtitle is rendered.
   * 'eyebrow' → uppercase label-eyebrow (default — section headers).
   * 'label'   → label-sm (sub-sections, numbered steps like "01 — X").
   */
  subtitleVariant?: TechnicalSheetSubtitleVariant;
  /** Main heading (accepts plain string or rich ReactNode) */
  title: React.ReactNode;
  /** Body copy below the title (plain string or rich ReactNode) */
  description?: React.ReactNode;
  /** Horizontal alignment of the TechnicalSheet. Default: 'left' */
  sheetAlign?: TechnicalSheetAlign;
  /** Typography size variant of the TechnicalSheet. Default: component default */
  sheetSize?: TechnicalSheetSize;
  /**
   * Flexible content slot rendered below description inside the
   * TechnicalSheet: BulletList, stat grids, custom badges, etc.
   */
  children?: ReactNode;

  // ── Badges / Tags ────────────────────────────────────────────────────
  /** Skill / tag labels rendered as DesignBadge instances */
  tags?: string[];
  /**
   * Whether to show the badges row.
   * Defaults to true when tags are provided, false otherwise.
   */
  hasBadges?: boolean;

  // ── CTA ──────────────────────────────────────────────────────────────
  /**
   * Whether to show the CTA slot.
   * Defaults to true for horizontal layouts, false for 'top'.
   */
  showCta?: boolean;
  /** Which CTA component to render: 'link' (CaseStudyLink) or 'button'. Default: 'link' */
  ctaType?: TechnicalSheetCtaType;
  /** CTA label text. Default: 'View Case Study' */
  ctaLabel?: string;
  /** CTA click handler */
  onCtaClick?: () => void;
  /** DesignButton variant when ctaType='button'. Default: 'primary' */
  buttonVariant?: 'primary' | 'secondary';

  // ── Animation ────────────────────────────────────────────────────────
  /**
   * Wrap each column independently in a MotionReveal scroll-reveal.
   * Use true for case study editorial blocks; false (default) when the
   * parent already handles reveal animation.
   */
  scrollReveal?: boolean;
  /**
   * When true, shows a one-time swipe-up gesture hint inside the iPhone
   * screen once it enters the viewport. Forward to IPhoneMockup.
   * Only applies when imageVariant='mockup'. Default: false
   */
  scrollHint?: boolean;
}

export function ProjectCard({
  layout = 'left',
  spaced = false,
  className = '',
  image = '',
  alt = '',
  imageVariant = 'thumbnail',
  imageAspectRatio = '4/3',
  imageRounded,
  imageCaption,
  imageClassName,
  zoom,
  mockupFrames = [],
  mockupMaxWidth = '280px',
  activeMockupFrame,
  onMockupFrameChange,
  subtitle,
  subtitleVariant,
  title,
  description,
  sheetAlign = 'left',
  sheetSize,
  children,
  tags,
  hasBadges,
  showCta,
  ctaType = 'link',
  ctaLabel = 'View Case Study',
  onCtaClick,
  buttonVariant = 'primary',
  scrollReveal = false,
  scrollHint = false,
}: ProjectCardProps) {
  const isVertical = layout === 'top';
  const isRight = layout === 'right';
  const isMockup = imageVariant === 'mockup';

  /* Resolved defaults ------------------------------------------------- */
  const resolvedShowCta = showCta ?? !isVertical;
  const resolvedHasBadges = hasBadges ?? (!!tags && tags.length > 0);
  const spacingClass = spaced ? 'mb-ds-96' : '';

  /* ── Image content ─────────────────────────────────────────────────── */
  const imageContent = (() => {
    if (isMockup) {
      return (
        <div
          className="flex items-center justify-center w-full"
          style={{ padding: (!isVertical && scrollReveal) ? 'var(--ds-space-24) 0' : '0' }}
        >
          <div style={{ maxWidth: mockupMaxWidth, width: '100%' }}>
            <IPhoneMockup
              frames={mockupFrames}
              activeFrame={activeMockupFrame}
              onFrameChange={onMockupFrameChange}
              scrollHint={scrollHint}
            />
          </div>
        </div>
      );
    }
    if (imageVariant === 'editorial') {
      return (
        <ContentImage
          src={image}
          alt={alt}
          aspectRatio={imageAspectRatio}
          rounded={imageRounded}
          caption={imageCaption}
        />
      );
    }
    /* thumbnail (default) */
    return (
      <div
        className="relative w-full"
        style={{ aspectRatio: imageAspectRatio }}
      >
        <ProjectThumbnail
          src={image}
          alt={alt}
          className="w-full h-full"
          imageClassName={imageClassName}
          zoom={zoom}
        />
      </div>
    );
  })();

  /* ── Text content ──────────────────────────────────────────────────── */
  const textContent = (
    <TechnicalSheet
      align={sheetAlign}
      size={sheetSize}
      subtitleVariant={subtitleVariant}
      subtitle={subtitle ?? ''}
      title={title}
      description={description}
      tags={tags}
      hasBadges={resolvedHasBadges}
      showCta={resolvedShowCta}
      ctaType={ctaType}
      ctaLabel={ctaLabel}
      onCtaClick={onCtaClick}
      buttonVariant={buttonVariant}
    >
      {children}
    </TechnicalSheet>
  );

  /* ── Vertical (top) layout ─────────────────────────────────────────── */
  if (isVertical) {
    return (
      <div className={`flex flex-col gap-ds-24 items-start w-full ${spacingClass} ${className}`}>
        {scrollReveal ? (
          <>
            <MotionReveal type="scale" margin="-80px" className="w-full">
              {imageContent}
            </MotionReveal>
            <MotionReveal delay={0.15} margin="-80px" className="w-full">
              {textContent}
            </MotionReveal>
          </>
        ) : (
          <>
            {imageContent}
            {textContent}
          </>
        )}
      </div>
    );
  }

  /* ── Horizontal layouts (left / right) ─────────────────────────────── */

  /*
   * scrollReveal=true (editorial / case study mode):
   *   CSS grid, lg:grid-cols-2, gap-ds-64.
   *   Each column gets its own MotionReveal.
   *   For 'right': DOM order is textBlock → imageBlock; order utilities
   *   keep visual order identical on desktop while mobile sees text-first.
   *
   * scrollReveal=false (portfolio card mode):
   *   Flex row. For 'right': md:order-first swaps sheet before thumbnail
   *   without duplicating DOM.
   */
  if (scrollReveal) {
    const imgBlock = (
      <MotionReveal
        type="scale"
        margin="-80px"
        className={isRight ? 'lg:order-2' : undefined}
      >
        {imageContent}
      </MotionReveal>
    );
    const txtBlock = (
      <MotionReveal
        delay={0.15}
        margin="-80px"
        className={isRight ? 'lg:order-1' : undefined}
      >
        {textContent}
      </MotionReveal>
    );

    return (
      <div
        className={`relative grid lg:grid-cols-2 gap-ds-64 items-center ${spacingClass} ${className}`}
      >
        {isRight ? (
          <>{txtBlock}{imgBlock}</>
        ) : (
          <>{imgBlock}{txtBlock}</>
        )}
      </div>
    );
  }

  /* Default flex layout (portfolio cards) */
  return (
    <div
      className={`flex flex-col md:flex-row gap-ds-24 md:gap-ds-48 ${isMockup ? 'items-start' : 'items-center'} w-full ${spacingClass} ${className}`}
    >
      <div className="relative flex-1 min-h-0 min-w-0 w-full">
        {imageContent}
      </div>
      <div className={`flex-1 min-w-0 w-full ${isRight ? 'md:order-first' : ''}`}>
        {textContent}
      </div>
    </div>
  );
}
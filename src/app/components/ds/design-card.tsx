import * as React from 'react';
import { DesignArrow } from './design-arrow';
import { DesignThumbnail } from './design-thumbnail';

/**
 * Three card variants mapped from the Figma frame:
 *
 *   metric  — Large value + label (stats grid in About)
 *   skill   — Dark thumbnail + title + item list (Skills & Expertise in About)
 *   social  — Thumbnail + title/subtitle + hover arrow (social links in Contact)
 *   numbered — Accent-filled number pill + title + description (design constraints, principles)
 *
 * Uses 7 CSS variables from the design system (in theme.css):
 *   --dcard-bg              Metric idle background      (#f6f6f6 / surface-background)
 *   --dcard-bg-hover        Metric hover background     (#f3f3f3 / surface-card)
 *   --dcard-bg-content      Skill & Social background   (#ffffff / surface-page)
 *   --dcard-border          Default border color        (#d2d2d2 / border-subtle)
 *   --dcard-border-hover    Skill hover border (green)  (#52b47e / border-focus)
 *   --dcard-title           Title / value text color    (#141411 / text-primary)
 *   --dcard-description     Description / label color   (#6c6262 / text-secondary)
 *
 * Thumbnail rendering delegated to <DesignThumbnail /> (4 own CSS vars).
 */
export type DesignCardVariant = 'metric' | 'skill' | 'social' | 'numbered';

/* ------------------------------------------------------------------ */
/*  Discriminated-union props                                          */
/* ------------------------------------------------------------------ */

interface MetricCardProps {
  variant: 'metric';
  /** Optional heading rendered above the value, styled with Data / Compact */
  heading?: string;
  /** Controls the value text size: 'default' uses Data / Emphasis, 'compact' uses Data / Compact */
  size?: 'default' | 'compact';
  /** Large stat value, e.g. "50+" */
  value: string;
  /** Descriptive label, e.g. "Projects Completed" */
  label: string;
  className?: string;
}

interface SkillCardProps {
  variant: 'skill';
  /** Icon ReactNode rendered inside the dark thumbnail */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** List of skill items / descriptions */
  items: string[];
  className?: string;
}

interface SocialCardProps {
  variant: 'social';
  /** Icon ReactNode rendered inside the thumbnail */
  icon: React.ReactNode;
  /** Primary label (e.g. "GitHub") */
  title: string;
  /** Secondary text (e.g. "@username") */
  subtitle: string;
  className?: string;
}

interface NumberedCardProps {
  variant: 'numbered';
  /** Formatted number string rendered inside the accent pill, e.g. "01" */
  number: string;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  className?: string;
}

export type DesignCardProps = MetricCardProps | SkillCardProps | SocialCardProps | NumberedCardProps;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DesignCard(props: DesignCardProps) {
  const { variant, className = '' } = props;

  /* ---- Numbered card ---- */
  if (variant === 'numbered') {
    const { number, title, description } = props as NumberedCardProps;
    return (
      <div
        className={`flex flex-col gap-ds-12 p-ds-24 rounded-ds-md border border-dcard-border bg-dcard-bg-content h-full ${className}`}
      >
        <span
          className="ds-text-label-sm inline-flex items-center justify-center rounded-full"
          style={{
            width: 'var(--ds-space-32)',
            height: 'var(--ds-space-32)',
            background: 'var(--cs-accent)',
            color: 'var(--cs-accent-text)',
          }}
        >
          {number}
        </span>
        <p className="ds-text-heading-compact text-dcard-title">{title}</p>
        <p className="ds-text-body-compact text-dcard-description">{description}</p>
      </div>
    );
  }

  /* ---- Metric card ---- */
  if (variant === 'metric') {
    return (
      <div
        className={`group/card relative bg-dcard-bg hover:bg-dcard-bg-hover rounded-ds-md p-ds-32 flex flex-col gap-ds-8 items-start transition-colors duration-200 ${className}`}
      >
        {/* Border overlay — thickens to 2px on hover, no layout shift */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-ds-md border border-dcard-border transition-all duration-200 group-hover/card:border-2"
        />

        {props.heading && (
          <p
            className="ds-text-data-compact text-dcard-title w-full"
          >
            {props.heading}
          </p>
        )}
        <p
          className={`${(props as MetricCardProps).size === 'compact' ? 'ds-text-data-default' : 'ds-text-data-emphasis'} text-dcard-title w-full`}
        >
          {(props as MetricCardProps).value}
        </p>
        <p
          className="ds-text-body-compact text-dcard-description w-full"
        >
          {(props as MetricCardProps).label}
        </p>
      </div>
    );
  }

  /* ---- Skill card ---- */
  if (variant === 'skill') {
    const { icon, title, items } = props as SkillCardProps;
    return (
      <div
        className={`group/card relative bg-dcard-bg-content rounded-ds-md p-ds-24 flex flex-col gap-ds-16 items-start ${className}`}
      >
        {/* Border overlay — green + shadow on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-ds-md border border-dcard-border transition-all duration-200 group-hover/card:border-2 group-hover/card:border-dcard-border-hover group-hover/card:shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]"
        />

        {/* Thumbnail — always dark bg, white icon */}
        <DesignThumbnail variant="solid" icon={icon} />

        {/* Text container */}
        <div className="flex flex-col gap-ds-12 items-start w-full">
          <p className="ds-text-heading-compact text-dcard-title w-full">
            {title}
          </p>
          <div className="flex flex-col gap-ds-8 items-start w-full">
            {items.map((item) => (
              <p
                key={item}
                className="ds-text-body-compact text-dcard-description w-full"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---- Social card ---- */
  const { icon, title, subtitle } = props as SocialCardProps;

  return (
    <div
      className={`group/card relative bg-dcard-bg-content rounded-ds-md p-ds-24 flex gap-ds-16 items-center cursor-pointer ${className}`}
    >
      {/* Border overlay — shadow on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-ds-md border border-dcard-border transition-all duration-200 group-hover/card:shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]"
      />

      {/* Thumbnail — gray idle → dark on hover, icon color inverts */}
      <DesignThumbnail variant="interactive" icon={icon} />

      {/* Text container */}
      <div className="flex flex-1 flex-col gap-ds-8 items-start min-w-0">
        <p className="ds-text-heading-compact text-dcard-title w-full">
          {title}
        </p>
        <p className="ds-text-body-compact text-dcard-description w-full">
          {subtitle}
        </p>
      </div>

      {/* Arrow — fades in on hover */}
      <DesignArrow
        direction="up-right"
        size={24}
        color="var(--dcard-title)"
        className="shrink-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200"
      />
    </div>
  );
}
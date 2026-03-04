import * as React from 'react';
import { motion } from 'motion/react';
import { TechnicalSheet } from './technical-sheet';
import { ProjectMetadata } from './project-metadata';

interface ProjectOverviewProps {
  /** Eyebrow label above the title (defaults to "Descripción general") */
  subtitle?: string;
  /** Project title / tagline */
  title: string;
  /** Project description paragraph */
  description: string;
  /** Structured metadata rows (e.g. Cliente, Rol, Duración) */
  meta: { label: string; value: string }[];
  /** Optional tags section for the metadata sidebar */
  tags?: {
    /** Tags group label (defaults to "Herramientas") */
    label?: string;
    values: string[];
  };
  /** Optional className for the outer grid wrapper */
  className?: string;
}

/**
 * A reusable project overview section that composes TechnicalSheet (left)
 * and ProjectMetadata (right) into a responsive 2fr / 1fr grid layout
 * with staggered entrance animations.
 *
 * Used at the top of every case-study page, right below the hero.
 *
 * Layout: responsive grid — stacks on mobile, 2:1 columns on lg+
 * Animation: both columns fade-up on scroll, right column delayed by 0.15s
 */
export function ProjectOverview({
  subtitle = 'Descripción general',
  title,
  description,
  meta,
  tags,
  className = '',
}: ProjectOverviewProps) {
  const resolvedTags = tags
    ? { label: tags.label ?? 'Herramientas', values: tags.values }
    : undefined;

  return (
    <div
      className={`relative grid lg:grid-cols-[2fr_1fr] gap-ds-64 lg:gap-ds-96 ${className}`}
    >
      {/* ── Description (TechnicalSheet) ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        <TechnicalSheet
          size="small"
          subtitle={subtitle}
          title={title}
          description={description}
          hasBadges={false}
          showCta={false}
        />
      </motion.div>

      {/* ── Metadata sidebar ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <ProjectMetadata items={meta} tags={resolvedTags} />
      </motion.div>
    </div>
  );
}
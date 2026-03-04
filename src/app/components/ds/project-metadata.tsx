import * as React from 'react';
import { DesignBadge } from './design-badge';

interface MetadataItem {
  /** Row label (e.g. "Cliente", "Rol") */
  label: string;
  /** Row value */
  value: string;
}

interface ProjectMetadataProps {
  /** List of label → value rows rendered with bottom-border dividers */
  items: MetadataItem[];
  /** Optional tags section (e.g. tools, skills) rendered as DesignBadge instances */
  tags?: {
    label: string;
    values: string[];
  };
  /** Optional className for the outer wrapper */
  className?: string;
}

/**
 * A vertical metadata list for case-study / project pages.
 *
 * Structure (top → bottom, gap-ds-32):
 *   1. Repeating label/value rows — each separated by a subtle border
 *   2. Optional tags row — label + flex-wrapped DesignBadge instances
 *
 * All colors, spacing, and typography reference DS tokens from theme.css / index.css.
 */
export function ProjectMetadata({
  items,
  tags,
  className = '',
}: ProjectMetadataProps) {
  return (
    <div className={`flex flex-col gap-ds-32 w-full ${className}`}>
      {/* ── Label / Value rows ──────────────────────────────── */}
      {items.map((item) => (
        <div
          key={item.label}
          className="border-b border-ds-border-subtle pb-ds-16"
        >
          <p className="ds-text-label-sm text-ds-text-tertiary mb-ds-4">
            {item.label}
          </p>
          <p className="ds-text-heading-compact text-ds-text-primary">
            {item.value}
          </p>
        </div>
      ))}

      {/* ── Tags section ────────────────────────────────────── */}
      {tags && tags.values.length > 0 && (
        <div>
          <p className="ds-text-label-sm text-ds-text-tertiary mb-ds-12">
            {tags.label}
          </p>
          <div className="flex flex-wrap gap-ds-8">
            {tags.values.map((tag) => (
              <DesignBadge key={tag}>{tag}</DesignBadge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

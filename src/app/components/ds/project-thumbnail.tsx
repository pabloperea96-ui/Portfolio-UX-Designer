import * as React from 'react';

interface ProjectThumbnailProps {
  /** Image source URL */
  src: string;
  /** Accessible alt text for the image */
  alt: string;
  /** Optional className for the outer wrapper (use to control sizing) */
  className?: string;
  /** Optional className for the inner <img> element (use to override object-fit, object-position, etc.) */
  imageClassName?: string;
  /** Optional base zoom level (default 1). Applied via a wrapper so it doesn't conflict with the hover scale animation. */
  zoom?: number;
}

/**
 * A responsive image container with a bottom gradient overlay that fades in on hover.
 * Mapped from the Figma "ProjectThumbnail" component (Idle / Hovered variants).
 *
 * Sizing is controlled by the parent — the component fills both width and height
 * of whatever container it's placed in (`w-full h-full`).
 *
 * Uses a named Tailwind group (`group/thumbnail`) so the hover gradient is scoped
 * to this component and doesn't leak to parent group-hover contexts.
 *
 * Uses 3 CSS variables from the design system (in theme.css):
 *   --thumbnail-bg            Container background        (#ffffff)
 *   --thumbnail-radius        Border radius                (16px)
 *   --thumbnail-gradient-to   Gradient bottom stop color   (rgba(246,246,246,0.4))
 */
export function ProjectThumbnail({
  src,
  alt,
  className = '',
  imageClassName = 'inset-0 size-full object-cover object-top',
  zoom = 1,
}: ProjectThumbnailProps) {
  return (
    <div
      className={`group/thumbnail relative overflow-clip bg-thumbnail-bg ${className}`}
      style={{ borderRadius: 'var(--thumbnail-radius)' }}
    >
      {/* Zoom wrapper — scales independently so the hover animation still works */}
      <div
        className="absolute inset-0"
        style={zoom > 1 ? { transform: `scale(${zoom})` } : undefined}
      >
        {/* Image — fills the container; zoom < 1 uses object-contain to show full image */}
        <img
          alt={alt}
          className={`absolute pointer-events-none transition-transform duration-500 ease-out group-hover/thumbnail:scale-[1.02] ${zoom < 1 ? `inset-0 size-full object-contain object-center` : imageClassName}`}
          style={zoom < 1 ? { transform: `scale(${zoom})` } : undefined}
          src={src}
        />
      </div>

      {/* Gradient overlay — invisible at idle, fades in on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/thumbnail:opacity-100"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--thumbnail-gradient-to))`,
        }}
      />
    </div>
  );
}
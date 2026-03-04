/* ========================================
   QuoteBlock — Design System composition component
   ========================================
   Centered quote/reflection block used in case studies.

   Replaces the repeated pattern:
     <section bg-accent/30> centered quote with avatar icon,
     blockquote text, author name + subtitle
   ======================================== */

interface QuoteBlockProps {
  /** The quote text */
  quote: string;
  /** Author name */
  author: string;
  /** Author subtitle (e.g. "Reflexión del proyecto") */
  subtitle?: string;
  /** Additional className for the outer section */
  className?: string;
}

export function QuoteBlock({
  quote,
  author,
  subtitle,
  className,
}: QuoteBlockProps) {
  return (
    <div className={`text-center space-y-ds-32 ${className ?? ''}`}>
      <div className="ds-text-heading-page inline-flex items-center justify-center size-ds-64 bg-primary text-primary-foreground rounded-full">
        &quot;
      </div>
      <blockquote className="ds-text-heading-section">
        {quote}
      </blockquote>
      <div>
        <p className="ds-text-heading-compact">{author}</p>
        {subtitle && (
          <p className="ds-text-label-sm text-ds-text-tertiary">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
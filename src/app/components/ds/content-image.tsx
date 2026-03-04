/* ========================================
   ContentImage — Design System image primitive
   ========================================
   Renders a responsive image inside a rounded, overflow-hidden
   container with a configurable aspect ratio.

   Replaces the repeated pattern:
     <div className="aspect-[16/9] rounded-3xl overflow-hidden">
       <img src={...} alt={...} className="w-full h-full object-cover" />
     </div>

   Optionally renders a caption below the image.
   ======================================== */

interface ContentImageProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio value (e.g. '16/9', '4/3'). Default: '16/9' */
  aspectRatio?: string;
  /** Tailwind rounded class. Default: 'rounded-ds-xl' */
  rounded?: string;
  /** Optional caption text displayed below the image */
  caption?: string;
  /** Additional className for the outer wrapper */
  className?: string;
}

export function ContentImage({
  src,
  alt,
  aspectRatio = '16/9',
  rounded = 'rounded-ds-xl',
  caption,
  className,
}: ContentImageProps) {
  return (
    <div className={className}>
      <div
        className={`${rounded} overflow-hidden`}
        style={{ aspectRatio }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <p className="ds-text-label-sm text-ds-text-tertiary mt-ds-16 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}
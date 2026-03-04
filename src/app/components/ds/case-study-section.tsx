import { type ReactNode } from 'react';

/* ========================================
   CaseStudySection — Design System layout component
   ========================================
   Standard section wrapper for case study pages.
   Handles padding, max-width, and optional accent background.

   Replaces the repeated pattern:
     <section className="relative py-20 md:py-28 px-6 lg:px-12 [bg-accent/30]">
       <div className="relative max-w-7xl mx-auto">
         {children}
       </div>
     </section>
   ======================================== */

interface CaseStudySectionProps {
  children: ReactNode;
  /** Whether to use the accent background. Default: false */
  accent?: boolean;
  /** Additional className for the <section> element */
  className?: string;
  /** Optional id for anchor linking */
  id?: string;
}

export function CaseStudySection({
  children,
  accent = false,
  className,
  id,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className={`relative py-ds-72 md:py-ds-96 px-ds-24 lg:px-ds-48 ${
        accent ? 'bg-accent/30' : ''
      } ${className ?? ''}`}
    >
      <div className="relative max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
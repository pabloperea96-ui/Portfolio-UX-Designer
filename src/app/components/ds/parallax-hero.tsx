import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/* ========================================
   ParallaxHero — Design System composition component
   ========================================
   Full-viewport parallax hero with gradient overlay.
   Used at the top of case study pages.

   Replaces the identical pattern in CaseStudy + CaseStudyAudio:
     - useScroll/useTransform for parallax image
     - Gradient overlay from-background
     - Bottom-aligned content area with entrance animation
   ======================================== */

interface ParallaxHeroProps {
  /** Hero background image URL */
  image: string;
  /** Image alt text */
  alt: string;
  /** Content rendered at the bottom of the hero */
  children: ReactNode;
  /** Height class. Default: 'h-[85vh] md:h-[90vh]' */
  heightClass?: string;
}

export function ParallaxHero({
  image,
  alt,
  children,
  heightClass = 'h-[85vh] md:h-[90vh]',
}: ParallaxHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className={`relative ${heightClass} overflow-hidden`}>
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: heroY }}>
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </motion.div>

      {/* Bottom-aligned content */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative h-full flex flex-col justify-end px-ds-24 lg:px-ds-48 pb-ds-64 md:pb-ds-96 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}
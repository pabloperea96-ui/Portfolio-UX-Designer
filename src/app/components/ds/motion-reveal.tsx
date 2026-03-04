import { type ReactNode } from 'react';
import { motion, type Transition, type Variants } from 'motion/react';

/* ========================================
   MotionReveal — Design System animation primitive
   ========================================
   Wraps any content in a scroll-triggered (or mount-triggered)
   reveal animation. Replaces the ~80+ inline motion.div wrappers
   scattered across pages with a single reusable component.

   Supports 4 animation types:
   - slide-up   (opacity + translateY)     — default
   - scale      (opacity + scale)
   - fade       (opacity only)
   - slide-left (opacity + translateX)

   Trigger modes:
   - "inView" (default) — triggers on scroll via whileInView
   - "mount"            — triggers on component mount via animate
   ======================================== */

type AnimationType = 'slide-up' | 'scale' | 'fade' | 'slide-left';
type TriggerMode = 'inView' | 'mount';

interface MotionRevealProps {
  children: ReactNode;
  /** Animation preset. Default: 'slide-up' */
  type?: AnimationType;
  /** When to trigger the animation. Default: 'inView' */
  trigger?: TriggerMode;
  /** Delay in seconds. Default: 0 */
  delay?: number;
  /** Duration in seconds. Default varies by type (0.8 for slide/fade, 0.5 for scale) */
  duration?: number;
  /** Viewport margin for inView trigger. Default: '-100px' */
  margin?: string;
  /** Whether to animate only once. Default: true */
  once?: boolean;
  /** Additional className for the wrapper div */
  className?: string;
  /** HTML tag override — defaults to 'div'. Use 'article' for semantic purposes. */
  as?: 'div' | 'article' | 'section' | 'aside' | 'li';
}

/* Variant factories keyed by animation type */
const variantMap: Record<AnimationType, (delay: number, duration: number) => { initial: object; animate: object; transition: Transition }> = {
  'slide-up': (delay, duration) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: 'easeOut' },
  }),
  scale: (delay, duration) => ({
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration, delay, ease: 'easeOut' },
  }),
  fade: (delay, duration) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration, delay, ease: 'easeOut' },
  }),
  'slide-left': (delay, duration) => ({
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration, delay, ease: 'easeOut' },
  }),
};

/* Default durations per type */
const defaultDurations: Record<AnimationType, number> = {
  'slide-up': 0.8,
  scale: 0.5,
  fade: 0.8,
  'slide-left': 0.8,
};

/* Motion component map — one per supported HTML tag */
const motionComponents = {
  div: motion.div,
  article: motion.article,
  section: motion.section,
  aside: motion.aside,
  li: motion.li,
};

export function MotionReveal({
  children,
  type = 'slide-up',
  trigger = 'inView',
  delay = 0,
  duration,
  margin = '-100px',
  once = true,
  className,
  as = 'div',
}: MotionRevealProps) {
  const dur = duration ?? defaultDurations[type];
  const config = variantMap[type](delay, dur);

  const MotionTag = motionComponents[as];

  if (trigger === 'mount') {
    return (
      <MotionTag
        initial={config.initial}
        animate={config.animate}
        transition={config.transition}
        className={className}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial={config.initial}
      whileInView={config.animate}
      viewport={{ once, margin }}
      transition={config.transition}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

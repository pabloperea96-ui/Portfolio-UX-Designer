import { useState, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Navigation } from './Navigation';

/**
 * Freezes the outlet reference so AnimatePresence exit animations
 * render the OLD page content (not the new one).
 */
function FrozenOutlet() {
  const o = useOutlet();
  const [outlet] = useState(o);
  return <>{outlet}</>;
}

/**
 * Root layout: renders the global Navigation bar on all pages,
 * handles scroll-to-top on route change, and wraps page content
 * in AnimatePresence for crossfade transitions.
 */
export function RootLayout() {
  const location = useLocation();

  /* ── Scroll to top on route change ─────────────────────── */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-ds-text-primary font-ds-sans">
      <Navigation />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <FrozenOutlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
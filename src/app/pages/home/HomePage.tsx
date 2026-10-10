import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Hero } from './Hero';
import { StorySection } from './StorySection';
import { Contact } from './Contact';

/**
 * Home page — single-page portfolio with Hero, Projects, About, and Contact.
 *
 * Supports incoming `location.state.scrollTo` so Navigation links from
 * subpages can deep-link to a section (e.g. "about", "contact").
 */
export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      // Small delay to let the DOM paint after route transition
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <main className="relative">
      <Hero />
      <StorySection />
      <Contact />
    </main>
  );
}

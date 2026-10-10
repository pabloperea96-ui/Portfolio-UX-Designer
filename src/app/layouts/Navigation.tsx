import { motion } from 'motion/react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { NavButton } from '../components/ds/nav-button';
import { MobileNav } from '../components/ds/mobile-nav';
import { Chevron } from '../components/ds/chevron';
import { CASE_STUDY_TITLES } from '../pages/case-study/case-studies.config';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

/**
 * Global navigation bar — single adaptive bar for all routes.
 *
 * On Home (`/`):       Logo (left) + section NavButtons (right) with scroll-spy.
 * On subpages:         Logo (left) + inline breadcrumb trail (right).
 * Mobile subpages:     Logo (left) + compact back button (right).
 *
 * This replaces the previous dual-bar pattern (Navigation + BreadcrumbNav)
 * with a single fixed bar that adapts its right-side content based on route.
 * All wayfinding on subpages is handled inline via NavButton + Chevron,
 * eliminating the redundant BreadcrumbNav overlay from page-level code.
 */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollSection, setScrollSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  /* ── Close mobile menu on route change ─────────────────── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ── Scroll listener — glass effect + active section detection ─ */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isHome) return;

      const sections = ['home', 'story', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setScrollSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  /* ── Active section ID (Home scroll-spy only) ────────── */
  const activeId = isHome ? scrollSection : '';

  /* ── Home section click handler ────────────────────────── */
  const handleNavClick = useCallback(
    (sectionId: string, path?: string) => {
      if (path) {
        navigate(path);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setMobileOpen(false);
    },
    [navigate],
  );

  /* ── Logo click ──────────────────────────────────────────── */
  const handleLogoClick = useCallback(() => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  }, [isHome, navigate]);

  /* ── Section nav items (Home only) ───────────────────── */
  const navItems = [
    { id: 'home', label: 'Work', path: '/projects' },
    { id: 'story', label: 'About me' },
    { id: 'contact', label: 'Contact' },
  ];

  /* ── Breadcrumb items (subpages only) ────────────────── */
  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    if (isHome) return [];

    const { pathname } = location;

    // /projects → Portfolio > Todos los proyectos
    if (pathname === '/projects') {
      return [
        { label: 'Portfolio', onClick: () => navigate('/') },
        { label: 'Todos los proyectos' },
      ];
    }

    // /projects/:slug → Portfolio > [optional: Todos los proyectos] > Title
    const slugMatch = pathname.match(/^\/projects\/(.+)$/);
    if (slugMatch) {
      const slug = slugMatch[1];
      const title = CASE_STUDY_TITLES[slug] ?? slug;
      const fromAllProjects = searchParams.get('from') === 'allProjects';

      const items: BreadcrumbItem[] = [
        { label: 'Portfolio', onClick: () => navigate('/') },
      ];
      if (fromAllProjects) {
        items.push({
          label: 'Todos los proyectos',
          onClick: () => navigate('/projects'),
        });
      }
      items.push({ label: title });
      return items;
    }

    // Fallback (404, etc.)
    return [
      { label: 'Portfolio', onClick: () => navigate('/') },
      { label: 'Página no encontrada' },
    ];
  }, [isHome, location.pathname, searchParams, navigate]);

  /* ── Mobile back target (last clickable parent) ──────── */
  const mobileBackItem = useMemo((): BreadcrumbItem | null => {
    if (breadcrumbItems.length === 0) return null;
    // Single clickable item (e.g., 404 fallback) — use it directly
    if (breadcrumbItems.length === 1 && breadcrumbItems[0].onClick) {
      return breadcrumbItems[0];
    }
    // Walk backward to find the last clickable parent
    for (let i = breadcrumbItems.length - 2; i >= 0; i--) {
      if (breadcrumbItems[i].onClick) return breadcrumbItems[i];
    }
    return null;
  }, [breadcrumbItems]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 h-[80px] transition-all duration-300 backdrop-blur-[30px] ${
        scrolled
          ? 'bg-background/95 border-b border-solid border-ds-border-subtle'
          : 'bg-background/85'
      }`}
    >
      <div
        className="flex items-center justify-between h-full w-full px-ds-24"
        style={{
          '--ds-font-size-action-inline': 'var(--ds-font-size-body-default)',
          '--ds-tracking-action-inline': 'var(--ds-tracking-body-default)',
        } as React.CSSProperties}
      >
        {/* Home Button / Logo */}
        <motion.button
          onClick={handleLogoClick}
          className="text-ds-text-primary hover:opacity-70 transition-opacity cursor-pointer"
          style={{
            fontFamily: 'var(--ds-font-family)',
            fontSize: 'var(--ds-font-size-body-emphasis)',
            fontWeight: 600,
            letterSpacing: 'var(--ds-tracking-body-emphasis)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Pablo Perea Bohórquez
        </motion.button>

        {/* ── Right side: section links (Home) or breadcrumb (subpages) ── */}
        {isHome ? (
          <>
            {/* Desktop Section Links */}
            <div className="hidden md:flex items-baseline gap-ds-32">
              {navItems.map((item) => (
                <NavButton
                  key={item.id}
                  selected={activeId === item.id}
                  layoutId="activeSection"
                  onClick={() => handleNavClick(item.id, item.path)}
                >
                  {item.label}
                </NavButton>
              ))}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileNav
                items={navItems}
                activeId={activeId}
                onItemClick={(id: string) => {
                  const item = navItems.find((n) => n.id === id);
                  handleNavClick(id, item?.path);
                }}
                onLogoClick={handleLogoClick}
                open={mobileOpen}
                onOpenChange={setMobileOpen}
                trigger={
                  <button
                    className="ds-text-action-inline text-ds-text-secondary opacity-75 hover:opacity-100 transition-opacity cursor-pointer p-2"
                    aria-label="Abrir menú de navegación"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="block"
                    >
                      <path
                        d="M3 5H17M3 10H17M3 15H17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                }
              />
            </div>
          </>
        ) : (
          <>
            {/* Desktop Breadcrumb Trail */}
            <motion.div
              key={location.pathname + location.search}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="hidden md:flex items-center gap-ds-4"
            >
              {breadcrumbItems.map((item, index) => {
                const isFirst = index === 0;
                const isLast = index === breadcrumbItems.length - 1;
                return (
                  <div key={item.label} className="flex items-center gap-ds-4">
                    {!isFirst && (
                      <Chevron
                        direction="right"
                        size={14}
                        color="var(--nav-btn-text-idle)"
                      />
                    )}
                    <NavButton
                      icon={isFirst}
                      selected={isLast}
                      underline={false}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </NavButton>
                  </div>
                );
              })}
            </motion.div>

            {/* Mobile — Compact back button */}
            <div className="md:hidden">
              {mobileBackItem && (
                <NavButton
                  icon
                  underline={false}
                  onClick={mobileBackItem.onClick}
                >
                  {mobileBackItem.label}
                </NavButton>
              )}
            </div>
          </>
        )}
      </div>
    </motion.nav>
  );
}
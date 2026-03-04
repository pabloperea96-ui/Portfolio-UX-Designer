import { type ReactNode } from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '../ui/sheet';

/* ========================================
   MobileNav — Design System mobile navigation drawer
   ========================================
   Wraps shadcn's Sheet (Radix Dialog) with DS styling.
   The shadcn Sheet handles accessibility, focus trapping,
   keyboard nav, and animations — MobileNav adds the visual layer.

   Pages only import from ds/, never from ui/ directly.
   ======================================== */

interface NavItem {
  id: string;
  label: string;
}

interface MobileNavProps {
  /** The nav items to render */
  items: NavItem[];
  /** Currently active nav item id */
  activeId: string;
  /** Called when a nav item is clicked */
  onItemClick: (id: string) => void;
  /** Called when the logo/brand is clicked */
  onLogoClick: () => void;
  /** Controls open/closed state externally */
  open: boolean;
  /** Called when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Trigger button element */
  trigger: ReactNode;
}

export function MobileNav({
  items,
  activeId,
  onItemClick,
  onLogoClick,
  open,
  onOpenChange,
  trigger,
}: MobileNavProps) {
  const handleItemClick = (id: string) => {
    onItemClick(id);
    onOpenChange(false);
  };

  const handleLogoClick = () => {
    onLogoClick();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent
        side="right"
        className="bg-ds-surface-page border-l border-ds-border-subtle p-0 flex flex-col w-[280px] sm:max-w-[280px]"
      >
        {/* Accessible title (visually hidden) */}
        <SheetTitle className="sr-only">Navegación</SheetTitle>
        <SheetDescription className="sr-only">
          Menú de navegación del portfolio
        </SheetDescription>

        {/* Brand header */}
        <div className="px-ds-24 pt-ds-24 pb-ds-16 border-b border-ds-border-subtle">
          <button
            onClick={handleLogoClick}
            className="text-ds-text-primary cursor-pointer hover:opacity-70 transition-opacity"
            style={{
              fontSize: 'var(--ds-font-size-heading-compact)',
              fontWeight: 'var(--ds-font-weight-medium)',
              lineHeight: 'var(--ds-line-height-heading-compact)',
              letterSpacing: 'var(--ds-tracking-heading-compact)',
              fontFamily: 'var(--ds-font-family)',
            }}
          >
            Pablo Perea
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col px-ds-12 py-ds-16 gap-ds-4 flex-1">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full text-left px-ds-16 py-ds-12 rounded-ds-sm
                  transition-colors cursor-pointer
                  ${isActive
                    ? 'bg-ds-action-subtle text-ds-text-primary'
                    : 'text-ds-text-secondary hover:bg-ds-surface-background hover:text-ds-text-primary'
                  }
                `}
                style={{
                  fontFamily: 'var(--ds-font-family)',
                  fontSize: 'var(--ds-font-size-action-sm)',
                  fontWeight: isActive
                    ? 'var(--ds-font-weight-medium)'
                    : 'var(--ds-font-weight-regular)',
                  letterSpacing: 'var(--ds-tracking-action-button-df)',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-ds-24 py-ds-16 border-t border-ds-border-subtle">
          <a
            href="mailto:pabloperea96@gmail.com"
            className="text-ds-text-secondary hover:text-ds-text-primary transition-colors"
            style={{
              fontFamily: 'var(--ds-font-family)',
              fontSize: 'var(--ds-font-size-label-sm)',
              letterSpacing: 'var(--ds-tracking-label-sm)',
            }}
          >
            pabloperea96@gmail.com
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

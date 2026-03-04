import { type ReactNode } from 'react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../ui/tooltip';

/* ========================================
   DSTooltip — Design System tooltip wrapper
   ========================================
   Wraps shadcn's Tooltip (Radix) with DS token styling.
   Radix handles positioning, animations, accessibility,
   keyboard interactions, and focus management.

   Pages only import DSTooltip from ds/, never from ui/.

   Usage:
     <DSTooltip content="Más información sobre este campo">
       <span>Hover me</span>
     </DSTooltip>

     <DSTooltip content="Click para copiar" side="bottom">
       <button>Copiar</button>
     </DSTooltip>
   ======================================== */

interface DSTooltipProps {
  /** The trigger element — must accept a ref (native elements work, custom components need forwardRef) */
  children: ReactNode;
  /** Tooltip content — text string or JSX */
  content: ReactNode;
  /** Placement relative to trigger. Default: 'top' */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Offset from trigger in px. Default: 6 */
  sideOffset?: number;
  /** Delay before showing in ms. Default: 200 */
  delayDuration?: number;
  /** Additional className for the tooltip content */
  className?: string;
}

export function DSTooltip({
  children,
  content,
  side = 'top',
  sideOffset = 6,
  className,
}: DSTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        className={`
          bg-ds-surface-inverse text-ds-text-inverse
          px-ds-12 py-ds-8
          rounded-ds-sm
          max-w-[240px]
          ${className ?? ''}
        `}
        style={{
          fontFamily: 'var(--ds-font-family)',
          fontSize: 'var(--ds-font-size-label-sm)',
          fontWeight: 'var(--ds-font-weight-regular)',
          letterSpacing: 'var(--ds-tracking-label-sm)',
          lineHeight: 'normal',
        }}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

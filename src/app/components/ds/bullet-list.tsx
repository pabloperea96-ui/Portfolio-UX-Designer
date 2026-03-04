/* ========================================
   BulletList — Design System list primitive
   ========================================
   Renders a vertical list with DS-styled bullet dots.

   Replaces the repeated pattern in case studies:
     <ul className="space-y-3">
       {items.map(item => (
         <li className="flex items-start gap-3 ds-text-body-compact text-ds-text-secondary">
           <div className="w-1.5 h-1.5 rounded-full bg-ds-text-primary mt-2.5 shrink-0" />
           {item}
         </li>
       ))}
     </ul>
   ======================================== */

interface BulletListProps {
  items: string[];
  /** Additional className for the <ul> wrapper */
  className?: string;
}

export function BulletList({ items, className }: BulletListProps) {
  return (
    <ul className={`space-y-ds-12 ${className ?? ''}`}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-ds-12 ds-text-body-compact text-ds-text-secondary"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-ds-text-primary mt-ds-10 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
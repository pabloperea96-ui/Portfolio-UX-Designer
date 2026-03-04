import * as React from 'react';
import svgPaths from '../../../imports/svg-9rtxz66z85';

/**
 * All available icon names for DesignIcon.
 *
 * Design-specific:
 *   sparkle-orbit    — sparkle with orbital dots (design process)
 *   sparkle-motion   — sparkle with arc motion lines (interaction design)
 *   sparkles         — multiple sparkles/stars (AI/magic)
 *   palette          — color palette (design)
 *
 * Skill-related:
 *   code             — code brackets </>
 *   users            — people group
 *   zap              — lightning bolt
 *
 * Social / contact:
 *   mail             — envelope
 *   github           — GitHub logo
 *   linkedin         — LinkedIn logo
 */
export type DesignIconName =
  | 'sparkle-orbit'
  | 'sparkle-motion'
  | 'sparkles'
  | 'palette'
  | 'code'
  | 'users'
  | 'zap'
  | 'mail'
  | 'github'
  | 'linkedin';

interface DesignIconProps {
  /** Which icon to render */
  name: DesignIconName;
  /** Icon size in px (default 24) */
  size?: number;
  /** Icon color — defaults to currentColor so it inherits from parent text */
  color?: string;
  /** Additional className applied to the wrapper */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Individual icon renderers                                         */
/* ------------------------------------------------------------------ */

function SparkleOrbitPaths({ c }: { c: string }) {
  return (
    <g>
      <path d={svgPaths.p3513100} fill={c} />
      <path d={svgPaths.p3b3ba200} fill={c} />
      <path d={svgPaths.p3c056700} fill={c} />
      <path d={svgPaths.pe13e1f0} fill={c} />
      <path clipRule="evenodd" d={svgPaths.p394d2280} fill={c} fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.p39da7270} fill={c} fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.p1b15d900} fill={c} fillRule="evenodd" />
    </g>
  );
}

function SparkleMotionPaths({ c }: { c: string }) {
  return (
    <g>
      <path d={svgPaths.p21940080} fill={c} />
      <path d={svgPaths.p1c152470} fill={c} />
      <path d={svgPaths.p8f74780} fill={c} />
      <path d={svgPaths.p3adf05f0} fill={c} />
      <path clipRule="evenodd" d={svgPaths.p141e7e00} fill={c} fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.pba07200} fill={c} fillRule="evenodd" />
      <path d={svgPaths.paa91c80} fill={c} />
    </g>
  );
}

function SparklesPaths({ c }: { c: string }) {
  return (
    <g>
      <path d={svgPaths.p19234b00} fill={c} />
      <path d={svgPaths.p12a42300} fill={c} />
      <path d={svgPaths.p383fa000} fill={c} />
      <path clipRule="evenodd" d={svgPaths.p3518d200} fill={c} fillRule="evenodd" />
      <path d={svgPaths.p2ce87c80} fill={c} />
      <path d={svgPaths.paa91c80} fill={c} />
      <path d={svgPaths.p97fbf00} fill={c} />
      <path d={svgPaths.p13529b30} fill={c} />
    </g>
  );
}

function PalettePaths({ c }: { c: string }) {
  return (
    <g>
      <path d={svgPaths.p2476dfc0} fill={c} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.pf6f2500} fill={c} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p2f047a30} fill={c} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p7aea480} fill={c} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p3eb1d9c0} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </g>
  );
}

function CodePaths({ c }: { c: string }) {
  return (
    <g>
      <path d="M18 16L22 12L18 8" stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M6 8L2 12L6 16" stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M14.5 4L9.5 20" stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </g>
  );
}

function UsersPaths({ c }: { c: string }) {
  return (
    <g>
      <path d={svgPaths.p1d820380} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p161d4800} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p2981fe00} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p13e20900} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </g>
  );
}

function ZapPaths({ c }: { c: string }) {
  return (
    <g>
      <path d={svgPaths.p1b8b3180} stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </g>
  );
}

function MailPaths({ c }: { c: string }) {
  return (
    <g>
      <path d={svgPaths.p13ed3200} fill={c} />
    </g>
  );
}

function GithubPaths({ c }: { c: string }) {
  return (
    <g clipPath="url(#design-icon-github-clip)">
      <path clipRule="evenodd" d={svgPaths.p2599e8c0} fill={c} fillRule="evenodd" />
    </g>
  );
}

function LinkedinPaths({ c }: { c: string }) {
  return (
    <g>
      <path d={svgPaths.p10729b00} fill={c} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Icon path map                                                     */
/* ------------------------------------------------------------------ */

const iconMap: Record<DesignIconName, React.FC<{ c: string }>> = {
  'sparkle-orbit': SparkleOrbitPaths,
  'sparkle-motion': SparkleMotionPaths,
  sparkles: SparklesPaths,
  palette: PalettePaths,
  code: CodePaths,
  users: UsersPaths,
  zap: ZapPaths,
  mail: MailPaths,
  github: GithubPaths,
  linkedin: LinkedinPaths,
};

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

/**
 * Reusable icon component mapped from Figma's "Icon" instances.
 *
 * Uses SVG paths imported from the Figma export. Color defaults to
 * `currentColor` (inherits from parent text color, like lucide-react).
 *
 * Usage:
 *   <DesignIcon name="palette" />
 *   <DesignIcon name="github" size={20} color="var(--icon-foreground)" />
 *   <DesignIcon name="zap" className="w-5 h-5" />
 */
export function DesignIcon({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
}: DesignIconProps) {
  const Paths = iconMap[name];
  if (!Paths) return null;

  const needsClip = name === 'github';

  return (
    <svg
      className={`block shrink-0 ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Paths c={color} />
      {needsClip && (
        <defs>
          <clipPath id="design-icon-github-clip">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      )}
    </svg>
  );
}

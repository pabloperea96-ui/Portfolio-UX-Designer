import { motion } from 'motion/react';
import { useState, useId, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { Mouse } from 'lucide-react';

/* ========================================
   IPhoneMockup — iPhone 16 Natural Titanium SVG mockup
   ========================================
   A fully scalable SVG front-view of the iPhone 16 in Natural Titanium.

   ViewBox: 0 0 390 804
   ┌─ Derived from real iPhone 16 dimensions: 71.6 × 147.6 mm ─────────┐
   │  Scale factor: 390 / 71.6 = 5.447px per mm                        │
   │  Device body    : x=0.5,  y=0.5,  w=389,  h=803   rx=55           │
   │  Screen area    : x=14,   y=15,   w=362,  h=774   rx=44           │
   │  Dynamic Island : x=133,  y=29,   w=124,  h=37    rx=18.5         │
   │  Bezels         : 14px sides · 15px top / bottom                  │
   └────────────────────────────────────────────────────────────────────┘

   RENDERING ARCHITECTURE (3-layer stack):
     Layer 1 — Frame SVG   : device body, bezels, side buttons, screen
                              OLED black backdrop. Static, no content.
     Layer 2 — Content HTML: <img> or <video> absolutely positioned and
                              clipped to the screen area. Supports animated
                              GIFs and mp4/webm video natively.
     Layer 3 — Chrome SVG  : Dynamic Island + glass glare + home indicator
                              rendered on top of the content layer.

   MEDIA TYPE DETECTION:
     URLs ending in .mp4 / .webm / .mov / .m4v  → <video autoPlay loop muted>
     Everything else (jpg, png, gif, webp…)      → <img> (GIFs animate ✓)
     ReactNode (non-string)                       → rendered directly in a
       flex-column container, supporting scrollable React screens.

   FRAME COORDINATES (for the HTML content overlay):
     The screen rect x=14 y=15 w=362 h=774 maps to these percentages of
     the 390×804 viewBox, used for absolute CSS positioning:
       left   : 14/390  = 3.590%
       top    : 15/804  = 1.866%
       width  : 362/390 = 92.821%
       height : 774/804 = 96.269%
     Border-radius matches SVG rx=44 (relative to overlay element size):
       horizontal : 44/362 = 12.155%
       vertical   : 44/774 =  5.685%
       CSS        : border-radius: 12.155% / 5.685%

   NATURAL TITANIUM PALETTE:
     Warm matte gray-silver.  No cool blue tones.
     Light:  #DDDBD7   Mid:  #C0BEBC   Deep:  #AEACAA

   NAVIGATION:
     • Dot indicators below the phone (only rendered when frames.length > 1)
     • Left-half / right-half invisible click zones for tap/click navigation
     • Keyboard focusable, ARIA-labelled

   CONTROLLED / UNCONTROLLED:
     Uncontrolled (default): manages its own active-frame state.
     Controlled: pass activeFrame + onFrameChange to own the state externally
     (useful for prototype flow where a parent drives the current screen).
   ======================================== */

export interface IPhoneMockupProps {
  /** Array of screenshot / frame image URLs, video URLs, or React nodes
   *  displayed inside the screen.
   *  • string ending in .mp4/.webm/.mov/.m4v → <video autoPlay loop muted>
   *  • any other string                       → <img> (GIFs animate ✓)
   *  • ReactNode (non-string)                 → rendered directly */
  frames: (string | ReactNode)[];
  /** Optional outer-wrapper className (use for max-width / centering) */
  className?: string;
  /** Controlled active-frame index. Omit for uncontrolled. */
  activeFrame?: number;
  /** Controlled callback — fires when active frame should change */
  onFrameChange?: (index: number) => void;
  /**
   * When true, shows a persistent "Try scrolling" chip below the phone frame
   * with a slow bobbing animation. Use to signal that the ReactNode frame
   * contains scrollable content. Renders in the portfolio canvas layer,
   * never overlaid on the app screen.
   * Default: false
   */
  scrollHint?: boolean;
  /**
   * When true, enables interactive hotspot discovery:
   * 1. On first scroll-into-view, briefly highlights all `[data-hotspot]`
   *    elements inside the screen with a blue pulse (one-time entrance hint).
   * 2. When the user clicks the screen but misses a `[data-hotspot]` element,
   *    the hotspots flash again (Figma-style "click outside" hint).
   * Prototype screens must mark their interactive elements with the
   * `data-hotspot` HTML attribute for this to work.
   * Default: false
   */
  interactiveHint?: boolean;
}

/** Returns true if the frame is a plain string (image or video URL) */
function isStringFrame(frame: string | ReactNode): frame is string {
  return typeof frame === 'string';
}

/** Returns true if the URL points to a video file */
function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(src);
}

export function IPhoneMockup({
  frames,
  className = '',
  activeFrame,
  onFrameChange,
  scrollHint = false,
  interactiveHint = false,
}: IPhoneMockupProps) {
  /* ── Unique SVG id namespace (prevents defs collisions when multiple
        instances appear on the same page) ──────────────────────────── */
  const raw = useId();
  const uid = raw.replace(/:/g, 'u'); // e.g. ":r3:" → "ur3u"

  /* ── State ─────────────────────────────────────────────────────────── */
  const [internal, setInternal] = useState(0);
  const isControlled = activeFrame !== undefined;
  const idx = isControlled ? activeFrame : internal;
  const hasMultiple = frames.length > 1;

  const goTo = (i: number) => {
    const next = ((i % frames.length) + frames.length) % frames.length;
    if (!isControlled) setInternal(next);
    onFrameChange?.(next);
  };

  /* ── Interactive hint state ───────────────────────────────────────── */
  const screenRef = useRef<HTMLDivElement>(null);
  const entranceHintFired = useRef(false);
  const [showHotspots, setShowHotspots] = useState(false);
  const hotspotTimerRef = useRef<ReturnType<typeof setTimeout>>();

  /** Flash all [data-hotspot] elements for a duration, then fade out */
  const flashHotspots = useCallback(() => {
    if (hotspotTimerRef.current) clearTimeout(hotspotTimerRef.current);
    setShowHotspots(true);
    hotspotTimerRef.current = setTimeout(() => setShowHotspots(false), 1600);
  }, []);

  /* One-time entrance hint via IntersectionObserver */
  useEffect(() => {
    if (!interactiveHint || entranceHintFired.current) return;
    const el = screenRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !entranceHintFired.current) {
          entranceHintFired.current = true;
          // Small delay so the mockup is visually settled before the hint fires
          setTimeout(() => flashHotspots(), 800);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [interactiveHint, flashHotspots]);

  /* Click-outside handler: fires when user clicks screen but misses a hotspot */
  const handleScreenClick = useCallback(
    (e: React.MouseEvent) => {
      if (!interactiveHint) return;
      // Walk up from click target — if any ancestor has [data-hotspot], it's a hit
      let target = e.target as HTMLElement | null;
      while (target && target !== e.currentTarget) {
        if (target.hasAttribute('data-hotspot')) return; // hit a hotspot → do nothing
        target = target.parentElement;
      }
      // Missed all hotspots → flash them
      flashHotspots();
    },
    [interactiveHint, flashHotspots],
  );

  /* Cleanup timer on unmount */
  useEffect(() => () => {
    if (hotspotTimerRef.current) clearTimeout(hotspotTimerRef.current);
  }, []);

  /* ── Scoped CSS for hotspot highlighting ──────────────────────────── */
  const hotspotStyleId = `hs-${uid}`;

  /* ── Gradient / defs id aliases ────────────────────────────────────── */
  const gTitanium = `tg-${uid}`;
  const gEdgeHi   = `eh-${uid}`;
  const gBtn      = `bg-${uid}`;
  const gGlare    = `gl-${uid}`;

  /* ── Screen area as % of 390×804 viewBox (for HTML overlay) ────────── */
  const screen = {
    left   : '3.590%',
    top    : '1.866%',
    width  : '92.821%',
    height : '96.269%',
    radius : '12.155% / 5.685%',
  } as const;

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      style={{ userSelect: 'none' }}
    >
      {/* ── Scoped hotspot highlight styles ───────────────────────────── */}
      {interactiveHint && (
        <style>{`
          @keyframes ${hotspotStyleId}-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(24,119,242,0.55); }
            40%  { box-shadow: 0 0 0 4px rgba(24,119,242,0.35); }
            100% { box-shadow: 0 0 0 0 rgba(24,119,242,0); }
          }
          [data-hotspot-scope="${hotspotStyleId}"][data-hotspots-visible] [data-hotspot] {
            box-shadow: 0 0 0 3px rgba(24,119,242,0.6) !important;
            animation: ${hotspotStyleId}-pulse 1.4s ease-out forwards !important;
            position: relative;
            z-index: 50;
          }
        `}</style>
      )}

      {/* ── Outer container: all three layers share this coordinate space ── */}
      <div className="relative w-full">

        {/* ══════════════════════════════════════════════════════════════
            LAYER 1 — FRAME SVG
            Renders the physical device: body, bezels, side buttons, and
            the OLED-black screen backdrop. No content images here.
            ══════════════════════════════════════════════════════════════ */}
        <svg
          viewBox="0 0 390 804"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.22)) drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}
          role="img"
          aria-label="iPhone 16 mockup"
        >
          <defs>
            {/* Natural Titanium: warm matte gray-silver, lit top-left */}
            <linearGradient
              id={gTitanium}
              x1="0" y1="0" x2="390" y2="804"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor="#DDDBD7" />
              <stop offset="22%"  stopColor="#C8C6C2" />
              <stop offset="48%"  stopColor="#B6B4B0" />
              <stop offset="72%"  stopColor="#AEACAA" />
              <stop offset="100%" stopColor="#CACAC6" />
            </linearGradient>

            {/* Edge highlight: faint white top-left reflection */}
            <linearGradient id={gEdgeHi} x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.32" />
              <stop offset="50%"  stopColor="#FFFFFF" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Side buttons: horizontal pill sheen */}
            <linearGradient id={gBtn} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#8C8A87" />
              <stop offset="45%"  stopColor="#CACAC6" />
              <stop offset="100%" stopColor="#8C8A87" />
            </linearGradient>
          </defs>

          {/* ── Device body ───────────────────────────────────────────── */}
          <rect x="0.5" y="0.5" width="389" height="803" rx="55"
            fill={`url(#${gTitanium})`} />
          <rect x="0.5" y="0.5" width="389" height="803" rx="55"
            fill={`url(#${gEdgeHi})`} />
          <rect x="0.5" y="0.5" width="389" height="803" rx="55"
            stroke="#7E7C7A" strokeWidth="1" />

          {/* ── Inner-rim shadow (depth between bezel and screen) ─────── */}
          <rect x="11" y="11" width="368" height="782" rx="47"
            fill="none" stroke="#000000" strokeWidth="4" strokeOpacity="0.18" />

          {/* ── Screen OLED black backdrop ────────────────────────────── */}
          <rect x="14" y="15" width="362" height="774" rx="44" fill="#141416" />

          {/* ── Left side buttons ─────────────────────────────────────── */}
          {/* Action button */}
          <rect x="0" y="148" width="5" height="46" rx="2.5" fill={`url(#${gBtn})`} />
          <rect x="0.5" y="148.5" width="4" height="45" rx="2"
            stroke="#7A7876" strokeWidth="0.5" strokeOpacity="0.55" />
          {/* Volume Up */}
          <rect x="0" y="212" width="5" height="70" rx="2.5" fill={`url(#${gBtn})`} />
          <rect x="0.5" y="212.5" width="4" height="69" rx="2"
            stroke="#7A7876" strokeWidth="0.5" strokeOpacity="0.55" />
          {/* Volume Down */}
          <rect x="0" y="298" width="5" height="70" rx="2.5" fill={`url(#${gBtn})`} />
          <rect x="0.5" y="298.5" width="4" height="69" rx="2"
            stroke="#7A7876" strokeWidth="0.5" strokeOpacity="0.55" />

          {/* ── Right side buttons ────────────────────────────────────── */}
          {/* Side / Power */}
          <rect x="385" y="200" width="5" height="96" rx="2.5" fill={`url(#${gBtn})`} />
          <rect x="385.5" y="200.5" width="4" height="95" rx="2"
            stroke="#7A7876" strokeWidth="0.5" strokeOpacity="0.55" />
          {/* Camera Control */}
          <rect x="385" y="364" width="5" height="62" rx="2.5" fill={`url(#${gBtn})`} />
          <rect x="385.5" y="364.5" width="4" height="61" rx="2"
            stroke="#7A7876" strokeWidth="0.5" strokeOpacity="0.55" />
          {[376, 385, 394, 403, 412].map((cy) => (
            <circle key={cy} cx="387.5" cy={cy} r="1.2" fill="#B0AEAA" fillOpacity="0.8" />
          ))}
        </svg>

        {/* ══════════════════════════════════════════════════════════════
            LAYER 2 — CONTENT HTML
            <img> for images & GIFs (animates correctly unlike SVG <image>)
            <video> for mp4 / webm / mov — autoPlay, loop, muted
            Absolutely positioned to match the screen area in Layer 1.
            ══════════════════════════════════════════════════════════════ */}
        <div
          ref={screenRef}
          onClick={handleScreenClick}
          data-hotspot-scope={interactiveHint ? hotspotStyleId : undefined}
          {...(showHotspots ? { 'data-hotspots-visible': '' } : {})}
          style={{
            position : 'absolute',
            top      : screen.top,
            left     : screen.left,
            width    : screen.width,
            height   : screen.height,
            borderRadius : screen.radius,
            overflow : 'hidden',
          }}
        >
          {frames.map((frame, i) =>
            isStringFrame(frame) ? (
              isVideoSrc(frame) ? (
                <video
                  key={i}
                  src={frame}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position   : 'absolute',
                    inset      : 0,
                    width      : '100%',
                    height     : '100%',
                    objectFit  : 'cover',
                    opacity    : i === idx ? 1 : 0,
                    transition : 'opacity 0.35s ease',
                  }}
                />
              ) : (
                <img
                  key={i}
                  src={frame}
                  alt=""
                  style={{
                    position   : 'absolute',
                    inset      : 0,
                    width      : '100%',
                    height     : '100%',
                    objectFit  : 'cover',
                    opacity    : i === idx ? 1 : 0,
                    transition : 'opacity 0.35s ease',
                  }}
                />
              )
            ) : (
              /* ReactNode frame — rendered directly, supports scrollable screens */
              <div
                key={i}
                style={{
                  position   : 'absolute',
                  inset      : 0,
                  opacity    : i === idx ? 1 : 0,
                  transition : 'opacity 0.35s ease',
                  overflow   : 'hidden',
                }}
              >
                {frame}
              </div>
            )
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            LAYER 3 — CHROME SVG (floats above content)
            Dynamic Island, screen glass glare, home indicator.
            Uses pointer-events:none so clicks pass through to Layer 2
            and to the navigation buttons below.
            ══════════════════════════════════════════════════════════════ */}
        <svg
          viewBox="0 0 390 804"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position      : 'absolute',
            top           : 0,
            left          : 0,
            width         : '100%',
            height        : '100%',
            pointerEvents : 'none',
          }}
        >
          <defs>
            {/* Screen glass glare: faint radial bloom top-left */}
            <radialGradient
              id={gGlare}
              cx="20%" cy="8%" r="55%"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glass glare over screen */}
          <rect x="14" y="15" width="362" height="774" rx="44"
            fill={`url(#${gGlare})`} />
          {/* Hairline screen-edge stroke (glass feel) */}
          <rect x="14" y="15" width="362" height="774" rx="44"
            fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.1" />

          {/* Dynamic Island — pill shadow */}
          <rect x="131" y="27" width="128" height="41" rx="20"
            fill="#000000" fillOpacity="0.3" />
          {/* Dynamic Island — main pill */}
          <rect x="133" y="29" width="124" height="37" rx="18.5" fill="#000000" />
          {/* Front camera inside island */}
          <circle cx="232" cy="47.5" r="8"   fill="#0E1420" />
          <circle cx="232" cy="47.5" r="5.5" fill="#080C14" />
          <circle cx="232" cy="47.5" r="3"   fill="#060A10" />
          <circle cx="230" cy="45.5" r="1.4" fill="#1E2840" fillOpacity="0.55" />
          {/* Home indicator — only shown for image/video frames, not React screens */}
          {isStringFrame(frames[idx] ?? '') && (
            <rect x="130" y="773" width="130" height="5" rx="2.5"
              fill="#FFFFFF" fillOpacity="0.28" />
          )}
        </svg>

        {/* ── Transparent click zones for left/right frame navigation ─── */}
        {hasMultiple && (
          <>
            <button
              className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
              style={{ background: 'transparent', border: 'none', outline: 'none' }}
              onClick={() => goTo(idx - 1)}
              aria-label="Previous frame"
              tabIndex={0}
            />
            <button
              className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
              style={{ background: 'transparent', border: 'none', outline: 'none' }}
              onClick={() => goTo(idx + 1)}
              aria-label="Next frame"
              tabIndex={0}
            />
          </>
        )}
      </div>

      {/* ── Dot pagination ─────────────────────────────────────────────── */}
      {hasMultiple && (
        <div
          className="flex items-center gap-ds-8"
          style={{ marginTop: 'var(--ds-space-16)' }}
          role="tablist"
          aria-label="Frame navigation"
        >
          {frames.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Frame ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width      : i === idx ? 'var(--ds-space-16)' : 'var(--ds-space-8)',
                height     : 'var(--ds-space-8)',
                background : i === idx
                  ? 'var(--ds-text-primary)'
                  : 'var(--ds-text-tertiary)',
                border       : 'none',
                borderRadius : 'var(--ds-radius-pill)',
                cursor       : 'pointer',
                padding      : 0,
                transition   : 'width 0.3s ease, background 0.2s ease',
                flexShrink   : 0,
              }}
              onMouseEnter={(e) => {
                if (i !== idx)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    'var(--ds-text-secondary)';
              }}
              onMouseLeave={(e) => {
                if (i !== idx)
                  (e.currentTarget as HTMLButtonElement).style.background =
                    'var(--ds-text-tertiary)';
              }}
            />
          ))}
        </div>
      )}

      {/* ── Scroll hint chip — portfolio canvas layer, below the phone ── */}
      {scrollHint && (
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display      : 'inline-flex',
            alignItems   : 'center',
            gap          : 'var(--ds-space-8)',
            marginTop    : 'var(--ds-space-16)',
            padding      : 'var(--ds-space-4) var(--ds-space-12)',
            background   : 'var(--ds-surface-card)',
            border       : '1px solid var(--ds-border-subtle)',
            borderRadius : 'var(--ds-radius-pill)',
            color        : 'var(--ds-text-tertiary)',
            pointerEvents: 'none',
            userSelect   : 'none',
          }}
        >
          <Mouse size={12} strokeWidth={1.6} style={{ flexShrink: 0 }} />
          <span style={{
            fontSize  : '11px',
            lineHeight : 1,
            whiteSpace : 'nowrap',
            letterSpacing: '0.02em',
          }}>
            Haz scrolling
          </span>
        </motion.div>
      )}
    </div>
  );
}
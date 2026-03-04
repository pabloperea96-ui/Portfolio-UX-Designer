/**
 * Large-scale component exhibits for the Audio & Playback case study.
 *
 * These render OUTSIDE the phone mockup, directly on the case study page,
 * at a readable scale so recruiters can see the craft.
 *
 * Visual language:
 *   - Controls use the PROJECT's palette: IBM Plex Sans, #212226, #666A73, var(--cs-accent)
 *   - The accent color (--cs-accent) is set on the case study page root element
 *   - Annotations/labels use the PORTFOLIO's DS: Inter, --ds-text-tertiary, --ds-border-subtle
 *   - Containers use DS tokens for border, radius, spacing
 */

import type { CSSProperties, ReactNode } from 'react';

/* ── Project palette (used only inside exhibit specimens) ────── */
/* Note: accent color comes from --cs-accent, set on the CaseStudy page root */

const FONT = "'IBM Plex Sans', sans-serif";
const C = {
  primary: '#212226',
  secondary: '#666A73',
  toggleOff: '#D7D7D9',
  divider: 'rgba(0,0,0,0.06)',
  bg: '#F2F2F7',
  white: '#FCFCFC',
  trackBg: '#D1D1D6',
};

/* ── Shared exhibit building blocks ──────────────────────────── */

/** Label rendered in the portfolio's DS font, used for annotations */
function AnnotationLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`ds-text-label-sm text-ds-text-tertiary ${className}`}>
      {children}
    </span>
  );
}

/** Toggle rendered at exhibit scale — matches Figma ControlToggle dimensions */
function ExhibitToggle({ on, disabled = false, scale = 1 }: { on: boolean; disabled?: boolean; scale?: number }) {
  /* Figma: track 63×28 (inner KnobContainer 57×22 + 3px padding), knob ⌀22 */
  const w = 63 * scale;
  const h = 28 * scale;
  const knob = 22 * scale;
  const pad = 3 * scale;

  const trackBg = disabled
    ? C.toggleOff
    : on
      ? 'var(--cs-accent)'
      : C.toggleOff;

  const trackShadow = disabled
    ? 'none'
    : '-1px 0px 4px 0px rgba(0,0,0,0.25), 1px 1px 4px 0px rgba(0,0,0,0.25)';

  const knobColor = disabled ? '#9FA3A6' : C.white;

  /* Knob shadow matches Figma SVG filter: dilate 0.2 + blur 1 at 25% */
  const knobShadow = disabled
    ? 'none'
    : '0 0 2px 0.2px rgba(0,0,0,0.25)';

  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 30 * scale,
        background: trackBg,
        padding: pad,
        display: 'flex',
        alignItems: 'center',
        justifyContent: on && !disabled ? 'flex-end' : 'flex-start',
        transition: 'background 0.2s',
        flexShrink: 0,
        boxShadow: trackShadow,
      }}
    >
      <div
        style={{
          width: knob,
          height: knob,
          borderRadius: '50%',
          background: knobColor,
          boxShadow: knobShadow,
        }}
      />
    </div>
  );
}

/** Slider rendered at exhibit scale — matches Figma SliderContainer */
function ExhibitSlider({
  pct,
  active = false,
  labelLeft = 'Low',
  labelRight = 'High',
}: {
  pct: number;
  active?: boolean;
  labelLeft?: string;
  labelRight?: string;
}) {
  const trackColor = '#3C3D40';
  const fillColor = 'var(--cs-accent)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <span style={{ fontFamily: FONT, fontSize: 12, lineHeight: '18px', color: C.secondary, flexShrink: 0 }}>
        {labelLeft}
      </span>
      <div style={{ flex: 1, position: 'relative', height: 28 }}>
        {/* Track */}
        <div style={{ position: 'absolute', top: 12, left: 14, right: 14, height: 4, borderRadius: 10, background: trackColor }} />
        {/* Fill */}
        {pct > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: 14,
              width: `calc((100% - 28px) * ${pct / 100})`,
              height: 4,
              borderRadius: 10,
              background: active ? fillColor : trackColor,
            }}
          />
        )}
        {/* Knob */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `calc((100% - 28px) * ${pct / 100})`,
            width: 28,
            height: 28,
            borderRadius: 28,
            background: C.white,
            boxShadow: '0px 0px 2.2px 0px rgba(0,0,0,0.25)',
          }}
        />
      </div>
      <span style={{ fontFamily: FONT, fontSize: 12, lineHeight: '18px', color: C.secondary, flexShrink: 0 }}>
        {labelRight}
      </span>
    </div>
  );
}

/** Chevron + value display at exhibit scale */
function ExhibitValueChevron({ value, direction = 'right' }: { value: string; direction?: 'right' | 'down' | 'up' }) {
  /* Base path draws a right-pointing chevron; rotation handles direction */
  const rotation = direction === 'down' ? 0 : direction === 'up' ? 180 : 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: FONT, fontSize: 14, color: C.secondary, lineHeight: '20px' }}>{value}</span>
      <svg
        width={direction === 'right' ? 8 : 16}
        height={direction === 'right' ? 13 : 16}
        viewBox={direction === 'right' ? '0 0 8 13' : '0 0 16 16'}
        fill="none"
        style={{ flexShrink: 0 }}
      >
        {direction === 'right' ? (
          <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke={C.secondary} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <g transform={`rotate(${rotation} 8 8)`}>
            <path d="M4 6L8 10L12 6" stroke={C.secondary} strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </svg>
    </div>
  );
}

/** Static value text */
function ExhibitStaticValue({ value }: { value: string }) {
  return (
    <span style={{ fontFamily: FONT, fontSize: 16, color: C.secondary }}>{value}</span>
  );
}

/* ================================================================
   EXHIBIT 1 — Control Taxonomy Cards (2×2 grid)
   ================================================================ */

interface ControlCardProps {
  /** Type identifier */
  type: string;
  /** Human-friendly name */
  name: string;
  /** When to use this control */
  useCase: string;
  /** Rendered control specimen(s) */
  children: ReactNode;
}

function ControlCard({ type, name, useCase, children }: ControlCardProps) {
  return (
    <div
      className="rounded-ds-md border border-ds-border-subtle overflow-hidden flex flex-col"
      style={{ background: 'var(--ds-surface-page)' }}
    >
      {/* Specimen area — flexible, adapts to content */}
      <div
        className="flex items-center justify-center p-ds-32"
        style={{ background: C.bg, flex: '1 1 auto', minHeight: 140 }}
      >
        {children}
      </div>
      {/* Info area — fixed dimensions for consistency across all cards */}
      <div
        className="flex flex-col gap-ds-8 border-t border-ds-border-subtle"
        style={{ padding: 'var(--ds-space-24)', flexShrink: 0 }}
      >
        <div className="flex items-center gap-ds-8">
          <span
            className="ds-text-label-sm px-ds-8 py-[2px] rounded-ds-sm"
            style={{ background: 'var(--cs-accent)', color: C.primary }}
          >
            {type}
          </span>
          <span className="ds-text-heading-compact">{name}</span>
        </div>
        <p className="ds-text-body-compact text-ds-text-secondary">{useCase}</p>
      </div>
    </div>
  );
}

export function ControlTaxonomyGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-ds-24">
      {/* Binary — Toggle */}
      <ControlCard type="Binario" name="Toggle" useCase="Decisiones de dos estados: activar/desactivar una función. El usuario no necesita más información que el estado actual.">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <ExhibitToggle on={false} />
            <AnnotationLabel>Off</AnnotationLabel>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <ExhibitToggle on />
            <AnnotationLabel>On</AnnotationLabel>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <ExhibitToggle on={false} disabled />
            <AnnotationLabel>Disabled</AnnotationLabel>
          </div>
        </div>
      </ControlCard>

      {/* Continuous — Slider */}
      <ControlCard type="Continuo" name="Slider" useCase="Ajuste de un valor dentro de un rango. El feedback visual es inmediato — el usuario ve el cambio mientras arrastra.">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 280 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AnnotationLabel>Inactivo</AnnotationLabel>
            <ExhibitSlider pct={0} labelLeft="Low" labelRight="High" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AnnotationLabel>Activo</AnnotationLabel>
            <ExhibitSlider pct={37.5} active labelLeft="Low" labelRight="High" />
          </div>
        </div>
      </ControlCard>

      {/* Selection — Drill-down */}
      <ControlCard type="Selección" name="Drill-down" useCase="Opciones discretas que se revelan in-place. El chevron rota para señalar apertura/cierre. No navega — todo se resuelve sin salir de la pantalla.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
          {/* Collapsed row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AnnotationLabel>Colapsado</AnnotationLabel>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 16px',
                borderRadius: 10,
                background: 'white',
                border: `1px solid ${C.divider}`,
              }}
            >
              <span style={{ flex: 1, fontFamily: FONT, fontSize: 16, color: C.secondary }}>Velocidad de reproducción</span>
              <ExhibitValueChevron value="1x" direction="down" />
            </div>
          </div>
          {/* Expanded row with dropdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AnnotationLabel>Expandido</AnnotationLabel>
            <div
              style={{
                borderRadius: 10,
                background: 'white',
                border: `1px solid ${C.divider}`,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 16px',
                }}
              >
                <span style={{ flex: 1, fontFamily: FONT, fontSize: 16, color: C.secondary }}>Velocidad de reproducción</span>
                <ExhibitValueChevron value="1x" direction="up" />
              </div>
              <div style={{ padding: '0 16px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {['0.5x', '0.75x', '1x (Default)', '1.25x', '1.5x', '2x'].map((opt) => (
                  <div
                    key={opt}
                    style={{
                      fontFamily: FONT,
                      fontSize: 14,
                      lineHeight: '20px',
                      color: opt === '1x (Default)' ? C.primary : C.secondary,
                      fontWeight: opt === '1x (Default)' ? 500 : 400,
                      textAlign: 'right',
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ControlCard>

      {/* Navigation — Value display that navigates to sub-screen */}
      <ControlCard type="Navegación" name="Value + Chevron" useCase="Muestra el valor actual desde el cual se puede navegar a una segunda pantalla con otras opciones.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
          {/* Trigger row — full width, preserves horizontal row identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AnnotationLabel>Fila actual</AnnotationLabel>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 16px',
                borderRadius: 10,
                background: 'white',
                border: `1px solid ${C.divider}`,
              }}
            >
              <span style={{ flex: 1, fontFamily: FONT, fontSize: 16, color: C.secondary }}>Calidad de audio</span>
              <ExhibitValueChevron value="Automática" direction="right" />
            </div>
          </div>

          {/* Vertical connector — "Tap" label + down arrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, alignSelf: 'center' }}>
            <AnnotationLabel>Tap</AnnotationLabel>
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M6 13l6 6 6-6" stroke="var(--ds-border-default)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Destination sub-screen — vertically stacked to preserve row width */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AnnotationLabel>Sub-pantalla</AnnotationLabel>
            <div
              style={{
                borderRadius: 10,
                background: 'white',
                border: `1px solid ${C.divider}`,
                overflow: 'hidden',
              }}
            >
              {/* Back nav header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  gap: 6,
                  borderBottom: `1px solid ${C.divider}`,
                }}
              >
                <svg width={8} height={13} viewBox="0 0 8 13" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M6.5 1.5L1.5 6.5L6.5 11.5" stroke={C.secondary} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.primary }}>Calidad de audio</span>
              </div>
              {/* Selection list */}
              {['Automática', 'Calidad alta', 'Ahorro de datos'].map((opt, i) => (
                <div
                  key={opt}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    gap: 8,
                    borderBottom: i < 2 ? `1px solid ${C.divider}` : 'none',
                  }}
                >
                  <span style={{ flex: 1, fontFamily: FONT, fontSize: 14, color: C.secondary }}>{opt}</span>
                  {i === 0 && (
                    <svg width={14} height={10} viewBox="0 0 14 10" fill="none">
                      <path d="M1 5l4 4L13 1" stroke={C.secondary} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ControlCard>
    </div>
  );
}

/* ================================================================
   EXHIBIT 2 — Row Anatomy Diagram
   ================================================================ */

export function RowAnatomyExhibit() {
  const rowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minHeight: 44,
    padding: '0 16px',
    gap: 10,
    fontFamily: FONT,
    fontSize: 16,
    color: C.secondary,
    background: 'white',
    position: 'relative',
  };

  return (
    <div className="flex flex-col lg:flex-row gap-ds-32 items-stretch">
      {/* LEFT — Annotated anatomy diagram */}
      <div className="flex-1 min-w-0 w-full flex flex-col">
        <p className="ds-text-heading-compact mb-ds-16 text-ds-text-primary">Anatomía de una fila</p>
        <div className="rounded-ds-md border border-ds-border-subtle overflow-hidden flex-1 flex flex-col justify-center" style={{ background: C.bg }}>
          <div className="p-ds-24 md:p-ds-48">
            <div className="relative" style={{ maxWidth: 400, margin: '0 auto' }}>
              {/* The row specimen */}
              <div style={{ ...rowStyle, borderRadius: 12, border: '2px dashed var(--cs-accent)' }}>
                <span style={{ flex: 1 }}>Audio espacial</span>
                <ExhibitToggle on={false} />
              </div>

              {/* Annotations */}
              <div className="flex justify-between mt-ds-16">
                <div className="flex flex-col items-start gap-ds-4">
                  <div style={{ width: 1, height: 12, background: 'var(--ds-border-default)', marginLeft: 20 }} />
                  <AnnotationLabel>Left / Content</AnnotationLabel>
                  <span className="ds-text-label-sm" style={{ color: 'var(--cs-accent)' }}>Label del ajuste</span>
                </div>
                <div className="flex flex-col items-end gap-ds-4">
                  <div style={{ width: 1, height: 12, background: 'var(--ds-border-default)', marginRight: 32 }} />
                  <AnnotationLabel>Right / Content</AnnotationLabel>
                  <span className="ds-text-label-sm" style={{ color: 'var(--cs-accent)' }}>Control interactivo</span>
                </div>
              </div>

              {/* Height annotation */}
              <div className="absolute top-0 hidden md:flex items-center" style={{ left: -42, height: 44 }}>
                <div className="flex flex-col items-center" style={{ height: '100%' }}>
                  <div style={{ width: 1, flex: 1, background: 'var(--ds-border-default)' }} />
                  <AnnotationLabel className="py-ds-4 whitespace-nowrap -rotate-90 origin-center">44px min</AnnotationLabel>
                  <div style={{ width: 1, flex: 1, background: 'var(--ds-border-default)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — All 4 variants stacked, matching row width */}
      <div className="flex-1 min-w-0 w-full flex flex-col">
        <p className="ds-text-heading-compact mb-ds-16 text-ds-text-primary">Cuatro controles, una misma estructura</p>
        <div className="rounded-ds-md border border-ds-border-subtle overflow-hidden flex-1 flex flex-col justify-center" style={{ background: 'white' }}>
          {[
            { label: 'Reproducción automática', control: <ExhibitToggle on />, type: 'Binario' },
            { label: 'Crossfade', control: <ExhibitStaticValue value="0s" />, type: 'Continuo' },
            { label: 'Velocidad', control: <ExhibitValueChevron value="1x" direction="down" />, type: 'Selección' },
            { label: 'Calidad de audio', control: <ExhibitValueChevron value="Automática" direction="right" />, type: 'Navegación' },
          ].map((row, i, arr) => (
            <div key={row.label}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 44,
                  padding: '0 16px',
                  gap: 10,
                }}
              >
                <span style={{ flex: 1, fontFamily: FONT, fontSize: 16, color: C.secondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {row.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {row.control}
                  <span
                    className="ds-text-label-sm px-ds-8 py-[2px] rounded-ds-sm"
                    style={{ background: C.bg, color: C.secondary, whiteSpace: 'nowrap' }}
                  >
                    {row.type}
                  </span>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ height: 1, background: C.divider, marginLeft: 16 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   EXHIBIT 3 — Expand Interaction (Before / After)
   ================================================================ */

export function ExpandInteractionExhibit() {
  const containerStyle: CSSProperties = {
    background: 'white',
    borderRadius: 'var(--ds-radius-md)',
    border: '1px solid var(--ds-border-subtle)',
    overflow: 'hidden',
    flex: 1,
    minWidth: 0,
  };

  const rowBase: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    minHeight: 44,
    padding: '0 16px',
    gap: 10,
    fontFamily: FONT,
    fontSize: 16,
    color: C.secondary,
  };

  const dividerStyle: CSSProperties = {
    height: 1,
    background: C.divider,
    marginLeft: 16,
  };

  return (
    <div className="flex flex-col md:flex-row gap-ds-32 items-start">
      {/* BEFORE — collapsed */}
      <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
        <AnnotationLabel className="mb-ds-12 block">Estado colapsado</AnnotationLabel>
        <div style={containerStyle}>
          <div style={rowBase}>
            <span style={{ flex: 1 }}>Calidad de audio</span>
            <ExhibitValueChevron value="Automática" direction="right" />
          </div>
          <div style={dividerStyle} />
          {/* Velocidad — collapsed, highlighted */}
          <div
            style={{
              ...rowBase,
              background: 'color-mix(in srgb, var(--cs-accent) 5%, transparent)',
              borderLeft: '3px solid var(--cs-accent)',
            }}
          >
            <span style={{ flex: 1 }}>Velocidad de reproducción</span>
            <ExhibitValueChevron value="1x" direction="down" />
          </div>
          <div style={dividerStyle} />
          <div style={rowBase}>
            <span style={{ flex: 1 }}>Reproducción automática</span>
            <ExhibitToggle on scale={1} />
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-center self-center pt-ds-24">
        <svg width={32} height={32} viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="var(--ds-border-default)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* AFTER — expanded */}
      <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
        <AnnotationLabel className="mb-ds-12 block">Estado expandido</AnnotationLabel>
        <div style={containerStyle}>
          <div style={rowBase}>
            <span style={{ flex: 1 }}>Calidad de audio</span>
            <ExhibitValueChevron value="Automática" direction="right" />
          </div>
          <div style={dividerStyle} />
          {/* Velocidad — expanded, highlighted */}
          <div
            style={{
              background: 'color-mix(in srgb, var(--cs-accent) 5%, transparent)',
              borderLeft: '3px solid var(--cs-accent)',
            }}
          >
            <div style={rowBase}>
              <span style={{ flex: 1, fontWeight: 400, color: C.secondary }}>Velocidad de reproducción</span>
              <ExhibitValueChevron value="1x" direction="up" />
            </div>
            <div style={{ padding: '0 16px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['0.5x', '0.75x', '1x (Default)', '1.25x', '1.5x', '2x'].map((opt) => (
                <div
                  key={opt}
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    lineHeight: '20px',
                    color: C.secondary,
                    fontWeight: 400,
                    textAlign: 'right',
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
          <div style={dividerStyle} />
          <div style={rowBase}>
            <span style={{ flex: 1 }}>Reproducción automática</span>
            <ExhibitToggle on scale={1} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   EXHIBIT 4 — Decision Matrix
   ================================================================ */

export function DecisionMatrixExhibit() {
  const rows = [
    { setting: 'Reproducción automática', decision: 'On / Off', control: 'Binario — Toggle', reason: 'Dos estados posibles, sin matices' },
    { setting: 'Normalizar volumen', decision: 'On / Off', control: 'Binario — Toggle', reason: 'Dos estados posibles, sin matices' },
    { setting: 'Audio espacial', decision: 'On / Off', control: 'Binario — Toggle', reason: 'Dos estados posibles, sin matices' },
    { setting: 'Crossfade', decision: 'Rango 0s – 8s', control: 'Continuo — Slider', reason: 'Valor dentro de un rango continuo, se expande inline para ajustar' },
    { setting: 'Velocidad de reproducción', decision: '6 opciones discretas', control: 'Selección — Drill-down', reason: 'Opciones finitas se revelan in-place con chevron rotado' },
    { setting: 'Calidad de audio', decision: '3 opciones con contexto', control: 'Navegación — Value + Chevron', reason: 'Requiere sub-pantalla con descripciones adicionales' },
  ];

  return (
    <div className="rounded-ds-md border border-ds-border-subtle overflow-x-auto" style={{ background: 'white' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--ds-font-family)' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--ds-border-subtle)' }}>
            {['Ajuste', 'Tipo de decisión', 'Control elegido', 'Por qué'].map((h) => (
              <th
                key={h}
                className="ds-text-label-sm text-ds-text-tertiary"
                style={{ textAlign: 'left', padding: '12px 16px', whiteSpace: 'nowrap' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.setting} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--ds-border-subtle)' : 'none' }}>
              <td className="ds-text-body-compact" style={{ padding: '10px 16px', fontWeight: 500, color: C.primary, whiteSpace: 'nowrap' }}>
                {r.setting}
              </td>
              <td className="ds-text-body-compact text-ds-text-secondary" style={{ padding: '10px 16px' }}>
                {r.decision}
              </td>
              <td style={{ padding: '10px 16px' }}>
                <span
                  className="ds-text-label-sm px-ds-8 py-[3px] rounded-ds-sm"
                  style={{ background: C.bg, color: C.primary, whiteSpace: 'nowrap' }}
                >
                  {r.control}
                </span>
              </td>
              <td className="ds-text-body-compact text-ds-text-secondary" style={{ padding: '10px 16px' }}>
                {r.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
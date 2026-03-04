import { useState, useEffect, useRef } from 'react';
import UpperScrollComponent from '../../../../../imports/UpperScroll';
import LowerScrollComponent from '../../../../../imports/LowerScroll';
import svgPaths from '../../../../../imports/svg-ztvc1gtpbh';

/* ========================================
   AssetInfoScreen
   ========================================
   A scrollable phone screen component adapted from the Figma "Asset info"
   frame (393 × 1081 px). Designed to run inside IPhoneMockup as a
   ReactNode frame.

   LAYOUT ARCHITECTURE:
     The outer container (sized by IPhoneMockup's Layer 2) is measured with
     ResizeObserver. A CSS zoom is calculated as containerWidth / 393 and
     applied to the 393 px–wide inner flex column so everything scales
     proportionally while preserving Figma pixel values.

     ┌─────────────────────┐ ← outer container (100% × 100% of screen area)
     │  zoom: W/393        │
     │  ┌───────────────┐  │ ← inner column (393 px × calculated height)
     │  │ UpperScroll   │  │ ← flex-shrink: 0, height: 126px
     │  ├───────────────┤  │
     │  │ scrollable    │  │ ← flex: 1, overflow-y: auto
     │  │ content       │  │
     │  ├───────────────┤  │
     │  │ LowerScroll   │  │ ← flex-shrink: 0, height: 104px
     │  └───────────────┘  │
     └─────────────────────┘

   INTERACTIVE BEHAVIOUR:
     • Inline disclosure ("¿Por qué el apalancamiento es riesgoso?") is an
       accordion — collapsed by default, expands on tap and pushes content
       below it down naturally.
   ======================================== */

export function AssetInfoScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [innerHeight, setInnerHeight] = useState(840);
  const [disclosureOpen, setDisclosureOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const z = width / 393;
      setZoom(z);
      setInnerHeight(height / z);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#ffffff' }}
    >
      {/* ── Zoomed inner column ─────────────────────────────────────── */}
      <div
        style={{
          zoom,
          width: '393px',
          height: `${innerHeight}px`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#ffffff',
        }}
      >
        {/* ── HEADER — UpperScroll (status bar + nav bar) ───────────── */}
        <div style={{ flexShrink: 0, height: '126px', position: 'relative', zIndex: 20 }}>
          <UpperScrollComponent />
        </div>

        {/* ── SCROLLABLE CONTENT ────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Title + market data */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '24px',
                  color: '#010440',
                  letterSpacing: '0.48px',
                  margin: 0,
                }}
              >
                IBEXAE.XC
              </p>
              <p
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#010440',
                  opacity: 0.5,
                  letterSpacing: '0.32px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  margin: 0,
                }}
              >
                Amundi IBEX 35 Doble Apalancado Diario (2x)
              </p>
            </div>
            <div style={{ height: '1px', background: '#CAC4D0' }} />
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                letterSpacing: '0.32px',
                margin: 0,
              }}
            >
              <span style={{ color: '#010440' }}>USD 66.69 </span>
              <span style={{ color: '#27bc62' }}>+3.23%</span>
            </p>
            <div style={{ height: '1px', background: '#CAC4D0' }} />
          </div>

          {/* Chart — grid columns + price line overlay + time periods */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ position: 'relative', display: 'flex', gap: '10px', height: '171px' }}>
              {/* Grid: 5 equal columns × 4 rows */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  position: 'relative',
                }}
              >
                {[0, 1, 2, 3, 4].map((col) => (
                  <div
                    key={col}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                  >
                    {[0, 1, 2, 3].map((row) => (
                      <div
                        key={row}
                        style={{
                          flex: 1,
                          border: '0.277px solid #1a1a1a',
                          opacity: 0.15,
                        }}
                      />
                    ))}
                  </div>
                ))}
                {/* Price line overlay — fills the grid area */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                  }}
                >
                  <svg
                    viewBox="0 0 335.618 155.88"
                    fill="none"
                    preserveAspectRatio="none"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  >
                    <path
                      d={svgPaths.p394ad900}
                      stroke="#BF4124"
                      strokeWidth="1.10624"
                    />
                  </svg>
                </div>
              </div>
              {/* Price range labels */}
              <div
                style={{
                  width: '10.5px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: '8.85px',
                  color: '#010440',
                  textAlign: 'center',
                  letterSpacing: '0.177px',
                  paddingBottom: '4px',
                }}
              >
                {['68', '65', '63', '60'].map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </div>
            {/* Time period selector */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 22px 0 13px',
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: '8.85px',
                color: '#010440',
                letterSpacing: '0.177px',
              }}
            >
              {['1D', '1W', '1M', '3M', '6M', 'YTD', '1Y'].map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          </div>

          {/* ETF Components */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                color: '#010440',
                letterSpacing: '0.32px',
                margin: 0,
              }}
            >
              Componentes del ETF
            </p>
            <div style={{ background: '#f2dfdf', borderRadius: '10px', padding: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: '12px',
                  color: '#010440',
                  letterSpacing: '0.24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>
                  <span>Compañías principales</span>
                  <span>Participación</span>
                </div>
                {[
                  ['Iberdrola', '14.27%'],
                  ['Inditex', '13.03%'],
                  ['Santander', '12.01%'],
                ].map(([name, pct]) => (
                  <div
                    key={name}
                    style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 400 }}
                  >
                    <span>{name}</span>
                    <span>{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                color: '#010440',
                letterSpacing: '0.32px',
                margin: 0,
              }}
            >
              2x Apalancamiento
            </p>
            <div
              style={{
                background: '#3b5d8c',
                borderRadius: '13px',
                padding: '4px 12px',
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: '9px',
                  color: '#f3f3f3',
                  letterSpacing: '0.18px',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                MAYOR VOLATILIDAD
              </p>
            </div>
          </div>

          {/* Inline disclosure — accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Trigger row */}
            <button
              onClick={() => setDisclosureOpen((o) => !o)}
              data-hotspot
              style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'flex-end',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                textAlign: 'left',
                width: '100%',
                borderRadius: '6px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#010440',
                  letterSpacing: '0.32px',
                  flex: 1,
                }}
              >
                ¿Por qué el apalancamiento es riesgoso?
              </span>
              {/* Chevron — rotates on open/close */}
              <svg
                viewBox="0 0 13.0375 7.7875"
                fill="none"
                style={{
                  width: '12px',
                  height: '12px',
                  flexShrink: 0,
                  marginBottom: '3px',
                  transform: disclosureOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.25s ease',
                }}
              >
                <path
                  d={svgPaths.p18a77600}
                  stroke="#010440"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5375"
                />
              </svg>
            </button>

            {/* Divider */}
            <div style={{ height: '1px', background: '#CAC4D0' }} />

            {/* Expandable content */}
            {disclosureOpen && (
              <ul
                style={{
                  listStyleType: 'disc',
                  paddingLeft: '21px',
                  margin: 0,
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#010440',
                  letterSpacing: '0.28px',
                  lineHeight: 1.55,
                }}
              >
                <li style={{ marginBottom: '8px' }}>
                  Las ganancias y las pérdidas fluctúan el doble con respecto al índice base.
                </li>
                <li>
                  Productos apalancados pueden ser más difíciles de vender durante periodos de
                  tensión en el mercado.
                </li>
              </ul>
            )}
          </div>

          {/* Index info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                color: '#010440',
                letterSpacing: '0.32px',
                margin: 0,
              }}
            >
              Sobre el índice IBEX 35
            </p>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                color: '#010440',
                letterSpacing: '0.32px',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              El IBEX 35 (Índice Bursátil Español) es el índice de referencia del mercado de
              valores de la Bolsa de Madrid, la principal bolsa de valores de España, que
              inició en 1992.
            </p>
          </div>
        </div>

        {/* ── FOOTER — LowerScroll (Invertir button) ────────────────── */}
        <div style={{ flexShrink: 0, height: '104px', position: 'relative', zIndex: 20 }}>
          <LowerScrollComponent />
        </div>
      </div>
    </div>
  );
}
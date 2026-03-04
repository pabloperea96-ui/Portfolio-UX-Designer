import { useState, useEffect, useRef } from 'react';
import svgPaths from '../../../../../imports/svg-o07bc2xmc3';
import { imgBlur } from '../../../../../imports/svg-9hejq';

// SVG path constants
const CHEVRON_LEFT = svgPaths.p149c2a00;
const WIFI_PATH = svgPaths.p18b35300;
const CELLULAR_PATH = svgPaths.p1e09e400;
const BATTERY_CAP = svgPaths.p7a14d80;

// ---- Status Bar ----
function StatusBar() {
  return (
    <div
      style={{
        height: '62px',
        width: '393px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#ffffff',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '21px 24px 19px',
          width: '100%',
          gap: '154px',
        }}
      >
        <div style={{ flex: '1 0 0', display: 'flex', justifyContent: 'center' }}>
          <span
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 590,
              fontSize: '17px',
              lineHeight: '22px',
              color: '#000',
            }}
          >
            9:41
          </span>
        </div>
        <div style={{ flex: '1 0 0', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
            <svg width="19.2" height="12.226" viewBox="0 0 19.2 12.2264" fill="none">
              <path clipRule="evenodd" d={CELLULAR_PATH} fill="#000" fillRule="evenodd" />
            </svg>
            <svg width="17.14" height="12.33" viewBox="0 0 17.1417 12.3283" fill="none">
              <path clipRule="evenodd" d={WIFI_PATH} fill="#000" fillRule="evenodd" />
            </svg>
            <svg width="27.328" height="13" viewBox="0 0 27.328 13" fill="none">
              <rect height="12" opacity="0.35" rx="3.8" stroke="#000" width="24" x="0.5" y="0.5" />
              <path d={BATTERY_CAP} fill="#000" opacity="0.4" />
              <rect fill="#000" height="9" rx="2.5" width="21" x="2" y="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Nav Bar ----
function NavBar() {
  return (
    <div
      style={{
        height: '64px',
        width: '393px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '4px 20px',
      }}
    >
      <div
        style={{
          width: '29px',
          height: '29px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(90deg)',
        }}
      >
        <svg width="17.4" height="10.15" viewBox="0 0 17.4 10.15" fill="none">
          <path
            d={CHEVRON_LEFT}
            stroke="#010440"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.9"
          />
        </svg>
      </div>
    </div>
  );
}

// ---- Main exported component ----
export function RiskClarificationScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [innerHeight, setInnerHeight] = useState(790);

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
      <div
        style={{
          zoom,
          width: '393px',
          height: innerHeight + 'px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Fixed header: status bar + nav bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '393px',
            zIndex: 20,
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            background: 'rgba(255,255,255,0.95)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <StatusBar />
          <NavBar />
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: '146px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '120px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Title block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 700,
                fontSize: '24px',
                letterSpacing: '0.48px',
                color: '#010440',
                margin: 0,
                lineHeight: 'normal',
              }}
            >
              Inversion apalancada
            </p>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                letterSpacing: '0.32px',
                color: '#010440',
                opacity: 0.5,
                margin: 0,
                lineHeight: 'normal',
              }}
            >
              Este ETF tiene un apalancamiento 2x, lo que amplifica los retornos.
            </p>
          </div>

          {/* Card 1: leverage effects list */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                letterSpacing: '0.32px',
                color: '#010440',
                margin: '0 0 8px 0',
                lineHeight: 'normal',
              }}
            >
              Cada dia, tus ganancias y perdidas seran el doble del indice:
            </p>
            <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  letterSpacing: '0.32px',
                  color: '#010440',
                  lineHeight: 'normal',
                }}
              >
                Indice +5% → tu inversion +10%
              </li>
              <li
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  letterSpacing: '0.32px',
                  color: '#010440',
                  lineHeight: 'normal',
                }}
              >
                Indice -5% → tu inversion -10%
              </li>
            </ul>
          </div>

          {/* Card 2: volatility warning */}
          <div>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                letterSpacing: '0.32px',
                color: '#010440',
                margin: 0,
                lineHeight: 'normal',
              }}
            >
              En mercados volatiles, puedes perder dinero incluso si el IBEX termina sin cambios.
            </p>
          </div>
        </div>

        {/* Fixed footer: Continuar + Volver */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '393px',
            height: '104px',
            zIndex: 20,
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            padding: '20px 16px',
          }}
        >
          {/* Blur backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                background: '#fff',
                mixBlendMode: 'screen',
                opacity: 0.9,
                maskImage: `url('${imgBlur}')`,
                WebkitMaskImage: `url('${imgBlur}')`,
              }}
            />
          </div>

          {/* Continuar button */}
          <div
            style={{
              flex: 1,
              background: 'rgba(3,29,64,0.9)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                letterSpacing: '0.32px',
                color: '#f2dfdf',
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              Continuar
            </p>
          </div>

          {/* Volver button */}
          <div
            style={{
              flex: 1,
              background: '#f2dfdf',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                letterSpacing: '0.32px',
                color: '#010440',
                margin: 0,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              Volver
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
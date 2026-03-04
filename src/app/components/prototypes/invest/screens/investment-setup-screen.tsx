import { useState, useEffect, useRef } from 'react';
import svgPaths from '../../../../../imports/svg-zymc35igio';
import imgEllipse165 from 'figma:asset/d245925c51aab3660e4a193918eecafa250e39b6.png';

// SVG paths from the Figma token file
const CHEVRON_UP = svgPaths.p11bb1900;
const WIFI_PATH = svgPaths.p18b35300;
const CELLULAR_PATH = svgPaths.p1e09e400;
const INFO_PATH = svgPaths.p2717400;
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
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          background: '#ffffff',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '154px',
          padding: '21px 24px 19px',
          width: '361px',
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

// ---- Main exported component ----
export function InvestmentSetupScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [innerHeight, setInnerHeight] = useState(790);
  const [simulatorOpen, setSimulatorOpen] = useState(true);

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
      style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#e8eef5' }}
    >
      <div
        style={{
          zoom,
          width: '393px',
          height: innerHeight + 'px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#e8eef5',
        }}
      >
        {/* Header */}
        <div style={{ flexShrink: 0, zIndex: 20, position: 'relative' }}>
          <StatusBar />
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {/* Bottom sheet */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '38px 38px 0 0',
              boxShadow: '0px 15px 75px 0px rgba(0,0,0,0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              paddingBottom: '24px',
              width: '393px',
              minHeight: '100%',
            }}
          >
            {/* Toolbar: grabber + title */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '10px' }}>
              <div style={{ padding: '5px 0 0', height: '16px', display: 'flex', alignItems: 'center' }}>
                <div style={{ background: '#ccc', height: '5px', width: '36px', borderRadius: '100px' }} />
              </div>
              <div style={{ position: 'relative', width: '100%', height: '44px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: 0,
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(120,120,128,0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M1 1L11 11M11 1L1 11"
                        stroke="#999"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
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
                    Comprar
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 16px' }}>

              {/* Asset row */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <img
                  src={imgEllipse165}
                  alt="IBEXAE"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0 }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: '14px', color: '#010440', letterSpacing: '0.28px', margin: 0 }}>
                      IBEXAE.XC
                    </p>
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '14px', color: '#010440', letterSpacing: '0.28px', margin: 0 }}>
                      USD 66.69
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '12px', color: '#010440', opacity: 0.5, letterSpacing: '0.24px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '211px', margin: 0 }}>
                      Amundi IBEX 35 Doble Apalancado Diario (2x)
                    </p>
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '10px', color: '#27bc62', letterSpacing: '0.2px', flex: 1, textAlign: 'right', margin: 0 }}>
                      +3,23%
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount + Leverage card */}
              <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #d8d8d8', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: '18px', color: '#010440', letterSpacing: '0.36px', margin: 0 }}>
                    Monto
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: '18px', color: '#010440', letterSpacing: '0.36px', margin: 0 }}>
                      USD
                    </p>
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: '18px', color: '#010440', letterSpacing: '0.36px', margin: 0 }}>
                      50.00
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '14px', color: '#010440', letterSpacing: '0.28px', margin: 0 }}>
                    Apalancamiento
                  </p>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '14px', color: '#000', letterSpacing: '0.28px', margin: 0 }}>
                    2X
                  </p>
                </div>
              </div>

              {/* Shares data card */}
              <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #d8d8d8', padding: '20px' }}>
                <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '16px', color: '#010440', letterSpacing: '0.32px', textAlign: 'center', margin: 0 }}>
                  0.75 Acciones | USD 100.00 Exposicion
                </p>
              </div>

              {/* Simulator accordion */}
              <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #d8d8d8', overflow: 'hidden' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px 20px' }}>
                  <button
                    onClick={() => setSimulatorOpen(function(prev) { return !prev; })}
                    data-hotspot
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%', borderRadius: '6px' }}
                  >
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '16px', color: '#010440', letterSpacing: '0.32px', margin: 0 }}>
                      Simula tu inversion
                    </p>
                    <svg
                      viewBox="0 0 14.1 8.1"
                      fill="none"
                      style={{ width: '14px', height: '14px', flexShrink: 0, transform: simulatorOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.25s ease' }}
                    >
                      <path d={CHEVRON_UP} stroke="#010440" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1" />
                    </svg>
                  </button>

                  {simulatorOpen && (
                    <div style={{ background: '#ffffff', borderRadius: '10px', border: '1px solid #d8d8d8', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '14px', color: '#031d40', opacity: 0.6, letterSpacing: '0.28px', margin: 0 }}>
                        Desliza para ver diferentes escenarios
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '12px', color: '#010440', letterSpacing: '0.24px', textAlign: 'center', margin: 0 }}>
                          IBEX 35 en 3 meses
                        </p>
                        <div style={{ position: 'relative', height: '28px', display: 'flex', alignItems: 'center' }}>
                          <div style={{ flex: 1, height: '4px', background: '#d0dae9', borderRadius: '10px', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', background: '#010440', borderRadius: '10px' }} />
                            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '28px', height: '28px', background: '#fff', borderRadius: '50%', border: '0.5px solid #010440', boxShadow: '0 0 2.2px rgba(0,0,0,0.25)' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '12px', letterSpacing: '0.24px' }}>
                          <span style={{ color: '#bf4124' }}>-30%</span>
                          <span style={{ color: '#27bc62' }}>+30%</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '12px', color: '#010440', letterSpacing: '0.24px', textAlign: 'center', margin: 0 }}>
                          Tus USD 50 serian
                        </p>
                        <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '18px', color: '#010440', letterSpacing: '0.36px', textAlign: 'center', margin: 0 }}>
                          USD 47.50
                        </p>
                        <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '14px', color: '#bf4124', letterSpacing: '0.28px', textAlign: 'center', margin: 0 }}>
                          -5%
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '12px', color: '#010440', letterSpacing: '0.24px', margin: 0 }}>
                            Comparacion
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '12px', color: '#010440', opacity: 0.5, letterSpacing: '0.24px', margin: 0 }}>
                              Sin apalancamiento
                            </p>
                            <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '12px', color: '#010440', opacity: 0.5, letterSpacing: '0.24px', margin: 0 }}>
                              USD 50.00
                            </p>
                          </div>
                        </div>
                        <div style={{ height: '1px', background: '#010440', opacity: 0.06, width: '100%' }} />
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
                          <svg viewBox="0 0 10 10" fill="none" style={{ width: '12px', height: '12px', flexShrink: 0, marginTop: '1px' }}>
                            <path d={INFO_PATH} opacity="0.5" stroke="#010440" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '12px', color: '#031d40', opacity: 0.6, letterSpacing: '0.24px', margin: 0, lineHeight: 1.5 }}>
                            Por el movimiento diario del mercado, tu retorno puede no ser exactamente el doble del indice.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '16px', color: '#010440', letterSpacing: '0.32px', margin: 0 }}>
                    Tipo de compra
                  </p>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '16px', color: '#010440', letterSpacing: '0.32px', margin: 0 }}>
                    Compra de acciones
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '16px', color: '#010440', letterSpacing: '0.32px', margin: '0 0 8px' }}>
                      Cargo por compra
                    </p>
                    <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '12px', color: '#010440', letterSpacing: '0.24px', margin: 0 }}>
                      Para productos apalancados
                    </p>
                  </div>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '16px', color: '#010440', letterSpacing: '0.32px', margin: 0 }}>
                    USD 5.00
                  </p>
                </div>
                <div style={{ height: '1px', background: '#CAC4D0', opacity: 0.5 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '16px', color: '#010440', letterSpacing: '0.32px', margin: 0 }}>
                    Fondos disponibles
                  </p>
                  <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '16px', color: '#010440', letterSpacing: '0.32px', margin: 0 }}>
                    USD 125
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer: Comprar button */}
        <div style={{ flexShrink: 0, height: '104px', position: 'relative', zIndex: 20 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #ffffff 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-start', padding: '20px 16px' }}>
            <div style={{ flex: 1, background: 'rgba(3,29,64,0.9)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
              <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: '16px', color: '#f2dfdf', letterSpacing: '0.32px', margin: 0, textAlign: 'center' }}>
                Comprar
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
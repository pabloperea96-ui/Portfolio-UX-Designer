/**
 * Prototype screens for the "Ajustes de Audio y Reproducción" case study.
 *
 * These React components render inside IPhoneMockup as navigable frames.
 * They replicate the actual Figma prototype's visual language:
 *   - Font: IBM Plex Sans (the app's UI font, not the portfolio's Inter)
 *   - Colors: #212226 (primary), #666A73 (secondary), #F0C70E (accent/active)
 *   - Dark status bar, grouped settings rows, expandable controls
 *
 * Each screen is a self-contained 390×844 layout (iPhone viewport).
 */

import { useState, type CSSProperties } from 'react';

/* ── Shared constants ─────────────────────────────────────────── */

const FONT = "'IBM Plex Sans', sans-serif";
const COLOR = {
  primary: '#212226',
  secondary: '#666A73',
  disabled: '#9FA3A6',
  accent: '#F0C70E',
  toggleOff: '#D7D7D9',
  surface: '#FFFFFF',
  divider: 'rgba(0,0,0,0.06)',
  bg: '#F2F2F7',
};

const base: CSSProperties = {
  fontFamily: FONT,
  color: COLOR.secondary,
  background: COLOR.bg,
  width: '100%',
  minHeight: '100%',
  fontSize: 16,
  lineHeight: '22px',
  WebkitFontSmoothing: 'antialiased',
};

/* ── Shared sub-components ────────────────────────────────────── */

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ padding: '0 16px', marginBottom: 2 }}>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 18,
          fontWeight: 500,
          color: COLOR.primary,
          lineHeight: '22px',
        }}
      >
        {children}
      </span>
    </div>
  );
}

function SettingRow({
  label,
  right,
  expandedContent,
  showDivider = true,
}: {
  label: string;
  right: React.ReactNode;
  expandedContent?: React.ReactNode;
  showDivider?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          minHeight: 44,
          padding: '0 16px',
          gap: 10,
        }}
      >
        <span style={{ flex: 1, fontFamily: FONT, fontSize: 16, lineHeight: '22px', color: COLOR.secondary }}>
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{right}</div>
      </div>
      {expandedContent && <div style={{ padding: '0 16px', paddingBottom: 8 }}>{expandedContent}</div>}
      {showDivider && (
        <div style={{ height: 1, background: COLOR.divider, marginLeft: 16 }} />
      )}
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      style={{
        width: 51,
        height: 31,
        borderRadius: 30,
        background: on ? COLOR.accent : COLOR.toggleOff,
        padding: 2,
        display: 'flex',
        alignItems: on ? 'center' : 'center',
        justifyContent: on ? 'flex-end' : 'flex-start',
        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.04)',
        transition: 'background 0.2s',
      }}
    >
      <div
        style={{
          width: 27,
          height: 27,
          borderRadius: '50%',
          background: '#FCFCFC',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width={8} height={13} viewBox="0 0 8 13" fill="none">
      <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke={COLOR.secondary} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ValueChevron({ value }: { value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={{ fontFamily: FONT, fontSize: 14, color: COLOR.secondary, lineHeight: '20px' }}>{value}</span>
      <ChevronRight />
    </div>
  );
}

function Slider({
  min,
  max,
  value,
  leftLabel,
  rightLabel,
  active = false,
}: {
  min: number;
  max: number;
  value: number;
  leftLabel: string;
  rightLabel: string;
  active?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const fillColor = active ? COLOR.accent : COLOR.disabled;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 28 }}>
      <span style={{ fontFamily: FONT, fontSize: 12, color: COLOR.secondary, minWidth: 16, textAlign: 'center' }}>
        {leftLabel}
      </span>
      <div style={{ flex: 1, position: 'relative', height: 4 }}>
        <div style={{ width: '100%', height: 4, borderRadius: 10, background: '#3C3D40' }} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${pct}%`,
            height: 4,
            borderRadius: 10,
            background: fillColor,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#FCFCFC',
            boxShadow: '0 0 2px rgba(0,0,0,0.25)',
          }}
        />
      </div>
      <span style={{ fontFamily: FONT, fontSize: 12, color: COLOR.secondary, minWidth: 16, textAlign: 'center' }}>
        {rightLabel}
      </span>
    </div>
  );
}

/* ── Screen 1: Default state (all collapsed) ──────────────────── */

export function ScreenDefault() {
  return (
    <div style={base}>
      <div style={{ height: 52 }} />
      {/* Title */}
      <div style={{ padding: '0 16px', paddingBottom: 12 }}>
        <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: '#000', lineHeight: '34px' }}>
          Reproducción y Audio
        </span>
      </div>

      {/* Playback section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionLabel>Reproducción</SectionLabel>
        <SettingRow label="Velocidad de reproducción" right={<ValueChevron value="1x" />} />
        <SettingRow label="Crossfade" right={<span style={{ fontFamily: FONT, fontSize: 14, color: COLOR.secondary }}>0s</span>} />
        <SettingRow label="Reproducción automática" right={<Toggle on />} showDivider={false} />
      </div>

      <div style={{ height: 24 }} />

      {/* Audio section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionLabel>Audio</SectionLabel>
        <SettingRow label="Audio Quality" right={<ValueChevron value="Automática" />} />
        <SettingRow label="Normalize Volume" right={<Toggle on={false} />} />
        <SettingRow label="Spatial Audio" right={<Toggle on={false} />} />
        <SettingRow label="Equalizer" right={<ValueChevron value="Off" />} showDivider={false} />
      </div>
    </div>
  );
}

/* ── Screen 2: Crossfade slider expanded ──────────────────────── */

export function ScreenCrossfade() {
  return (
    <div style={base}>
      <div style={{ height: 52 }} />
      <div style={{ padding: '0 16px', paddingBottom: 12 }}>
        <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: '#000', lineHeight: '34px' }}>
          Reproducción y Audio
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionLabel>Reproducción</SectionLabel>
        <SettingRow label="Velocidad de reproducción" right={<ValueChevron value="1x" />} />
        {/* Crossfade expanded */}
        <SettingRow
          label="Crossfade"
          right={null}
          expandedContent={
            <Slider min={0} max={8} value={3} leftLabel="0s" rightLabel="8s" active />
          }
        />
        <SettingRow label="Reproducción automática" right={<Toggle on />} showDivider={false} />
      </div>

      <div style={{ height: 24 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionLabel>Audio</SectionLabel>
        <SettingRow label="Audio Quality" right={<ValueChevron value="Automática" />} />
        <SettingRow label="Normalize Volume" right={<Toggle on={false} />} />
        <SettingRow label="Spatial Audio" right={<Toggle on={false} />} />
        <SettingRow label="Equalizer" right={<ValueChevron value="Off" />} showDivider={false} />
      </div>
    </div>
  );
}

/* ── Screen 3: Audio Quality sub-screen ───────────────────────── */

export function ScreenAudioQuality() {
  return (
    <div style={base}>
      <div style={{ height: 52 }} />
      {/* Back nav */}
      <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <svg width={10} height={17} viewBox="0 0 10 17" fill="none">
          <path d="M8.5 1.5L2 8.5L8.5 15.5" stroke={COLOR.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: FONT, fontSize: 16, color: COLOR.accent }}>Reproducción y Audio</span>
      </div>
      <div style={{ padding: '0 16px', paddingBottom: 12 }}>
        <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: '#000', lineHeight: '34px' }}>
          Calidad de audio
        </span>
      </div>

      {/* Quality options */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[
          { label: 'Automática', desc: 'Ajusta la calidad según tu conexión', selected: true },
          { label: 'Baja', desc: '96 kbps · Menor consumo de datos', selected: false },
          { label: 'Normal', desc: '160 kbps · Calidad estándar', selected: false },
          { label: 'Alta', desc: '320 kbps · Mayor calidad', selected: false },
          { label: 'Muy alta', desc: 'Calidad sin pérdida · Solo WiFi', selected: false },
        ].map((opt, i, arr) => (
          <div key={opt.label}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT, fontSize: 16, color: opt.selected ? COLOR.primary : COLOR.secondary, lineHeight: '22px', fontWeight: opt.selected ? 500 : 400 }}>
                  {opt.label}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 12, color: COLOR.secondary, lineHeight: '16px', marginTop: 2 }}>
                  {opt.desc}
                </div>
              </div>
              {opt.selected && (
                <svg width={18} height={14} viewBox="0 0 18 14" fill="none">
                  <path d="M1 7L6.5 12.5L17 1.5" stroke={COLOR.accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            {i < arr.length - 1 && <div style={{ height: 1, background: COLOR.divider, marginLeft: 16 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Screen 4: Some toggles changed ───────────────────────────── */

export function ScreenTogglesChanged() {
  return (
    <div style={base}>
      <div style={{ height: 52 }} />
      <div style={{ padding: '0 16px', paddingBottom: 12 }}>
        <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: '#000', lineHeight: '34px' }}>
          Reproducción y Audio
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionLabel>Reproducción</SectionLabel>
        <SettingRow label="Velocidad de reproducción" right={<ValueChevron value="1.5x" />} />
        <SettingRow
          label="Crossfade"
          right={null}
          expandedContent={
            <Slider min={0} max={8} value={5} leftLabel="0s" rightLabel="8s" active />
          }
        />
        <SettingRow label="Reproducción automática" right={<Toggle on={false} />} showDivider={false} />
      </div>

      <div style={{ height: 24 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionLabel>Audio</SectionLabel>
        <SettingRow label="Audio Quality" right={<ValueChevron value="Alta" />} />
        <SettingRow label="Normalize Volume" right={<Toggle on />} />
        <SettingRow label="Spatial Audio" right={<Toggle on />} />
        <SettingRow label="Equalizer" right={<ValueChevron value="Rock" />} showDivider={false} />
      </div>
    </div>
  );
}

/* ── Interactive demo: full prototype ─────────────────────────── */

export function InteractivePrototype() {
  const [autoplay, setAutoplay] = useState(true);
  const [normalizeVol, setNormalizeVol] = useState(false);
  const [spatialAudio, setSpatialAudio] = useState(false);
  const [crossfadeVal, setCrossfadeVal] = useState(0);
  const [showCrossfade, setShowCrossfade] = useState(false);

  return (
    <div style={base}>
      <div style={{ height: 52 }} />
      <div style={{ padding: '0 16px', paddingBottom: 12 }}>
        <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 600, color: '#000', lineHeight: '34px' }}>
          Reproducción y Audio
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionLabel>Reproducción</SectionLabel>
        <SettingRow label="Velocidad de reproducción" right={<ValueChevron value="1x" />} />
        <div>
          <div
            style={{ display: 'flex', alignItems: 'center', minHeight: 44, padding: '0 16px', gap: 10, cursor: 'pointer' }}
            onClick={() => setShowCrossfade(!showCrossfade)}
            data-hotspot
          >
            <span style={{ flex: 1, fontFamily: FONT, fontSize: 16, lineHeight: '22px', color: COLOR.secondary }}>
              Crossfade
            </span>
            {!showCrossfade && (
              <span style={{ fontFamily: FONT, fontSize: 14, color: COLOR.secondary }}>{crossfadeVal}s</span>
            )}
          </div>
          {showCrossfade && (
            <div style={{ padding: '4px 16px 12px' }}>
              <input
                type="range"
                min={0}
                max={8}
                value={crossfadeVal}
                onChange={(e) => setCrossfadeVal(Number(e.target.value))}
                data-hotspot
                style={{
                  width: '100%',
                  accentColor: COLOR.accent,
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontSize: 12, color: COLOR.secondary, marginTop: 4 }}>
                <span>0s</span>
                <span>{crossfadeVal}s</span>
                <span>8s</span>
              </div>
            </div>
          )}
          <div style={{ height: 1, background: COLOR.divider, marginLeft: 16 }} />
        </div>
        <SettingRow
          label="Reproducción automática"
          right={
            <div onClick={() => setAutoplay(!autoplay)} style={{ cursor: 'pointer' }} data-hotspot>
              <Toggle on={autoplay} />
            </div>
          }
          showDivider={false}
        />
      </div>

      <div style={{ height: 24 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SectionLabel>Audio</SectionLabel>
        <SettingRow label="Audio Quality" right={<ValueChevron value="Automática" />} />
        <SettingRow
          label="Normalize Volume"
          right={
            <div onClick={() => setNormalizeVol(!normalizeVol)} style={{ cursor: 'pointer' }} data-hotspot>
              <Toggle on={normalizeVol} />
            </div>
          }
        />
        <SettingRow
          label="Spatial Audio"
          right={
            <div onClick={() => setSpatialAudio(!spatialAudio)} style={{ cursor: 'pointer' }} data-hotspot>
              <Toggle on={spatialAudio} />
            </div>
          }
        />
        <SettingRow label="Equalizer" right={<ValueChevron value="Off" />} showDivider={false} />
      </div>
    </div>
  );
}

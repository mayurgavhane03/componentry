import React, { useState, useSyncExternalStore } from 'react';
import { CButton, CCard, CCardHeader, CCardTitle, CCardDescription, CCardContent, CCardFooter } from '@componentry-ui/react';
import CodeBlock from '@theme/CodeBlock';

const shades = [50,100,200,300,400,500,600,700,800,900,950];
const palettes = ['sky', 'violet', 'emerald', 'rose'] as const;
type Palette = typeof palettes[number];

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}
const readTheme = (): 'light' | 'dark' => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
const serverTheme = (): 'light' => 'light';

function tokenStyle(palette: Palette, radius: number): React.CSSProperties {
  return Object.fromEntries([
    ...shades.map(shade => ['--c-color-primary-' + shade, 'var(--c-color-' + palette + '-' + shade + ')']),
    ['--c-input-border-radius-medium', radius + 'px'],
    ['--c-border-radius-large', radius + 'px'],
  ]) as React.CSSProperties;
}

export default function ThemeWorkbench({ showCode = false }: { showCode?: boolean }) {
  const colorMode = useSyncExternalStore(subscribeToTheme, readTheme, serverTheme);
  const [palette, setPalette] = useState<Palette>('sky');
  const [radius, setRadius] = useState(12);
  const [mode, setMode] = useState<'light' | 'dark' | null>(null);
  const [compare, setCompare] = useState(false);
  const [joined, setJoined] = useState(false);
  const selectedMode = mode ?? colorMode;
  const css = '.my-brand {\n' + shades.map(shade => '  --c-color-primary-' + shade + ': var(--c-color-' + palette + '-' + shade + ');').join('\n') + '\n  --c-input-border-radius-medium: ' + radius + 'px;\n  --c-border-radius-large: ' + radius + 'px;\n}';
  function reset() { setPalette('sky'); setRadius(12); setMode(null); setCompare(false); setJoined(false); }
  function preview(theme: 'light' | 'dark') {
    return <div key={theme} className={'material-preview c-theme-' + theme} style={tokenStyle(palette, radius)}>
      <div className="material-caption"><span>{theme === 'light' ? '☀' : '◐'} {theme} canvas</span><span>LIVE / 01</span></div>
      <div className="material-swatches" aria-label={palette + ' palette'}>{[200,300,400,500,600,700].map(shade => <span key={shade} style={{background:'var(--c-color-primary-' + shade + ')'}} />)}</div>
      <CCard className="material-card">
        <CCardHeader><div slot="title"><div className="material-card-meta"><span className="material-symbol" aria-hidden="true">↗</span><span className="material-tag">YOUR NEXT CHAPTER</span></div><CCardTitle>Something good<br />starts here.</CCardTitle></div><CCardDescription slot="description">A space for your next idea. A design that feels like you.</CCardDescription></CCardHeader>
        <CCardContent><div className="material-members"><span className="member-stack"><i>M</i><i>A</i><i>J</i></span><span>Good things happen together.</span></div><div className="material-rule" /></CCardContent>
        <CCardFooter><CButton variant="primary" onClick={() => setJoined(!joined)}>{joined ? 'You’re on the list' : 'Count me in'}<span slot="suffix" aria-hidden="true">{joined ? '✓' : '↗'}</span></CButton><CButton variant="text" onClick={reset}>Start over</CButton></CCardFooter>
      </CCard>
      <div className="material-receipt"><code>--c-color-primary-600</code><span>{palette} / {radius}px</span></div>
    </div>;
  }
  return <section className="theme-workbench" aria-label="Theme workbench">
    <div className="workbench-top"><span><span className="status-dot" /> THE LIVE WORKBENCH</span><button type="button" onClick={reset}>Reset ↺</button></div>
    <div className={'material-canvases' + (compare ? ' is-comparing' : '')}>{compare ? <>{preview('light')}{preview('dark')}</> : preview(selectedMode)}</div>
    <div className="workbench-controls">
      <fieldset><legend>01 — Color</legend><div className="palette-options">{palettes.map(color => <button type="button" key={color} aria-label={color + ' palette'} aria-pressed={palette === color} onClick={() => setPalette(color)} style={{'--swatch':'var(--c-color-' + color + '-500)'} as React.CSSProperties}><span />{palette === color && <b aria-hidden="true">✓</b>}</button>)}</div></fieldset>
      <fieldset><legend>02 — Edges</legend><label className="radius-control"><span className="sr-only">Corner radius</span><input type="range" min="0" max="24" step="2" value={radius} onChange={event => setRadius(Number(event.target.value))} /><output>{radius}px</output></label></fieldset>
      <fieldset><legend>03 — Light</legend><div className="mode-options"><button type="button" aria-label="Light preview" aria-pressed={selectedMode === 'light' && !compare} onClick={() => {setMode('light'); setCompare(false);}}>☀</button><button type="button" aria-label="Dark preview" aria-pressed={selectedMode === 'dark' && !compare} onClick={() => {setMode('dark'); setCompare(false);}}>◐</button><button type="button" aria-label="Compare light and dark" aria-pressed={compare} onClick={() => setCompare(!compare)}>⇄</button></div></fieldset>
    </div>
    <div className="workbench-status" role="status">{joined ? 'You’re on the list. This is a local demo — nothing was submitted.' : 'Real components. Your tokens. Change something.'}</div>
    {showCode && <div className="workbench-code"><div className="preview-toolbar"><strong>Your theme recipe</strong><span>CSS · UPDATES LIVE</span></div><CodeBlock language="css">{css}</CodeBlock></div>}
  </section>;
}

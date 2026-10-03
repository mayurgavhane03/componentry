import React, { useState } from 'react';
import { CButton } from '@componentry-ui/react';
import FrameworkTabs from '../FrameworkTabs';

type Variant = 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
type Size = 'small' | 'medium' | 'large';
const variants: Variant[] = ['default', 'primary', 'success', 'neutral', 'warning', 'danger', 'text'];

export function Example({ children, react, html }: { children: React.ReactNode; react: string; html: string }) {
  return <div className="preview-panel">
    <div className="preview-toolbar"><strong>Preview</strong><span>LIVE COMPONENTS</span></div>
    <div className="preview-canvas">{children}</div>
    <FrameworkTabs react={react} vue={react} angular={html} html={html} />
  </div>;
}

export function ButtonPlayground() {
  const [variant, setVariant] = useState<Variant>('primary');
  const [size, setSize] = useState<Size>('medium');
  const [label, setLabel] = useState('Create project');
  const [outline, setOutline] = useState(false);
  const [pill, setPill] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [clicks, setClicks] = useState(0);
  const attributes = 'variant="' + variant + '" size="' + size + '"' + (outline ? ' outline' : '') + (pill ? ' pill' : '') + (disabled ? ' disabled' : '');
  const escapedLabel = (label || 'Button').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/{/g, '&#123;').replace(/}/g, '&#125;');
  const react = '<CButton ' + attributes + '>' + escapedLabel + '</CButton>';
  const html = '<c-button ' + attributes + '>' + escapedLabel + '</c-button>';
  function reset() { setVariant('primary'); setSize('medium'); setLabel('Create project'); setOutline(false); setPill(false); setDisabled(false); setClicks(0); }
  return <div className="preview-panel">
    <div className="preview-toolbar"><strong>Playground</strong><button type="button" className="playground-reset" onClick={reset}>Reset ↺</button></div>
    <div className="playground-main">
      <div className="preview-canvas"><CButton variant={variant} size={size} outline={outline} pill={pill} disabled={disabled} onClick={() => setClicks(count => count + 1)}>{label || 'Button'}</CButton><span className="playground-feedback" role="status">{clicks ? 'Button clicked ' + clicks + (clicks === 1 ? ' time' : ' times') : 'Your next action starts here.'}</span></div>
      <div className="playground-controls">
        <label>Label<input type="text" value={label} onChange={event => setLabel(event.target.value)} maxLength={40} /></label>
        <label>Variant<select value={variant} onChange={event => setVariant(event.target.value as Variant)}>{variants.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
        <label>Size<select value={size} onChange={event => setSize(event.target.value as Size)}>{['small', 'medium', 'large'].map(value => <option key={value} value={value}>{value}</option>)}</select></label>
        <label className="check-control"><input type="checkbox" checked={outline} onChange={event => setOutline(event.target.checked)} />Outline</label>
        <label className="check-control"><input type="checkbox" checked={pill} onChange={event => setPill(event.target.checked)} />Pill shape</label>
        <label className="check-control"><input type="checkbox" checked={disabled} onChange={event => setDisabled(event.target.checked)} />Disabled</label>
      </div>
    </div>
    <FrameworkTabs react={react} vue={react} angular={html} html={html} />
  </div>;
}

export function ButtonVariants() {
  const react = variants.map(variant => '<CButton variant="' + variant + '">' + variant[0].toUpperCase() + variant.slice(1) + '</CButton>').join('\n');
  return <Example react={react} html={react.replaceAll('CButton', 'c-button')}>{variants.map(variant => <CButton key={variant} variant={variant}>{variant[0].toUpperCase() + variant.slice(1)}</CButton>)}</Example>;
}

export function SaveExample() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  React.useEffect(() => {
    if (!saving) return;
    const timer = window.setTimeout(() => { setSaving(false); setSaved(true); }, 1200);
    return () => window.clearTimeout(timer);
  }, [saving]);
  return <div className="preview-panel"><div className="preview-toolbar"><strong>Try it</strong><span>LOADING STATE</span></div><div className="preview-canvas"><CButton variant="primary" loading={saving} disabled={saving} onClick={() => { setSaved(false); setSaving(true); }}>{saving ? 'Saving changes' : 'Save changes'}</CButton><span role="status">{saved ? 'Changes saved.' : saving ? 'Saving…' : ''}</span></div></div>;
}


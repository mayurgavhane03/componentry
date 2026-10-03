import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import {
  CButton,
  CBadge,
  CAvatar,
  CRating,
  CProgressBar,
  CInput,
  CCheckbox,
  CAlert
} from '@componentry-ui/react';

export default function InteractiveBentoGrid() {
  // Button interactive state
  const [asyncState, setAsyncState] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // Rating interactive state
  const [rating, setRating] = useState(5);

  // Progress interactive state
  const [progress, setProgress] = useState(72);

  // Input interactive state
  const [searchVal, setSearchVal] = useState('');

  // Checkboxes
  const [tokenSync, setTokenSync] = useState(true);
  const [typesActive, setTypesActive] = useState(true);

  // Token copy feedback
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleAsyncAction = () => {
    if (asyncState === 'loading') return;
    setAsyncState('loading');
    setTimeout(() => {
      setAsyncState('success');
      setTimeout(() => setAsyncState('idle'), 2500);
    }, 1200);
  };

  const copyToken = (name: string) => {
    navigator?.clipboard?.writeText?.(name);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <section className="bento-section" aria-label="Component Showcase">
      <div className="section-header-compact">
        <div className="section-tag">COMPREHENSIVE SUITE</div>
        <h2>Crafted for High-Impact Interfaces</h2>
        <p>
          More than 25 battle-tested components ready out of the box. Fully accessible, keyboard navigable, and interactive.
        </p>
      </div>

      <div className="bento-grid">
        {/* Tile 1: Interactive Buttons & Action Feedback */}
        <div className="bento-card bento-col-2">
          <div className="bento-card-header">
            <div className="bento-tag">ACTIONS &amp; STATES</div>
            <Link to="/docs/components/button" className="bento-arrow">Docs ↗</Link>
          </div>
          <h3>Buttons with native ripple, async states &amp; variants</h3>
          <p className="bento-desc">
            Primary, secondary, outline, destructive, and async loading states with built-in spinner transitions.
          </p>

          <div className="bento-specimen-area">
            <div className="bento-button-cluster">
              <CButton variant="primary">Primary</CButton>
              <CButton variant="success">Success</CButton>
              <CButton variant="neutral" outline>Outline</CButton>
              <CButton variant="danger" pill>Danger</CButton>
              <CButton
                variant={asyncState === 'success' ? 'success' : 'primary'}
                loading={asyncState === 'loading'}
                onClick={handleAsyncAction}
              >
                {asyncState === 'loading'
                  ? 'Executing…'
                  : asyncState === 'success'
                  ? 'Success ✓'
                  : 'Test Async Action'}
              </CButton>
            </div>
          </div>
          <div className="bento-card-foot">
            <span><code>&lt;CButton loading=&#123;loading&#125;&gt;</code></span>
            <span className="live-pill">Try clicking the test button</span>
          </div>
        </div>

        {/* Tile 2: Interactive Rating & Badges */}
        <div className="bento-card bento-col-1">
          <div className="bento-card-header">
            <div className="bento-tag">FEEDBACK &amp; SCORES</div>
            <span className="bento-meta">02</span>
          </div>
          <h3>Interactive Rating</h3>
          <p className="bento-desc">
            Hover, click, and customize precision rating stars.
          </p>

          <div className="bento-specimen-area center-content">
            <div className="rating-showcase-box">
              <div className="rating-stars-wrap">
                <CRating
                  value={rating}
                  max={5}
                  onCRatingChange={(e: any) => {
                    const val = e?.detail || e?.target?.value;
                    if (val !== undefined) setRating(Number(val));
                  }}
                />
              </div>
              <div className="rating-readout">
                <strong>{rating}.0</strong> / 5.0
              </div>
              <div className="rating-badges-row">
                <CBadge variant="warning" pill pulse>Top Rated</CBadge>
                <CBadge variant="neutral">Verified</CBadge>
              </div>
            </div>
          </div>
          <div className="bento-card-foot">
            <span>Interactive Star Rating</span>
            <span className="live-pill">{rating} / 5 Stars</span>
          </div>
        </div>

        {/* Tile 3: Progress & Metrics */}
        <div className="bento-card bento-col-1">
          <div className="bento-card-header">
            <div className="bento-tag">METRICS</div>
            <span className="bento-meta">03</span>
          </div>
          <h3>Live Progress</h3>
          <p className="bento-desc">
            Smooth GPU-accelerated progress bars and indicators.
          </p>

          <div className="bento-specimen-area">
            <div className="progress-specimen-box">
              <div className="progress-readout-row">
                <span>Optimization</span>
                <strong>{progress}%</strong>
              </div>
              <CProgressBar value={progress} />
              <div className="progress-controls-row">
                <button
                  type="button"
                  className="mini-step-btn"
                  onClick={() => setProgress((p) => Math.max(0, p - 15))}
                >
                  -15%
                </button>
                <button
                  type="button"
                  className="mini-step-btn"
                  onClick={() => setProgress((p) => Math.min(100, p + 15))}
                >
                  +15%
                </button>
                <button
                  type="button"
                  className="mini-step-btn"
                  onClick={() => setProgress(72)}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="bento-card-foot">
            <span><code>&lt;CProgressBar value=&#123;{progress}&#125;&gt;</code></span>
          </div>
        </div>

        {/* Tile 4: Form Controls & Inputs */}
        <div className="bento-card bento-col-2">
          <div className="bento-card-header">
            <div className="bento-tag">INPUTS &amp; FORM CONTROLS</div>
            <span className="bento-meta">04</span>
          </div>
          <h3>Accessible Forms with Clearable Inputs</h3>
          <p className="bento-desc">
            Standardized focus states, floating labels, validation states, and full keyboard navigation.
          </p>

          <div className="bento-specimen-area">
            <div className="forms-specimen-box">
              <div className="input-with-label">
                <label className="specimen-field-label">Search Library</label>
                <CInput
                  placeholder="Type component name..."
                  clearable
                  value={searchVal}
                  onCInput={(e: any) => setSearchVal(e.target.value || '')}
                />
              </div>
              <div className="checkbox-row-box">
                <CCheckbox
                  checked={tokenSync}
                  onCChange={() => setTokenSync(!tokenSync)}
                >
                  Shadow DOM Encapsulation
                </CCheckbox>
                <CCheckbox
                  checked={typesActive}
                  onCChange={() => setTypesActive(!typesActive)}
                >
                  Full TypeScript Type Guards
                </CCheckbox>
              </div>
            </div>
          </div>
          <div className="bento-card-foot">
            <span>WAI-ARIA 1.2 Form Primitives</span>
            <span className="live-pill">{searchVal ? `Filtering: "${searchVal}"` : 'Try typing in the input'}</span>
          </div>
        </div>

        {/* Tile 5: Avatars & Identity */}
        <div className="bento-card bento-col-1">
          <div className="bento-card-header">
            <div className="bento-tag">IDENTITY</div>
            <span className="bento-meta">05</span>
          </div>
          <h3>Avatars &amp; Badges</h3>
          <p className="bento-desc">
            User initials, shapes, fallbacks, and presence badges.
          </p>

          <div className="bento-specimen-area center-content">
            <div className="avatar-specimen-box">
              <div className="avatar-overlap-stack">
                <CAvatar initials="MG" shape="circle" />
                <CAvatar initials="JD" shape="circle" />
                <CAvatar initials="TC" shape="circle" />
                <CAvatar initials="UX" shape="circle" />
              </div>
              <div className="avatar-status-pill">
                <CBadge variant="success" pill pulse>4 Collaborators</CBadge>
              </div>
            </div>
          </div>
          <div className="bento-card-foot">
            <span><code>&lt;CAvatar initials=&quot;MG&quot;&gt;</code></span>
          </div>
        </div>

        {/* Tile 6: Design Tokens Architecture */}
        <div className="bento-card bento-col-2">
          <div className="bento-card-header">
            <div className="bento-tag">TOKEN ENGINE</div>
            <Link to="/docs/theme" className="bento-arrow">Themes ↗</Link>
          </div>
          <h3>Tokens that translate across your entire stack</h3>
          <p className="bento-desc">
            Click any color token below to copy its CSS variable name. Works consistently in CSS, SCSS, Tailwind, and CSS-in-JS.
          </p>

          <div className="bento-specimen-area">
            <div className="token-swatch-grid">
              {[
                { name: '--c-color-primary-500', color: 'var(--c-color-primary-500)', label: 'Primary 500' },
                { name: '--c-color-violet-500', color: 'var(--c-color-violet-500)', label: 'Violet 500' },
                { name: '--c-color-emerald-500', color: 'var(--c-color-emerald-500)', label: 'Emerald 500' },
                { name: '--c-color-rose-500', color: 'var(--c-color-rose-500)', label: 'Rose 500' },
                { name: '--c-color-amber-500', color: 'var(--c-color-amber-500)', label: 'Amber 500' },
                { name: '--c-color-neutral-800', color: 'var(--c-color-neutral-800)', label: 'Neutral 800' },
              ].map((tok) => (
                <button
                  key={tok.name}
                  type="button"
                  className="token-chip-btn"
                  onClick={() => copyToken(tok.name)}
                  title={`Click to copy ${tok.name}`}
                >
                  <span className="token-color-circle" style={{ background: tok.color }} />
                  <span className="token-chip-label">{tok.label}</span>
                  {copiedToken === tok.name && <span className="token-copied-tag">✓</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="bento-card-foot">
            <span>{copiedToken ? `Copied: ${copiedToken}` : 'Click token to copy CSS variable'}</span>
            <span className="live-pill">100+ Tokens</span>
          </div>
        </div>
      </div>
    </section>
  );
}

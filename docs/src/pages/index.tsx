import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HeroInstallCommand from '../components/landing/HeroInstallCommand';
import FrameworkShowcase from '../components/landing/FrameworkShowcase';
import InteractiveBentoGrid from '../components/landing/InteractiveBentoGrid';
import ThemeWorkbench from '../components/examples/ThemeWorkbench';

export default function Home() {
  return (
    <Layout
      title="Componentry — Universal Web Component Design System"
      description="Componentry is a multi-framework design system built with Stencil web components. First-class support for React, Vue, Angular, and HTML with zero lock-in."
    >
      <main className="studio-home">
        {/* Ambient decorative lighting */}
        <div className="hero-glow-1" aria-hidden="true" />
        <div className="hero-glow-2" aria-hidden="true" />

        {/* Edition header */}
        <div className="studio-edition">
          <span>
            <span className="status-dot" /> COMPONENTRY 1.0 / UNIVERSAL DESIGN SYSTEM
          </span>
          <span>BUILT WITH WEB COMPONENTS. SHAPED FOR ANY FRAMEWORK.</span>
        </div>

        {/* Hero Section */}
        <section className="studio-hero">
          <div className="studio-copy">
            <Link to="/docs/intro" className="hero-badge-pill">
              <span className="pulse-indicator" />
              <span>Universal Web Components • React, Vue, Angular &amp; HTML</span>
              <span aria-hidden="true">→</span>
            </Link>

            <h1>
              One Design System.<br />
              Every Framework.<br />
              Your <span className="signature-word">signature<svg viewBox="0 0 460 24" aria-hidden="true"><path d="M4 14C130 2 263 2 453 9M75 21C196 12 321 12 403 17" /></svg></span>.
            </h1>

            <p>
              The building blocks should adapt to your stack — not force your team into one framework.
            </p>
            <p className="studio-subcopy">
              Built on W3C Web Component standards with Stencil as the single source of truth.
              Get native, fully typed components for React, Vue, and Angular with universal CSS tokens.
            </p>

            <div className="studio-actions-group">
              <Link className="studio-primary" to="/docs/components/button">
                Explore 25+ Components <span>↗</span>
              </Link>
              <Link className="studio-secondary-btn" to="/docs/intro">
                Quick Start Guide →
              </Link>
              <a
                className="studio-github-btn"
                href="https://github.com/mayurgavhane03/componentry"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub ↗</span>
              </a>
            </div>

            {/* Quick CLI install with framework switcher */}
            <HeroInstallCommand />
          </div>

          <div className="studio-hero-demo">
            <ThemeWorkbench />
            <span className="specimen-caption">FIG. 001 — LIVE THEME BENCH · TOKEN ADJUSTMENTS REFLECT INSTANTLY</span>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="stats-strip" aria-label="Key system statistics">
          <div className="stat-card">
            <div className="stat-number">25<span className="stat-accent">+</span></div>
            <div className="stat-title">Production Components</div>
            <div className="stat-subtitle">Buttons, Dialogs, Cards, Menus, Comboboxes &amp; more</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4<span className="stat-accent"> Frameworks</span></div>
            <div className="stat-title">First-Class Support</div>
            <div className="stat-subtitle">Native bindings for React, Vue, Angular, and HTML</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100<span className="stat-accent">%</span></div>
            <div className="stat-title">TypeScript Native</div>
            <div className="stat-subtitle">Generated type definitions, props, and synthetic events</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0<span className="stat-accent"> Lock-in</span></div>
            <div className="stat-title">W3C Web Standards</div>
            <div className="stat-subtitle">Custom Elements that outlive framework rewrites</div>
          </div>
        </section>

        {/* Cross-Framework Code Showcase with Live Specimen */}
        <FrameworkShowcase />

        {/* Interactive Bento Grid Component Showcase */}
        <InteractiveBentoGrid />

        {/* Architecture Value Pillars */}
        <section className="pillars-section" aria-label="Why Componentry">
          <div className="section-header-compact">
            <div className="section-tag">ENGINEERED FOR SCALE</div>
            <h2>Built on Standards. Ready for Enterprise.</h2>
            <p>
              Traditional component libraries lock your organization into a single framework silo. Componentry frees your design system.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-box">🛡️</div>
              <h3>W3C Web Components</h3>
              <p>
                Native browser Custom Elements and Shadow DOM encapsulate styles, eliminating CSS conflicts across micro-frontends and teams.
              </p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon-box">⚡</div>
              <h3>Zero Framework Drift</h3>
              <p>
                Bug fixes and feature updates are implemented once in Stencil and automatically cascade to React, Vue, and Angular packages.
              </p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon-box">🎨</div>
              <h3>Token-Powered Theming</h3>
              <p>
                Over 100 CSS custom properties powering light, dark, and custom brand themes without any runtime JavaScript recalculations.
              </p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon-box">🚀</div>
              <h3>Turborepo &amp; pnpm Speed</h3>
              <p>
                Built in an optimized monorepo with Turborepo caching, automated Changeset release pipelines, and tree-shakeable packaging.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Matrix */}
        <section className="comparison-section" aria-label="Feature comparison">
          <div className="section-header-compact">
            <div className="section-tag">THE ARCHITECTURAL DIFFERENCE</div>
            <h2>Componentry vs. Single-Framework Libraries</h2>
            <p>
              Why enterprise teams are shifting from framework-locked component libraries to universal web components.
            </p>
          </div>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th className="highlight-col">Componentry</th>
                  <th>Single-Framework Libraries (e.g. MUI, Vuetify)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Framework Agnostic</strong></td>
                  <td className="highlight-col"><span className="badge-check">✓ React, Vue, Angular &amp; HTML</span></td>
                  <td><span className="badge-cross">✕ Locked to single framework</span></td>
                </tr>
                <tr>
                  <td><strong>Style Encapsulation</strong></td>
                  <td className="highlight-col"><span className="badge-check">✓ Native Shadow DOM (zero style bleed)</span></td>
                  <td><span className="badge-cross">✕ Global CSS / CSS-in-JS collisions</span></td>
                </tr>
                <tr>
                  <td><strong>Multi-Team Tech Stacks</strong></td>
                  <td className="highlight-col"><span className="badge-check">✓ One shared UI across all stacks</span></td>
                  <td><span className="badge-cross">✕ Duplicate libraries per team</span></td>
                </tr>
                <tr>
                  <td><strong>Theme Portability</strong></td>
                  <td className="highlight-col"><span className="badge-check">✓ Standard CSS Custom Properties</span></td>
                  <td><span className="badge-cross">✕ Framework Context Providers</span></td>
                </tr>
                <tr>
                  <td><strong>Future-Proofing</strong></td>
                  <td className="highlight-col"><span className="badge-check">✓ Survives major framework migrations</span></td>
                  <td><span className="badge-cross">✕ High rewrite risk on framework major bump</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="cta-banner-section" aria-label="Get started with Componentry">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <h2>Unify your design system today.</h2>
              <p>
                Stop rewriting the same UI components across React, Vue, and Angular. Build once with Componentry and deliver consistent, accessible, high-performance interfaces everywhere.
              </p>
            </div>
            <div className="cta-banner-buttons">
              <Link className="studio-primary" to="/docs/intro">
                Get Started Now <span>→</span>
              </Link>
              <Link className="studio-secondary-btn" to="/docs/components/button">
                Browse Components ↗
              </Link>
            </div>
          </div>
        </section>

        {/* Studio Endnote */}
        <div className="studio-endnote">
          <span>COMPONENTRY · AN OPEN SOURCE DESIGN SYSTEM · MIT LICENSE</span>
          <Link to="/docs/theme">Customize your theme tokens ↗</Link>
        </div>
      </main>
    </Layout>
  );
}

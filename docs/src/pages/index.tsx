import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import ThemeWorkbench from '../components/ThemeWorkbench';

export default function Home() {
  return <Layout title="A system. Your signature." description="Componentry is a web component design system for React, Vue, Angular, and HTML. Make it yours in the live theme workbench.">
    <main className="studio-home">
      <div className="studio-edition"><span><span className="status-dot" /> COMPONENTRY / AN OPEN DESIGN SYSTEM</span><span>BUILT FOR THE WEB. SHAPED BY YOU.</span></div>
      <section className="studio-hero">
        <div className="studio-copy"><div className="studio-label">THE DETAILS ARE THE DESIGN.</div><h1>A system.<br />Your <span className="signature-word">signature<svg viewBox="0 0 460 24" aria-hidden="true"><path d="M4 14C130 2 263 2 453 9M75 21C196 12 321 12 403 17" /></svg></span>.</h1><p>The building blocks should fit your vision.<br />Not the other way around.</p><p className="studio-subcopy">Thoughtful web components. A shared theme language.<br />A little structure, a lot of room to make it yours.</p><div className="studio-actions"><Link className="studio-primary" to="/docs/components/button">Find your building blocks <span>↗</span></Link><Link className="studio-secondary" to="/docs/intro">Start with the basics →</Link></div><div className="studio-margin-note"><span aria-hidden="true">↳</span> Go on. Play with the colors over there.</div></div>
        <div className="studio-hero-demo"><ThemeWorkbench /><span className="specimen-caption">FIG. 001 — ONE COMPONENT, MANY PERSONALITIES.</span></div>
      </section>
      <div className="studio-frameworks"><span>DIFFERENT TOOLS.<br /><strong>SAME DESIGN LANGUAGE.</strong></span><span>React <small>01</small></span><span>Vue <small>02</small></span><span>Angular <small>03</small></span><span>HTML <small>04</small></span></div>
      <section className="studio-collection"><div className="section-heading"><div><span className="field-kicker">THE COLLECTION</span><h2>Good things, piece by piece.</h2></div><p>Start small. Build something<br />that feels considered.</p></div><div className="collection-grid">
        <Link className="collection-tile" to="/docs/components/button"><div className="tile-top"><span>01 / ACTIONS</span><span>↗</span></div><div className="tile-art button-art"><span className="sample-button">Make your move ↗</span><span className="sample-circle">＋</span></div><h3>Small button. Big possibilities.</h3><p>Variants, states, and the details behind a clear next step.</p><strong>Explore Button →</strong></Link>
        <Link className="collection-tile" to="/docs/theme"><div className="tile-top"><span>02 / FOUNDATIONS</span><span>↗</span></div><div className="tile-art palette-art" aria-hidden="true">{['sky','violet','emerald','rose','amber'].map(color => <span key={color} style={{background:'var(--c-color-' + color + '-400)'}} />)}</div><h3>A language of your own.</h3><p>Color, shape, space. One set of tokens that ties it all together.</p><strong>Explore Themes →</strong></Link>
        <Link className="collection-tile" to="/docs/components/card"><div className="tile-top"><span>03 / STRUCTURE</span><span>↗</span></div><div className="tile-art card-art" aria-hidden="true"><div><span /><i /><i /><b /></div></div><h3>Give your ideas a home.</h3><p>Composable containers with space for the things that matter.</p><strong>Explore Card →</strong></Link>
      </div></section>
      <section className="studio-manifesto"><span className="manifesto-mark" aria-hidden="true">✳</span><div><span className="field-kicker">LESS REINVENTING. MORE MAKING.</span><h2>Build once.<br />Feel at home everywhere.</h2><p>Stencil at the core. React, Vue, and Angular at your fingertips. Shared CSS tokens carry your visual language from one framework to the next.</p><Link to="/docs/intro">Get to know Componentry ↗</Link></div><div className="manifesto-diagram"><span>YOUR IDEA</span><b>componentry</b><div><span>React</span><span>Vue</span><span>Angular</span><span>HTML</span></div><small>One foundation. Four ways to build.</small></div></section>
      <div className="studio-endnote"><span>MAKE SOMETHING THAT FEELS LIKE YOU.</span><Link to="/docs/theme">Meet your theme ↗</Link></div>
    </main>
  </Layout>;
}

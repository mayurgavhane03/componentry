import React from 'react';
import Link from '@docusaurus/Link';
import DocSidebarItems from '@theme/DocSidebarItems';
import type { Props } from '@theme/DocSidebar/Desktop';

export default function DocSidebarDesktop({ path, sidebar }: Props) {
  return <div className="field-sidebar">
    <div className="field-sidebar-heading"><span className="field-kicker">THE FIELD GUIDE</span><div><strong>Documentation</strong><span className="sidebar-version">0.0.1</span></div><p>A few good building blocks.</p></div>
    <nav className="menu thin-scrollbar" aria-label="Docs sidebar">
      <ul className="menu__list"><DocSidebarItems items={sidebar} activePath={path} level={1} /></ul>
    </nav>
    <Link className="sidebar-lab-link" to="/docs/theme"><span className="sidebar-orbit" aria-hidden="true">◐</span><span><strong>Find your signature.</strong><small>Open the theme workbench ↗</small></span></Link>
    <div className="sidebar-foot"><span className="status-dot" /> Built on web standards</div>
  </div>;
}

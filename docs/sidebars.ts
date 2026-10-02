import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    { type: 'category', label: 'Start here', collapsible: false, items: [
      { type: 'doc', id: 'intro', label: 'Introduction', className: 'sidebar-intro' },
    ] },
    { type: 'category', label: 'Foundations', collapsible: false, items: [
      { type: 'doc', id: 'theme', label: 'Themes & tokens', className: 'sidebar-theme' },
    ] },
    { type: 'category', label: 'Components', collapsible: false, items: [
      { type: 'doc', id: 'components/button', className: 'sidebar-button' },
      { type: 'doc', id: 'components/card', className: 'sidebar-card' },
    ] },
  ],
};
export default sidebars;

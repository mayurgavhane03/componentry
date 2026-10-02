import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
const tokenCodeTheme = {
  plain: { color: 'var(--c-color-neutral-800)', backgroundColor: 'var(--c-color-neutral-50)' },
  styles: [
    { types: ['comment', 'prolog'], style: { color: 'var(--c-color-neutral-600)' } },
    { types: ['keyword', 'tag', 'selector'], style: { color: 'var(--c-color-primary-700)' } },
    { types: ['string', 'attr-value'], style: { color: 'var(--c-color-success-700)' } },
    { types: ['function', 'number', 'attr-name'], style: { color: 'var(--c-color-violet-700)' } },
  ],
};
const config: Config = {
  title: 'Componentry',
  tagline: 'Thoughtful components. Any framework.',
  favicon: 'img/componentry.svg',
  url: 'https://mayurgavhane03.github.io',
  baseUrl: '/',
  organizationName: 'mayurgavhane03',
  projectName: 'componentry',
  onBrokenLinks: 'throw',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  presets: [['classic', {
    docs: { sidebarPath: './sidebars.ts', editUrl: 'https://github.com/mayurgavhane03/componentry/edit/main/docs/' },
    blog: false,
    theme: { customCss: ['./src/css/custom.css', './src/css/studio.css'] },
  } satisfies Preset.Options]],
  themeConfig: {
    colorMode: { defaultMode: 'light', respectPrefersColorScheme: true },
    navbar: {
      title: 'componentry',
      logo: { alt: '', src: 'img/componentry.svg' },
      items: [
        { to: '/docs/intro', label: 'Documentation', position: 'left' },
        { to: '/docs/components/button', label: 'Components', position: 'left' },
        { to: '/docs/theme', label: 'Themes', position: 'left' },
        { href: 'https://github.com/mayurgavhane03/componentry', label: 'GitHub ↗', position: 'right' },
      ],
    },
    footer: { style: 'light', copyright: 'Componentry · Built with web standards. Made for your framework.' },
    docs: { sidebar: { hideable: false } },
    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    prism: { theme: tokenCodeTheme, darkTheme: tokenCodeTheme, additionalLanguages: ['bash', 'typescript', 'css'] },
  } satisfies Preset.ThemeConfig,
  scripts: [{ src: '/theme-sync.js', async: false }],
};
export default config;

import type { ClientModule } from '@docusaurus/types';

function syncThemeClass() {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  let theme = root.getAttribute('data-theme');
  if (!theme) {
    try {
      theme = localStorage.getItem('theme');
    } catch {
      // ignore
    }
  }

  const isDark = theme === 'dark';
  const targetAdd = isDark ? 'c-theme-dark' : 'c-theme-light';
  const targetRemove = isDark ? 'c-theme-light' : 'c-theme-dark';

  if (!root.classList.contains(targetAdd)) {
    root.classList.add(targetAdd);
  }
  if (root.classList.contains(targetRemove)) {
    root.classList.remove(targetRemove);
  }
}

const clientModule: ClientModule = {
  onRouteDidUpdate() {
    syncThemeClass();
  },
};

export default clientModule;

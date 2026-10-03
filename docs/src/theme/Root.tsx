import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

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

export default function Root({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    syncThemeClass();
  }, [location.pathname]);

  return <>{children}</>;
}

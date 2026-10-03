(function () {
  let isSyncing = false;

  function syncTheme() {
    if (isSyncing || typeof document === 'undefined') return;

    const root = document.documentElement;
    let theme = root.getAttribute('data-theme');
    if (!theme) {
      try {
        theme = localStorage.getItem('theme');
      } catch (e) {}
    }

    const isDark = theme === 'dark';
    const targetAdd = isDark ? 'c-theme-dark' : 'c-theme-light';
    const targetRemove = isDark ? 'c-theme-light' : 'c-theme-dark';

    if (!root.classList.contains(targetAdd) || root.classList.contains(targetRemove)) {
      isSyncing = true;
      try {
        root.classList.remove(targetRemove);
        root.classList.add(targetAdd);
      } finally {
        isSyncing = false;
      }
    }
  }

  // Execute synchronously in head to prevent theme flashing
  syncTheme();

  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function () {
      syncTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', syncTheme);
    window.addEventListener('pageshow', syncTheme);
  }
})();

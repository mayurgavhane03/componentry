function syncTheme() {
  const root = document.documentElement;
  const dark = root.dataset.theme === 'dark';
  root.classList.toggle('c-theme-dark', dark);
  root.classList.toggle('c-theme-light', !dark);
}
syncTheme();
new MutationObserver(syncTheme).observe(document.documentElement, {
  attributes: true, attributeFilter: ['data-theme'],
});

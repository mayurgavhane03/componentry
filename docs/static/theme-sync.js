console.log('theme-sync loaded');

function syncTheme() {
  const html = document.documentElement;

  if (html.dataset.theme === 'dark') {
    html.classList.add('c-theme-dark');
    html.classList.remove('c-theme-light');
  } else {
    html.classList.add('c-theme-light');
    html.classList.remove('c-theme-dark');
  }

  console.log(html.className);
}

syncTheme();

new MutationObserver(syncTheme).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme'],
});
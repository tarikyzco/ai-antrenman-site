// Native details navigation remains usable when JavaScript is disabled.
const menu = document.querySelector('.menu');
const toggle = menu?.querySelector('summary');
if (menu && toggle) {
  const sync = () => {
    toggle.setAttribute('aria-expanded', String(menu.open));
    document.body.classList.toggle('menu-open', menu.open);
    // Prevent keyboard focus from entering content hidden behind the open menu.
    for (const element of document.querySelectorAll('body > .shell, footer, .desktop-nav, .header-store')) {
      element.inert = menu.open;
    }
  };
  sync();
  menu.addEventListener('toggle', sync);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      sync();
      toggle.focus();
    }
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) { menu.open = false; sync(); }
  });
}

/* Le site est uniquement en thème clair (beige).
   Menu et pied de page : logo seul (triangle + rond). */
(() => {
  const LOGO_DARK = 'https://res.cloudinary.com/dpvw9gv0y/image/upload/v1777468778/Logo-_-Texte-fond-noir_voyuah.png';
  const LOGO_ICON = '/assets/logo-maderino.png';
  document.documentElement.dataset.theme = 'light';
  document.querySelectorAll('img').forEach(img => {
    if (img.getAttribute('src') !== LOGO_DARK) return;
    img.src = LOGO_ICON;
    img.classList.add('logo-icon');
  });
})();

/* Adresses propres : les liens vers une partie de page (#booking, #services…) font défiler en douceur
   sans ajouter de « # » dans l'adresse, et un « # » reçu d'une autre page est retiré après le défilement. */
(() => {
  const clean = () => history.replaceState(null, '', location.pathname + location.search);
  const go = (id, smooth) => {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    return true;
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    e.preventDefault();
    if (url.hash === '#') { scrollTo({ top: 0, behavior: 'smooth' }); return; }
    go(decodeURIComponent(url.hash.slice(1)), true);
  });
  const fromHash = smooth => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    clean();
    go(id, smooth);
    addEventListener('load', () => go(id, false), { once: true });
  };
  addEventListener('hashchange', () => fromHash(true));
  fromHash(false);
})();

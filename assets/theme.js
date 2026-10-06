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

/* Fond « timeline » : défile dans le même sens que la page (vers le haut quand on descend), à la même vitesse que le contenu */
(() => {
  const root = document.documentElement;
  let ticking = false;
  const move = () => {
    const y = window.scrollY;
    root.style.setProperty('--tl-y', (-y * 1).toFixed(1) + 'px');
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
  move();
})();

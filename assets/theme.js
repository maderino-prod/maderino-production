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

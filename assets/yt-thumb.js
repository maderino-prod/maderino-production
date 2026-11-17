/* Miniatures YouTube : toutes les vidéos n'ont pas de miniature haute définition (maxresdefault).
   Si elle manque (erreur ou petite image grise de 120 px), on prend la version standard (hqdefault), qui existe toujours. */
(() => {
  const fix = img => { if (img.src.includes('/maxresdefault.jpg')) img.src = img.src.replace('/maxresdefault.jpg', '/hqdefault.jpg'); };
  addEventListener('error', e => { if (e.target.tagName === 'IMG') fix(e.target); }, true);
  addEventListener('load', e => { const img = e.target; if (img.tagName === 'IMG' && img.naturalWidth && img.naturalWidth <= 120) fix(img); }, true);
})();

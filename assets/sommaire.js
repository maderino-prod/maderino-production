/* Sommaire vertical (ordinateur) : une ligne verticale sur le bord droit avec les parties de la page,
   allume la partie en cours et y fait glisser au clic. */
(() => {
  // Une « partie » = une section qui porte un numéro (01, 02…) ou une étiquette « 03 · Process »
  const parts = [...document.querySelectorAll('section')]
    .map(section => {
      const tag = section.querySelector('.section-label, .section-num');
      if (!tag) return null;
      let label = tag.textContent.replace(/^\s*\d+\s*[·.\-]?\s*/, '').trim();
      if (!label) {
        const title = section.querySelector('.section-title, h2');
        label = title ? title.textContent.trim() : '';
      }
      if (!label) return null;
      if (!section.id) section.id = 'partie-' + label.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return { section, label: label.toLowerCase() };
    })
    .filter(Boolean);
  if (parts.length < 3) return;

  const nav = document.createElement('aside'); // pas <nav> : le site stylise toutes les balises <nav> comme la barre du haut
  nav.className = 'sommaire';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Sommaire de la page');
  nav.innerHTML = parts.map(p =>
    `<a href="#${p.section.id}"><span class="sommaire-label">${p.label}</span><span class="sommaire-mark"></span></a>`
  ).join('') + '<span class="sommaire-line"><span class="sommaire-progress"></span></span>';
  document.body.appendChild(nav);
  const links = [...nav.querySelectorAll('a')];

  links.forEach((a, i) => a.addEventListener('click', e => {
    e.preventDefault();
    parts[i].section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  // Se cache après 1,5 s sans défilement, réapparaît dès qu'on scrolle (reste affiché au survol)
  let lastY = scrollY, lastMove = 0, hovering = false;
  nav.addEventListener('mouseenter', () => { hovering = true; });
  nav.addEventListener('mouseleave', () => { hovering = false; lastMove = Date.now(); });

  const update = () => {
    if (Math.abs(scrollY - lastY) > 4) { lastMove = Date.now(); lastY = scrollY; }
    const recent = Date.now() - lastMove < 1500;
    nav.classList.toggle('visible', scrollY > innerHeight * 0.6 && (recent || hovering));
    const line = innerHeight * 0.35;
    let current = 0;
    parts.forEach((p, i) => { if (p.section.getBoundingClientRect().top <= line) current = i; });
    links.forEach((a, i) => { a.classList.toggle('active', i === current); a.classList.toggle('passed', i < current); });
    nav.style.setProperty('--progress', parts.length > 1 ? current / (parts.length - 1) : 0);
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  addEventListener('load', update);
  setInterval(update, 400); // filet de sécurité si un navigateur n'envoie pas l'événement de défilement
  update();
})();

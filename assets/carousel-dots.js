/* Téléphone : petits points sous les cartes « ce qu'on monte / tourne » qui montrent
   quelle carte est affichée (les points se touchent aussi pour aller à une carte). */
(() => {
  const wrap = document.querySelector('.types-scroll-wrap');
  const track = document.getElementById('types-track');
  if (!wrap || !track) return;
  const cards = () => [...track.children].filter(c => !c.hasAttribute('aria-hidden'));

  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  cards().forEach((card, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Carte ' + (i + 1));
    b.addEventListener('click', () => card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }));
    dots.appendChild(b);
  });
  wrap.after(dots);
  const buttons = [...dots.children];

  const update = () => {
    const center = wrap.getBoundingClientRect().left + wrap.clientWidth / 2;
    let best = 0, dist = Infinity;
    cards().forEach((c, i) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - center);
      if (d < dist) { dist = d; best = i; }
    });
    buttons.forEach((b, i) => b.classList.toggle('active', i === best));
  };
  wrap.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  setInterval(update, 500);
  update();
})();

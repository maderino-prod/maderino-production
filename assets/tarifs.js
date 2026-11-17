/* Tarifs en roulette 3D en boucle infinie : la carte du centre devant, les autres tournées sur les côtés.
   Flèches, points, swipe, glissé à la souris, clic sur une carte de côté pour l'amener au centre. */
(() => {
  document.querySelectorAll('.tarifs').forEach(grid => {
    const cards = [...grid.querySelectorAll('.tarif')], N = cards.length; if (N < 2) return;
    const wrap = document.createElement('div'); wrap.className = 'tf';
    grid.parentNode.insertBefore(wrap, grid); wrap.appendChild(grid);
    const bar = document.createElement('div'); bar.className = 'tf-bar';
    bar.innerHTML = `<button class="tf-btn" data-d="-1" aria-label="Précédent">←</button><div class="tf-dots">${cards.map((_, i) => `<i data-i="${i}"></i>`).join('')}</div><button class="tf-btn" data-d="1" aria-label="Suivant">→</button>`;
    wrap.after(bar);
    let cur = 0;
    const short = i => { let d = ((i - cur) % N + N) % N; if (d > N / 2) d -= N; return d; };
    function layout() {
      const mob = innerWidth < 769, gap = mob ? 0.45 : 0.68;
      grid.style.height = Math.max(...cards.map(c => c.offsetHeight)) + 'px';
      cards.forEach((c, i) => {
        const d = short(i), a = Math.abs(d), w = c.offsetWidth;
        const jump = c._d !== undefined && Math.abs(d - c._d) > 1; c._d = d;
        if (jump) c.style.transition = 'none';
        c.style.transform = `translateX(calc(-50% + ${d * w * gap}px)) translateZ(${-a * 140}px) rotateY(${-Math.sign(d) * Math.min(a, 1) * 35}deg) scale(${1 - Math.min(a, 3) * 0.04})`;
        c.style.zIndex = 100 - a; c.style.opacity = a > 2 ? 0 : 1; c.style.pointerEvents = a > 2 ? 'none' : '';
        c.style.filter = a ? `brightness(${1 - Math.min(a, 2) * 0.08})` : '';
        c.classList.toggle('center', !d); c.classList.toggle('side', !!d);
        if (jump) { c.offsetWidth; c.style.transition = ''; }
      });
      bar.querySelectorAll('.tf-dots i').forEach((x, i) => x.classList.toggle('on', i === ((cur % N) + N) % N));
    }
    const go = i => { cur = i; layout(); };
    bar.querySelectorAll('[data-d]').forEach(b => b.addEventListener('click', () => go(cur + +b.dataset.d)));
    bar.querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => go(cur + short(+b.dataset.i))));
    let x0 = null, dragged = false;
    wrap.addEventListener('pointerdown', e => { x0 = e.clientX; dragged = false; });
    addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { dragged = true; go(cur + (dx < 0 ? 1 : -1)); setTimeout(() => dragged = false, 50); } });
    wrap.addEventListener('click', e => { const c = e.target.closest('.tarif'); if (!c || dragged) return;
      if (c.classList.contains('side')) go(cur + short(cards.indexOf(c))); }, true);
    addEventListener('resize', layout); addEventListener('load', layout); layout();
  });
})();

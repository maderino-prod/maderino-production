/* Réalisations sur les pages d'offre (Montage / Tournage).
   Mettre <div id="realisations" data-tab="montage"></div> dans la page, puis charger projets.js et ce fichier.
   Les projets viennent de /assets/projets.js : ajouter un projet là-bas le fait apparaître ici automatiquement. */
(function () {
  const box = document.getElementById('realisations'); if (!box) return;
  const tab = box.dataset.tab;
  const PROJECTS = window.PROJECTS || [];
  const $ = id => document.getElementById(id);
  const style = document.createElement('style');
  style.textContent = "\n    \n    .pf-inner { max-width: 1200px; margin: 0 auto; }\n    .pf-tabs { display: flex; justify-content: center; gap: 6px; padding: 6px; margin: 0 auto 18px; width: max-content;\n      border-radius: 100px; background: rgba(255,255,255,0.6); border: 1px solid rgba(28,24,20,0.08); }\n    .pf-tab { border: none; background: none; cursor: pointer; padding: 12px 30px; border-radius: 100px;\n      font: 600 15px 'Inter', sans-serif; letter-spacing: -0.01em; color: rgba(28,24,20,0.6); transition: all .25s; }\n    .pf-tab.on { background: #1C1814; color: #fff; }\n    .pf-intro { text-align: center; color: var(--muted); font-size: 15px; margin-bottom: 18px; }\n    .pf-filters { display: flex; justify-content: center; flex-wrap: wrap; gap: 8px; margin-bottom: 34px; }\n    .pf-chip { border: 1px solid rgba(28,24,20,0.14); background: rgba(255,255,255,0.5); cursor: pointer;\n      padding: 8px 16px; border-radius: 100px; font: 500 13px 'Inter', sans-serif; color: #1C1814; transition: all .2s; }\n    .pf-chip.on { border-color: var(--orange); background: rgba(255,107,0,0.1); color: var(--orange); }\n    .pf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }\n    .pf-card { position: relative; cursor: pointer; border-radius: 24px; overflow: hidden; background: #1C1814;\n      aspect-ratio: 4 / 5; box-shadow: 0 14px 40px rgba(60,40,20,0.14); transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s; }\n    .pf-card:hover { transform: translateY(-6px); box-shadow: 0 22px 50px rgba(60,40,20,0.22); }\n    .pf-card.big { grid-column: span 2; aspect-ratio: auto; }\n    .pf-card img, .pf-card video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }\n    .pf-card video { opacity: 0; transition: opacity .4s; }\n    .pf-card.playing video { opacity: 1; }\n    .pf-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.78) 0%, rgba(0,0,0,.2) 45%, transparent 70%); }\n    .pf-card-txt { position: absolute; left: 22px; right: 22px; bottom: 20px; z-index: 2; color: #fff; }\n    .pf-card-where { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #FF8A3D; margin-bottom: 6px; }\n    .pf-card-name { font-size: 24px; font-weight: 700; letter-spacing: -0.04em; line-height: 1.1; }\n    .pf-card-count { font-size: 13px; opacity: .8; margin-top: 6px; }\n    .pf-badge { position: absolute; top: 16px; left: 16px; z-index: 2; padding: 6px 12px; border-radius: 100px; font-size: 11px; font-weight: 600;\n      background: rgba(255,255,255,.92); color: #1C1814; }\n    .pf-empty { grid-column: 1 / -1; text-align: center; color: var(--muted); padding: 40px; }\n\n    .pf-sheet, .pf-viewer { position: fixed; inset: 0; z-index: 400; display: none; }\n    .pf-sheet.open, .pf-viewer.open { display: flex; }\n    .pf-sheet { background: rgba(243,237,228,.78); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);\n      align-items: flex-start; justify-content: center; overflow-y: auto; padding: 60px 20px; }\n    .pf-sheet-box { position: relative; width: 100%; max-width: 980px; background: #FAF6F0; border-radius: 28px; padding: 40px;\n      border: 1px solid rgba(28,24,20,.08); box-shadow: 0 30px 80px rgba(60,40,20,.2); animation: pfIn .35s cubic-bezier(.22,1,.36,1); }\n    @keyframes pfIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }\n    .pf-close { position: absolute; top: 18px; right: 18px; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; z-index: 5;\n      border: 1px solid rgba(28,24,20,.12); background: rgba(255,255,255,.9); color: #1C1814; font-size: 15px; }\n    .pf-sheet-where { font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--orange); margin-bottom: 8px; }\n    .pf-sheet-name { font-size: 40px; font-weight: 700; letter-spacing: -0.045em; line-height: 1.05; color: #1C1814; margin-bottom: 12px; }\n    .pf-sheet-desc { color: rgba(28,24,20,.68); font-size: 16px; line-height: 1.6; max-width: 640px; margin-bottom: 28px; }\n    .pf-sheet-grid { display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px; }\n    .pf-group { display: grid; gap: 12px; }\n    .pf-group-h { grid-template-columns: repeat(2, 1fr); }\n    .pf-group-h .pf-item { aspect-ratio: 16 / 9; }\n    .pf-group-v { grid-template-columns: repeat(5, 1fr); }\n    .pf-group-p { grid-template-columns: repeat(4, 1fr); }\n    .pf-item { position: relative; cursor: pointer; border-radius: 16px; overflow: hidden; background: #E9E1D5; aspect-ratio: 9 / 16; }\n    .pf-item.photo { aspect-ratio: 4 / 5; }\n    .pf-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }\n    .pf-item:hover img { transform: scale(1.04); }\n    .pf-item-play { position: absolute; inset: 0; display: grid; place-items: center; background: linear-gradient(to top, rgba(0,0,0,.55), transparent 55%); }\n    .pf-item-play span { width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,.92); color: #1C1814; font-size: 15px; padding-left: 3px; }\n    .pf-item-title { position: absolute; left: 10px; right: 10px; bottom: 10px; color: #fff; font-size: 12.5px; font-weight: 600; text-shadow: 0 1px 8px rgba(0,0,0,.5); }\n    .pf-sheet-cta { display: inline-flex; }\n\n    .pf-viewer { background: rgba(14,12,10,.92); align-items: center; justify-content: center; padding: 60px 70px; }\n    .pf-stage { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }\n    .pf-stage video, .pf-stage img { max-width: 100%; max-height: 100%; border-radius: 16px; background: #000; }\n    .pf-yt { position: relative; width: min(100%, 1100px); aspect-ratio: 16 / 9; }\n    .pf-yt iframe { width: 100%; height: 100%; border: 0; border-radius: 16px; display: block; }\n    /* Caches : le titre / partager (en haut) et le logo YouTube (en bas à droite) ne sont plus cliquables */\n    /* Lecteur YouTube entièrement recouvert : aucun clic n'atteint YouTube. Nos propres commandes en dessous. */\n    .pf-yt { background: #000; border-radius: 16px; overflow: hidden; }\n    .pf-yt .yt-shield { position: absolute; inset: 0; z-index: 3; cursor: pointer; }\n    .pf-yt .yt-bar { position: absolute; left: 0; right: 0; bottom: 0; z-index: 4; display: flex; align-items: center; gap: 12px;\n      padding: 14px 16px; background: linear-gradient(to top, rgba(0,0,0,.75), transparent); color: #fff; transition: opacity .3s; }\n    .pf-yt.idle .yt-bar { opacity: 0; }\n    .pf-yt .yt-btn { background: none; border: none; color: #fff; cursor: pointer; font-size: 18px; width: 32px; height: 32px; display: grid; place-items: center; }\n    .pf-yt .yt-time { font: 500 12px 'Inter', sans-serif; opacity: .9; white-space: nowrap; min-width: 84px; }\n    .pf-yt .yt-seek { flex: 1; height: 5px; border-radius: 5px; background: rgba(255,255,255,.3); position: relative; cursor: pointer; }\n    .pf-yt .yt-seek i { position: absolute; left: 0; top: 0; bottom: 0; width: 0; border-radius: 5px; background: var(--orange); }\n    .pf-yt:fullscreen { border-radius: 0; width: 100%; height: 100%; }\n    .pf-viewer .pf-close { position: fixed; top: 20px; right: 20px; }\n    .pf-nav { position: fixed; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; border: none; cursor: pointer;\n      background: rgba(255,255,255,.9); color: #1C1814; font-size: 26px; line-height: 1; z-index: 5; }\n    .pf-prev { left: 14px; } .pf-next { right: 14px; }\n\n    @media (max-width: 900px) {\n      .pf-group-v { grid-template-columns: repeat(3, 1fr); }\n      .pf-group-p { grid-template-columns: repeat(3, 1fr); }\n      .pf-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }\n      .pf-card.big { grid-column: span 2; aspect-ratio: 16 / 10; }\n    }\n    @media (max-width: 600px) {\n      .pf { padding: 10px 16px 70px; }\n      .pf-tab { padding: 11px 24px; font-size: 14px; }\n      .pf-grid { grid-template-columns: 1fr; }\n      .pf-card, .pf-card.big { grid-column: auto; aspect-ratio: 4 / 5; }\n      .pf-card-name { font-size: 22px; }\n      .pf-sheet { padding: 0; }\n      .pf-sheet-box { border-radius: 0; min-height: 100%; padding: 70px 18px 30px; }\n      .pf-sheet-name { font-size: 30px; }\n      .pf-group-h { grid-template-columns: 1fr; }\n      .pf-group-v, .pf-group-p { grid-template-columns: 1fr 1fr; }\n      .pf-viewer { padding: 60px 10px; }\n      .pf-nav { top: auto; bottom: 18px; transform: none; }\n      .pf-prev { left: calc(50% - 60px); } .pf-next { right: calc(50% - 60px); }\n    }\n  \n    .pf-more { text-align: center; margin-top: 34px; }\n    .pf-more a { color: var(--orange); font-weight: 500; text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 2px; }\n";
  document.head.appendChild(style);
  document.body.insertAdjacentHTML('beforeend', '<!-- FICHE PROJET -->\n  <div class="pf-sheet" id="pf-sheet" aria-hidden="true">\n    <div class="pf-sheet-box" role="dialog" aria-modal="true">\n      <button class="pf-close" data-close aria-label="Fermer">✕</button>\n      <div class="pf-sheet-head">\n        <div class="pf-sheet-where" id="pf-sheet-where"></div>\n        <h2 class="pf-sheet-name" id="pf-sheet-name"></h2>\n        <p class="pf-sheet-desc" id="pf-sheet-desc"></p>\n      </div>\n      <div class="pf-sheet-grid" id="pf-sheet-grid"></div>\n      <a href="https://client.maderinoprod.com/rdv/cmvygyx7f0000jn08plu1e9ka" target="_blank" class="btn-primary pf-sheet-cta">Démarrer un projet similaire</a>\n    </div>\n  </div>\n\n  <!-- VISIONNEUSE -->\n  <div class="pf-viewer" id="pf-viewer" aria-hidden="true">\n    <button class="pf-close pf-viewer-close" data-vclose aria-label="Fermer">✕</button>\n    <button class="pf-nav pf-prev" data-dir="-1" aria-label="Précédent">‹</button>\n    <div class="pf-stage" id="pf-stage"></div>\n    <button class="pf-nav pf-next" data-dir="1" aria-label="Suivant">›</button>\n  </div>\n');

  function cover(p) {
    if (p.cover) return p.cover; // image de couverture choisie à la main
    const first = p.items.find(i => i.k === 'video') || p.items[0];
    return first.k === 'video' ? first.poster : first.k === 'photo' ? first.src : 'https://img.youtube.com/vi/' + first.id + '/maxresdefault.jpg';
  }
  function count(p) {
    const n = p.items.filter(i => i.k !== 'photo').length, f = p.items.filter(i => i.k === 'photo').length;
    return [n ? n + (n > 1 ? ' vidéos' : ' vidéo') : '', f ? f + (f > 1 ? ' photos' : ' photo') : ''].filter(Boolean).join(' · ');
  }

  /* Aperçu vidéo au survol, sur ordinateur uniquement. Sur téléphone, on garde l'image : les vidéos sont en 1080p
     et lourdes, on ne les charge que si la personne ouvre la fiche. */
  const touch = matchMedia('(hover: none)').matches;
  function play(card, on) {
    const vid = card.querySelector('video'); if (!vid) return;
    if (on) { if (!vid.src) vid.src = vid.dataset.src; vid.play().then(() => card.classList.add('playing')).catch(() => {}); }
    else { vid.pause(); card.classList.remove('playing'); }
  }
  let io;
  function observe() {
    document.querySelectorAll('.pf-card').forEach(c => {
      c.addEventListener('mouseenter', () => !touch && play(c, true));
      c.addEventListener('mouseleave', () => !touch && play(c, false));
    });
  }

  /* Fiche projet */
  let current = null;
  /* Roulette de la fiche client */
  let shCur = 0, shX = null, shDrag = false;
  const shStyle = document.createElement('style');
  shStyle.textContent = `
    .sh-cf { position: relative; height: clamp(360px, 48vh, 520px); perspective: 1400px; overflow: hidden; margin: 0 -40px; touch-action: pan-y; user-select: none; }
    .sh-card { position: absolute !important; top: 50%; left: 50%; aspect-ratio: auto !important;
      transition: transform .6s cubic-bezier(.22,1,.36,1), opacity .4s, filter .4s; }
    .sh-card img, .sh-card video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; background: #000; }
    .sh-card video { opacity: 0; transition: opacity .4s; } .sh-card.playing video { opacity: 1; }
    .sh-card:hover img { transform: none; }
    .sh-card.side { cursor: pointer; } .sh-card.side .pf-item-play { opacity: 0; }
    .sh-bar { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 4px; }
    @media (max-width: 768px) { .sh-cf { height: 420px; margin: 0 -18px; } }
  `;
  document.head.appendChild(shStyle);
  function shLayout() {
    const cards = [...document.querySelectorAll('#pf-sheet .sh-card')], N = cards.length; if (!N) return;
    const mob = innerWidth < 769;
    // Chaque carte garde le format de sa vidéo (16:9, 9:16) ou de sa photo, au lieu d'être recadrée en 4:5
    const stage = document.querySelector('#pf-sheet .sh-cf'), H = stage.clientHeight - 30, Wmax = stage.clientWidth * (mob ? .86 : .62);
    const size = cards.map(c => {
      const img = c.querySelector('img');
      const r = +c.dataset.r || (img && img.naturalWidth ? img.naturalWidth / img.naturalHeight : .8);
      const h = Math.min(H, Wmax / r), w = h * r;
      c.style.width = w + 'px'; c.style.height = h + 'px';
      return w;
    });
    const rel = i => { let d = ((i - shCur) % N + N) % N; if (d > N / 2) d -= N; return d; };
    const byD = {}; cards.forEach((c, i) => byD[rel(i)] = i);
    const hs = cards.map(c => parseFloat(c.style.height)), hC = hs[byD[0]];
    // Les cartes de côté ne dépassent jamais la hauteur de celle du centre (sinon une vidéo verticale écrase une horizontale)
    const scOf = d => { const i = byD[d]; if (i === undefined) return 1; const a = Math.abs(d); const wC = parseFloat(cards[byD[0]].style.width), wi = parseFloat(cards[i].style.width); return a ? Math.min(1 - Math.min(a, 3) * .06, hC * .92 / hs[i], Math.max(wC, hC * .7) * (a > 1 ? .8 : .95) / wi) : 1; };
    const xOf = d => { let x = 0; const s = Math.sign(d); for (let k = 0; k !== d; k += s) x += s * (() => { const w1 = size[byD[k]] * scOf(k), w2 = size[byD[k + s]] * scOf(k + s); return (w1 + w2) / 2 - Math.min(w1, w2) * (mob ? .45 : .3); })(); return x; }; // les voisines dépassent toujours un peu, même derrière une vidéo horizontale
    cards.forEach((c, i) => {
      const d = rel(i);
      const a = Math.abs(d), w = c.offsetWidth;
      const jump = c._d !== undefined && Math.abs(d - c._d) > 1; c._d = d;
      if (jump) c.style.transition = 'none';
      c.style.transform = `translate(calc(-50% + ${xOf(d)}px), -50%) translateZ(${-a * 160}px) rotateY(${-Math.sign(d) * Math.min(a, 1) * 35}deg) scale(${scOf(d)})`;
      c.style.zIndex = 100 - a; c.style.opacity = a > 2 ? 0 : 1; c.style.pointerEvents = a > 2 ? 'none' : '';
      c.style.filter = a ? `brightness(${1 - Math.min(a, 2) * .2})` : '';
      c.classList.toggle('center', !d); c.classList.toggle('side', !!d);
      if (jump) { c.offsetWidth; c.style.transition = ''; }
      const v = c.querySelector('video');
      if (v) { if (!d) { if (!v.src) v.src = v.dataset.src; v.play().then(() => c.classList.add('playing')).catch(() => {}); } else { v.pause(); c.classList.remove('playing'); } }
    });
    document.querySelectorAll('#pf-sheet [data-shgo]').forEach((x, i) => x.classList.toggle('on', i === ((shCur % N) + N) % N));
  }
  window.__shLayout = shLayout;
  const shGoTo = n => { const N = document.querySelectorAll('#pf-sheet .sh-card').length; let d = ((n - shCur) % N + N) % N; if (d > N / 2) d -= N; shCur += d; shLayout(); };
  document.addEventListener('click', e => {
    const t = e.target, sheet = $('pf-sheet'); if (!sheet || !sheet.contains(t)) return;
    const b = t.closest('[data-sh]'), g = t.closest('[data-shgo]'), c = t.closest('.sh-card');
    if (b) { shCur += +b.dataset.sh; shLayout(); e.stopPropagation(); }
    else if (g) { shGoTo(+g.dataset.shgo); e.stopPropagation(); }
    else if (c && (shDrag || c.classList.contains('side'))) { if (!shDrag) shGoTo(+c.dataset.n); e.stopPropagation(); }
  }, true);
  document.addEventListener('pointerdown', e => { if (e.target.closest('#pf-sheet .sh-cf')) { shX = e.clientX; shDrag = false; } });
  addEventListener('pointerup', e => { if (shX === null) return; const dx = e.clientX - shX; shX = null;
    if (Math.abs(dx) > 40) { shDrag = true; shCur += dx < 0 ? 1 : -1; shLayout(); setTimeout(() => shDrag = false, 50); } });
  addEventListener('resize', shLayout);

  function openSheet(id) {
    current = PROJECTS.find(p => p.id === id);
    $('pf-sheet-where').textContent = current.where;
    $('pf-sheet-name').textContent = current.client;
    $('pf-sheet-desc').textContent = current.desc;
    // Les éléments du client en roulette 3D (même principe que la roulette des réalisations) :
    // vidéos d'abord, puis photos. La carte du centre lit sa vidéo en silencieux ; un clic dessus l'ouvre en grand.
    const order = current.items.map((it, i) => [it, i]).sort((x, y) => (x[0].k === 'photo') - (y[0].k === 'photo'));
    $('pf-sheet-grid').innerHTML = '<div class="sh-cf">' + order.map(([it, i], n) => {
      const img = it.k === 'video' ? it.poster : it.k === 'photo' ? it.src : 'https://img.youtube.com/vi/' + it.id + '/maxresdefault.jpg';
      const r = it.k === 'photo' ? '' : (it.fmt === 'h' || it.k === 'yt') ? 16 / 9 : 9 / 16;
      return `<div class="pf-item sh-card${it.k === 'photo' ? ' photo' : ''}" data-i="${i}" data-n="${n}" data-r="${r}"><img src="${img}" alt="${current.client}" draggable="false" onload="this.closest('.sh-card') && window.__shLayout && window.__shLayout()">
        ${it.k === 'video' ? `<video muted loop playsinline preload="none" data-src="${it.src}"></video>` : ''}
        ${it.k !== 'photo' ? '<div class="pf-item-play"><span><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg></span></div><div class="pf-item-title">' + it.title + '</div>' : ''}</div>`;
    }).join('') + '</div>' + (order.length > 1 ? `<div class="sh-bar"><button class="rl-btn" data-sh="-1" aria-label="Précédent">←</button><div class="cf-dots">${order.map((_, n) => `<i data-shgo="${n}"></i>`).join('')}</div><button class="rl-btn" data-sh="1" aria-label="Suivant">→</button></div>` : '');
    shCur = 0;
    $('pf-sheet').classList.add('open'); $('pf-sheet').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    shLayout();
  }
  function closeSheet() { document.querySelectorAll('#pf-sheet video').forEach(v => v.pause()); $('pf-sheet').classList.remove('open'); $('pf-sheet').setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

  /* Visionneuse (vidéo 1080p, photo, YouTube protégé) */
  let vi = 0;
  function show(i) {
    const items = current.items; vi = (i + items.length) % items.length; const it = items[vi];
    const st = $('pf-stage');
    if (it.k === 'video') st.innerHTML = `<video src="${it.src}" poster="${it.poster}" controls autoplay playsinline controlslist="nodownload" disablepictureinpicture></video>`;
    else if (it.k === 'photo') st.innerHTML = `<img src="${it.src}" alt="${current.client}">`;
    else { st.innerHTML = `<div class="pf-yt"><iframe src="https://www.youtube-nocookie.com/embed/${it.id}?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}" allow="autoplay; encrypted-media" tabindex="-1"></iframe><div class="yt-shield"></div><div class="yt-bar"><button class="yt-btn" data-yt="play" aria-label="Lecture">❚❚</button><div class="yt-seek" data-yt="seek"><i></i></div><span class="yt-time">0:00</span><button class="yt-btn" data-yt="mute" aria-label="Son">🔊</button><button class="yt-btn" data-yt="full" aria-label="Plein écran">⛶</button></div></div>`; ytInit(st.querySelector('.pf-yt')); }
    document.querySelectorAll('.pf-nav').forEach(b => b.style.display = items.length > 1 ? '' : 'none');
  }

  /* Lecteur YouTube maison : on pilote YouTube par messages, sans jamais laisser cliquer dans son lecteur */
  function ytInit(box) {
    const ifr = box.querySelector('iframe'), bar = box.querySelector('.yt-bar');
    const st = { playing: true, muted: false, t: 0, d: 0 };
    const cmd = (func, args = []) => ifr.contentWindow && ifr.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
    const fmt = x => Math.floor(x / 60) + ':' + String(Math.floor(x % 60)).padStart(2, '0');
    const paint = () => {
      bar.querySelector('[data-yt=play]').textContent = st.playing ? '❚❚︎' : '▶︎';
      bar.querySelector('[data-yt=mute]').textContent = st.muted ? '🔇' : '🔊';
      bar.querySelector('.yt-seek i').style.width = (st.d ? st.t / st.d * 100 : 0) + '%';
      bar.querySelector('.yt-time').textContent = fmt(st.t) + ' / ' + fmt(st.d);
    };
    ifr.addEventListener('load', () => ifr.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 1 }), '*'));
    const onMsg = e => {
      if (e.source !== ifr.contentWindow) return;
      let m; try { m = JSON.parse(e.data); } catch { return; }
      const i = m.info || {};
      if (typeof i.currentTime === 'number') st.t = i.currentTime;
      if (typeof i.duration === 'number') st.d = i.duration;
      if (typeof i.playerState === 'number') st.playing = i.playerState === 1 || i.playerState === 3;
      if (typeof i.muted === 'boolean') st.muted = i.muted;
      paint();
    };
    addEventListener('message', onMsg);
    const toggle = () => { st.playing ? cmd('pauseVideo') : cmd('playVideo'); st.playing = !st.playing; paint(); };
    box.querySelector('.yt-shield').addEventListener('click', toggle);
    bar.addEventListener('click', e => {
      e.stopPropagation();
      const b = e.target.closest('[data-yt]'); if (!b) return;
      const k = b.dataset.yt;
      if (k === 'play') toggle();
      if (k === 'mute') { st.muted ? cmd('unMute') : cmd('mute'); st.muted = !st.muted; paint(); }
      if (k === 'full') { document.fullscreenElement ? document.exitFullscreen() : (box.requestFullscreen || box.webkitRequestFullscreen).call(box); }
      if (k === 'seek' && st.d) { const r = b.getBoundingClientRect(); const t = (e.clientX - r.left) / r.width * st.d; cmd('seekTo', [t, true]); st.t = t; paint(); }
    });
    let idle; const wake = () => { box.classList.remove('idle'); clearTimeout(idle); idle = setTimeout(() => st.playing && box.classList.add('idle'), 2500); };
    box.addEventListener('mousemove', wake); box.addEventListener('touchstart', wake, { passive: true }); wake();
  }
  function openViewer(i) { $('pf-viewer').classList.add('open'); show(i); }
  function closeViewer() { $('pf-stage').innerHTML = ''; $('pf-viewer').classList.remove('open'); }

  document.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('.pf-card[data-id]')) { openSheet(t.closest('.pf-card').dataset.id); return; }
    if (t.closest('.pf-item')) { openViewer(+t.closest('.pf-item').dataset.i); return; }
    if (t.closest('[data-vclose]') || t === $('pf-viewer')) { closeViewer(); return; }
    if (t.closest('.pf-nav')) { show(vi + +t.closest('.pf-nav').dataset.dir); return; }
    if (t.closest('[data-close]') || t === $('pf-sheet')) { closeSheet(); return; }
  });
  document.addEventListener('keydown', e => {
    if ($('pf-viewer').classList.contains('open')) {
      if (e.key === 'Escape') closeViewer(); if (e.key === 'ArrowRight') show(vi + 1); if (e.key === 'ArrowLeft') show(vi - 1);
    } else if (e.key === 'Escape') closeSheet();
  });
  document.addEventListener('contextmenu', e => { if (e.target.closest('.pf-viewer, .pf-sheet, .pf-card')) e.preventDefault(); });
  
  /* Carrousel 3D « roulette » : la carte du centre devant, les autres tournées sur les côtés.
     Flèches, swipe au doigt, glissé à la souris, clic sur une carte de côté pour l'amener au centre. */
  const st2 = document.createElement('style');
  st2.textContent = `
    /* pleine largeur d'écran + overflow caché : sinon les cartes de côté élargissent la page sur iPhone */
    .cf { position: relative; height: clamp(440px, 46vw, 560px); perspective: 1400px; width: 100vw; margin-left: calc(50% - 50vw); overflow: hidden; padding-top: 20px; padding-bottom: 80px; margin-bottom: -80px; box-sizing: content-box; touch-action: pan-y; user-select: none; }
    .cf .pf-card { position: absolute; top: 20px; left: 50%; width: clamp(260px, 28vw, 360px); aspect-ratio: 4 / 5;
      transform-style: preserve-3d; transition: transform .7s cubic-bezier(.22,1,.36,1), width .7s cubic-bezier(.22,1,.36,1), height .7s cubic-bezier(.22,1,.36,1), top .7s cubic-bezier(.22,1,.36,1), opacity .5s, filter .5s, box-shadow .5s; }
    .cf .pf-card:hover { transform: var(--t); }
    .cf .pf-card.side { cursor: pointer; }
    .cf .pf-card.side .pf-card-txt { opacity: .6; }
    .cf .pf-card.center { box-shadow: 0 40px 80px rgba(60,40,20,.35); }
    .cf .pf-card.center::before { content: ''; position: absolute; inset: 0; border-radius: inherit; border: 2px solid rgba(255,107,0,.0); z-index: 3; pointer-events: none; }
    .cf-end { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 14px; text-align: center; padding: 24px;
      background: #1C1814 !important; color: #fff; text-decoration: none; }
    .cf-end::after { display: none; }
    .cf-end b { font-size: 28px; font-weight: 700; letter-spacing: -0.04em; line-height: 1.1; }
    .cf-end img.cf-logo { position: static; width: 78%; height: auto; object-fit: contain; margin-bottom: 8px; }
    .cf-end b span { color: var(--orange); }
    .rl-bar { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 26px; }
    .rl-btn { width: 50px; height: 50px; border-radius: 50%; border: 1px solid rgba(28,24,20,.18); background: rgba(255,255,255,.6);
      cursor: pointer; font-size: 18px; color: #1C1814; transition: background .2s, color .2s; }
    .rl-btn:hover { background: var(--orange); color: #fff; border-color: var(--orange); }
    .cf-dots { display: flex; gap: 8px; }
    .cf-count { min-width: 64px; text-align: center; font-size: 14px; font-weight: 600; color: rgba(28,24,20,.6); font-variant-numeric: tabular-nums; }
    .cf-dots i { width: 8px; height: 8px; border-radius: 8px; background: rgba(28,24,20,.18); transition: width .3s, background .3s; cursor: pointer; }
    .cf-dots i.on { width: 26px; background: var(--orange); }
    @media (max-width: 768px) { .cf { height: 440px; } .cf .pf-card { width: 66vw; max-width: 300px; } }
  `;
  document.head.appendChild(st2);
  /* Swipe / glissé, clavier et redimensionnement : branchés une seule fois, ils pilotent la roulette affichée. */
  let api = null, x0 = null, dragged = false;
  addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40 && api) { dragged = true; api.go(dx < 0 ? 1 : -1); setTimeout(() => dragged = false, 50); } });
  box.tabIndex = 0; box.addEventListener('keydown', e => { if (!api) return; if (e.key === 'ArrowRight') api.go(1); if (e.key === 'ArrowLeft') api.go(-1); });
  addEventListener('resize', () => api && api.layout());

  function build(tab) {
    const list = PROJECTS.filter(p => p.tab === tab);
    // Une carte = une vidéo (pas de fiche client) : on mélange les clients à tour de rôle pour varier la roulette.
    const per = list.map(p => p.items.map((it, i) => ({ p, it, i })));
    const vids = [];
    for (let r = 0; per.some(l => l[r]); r++) per.forEach(l => l[r] && vids.push(l[r]));
    box.innerHTML = '<div class="cf">' + vids.map(({ p, it, i }, n) => {
      const img = it.k === 'video' ? it.poster : it.k === 'photo' ? it.src : 'https://img.youtube.com/vi/' + it.id + '/maxresdefault.jpg';
      const r = it.k === 'photo' ? '' : (it.fmt === 'h' || it.k === 'yt') ? 16 / 9 : 9 / 16; // photo : format lu sur l'image une fois chargée
      return `<article class="pf-card cf-vid" data-pid="${p.id}" data-i="${i}" data-n="${n}" data-r="${r}">
        <img src="${img}" alt="${p.client}" loading="lazy" draggable="false"${it.k === 'photo' ? ' data-photo' : ''}>
        ${it.k === 'video' ? `<video muted loop playsinline preload="none" data-src="${it.src}"></video>` : ''}
        <div class="pf-card-txt"><div class="pf-card-where">${it.title}</div><div class="pf-card-name">${p.client}</div></div>
      </article>`;
    }).join('') + `<a class="pf-card cf-end" data-n="${vids.length}" data-r="0.8" href="/portfolio/${tab === 'montage' ? '?onglet=montage' : ''}"><img class="cf-logo" src="/assets/logo-maderino-production.svg" alt="Maderino Production" draggable="false"><b>Voir tout<br>le portfolio <span>→</span></b></a></div>
      <div class="rl-bar"><button class="rl-btn" data-rl="-1" aria-label="Précédent">←</button>${vids.length + 1 > 12 ? '<div class="cf-count"></div>' : `<div class="cf-dots">${[...Array(vids.length + 1)].map((_, i) => `<i data-go="${i}"></i>`).join('')}</div>`}<button class="rl-btn" data-rl="1" aria-label="Suivant">→</button></div>`;
    const stage = box.querySelector('.cf'), cards = [...stage.querySelectorAll('.pf-card')], N = cards.length;
    let cur = 0;
    stage.querySelectorAll('img[data-photo]').forEach(im => im.addEventListener('load', () => layout()));
    function layout() {
      const mob = innerWidth < 769;
      const H = parseFloat(getComputedStyle(stage).height), Wmax = stage.clientWidth * (mob ? .86 : .5);
      const rel = i => { let d = ((i - cur) % N + N) % N; if (d > N / 2) d -= N; return d; };
      const byD = {}; cards.forEach((c, i) => byD[rel(i)] = i);
      // Carte du centre : son vrai format (vidéo horizontale, verticale, photo). Cartes de côté : toutes le même cadre
      // portrait, pour une roulette régulière ; elles prennent leur vrai format en arrivant au centre.
      const sideH = H * .86;
      const c0 = cards[byD[0]], r0 = +c0.dataset.r || ((im => im && im.naturalWidth ? im.naturalWidth / im.naturalHeight : .8)(c0.querySelector('img[data-photo]')));
      const hC = Math.min(H, Wmax / r0);
      const size = cards.map((c, i) => {
        const im = c.querySelector('img[data-photo]');
        const r = +c.dataset.r || (im && im.naturalWidth ? im.naturalWidth / im.naturalHeight : .8);
        let h = Math.min(H, Wmax / r), w = h * r;
        if (rel(i) !== 0) { h = Math.min(sideH, hC * 1.05); w = h * .62; } // jamais plus hautes que la carte du centre
        c.style.width = w + 'px'; c.style.height = h + 'px'; c.style.aspectRatio = 'auto'; c.style.top = (20 + (H - h) / 2) + 'px';
        return [w, h];
      });
      const scOf = d => byD[d] === undefined || !d ? 1 : 1 - Math.min(Math.abs(d), 3) * .05;
      const xOf = d => { let x = 0; const sg = Math.sign(d); for (let k = 0; k !== d; k += sg) { const w1 = size[byD[k]][0] * scOf(k), w2 = size[byD[k + sg]][0] * scOf(k + sg); x += sg * ((w1 + w2) / 2 - Math.min(w1, w2) * (mob ? .45 : .35)); } return x; };
      cards.forEach((c, i) => {
        // Boucle infinie : on prend le chemin le plus court autour de la roulette.
        const d = rel(i), a = Math.abs(d);
        // Une carte qui passe d'un bout à l'autre saute sans animation (sinon elle traverse l'écran).
        const jump = c._d !== undefined && Math.abs(d - c._d) > 1; c._d = d;
        if (jump) c.style.transition = 'none';
        const t = `translateX(calc(-50% + ${xOf(d)}px)) translateZ(${-a * 140}px) rotateY(${-Math.sign(d) * Math.min(a, 1) * 38}deg) scale(${scOf(d)})`;
        c.style.setProperty('--t', t); c.style.transform = t;
        c.style.zIndex = 100 - a; c.style.opacity = a > 2 ? 0 : 1; c.style.pointerEvents = a > 2 ? 'none' : '';
        c.style.filter = a ? `brightness(${1 - Math.min(a, 2) * 0.2})` : '';
        c.classList.toggle('center', !d); c.classList.toggle('side', !!d);
        if (jump) { c.offsetWidth; c.style.transition = ''; }
        const v = c.querySelector('video');
        // Aperçu en boucle sur toutes les cartes visibles (centre et côtés), pas seulement celle du centre
        const visible = a <= (innerWidth < 769 ? 1 : 2);
        if (v) { if (visible) { v.muted = true; if (!v.src) v.src = v.dataset.src; v.play().then(() => c.classList.add('playing')).catch(() => {}); } else { v.pause(); c.classList.remove('playing'); } }
      });
      box.querySelectorAll('.cf-dots i').forEach((d, i) => d.classList.toggle('on', i === ((cur % N) + N) % N));
      const cnt = box.querySelector('.cf-count'); if (cnt) cnt.textContent = (((cur % N) + N) % N + 1) + ' / ' + N; // trop de cartes pour des points : compteur
    }
    const go = i => { cur = i; layout(); };
    box.querySelectorAll('[data-rl]').forEach(b => b.addEventListener('click', () => go(cur + +b.dataset.rl)));
    box.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => { let d = ((+b.dataset.go - cur) % N + N) % N; if (d > N / 2) d -= N; go(cur + d); }));
    // Une carte de côté : on l'amène au centre au lieu d'ouvrir la fiche.
    stage.addEventListener('click', e => { const c = e.target.closest('.pf-card'); if (!c) return;
      if (dragged || c.classList.contains('side')) { e.preventDefault(); e.stopPropagation(); if (!dragged) { let d = ((+c.dataset.n - cur) % N + N) % N; if (d > N / 2) d -= N; go(cur + d); } }
      else if (c.dataset.pid) { e.stopPropagation(); const pv = c.querySelector('video'); if (pv) pv.pause(); current = PROJECTS.find(p => p.id === c.dataset.pid); openViewer(+c.dataset.i); } }, true);
    stage.addEventListener('pointerdown', e => { x0 = e.clientX; dragged = false; });
    api = { go: d => go(cur + d), layout };
    layout();
  }
  build(tab);
  // Si le navigateur a bloqué la lecture automatique (économie d'énergie…), on relance les aperçus au premier geste.
  const relance = () => api && api.layout();
  // (pas seulement une fois : sur iPhone en mode économie d'énergie, chaque geste peut débloquer la lecture)
  let lastTry = 0;
  const relanceSiBloque = () => { const now = Date.now(); if (now - lastTry < 700) return; lastTry = now;
    if ([...box.querySelectorAll('.pf-card:not(.playing) video')].some(v => v.closest('.pf-card').style.opacity !== '0')) relance(); };
  ['touchstart', 'pointerdown', 'scroll', 'keydown'].forEach(ev => addEventListener(ev, relanceSiBloque, { passive: true }));
  // Les aperçus démarrent quand la roulette arrive à l'écran
  if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => e.isIntersecting && relance())).observe(box);
  /* Onglets Tournage / Montage (page d'accueil) : boutons avec data-rl-tab="tournage" ou "montage". */
  document.querySelectorAll('[data-rl-tab]').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('[data-rl-tab]').forEach(x => x.classList.toggle('on', x === b));
    build(b.dataset.rlTab);
  }));
})();

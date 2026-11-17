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
  function openSheet(id) {
    current = PROJECTS.find(p => p.id === id);
    $('pf-sheet-where').textContent = current.where;
    $('pf-sheet-name').textContent = current.client;
    $('pf-sheet-desc').textContent = current.desc;
    // Rangement propre : vidéos horizontales ensemble, puis verticales, puis photos (chaque groupe a sa grille)
    const card = (it, i) => {
      const img = it.k === 'video' ? it.poster : it.k === 'photo' ? it.src : 'https://img.youtube.com/vi/' + it.id + '/maxresdefault.jpg';
      return `<div class="pf-item${it.k === 'photo' ? ' photo' : ''}" data-i="${i}"><img src="${img}" alt="${current.client}" loading="lazy" draggable="false">
        ${it.k !== 'photo' ? '<div class="pf-item-play"><span><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg></span></div><div class="pf-item-title">' + it.title + '</div>' : ''}</div>`;
    };
    const groups = [
      ['h', current.items.map((it, i) => [it, i]).filter(([it]) => it.k !== 'photo' && it.fmt === 'h')],
      ['v', current.items.map((it, i) => [it, i]).filter(([it]) => it.k !== 'photo' && it.fmt !== 'h')],
      ['p', current.items.map((it, i) => [it, i]).filter(([it]) => it.k === 'photo')],
    ].filter(([, list]) => list.length);
    $('pf-sheet-grid').innerHTML = groups.map(([g, list]) =>
      `<div class="pf-group pf-group-${g}">${list.map(([it, i]) => card(it, i)).join('')}</div>`).join('');
    $('pf-sheet').classList.add('open'); $('pf-sheet').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeSheet() { $('pf-sheet').classList.remove('open'); $('pf-sheet').setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

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
    if (t.closest('.pf-card')) { openSheet(t.closest('.pf-card').dataset.id); return; }
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
  
  /* Carrousel horizontal : cartes portrait de même taille, défilement au doigt / à la souris, flèches. */
  const st2 = document.createElement('style');
  st2.textContent = `
    .rl-wrap { position: relative; margin-right: calc(50% - 50vw); }
    .rl-track { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
      padding: 40px 40px 60px 40px; margin: -30px 0 -30px -40px; cursor: grab; scroll-padding-left: 40px; }
    .rl-track::-webkit-scrollbar { display: none; }
    .rl-track.drag { cursor: grabbing; scroll-snap-type: none; }
    .rl-track .pf-card { flex: 0 0 clamp(260px, 26vw, 340px); aspect-ratio: 4 / 5; scroll-snap-align: start; }
    .rl-track .pf-card:hover { transform: translateY(-6px) rotate(-.4deg); }
    .rl-num { position: absolute; top: 16px; right: 18px; z-index: 2; color: #fff; font-size: 13px; font-weight: 600; opacity: .85; letter-spacing: .05em; }
    .rl-end { flex: 0 0 clamp(220px, 20vw, 280px); aspect-ratio: 4 / 5; scroll-snap-align: start; border-radius: 24px;
      border: 1.5px dashed rgba(255,107,0,.45); display: flex; flex-direction: column; justify-content: center; align-items: center;
      gap: 14px; text-align: center; padding: 24px; text-decoration: none; color: inherit; transition: background .3s, transform .3s; }
    .rl-end:hover { background: rgba(255,107,0,.08); transform: translateY(-6px); }
    .rl-end b { font-size: 26px; font-weight: 700; letter-spacing: -0.04em; line-height: 1.1; }
    .rl-end span { width: 54px; height: 54px; border-radius: 50%; background: var(--orange); color: #fff; display: grid; place-items: center; font-size: 22px; }
    .rl-bar { display: flex; align-items: center; gap: 16px; margin-top: 6px; }
    .rl-prog { flex: 1; max-width: 260px; height: 3px; border-radius: 3px; background: rgba(28,24,20,.12); overflow: hidden; }
    .rl-prog i { display: block; height: 100%; width: 0; background: var(--orange); border-radius: 3px; transition: width .15s; }
    .rl-btn { width: 46px; height: 46px; border-radius: 50%; border: 1px solid rgba(28,24,20,.18); background: rgba(255,255,255,.6);
      cursor: pointer; font-size: 18px; color: #1C1814; transition: background .2s, color .2s, opacity .2s; }
    .rl-btn:hover { background: var(--orange); color: #fff; border-color: var(--orange); }
    .rl-btn:disabled { opacity: .3; pointer-events: none; }
    @media (max-width: 768px) { .rl-track { gap: 14px; padding-right: 20px; padding-left: 20px; margin-left: -20px; scroll-padding-left: 20px; } .rl-track .pf-card { flex-basis: 74vw; } .rl-end { flex-basis: 60vw; } }
  `;
  document.head.appendChild(st2);
  const list = PROJECTS.filter(p => p.tab === tab);
  box.innerHTML = '<div class="rl-wrap"><div class="rl-track">' + list.map((p, i) => {
    const prev = p.items.find(x => x.k === 'video');
    return `<article class="pf-card" data-id="${p.id}">
      <img src="${cover(p)}" alt="${p.client}" loading="lazy" draggable="false">
      ${prev ? `<video muted loop playsinline preload="none" data-src="${prev.src}"></video>` : ''}
      <span class="rl-num">${String(i + 1).padStart(2, '0')}</span>
      <div class="pf-card-txt"><div class="pf-card-where">${p.where}</div><div class="pf-card-name">${p.client}</div><div class="pf-card-count">${count(p)}</div></div>
    </article>`;
  }).join('') + `<a class="rl-end" href="/portfolio/${tab === 'montage' ? '?onglet=montage' : ''}"><span>→</span><b>Voir tout<br>le portfolio</b></a></div></div>
    <div class="rl-bar"><button class="rl-btn" data-rl="-1" aria-label="Précédent">←</button><button class="rl-btn" data-rl="1" aria-label="Suivant">→</button><div class="rl-prog"><i></i></div></div>`;
  const track = box.querySelector('.rl-track'), bar = box.querySelector('.rl-prog i');
  const upd = () => { const m = track.scrollWidth - track.clientWidth;
    bar.style.width = (m > 0 ? 15 + 85 * track.scrollLeft / m : 100) + '%';
    box.querySelector('[data-rl="-1"]').disabled = track.scrollLeft < 5;
    box.querySelector('[data-rl="1"]').disabled = track.scrollLeft > m - 5; };
  track.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  box.querySelectorAll('[data-rl]').forEach(b => b.addEventListener('click', () =>
    track.scrollBy({ left: +b.dataset.rl * track.querySelector('.pf-card').offsetWidth * 1.05, behavior: 'smooth' })));
  // Glisser à la souris (sur ordinateur). Un glissé ne compte pas comme un clic.
  let x0 = 0, s0 = 0, down = false, moved = false;
  track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = track.scrollLeft; });
  addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 5) { moved = true; track.classList.add('drag'); } track.scrollLeft = s0 - dx; });
  addEventListener('pointerup', () => { if (!down) return; down = false; track.classList.remove('drag'); });
  track.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  observe();
})();

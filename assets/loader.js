/* Écran de chargement : logo animé, une fois par visite */
(() => {
  let vu = false;
  try { vu = sessionStorage.getItem('mp-ldr') === '1'; sessionStorage.setItem('mp-ldr', '1'); } catch (e) {}
  if (vu || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const css = `
.ldr{position:fixed;inset:0;z-index:99999;display:grid;place-content:center;justify-items:center;gap:18px;background:#0b0a09;color:#f4efe9;overflow:hidden;font-family:Inter,system-ui,sans-serif;transition:opacity .5s ease,visibility .5s}
.ldr.out{opacity:0;visibility:hidden}
.ldr-glow{position:absolute;left:50%;top:50%;margin:-260px 0 0 -260px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,0,.28),transparent 65%);filter:blur(20px);animation:ldr-breathe 3s ease-in-out infinite}
.ldr-logo{position:relative;width:132px;height:88px;overflow:visible}
.ldr-tri,.ldr-dot{transform-box:fill-box}
.ldr-tri{fill:#ff6b00;transform-origin:30% 50%;filter:drop-shadow(0 0 14px rgba(255,107,0,.55));animation:ldr-tri 2.4s cubic-bezier(.5,0,.2,1) infinite}
.ldr-dot{fill:#f4efe9;transform-origin:50% 100%;animation:ldr-dot 2.4s cubic-bezier(.5,0,.2,1) infinite}
.ldr-brand{position:relative;font-weight:800;font-size:22px;letter-spacing:-.03em}
.ldr-brand em{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;color:#ff6b00}
.ldr-bar{position:relative;width:180px;height:3px;border-radius:999px;background:hsla(0,0%,100%,.08);overflow:hidden}
.ldr-bar i{position:absolute;top:0;bottom:0;width:40%;border-radius:inherit;background:linear-gradient(90deg,transparent,#ff8a3d,transparent);animation:ldr-slide 1.2s ease-in-out infinite}
@keyframes ldr-breathe{0%,to{transform:scale(.9);opacity:.7}50%{transform:scale(1.1);opacity:1}}
@keyframes ldr-slide{0%{left:-40%}to{left:100%}}
@keyframes ldr-tri{0%{transform:scale(.4) rotate(-90deg);opacity:0}18%{transform:scale(1.08) rotate(0);opacity:1}26%{transform:scale(1)}55%{transform:translateX(0)}62%{transform:translateX(6px) scale(.94)}72%{transform:translateX(0) scale(1)}90%{transform:scale(1);opacity:1}to{transform:scale(.4) rotate(90deg);opacity:0}}
@keyframes ldr-dot{0%,22%{transform:translateY(-46px) scale(.6);opacity:0}34%{transform:translateY(0) scale(1.15,.8);opacity:1}42%{transform:translateY(-14px) scale(.95,1.05)}50%{transform:translateY(0) scale(1.05,.92)}56%{transform:translateY(0) scale(1)}62%{transform:translateX(-4px)}72%{transform:translateX(0)}90%{transform:scale(1);opacity:1}to{transform:scale(0);opacity:0}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const el = document.createElement('div'); el.className = 'ldr'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<div class="ldr-glow"></div><svg class="ldr-logo" viewBox="0 0 120 80"><path class="ldr-tri" d="M14 12 L62 40 L14 68 Z"/><circle class="ldr-dot" cx="84" cy="40" r="8"/></svg><div class="ldr-brand">maderino <em>production.</em></div><div class="ldr-bar"><i></i></div>';
  const pose = () => document.body.appendChild(el);
  document.body ? pose() : document.addEventListener('DOMContentLoaded', pose);
  const debut = Date.now();
  const fin = () => setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 600); }, Math.max(0, 1400 - (Date.now() - debut)));
  document.readyState === 'complete' ? fin() : addEventListener('load', fin);
  setTimeout(fin, 4000);
})();

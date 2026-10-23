/* 透镜群岛 · LENS 04 · 四扇门 · 自由的几副面孔
 * 四个场景：四扇门 → 自繇（译者的工作台）→ 两条词根 → 霍菲尔德的八块拼图
 */
(function () {
  'use strict';

  const H = 62;
  const SERIF = '"Noto Serif SC","Songti SC","STSong",serif';
  const MONO = '"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace';
  const TAU = Math.PI * 2;
  const lime = (l, a, s) => `hsl(${H} ${s == null ? 85 : s}% ${l == null ? 62 : l}% / ${a == null ? 1 : a})`;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function makeKit(api) {
    const fns = []; let alive = true;
    return {
      get alive() { return alive && api.alive; },
      raf(fn) { const c = api.raf(fn); fns.push(c); return c; },
      on(t, e, f, o) { t.addEventListener(e, f, o); fns.push(() => t.removeEventListener(e, f, o)); },
      later(fn, ms) { const id = api.timeout(fn, ms); fns.push(() => clearTimeout(id)); return id; },
      end() { alive = false; fns.splice(0).forEach(f => { try { f(); } catch (e) { /* ignore */ } }); },
    };
  }
  function painter(api, kit, draw) {
    if (!api.reduced) { kit.raf((t, dt) => { if (kit.alive) draw(t, dt); }); return () => {}; }
    let q = false;
    const inv = () => { if (q || !kit.alive) return; q = true; kit.raf(() => { q = false; if (kit.alive) draw(0, 1000); return false; }); };
    inv();
    return inv;
  }
  const approach = (cur, tgt, dt, tau) => cur + (tgt - cur) * (1 - Math.exp(-dt / (tau || 160)));
  function glow(ctx, x, y, r, h, s, l, a) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `hsl(${h} ${s}% ${l}% / ${a})`); g.addColorStop(1, `hsl(${h} ${s}% ${l}% / 0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  }

  // Tap-to-select + tap-to-place, or drag-and-drop. Items and zones are buttons, so keyboard works too.
  function makePicker(kit, onDrop) {
    let sel = null, justDragged = false;
    function setSel(n) { if (sel) sel.classList.remove('sel'); sel = n; if (n) n.classList.add('sel'); }
    return {
      item(node, key) {
        node.dataset.key = key;
        let st = null;
        kit.on(node, 'pointerdown', e => { if (node.disabled) return; st = { x: e.clientX, y: e.clientY, id: e.pointerId, drag: false }; });
        kit.on(node, 'pointermove', e => {
          if (!st || e.pointerId !== st.id) return;
          const dx = e.clientX - st.x, dy = e.clientY - st.y;
          if (!st.drag && Math.hypot(dx, dy) > 8) { st.drag = true; try { node.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ } node.classList.add('drag'); setSel(null); }
          if (st.drag) node.style.transform = `translate(${dx}px,${dy}px)`;
        });
        const end = e => {
          if (!st || e.pointerId !== st.id) return;
          const was = st.drag; st = null;
          if (!was) return;
          justDragged = true; kit.later(() => { justDragged = false; }, 60);
          node.classList.remove('drag'); node.style.transform = '';
          if (e.type !== 'pointerup') return;
          node.style.visibility = 'hidden';
          const t = document.elementFromPoint(e.clientX, e.clientY);
          node.style.visibility = '';
          const z = t && t.closest && t.closest('[data-zone]');
          if (z) onDrop(node.dataset.key, z.dataset.zone, node, z);
        };
        kit.on(node, 'pointerup', end); kit.on(node, 'pointercancel', end);
        kit.on(node, 'click', () => { if (justDragged || node.disabled) return; setSel(sel === node ? null : node); });
      },
      zone(node, key) {
        node.dataset.zone = key;
        const act = () => { if (!sel) return; const s = sel; setSel(null); onDrop(s.dataset.key, key, s, node); };
        kit.on(node, 'click', e => { if (e.target.closest && e.target.closest('[data-key]')) return; act(); });
        kit.on(node, 'keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === node) { e.preventDefault(); act(); } });
      },
      get selected() { return sel; },
      clear() { setSel(null); },
    };
  }

  const CSS = `
.l04-wrap{max-width:1000px;margin:0 auto;padding-top:18px;padding-bottom:12px}
.l04-scene{display:grid;gap:14px;animation:l04in .7s ease both}
@keyframes l04in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.l04-kick{font-family:var(--f-mono);font-size:11px;letter-spacing:.24em;color:hsl(var(--hue) 70% 64%);text-transform:uppercase}
.l04-h{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(28px,6vw,40px);line-height:1.1;text-shadow:0 0 30px hsl(var(--hue) 85% 62% / .25)}
.l04-lead{margin:0;font-family:var(--f-serif);color:var(--dim);max-width:680px;line-height:1.75}
.l04-lead b{color:hsl(var(--hue) 85% 72%);font-weight:600}
.l04-panel{display:grid;gap:10px;padding:14px;border-radius:18px;border:1px solid var(--line);background:rgba(10,16,32,.55)}
.l04-lbl{font-family:var(--f-mono);font-size:11px;letter-spacing:.16em;color:var(--faint);text-transform:uppercase}
.l04-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
/* scene A */
.l04-cast{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
@media (min-width:760px){.l04-cast{grid-template-columns:repeat(4,minmax(0,1fr))}}
.l04-who{position:relative;text-align:left;min-height:64px;padding:10px 12px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.03);cursor:pointer;
  font-family:var(--f-serif);font-size:15px;color:var(--text);transition:border-color .25s,background .25s,box-shadow .3s}
.l04-who small{display:block;font-size:12px;line-height:1.5;color:var(--faint);margin-top:3px}
.l04-who.on{border-color:hsl(var(--hue) 85% 62%);background:hsl(var(--hue) 85% 62% / .1);box-shadow:0 0 22px hsl(var(--hue) 85% 62% / .2)}
.l04-who .ct{position:absolute;top:8px;right:10px;font-family:var(--f-mono);font-size:10px;color:var(--faint)}
.l04-hall{position:relative;border-radius:22px;overflow:hidden;border:1px solid hsl(var(--hue) 60% 55% / .2);padding:18px 14px 16px;
  background:radial-gradient(100% 80% at 50% 100%,hsl(var(--hue) 50% 14% / .6),rgba(5,8,15,.3) 70%)}
.l04-hall>canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.l04-now{position:relative;text-align:center;font-family:var(--f-serif);font-size:14px;color:var(--dim);min-height:22px;margin-bottom:12px}
.l04-now b{color:hsl(var(--hue) 85% 74%);font-weight:600}
.l04-doors{position:relative;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media (min-width:760px){.l04-doors{grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}}
.l04-door{position:relative;display:flex;flex-direction:column;justify-content:flex-end;gap:4px;min-height:190px;padding:14px 10px 12px;cursor:pointer;
  border-radius:999px 999px 12px 12px;border:1px solid hsl(var(--hue) 70% 62% / .35);color:var(--text);text-align:center;overflow:hidden;
  background:linear-gradient(180deg,hsl(var(--hue) 70% 50% / .04),hsl(var(--hue) 70% 50% / .12));transition:border-color .3s,box-shadow .5s}
@media (min-width:760px){.l04-door{min-height:250px}}
.l04-door::before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(70% 60% at 50% 70%,hsl(var(--hue) 95% 75% / .55),transparent 70%);
  opacity:0;transform:scaleY(.2);transform-origin:50% 100%;transition:opacity .7s,transform .9s cubic-bezier(.2,.8,.2,1)}
.l04-door.open::before{opacity:1;transform:none}
.l04-door.open{border-color:hsl(var(--hue) 90% 72%);box-shadow:0 0 34px hsl(var(--hue) 90% 62% / .35)}
.l04-door:disabled{cursor:default;opacity:.55}
.l04-door .nm{position:relative;font-family:var(--f-display);font-size:19px;line-height:1.15}
.l04-door .by{position:relative;font-family:var(--f-mono);font-size:10px;letter-spacing:.08em;color:var(--dim)}
.l04-door .q{position:relative;font-family:var(--f-serif);font-size:12px;line-height:1.5;color:var(--dim)}
.l04-door .stamp{position:absolute;top:20%;left:50%;transform:translateX(-50%) rotate(-6deg);font-family:var(--f-display);font-size:22px;padding:2px 10px;border-radius:8px;
  border:1.5px solid currentColor;opacity:0;transition:opacity .4s .3s;white-space:nowrap;background:rgba(5,8,15,.55)}
.l04-door.open .stamp{opacity:1}
.l04-free{color:hsl(var(--hue) 90% 72%)} .l04-unfree{color:var(--bad)} .l04-unsure{color:var(--dim)}
.l04-say{font-family:var(--f-serif);font-size:15px;line-height:1.75;color:var(--text);border-left:2px solid hsl(var(--hue) 80% 62%);padding:2px 0 2px 12px;min-height:3.5em}
.l04-say b{color:hsl(var(--hue) 85% 72%)}
.l04-matrix{display:grid;grid-template-columns:minmax(84px,1.6fr) repeat(4,minmax(0,1fr));gap:6px 4px;align-items:center;font-size:12px}
.l04-matrix .hd{font-family:var(--f-mono);font-size:10px;color:var(--faint);text-align:center;letter-spacing:.06em}
.l04-matrix .rl{font-family:var(--f-serif);color:var(--dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.l04-cell{justify-self:center;width:14px;height:14px;border-radius:50%;border:1px solid var(--line-strong);transition:background .4s,box-shadow .4s,border-color .4s}
.l04-cell.free{background:hsl(var(--hue) 90% 66%);border-color:transparent;box-shadow:0 0 8px hsl(var(--hue) 90% 62% / .7)}
.l04-cell.unfree{background:var(--bad);border-color:transparent}
.l04-cell.unsure{background:repeating-linear-gradient(45deg,var(--dim) 0 2px,transparent 2px 4px);border-color:var(--dim)}
/* scene B */
.l04-desk{position:relative;border-radius:22px;overflow:hidden;min-height:340px;display:grid;place-items:center;padding:26px 14px;
  border:1px solid hsl(var(--hue) 60% 55% / .2);background:radial-gradient(60% 70% at 50% 30%,hsl(42 70% 40% / .22),transparent 70%),radial-gradient(120% 90% at 50% 100%,hsl(var(--hue) 40% 12% / .7),rgba(5,8,15,.3))}
.l04-src{text-align:center;position:relative;z-index:1}
.l04-src .w{font-family:Georgia,"Times New Roman",serif;font-style:italic;font-size:clamp(40px,10vw,64px);letter-spacing:.02em;color:var(--beam);text-shadow:0 0 30px rgba(255,246,228,.35)}
.l04-src .m{font-family:var(--f-mono);font-size:11px;letter-spacing:.14em;color:var(--faint)}
.l04-tiles{position:relative;z-index:1;display:flex;gap:18px;justify-content:center;margin-top:18px}
.l04-tile{width:112px;height:112px;border-radius:16px;border:1px solid var(--line-strong);background:rgba(255,255,255,.035);cursor:pointer;
  font-family:var(--f-display);font-size:40px;color:var(--text);display:grid;place-items:center;transition:border-color .3s,box-shadow .4s,background .3s}
.l04-tile small{display:block;font-family:var(--f-mono);font-size:10px;color:var(--faint);letter-spacing:.1em}
.l04-tile.on{border-color:hsl(var(--hue) 85% 62%);background:hsl(var(--hue) 85% 62% / .1);box-shadow:0 0 30px hsl(var(--hue) 85% 62% / .3)}
.l04-tile.warm.on{border-color:hsl(12 80% 64%);background:hsl(12 80% 64% / .1);box-shadow:0 0 30px hsl(12 80% 64% / .3)}
.l04-halo{position:absolute;left:50%;top:50%;width:0;height:0;pointer-events:none;z-index:0;animation:l04spin 90s linear infinite}
.l04-halo span{position:absolute;left:0;top:0;white-space:nowrap}
.l04-halo span i{display:block;font-style:normal;font-family:var(--f-serif);font-size:14px;transform:translate(-50%,-50%);animation:l04spin 90s linear infinite reverse;
  opacity:0;transition:opacity .8s}
.l04-halo.show span i{opacity:.85}
@keyframes l04spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.l04-halo,.l04-halo span i,.l04-node.next{animation:none!important}}
.l04-quote{font-family:var(--f-serif);font-size:15px;line-height:1.85;color:var(--text)}
.l04-quote q{font-family:"Kaiti SC","STKaiti","KaiTi",var(--f-serif);color:hsl(42 80% 78%)}
.l04-quote b{color:hsl(var(--hue) 85% 72%)}
.l04-title{font-family:var(--f-display);font-size:clamp(30px,8vw,52px);text-align:center;letter-spacing:.12em;line-height:1.1}
.l04-title .jie{color:hsl(var(--hue) 90% 70%);text-shadow:0 0 18px hsl(var(--hue) 90% 62% / .8)}
.l04-pool{display:flex;flex-wrap:wrap;gap:8px;min-height:48px;justify-content:center}
.l04-pc{position:relative;min-height:44px;padding:8px 14px;border-radius:12px;border:1px solid var(--line-strong);background:rgba(16,26,47,.92);cursor:grab;
  font-family:var(--f-serif);font-size:15px;color:var(--text);touch-action:none;user-select:none;-webkit-user-select:none;transition:border-color .2s,box-shadow .2s}
.l04-pc small{display:block;font-family:var(--f-mono);font-size:10px;color:var(--faint);letter-spacing:.06em}
.l04-pc.sel{border-color:hsl(var(--hue) 85% 62%);box-shadow:0 0 0 2px hsl(var(--hue) 85% 62% / .35)}
.l04-pc.drag{z-index:5;cursor:grabbing;box-shadow:0 12px 30px rgba(0,0,0,.5);transition:none}
.l04-pc.ok{border-color:hsl(var(--hue) 85% 62% / .7);cursor:default;background:hsl(var(--hue) 85% 62% / .12)}
.l04-pc:disabled{opacity:1}
.l04-pc.shake{animation:l04shake .4s}
@keyframes l04shake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.l04-split{display:grid;grid-template-columns:1fr 2px 1fr;gap:10px;align-items:stretch}
.l04-split .bar{background:hsl(var(--hue) 90% 66%);box-shadow:0 0 16px hsl(var(--hue) 90% 62%);border-radius:2px}
.l04-zone{display:flex;flex-direction:column;gap:8px;align-items:stretch;min-height:150px;padding:12px 10px;border-radius:16px;border:1px dashed var(--line-strong);
  background:rgba(255,255,255,.02);cursor:pointer;color:var(--text);text-align:center;transition:border-color .2s,background .2s}
.l04-zone:hover{border-color:hsl(var(--hue) 80% 62% / .6)}
.l04-zone .zt{font-family:var(--f-display);font-size:26px;line-height:1}
.l04-zone .zs{font-size:12px;color:var(--dim);font-family:var(--f-serif)}
/* scene C */
.l04-roots{position:relative;border-radius:22px;overflow:hidden;border:1px solid hsl(var(--hue) 60% 55% / .2);padding:16px 10px 18px;
  background:radial-gradient(120% 80% at 50% 0%,hsl(var(--hue) 40% 12% / .6),rgba(5,8,15,.3) 70%)}
.l04-roots>canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.l04-cols{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:10px}
.l04-col{display:flex;flex-direction:column;align-items:center;gap:22px}
.l04-col .era{font-family:var(--f-mono);font-size:10px;letter-spacing:.14em;color:var(--faint);text-transform:uppercase}
.l04-node{position:relative;min-width:118px;max-width:100%;min-height:52px;padding:8px 12px;border-radius:14px;border:1px solid var(--line);background:rgba(5,8,15,.82);
  color:var(--faint);cursor:default;font-family:Georgia,"Times New Roman",serif;font-size:19px;font-style:italic;transition:border-color .4s,color .4s,box-shadow .5s}
.l04-node small{display:block;font-family:var(--f-serif);font-style:normal;font-size:12px;line-height:1.5;color:var(--faint)}
.l04-node.lit{color:var(--text);border-color:hsl(var(--hue) 85% 62% / .7);box-shadow:0 0 20px hsl(var(--hue) 85% 62% / .2)}
.l04-node.lit small{color:var(--dim)}
.l04-node.next{cursor:pointer;color:var(--dim);border-color:hsl(var(--hue) 85% 62% / .55);animation:l04pulse 1.8s ease-in-out infinite}
@keyframes l04pulse{50%{box-shadow:0 0 24px hsl(var(--hue) 85% 62% / .45)}}
.l04-leaves{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;min-height:30px;opacity:0;transition:opacity .9s}
.l04-leaves.show{opacity:1}
.l04-leaves span{font-family:Georgia,serif;font-style:italic;font-size:14px;padding:2px 10px;border-radius:999px;border:1px solid hsl(var(--hue) 70% 60% / .4);color:hsl(var(--hue) 80% 78%)}
.l04-pic{font-family:var(--f-serif);font-size:13px;color:var(--dim);text-align:center;min-height:2.6em;max-width:230px;opacity:0;transition:opacity .9s}
.l04-pic.show{opacity:1}
.l04-pairs{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.l04-pairs .side{display:grid;gap:8px;align-content:start}
.l04-pairs .hd{font-family:var(--f-mono);font-size:10px;letter-spacing:.12em;color:var(--faint);text-align:center}
.l04-pw{min-height:46px;border-radius:12px;border:1px solid var(--line-strong);background:rgba(255,255,255,.03);cursor:pointer;font-family:Georgia,serif;font-style:italic;font-size:18px;color:var(--text);
  transition:border-color .2s,background .2s,opacity .4s}
.l04-pw.sel{border-color:hsl(var(--hue) 85% 62%);background:hsl(var(--hue) 85% 62% / .14)}
.l04-pw.gone{opacity:0;pointer-events:none}
.l04-pw.shake{animation:l04shake .4s}
.l04-done{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.l04-done span{font-family:Georgia,serif;font-size:14px;padding:4px 12px;border-radius:999px;border:1px solid hsl(var(--hue) 70% 60% / .45);color:var(--text)}
.l04-done span i{color:var(--faint);font-size:12px}
/* scene D */
.l04-board{position:relative;display:grid;gap:8px;padding:16px 12px;border-radius:22px;border:1px solid hsl(var(--hue) 60% 55% / .2);
  background:radial-gradient(100% 80% at 50% 50%,hsl(var(--hue) 40% 12% / .55),rgba(5,8,15,.3) 75%)}
.l04-tier{font-family:var(--f-mono);font-size:10px;letter-spacing:.14em;color:var(--faint);padding:6px 2px 0}
.l04-rowh{display:grid;grid-template-columns:1fr 40px 1fr;gap:6px;align-items:stretch}
.l04-fix,.l04-slot{display:grid;align-content:center;min-height:62px;padding:8px 10px;border-radius:14px;text-align:center;font-family:var(--f-serif);font-size:16px}
.l04-fix{border:1px solid hsl(var(--hue) 70% 60% / .55);background:hsl(var(--hue) 70% 60% / .08)}
.l04-fix small,.l04-slot small{display:block;font-family:var(--f-mono);font-size:11px;color:var(--dim)}
.l04-slot{border:1px dashed var(--line-strong);background:rgba(255,255,255,.02);cursor:pointer;color:var(--faint)}
.l04-slot.full{border-style:solid;border-color:hsl(var(--hue) 85% 62% / .8);background:hsl(var(--hue) 85% 62% / .12);color:var(--text);box-shadow:0 0 18px hsl(var(--hue) 85% 62% / .2)}
.l04-link{display:grid;place-items:center;font-family:var(--f-mono);font-size:16px;color:var(--faint);transition:color .4s,text-shadow .4s}
.l04-link.on{color:hsl(var(--hue) 90% 72%);text-shadow:0 0 12px hsl(var(--hue) 90% 62%)}
.l04-plate{display:block;width:min(320px,100%);height:auto;margin:0 auto}
.l04-plate .hand{transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}
`;

  const CARDS = [
    { id: 'l04-hobbes', title: '霍布斯的自由', en: 'Liberty as absence of external impediments',
      body: '霍布斯《利维坦》（1651）第 21 章：自由就是没有**外部阻碍**。自由人，就是在凭力气和智慧能做到的事情上，不受阻碍地去做他想做的事。水被河岸挡住时不自由，人被锁链拴住时不自由。推论令人吃惊：**恐惧与自由并不矛盾**。怕船沉而把货物扔进海里的人，仍然是自愿的。',
      ref: 'Hobbes, Leviathan, 1651, ch. 21' },
    { id: 'l04-negative', title: '消极自由', en: 'Negative liberty (Berlin)',
      body: '伯林（Isaiah Berlin）1958 年《两种自由概念》：消极自由问的是，在多大范围内，我可以**不受他人干涉**地做我能做的事、成为我能成为的人？自由的大小，就是不被干涉的领地的大小。“消极”不含贬义，只是用**没有什么**（没有干涉）来界定。',
      ref: 'Berlin, Two Concepts of Liberty, 1958' },
    { id: 'l04-positive', title: '积极自由', en: 'Positive liberty · autonomy',
      body: '积极自由问的是：控制我的力量来自哪里？自由意味着**做自己的主人**。康德的**自律**（autos 自己 + nomos 法则）是它的经典形态：服从自己理性所立的普遍法则才是自由，被欲望牵着走反而是“他律”。伯林的警告：当有人自称比你更懂你的“真正自我”，强迫就会被说成“迫使你自由”。',
      ref: 'Berlin 1958；Kant, Grundlegung zur Metaphysik der Sitten, 1785；Rousseau, Du contrat social, 1762' },
    { id: 'l04-republican', title: '免于支配', en: 'Freedom as non-domination',
      body: '共和主义传统（斯金纳、佩蒂特）：自由不只是免于实际干涉，而是**免于支配**：没有人拥有**任意**干涉你的能力，不管他用不用。好心主人的奴隶几乎没被干涉，却不自由；依民主程序立法征税是干涉，却不构成支配。佩蒂特的“眼球测试”：人们能平视彼此，不必害怕，也不必讨好。',
      ref: 'Pettit, Republicanism, 1997；Skinner, Liberty before Liberalism, 1998；Pettit, Just Freedom, 2014' },
    { id: 'l04-yanfu', title: '自繇', en: 'Yan Fu’s rendering of liberty, 1903',
      body: '1903 年，严复所译穆勒《论自由》出版，书名《群己权界论》：自由的问题，就是群（社会）与己（个人）的权利边界划在哪里，这与穆勒的**伤害原则**高度吻合。他把 liberty 写作“自繇”：日常的“自由”常带放纵的贬义；“由繇二字，古相通叚”，换个字形，只为“略示区别”。这个区分后来没有流传下来。',
      ref: '穆勒著、严复译《群己权界论》，商务印书馆，1903；Mill, On Liberty, 1859' },
    { id: 'l04-twowords', title: 'freedom 与 liberty', en: 'Two English words for one Chinese 自由',
      body: 'freedom 来自古英语 frēodōm，词根 *frijaz 意为“亲爱的；不受奴役的”，与 friend 同源：共同体里的“自己人”。liberty 来自拉丁语 liber，是罗马法上**不是奴隶**的身份。皮特金说，这是别的欧洲语言没有的选择；可从霍布斯到伯林，学界惯例都把两者当同义词。',
      ref: 'Pitkin, Are Freedom and Liberty Twins?, 1988；Fischer, Liberty and Freedom, 2005' },
    { id: 'l04-hohfeld', title: '霍菲尔德的八个概念', en: 'Hohfeldian jural relations',
      body: '霍菲尔德（Hohfeld）1913 年把“权利”拆成四对关联项：**请求权—义务**、**特权（自由）—无请求权**、**权力—受制**、**豁免—无权力**。法律上的自由是**义务的否定**：有做某事的特权，等于没有不做它的义务。liability 是 power 的关联项，意为法律处境可被他人改变，不是“责任”。',
      ref: 'Hohfeld, Some Fundamental Legal Conceptions as Applied in Judicial Reasoning, Yale Law Journal, 1913' },
  ];

  /* ================================================================ mount */
  function mount(root, api) {
    api.css(CSS);
    const el = api.el;
    const wrap = el('div', { class: 'l04-wrap' });
    root.append(wrap);
    let kit = null, lastHint = '';
    const hint = (s) => { if (s === lastHint) return; lastHint = s; api.hint(s); };
    const say = (x, o) => { lastHint = ''; return api.say(x, o); };
    function scene(kicker, title, lead) {
      if (kit) kit.end();
      kit = makeKit(api);
      const sec = el('section', { class: 'l04-scene' },
        el('div', { class: 'l04-kick', text: kicker }),
        el('h2', { class: 'l04-h', text: title }),
        lead ? el('p', { class: 'l04-lead', html: api.fmt(lead) }) : null);
      wrap.replaceChildren(sec);
      root.scrollTop = 0;
      return sec;
    }
    const until = (setup) => new Promise(res => setup(res));

    /* ------------------------------------------------------------ Scene A · 四扇门 */
    async function sceneA() {
      const sec = scene('Scene 1 · Four doors', '同一个人，四扇门',
        '先选一个人，再让他站到一扇门前。每扇门都是一种“自由”，它会告诉你：**这个人自由吗？**');
      const k = kit;
      const DOORS = [
        { id: 'hobbes', nm: '无阻碍', by: 'HOBBES · 霍布斯', q: '我想做的事，有没有被外力挡住？', card: 'l04-hobbes', short: '霍布斯' },
        { id: 'neg', nm: '消极自由', by: 'BERLIN · 伯林', q: '别人干涉我的范围有多大？', card: 'l04-negative', short: '消极' },
        { id: 'pos', nm: '积极自由', by: 'ROUSSEAU · KANT', q: '管我的那个人是谁？是我自己吗？', card: 'l04-positive', short: '积极' },
        { id: 'rep', nm: '免于支配', by: 'SKINNER · PETTIT', q: '有没有人能随意干涉我，哪怕他没这样做？', card: 'l04-republican', short: '共和' },
      ];
      const WHO = [
        { nm: '好心主人家的奴隶', d: '主人仁慈，从不打骂，也几乎不过问他的日常。', v: [
          ['free', '眼下没有锁链挡着他想做的事。只问“有没有被挡住”，测不出问题。'],
          ['free', '主人几乎不干涉他，不被干涉的领地很大。按这个标准，他似乎相当自由。'],
          ['unfree', '他的生活由主人而不是他自己决定。他不是自己的主人。'],
          ['unfree', '主人**随时可以**改变主意，他的好运全取决于主人的心情。这就是支配。']] },
        { nm: '锁在屋里的人', d: '门被人从外面锁上了。不过他今天恰好不想出门。', v: [
          ['free', '他不想出门，门锁没挡住他想做的任何事。这个标准测不出问题。'],
          ['unfree', '门被别人锁了：他能做的事的范围变小了，不管他想不想出门。调整欲望去适应束缚，不等于摆脱束缚。'],
          ['unsure', '留在屋里是他自己的意思；可“出不出得去”已经不归他管。只能算一半。'],
          ['unfree', '锁门的人可以随意决定他能不能出去。不管那人用不用这个能力，他都处在支配之下。']] },
        { nm: '戒不掉的人', d: '想戒掉刷短视频，却一次次刷到深夜。没有人逼他。', v: [
          ['free', '没有任何外力挡路，他想刷就刷。'],
          ['free', '没有人干涉他。消极自由在这里看不到问题。'],
          ['unfree', '被冲动牵着走，是康德说的**他律**：管着他的不是他自己的理性。'],
          ['free', '没有哪个人握着任意干涉他的权力。（卢克斯会补一句：“想要什么”本身也可能是被塑造的。）']] },
        { nm: '看脸色的员工', d: '老板脾气很好，但可以随时、无理由地解雇他。', v: [
          ['free', '没有锁链。他想做的事，眼下都没被挡住。'],
          ['free', '老板从不干涉他。按消极自由的标准，他是自由的。'],
          ['unsure', '他在自己做决定吗？如果每个决定都先揣摩老板的意思，就很难说。'],
          ['unfree', '老板能任意解雇他，于是他察言观色、自我审查。他过不了佩蒂特的“眼球测试”。']] },
      ];
      const STAMP = { free: '自由', unfree: '不自由', unsure: '存疑' };
      const seen = WHO.map(() => [false, false, false, false]);
      const doorSeen = [false, false, false, false];
      let cur = -1, onView = null;

      const cast = el('div', { class: 'l04-cast' });
      const whoBtns = WHO.map((w, i) => {
        const b = el('button', { class: 'l04-who', type: 'button' }, w.nm, el('small', { text: w.d }), el('span', { class: 'ct', text: '0/4' }));
        k.on(b, 'click', () => pick(i));
        cast.append(b); return b;
      });
      const hall = el('div', { class: 'l04-hall' });
      const now = el('div', { class: 'l04-now', text: '门前还没有人。' });
      const doorsEl = el('div', { class: 'l04-doors' });
      const doorBtns = DOORS.map((d, j) => {
        const st = el('span', { class: 'stamp' });
        const b = el('button', { class: 'l04-door', type: 'button', disabled: true, 'aria-label': `${d.nm}：${d.q}` },
          st, el('span', { class: 'nm', text: d.nm }), el('span', { class: 'by', text: d.by }), el('span', { class: 'q', text: d.q }));
        b._stamp = st;
        k.on(b, 'click', () => look(j));
        doorsEl.append(b); return b;
      });
      hall.append(now, doorsEl);
      const verdict = el('div', { class: 'l04-say', 'aria-live': 'polite' });
      const matrix = el('div', { class: 'l04-matrix' });
      matrix.append(el('span'));
      DOORS.forEach(d => matrix.append(el('span', { class: 'hd', text: d.short })));
      const cells = WHO.map(w => { matrix.append(el('span', { class: 'rl', text: w.nm })); return DOORS.map(() => { const c = el('span', { class: 'l04-cell' }); matrix.append(c); return c; }); });
      const panel = el('div', { class: 'l04-panel' }, verdict, matrix);
      sec.append(cast, hall, panel);

      // light shafts behind the doors
      const motes = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), v: 0.00002 + Math.random() * 0.00005, r: Math.random() * 1.4 + 0.4, p: Math.random() * TAU }));
      const lightV = [0, 0, 0, 0];
      let lastT = 0, ready = false;
      const cv = api.canvas(hall, { style: 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none', onResize: () => { if (ready && k.alive) draw(lastT, 0); } });
      hall.prepend(cv.canvas);
      ready = true;
      function draw(t, dt) {
        lastT = t;
        const { ctx, w, h } = cv;
        ctx.clearRect(0, 0, w, h);
        const hr = hall.getBoundingClientRect();
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        doorBtns.forEach((b, j) => {
          const open = b.classList.contains('open');
          lightV[j] = approach(lightV[j], open ? 1 : 0, dt, 400);
          if (lightV[j] < 0.01) return;
          const r = b.getBoundingClientRect(), x = r.left - hr.left + r.width / 2, y = r.bottom - hr.top;
          const g = ctx.createLinearGradient(0, y, 0, y + h * 0.5);
          g.addColorStop(0, lime(70, 0.22 * lightV[j])); g.addColorStop(1, lime(60, 0));
          ctx.fillStyle = g; ctx.beginPath();
          ctx.moveTo(x - r.width * 0.42, y); ctx.lineTo(x + r.width * 0.42, y); ctx.lineTo(x + r.width * 0.9, y + h * 0.5); ctx.lineTo(x - r.width * 0.9, y + h * 0.5); ctx.closePath(); ctx.fill();
          glow(ctx, x, r.top - hr.top + r.height * 0.6, r.width * 0.9, H, 90, 65, 0.12 * lightV[j]);
        });
        for (const m of motes) {
          const y = api.reduced ? m.y : (((m.y - t * m.v) % 1) + 1) % 1;
          const a = api.reduced ? 0.3 : 0.15 + 0.3 * Math.sin(t * 0.001 + m.p) ** 2;
          ctx.fillStyle = lime(80, a); ctx.beginPath(); ctx.arc(m.x * w, y * h, m.r, 0, TAU); ctx.fill();
        }
        ctx.restore();
      }
      const inv = painter(api, k, draw);

      function refreshDoors() {
        doorBtns.forEach((b, j) => {
          b.disabled = cur < 0;
          const on = cur >= 0 && seen[cur][j];
          b.classList.toggle('open', on);
          const v = on ? WHO[cur].v[j][0] : '';
          b._stamp.className = 'stamp' + (v ? ' l04-' + v : '');
          b._stamp.textContent = v ? STAMP[v] : '';
        });
        inv();
      }
      function pick(i) {
        cur = i; api.sfx('select');
        whoBtns.forEach((b, j) => b.classList.toggle('on', j === i));
        now.innerHTML = api.fmt(`站在门前的是：**${WHO[i].nm}**`);
        verdict.innerHTML = api.fmt('点一扇门，透过它看看这个人。');
        refreshDoors();
        if (onView) onView('pick');
      }
      function look(j) {
        if (cur < 0) return;
        const [v, why] = WHO[cur].v[j];
        const fresh = !seen[cur][j];
        seen[cur][j] = true;
        api.sfx(fresh ? 'open' : 'tick');
        verdict.innerHTML = `<b>${DOORS[j].nm}</b> · <span class="l04-${v}">${STAMP[v]}</span>　` + api.fmt(why);
        cells[cur][j].className = 'l04-cell ' + v;
        whoBtns[cur].querySelector('.ct').textContent = `${seen[cur].filter(Boolean).length}/4`;
        refreshDoors();
        if (!doorSeen[j]) { doorSeen[j] = true; api.collect(DOORS[j].card); }
        if (onView) onView('look');
      }

      if (!api.replay) {
        await say(['第四面透镜后面，是一座有四扇门的厅。', '每扇门上都写着同一个词：**自由**。可它们问的问题，各不相同。']);
      }
      hint('先在上面选一个人。');
      await until(res => {
        onView = () => {
          const full = seen.filter(r => r.every(Boolean)).length;
          const allDoors = doorSeen.every(Boolean);
          if (allDoors && full >= 2) { onView = null; res(); return; }
          if (cur < 0) return;
          const n = seen[cur].filter(Boolean).length;
          if (n === 0) hint('点一扇门。');
          else if (n < 4) hint('同一个人，再换一扇门看看。');
          else if (full < 2) hint('四扇门的判决都不一样？换一个人试试。');
          else hint('还有门没打开过。');
        };
      });
      await api.wait(600);
      // fill in the rest of the table: the full picture at once
      WHO.forEach((w, i) => w.v.forEach(([v], j) => { if (!seen[i][j]) { seen[i][j] = true; cells[i][j].className = 'l04-cell ' + v; } whoBtns[i].querySelector('.ct').textContent = '4/4'; }));
      api.sfx('chime');
      verdict.innerHTML = api.fmt('整张表都填上了：**行**是人，**列**是门。');
      await say(['同一个人，四扇门，判决各不相同。没人算错：这是**同一个词，四个函数**。',
        '看第一行：好心主人的奴隶几乎没被干涉，却被**支配**。共和主义的自由，正是为这一格而生。',
        '伯林说过（大意）：自由就是自由，不是平等、公平、正义，也不是幸福或良心的安宁。',
        '这背后是他的**价值多元论**：终极价值不止一种，可能真正冲突，没有一把公共的尺子。']);
      await api.quiz({
        q: '伯林为什么对“积极自由”格外警惕？',
        options: [
          { t: '若有人自称比你更懂你的“真正自我”，强迫你就会被说成“帮你自由”', ok: true,
            why: '对。卢梭写过：拒绝服从公意的人将被迫服从，这意味着“人们要迫使他自由”。伯林认为，二十世纪许多以“解放”为名的压迫都走过这条路。' },
          { t: '因为“积极”这个词本身带着褒义，容易被滥用', why: '“消极”“积极”在这里都不带褒贬：一个用**没有什么**来界定，一个用**有什么**来界定。' },
          { t: '因为积极自由要求太多财富', why: '伯林的担心不在财富，而在“高级自我”替“低级自我”做主、再由别人替你代表“高级自我”的那条推理链。' },
        ],
      });
    }

    /* ------------------------------------------------------------ Scene B · 自繇 */
    async function sceneB() {
      const sec = scene('Scene 2 · The translator’s desk', '自繇',
        '十九、二十世纪之交，一位译者坐在灯下，面前是穆勒的 **On Liberty**。liberty 这个词，该怎么落成汉字？');
      const k = kit;
      const desk = el('div', { class: 'l04-desk' });
      const halo = el('div', { class: 'l04-halo' });
      const src = el('div', { class: 'l04-src' }, el('div', { class: 'w', text: 'liberty' }), el('div', { class: 'm', text: 'J. S. MILL · ON LIBERTY · 1859' }));
      const t1 = el('button', { class: 'l04-tile warm', type: 'button' }, el('span', null, '自由', el('small', { text: '日常用字' })));
      const t2 = el('button', { class: 'l04-tile', type: 'button' }, el('span', null, '自繇', el('small', { text: '严复的写法' })));
      desk.append(halo, el('div', { style: 'position:relative;z-index:1' }, src, el('div', { class: 'l04-tiles' }, t1, t2)));
      const quote = el('div', { class: 'l04-quote', 'aria-live': 'polite', html: api.fmt('点一个字形，看看它会带来什么联想。') });
      const qp = el('div', { class: 'l04-panel' }, quote);
      sec.append(desk, qp);

      const OPT = [
        { tile: t1, hue: 12, words: ['放诞', '恣睢', '无忌惮', '由着性子', '自作主张', '汝岂得自由'],
          q: '<q>中文自繇，常含放诞、恣睢、无忌惮诸劣义。</q>',
          rest: '——严复《译凡例》。他担心的是这个词在汉语里的旧义：**由着性子**。《孔雀东南飞》里焦母斥责儿子“汝岂得自由”，说的就是“你怎么能自作主张”。' },
        { tile: t2, hue: H, words: ['玄名', '非虚乃实', '由繇古通', '略示区别', '术语'],
          q: '<q>由繇二字，古相通叚……不作自由者，非以为古也。视其字依西文规例，本一玄名，非虚乃实，写为自繇。欲略示区别而已。</q>',
          rest: '选“繇”不是为了古雅：按西文规矩，这是一个抽象名词（“玄名”）。换个字形，只想**稍微**做个区别。' },
      ];
      function setHalo(o) {
        halo.classList.remove('show'); halo.replaceChildren();
        const w = desk.clientWidth || 340, R = Math.min(w * 0.4, 230);
        o.words.forEach((wd, i) => {
          const a = i / o.words.length * TAU + 0.35;
          halo.append(el('span', { style: `transform:translate(${(Math.cos(a) * R).toFixed(1)}px,${(Math.sin(a) * R * 0.74).toFixed(1)}px)` },
            el('i', { style: `color:hsl(${o.hue} 80% 72%)`, text: wd })));
        });
        k.later(() => halo.classList.add('show'), 40);
      }
      const seen = [false, false];
      let onPick = null;
      OPT.forEach((o, i) => k.on(o.tile, 'click', () => {
        OPT.forEach((p, j) => p.tile.classList.toggle('on', j === i));
        setHalo(o); quote.innerHTML = o.q + api.fmt(o.rest);
        api.sfx(i ? 'chime' : 'select'); seen[i] = true; if (onPick) onPick();
      }));

      await say(['汉语里现成就有“自由”二字。可严复偏偏写成了“**自繇**”。', '两个字形都摆在桌上。各点一下，看看它们周围浮起什么。']);
      hint('点“自由”和“自繇”。');
      await until(res => { onPick = () => { if (seen[0] && seen[1]) { onPick = null; res(); } else if (seen[0] || seen[1]) hint('再点另一个。'); }; onPick(); });
      await api.wait(500);
      await say(['他没有发明两个概念，只是给同一个词换了字形，提醒读者：这是**另一个函数**。',
        '可惜这个区分没有流传。“自繇”基本是他个人的写法，同时代的梁启超等人用的都是“自由”。',
        '他的许多译名都输给了经由日文传入的词：天演→进化，计学→经济学，群学→社会学。']);

      // the title as an interpretation
      const title = el('div', { class: 'l04-title', html: '《群己权<span class="jie">界</span>论》' });
      const pool = el('div', { class: 'l04-pool' });
      const zq = el('div', { class: 'l04-zone', role: 'button', tabindex: '0', 'aria-label': '群：社会可以干预' },
        el('div', { class: 'zt', text: '群' }), el('div', { class: 'zs', text: '社会可以干预' }));
      const zj = el('div', { class: 'l04-zone', role: 'button', tabindex: '0', 'aria-label': '己：别人无权强制' },
        el('div', { class: 'zt', text: '己' }), el('div', { class: 'zs', text: '别人无权强制' }));
      const fb = el('div', { class: 'l04-say', 'aria-live': 'polite', html: api.fmt('拖动（或先点再点）每一件事，放进“群”或“己”。') });
      const bp = el('div', { class: 'l04-panel' }, el('div', { class: 'l04-lbl', text: '书名 · 1903' }), title, pool,
        el('div', { class: 'l04-split' }, zq, el('div', { class: 'bar' }), zj), fb);
      sec.append(bp);
      bp.scrollIntoView({ block: 'nearest', behavior: api.reduced ? 'auto' : 'smooth' });
      const ITEMS = [
        { k: 'read', t: '熬夜读一本冷门的书', z: 'ji', why: '只涉及他自己。' },
        { k: 'dress', t: '穿一身古怪的衣服去散步', z: 'ji', why: '别人也许看不惯，但没有人因此受到伤害。' },
        { k: 'drink', t: '喝酒伤了自己的身体', z: 'ji', why: '哪怕是“为了他好”，别人也无权强制：可以劝，不可以逼。' },
        { k: 'well', t: '往邻居的井里倒污水', z: 'qun', why: '伤害了他人，社会可以干预。' },
        { k: 'drive', t: '酒后开车上路', z: 'qun', why: '把危险加在了别人身上。' },
      ];
      await say(['他给书起的名字，本身就是一种诠释：**群己权界**，群（社会）与己（个人）之间的权利边界。',
        '穆勒的**伤害原则**：社会强制个人，唯一正当的理由是防止他伤害他人。来，替他划这条界。']);
      let placed = 0;
      await until(res => {
        const pk = makePicker(k, (key, zone, node, zNode) => {
          const it = ITEMS.find(x => x.k === key);
          if (!it || node.disabled) return;
          if (it.z === zone) {
            node.disabled = true; node.classList.add('ok'); zNode.append(node); api.sfx('select');
            fb.innerHTML = api.fmt(`**${it.t}**：${it.why}`);
            placed += 1; if (placed === ITEMS.length) res();
          } else {
            api.sfx('bad'); node.classList.remove('shake'); void node.offsetWidth; node.classList.add('shake');
            fb.innerHTML = api.fmt(it.z === 'ji' ? `再想想：**${it.t}**只关乎他自己。${it.why}` : `再想想：**${it.t}**伤害到了别人。${it.why}`);
          }
        });
        shuffleInto(pool, ITEMS.map(it => { const b = el('button', { class: 'l04-pc', type: 'button', text: it.t }); pk.item(b, it.k); return b; }));
        pk.zone(zq, 'qun'); pk.zone(zj, 'ji');
      });
      await api.wait(500);
      await say(['这条线，就是书名里的“**界**”。在严复看来，自由的问题，就是这条线画在哪里。']);
      api.collect('l04-yanfu');
    }
    function shuffleInto(parent, nodes) { shuffle(nodes).forEach(n => parent.append(n)); }

    /* ------------------------------------------------------------ Scene C · 两条词根 */
    async function sceneC() {
      const sec = scene('Scene 3 · Two roots', '两条词根',
        '汉语的一个“自由”，在英语里是两个词。顺着发光的节点往下走，回到它们的源头。');
      const k = kit;
      const box = el('div', { class: 'l04-roots' });
      const colsEl = el('div', { class: 'l04-cols' });
      box.append(colsEl);
      sec.append(box);
      const TREES = [
        { era: 'Germanic · 日耳曼', nodes: [['freedom', '今天的英语'], ['frēodōm', '古英语：frēo“自由的” + 后缀 -dōm'], ['*frijaz', '原始日耳曼语：“亲爱的；不受奴役的”']],
          leaves: ['friend', 'frei', 'Freiheit', 'Freund（朋友）'], pic: '本义的画面：属于亲族共同体的“自己人”' },
        { era: 'Latin · 拉丁', nodes: [['liberty', '今天的英语'], ['liberté', '古法语，14 世纪进入英语'], ['libertas', '拉丁语名词'], ['liber', '拉丁语：“自由的”，即不是奴隶的身份']],
          leaves: ['liberal', 'liberate', 'liberté'], pic: '本义的画面：罗马法上的一种身份，不在他人权力之下' },
      ];
      const T = TREES.map(tr => {
        const col = el('div', { class: 'l04-col' }, el('div', { class: 'era', text: tr.era }));
        const nodes = tr.nodes.map(([w, g], i) => {
          const b = el('button', { class: 'l04-node' + (i === 0 ? ' lit' : i === 1 ? ' next' : ''), type: 'button' }, w, el('small', { text: i === 0 ? g : '？' }));
          col.append(b); return b;
        });
        const leaves = el('div', { class: 'l04-leaves' }, tr.leaves.map(x => el('span', { text: x })));
        const pic = el('div', { class: 'l04-pic', text: tr.pic });
        col.append(leaves, pic);
        colsEl.append(col);
        return { tr, nodes, leaves, pic, reach: 0, flow: 0 };
      });
      let ready = false, lastT = 0, onStep = null;
      const cv = api.canvas(box, { style: 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none', onResize: () => { if (ready && k.alive) draw(lastT, 0); } });
      box.prepend(cv.canvas);
      ready = true;
      function centers(t) {
        const br = box.getBoundingClientRect();
        return t.nodes.map(n => { const r = n.getBoundingClientRect(); return [r.left - br.left + r.width / 2, r.top - br.top + r.height / 2, r.height]; });
      }
      function draw(t, dt) {
        lastT = t;
        const { ctx, w, h } = cv;
        ctx.clearRect(0, 0, w, h);
        T.forEach(tt => {
          const c = centers(tt);
          tt.flow = approach(tt.flow, tt.reach, dt, 300);
          // the unexplored stretch
          ctx.strokeStyle = 'rgba(168,188,228,.16)'; ctx.setLineDash([2, 6]); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(c[0][0], c[0][1]); c.forEach(p => ctx.lineTo(p[0], p[1])); ctx.stroke(); ctx.setLineDash([]);
          // the lit river, flowing up from the root to today
          const n = Math.min(c.length - 1, tt.flow);
          if (n <= 0.001) return;
          const seg = Math.floor(n), fr = n - seg;
          const end = seg >= c.length - 1 ? c[c.length - 1] : [c[seg][0] + (c[seg + 1][0] - c[seg][0]) * fr, c[seg][1] + (c[seg + 1][1] - c[seg][1]) * fr];
          ctx.save(); ctx.globalCompositeOperation = 'lighter';
          const top = c[0][1], bot = end[1];
          const g = ctx.createLinearGradient(0, top, 0, bot);
          g.addColorStop(0, lime(72, 0.85)); g.addColorStop(1, lime(60, 0.35));
          for (const [lw, a] of [[10, 0.08], [4, 0.25], [1.6, 1]]) {
            ctx.strokeStyle = a === 1 ? g : lime(68, a); ctx.lineWidth = lw; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(c[0][0], c[0][1]);
            for (let i = 1; i <= seg && i < c.length; i++) ctx.lineTo(c[i][0], c[i][1]);
            ctx.lineTo(end[0], end[1]); ctx.stroke();
          }
          if (!api.reduced) {
            const len = bot - top;
            for (let i = 0; i < 7; i++) {
              const u = 1 - (((t * 0.00018) + i / 7) % 1), y = top + u * len, x = c[0][0] + (end[0] - c[0][0]) * u + Math.sin(t * 0.002 + i) * 2;
              ctx.fillStyle = lime(85, 0.8 * Math.sin(u * Math.PI)); ctx.beginPath(); ctx.arc(x, y, 1.8, 0, TAU); ctx.fill();
            }
          }
          if (tt.reach >= c.length - 1) glow(ctx, end[0], end[1] + 20, 60, H, 90, 65, 0.25);
          ctx.restore();
        });
      }
      const inv = painter(api, k, draw);
      T.forEach(tt => tt.nodes.forEach((b, i) => k.on(b, 'click', () => {
        if (i !== tt.reach + 1) return;
        tt.reach = i; api.sfx('tick');
        b.classList.remove('next'); b.classList.add('lit'); b.querySelector('small').textContent = tt.tr.nodes[i][1];
        if (tt.nodes[i + 1]) tt.nodes[i + 1].classList.add('next');
        else { tt.leaves.classList.add('show'); tt.pic.classList.add('show'); api.sfx('chime'); }
        inv(); if (onStep) onStep();
      })));

      await say('左边是 freedom，右边是 liberty。点亮下一个节点，往源头走。');
      hint('点发光的节点。');
      await until(res => {
        onStep = () => {
          const done = T.filter(tt => tt.reach >= tt.nodes.length - 1).length;
          if (done === 2) { onStep = null; res(); } else if (done === 1) hint('一条河到了源头。再走另一条。');
        };
      });
      await api.wait(700);
      await say(['freedom 的源头很温暖：“自由的”和“亲爱的”同出一个日耳曼词根，friend 也是。',
        'liberty 的画面则是法律的：在罗马法里，liber 是一种身份，不在他人权力之下。',
        '这种分工你见过。把田里的动物和餐桌上的肉配成对。']);

      // pairing: the Norman layer
      const PAIRS = [['cow', 'beef', 'bœuf'], ['swine', 'pork', 'porc'], ['sheep', 'mutton', 'mouton'], ['calf', 'veal', 'veau']];
      const left = el('div', { class: 'side' }, el('div', { class: 'hd', text: '田里 · 撒克逊农民 · 日耳曼词' }));
      const right = el('div', { class: 'side' }, el('div', { class: 'hd', text: '餐桌 · 诺曼贵族 · 法语词' }));
      const doneRow = el('div', { class: 'l04-done' });
      const fb = el('div', { class: 'l04-say', 'aria-live': 'polite', html: api.fmt('先点左边一个，再点右边一个。') });
      const pp = el('div', { class: 'l04-panel' }, el('div', { class: 'l04-lbl', text: '1066 年之后' }), el('div', { class: 'l04-pairs' }, left, right), doneRow, fb);
      sec.append(pp);
      pp.scrollIntoView({ block: 'nearest', behavior: api.reduced ? 'auto' : 'smooth' });
      let sl = null, sr = null, matched = 0;
      await until(res => {
        const tryMatch = () => {
          if (!sl || !sr) return;
          const p = PAIRS.find(x => x[0] === sl.dataset.w);
          if (p && p[1] === sr.dataset.w) {
            sl.classList.add('gone'); sr.classList.add('gone'); sl.disabled = sr.disabled = true;
            doneRow.append(el('span', { html: `${p[0]} ⟷ ${p[1]} <i>（${p[2]}）</i>` }));
            fb.innerHTML = api.fmt(`养 **${p[0]}** 的是撒克逊农民，吃 **${p[1]}** 的是诺曼贵族（法语 ${p[2]}）。`);
            api.sfx('ok'); matched += 1;
            if (matched === PAIRS.length) res();
          } else {
            api.sfx('bad'); [sl, sr].forEach(n => { n.classList.remove('shake'); void n.offsetWidth; n.classList.add('shake'); });
            fb.innerHTML = api.fmt('不是这一对。想想它们在法语里的样子。');
          }
          sl.classList.remove('sel'); sr.classList.remove('sel'); sl = sr = null;
        };
        PAIRS.forEach(p => {
          const b = el('button', { class: 'l04-pw', type: 'button', text: p[0] }); b.dataset.w = p[0];
          k.on(b, 'click', () => { if (sl) sl.classList.remove('sel'); sl = b; b.classList.add('sel'); api.sfx('tick'); tryMatch(); });
          left.append(b);
        });
        shuffle(PAIRS).forEach(p => {
          const b = el('button', { class: 'l04-pw', type: 'button', text: p[1] }); b.dataset.w = p[1];
          k.on(b, 'click', () => { if (sr) sr.classList.remove('sel'); sr = b; b.classList.add('sel'); api.sfx('tick'); tryMatch(); });
          right.append(b);
        });
      });
      await api.wait(500);
      const last = el('span', { html: 'freedom ⟷ liberty <i>（自己人 · 法庭）</i>', style: `border-color:${lime(70, 0.9)};box-shadow:0 0 16px ${lime(62, 0.4)}` });
      doneRow.append(last); api.sfx('chime');
      fb.innerHTML = api.fmt('日常、亲密的事物多用日耳曼词，法律、行政的多用法语或拉丁词。**freedom 与 liberty**，几乎就是 cow 与 beef 的分工。');
      await say(['语言史学家认为实际过程比“农民养、贵族吃”的故事复杂，但英语有两个词汇层，这个大格局是确定的。',
        '皮特金（Pitkin）指出：说英语的人有一个别的欧洲语言没有的选择。德语只有 Freiheit，法语只有 liberté。',
        '可政治哲学多半不用这个资源。霍布斯写“Liberty, or Freedome”，伯林也明说把两者当同义词。']);
      api.collect('l04-twowords');
      await say('资源存在，不等于被使用。“自繇”的命运，是同一种情形。');
    }

    /* ------------------------------------------------------------ Scene D · 霍菲尔德的八块拼图 */
    async function sceneD() {
      const sec = scene('Scene 4 · Eight pieces', '把“权利”切成八块',
        '1913 年，法学家霍菲尔德（Hohfeld）抱怨：法官和律师把 right 一词用得一塌糊涂。他把“权利”拆成了四对。把右边的空位补上。');
      const k = kit;
      const ROWS = [
        { a: '请求权', ae: 'claim', ex: '乙欠甲一千元' },
        { a: '特权（自由）', ae: 'privilege / liberty', ex: '甲在自家院子里唱歌' },
        { a: '权力', ae: 'power', ex: '甲一承诺，合同即成立' },
        { a: '豁免', ae: 'immunity', ex: '国会不得立法剥夺言论自由' },
      ];
      const PIECES = {
        duty: { t: '义务', e: 'duty', home: 0, why: '义务是**请求权**的另一端：甲有权要求乙还钱，乙就有义务还钱。' },
        noright: { t: '无请求权', e: 'no-right', home: 1, why: '无请求权是**特权**的另一端：甲在自家院子里唱歌，邻居无权要求他不唱。' },
        liability: { t: '受制', e: 'liability', home: 2, why: 'liability 是**权力**的另一端：自己的法律处境可以被他人的行为改变。这里它不是“责任”。' },
        disability: { t: '无权力', e: 'disability', home: 3, why: '无权力是**豁免**的另一端：公民在言论上享有豁免，国会在此“无权力”。' },
      };
      const board = el('div', { class: 'l04-board' });
      board.append(el('div', { class: 'l04-rowh' }, el('div', { class: 'l04-lbl', style: 'text-align:center', text: '甲有……' }), el('span'),
        el('div', { class: 'l04-lbl', style: 'text-align:center', text: '乙相应地有……' })));
      const slots = [], links = [];
      ROWS.forEach((r, i) => {
        if (i === 0) board.append(el('div', { class: 'l04-tier', text: '一阶 · 关于行为本身' }));
        if (i === 2) board.append(el('div', { class: 'l04-tier', text: '二阶 · 关于改变一阶关系的能力' }));
        const slot = el('div', { class: 'l04-slot', role: 'button', tabindex: '0', 'aria-label': `${r.a}的关联项` }, '？', el('small', { text: r.ex }));
        const link = el('div', { class: 'l04-link', text: '⟷' });
        board.append(el('div', { class: 'l04-rowh' }, el('div', { class: 'l04-fix' }, r.a, el('small', { text: r.ae })), link, slot));
        slots.push(slot); links.push(link);
      });
      const pool = el('div', { class: 'l04-pool' });
      const fb = el('div', { class: 'l04-say', 'aria-live': 'polite', html: api.fmt('拖动下面的拼块到空位上，或者先点拼块、再点空位。') });
      sec.append(board, el('div', { class: 'l04-panel' }, pool, fb));

      await say(['每一对叫**关联项**：同一个法律关系，从两端看过去的样子。', '甲有请求权，乙就有义务。剩下三对，交给你。']);
      function fill(row, key) {
        const p = PIECES[key], s = slots[row];
        s.classList.add('full'); s.replaceChildren(p.t, el('small', { text: p.e }));
        s.removeAttribute('tabindex'); s.removeAttribute('role'); delete s.dataset.zone;
        links[row].classList.add('on');
      }
      fill(0, 'duty');
      let placed = 1;
      await until(res => {
        const pk = makePicker(k, (key, zone, node) => {
          const p = PIECES[key], row = +zone;
          if (slots[row].classList.contains('full')) return;
          if (!p || node.disabled) return;
          if (p.home === row) {
            node.remove(); fill(row, key); api.sfx('ok');
            fb.innerHTML = api.fmt(p.why);
            placed += 1; if (placed === 4) res();
          } else {
            api.sfx('bad'); node.classList.remove('shake'); void node.offsetWidth; node.classList.add('shake');
            let msg = p.why;
            if (key === 'liability' && row === 1) msg = '这是最常见的混淆：和自由（特权）相关联的是 **no-right**，不是 liability。' + p.why;
            fb.innerHTML = api.fmt(msg);
          }
        });
        shuffleInto(pool, Object.keys(PIECES).filter(key => key !== 'duty').map(key => {
          const p = PIECES[key];
          const b = el('button', { class: 'l04-pc', type: 'button' }, p.t, el('small', { text: p.e }));
          pk.item(b, key); return b;
        }));
        slots.forEach((s, i) => { if (i > 0) pk.zone(s, String(i)); });
      });
      await api.wait(500);
      api.sfx('chime');
      fb.innerHTML = api.fmt('前两对关于**行为本身**，后两对关于**改变前两对的能力**。');
      await say(['法律上的“自由”，被定义成了**义务的否定**：有做某事的特权，等于没有不做它的义务。',
        '冯·赖特的道义逻辑里有个平行的公式：允许做 = 并非必须不做。']);

      // the shrimp salad
      const svg = `<svg class="l04-plate" viewBox="0 0 320 170" aria-hidden="true">
        <defs><radialGradient id="l04pg" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="hsl(${H} 60% 40% / .35)"/><stop offset="1" stop-color="hsl(${H} 60% 20% / 0)"/></radialGradient></defs>
        <ellipse cx="160" cy="110" rx="128" ry="42" fill="url(#l04pg)" stroke="${lime(70, 0.7)}" stroke-width="1.4"/>
        <ellipse cx="160" cy="106" rx="92" ry="26" fill="none" stroke="${lime(70, 0.25)}"/>
        ${[[118, 98], [142, 110], [168, 96], [192, 108], [150, 88], [205, 94], [128, 114], [178, 116]].map(([x, y], i) =>
          `<path d="M${x} ${y} a9 9 0 1 1 ${i % 2 ? 14 : -14} 4" fill="none" stroke="hsl(12 85% 68%)" stroke-width="3.2" stroke-linecap="round"/>`).join('')}
        ${[[132, 104], [160, 100], [186, 100], [172, 110]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="3.5" fill="${lime(62, 0.6)}"/>`).join('')}
        <g class="hand" data-h="x" style="transform:translate(-70px,0)"><path d="M-40 70 Q10 64 52 74 Q60 78 52 82 Q10 86 -40 84Z" fill="rgba(255,246,228,.16)" stroke="rgba(255,246,228,.75)" stroke-width="1.3"/><text x="4" y="64" fill="rgba(232,236,245,.85)" font-size="13" font-family="${MONO}">X</text></g>
        <g class="hand" data-h="o" style="transform:translate(150px,0)"><path d="M360 96 Q300 84 236 96 Q226 104 236 112 Q300 124 360 116Z" fill="hsl(12 80% 64% / .18)" stroke="hsl(12 80% 70% / .85)" stroke-width="1.3"/><text x="246" y="82" fill="rgba(232,236,245,.85)" font-size="13" font-family="${SERIF}">一位主人</text></g>
      </svg>`;
      const plate = el('div', { html: svg });
      const reach = el('button', { class: 'btn hue', type: 'button', text: '让 X 伸手去拿' });
      const sp = el('div', { class: 'l04-panel' }, el('div', { class: 'l04-lbl', text: '霍菲尔德的虾沙拉' }), plate, el('div', { class: 'l04-actions', style: 'justify-content:center' }, reach));
      sec.append(sp);
      sp.scrollIntoView({ block: 'nearest', behavior: api.reduced ? 'auto' : 'smooth' });
      await say(['霍菲尔德自己举过一个例子：一盘虾沙拉。', '主人们对 X 说（大意）：“你能吃到就吃吧，我们允许，但不保证不拦着你。”']);
      await until(res => k.on(reach, 'click', res, { once: true }));
      reach.disabled = true; api.sfx('whoosh');
      const hx = plate.querySelector('[data-h="x"]'), ho = plate.querySelector('[data-h="o"]');
      if (hx) hx.style.transform = 'translate(20px,0)';
      k.later(() => { if (ho) ho.style.transform = 'translate(0,0)'; api.sfx('bad'); }, api.reduced ? 0 : 600);
      await api.wait(api.reduced ? 200 : 1700);
      await api.quiz({
        q: '一位主人死死按住了盘子。X 的权利被侵犯了吗？',
        options: [
          { t: '没有。X 有吃的**特权**，却没有“不被阻拦”的**请求权**', ok: true,
            why: '对。X 吃到了，没有侵犯任何人的权利；主人按住盘子，也没有侵犯 X 的权利。“我可以做”和“别人不得阻止我做”，是两件不同的事。' },
          { t: '被侵犯了：主人明明说过允许他吃', why: '“允许”只是让 X 不再负有“不吃”的义务，给了他特权；它并没有让主人负上“不阻拦”的义务。' },
          { t: '被侵犯了：既然有自由，别人就有义务不拦着', why: '这正是霍菲尔德要拆开的两件事。和特权相关联的是对方的**无请求权**，不是对方的义务。' },
        ],
      });
      api.collect('l04-hohfeld');
      await say(['日常说的“言论自由”，其实是一**捆**：说话的特权，加上不被暴力阻止的请求权，再加上不被立法剥夺的豁免……',
        '汉语的“责任”也压缩了好几个函数。**duty**（义务）是法律自由的反面；',
        '**liability**（受制）是他人权力的另一端；**responsibility**（道德责任）则是自由的后果。']);
    }

    /* ------------------------------------------------------------ flow */
    (async () => {
      api.progress(0, 4);
      await sceneA(); api.progress(1, 4);
      await sceneB(); api.progress(2, 4);
      await sceneC(); api.progress(3, 4);
      await sceneD(); api.progress(4, 4);
      await say('黄绿色亮了。下次有人说“自由”，你可以先问：你说的是哪一扇门？');
      api.complete({ summary: '“自由”是一个词、好几个函数：霍布斯问有没有阻碍，伯林分出消极与积极，共和主义追问有没有人**能够**随意干涉你。严复用“自繇”给函数改了名，英语握着 freedom 与 liberty 两条词根，霍菲尔德则把“权利”切成了八块。' });
    })();

    return () => { if (kit) kit.end(); };
  }

  Lens.registerLevel({
    id: 'l04', no: 4,
    name: '四扇门',
    subtitle: '自由的几副面孔',
    continent: 'value',
    blurb: '同一个人，四扇门，四种判决；还有严复的“自繇”、两条词根和一盘虾沙拉。',
    steps: 4,
    cards: CARDS,
    mount,
  });
})();

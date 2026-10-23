/* 透镜群岛 · 第 5 镜 · 凳子与选票（平等、公平与不可能定理）
 * 四个场景：围栏外的三个人 → 幕后与明星 → 孔多塞的循环 → 阿罗之锁
 */
(function () {
  'use strict';

  const CARDS = [
    { id: 'l05-equity', title: '均等与公平', en: 'Equality vs. equity',
      body: '三个高矮不同的人隔着栅栏看球。**均等**（equality）是每人一个箱子：分到的东西一样，矮个子仍然看不见。**公平**（equity）是按需分配：处境一样，三个人都看见。森追问“**什么的**平等”：箱子是资源，“看见比赛”是人实际能做到的事（可行能力）。也有人说，该改的是栅栏本身。',
      ref: 'Froehle 2012 原图，Maguire 改编；Sen, “Equality of What?”（坦纳讲座，1979）' },
    { id: 'l05-leveldown', title: '向下拉平异议', en: 'The levelling down objection',
      body: '从 A（高个子看得见、矮个子看不见）到 B（谁都看不见），没有任何人变好，有人变差，可 B “更平等”。若平等**本身**有价值，就得承认 B 至少在某方面更好，许多人觉得这很荒谬。帕菲特的出路是**优先主义**：不盯着差距，而关心处境差的人；处境越差，帮他越要紧。',
      ref: 'Parfit, “Equality and Priority”, 1997；冯内古特《哈里森·伯杰隆》, 1961' },
    { id: 'l05-veil', title: '无知之幕与差别原则', en: 'Veil of ignorance & the difference principle',
      body: '设计社会规则时，假装不知道自己会生在哪个家庭、有什么天赋。罗尔斯认为理性的人会选两条原则：基本自由人人平等；经济不平等须伴随公平的机会平等，并使**处境最差的人得到最大的利益**（差别原则）。第一原则优先：不能拿基本自由换经济利益。',
      ref: 'Rawls, A Theory of Justice, 1971' },
    { id: 'l05-chamberlain', title: '张伯伦论证', en: 'The Wilt Chamberlain argument',
      body: '从你认为最公正的分配 D1 出发。一百万球迷各自愿付 25 美分看张伯伦打球，他多得 25 万美元，分配变成不平均的 D2。每一步都自愿，D2 凭什么不公正？诺齐克：**自由会打乱模式**。科恩回应：球迷只同意了“用这点钱换一场球”，没有同意累积起来的巨大差距对第三者和后代的后果。',
      ref: 'Nozick, Anarchy, State, and Utopia, 1974；G. A. Cohen, Self-Ownership, Freedom, and Equality, 1995' },
    { id: 'l05-condorcet', title: '孔多塞悖论', en: 'The Condorcet paradox',
      body: '甲：A>B>C；乙：B>C>A；丙：C>A>B。两两表决，A 以 2:1 胜 B，B 胜 C，C 又胜 A。每个人的偏好都有传递性，多数决得出的“集体偏好”却在兜圈子，没有一个选项能胜过所有对手。直接的后果是：**谁控制表决顺序，谁就能决定结果**。',
      ref: 'Condorcet, Essai sur l’application de l’analyse…, 1785' },
    { id: 'l05-arrow', title: '阿罗不可能定理', en: 'Arrow’s impossibility theorem',
      body: '至少三个选项、至少两个人时，不存在一条把个人排序加总成完整、传递的社会排序的规则，能同时满足**无限制定义域**、**帕累托**、**无关选项独立性**和**非独裁**。坚持前三条，规则必然独裁。只有两个选项时，简单多数决近乎完美（梅，1952）。不是还没找到公式，而是**证明了**它不存在。',
      ref: 'Arrow, Social Choice and Individual Values, 1951（此处用 1963 年第二版后的通行表述）' },
    { id: 'l05-sen', title: '帕累托自由派不可能定理', en: 'The impossibility of a Paretian liberal',
      body: '只有一本《查泰莱夫人的情人》。古板先生：谁都别读 > 我读 > 他读；放荡先生：古板先生读 > 我读 > 谁都不读。尊重各自对私事的决定权，社会应当 z≻x、y≻z；两人都认为 x≻y，帕累托又要求 x≻y：循环。森证明，**最低限度的自由**与帕累托原则不能总是兼得。',
      ref: 'Sen, “The Impossibility of a Paretian Liberal”, 1970' },
  ];

  const CSS = `
.l05-wrap{max-width:920px;margin:0 auto;padding-top:14px;display:grid;gap:12px}
.l05-scene{display:grid;gap:12px;animation:l05in .6s ease both}
@keyframes l05in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.l05-head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
.l05-kick{font-family:var(--f-mono);font-size:11px;letter-spacing:.2em;color:hsl(var(--hue) 70% 68%)}
.l05-title{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(22px,5.4vw,30px);line-height:1.15}
.l05-stage{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--line);
  background:radial-gradient(120% 80% at 50% -10%,hsl(var(--hue) 55% 16% / .6),transparent 62%),rgba(5,8,15,.6);box-shadow:inset 0 0 60px rgba(0,0,0,.45)}
.l05-cv{display:block;width:100%;min-height:280px;touch-action:manipulation;user-select:none;-webkit-user-select:none;cursor:pointer}
.l05-cv.grab{touch-action:none}
.l05-note{margin:0;min-height:1.7em;text-align:center;font-family:var(--f-serif);font-size:14.5px;line-height:1.7;color:var(--dim);text-wrap:balance}
.l05-note b{color:hsl(var(--hue) 85% 72%);font-weight:600}
.l05-bar,.l05-seg{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center}
.l05-bar .btn,.l05-seg .btn{min-height:44px;scroll-margin-bottom:calc(var(--narr-h) + 20px)}
.l05-sw button,.l05-bar,.l05-seg,.l05-sw{scroll-margin-bottom:calc(var(--narr-h) + 20px)}
.l05-bar .btn:disabled,.l05-seg .btn:disabled{opacity:.45;cursor:default}
.l05-seg .btn[aria-pressed="true"]{border-color:hsl(var(--hue) 80% 62%);background:hsl(var(--hue) 80% 62% / .2)}
.l05-hold{user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;touch-action:none}
.l05-hold.on{background:hsl(var(--hue) 80% 62% / .32);box-shadow:0 0 26px hsl(var(--hue) 80% 62% / .5)}
.l05-ballots{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.l05-ballots.two{grid-template-columns:repeat(2,minmax(0,1fr));max-width:520px;width:100%;margin:0 auto}
.l05-ballot{border:1px solid var(--line);border-radius:12px;padding:8px 6px;text-align:center;background:rgba(255,255,255,.025)}
.l05-ballot .who{font-family:var(--f-display);font-size:17px;line-height:1.3}
.l05-ballot .rk{display:flex;justify-content:center;gap:4px;margin-top:4px;font-family:var(--f-mono);font-size:13px;color:var(--dim)}
.l05-ballot .rk span{display:inline-grid;place-items:center;width:24px;height:24px;border-radius:7px;border:1px solid var(--line);transition:background .25s,color .25s,box-shadow .25s}
.l05-ballot .rk span.pick{color:#0A0E18;background:hsl(var(--hue) 85% 62%);border-color:transparent;box-shadow:0 0 12px hsl(var(--hue) 85% 62% / .7)}
.l05-ballot .rk i{font-style:normal;opacity:.5;align-self:center}
.l05-sw{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-width:560px;margin:0 auto;width:100%}
.l05-sw button{display:flex;align-items:center;gap:10px;text-align:left;min-height:50px;padding:8px 10px;border-radius:14px;border:1px solid var(--line);
  background:rgba(255,255,255,.03);cursor:pointer;color:var(--dim);font-size:13px;line-height:1.35;transition:border-color .2s,background .2s,color .2s}
.l05-sw button b{font-family:var(--f-mono);font-size:15px;width:28px;height:28px;flex:none;display:grid;place-items:center;border-radius:50%;border:1px solid var(--line-strong);color:var(--text)}
.l05-sw button[aria-pressed="true"]{border-color:hsl(var(--hue) 80% 62% / .7);background:hsl(var(--hue) 80% 62% / .1);color:var(--text)}
.l05-sw button[aria-pressed="true"] b{background:hsl(var(--hue) 85% 62%);color:#0A0E18;border-color:transparent;box-shadow:0 0 12px hsl(var(--hue) 85% 62% / .6)}
.l05-sw button:disabled{opacity:.45;cursor:default}
`;

  Lens.registerLevel({
    id: 'l05', no: 5, name: '凳子与选票', subtitle: '平等、公平与不可能定理', continent: 'value', steps: 4,
    blurb: '分木箱，进幕后，看选票绕圈，再去开一把被证明打不开的锁。',
    cards: CARDS,
    mount(root, api) {
      api.css(CSS);
      const el = api.el, clamp = api.clamp, N = 4;
      const C = (l, a, s) => api.hsl(api.hue, s == null ? 85 : s, l == null ? 62 : l, a == null ? 1 : a);
      const BEAM = a => `rgba(255,246,228,${a})`;
      const FONT = {
        mono: '"IBM Plex Mono",ui-monospace,Menlo,monospace',
        serif: '"Noto Serif SC","Songti SC","STSong",serif',
        disp: '"ZCOOL XiaoWei","Noto Serif SC","Songti SC",serif',
      };
      const wrap = el('div', { class: 'l05-wrap' });
      root.append(wrap);

      /* ------------------------------------------------ helpers */
      const approach = (c, t, dt, k) => (api.reduced ? t : c + (t - c) * (1 - Math.exp(-(k || 8) * dt / 1000)));
      const btn = (label, cls, onclick) => el('button', { class: 'btn ' + (cls || ''), type: 'button', html: api.fmt(label), onclick });
      const note = (node, s) => { node.innerHTML = api.fmt(s || ''); };
      const local = (e, cv) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
      const fmtN = n => Math.round(n).toLocaleString('en-US');
      const sleep = ms => api.wait(api.reduced ? Math.min(ms, 120) : ms);

      function openScene(no, title) {
        wrap.replaceChildren();
        const node = el('section', { class: 'l05-scene' },
          el('div', { class: 'l05-head' }, el('span', { class: 'l05-kick', text: `SCENE ${no} / ${N}` }), el('h2', { class: 'l05-title', text: title })));
        wrap.append(node);
        root.scrollTop = 0;
        const stops = []; let ended = false;
        return {
          node,
          raf(fn) { if (ended) return () => {}; const c = api.raf(fn); stops.push(c); return c; },
          end() { ended = true; stops.splice(0).forEach(f => f()); },
        };
      }
      // A hi-dpi canvas that redraws every frame, or (reduced motion) only when kicked.
      function stage(sc, height, draw, cls) {
        const box = el('div', { class: 'l05-stage' });
        sc.node.append(box);
        let kick = null, pend = false;
        const v = api.canvas(box, { class: 'l05-cv' + (cls ? ' ' + cls : ''), style: `height:${height}`, onResize: () => kick && kick() });
        kick = () => { if (!api.reduced || pend) return; pend = true; sc.raf(t => { pend = false; draw(v.ctx, v.w, v.h, t, 16); return false; }); };
        if (!api.reduced) sc.raf((t, dt) => { draw(v.ctx, v.w, v.h, t, dt); }); else kick();
        v.kick = kick; v.box = box;
        return v;
      }
      function goalKeeper() {
        let g = null;
        return {
          wait(test) { return new Promise(res => { g = { test, res }; this.check(); }); },
          check() { if (g && g.test()) { const r = g.res; g = null; r(); } },
        };
      }
      const reveal = node => api.timeout(() => { try { node.scrollIntoView({ block: 'nearest', behavior: api.reduced ? 'auto' : 'smooth' }); } catch (_) { /* ignore */ } }, 80);
      const clicked = (bar, label, cls) => new Promise(res => { const b = btn(label, cls || 'hue', () => { b.disabled = true; res(b); }); bar.append(b); reveal(b); });

      function rr(ctx, x, y, w, h, r) {
        r = Math.max(0, Math.min(r, w / 2, h / 2));
        ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
      }
      function glow(ctx, x, y, r, c0, c1) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill(); }
      const glowC = (ctx, x, y, r, l, a) => glow(ctx, x, y, r, C(l, a), C(l, 0));
      const glowW = (ctx, x, y, r, a) => glow(ctx, x, y, r, BEAM(a), BEAM(0));
      function dot(ctx, x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill(); }
      function text(ctx, s, x, y, o) {
        o = o || {};
        ctx.save();
        ctx.font = `${o.weight || 400} ${o.size || 12}px ${FONT[o.font || 'mono']}`;
        ctx.fillStyle = o.color || 'rgba(232,236,245,.82)'; ctx.textAlign = o.align || 'center'; ctx.textBaseline = o.base || 'middle';
        if (o.glow) { ctx.shadowColor = o.glow; ctx.shadowBlur = o.blur || 12; }
        ctx.fillText(s, x, y); ctx.restore();
      }
      function arrow(ctx, x1, y1, x2, y2, pad, p, col, lw) {
        const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
        const ax = x1 + ux * pad, ay = y1 + uy * pad, ex = x2 - ux * pad, ey = y2 - uy * pad;
        const bx = ax + (ex - ax) * p, by = ay + (ey - ay) * p;
        ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw || 2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        if (p > 0.6) { const hs = 10; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx - ux * hs - uy * hs * 0.55, by - uy * hs + ux * hs * 0.55); ctx.lineTo(bx - ux * hs + uy * hs * 0.55, by - uy * hs - ux * hs * 0.55); ctx.closePath(); ctx.fill(); }
      }
      // Triangle of three options; used by the Condorcet cycle and Sen's paradox.
      function triGeo(w, h, rot, shrink) {
        const cx = w / 2, cy = h * 0.55, R = Math.min(w * (shrink || 0.3), h * 0.31);
        const P = [-90, 30, 150].map(a => { const r = (a * Math.PI) / 180 + (rot || 0); return { x: cx + Math.cos(r) * R, y: cy + Math.sin(r) * R }; });
        return { P, cx, cy, R };
      }
      function triDraw(ctx, g, names, labels, edges, cyc, T, extra) {
        const { P, cx, cy } = g;
        // faint base triangle
        ctx.save();
        ctx.strokeStyle = C(70, 0.12 + 0.25 * cyc); ctx.lineWidth = 1;
        ctx.beginPath(); P.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.closePath(); ctx.stroke();
        if (cyc > 0.01) {
          ctx.globalCompositeOperation = 'lighter';
          ctx.shadowColor = C(62); ctx.shadowBlur = 18 * cyc; ctx.strokeStyle = C(66, 0.35 * cyc); ctx.lineWidth = 2;
          ctx.beginPath(); P.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))); ctx.closePath(); ctx.stroke();
          ctx.shadowBlur = 0;
          const order = extra && extra.order || [0, 1, 2], n = 8;
          for (let k = 0; k < n; k++) {
            const s = ((T * 0.00021 + k / n) % 1) * 3, seg = Math.floor(s) % 3, f = s - Math.floor(s);
            const p = P[order[seg]], q = P[order[(seg + 1) % 3]];
            const x = p.x + (q.x - p.x) * f, y = p.y + (q.y - p.y) * f;
            glowC(ctx, x, y, 14, 70, 0.45 * cyc); dot(ctx, x, y, 1.8, C(88, cyc));
          }
          ctx.globalCompositeOperation = 'source-over';
        }
        // duel arrows (winner -> loser)
        for (const e of edges) {
          const a = P[e.w], b = P[e.l];
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.shadowColor = C(62); ctx.shadowBlur = 10;
          arrow(ctx, a.x, a.y, b.x, b.y, 27, e.p, C(e.dim ? 45 : 72, e.dim ? 0.5 : 0.95), e.bold ? 3 : 2);
          ctx.restore();
          if (e.label && e.p > 0.8) {
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, ox = mx - cx, oy = my - cy, L = Math.hypot(ox, oy) || 1;
            text(ctx, e.label, mx + (ox / L) * 16, my + (oy / L) * 16, { size: 11, color: C(80, 0.9) });
          }
        }
        // vertices
        P.forEach((p, i) => {
          const hi = extra && extra.hi === i, dim = extra && extra.dimV === i;
          if (hi) glowC(ctx, p.x, p.y, 44, 62, 0.35);
          ctx.fillStyle = 'rgba(10,16,30,.95)'; ctx.strokeStyle = hi ? C(80) : dim ? 'rgba(168,188,228,.3)' : C(66, 0.8); ctx.lineWidth = hi ? 2 : 1.4;
          ctx.beginPath(); ctx.arc(p.x, p.y, 21, 0, 6.2832); ctx.fill(); ctx.stroke();
          text(ctx, names[i], p.x, p.y + 1, { size: 18, font: 'disp', color: dim ? 'rgba(232,236,245,.4)' : '#E8ECF5' });
          const ox = p.x - cx, oy = p.y - cy, L = Math.hypot(ox, oy) || 1;
          text(ctx, labels[i], p.x + (ox / L) * 40, p.y + (oy / L) * 36, { size: 13, font: 'serif', color: dim ? 'rgba(162,173,196,.45)' : 'rgba(232,236,245,.85)' });
        });
        ctx.restore();
      }

      /* ================================================= SCENE 1 · 围栏外的三个人 */
      async function scene1() {
        const sc = openScene(1, '围栏外的三个人');
        const EYE = [3.3, 2.4, 1.5];
        const st = { stacks: [0, 0, 0], disp: [0, 0, 0], pool: 3, mode: 'boxes', lock: false, sink: 0, sinkT: 0, mesh: 0, meshT: 0, drag: null, welfare: false };
        const goal = goalKeeper();
        let G = null;
        const eyeOf = i => EYE[i] - (i === 0 ? st.sinkT : 0);
        const sees = i => st.meshT > 0 || eyeOf(i) + st.stacks[i] > 3.001;
        const seeCount = () => [0, 1, 2].filter(sees).length;
        const geo = (w, h) => {
          const ground = h - Math.max(22, h * 0.07);
          const bh = clamp(Math.min((ground - 30) / 5.4, (ground - 10) / 7.2), 20, 46); // a tall person on three boxes must still fit
          const W = Math.min(w, 640), x0 = (w - W) / 2;
          const bw = Math.min(bh * 1.2, W * 0.13);
          const fence = ground - 3 * bh;
          return { ground, bh, bw, xs: [x0 + W * 0.42, x0 + W * 0.63, x0 + W * 0.84], px: x0 + W * 0.14, fence, fx: w / 2, fy: fence * 0.62 };
        };

        function box(ctx, x, bottom, bw, bh, a) {
          if (a <= 0.01) return;
          ctx.save(); ctx.globalAlpha = a;
          const y = bottom - bh + 2, hh = bh - 3;
          ctx.fillStyle = C(16, 0.95, 40); ctx.strokeStyle = C(66, 0.85); ctx.lineWidth = 1.2;
          rr(ctx, x - bw / 2, y, bw, hh, 4); ctx.fill(); ctx.stroke();
          ctx.strokeStyle = C(66, 0.32); ctx.beginPath(); ctx.moveTo(x - bw / 2 + 5, y + hh / 2); ctx.lineTo(x + bw / 2 - 5, y + hh / 2); ctx.stroke();
          ctx.restore();
        }
        function person(ctx, x, base, eye, bh, vis, i) {
          const r = bh * 0.24, hy = base - eye * bh, top = hy + r + bh * 0.05, bwid = bh * 0.52;
          ctx.save();
          if (vis) {
            ctx.globalCompositeOperation = 'lighter';
            const lg = ctx.createLinearGradient(x, hy, G.fx, G.fy); lg.addColorStop(0, C(75, 0.4)); lg.addColorStop(1, C(75, 0));
            ctx.strokeStyle = lg; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, hy); ctx.lineTo(G.fx, G.fy); ctx.stroke();
            ctx.globalCompositeOperation = 'source-over';
          }
          ctx.fillStyle = vis ? C(22, 0.95, 45) : 'rgba(20,28,46,.96)';
          ctx.strokeStyle = vis ? C(72, 0.95) : 'rgba(168,188,228,.42)'; ctx.lineWidth = 1.4;
          rr(ctx, x - bwid / 2, top, bwid, Math.max(4, base - top - 1), bwid * 0.45); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.arc(x, hy, r, 0, 6.2832);
          if (vis) { ctx.shadowColor = C(62); ctx.shadowBlur = 16; ctx.fillStyle = C(66, 0.95); }
          ctx.fill(); ctx.shadowBlur = 0; ctx.stroke();
          const my = hy - r - 11;
          ctx.beginPath(); ctx.arc(x, my, 4, 0, 6.2832);
          if (vis) { ctx.fillStyle = C(78); ctx.fill(); } else { ctx.strokeStyle = 'rgba(168,188,228,.55)'; ctx.lineWidth = 1.2; ctx.stroke(); }
          if (st.welfare) text(ctx, vis ? '10' : '4', x, my - 15, { size: 13, weight: 500, color: vis ? C(82) : 'rgba(200,210,230,.8)' });
          ctx.restore();
        }
        function draw(ctx, w, h, t, dt) {
          G = geo(w, h);
          const { ground, bh, bw, xs, px, fence, fx, fy } = G;
          const T = api.reduced ? 0 : t;
          for (let i = 0; i < 3; i++) st.disp[i] = approach(st.disp[i], st.stacks[i], dt, 12);
          st.sink = approach(st.sink, st.sinkT, dt, 4);
          st.mesh = approach(st.mesh, st.meshT, dt, 3);
          ctx.clearRect(0, 0, w, h);
          // the field beyond the fence
          ctx.save(); ctx.globalCompositeOperation = 'lighter';
          glow(ctx, fx, fy, Math.max(w, fence) * 0.7, C(42, 0.3), C(42, 0));
          glowW(ctx, w * 0.06, 10, 90, 0.16); glowW(ctx, w * 0.94, 10, 90, 0.16);
          const rx = Math.min(w * 0.42, 300), ry = Math.max(8, Math.min(fence * 0.26, 66));
          ctx.strokeStyle = C(72, 0.3); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.ellipse(fx, fy + 4, rx, ry, 0, 0, 6.2832); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(fx, fy + 4 - ry); ctx.lineTo(fx, fy + 4 + ry); ctx.stroke();
          ctx.beginPath(); ctx.ellipse(fx, fy + 4, rx * 0.16, ry * 0.3, 0, 0, 6.2832); ctx.stroke();
          const bx = fx + Math.sin(T * 0.0009) * rx * 0.8, by = fy + 4 - Math.abs(Math.sin(T * 0.0026)) * Math.min(26, ry);
          glowW(ctx, bx, by, 14, 0.6); dot(ctx, bx, by, 2.4, '#FFF6E4');
          ctx.restore();
          // the fence (fades into a see-through mesh)
          const m = st.mesh;
          ctx.fillStyle = `rgba(9,14,26,${(0.95 * (1 - m)).toFixed(3)})`; ctx.fillRect(0, fence, w, ground - fence);
          const pw = Math.max(18, bw * 0.55);
          ctx.strokeStyle = C(55, 0.16 * (1 - m) + 0.02); ctx.lineWidth = 1;
          ctx.beginPath(); for (let x = (w % pw) / 2; x <= w; x += pw) { ctx.moveTo(x + 0.5, fence + 3); ctx.lineTo(x + 0.5, ground); } ctx.stroke();
          if (m > 0.02) {
            ctx.strokeStyle = C(72, 0.22 * m); ctx.beginPath();
            const H = ground - fence;
            for (let x = -H; x < w + H; x += 15) { ctx.moveTo(x, fence); ctx.lineTo(x + H, ground); ctx.moveTo(x + H, fence); ctx.lineTo(x, ground); }
            ctx.stroke();
          }
          ctx.strokeStyle = C(72, 0.55 * (1 - m) + 0.15); ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(0, fence); ctx.lineTo(w, fence); ctx.stroke();
          ctx.strokeStyle = 'rgba(190,206,240,.3)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(0, ground + 0.5); ctx.lineTo(w, ground + 0.5); ctx.stroke();
          // the pool of boxes
          if (st.mode === 'boxes') {
            for (let k = 0; k < st.pool; k++) box(ctx, px, ground - k * bh, bw, bh, 1);
            if (!st.pool) { ctx.save(); ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(168,188,228,.25)'; rr(ctx, px - bw / 2, ground - bh + 2, bw, bh - 3, 4); ctx.stroke(); ctx.restore(); }
            text(ctx, `木箱 ×${st.pool}`, px, ground + Math.max(11, (h - ground) / 2), { size: 11, color: 'rgba(162,173,196,.8)' });
          }
          // people on their boxes
          for (let i = 0; i < 3; i++) {
            const x = xs[i];
            for (let k = 0; k < st.stacks[i]; k++) box(ctx, x, ground - k * bh, bw, bh, k === st.stacks[i] - 1 ? clamp(st.disp[i] - k, 0, 1) : 1);
            const eye = EYE[i] - (i === 0 ? st.sink : 0);
            person(ctx, x, ground - st.disp[i] * bh, eye, bh, m > 0.5 || eye + st.disp[i] > 3.001, i);
          }
          if (st.drag) { ctx.save(); ctx.shadowColor = C(62); ctx.shadowBlur = 18; box(ctx, st.drag.x, st.drag.y + bh / 2, bw, bh, 0.95); ctx.restore(); }
        }

        const v = stage(sc, 'min(56vh,440px)', draw, 'grab');
        const cap = el('p', { class: 'l05-note' });
        const bar = el('div', { class: 'l05-bar' });
        sc.node.append(cap, bar);
        const status = () => { if (!st.lock && st.mode === 'boxes') note(cap, `木箱还剩 ${st.pool} 只 · 看得见 **${seeCount()} / 3** 人`); };
        const changed = () => { status(); v.kick(); goal.check(); };
        function give(i) {
          if (st.pool > 0 && st.stacks[i] < 3) { st.pool--; st.stacks[i]++; api.sfx('select'); changed(); }
          else { api.sfx('tick'); if (!st.lock) note(cap, st.pool ? '一个人最多站三只箱子。' : '箱子都分出去了。点一下某人脚下的箱子，可以把它收回来。'); }
        }
        const cv = v.canvas;
        api.listen(cv, 'pointerdown', e => {
          if (st.mode !== 'boxes' || st.lock || !G || st.drag) return;
          const p = local(e, cv), { ground, bh, bw, xs, px } = G, half = Math.max(bw / 2, 22);
          const inStack = (x, n) => n > 0 && Math.abs(p.x - x) <= half && p.y >= ground - n * bh - 4 && p.y <= ground + 10;
          let from = null;
          if (inStack(px, st.pool)) { from = 'pool'; st.pool--; }
          else for (let i = 0; i < 3; i++) if (inStack(xs[i], st.stacks[i])) { from = i; st.stacks[i]--; break; }
          if (from === null) {
            for (let i = 0; i < 3; i++) {
              const top = ground - (st.stacks[i] + eyeOf(i) + 0.6) * bh;
              if (Math.abs(p.x - xs[i]) <= Math.max(bh * 0.6, 24) && p.y >= top && p.y <= ground) { give(i); return; }
            }
            return;
          }
          e.preventDefault();
          try { cv.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
          st.drag = { from, x: p.x, y: p.y, x0: p.x, y0: p.y, id: e.pointerId };
          api.sfx('tick'); status(); v.kick();
        });
        api.listen(cv, 'pointermove', e => {
          if (!st.drag || e.pointerId !== st.drag.id) return;
          const p = local(e, cv); st.drag.x = p.x; st.drag.y = p.y; v.kick();
        });
        const drop = e => {
          const d = st.drag; if (!d || (e && e.pointerId !== d.id)) return;
          st.drag = null;
          const moved = Math.hypot(d.x - d.x0, d.y - d.y0) > 8, reach = Math.max(G.bw * 0.75, 30);
          let to = 'pool';
          if (moved) {
            let best = 0, bd = Infinity;
            G.xs.forEach((x, i) => { const dd = Math.abs(d.x - x); if (dd < bd) { bd = dd; best = i; } });
            if (bd <= reach && st.stacks[best] < 3) to = best;
            else if (Math.abs(d.x - G.px) <= reach) to = 'pool';
            else to = d.from;
          }
          if (to === 'pool') st.pool++; else st.stacks[to]++;
          api.sfx(to === 'pool' ? 'tick' : 'select');
          changed();
        };
        api.listen(cv, 'pointerup', drop);
        api.listen(cv, 'pointercancel', drop);

        const reset = btn('全部收回', '', () => { if (st.mode !== 'boxes' || st.lock) return; st.pool = 3; st.stacks = [0, 0, 0]; api.sfx('whoosh'); changed(); });
        const gives = ['给高个子', '给中间的', '给矮个子'].map((t, i) => btn(t, '', () => { if (st.mode === 'boxes' && !st.lock) give(i); }));
        bar.append(...gives, reset);
        status();

        api.hint('三个人隔着栅栏看球。左边有三只木箱：**拖**到人脚下，或者**点**一下那个人。先试试**每人一个**。');
        await goal.wait(() => st.stacks.every(n => n === 1));
        st.lock = true; api.sfx('select');
        note(cap, '**均等**（equality）：每人一个箱子 · 看得见 2 / 3');
        await api.say(['这叫**均等**：每个人分到的东西一样多。', '可最矮的那位垫了箱子还是看不见，高个子脚下那只箱子又是多余的。']);
        st.lock = false; status();
        api.hint('重新分这三只箱子，让**三个人都看见**。点一下某人脚下的箱子，可以把它收回。');
        await goal.wait(() => seeCount() === 3);
        st.lock = true; api.sfx('ok');
        note(cap, '**公平**（equity）：按需分配 · 看得见 3 / 3');
        api.collect('l05-equity');
        await api.say(['这叫**公平**：分到的东西不一样，处境却一样了。',
          '森会问：**什么的**平等？箱子是资源，“看见比赛”才是人实际能做到的事。']);

        // levelling down
        await api.say('换一个问题。假设箱子都被收走了。');
        st.mode = 'levels'; st.stacks = [0, 0, 0]; st.pool = 0; st.welfare = true; bar.replaceChildren();
        api.sfx('whoosh'); v.kick();
        note(cap, 'A：高个子 **10**，另外两位 **4** · 差距 6');
        api.hint('看得见的人，福利记作 10；看不见的，记作 4。');
        await clicked(bar, '让高个子也看不见');
        st.sinkT = 0.75; api.sfx('whoosh'); v.kick();
        note(cap, 'B：三个人都是 **4** · 差距 0，更“平等”了');
        await sleep(1300);
        bar.replaceChildren();
        await api.quiz({
          q: '从 A 到 B，谁的处境变好了？', sub: 'A：高个子 10，另外两位 4。B：三个人都是 4。',
          options: [
            { t: '两位矮个子：大家终于一样了', why: '他们仍然是 4，仍然看不见。“一样”不等于“变好”。' },
            { t: '高个子：再也没人羡慕他', why: '他从 10 掉到了 4。' },
            { t: '没有人变好，有人变差', ok: true, why: '可 B 的差距是 0，确实“更平等”。如果平等**本身**有价值，就得承认 B 至少在某一方面更好。' },
          ],
        });
        api.collect('l05-leveldown');
        await api.say(['这就是帕菲特的**向下拉平异议**：对谁都没好处的改变，怎么会在任何方面“更好”？',
          '他的出路叫**优先主义**：不盯着差距，而关心处境差的人。处境越差，帮他越要紧。',
          '照这个看法，压矮高个子毫无价值；给矮个子垫箱子，价值很大。']);

        // the fence itself
        st.sinkT = 0; st.welfare = false; v.kick(); note(cap, '');
        await api.say('最后一个变体。前面两种分法，都把栅栏当作理所当然。');
        api.hint('如果要改的不是箱子，而是栅栏呢？');
        await clicked(bar, '换掉栅栏');
        st.meshT = 1; api.sfx('open'); v.kick();
        note(cap, '换成通透的铁丝网：谁都不需要箱子 · 看得见 3 / 3');
        await sleep(1100);
        bar.replaceChildren();
        await api.say(['障碍也许是栅栏本身：与其给坐轮椅的人发“箱子”，不如修一条坡道。',
          '也有人追问：谁来决定每人“需要”几个箱子？箱子要是高个子自己带来的呢？']);
        sc.end();
      }

      /* ================================================= SCENE 2 · 幕后与明星 */
      async function scene2() {
        const sc = openScene(2, '幕后与明星');
        const SOC = [
          { name: '平原', d: [5, 5, 5, 5, 5] },
          { name: '高塔', d: [1, 3, 7, 13, 21] },
          { name: '阶梯', d: [6, 7, 8, 10, 12] },
        ];
        const st = { mode: 'veil', sel: -1, veil: 0, veilT: 0, scan: -1, pick: -1, draws: 0, busy: false, tickets: 0, prog: 0, coins: [], d1: null };
        const goal = goalKeeper();
        const area = w => { const W = Math.min(w, 720); return { W, x0: (w - W) / 2 }; };

        function drawVeil(ctx, w, h, T) {
          const { W, x0 } = area(w), cw = W / 3, base = h * 0.72, Hm = h * 0.5;
          const sp = Math.min(cw * 0.16, 26), bw = Math.min(18, sp * 0.8);
          SOC.forEach((s, i) => {
            const cx = x0 + cw * (i + 0.5), sel = st.sel === i, dimmed = st.sel >= 0 && !sel;
            if (sel) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, cx, base - Hm * 0.4, cw * 0.62, 50, 0.13); ctx.restore(); }
            s.d.forEach((val, k) => {
              const x = cx + (k - 2) * sp, bh = (val / 21) * Hm, picked = sel && st.pick === k;
              if (picked) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, x, base - bh / 2, Math.max(30, bh * 0.7), 62, 0.35); ctx.restore(); }
              ctx.fillStyle = picked ? C(70, 0.95) : C(55, dimmed ? 0.1 : 0.26);
              ctx.strokeStyle = picked ? C(90) : C(70, dimmed ? 0.28 : 0.8); ctx.lineWidth = 1.2;
              rr(ctx, x - bw / 2, base - bh, bw, bh, 3); ctx.fill(); ctx.stroke();
              if (picked) text(ctx, '你', x, base - bh - 13, { size: 13, font: 'serif', color: C(86) });
            });
            if (sel && st.veil > 0.01) {
              const L = cx - cw / 2 + 6, R = cx + cw / 2 - 6, top = base - Hm - 22;
              ctx.save();
              ctx.fillStyle = `rgba(8,12,22,${(0.86 * st.veil).toFixed(3)})`; ctx.fillRect(L, top, R - L, base - top + 4);
              ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 1;
              for (let x = L + 2; x < R; x += 4) {
                const a = st.veil * (0.16 + 0.13 * Math.sin(x * 0.23 + T * 0.0019) + 0.06 * Math.sin(x * 0.07 - T * 0.0011));
                ctx.strokeStyle = C(76, Math.max(0, a)); ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x + Math.sin(T * 0.001 + x) * 1.5, base + 4); ctx.stroke();
              }
              if (st.scan >= 0) { const x = cx + (st.scan - 2) * sp; glowW(ctx, x, base - Hm * 0.45, Math.max(26, sp * 1.4), 0.32); ctx.fillStyle = BEAM(0.16); ctx.fillRect(x - bw / 2, top, bw, base - top); }
              ctx.restore();
            }
            text(ctx, s.name, cx, base + 20, { size: 15, font: 'serif', color: dimmed ? 'rgba(232,236,245,.45)' : '#E8ECF5' });
            text(ctx, `最低 ${Math.min(...s.d)} · 总 ${s.d.reduce((a, b) => a + b, 0)}`, cx, base + 40, { size: 10.5, color: 'rgba(162,173,196,.8)' });
          });
        }
        function drawStar(ctx, w, h, T, dt) {
          st.prog = approach(st.prog, st.tickets / 1e6, dt, 6);
          const p = st.prog, d1 = st.d1, med = d1.slice().sort((a, b) => a - b)[2];
          const vals = d1.map(x => Math.max(0.4, x - 0.9 * p)), sv = med + 24 * p, maxV = Math.max(...d1, med + 24) + 1;
          const { W, x0 } = area(w), base = h * 0.8, Hm = h * 0.58;
          const sp = Math.min(W * 0.1, 46), bw = Math.min(26, sp * 0.62), left = x0 + W * 0.36, sx = x0 + W * 0.8;
          const top = k => base - (vals[k] / maxV) * Hm, sTop = base - (sv / maxV) * Hm;
          vals.forEach((val, k) => {
            const x = left + (k - 2) * sp;
            ctx.fillStyle = C(55, 0.26); ctx.strokeStyle = C(70, 0.8); ctx.lineWidth = 1.2;
            rr(ctx, x - bw / 2, top(k), bw, base - top(k), 3); ctx.fill(); ctx.stroke();
            ctx.save(); ctx.setLineDash([2, 4]); ctx.strokeStyle = 'rgba(232,236,245,.25)';
            const y1 = base - (d1[k] / maxV) * Hm; ctx.beginPath(); ctx.moveTo(x - bw / 2 - 3, y1); ctx.lineTo(x + bw / 2 + 3, y1); ctx.stroke(); ctx.restore();
          });
          ctx.save(); ctx.globalCompositeOperation = 'lighter';
          glowC(ctx, sx, sTop, 40 + 30 * p, 62, 0.25 + 0.2 * p);
          ctx.restore();
          ctx.fillStyle = C(62, 0.55 + 0.3 * p); ctx.strokeStyle = C(88); ctx.lineWidth = 1.4;
          rr(ctx, sx - bw * 0.6, sTop, bw * 1.2, base - sTop, 4); ctx.fill(); ctx.stroke();
          const sy = sTop - 20, sr = 9 + (api.reduced ? 0 : Math.sin(T * 0.004) * 1.5);
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowW(ctx, sx, sy, 22, 0.5);
          ctx.strokeStyle = BEAM(0.95); ctx.lineWidth = 1.4; ctx.beginPath();
          ctx.moveTo(sx - sr, sy); ctx.lineTo(sx + sr, sy); ctx.moveTo(sx, sy - sr); ctx.lineTo(sx, sy + sr);
          ctx.moveTo(sx - sr * 0.45, sy - sr * 0.45); ctx.lineTo(sx + sr * 0.45, sy + sr * 0.45); ctx.moveTo(sx + sr * 0.45, sy - sr * 0.45); ctx.lineTo(sx - sr * 0.45, sy + sr * 0.45); ctx.stroke();
          // coins: each fan's 25 cents flies to the star
          for (let i = st.coins.length - 1; i >= 0; i--) {
            const c = st.coins[i]; c.t += (dt / 760) * c.sp;
            if (c.t >= 1) { st.coins.splice(i, 1); continue; }
            if (c.t < 0) continue;
            const ax = left + (c.k - 2) * sp, ay = top(c.k), bx = sx, by = sTop, mx = (ax + bx) / 2, my = Math.min(ay, by) - 50;
            const u = c.t, x = (1 - u) * (1 - u) * ax + 2 * (1 - u) * u * mx + u * u * bx, y = (1 - u) * (1 - u) * ay + 2 * (1 - u) * u * my + u * u * by;
            glowC(ctx, x, y, 9, 80, 0.55); dot(ctx, x, y, 1.6, C(92));
          }
          ctx.restore();
          ctx.strokeStyle = 'rgba(190,206,240,.28)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0 + 10, base + 0.5); ctx.lineTo(x0 + W - 10, base + 0.5); ctx.stroke();
          text(ctx, p > 0.995 ? 'D2' : 'D1', left, base + 18, { size: 13, weight: 500, color: p > 0.995 ? C(84) : 'rgba(232,236,245,.85)' });
          text(ctx, '张伯伦', sx, base + 18, { size: 13, font: 'serif', color: C(84) });
        }
        function draw(ctx, w, h, t, dt) {
          const T = api.reduced ? 0 : t;
          st.veil = approach(st.veil, st.veilT, dt, 7);
          ctx.clearRect(0, 0, w, h);
          if (st.mode === 'veil') drawVeil(ctx, w, h, T); else drawStar(ctx, w, h, T, dt);
        }

        const v = stage(sc, 'min(48vh,380px)', draw);
        const cap = el('p', { class: 'l05-note' });
        const seg = el('div', { class: 'l05-seg' });
        const bar = el('div', { class: 'l05-bar' });
        sc.node.append(cap, seg, bar);
        const segBtns = SOC.map((s, i) => { const b = btn(s.name, '', () => choose(i)); b.setAttribute('aria-pressed', 'false'); seg.append(b); return b; });
        const drawBtn = btn('拉下幕布，抽一个位置', 'hue', () => drawLot());
        drawBtn.disabled = true; bar.append(drawBtn);
        function choose(i) {
          if (st.busy || st.mode !== 'veil' || st.sel === i) return;
          st.sel = i; st.pick = -1;
          segBtns.forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
          drawBtn.disabled = false; api.sfx('select');
          note(cap, `你选了「${SOC[i].name}」。现在走到幕后。`); v.kick();
        }
        api.listen(v.canvas, 'pointerdown', e => {
          if (st.mode !== 'veil') return;
          const p = local(e, v.canvas), { W, x0 } = area(v.w), i = Math.floor((p.x - x0) / (W / 3));
          if (i >= 0 && i < 3) choose(i);
        });
        async function drawLot() {
          if (st.busy || st.sel < 0) return;
          st.busy = true; drawBtn.disabled = true; segBtns.forEach(b => (b.disabled = true));
          st.pick = -1; st.veilT = 1; api.sfx('whoosh'); v.kick();
          note(cap, '幕布之后，你不知道自己是谁……');
          const fin = Math.floor(Math.random() * 5), steps = api.reduced ? 1 : 10 + fin;
          await sleep(350);
          for (let k = 0; k < steps; k++) { st.scan = (fin - (steps - 1 - k) + 50) % 5; api.sfx('tick'); v.kick(); await sleep(80 + k * 10); }
          await sleep(350);
          st.veilT = 0; st.scan = -1; st.pick = fin; st.draws++; api.sfx('open'); v.kick();
          const s = SOC[st.sel];
          note(cap, `你生在「${s.name}」的第 ${fin + 1} 层（从低往高数）：福利 **${s.d[fin]}**。`);
          drawBtn.textContent = '再抽一次';
          st.busy = false; drawBtn.disabled = false; segBtns.forEach(b => (b.disabled = false));
          goal.check();
        }

        note(cap, '三个社会，每根柱子是一个位置上的人生。数字越大，过得越好。');
        api.hint('选一个社会，然后走到**幕后**：你不知道自己会生在哪一层。抽两次试试。');
        reveal(bar);
        await goal.wait(() => st.draws >= 2 && !st.busy);
        drawBtn.disabled = true; segBtns.forEach(b => (b.disabled = true));
        await api.say(['不知道自己会生在哪个家庭、有什么天赋：这是罗尔斯的**无知之幕**。', '在幕后挑选社会的规则，你会看重什么？']);
        await api.quiz({
          q: '按罗尔斯的**差别原则**，该选哪个社会？', sub: '平原：人人 5。高塔：1、3、7、13、21。阶梯：6、7、8、10、12。',
          options: [
            { t: '平原：人人一样', why: '人人都是 5，很平等。可阶梯的最底层是 6：容许一点不平等，最差的人反而更好。' },
            { t: '高塔：总量最大', why: '总量 45 最大，可最底层只有 1。差别原则看的不是总量。' },
            { t: '阶梯：有高有低，但最底层过得最好', ok: true, why: '不平等可以有，但它必须使**处境最差的人**得到最大的利益：6 > 5 > 1。' },
          ],
        });
        api.collect('l05-veil');
        await api.say(['罗尔斯的两条原则：基本自由人人平等；经济不平等须伴随公平的机会，并让处境最差的人得益最大。',
          '而且第一条**优先**：不能拿基本自由去换经济利益。']);

        // Chamberlain
        st.mode = 'star'; st.d1 = SOC[st.sel >= 0 ? st.sel : 2].d.slice(); st.pick = -1; st.veilT = 0;
        seg.remove(); bar.replaceChildren(); v.kick();
        note(cap, `D1：「${SOC[st.sel >= 0 ? st.sel : 2].name}」。就当它是最公正的分配。`);
        await api.say(['假设你选中的分配就是最公正的，叫它 **D1**。',
          '诺齐克请来一位篮球明星：张伯伦（Wilt Chamberlain）。每张门票里有 25 美分归他本人。']);
        const hb = el('button', { class: 'btn hue l05-hold', type: 'button', text: '按住：开赛季' });
        bar.append(hb);
        let holding = false, h0 = 0, lastTick = 0, onDone = null;
        const done = new Promise(res => { onDone = res; });
        const add = n => {
          if (st.tickets >= 1e6) return;
          const before = st.tickets; st.tickets = Math.min(1e6, Math.round(st.tickets + n));
          if (!api.reduced && st.coins.length < 90) { const k = Math.min(6, Math.ceil((st.tickets - before) / 12000)); for (let j = 0; j < k; j++) st.coins.push({ k: Math.floor(Math.random() * 5), t: -j * 0.12, sp: 0.85 + Math.random() * 0.5 }); }
          note(cap, `门票 ${fmtN(st.tickets)} 张 · 张伯伦多得 **$${fmtN(st.tickets * 0.25)}**`);
          const now = performance.now(); if (now - lastTick > 90) { api.sfx('tick'); lastTick = now; }
          v.kick();
          if (st.tickets >= 1e6) { holding = false; hb.classList.remove('on'); hb.disabled = true; clearInterval(iv); api.sfx('chime'); onDone(); }
        };
        const bump = () => add(Math.max(20000, st.tickets * 0.4));
        const release = () => { holding = false; hb.classList.remove('on'); };
        api.listen(hb, 'pointerdown', e => {
          if (hb.disabled) return;
          holding = true; h0 = performance.now(); hb.classList.add('on');
          try { hb.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
          bump();
        });
        api.listen(hb, 'pointerup', release); api.listen(hb, 'pointercancel', release); api.listen(hb, 'lostpointercapture', release);
        api.listen(hb, 'contextmenu', e => e.preventDefault());
        api.listen(hb, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bump(); } });
        const iv = api.interval(() => { if (!holding) return; const s = (performance.now() - h0) / 1000; add(1500 + 9000 * s * s); }, 50);
        api.hint('一百万名球迷，每人**自愿**买票。按住按钮，让赛季开打。');
        reveal(hb);
        await done;
        await sleep(900);
        note(cap, '**D2**：一百万次自愿的交换之后，原来的模式被打乱了。');
        await api.quiz({
          q: '每一步都是自愿的。诺齐克从这里得出什么结论？',
          options: [
            { t: '张伯伦应该把钱退回去，恢复 D1', why: '那就得撤销一百万次自愿的交换，这正是诺齐克反对的。' },
            { t: '**自由会打乱模式**：任何模式化的分配，要维持下去，就得不断干涉自由交换', ok: true, why: '要么禁止某些交易，要么不断征税再分配。诺齐克因此主张：看分配的**来历**，不看它的**形状**。' },
            { t: 'D1 本来就不公正', why: '论证的妙处在于：D1 可以是**你**认为最公正的任何分配。' },
          ],
        });
        api.collect('l05-chamberlain');
        await api.say(['科恩回应：每个球迷同意的，只是“用 25 美分换一场球”。',
          '他们并没有同意由此累积的巨大差距，以及它对第三者和后代的影响。',
          '科恩还说：对一无所有的人来说，别人的产权本身就是一道栅栏。']);
        sc.end();
      }

      /* ================================================= SCENE 3 · 孔多塞的循环 */
      function ballots(list, cls) {
        const box = el('div', { class: 'l05-ballots' + (cls ? ' ' + cls : '') }), chips = {};
        list.forEach(([n, r]) => {
          const rk = el('div', { class: 'rk' }); chips[n] = {};
          [...r].forEach((x, k) => { if (k) rk.append(el('i', { text: '›' })); const s = el('span', { text: x }); chips[n][x] = s; rk.append(s); });
          box.append(el('div', { class: 'l05-ballot' }, el('div', { class: 'who', text: n }), rk));
        });
        const clear = () => Object.values(chips).forEach(m => Object.values(m).forEach(s => s.classList.remove('pick')));
        return { box, chips, clear };
      }
      function crownGlyph(ctx, x, y, a) {
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        glowC(ctx, x, y, 46, 70, 0.35 * a);
        ctx.strokeStyle = C(84, a); ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(x, y, 27, 0, 6.2832); ctx.stroke();
        ctx.beginPath();
        for (let k = 0; k < 12; k++) { const an = (k / 12) * 6.2832 - Math.PI / 2, r2 = k % 2 ? 33 : 38; ctx.moveTo(x + Math.cos(an) * 30, y + Math.sin(an) * 30); ctx.lineTo(x + Math.cos(an) * r2, y + Math.sin(an) * r2); }
        ctx.stroke(); ctx.restore();
      }
      async function scene3() {
        const sc = openScene(3, '孔多塞的循环');
        const L3 = ['A', 'B', 'C'], NAME = ['均等', '按需', '各凭本事'];
        const VOT = [['甲', 'ABC'], ['乙', 'BCA'], ['丙', 'CAB']];
        const idx = x => L3.indexOf(x);
        const beats = (x, y) => VOT.filter(([, r]) => r.indexOf(x) < r.indexOf(y)).length >= 2;
        const fans = (x, y) => VOT.filter(([, r]) => r.indexOf(x) < r.indexOf(y)).map(([n]) => n);
        const st = { edges: [], cyc: 0, cycT: 0, rot: 0, hi: -1, crown: -1, crownA: 0, crownAT: 0 };
        const goal = goalKeeper();
        const B = ballots(VOT);
        sc.node.append(B.box);
        function draw(ctx, w, h, t, dt) {
          const T = api.reduced ? 0 : t;
          st.cyc = approach(st.cyc, st.cycT, dt, 2.5);
          if (!api.reduced) st.rot += dt * 0.00009 * st.cyc;
          st.crownA = approach(st.crownA, st.crownAT, dt, 7);
          st.edges.forEach(e => { e.p = approach(e.p, 1, dt, 5); });
          ctx.clearRect(0, 0, w, h);
          const g = triGeo(w, h, st.rot, 0.28);
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, g.cx, g.cy, g.R * 1.7, 40, 0.08 + 0.14 * st.cyc); ctx.restore();
          triDraw(ctx, g, L3, NAME, st.edges, st.cyc, T, { hi: st.hi });
          if (st.crown >= 0 && st.crownA > 0.02) crownGlyph(ctx, g.P[st.crown].x, g.P[st.crown].y, st.crownA);
          if (st.cyc > 0.05) text(ctx, 'A ≻ B ≻ C ≻ A', g.cx, g.cy + 2, { size: 12, color: C(84, st.cyc) });
        }
        const v = stage(sc, 'min(44vh,360px)', draw);
        const cap = el('p', { class: 'l05-note' });
        const bar = el('div', { class: 'l05-bar' });
        sc.node.append(cap, bar);
        let busy = false;
        const unlock = list => list.forEach(b => { if (!b.dataset.done) b.disabled = false; });
        const lockAll = list => list.forEach(b => (b.disabled = true));

        // 1. pairwise duels
        const duelBtns = [['A', 'B'], ['B', 'C'], ['C', 'A']].map(([x, y]) => { const b = btn(`${x} 对 ${y}`, '', () => duel(x, y, b)); bar.append(b); return b; });
        async function duel(x, y, b) {
          if (busy || b.dataset.done) return;
          busy = true; lockAll(duelBtns); B.clear(); st.hi = -1;
          note(cap, `${x} 对 ${y}：三个人各投一票……`);
          for (const [n, r] of VOT) { B.chips[n][r.indexOf(x) < r.indexOf(y) ? x : y].classList.add('pick'); api.sfx('tick'); await sleep(360); }
          const w = beats(x, y) ? x : y, l = w === x ? y : x;
          st.edges.push({ w: idx(w), l: idx(l), p: 0, label: '2:1' }); st.hi = idx(w);
          api.sfx('select'); v.kick();
          b.dataset.done = '1'; b.innerHTML = api.fmt(`${x} 对 ${y}：**${w}** 胜`);
          note(cap, `${fans(w, l).join('、')}支持 ${w}：**${w}** 以 2:1 胜 ${l}。`);
          await sleep(700);
          busy = false; unlock(duelBtns); goal.check();
        }
        note(cap, '三个人，三种分凳子的方案。每张选票从左到右：最喜欢 › 其次 › 最不喜欢。');
        api.hint('让方案**两两决斗**：点下面的按钮，看多数票站在哪一边。');
        reveal(bar);
        await goal.wait(() => st.edges.length === 3 && !busy);
        B.clear(); st.hi = -1; st.cycT = 1; api.sfx('open'); v.kick();
        note(cap, '**A ≻ B ≻ C ≻ A**：集体偏好在兜圈子。');
        await sleep(900);
        await api.say(['A 胜 B，B 胜 C，C 又胜 A。',
          '每个人自己的排序都有传递性，多数决出来的**集体偏好**却在兜圈子。']);

        // 2. try to crown a winner
        bar.replaceChildren();
        const tried = new Set();
        const crownBtns = L3.map((X, i) => { const b = btn(`宣布 ${X} 胜出`, '', () => crown(X, b)); bar.append(b); return b; });
        async function crown(X, b) {
          if (busy) return;
          busy = true; lockAll(crownBtns);
          const i = idx(X), Y = L3.find(Z => Z !== X && beats(Z, X));
          B.clear(); st.edges.forEach(e => { e.bold = false; e.dim = false; });
          st.crown = i; st.crownAT = 1; st.hi = i; api.sfx('select'); v.kick();
          note(cap, `宣布：**${X}**（${NAME[i]}）胜出……`);
          await sleep(750);
          const vs = fans(Y, X);
          vs.forEach(n => B.chips[n][Y].classList.add('pick'));
          st.edges.forEach(e => { if (e.w === idx(Y) && e.l === i) e.bold = true; else e.dim = true; });
          st.crownAT = 0; st.hi = idx(Y); api.sfx('bad'); v.kick();
          note(cap, `可是${vs.join('、')}都更喜欢 **${Y}**：多数反对 ${X}。`);
          tried.add(X); b.innerHTML = api.fmt(`${X}：被多数否决`);
          await sleep(1100);
          busy = false; unlock(crownBtns); goal.check();
        }
        api.hint('试着宣布一个赢家。哪一个都行，都试试。');
        reveal(bar);
        await goal.wait(() => tried.size === 3 && !busy);
        lockAll(crownBtns); B.clear(); st.hi = -1; st.edges.forEach(e => { e.bold = false; e.dim = false; }); v.kick();
        api.collect('l05-condorcet');
        await api.say(['宣布谁赢，总有另一个选项被多数人更喜欢。孔多塞在 1785 年注意到了这件事。',
          '既然没有稳定的赢家，**表决顺序**就成了一种权力。']);

        // 3. agenda setting
        bar.replaceChildren();
        const finals = new Set();
        const E = (a, c) => st.edges.find(e => (L3[e.w] === a && L3[e.l] === c) || (L3[e.w] === c && L3[e.l] === a));
        const agBtns = [['A', 'B', 'C'], ['B', 'C', 'A'], ['C', 'A', 'B']].map(([x, y, z]) => { const b = btn(`先比 ${x} 与 ${y}`, '', () => agenda(x, y, z, b)); bar.append(b); return b; });
        async function agenda(x, y, z, b) {
          if (busy) return;
          busy = true; lockAll(agBtns);
          const w1 = beats(x, y) ? x : y, fin = beats(w1, z) ? w1 : z;
          st.edges.forEach(e => { e.dim = true; e.bold = false; });
          const e1 = E(x, y); e1.dim = false; e1.bold = true; st.hi = idx(w1); api.sfx('tick'); v.kick();
          note(cap, `第一轮 ${x} 对 ${y}：**${w1}** 胜。`);
          await sleep(900);
          e1.bold = false; e1.dim = true;
          const e2 = E(w1, z); e2.dim = false; e2.bold = true; st.hi = idx(fin); api.sfx('select'); v.kick();
          note(cap, `第一轮 ${x} 对 ${y}：${w1} 胜；第二轮 ${w1} 对 ${z}：**${fin}** 最终胜出。`);
          finals.add(fin); b.innerHTML = api.fmt(`先比 ${x} 与 ${y} → **${fin}**`);
          await sleep(900);
          busy = false; unlock(agBtns); goal.check();
        }
        api.hint('现在你来主持表决：先比哪两个，胜者再和第三个比。三种顺序都试试。');
        reveal(bar);
        await goal.wait(() => finals.size === 3 && !busy);
        lockAll(agBtns);
        await api.say('三种顺序，三个赢家。**谁控制表决顺序，谁就能决定结果。**');
        sc.end();
      }

      /* ================================================= SCENE 4 · 阿罗之锁 */
      async function scene4() {
        const sc = openScene(4, '阿罗之锁');
        const KEYS = [['U', '无限制定义域'], ['P', '帕累托'], ['I', '无关选项独立性'], ['D', '非独裁']];
        const ANG = { U: -135, P: -45, I: 135, D: 45 };
        const st = { on: { U: true, P: true, I: true, D: true }, n: 2, open: 1, openT: 1, shake: 0, rule: '简单多数决', third: 0, thirdT: 0,
          lockA: 1, lockAT: 1, toggles: 0, sawOpen: false, busy: true, senA: 0, senAT: 0, edges: [], cyc: 0, cycT: 0, hi: -1 };
        const goal = goalKeeper();

        function evalLock() {
          const offs = KEYS.map(k => k[0]).filter(k => !st.on[k]);
          if (st.n === 2) return { open: true, rule: '简单多数决', msg: offs.length ? '两个选项时，怎么拨都打得开。' : '两个选项、四个条件全开：**简单多数决**就做得到。锁开着。' };
          if (!offs.length) return { open: false, rule: '', msg: '三个选项，四个条件全开：锁纹丝不动。' };
          if (offs.length > 1) return { open: true, rule: '更宽松的规则', msg: '关掉两个以上，当然打得开。可哪一个你舍得？' };
          return ({
            D: { open: true, rule: '独裁者', msg: '开了。锁芯里坐着一位**独裁者**：无论别人怎么想，社会排序总和他的一样。' },
            P: { open: true, rule: '固定排序', msg: '开了。比如：不管大家怎么想，都输出同一个排序。代价：全体一致也不听。' },
            I: { open: true, rule: '波达计数', msg: '开了。比如**波达计数**（按名次打分）。代价：加进或拿掉一个陪跑选项，x 与 y 可能换位。' },
            U: { open: true, rule: '只收某些偏好', msg: '开了。比如只接受不会出现循环的偏好组合，再用多数决。代价：这等于挑选民。' },
          })[offs[0]];
        }
        function drawLock(ctx, w, h, T) {
          const cx = w / 2, R = Math.min(w * 0.23, h * 0.24), cy = h * 0.6;
          const ox = st.shake > 0.01 ? Math.sin(T * 0.09) * 6 * st.shake : 0, lift = st.open * R * 0.42, open = st.open > 0.5;
          ctx.save(); ctx.globalAlpha = st.lockA; ctx.translate(ox, 0);
          // shackle
          const sw = R * 0.56, legTop = cy - R * 1.3 - lift;
          ctx.lineWidth = Math.max(6, R * 0.13); ctx.lineCap = 'round';
          ctx.strokeStyle = open ? C(72, 0.9) : 'rgba(190,206,240,.5)';
          if (open) { ctx.shadowColor = C(62); ctx.shadowBlur = 16; }
          ctx.beginPath(); ctx.moveTo(cx - sw, cy - R * 0.6 - lift); ctx.lineTo(cx - sw, legTop); ctx.arc(cx, legTop, sw, Math.PI, 0); ctx.lineTo(cx + sw, cy - R * 0.6); ctx.stroke();
          ctx.shadowBlur = 0;
          // body
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, cx, cy, R * 1.9, 45, 0.1 + 0.18 * st.open); ctx.restore();
          const bg = ctx.createRadialGradient(cx, cy - R * 0.4, R * 0.1, cx, cy, R);
          bg.addColorStop(0, C(18, 1, 40)); bg.addColorStop(1, 'rgba(8,12,22,1)');
          ctx.fillStyle = bg; ctx.strokeStyle = C(70, 0.85); ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832); ctx.fill(); ctx.stroke();
          ctx.strokeStyle = C(70, 0.22); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R * 0.86, 0, 6.2832); ctx.stroke();
          // tumblers
          const tr = Math.max(12, R * 0.15);
          KEYS.forEach(([k]) => {
            const a = (ANG[k] * Math.PI) / 180, x = cx + Math.cos(a) * R * 0.66, y = cy + Math.sin(a) * R * 0.66, on = st.on[k];
            if (on) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, x, y, tr * 2.2, 62, 0.4); ctx.restore(); }
            ctx.fillStyle = on ? C(62) : 'rgba(10,16,30,1)'; ctx.strokeStyle = on ? C(85) : 'rgba(168,188,228,.4)'; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.arc(x, y, tr, 0, 6.2832); ctx.fill(); ctx.stroke();
            text(ctx, k, x, y + 1, { size: 13, weight: 500, color: on ? '#0A0E18' : 'rgba(162,173,196,.7)' });
          });
          // keyhole
          const ky = cy - R * 0.08, kr = R * 0.12;
          ctx.fillStyle = open ? C(80) : 'rgba(3,5,10,1)'; ctx.strokeStyle = C(70, 0.7); ctx.lineWidth = 1.2;
          if (open) { ctx.shadowColor = C(70); ctx.shadowBlur = 20; }
          ctx.beginPath(); ctx.arc(cx, ky, kr, 0, 6.2832); ctx.moveTo(cx - kr * 0.55, ky + kr * 0.6); ctx.lineTo(cx - kr * 0.9, ky + kr * 2.6); ctx.lineTo(cx + kr * 0.9, ky + kr * 2.6); ctx.lineTo(cx + kr * 0.55, ky + kr * 0.6); ctx.fill(); ctx.shadowBlur = 0;
          if (st.rule === '独裁者' && open) {
            const y0 = ky - kr - 10; ctx.strokeStyle = C(88); ctx.lineWidth = 1.4; ctx.beginPath();
            ctx.moveTo(cx - 10, y0); ctx.lineTo(cx - 10, y0 - 8); ctx.lineTo(cx - 5, y0 - 4); ctx.lineTo(cx, y0 - 10); ctx.lineTo(cx + 5, y0 - 4); ctx.lineTo(cx + 10, y0 - 8); ctx.lineTo(cx + 10, y0); ctx.closePath(); ctx.stroke();
          }
          if (open && st.rule) text(ctx, st.rule, cx, cy + R * 0.5, { size: 12.5, font: 'serif', color: C(86) });
          text(ctx, '输出：完整、传递的社会排序', cx, cy + R + 17, { size: 11.5, font: 'serif', color: 'rgba(162,173,196,.75)' });
          ctx.restore();
          // the options on the table
          ctx.save(); ctx.globalAlpha = st.lockA;
          const opts = st.n === 2 ? ['A', 'B'] : ['A', 'B', 'C'];
          text(ctx, '选项', 14, 20, { size: 11, align: 'left', color: 'rgba(162,173,196,.8)' });
          opts.forEach((o, i) => {
            const x = 52 + i * 26, isNew = o === 'C';
            if (isNew) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, x, 20, 22, 70, 0.5 * st.third); ctx.restore(); }
            ctx.strokeStyle = C(70, isNew ? st.third : 0.8); ctx.lineWidth = 1.1; rr(ctx, x - 10, 10, 20, 20, 5); ctx.stroke();
            text(ctx, o, x, 21, { size: 12, color: isNew ? C(88, Math.max(0.2, st.third)) : '#E8ECF5' });
          });
          ctx.restore();
        }
        function bookGlyph(ctx, x, y) {
          ctx.save(); ctx.strokeStyle = C(80, 0.9); ctx.fillStyle = C(30, 0.6, 50); ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(x, y - 9); ctx.quadraticCurveTo(x - 9, y - 13, x - 18, y - 10); ctx.lineTo(x - 18, y + 10); ctx.quadraticCurveTo(x - 9, y + 7, x, y + 11); ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x, y - 9); ctx.quadraticCurveTo(x + 9, y - 13, x + 18, y - 10); ctx.lineTo(x + 18, y + 10); ctx.quadraticCurveTo(x + 9, y + 7, x, y + 11); ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.restore();
        }
        function draw(ctx, w, h, t, dt) {
          const T = api.reduced ? 0 : t;
          st.open = approach(st.open, st.openT, dt, 7);
          st.shake = approach(st.shake, 0, dt, 3.5);
          st.third = approach(st.third, st.thirdT, dt, 4);
          st.lockA = approach(st.lockA, st.lockAT, dt, 4);
          st.senA = approach(st.senA, st.senAT, dt, 3);
          st.cyc = approach(st.cyc, st.cycT, dt, 2.5);
          st.edges.forEach(e => { e.p = approach(e.p, 1, dt, 5); });
          ctx.clearRect(0, 0, w, h);
          if (st.lockA > 0.01) drawLock(ctx, w, h, T);
          if (st.senA > 0.01) {
            ctx.save(); ctx.globalAlpha = st.senA;
            const g = triGeo(w, h, 0, 0.27);
            triDraw(ctx, g, ['x', 'y', 'z'], ['古板先生读', '放荡先生读', '谁都不读'], st.edges, st.cyc, T, { order: [2, 0, 1], hi: st.hi });
            bookGlyph(ctx, g.cx, g.cy - (st.cyc > 0.05 ? 12 : 0));
            if (st.cyc > 0.05) text(ctx, 'z ≻ x ≻ y ≻ z', g.cx, g.cy + 16, { size: 12, color: C(84, st.cyc) });
            ctx.restore();
          }
        }

        const v = stage(sc, 'min(46vh,360px)', draw);
        const cap = el('p', { class: 'l05-note' });
        const swBox = el('div', { class: 'l05-sw' });
        const bar = el('div', { class: 'l05-bar' });
        sc.node.append(cap, swBox, bar);
        const swBtns = {};
        KEYS.forEach(([k, name]) => {
          const b = el('button', { type: 'button', 'aria-pressed': 'true', onclick: () => toggle(k) }, el('b', { text: k }), el('span', { text: name }));
          swBtns[k] = b; swBox.append(b);
        });
        const setSw = on => Object.values(swBtns).forEach(b => (b.disabled = !on));
        function apply(fromUser) {
          const r = evalLock(), was = st.openT;
          st.openT = r.open ? 1 : 0; st.rule = r.rule;
          if (fromUser) { if (!r.open) { st.shake = 1; api.sfx('bad'); } else api.sfx(was ? 'tick' : 'open'); }
          if (st.n === 3 && r.open) st.sawOpen = true;
          note(cap, r.msg); v.kick();
        }
        function toggle(k) {
          if (st.busy) return;
          st.on[k] = !st.on[k]; swBtns[k].setAttribute('aria-pressed', String(st.on[k]));
          st.toggles++; apply(true); goal.check();
        }
        setSw(false); apply(false);

        await api.say(['最后一把锁。四个开关，每一个都很温和。',
          '**U** 不许挑选民；**P** 全体一致时听大家的；**I** 排 x 与 y 只看大家怎么排 x 与 y；**D** 没有独裁者。',
          '锁上还刻着一条：输出必须是完整、有传递性的社会排序。',
          '先看两个选项。四个开关全开，简单多数决就把锁打开了。',
          '梅在 1952 年证明：两个选项时，简单多数决是唯一满足几条自然公平条件的规则。']);
        api.hint('现在，把第三个选项放上桌。');
        await clicked(bar, '放进第三个选项 C');
        bar.replaceChildren();
        st.n = 3; st.thirdT = 1; st.busy = false; setSw(true); apply(true);
        api.hint('锁合上了。拨动开关，想办法让它在**四个开关全开**时打开。');
        reveal(swBox);
        await goal.wait(() => st.toggles >= 4 && st.sawOpen);
        await clicked(bar, '这把锁是不是坏了？', '');
        st.busy = true; setSw(false); bar.replaceChildren();
        KEYS.forEach(([k]) => { st.on[k] = true; swBtns[k].setAttribute('aria-pressed', 'true'); });
        apply(true);
        await api.say('没坏。1951 年，阿罗证明：至少三个选项、至少两个人时，**不存在**同时满足这四条的规则。');
        api.collect('l05-arrow');
        await api.say(['换句话说：只要坚持 U、P、I，规则就**必然**是独裁的。',
          '不是我们还没找到公式，而是可以**证明**：这样的公式不存在。',
          '现实里的投票制度，比如波达计数、排序复选制，都是在这四个开关之间做不同的取舍。']);

        // Sen's liberal paradox
        st.lockAT = 0; st.senAT = 1; swBox.remove(); note(cap, ''); v.kick();
        const PREF = [['古板先生', 'zxy'], ['放荡先生', 'xyz']];
        const B = ballots(PREF, 'two');
        v.box.after(B.box);
        await api.say(['还有一把更小的锁，只用两个条件。它是森在 1970 年造的。',
          '只有一本《查泰莱夫人的情人》。x：古板先生读；y：放荡先生读；z：谁都不读。',
          '古板先生最好谁都别读，非读不可，宁可自己读。放荡先生最想看古板先生被迫读它。']);
        const RULES = [
          { label: '古板先生的私事：他选**不读**', w: 2, l: 0, picks: [['古板先生', 'z']], tag: '私事', msg: '读不读是古板先生自己的事，他在 x 与 z 之间选了不读：社会应当 **z ≻ x**。' },
          { label: '放荡先生的私事：他选**读**', w: 1, l: 2, picks: [['放荡先生', 'y']], tag: '私事', msg: '读不读也是放荡先生自己的事，他在 y 与 z 之间选了读：社会应当 **y ≻ z**。' },
          { label: '帕累托：两人都认为 **x 好过 y**', w: 0, l: 1, picks: [['古板先生', 'x'], ['放荡先生', 'x']], tag: '帕累托', msg: '两人都认为 x 比 y 好。按帕累托原则，社会应当 **x ≻ y**。' },
        ];
        let placed = 0;
        RULES.forEach(r => {
          const b = btn(r.label, '', () => {
            if (b.disabled) return;
            b.disabled = true; placed++;
            B.clear(); r.picks.forEach(([n, x]) => B.chips[n][x].classList.add('pick'));
            st.edges.push({ w: r.w, l: r.l, p: 0, label: r.tag }); st.hi = r.w;
            api.sfx('select'); note(cap, r.msg); v.kick(); goal.check();
          });
          bar.append(b);
        });
        api.hint('最低限度的自由，加上帕累托原则。逐条按下，看社会该怎么排。');
        reveal(bar);
        await goal.wait(() => placed === 3);
        await sleep(900);
        B.clear(); st.hi = -1; st.cycT = 1; api.sfx('open'); v.kick();
        note(cap, '**z ≻ x ≻ y ≻ z**：又是一个循环。');
        await sleep(800);
        api.collect('l05-sen');
        await api.say(['尊重每个人对私事的决定权，和全体一致时听大家的，不能总是同时成立。',
          '一种出路：问题出在两人都爱管别人的闲事。若大家只对自己的私事有偏好，冲突就消失了。']);
        bar.replaceChildren();
        await api.quiz({
          q: '社会选择理论是博弈论的一个分支吗？',
          options: [
            { t: '是：阿罗定理就是一条博弈论定理', why: '通常不这样归类。社会选择理论起源于对投票的研究，经阿罗之手成为福利经济学的一部分。' },
            { t: '通常不算：它问**规范性**问题（怎样加总才合理），博弈论问**策略性**问题；两者是姊妹领域', ok: true,
              why: '交汇点是机制设计。**吉巴德–萨特斯韦特定理**：至少三个选项都可能胜出时，任何非独裁的投票规则都可被操纵，总有人能靠**不说真话**得利。' },
            { t: '两者毫不相干', why: '关系很密切：设计规则时，必须预见到人们会策略性地表达偏好。' },
          ],
        });
        await api.say(['每个人都能“感受”到公平，不等于集体能“算出”公平。',
          '下次听到“让 AI 对齐人类价值”，不妨问一句：哪一个“人类”？']);
        // the last scene keeps glowing behind the completion card; the engine cleans up on exit
      }

      /* ================================================= flow */
      (async () => {
        api.progress(0, N);
        if (api.replay) await api.say('又回到球场边了。箱子还在老地方。');
        else await api.say(['这座岛叫**凳子与选票**。上一面透镜说：自由就是自由，不是平等。',
          '那“平等”又是什么？先别急着回答，我们去球场边看看。']);
        await scene1(); api.progress(1, N);
        await scene2(); api.progress(2, N);
        await scene3(); api.progress(3, N);
        await scene4(); api.progress(4, N);
        api.complete({ summary: '“平等”是一组函数：**均等**、**公平**、**能力**各不相同；向下拉平帮不到任何人；自由会打乱模式；而把个人偏好加成集体偏好，三个选项起就**被证明**无法完美。' });
      })();
    },
  });
})();

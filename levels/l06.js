/* 透镜群岛 · 第 6 镜 · 否定之地（否定的力量）
 * 四个场景：减法 → 对当方阵 → 四句之轮 → 两个世界
 */
(function () {
  'use strict';

  const CARDS = [
    { id: 'l06-apophasis', title: '否定法', en: 'Apophasis · via negativa',
      body: 'apophasis 是希腊语，大意是“通过否定来言说、来得知”。否定神学说：人类的词汇配不上上帝，所以只说他**不是**什么，伪狄奥尼修斯的《神秘神学》是经典。普罗克洛斯爱用雕塑作比：雕像是一刀刀**削去**石料才显出形来的。“米开朗琪罗只是去掉不属于大卫的部分”，塔勒布自己也说是杜撰的段子。',
      ref: 'Pseudo-Dionysius, Mystical Theology；Taleb, Antifragile, Book VI “Via Negativa”, 2012' },
    { id: 'l06-falsify', title: '证伪的不对称', en: 'The asymmetry of falsification',
      body: '“天鹅都是白的”，见过一万只白天鹅也证明不了；只要见到一只真正的黑天鹅，它就被推翻了。这是波普尔科学哲学的核心：经验不能**证实**一个普遍理论，只能**证伪**它。塔勒布由此主张：我们对“什么行不通”的把握，比对“什么行得通”可靠，负向知识更**强韧**。',
      ref: 'Popper, The Logic of Scientific Discovery, 1959；Taleb, Antifragile, 2012' },
    { id: 'l06-duhemquine', title: '迪昂–奎因论题', en: 'The Duhem–Quine thesis',
      body: '假说从不单独受检验，而是和仪器、测量、背景理论这些**辅助假设**捆在一起受审（迪昂）。奎因更进一步：全部信念是一张网，一次与经验的冲突，原则上可以调整网上**任何**一处来消解。黑天鹅推翻的其实是一个合取。网上没有不可动的结点，就像纽拉特的水手，只能在海上一块块换船板。',
      ref: 'Duhem, 1906；Quine, “Two Dogmas of Empiricism”, 1951；Neurath, “Protokollsätze”, 1932' },
    { id: 'l06-square', title: '矛盾与反对', en: 'Contradictories vs. contraries',
      body: '对当方阵里，对角线是**矛盾**：必然一真一假；上边 A、E 是**反对**：不能同真，可以同假。“好人”与“坏人”也是反对：中间有不好不坏的人，所以“不是好人”推不出“是坏人”。“非黑即白”的谬误，正是把反对当成了矛盾；纠正它，并不触动只管 P 与非 P 的**排中律**。',
      ref: '亚里士多德传统逻辑的对当方阵（严格说来，“反对”要求 S 非空）' },
    { id: 'l06-catuskoti', title: '四句', en: 'Catuṣkoṭi · the four corners',
      body: '对一个命题 A 列出四种可能：是 A；非 A；亦是 A 亦非 A；非是 A 非非 A。佛陀面对“如来死后存在吗”这类问题，常把四句**全部**拒绝（无记），一种解释是问题的预设不成立。普利斯特用四值逻辑（真、假、两者皆是、两者皆非）对应四句，再为“不可言说”留出**第五角**；这种读法在佛学界有争议。',
      ref: '龙树《中论》；Garfield & Priest, 2003；Priest, The Fifth Corner of Four, 2018' },
    { id: 'l06-zhequan', title: '遮诠与表诠', en: 'Two kinds of negation',
      body: '印度逻辑分两种否定：**非定立否定**（prasajya）只否认，不肯定任何别的；**定立否定**（paryudāsa）否认 A 的同时，肯定某个“非 A 的东西”，如“请带一位非婆罗门来”。宗密：“如说盐，云不淡是遮，云咸是表。”他又说“但遮者未了，兼表者乃的”：只有否定是不完整的。',
      ref: '宗密《禅源诸诠集都序》' },
    { id: 'l06-negknow', title: '否定性知识的三个条件', en: 'When negations add up to knowledge',
      body: '一串“x 不是 Aᵢ”要构成实质知识，大致需要：一、**对照空间界定良好**；二、**每个否定都切掉空间的一部分**（“数字 7 不是绿色的”什么也没切掉）；三、**认识者知道这个空间是穷尽的**。三者都满足、只剩一个时，否定能**定位**对象（封闭世界）；否则只能**逼近**（开放世界）。',
      ref: 'Doyle, The Sign of Four, 1890；迈蒙尼德《迷途指津》第一部 58–60 章；Reiter, 1978' },
  ];

  const CSS = `
.l06-wrap{max-width:920px;margin:0 auto;padding-top:14px;display:grid;gap:12px}
.l06-scene{display:grid;gap:12px;animation:l06in .6s ease both}
@keyframes l06in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.l06-head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
.l06-kick{font-family:var(--f-mono);font-size:11px;letter-spacing:.2em;color:hsl(var(--hue) 70% 68%)}
.l06-title{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(22px,5.4vw,30px);line-height:1.15}
.l06-stage{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--line);
  background:radial-gradient(120% 80% at 50% -10%,hsl(var(--hue) 55% 15% / .55),transparent 62%),rgba(5,8,15,.6);box-shadow:inset 0 0 60px rgba(0,0,0,.45)}
.l06-cv{display:block;width:100%;min-height:280px;touch-action:manipulation;user-select:none;-webkit-user-select:none;cursor:pointer}
.l06-cv.grab{touch-action:none;cursor:crosshair}
.l06-note{margin:0;min-height:1.7em;text-align:center;font-family:var(--f-serif);font-size:14.5px;line-height:1.7;color:var(--dim);text-wrap:balance}
.l06-note b{color:hsl(var(--hue) 85% 72%);font-weight:600}
.l06-bar{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;scroll-margin-bottom:calc(var(--narr-h) + 20px)}
.l06-bar .btn{min-height:44px;scroll-margin-bottom:calc(var(--narr-h) + 20px)}
.l06-bar .btn:disabled{opacity:.45;cursor:default}
.l06-bar .btn[aria-pressed="true"]{border-color:hsl(var(--hue) 80% 62%);background:hsl(var(--hue) 80% 62% / .2)}
.l06-hold{user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;touch-action:none}
.l06-hold.on{background:hsl(var(--hue) 80% 62% / .32);box-shadow:0 0 26px hsl(var(--hue) 80% 62% / .5)}
.l06-verse{margin:0;text-align:center;font-family:var(--f-display);font-size:clamp(17px,4.4vw,22px);letter-spacing:.12em;line-height:1.8;color:hsl(var(--hue) 70% 80%);text-wrap:balance}
.l06-world{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;scroll-margin-bottom:calc(var(--narr-h) + 20px)}
.l06-world .lbl{width:100%;text-align:center;font-family:var(--f-mono);font-size:11px;letter-spacing:.14em;color:var(--dim)}
.l06-person{width:46px;height:58px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);cursor:pointer;display:grid;place-items:center;padding:0;transition:border-color .2s,background .2s,box-shadow .2s}
.l06-person svg{width:24px;height:36px;display:block}
.l06-person svg *{fill:none;stroke:rgba(168,188,228,.6);stroke-width:1.4}
.l06-person[aria-pressed="true"]{border-color:hsl(var(--hue) 80% 62% / .8);background:hsl(var(--hue) 80% 62% / .12);box-shadow:0 0 14px hsl(var(--hue) 80% 62% / .35)}
.l06-person[aria-pressed="true"] svg *{fill:hsl(var(--hue) 85% 62%);stroke:hsl(var(--hue) 90% 80%)}
.l06-sq{position:relative;width:100%;max-width:560px;margin:0 auto;height:clamp(280px,74vw,340px)}
.l06-sq svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.l06-sq line{stroke:rgba(168,188,228,.3);stroke-width:1.4;vector-effect:non-scaling-stroke;transition:stroke .3s,stroke-width .3s}
.l06-sq line.contra{stroke:hsl(var(--hue) 80% 62% / .7);stroke-width:2}
.l06-sq line.flash{stroke:hsl(var(--hue) 90% 78%);stroke-width:3}
.l06-sq line.side{stroke-dasharray:3 5}
.l06-sq.hot-top line.top,.l06-sq.hot-bot line.bot,.l06-sq.hot-dia line.dia{stroke:hsl(var(--hue) 90% 78%);stroke-width:3}
.l06-corner{position:absolute;width:42%;box-sizing:border-box;padding:8px 10px;border-radius:12px;border:1px solid var(--line);background:var(--panel-solid);display:grid;gap:2px;transition:border-color .3s,box-shadow .3s,background .3s}
.l06-corner.a{left:0;top:0}.l06-corner.e{right:0;top:0}.l06-corner.i{left:0;bottom:0}.l06-corner.o{right:0;bottom:0}
.l06-corner .k{font-family:var(--f-mono);font-size:12px;color:var(--dim);display:flex;justify-content:space-between;align-items:center}
.l06-corner .f{font-family:var(--f-serif);font-size:14px;line-height:1.35}
.l06-corner .x{font-size:12px;color:var(--faint);line-height:1.3}
.l06-tv{font-family:var(--f-mono);font-size:11px;padding:1px 8px;border-radius:999px;border:1px solid var(--line);color:var(--faint)}
.l06-corner.on{border-color:hsl(var(--hue) 80% 62% / .85);background:color-mix(in srgb,var(--panel-solid) 82%,hsl(var(--hue) 80% 50%));box-shadow:0 0 22px hsl(var(--hue) 80% 62% / .35)}
.l06-corner.on .l06-tv,.l06-stmt.on .l06-tv{color:#0A0E18;background:hsl(var(--hue) 85% 62%);border-color:transparent}
.l06-rel{position:absolute;transform:translate(-50%,-50%);font-family:var(--f-mono);font-size:10.5px;letter-spacing:.06em;color:var(--dim);background:rgba(5,8,15,.9);border:1px solid var(--line);border-radius:999px;padding:2px 8px;white-space:nowrap;pointer-events:none;transition:color .3s,border-color .3s}
.l06-rel.hot{color:hsl(var(--hue) 90% 80%);border-color:hsl(var(--hue) 80% 62% / .8)}
.l06-one{display:grid;gap:12px;justify-items:center;max-width:560px;margin:0 auto;width:100%}
.l06-one .fig svg{width:54px;height:80px;display:block}
.l06-one .fig svg *{stroke-width:1.4;transition:fill .3s,stroke .3s}
.l06-one .fig[data-s="good"] svg *{fill:hsl(var(--hue) 85% 62%);stroke:hsl(var(--hue) 90% 80%)}
.l06-one .fig[data-s="mid"] svg *{fill:rgba(255,246,228,.12);stroke:rgba(255,246,228,.85)}
.l06-one .fig[data-s="bad"] svg *{fill:#0A0E18;stroke:rgba(168,188,228,.55);stroke-dasharray:2 3}
.l06-stmts{display:grid;gap:6px;width:100%}
.l06-stmt{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 12px;border-radius:12px;border:1px solid var(--line);font-family:var(--f-serif);font-size:15px;transition:border-color .3s}
.l06-stmt.on{border-color:hsl(var(--hue) 80% 62% / .7)}
.l06-conds{list-style:none;margin:0 auto;padding:0;display:grid;gap:6px;max-width:560px;width:100%}
.l06-conds li{display:flex;gap:10px;align-items:center;padding:7px 12px;border-radius:12px;border:1px solid var(--line);font-family:var(--f-serif);font-size:14px;color:var(--faint);transition:color .4s,border-color .4s}
.l06-conds li i{width:10px;height:10px;border-radius:50%;flex:none;border:1px solid var(--line-strong);transition:background .4s,box-shadow .4s}
.l06-conds li.on{color:var(--text);border-color:hsl(var(--hue) 80% 62% / .5)}
.l06-conds li.on i{background:hsl(var(--hue) 85% 62%);border-color:transparent;box-shadow:0 0 10px hsl(var(--hue) 85% 62% / .8)}
`;

  const FIG = '<svg viewBox="0 0 24 36" aria-hidden="true"><circle cx="12" cy="7.5" r="5"/><path d="M4 34.5v-11a8 8 0 0 1 16 0v11z"/></svg>';

  Lens.registerLevel({
    id: 'l06', no: 6, name: '否定之地', subtitle: '否定的力量', continent: 'logic', steps: 4,
    blurb: '凿掉不是它的部分，等一只黑天鹅，转四句之轮，用“不是”找到答案。',
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
      const wrap = el('div', { class: 'l06-wrap' });
      root.append(wrap);

      /* ------------------------------------------------ helpers */
      const approach = (c, t, dt, k) => (api.reduced ? t : c + (t - c) * (1 - Math.exp(-(k || 8) * dt / 1000)));
      const btn = (label, cls, onclick) => el('button', { class: 'btn ' + (cls || ''), type: 'button', html: api.fmt(label), onclick });
      const note = (node, s) => { node.innerHTML = api.fmt(s || ''); };
      const local = (e, cv) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
      const fmtN = n => Math.round(n).toLocaleString('en-US');
      const sleep = ms => api.wait(api.reduced ? Math.min(ms, 120) : ms);
      const reveal = node => api.timeout(() => { try { node.scrollIntoView({ block: 'nearest', behavior: api.reduced ? 'auto' : 'smooth' }); } catch (_) { /* ignore */ } }, 80);
      const clicked = (bar, label, cls) => new Promise(res => { const b = btn(label, cls || 'hue', () => { b.disabled = true; res(b); }); bar.append(b); reveal(b); });

      function openScene(no, title) {
        wrap.replaceChildren();
        const node = el('section', { class: 'l06-scene' },
          el('div', { class: 'l06-head' }, el('span', { class: 'l06-kick', text: `SCENE ${no} / ${N}` }), el('h2', { class: 'l06-title', text: title })));
        wrap.append(node);
        root.scrollTop = 0;
        const stops = []; let ended = false;
        return {
          node,
          raf(fn) { if (ended) return () => {}; const c = api.raf(fn); stops.push(c); return c; },
          end() { ended = true; stops.splice(0).forEach(f => f()); },
        };
      }
      function stage(sc, height, draw, cls) {
        const box = el('div', { class: 'l06-stage' });
        sc.node.append(box);
        let kick = null, pend = false;
        const v = api.canvas(box, { class: 'l06-cv' + (cls ? ' ' + cls : ''), style: `height:${height}`, onResize: () => kick && kick() });
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
      function glow(ctx, x, y, r, c0, c1) { if (!(r > 0)) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill(); }
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
      function rr(ctx, x, y, w, h, r) {
        r = Math.max(0, Math.min(r, w / 2, h / 2));
        ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
      }
      // a press-and-hold button; bump() on each press / key, tick(seconds held) every 50 ms while held
      function holdButton(bar, label, bump, tick) {
        const hb = el('button', { class: 'btn hue l06-hold', type: 'button', text: label });
        bar.append(hb);
        let holding = false, h0 = 0;
        const release = () => { holding = false; hb.classList.remove('on'); };
        api.listen(hb, 'pointerdown', e => {
          if (hb.disabled) return;
          holding = true; h0 = performance.now(); hb.classList.add('on');
          try { hb.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
          bump();
        });
        api.listen(hb, 'pointerup', release); api.listen(hb, 'pointercancel', release); api.listen(hb, 'lostpointercapture', release);
        api.listen(hb, 'contextmenu', e => e.preventDefault());
        api.listen(hb, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!hb.disabled) bump(); } });
        const iv = api.interval(() => { if (holding && !hb.disabled) tick((performance.now() - h0) / 1000); }, 50);
        return { el: hb, stop() { release(); hb.disabled = true; clearInterval(iv); } };
      }

      /* ================================================= SCENE 1 · 减法 */
      function swanGlyph(ctx, x, y, s, dir, fill, stroke, refl) {
        const draw = sy => {
          ctx.beginPath();
          ctx.moveTo(x - 13 * s * dir, y - 2 * s * sy);
          ctx.quadraticCurveTo(x - 4 * s * dir, y + 7 * s * sy, x + 9 * s * dir, y + 1 * s * sy);
          ctx.quadraticCurveTo(x + 11 * s * dir, y - 2 * s * sy, x + 8 * s * dir, y - 5 * s * sy);
          ctx.quadraticCurveTo(x + 5 * s * dir, y - 9 * s * sy, x + 9 * s * dir, y - 16 * s * sy);
          ctx.quadraticCurveTo(x + 11 * s * dir, y - 21 * s * sy, x + 14 * s * dir, y - 18 * s * sy);
          ctx.lineTo(x + 17 * s * dir, y - 17 * s * sy);
          ctx.lineTo(x + 13.5 * s * dir, y - 16 * s * sy);
          ctx.quadraticCurveTo(x + 9.5 * s * dir, y - 14 * s * sy, x + 12 * s * dir, y - 6 * s * sy);
          ctx.quadraticCurveTo(x + 2 * s * dir, y - 9 * s * sy, x - 13 * s * dir, y - 2 * s * sy);
          ctx.closePath();
        };
        ctx.save();
        if (refl) { ctx.save(); ctx.globalAlpha = 0.16; draw(-1); ctx.fillStyle = fill; ctx.fill(); ctx.restore(); }
        draw(1); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke();
        ctx.restore();
      }
      async function scene1() {
        const sc = openScene(1, '减法');
        const COLS = 31, ROWS = 35, CX = 15, CY = 17, LA = 11.5, LB = 6.5, RR = (LA * LA + LB * LB) / (2 * LB), D = RR - LB, NC = COLS * ROWS;
        const shape = new Uint8Array(NC), alive = new Uint8Array(NC).fill(1), exp = new Uint8Array(NC), tint = new Float32Array(NC), vein = new Float32Array(NC);
        let nonShape = 0;
        for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
          const k = j * COLS + i, x = i - CX, y = j - CY;
          const lens = x * x + (y - D) * (y - D) <= RR * RR && x * x + (y + D) * (y + D) <= RR * RR;
          shape[k] = lens || y === 0 ? 1 : 0;
          if (!shape[k]) nonShape++;
          vein[k] = 0.5 + 0.5 * Math.sin(i * 0.33 + j * 0.11 + 2.2 * Math.sin(j * 0.17 + i * 0.05));
        }
        const st = { mode: 'marble', removed: 0, chisel: null, cur: null, parts: [], auto: false, queue: [], reveal: 0, revealT: 0, warned: false, lastSfx: 0, onDone: null,
          n: 0, black: 0, blackT: 0, crack: 0, crackT: 0, given: null, tried: new Set(), webA: 0 };
        const goal = goalKeeper();
        let G1 = null;
        const geo = (w, h) => { const cs = Math.max(4, Math.min((w - 28) / COLS, (h - 30) / ROWS)); return { cs, bx: (w - cs * COLS) / 2, by: (h - cs * ROWS) / 2 }; };

        function removeCell(k) {
          alive[k] = 0; st.removed++;
          const i = k % COLS, j = (k / COLS) | 0;
          [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([di, dj]) => {
            const ii = i + di, jj = j + dj;
            if (ii >= 0 && ii < COLS && jj >= 0 && jj < ROWS && shape[jj * COLS + ii]) exp[jj * COLS + ii] = 1;
          });
          if (!api.reduced && st.parts.length < 420) st.parts.push({ x: i + 0.5, y: j + 0.5, vx: (Math.random() - 0.5) * 0.008, vy: -Math.random() * 0.008, life: 1 });
        }
        function finishMarble() {
          if (st.revealT) return;
          st.revealT = 1; st.chisel = null; st.cur = null; api.sfx('refract'); v.kick();
          if (st.onDone) st.onDone();
        }
        function startAuto() {
          if (st.auto) return;
          st.auto = true;
          for (let k = 0; k < NC; k++) if (alive[k] && !shape[k]) st.queue.push(k);
          for (let k = st.queue.length - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); const t = st.queue[k]; st.queue[k] = st.queue[r]; st.queue[r] = t; }
          if (api.reduced || !st.queue.length) { st.queue.splice(0).forEach(k => removeCell(k)); finishMarble(); }
        }
        function strike(px, py) {
          if (!G1 || st.auto) return;
          const { cs, bx, by } = G1, r = 2.1, ci = (px - bx) / cs - 0.5, cj = (py - by) / cs - 0.5;
          let any = false, hit = false;
          for (let j = Math.max(0, Math.floor(cj - r)); j <= Math.min(ROWS - 1, Math.ceil(cj + r)); j++)
            for (let i = Math.max(0, Math.floor(ci - r)); i <= Math.min(COLS - 1, Math.ceil(ci + r)); i++) {
              if ((i - ci) * (i - ci) + (j - cj) * (j - cj) > r * r) continue;
              const k = j * COLS + i;
              if (!alive[k]) continue;
              if (shape[k]) { hit = true; if (!exp[k]) exp[k] = 1; continue; }
              removeCell(k); any = true;
            }
          const now = performance.now();
          if ((any || hit) && now - st.lastSfx > 75) { api.sfx(hit && !any ? 'select' : 'tick'); st.lastSfx = now; }
          if (hit && !st.warned) { st.warned = true; api.hint('凿不动的地方，就是**它**。绕着它凿。'); }
          note(cap, `已剔除 ${Math.round((100 * st.removed) / nonShape)}%`);
          if (st.removed / nonShape >= 0.86) startAuto();
          v.kick();
        }
        function stroke(a, b) {
          const L = Math.hypot(b.x - a.x, b.y - a.y), step = Math.max(2, (G1 ? G1.cs : 8) * 0.6), n = Math.max(1, Math.ceil(L / step));
          for (let s = 1; s <= n; s++) strike(a.x + ((b.x - a.x) * s) / n, a.y + ((b.y - a.y) * s) / n);
        }

        function drawMarble(ctx, w, h, T, dt) {
          G1 = geo(w, h);
          const { cs, bx, by } = G1, W = cs * COLS, Hh = cs * ROWS, s = cs * 0.84, off = (cs - s) / 2;
          st.reveal = approach(st.reveal, st.revealT, dt, 1.4);
          if (st.auto && st.queue.length) {
            const m = Math.max(6, Math.ceil(st.queue.length / 14));
            for (let q = 0; q < m && st.queue.length; q++) { const k = st.queue.pop(); if (alive[k]) removeCell(k); }
            if (!st.queue.length) finishMarble();
          }
          const lx = bx + (CX + 0.5) * cs, ly = by + (CY + 0.5) * cs;
          ctx.save(); ctx.globalCompositeOperation = 'lighter';
          glowC(ctx, lx, ly, Math.max(W, Hh) * 0.7, 45, 0.06 + 0.22 * st.reveal);
          ctx.restore();
          for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
            const k = j * COLS + i;
            if (!alive[k]) continue;
            let tt = 0;
            if (shape[k]) { tint[k] = approach(tint[k], exp[k] ? 1 : 0, dt, 3); tt = Math.max(tint[k] * 0.5, st.reveal); }
            const L = 50 + 18 * vein[k];
            ctx.fillStyle = tt > 0.02 ? api.hsl(api.hue, 12 + 70 * tt, L + 10 * tt, 0.5 + 0.45 * tt) : api.hsl(api.hue, 9, L, 0.42 + 0.2 * vein[k]);
            ctx.fillRect(bx + i * cs + off, by + j * cs + off, s, s);
          }
          if (st.reveal > 0.01) {
            const r = st.reveal, x0 = bx, x1 = bx + (CX - LA + 0.5) * cs, x2 = bx + (CX + LA + 0.5) * cs, x3 = bx + W;
            ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
            ctx.shadowBlur = 14; ctx.shadowColor = BEAM(1); ctx.strokeStyle = BEAM(0.85 * r); ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x0 - 20, ly); ctx.lineTo(x1, ly); ctx.stroke();
            ctx.shadowColor = C(62); ctx.strokeStyle = C(70, 0.95 * r);
            ctx.beginPath(); ctx.moveTo(x2, ly); ctx.lineTo(x3 + 20, ly); ctx.stroke();
            ctx.shadowBlur = 0;
            glowC(ctx, lx, ly, LA * cs * 1.3, 62, 0.28 * r);
            ctx.restore();
          }
          for (let p = st.parts.length - 1; p >= 0; p--) {
            const q = st.parts[p];
            q.vy += 0.000035 * dt; q.x += q.vx * dt; q.y += q.vy * dt; q.life -= dt / 1000;
            if (q.life <= 0 || q.y > ROWS + 6) { st.parts.splice(p, 1); continue; }
            ctx.fillStyle = api.hsl(api.hue, 10, 72, Math.max(0, q.life) * 0.6);
            ctx.fillRect(bx + q.x * cs - s * 0.3, by + q.y * cs - s * 0.3, s * 0.6, s * 0.6);
          }
          if (st.cur && !st.revealT) {
            ctx.strokeStyle = st.chisel ? C(80, 0.7) : 'rgba(255,246,228,.3)'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(st.cur.x, st.cur.y, 2.1 * cs, 0, 6.2832); ctx.stroke();
          }
        }
        // the lake of swans
        const swanPos = k => { const a = Math.sin(k * 12.9898) * 43758.5453, b = Math.sin(k * 78.233) * 12543.123; return { u: a - Math.floor(a), v: b - Math.floor(b), d: k % 3 ? 1 : -1 }; };
        function drawLake(ctx, w, h, T, dt) {
          st.black = approach(st.black, st.blackT, dt, 1.2);
          st.crack = approach(st.crack, st.crackT, dt, 6);
          const hz = h * 0.5;
          // plaque
          const broken = st.crack > 0.5;
          text(ctx, '所有天鹅都是白的', w / 2, 34, { size: Math.min(22, w / 15), font: 'disp', color: broken ? 'rgba(232,236,245,.4)' : '#E8ECF5', glow: broken ? null : C(62, 0.6) });
          if (st.crack > 0.02) {
            const tw = Math.min(22, w / 15) * 8.4, c = st.crack;
            ctx.save(); ctx.strokeStyle = C(80, c); ctx.lineWidth = 1.4; ctx.beginPath();
            ctx.moveTo(w / 2 - tw / 2 - 6, 30); ctx.lineTo(w / 2 - tw / 2 - 6 + (tw + 12) * c, 38);
            ctx.moveTo(w / 2 - 12, 18); ctx.lineTo(w / 2 - 4, 30); ctx.lineTo(w / 2 - 14, 40); ctx.lineTo(w / 2 - 6, 52); ctx.stroke(); ctx.restore();
          }
          const conf = st.n ? 1 - 1 / (1 + Math.log10(1 + st.n) * 0.9) : 0, mw = Math.min(260, w * 0.62), mx = (w - mw) / 2;
          ctx.fillStyle = 'rgba(168,188,228,.12)'; ctx.fillRect(mx, 58, mw, 3);
          ctx.fillStyle = broken ? 'rgba(168,188,228,.25)' : C(66, 0.9); ctx.fillRect(mx, 58, mw * (broken ? 0 : conf), 3);
          ctx.fillStyle = 'rgba(232,236,245,.6)'; ctx.fillRect(mx + mw - 1, 54, 1, 11);
          text(ctx, broken ? '被推翻' : st.n ? '证实？还没有' : '证实？', w / 2, 76, { size: 11, color: broken ? C(80) : 'rgba(162,173,196,.85)' });
          // water
          ctx.save(); ctx.globalCompositeOperation = 'lighter';
          const g = ctx.createLinearGradient(0, hz, 0, h); g.addColorStop(0, C(40, 0.12)); g.addColorStop(1, C(40, 0)); ctx.fillStyle = g; ctx.fillRect(0, hz, w, h - hz);
          ctx.strokeStyle = C(70, 0.35); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, hz); ctx.lineTo(w, hz); ctx.stroke();
          for (let k = 1; k < 7; k++) { const y = hz + (h - hz) * (k / 7) ** 1.4, a = 0.07 + 0.05 * Math.sin(T * 0.001 + k); ctx.strokeStyle = BEAM(Math.max(0, a)); ctx.beginPath(); ctx.moveTo(w * 0.08 + Math.sin(T * 0.0007 + k) * 12, y); ctx.lineTo(w * 0.92 + Math.sin(T * 0.0007 + k) * 12, y); ctx.stroke(); }
          ctx.restore();
          // distant dust: the swans you cannot draw
          const far = Math.min(160, Math.floor(Math.log10(1 + st.n) * 50));
          for (let k = 0; k < far; k++) { const p = swanPos(k + 500); dot(ctx, p.u * w, hz + 3 + p.v * 14, 0.9, BEAM(0.5)); }
          const shown = Math.min(st.n, 26);
          for (let k = 0; k < shown; k++) {
            const p = swanPos(k), y = hz + 26 + p.v * (h - hz - 46), sc2 = 0.55 + ((y - hz) / (h - hz)) * 0.75;
            const x = ((p.u * (w + 80) + T * 0.006 * p.d * sc2) % (w + 80) + w + 80) % (w + 80) - 40;
            swanGlyph(ctx, x, y, sc2, p.d, 'rgba(255,246,228,.92)', 'rgba(255,255,255,.95)', true);
          }
          if (st.black > 0.01) {
            const y = hz + (h - hz) * 0.62, x = w + 60 - (w * 0.5 + 60) * st.black;
            ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, x, y - 8, 46, 60, 0.35 * st.black); ctx.restore();
            ctx.save(); ctx.shadowColor = C(62); ctx.shadowBlur = 14;
            swanGlyph(ctx, x, y, 1.45, -1, '#04070D', C(78), false); ctx.restore();
          }
          text(ctx, fmtN(st.n), 16, hz - 26, { size: 26, align: 'left', weight: 500, color: '#E8ECF5' });
          text(ctx, '只白天鹅', 16, hz - 8, { size: 11, align: 'left', font: 'serif', color: 'rgba(162,173,196,.9)' });
        }
        // the web of belief
        const WEB = [
          { id: 'H', t: '天鹅都是白的', u: 0.5, v: 0.24 },
          { id: 'a', t: '我没看花眼', u: 0.2, v: 0.5 },
          { id: 'b', t: '天没有太黑', u: 0.8, v: 0.5 },
          { id: 'c', t: '那确实是天鹅', u: 0.5, v: 0.6 },
          { id: 'O', t: '看见一只黑天鹅', u: 0.5, v: 0.9, obs: true },
        ];
        const BG = [[0.08, 0.16], [0.28, 0.08], [0.72, 0.08], [0.92, 0.18], [0.06, 0.78], [0.94, 0.8], [0.3, 0.3], [0.7, 0.32], [0.18, 0.92], [0.82, 0.93]];
        const LINKS = [['H', 'a'], ['H', 'b'], ['H', 'c'], ['a', 'c'], ['b', 'c'], ['a', 'O'], ['b', 'O'], ['c', 'O']];
        const nodeById = id => WEB.find(n => n.id === id);
        function drawWeb(ctx, w, h, T, dt) {
          st.webA = approach(st.webA, 1, dt, 3);
          const P = n => ({ x: n.u * w, y: 26 + n.v * (h - 52) });
          ctx.save(); ctx.globalAlpha = st.webA;
          ctx.strokeStyle = 'rgba(168,188,228,.12)'; ctx.lineWidth = 1; ctx.beginPath();
          BG.forEach(([u, vv], k) => { const a = { x: u * w, y: 26 + vv * (h - 52) }, n = WEB[k % 4], b = P(n); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); });
          ctx.stroke();
          BG.forEach(([u, vv]) => dot(ctx, u * w, 26 + vv * (h - 52), 2.2, 'rgba(168,188,228,.35)'));
          const resolved = !!st.given;
          LINKS.forEach(([p, q]) => {
            const a = P(nodeById(p)), b = P(nodeById(q)), off = st.given === p || st.given === q;
            ctx.strokeStyle = off ? 'rgba(168,188,228,.1)' : q === 'O' && !resolved ? C(78, 0.55 + 0.3 * Math.sin(T * 0.008)) : C(66, 0.45);
            ctx.lineWidth = q === 'O' && !resolved ? 1.8 : 1.2;
            if (off) ctx.setLineDash([3, 5]); else ctx.setLineDash([]);
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          });
          ctx.setLineDash([]);
          WEB.forEach(n => {
            const p = P(n), off = st.given === n.id;
            if (n.obs) {
              ctx.save(); ctx.globalCompositeOperation = 'lighter';
              glowC(ctx, p.x, p.y, 34, 70, resolved ? 0.2 : 0.35 + 0.25 * Math.sin(T * 0.01)); ctx.restore();
            } else if (!off) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, p.x, p.y, 26, 62, 0.25); ctx.restore(); }
            ctx.fillStyle = off ? 'rgba(10,16,30,1)' : n.obs ? '#04070D' : C(62); ctx.strokeStyle = off ? 'rgba(168,188,228,.35)' : C(84); ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, 6.2832); ctx.fill(); ctx.stroke();
            text(ctx, n.t, p.x, p.y + (n.obs ? -18 : 20), { size: 13, font: 'serif', color: off ? 'rgba(162,173,196,.45)' : '#E8ECF5' });
            if (off) { const tw = n.t.length * 13; ctx.strokeStyle = C(80, 0.8); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(p.x - tw / 2 - 2, p.y + 20); ctx.lineTo(p.x + tw / 2 + 2, p.y + 20); ctx.stroke(); }
          });
          ctx.restore();
        }
        function draw(ctx, w, h, t, dt) {
          const T = api.reduced ? 0 : t;
          ctx.clearRect(0, 0, w, h);
          if (st.mode === 'marble') drawMarble(ctx, w, h, T, dt);
          else if (st.mode === 'lake') drawLake(ctx, w, h, T, dt);
          else drawWeb(ctx, w, h, T, dt);
        }

        const v = stage(sc, 'min(56vh,460px)', draw, 'grab');
        const cap = el('p', { class: 'l06-note' });
        const bar = el('div', { class: 'l06-bar' });
        sc.node.append(cap, bar);
        const cv = v.canvas;
        api.listen(cv, 'pointerdown', e => {
          if (st.mode !== 'marble' || st.revealT) return;
          e.preventDefault();
          try { cv.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
          const p = local(e, cv); st.chisel = { id: e.pointerId, last: p }; st.cur = p; strike(p.x, p.y);
        });
        api.listen(cv, 'pointermove', e => {
          if (st.mode !== 'marble' || st.revealT) return;
          const p = local(e, cv); st.cur = p;
          if (st.chisel && e.pointerId === st.chisel.id) { stroke(st.chisel.last, p); if (st.chisel) st.chisel.last = p; }
          v.kick();
        });
        const lift = e => { if (st.chisel && (!e || e.pointerId === st.chisel.id)) st.chisel = null; if (e && e.pointerType === 'touch') st.cur = null; v.kick(); };
        api.listen(cv, 'pointerup', lift); api.listen(cv, 'pointercancel', lift);
        api.listen(cv, 'pointerleave', () => { if (!st.chisel) { st.cur = null; v.kick(); } });

        // 1. the chisel
        const marbleDone = new Promise(res => { st.onDone = res; });
        note(cap, '已剔除 0%');
        api.hint('这块石头里藏着一样东西。我不说它**是**什么，你只管凿掉**不是**它的部分。按住拖动。');
        api.timeout(() => {
          if (st.revealT || st.auto) return;
          const help = btn('替我凿一行', '', () => {
            if (st.revealT || st.auto || !G1) { help.disabled = true; return; }
            const rows = [];
            for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) { const k = j * COLS + i; if (alive[k] && !shape[k]) { rows.push(j); break; } }
            if (!rows.length) return;
            const { cs, bx, by } = G1, y = by + (rows[Math.floor(Math.random() * rows.length)] + 0.5) * cs;
            stroke({ x: bx - cs, y }, { x: bx + (COLS + 1) * cs, y });
          });
          bar.append(help);
        }, 20000);
        await marbleDone;
        bar.replaceChildren();
        await sleep(1600);
        note(cap, '一面透镜。白光从左边进来，带着颜色出去。');
        await api.say(['你没有“画”出它，只是去掉了不是它的部分。',
          '这叫**否定法**（apophasis）：希腊语，大意是“通过否定来言说、来得知”。']);
        api.collect('l06-apophasis');
        await api.say(['否定神学说：人的词汇配不上上帝，所以只说他**不是**什么。伪狄奥尼修斯的《神秘神学》是经典。',
          '普罗克洛斯爱用雕塑作比：雕像是一刀刀**削去**石料，才显出形来的。',
          '“米开朗琪罗只是去掉了不属于大卫的部分”？塔勒布自己也说，那是杜撰的段子。']);

        // 2. the swans
        await api.say('塔勒布的认识论，核心是一种**不对称**。我们去湖边。');
        st.mode = 'lake'; cv.classList.remove('grab'); note(cap, ''); v.kick();
        let hold = null;
        const addSwans = n => {
          if (st.n >= 1000) return;
          st.n = Math.min(1000, st.n + Math.max(1, Math.round(n)));
          const now = performance.now(); if (now - st.lastSfx > 90) { api.sfx('tick'); st.lastSfx = now; }
          note(cap, st.n < 1000 ? `观察了 ${fmtN(st.n)} 只，全是白的。` : '一千只，全是白的。');
          v.kick(); goal.check();
        };
        hold = holdButton(bar, '按住：继续观察', () => addSwans(st.n * 0.5 + 1), () => addSwans(st.n * 0.12 + 1));
        reveal(bar);
        api.hint('假说：“所有天鹅都是白的”。**按住**按钮，一只一只地观察。');
        await goal.wait(() => st.n >= 1000);
        hold.stop(); bar.replaceChildren();
        await api.say('一千只，全是白的。可它说的是**所有**天鹅。下一只呢？');
        await clicked(bar, '再看一只');
        bar.replaceChildren();
        st.blackT = 1; api.sfx('whoosh'); v.kick();
        await sleep(1700);
        st.crackT = 1; api.sfx('bad'); v.kick();
        note(cap, '一只**黑天鹅**。');
        await sleep(700);
        api.collect('l06-falsify');
        await api.say(['一千只白天鹅证实不了它；一只真正的黑天鹅，就能推翻它。',
          '这是波普尔科学哲学的核心：经验不能**证实**普遍理论，只能**证伪**它。',
          '塔勒布说：我们对“什么行不通”的把握，远比对“什么行得通”可靠。']);

        // 3. the web
        await api.say('等一等。你确定，那真是一只黑天鹅吗？');
        st.mode = 'web'; note(cap, '冲突出现在网的边缘。'); v.kick();
        let webOpen = true;
        const giveBtns = [];
        const giveUp = (n, b) => {
          if (!webOpen) return;
          st.given = n.id; st.tried.add(n.id); api.sfx('select'); v.kick();
          giveBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          note(cap, `放弃「${n.t}」，冲突也消解了。` + (n.id === 'H' ? '这是波普尔式的读法。' : ''));
          goal.check();
        };
        WEB.filter(n => !n.obs).forEach(n => {
          const b = btn(`放弃「${n.t}」`, '', () => giveUp(n, b));
          b.setAttribute('aria-pressed', 'false'); bar.append(b); giveBtns.push(b);
        });
        api.listen(cv, 'pointerdown', e => {
          if (st.mode !== 'web') return;
          const p = local(e, cv);
          const k = WEB.findIndex(n => !n.obs && Math.hypot(n.u * v.w - p.x, 26 + n.v * (v.h - 52) - p.y) < 30);
          if (k >= 0) giveUp(WEB[k], giveBtns[k]);
        });
        reveal(bar);
        api.hint('冲突来了，刀该落在哪里？点一个信念，放弃它。多试几个。');
        await goal.wait(() => st.tried.size >= 2);
        await sleep(600);
        webOpen = false; giveBtns.forEach(b => (b.disabled = true));
        await api.say(['放弃哪一个，冲突都能消解。黑天鹅推翻的，其实是一个合取：天鹅都是白的，**并且**我没看错，**并且**……',
          '迪昂说：假说从不单独受审，总和仪器、测量、背景理论捆在一起。',
          '奎因更进一步：信念是一张网，原则上可以调整网上**任何**一处。']);
        api.collect('l06-duhemquine');
        await api.say(['这叫**迪昂–奎因论题**。否定依然比肯定有力，只是刀落在哪里，需要判断。',
          '网上没有不可动的结点。纽拉特说：我们像水手，只能在海上一块一块地换船板。']);
        sc.end();
      }

      /* ================================================= SCENE 2 · 对当方阵 */
      async function scene2() {
        const sc = openScene(2, '对当方阵');
        const goal = goalKeeper();
        const world = [true, true, true, true, true, true];
        const kinds = new Set();
        let locked = true;
        const wl = el('div', { class: 'l06-world' }, el('div', { class: 'lbl', text: 'S = 这六个人 · P = 好人' }));
        const people = world.map((g, i) => {
          const b = el('button', { class: 'l06-person', type: 'button', 'aria-pressed': 'true', 'aria-label': `第 ${i + 1} 个人：好人`, html: FIG, onclick: () => flip(i) });
          wl.append(b); return b;
        });
        const sq = el('div', { class: 'l06-sq' });
        sq.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
          '<line class="side" x1="21" y1="18" x2="21" y2="82"/><line class="side" x1="79" y1="18" x2="79" y2="82"/>' +
          '<line class="top" x1="21" y1="18" x2="79" y2="18"/><line class="bot" x1="21" y1="82" x2="79" y2="82"/>' +
          '<line class="dia contra" x1="21" y1="18" x2="79" y2="82"/><line class="dia contra" x1="79" y1="18" x2="21" y2="82"/></svg>';
        const CORN = [
          { k: 'A', cls: 'a', f: '所有 S 都是 P', x: '人人都是好人', test: w => w.every(Boolean) },
          { k: 'E', cls: 'e', f: '所有 S 都不是 P', x: '没有一个人是好人', test: w => w.every(g => !g) },
          { k: 'I', cls: 'i', f: '有的 S 是 P', x: '有人是好人', test: w => w.some(Boolean) },
          { k: 'O', cls: 'o', f: '有的 S 不是 P', x: '有人不是好人', test: w => w.some(g => !g) },
        ];
        const corners = CORN.map(c => {
          const tv = el('span', { class: 'l06-tv', text: '假' });
          const card = el('div', { class: 'l06-corner ' + c.cls }, el('div', { class: 'k' }, el('span', { text: c.k }), tv), el('div', { class: 'f', text: c.f }), el('div', { class: 'x', text: c.x }));
          sq.append(card); return { card, tv, c };
        });
        const rel = (x, y, t) => { const n = el('div', { class: 'l06-rel', style: `left:${x}%;top:${y}%`, text: t }); sq.append(n); return n; };
        const rTop = rel(50, 18, '反对'), rBot = rel(50, 82, '下反对'), rDia = rel(50, 50, '矛盾');
        rel(21, 50, '差等'); rel(79, 50, '差等');
        const cap = el('p', { class: 'l06-note' });
        const seen = el('p', { class: 'l06-note', style: 'font-family:var(--f-mono);font-size:12px' });
        sc.node.append(wl, sq, cap, seen);
        const KIND = [['all', '人人都好'], ['mixed', '有好有不好'], ['none', '没有好人']];
        function update() {
          const [A, E, I, O] = corners.map(({ card, tv, c }) => { const v = c.test(world); card.classList.toggle('on', v); tv.textContent = v ? '真' : '假'; return v; });
          sq.classList.toggle('hot-top', !A && !E); rTop.classList.toggle('hot', !A && !E);
          sq.classList.toggle('hot-bot', I && O); rBot.classList.toggle('hot', I && O);
          const kind = A ? 'all' : E ? 'none' : 'mixed';
          kinds.add(kind);
          note(cap, kind === 'mixed' ? 'A、E **同时为假**；I、O 同时为真。两条对角线：仍然各自一真一假。'
            : kind === 'all' ? '人人都好：A、I 为真，E、O 为假。' : '没有一个好人：E、O 为真，A、I 为假。');
          seen.textContent = '试过的世界：' + KIND.map(([k, t]) => (kinds.has(k) ? '● ' : '○ ') + t).join('　');
          goal.check();
        }
        function flip(i) {
          if (locked) return;
          world[i] = !world[i];
          people[i].setAttribute('aria-pressed', String(world[i]));
          people[i].setAttribute('aria-label', `第 ${i + 1} 个人：${world[i] ? '好人' : '不是好人'}`);
          api.sfx(world[i] ? 'select' : 'tick'); update();
        }
        update();
        await api.say('亚里士多德传统里有一张方阵，专门摆放“不”字的几种用法。');
        locked = false;
        api.hint('点人物，切换他是不是好人。试出三种世界：人人都好、有好有不好、没有一个好人。');
        await goal.wait(() => kinds.size === 3);
        locked = true; api.sfx('ok');
        sq.classList.add('hot-dia'); rDia.classList.add('hot');
        await api.say(['对角线上的两个角，永远一亮一灭：这是**矛盾**，必然一真一假。',
          '上边的 A 和 E 从没同时亮过，却可以同时灭：这是**反对**。下边的 I 和 O 正好相反。',
          '**排中律**只管一个命题和它**自己的**否定，也就是这两条对角线。']);

        // one person, three states
        wl.remove(); sq.remove(); seen.remove(); note(cap, '');
        await api.say('现在把镜头推近，只看一个人。不过这一回，世上还有**坏人**。');
        const STATES = [['good', '好人'], ['mid', '不好不坏'], ['bad', '坏人']];
        const STM = [['他是好人', s => s === 'good'], ['他不是好人', s => s !== 'good'], ['他是坏人', s => s === 'bad']];
        let cur = 'good';
        const fig = el('div', { class: 'fig', 'data-s': 'good', html: FIG });
        const segBar = el('div', { class: 'l06-bar' });
        const segs = STATES.map(([k, t]) => { const b = btn(t, '', () => setS(k, true)); segBar.append(b); return b; });
        const stmts = STM.map(([t]) => { const tv = el('span', { class: 'l06-tv' }); return { row: el('div', { class: 'l06-stmt' }, el('span', { text: t }), tv), tv }; });
        const one = el('div', { class: 'l06-one' }, fig, segBar, el('div', { class: 'l06-stmts' }, stmts.map(s => s.row)));
        cap.before(one);
        function setS(k, user) {
          if (locked && user) return;
          cur = k; fig.setAttribute('data-s', k);
          segs.forEach((b, j) => b.setAttribute('aria-pressed', String(STATES[j][0] === k)));
          STM.forEach(([, f], j) => { const v = f(k); stmts[j].row.classList.toggle('on', v); stmts[j].tv.textContent = v ? '真' : '假'; });
          if (user) {
            api.sfx('select');
            note(cap, k === 'good' ? '他是好人：第一句真，后两句假。'
              : k === 'bad' ? '“他不是好人”为真，“他是坏人”也为真。还有没有别的位置？'
                : '“他不是好人”为**真**，“他是坏人”为**假**。');
          }
          goal.check();
        }
        setS('good', false);
        locked = false;
        reveal(one);
        api.hint('让“他**不是**好人”为真，同时让“他**是坏人**”为假。');
        await goal.wait(() => cur === 'mid');
        locked = true; segs.forEach(b => (b.disabled = true)); api.sfx('ok');
        api.collect('l06-square');
        await api.say(['“不是好人”不等于“坏人”。好人与坏人是**反对**：中间可以有第三者。',
          '把反对当成矛盾，就是“非黑即白”的谬误。纠正它，丝毫不触动排中律。']);
        await api.quiz({
          q: '对这位不好不坏的人，“他是好人，或者他不是好人”成立吗？',
          options: [
            { t: '成立：一个命题和它自己的否定，至少一个为真', ok: true, why: '“他不是好人”为真，排中律安然无恙。出错的只是把“不是好人”误当成了“坏人”。' },
            { t: '不成立：他既不是好人，也不是坏人', why: '那是“好人 / 坏人”这对**反对**词项，中间本来就有第三者。排中律只管 P 与非 P。' },
            { t: '说不准，要看他以后做什么', why: '句子的意义确定时，此刻它就成立：两半之中，“他不是好人”为真。' },
          ],
        });
        sc.end();
      }

      /* ================================================= SCENE 3 · 四句之轮 */
      function figure(ctx, x, y, s, fill, stroke, a) {
        if (a <= 0.01) return;
        ctx.save(); ctx.globalAlpha = Math.min(1, a); ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(x, y - 30 * s, 9 * s, 0, 6.2832); ctx.fill(); ctx.stroke();
        rr(ctx, x - 13 * s, y - 18 * s, 26 * s, 46 * s, 12 * s); ctx.fill(); ctx.stroke();
        ctx.restore();
      }
      async function scene3() {
        const sc = openScene(3, '四句之轮');
        const goal = goalKeeper();
        const SEC = [
          { t: '是', q: ['存在'], v: '真', s: '如来死后存在', verse: '一切实' },
          { t: '非', q: ['不存在'], v: '假', s: '如来死后不存在', verse: '非实' },
          { t: '亦是亦非', q: ['既存在', '又不存在'], v: '两者皆是', s: '如来死后既存在又不存在', verse: '亦实亦非实' },
          { t: '非是非非', q: ['既非存在', '也非不存在'], v: '两者皆非', s: '如来死后既非存在也非不存在', verse: '非实非非实' },
        ];
        const ANG = [-90, 0, 90, 180];
        const st = { mode: 'wuji', sec: [0, 0, 0, 0], flash: [0, 0, 0, 0], wuji: false, presup: 0, presupT: 0, crack: 0, crackT: 0, dim: 0, dimT: 0, fifth: 0, fifthT: 0, hub: false,
          f1: 1, f1T: 1, f2: 0, f2T: 0, negMode: '', zhe: 0, zheT: 0, biao: 0, biaoT: 0 };
        const geoW = (w, h) => { const R = Math.min(w * 0.4, h * 0.4); return { cx: w / 2, cy: h * 0.5, R, r0: R * 0.36 }; };

        function drawWheel(ctx, w, h, T, dt) {
          const { cx, cy, R, r0 } = geoW(w, h), verse = st.mode === 'verse';
          ctx.save(); ctx.globalAlpha = 1 - 0.65 * st.dim;
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, cx, cy, R * 1.5, 40, 0.1 + 0.15 * st.fifth); ctx.restore();
          if (st.presup > 0.01) {
            const segs = 18;
            for (let k = 0; k < segs; k++) {
              const a0 = (k / segs) * 6.2832, a1 = a0 + (6.2832 / segs) * 0.8, drift = st.crack * (10 + (k % 3) * 9);
              const am = (a0 + a1) / 2, ox = Math.cos(am) * drift, oy = Math.sin(am) * drift;
              ctx.strokeStyle = BEAM(0.6 * st.presup * (1 - st.crack)); ctx.lineWidth = 2;
              ctx.beginPath(); ctx.arc(cx + ox, cy + oy, R * 1.1, a0, a1); ctx.stroke();
            }
            text(ctx, '预设：有一个恒常的“我”', cx, Math.min(h - 12, cy + R * 1.1 + 16), { size: 12.5, font: 'serif', color: BEAM(0.85 * st.presup * (1 - st.crack)) });
          }
          SEC.forEach((s, k) => {
            st.flash[k] = approach(st.flash[k], 0, dt, 2.2);
            const state = st.sec[k], f = st.flash[k];
            const a0 = ((ANG[k] - 45) * Math.PI) / 180 + 0.03, a1 = ((ANG[k] + 45) * Math.PI) / 180 - 0.03;
            ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.arc(cx, cy, r0 + 3, a1, a0, true); ctx.closePath();
            ctx.fillStyle = state === 2 ? C(38, 0.5 + 0.3 * f) : state === 1 ? `rgba(8,12,22,${0.92 - 0.3 * f})` : C(30, 0.16 + 0.4 * f);
            ctx.strokeStyle = state === 1 ? 'rgba(168,188,228,.25)' : C(70, 0.75 + 0.25 * f); ctx.lineWidth = 1.2;
            ctx.fill(); ctx.stroke();
            if (state === 2) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.shadowColor = C(62); ctx.shadowBlur = 18; ctx.stroke(); ctx.restore(); }
            const am = (ANG[k] * Math.PI) / 180, rm = (R + r0) / 2, lx = cx + Math.cos(am) * rm, ly = cy + Math.sin(am) * rm;
            const lines = verse ? [state === 2 ? s.v : ''] : s.q, top = ly - 6 - lines.length * 7;
            const dimText = state === 1 ? 'rgba(162,173,196,.4)' : '#E8ECF5';
            text(ctx, s.t, lx, top, { size: Math.min(20, R * 0.15), font: 'disp', color: dimText, glow: state === 2 ? C(62) : null });
            lines.forEach((ln, i) => text(ctx, ln, lx, top + 19 + i * 14, { size: verse ? 11.5 : 11.5, font: verse ? 'mono' : 'serif', color: verse ? C(86) : state === 1 ? 'rgba(162,173,196,.35)' : 'rgba(200,210,230,.85)' }));
            if (state === 1) { ctx.strokeStyle = C(80, 0.55); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(lx - 26, top + 22 + lines.length * 6); ctx.lineTo(lx + 26, top - 10); ctx.stroke(); }
          });
          // hub
          ctx.fillStyle = 'rgba(6,10,18,1)'; ctx.strokeStyle = C(70, 0.7); ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(cx, cy, r0, 0, 6.2832); ctx.fill(); ctx.stroke();
          if (verse) {
            if (st.fifth > 0.01) {
              const pulse = api.reduced ? 1 : 0.8 + 0.2 * Math.sin(T * 0.004);
              ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowW(ctx, cx, cy, r0 * (st.hub ? 1.6 : 1) * pulse, 0.55 * st.fifth); ctx.restore();
              dot(ctx, cx, cy, 3.5, BEAM(st.fifth));
              text(ctx, '第五角', cx, cy + r0 * 0.5, { size: 12, font: 'serif', color: BEAM(0.9 * st.fifth) });
            } else text(ctx, '四句', cx, cy, { size: 16, font: 'disp', color: C(84) });
          } else if (st.wuji) text(ctx, '无记', cx, cy, { size: 22, font: 'disp', color: C(88), glow: C(62) });
          else { text(ctx, '如来死后', cx, cy - 9, { size: 12.5, font: 'serif' }); text(ctx, '存在吗？', cx, cy + 9, { size: 12.5, font: 'serif' }); }
          ctx.restore();
        }
        function drawNeg(ctx, w, h, T, dt) {
          st.f1 = approach(st.f1, st.f1T, dt, 2.2); st.f2 = approach(st.f2, st.f2T, dt, 2.2);
          const cx = w / 2, cy = h * 0.56, s = Math.min(1.6, h / 220);
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, cx, cy - 10 * s, 90 * s, 50, 0.15 * Math.max(st.f1, st.f2)); ctx.restore();
          figure(ctx, cx, cy, s, C(55, 0.85), C(84), st.f1);
          if (st.f1 < 0.98 && st.f1 > 0.02 && !api.reduced) {
            for (let k = 0; k < 28; k++) { const a = k * 2.4, d = (1 - st.f1) * (30 + (k % 5) * 14) * s; dot(ctx, cx + Math.cos(a) * d, cy - 10 * s + Math.sin(a) * d, 1.4, C(80, st.f1)); }
          }
          figure(ctx, cx, cy + 4 * s, s * 0.9, 'rgba(255,246,228,.16)', 'rgba(255,246,228,.9)', st.f2);
          text(ctx, '婆罗门', cx, cy + 48 * s, { size: 13, font: 'serif', color: C(86, st.f1) });
          if (st.f2 > 0.05) text(ctx, '一位非婆罗门', cx, cy + 48 * s, { size: 13, font: 'serif', color: BEAM(st.f2) });
          if (st.negMode === 'pra' && st.f1 < 0.3) text(ctx, '（什么也没有肯定）', cx, cy - 4, { size: 12.5, font: 'serif', color: 'rgba(162,173,196,.8)' });
        }
        function drawSalt(ctx, w, h, T, dt) {
          st.zhe = approach(st.zhe, st.zheT, dt, 3); st.biao = approach(st.biao, st.biaoT, dt, 3);
          const cx = w / 2, R = Math.min(w * 0.36, h * 0.42), cy = h * 0.72;
          // salt crystal
          const ks = Math.min(22, R * 0.2), ky = cy - R * 0.45;
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowW(ctx, cx, ky, ks * 3, 0.18); ctx.restore();
          ctx.strokeStyle = BEAM(0.9); ctx.lineWidth = 1.2; ctx.beginPath();
          ctx.moveTo(cx, ky - ks); ctx.lineTo(cx + ks * 0.87, ky - ks / 2); ctx.lineTo(cx + ks * 0.87, ky + ks / 2); ctx.lineTo(cx, ky + ks); ctx.lineTo(cx - ks * 0.87, ky + ks / 2); ctx.lineTo(cx - ks * 0.87, ky - ks / 2); ctx.closePath();
          ctx.moveTo(cx, ky); ctx.lineTo(cx, ky + ks); ctx.moveTo(cx, ky); ctx.lineTo(cx + ks * 0.87, ky - ks / 2); ctx.moveTo(cx, ky); ctx.lineTo(cx - ks * 0.87, ky - ks / 2); ctx.stroke();
          text(ctx, '盐的味道', cx, cy - R - 16 < 14 ? 14 : cy - R - 16, { size: 12, font: 'serif', color: 'rgba(162,173,196,.85)' });
          // the taste arc: 淡 (left) … 咸 (right)
          ctx.lineCap = 'round';
          ctx.strokeStyle = C(60, 0.35); ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, 2 * Math.PI); ctx.stroke();
          if (st.zhe > 0.01) {
            ctx.strokeStyle = `rgba(6,10,18,${0.9 * st.zhe})`; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, Math.PI * (1 + 0.5 * st.zhe)); ctx.stroke();
            ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = C(70, 0.5 * st.zhe); ctx.lineWidth = 6; ctx.shadowColor = C(62); ctx.shadowBlur = 12;
            ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI * 1.5, Math.PI * 2); ctx.stroke(); ctx.restore();
            text(ctx, '遮：不淡', cx - R * 0.72, cy - R * 0.72 - 14, { size: 12, font: 'serif', color: C(84, st.zhe) });
          }
          if (st.biao > 0.01) {
            const a = Math.PI * (1 + st.biao), x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
            ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, x, y, 26, 75, 0.7 * st.biao); ctx.restore();
            dot(ctx, x, y, 5, C(90, st.biao));
            text(ctx, '表：咸', cx + R * 0.72, cy - R * 0.72 - 14, { size: 12, font: 'serif', color: C(88, st.biao) });
          }
          text(ctx, '淡', cx - R, cy + 18, { size: 15, font: 'serif', color: st.zhe > 0.5 ? 'rgba(162,173,196,.4)' : '#E8ECF5' });
          text(ctx, '咸', cx + R, cy + 18, { size: 15, font: 'serif', color: '#E8ECF5' });
        }
        function draw(ctx, w, h, t, dt) {
          const T = api.reduced ? 0 : t;
          st.presup = approach(st.presup, st.presupT, dt, 3); st.crack = approach(st.crack, st.crackT, dt, 2);
          st.dim = approach(st.dim, st.dimT, dt, 2); st.fifth = approach(st.fifth, st.fifthT, dt, 2);
          ctx.clearRect(0, 0, w, h);
          if (st.mode === 'wuji' || st.mode === 'verse') drawWheel(ctx, w, h, T, dt);
          else if (st.mode === 'neg') drawNeg(ctx, w, h, T, dt);
          else drawSalt(ctx, w, h, T, dt);
        }

        const v = stage(sc, 'min(52vh,420px)', draw);
        const verseEl = el('p', { class: 'l06-verse' });
        const cap = el('p', { class: 'l06-note' });
        const bar = el('div', { class: 'l06-bar' });
        sc.node.append(verseEl, cap, bar);
        let busy = false;
        const secBtns = SEC.map((s, k) => { const b = btn(s.t, '', () => pick(k)); bar.append(b); return b; });
        function pick(k) {
          if (busy) return;
          if (st.mode === 'wuji') {
            if (st.sec[k] === 1) return;
            st.sec[k] = 1; st.flash[k] = 1; secBtns[k].disabled = true; api.sfx('tick');
            note(cap, `“${SEC[k].s}”？不取这一句。`);
          } else if (st.mode === 'verse') {
            if (st.sec[k] === 2) return;
            st.sec[k] = 2; st.flash[k] = 1; secBtns[k].disabled = true; api.sfx('select');
            note(cap, `${SEC[k].t}：“${SEC[k].verse}” → **${SEC[k].v}**`);
          } else return;
          v.kick(); goal.check();
        }
        api.listen(v.canvas, 'pointerdown', e => {
          if (st.mode !== 'wuji' && st.mode !== 'verse') return;
          const p = local(e, v.canvas), { cx, cy, R, r0 } = geoW(v.w, v.h), d = Math.hypot(p.x - cx, p.y - cy);
          if (d < r0) { if (st.mode === 'verse' && st.fifthT && !st.hub) tapHub(); return; }
          if (d > R * 1.05) return;
          const a = (Math.atan2(p.y - cy, p.x - cx) * 180) / Math.PI;
          pick(a > -135 && a <= -45 ? 0 : a > -45 && a <= 45 ? 1 : a > 45 && a <= 135 ? 2 : 3);
        });
        let hubBtn = null;
        function tapHub() { if (st.hub) return; st.hub = true; if (hubBtn) hubBtn.disabled = true; api.sfx('chime'); v.kick(); goal.check(); }

        // 1. 无记
        await api.say('往东走。印度思想对一个命题列出**四种**可能，叫“四句”。');
        reveal(bar);
        api.hint('轮子中心是一个古老的问题。点四个扇区，一句一句地回答它。');
        await goal.wait(() => st.sec.every(x => x === 1));
        st.wuji = true; api.sfx('chime'); v.kick();
        note(cap, '四句都不取：**无记**。');
        await api.say(['佛陀面对这类问题，常常把四句**全部**拒绝。汉传佛教称之为“无记”。',
          '一种常见的解释：问题预设了一个恒常的“我”，而这个预设不成立。']);
        bar.replaceChildren();
        await clicked(bar, '看看问题底下');
        st.presupT = 1; api.sfx('open'); v.kick();
        note(cap, '四句共用同一个预设。');
        await sleep(700);
        bar.replaceChildren();
        await clicked(bar, '拒绝这个预设');
        bar.replaceChildren();
        st.crackT = 1; st.dimT = 1; api.sfx('whoosh'); v.kick();
        note(cap, '预设碎了，问题也就不必回答。');
        await sleep(900);
        await api.say('拒绝的不是哪一句，而是问题的预设。就像被问“当今的法国国王是秃子吗？”');

        // 2. 龙树 and the fifth corner
        st.mode = 'verse'; st.sec = [0, 0, 0, 0]; st.dimT = 0; st.presupT = 0; st.crackT = 0; st.crack = 0; st.presup = 0; v.kick();
        note(cap, '');
        await api.say('龙树《中论》里却有一偈，看上去把四句**全部**肯定了。');
        verseEl.textContent = '一切实非实，亦实亦非实，非实非非实，是名诸佛法。';
        secBtns.forEach(b => { b.disabled = false; bar.append(b); });
        reveal(bar);
        api.hint('点亮四个扇区，看四句在四值逻辑里对应什么。');
        await goal.wait(() => st.sec.every(x => x === 2));
        st.fifthT = 1; api.sfx('open'); v.kick();
        hubBtn = btn('第五角', 'hue', tapHub); bar.append(hubBtn); reveal(hubBtn);
        api.hint('轮子中心还有一点光。点它。');
        await goal.wait(() => st.hub);
        api.collect('l06-catuskoti');
        await api.say(['普利斯特和加菲尔德认为，龙树在“思想的边界”上发现了**真的矛盾**。',
          '普利斯特后来用四值逻辑对应四句：真、假、两者皆是、两者皆非；再为“不可言说”留出**第五角**。',
          '这种读法在佛学界也有争议。但它至少说明，“亦是亦非”“非是非非”在形式逻辑里有清晰的对应物。']);

        // 3. two kinds of "not"
        verseEl.textContent = ''; bar.replaceChildren();
        st.mode = 'neg'; v.kick();
        await api.say('连“不”字本身，也有两种。');
        const tried = new Set();
        const negBtns = [
          ['pra', '只否认（非定立否定）', '“他**不是**婆罗门”：只取消一个断言，不暗示他是什么。'],
          ['par', '否认并另立（定立否定）', '“请带一位**非**婆罗门来”：你总得带来一个别的种姓的人。'],
        ].map(([k, t, m]) => {
          const b = btn(t, '', () => {
            if (busy) return;
            st.negMode = k; st.f1 = 1; st.f1T = 0; st.f2 = 0; st.f2T = k === 'par' ? 1 : 0;
            negBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
            tried.add(k); api.sfx(k === 'par' ? 'select' : 'whoosh'); note(cap, m); v.kick(); goal.check();
          });
          b.setAttribute('aria-pressed', 'false'); bar.append(b); return b;
        });
        reveal(bar);
        api.hint('“婆罗门”前面加一个“不”。两种读法都试试。');
        await goal.wait(() => tried.size === 2);
        await sleep(1300);
        negBtns.forEach(b => (b.disabled = true));
        await api.say(['只否认、不肯定别的，叫**非定立否定**；否认 A 又肯定某个非 A，叫**定立否定**。',
          '中观学派强调，“诸法无自性”是第一种：否认了自性，并不另立一种更深的实体。']);

        // 4. 遮 and 表
        bar.replaceChildren(); st.mode = 'salt'; note(cap, ''); v.kick();
        await api.say('汉传佛教有一对几乎一样的概念：**遮诠**与**表诠**。唐代宗密用盐来讲。');
        const saltTried = new Set();
        [['zhe', '遮：说它“不淡”'], ['biao', '表：说它“咸”']].forEach(([k, t]) => {
          const b = btn(t, '', () => {
            if (k === 'zhe') st.zheT = 1; else st.biaoT = 1;
            saltTried.add(k); b.disabled = true; api.sfx('select'); v.kick();
            note(cap, k === 'zhe' ? '“遮”是排除它不是的：去掉“淡”。' : '“表”是显示它所是的：直接指向“咸”。');
            goal.check();
          });
          bar.append(b);
        });
        reveal(bar);
        api.hint('说一说盐的味道。“遮”和“表”都试试。');
        await goal.wait(() => saltTried.size === 2);
        await sleep(1100);
        note(cap, '“如说盐，云不淡是遮，云咸是表；说水，云不干是遮，云湿是表。”');
        api.collect('l06-zhequan');
        await api.say(['宗密还说：“但遮者未了，兼表者乃的。”只有否定是不完整的，兼有肯定才中的。',
          '留意：在这里，“不淡”几乎就等于“咸”。为什么？下一站揭晓。']);
        sc.end();
      }

      /* ================================================= SCENE 4 · 两个世界 */
      function glyph(ctx, g, x, y, r, col) {
        const base = g % 12, rot = g >= 12 ? g * 0.9 : 0;
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        const poly = (n, a0, rr2) => { ctx.beginPath(); for (let k = 0; k <= n; k++) { const a = a0 + (k / n) * 6.2832; const px = Math.cos(a) * (rr2 || r), py = Math.sin(a) * (rr2 || r); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); };
        ctx.beginPath();
        switch (base) {
          case 0: ctx.arc(0, 0, r * 0.85, 0, 6.2832); ctx.stroke(); break;
          case 1: poly(3, -Math.PI / 2); break;
          case 2: poly(4, Math.PI / 4); break;
          case 3: poly(4, 0); break;
          case 4: poly(6, 0); break;
          case 5: { ctx.beginPath(); for (let k = 0; k <= 10; k++) { const a = -Math.PI / 2 + (k / 10) * 6.2832, rr3 = k % 2 ? r * 0.42 : r; k ? ctx.lineTo(Math.cos(a) * rr3, Math.sin(a) * rr3) : ctx.moveTo(Math.cos(a) * rr3, Math.sin(a) * rr3); } ctx.stroke(); break; }
          case 6: ctx.arc(0, 0, r * 0.85, 0.5, 5.8); ctx.arc(r * 0.35, 0, r * 0.62, 5.2, 1.1, true); ctx.closePath(); ctx.stroke(); break;
          case 7: ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.stroke(); break;
          case 8: for (let k = 0; k <= 20; k++) { const px = -r + (k / 20) * 2 * r, py = Math.sin((k / 20) * 6.2832) * r * 0.45; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); break;
          case 9: for (let k = 0; k <= 40; k++) { const a = k * 0.42, rr4 = (k / 40) * r; k ? ctx.lineTo(Math.cos(a) * rr4, Math.sin(a) * rr4) : ctx.moveTo(0, 0); } ctx.stroke(); break;
          case 10: { const a = r, b = r * 0.45, R2 = (a * a + b * b) / (2 * b), d = R2 - b, h2 = Math.asin(a / R2); ctx.arc(0, d, R2, -Math.PI / 2 - h2, -Math.PI / 2 + h2); ctx.arc(0, -d, R2, Math.PI / 2 - h2, Math.PI / 2 + h2); ctx.closePath(); ctx.stroke(); break; }
          default: ctx.arc(0, 0, r * 0.85, 0, 6.2832); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, r * 0.18, 0, 6.2832); ctx.fillStyle = col; ctx.fill();
        }
        ctx.restore();
      }
      async function scene4() {
        const sc = openScene(4, '两个世界');
        const goal = goalKeeper();
        const st = { open: false, frame: 1, frameT: 1, fog: 0, fogT: 0, cards: [], asked: 0, elim: 0, winner: -1, win: 0, winT: 0, serial: 12 };
        const reset = () => { st.cards = Array.from({ length: 12 }, (_, i) => ({ g: i, out: 0, outT: 0, inA: 1, inT: 1 })); st.winner = -1; st.win = 0; st.winT = 0; };
        reset();
        const geo = (w, h) => {
          const W = Math.min(w - 40, 470), gap = 8, cw = (W - 3 * gap) / 4, ch = Math.min(cw * 1.3, (h - 76 - 2 * gap) / 3);
          const gw = 4 * cw + 3 * gap, gh = 3 * ch + 2 * gap;
          return { cw, ch, gap, x0: (w - gw) / 2, y0: (h - gh) / 2 + 10, gw, gh };
        };
        const cellXY = (g, k) => ({ x: g.x0 + (k % 4) * (g.cw + g.gap), y: g.y0 + Math.floor(k / 4) * (g.ch + g.gap) });
        function draw(ctx, w, h, t, dt) {
          const T = api.reduced ? 0 : t, g = geo(w, h);
          st.frame = approach(st.frame, st.frameT, dt, 2.5); st.fog = approach(st.fog, st.fogT, dt, 1.5); st.win = approach(st.win, st.winT, dt, 2.5);
          ctx.clearRect(0, 0, w, h);
          // fog and ghost cards beyond the table
          if (st.fog > 0.01) {
            for (let k = 0; k < 14; k++) {
              const side = k % 4, f = (k * 0.37) % 1, drift = api.reduced ? 0 : Math.sin(T * 0.0004 + k) * 10;
              let x, y;
              if (side === 0) { x = g.x0 - g.cw - g.gap * 2 + drift; y = g.y0 + f * g.gh; }
              else if (side === 1) { x = g.x0 + g.gw + g.gap * 2 + drift; y = g.y0 + f * g.gh; }
              else if (side === 2) { x = g.x0 + f * g.gw; y = g.y0 - g.ch - g.gap * 2 + drift; }
              else { x = g.x0 + f * g.gw; y = g.y0 + g.gh + g.gap * 2 + drift; }
              ctx.strokeStyle = BEAM(0.12 * st.fog); ctx.lineWidth = 1; rr(ctx, x, y - g.ch / 2, g.cw, g.ch, 8); ctx.stroke();
            }
            const fg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
            fg.addColorStop(0, 'rgba(5,8,15,0)'); fg.addColorStop(1, `rgba(5,8,15,${0.9 * st.fog})`);
            ctx.fillStyle = fg; ctx.fillRect(0, 0, w, h);
            for (let k = 0; k < 5; k++) {
              const fx = w * (0.5 + 0.5 * Math.sin(T * 0.00013 * (k + 1) + k * 2)), fy = h * (k % 2 ? 0.08 : 0.92);
              glow(ctx, fx, fy, Math.max(w, h) * 0.35, `rgba(170,190,220,${0.07 * st.fog})`, 'rgba(170,190,220,0)');
            }
          }
          // the frame: a well-defined, exhaustive contrast space
          if (st.frame > 0.01) {
            ctx.strokeStyle = C(72, 0.75 * st.frame); ctx.lineWidth = 1.5;
            rr(ctx, g.x0 - 10, g.y0 - 10, g.gw + 20, g.gh + 20, 14); ctx.stroke();
            text(ctx, 'Ω：这十二张，已知穷尽', w / 2, g.y0 - 24, { size: 11, color: C(80, st.frame) });
          }
          if (st.fog > 0.5) text(ctx, 'Ω：？', w / 2, g.y0 - 24, { size: 11, color: BEAM(0.7 * st.fog) });
          st.cards.forEach((c, k) => {
            c.out = approach(c.out, c.outT, dt, 5); c.inA = approach(c.inA, c.inT, dt, 1.6);
            const p = cellXY(g, k), win = st.winner === k, flip = Math.abs(Math.cos(c.out * Math.PI)), back = c.out > 0.5;
            const cx = p.x + g.cw / 2, cy = p.y + g.ch / 2, wv = g.cw * Math.max(0.04, flip);
            ctx.save(); ctx.globalAlpha = c.inA * (back ? 0.55 : 1);
            if (win) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; glowC(ctx, cx, cy, g.cw * 1.4, 62, 0.55 * st.win); ctx.restore(); }
            ctx.fillStyle = back ? 'rgba(8,12,22,.9)' : win ? C(30, 0.9, 60) : 'rgba(16,26,47,.9)';
            ctx.strokeStyle = back ? 'rgba(168,188,228,.2)' : win ? C(85) : C(66, 0.55); ctx.lineWidth = win ? 2 : 1.2;
            rr(ctx, cx - wv / 2, p.y, wv, g.ch, 8); ctx.fill(); ctx.stroke();
            if (!back && flip > 0.2) {
              ctx.save(); ctx.translate(cx, cy); ctx.scale(flip, 1);
              glyph(ctx, c.g, 0, 0, Math.min(g.cw, g.ch) * 0.26, win ? C(92) : C(76, 0.9));
              ctx.restore();
            } else if (back && flip > 0.2) text(ctx, '不是', cx, cy, { size: 12, font: 'serif', color: 'rgba(162,173,196,.6)' });
            ctx.restore();
          });
          if (st.winner >= 0 && st.win > 0.3) { const p = cellXY(g, st.winner); text(ctx, '就是它', p.x + g.cw / 2, p.y + g.ch + 12, { size: 12, font: 'serif', color: C(88, st.win) }); }
        }
        const v = stage(sc, 'min(50vh,400px)', draw);
        const cap = el('p', { class: 'l06-note' });
        const conds = el('ul', { class: 'l06-conds' });
        const COND = ['对照空间界定良好', '每个否定都切掉空间的一部分', '认识者知道这个空间是穷尽的'];
        const condLi = COND.map((t, i) => { const li = el('li', null, el('i'), el('span', { text: `${i + 1}. ${t}` })); conds.append(li); return li; });
        const bar = el('div', { class: 'l06-bar' });
        sc.node.append(cap, bar);
        const remaining = () => st.cards.filter(c => !c.outT).length;
        api.listen(v.canvas, 'pointerdown', e => {
          const p = local(e, v.canvas), g = geo(v.w, v.h);
          const k = st.cards.findIndex((c, i) => { const q = cellXY(g, i); return p.x >= q.x - 3 && p.x <= q.x + g.cw + 3 && p.y >= q.y - 3 && p.y <= q.y + g.ch + 3; });
          if (k < 0 || st.cards[k].outT || st.winner >= 0 || !st.armed) return;
          if (!st.open && remaining() <= 1) return;
          st.cards[k].outT = 1; st.asked++; api.sfx('tick');
          if (!st.open) {
            const left = remaining();
            note(cap, left > 1 ? `“它不是这张吗？”——不是。还剩 ${left} 张。` : '只剩最后一张。');
            if (left === 1) { st.winner = st.cards.findIndex(c => !c.outT); st.winT = 1; api.sfx('chime'); }
          } else {
            st.elim++;
            note(cap, `排除了 ${st.elim} 张。可雾里还有……`);
            const slot = st.cards[k];
            api.timeout(() => { st.serial += 1; slot.g = 12 + ((st.serial * 7) % 97); slot.out = 0; slot.outT = 0; slot.inA = 0; slot.inT = 1; v.kick(); }, api.reduced ? 200 : 1100);
          }
          v.kick(); goal.check();
        });

        // 1. closed world
        await api.say('最后一站。十二张牌里藏着一个答案，你只能问：“它**不是**这张吗？”');
        st.armed = true;
        api.hint('点一张牌，排除它。一直排除到只剩一张。');
        await goal.wait(() => st.winner >= 0);
        st.armed = false;
        await sleep(1000);
        note(cap, `问了 ${st.asked} 次“不是”，答案就被定位了。`);
        await api.say(['《四签名》里福尔摩斯的名言，大意是：排除了一切不可能，剩下的再不可思议，也必定是真相。',
          '这能成立，是因为你**知道**答案一定在这十二张里。']);
        cap.after(conds);
        for (let i = 0; i < 3; i++) { await sleep(350); condLi[i].classList.add('on'); api.sfx('tick'); }
        await api.say('好的问题还能一次切掉一半：二十个“是 / 否”，足以在约一百万种可能里锁定一个。');

        // 2. open world
        await clicked(bar, '撤掉边框');
        bar.replaceChildren();
        st.open = true; st.frameT = 0; st.fogT = 1; reset(); condLi[2].classList.remove('on'); api.sfx('whoosh'); v.kick();
        note(cap, 'Ω 的边不见了。');
        st.armed = true;
        api.hint('再来一次。不过这一回，牌桌没有边。');
        await goal.wait(() => st.elim >= 6);
        st.armed = false;
        await sleep(1300);
        await api.say(['开放世界里，排除再多，也不能断定答案就在剩下的牌里。',
          '这是否定神学的处境。迈蒙尼德的“第十个人”，一连串否定之后，也只是**几乎**得到了船的概念。']);
        await api.quiz({
          q: '“数字 7 不是绿色的”为真，却没让你多知道什么。它缺了哪个条件？',
          options: [
            { t: '对照空间界定良好', why: '“数”的空间是清楚的。问题不在这里。' },
            { t: '每个否定都切掉空间的一部分', ok: true, why: '数本来就没有颜色。这个否定为真，却没有在“数”的空间里切掉任何东西。' },
            { t: '认识者知道这个空间是穷尽的', why: '就算空间穷尽，这一刀也什么都没切掉。' },
          ],
        });
        api.collect('l06-negknow');
        await api.say(['三个条件都满足、只剩一个时，否定能**定位**对象；缺了第三个，就只能**逼近**。',
          '宗密的“不淡”几乎就等于“咸”，正因为“盐的味道”这个对照空间本来就很小。',
          '否定之所以强韧，和它之所以“瘦”，是同一件事。要从“稳”走到“全”，迟早需要一点“表”。',
          '最后一个注脚：兰道尔证明，擦除 1 比特信息至少要放出 kT ln 2 的热。遗忘不是免费的。',
          '这条“丢弃的热力学”，第十面透镜会再遇到。']);
        // the last scene keeps glowing behind the completion card; the engine cleans up on exit
      }

      /* ================================================= flow */
      (async () => {
        api.progress(0, N);
        if (api.replay) await api.say('又回到否定之地。凿子还在老地方。');
        else await api.say(['这里是**否定之地**。规矩很简单：只许说“不是”。', '看看光靠一个“不”字，能走多远。']);
        await scene1(); api.progress(1, N);
        await scene2(); api.progress(2, N);
        await scene3(); api.progress(3, N);
        await scene4(); api.progress(4, N);
        api.complete({ summary: '雕塑、黑天鹅、方阵、四句、排除法：“不”字能**定位**，也能**逼近**。否定性认识要成为知识，需要一个界定良好、被一刀刀切开、且已知穷尽的对照空间。' });
      })();
    },
  });
})();

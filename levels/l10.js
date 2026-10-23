/* 透镜群岛 · 第 10 镜「两个妖」：心灵、观察与信息
 * 四幕：麦克斯韦妖（分拣与兰道尔账本）→ 整合信息（回路与展开）→ 观察不需要心灵（双缝与退相干）→ 拉普拉斯妖与阿莱夫。
 */
(function () {
  'use strict';

  const FM = '"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace';
  const FS = '"Noto Sans SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei",system-ui,sans-serif';
  const FSERIF = '"Noto Serif SC","Songti SC","STSong",serif';
  const TAU = Math.PI * 2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const COLF = 24, COLS = 202; // 快分子（暖）与慢分子（冷）的色相

  const CARDS = [
    { id: 'l10-maxwell', title: '麦克斯韦妖', en: "Maxwell's demon",
      body: '1867 年，麦克斯韦在信里设想：气体被隔板分成两半，隔板上有一扇无摩擦的小门，门边守着一个能看清每个分子速度的“小东西”，只放快分子往右、慢分子往左。久而久之右边变热、左边变冷，熵减少了，它却没做任何功，**第二定律**似乎被打破。开尔文给它起名“妖”。这个谜持续了一百多年。',
      ref: 'Maxwell, Theory of Heat, 1871' },
    { id: 'l10-landauer', title: '兰道尔原理', en: "Landauer's principle",
      body: '**逻辑上不可逆**的操作，比如不管原来是 0 还是 1 都把比特重置为 0，必然向环境放热：擦除 1 比特，至少放出 **k_B T ln 2**。室温 300 开时约 2.9×10⁻²¹ 焦。2012 年，贝吕等人用激光双势阱里的一颗小珠做成 1 比特记忆：擦除越慢，放热越接近这个极限，但不会低于它。它是原则上的地板。',
      ref: 'Landauer 1961；Bérut et al., Nature, 2012' },
    { id: 'l10-bennett', title: '遗忘才要付费', en: 'Erasure, not measurement, pays',
      body: '布里渊（1951）认为妖的代价在**测量**：要看见分子就得用光照它。本内特（1982）指出，测量原则上可以可逆地进行，没有最低能耗；真正逃不掉的是**擦除**：妖要循环工作就得清空记忆，放出的热正好抵消它赚到的。观察可以免费，遗忘才要付费，第二定律得救。（厄尔曼与诺顿认为这类论证有循环之嫌，哲学界争论未完全平息。）',
      ref: 'Bennett 1982；Earman & Norton 1998' },
    { id: 'l10-iit', title: '整合信息理论', en: 'Integrated Information Theory (IIT)',
      body: '托诺尼（2004）提出：意识与系统内部“不可切分”的因果整合有关，用 **Φ** 衡量：找到系统最薄弱的那道缝，切开后损失越少，Φ 越低。推论之一：**前馈网络 Φ = 0**，而任何有反馈的网络都能展开成输入输出相同的前馈网络。2023 年，124 位研究者的公开信称其为“伪科学”，也引来强烈反弹。它严肃，但远未被证实。',
      ref: 'Tononi 2004；Tononi & Koch 2015；Fleming et al. 2023' },
    { id: 'l10-hard', title: '意识的困难问题', en: 'The hard problem of consciousness',
      body: '查尔默斯（1995）：区分刺激、整合信息、报告状态是“**容易问题**”，找到机制就行；**困难问题**是，为什么这些处理会伴随主观体验？内格尔更早问过：成为一只蝙蝠是什么样子？**泛心论**的回答是：经验也许从一开始就在，只是极其简单。它最大的难题叫**组合问题**：许多小经验，怎样合成你此刻统一的体验？',
      ref: 'Chalmers 1995；Nagel 1974；SEP “Panpsychism”' },
    { id: 'l10-decoherence', title: '退相干', en: 'Decoherence',
      body: '量子力学里的“测量”，指一个系统与另一个系统发生了足以留下记录的**物理相互作用**：一个光子、一个分子就够，不需要意识。“走哪条缝”的信息一旦泄漏到环境里，干涉就消失，这就是**退相干**。它解释了干涉为何消失，但单靠它还不能回答“为什么只出现一个结果”。“意识导致坍缩”是冯·诺依曼、维格纳等人提出过的诠释，今天属于少数派。',
      ref: 'Zurek, Rev. Mod. Phys., 2003' },
    { id: 'l10-laplace', title: '拉普拉斯妖与阿莱夫', en: "Laplace's demon & the Aleph",
      body: '拉普拉斯（1814）设想一个“智者”：知道推动自然的一切力和一切物体的位置，未来与过去都像现在一样呈现在它眼前。博尔赫斯的《阿莱夫》是一个包含宇宙一切地点的小球。埃金顿认为，认知需要认知者与对象之间的**距离**；与世界重合、同时看见一切的存在者**无法选择**，因为选择需要“此刻”与“稍后”。这是哲学论证，相容论者会有不同回答。',
      ref: 'Laplace 1814；Borges, “El Aleph”, 1945；Egginton, The Rigor of Angels, 2023' },
  ];

  const CSS = `
.l10-wrap{max-width:920px;margin:0 auto;padding-top:14px;display:grid;gap:12px}
.l10-wrap [hidden]{display:none!important}
.l10-in{animation:l10-in .6s ease both}
@keyframes l10-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.l10-head{display:grid;gap:2px}
.l10-kick{font:500 11px/1.4 var(--f-mono);letter-spacing:.22em;color:hsl(var(--hue) 70% 76%)}
.l10-title{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(26px,6vw,36px);line-height:1.12;letter-spacing:.04em}
.l10-sub{margin:0;font-family:var(--f-serif);font-size:14px;color:var(--dim)}
.l10-stage{position:relative;border-radius:18px;border:1px solid var(--line);overflow:hidden;
  background:radial-gradient(120% 90% at 50% 0%,hsl(var(--hue) 55% 16% / .55),rgba(5,8,15,.35) 62%,rgba(5,8,15,.65))}
.l10-ctrls{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.l10-ctrls .btn{min-height:44px}
.l10-ctrls .btn[aria-pressed="true"]{border-color:hsl(var(--hue) 85% 70%);background:hsl(var(--hue) 80% 62% / .26);color:var(--text)}
.l10-ctrls .btn[disabled]{opacity:.4;cursor:default}
.l10-hold{touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;min-width:132px}
.l10-read{font:13px/1.65 var(--f-mono);color:var(--dim);display:flex;flex-wrap:wrap;gap:2px 16px;min-height:1.65em}
.l10-read b{color:hsl(var(--hue) 85% 80%);font-weight:500}
.l10-ledger{display:grid;gap:10px;padding:12px 14px;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.025)}
.l10-ledger h4{margin:0;font:500 11px/1.4 var(--f-mono);letter-spacing:.18em;color:var(--faint)}
.l10-lab{font:12.5px/1.55 var(--f-sans);color:var(--dim);display:flex;justify-content:space-between;gap:4px 12px;flex-wrap:wrap}
.l10-lab b{font:500 12.5px var(--f-mono);color:var(--text)}
.l10-bar{height:8px;border-radius:4px;background:rgba(255,255,255,.06);display:flex;overflow:hidden;margin-top:4px}
.l10-bar i{display:block;height:100%;transition:width .4s}
.l10-bar .cool{background:hsl(${COLS} 85% 62%)}
.l10-bar .heat{background:hsl(${COLF} 92% 62%)}
.l10-bar .memo{background:hsl(var(--hue) 85% 70%)}
.l10-verdict{font:14px/1.6 var(--f-serif);color:var(--text)}
.l10-note{font-family:var(--f-serif);font-size:14.5px;line-height:1.7;color:var(--dim);margin:0;min-height:1.7em}
.l10-note b{color:var(--text);font-weight:600}
`;

  Lens.registerLevel({
    id: 'l10', no: 10, name: '两个妖', subtitle: '心灵、观察与信息', continent: 'phys', steps: 4,
    blurb: '当一回麦克斯韦妖，拨动网的回路，在缝边放一个分子，再借拉普拉斯妖的眼睛看一眼。',
    cards: CARDS,
    mount(root, api) {
      const H = api.hue, R = api.reduced;
      api.css(CSS);
      const wrap = api.el('div', { class: 'l10-wrap' });
      root.append(wrap);
      let cur = null;

      /* ------------------------------------------------ helpers */
      function scene(no, title, sub) {
        if (cur) cur.end();
        wrap.replaceChildren();
        const s = { fns: [] };
        s.add = f => { s.fns.push(f); };
        s.end = () => { for (const f of s.fns.splice(0)) { try { f(); } catch (e) { /* ignore */ } } };
        s.raf = fn => { s.add(api.raf(fn)); };
        s.head = api.el('div', { class: 'l10-head l10-in' },
          api.el('div', { class: 'l10-kick', text: `0${no} / 04` }),
          api.el('h2', { class: 'l10-title', text: title }),
          sub ? api.el('p', { class: 'l10-sub', text: sub }) : null);
        s.stage = api.el('div', { class: 'l10-stage l10-in' });
        s.ctrls = api.el('div', { class: 'l10-ctrls l10-in' });
        wrap.append(s.head, s.stage, s.ctrls);
        root.scrollTop = 0;
        cur = s;
        return s;
      }
      function until(cond) {
        return new Promise(res => {
          if (cond()) { res(); return; }
          api.raf(() => { if (cond()) { res(); return false; } return true; });
        });
      }
      function btn(text, cls, fn) {
        const b = api.el('button', { class: 'btn ' + (cls || ''), type: 'button', text });
        if (fn) api.listen(b, 'click', fn);
        return b;
      }
      function holdButton(b, on, off) { // 按住生效：鼠标、触摸、键盘
        api.listen(b, 'pointerdown', e => { e.preventDefault(); on(); try { b.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } });
        api.listen(b, 'pointerup', off); api.listen(b, 'pointercancel', off); api.listen(b, 'lostpointercapture', off);
        api.listen(b, 'keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); on(); } });
        api.listen(b, 'keyup', e => { if (e.key === ' ' || e.key === 'Enter') off(); });
        api.listen(b, 'blur', off);
        api.listen(b, 'contextmenu', e => e.preventDefault());
      }
      function pointer(el, h) {
        let pid = null;
        const pos = e => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
        api.listen(el, 'pointerdown', e => {
          if (pid !== null) return;
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          pid = e.pointerId;
          if (h.down && h.down(pos(e), e) === false) { pid = null; return; }
          try { el.setPointerCapture(pid); } catch (err) { /* ignore */ }
        });
        api.listen(el, 'pointermove', e => { if (e.pointerId === pid && h.move) h.move(pos(e), e); });
        const end = e => { if (e.pointerId !== pid) return; pid = null; if (h.up) h.up(pos(e), e); };
        api.listen(el, 'pointerup', end);
        api.listen(el, 'pointercancel', end);
      }
      function halo(ctx, x, y, r, h, s, l, a) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, api.hsl(h, s, l, a)); g.addColorStop(1, api.hsl(h, s, l, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      }
      function dot(ctx, x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
      function line(ctx, a, b) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }

      /* ================================================ 幕一 · 麦克斯韦妖 */
      async function sceneDemon() {
        const s = scene(1, '麦克斯韦妖', '一盒气体，中间一扇无摩擦的小门。门边守着的，是你。');
        const N = 40, MEM = 6, GOAL = 150, G0 = 0.34, G1 = 0.66, SP = R ? 0.6 : 1;
        const st = { hold: false, auto: false, open: false, mols: [], mem: [], measured: 0, erased: 0, locked: false, erasedOnce: false,
          TL: 300, TR: 300, dT: 0, nL: 0, nR: 0, sparks: [], gateFx: 0, gateOk: true, gateAng: 0, maxwell: false, rd: 0 };
        // 速度取二维麦克斯韦（瑞利）分布；按速度排名，上半是“快”，下半是“慢”；两室各分一半，初始温度相同
        const speeds = [];
        for (let i = 0; i < N; i++) { const u = Math.random() || 1e-6; speeds.push(clamp(0.36 * Math.sqrt(-2 * Math.log(u)), 0.12, 1.25)); }
        speeds.sort((a, b) => a - b);
        speeds.forEach((sp, i) => {
          const left = i % 4 === 0 || i % 4 === 3, a = Math.random() * TAU;
          st.mols.push({ x: (left ? 0.06 : 1.06) + Math.random() * 0.88, y: 0.06 + Math.random() * 0.88, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, s: sp, fast: i >= N / 2, fx: 0 });
        });
        const cv = api.canvas(s.stage, { style: 'display:block;width:100%;height:clamp(320px,52vh,480px);touch-action:none;cursor:pointer;user-select:none;-webkit-user-select:none' });
        const bHold = btn('按住开门', 'hue l10-hold', null);
        const bErase = btn('擦除记忆', '', erase);
        const bAuto = btn('让妖自己来', '', () => { st.auto = !st.auto; bAuto.setAttribute('aria-pressed', st.auto ? 'true' : 'false'); api.sfx('select'); });
        bErase.hidden = true; bAuto.hidden = true;
        s.ctrls.append(bHold, bErase, bAuto);
        holdButton(bHold, () => { st.hold = true; }, () => { st.hold = false; });
        pointer(cv.canvas, { down() { st.hold = true; return true; }, up() { st.hold = false; } });
        api.listen(cv.canvas, 'contextmenu', e => e.preventDefault());
        const read = api.el('div', { class: 'l10-read l10-in' });
        const lg = {};
        const ledger = api.el('div', { class: 'l10-ledger l10-in' },
          api.el('h4', { text: '妖 的 账 本' }),
          api.el('div', null, lg.l1 = api.el('div', { class: 'l10-lab' }), api.el('div', { class: 'l10-bar' }, lg.b1 = api.el('i', { class: 'cool' }))),
          api.el('div', null, lg.l2 = api.el('div', { class: 'l10-lab' }), api.el('div', { class: 'l10-bar' }, lg.b2 = api.el('i', { class: 'heat' }), lg.b3 = api.el('i', { class: 'memo' }))),
          lg.v = api.el('div', { class: 'l10-verdict' }));
        ledger.hidden = true;
        wrap.append(read, ledger);

        function updLedger() {
          const n = st.measured, m = st.erased, k = st.mem.length, max = Math.max(24, n);
          lg.l1.innerHTML = `<span>分拣：气体熵最多减少</span><b>${n} × k ln 2</b>`;
          lg.l2.innerHTML = `<span>擦除放入环境 + 记忆里还存着</span><b>${m} + ${k} = ${m + k} 比特</b>`;
          lg.b1.style.width = (n / max * 100) + '%';
          lg.b2.style.width = (m / max * 100) + '%';
          lg.b3.style.width = (k / max * 100) + '%';
          lg.v.innerHTML = api.fmt(`两行一样长：**账是平的**。已擦除 ${m} 比特，放热至少 ${m} × 2.9×10⁻²¹ 焦（室温）。`);
          bErase.textContent = k ? `擦除记忆（${k} 比特）` : '擦除记忆';
          bErase.disabled = !k;
          bErase.className = 'btn' + (st.locked ? ' hue' : '');
        }
        function temps() {
          let sL = 0, nL = 0, sR = 0, nR = 0, sA = 0;
          for (const m of st.mols) { const e = m.s * m.s; sA += e; if (m.x < 1) { sL += e; nL++; } else { sR += e; nR++; } }
          const mA = sA / N;
          st.nL = nL; st.nR = nR;
          st.TL = nL ? 300 * (sL / nL) / mA : 0; st.TR = nR ? 300 * (sR / nR) / mA : 0;
          st.dT = nL && nR ? st.TR - st.TL : 0;
        }
        function pass(m, toRight) {
          st.measured++; st.mem.push(m.fast ? 1 : 0);
          const good = toRight === m.fast;
          st.gateFx = 1; st.gateOk = good; m.fx = 1;
          if (good) api.sfx('tick');
          if (st.mem.length >= MEM) { st.locked = true; api.sfx('bad'); }
          updLedger();
        }
        function step(dts) {
          for (const m of st.mols) {
            const ox = m.x;
            m.x += m.vx * dts * SP; m.y += m.vy * dts * SP;
            if (m.y < 0.02) { m.y = 0.04 - m.y; m.vy = Math.abs(m.vy); }
            if (m.y > 0.98) { m.y = 1.96 - m.y; m.vy = -Math.abs(m.vy); }
            if (m.x < 0.01) { m.x = 0.02 - m.x; m.vx = Math.abs(m.vx); }
            if (m.x > 1.99) { m.x = 3.98 - m.x; m.vx = -Math.abs(m.vx); }
            if ((ox < 1) !== (m.x < 1)) {
              if (st.open && !st.locked && m.y > G0 && m.y < G1) pass(m, ox < 1);
              else { m.x = 2 - m.x; m.vx = -m.vx; }
            }
            m.fx = Math.max(0, m.fx - dts * 1.5);
          }
        }
        function erase() {
          const k = st.mem.length; if (!k) return;
          if (!R) {
            const cells = memCells(cv.w, cv.h);
            for (let i = 0; i < k; i++) for (let j = 0; j < 6; j++) {
              const a = Math.random() * TAU, sp = 40 + Math.random() * 110;
              st.sparks.push({ x: cells[i][0], y: cells[i][1], vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40, life: 1 });
            }
          }
          st.erased += k; st.mem = []; st.locked = false; st.erasedOnce = true;
          api.sfx('whoosh'); updLedger();
        }
        const lay = (w, h) => { const y0 = 46, y1 = h - 64; return { x0: 12, y0, sx: (w - 24) / 2, sy: y1 - y0 }; };
        function memCells(w, h) { const c = 22, g = 6, tot = MEM * c + (MEM - 1) * g, x = w / 2 - tot / 2 + 30, y = h - 30; const out = []; for (let i = 0; i < MEM; i++) out.push([x + i * (c + g) + c / 2, y]); return out; }

        s.raf((t, dt) => {
          const dts = Math.min(dt, 50) / 1000, { ctx, w, h } = cv, L = lay(w, h);
          let autoOpen = false;
          if (st.auto && !st.locked) {
            let good = false, bad = false;
            for (const m of st.mols) {
              const toward = (m.x < 1 && m.vx > 0) || (m.x > 1 && m.vx < 0);
              if (!toward || m.y <= G0 || m.y >= G1) continue;
              if (Math.abs(m.x - 1) < Math.abs(m.vx) * SP * 0.12 + 0.01) { if ((m.x < 1) === m.fast) good = true; else bad = true; }
            }
            autoOpen = good && !bad;
          }
          st.open = (st.hold || autoOpen) && !st.locked;
          step(dts); temps();
          if (!st.maxwell && st.dT >= 40) { st.maxwell = true; api.collect('l10-maxwell'); }
          st.gateAng += ((st.open ? 1 : 0) - st.gateAng) * Math.min(1, dts * 18);
          st.gateFx = Math.max(0, st.gateFx - dts * 2.2);
          const P = (x, y) => [L.x0 + x * L.sx, L.y0 + y * L.sy];
          ctx.clearRect(0, 0, w, h);
          // 环境：擦除放出的热，留在盒子外面
          if (st.erased) {
            const a = Math.min(0.5, 0.05 * Math.pow(st.erased, 0.7));
            const eg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
            eg.addColorStop(0, api.hsl(COLF, 90, 55, 0)); eg.addColorStop(1, api.hsl(COLF, 90, 55, a * 0.5));
            ctx.fillStyle = eg; ctx.fillRect(0, 0, w, h);
          }
          // 两室
          const [ax, ay] = P(0, 0), [bx, by] = P(2, 1), mx = P(1, 0)[0];
          ctx.fillStyle = 'rgba(255,255,255,.018)'; ctx.fillRect(ax, ay, bx - ax, by - ay);
          ctx.fillStyle = api.hsl(COLS, 80, 50, clamp((300 - st.TL) / 300, 0, 1) * 0.3); ctx.fillRect(ax, ay, mx - ax, by - ay);
          ctx.fillStyle = api.hsl(COLF, 85, 55, clamp((st.TR - 300) / 300, 0, 1) * 0.3); ctx.fillRect(mx, ay, bx - mx, by - ay);
          ctx.strokeStyle = 'rgba(190,206,240,.35)'; ctx.lineWidth = 1.2; ctx.strokeRect(ax, ay, bx - ax, by - ay);
          // 隔板与门
          const [, gy0] = P(1, G0), [, gy1] = P(1, G1);
          ctx.strokeStyle = 'rgba(210,220,245,.7)'; ctx.lineWidth = 2.4;
          line(ctx, [mx, ay], [mx, gy0]); line(ctx, [mx, gy1], [mx, by]);
          const th = st.gateAng * 1.25, dl = gy1 - gy0;
          const doorEnd = [mx + Math.sin(th) * dl, gy0 + Math.cos(th) * dl];
          ctx.strokeStyle = st.locked ? 'hsl(356 78% 66%)' : api.hsl(H, 85, 72, 0.95); ctx.lineWidth = 3; ctx.lineCap = 'round';
          if (st.open || st.gateFx > 0) { ctx.globalCompositeOperation = 'lighter'; halo(ctx, mx, (gy0 + gy1) / 2, dl * 0.8, st.gateOk ? H : 356, 85, 62, 0.25 + 0.35 * st.gateFx); ctx.globalCompositeOperation = 'source-over'; }
          line(ctx, [mx, gy0], doorEnd);
          // 妖的眼睛
          const ex = mx, ey = ay - 16;
          let tx = 0, ty = 0, best = 1e9;
          for (const m of st.mols) { const d = Math.abs(m.x - 1) + Math.abs(m.y - 0.5) * 0.5; if (d < best) { best = d; tx = m.x - 1; ty = m.y - 0.5; } }
          const open = 3 + 3 * st.gateAng;
          ctx.globalCompositeOperation = 'lighter'; halo(ctx, ex, ey, 22, H, 85, 66, 0.4); ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = api.hsl(H, 85, 78, 0.95); ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.ellipse(ex, ey, 11, open + 1, 0, 0, TAU); ctx.stroke();
          dot(ctx, ex + clamp(tx * 14, -6, 6), ey + clamp(ty * 6, -2, 2), 2.6, '#FFF6E4');
          // 分子
          ctx.globalCompositeOperation = 'lighter';
          for (const m of st.mols) {
            const [x, y] = P(m.x, m.y), hue = m.fast ? COLF : COLS;
            halo(ctx, x, y, m.fast ? 11 : 8, hue, 90, m.fast ? 62 : 55, m.fast ? 0.55 : 0.4);
            if (m.fx > 0) halo(ctx, x, y, 22, hue, 90, 70, 0.5 * m.fx);
          }
          ctx.globalCompositeOperation = 'source-over';
          for (const m of st.mols) {
            const [x, y] = P(m.x, m.y);
            dot(ctx, x, y, m.fast ? 3.4 : 2.8, m.fast ? api.hsl(COLF, 100, 80, 1) : api.hsl(COLS, 80, 70, 0.9));
            const toward = (m.x < 1 && m.vx > 0) || (m.x > 1 && m.vx < 0);
            if (toward && Math.abs(m.x - 1) < 0.2 && m.y > G0 - 0.03 && m.y < G1 + 0.03) {
              ctx.strokeStyle = 'rgba(255,246,228,.45)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 8, 0, TAU); ctx.stroke();
            }
          }
          // 温度
          ctx.textAlign = 'center'; ctx.font = `13px ${FM}`;
          ctx.fillStyle = api.hsl(COLS, 80, 78, 0.95); ctx.fillText(`左 ${Math.round(st.TL)} K`, (ax + mx) / 2, 22);
          ctx.fillStyle = api.hsl(COLF, 90, 74, 0.95); ctx.fillText(`右 ${Math.round(st.TR)} K`, (mx + bx) / 2, 22);
          ctx.font = `11px ${FM}`; ctx.fillStyle = 'rgba(232,236,245,.75)';
          ctx.fillText(`ΔT ${Math.round(st.dT)} / ${GOAL} K`, mx, by + 17);
          // 记忆
          const cells = memCells(w, h);
          ctx.font = `12px ${FS}`; ctx.textAlign = 'right'; ctx.fillStyle = st.locked ? 'hsl(356 78% 72%)' : 'rgba(162,173,196,.9)';
          ctx.fillText(st.locked ? '记忆已满' : '妖的记忆', cells[0][0] - 20, cells[0][1] + 4);
          ctx.textAlign = 'center'; ctx.font = `500 12px ${FM}`;
          cells.forEach(([x, y], i) => {
            const b = st.mem[i];
            ctx.strokeStyle = st.locked ? 'hsl(356 78% 66% / .8)' : 'rgba(190,206,240,.35)'; ctx.lineWidth = 1;
            ctx.strokeRect(x - 11, y - 11, 22, 22);
            if (b != null) {
              ctx.fillStyle = api.hsl(b ? COLF : COLS, 85, 60, 0.3); ctx.fillRect(x - 10, y - 10, 20, 20);
              ctx.fillStyle = b ? api.hsl(COLF, 100, 82, 1) : api.hsl(COLS, 85, 80, 1); ctx.fillText(String(b), x, y + 4);
            }
          });
          // 火花：擦除放出的热
          if (st.sparks.length) {
            ctx.globalCompositeOperation = 'lighter';
            for (const p of st.sparks) { p.x += p.vx * dts; p.y += p.vy * dts; p.vy -= 20 * dts; p.life -= dts * 0.9; if (p.life > 0) halo(ctx, p.x, p.y, 6, COLF, 95, 62, 0.8 * p.life); }
            ctx.globalCompositeOperation = 'source-over';
            st.sparks = st.sparks.filter(p => p.life > 0);
          }
          if (st.erased) { ctx.textAlign = 'right'; ctx.font = `11px ${FM}`; ctx.fillStyle = api.hsl(COLF, 90, 72, 0.85); ctx.fillText(`环境 +${st.erased}·kT ln2`, w - 12, h - 8); }
          bHold.setAttribute('aria-pressed', st.open ? 'true' : 'false');
          st.rd += dts;
          if (st.rd > 0.15) { st.rd = 0; read.innerHTML = `<span>门：<b>${st.locked ? '锁住（记忆已满）' : st.open ? '开' : '关'}</b></span><span>已测 <b>${st.measured}</b> 比特</span><span>温差 <b>${Math.round(st.dT)} K</b></span>`; }
        });
        updLedger();

        if (api.replay) await api.say('又回到两个妖的岛。先当一回麦克斯韦妖。');
        else await api.say(['第十面透镜，住着两个妖。一个**知道一些**，一个**知道一切**。', '先见第一个。1867 年，麦克斯韦设想：盒中气体被隔成两半，门边守着一个能看清每个分子速度的小东西。']);
        await api.say('今天，你就是它。暖色的是快分子，冷色的是慢分子。左右两室，一开始一样热。');
        api.hint('按住画面（或「按住开门」）开门：只放**快**分子去右边，**慢**分子去左边。');
        await until(() => st.locked);
        await api.say(['等等：你的记忆满了。每放一个分子过门，你都得先看清它的快慢，记下 **1 比特**。', '想继续分拣，就得腾出记忆：**擦除**旧记录。']);
        bErase.hidden = false; updLedger();
        api.hint('按「擦除记忆」。');
        await until(() => st.erasedOnce);
        await api.say(['擦掉 1 比特，至少要向环境放出 **kT ln 2** 的热，室温下约 2.9×10⁻²¹ 焦。这是**兰道尔原理**（1961）。',
          '它罚的是“逻辑上不可逆”的操作：不管原来是 0 还是 1，一律清空。']);
        api.collect('l10-landauer');
        ledger.hidden = false; updLedger();
        api.hint(`继续分拣，把温差推到 ${GOAL} K。记忆满了就擦。`);
        api.timeout(() => { if (st.dT < GOAL) bAuto.hidden = false; }, 70000);
        await until(() => st.dT >= GOAL);
        api.sfx('ok');
        if (!st.maxwell) { st.maxwell = true; api.collect('l10-maxwell'); }
        await api.say([`温差到了 ${GOAL} K：右边热，左边冷，那扇门却不做功。第二定律被你打破了吗？`,
          '看账本：分拣让气体熵最多减少“测过的比特数 × k ln 2”。',
          '而你擦掉的比特，加上记忆里还存着的，正好就是测过的那些。账是平的。']);
        await api.quiz({
          kicker: '妖的账单',
          q: '这个谜持续了一百多年：妖到底在哪里付出了代价？',
          options: [
            { t: '**看**：要看清分子就得用光照它，测量必然耗能', why: '这是布里渊（1951）的答案，也是历史上最有名的错误答案之一。本内特指出，测量原则上可以**可逆地**进行（把信息复制到空白记忆里），没有最低能耗。' },
            { t: '**开门**：推门要做功', why: '门是无摩擦的，开关原则上不做功。麦克斯韦设想的正是这一点。' },
            { t: '**忘**：要循环工作就必须擦除记忆，而擦除必然放热', ok: true, why: '对。本内特（1982）：观察可以免费，**遗忘才要付费**。妖要么擦除并放热，要么让记忆越积越满；把它的记忆也算进系统，总熵就不会减少。' },
          ],
        });
        api.collect('l10-bennett');
        await api.say(['1929 年，西拉德把它简化到只有**一个**分子：1 比特信息，最多换来 kT ln 2 的功。信息成了燃料。',
          '2012 年，贝吕（Bérut）等人把激光双势阱里的一颗小珠当作 1 比特记忆：擦除放出的热，确实不低于这个极限。',
          '所以，心灵可以像妖一样分拣，也和妖一样要付账。']);
      }

      /* ================================================ 幕二 · 整合信息 */
      async function sceneIIT() {
        const s = scene(2, '整合信息', '一张小网：信息从左边进来，从右边出去。');
        const LOOP = { I: [0.08, 0.5], A: [0.3, 0.72], B: [0.5, 0.26], C: [0.7, 0.72], O: [0.92, 0.5] };
        const COLX = [0.3, 0.5, 0.7], ROWY = { A: 0.24, B: 0.5, C: 0.76 };
        const EDGES = [
          { a: 'A', b: 'B', on: true, fixed: true }, { a: 'B', b: 'C', on: true, fixed: true },
          { a: 'A', b: 'C', on: false }, { a: 'B', b: 'A', on: false }, { a: 'C', b: 'B', on: false }, { a: 'C', b: 'A', on: false },
        ];
        const st = { mode: 'loop', morph: 0, pulse: null, report: '', askedLoop: false, askedUnr: false, rd: 0 };
        const cv = api.canvas(s.stage, { style: 'display:block;width:100%;height:clamp(300px,50vh,460px);touch-action:pan-y' });
        const bUnroll = btn('展开成前馈网络', 'hue', () => { st.mode = st.mode === 'loop' ? 'unr' : 'loop'; st.report = ''; st.pulse = null; api.sfx('whoosh'); upd(); });
        const bRed = btn('给它看红色', '', () => { if (st.pulse) return; st.report = ''; st.pulse = { t: 0, mode: st.mode }; api.sfx('select'); });
        const bAdd = btn('加一条回路', '', () => { const e = EDGES.slice().reverse().find(x => !x.fixed && !x.on && x.a !== 'A'); if (e) { e.on = true; api.sfx('select'); upd(); } });
        bUnroll.hidden = true; bRed.hidden = true;
        s.ctrls.append(bAdd, bUnroll, bRed);
        const read = api.el('div', { class: 'l10-read l10-in' });
        wrap.append(read);

        function phi() {
          if (st.mode === 'unr') return { v: 0, cut: null };
          let best = Infinity, cut = null;
          for (const X of ['A', 'B', 'C']) {
            let inn = 0, out = 0;
            for (const e of EDGES) if (e.on) { if (e.b === X) inn++; if (e.a === X) out++; }
            const v = Math.min(inn, out);
            if (v < best) { best = v; cut = X; }
          }
          return { v: best, cut };
        }
        function upd() {
          const p = phi();
          bUnroll.textContent = st.mode === 'loop' ? '展开成前馈网络' : '收回成回路';
          bUnroll.setAttribute('aria-pressed', st.mode === 'unr' ? 'true' : 'false');
          bAdd.hidden = st.mode !== 'loop' || !EDGES.some(x => !x.fixed && !x.on && x.a !== 'A');
          read.innerHTML = `<span>Φ（示意）= <b>${p.v}</b></span><span>${st.mode === 'unr' ? '最薄弱的缝：任意两拍之间，信息只朝一个方向流' : p.v === 0 ? `最薄弱的缝：把 ${p.cut} 切出去，只断了单向的联系` : `最薄弱的缝：切开 ${p.cut}，也要切断双向的因果联系`}</span>`;
        }
        const W = () => cv.w, Hh = () => cv.h;
        const px = q => [q[0] * W(), q[1] * Hh()];
        function curve(p, q, off) {
          const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1;
          return [mx - dy / L * off, my + dx / L * off];
        }
        const bez = (p, c, q, t) => [(1 - t) * (1 - t) * p[0] + 2 * (1 - t) * t * c[0] + t * t * q[0], (1 - t) * (1 - t) * p[1] + 2 * (1 - t) * t * c[1] + t * t * q[1]];
        function drawEdge(ctx, p, q, off, col, width, dashed, nodeR) {
          const c = curve(p, q, off), L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
          const t1 = clamp(1 - (nodeR + 3) / L, 0.5, 1), t0 = clamp((nodeR + 2) / L, 0, 0.5);
          ctx.strokeStyle = col; ctx.lineWidth = width; ctx.setLineDash(dashed ? [4, 5] : []);
          ctx.beginPath();
          for (let i = 0; i <= 24; i++) { const pt = bez(p, c, q, t0 + (t1 - t0) * i / 24); if (i) ctx.lineTo(pt[0], pt[1]); else ctx.moveTo(pt[0], pt[1]); }
          ctx.stroke(); ctx.setLineDash([]);
          const e = bez(p, c, q, t1), e0 = bez(p, c, q, t1 - 0.04), a = Math.atan2(e[1] - e0[1], e[0] - e0[0]);
          ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(e[0], e[1]);
          ctx.lineTo(e[0] - Math.cos(a - 0.45) * 8, e[1] - Math.sin(a - 0.45) * 8); ctx.lineTo(e[0] - Math.cos(a + 0.45) * 8, e[1] - Math.sin(a + 0.45) * 8); ctx.closePath(); ctx.fill();
          return c;
        }
        function flowDot(ctx, p, c, q, t, hue, a) { const pt = bez(p, c, q, t); halo(ctx, pt[0], pt[1], 7, hue, 90, 70, a); }
        pointer(cv.canvas, {
          down(pt) {
            if (st.mode !== 'loop' || st.morph > 0.2) return false;
            let best = null, bd = 26;
            for (const e of EDGES) {
              if (e.fixed) continue;
              const p = px(LOOP[e.a]), q = px(LOOP[e.b]), c = curve(p, q, 18), m = bez(p, c, q, 0.5), d = Math.hypot(m[0] - pt.x, m[1] - pt.y);
              if (d < bd) { bd = d; best = e; }
            }
            if (best) { best.on = !best.on; api.sfx(best.on ? 'select' : 'tick'); upd(); }
            return false;
          },
        });

        s.raf((t, dt) => {
          const { ctx, w, h } = cv, dts = dt / 1000, tt = R ? 0 : t / 1000;
          st.morph = R ? (st.mode === 'unr' ? 1 : 0) : st.morph + ((st.mode === 'unr' ? 1 : 0) - st.morph) * Math.min(1, dts * 4);
          if (st.pulse) {
            st.pulse.t += R ? 99 : dts;
            if (st.pulse.t >= 1.7) { if (st.pulse.mode === 'loop') st.askedLoop = true; else st.askedUnr = true; st.report = '报告：红色'; st.pulse = null; api.sfx('chime'); }
          }
          const pt = st.pulse ? st.pulse.t : -1, RED = 356;
          ctx.clearRect(0, 0, w, h);
          const I = px(LOOP.I), O = px(LOOP.O), p = phi();
          // 输入与输出
          const ioCol = (lit) => lit ? api.hsl(RED, 85, 66, 1) : 'rgba(232,236,245,.75)';
          // —— 回路形态
          const aL = 1 - st.morph, aU = st.morph;
          if (aL > 0.02) {
            ctx.globalAlpha = aL;
            const A = px(LOOP.A), B = px(LOOP.B), C = px(LOOP.C), N = { A, B, C };
            if (p.cut && p.v === 0) { ctx.strokeStyle = 'rgba(255,246,228,.35)'; ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.arc(N[p.cut][0], N[p.cut][1], 34, 0, TAU); ctx.stroke(); ctx.setLineDash([]); }
            else if (p.cut) { ctx.strokeStyle = api.hsl(H, 85, 75, 0.45); ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.arc(N[p.cut][0], N[p.cut][1], 34, 0, TAU); ctx.stroke(); ctx.setLineDash([]); }
            const red1 = pt >= 0 && pt < 0.45, red2 = pt >= 0.4 && pt < 1.3, red3 = pt >= 1.2;
            let c = drawEdge(ctx, I, A, 0, red1 ? api.hsl(RED, 85, 66, 0.9) : 'rgba(232,236,245,.45)', 1.4, false, 16);
            if (red1) flowDot(ctx, I, c, A, pt / 0.45, RED, 0.9);
            for (const e of EDGES) {
              const P0 = N[e.a], P1 = N[e.b];
              if (!e.on) { const cc = drawEdge(ctx, P0, P1, 18, 'rgba(190,206,240,.22)', 1, true, 16); const m = bez(P0, cc, P1, 0.5); ctx.fillStyle = 'rgba(190,206,240,.55)'; ctx.font = `14px ${FM}`; ctx.textAlign = 'center'; ctx.fillText('+', m[0], m[1] + 5); continue; }
              const back = e.a === 'B' && e.b === 'A' || e.a === 'C';
              const col = red2 ? api.hsl(RED, 85, 66, 0.9) : back ? api.hsl(H, 85, 74, 0.95) : 'rgba(232,236,245,.7)';
              const cc = drawEdge(ctx, P0, P1, 18, col, back ? 2 : 1.6, false, 16);
              ctx.globalCompositeOperation = 'lighter';
              if (red2) flowDot(ctx, P0, cc, P1, ((pt - 0.4) * 2.2) % 1, RED, 0.9);
              else if (!R) flowDot(ctx, P0, cc, P1, (tt * 0.6 + (e.a.charCodeAt(0) + e.b.charCodeAt(0)) * 0.17) % 1, H, 0.55);
              ctx.globalCompositeOperation = 'source-over';
            }
            c = drawEdge(ctx, C, O, 0, red3 ? api.hsl(RED, 85, 66, 0.9) : 'rgba(232,236,245,.45)', 1.4, false, 16);
            if (red3 && pt < 1.7) flowDot(ctx, C, c, O, Math.min(1, (pt - 1.2) / 0.5), RED, 0.9);
            for (const k of ['A', 'B', 'C']) {
              const [x, y] = N[k], lit = red2;
              ctx.globalCompositeOperation = 'lighter'; halo(ctx, x, y, 30, lit ? RED : H, 85, 62, 0.35 + 0.15 * p.v); ctx.globalCompositeOperation = 'source-over';
              ctx.fillStyle = 'rgba(16,26,47,.95)'; ctx.beginPath(); ctx.arc(x, y, 16, 0, TAU); ctx.fill();
              ctx.strokeStyle = api.hsl(lit ? RED : H, 85, 76, 1); ctx.lineWidth = 1.5; ctx.stroke();
              ctx.fillStyle = '#E8ECF5'; ctx.font = `500 13px ${FM}`; ctx.textAlign = 'center'; ctx.fillText(k, x, y + 4.5);
            }
            ctx.globalAlpha = 1;
          }
          // —— 展开形态
          if (aU > 0.02) {
            ctx.globalAlpha = aU;
            const pos = (k, i) => [COLX[i] * w, ROWY[k] * h];
            const xc = (COLX[0] + COLX[1]) / 2 * w;
            ctx.strokeStyle = 'rgba(255,246,228,.35)'; ctx.setLineDash([3, 5]); line(ctx, [xc, 18], [xc, h - 18]); ctx.setLineDash([]);
            ctx.font = `11px ${FS}`; ctx.fillStyle = 'rgba(255,246,228,.6)'; ctx.textAlign = 'center'; ctx.fillText('这一刀：只断单向', xc, h - 6);
            for (let i = 0; i < 3; i++) { ctx.font = `11px ${FM}`; ctx.fillStyle = 'rgba(162,173,196,.7)'; ctx.fillText(`第 ${i + 1} 拍`, COLX[i] * w, 14); }
            for (let i = 0; i < 3; i++) {
              const red = pt >= 0 && pt < 0.45;
              const c = drawEdge(ctx, I, pos('A', i), 0, red ? api.hsl(RED, 85, 66, 0.9) : 'rgba(232,236,245,.35)', 1.1, false, 11);
              if (red) flowDot(ctx, I, c, pos('A', i), pt / 0.45, RED, 0.8);
              const red3 = pt >= 1.2;
              const c2 = drawEdge(ctx, pos('C', i), O, 0, red3 ? api.hsl(RED, 85, 66, 0.9) : 'rgba(232,236,245,.35)', 1.1, false, 11);
              if (red3 && pt < 1.7) flowDot(ctx, pos('C', i), c2, O, Math.min(1, (pt - 1.2) / 0.5), RED, 0.8);
            }
            for (let i = 0; i < 2; i++) {
              const red = pt >= 0.4 + i * 0.4 && pt < 0.85 + i * 0.4;
              for (const e of EDGES) {
                if (!e.on) continue;
                const P0 = pos(e.a, i), P1 = pos(e.b, i + 1);
                const cc = drawEdge(ctx, P0, P1, 0, red ? api.hsl(RED, 85, 66, 0.9) : 'rgba(232,236,245,.55)', 1.2, false, 11);
                ctx.globalCompositeOperation = 'lighter';
                if (red) flowDot(ctx, P0, cc, P1, (pt - 0.4 - i * 0.4) / 0.45, RED, 0.85);
                else if (!R) flowDot(ctx, P0, cc, P1, (tt * 0.6 + i * 0.5) % 1, H, 0.4);
                ctx.globalCompositeOperation = 'source-over';
              }
            }
            for (let i = 0; i < 3; i++) for (const k of ['A', 'B', 'C']) {
              const [x, y] = pos(k, i);
              ctx.fillStyle = 'rgba(16,26,47,.95)'; ctx.beginPath(); ctx.arc(x, y, 11, 0, TAU); ctx.fill();
              ctx.strokeStyle = 'rgba(232,236,245,.7)'; ctx.lineWidth = 1.2; ctx.stroke();
              ctx.fillStyle = '#E8ECF5'; ctx.font = `11px ${FM}`; ctx.textAlign = 'center'; ctx.fillText(k, x, y + 4);
            }
            ctx.globalAlpha = 1;
          }
          // 输入、输出与报告
          const inLit = pt >= 0 && pt < 0.5, outLit = !!st.report || pt >= 1.5;
          for (const [q, lit, lab] of [[I, inLit, '输入'], [O, outLit, '输出']]) {
            ctx.globalCompositeOperation = 'lighter'; halo(ctx, q[0], q[1], 26, lit ? RED : H, 85, 62, lit ? 0.7 : 0.25); ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = ioCol(lit); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(q[0], q[1], 9, 0, TAU); ctx.stroke();
            ctx.font = `11px ${FS}`; ctx.fillStyle = 'rgba(162,173,196,.85)'; ctx.textAlign = 'center'; ctx.fillText(lab, q[0], q[1] + 26);
          }
          if (st.report) { ctx.font = `13px ${FS}`; ctx.fillStyle = api.hsl(RED, 85, 74, 1); ctx.textAlign = 'right'; ctx.fillText(st.report, w - 10, O[1] - 20); }
          // Φ 计
          ctx.textAlign = 'left'; ctx.font = `11px ${FM}`; ctx.fillStyle = 'rgba(162,173,196,.85)'; ctx.fillText('Φ 示意', 12, h - 12);
          for (let i = 0; i < 2; i++) { ctx.fillStyle = i < p.v ? api.hsl(H, 85, 70, 0.95) : 'rgba(255,255,255,.08)'; ctx.fillRect(60 + i * 26, h - 21, 22, 8); }
        });
        upd();

        await api.say(['第二个问题：心灵与物质，谁更基本？先看一个想给意识“打分”的理论。',
          '托诺尼（Tononi）的**整合信息理论**（IIT）说：意识与系统内部“抱成一团”的因果结构有关，用 **Φ** 衡量。',
          'Φ 的直觉：把系统用各种方式切开，找**最薄弱的那道缝**。切开后损失越少，Φ 越低。']);
        api.hint('这张网信息只朝一个方向流。点虚线，给它加上回路，看 Φ 计。');
        await until(() => phi().v >= 1);
        api.sfx('ok');
        await api.say(['有了回路，无论从哪里下刀，都得切断**双向**的因果联系。Φ 不再是 0。',
          '托诺尼常举数码相机作对比：几百万个像素各管各的，从中间切开，什么也没损失。']);
        bUnroll.hidden = false;
        api.hint('点「展开成前馈网络」：把回路按时间一拍一拍铺开。');
        await until(() => st.mode === 'unr');
        await api.say(['展开后，信息又只朝一个方向流了：Φ = 0。可它对输入的反应，和刚才**完全相同**。',
          '托诺尼和科赫（2015）正是这样推论的：**前馈网络 Φ = 0**；于是可能存在行为与人无异、却毫无体验的“完美僵尸”。']);
        api.collect('l10-iit');
        bRed.hidden = false;
        api.hint('在「回路」和「展开」两种形态下，各点一次「给它看红色」。');
        await until(() => st.askedLoop && st.askedUnr);
        await api.say(['两张网都报告“红色”。区分刺激、整合信息、报告状态：这些是“**容易问题**”，找到机制就行。',
          '查尔默斯（Chalmers，1995）的**困难问题**是：为什么这些处理会伴随主观体验？',
          '一个 AI 也许能解决所有“容易问题”。它有感觉吗？我们甚至不知道该用什么实验来回答。']);
        api.collect('l10-hard');
        await api.say(['一种大胆的回答是**泛心论**：经验也许从一开始就在，只是极其简单。它不是说石头会思考。',
          '它的难题叫**组合问题**：许多小经验，怎样合成你此刻统一的体验？',
          'IIT 的回答是：只有因果上真正“抱成一团”的系统，才构成一个意识主体。',
          'IIT 也很有争议：2023 年，124 位研究者发表公开信，称它为“伪科学”。',
          '反弹同样强烈。查尔默斯认为 IIT 问题很多，但“伪科学”这顶帽子不成比例。',
          '阿伦森（Aaronson）指出：按 IIT 的公式，一张规则的逻辑门网格，Φ 可以远超人脑。托诺尼接受了这个推论。']);
        await api.quiz({
          q: '关于整合信息理论，下面哪种说法最公允？',
          options: [
            { t: '科学已经证明：意识就是 Φ', why: '言过其实。IIT 的核心公理很难直接检验，对真实大脑也基本算不出 Φ。' },
            { t: 'IIT 是一场骗局', why: '同样言过其实。争论双方大多承认它很难检验，分歧在于这是否足以称为“伪科学”。' },
            { t: '一个严肃但远未被证实的理论，核心主张很难直接检验', ok: true, why: '对。它还向功能主义发出了直接挑战：按 IIT，有没有意识取决于硬件怎样连接，而不只是行为像不像。' },
          ],
        });
      }

      /* ================================================ 幕三 · 观察不需要心灵 */
      async function sceneSlits() {
        const s = scene(3, '观察不需要心灵', '粒子一个一个穿过两条缝，打在屏上。');
        const st = { hits: [], det: false, discard: false, drag: false, tok: null, flash: 0, fl: [], rd: 0, epoch: 0 };
        const cv = api.canvas(s.stage, { style: 'display:block;width:100%;height:clamp(300px,50vh,460px);touch-action:none' });
        const bDet = btn('放上探测器', '', () => setDet(!st.det));
        const bDis = btn('让记录散入环境', '', () => { if (!st.det) return; st.discard = !st.discard; reset(); api.sfx('whoosh'); upd(); });
        bDis.hidden = true;
        s.ctrls.append(bDet, bDis);
        const read = api.el('div', { class: 'l10-read l10-in' });
        wrap.append(read);
        const sinc = x => (Math.abs(x) < 1e-6 ? 1 : Math.sin(x) / x);
        const env = u => { const v = sinc(2.6 * u); return v * v; };
        const I = u => (st.det ? 0.5 * (env(u - 0.05) + env(u + 0.05)) : Math.cos(8.5 * u) ** 2 * env(u));
        function sample() { for (let k = 0; k < 60; k++) { const u = Math.random() * 2 - 1; if (Math.random() < I(u)) return u; } return 0; }
        function reset() { st.hits = []; st.fl = []; st.epoch++; if (R) for (let i = 0; i < 1400; i++) st.hits.push([sample(), Math.random()]); }
        function setDet(on) { st.det = on; if (!on) st.discard = false; st.tok = null; reset(); api.sfx(on ? 'select' : 'tick'); upd(); }
        function upd() {
          bDet.textContent = st.det ? '拿开探测器' : '放上探测器';
          bDet.setAttribute('aria-pressed', st.det ? 'true' : 'false');
          bDis.setAttribute('aria-pressed', st.discard ? 'true' : 'false');
          bDis.disabled = !st.det;
        }
        const geo = () => {
          const { w, h } = cv;
          return { w, h, sx: w * 0.07, bx: w * 0.4, scr: w * 0.8, cy: h * 0.46, d: h * 0.085, sh: Math.max(6, h * 0.026), span: h * 0.38, rest: [w * 0.22, h - 34] };
        };
        const tokPos = () => { const g = geo(); if (st.tok) return st.tok; if (st.det) return [g.bx - 20, g.cy - g.d]; return g.rest; };
        pointer(cv.canvas, {
          down(p) { const q = tokPos(); if (Math.hypot(p.x - q[0], p.y - q[1]) > 30) return false; st.drag = true; st.tok = [p.x, p.y]; return true; },
          move(p) { if (st.drag) st.tok = [p.x, p.y]; },
          up(p) {
            if (!st.drag) return;
            st.drag = false;
            const g = geo(), near = Math.hypot(p.x - g.bx, p.y - (g.cy - g.d)) < 50 || Math.hypot(p.x - g.bx, p.y - (g.cy + g.d)) < 50;
            st.tok = null;
            if (near !== st.det) setDet(near);
          },
        });
        upd(); reset();

        s.raf((t, dt) => {
          const { w, h, sx, bx, scr, cy, d, sh, span, rest } = geo(), dts = dt / 1000;
          if (!R && st.hits.length < 1500) {
            const k = Math.min(1500 - st.hits.length, Math.round(dts * 260) || 1);
            for (let i = 0; i < k; i++) { const u = sample(); st.hits.push([u, Math.random()]); if (st.fl.length < 30) st.fl.push({ u, a: 1, up: Math.random() < 0.5 }); }
            if (st.det) st.flash = 0.55 + 0.45 * Math.random();
          }
          st.flash = Math.max(0, st.flash - dts * 4);
          const ctx = cv.ctx;
          ctx.clearRect(0, 0, w, h);
          // 光源
          ctx.globalCompositeOperation = 'lighter';
          halo(ctx, sx, cy, 26, H, 85, 66, 0.6);
          // 波前
          if (!R) {
            const ph = (t / 1000 * 60) % 26;
            for (let r = ph; r < bx - sx; r += 26) { ctx.strokeStyle = api.hsl(H, 80, 72, 0.16 * (1 - r / (bx - sx))); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(sx, cy, r, -0.5, 0.5); ctx.stroke(); }
            for (const yy of [cy - d, cy + d]) {
              if (st.det && st.discard) break;
              for (let r = ph; r < scr - bx; r += 26) { ctx.strokeStyle = api.hsl(H, 80, 72, (st.det ? 0.06 : 0.13) * (1 - r / (scr - bx))); ctx.beginPath(); ctx.arc(bx, yy, r, -1.1, 1.1); ctx.stroke(); }
            }
          }
          ctx.globalCompositeOperation = 'source-over';
          // 挡板与缝
          ctx.strokeStyle = 'rgba(210,220,245,.75)'; ctx.lineWidth = 3;
          line(ctx, [bx, 10], [bx, cy - d - sh]); line(ctx, [bx, cy - d + sh], [bx, cy + d - sh]); line(ctx, [bx, cy + d + sh], [bx, h - 60]);
          // 屏
          ctx.strokeStyle = 'rgba(190,206,240,.35)'; ctx.lineWidth = 1; line(ctx, [scr, cy - span - 8], [scr, cy + span + 8]);
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = api.hsl(H, 85, 78, 0.5);
          for (const [u, j] of st.hits) ctx.fillRect(scr - 6 + j * 12, cy + u * span, 1.6, 1.6);
          for (const f of st.fl) { f.a -= dts * 2.5; if (f.a > 0) { halo(ctx, scr, cy + f.u * span, 9, H, 90, 80, 0.7 * f.a); } }
          st.fl = st.fl.filter(f => f.a > 0);
          ctx.globalCompositeOperation = 'source-over';
          // 直方图
          const bins = new Array(48).fill(0);
          for (const [u] of st.hits) bins[clamp(Math.floor((u + 1) / 2 * 48), 0, 47)]++;
          const mxb = Math.max(1, ...bins), hx = scr + 12, hw = w - hx - 8;
          ctx.strokeStyle = api.hsl(H, 85, 80, 0.9); ctx.lineWidth = 1.4; ctx.beginPath();
          bins.forEach((b, i) => { const y = cy + ((i + 0.5) / 48 * 2 - 1) * span, x = hx + b / mxb * hw; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
          ctx.stroke();
          // 探测器
          const [tx, ty] = tokPos();
          ctx.globalCompositeOperation = 'lighter'; halo(ctx, tx, ty, 22 + 10 * st.flash, 42, 90, 72, st.det ? 0.45 + 0.4 * st.flash : 0.35); ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = api.hsl(42, 90, 80, 1); ctx.beginPath(); ctx.arc(tx - 3, ty, 5, 0, TAU); ctx.arc(tx + 4, ty - 2, 4, 0, TAU); ctx.fill();
          ctx.font = `11px ${FS}`; ctx.fillStyle = 'rgba(232,236,245,.8)'; ctx.textAlign = 'center';
          if (!st.det && !st.drag) { ctx.fillText('探测器：一个分子（拖我）', clamp(rest[0], 70, w - 70), rest[1] + 22); }
          if (st.det && !st.drag) {
            ctx.textAlign = 'left';
            ctx.fillText(st.discard ? '记录散入环境，无人读取' : '记录：走了哪条缝', 10, cy - d - 26);
            if (st.discard && !R) { for (let i = 0; i < 6; i++) { const a = (t / 900 + i) % 1; halo(ctx, tx - 10 - a * 60, ty - 8 - a * 30 + i * 3, 4, 42, 80, 75, 0.4 * (1 - a)); } }
          }
          ctx.textAlign = 'center'; ctx.font = `11px ${FM}`; ctx.fillStyle = 'rgba(162,173,196,.7)';
          ctx.fillText('源', sx, cy + 34); ctx.fillText('屏', scr, cy + span + 22);
          st.rd += dts;
          if (st.rd > 0.2) { st.rd = 0; read.innerHTML = `<span>到达 <b>${st.hits.length}</b> 个粒子</span><span>${st.det ? (st.discard ? '有记录，无人读取' : '缝旁有探测器') : '没有探测器'}</span>`; }
        });

        await api.say(['第三站回到微观。“唯物与唯心的界限在微观不存在”，常从量子力学引申出来。先看量子力学说了什么。',
          '两条缝，粒子一个一个飞过去。']);
        api.hint('看屏上慢慢攒出的图样。');
        await until(() => st.hits.length >= 400);
        await api.say(['明暗相间的条纹：像水波穿过两条缝后相互干涉。没有任何东西记下每个粒子走了哪条缝。',
          '现在，在一条缝旁放一个**探测器**。它只是一个分子：被路过的粒子碰一下，就留下了“走哪条缝”的痕迹。']);
        api.hint('把下方的探测器拖到一条缝旁（或点「放上探测器」）。');
        await until(() => st.det && st.hits.length >= 400);
        await api.say(['条纹消失了，只剩两条缝各自的亮斑叠在一起。',
          '也许你会想：是因为“有人知道了”。那就让**没有人**知道。']);
        bDis.hidden = false; upd();
        api.hint('点「让记录散入环境」：这份记录永远不会被任何人读到。');
        await until(() => st.det && st.discard && st.hits.length >= 400);
        await api.say(['仍然没有条纹。要紧的不是谁在看，而是“走哪条缝”的信息**已经泄漏到环境里**。',
          '物理学里的“测量”，是一次足以留下记录的**物理相互作用**，一个光子、一个分子就够，不需要意识。这叫**退相干**。']);
        api.collect('l10-decoherence');
        await api.say(['公道地说：退相干解释了干涉为何消失，但单靠它还不能回答“为什么只出现一个结果”。',
          '“意识导致坍缩”是冯·诺依曼、维格纳等人提出过的一种诠释，今天属于少数派。']);
        await api.quiz({
          kicker: '贝尔定理',
          q: '1964 年贝尔把“结果是否事先确定”变成了可以做实验的问题。实验（2022 年诺贝尔奖）排除的是什么？',
          options: [
            { t: '一切隐变量理论', why: '太强了。1952 年玻姆构造的理论里，粒子始终有确定位置，能重现量子力学全部预言，代价是**非局域**。' },
            { t: '**局域的**隐变量理论', ok: true, why: '对。若结果事先确定、且一方的选择不能瞬间影响另一方，就有 |S| ≤ 2；量子力学预言可达 2√2，实验站在量子力学一边。' },
            { t: '独立于心灵的物质世界', why: '这是哲学引申，不是物理学结论。把“观察者”换成一台探测器，统计结果也不随任何人的意愿改变。' },
          ],
        });
      }

      /* ================================================ 幕四 · 第二个妖与阿莱夫 */
      async function sceneAleph() {
        const s = scene(4, '第二个妖与阿莱夫', '一条有岔路的路。你走在其中。');
        const D = 3;
        const st = { path: [], prog: 1, omni: false, m: 0, fate: null, everOmni: false, backFromOmni: false };
        const cv = api.canvas(s.stage, { style: 'display:block;width:100%;height:clamp(300px,52vh,480px)' });
        const bL = btn('向左', '', () => choose(0));
        const bR = btn('向右', '', () => choose(1));
        const bReset = btn('回到起点', '', () => { st.path = []; st.prog = 1; api.sfx('tick'); upd(); });
        const bOmni = btn('全知视角', 'hue', toggleOmni);
        bOmni.hidden = true;
        s.ctrls.append(bL, bR, bReset, bOmni);
        const note = api.el('p', { class: 'l10-note l10-in' });
        wrap.append(note);
        function choose(c) {
          if (st.omni || st.path.length >= D || st.prog < 1) return;
          st.path.push(c); st.prog = R ? 1 : 0; api.sfx('select'); upd();
        }
        function toggleOmni() {
          st.omni = !st.omni;
          if (st.omni) {
            st.everOmni = true;
            st.fate = st.path.slice();
            while (st.fate.length < D) st.fate.push(st.fate.length % 2);
            api.sfx('refract');
          } else { if (st.everOmni) st.backFromOmni = true; api.sfx('whoosh'); }
          upd();
        }
        function upd() {
          const choosing = !st.omni && st.path.length < D;
          bL.hidden = !choosing; bR.hidden = !choosing;
          bReset.hidden = st.omni || st.path.length < D;
          bOmni.textContent = st.omni ? '回到时间里' : '全知视角';
          bOmni.setAttribute('aria-pressed', st.omni ? 'true' : 'false');
          note.innerHTML = api.fmt(st.omni
            ? '**全知视角**：所有时刻、所有地点同时呈现。岔路坍缩成一条已知的线，选择的按钮不见了。'
            : st.path.length < D ? `你在第 ${st.path.length + 1} 个岔路口。前面的路，你还看不见尽头。` : '你走到了一个尽头。回头看，来路是一条线；当时，它是一个个岔口。');
        }
        const pos = (k, j) => { const { w, h } = cv; return [w / 2 + (j - (Math.pow(2, k) - 1) / 2) * (w * 0.86) / Math.pow(2, k), h - 34 - k * (h - 84) / D]; };
        const nodeOf = (path, k) => { let j = 0; for (let i = 0; i < k; i++) j = j * 2 + path[i]; return j; };
        function edge(ctx, p, q) { const my = (p[1] + q[1]) / 2; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.bezierCurveTo(p[0], my, q[0], my, q[0], q[1]); ctx.stroke(); }
        function edgePt(p, q, t) { const my = (p[1] + q[1]) / 2, u = 1 - t; const c1 = [p[0], my], c2 = [q[0], my]; return [u * u * u * p[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * q[0], u * u * u * p[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * q[1]]; }

        s.raf((t, dt) => {
          const { ctx, w, h } = cv, dts = dt / 1000;
          st.m = R ? (st.omni ? 1 : 0) : st.m + ((st.omni ? 1 : 0) - st.m) * Math.min(1, dts * 3);
          if (st.prog < 1) st.prog = Math.min(1, st.prog + dts * 1.6);
          const m = st.m, fate = st.fate || [];
          const onPath = (arr, k, j) => k <= arr.length && nodeOf(arr, k) === j;
          ctx.clearRect(0, 0, w, h);
          // 阿莱夫：包含一切的光球
          if (m > 0.01) {
            const cx = w / 2, cy = (pos(0, 0)[1] + pos(D, 0)[1]) / 2, r = Math.max(w * 0.46, (pos(0, 0)[1] - pos(D, 0)[1]) * 0.62);
            ctx.globalCompositeOperation = 'lighter'; halo(ctx, cx, cy, r, H, 85, 62, 0.22 * m); ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = api.hsl(H, 85, 80, 0.5 * m); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
          }
          // 路
          const cur = st.path.length;
          for (let k = 0; k < D; k++) for (let j = 0; j < Math.pow(2, k); j++) for (const c of [0, 1]) {
            const p = pos(k, j), q = pos(k + 1, j * 2 + c);
            const taken = onPath(st.path, k, j) && k < cur && st.path[k] === c;
            const ahead = k >= cur && isDesc(k, j);
            const fated = onPath(fate, k, j) && fate[k] === c;
            let a = taken ? 0.85 : ahead ? 0.32 : 0.07;
            a = a * (1 - m) + (fated ? 0.95 : 0.015) * m;
            ctx.strokeStyle = taken || (fated && m > 0.5) ? `rgba(255,246,228,${a})` : api.hsl(H, 80, 72, a);
            ctx.lineWidth = (taken || fated) ? 2 + m * (fated ? 1 : 0) : 1.2;
            ctx.setLineDash(ahead && !taken && m < 0.5 ? [4, 5] : []);
            edge(ctx, p, q);
          }
          ctx.setLineDash([]);
          function isDesc(k, j) { const base = nodeOf(st.path, cur); return (j >> (k - cur)) === base; }
          // 节点
          for (let k = 0; k <= D; k++) for (let j = 0; j < Math.pow(2, k); j++) {
            const [x, y] = pos(k, j), on = onPath(st.path, k, j) && k <= cur, f = onPath(fate, k, j);
            const a = (on ? 0.9 : 0.25) * (1 - m) + (f ? 0.95 : 0.03) * m;
            dot(ctx, x, y, k === D ? 3 : 3.5, `rgba(232,236,245,${a})`);
          }
          // 行人：时间之中只有一个“此刻”；全知视角下，所有时刻的你同时在场
          if (m < 0.99) {
            let p;
            if (cur === 0) p = pos(0, 0);
            else { const k = cur - 1; p = edgePt(pos(k, nodeOf(st.path, k)), pos(cur, nodeOf(st.path, cur)), st.prog); }
            ctx.globalAlpha = 1 - m;
            ctx.globalCompositeOperation = 'lighter'; halo(ctx, p[0], p[1], 26, H, 85, 66, 0.7); ctx.globalCompositeOperation = 'source-over';
            dot(ctx, p[0], p[1], 5, '#FFF6E4');
            ctx.globalAlpha = 1;
          }
          if (m > 0.01) {
            ctx.globalCompositeOperation = 'lighter';
            for (let k = 0; k < D; k++) for (let i = 0; i <= 6; i++) {
              const p = edgePt(pos(k, nodeOf(fate, k)), pos(k + 1, nodeOf(fate, k + 1)), i / 6);
              halo(ctx, p[0], p[1], 12, 42, 90, 80, 0.45 * m);
            }
            ctx.globalCompositeOperation = 'source-over';
          }
          // 时刻标签
          ctx.font = `11px ${FM}`; ctx.textAlign = 'left';
          const labels = ['此刻', '稍后', '更晚', '尽头'];
          for (let k = 0; k <= D; k++) {
            const y = pos(k, 0)[1] + 4;
            const isNow = k === cur;
            ctx.fillStyle = m > 0.5 ? api.hsl(H, 80, 80, 0.75) : isNow ? 'rgba(255,246,228,.85)' : 'rgba(162,173,196,.5)';
            ctx.fillText(m > 0.5 ? `t${k}` : (isNow ? '此刻' : k < cur ? '已过' : labels[Math.min(3, k - cur)]), 8, y);
          }
          if (m > 0.5) { ctx.textAlign = 'center'; ctx.font = `13px ${FSERIF}`; ctx.fillStyle = `rgba(232,236,245,${0.85 * m})`; ctx.fillText('所有时刻，同时可见', w / 2, 20); }
        });
        upd();

        await api.say(['物理学史上的第二个妖。麦克斯韦妖**知道一些**；拉普拉斯的妖**知道一切**。',
          '1814 年，拉普拉斯设想一个“智者”：知道推动自然的一切力、一切物体的位置，又有足够的能力分析它们。',
          '对它来说，没有什么不确定：未来和过去，都像现在一样呈现在眼前。']);
        api.hint('先做一个身在时间里的人：在岔路口选两次路。');
        await until(() => st.path.length >= 2 && st.prog >= 1);
        bOmni.hidden = false;
        api.hint('现在，点「全知视角」，像拉普拉斯妖那样看。');
        await until(() => st.omni);
        await api.wait(R ? 200 : 1200);
        await api.say(['所有时刻、所有地点同时呈现，像博尔赫斯《阿莱夫》里那个包含宇宙一切地点的闪光小球。',
          '岔路坍缩成了一条已知的线，你刚才的“选择”也早在画里。选择的按钮呢？不见了。',
          '埃金顿（Egginton）在《天使的精确性》里说：要认识一个东西，认知者就得和它隔着一点无法抹去的**距离**。',
          '选择发生在时间与空间之中，需要“此刻”与“稍后”。与世界完全重合的全知者，**什么也选不了**。']);
        api.collect('l10-laplace');
        api.hint('再点一次，回到时间里面。');
        await until(() => st.backFromOmni);
        await api.say(['回到时间里，岔路又出现了。选择，只对身处时间之中的存在者才有意义。',
          '提醒两点：这是哲学论证，相容论者会给出不同回答；量子随机也不等于自由，一个随机事件并不是一次选择。']);
        await api.quiz({
          kicker: '天使的精确性',
          q: '埃金顿借海森堡作比：认知与存在不可兼得。现代教科书里的 σx·σp ≥ ħ/2 说的是什么？',
          options: [
            { t: '测量仪器把电子撞歪了，所以测不准', why: '这是海森堡 1927 年“伽马射线显微镜”的图景，它把内在的不确定和测量造成的扰动混在了一起。' },
            { t: '**不存在**位置和动量同时都很确定的量子态，不管测不测', ok: true, why: '对。这是波的内在性质：一声极短的“啪”没有确定的音高。所以埃金顿的说法是富有启发的**哲学类比**，不是物理定理的推论。' },
            { t: '观察者的意识干扰了电子', why: '量子力学里的“观察”不需要意识；这条不等式说的是量子态本身。' },
          ],
        });
      }

      /* ================================================ 流程 */
      (async () => {
        api.progress(0, 4);
        await sceneDemon(); api.progress(1, 4);
        await sceneIIT(); api.progress(2, 4);
        await sceneSlits(); api.progress(3, 4);
        await sceneAleph(); api.progress(4, 4);
        api.complete({ summary: '观察可以免费，**遗忘才要付费**；量子力学里的“观察”是物理相互作用，不需要心灵；意识的困难问题仍然敞开；而知道一切的拉普拉斯妖，也许恰恰无法**选择**。' });
      })();

      return () => { if (cur) cur.end(); };
    },
  });
})();

/* 透镜群岛 · LENS 01 · 巴别 —— 语言首先为沟通服务吗（据 ch01）
 * 四个场景：一页（F 型阅读 / 注意力残留）→ 六棱晶体（雅各布森六功能）→ 咒语大厅（施行句 / 适切条件）→ 边界（维特根斯坦 / 瑟斯顿）。
 */
(function () {
  'use strict';

  const H = 356;
  const SERIF = '"Noto Serif SC","Songti SC","STSong",serif';
  const DISPLAY = '"ZCOOL XiaoWei","Noto Serif SC","Songti SC",serif';
  const MONO = '"IBM Plex Mono",ui-monospace,Menlo,monospace';

  const CARDS = [
    { id: 'l01-fpattern', title: 'F 型阅读', en: 'F-shaped reading pattern',
      body: '2006 年，尼尔森诺曼集团用眼动仪观察人们读网页：视线先横扫前一两行，再扫一行短的，然后沿左边一路往下瞟，热点图像个 **F**。这不是个人毛病，而是屏幕环境训练出的习惯。大脑本没有天生的阅读区，德阿纳认为阅读回路是“征用”识别物体与面孔的视觉区域**练**出来的，所以也会被最常做的读法重新塑形。',
      ref: 'Nielsen, F-Shaped Pattern for Reading Web Content, 2006；Dehaene, Reading in the Brain, 2009；Wolf, Reader, Come Home, 2018' },
    { id: 'l01-residue', title: '注意力残留', en: 'Attention residue',
      body: '管理学者勒罗伊（Sophie Leroy）发现：从任务 A 切换到任务 B 时，一部分注意力还挂在 A 上，B 的表现因此打折扣。深读之前那段“进入式”的热身，作用很可能就是清空残留。目前没有可靠证据表明手机会让人永久“降智”；习惯被环境塑造，也能重新训练，沃尔夫称之为“双重读写能力”。',
      ref: 'Leroy, Organizational Behavior and Human Decision Processes, 2009；Wolf, Reader, Come Home, 2018' },
    { id: 'l01-jakobson', title: '语言的六种功能', en: "Jakobson's functions of language",
      body: '雅各布森（Roman Jakobson）1960 年列出语言的六种功能：**指称**（所说的事物）、**表情**（说话人的情绪）、**意动**（让听者做点什么）、**寒暄**（保持联络本身）、**元语言**（谈论语言本身）、**诗性**（语言形式本身）。“沟通”即传递信息，主要只对应第一种。一句话常兼有几种功能，以最突出的那种为主。',
      ref: 'Jakobson, Closing Statement: Linguistics and Poetics, 1960' },
    { id: 'l01-perform', title: '施行句', en: 'Performative utterance',
      body: '奥斯汀（J. L. Austin）注意到，有些句子不是在**描述**世界，而是在**改变**世界：“我宣布会议开始”“我愿意”（婚礼上）“我道歉”“我打赌明天下雨”。说出它，就是在做那件事。施行句没有真假，只有成功或失败。魔法咒语可以看作它的极端版本：话一出口，世界随之改变。',
      ref: 'Austin, How to Do Things with Words, 1962' },
    { id: 'l01-felicity', title: '适切条件', en: 'Felicity conditions',
      body: '施行句要生效，得由**恰当的人**在**恰当的场合**说出。不是主持人的人说“我宣布会议开始”，会议并不会开始；不在婚礼上说“我愿意”，什么关系也不会改变。这时句子不是“假”了，而是**失灵**了。评价施行句，不问真不真，只问成没成。',
      ref: 'Austin, How to Do Things with Words, 1962' },
    { id: 'l01-limits', title: '语言的界限', en: 'Tractatus 5.6 & 7',
      body: '维特根斯坦《逻辑哲学论》5.6：“我的语言的界限意味着我的世界的界限。”7：“对于不可说的东西，必须保持沉默。”他还区分了“可说”与“可显示”。注意：这里的“语言”指一般意义上描述事实的命题系统，其界限是**逻辑**的界限，而不是“会几门外语”。“多学外语就拓宽世界”是引申，不是原意。',
      ref: 'Wittgenstein, Tractatus Logico-Philosophicus, 1922' },
    { id: 'l01-proof', title: '证明与理解', en: 'On proof and progress',
      body: '瑟斯顿（William Thurston）1994 年写道：数学家追求的不是证明了多少定理，而是**人类对数学的理解**。另一派认为数学的本质是**正确性**：能被 Lean 这类证明助手逐行检验的形式化证明，即使没人能把握全貌，也是可靠的知识。形式化绝对可靠，代价是篇幅可能膨胀几十倍，思路也更难看出。',
      ref: 'Thurston, On Proof and Progress in Mathematics, 1994' },
  ];

  const CSS = `
.l01-wrap{max-width:880px;margin:0 auto;padding-top:14px;overflow-x:clip}
.l01-scene{display:grid;gap:14px;animation:l01-in .8s cubic-bezier(.2,.7,.2,1) both}
@keyframes l01-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.l01-head{display:grid;gap:4px}
.l01-kick{font-family:var(--f-mono);font-size:11px;letter-spacing:.24em;color:hsl(var(--hue) 70% 72%);text-transform:uppercase}
.l01-title{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(26px,5.2vw,38px);line-height:1.12;letter-spacing:.05em;text-shadow:0 0 30px hsl(var(--hue) 85% 62% / .25)}
.l01-status{min-height:1.75em;font-family:var(--f-serif);font-size:15px;line-height:1.7;color:var(--text);text-align:center;text-wrap:balance;max-width:620px;margin:0 auto}
.l01-status b{color:hsl(var(--hue) 85% 74%);font-weight:600}
.l01-status.bad b{color:var(--bad)}
.l01-frame{position:relative;border-radius:20px;overflow:hidden;border:1px solid hsl(var(--hue) 60% 60% / .14);
  background:radial-gradient(120% 90% at 50% 0%,hsl(var(--hue) 45% 13% / .5),rgba(5,8,15,.55) 62%,rgba(5,8,15,.82));box-shadow:inset 0 0 70px rgba(0,0,0,.55)}
.l01-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;min-height:46px}
.l01-bar{position:relative;height:3px;border-radius:2px;background:rgba(255,255,255,.07);max-width:620px;width:100%;margin:0 auto;overflow:hidden}
.l01-bar i{position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,hsl(var(--hue) 80% 55%),var(--beam));box-shadow:0 0 10px hsl(var(--hue) 85% 62%);transition:width .25s}
.l01-page{max-width:620px;width:100%;margin:0 auto}
.l01-crys{width:min(100%,460px);margin:0 auto}
.l01-tray{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:720px;margin:0 auto;min-height:44px}
.l01-shard{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;min-height:44px;padding:8px 14px;border-radius:12px;cursor:grab;
  border:1px solid hsl(var(--hue) 70% 70% / .32);background:linear-gradient(160deg,hsl(var(--hue) 50% 22% / .55),rgba(10,14,26,.75));
  font-family:var(--f-serif);font-size:15px;line-height:1.4;color:var(--text);box-shadow:0 0 18px hsl(var(--hue) 85% 62% / .08);
  transition:transform .4s cubic-bezier(.2,.8,.2,1),opacity .45s,box-shadow .3s,border-color .3s}
.l01-shard.drag{transition:none;z-index:30;cursor:grabbing;box-shadow:0 0 28px hsl(var(--hue) 85% 62% / .55);border-color:hsl(var(--hue) 85% 72%)}
.l01-shard.sel{border-color:hsl(var(--hue) 85% 74%);box-shadow:0 0 0 2px hsl(var(--hue) 85% 62% / .45),0 0 24px hsl(var(--hue) 85% 62% / .35)}
.l01-shard.gone{opacity:0;pointer-events:none}
.l01-compose{display:grid;gap:10px;max-width:720px;width:100%;margin:0 auto}
.l01-rowl{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:center}
.l01-lbl{font-family:var(--f-mono);font-size:11px;letter-spacing:.18em;color:var(--dim);white-space:nowrap}
.l01-picks{display:flex;flex-wrap:wrap;gap:8px}
.l01-pick{min-height:42px;padding:6px 14px;border-radius:999px;border:1px solid var(--line-strong);background:rgba(255,255,255,.03);cursor:pointer;
  font-family:var(--f-serif);font-size:15px;transition:border-color .2s,background .2s,box-shadow .2s}
.l01-pick:hover{border-color:hsl(var(--hue) 80% 70% / .7)}
.l01-pick[aria-pressed="true"]{border-color:hsl(var(--hue) 85% 70%);background:hsl(var(--hue) 80% 55% / .18);box-shadow:0 0 18px hsl(var(--hue) 85% 62% / .3)}
.l01-utter{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:6px 0}
.l01-utter q{font-family:var(--f-serif);font-size:17px;color:var(--text);quotes:"“" "”"}
.l01-utter .btn[disabled]{opacity:.38;cursor:default;box-shadow:none}
.l01-utter .who{font-family:var(--f-mono);font-size:12px;color:var(--dim);letter-spacing:.08em}
.l01-proof{display:grid;gap:12px;max-width:720px;width:100%;margin:0 auto}
.l01-gauges{display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;align-items:end}
.l01-gauge{display:grid;gap:5px}
.l01-gauge span{font-size:12px;color:var(--dim);display:flex;justify-content:space-between;gap:8px}
.l01-gauge span em{font-style:normal;font-family:var(--f-mono);color:var(--text)}
.l01-gauge .l01-bar{max-width:none}
.l01-gauge.cold .l01-bar i{background:linear-gradient(90deg,rgba(170,190,230,.5),var(--beam));box-shadow:none}
.l01-steps{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.l01-step{display:grid;grid-template-columns:30px 1fr auto;gap:10px;align-items:center;padding:8px 10px 8px 12px;border-radius:12px;
  border:1px solid var(--line);background:rgba(255,255,255,.025);font-family:var(--f-serif);font-size:15px;line-height:1.5}
.l01-step.new{animation:l01-step .6s ease both}
@keyframes l01-step{from{opacity:0;transform:translateX(-8px);background:hsl(var(--hue) 80% 55% / .2)}to{opacity:1;transform:none}}
.l01-step .no{font-family:var(--f-mono);font-size:11px;color:var(--faint)}
.l01-step .why{font-family:var(--f-mono);font-size:11px;color:hsl(var(--hue) 50% 72%);white-space:nowrap}
.l01-step b{color:hsl(var(--hue) 85% 74%);font-weight:600}
.l01-exp{min-width:44px;min-height:40px;padding:0 12px;border-radius:999px;border:1px solid hsl(var(--hue) 80% 66% / .6);background:hsl(var(--hue) 80% 55% / .12);
  color:var(--text);cursor:pointer;font-size:13px;white-space:nowrap;box-shadow:0 0 14px hsl(var(--hue) 85% 62% / .25);animation:l01-pulse 2.4s ease-in-out infinite}
.l01-exp:hover{background:hsl(var(--hue) 80% 55% / .24)}
@keyframes l01-pulse{50%{box-shadow:0 0 22px hsl(var(--hue) 85% 62% / .5)}}
@media (max-width:560px){
  .l01-rowl{grid-template-columns:1fr}
  .l01-gauges{grid-template-columns:1fr}
  .l01-step{grid-template-columns:24px 1fr auto;font-size:14px;gap:8px}
  .l01-step .why{grid-column:2;grid-row:2;white-space:normal}
  .l01-shard{font-size:14px;padding:8px 12px}
}
@media (prefers-reduced-motion:reduce){.l01-exp{animation:none}}
`;

  function mount(root, api) {
    const { el, fmt, clamp, lerp } = api;
    const R = api.reduced;
    api.css(CSS);
    const wrap = el('div', { class: 'l01-wrap' });
    root.append(wrap);

    /* ---------------------------------------------------------------- helpers */
    let stops = [];
    const now = () => performance.now();
    const ease = x => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3));
    const tw = (t0, dur) => (t0 < 0 ? 0 : R ? 1 : ease((now() - t0) / dur));
    const hsla = (h, s, l, a) => `hsla(${h},${s}%,${l}%,${a})`;
    const TAU = Math.PI * 2;

    function endScene() { stops.forEach(f => { try { f(); } catch (e) { /* ignore */ } }); stops = []; }
    function scene(i, kicker, title) {
      endScene();
      wrap.replaceChildren();
      api.progress(i, 4);
      const s = el('section', { class: 'l01-scene' },
        el('div', { class: 'l01-head' },
          el('div', { class: 'l01-kick', text: `Scene ${i + 1} / 4 · ${kicker}` }),
          el('h2', { class: 'l01-title', text: title })));
      wrap.append(s);
      root.scrollTop = 0;
      return s;
    }
    // A canvas that redraws every frame (or, with reduced motion, only when kicked / resized).
    function art(parent, style, draw) {
      let v = null, queued = false;
      const once = () => { if (queued) return; queued = true; api.raf(t => { queued = false; if (v) draw(v, t, 16); return false; }); };
      v = api.canvas(parent, { class: 'l01-cv', style, onResize: () => { if (R) once(); } });
      if (R) once(); else stops.push(api.raf((t, dt) => { draw(v, t, dt); }));
      v.kick = R ? once : () => {};
      return v;
    }
    const local = (v, e) => { const r = v.canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    function pointer(target, h) {
      let id = null;
      api.listen(target, 'pointerdown', e => {
        if (id !== null) return; id = e.pointerId;
        try { target.setPointerCapture(id); } catch (_) { /* ignore */ }
        h.down && h.down(e);
      });
      api.listen(target, 'pointermove', e => { if (e.pointerId === id && h.move) h.move(e); });
      const end = e => { if (e.pointerId !== id) return; id = null; h.up && h.up(e, e.type === 'pointercancel'); };
      api.listen(target, 'pointerup', end);
      api.listen(target, 'pointercancel', end);
    }
    function press(parent, text, cls) {
      return new Promise(res => {
        const b = el('button', { class: 'btn ' + (cls || 'hue'), type: 'button', text });
        api.listen(b, 'click', () => { b.disabled = true; b.remove(); res(); });
        parent.append(b);
      });
    }
    const setStatus = (node, html, bad) => { node.innerHTML = fmt(html); node.classList.toggle('bad', !!bad); };

    /* ================================================================ Scene 1 · 一页 */
    async function sceneReading() {
      const s = scene(0, '一页', '读不进去的那一页');
      const frame = el('div', { class: 'l01-frame l01-page' });
      const bar = el('div', { class: 'l01-bar', 'aria-hidden': 'true' }, el('i'));
      const status = el('div', { class: 'l01-status', 'aria-live': 'polite' });
      const acts = el('div', { class: 'l01-actions' });
      s.append(frame, bar, status, acts);
      bar.style.visibility = 'hidden';

      const TEXT = '人类大脑里没有天生的“阅读区”。文字只有五千多年历史，进化来不及为它造一个器官。学会阅读时，大脑把原本用来识别物体和面孔的视觉区域征用过来，改造成识别字形的回路。既然阅读回路是练出来的，它也会被我们最常做的阅读方式重新塑形：天天扫读，扫读就越熟练；长期不读长文，深读就会生疏。';
      const NOSTART = /[，。；：、”）！？]/;
      let lay = null;
      function layout(ctx, w, h) {
        const key = w + 'x' + h + (document.fonts ? document.fonts.status : '');
        if (lay && lay.key === key) return lay;
        const fs = w < 420 ? 15 : 17, lh = Math.round(fs * 1.9), pad = w < 420 ? 20 : 32;
        ctx.font = `${fs}px ${SERIF}`;
        const maxW = w - pad * 2, lines = [];
        let cur = '';
        for (const ch of TEXT) {
          const t = cur + ch;
          if (cur && ctx.measureText(t).width > maxW && !NOSTART.test(ch)) { lines.push(cur); cur = ch; } else cur = t;
        }
        if (cur) lines.push(cur);
        const top = Math.max(pad, (h - lines.length * lh) / 2) + lh / 2;
        const L = pad, Rr = w - pad, ys = lines.map((_, i) => top + i * lh), pts = [];
        const seg = (x0, y0, x1, y1, a) => {
          const k = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) / 10));
          for (let i = 0; i <= k; i++) pts.push({ x: lerp(x0, x1, i / k), y: lerp(y0, y1, i / k), a });
        };
        const n = lines.length, y = i => ys[clamp(i, 0, n - 1)], i3 = clamp(3, 2, Math.max(2, n - 2));
        seg(L, y(0), Rr, y(0), 1);                              // 第一道横：前一两行
        seg(L, y(1), L + (Rr - L) * 0.85, y(1), 0.85);
        seg(L, y(i3), L + (Rr - L) * 0.42, y(i3), 0.7);         // 第二道横：短一些
        seg(L + 10, y(i3), L + 10, y(n - 1) + lh * 0.3, 0.5);   // 竖：沿左边往下瞟
        lay = { key, fs, lh, L, lines, ys, pts };
        return lay;
      }

      let phase = 'heat', heatT0 = -1, heatFade = -1, resT0 = -1, total = 0, cleared = 0, doneRes = null;
      const parts = [];
      const pen = { on: false, x: 0, y: 0, t: 0, spd: 0 };
      const SLOW = 0.7; // px / ms

      const v = art(frame, 'display:block;width:100%;height:clamp(300px,52vh,420px);touch-action:none;cursor:crosshair', draw);

      function spawn() {
        total = Math.round(clamp((v.w * v.h) / 1300, 80, 170));
        // 残留只落在字行上：沿着每一行慢慢划过去，就能把它们清掉
        const ly = lay, n = ly ? ly.lines.length : 0;
        let widths = [];
        if (n) { v.ctx.font = `${ly.fs}px ${SERIF}`; widths = ly.lines.map(s => v.ctx.measureText(s).width); }
        for (let i = 0; i < total; i++) {
          let nx = Math.random(), ny = Math.random();
          if (n) {
            const li = (Math.random() * n) | 0;
            const x = ly.L + Math.random() * Math.max(ly.lh, widths[li]);
            const y = ly.ys[li] + (Math.random() - 0.5) * ly.lh * 0.8;
            nx = x / v.w; ny = y / v.h;
          }
          parts.push({ nx, ny, ox: 0, oy: 0, vx: 0, vy: 0, k: (Math.random() * 3) | 0,
            s: 4 + Math.random() * 9, ph: Math.random() * TAU, sp: 0.4 + Math.random(), rot: (Math.random() - 0.5) * 0.7, dying: false, f: 0 });
        }
      }
      function radius() { return Math.max(40, lay ? lay.lh * 1.5 : 44); }
      function touch(x, y) {
        const { w, h } = v, rad = radius(), slow = pen.spd < SLOW;
        for (const p of parts) {
          if (p.dying) continue;
          const dx = p.nx * w + p.ox - x, dy = p.ny * h + p.oy - y, d = Math.hypot(dx, dy);
          if (d > rad) continue;
          if (slow) { p.dying = true; p.f = R ? 1 : 0.001; cleared++; }
          else {
            const k = (1 - d / rad) * 2.4, ux = dx / (d || 1), uy = dy / (d || 1);
            if (R) { p.ox += ux * k * 14; p.oy += uy * k * 14; } else { p.vx += ux * k; p.vy += uy * k; }
          }
        }
        const c = total ? cleared / total : 0;
        bar.firstChild.style.width = Math.min(100, (c / 0.7) * 100).toFixed(1) + '%';
        if (c >= 0.7 && doneRes) {
          const r = doneRes; doneRes = null;
          parts.forEach(p => { if (!p.dying) { p.dying = true; p.f = R ? 1 : 0.001; } });
          cleared = total; r();
        }
      }
      pointer(v.canvas, {
        down(e) { const p = local(v, e); Object.assign(pen, { on: true, x: p.x, y: p.y, t: now(), spd: 0 }); v.kick(); },
        move(e) {
          const p = local(v, e), t = now(), dt = Math.max(8, t - pen.t);
          pen.spd = pen.spd * 0.55 + (Math.hypot(p.x - pen.x, p.y - pen.y) / dt) * 0.45;
          pen.x = p.x; pen.y = p.y; pen.t = t;
          if (phase === 'residue') touch(p.x, p.y);
          v.kick();
        },
        up() { pen.on = false; v.kick(); },
      });

      function draw(v, t, dt) {
        const { ctx, w, h } = v, ly = layout(ctx, w, h);
        ctx.clearRect(0, 0, w, h);
        // 眼动热点
        if (phase === 'heat' && heatT0 >= 0) {
          const p = R ? 1 : clamp((now() - heatT0) / 3600, 0, 1), fade = heatFade < 0 ? 1 : 1 - tw(heatFade, 1200);
          if (fade > 0) {
            const k = Math.floor(p * ly.pts.length), r = ly.lh * 0.95;
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < k; i++) {
              const q = ly.pts[i], g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, r);
              g.addColorStop(0, hsla(H, 92, 58, 0.13 * q.a * fade)); g.addColorStop(1, hsla(H, 92, 45, 0));
              ctx.fillStyle = g; ctx.fillRect(q.x - r, q.y - r, r * 2, r * 2);
            }
            if (p < 1 && k > 0) {
              const q = ly.pts[k - 1], g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, 16);
              g.addColorStop(0, 'rgba(255,246,228,.9)'); g.addColorStop(1, 'rgba(255,246,228,0)');
              ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, 16, 0, TAU); ctx.fill();
            }
            ctx.restore();
          }
        }
        // 深读之光
        if (phase === 'clear') {
          const a = tw(resT0, 1500) * 0.16, g = ctx.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, Math.max(w, h) * 0.7);
          g.addColorStop(0, `rgba(255,240,220,${a})`); g.addColorStop(1, 'rgba(255,240,220,0)');
          ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        }
        // 文字
        const c = total ? Math.min(1, cleared / total / 0.7) : 0;
        const ta = phase === 'heat' ? 0.5 : phase === 'residue' ? 0.12 + 0.8 * c : 0.95;
        ctx.font = `${ly.fs}px ${SERIF}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
        ctx.fillStyle = `rgba(244,238,228,${ta})`;
        ly.lines.forEach((s, i) => ctx.fillText(s, ly.L, ly.ys[i]));
        // 残留
        if (parts.length) {
          const intro = tw(resT0, 1400);
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
          for (const p of parts) {
            if (p.dying) { if (!R) p.f += dt / 650; if (p.f >= 1) continue; }
            if (!R) { p.ox += p.vx; p.oy += p.vy; p.vx *= 0.9; p.vy *= 0.9; p.ox *= 0.985; p.oy *= 0.985; }
            const x = p.nx * w + p.ox + (R ? 0 : Math.sin(t * 0.0011 * p.sp + p.ph) * 5);
            const y = p.ny * h + p.oy + (R ? 0 : Math.cos(t * 0.0009 * p.sp + p.ph) * 4) + (1 - intro) * h * 0.6 - (p.dying ? p.f * 14 : 0);
            const a = (p.dying ? 1 - p.f : 1) * intro * (R ? 0.5 : 0.32 + 0.3 * Math.sin(t * 0.003 * p.sp + p.ph) ** 2);
            const col = hsla(H + (p.k - 1) * 8, 88, 64, a);
            if (p.k === 0) {
              const L2 = p.s * 0.9, cx = Math.cos(p.rot) * L2, sy = Math.sin(p.rot) * L2;
              ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x - cx, y - sy); ctx.lineTo(x + cx, y + sy); ctx.stroke();
            } else if (p.k === 1) {
              ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.strokeRect(x - p.s * 0.7, y - p.s * 0.45, p.s * 1.4, p.s * 0.9);
            } else {
              ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 1 + p.s * 0.18, 0, TAU); ctx.fill();
            }
          }
          ctx.restore();
        }
        // 读灯
        if (phase === 'residue' && pen.on) {
          if (now() - pen.t > 60) pen.spd *= 0.85;
          const fast = pen.spd >= SLOW, rad = radius(), g = ctx.createRadialGradient(pen.x, pen.y, 0, pen.x, pen.y, rad);
          g.addColorStop(0, fast ? hsla(H, 90, 60, 0.22) : 'rgba(255,246,228,.2)'); g.addColorStop(1, 'rgba(255,246,228,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(pen.x, pen.y, rad, 0, TAU); ctx.fill();
          if (fast) {
            ctx.font = `12px ${SERIF}`; ctx.textAlign = 'center'; ctx.fillStyle = hsla(H, 85, 74, 0.9);
            ctx.fillText('慢一点', pen.x, Math.max(12, pen.y - rad - 4));
          }
        }
      }

      // —— 流程
      setStatus(status, '这一页，你会怎么读？');
      if (!api.replay) await api.say('先别急着读。看看大多数人在屏幕上，是怎么“读”一页字的。');
      else await api.say('先看看，屏幕前的眼睛是怎么走的。');
      api.hush();
      await press(acts, '回放眼动记录', 'hue');
      heatT0 = now(); api.sfx('whoosh'); v.kick();
      setStatus(status, '眼动仪记录的网页阅读热点（示意）');
      await api.wait(R ? 300 : 4200);
      await api.say('视线先横扫前一两行，再扫一行短的，然后沿左边一路往下瞟——像个 **F**。');
      api.collect('l01-fpattern');
      await api.say('这不是谁的毛病，是屏幕训练出来的习惯。阅读回路本来就是**练**出来的，读法也会反过来塑造它。');
      heatFade = now(); v.kick();
      await api.say('现在，假设你刚刷完一串短视频。上一件事留下的东西，还在眼前晃。');
      const cleanDone = new Promise(res => { doneRes = res; });
      phase = 'residue'; spawn(); resT0 = now(); bar.style.visibility = ''; api.sfx('whoosh'); v.kick();
      api.hush();
      setStatus(status, '**按住**，沿着字行**慢慢**划过去。太快，它们只会被搅起来。');
      await cleanDone;
      phase = 'clear'; resT0 = now(); api.sfx('ok'); v.kick();
      setStatus(status, '字，回来了。');
      await api.wait(R ? 200 : 900);
      await api.say('读长文前那段“热身”，作用很可能就是清空上一件事的**注意力残留**。');
      api.collect('l01-residue');
      await api.say('好消息：没有可靠证据说手机会让人永久“降智”。习惯是环境塑造的，也就能重新训练。');
    }

    /* ================================================================ Scene 2 · 六棱晶体 */
    const FUN = [
      { n: '指称', f: '所说的事物' }, { n: '表情', f: '说话人的情绪' }, { n: '意动', f: '让听者做点什么' },
      { n: '寒暄', f: '保持联络本身' }, { n: '元语言', f: '谈论语言本身' }, { n: '诗性', f: '语言形式本身' },
    ];
    async function sceneCrystal() {
      const s = scene(1, '六棱晶体', '一句话，六个面');
      const box = el('div', { class: 'l01-crys' });
      const status = el('div', { class: 'l01-status', 'aria-live': 'polite' });
      const tray = el('div', { class: 'l01-tray' });
      s.append(box, status, tray);
      const SHARDS = [
        { t: '海平面上，水在一百摄氏度沸腾。', k: 0, hint: '它在讲**世界上的一件事**，可以去核实。' },
        { t: '哎呀，疼死我了！', k: 1, hint: '它主要在流露**说话人自己**的感受。' },
        { t: '把窗户关上。', k: 2, hint: '它想让听的人**做点什么**。' },
        { t: '喂？能听到吗？', k: 3, hint: '它不传递新信息，只是确认**线路还通着**。' },
        { t: '“青”在这里是什么意思？', k: 4, hint: '它在用语言**谈论语言**。' },
        { t: '床前明月光，疑是地上霜。', k: 5, hint: '它让人留意的，是**语言的形式**本身：节奏与声音。' },
      ];
      const litT = [-1, -1, -1, -1, -1, -1], flashT = [-1, -1, -1, -1, -1, -1];
      let hover = -1, sel = null, allT = -1, nLit = 0, solve = null;
      const solved = new Promise(res => { solve = res; });

      const v = art(box, 'display:block;width:100%;height:min(calc(100vw - 32px),460px)', draw);
      const geo = () => ({ cx: v.w / 2, cy: v.h / 2, r: Math.min(v.w, v.h) * 0.4 });
      const vert = (g, k) => { const a = (-90 + 60 * k) * Math.PI / 180; return [g.cx + g.r * Math.cos(a), g.cy + g.r * Math.sin(a)]; };
      function facetClient(e) {
        const p = local(v, e), g = geo(), dx = p.x - g.cx, dy = p.y - g.cy;
        if (Math.hypot(dx, dy) > g.r * 1.2) return -1;
        const rel = ((Math.atan2(dy, dx) * 180 / Math.PI + 90) % 360 + 360) % 360;
        return Math.floor(rel / 60) % 6;
      }

      function draw(v, t) {
        const { ctx, w, h } = v, g = geo();
        ctx.clearRect(0, 0, w, h);
        const breathe = R ? 1 : 0.86 + 0.14 * Math.sin(t * 0.0012), all = tw(allT, 1800);
        // 光束与光晕（加法混合）
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
        const halo = ctx.createRadialGradient(g.cx, g.cy, g.r * 0.2, g.cx, g.cy, g.r * 1.6);
        halo.addColorStop(0, hsla(H, 85, 55, 0.08 + 0.16 * nLit / 6 + 0.2 * all)); halo.addColorStop(1, hsla(H, 85, 40, 0));
        ctx.fillStyle = halo; ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 6; i++) {
          const L = tw(litT[i], 1000); if (L <= 0) continue;
          const a = (-60 + 60 * i) * Math.PI / 180, ex = Math.cos(a), ey = Math.sin(a);
          const x0 = g.cx + ex * g.r * 0.86, y0 = g.cy + ey * g.r * 0.86, len = Math.max(w, h) * 0.8;
          const gr = ctx.createLinearGradient(x0, y0, x0 + ex * len, y0 + ey * len);
          gr.addColorStop(0, hsla(H, 90, 68, 0.3 * L * breathe)); gr.addColorStop(1, hsla(H, 90, 60, 0));
          ctx.strokeStyle = gr; ctx.lineWidth = 8 + 16 * all;
          ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + ex * len, y0 + ey * len); ctx.stroke();
          ctx.lineWidth = 1.4; ctx.stroke();
        }
        ctx.restore();
        // 六个面
        for (let i = 0; i < 6; i++) {
          const A = vert(g, i), B = vert(g, i + 1), L = tw(litT[i], 1000);
          const am = (-60 + 60 * i) * Math.PI / 180, mx = g.cx + Math.cos(am) * g.r * 0.866, my = g.cy + Math.sin(am) * g.r * 0.866;
          ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.lineTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.closePath();
          const shade = i % 2 ? 0 : 4, gr = ctx.createLinearGradient(g.cx, g.cy, mx, my);
          gr.addColorStop(0, hsla(H, 30 + 35 * L, 8 + shade + 36 * L, 0.55 + 0.35 * L));
          gr.addColorStop(1, hsla(H, 40 + 45 * L, 14 + shade + 42 * L, 0.62 + 0.3 * L));
          ctx.fillStyle = gr; ctx.fill();
          if (hover === i) { ctx.fillStyle = 'rgba(255,246,228,.11)'; ctx.fill(); }
          const fl = flashT[i] < 0 ? 0 : 1 - (now() - flashT[i]) / 650;
          if (fl > 0) { ctx.fillStyle = `rgba(255,140,140,${0.24 * fl * (R ? 1 : 0.6 + 0.4 * Math.sin(now() * 0.06))})`; ctx.fill(); }
          ctx.strokeStyle = hsla(H, 70, 72 + 18 * L, (0.2 + 0.5 * L) * breathe + (hover === i ? 0.25 : 0)); ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.beginPath();
        for (let k = 0; k <= 6; k++) { const p = vert(g, k); k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
        ctx.strokeStyle = hsla(H, 80, 82, 0.4 + 0.4 * all); ctx.lineWidth = 1.4; ctx.stroke();
        // 文字
        const small = g.r < 160;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let i = 0; i < 6; i++) {
          const L = tw(litT[i], 1000), am = (-60 + 60 * i) * Math.PI / 180, lr = g.r * 0.58;
          const x = g.cx + Math.cos(am) * lr, y = g.cy + Math.sin(am) * lr;
          ctx.font = `${small ? 16 : 19}px ${DISPLAY}`;
          ctx.fillStyle = L > 0 ? `rgba(255,246,236,${0.78 + 0.22 * L})` : 'rgba(232,236,245,.74)';
          ctx.fillText(FUN[i].n, x, y - (small ? 8 : 10));
          ctx.font = `${small ? 10.5 : 12}px ${SERIF}`;
          ctx.fillStyle = L > 0 ? hsla(H, 80, 88, 0.92) : 'rgba(162,173,196,.66)';
          ctx.fillText(FUN[i].f, x, y + (small ? 9 : 11));
        }
        // 核心
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const cr = (4 + 8 * nLit / 6 + 12 * all) * 3, cg = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, cr);
        cg.addColorStop(0, 'rgba(255,246,228,.95)'); cg.addColorStop(0.3, hsla(H, 90, 70, 0.45)); cg.addColorStop(1, hsla(H, 90, 60, 0));
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(g.cx, g.cy, cr, 0, TAU); ctx.fill();
        ctx.restore();
      }

      function select(item) {
        if (sel) sel.b.classList.remove('sel');
        sel = item;
        if (sel) { sel.b.classList.add('sel'); setStatus(status, '现在，点晶体上的一面。'); }
      }
      function judge(item, f) {
        if (item.k === f) {
          api.sfx('ok'); litT[f] = now(); nLit++;
          item.b.classList.add('gone'); item.b.disabled = true;
          api.timeout(() => item.b.remove(), 480);
          setStatus(status, `**${FUN[f].n}**：关注${FUN[f].f}。`);
          if (nLit === 6 && solve) { const r = solve; solve = null; api.timeout(r, R ? 100 : 700); }
        } else {
          api.sfx('bad'); flashT[f] = now(); item.b.style.transform = '';
          setStatus(status, `不太像“${FUN[f].n}”。${item.hint}`);
          if (R) api.timeout(() => v.kick(), 700);
        }
        v.kick();
      }
      SHARDS.slice().sort(() => Math.random() - 0.5).forEach(item => {
        const b = el('button', { class: 'l01-shard', type: 'button', text: item.t });
        item.b = b; tray.append(b);
        let sx = 0, sy = 0, drag = false;
        pointer(b, {
          down(e) { sx = e.clientX; sy = e.clientY; drag = false; },
          move(e) {
            const dx = e.clientX - sx, dy = e.clientY - sy;
            if (!drag && Math.hypot(dx, dy) > 6) { drag = true; b.classList.add('drag'); select(null); }
            if (drag) {
              b.style.transform = `translate(${dx}px,${dy}px) scale(1.04)`;
              const f = facetClient(e); if (f !== hover) { hover = f; v.kick(); }
            }
          },
          up(e, cancel) {
            if (drag) {
              drag = false; b.classList.remove('drag');
              const f = cancel ? -1 : facetClient(e); hover = -1; v.kick();
              if (f >= 0) judge(item, f); else b.style.transform = '';
            } else if (!cancel) { api.sfx('select'); select(sel === item ? null : item); }
          },
        });
        api.listen(b, 'click', e => { if (e.detail === 0) select(sel === item ? null : item); }); // 键盘
      });
      api.listen(v.canvas, 'click', e => { if (!sel) return; const f = facetClient(e); if (f >= 0) { const it = sel; select(null); judge(it, f); } });
      api.listen(v.canvas, 'pointermove', e => { if (e.pointerType !== 'mouse') return; const f = sel ? facetClient(e) : -1; if (f !== hover) { hover = f; v.kick(); } });
      api.listen(v.canvas, 'pointerleave', () => { if (hover !== -1) { hover = -1; v.kick(); } });

      // —— 流程
      if (!api.replay) await api.say('语言首先为沟通服务吗？先别急着回答。看这颗晶体：它有六个面。');
      await api.say('语言学家雅各布森（Roman Jakobson）说，语言有六种**功能**。把句子送进它最主要的那一面。');
      api.hush();
      if (!nLit && !sel && !status.textContent) setStatus(status, '把句子**拖**到晶体的一面；也可以先点句子，再点那一面。');
      await solved;
      allT = now(); api.sfx('chime'); setStatus(status, '六面全亮。'); v.kick();
      await api.wait(R ? 200 : 1400);
      await api.say('一句话常常兼有几种功能。刚才你找的，是其中**最突出**的那一种。');
      await api.quiz({
        q: '“沟通”，也就是把信息传给别人，主要对应哪一面？',
        options: [
          { t: '寒暄', why: '寒暄几乎不传递新信息，它维持的是“我们还连着”的感觉。' },
          { t: '指称', ok: true, why: '对。指称功能关注**所说的事物**，把关于世界的信息传过去。' },
          { t: '元语言', why: '元语言是在谈论语言本身。' },
          { t: '诗性', why: '诗性关注的是语言的**形式**本身。' },
        ],
      });
      await api.say('六面里，只有一面在“传递信息”。语言首先为沟通服务吗？**不止于此**。');
      api.collect('l01-jakobson');
    }

    /* ================================================================ Scene 3 · 咒语大厅 */
    async function sceneHall() {
      const s = scene(2, '咒语大厅', '有些话，会改变世界');
      const frame = el('div', { class: 'l01-frame' });
      const status = el('div', { class: 'l01-status', 'aria-live': 'polite' });
      const comp = el('div', { class: 'l01-compose' });
      s.append(frame, status, comp);
      const WHO = [{ t: '会议主持人', k: 'host' }, { t: '路人', k: 'pass' }, { t: '婚礼上的新人', k: 'wed' }];
      const WHAT = [
        { t: '我宣布会议开始。', lamp: 0, need: 'host' },
        { t: '他宣布会议开始了。', desc: true },
        { t: '我愿意。', lamp: 1, need: 'wed' },
        { t: '我道歉。', lamp: 2, need: null },
      ];
      const LAMPS = [{ n: '会议开始', fx: '会议就开始了。' }, { n: '结为夫妻', fx: '两个人的法律关系就变了。' }, { n: '道歉成立', fx: '道歉就已经作出了。' }];
      const lit = [-1, -1, -1], fizz = [-1, -1, -1], embers = [];
      let fly = null, descT = -1, who = null, what = null, busy = false, misfired = false, described = false, finish = null;
      const finished = new Promise(res => { finish = res; });

      const v = art(frame, 'display:block;width:100%;height:clamp(210px,34vh,290px)', draw);
      function lampPos(i) {
        const { w, h } = v, floor = h * 0.84, aw = Math.min(w * 0.24, 130), ah = h * 0.66, top = floor - ah;
        return { x: w * (0.2 + 0.3 * i), floor, aw, ah, top, ly: top + ah * 0.42 };
      }
      function arch(ctx, x, y, w, h) {
        const r = w / 2;
        ctx.beginPath(); ctx.moveTo(x, y + h); ctx.lineTo(x, y + r); ctx.arc(x + r, y + r, r, Math.PI, 0); ctx.lineTo(x + w, y + h);
      }
      function draw(v, t, dt) {
        const { ctx, w, h } = v;
        ctx.clearRect(0, 0, w, h);
        const fl = h * 0.84, fg = ctx.createLinearGradient(0, 0, w, 0);
        fg.addColorStop(0, 'rgba(190,206,240,0)'); fg.addColorStop(0.5, 'rgba(190,206,240,.22)'); fg.addColorStop(1, 'rgba(190,206,240,0)');
        ctx.strokeStyle = fg; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, fl); ctx.lineTo(w, fl); ctx.stroke();
        for (let i = 0; i < 3; i++) {
          const p = lampPos(i), L = tw(lit[i], 1200);
          let I = L;
          const fz = fizz[i] < 0 ? 1e9 : now() - fizz[i];
          if (L === 0 && fz < 1000) I = R ? 0.2 : Math.max(0, Math.sin(fz * 0.045) * Math.sin(fz * 0.013 + 1)) * (1 - fz / 1000) * 0.9;
          if (I > 0) {
            ctx.save(); ctx.globalCompositeOperation = 'lighter';
            const rg = ctx.createRadialGradient(p.x, p.ly, 0, p.x, p.ly, p.aw * 1.25);
            rg.addColorStop(0, `rgba(255,246,228,${0.55 * I})`); rg.addColorStop(0.25, hsla(H, 90, 62, 0.35 * I)); rg.addColorStop(1, hsla(H, 90, 50, 0));
            ctx.fillStyle = rg; ctx.fillRect(p.x - p.aw * 1.3, p.ly - p.aw * 1.3, p.aw * 2.6, p.aw * 2.6);
            const cg = ctx.createLinearGradient(0, p.ly, 0, fl);
            cg.addColorStop(0, hsla(H, 90, 70, 0.22 * I)); cg.addColorStop(1, hsla(H, 90, 60, 0.04 * I));
            ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(p.x - 5, p.ly); ctx.lineTo(p.x + 5, p.ly); ctx.lineTo(p.x + p.aw * 0.46, fl); ctx.lineTo(p.x - p.aw * 0.46, fl); ctx.closePath(); ctx.fill();
            const eg = ctx.createRadialGradient(p.x, fl, 0, p.x, fl, p.aw * 0.7);
            eg.addColorStop(0, hsla(H, 90, 66, 0.3 * I)); eg.addColorStop(1, hsla(H, 90, 50, 0));
            ctx.fillStyle = eg; ctx.beginPath(); ctx.ellipse(p.x, fl, p.aw * 0.7, 9, 0, 0, TAU); ctx.fill();
            ctx.restore();
          }
          arch(ctx, p.x - p.aw / 2, p.top, p.aw, p.ah);
          ctx.strokeStyle = hsla(H, 35 + 45 * I, 70 + 14 * I, 0.22 + 0.5 * I); ctx.lineWidth = 1.2; ctx.stroke();
          ctx.strokeStyle = `rgba(190,206,240,${0.18 + 0.2 * I})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.top + 2); ctx.lineTo(p.x, p.ly - 8); ctx.stroke();
          ctx.fillStyle = I > 0 ? `rgba(255,246,228,${0.5 + 0.5 * I})` : 'rgba(162,173,196,.38)';
          ctx.beginPath(); ctx.moveTo(p.x, p.ly - 8); ctx.lineTo(p.x + 6, p.ly); ctx.lineTo(p.x, p.ly + 8); ctx.lineTo(p.x - 6, p.ly); ctx.closePath(); ctx.fill();
          ctx.font = `13px ${SERIF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillStyle = L > 0 ? hsla(H, 85, 82, 0.95) : 'rgba(162,173,196,.62)';
          ctx.fillText(LAMPS[i].n, p.x, fl + 16);
          if (!R && L > 0.5 && Math.random() < 0.09) embers.push({ x: p.x + (Math.random() - 0.5) * 10, y: p.ly, vx: (Math.random() - 0.5) * 0.25, vy: -(0.25 + Math.random() * 0.45), a: 1 });
        }
        if (embers.length) {
          ctx.save(); ctx.globalCompositeOperation = 'lighter';
          for (let i = embers.length - 1; i >= 0; i--) {
            const e = embers[i]; e.x += e.vx * dt * 0.06; e.y += e.vy * dt * 0.06; e.a -= dt / 1800;
            if (e.a <= 0) { embers.splice(i, 1); continue; }
            ctx.fillStyle = hsla(H, 90, 72, e.a * 0.8); ctx.beginPath(); ctx.arc(e.x, e.y, 1.2, 0, TAU); ctx.fill();
          }
          ctx.restore();
        }
        if (fly) {
          const k = R ? 1 : clamp((now() - fly.t0) / 900, 0, 1), e = ease(k);
          let tx = w / 2, ty = h * 0.3;
          if (fly.lamp >= 0) { const p = lampPos(fly.lamp); tx = p.x; ty = p.ly + 22; }
          ctx.save(); ctx.font = `15px ${SERIF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.shadowColor = hsla(H, 90, 60, 0.9); ctx.shadowBlur = 12; ctx.fillStyle = `rgba(255,246,228,${1 - k * 0.55})`;
          ctx.fillText(fly.text, lerp(w / 2, tx, e), lerp(h * 0.97, ty, e));
          ctx.restore();
        }
        if (descT >= 0) {
          const k = (now() - descT) / 2200;
          if (k < 1) {
            ctx.font = `22px ${DISPLAY}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillStyle = `rgba(232,236,245,${0.55 * (1 - k)})`; ctx.fillText('真？　假？', w / 2, h * 0.3 - (R ? 0 : k * 14));
          }
        }
      }

      // 组句器
      function row(label, list, onPick) {
        const picks = el('div', { class: 'l01-picks', role: 'group', 'aria-label': label });
        const btns = list.map(it => {
          const b = el('button', { class: 'l01-pick', type: 'button', 'aria-pressed': 'false', text: it.t });
          api.listen(b, 'click', () => { btns.forEach(x => x.setAttribute('aria-pressed', String(x === b))); api.sfx('select'); onPick(it); });
          picks.append(b); return b;
        });
        comp.append(el('div', { class: 'l01-rowl' }, el('span', { class: 'l01-lbl', text: label }), picks));
      }
      row('谁来说', WHO, it => { who = it; sync(); });
      row('说什么', WHAT, it => { what = it; sync(); });
      const preview = el('span');
      const sayBtn = el('button', { class: 'btn primary', type: 'button', text: '说出口' });
      comp.append(el('div', { class: 'l01-utter' }, preview, sayBtn));
      function sync() {
        preview.replaceChildren(el('span', { class: 'who', text: (who ? who.t : '……') + '：' }), el('q', { text: what ? what.t : '……' }));
        sayBtn.disabled = !(who && what) || busy;
      }
      sync();
      api.listen(sayBtn, 'click', () => {
        if (!who || !what || busy) return;
        const w = who, u = what;
        busy = true; sync(); api.sfx('whoosh');
        fly = { text: u.t, t0: now(), lamp: u.desc ? -1 : u.lamp };
        v.kick();
        api.timeout(() => { busy = false; land(w, u); sync(); }, R ? 60 : 950);
      });
      function land(w, u) {
        fly = null;
        let msg;
        if (u.desc) {
          described = true; descT = now(); api.sfx('tick');
          msg = '这是在**描述**：它可能真，也可能假。可世界并没有因此改变。';
        } else if (!u.need || u.need === w.k) {
          const i = u.lamp;
          if (lit[i] >= 0) msg = '**生效。**不过这盏灯早就亮了。';
          else { lit[i] = now(); api.sfx('open'); msg = `**生效。**话一出口，${LAMPS[i].fx}`; }
        } else {
          fizz[u.lamp] = now(); api.sfx('bad');
          msg = '**失灵。**' + (u.lamp === 0
            ? `${w.t}不是这场会议的主持人，这声“宣布”不算数，会议并没有开始。`
            : `${w.t}此刻并不是在自己的婚礼上被问“你愿意吗”。这句“我愿意”什么也没改变。`);
          if (!misfired) {
            misfired = true; api.collect('l01-felicity');
            api.hint('不是谁说都算数。要“生效”，得由**恰当的人**在**恰当的场合**说出。');
          }
        }
        if (lit.every(x => x >= 0)) {
          if (!misfired) msg += '\n三盏灯都亮了。换个人试试：让**路人**宣布会议开始？';
          else if (!described) msg += '\n三盏灯都亮了。再试试那句“**他宣布会议开始了**”。';
          else if (finish) { const r = finish; finish = null; api.timeout(r, R ? 100 : 1100); }
        }
        setStatus(status, msg);
        v.kick(); if (R) api.timeout(() => v.kick(), 2300);
      }

      // —— 流程
      await api.say('这里是咒语大厅。三盏灯都熄着。');
      await api.say('哲学家奥斯汀（J. L. Austin）发现，有的话一出口就会改变世界。选一个**人**，再选一句**话**。');
      api.hush();
      if (!status.textContent) setStatus(status, '选好“谁来说”和“说什么”，然后**说出口**。');
      await finished;
      await api.say('“我宣布会议开始”和“他宣布会议开始了”只差几个字：一句在**做事**，一句在**描述**。');
      await api.say('描述句有真假；施行句没有真假，只有**成功**或**失灵**。');
      await api.say('魔法咒语，大概就是施行句的极端版本：话一出口，世界随之改变。');
      api.collect('l01-perform');
    }

    /* ================================================================ Scene 4 · 边界 */
    async function sceneBoundary() {
      const s = scene(3, '边界', '可说之圆');
      const frame = el('div', { class: 'l01-frame' });
      const status = el('div', { class: 'l01-status', 'aria-live': 'polite' });
      s.append(frame, status);
      const WORDS = ['雪是白的。', '杯子在桌上。', '窗外在下雨。'];
      const GL = Array.from({ length: 7 }, (_, i) => ({ a: (i / 7) * TAU + 0.35 + (i % 2) * 0.25, q: 0.25 + ((i * 37) % 10) / 14, t: -1, seen: false }));
      const GLTXT = ['它亮了一下。可你叫不出它的名字。', '又一道。它就在那里，却不在任何一句话里。', '……'];
      let phase = 'pull', pulls = 0, touched = 0, resPull = null, resGlim = null;
      const pPull = new Promise(r => { resPull = r; }), pGlim = new Promise(r => { resGlim = r; });
      const B = { on: false, ang: -Math.PI / 2, amp: 0, vel: 0, target: 0, max: 0 };

      const v = art(frame, 'display:block;width:100%;height:clamp(300px,50vh,420px);touch-action:none', draw);
      const geo = () => ({ cx: v.w / 2, cy: v.h / 2, r: Math.min(v.w, v.h) * 0.3 });
      function glimPos(g, gl) {
        const ca = Math.cos(gl.a), sa = Math.sin(gl.a);
        const tx = ca > 0.001 ? (v.w - 18 - g.cx) / ca : ca < -0.001 ? (18 - g.cx) / ca : 1e9;
        const ty = sa > 0.001 ? (v.h - 18 - g.cy) / sa : sa < -0.001 ? (18 - g.cy) / sa : 1e9;
        const far = Math.min(tx, ty), near = g.r * 1.32, d = near + Math.max(0, far - near) * gl.q;
        return { x: g.cx + ca * d, y: g.cy + sa * d };
      }
      pointer(v.canvas, {
        down(e) {
          const p = local(v, e), g = geo(), d = Math.hypot(p.x - g.cx, p.y - g.cy);
          if (phase === 'glim' || phase === 'free') {
            let best = null, bd = 40;
            GL.forEach(gl => { const q = glimPos(g, gl), dd = Math.hypot(q.x - p.x, q.y - p.y); if (dd < bd) { bd = dd; best = gl; } });
            if (best) {
              best.t = now(); api.sfx('tick');
              if (!best.seen && phase === 'glim') {
                best.seen = true; touched++;
                setStatus(status, GLTXT[Math.min(touched, 3) - 1]);
                if (touched >= 3 && resGlim) { const r = resGlim; resGlim = null; api.timeout(r, R ? 100 : 1200); }
              }
              v.kick(); if (R) api.timeout(() => v.kick(), 1400);
              return;
            }
          }
          if (d < g.r + 44) {
            B.on = true; B.ang = Math.atan2(p.y - g.cy, p.x - g.cx); B.max = 0;
            B.target = Math.min(g.r * 0.95, Math.max(0, d - g.r) * 0.75);
            if (R) B.amp = B.target;
          }
          v.kick();
        },
        move(e) {
          if (!B.on) return;
          const p = local(v, e), g = geo(), d = Math.hypot(p.x - g.cx, p.y - g.cy);
          B.ang = Math.atan2(p.y - g.cy, p.x - g.cx);
          B.target = Math.min(g.r * 0.95, Math.max(0, d - g.r) * 0.75); B.max = Math.max(B.max, B.target);
          if (R) B.amp = B.target;
          v.kick();
        },
        up() {
          if (!B.on) return;
          B.on = false; B.target = 0;
          if (R) B.amp = 0;
          if (B.max > geo().r * 0.28) {
            pulls++; api.sfx('whoosh');
            if (phase === 'pull') {
              if (pulls >= 2 && resPull) { const r = resPull; resPull = null; setStatus(status, '它又弹了回来。'); api.timeout(r, R ? 100 : 700); }
              else setStatus(status, '边界跟着你走了一点，又弹了回来。**再拉一次**。');
            }
          }
          v.kick();
        },
      });

      function draw(v, t) {
        const { ctx, w, h } = v, g = geo();
        ctx.clearRect(0, 0, w, h);
        if (!R) {
          if (B.on) { B.amp += (B.target - B.amp) * 0.25; B.vel = 0; }
          else { B.vel = B.vel * 0.84 - B.amp * 0.14; B.amp += B.vel; if (Math.abs(B.amp) < 0.05 && Math.abs(B.vel) < 0.05) { B.amp = 0; B.vel = 0; } }
        }
        // 边界外的微光
        const awake = phase === 'glim' || phase === 'free';
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        for (const gl of GL) {
          const q = glimPos(g, gl), bloom = gl.t < 0 ? 0 : Math.max(0, 1 - (now() - gl.t) / 1300);
          const base = awake ? (gl.seen ? 0.6 : 0.36) : 0.1, flick = R ? 1 : 0.6 + 0.4 * Math.sin(t * 0.0017 + gl.a * 3);
          const rr = (3 + 9 * bloom + (gl.seen ? 2 : 0)) * 4, gg = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, rr);
          gg.addColorStop(0, `rgba(255,246,228,${base * flick + 0.5 * bloom})`); gg.addColorStop(0.35, hsla(H, 85, 66, (base * 0.5 + 0.3 * bloom) * flick)); gg.addColorStop(1, hsla(H, 85, 50, 0));
          ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(q.x, q.y, rr, 0, TAU); ctx.fill();
          if (bloom > 0) {
            ctx.strokeStyle = hsla(H, 85, 78, 0.6 * bloom); ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(q.x, q.y, 8 + 26 * (1 - bloom), 0, TAU); ctx.stroke();
          }
        }
        ctx.restore();
        // 光之圆
        const N = 144;
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const a = (i / N) * TAU; let da = a - B.ang; da = Math.atan2(Math.sin(da), Math.cos(da));
          const r = g.r * (1 + (R ? 0 : 0.012 * Math.sin(a * 3 + t * 0.0007))) + B.amp * Math.exp(-(da * da) / 0.2);
          const x = g.cx + Math.cos(a) * r, y = g.cy + Math.sin(a) * r;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.closePath();
        const lg = ctx.createRadialGradient(g.cx, g.cy - g.r * 0.2, 0, g.cx, g.cy, g.r * 1.6);
        lg.addColorStop(0, 'rgba(255,246,228,.28)'); lg.addColorStop(0.45, hsla(H, 80, 60, 0.15)); lg.addColorStop(1, hsla(H, 80, 40, 0.03));
        ctx.fillStyle = lg; ctx.fill();
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = hsla(H, 90, 65, 0.9); ctx.shadowBlur = 16 + Math.min(20, Math.abs(B.amp) * 0.3);
        ctx.strokeStyle = hsla(H, 90, 80, 0.7 + Math.min(0.3, Math.abs(B.amp) / g.r)); ctx.lineWidth = 1.6; ctx.stroke();
        ctx.restore();
        // 光里的句子
        ctx.font = `${g.r < 110 ? 12.5 : 14}px ${SERIF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(250,244,234,.84)';
        WORDS.forEach((s, i) => ctx.fillText(s, g.cx + (R ? 0 : Math.cos(t * 0.0007 + i) * 3), g.cy + (i - 1) * g.r * 0.42 + (R ? 0 : Math.sin(t * 0.0009 + i * 2) * 2)));
        if (B.amp > g.r * 0.15) {
          const tipR = g.r + B.amp + 16;
          ctx.fillStyle = hsla(H, 85, 82, Math.min(1, B.amp / g.r + 0.2));
          ctx.fillText('……', g.cx + Math.cos(B.ang) * tipR, g.cy + Math.sin(B.ang) * tipR);
        }
      }

      // —— 流程 A：可说与不可说
      await api.say('这一圈光，是能用语言说出的一切。光里的每件事，都能说成一句话。');
      api.hush();
      if (!pulls) setStatus(status, '按住光圈的边缘，**向外拉**。');
      await pPull;
      phase = 'hold';
      await api.say('维特根斯坦《逻辑哲学论》5.6：“**我的语言的界限意味着我的世界的界限。**”');
      await api.say('可是，边界外面并不是空无。');
      phase = 'glim'; api.hush(); v.kick();
      setStatus(status, '碰一碰黑暗里的**微光**。');
      await pGlim;
      phase = 'free';
      await api.say('有些东西能被感受、被**显示**，却说不出来。7：“**对于不可说的东西，必须保持沉默。**”');
      await api.quiz({
        q: '“多学一门外语，就能拓宽世界的边界。”这是 5.6 的原意吗？',
        options: [
          { t: '是，原文就是这个意思', why: '不完全。《逻辑哲学论》里的“语言”指能够描述事实的命题系统，它的界限是**逻辑**的界限，不是“会几门外语”。' },
          { t: '不是原意，而是一种引申', ok: true, why: '对。原文的界限是**逻辑**的界限。不过引申也并非没有道理：下一面透镜会看到，语言确实会温和地影响注意和记忆。' },
        ],
      });
      api.collect('l01-limits');

      // —— 流程 B：写给谁看的证明
      const s2 = scene(3, '边界', '“显然”，与十一步');
      const status2 = el('div', { class: 'l01-status', 'aria-live': 'polite' });
      const box = el('div', { class: 'l01-proof' });
      function gauge(label, cold) {
        const em = el('em'), i = el('i');
        const node = el('div', { class: 'l01-gauge' + (cold ? ' cold' : '') }, el('span', null, label, em), el('div', { class: 'l01-bar' }, i));
        return { node, set(f, txt) { i.style.width = (f * 100).toFixed(0) + '%'; em.textContent = txt; } };
      }
      const gA = gauge('机器可以逐行检查'), gB = gauge('一眼看出思路（示意）', true);
      const list = el('ol', { class: 'l01-steps' });
      box.append(el('div', { class: 'l01-gauges' }, gA.node, gB.node), list);
      s2.append(status2, box);
      const T = (t, why, kids) => ({ t, why, kids });
      const ROOT = T('a、b 都是偶数，所以 a + b **显然**也是偶数。', null, [
        T('a = 2m，b = 2n（m、n 是整数）', null, [
          T('a 是偶数，所以有整数 m 使 a = 2m', '偶数的定义'),
          T('b 是偶数，所以有整数 n 使 b = 2n', '偶数的定义')]),
        T('a + b = 2m + 2n = 2(m + n)', null, [
          T('a + b = 2m + 2n', null, [
            T('a + b = 2m + b', '以 2m 代换 a'),
            T('2m + b = 2m + 2n', '以 2n 代换 b'),
            T('a + b = 2m + 2n', '等号的传递性')]),
          T('2m + 2n = 2(m + n)', null, [
            T('2m + 2n = 2·m + 2·n', '乘号的记法'),
            T('2·m + 2·n = 2·(m + n)', '乘法对加法的分配律')]),
          T('a + b = 2(m + n)', '等号的传递性')]),
        T('所以 a + b 是偶数', null, [
          T('m + n 是整数', '整数对加法封闭'),
          T('取 k = m + n，则 a + b = 2k', '存在量词引入'),
          T('a + b 是偶数', '偶数的定义')]),
      ]);
      let front = [ROOT], fresh = [], resProof = null;
      const pProof = new Promise(r => { resProof = r; });
      function render() {
        list.replaceChildren();
        front.forEach((n, i) => {
          const j = fresh.indexOf(n);
          const li = el('li', { class: 'l01-step' + (j >= 0 && !R ? ' new' : '') });
          if (j >= 0) li.style.animationDelay = j * 70 + 'ms';
          li.append(el('span', { class: 'no', text: String(i + 1).padStart(2, '0') }), el('span', { class: 'st', html: fmt(n.t) }));
          if (n.kids) {
            const b = el('button', { class: 'l01-exp', type: 'button', text: n === ROOT ? '展开“显然”' : '为什么？' });
            api.listen(b, 'click', () => expand(n));
            li.append(b);
          } else li.append(el('span', { class: 'why', text: n.why || '' }));
          list.append(li);
        });
        const N = front.length, leaves = front.filter(n => !n.kids).length, vis = 1 / (1 + 0.3 * (N - 1));
        gA.set(leaves / N, `${Math.round((leaves / N) * 100)}%`);
        gB.set(vis, `${Math.round(vis * 100)}%`);
      }
      function expand(n) {
        const i = front.indexOf(n); if (i < 0) return;
        front.splice(i, 1, ...n.kids); fresh = n.kids.slice();
        api.sfx('select'); render();
        setStatus(status2, `现在是 **${front.length}** 步。`);
        if (!front.some(x => x.kids) && resProof) { const r = resProof; resProof = null; api.timeout(r, R ? 100 : 900); }
      }
      render();
      await api.say('最后一道边界：语言写给谁看？数学家常这样写证明。留意那个“显然”。');
      api.hush();
      setStatus(status2, '点**展开**，把每一步拆到不能再拆为止。');
      await pProof;
      api.sfx('ok');
      setStatus(status2, '一步“显然”，拆成了 **11** 步。');
      await api.say('现在每一步都细到计算机可以机械地逐行检查。这就是**形式化证明**的样子。');
      await api.say('可关键的念头——**把 a + b 写成 2 乘一个整数**——反而埋进了步骤里。真实的形式化证明，篇幅常膨胀几十倍。');
      await api.say('瑟斯顿（William Thurston）说，数学追求的是**人类的理解**。另一派说，本质是**正确性**。');
      await api.quiz({
        kicker: '没有标准答案',
        q: '你站哪一边？',
        sub: '这是今天数学界和 AI 领域热烈争论的问题，两边都有不少有名的人。',
        options: [
          { t: '理解优先：没人看得懂的证明，贡献有限', ok: true, why: '这是瑟斯顿 1994 年的立场：数学家追求的不是证明了多少定理，而是人类对数学的理解。' },
          { t: '正确优先：机器验过，就是可靠的知识', ok: true, why: '这是另一派的立场：能被 Lean 这类证明助手逐行检验的证明，即使没人把握全貌，也是可靠的数学知识。' },
        ],
      });
      api.collect('l01-proof');
      await api.say('如果某个定理只有 AI 能“看懂”证明，人类算“知道”它吗？第十一面透镜会回到这里。');
    }

    /* ================================================================ 主流程 */
    (async () => {
      await sceneReading();
      await sceneCrystal();
      await sceneHall();
      await sceneBoundary();
      endScene();
      api.progress(4, 4);
      await api.say('穿过巴别，光束带上了第一种颜色。');
      await api.say('语言不只是传递信息的管道：它动情、命令、寒暄、谈论自己、改变世界，也有边界。');
      api.complete({ summary: '语言不只用来**传递信息**：雅各布森的六种功能里，沟通主要只占一种；施行句不描述世界，而是改变世界；语言有边界；写给机器的语言和写给人的语言，也未必是同一种。' });
    })().catch(e => console.error(e));

    return () => { endScene(); };
  }

  Lens.registerLevel({
    id: 'l01', no: 1, name: '巴别', subtitle: '语言首先为沟通服务吗', continent: 'lang',
    blurb: '六棱晶体、会改变世界的咒语，以及语言的边界：语言不只用来传递信息。',
    steps: 4,
    cards: CARDS,
    mount,
  });
})();

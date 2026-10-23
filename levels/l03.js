/* 透镜群岛 · LENS 03 · 函数机 · 词是函数
 * 四个场景：函数机 → 晨星与暮星 → 词的星座 → gavagai（尾声：只有差异）
 */
(function () {
  'use strict';

  const H = 42;
  const SERIF = '"Noto Serif SC","Songti SC","STSong",serif';
  const DISP = '"ZCOOL XiaoWei","Noto Serif SC","Songti SC",serif';
  const MONO = '"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace';
  const TAU = Math.PI * 2;
  const gold = (l, a, s) => `hsl(${H} ${s == null ? 85 : s}% ${l == null ? 62 : l}% / ${a == null ? 1 : a})`;
  const hsla = (c, a) => `hsl(${c[0]} ${c[1]}% ${c[2]}% / ${a == null ? 1 : a})`;
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  /* ---------------------------------------------------------------- per-scene kit */
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
  // Continuous loop normally; in reduced-motion mode, draw only on demand with t=0 and a large dt (eases jump to target).
  function painter(api, kit, draw) {
    if (!api.reduced) { kit.raf((t, dt) => { if (kit.alive) draw(t, dt); }); return () => {}; }
    let q = false;
    const inv = () => { if (q || !kit.alive) return; q = true; kit.raf(() => { q = false; if (kit.alive) draw(0, 1000); return false; }); };
    inv();
    return inv;
  }
  const approach = (cur, tgt, dt, tau) => cur + (tgt - cur) * (1 - Math.exp(-dt / (tau || 160)));

  function glowDot(ctx, x, y, r, col, a) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, col.replace(/\/ [\d.]+\)$/, `/ ${a})`)); g.addColorStop(1, col.replace(/\/ [\d.]+\)$/, '/ 0)'));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  }

  const CSS = `
.l03-wrap{max-width:980px;margin:0 auto;padding-top:18px;padding-bottom:12px}
.l03-scene{display:grid;gap:14px;animation:l03in .7s ease both}
@keyframes l03in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.l03-kick{font-family:var(--f-mono);font-size:11px;letter-spacing:.24em;color:hsl(var(--hue) 70% 66%);text-transform:uppercase}
.l03-h{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(28px,6vw,40px);line-height:1.1;text-shadow:0 0 30px hsl(var(--hue) 85% 62% / .25)}
.l03-lead{margin:0;font-family:var(--f-serif);color:var(--dim);max-width:660px;line-height:1.75}
.l03-lead b{color:hsl(var(--hue) 85% 72%);font-weight:600}
.l03-stage{position:relative;border-radius:22px;overflow:hidden;border:1px solid hsl(var(--hue) 60% 55% / .2);
  background:radial-gradient(120% 90% at 50% 40%,hsl(var(--hue) 40% 12% / .55),rgba(5,8,15,.35) 70%);box-shadow:inset 0 0 60px rgba(0,0,0,.45)}
.l03-panel{display:grid;gap:10px;padding:14px;border-radius:18px;border:1px solid var(--line);background:rgba(10,16,32,.55)}
.l03-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.l03-lbl{font-family:var(--f-mono);font-size:11px;letter-spacing:.16em;color:var(--faint);min-width:52px;text-transform:uppercase}
.l03-chip{position:relative;min-height:44px;min-width:44px;padding:0 16px;border-radius:999px;border:1px solid var(--line);background:rgba(255,255,255,.03);
  cursor:pointer;font-family:var(--f-serif);font-size:16px;color:var(--dim);transition:border-color .2s,color .2s,background .2s,box-shadow .3s}
.l03-chip:hover{border-color:hsl(var(--hue) 80% 62% / .6);color:var(--text)}
.l03-chip.on{border-color:hsl(var(--hue) 85% 62%);color:var(--text);background:hsl(var(--hue) 85% 62% / .14);box-shadow:0 0 18px hsl(var(--hue) 85% 62% / .28)}
.l03-chip.seen::after{content:"";position:absolute;top:6px;right:7px;width:5px;height:5px;border-radius:50%;background:hsl(var(--hue) 85% 66%);box-shadow:0 0 6px hsl(var(--hue) 85% 66%)}
.l03-chip:disabled{opacity:.4;cursor:default}
.l03-out{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px;min-height:46px;font-family:var(--f-serif)}
.l03-out .eq{font-family:var(--f-mono);font-size:15px;color:var(--dim);letter-spacing:.02em}
.l03-out .eq i{font-style:normal;color:hsl(var(--hue) 85% 72%)}
.l03-out .res{font-family:var(--f-display);font-size:30px;line-height:1}
.l03-out .note{font-size:13px;color:var(--faint)}
.l03-sw{display:inline-block;width:14px;height:14px;border-radius:50%;vertical-align:-1px;margin-right:8px;box-shadow:0 0 12px currentColor}
.l03-formula{font-family:var(--f-mono);font-size:clamp(14px,3.6vw,18px);text-align:center;padding:14px 10px;border-radius:14px;border:1px dashed hsl(var(--hue) 70% 60% / .4);color:var(--text)}
.l03-formula b{color:hsl(var(--hue) 85% 72%);font-weight:500}
.l03-range{width:100%;height:44px;accent-color:hsl(var(--hue) 85% 62%);cursor:pointer;touch-action:pan-y}
.l03-meta{display:flex;justify-content:space-between;gap:10px;font-family:var(--f-mono);font-size:11px;letter-spacing:.12em;color:var(--faint)}
.l03-handle{position:absolute;left:0;top:0;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;cursor:grab;touch-action:none;z-index:2;
  border:1.5px solid hsl(var(--hue) 90% 72%);background:radial-gradient(circle,hsl(var(--hue) 90% 70% / .55),hsl(var(--hue) 90% 50% / .08) 70%);
  box-shadow:0 0 22px hsl(var(--hue) 90% 62% / .6);display:grid;place-items:center;font-family:var(--f-mono);font-size:10px;color:#140f02;padding:0}
.l03-handle:active{cursor:grabbing}
.l03-handle.snap{border-color:#fff;box-shadow:0 0 34px hsl(var(--hue) 95% 70% / .9)}
.l03-sent{text-align:left;min-height:46px;padding:10px 16px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.03);cursor:pointer;
  font-family:var(--f-serif);font-size:15px;color:var(--dim);transition:border-color .2s,background .2s}
.l03-sent b{color:hsl(var(--hue) 85% 72%);font-weight:600}
.l03-sent.on{border-color:hsl(var(--hue) 85% 62%);color:var(--text);background:hsl(var(--hue) 85% 62% / .1)}
.l03-cands{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
@media (min-width:760px){.l03-cands{grid-template-columns:repeat(4,minmax(0,1fr))}}
.l03-cand{position:relative;text-align:left;min-height:64px;padding:10px 12px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.03);
  font-family:var(--f-serif);font-size:15px;color:var(--text);cursor:pointer;transition:border-color .3s,background .3s,box-shadow .4s}
.l03-cand small{display:block;font-size:12px;color:var(--faint);line-height:1.5;margin-top:4px;min-height:1.5em}
.l03-cand.bet{border-color:hsl(var(--hue) 85% 62%);box-shadow:0 0 0 1px hsl(var(--hue) 85% 62% / .4) inset}
.l03-cand.bet::before{content:"你的押注";position:absolute;top:-9px;right:10px;font-family:var(--f-mono);font-size:10px;letter-spacing:.12em;padding:0 6px;border-radius:6px;background:var(--panel-solid);color:hsl(var(--hue) 85% 70%)}
.l03-cand.fit{background:hsl(152 58% 58% / .08);border-color:hsl(152 58% 58% / .55)}
.l03-cand.fit small{color:hsl(152 50% 72%)}
.l03-cand:disabled{cursor:default}
.l03-tests{display:flex;flex-wrap:wrap;gap:8px}
.l03-strip{position:relative;height:74px;border-radius:14px;overflow:hidden;border:1px solid var(--line)}
.l03-strip .seg{position:absolute;top:0;bottom:0;display:grid;place-items:center;font-family:var(--f-serif);font-size:15px;color:#fff;
  text-shadow:0 1px 6px rgba(0,0,0,.6);transition:left .9s cubic-bezier(.6,.05,.2,1),width .9s cubic-bezier(.6,.05,.2,1),opacity .6s}
.l03-strip .seg small{display:block;font-size:11px;font-family:var(--f-mono);opacity:.8;text-align:center}
.l03-strip .edge{position:absolute;top:0;bottom:0;width:2px;background:#fff;box-shadow:0 0 12px #fff;transition:left .9s cubic-bezier(.6,.05,.2,1),opacity .6s}
.l03-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
`;

  const CARDS = [
    { id: 'l03-concept', title: '概念是函数', en: 'Concept as function (Frege)',
      body: '弗雷格（Gottlob Frege）在 1891 年的《函数与概念》里提出：**概念就是一种函数**。“……是红的”输入一个对象，输出“真”或“假”：输入苹果，得真；输入一片青草，得假。现代逻辑与集合论里的**谓词**，正是这个想法的直接后代。',
      ref: 'Frege, Funktion und Begriff, 1891' },
    { id: 'l03-context', title: '语境原则', en: 'The context principle',
      body: '弗雷格在《算术基础》（1884）里说：**永远不要孤立地追问一个词的意义，而要在句子的语境中追问**。“青”在青天里是蓝，在青草里是绿，在青丝里是黑。维特根斯坦推得更远：在大多数情况下，词的意义就是它的**用法**。于是可以写成：意义 = f(词, 语境, 使用者)。',
      ref: 'Frege, Die Grundlagen der Arithmetik, 1884；Wittgenstein, Philosophical Investigations, 1953' },
    { id: 'l03-sense', title: '含义与指称', en: 'Sinn und Bedeutung · sense and reference',
      body: '“晨星”和“暮星”都指金星：**指称**相同，**含义**不同。否则“晨星就是暮星”就不会是一个要由天文学家去发现的事实，而会像“晨星就是晨星”一样空洞。用函数的语言说：两个函数在这个输入上**输出**相同，**计算规则**却不同。',
      ref: 'Frege, Über Sinn und Bedeutung, 1892' },
    { id: 'l03-firth', title: '观其所伴，知其所指', en: 'Distributional semantics',
      body: '弗斯（J. R. Firth）1957 年说：你可以通过一个词的伙伴来认识它。词的意义体现在它常和哪些词一起出现。2013 年前后的 word2vec 据此把每个词变成高维空间里的一个点，于是有了 **king − man + woman ≈ queen**。这就是**分布语义学**，后来成了 AI 处理语言的地基。',
      ref: 'Firth, A Synopsis of Linguistic Theory, 1957；Mikolov et al., 2013' },
    { id: 'l03-contextual', title: '语境化表示', en: 'Contextual representations',
      body: '词向量时代，每个词只有**一个**向量，不管它出现在什么句子里。2017 年 Transformer 架构之后，同一个词在不同句子里得到**不同的**向量：river bank 里的 bank 落在“河岸”附近，bank account 里的落在“银行”附近。从某种意义上说，大语言模型是一个用海量数据**学出来**的“词—语境—意义”函数。',
      ref: 'Vaswani et al., Attention Is All You Need, 2017' },
    { id: 'l03-gavagai', title: '翻译的不确定性', en: 'Indeterminacy of translation · gavagai',
      body: '奎因（Quine）《语词和对象》（1960）：没有词典，只能观察当地人在什么情况下说什么。兔子出现时他们说 gavagai。可“兔子”“未分离的兔子部分”“兔子的时间片段”“兔性的显现”同样符合**所有**行为证据。不存在一个事实决定哪个对：这就是翻译的不确定性与**指称的不可测度性**。',
      ref: 'Quine, Word and Object, 1960, ch. 2' },
    { id: 'l03-saussure', title: '任意，却不随意', en: "L'arbitraire du signe · only differences",
      body: '索绪尔：“牛”这个声音和牛之间没有必然联系，英语用 cow，法语用 vache，这是**符号任意性**。但符号**系统**一点也不随意：每个词的价值取决于它和其他词的差异。俄语 голубой 之所以是浅蓝，是因为旁边有 синий；拿走 синий，它会扩张到所有的蓝。**语言中只有差异，没有正面的项。**',
      ref: 'Saussure, Cours de linguistique générale, 1916' },
  ];

  /* ================================================================ mount */
  function mount(root, api) {
    api.css(CSS);
    const el = api.el;
    const wrap = el('div', { class: 'l03-wrap' });
    root.append(wrap);
    let kit = null;
    let lastHint = '';
    const hint = (s) => { if (s === lastHint) return; lastHint = s; api.hint(s); };
    const say = (x, o) => { lastHint = ''; return api.say(x, o); };

    function scene(kicker, title, lead) {
      if (kit) kit.end();
      kit = makeKit(api);
      const sec = el('section', { class: 'l03-scene' },
        el('div', { class: 'l03-kick', text: kicker }),
        el('h2', { class: 'l03-h', text: title }),
        lead ? el('p', { class: 'l03-lead', html: api.fmt(lead) }) : null);
      wrap.replaceChildren(sec);
      root.scrollTop = 0;
      return sec;
    }
    // A framed canvas whose drawing survives resizes and reduced-motion mode.
    function makeStage(parent, height, k) {
      const st = el('div', { class: 'l03-stage', style: `height:${height}` });
      parent.append(st);
      let drawFn = null, lastT = 0;
      const cv = api.canvas(st, { style: 'position:absolute;inset:0;width:100%;height:100%;display:block',
        onResize: () => { if (drawFn && k.alive) drawFn(lastT, 0); } });
      const inv = painter(api, k, (t, dt) => { lastT = t; if (drawFn) drawFn(t, dt); });
      return { st, cv, inv, setDraw(f) { drawFn = f; inv(); } };
    }
    function chip(text, onclick) {
      const b = el('button', { class: 'l03-chip', type: 'button', text });
      b.addEventListener('click', onclick);
      return b;
    }

    /* ------------------------------------------------------------ Scene A · 函数机 */
    async function sceneA() {
      const sec = scene('Scene 1 · The function machine', '一台吃词的机器',
        '上面的槽里放一个**词**，下面拧一拧**语境**。同一个词，会吐出什么？');
      const k = kit;
      const S = makeStage(sec, 'clamp(260px,46vh,400px)', k);
      const panel = el('div', { class: 'l03-panel' });
      const lblW = el('span', { class: 'l03-lbl', text: '词' });
      const lblC = el('span', { class: 'l03-lbl', text: '语境' });
      const rowW = el('div', { class: 'l03-row' });
      const rowC = el('div', { class: 'l03-row' });
      const out = el('div', { class: 'l03-out', 'aria-live': 'polite' });
      panel.append(rowW, rowC, out);
      sec.append(panel);

      const BLUE = [212, 78, 64], GREEN = [132, 58, 55], BLACK = [225, 30, 9], BRUISE = [276, 42, 56];
      const WORDS = [
        { w: '青', ctx: [
          { c: '天', k: '青天', out: '蓝', s: '蓝', col: BLUE },
          { c: '草', k: '青草', out: '绿', s: '绿', col: GREEN },
          { c: '丝', k: '青丝', out: '黑', s: '黑', col: BLACK, dark: 1, note: '青丝：乌黑的头发' },
          { c: '眼', k: '青眼', out: '黑', s: '黑', col: BLACK, dark: 1, note: '青眼：黑眼珠，与“白眼”相对（阮籍的典故）' },
          { c: '瘀伤', k: '乌青', out: '青紫', s: '青紫', col: BRUISE, note: '乌青：磕碰后的瘀伤' }] },
        { w: 'bank', ctx: [
          { c: 'river', k: 'river bank', out: '河岸', s: '岸', col: [192, 55, 58] },
          { c: 'account', k: 'bank account', out: '银行', s: '银行', col: [46, 82, 62], note: 'bank account：银行账户' }] },
        { w: 'computer', ctx: [
          { c: '19 世纪末', k: '19 世纪末的天文台', out: '计算员（一个人）', s: '人', col: [26, 78, 66], note: '从 17 世纪起，computer 指从事计算工作的人。哈佛天文台曾雇用一批女性计算员处理星表' },
          { c: '今天', k: '今天的书桌上', out: '电脑（一台机器）', s: '机器', col: [200, 62, 66], note: '一个词的输出，一百年里从“人”变成了“机器”' }] },
      ];
      const PRED = { w: '……是红的', ctx: [
        { c: '苹果', k: '苹果', out: '真', s: '真', col: [H, 92, 70] },
        { c: '青草', k: '青草', out: '假', s: '假', col: [220, 12, 26], dark: 1 },
        { c: '雪', k: '雪', out: '假', s: '假', col: [220, 12, 26], dark: 1 },
        { c: '红旗', k: '红旗', out: '真', s: '真', col: [H, 92, 70] }] };

      const M = { word: '', ctx: '', short: '', col: [H, 30, 28], colT: [H, 30, 28], bright: 0.35, brightT: 0.35,
        dark: 0, darkT: 0, spin: 0, spinV: 0.00025, pulse: 0, parts: [], plate: '' };

      function spawn() {
        if (api.reduced) return;
        const { w, h } = S.cv, cx = w / 2, cy = h / 2, R = Math.min(w * 0.42, h * 0.44);
        for (let i = 0; i < 46; i++) {
          const fromTop = i < 26;
          M.parts.push({ x0: cx + (Math.random() - 0.5) * R * 0.5, y0: cy + (fromTop ? -1 : 1) * R * 0.68 + (Math.random() - 0.5) * 10,
            a: Math.random() * TAU, life: 0, dur: 700 + Math.random() * 700, sw: (Math.random() < 0.5 ? -1 : 1) * (0.8 + Math.random() * 1.4) });
        }
      }
      function draw(t, dt) {
        const { ctx, w, h } = S.cv;
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2, cy = h / 2, R = Math.min(w * 0.42, h * 0.44);
        M.col = mix(M.col, M.colT, 1 - Math.exp(-dt / 260));
        M.bright = approach(M.bright, M.brightT, dt, 320);
        M.dark = approach(M.dark, M.darkT, dt, 320);
        M.spinV = approach(M.spinV, 0.00025, dt, 1100);
        if (!api.reduced) M.spin += M.spinV * dt;
        M.pulse = Math.max(0, M.pulse - dt / 1100);

        // ambient halo
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        glowDot(ctx, cx, cy, R * 1.5, gold(50, 1), 0.08);
        // rings
        ctx.strokeStyle = gold(68, 0.36); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
        for (let i = 0; i < 72; i++) {
          const a = i / 72 * TAU + M.spin, L = i % 6 === 0 ? 11 : 5;
          ctx.strokeStyle = gold(70, i % 6 === 0 ? 0.6 : 0.28);
          ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.lineTo(cx + Math.cos(a) * (R - L), cy + Math.sin(a) * (R - L)); ctx.stroke();
        }
        ctx.lineWidth = 2; ctx.strokeStyle = gold(60, 0.3);
        for (let i = 0; i < 3; i++) { const a = -M.spin * 1.7 + i * TAU / 3; ctx.beginPath(); ctx.arc(cx, cy, R * 0.82, a, a + 1.5); ctx.stroke(); }
        ctx.lineWidth = 1; ctx.strokeStyle = gold(70, 0.22);
        ctx.beginPath(); ctx.arc(cx, cy, R * 0.52, 0, TAU); ctx.stroke();
        // spokes
        ctx.strokeStyle = gold(70, 0.12);
        for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + M.spin * 0.5; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R * 0.52, cy + Math.sin(a) * R * 0.52); ctx.lineTo(cx + Math.cos(a) * R * 0.8, cy + Math.sin(a) * R * 0.8); ctx.stroke(); }
        // particles
        for (let i = M.parts.length - 1; i >= 0; i--) {
          const p = M.parts[i]; p.life += dt; const u = Math.min(1, p.life / p.dur);
          if (u >= 1) { M.parts.splice(i, 1); continue; }
          const e = u * u * (3 - 2 * u), sx = p.x0 + (cx - p.x0) * e, sy = p.y0 + (cy - p.y0) * e;
          const off = Math.sin(u * Math.PI) * R * 0.25 * p.sw, nx = -(cy - p.y0), ny = cx - p.x0, nl = Math.hypot(nx, ny) || 1;
          const c = mix([H, 90, 72], M.colT, u);
          ctx.fillStyle = hsla(c, 0.9 * (1 - u * 0.4)); ctx.beginPath(); ctx.arc(sx + nx / nl * off, sy + ny / nl * off, 1.6, 0, TAU); ctx.fill();
        }
        // lens
        const lr = R * 0.38 * (1 + M.pulse * 0.08);
        const c = M.col;
        glowDot(ctx, cx, cy, lr * 2.4, hsla(c, 1), 0.35 * M.bright * (1 - M.dark * 0.7));
        const g = ctx.createRadialGradient(cx, cy - lr * 0.3, 0, cx, cy, lr);
        g.addColorStop(0, hsla([c[0], c[1], Math.min(92, c[2] + 22)], 0.95 * M.bright)); g.addColorStop(1, hsla(c, 0.55 * M.bright));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, lr, 0, TAU); ctx.fill();
        ctx.restore();
        if (M.dark > 0.02) { // an eclipse: black light with a golden corona
          ctx.save();
          ctx.fillStyle = `rgba(4,6,12,${0.92 * M.dark})`; ctx.beginPath(); ctx.arc(cx, cy, lr * 0.96, 0, TAU); ctx.fill();
          ctx.globalCompositeOperation = 'lighter';
          ctx.strokeStyle = gold(78, 0.7 * M.dark); ctx.lineWidth = 1.5; ctx.shadowColor = gold(70, 1); ctx.shadowBlur = 16;
          ctx.beginPath(); ctx.arc(cx, cy, lr, 0, TAU); ctx.stroke();
          ctx.restore();
        }
        ctx.strokeStyle = gold(80, 0.6); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, lr, 0, TAU); ctx.stroke();
        // labels
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        if (M.short) {
          const fs = Math.max(14, lr * (M.short.length > 1 ? 0.56 : 0.8));
          ctx.font = `${fs}px ${DISP}`; ctx.fillStyle = M.dark > 0.5 ? gold(80, 0.95) : 'rgba(12,10,4,.86)';
          ctx.fillText(M.short, cx, cy + 1);
        }
        ctx.font = `${Math.max(16, R * ((M.word || '').length > 4 && !/^[a-z]+$/.test(M.word) ? 0.13 : 0.2))}px ${DISP}`; ctx.fillStyle = gold(82, M.word ? 0.98 : 0.3);
        ctx.shadowColor = gold(60, 1); ctx.shadowBlur = 14;
        ctx.fillText(M.word || '词', cx, cy - R * 0.67);
        ctx.shadowBlur = 0;
        ctx.font = `${Math.max(12, R * 0.12)}px ${SERIF}`; ctx.fillStyle = gold(78, M.ctx ? 0.9 : 0.3);
        ctx.fillText(M.ctx || '语境', cx, cy + R * 0.67);
        ctx.font = `10px ${MONO}`; ctx.fillStyle = 'rgba(162,173,196,.55)';
        ctx.fillText(M.plate || 'f ( 词 , 语境 )', cx, cy + R + 14 > h - 8 ? h - 10 : cy + R + 14);
      }
      S.setDraw(draw);

      let mode = 'word', cur = WORDS[0], onSeen = null;
      const seen = new Set();
      function fire(wd, c, btn) {
        M.word = wd.w; M.ctx = c.c; M.short = c.s; M.colT = c.col; M.darkT = c.dark ? 1 : 0; M.brightT = 1; M.spinV = 0.005; M.pulse = 1;
        spawn(); api.sfx('select'); S.inv();
        [...rowC.querySelectorAll('.l03-chip')].forEach(b => b.classList.toggle('on', b === btn));
        btn.classList.add('seen');
        const sw = el('span', { class: 'l03-sw', style: `background:${hsla(c.col)};color:${hsla(c.col, 0.8)}` });
        out.replaceChildren(
          el('span', { class: 'eq', html: `f(<i>${wd.w}</i>, <i>${c.k}</i>) =` }),
          el('span', { class: 'res' }, sw, c.out),
          el('span', { class: 'note', text: c.note || '' }));
        seen.add(wd.w + '|' + c.c);
        if (onSeen) onSeen(wd, c);
      }
      function buildCtx() {
        rowC.replaceChildren(lblC);
        cur.ctx.forEach(c => { const b = chip(c.c, () => fire(cur, c, b)); if (seen.has(cur.w + '|' + c.c)) b.classList.add('seen'); rowC.append(b); });
      }
      function buildWords(list) {
        rowW.replaceChildren(lblW);
        list.forEach(wd => {
          const b = chip(wd.w, () => {
            cur = wd; [...rowW.querySelectorAll('.l03-chip')].forEach(x => x.classList.toggle('on', x === b));
            M.word = wd.w; M.ctx = ''; M.short = ''; M.brightT = 0.35; M.darkT = 0; M.colT = [H, 30, 28]; S.inv();
            buildCtx(); api.sfx('tick');
          });
          if (wd === cur) b.classList.add('on');
          rowW.append(b);
        });
        M.word = cur.w; buildCtx(); S.inv();
      }
      buildWords(WORDS);

      if (!api.replay) {
        await say(['欢迎来到第三面透镜。这里的居民相信一件怪事：**词是函数**。', '先别急着信。这台机器就摆在你面前，动手拆拆看。']);
      }
      hint('先放进“青”，把语境拧到“天”。');
      await new Promise(res => {
        onSeen = () => {
          const q = WORDS[0].ctx.filter(c => seen.has('青|' + c.c)).length;
          const other = [...seen].some(s => !s.startsWith('青|'));
          if (q >= 3 && other) { onSeen = null; res(); }
          else if (q === 1 && !other) hint('还是这个“青”，换一个语境试试。');
          else if (q >= 3 && !other) hint('换一个词：bank，或者 computer。');
          else if (q < 3 && other) hint('再回到“青”，多拧几个语境。');
        };
        onSeen();
      });
      await api.wait(500);
      await say(['同一个“青”：青天里是蓝，青草里是绿，青丝里是黑。', '所以词不像一张贴在东西上的标签，更像一个**函数**。它的输入里不只有词，还有**语境**。']);
      const formula = el('div', { class: 'l03-formula', html: '意义 = f( <b>词</b> , <b>语境</b> , <b>使用者</b> )' });
      panel.after(formula);
      api.sfx('chime');
      await say(['还有第三个参数：**使用者**。同一个词，你的 f 和我的 f 未必相同。', '它们在大多数输入上足够接近，沟通才可能；在关键输入上差得远，就成了鸡同鸭讲。',
        '弗雷格（Frege）1884 年就说过：别孤立地问一个词的意义，要在句子的语境里问。']);
      api.collect('l03-context');
      await api.wait(400);

      // coda: Frege's concept-as-function
      await say(['弗雷格 1891 年又往前走了一步：**概念本身就是函数**。', '看，机器换了一块铭牌。']);
      mode = 'pred'; cur = PRED; M.plate = 'f ( 对象 ) → 真 / 假'; lblW.textContent = '概念'; lblC.textContent = '对象';
      M.short = ''; M.ctx = ''; M.brightT = 0.35; M.darkT = 0; M.colT = [H, 30, 28];
      buildWords([PRED]); api.sfx('whoosh');
      hint('把几样东西喂给“……是红的”。');
      const tried = new Set();
      await new Promise(res => {
        onSeen = (wd, c) => { tried.add(c.c); if (tried.size >= 3) { onSeen = null; res(); } else if (tried.size === 2) hint('再喂一样。'); };
      });
      await api.wait(400);
      await say('输入一个对象，输出“真”或“假”。现代逻辑里的**谓词**，就是这台机器的直系后代。');
      api.collect('l03-concept');
      return mode;
    }

    /* ------------------------------------------------------------ Scene B · 晨星与暮星 */
    async function sceneB() {
      const sec = scene('Scene 2 · Morning star, evening star', '晨星与暮星',
        '两台**规则不同**的机器：一台只在清晨看东方，一台只在黄昏看西方。拖动下面的“日子”，看它们各自吐出什么。');
      const k = kit;
      const S = makeStage(sec, 'clamp(400px,64vh,540px)', k);
      const ctl = el('div', { class: 'l03-panel' });
      const range = el('input', { class: 'l03-range', type: 'range', min: '0', max: '583', step: '1', value: '292', 'aria-label': '日子' });
      const dayLbl = el('span', { text: '第 292 天' });
      ctl.append(range, el('div', { class: 'l03-meta' }, el('span', { text: '◂ 日子流过' }), dayLbl, el('span', { text: '584 天一轮 ▸' })));
      const acts = el('div', { class: 'l03-actions' });
      ctl.append(acts);
      sec.append(ctl);

      const B = { day: 292, dayV: 292, reveal: 0, revealT: 0, seen: { m: false, e: false }, seen2: { m: false, e: false }, phase: 1, flash: { m: 0, e: 0 } };
      const stars = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.1 + 0.3, p: Math.random() * TAU }));
      function venus(day) {
        const th = -Math.PI / 2 + TAU * day / 584;
        const vx = 0.723 * Math.cos(th), vy = 0.723 * Math.sin(th);
        const ex = vx, ey = vy + 1; // Earth sits at (0,-1), the Sun at the origin
        const elong = Math.atan2(Math.abs(ex), ey) * 180 / Math.PI;
        return { vx, vy, elong, side: ex > 0 ? 'm' : 'e' };
      }
      let onDay = null;
      function setDay(d) {
        B.day = d; dayLbl.textContent = `第 ${d} 天`;
        const v = venus(d);
        if (v.elong > 10) {
          const was = B.seen[v.side];
          B.seen[v.side] = true; if (B.phase === 2) B.seen2[v.side] = true;
          if (!was) { api.sfx('tick'); B.flash[v.side] = 1; }
        }
        S.inv(); if (onDay) onDay();
      }
      k.on(range, 'input', () => setDay(+range.value));

      function drawSky(ctx, x, y, w, h, side, v, t, on) {
        const hz = y + h * 0.74;
        ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
        const g = ctx.createLinearGradient(0, y, 0, hz);
        g.addColorStop(0, 'rgba(8,12,26,.9)'); g.addColorStop(1, side === 'm' ? 'hsl(28 60% 26% / .9)' : 'hsl(16 55% 22% / .9)');
        ctx.fillStyle = g; ctx.fillRect(x, y, w, hz - y);
        ctx.globalCompositeOperation = 'lighter';
        glowDot(ctx, x + w * (side === 'm' ? 0.62 : 0.38), hz + 6, w * 0.5, 'hsl(30 90% 55% / 1)', 0.35);
        for (let i = 0; i < 14; i++) { const s = stars[i + (side === 'm' ? 0 : 20)]; ctx.fillStyle = `rgba(230,236,255,${0.18 + 0.2 * s.r})`; ctx.fillRect(x + s.x * w, y + s.y * (hz - y) * 0.8, 1, 1); }
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(3,5,10,.96)'; ctx.fillRect(x, hz, w, y + h - hz);
        ctx.strokeStyle = gold(70, 0.35); ctx.beginPath(); ctx.moveTo(x, hz); ctx.lineTo(x + w, hz); ctx.stroke();
        let sp = null;
        if (on) {
          const alt = clamp((v.elong - 10) / 37, 0, 1);
          sp = [x + w * (side === 'm' ? 0.56 : 0.44), hz - 8 - alt * (hz - y - 40)];
          ctx.globalCompositeOperation = 'lighter';
          glowDot(ctx, sp[0], sp[1], 18 + B.flash[side] * 20, gold(80, 1), 0.7);
          ctx.fillStyle = '#fffbe8'; ctx.beginPath(); ctx.arc(sp[0], sp[1], 2.6, 0, TAU); ctx.fill();
        }
        ctx.restore();
        ctx.strokeStyle = on ? gold(70, 0.8) : 'rgba(168,188,228,.18)'; ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
        ctx.textAlign = 'left'; ctx.textBaseline = 'top';
        ctx.font = `10px ${MONO}`; ctx.fillStyle = 'rgba(162,173,196,.8)';
        ctx.fillText(side === 'm' ? 'f₁ · 清晨 · 东方' : 'f₂ · 黄昏 · 西方', x + 8, y + 7);
        ctx.font = `12px ${SERIF}`; ctx.fillStyle = 'rgba(232,236,245,.75)';
        ctx.fillText(side === 'm' ? '清晨东方最亮的星' : '黄昏西方最亮的星', x + 8, y + 22);
        ctx.textBaseline = 'bottom'; ctx.font = `13px ${SERIF}`; ctx.fillStyle = on ? gold(80, 1) : 'rgba(101,112,138,.9)';
        ctx.fillText(on ? (B.reveal > 0.5 ? '→ 金星' : '→ 一颗亮星') : '→ （没有输出）', x + 8, y + h - 7);
        return sp;
      }
      function draw(t, dt) {
        const { ctx, w, h } = S.cv;
        ctx.clearRect(0, 0, w, h);
        B.dayV = api.reduced ? B.day : approach(B.dayV, B.day, dt, 110);
        B.reveal = approach(B.reveal, B.revealT, dt, 500);
        B.flash.m = Math.max(0, B.flash.m - dt / 700); B.flash.e = Math.max(0, B.flash.e - dt / 700);
        const v = venus(B.dayV);
        const oh = h * 0.56, top = oh + 4, ph = h - top - 10, gap = 10, pw = (w - 24 - gap) / 2;
        // background stars
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        for (const s of stars) { const a = 0.15 + 0.25 * (api.reduced ? 0.5 : Math.sin(t * 0.001 + s.p) ** 2); ctx.fillStyle = `rgba(230,236,255,${a})`; ctx.beginPath(); ctx.arc(s.x * w, s.y * oh, s.r, 0, TAU); ctx.fill(); }
        ctx.restore();
        // orbit view
        const Rr = Math.min(w * 0.4, (oh - 34) / 1.75);
        const cx = w / 2, cy = 16 + 0.723 * Rr + Math.max(0, (oh - 30 - 1.723 * Rr) / 2);
        const E = [cx, cy + Rr], V = [cx + v.vx * Rr, cy - v.vy * Rr];
        const vis = v.elong > 10, r = B.reveal;
        if (r < 0.98) {
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.font = `12px ${MONO}`; ctx.fillStyle = `rgba(162,173,196,${0.5 * (1 - r)})`;
          ctx.fillText('— 天 幕 —', cx, oh * 0.48);
        }
        if (r > 0.01) {
          ctx.save(); ctx.globalAlpha = r;
          ctx.strokeStyle = 'rgba(168,188,228,.2)'; ctx.setLineDash([2, 5]);
          ctx.beginPath(); ctx.arc(cx, cy, Rr, 0, TAU); ctx.stroke();
          ctx.strokeStyle = gold(70, 0.35); ctx.beginPath(); ctx.arc(cx, cy, 0.723 * Rr, 0, TAU); ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalCompositeOperation = 'lighter';
          glowDot(ctx, cx, cy, 34, 'hsl(38 95% 60% / 1)', 0.9);
          ctx.fillStyle = '#fff3cf'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, TAU); ctx.fill();
          ctx.strokeStyle = 'rgba(255,240,200,.18)'; ctx.beginPath(); ctx.moveTo(E[0], E[1]); ctx.lineTo(cx, cy); ctx.stroke();
          ctx.strokeStyle = vis ? gold(75, 0.7) : 'rgba(255,240,200,.15)'; ctx.beginPath(); ctx.moveTo(E[0], E[1]); ctx.lineTo(V[0], V[1]); ctx.stroke();
          glowDot(ctx, V[0], V[1], 16, gold(80, 1), 0.8);
          ctx.fillStyle = '#fffbe8'; ctx.beginPath(); ctx.arc(V[0], V[1], 3.2, 0, TAU); ctx.fill();
          ctx.fillStyle = 'hsl(205 80% 66%)'; ctx.beginPath(); ctx.arc(E[0], E[1], 4, 0, TAU); ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
          ctx.font = `12px ${SERIF}`; ctx.textBaseline = 'middle';
          ctx.fillStyle = 'rgba(232,236,245,.75)'; ctx.textAlign = 'left'; ctx.fillText('地球', E[0] + 9, E[1]);
          ctx.fillText('太阳', cx + 12, cy - 10);
          ctx.fillStyle = gold(82, 1); ctx.textAlign = V[0] > cx ? 'left' : 'right';
          ctx.fillText('金星', V[0] + (V[0] > cx ? 10 : -10), V[1] - 10);
          const tag = vis ? (v.side === 'm' ? '此刻：晨星' : '此刻：暮星') : '此刻：离太阳太近，看不见';
          ctx.textAlign = 'left'; ctx.font = `11px ${MONO}`; ctx.fillStyle = gold(80, 0.85);
          ctx.fillText(tag, 12, 14);
          ctx.restore();
        }
        const sm = drawSky(ctx, 12, top, pw, ph, 'm', v, t, vis && v.side === 'm');
        const se = drawSky(ctx, 12 + pw + gap, top, pw, ph, 'e', v, t, vis && v.side === 'e');
        const sp = sm || se;
        if (sp && r > 0.05) { // the two rules converge on one body
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = gold(75, 0.5 * r); ctx.setLineDash([3, 4]);
          ctx.beginPath(); ctx.moveTo(sp[0], sp[1]); ctx.lineTo(V[0], V[1]); ctx.stroke(); ctx.restore();
        }
      }
      S.setDraw(draw);

      await say(['弗雷格最有名的一对星，就在这里。', '下面两台机器的**计算规则**不同：一台找清晨东方最亮的星，一台找黄昏西方最亮的星。']);
      hint('拖动“日子”。两台机器，各自在什么时候有输出？');
      await new Promise(res => {
        onDay = () => {
          if (B.seen.m && B.seen.e) { onDay = null; res(); }
          else if (B.seen.m || B.seen.e) hint(B.seen.m ? '清晨那台亮了。继续拖，等黄昏那台也亮起来。' : '黄昏那台亮了。继续拖，等清晨那台也亮起来。');
        };
        onDay();
      });
      await say('两台机器都有了输出。它们找到的，是两颗星吗？');
      const btn = el('button', { class: 'btn hue', type: 'button', text: '掀开天幕：从太阳系上方看' });
      acts.append(btn);
      await new Promise(res => k.on(btn, 'click', res, { once: true }));
      btn.remove(); api.sfx('open');
      B.revealT = 1; B.phase = 2; B.seen2 = { m: false, e: false }; S.inv();
      if (api.reduced) { B.reveal = 1; S.inv(); }
      hint('再拖一拖：看着同一颗星，从一台机器走进另一台。');
      await new Promise(res => { onDay = () => { if (B.seen2.m && B.seen2.e) { onDay = null; res(); } }; if (B.seen2.m && B.seen2.e) res(); });
      await api.wait(300);
      await say(['是同一颗：**金星**。它在轨道一侧时是晨星，转到另一侧就成了暮星。', '弗雷格说：“晨星”和“暮星”**指称**相同，**含义**不同。',
        '用函数的话说：两个函数在这个输入上输出相同，计算规则却不同。']);
      api.collect('l03-sense');
      await api.quiz({
        q: '“晨星就是暮星”和“晨星就是晨星”，哪一句告诉了你新东西？',
        options: [
          { t: '“晨星就是暮星”：两个**含义**不同的名字，被发现指向同一个对象', ok: true,
            why: '对。“晨星就是晨星”只看形式就知道为真；“晨星就是暮星”却要天文学家去发现。两句的指称一样，区别全在含义上。' },
          { t: '两句一样：说的都是金星就是金星', why: '如果意义只是指称，两句确实一样。可前一句是天文学的发现，后一句是空话。弗雷格正是为此引入了“含义”。' },
          { t: '“晨星就是晨星”：它更确定，所以信息更多', why: '它确实确定，可确定得没有信息量：不用看天也知道它为真。' },
        ],
      });
    }

    /* ------------------------------------------------------------ Scene C · 词的星座 */
    async function sceneC() {
      const sec = scene('Scene 3 · A constellation of words', '词的星座',
        '在这片夜空里，词是星。离得近的，是在文本里**常常结伴出现**的。');
      const k = kit;
      const S = makeStage(sec, 'clamp(380px,62vh,520px)', k);
      const below = el('div', { class: 'l03-panel' });
      sec.append(below);
      const D = [0.17, -0.10];
      const P = {
        man: [0.10, 0.60], woman: [0.27, 0.50], boy: [0.08, 0.84], girl: [0.25, 0.74],
        king: [0.40, 0.26], queen: [0.585, 0.17],
        river: [0.66, 0.92], shore: [0.88, 0.88], water: [0.76, 0.76],
        money: [0.86, 0.26], loan: [0.96, 0.40], account: [0.74, 0.36],
      };
      const EDGES = [['man', 'woman'], ['boy', 'girl'], ['man', 'boy'], ['woman', 'girl'], ['king', 'queen'], ['king', 'man'], ['queen', 'woman'],
        ['river', 'shore'], ['river', 'water'], ['shore', 'water'], ['money', 'loan'], ['money', 'account'], ['loan', 'account']];
      const GROUP = { man: 'p', woman: 'p', boy: 'p', girl: 'p', king: 'r', queen: 'r', river: 'w', shore: 'w', water: 'w', money: 'm', loan: 'm', account: 'm' };
      const C = { beat: 1, hp: [0.10, 0.18], snap: '', solved: 0, dimPR: 0, dimT: 0, bank: 0, bankT: 0, bR: 0, bRT: 0, bA: 0, bAT: 0 };
      const BANK = [0.80, 0.58], BANK_R = [0.79, 0.84], BANK_A = [0.86, 0.34];
      const pad = () => ({ x: 34, y: 26 });
      const toPx = (p) => { const { w, h } = S.cv, q = pad(); return [q.x + p[0] * (w - 2 * q.x), q.y + p[1] * (h - 2 * q.y)]; };
      const toN = (x, y) => { const { w, h } = S.cv, q = pad(); return [clamp((x - q.x) / (w - 2 * q.x), -0.05, 1.05), clamp((y - q.y) / (h - 2 * q.y), -0.05, 1.05)]; };

      const handle = el('button', { class: 'l03-handle', type: 'button', 'aria-label': '拖动这支箭：−man +woman', text: '拖' });
      S.st.append(handle);
      let lastTf = '';
      function placeHandle() { const [x, y] = toPx(C.hp), tf = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`; if (tf !== lastTf) { lastTf = tf; handle.style.transform = tf; } }
      const near = (name) => { const a = toPx(C.hp), b = toPx(P[name]); return Math.hypot(a[0] - b[0], a[1] - b[1]); };
      let onSnap = null;
      function checkSnap(final) {
        let s = '';
        if (near('king') < 30) s = 'king'; else if (near('boy') < 30) s = 'boy';
        handle.classList.toggle('snap', !!s);
        if (final && s) { C.hp = P[s].slice(); C.snap = s; placeHandle(); api.sfx('ok'); if (onSnap) onSnap(s); }
        else if (final) C.snap = '';
        S.inv();
      }
      let drag = null;
      k.on(handle, 'pointerdown', e => {
        e.preventDefault(); drag = { id: e.pointerId }; try { handle.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
        C.snap = ''; api.sfx('tick');
      });
      k.on(handle, 'pointermove', e => {
        if (!drag || e.pointerId !== drag.id) return;
        const r = S.st.getBoundingClientRect();
        C.hp = toN(e.clientX - r.left, e.clientY - r.top); placeHandle(); checkSnap(false);
      });
      const up = e => { if (!drag || e.pointerId !== drag.id) return; drag = null; checkSnap(true); };
      k.on(handle, 'pointerup', up); k.on(handle, 'pointercancel', up);
      k.on(handle, 'keydown', e => {
        const st = { ArrowLeft: [-0.03, 0], ArrowRight: [0.03, 0], ArrowUp: [0, -0.03], ArrowDown: [0, 0.03] }[e.key];
        if (st) { e.preventDefault(); C.hp = [clamp(C.hp[0] + st[0], 0, 1), clamp(C.hp[1] + st[1], 0, 1)]; placeHandle(); checkSnap(false); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); checkSnap(true); }
      });

      function star(ctx, p, label, a, big) {
        const [x, y] = toPx(p);
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        glowDot(ctx, x, y, big ? 26 : 14, gold(78, 1), 0.55 * a);
        ctx.fillStyle = `rgba(255,251,232,${a})`; ctx.beginPath(); ctx.arc(x, y, big ? 3.4 : 2.4, 0, TAU); ctx.fill();
        ctx.restore();
        ctx.font = `${big ? 15 : 13}px ${SERIF}`; ctx.textBaseline = 'middle';
        const right = x + 8 + ctx.measureText(label).width < S.cv.w - 4;
        ctx.textAlign = right ? 'left' : 'right';
        ctx.fillStyle = `rgba(232,236,245,${0.85 * a})`; ctx.fillText(label, x + (right ? 8 : -8), y - 9);
      }
      function arrow(ctx, a, b, col, dash, wdt) {
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
        ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = wdt || 1.4; ctx.setLineDash(dash || []);
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0] - Math.cos(ang) * 6, b[1] - Math.sin(ang) * 6); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(b[0] - Math.cos(ang - 0.4) * 10, b[1] - Math.sin(ang - 0.4) * 10);
        ctx.lineTo(b[0] - Math.cos(ang + 0.4) * 10, b[1] - Math.sin(ang + 0.4) * 10); ctx.closePath(); ctx.fill();
      }
      function draw(t, dt) {
        const { ctx, w, h } = S.cv;
        ctx.clearRect(0, 0, w, h);
        C.dimPR = approach(C.dimPR, C.dimT, dt, 400);
        C.bank = approach(C.bank, C.bankT, dt, 400);
        C.bR = approach(C.bR, C.bRT, dt, 520); C.bA = approach(C.bA, C.bAT, dt, 520);
        C.solved = approach(C.solved, C.snap === 'king' ? 1 : 0, dt, 300);
        const alpha = n => (GROUP[n] === 'p' || GROUP[n] === 'r') ? 1 - 0.75 * C.dimPR : 1;
        // companionship threads
        ctx.lineWidth = 1;
        for (const [a, b] of EDGES) {
          const A = toPx(P[a]), Bp = toPx(P[b]), al = Math.min(alpha(a), alpha(b));
          ctx.strokeStyle = gold(70, 0.13 * al); ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(Bp[0], Bp[1]); ctx.stroke();
        }
        // cluster nebulae
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const neb = (p, r, hue, a) => { const [x, y] = toPx(p); glowDot(ctx, x, y, r, `hsl(${hue} 70% 55% / 1)`, a); };
        neb([0.18, 0.67], Math.min(w, h) * 0.26, H, 0.07 * (1 - 0.7 * C.dimPR));
        neb([0.49, 0.22], Math.min(w, h) * 0.2, 30, 0.07 * (1 - 0.7 * C.dimPR));
        neb([0.77, 0.86], Math.min(w, h) * 0.22, 200, 0.08);
        neb([0.85, 0.33], Math.min(w, h) * 0.2, 50, 0.08);
        ctx.restore();
        for (const n in P) star(ctx, P[n], n, alpha(n), n === 'queen' && C.solved > 0.5);
        // beat 1: the −man +woman arrow
        if (C.beat === 1) {
          placeHandle(); // keeps the DOM handle glued to the canvas through resizes
          const M = toPx(P.man), Wn = toPx(P.woman);
          arrow(ctx, M, Wn, gold(72, 0.55), [4, 4]);
          ctx.font = `11px ${MONO}`; ctx.textAlign = 'center'; ctx.fillStyle = gold(78, 0.75);
          ctx.fillText('−man +woman', (M[0] + Wn[0]) / 2 - 20, (M[1] + Wn[1]) / 2 + 14);
          const A = toPx(C.hp), B2 = toPx([C.hp[0] + D[0], C.hp[1] + D[1]]);
          ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.shadowColor = gold(70, 1); ctx.shadowBlur = 12;
          arrow(ctx, A, B2, gold(80, 0.95), null, 2);
          ctx.restore();
          glowDot(ctx, B2[0], B2[1], 16 + 10 * C.solved, gold(85, 1), 0.6);
          if (C.solved > 0.05) {
            const Q = toPx(P.queen); ctx.save(); ctx.globalAlpha = C.solved;
            ctx.font = `13px ${MONO}`; ctx.fillStyle = gold(85, 1); ctx.textAlign = 'center';
            ctx.fillText('king − man + woman ≈ queen', clamp(Q[0], 110, w - 110), Math.min(h - 14, Q[1] + 30));
            ctx.restore();
          }
        }
        // beat 2: bank, static vs contextual
        if (C.bank > 0.01) {
          const b0 = BANK, ctxs = [[C.bR, BANK_R, ['river', 'shore', 'water']], [C.bA, BANK_A, ['money', 'loan', 'account']]];
          ctx.save(); ctx.globalAlpha = C.bank * (1 - 0.6 * Math.max(C.bR, C.bA));
          star(ctx, b0, 'bank', 1, true);
          ctx.font = `10px ${MONO}`; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(162,173,196,.8)';
          const [bx, by] = toPx(b0); ctx.fillText('2013 · 一个词，一个点', clamp(bx, 80, w - 80), by + 22);
          ctx.restore();
          for (const [u, target, comp] of ctxs) {
            if (u < 0.01) continue;
            const p = [b0[0] + (target[0] - b0[0]) * u, b0[1] + (target[1] - b0[1]) * u];
            const [x, y] = toPx(p);
            ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = gold(80, 0.4 * u); ctx.setLineDash([2, 4]);
            for (const c of comp) { const q = toPx(P[c]); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
            ctx.restore();
            star(ctx, p, target === BANK_R ? 'bank（河岸）' : 'bank（银行）', u, true);
          }
        }
      }
      S.setDraw(draw);
      placeHandle();

      below.append(el('p', { class: 'l03-lead', html: api.fmt('拖动那支发光的箭（**−man +woman**），把它的尾巴挂到某个词上，看箭头落在哪里。') }));
      await say(['1957 年，英国语言学家弗斯（Firth）说：你可以通过一个词的**伙伴**来认识它。', '2013 年前后，机器把这句话当了真：数一数每个词的伙伴，把词放进一个空间。']);
      hint('把箭挂到 king 上。');
      await new Promise(res => {
        onSnap = s => {
          if (s === 'king') { onSnap = null; res(); }
          else hint('boy 加上同一支箭，落在 girl 附近。现在挂到 king 上试试。');
        };
      });
      handle.disabled = true;
      await api.wait(700);
      await say(['king − man + woman ≈ **queen**。没人教过它“女王”是什么，它只是数了伙伴。', '这就是**分布语义学**：观其所伴，知其所指。']);
      api.collect('l03-firth');
      await api.wait(300);

      // beat 2
      C.beat = 2; handle.remove(); C.dimT = 1; C.bankT = 1; S.inv();
      if (api.reduced) { C.dimPR = 1; C.bank = 1; }
      await say(['可那时每个词只有**一个**点，不管它出现在什么句子里。', '于是 bank 只能悬在河与钱之间，两头都不靠。']);
      below.replaceChildren();
      const s1 = el('button', { class: 'l03-sent', type: 'button', html: 'We sat on the river <b>bank</b>.' });
      const s2 = el('button', { class: 'l03-sent', type: 'button', html: 'I opened a <b>bank</b> account.' });
      below.append(el('div', { class: 'l03-lbl', text: '2017 · 把它放进句子' }), s1, s2);
      await say('2017 年的 Transformer 之后，词的位置要看它所在的**句子**。点一个句子试试。');
      await new Promise(res => {
        const check = () => { if (C.bRT && C.bAT) res(); else hint('再点另一个句子。'); };
        k.on(s1, 'click', () => { C.bRT = 1; s1.classList.add('on'); api.sfx('select'); S.inv(); check(); });
        k.on(s2, 'click', () => { C.bAT = 1; s2.classList.add('on'); api.sfx('select'); S.inv(); check(); });
      });
      await api.wait(900);
      await say(['同一个 bank，两个句子，两个位置。这正是 f(词, 语境)。', '从某种意义上说，大语言模型就是一个用海量文本**学出来**的“词—语境—意义”函数。']);
      api.collect('l03-contextual');
    }

    /* ------------------------------------------------------------ Scene D · gavagai */
    async function sceneD() {
      const sec = scene('Scene 4 · Gavagai', '一只兔子跑过',
        '一片陌生的原野。这里的语言和你的毫无关系：没有词典，没有翻译，只能看**谁在什么时候说了什么**。');
      const k = kit;
      const S = makeStage(sec, 'clamp(280px,44vh,400px)', k);
      const panel = el('div', { class: 'l03-panel' });
      const candLbl = el('div', { class: 'l03-lbl', text: 'gavagai =' });
      const cands = el('div', { class: 'l03-cands' });
      const testLbl = el('div', { class: 'l03-lbl', text: '测试' });
      const tests = el('div', { class: 'l03-tests' });
      panel.append(candLbl, cands);
      sec.append(panel);

      const CANDS = [
        { t: '兔子', why: ['有兔子', '兔子还在，只是藏着', '没兔子，不说', '“同一个”= 同一只兔子'] },
        { t: '未分离的兔子部分', why: ['有兔子的部分', '耳朵正是兔子的部分', '没有部分，不说', '“同一个”= 连在同一整体上'] },
        { t: '兔子的时间片段', why: ['此刻有一段兔子', '此刻的片段仍在', '没有片段，不说', '“同一个”= 同一串片段'] },
        { t: '兔性的显现', why: ['兔性在此显现', '兔性照样显现', '无兔性，不说', '“同一个”= 同一种兔性'] },
      ];
      const TESTS = [
        { id: 'run', t: '兔子跑过', resp: 'say' },
        { id: 'ears', t: '它躲进草里，只露出耳朵', resp: 'say' },
        { id: 'empty', t: '空无一物的草地', resp: 'shake' },
        { id: 'same', t: '指着问：“这个和刚才那个，是同一个 gavagai 吗？”', resp: 'nod' },
      ];
      const G = { test: 'run', t0: performance.now(), resp: 'say' };
      const grass = Array.from({ length: 90 }, () => ({ x: Math.random(), h: 0.4 + Math.random() * 0.6, p: Math.random() * TAU, front: Math.random() < 0.35 }));
      const stars = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random() * 0.55, r: Math.random() * 1.1 + 0.3 }));

      function rabbit(ctx, x, y, s, a) {
        ctx.save(); ctx.globalAlpha = a;
        ctx.fillStyle = gold(80, 0.9); ctx.shadowColor = gold(65, 1); ctx.shadowBlur = 16;
        ctx.beginPath(); ctx.ellipse(x, y - s * 0.42, s * 0.6, s * 0.4, 0, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.arc(x + s * 0.55, y - s * 0.78, s * 0.26, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.ellipse(x + s * 0.47, y - s * 1.22, s * 0.075, s * 0.3, -0.22, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.ellipse(x + s * 0.62, y - s * 1.2, s * 0.075, s * 0.3, 0.2, 0, TAU); ctx.fill();
        ctx.beginPath(); ctx.arc(x - s * 0.6, y - s * 0.52, s * 0.12, 0, TAU); ctx.fill();
        ctx.restore();
      }
      function draw(t) {
        const { ctx, w, h } = S.cv;
        ctx.clearRect(0, 0, w, h);
        const gy = h * 0.74, s = clamp(Math.min(w, h) * 0.11, 22, 44);
        const e = api.reduced ? 1e9 : performance.now() - G.t0;
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        for (const st of stars) { ctx.fillStyle = `rgba(230,236,255,${0.2 + 0.25 * st.r})`; ctx.beginPath(); ctx.arc(st.x * w, st.y * h, st.r, 0, TAU); ctx.fill(); }
        glowDot(ctx, w * 0.5, gy + 30, w * 0.7, gold(40, 1), 0.12);
        ctx.restore();
        ctx.strokeStyle = gold(70, 0.3); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
        const blades = (front) => {
          for (const g of grass) {
            if (g.front !== front) continue;
            const x = g.x * w, sway = api.reduced ? 0 : Math.sin(t * 0.0012 + g.p) * 3, hh = g.h * s * (front ? 0.9 : 0.6);
            ctx.strokeStyle = gold(front ? 62 : 50, front ? 0.55 : 0.3); ctx.beginPath();
            ctx.moveTo(x, gy + (front ? 6 : 0)); ctx.quadraticCurveTo(x + sway * 0.5, gy - hh * 0.5, x + sway, gy - hh); ctx.stroke();
          }
        };
        blades(false);
        // rabbit
        let speakAt = 900;
        if (G.test === 'run') {
          const u = Math.min(1, e / 2300), x = -0.12 * w + u * 0.72 * w;
          const hop = u < 1 ? Math.abs(Math.sin(e / 1000 * Math.PI * 3.2)) * s * 0.45 : 0;
          rabbit(ctx, x, gy - hop, s, 1);
        } else if (G.test === 'ears') {
          const u = Math.min(1, e / 800), x = w * 0.42;
          ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, gy - s * 0.02); ctx.clip();
          rabbit(ctx, x, gy + s * 0.92 - u * 0.08 * s, s, 1); ctx.restore();
          speakAt = 1100;
        } else if (G.test === 'same') {
          rabbit(ctx, w * 0.46, gy, s, 1);
          ctx.font = `${Math.round(s * 0.5)}px ${SERIF}`; ctx.textAlign = 'center'; ctx.fillStyle = gold(85, Math.min(1, e / 500));
          ctx.fillText('同一个？', w * 0.46 + s * 0.4, gy - s * 1.9);
        } else speakAt = 600;
        blades(true);
        // the speaker: an abstract column of light
        const sx = w * 0.85, sh = s * 2.4, talking = e > speakAt;
        let hx = 0, hy = 0;
        if (talking && !api.reduced && e < speakAt + 1100) {
          if (G.resp === 'shake') hx = Math.sin((e - speakAt) / 70) * 3;
          if (G.resp === 'nod') hy = Math.abs(Math.sin((e - speakAt) / 160)) * 4;
        }
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const lg = ctx.createLinearGradient(0, gy - sh, 0, gy);
        lg.addColorStop(0, 'rgba(255,246,228,.75)'); lg.addColorStop(1, 'rgba(255,246,228,.05)');
        ctx.strokeStyle = lg; ctx.lineWidth = 3; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(sx, gy); ctx.lineTo(sx, gy - sh + s * 0.35); ctx.stroke();
        glowDot(ctx, sx + hx, gy - sh + hy, s * 0.5, 'hsl(40 100% 94% / 1)', 0.6);
        ctx.fillStyle = 'rgba(255,246,228,.9)'; ctx.beginPath(); ctx.arc(sx + hx, gy - sh + hy, s * 0.17, 0, TAU); ctx.fill();
        ctx.restore();
        if (talking && G.resp) {
          const a = api.reduced ? 1 : Math.min(1, (e - speakAt) / 300);
          ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillStyle = gold(85, a);
          ctx.font = G.resp === 'say' ? `italic ${Math.round(s * 0.62)}px ${SERIF}` : `${Math.round(s * 0.42)}px ${SERIF}`;
          const txt = G.resp === 'say' ? (G.test === 'ears' ? 'gavagai.' : 'gavagai!') : G.resp === 'shake' ? '（摇头）' : '（点头）';
          ctx.fillText(txt, sx - s * 0.5, gy - sh - s * 0.35);
        }
      }
      S.setDraw(draw);
      function play(test) {
        G.test = test.id; G.resp = test.resp; G.t0 = performance.now(); api.sfx('whoosh'); S.inv();
        if (api.reduced) return api.wait(250);
        return api.wait(test.id === 'run' ? 1500 : 1400);
      }

      if (!api.replay) await say('看，有东西跑过来了。');
      await api.wait(api.reduced ? 200 : 1600);
      await say(['当地人说：**gavagai**。', '你是语言学家。这个词该怎么译？']);
      const cbtn = CANDS.map((c, i) => {
        const b = el('button', { class: 'l03-cand', type: 'button' }, c.t, el('small', { text: '' }));
        cands.append(b); return b;
      });
      hint('先押一个。');
      const bet = await new Promise(res => cbtn.forEach((b, i) => k.on(b, 'click', () => res(i), { once: true })));
      cbtn.forEach((b, i) => { b.disabled = true; b.classList.toggle('bet', i === bet); });
      api.sfx('select');
      await say([`“${CANDS[bet].t}”，好。不过另外三个也还都在桌上。`, '设计几个测试，看看能不能把错的排除掉。']);
      panel.append(testLbl, tests);
      const done = new Set();
      await new Promise(res => {
        TESTS.forEach((ts, j) => {
          const b = el('button', { class: 'l03-chip', type: 'button', text: ts.t });
          tests.append(b);
          k.on(b, 'click', async () => {
            if (tests.dataset.busy) return;
            tests.dataset.busy = '1'; b.classList.add('on', 'seen');
            cbtn.forEach(c => c.classList.remove('fit'));
            await play(ts);
            if (!k.alive) return;
            cbtn.forEach((c, i) => { c.classList.add('fit'); c.querySelector('small').textContent = '✓ ' + CANDS[i].why[j]; });
            api.sfx('tick');
            done.add(ts.id); delete tests.dataset.busy;
            if (ts.id === 'same') hint('可你问的“同一个”，本身也得先翻译成他的话。');
            else if (done.size < TESTS.length) hint(`四个候选，全都相符。还剩 ${TESTS.length - done.size} 个测试。`);
            if (done.size === TESTS.length) res();
          });
        });
        hint('点一个测试。');
      });
      await api.wait(900);
      await say(['四个测试，四个候选，一个都没掉。', '这是奎因（Quine）1960 年的思想实验。所有**行为证据**，都同样符合这几种翻译。',
        '他的结论是：不存在一个**事实**来决定哪个对。这叫**翻译的不确定性**。']);
      api.collect('l03-gavagai');
      await say('而且不必远行。你和邻居说同一种语言，也无法完全确定他的“牛”和你的是同一个函数。翻译从家里就开始了。');

      // coda · only differences
      const coda = el('div', { class: 'l03-panel' });
      const strip = el('div', { class: 'l03-strip', style: 'background:linear-gradient(90deg,hsl(200 80% 78%),hsl(212 75% 55%) 50%,hsl(228 70% 26%))' });
      const segA = el('div', { class: 'seg', style: 'left:0;width:50%' }, el('div', null, 'голубой', el('small', { text: '浅蓝' })));
      const segB = el('div', { class: 'seg', style: 'left:50%;width:50%' }, el('div', null, 'синий', el('small', { text: '深蓝' })));
      const edge = el('div', { class: 'edge', style: 'left:50%' });
      strip.append(segA, segB, edge);
      const tog = el('button', { class: 'btn hue', type: 'button', text: '从系统里拿走 синий' });
      coda.append(el('div', { class: 'l03-lbl', text: '尾声 · 俄语怎样切开蓝色' }), strip, el('div', { class: 'l03-actions' }, tog));
      sec.append(coda);
      coda.scrollIntoView({ block: 'nearest', behavior: api.reduced ? 'auto' : 'smooth' });
      await say(['最后一件小事。单个符号是**任意**的：“牛”这个声音，英语里是 cow，法语里是 vache。', '可符号的**系统**一点也不随意。看这条带子：俄语用两个基本词切开蓝色。']);
      hint('拿走 синий 试试。');
      let removed = false;
      await new Promise(res => k.on(tog, 'click', () => {
        removed = !removed; api.sfx(removed ? 'whoosh' : 'select');
        segA.style.width = removed ? '100%' : '50%';
        segB.style.left = removed ? '100%' : '50%'; segB.style.width = removed ? '0%' : '50%'; segB.style.opacity = removed ? '0' : '1';
        edge.style.left = removed ? '100%' : '50%'; edge.style.opacity = removed ? '0' : '1';
        tog.textContent = removed ? '把 синий 放回去' : '从系统里拿走 синий';
        if (removed) res();
      }));
      await api.wait(1000);
      await say(['没有了 синий，голубой 就扩张到所有的蓝。它的意义，原来是被邻居划出来的。', '索绪尔（Saussure）说：**语言中只有差异，没有正面的项**。']);
      api.collect('l03-saussure');
    }

    /* ------------------------------------------------------------ flow */
    (async () => {
      api.progress(0, 4);
      await sceneA(); api.progress(1, 4);
      await sceneB(); api.progress(2, 4);
      await sceneC(); api.progress(3, 4);
      await sceneD(); api.progress(4, 4);
      await say('金色亮了。往后听到一个词，不妨先问一句：在哪个语境里？对谁而言？');
      api.complete({ summary: '词不是贴在事物上的标签，而是函数：**意义 = f(词, 语境, 使用者)**。弗雷格把概念看作函数，又分开了含义与指称；弗斯说观其所伴，今天的语言模型把这个函数学了出来；奎因则提醒：指称也许永远无法被行为证据钉死。' });
    })();

    return () => { if (kit) kit.end(); };
  }

  Lens.registerLevel({
    id: 'l03', no: 3,
    name: '函数机',
    subtitle: '词是函数',
    continent: 'lang',
    blurb: '吃词的黄铜机器、其实是同一颗的两颗星、词的星座，和哲学史上最著名的一只兔子。',
    steps: 4,
    cards: CARDS,
    mount,
  });
})();

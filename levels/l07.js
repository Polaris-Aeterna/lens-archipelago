/* 透镜群岛 · LENS 07 · 塔斯基之塔 —— 真、递归与可能世界
 * 场景：A 说谎者（元语言、T 模式、不可定义性）→ B 递归之井 + 三台机器（递归、丘奇–图灵论题）
 *       → C 可能世界（克里普克语义、公理 T）→ D 停走的钟（盖提尔）→ 塔的全景
 * 知识来源：language-lens/ch07.tex（正文、背景框、公式框、辨析框）。
 */
(function () {
  'use strict';

  const CARDS = [
    {
      id: 'l07-liar', title: '说谎者悖论与元语言', en: 'The liar paradox & metalanguage',
      body: '“这句话是假的”：若它为真，它就是假的；若它为假，它就是真的。塔斯基的出路是**分层**：被谈论的语言叫**对象语言**，用来谈论它的语言叫**元语言**，“真”“假”是元语言里的词。一种语言若既能谈论自己的句子、又有自己的“真”，就躲不开这个悖论。日常汉语正是这样；形式语言则靠分层避开了它。',
      ref: 'Tarski, “The Concept of Truth in Formalized Languages”, 1933（英译 1956）；“The Semantic Conception of Truth”, 1944',
    },
    {
      id: 'l07-tschema', title: 'T 模式', en: 'Convention T · the T-schema',
      body: '对于对象语言中的每个句子 S：“S”是真的，当且仅当 S。左边带引号，是在**谈论**这个句子；右边不带引号，是在**使用**它、谈论世界。例：“Snow is white”（在英语中）是真的，当且仅当雪是白的。塔斯基要求任何合格的真定义都能推出它的全部实例；紧缩论者则认为，关于“真”能说的，已经被它说尽了。',
      ref: 'Tarski 1944；Ramsey, “Facts and Propositions”, 1927；Horwich, Truth, 1990',
    },
    {
      id: 'l07-undef', title: '塔斯基不可定义性定理', en: "Tarski's undefinability theorem",
      body: '在算术的语言里，不存在一个公式 True(x)，使得对每个句子 φ 都有：True(#φ) 当且仅当 φ 在自然数中成立（#φ 是 φ 的编号）。证明的思路，正是把说谎者句“翻译”进算术。结论：足够强的语言不能定义**自己的**真；“真”只能到上一层元语言里去定义，那一层的“真”又要到再上一层，形成一个层级。',
      ref: 'Tarski 1933/1956；Tarski 1944',
    },
    {
      id: 'l07-recursion', title: '递归', en: 'Recursion',
      body: '用一个东西自己（在更小的输入上）来定义它自己，再加上一个让过程停下来的**起点**：0! = 1，n! = n × (n − 1)!。展开时层层下沉，触底后带着答案层层返回。没有起点的递归，就像“从前有座山，山里有座庙……”，永远讲不完。塔斯基的真定义本身也是递归的：复合句的真，由组成部分一步步定义出来。',
      ref: 'Hofstadter, Gödel, Escher, Bach, 1979',
    },
    {
      id: 'l07-ct', title: '丘奇–图灵论题', en: 'The Church–Turing thesis',
      body: '1930 年代，一般递归函数、λ 演算、图灵机三种出发点完全不同的“可计算”定义，被证明**等价**：能算的函数恰好是同一批。丘奇–图灵论题说：一个人按机械规则、用纸笔在有限步内能算出的函数，都是图灵机可计算的。它是**论题**而非定理，因为“能行可计算”是直观概念，无法被证明；图灵分析的，正是一个人类计算员。',
      ref: 'Church 1936；Turing 1936；Kleene 1936；Turing 1937',
    },
    {
      id: 'l07-kripke', title: '可能世界语义学', en: 'Possible-world (Kripke) semantics',
      body: '克里普克（1959、1963）在世界之间加上**可达关系** R：“必然 P”在世界 w 为真，当且仅当 P 在所有从 w 可达的世界中为真；“可能 P”只需至少一个。模态公理恰好对应 R 的性质：T（必然 P → P）对应自反，4 对应传递，B 对应对称。同一个“必然”，还可以读作“知道”“应当”或“可证”。',
      ref: 'Kripke 1959；Kripke 1963；Kripke, Naming and Necessity, 1980',
    },
    {
      id: 'l07-gettier', title: '盖提尔问题', en: 'The Gettier problem',
      body: '传统上，“知道 P” = P 为真 + 你相信 P + 你的相信有理由（简称 JTB）。盖提尔 1963 年用三页纸给出反例：三样都齐，真却是**碰巧**撞上的。罗素 1948 年那只停了的钟、8 世纪印度佛教哲学家法上讲的“海市蜃楼下恰好有水”，都是同一类故事。问题出在运气：理由和真相之间断了线。',
      ref: 'Gettier, “Is Justified True Belief Knowledge?”, Analysis, 1963；Russell, Human Knowledge, 1948',
    },
  ];

  const CSS = `
.l07-wrap{max-width:900px;margin:0 auto;padding-top:14px;display:grid;gap:12px}
.l07-wrap>*{min-width:0}
.l07-in{animation:l07in .7s ease both}
@keyframes l07in{from{opacity:0;transform:translateY(8px)}}
.l07-head{display:grid;gap:2px;padding:2px 2px 0}
.l07-kick{font-family:var(--f-mono);font-size:11px;letter-spacing:.22em;color:hsl(var(--hue) 70% 70%)}
.l07-title{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(26px,5.6vw,38px);line-height:1.15;text-shadow:0 0 26px hsl(var(--hue) 85% 62% / .35)}
.l07-line{margin:0;font-family:var(--f-serif);font-size:14px;color:var(--dim)}
.l07-body{display:grid;gap:12px;min-width:0}
.l07-stage{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--line);
  background:radial-gradient(120% 80% at 50% 105%,hsl(var(--hue) 60% 16% / .55),rgba(5,8,15,0) 70%),linear-gradient(180deg,rgba(9,15,28,.86),rgba(5,8,15,.94))}
.l07-tall{height:clamp(260px,50vh,470px)}
.l07-mid{height:clamp(240px,42vh,400px)}
.l07-cap{margin:0;min-height:1.7em;text-align:center;font-family:var(--f-serif);font-size:15px;color:var(--dim);text-wrap:balance}
.l07-ctl{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;min-height:46px}
.l07-ctl .btn[disabled]{opacity:.45;cursor:default}
.l07-plaque{display:flex;flex-wrap:wrap;gap:8px 14px;justify-content:center;align-items:center;font-family:var(--f-mono);font-size:14px;color:var(--text)}
.l07-plaque .slot{border:1px dashed var(--line-strong);border-radius:8px;padding:3px 10px;color:var(--faint);transition:all .5s}
.l07-plaque .slot.on{border-style:solid;border-color:hsl(var(--hue) 80% 62%);color:hsl(var(--hue) 85% 76%);box-shadow:0 0 16px hsl(var(--hue) 85% 62% / .35)}
.l07-stone{font-family:var(--f-mono);font-size:18px;padding:0 22px;min-height:50px;border-radius:12px;border:1px solid hsl(var(--hue) 80% 70%);
  background:hsl(var(--hue) 70% 50% / .16);color:var(--text);cursor:pointer;box-shadow:0 0 22px hsl(var(--hue) 85% 62% / .45);animation:l07pulse 1.8s ease-in-out infinite}
@keyframes l07pulse{50%{box-shadow:0 0 36px hsl(var(--hue) 85% 62% / .8)}}
.l07-nums{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center}
.l07-numlbl{font-family:var(--f-mono);font-size:13px;color:var(--dim)}
.l07-num{width:44px;height:44px;border-radius:50%;border:1px solid var(--line-strong);background:rgba(255,255,255,.03);cursor:pointer;font-family:var(--f-mono);font-size:16px}
.l07-num.on{border-color:hsl(var(--hue) 80% 62%);background:hsl(var(--hue) 80% 62% / .2);box-shadow:0 0 14px hsl(var(--hue) 85% 62% / .4)}
.l07-mach{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
.l07-m{border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.025);padding:12px 12px 10px;display:grid;gap:8px;align-content:start;min-width:0;transition:border-color .5s,box-shadow .5s}
.l07-m.agree{border-color:hsl(var(--hue) 80% 62% / .8);box-shadow:0 0 26px hsl(var(--hue) 85% 62% / .22)}
.l07-mh{display:flex;align-items:baseline;justify-content:space-between;gap:8px;flex-wrap:wrap}
.l07-mh b{font-family:var(--f-display);font-weight:400;font-size:20px}
.l07-mh span{font-size:11px;color:var(--faint);font-family:var(--f-mono);letter-spacing:.04em}
.l07-code{font-family:var(--f-mono);font-size:12px;line-height:1.75;color:var(--faint);min-height:8.8em;white-space:pre-wrap;word-break:break-word}
.l07-code div{transition:color .4s}
.l07-code .on{color:var(--dim)}
.l07-code .hi{color:hsl(var(--hue) 85% 74%)}
.l07-code .hd{color:var(--faint);font-size:11px;border-bottom:1px solid var(--line);padding-bottom:4px;margin-bottom:4px}
.l07-out{font-family:var(--f-mono);font-size:22px;color:hsl(var(--hue) 85% 74%);min-height:1.4em;text-align:right;text-shadow:0 0 12px hsl(var(--hue) 85% 62% / .5)}
.l07-task{margin:0;font-family:var(--f-serif);font-size:15px;line-height:1.6;color:var(--text);text-align:center;min-height:1.6em;text-wrap:balance}
.l07-task b{color:hsl(var(--hue) 85% 74%);font-weight:600}
.l07-read{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.l07-r{border:1px solid var(--line);border-radius:12px;padding:7px 10px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:2px 8px;background:rgba(255,255,255,.02)}
.l07-r .k{font-family:var(--f-serif);font-size:15px;display:inline-flex;align-items:center;gap:3px;white-space:nowrap}
.l07-r .v{font-family:var(--f-mono);font-size:12.5px;font-weight:500;padding:1px 9px;border-radius:999px;border:1px solid var(--line);transition:all .3s}
.l07-r .v.t{color:#06121a;background:hsl(var(--hue) 80% 62%);border-color:transparent}
.l07-r .v.f{color:var(--bad);border-color:hsl(356 78% 66% / .5)}
.l07-r small{flex-basis:100%;font-size:11.5px;color:var(--faint);line-height:1.4}
.l07-r.warn{border-color:hsl(356 78% 66% / .55);box-shadow:0 0 14px hsl(356 78% 66% / .15)}
.l07-g{width:14px;height:14px;display:inline-block;flex:none}
.l07-lamps{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.l07-lamp{display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:999px;padding:6px 12px 6px 9px;font-size:13px;color:var(--faint);transition:all .45s}
.l07-lamp i{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.1);transition:all .45s;flex:none}
.l07-lamp b{font-family:var(--f-display);font-weight:400;font-size:17px;color:var(--dim)}
.l07-lamp.on{border-color:hsl(var(--hue) 80% 62% / .7);color:var(--text)}
.l07-lamp.on b{color:var(--text)}
.l07-lamp.on i{background:hsl(var(--hue) 85% 62%);box-shadow:0 0 12px hsl(var(--hue) 85% 62%)}
@media (max-width:520px){.l07-code{min-height:7.6em}.l07-lamp{font-size:12px;padding:5px 10px 5px 8px}}
`;

  const SUBS = '₀₁₂₃₄₅₆₇₈₉';
  const sub = n => String(n).split('').map(d => SUBS[+d] || d).join('');
  const ease = x => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const neg = n => (n < 0 ? `(−${-n})` : String(n));
  const TAU = Math.PI * 2;

  Lens.registerLevel({
    id: 'l07', no: 7, name: '塔斯基之塔', subtitle: '真、递归与可能世界', continent: 'logic',
    blurb: '一句谈论自己的话、一口有底的井、几颗互相张望的世界，和一只停了的钟。',
    steps: 4,
    cards: CARDS,
    mount(root, api) {
      api.css(CSS);
      const el = api.el, R = api.reduced, H = api.hue, lerp = api.lerp, clamp = api.clamp;
      const hc = (l, a, s) => `hsl(${H} ${s == null ? 85 : s}% ${l == null ? 62 : l}% / ${a == null ? 1 : a})`;
      const ROSE = a => `hsl(350 64% 66% / ${a == null ? 1 : a})`;
      const BEAM = a => `rgba(255,246,228,${a == null ? 1 : a})`;
      const cssv = getComputedStyle(document.documentElement);
      const fam = (k, d) => (cssv.getPropertyValue(k) || '').trim() || d;
      const F = { disp: fam('--f-display', 'serif'), serif: fam('--f-serif', 'serif'), mono: fam('--f-mono', 'monospace'), sans: fam('--f-sans', 'sans-serif') };
      const toward = (c, t, dt, k) => (R ? t : c + (t - c) * (1 - Math.exp(-(k || 6) * dt / 1000)));

      const wrap = el('div', { class: 'l07-wrap' });
      root.append(wrap);

      /* ---------------------------------------------------------------- scene plumbing */
      let stops = [];
      const endScene = () => { stops.splice(0).forEach(f => { try { f(); } catch (e) { /* ignore */ } }); };
      function scene(kick, title, line) {
        endScene();
        wrap.replaceChildren();
        const head = el('header', { class: 'l07-head' + (R ? '' : ' l07-in') },
          el('div', { class: 'l07-kick', text: kick }),
          el('h2', { class: 'l07-title', text: title }),
          line ? el('p', { class: 'l07-line', text: line }) : null);
        const body = el('div', { class: 'l07-body' + (R ? '' : ' l07-in') });
        wrap.append(head, body);
        try { root.scrollTo({ top: 0 }); } catch (e) { root.scrollTop = 0; }
        return body;
      }
      function loop(fn) { stops.push(api.raf(fn)); }
      function stageCanvas(parent, cls, touch) {
        const st = el('div', { class: 'l07-stage ' + (cls || '') });
        parent.append(st);
        return api.canvas(st, { style: `display:block;width:100%;height:100%;touch-action:${touch || 'manipulation'}` });
      }
      function pt(cv, e) { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
      function button(text, onclick, cls) { return el('button', { class: 'btn ' + (cls == null ? 'hue' : cls), type: 'button', text, onclick }); }
      function glow(ctx, c, b) { ctx.shadowColor = c; ctx.shadowBlur = b; }
      function rr(ctx, x, y, w, h, r) {
        ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
      }
      function pill(ctx, x, y, text, fs, o) {
        ctx.font = `${fs}px ${o.font || F.disp}`;
        const tw = ctx.measureText(text).width, pw = tw + fs * 0.9, ph = fs * 1.5;
        rr(ctx, x - pw / 2, y - ph / 2, pw, ph, ph / 2);
        ctx.fillStyle = o.fill; ctx.fill();
        if (o.glow) glow(ctx, hc(62), o.glow);
        ctx.strokeStyle = o.stroke; ctx.lineWidth = 1.4; ctx.stroke(); ctx.shadowBlur = 0;
        ctx.fillStyle = o.color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y + 1);
        return pw;
      }
      function mkStars(n) { const a = []; for (let i = 0; i < n; i++) a.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.1 + 0.3, p: Math.random() * 6.28 }); return a; }
      function drawStars(ctx, st, w, h, t) {
        for (const s of st) {
          const a = 0.16 + 0.3 * (R ? 0.5 : Math.sin(t * 0.0009 + s.p) ** 2);
          ctx.fillStyle = `rgba(230,236,255,${a})`; ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, TAU); ctx.fill();
        }
      }
      function fitFont(ctx, text, maxW, size, family, pre) {
        const pf = pre ? pre + ' ' : ''; let s = size; ctx.font = `${pf}${s}px ${family}`;
        const m = ctx.measureText(text).width;
        if (m > maxW) { s = Math.max(9, s * maxW / m); ctx.font = `${pf}${s}px ${family}`; }
        return s;
      }

      /* ================================================================ A · 说谎者 */
      async function sceneA() {
        api.progress(0, 4);
        const body = scene('第一层 · 对象语言', '说谎者', '一句话，开始谈论它自己。');
        const V = stageCanvas(body, 'l07-tall', 'none');
        const cap = el('p', { class: 'l07-cap' });
        const ctl = el('div', { class: 'l07-ctl' });
        body.append(cap, ctl);
        const stars = mkStars(40);
        const S = {
          phase: 'judge', truth: true, lamp: 1, flash: 0, acc: 0,
          trace: [{ t: performance.now(), v: true }],
          floors: 1, fl: 1, grow: 0, growTo: 0,
          tok: null, sel: false, back: false,
          eng: 0, liftAt: 0,
        };
        let now = performance.now(), drag = null, donePlace = null, doneLift = null;

        function lay() {
          const { ctx, w, h } = V;
          const gap = lerp(h * 0.36, h * 0.15, ease(S.grow));
          const y0 = h * 0.82;
          const fs = Math.round(clamp(w * 0.068, 20, 34));
          ctx.font = `${fs}px ${F.disp}`;
          const a = ctx.measureText('这句话是').width, b = ctx.measureText('假').width + fs * 0.9, c = ctx.measureText('的').width;
          const tot = a + b + c + 10, x0 = w / 2 - tot / 2 - 16, ty = y0 - fs * 0.95;
          return {
            w, h, gap, y0, fs, a, b, c, tot, x0, ty, fy: i => y0 - i * gap,
            home: { x: x0 + a + 5 + b / 2, y: ty }, lampP: { x: x0 + tot + 24, y: ty },
            slotF: { x: w / 2 + fs * 1.15, y: y0 - gap - fs * 0.95 }, slotT: { x: w / 2 - fs * 1.15, y: y0 - gap - fs * 0.95 },
          };
        }
        const liftP = () => (R ? 1 : clamp((now - S.liftAt) / 1500, 0, 1));
        const engPhase = () => S.phase === 'english' || S.phase === 'lifted' || S.phase === 'tower';
        const liarPhase = () => S.phase === 'judge' || S.phase === 'auto' || S.phase === 'drag';

        function drawTrace(ctx, x, y, W, Hh, t) {
          const span = 5000;
          ctx.save();
          ctx.font = `10px ${F.mono}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(162,173,196,.7)';
          ctx.fillText('真', x - 5, y + 4); ctx.fillText('假', x - 5, y + Hh - 4);
          ctx.strokeStyle = 'rgba(168,188,228,.14)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x, y + Hh / 2); ctx.lineTo(x + W, y + Hh / 2); ctx.stroke();
          const yv = v => (v === null ? y + Hh / 2 : v ? y + 4 : y + Hh - 4);
          ctx.beginPath();
          let first = true;
          const tr = S.trace;
          for (let i = 0; i < tr.length; i++) {
            const a = tr[i], b = tr[i + 1];
            const t0 = Math.max(a.t, t - span), t1 = b ? b.t : t;
            if (t1 < t - span) continue;
            const xa = x + W * (1 - (t - t0) / span), xb = x + W * (1 - (t - t1) / span), yy = yv(a.v);
            if (first) { ctx.moveTo(xa, yy); first = false; } else ctx.lineTo(xa, yy);
            ctx.lineTo(xb, yy);
          }
          ctx.strokeStyle = hc(72, 0.9); ctx.lineWidth = 1.5; glow(ctx, hc(62), 6); ctx.stroke();
          ctx.restore();
        }

        loop((t, dt) => {
          now = t;
          const { ctx } = V, L = lay(), { w, h } = L;
          ctx.clearRect(0, 0, w, h);
          drawStars(ctx, stars, w, h, t);
          if ((S.phase === 'auto' || S.phase === 'drag') && !R) { S.acc += dt; if (S.acc > 480) { S.acc = 0; S.truth = !S.truth; S.trace.push({ t, v: S.truth }); } }
          S.fl = toward(S.fl, S.floors, dt, 2.2);
          S.grow = toward(S.grow, S.growTo, dt, 1.1);
          S.lamp = toward(S.lamp, S.truth ? 1 : 0, dt, 16);
          S.flash = Math.max(0, S.flash - dt / 600);
          S.eng = toward(S.eng, engPhase() ? 1 : 0, dt, 2.5);
          while (S.trace.length > 2 && S.trace[1].t < t - 5200) S.trace.shift();

          // the tower: a beam of white light climbing through the floors once it grows
          if (S.grow > 0.01) {
            const bg = ctx.createLinearGradient(0, h, 0, 0);
            bg.addColorStop(0, BEAM(0.0)); bg.addColorStop(0.2, BEAM(0.25 * S.grow)); bg.addColorStop(1, hc(70, 0));
            ctx.fillStyle = bg; ctx.fillRect(w / 2 - 1, 0, 2, h);
          }
          for (let i = 0; i < 9; i++) {
            const vis = clamp(S.fl - i, 0, 1); if (vis <= 0) break;
            const y = L.fy(i); if (y < 10) break;
            const fade = vis * (i >= 2 ? Math.max(0.16, 1 - (i - 1) * 0.15) : 1);
            const half = Math.min(w * 0.44, 360) * (1 - Math.min(i, 7) * 0.045);
            const gr = ctx.createLinearGradient(w / 2 - half, 0, w / 2 + half, 0);
            gr.addColorStop(0, hc(62, 0)); gr.addColorStop(0.5, hc(74, 0.9 * fade)); gr.addColorStop(1, hc(62, 0));
            ctx.fillStyle = gr; ctx.fillRect(w / 2 - half, y, half * 2, 1.6);
            const ug = ctx.createLinearGradient(0, y, 0, y + 16);
            ug.addColorStop(0, hc(62, 0.1 * fade)); ug.addColorStop(1, hc(62, 0));
            ctx.fillStyle = ug; ctx.fillRect(w / 2 - half, y, half * 2, 16);
            ctx.font = `11px ${F.mono}`; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
            ctx.fillStyle = `rgba(162,173,196,${0.85 * fade})`;
            const lbl = 'L' + sub(i) + (i === 0 ? '  对象语言' : i === 1 ? '  元语言' : '  谈论 L' + sub(i - 1) + ' 的“真”');
            if (i < 2 || S.grow > 0.2) ctx.fillText(lbl, Math.max(10, w / 2 - half), y + 5);
          }
          if (S.grow > 0.4) {
            ctx.font = `18px ${F.serif}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillStyle = hc(80, 0.6 * S.grow); ctx.fillText('⋮', w / 2, 2);
          }

          // floor 0 — the liar
          const liarA = 1 - S.eng;
          if (liarA > 0.01) {
            ctx.save(); ctx.globalAlpha = liarA;
            ctx.font = `${L.fs}px ${F.disp}`; ctx.textBaseline = 'middle';
            const dead = !liarPhase();
            const part = (txt, x, align) => {
              ctx.textAlign = align || 'left';
              if (dead) { ctx.fillStyle = 'rgba(162,173,196,.45)'; ctx.fillText(txt, x, L.ty); return; }
              ctx.fillStyle = ROSE(0.9 * (1 - S.lamp)); ctx.fillText(txt, x, L.ty);
              glow(ctx, hc(62), 16 * S.lamp); ctx.fillStyle = hc(82, S.lamp); ctx.fillText(txt, x, L.ty); ctx.shadowBlur = 0;
            };
            part('这句话是', L.x0);
            part('的', L.x0 + L.a + 10 + L.b);
            if (S.phase === 'judge' || S.phase === 'auto') part('假', L.home.x, 'center');
            else {
              ctx.setLineDash([3, 4]); ctx.strokeStyle = dead ? 'rgba(162,173,196,.35)' : hc(72, 0.5); ctx.lineWidth = 1.2;
              rr(ctx, L.home.x - L.b / 2, L.ty - L.fs * 0.72, L.b, L.fs * 1.44, 8); ctx.stroke(); ctx.setLineDash([]);
            }
            // lamp
            const lp = L.lampP;
            ctx.beginPath(); ctx.arc(lp.x, lp.y, 9, 0, TAU);
            if (!dead) {
              const on = S.lamp;
              glow(ctx, on > 0.5 ? hc(62) : ROSE(), 14 + 18 * S.flash);
              ctx.fillStyle = on > 0.5 ? hc(74, 0.45 + 0.55 * on) : ROSE(0.3 + 0.6 * (1 - on)); ctx.fill(); ctx.shadowBlur = 0;
              ctx.font = `11px ${F.mono}`; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(162,173,196,.85)';
              ctx.fillText(R && (S.phase === 'auto' || S.phase === 'drag') ? '真/假' : (S.truth ? '真' : '假'), lp.x, lp.y + 21);
            } else {
              ctx.strokeStyle = 'rgba(162,173,196,.4)'; ctx.lineWidth = 1.2; ctx.stroke();
              ctx.font = `11px ${F.mono}`; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(162,173,196,.6)';
              ctx.fillText('—', lp.x, lp.y + 21);
            }
            ctx.restore();
          }

          // the movable word
          if (S.phase === 'drag') {
            if (!drag && S.tok && S.back) {
              S.tok.x = toward(S.tok.x, L.home.x, dt, 10); S.tok.y = toward(S.tok.y, L.home.y, dt, 10);
              if (Math.hypot(S.tok.x - L.home.x, S.tok.y - L.home.y) < 1) { S.tok = null; S.back = false; }
            }
            // drop target on floor 1
            const pa = R ? 0.55 : 0.35 + 0.25 * Math.sin(t * 0.005);
            ctx.setLineDash([4, 5]); ctx.strokeStyle = hc(74, pa); ctx.lineWidth = 1.3;
            rr(ctx, L.slotF.x - L.fs * 0.9, L.slotF.y - L.fs * 0.75, L.fs * 1.8, L.fs * 1.5, L.fs * 0.75); ctx.stroke(); ctx.setLineDash([]);
            ctx.font = `12px ${F.sans}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = hc(80, pa);
            ctx.fillText('放到这一层', L.slotF.x, L.slotF.y + L.fs * 1.25);
            const p = S.tok || L.home;
            if (S.sel) {
              ctx.beginPath(); ctx.arc(p.x, p.y, L.fs * (R ? 1.05 : 1.0 + 0.12 * Math.sin(t * 0.008)), 0, TAU);
              ctx.strokeStyle = BEAM(0.6); ctx.lineWidth = 1.2; ctx.stroke();
            }
            pill(ctx, p.x, p.y, '假', L.fs * 0.85, { fill: hc(30, 0.85, 60), stroke: hc(78), color: BEAM(1), glow: 16 });
          }
          // after placing: the truth words live upstairs and look down
          if (!liarPhase() && S.tok) {
            S.tok.x = toward(S.tok.x, L.slotF.x, dt, 7); S.tok.y = toward(S.tok.y, L.slotF.y, dt, 7);
            const pa = 1 - S.eng;
            if (pa > 0.01) {
              ctx.save(); ctx.globalAlpha = pa;
              pill(ctx, L.slotT.x, L.slotT.y, '真' + sub(0), L.fs * 0.75, { fill: hc(26, 0.8, 55), stroke: hc(74), color: BEAM(0.95), glow: 10 });
              pill(ctx, S.tok.x, S.tok.y, '假' + sub(0), L.fs * 0.75, { fill: hc(26, 0.8, 55), stroke: hc(74), color: BEAM(0.95), glow: 10 });
              ctx.setLineDash([2, 5]); ctx.strokeStyle = hc(74, 0.5); ctx.lineWidth = 1.2;
              ctx.beginPath(); ctx.moveTo(w / 2, L.slotF.y + L.fs * 0.85); ctx.lineTo(w / 2, L.ty - L.fs * 0.85); ctx.stroke(); ctx.setLineDash([]);
              ctx.font = `11px ${F.sans}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = hc(80, 0.75);
              ctx.fillText('只谈论 L' + sub(0) + ' 的句子', w / 2 + 8, (L.slotF.y + L.ty) / 2);
              ctx.restore();
            }
          }

          // T-schema
          if (S.eng > 0.01) {
            const la = S.eng * (S.phase === 'tower' ? lerp(1, 0.32, ease(S.grow)) : 1);
            const lp = S.phase === 'english' ? 0 : liftP();
            const y1 = L.fy(1);
            ctx.save(); ctx.globalAlpha = la;
            const efs = fitFont(ctx, 'Snow is white', w * 0.6, L.fs * 0.95, F.serif, 'italic');
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            glow(ctx, hc(62), 10); ctx.fillStyle = hc(82, 1); ctx.fillText('Snow is white', w / 2, L.ty); ctx.shadowBlur = 0;
            if (S.phase === 'english') {
              const pa = R ? 0.6 : 0.4 + 0.3 * Math.sin(t * 0.005);
              ctx.font = `12px ${F.sans}`; ctx.fillStyle = hc(80, pa); ctx.fillText('点我', w / 2, L.ty + efs * 0.95);
            }
            const fs2 = fitFont(ctx, '“Snow is white” 是真的', w * 0.82, Math.min(22, L.fs * 0.82), F.serif);
            const l1y = y1 - fs2 * 2.1, l2y = y1 - fs2 * 0.85;
            const q1 = '“Snow is white”', q2 = ' 是真的';
            ctx.font = `${fs2}px ${F.serif}`;
            const wq = ctx.measureText(q1).width, wr2 = ctx.measureText(q2).width, sx = w / 2 - (wq + wr2) / 2;
            if (lp < 1) {
              ctx.globalAlpha = la * (1 - ease(lp));
              ctx.fillStyle = 'rgba(162,173,196,.8)'; ctx.textAlign = 'center';
              ctx.fillText('“ S ” 是真的', w / 2, l1y); ctx.fillText('当且仅当  S', w / 2, l2y);
              ctx.globalAlpha = la;
            }
            if (lp > 0) {
              const e = ease(clamp(lp / 0.7, 0, 1));
              const mx = lerp(w / 2, sx + wq / 2, e), my = lerp(L.ty, l1y, e);
              ctx.font = `italic ${lerp(efs, fs2, e)}px ${F.serif}`; ctx.textAlign = 'center';
              glow(ctx, hc(62), 12); ctx.fillStyle = BEAM(0.95);
              ctx.fillText(lp > 0.55 ? q1 : 'Snow is white', mx, my); ctx.shadowBlur = 0;
              const rA = clamp((lp - 0.55) / 0.45, 0, 1);
              if (rA > 0) {
                ctx.globalAlpha = la * rA; ctx.font = `${fs2}px ${F.serif}`; ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(232,236,245,.95)';
                ctx.fillText(q2, sx + wq, l1y);
                ctx.textAlign = 'center'; ctx.fillText('当且仅当  雪是白的', w / 2, l2y);
                const lx = w / 2 + ctx.measureText('当且仅当  雪是白的').width / 2 + 16;
                ctx.beginPath(); ctx.arc(lx, l2y, 6, 0, TAU); glow(ctx, hc(62), 14); ctx.fillStyle = hc(76, 1); ctx.fill(); ctx.shadowBlur = 0;
                ctx.globalAlpha = la;
              }
            }
            ctx.restore();
          }

          if (S.phase !== 'tower' && S.phase !== 'english' && S.phase !== 'lifted') drawTrace(ctx, 34, 14, Math.min(190, w * 0.42), 26, t);
        });

        /* pointer: drag the word "假" up one floor; or tap it, then tap the floor */
        function place() {
          if (S.phase !== 'drag') return;
          if (!S.tok) { const L = lay(); S.tok = { x: L.home.x, y: L.home.y }; }
          S.phase = 'placed'; S.sel = false; drag = null; S.back = false;
          S.trace.push({ t: now, v: null });
          api.sfx('ok'); ctl.replaceChildren();
          if (donePlace) { const r = donePlace; donePlace = null; r(); }
        }
        function lift() {
          if (S.phase !== 'english') return;
          S.phase = 'lifted'; S.liftAt = now; api.sfx('whoosh'); ctl.replaceChildren();
          api.timeout(() => { api.sfx('chime'); if (doneLift) { const r = doneLift; doneLift = null; r(); } }, R ? 60 : 1700);
        }
        const midY = L => (L.fy(0) + L.fy(1)) / 2 + L.fs * 0.2;
        api.listen(V.canvas, 'pointerdown', e => {
          const p = pt(V.canvas, e), L = lay();
          if (S.phase === 'drag') {
            const tp = S.tok || L.home;
            if (Math.hypot(p.x - tp.x, p.y - tp.y) < Math.max(34, L.fs * 1.1)) {
              drag = { id: e.pointerId, ox: tp.x - p.x, oy: tp.y - p.y, sx: p.x, sy: p.y, moved: false };
              S.tok = { x: tp.x, y: tp.y }; S.back = false;
              try { V.canvas.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
            } else if (S.sel && p.y < midY(L)) place();
            else if (S.sel) S.sel = false;
          } else if (S.phase === 'english') {
            if (Math.abs(p.y - L.ty) < 40 && Math.abs(p.x - L.w / 2) < L.w * 0.42) lift();
          }
        });
        api.listen(V.canvas, 'pointermove', e => {
          if (!drag || e.pointerId !== drag.id || !S.tok) return;
          const p = pt(V.canvas, e);
          S.tok.x = clamp(p.x + drag.ox, 10, V.w - 10); S.tok.y = clamp(p.y + drag.oy, 10, V.h - 10);
          if (Math.hypot(p.x - drag.sx, p.y - drag.sy) > 8) drag.moved = true;
        });
        const up = e => {
          if (!drag || e.pointerId !== drag.id) return;
          const d = drag; drag = null;
          if (S.phase !== 'drag') return;
          const L = lay();
          if (d.moved && S.tok && S.tok.y < midY(L)) place();
          else if (!d.moved) { S.sel = !S.sel; S.tok = null; api.sfx('tick'); }
          else S.back = true;
        };
        api.listen(V.canvas, 'pointerup', up);
        api.listen(V.canvas, 'pointercancel', up);

        /* flow */
        if (!api.replay) {
          await api.say('欢迎来到**塔斯基之塔**。这座塔的每一层，都是一种语言。');
          await api.quiz({
            kicker: '塔门上的两行字',
            q: '哪一行**合乎语法**？',
            sub: '甲：无色的绿色想法狂暴地睡觉。\n乙：睡觉狂暴地想法绿色的无色的。',
            options: [
              { t: '甲合乎语法，乙不合', ok: true, why: '对。甲是乔姆斯基（Chomsky）1957 年造的句子：语法无可挑剔，意思却说不通，想法没有颜色，“无色”和“绿色”还互相矛盾。合不合语法（**句法**）和有没有意义（**语义**），是两回事。' },
              { t: '两行都不合语法', why: '甲其实挑不出语法毛病：形容词、名词、副词、动词各就各位。它只是**没有意义**。' },
              { t: '两行都合语法', why: '乙把词序倒了过来，连语法也不合了。' },
            ],
          });
          await api.say('句法管“写得合不合规矩”，语义管“指什么、真不真”。我们去看看“真”。');
        }
        await api.say(api.replay ? '底层又亮起了那句话。判它为真，还是为假？' : ['塔的底层只有一句发光的话。它在谈论……它自己。', '帮它判断一下：它是真的，还是假的？']);
        await new Promise(res => {
          let n = 0, busy = false;
          const go = v => {
            if (busy || S.phase !== 'judge') return;
            busy = true; api.sfx('select');
            S.truth = v; S.trace.push({ t: now, v });
            cap.textContent = v ? '你判它为真。那它说的就成立：它是假的。' : '你判它为假。那它说的就不成立：它是真的。';
            api.timeout(() => {
              S.truth = !v; S.trace.push({ t: now, v: !v }); S.flash = 1; api.sfx('bad');
              n += 1; busy = false;
              if (n >= 3) { ctl.replaceChildren(); res(); }
            }, R ? 300 : 850);
          };
          ctl.replaceChildren(button('判为真', () => go(true)), button('判为假', () => go(false)));
          api.hint('判它为真，或判它为假。多判几次。');
        });
        S.phase = 'auto'; S.acc = 0;
        cap.textContent = R ? '真 → 假 → 真 → 假 → ……' : '若真则假，若假则真……';
        await api.say(['它在真和假之间来回翻，自己停不下来了。', '也许问题不在答案，而在这句话**站在哪一层**。']);

        S.phase = 'drag'; S.floors = 2;
        cap.textContent = '“真”“假”这两个词，该住在哪一层？';
        api.hint('把“假”字拖到上一层去。（也可以先点它，再点上面那层。）');
        api.timeout(() => { if (S.phase === 'drag') ctl.replaceChildren(button('帮我搬上去', place, '')); }, 15000);
        await new Promise(res => { donePlace = res; });
        cap.textContent = '';
        await api.say([
          '“真”“假”搬到了上一层。L₀ 里没有这两个词，那句话就造不出来了。',
          '在 L₁ 说“这句话是假₀的”呢？假₀ 只谈论 L₀ 的句子，于是它只是平平常常地不成立。',
          '闪烁停了。谈论真假的一层叫**元语言**，被谈论的一层叫**对象语言**。',
        ]);
        api.collect('l07-liar');

        S.phase = 'english';
        await api.say('换一句老实的话。现在 L₀ 是英语，L₁ 是汉语。');
        api.hint('点一下下面那句英语，把它举到上一层。');
        api.timeout(() => { if (S.phase === 'english') ctl.replaceChildren(button('把它举上去', lift, '')); }, 12000);
        await new Promise(res => { doneLift = res; });
        await api.say([
          '左边加了引号，是在**谈论**一句话；右边没有引号，是在谈论雪。',
          '“S”是真的，当且仅当 S。这就是塔斯基的 **T 模式**。',
        ]);
        api.collect('l07-tschema');

        await api.say('可 L₁ 也有自己的句子。它们的“真”，又该到哪一层去谈？');
        S.phase = 'tower'; S.floors = 9; S.growTo = 1; api.sfx('whoosh');
        await api.wait(R ? 100 : 2300);
        await api.say([
          '再上一层，再上一层……塔就这样长了上去。',
          '塔斯基证明：在算术的语言里，写不出一个公式来定义它自己的“真”。',
          '足够强的语言，定义不了**自己的**真。日常汉语什么都能谈，所以躲不开说谎者。',
        ]);
        api.collect('l07-undef');
        await api.say('塔往上没有顶。我们先往下走：塔底有一口井。');
      }

      /* ================================================================ B · 递归之井 */
      async function sceneB() {
        api.progress(1, 4);
        const body = scene('塔底 · 井', '递归之井', '用更小的自己定义自己，还要有一块底。');
        const slot = el('span', { class: 'slot', text: '起点：（空）' });
        body.append(el('div', { class: 'l07-plaque' }, el('span', { text: '规则：n! = n × (n − 1)!' }), slot));
        const V = stageCanvas(body, 'l07-tall', 'manipulation');
        const cap = el('p', { class: 'l07-cap' }), ctl = el('div', { class: 'l07-ctl' });
        body.append(cap, ctl);
        const Q = 0.64, N0 = 4;
        const Wl = { depth: 0, seen: 0, z: 0, base: false, bt: 0, vals: {}, phase: 'intro', orb: 1, orbD: -1 };
        let onTap = null;

        function ringText(d) {
          const n = N0 - d;
          if (Wl.vals[d] != null) return d === 4 ? '0! = 1' : `${n}! = ${n} × ${Wl.vals[d + 1]} = ${Wl.vals[d]}`;
          if (Wl.base && d === 4) return '0! = 1';
          if (d <= Wl.seen) return `${neg(n)}! = ${neg(n)} × ${neg(n - 1)}!`;
          return null;
        }
        loop((t, dt) => {
          const { ctx, w, h } = V;
          ctx.clearRect(0, 0, w, h);
          Wl.z = toward(Wl.z, Wl.depth, dt, 4);
          Wl.bt = toward(Wl.bt, Wl.base ? 1 : 0, dt, 2.4);
          Wl.orb = toward(Wl.orb, 1, dt, 3.2);
          const cx = w / 2, cy = h / 2, Rm = Math.min(w, h) * 0.47, diag = Math.hypot(w, h);
          const last = Wl.base && Wl.bt > 0.995 ? 4 : 40;
          for (let d = 0; d <= last; d++) {
            const r = Rm * Math.pow(Q, d - Wl.z);
            if (r > diag) continue;
            if (r < 1) break;
            const ghost = Wl.base && d > 4 ? 1 - Wl.bt : 1;
            if (ghost < 0.01) continue;
            const open = d <= Wl.seen || (Wl.base && d === 4);
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU);
            ctx.fillStyle = `hsl(${H} ${open ? 42 : 24}% ${d % 2 ? 9.5 : 6}% / ${ghost})`; ctx.fill();
            ctx.lineWidth = open ? 1.4 : 1;
            ctx.strokeStyle = open ? hc(72, 0.7 * ghost) : hc(62, 0.15 * ghost); ctx.stroke();
            const txt = ringText(d);
            if (txt) {
              let fs = Math.min(22, r * 0.15);
              if (fs >= 6.5) {
                ctx.font = `${fs}px ${F.mono}`;
                const mw = ctx.measureText(txt).width, lim = r * 1.06;
                if (mw > lim) { fs *= lim / mw; ctx.font = `${fs}px ${F.mono}`; }
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                const hot = Wl.vals[d] != null;
                if (hot) glow(ctx, hc(62), 10);
                ctx.fillStyle = hot ? BEAM(0.95 * ghost) : hc(80, 0.9 * ghost);
                ctx.fillText(txt, cx, cy - r * (1 + Q) / 2);
                ctx.shadowBlur = 0;
              }
            }
          }
          if (Wl.base) {
            const rb = Rm * Math.pow(Q, 4 - Wl.z) * Q * 0.94;
            if (rb > 0.5) {
              const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rb);
              g.addColorStop(0, BEAM(0.9 * Wl.bt)); g.addColorStop(0.35, hc(76, 0.5 * Wl.bt)); g.addColorStop(1, hc(62, 0));
              ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rb, 0, TAU); ctx.fill();
            }
          } else {
            const a = 0.3 + (R ? 0 : 0.18 * Math.sin(t * 0.003));
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 12);
            g.addColorStop(0, hc(82, a)); g.addColorStop(1, hc(62, 0));
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 12, 0, TAU); ctx.fill();
          }
          if (Wl.orbD >= 0 && Wl.orb < 0.995) {
            const d = Wl.orbD;
            const r0 = Rm * Math.pow(Q, d + 1 - Wl.z) * (1 + Q) / 2, r1 = Rm * Math.pow(Q, d - Wl.z) * (1 + Q) / 2;
            const rad = lerp(r0, r1, ease(Wl.orb)), an = -Math.PI / 2 - 0.55;
            glow(ctx, BEAM(), 18); ctx.fillStyle = BEAM(1);
            ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rad, cy + Math.sin(an) * rad, 4.5, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
          }
        });
        api.listen(V.canvas, 'click', () => { if (onTap) onTap(); });

        await api.say(api.replay ? '井口刻着一条规则。往下走吧。' : [
          '这是塔底的井。井口刻着一条规则：n! = n × (n − 1)!',
          '要算 4!，得先算 3!；要算 3!，得先算 2!……我们往下走。',
        ]);
        Wl.phase = 'down'; cap.textContent = '4! = 4 × 3!';
        await new Promise(res => {
          const b = button('下潜一层', () => down());
          ctl.replaceChildren(b);
          api.hint('按“下潜一层”，或点一下井口，把 4! 一层层展开。');
          function down() {
            if (Wl.phase !== 'down') return;
            Wl.depth += 1; Wl.seen = Wl.depth; api.sfx('tick');
            const n = N0 - Wl.depth;
            cap.textContent = n > 0 ? `${n}! = ${n} × ${n - 1}!`
              : n === 0 ? '0! = 0 × (−1)!？好像哪里不对……'
                : n === -1 ? '(−1)! = (−1) × (−2)!……还在往下。'
                  : '从前有座山，山里有座庙，庙里有个老和尚在讲故事，讲的是：从前有座山……';
            if (Wl.depth >= 6) { Wl.phase = 'stuck'; b.disabled = true; onTap = null; res(); }
          }
          onTap = down;
        });
        await api.say([
          '等等：0 下面还有 −1，−1 下面还有 −2……这口井没有底。',
          '没有起点的递归，就像“从前有座山”，永远讲不完。',
          '它缺一块**基石**：0! = 1。把它放进井底。',
        ]);
        await new Promise(res => {
          const stone = el('button', {
            class: 'l07-stone', type: 'button', text: '0! = 1', 'aria-label': '基石 0! = 1',
            onclick: () => {
              if (Wl.base) return;
              Wl.base = true; Wl.depth = 4; Wl.seen = 4; Wl.vals[4] = 1; Wl.phase = 'based';
              slot.textContent = '起点：0! = 1'; slot.classList.add('on');
              api.sfx('chime'); ctl.replaceChildren(); cap.textContent = '0! = 1：井有了底。'; res();
            },
          });
          ctl.replaceChildren(stone);
          api.hint('点一下发光的基石“0! = 1”，把它放进井底。');
        });
        await api.say('现在带着答案，一层层往回走。');
        Wl.phase = 'up';
        await new Promise(res => {
          const b = button('带着答案上浮', () => up());
          ctl.replaceChildren(b);
          api.hint('按“带着答案上浮”，或点一下井口。');
          function up() {
            if (Wl.phase !== 'up' || Wl.depth <= 0) return;
            const d = Wl.depth - 1;
            Wl.vals[d] = (N0 - d) * Wl.vals[d + 1];
            Wl.depth = d; Wl.orb = 0; Wl.orbD = d; api.sfx('select');
            cap.textContent = `${N0 - d}! = ${N0 - d} × ${Wl.vals[d + 1]} = ${Wl.vals[d]}`;
            if (d === 0) { Wl.phase = 'done'; b.disabled = true; onTap = null; api.sfx('ok'); res(); }
          }
          onTap = up;
        });
        await api.say([
          '4! = 24。下沉时把问题变小，触底后把答案一层层带回来。',
          '这就是**递归**：用更小的自己定义自己，再加一块让它停下的基石。',
        ]);
        api.collect('l07-recursion');
        await api.say('塔斯基的“真”也是递归定义的：复合句的真，由组成部分一步步定义出来。');

        /* ---- three machines */
        const b2 = scene('塔底 · 三台机器', '同一个答案', '三种出发点完全不同的“计算”。');
        let sel = 3, running = false, onSeen = null;
        const seen = new Set();
        const nums = [1, 2, 3, 4].map(k => el('button', {
          class: 'l07-num' + (k === sel ? ' on' : ''), type: 'button', text: String(k), 'aria-label': '输入 n = ' + k,
          onclick: () => { if (running) return; sel = k; nums.forEach((x, i) => x.classList.toggle('on', i + 1 === k)); api.sfx('tick'); resetM(); },
        }));
        const runB = button('三台一起运行', () => run());
        b2.append(el('div', { class: 'l07-ctl' }, el('div', { class: 'l07-nums' }, el('span', { class: 'l07-numlbl', text: 'n =' }), ...nums), runB));
        const cap2 = el('p', { class: 'l07-cap' });
        const grid = el('div', { class: 'l07-mach' });
        b2.append(cap2, grid);
        function mk(title, subt) {
          const out = el('div', { class: 'l07-out' }), mid = el('div');
          const box = el('div', { class: 'l07-m' }, el('div', { class: 'l07-mh' }, el('b', { text: title }), el('span', { text: subt })), mid, out);
          grid.append(box);
          return { box, mid, out };
        }
        const mT = mk('图灵机', '纸带 · 读写头 · 有限个状态');
        const tapeV = api.canvas(mT.mid, { style: 'display:block;width:100%;height:66px' });
        mT.mid.append(el('div', { class: 'l07-code', style: 'min-height:0', text: '左边是输入 n 个记号；机器来回搬运、改写，在右边留下 n! 个记号。' }));
        const mL = mk('λ 演算', '一切都是函数 · 代入与化简');
        const lamBox = el('div', { class: 'l07-code' }); mL.mid.append(lamBox);
        const mR = mk('一般递归函数', '基本函数 · 复合 · 递归');
        const recBox = el('div', { class: 'l07-code' }); mR.mid.append(recBox);
        const TM = { n: sel, on: false, done: false, t0: 0, dur: 2400 };
        const recL = ['后继：S(x) = x + 1', '加法：x + 0 = x，x + S(y) = S(x + y)', '乘法：x · 0 = 0，x · S(y) = x · y + x', '阶乘：f(0) = 1，f(S(n)) = S(n) · f(n)'];
        let lamShown = 0, recOn = 0, lamCache = [];
        function lamLines(n) {
          const out = [`F ${n}`], pre = [];
          for (let k = n; k >= 1; k--) { pre.push(k); out.push('→ ' + pre.join(' × ') + ` × F ${k - 1}`); }
          out.push('→ ' + pre.concat([1]).join(' × '));
          out.push('→ ' + fact(n));
          return out;
        }
        function renderLam() {
          lamBox.replaceChildren(el('div', { class: 'hd', text: 'F ≡ λn. 若 n = 0 则 1，否则 n × F(n − 1)\n（示意：数和递归本身也能编码成函数）' }));
          const vis = lamCache.slice(0, lamShown), from = Math.max(0, vis.length - 4);
          vis.slice(from).forEach((s, i, arr) => lamBox.append(el('div', { class: i === arr.length - 1 ? 'hi' : 'on', text: s })));
        }
        function renderRec(n) {
          recBox.replaceChildren(...recL.map((s, i) => el('div', { class: i < recOn ? (i === recOn - 1 && recOn <= 4 ? 'hi' : 'on') : '', text: s })));
          if (recOn > 4) recBox.append(el('div', { class: 'hi', text: `f(${n}) = ${fact(n)}` }));
        }
        function resetM() {
          TM.n = sel; TM.on = false; TM.done = false;
          lamCache = lamLines(sel); lamShown = 1; renderLam();
          recOn = 0; renderRec(sel);
          [mT, mL, mR].forEach(m => { m.out.textContent = ''; m.box.classList.remove('agree'); });
          cap2.textContent = '';
        }
        resetM();
        loop(t => {
          const { ctx, w, h } = tapeV;
          ctx.clearRect(0, 0, w, h);
          const n = TM.n, M = fact(n), cells = n + 1 + M;
          let p = 0;
          if (TM.on) { p = clamp((t - TM.t0) / TM.dur, 0, 1); if (p >= 1) { TM.on = false; TM.done = true; } }
          if (TM.done) p = 1;
          const cw = Math.min(16, (w - 8) / cells), x0 = (w - cw * cells) / 2, y0 = 10, ch = 24;
          const written = Math.min(M, Math.floor(p * M + 1e-6));
          for (let i = 0; i < cells; i++) {
            const x = x0 + i * cw;
            ctx.strokeStyle = 'rgba(168,188,228,.22)'; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y0 + 0.5, cw - 1, ch);
            const mark = i < n ? 1 : i > n && i - n - 1 < written ? 2 : 0;
            if (mark) { ctx.fillStyle = mark === 1 ? 'rgba(232,236,245,.75)' : hc(74, 1); ctx.fillRect(x + cw / 2 - 1, y0 + 6, 2, ch - 11); }
          }
          let hp = 0;
          if (TM.on) { const f = (p * M) % 1, tri = f < 0.5 ? f * 2 : 2 - f * 2; hp = lerp(written % n, n + 1 + Math.min(written, M - 1), ease(tri)); }
          else if (TM.done) hp = n + M;
          const hx = x0 + (hp + 0.5) * cw;
          ctx.fillStyle = BEAM(0.92);
          ctx.beginPath(); ctx.moveTo(hx, y0 + ch + 4); ctx.lineTo(hx - 5, y0 + ch + 13); ctx.lineTo(hx + 5, y0 + ch + 13); ctx.closePath(); ctx.fill();
          ctx.font = `10px ${F.mono}`; ctx.fillStyle = 'rgba(162,173,196,.85)'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
          ctx.fillText(TM.done ? '停机' : TM.on ? '状态 q' + sub((written % 3) + 1) : '状态 q' + sub(0), 2, h - 2);
        });

        async function run() {
          if (running) return;
          running = true; runB.disabled = true;
          const n = sel; resetM(); api.sfx('select');
          const dur = R ? 1 : 2400;
          TM.n = n; TM.t0 = performance.now(); TM.dur = dur; TM.on = true; TM.done = false;
          lamCache.forEach((s, i) => { if (i > 0) api.timeout(() => { lamShown = i + 1; renderLam(); }, R ? 0 : i * dur / lamCache.length); });
          recL.forEach((s, i) => api.timeout(() => { recOn = i + 1; renderRec(n); }, R ? 0 : (i + 1) * dur / 5.2));
          await api.wait(dur + (R ? 60 : 260));
          lamShown = lamCache.length; renderLam(); recOn = 5; renderRec(n);
          TM.on = false; TM.done = true;
          [mT, mL, mR].forEach(m => { m.out.textContent = '= ' + fact(n); m.box.classList.add('agree'); });
          cap2.textContent = `三台机器，同一个答案：${n}! = ${fact(n)}`;
          api.sfx('ok');
          seen.add(n); running = false; runB.disabled = false;
          if (onSeen) onSeen();
        }

        await api.say(api.replay ? '三台机器，同一个问题。' : [
          '递归不只是一个技巧。1930 年代，人们想弄清：什么叫“可以计算”？',
          '几位逻辑学家给出了三种回答。它们长得完全不一样。',
        ]);
        api.hint('选一个 n，按“三台一起运行”。然后换一个 n，再试一次。');
        await new Promise(res => {
          onSeen = () => {
            if (seen.size >= 2) { onSeen = null; res(); }
            else api.hint('三台机器给出了同一个数。换一个 n 再试试。');
          };
        });
        await api.say([
          '纸带、符号替换、一层层搭起来的函数，出发点完全不同，答案却总是同一个。',
          '人们很快证明了：这三种定义能算的函数，恰好是同一批。',
          '**丘奇–图灵论题**：一个人按规则、用纸笔、在有限步内能算的，图灵机都能算。',
          '图灵分析的，正是一个拿着纸笔、一次只看几个符号的人类计算员。',
        ]);
        api.collect('l07-ct');
        await api.quiz({
          q: '为什么它叫“论题”，而不是“定理”？',
          options: [
            { t: '“能行可计算”是一个直观概念，没有严格定义，无法被证明', ok: true, why: '对。我们相信它，是因为几种独立的定义殊途同归、图灵的分析很有说服力（哥德尔说正是它让自己信服），而且近九十年来没有人找到反例。' },
            { t: '因为三台机器其实算得不完全一样', why: '三种定义彼此等价，这一点是被**证明**了的。“论题”的部分在于：它们是否抓住了“人能机械地算”这个直观概念。' },
            { t: '因为它已经被反例推翻了', why: '没有。近九十年来，还没有人找到反例。' },
          ],
        });
      }

      /* ================================================================ C · 可能世界 */
      async function sceneC() {
        api.progress(2, 4);
        const body = scene('塔外 · 夜空', '可能世界', '“必然”取决于你看得见哪些世界。');
        const task = el('p', { class: 'l07-task' });
        body.append(task);
        const V = stageCanvas(body, 'l07-mid', 'manipulation');
        const read = el('div', { class: 'l07-read' }), ctl = el('div', { class: 'l07-ctl' });
        body.append(read, ctl);
        const stars = mkStars(50);
        const P = { w: false, u: true, v: false };
        const D = { w: 0, u: 1, v: 0, loop: 0 };
        let refl = false, stage = 0, lockRefl = false, toggles = 0, checker = null, reflBtn = null, hl = null;

        const BOX = '<svg class="l07-g" viewBox="0 0 14 14" aria-hidden="true"><rect x="2.2" y="2.2" width="9.6" height="9.6" rx=".6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
        const DIA = '<svg class="l07-g" viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1.3 12.7 7 7 12.7 1.3 7Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
        const rows = [
          { k: 'box', html: BOX + '必然 P', note: 'w 看得见的每个世界里，P 都真' },
          { k: 'dia', html: DIA + '可能 P', note: 'w 看得见的世界里，至少一个 P 真' },
          { k: 'p', html: 'P（在 w 本身）', note: 'w 自己亮不亮' },
          { k: 't', html: BOX + 'P → P', note: '必然的，就一定成立吗？' },
        ];
        const cells = {};
        rows.forEach(r => {
          const v = el('b', { class: 'v' });
          const row = el('div', { class: 'l07-r' }, el('span', { class: 'k', html: r.html }), v, el('small', { text: r.note }));
          read.append(row); cells[r.k] = { row, v };
        });
        const acc = () => (refl ? ['u', 'v', 'w'] : ['u', 'v']);
        function ev() { const a = acc(), box = a.every(k => P[k]), dia = a.some(k => P[k]); return { box, dia, p: P.w, t: !box || P.w }; }
        function setV(c, b, y, n) { c.v.textContent = b ? y : n; c.v.className = 'v ' + (b ? 't' : 'f'); }
        function upd() {
          const e = ev();
          setV(cells.box, e.box, '真', '假'); setV(cells.dia, e.dia, '真', '假'); setV(cells.p, e.p, '真', '假'); setV(cells.t, e.t, '成立', '不成立');
          cells.t.row.classList.toggle('warn', !e.t);
        }
        function until(fn) { return new Promise(res => { checker = () => { if (fn()) { checker = null; res(); } }; checker(); }); }
        function changed() { upd(); if (checker) checker(); }

        function geo() {
          const { w, h } = V, m = Math.min(w, h);
          const r = clamp(m * 0.085, 20, 34);
          return { w, h, r, lr: r * 0.62, W: { x: w * 0.27, y: h * 0.58 }, U: { x: w * 0.73, y: h * 0.27 }, Vv: { x: w * 0.73, y: h * 0.79 } };
        }
        function head(ctx, x, y, an, a) {
          ctx.fillStyle = hc(82, a); ctx.beginPath();
          ctx.moveTo(x + Math.cos(an) * 7, y + Math.sin(an) * 7);
          ctx.lineTo(x + Math.cos(an + 2.5) * 7, y + Math.sin(an + 2.5) * 7);
          ctx.lineTo(x + Math.cos(an - 2.5) * 7, y + Math.sin(an - 2.5) * 7);
          ctx.closePath(); ctx.fill();
        }
        function arrow(ctx, a, b, r, alpha, bend) {
          const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
          const sx = a.x + ux * (r + 6), sy = a.y + uy * (r + 6), ex = b.x - ux * (r + 10), ey = b.y - uy * (r + 10);
          const mx = (sx + ex) / 2 - uy * L * bend, my = (sy + ey) / 2 + ux * L * bend;
          ctx.strokeStyle = hc(76, alpha); ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
          head(ctx, ex, ey, Math.atan2(ey - my, ex - mx), alpha);
        }
        function loopArc(ctx, c, lr, alpha, dashed) {
          const a0 = Math.PI * 0.5 + 0.78, a1 = Math.PI * 0.5 - 0.78 + TAU;
          ctx.save();
          if (dashed) ctx.setLineDash([3, 4]);
          ctx.strokeStyle = hc(78, alpha); ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(c.x, c.y, lr, a0, a1); ctx.stroke();
          ctx.restore();
          if (!dashed) head(ctx, c.x + Math.cos(a1) * lr, c.y + Math.sin(a1) * lr, a1 + Math.PI / 2, alpha);
          else { ctx.font = `12px ${F.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = hc(82, alpha); ctx.fillText('+', c.x, c.y); }
        }
        function planet(ctx, p, r, on, name, t) {
          const hg = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, r * 2.3);
          hg.addColorStop(0, hc(62, 0.3 * on)); hg.addColorStop(1, hc(62, 0));
          ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(p.x, p.y, r * 2.3, 0, TAU); ctx.fill();
          const bg = ctx.createRadialGradient(p.x - r * 0.35, p.y - r * 0.4, r * 0.1, p.x, p.y, r);
          bg.addColorStop(0, `hsl(${H} ${lerp(22, 85, on)}% ${lerp(22, 80, on)}%)`);
          bg.addColorStop(1, `hsl(${H} ${lerp(30, 70, on)}% ${lerp(8, 36, on)}%)`);
          ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, TAU); ctx.fill();
          ctx.strokeStyle = hc(78, 0.35 + 0.5 * on); ctx.lineWidth = 1.2; ctx.stroke();
          if (hl === name) {
            ctx.beginPath(); ctx.arc(p.x, p.y, r + 7 + (R ? 0 : 2 * Math.sin(t * 0.008)), 0, TAU);
            ctx.strokeStyle = BEAM(0.7); ctx.lineWidth = 1.2; ctx.stroke();
          }
          ctx.font = `600 ${Math.round(r * 0.6)}px ${F.serif}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillStyle = on > 0.5 ? 'rgba(6,18,26,.92)' : 'rgba(200,210,230,.8)';
          ctx.fillText(on > 0.5 ? 'P' : '¬P', p.x, p.y + 1);
          ctx.font = `italic ${Math.round(clamp(r * 0.55, 13, 17))}px ${F.serif}`; ctx.fillStyle = 'rgba(232,236,245,.88)';
          ctx.fillText(name, p.x, p.y + r + 13);
        }
        loop((t, dt) => {
          const { ctx } = V, g = geo(), { w, h } = g;
          ctx.clearRect(0, 0, w, h);
          drawStars(ctx, stars, w, h, t);
          ['w', 'u', 'v'].forEach(k => { D[k] = toward(D[k], P[k] ? 1 : 0, dt, 9); });
          D.loop = toward(D.loop, refl ? 1 : 0, dt, 8);
          const lg = ctx.createLinearGradient(0, 0, g.W.x - g.r, 0);
          lg.addColorStop(0, BEAM(0)); lg.addColorStop(1, BEAM(0.85));
          ctx.strokeStyle = lg; ctx.lineWidth = 2; glow(ctx, BEAM(), 10);
          ctx.beginPath(); ctx.moveTo(0, g.W.y); ctx.lineTo(g.W.x - g.r - 3, g.W.y); ctx.stroke(); ctx.shadowBlur = 0;
          arrow(ctx, g.W, g.U, g.r, 0.85, 0.07);
          arrow(ctx, g.W, g.Vv, g.r, 0.85, -0.07);
          const lc = { x: g.W.x, y: g.W.y - g.r - g.lr * 0.75 };
          if (D.loop > 0.02) loopArc(ctx, lc, g.lr, 0.9 * D.loop, false);
          if (stage >= 2 && !refl) loopArc(ctx, lc, g.lr, R ? 0.6 : 0.4 + 0.3 * Math.sin(t * 0.005), true);
          planet(ctx, g.U, g.r, D.u, 'u', t); planet(ctx, g.Vv, g.r, D.v, 'v', t); planet(ctx, g.W, g.r, D.w, 'w', t);
          ctx.font = `11px ${F.sans}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = BEAM(0.7);
          ctx.fillText('你站在这里', g.W.x, g.W.y + g.r + 31);
        });
        function toggleRefl() {
          if (lockRefl || stage < 2) return;
          refl = !refl; api.sfx(refl ? 'select' : 'tick');
          if (reflBtn) reflBtn.textContent = refl ? 'w 看得见自己：开' : 'w 看得见自己：关';
          changed();
        }
        api.listen(V.canvas, 'click', e => {
          const p = pt(V.canvas, e), g = geo();
          const lc = { x: g.W.x, y: g.W.y - g.r - g.lr * 0.75 };
          if (stage >= 2 && !lockRefl && Math.hypot(p.x - lc.x, p.y - lc.y) < g.lr + 12 && p.y < g.W.y - g.r * 0.6) { toggleRefl(); return; }
          for (const [k, c] of [['w', g.W], ['u', g.U], ['v', g.Vv]]) {
            if (Math.hypot(p.x - c.x, p.y - c.y) < Math.max(g.r + 10, 28)) {
              P[k] = !P[k]; toggles += 1; hl = null; api.sfx('tick'); changed(); return;
            }
          }
        });

        upd();
        await api.say(api.replay ? '三颗世界，几道目光。读数看的是你站着的 w。' : [
          '塔外的夜空里浮着三颗**可能世界**。你这束光，站在 w 上。',
          '箭头表示“从 w 看得见”：w 能看到 u 和 v。亮着的世界里，P 为真。',
          '在 w，“必然 P”是说：看得见的每个世界里 P 都真；“可能 P”：至少一个里真。',
        ]);
        stage = 1;
        task.innerHTML = api.fmt('任务一：让 **必然 P** 在 w 成立，同时 w 自己的 P 保持为假。');
        api.hint('点一颗星球，就能切换它上面的 P。下面的读数都是在 w 上看的。');
        api.timeout(() => { if (stage === 1) { hl = 'v'; api.hint('提示：w 看得见 u 和 v。让它们都亮起来。'); } }, 16000);
        await until(() => { const e = ev(); return e.box && !P.w; });
        hl = null; api.sfx('ok');
        await api.say([
          '成了。可是有点怪：在 w，“必然 P”成立，P 本身却不成立。',
          '因为 w **看不见自己**。它眼里的“必然”，只管别处。',
        ]);
        stage = 2;
        task.innerHTML = api.fmt('任务二：让 w **看得见自己**。');
        reflBtn = button('w 看得见自己：关', toggleRefl, '');
        ctl.replaceChildren(reflBtn);
        api.hint('点 w 头顶那个虚线小圈，或者下面的按钮。');
        await until(() => refl);
        lockRefl = true; reflBtn.disabled = true; reflBtn.textContent = 'w 看得见自己：开';
        await api.say([
          '现在 w 也在自己的视野里了。“必然 P”立刻变假：w 上的 P 不真。',
          '于是，凡在 w 必然的，在 w 本身也一定成立。',
        ]);
        stage = 3; toggles = 0;
        task.innerHTML = api.fmt('任务三：还能让 **必然 P** 成立、P 却不成立吗？随便试。');
        api.hint('随便切换几颗星球的 P，盯住最后一格读数。');
        await new Promise(res => {
          let shown = false;
          const give = button('做不到', () => { checker = null; res(); });
          const show = () => { if (shown) return; shown = true; ctl.replaceChildren(give); };
          checker = () => { if (toggles >= 3) show(); };
          api.timeout(show, 9000);
        });
        ctl.replaceChildren();
        task.textContent = '';
        await api.say([
          '确实做不到。可达关系**自反**，“必然 P → P”就永远成立，这就是公理 T。',
          '模态公理恰好对应可达关系的性质：自反对应 T，传递对应 4，对称对应 B。',
        ]);
        api.collect('l07-kripke');
        await api.quiz({
          q: '把“必然”读作“**可证**”。“若 P 可证，则 P”还能当作公理吗？',
          options: [
            { t: '能：证得出来的东西，当然是真的', why: '直觉如此，但系统自己证明不了这一点。勒布定理：系统若能证明“若 P 可证则 P”，它就能直接证明 P。' },
            { t: '不能：一个系统没法无条件地信任自己的证明', ok: true, why: '对。在可证性逻辑里，公理 4 成立，T 却不成立，背后是勒布定理（1955）。在“石碑”那座岛上，两台程序会靠它学会合作。' },
          ],
        });
        await api.say('克里普克发表第一篇相关论文时，还不到二十岁。我们上塔顶去。');
      }

      /* ================================================================ D · 停走的钟 */
      async function sceneD() {
        api.progress(3, 4);
        const body = scene('塔顶 · 钟', '停走的钟', '真的、相信的、有理由的，就是“知道”吗？');
        const V = stageCanvas(body, 'l07-tall', 'none');
        const lamps = el('div', { class: 'l07-lamps' });
        const mkLamp = (k, txt) => { const n = el('div', { class: 'l07-lamp' }, el('i'), el('b', { text: k }), el('span', { text: txt })); lamps.append(n); return n; };
        const lB = mkLamp('信', '你相信现在是 3:40'), lJ = mkLamp('据', '这座钟一向很准'), lT = mkLamp('真', '现在确实是 3:40');
        const cap = el('p', { class: 'l07-cap' }), ctl = el('div', { class: 'l07-ctl' });
        body.append(lamps, cap, ctl);
        const stars = mkStars(46);
        const C = { lit: 0, litTo: 0, rev: 0, revTo: 0, m: 6, ring: false, drag: null, hit: false, glow: 0 };
        let resolveHit = null;

        function hand(ctx, cx, cy, a, len, wd, col, dashed) {
          ctx.save();
          if (dashed) ctx.setLineDash([4, 4]);
          ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(cx - Math.sin(a) * len * 0.12, cy + Math.cos(a) * len * 0.12); ctx.lineTo(cx + Math.sin(a) * len, cy - Math.cos(a) * len); ctx.stroke();
          ctx.restore();
        }
        function geoD() { const { w, h } = V, cx = w / 2, cy = h / 2, Rc = Math.min(w, h) * 0.33; return { w, h, cx, cy, Rc, RR: Rc + Math.max(22, Rc * 0.2) }; }
        loop((t, dt) => {
          const { ctx } = V, g = geoD(), { w, h, cx, cy, Rc, RR } = g;
          ctx.clearRect(0, 0, w, h);
          drawStars(ctx, stars, w, h, t);
          C.lit = toward(C.lit, C.litTo, dt, 2.2); C.rev = toward(C.rev, C.revTo, dt, 2.5);
          const match = C.ring && C.m === 40;
          C.glow = toward(C.glow, match ? 1 : 0, dt, 6);
          const halo = ctx.createRadialGradient(cx, cy, Rc * 0.8, cx, cy, Rc * 1.9);
          halo.addColorStop(0, hc(62, 0.12 * C.lit + 0.2 * C.glow)); halo.addColorStop(1, hc(62, 0));
          ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, Rc * 1.9, 0, TAU); ctx.fill();
          const fg = ctx.createRadialGradient(cx, cy - Rc * 0.3, Rc * 0.1, cx, cy, Rc);
          fg.addColorStop(0, `hsl(${H} 30% ${lerp(6, 17, C.lit)}%)`); fg.addColorStop(1, `hsl(${H} 40% ${lerp(4, 8, C.lit)}%)`);
          ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(cx, cy, Rc, 0, TAU); ctx.fill();
          ctx.strokeStyle = hc(74, 0.25 + 0.5 * C.lit); ctx.lineWidth = 1.5; ctx.stroke();
          for (let i = 0; i < 60; i++) {
            const a = i / 60 * TAU, big = i % 5 === 0, r0 = Rc * (big ? 0.83 : 0.9), r1 = Rc * 0.95;
            ctx.strokeStyle = `rgba(232,236,245,${(big ? 0.75 : 0.28) * (0.2 + 0.8 * C.lit)})`; ctx.lineWidth = big ? 2 : 1;
            ctx.beginPath(); ctx.moveTo(cx + Math.sin(a) * r0, cy - Math.cos(a) * r0); ctx.lineTo(cx + Math.sin(a) * r1, cy - Math.cos(a) * r1); ctx.stroke();
          }
          ctx.font = `${Math.round(Rc * 0.13)}px ${F.serif}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillStyle = `rgba(232,236,245,${0.2 + 0.6 * C.lit})`; ctx.fillText('XII', cx, cy - Rc * 0.66);
          if (C.rev > 0.02) {
            // a small cobweb at the upper-left rim: the clock stopped long ago
            const ox = cx + Math.cos(-2.36) * Rc * 0.98, oy = cy + Math.sin(-2.36) * Rc * 0.98;
            ctx.strokeStyle = `rgba(220,228,245,${0.32 * C.rev})`; ctx.lineWidth = 0.8;
            for (let k = 0; k < 5; k++) {
              const a = 0.1 + k * 0.33;
              ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + Math.cos(a) * Rc * 0.36, oy + Math.sin(a) * Rc * 0.36); ctx.stroke();
            }
            for (let s = 1; s <= 3; s++) {
              ctx.beginPath(); ctx.arc(ox, oy, Rc * 0.1 * s, 0.1, 0.1 + 1.32); ctx.stroke();
            }
          }
          if (C.ring) {
            const hm = 3 + C.m / 60;
            hand(ctx, cx, cy, hm / 12 * TAU, Rc * 0.5, 3, hc(76, 0.6 * C.rev), true);
            hand(ctx, cx, cy, C.m / 60 * TAU, Rc * 0.78, 2, hc(76, 0.6 * C.rev), true);
          }
          glow(ctx, hc(62), 22 * C.glow);
          const hcol = C.glow > 0.5 ? hc(86, 0.3 + 0.7 * C.lit) : BEAM(0.2 + 0.75 * C.lit);
          hand(ctx, cx, cy, (3 + 40 / 60) / 12 * TAU, Rc * 0.5, 4.2, hcol, false);
          hand(ctx, cx, cy, 40 / 60 * TAU, Rc * 0.78, 2.6, hcol, false);
          ctx.shadowBlur = 0;
          hand(ctx, cx, cy, 17 / 60 * TAU, Rc * 0.86, 1, ROSE(0.2 + 0.6 * C.lit), false);
          ctx.fillStyle = BEAM(0.3 + 0.6 * C.lit); ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, TAU); ctx.fill();
          if (C.ring) {
            ctx.strokeStyle = hc(70, 0.22); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, RR, 0, TAU); ctx.stroke();
            for (let i = 0; i < 12; i++) {
              const a = i / 12 * TAU;
              ctx.strokeStyle = hc(70, 0.3); ctx.beginPath(); ctx.moveTo(cx + Math.sin(a) * (RR - 4), cy - Math.cos(a) * (RR - 4)); ctx.lineTo(cx + Math.sin(a) * (RR + 4), cy - Math.cos(a) * (RR + 4)); ctx.stroke();
            }
            const a = C.m / 60 * TAU, bx = cx + Math.sin(a) * RR, by = cy - Math.cos(a) * RR;
            glow(ctx, match ? hc(62) : BEAM(), 18);
            ctx.fillStyle = match ? hc(78, 1) : BEAM(1); ctx.beginPath(); ctx.arc(bx, by, 8, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
            if (!C.drag && !C.hit) { ctx.strokeStyle = BEAM(R ? 0.5 : 0.3 + 0.3 * Math.sin(t * 0.006)); ctx.beginPath(); ctx.arc(bx, by, 14, 0, TAU); ctx.stroke(); }
            const mm = Math.round(C.m) % 60;
            ctx.font = `12px ${F.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = BEAM(0.9);
            const lx = cx + Math.sin(a) * (RR + 24), ly = cy - Math.cos(a) * (RR + 20);
            ctx.fillText('3:' + String(mm).padStart(2, '0'), clamp(lx, 22, w - 22), clamp(ly, 10, h - 10));
          }
        });
        function updLamps() { lT.classList.toggle('on', C.ring && C.m === 40); }
        function checkHit() {
          if (C.ring && !C.hit && C.m === 40 && C.drag == null) {
            C.hit = true; api.sfx('ok');
            if (resolveHit) { const r = resolveHit; resolveHit = null; r(); }
          }
        }
        function setFrom(p) {
          const g = geoD();
          let a = Math.atan2(p.x - g.cx, -(p.y - g.cy)); if (a < 0) a += TAU;
          let m = a / TAU * 60;
          if (Math.abs(m - 40) < 1.6) m = 40;
          const was = C.m === 40;
          C.m = m; updLamps();
          if (C.m === 40 && !was) api.sfx('tick');
        }
        function nudge(k) {
          if (!C.ring || C.hit) return;
          C.m = ((Math.round(C.m) + k) % 60 + 60) % 60; updLamps(); api.sfx('tick'); checkHit();
        }
        api.listen(V.canvas, 'pointerdown', e => {
          if (!C.ring || C.hit) return;
          const p = pt(V.canvas, e), g = geoD();
          if (Math.hypot(p.x - g.cx, p.y - g.cy) < g.Rc * 0.45) return;
          C.drag = e.pointerId;
          try { V.canvas.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
          setFrom(p);
        });
        api.listen(V.canvas, 'pointermove', e => { if (C.drag === e.pointerId) setFrom(pt(V.canvas, e)); });
        const upD = e => { if (C.drag === e.pointerId) { C.drag = null; checkHit(); } };
        api.listen(V.canvas, 'pointerup', upD);
        api.listen(V.canvas, 'pointercancel', upD);

        await api.say(api.replay ? '塔顶的钟。先抬头看一眼。' : '塔顶挂着一只钟。你爬了很久，想知道现在几点。');
        await new Promise(res => {
          ctl.replaceChildren(button('抬头看钟', () => { C.litTo = 1; api.sfx('open'); ctl.replaceChildren(); res(); }));
          api.hint('点“抬头看钟”。');
        });
        await api.wait(R ? 60 : 700);
        lB.classList.add('on'); lJ.classList.add('on'); api.sfx('tick');
        cap.textContent = '钟面：3:40';
        await api.say(['3:40。这座钟一向很准，你没理由怀疑。', '于是你相信：现在是 3:40。“信”和“据”两盏灯亮了。']);
        C.revTo = 1;
        await api.say(['告诉你一个秘密：这只钟早就停了。秒针停在 17 秒，一动不动。', '那“真”这盏灯亮不亮，就看你**碰巧**在哪一刻抬头。']);
        C.ring = true; C.m = 6; updLamps();
        cap.textContent = '外圈的光点：你抬头那一刻的真实时间（下午三点多）';
        ctl.replaceChildren(button('早一分钟', () => nudge(-1), ''), button('晚一分钟', () => nudge(1), ''));
        api.hint('拖动外圈的光点，找出三盏灯全亮的那一分钟。');
        await new Promise(res => { resolveHit = res; if (C.hit) { resolveHit = null; res(); } });
        ctl.replaceChildren();
        cap.textContent = '真实时间 3:40，停了的钟恰好指着 3:40。';
        await api.wait(R ? 60 : 500);
        await api.say('三盏灯全亮：它是真的，你相信，而且有理由。');
        await api.quiz({
          q: '这一刻，你“知道”现在是 3:40 吗？',
          options: [
            { t: '知道：真、信、有理由，三样都齐了', why: '三盏灯确实都亮着。可你刚才亲手找过：换任何别的一分钟，“真”都不亮。它是碰巧亮的。' },
            { t: '不算知道：真是碰巧撞上的，理由和真相之间断了线', ok: true, why: '这正是盖提尔 1963 年那三页纸的要点：有辩护的真信念，未必是知识。罗素 1948 年就举过这只停了的钟。' },
          ],
        });
        api.collect('l07-gettier');
        await api.say([
          '8 世纪的印度佛教哲学家法上（Dharmottara）讲过：旅人把海市蜃楼当成了水，走过去，石下恰好真有水。',
          'AI 有时也会“蒙对”。它平时可靠，你信了，答案也碰巧对了。这算你“知道”吗？',
        ]);
      }

      /* ================================================================ 塔的全景 */
      function finale() {
        api.progress(4, 4);
        const body = scene('塔斯基之塔 · 全景', '光沿着塔往上走', '每一层，都在谈论下面那一层。');
        const V = stageCanvas(body, 'l07-tall', 'manipulation');
        body.append(el('div', { class: 'l07-ctl' }, button('回到群岛', () => api.exit(), 'primary')));
        const stars = mkStars(70);
        const motes = [];
        for (let i = 0; i < 26; i++) motes.push({ y: Math.random(), s: 0.00004 + Math.random() * 0.00008, x: (Math.random() - 0.5) * 0.06, p: Math.random() * 6.28 });
        loop(t => {
          const { ctx, w, h } = V;
          ctx.clearRect(0, 0, w, h);
          drawStars(ctx, stars, w, h, t);
          const cx = w / 2;
          const lbl = (txt, x, y, al) => { ctx.font = `13px ${F.serif}`; ctx.textAlign = al || 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(200,210,230,.85)'; ctx.fillText(txt, x, y); };
          // beam
          const bg = ctx.createLinearGradient(0, h, 0, 0);
          bg.addColorStop(0, BEAM(0.85)); bg.addColorStop(0.55, hc(78, 0.7)); bg.addColorStop(1, hc(70, 0.05));
          glow(ctx, hc(62), 14); ctx.fillStyle = bg; ctx.fillRect(cx - 1.2, h * 0.08, 2.4, h * 0.88); ctx.shadowBlur = 0;
          if (!R) {
            for (const m of motes) {
              const y = ((m.y - t * m.s) % 1 + 1) % 1;
              ctx.fillStyle = hc(84, 0.5 * Math.sin(y * Math.PI)); ctx.beginPath();
              ctx.arc(cx + m.x * w + Math.sin(t * 0.001 + m.p) * 3, h * 0.08 + y * h * 0.86, 1.3, 0, TAU); ctx.fill();
            }
          }
          // the well at the foot
          const wy = h * 0.9;
          for (let i = 0; i < 5; i++) {
            ctx.beginPath(); ctx.ellipse(cx, wy, w * 0.16 * Math.pow(0.68, i), h * 0.035 * Math.pow(0.68, i), 0, 0, TAU);
            ctx.strokeStyle = hc(74, 0.55 - i * 0.08); ctx.lineWidth = 1.2; ctx.stroke();
          }
          lbl('递归之井', cx + w * 0.18, wy);
          // tower floors
          for (let i = 0; i < 4; i++) {
            const y = h * (0.76 - i * 0.1), half = Math.min(w * 0.3, 220) * (1 - i * 0.08);
            const gr = ctx.createLinearGradient(cx - half, 0, cx + half, 0);
            gr.addColorStop(0, hc(62, 0)); gr.addColorStop(0.5, hc(76, 0.9 - i * 0.15)); gr.addColorStop(1, hc(62, 0));
            ctx.fillStyle = gr; ctx.fillRect(cx - half, y, half * 2, 1.6);
            ctx.font = `11px ${F.mono}`; ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(162,173,196,.75)';
            ctx.fillText('L' + sub(i), cx - half - 6, y);
          }
          lbl('说谎者 · T 模式', cx + Math.min(w * 0.3, 220) * 0.62 + 10, h * 0.71);
          // worlds
          const wp = [[cx + w * 0.17, h * 0.33], [cx + w * 0.3, h * 0.24], [cx + w * 0.3, h * 0.42]];
          ctx.strokeStyle = hc(76, 0.6); ctx.lineWidth = 1;
          [1, 2].forEach(k => { ctx.beginPath(); ctx.moveTo(wp[0][0], wp[0][1]); ctx.lineTo(wp[k][0], wp[k][1]); ctx.stroke(); });
          wp.forEach(([x, y], k) => { glow(ctx, hc(62), 10); ctx.fillStyle = k === 0 ? hc(60, 0.5) : hc(78, 1); ctx.beginPath(); ctx.arc(x, y, 6, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; });
          lbl('可能世界', cx + w * 0.17, h * 0.5, 'center');
          // the clock at the top
          const ky = h * 0.16, kr = Math.min(w, h) * 0.06;
          ctx.strokeStyle = BEAM(0.75); ctx.lineWidth = 1.3; ctx.beginPath(); ctx.arc(cx, ky, kr, 0, TAU); ctx.stroke();
          hand(ctx, cx, ky, (3 + 40 / 60) / 12 * TAU, kr * 0.5, 2, BEAM(0.9));
          hand(ctx, cx, ky, 40 / 60 * TAU, kr * 0.8, 1.4, BEAM(0.9));
          lbl('停走的钟', cx - kr - 10, ky, 'right');
        });
        function hand(ctx, x, y, a, len, wd, col) { ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(a) * len, y - Math.cos(a) * len); ctx.stroke(); }
        api.complete({ summary: '“真”要到上一层语言里去谈；递归要有一块基石；“必然”取决于看得见哪些世界；有理由的真信念，还不一定是知识。' });
      }

      /* ================================================================ run */
      (async () => {
        await sceneA();
        await sceneB();
        await sceneC();
        await sceneD();
        if (api.alive) finale();
      })();

      return () => endScene();
    },
  });
})();

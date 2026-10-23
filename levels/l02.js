/* 透镜群岛 · LENS 02 · 光谱 —— 世界是怎样被切开的（据 ch02）
 * 四个场景：切开彩虹（颜色词的格子 / 青 / 颜色从物中来）→ 俄罗斯蓝（三色块实验）→ play 机器（四种切法）→ 指南针世界（绝对方位 / 萨丕尔–沃尔夫）。
 */
(function () {
  'use strict';

  const H = 22;
  const SERIF = '"Noto Serif SC","Songti SC","STSong",serif';
  const DISPLAY = '"ZCOOL XiaoWei","Noto Serif SC","Songti SC",serif';
  const MONO = '"IBM Plex Mono",ui-monospace,Menlo,monospace';

  const CARDS = [
    { id: 'l02-cut', title: '基本颜色词', en: 'Basic color terms',
      body: '可见光的波长（约 380–750 纳米）连续变化，光谱上没有天然的分界线；是语言在上面画格子。柏林与凯（Berlin & Kay）调查了上百种语言，发现颜色词出现的顺序很有规律：先有黑/白（明/暗），然后是红，再是绿或黄，**蓝通常来得很晚**。荷马史诗里大海是“酒色的”，却没有一个明确指蓝的词。',
      ref: 'Berlin & Kay, Basic Color Terms, 1969；Deutscher, Through the Language Glass, 2010' },
    { id: 'l02-qing', title: '汉语的“青”', en: 'Qīng: one word, many colors',
      body: '“青”像一个函数，搭配不同，输出的颜色就不同：青天、青花瓷是蓝，青草、青苔是绿，青丝、青眼是黑（青眼即黑眼珠，与白眼相对）。说“青”的人并不会看不出蓝和绿的差别，视觉系统人人相同；差别在于是否**习惯性地**给它们分类和命名，这会影响分类速度与记忆，但不会造成色盲。',
      ref: '《晋书·阮籍传》（青眼、白眼）；Deutscher, Through the Language Glass, 2010' },
    { id: 'l02-object', title: '颜色从物中来', en: 'Colors born from things',
      body: '碧本是“石之青美者”，一种青绿色的美玉；翠是“青羽雀”，即翠鸟；黛是古代女子画眉的青黑色颜料；苍本义是草的颜色。荀子说“青，取之于蓝，而青于蓝”，这里的“蓝”是植物蓼蓝。英语的 orange 也是先有水果、后有颜色。颜色词常常从**事物**中诞生，越古老越是这样。',
      ref: '《说文解字》；《荀子·劝学》' },
    { id: 'l02-russian', title: '俄罗斯蓝', en: 'Russian blues',
      body: '俄语有两个**基本**颜色词：голубой（goluboy，浅蓝）与 синий（siniy，深蓝）。Winawer 等人（2007）让受试者判断三个色块里哪两个相同：两色跨越这条边界时，俄语者明显更快，英语者没有这种优势；若同时默念一串数字，俄语者的优势就消失了。语言在知觉过程中**实时**参与。',
      ref: 'Winawer et al., Russian blues reveal effects of language on color discrimination, PNAS, 2007' },
    { id: 'l02-play', title: '四种切法', en: 'Four ways to cut “play”',
      body: '同一类“为了乐趣、按规则进行”的活动：英语、德语**一刀不切**（play / spielen）；法语**用语法悄悄切**（jouer au 运动和游戏，jouer du 乐器）；意大利语、西班牙语**按对象切**（giocare / suonare，jugar / tocar）；汉语**按身体动作切**：打、玩、拉、弹，还有吹、敲。',
      ref: '据各语言的常用搭配整理；Deutscher, Through the Language Glass, 2010' },
    { id: 'l02-absolute', title: '绝对参照系', en: 'Absolute frame of reference',
      body: '古古伊米德希尔语（Guugu Yimithirr）是澳大利亚昆士兰北部的一门原住民语言，不是方言；英语的 kangaroo 就借自它。说话者描述空间几乎不用前后左右，而说“你北边有只蚂蚁”。研究发现，他们在室内或陌生环境都能随时指出方位：不时刻知道东南西北，连话都说不了。',
      ref: 'Haviland, 1993；Levinson, Space in Language and Cognition, 2003' },
    { id: 'l02-sw', title: '萨丕尔–沃尔夫假说', en: 'Sapir–Whorf hypothesis',
      body: '**强版本**（语言决定论）：语言决定思维，没有的词就无法思考。今天基本被否定：人总能迂回地表达新概念。**弱版本**（语言相对论）：语言影响习惯性的注意、分类和记忆，在颜色、空间、数字等领域有实验支持，但效应通常不大、依赖任务。雅各布森：语言的差别在于**必须**表达什么，而非**能够**表达什么。',
      ref: 'Regier & Kay, Language, thought, and color: Whorf was half right, 2009；Jakobson, On Linguistic Aspects of Translation, 1959' },
  ];

  const CSS = `
.l02-wrap{max-width:880px;margin:0 auto;padding-top:14px;overflow-x:clip}
.l02-scene{display:grid;gap:14px;animation:l02-in .8s cubic-bezier(.2,.7,.2,1) both}
@keyframes l02-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.l02-head{display:grid;gap:4px}
.l02-kick{font-family:var(--f-mono);font-size:11px;letter-spacing:.24em;color:hsl(var(--hue) 75% 70%);text-transform:uppercase}
.l02-title{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(26px,5.2vw,38px);line-height:1.12;letter-spacing:.05em;text-shadow:0 0 30px hsl(var(--hue) 85% 62% / .25)}
.l02-status{min-height:1.75em;font-family:var(--f-serif);font-size:15px;line-height:1.7;color:var(--text);text-align:center;text-wrap:balance;max-width:640px;margin:0 auto}
.l02-status b{color:hsl(var(--hue) 90% 72%);font-weight:600}
.l02-frame{position:relative;border-radius:20px;overflow:hidden;border:1px solid hsl(var(--hue) 60% 60% / .14);
  background:radial-gradient(120% 90% at 50% 0%,hsl(var(--hue) 45% 13% / .45),rgba(5,8,15,.55) 62%,rgba(5,8,15,.82));box-shadow:inset 0 0 70px rgba(0,0,0,.55)}
.l02-actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;min-height:46px}
.l02-tabs{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
.l02-tab{font-family:var(--f-mono);font-size:12px;letter-spacing:.05em;padding:4px 12px;border-radius:999px;border:1px solid var(--line);color:var(--faint);transition:color .3s,border-color .3s,background .3s,box-shadow .3s}
.l02-tab.on{color:var(--text);border-color:hsl(var(--hue) 85% 66% / .75);background:hsl(var(--hue) 80% 55% / .14);box-shadow:0 0 16px hsl(var(--hue) 85% 62% / .3)}
.l02-tab.done{color:var(--dim);border-color:hsl(var(--hue) 60% 60% / .3)}
.l02-match{display:grid;gap:14px;max-width:660px;width:100%;margin:0 auto}
.l02-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.l02-char{width:58px;height:58px;border-radius:14px;border:1px solid var(--line-strong);background:rgba(255,255,255,.03);font-family:var(--f-display);font-size:30px;line-height:1;cursor:pointer;
  transition:border-color .2s,box-shadow .2s,background .3s}
.l02-char[aria-pressed="true"]{border-color:hsl(var(--hue) 85% 70%);box-shadow:0 0 0 2px hsl(var(--hue) 85% 62% / .4),0 0 22px hsl(var(--hue) 85% 62% / .35)}
.l02-thing{min-height:44px;padding:8px 14px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.03);font-family:var(--f-serif);font-size:15px;cursor:pointer;transition:border-color .2s,background .3s}
.l02-thing:hover,.l02-char:hover{border-color:hsl(var(--hue) 80% 66% / .6)}
.l02-char.ok,.l02-thing.ok{border-color:hsl(var(--hue) 70% 60% / .55);background:hsl(var(--hue) 80% 55% / .13);cursor:default}
.l02-thing b{font-family:var(--f-display);font-weight:400;font-size:18px;color:hsl(var(--hue) 90% 74%);margin-right:6px}
.l02-shake{animation:l02-shake .4s}
@keyframes l02-shake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.l02-triad{--s:clamp(84px,24vw,120px);display:grid;justify-items:center;align-content:center;gap:20px;padding:26px 12px 22px;min-height:calc(var(--s) * 2 + 90px)}
.l02-sw{width:var(--s);height:var(--s);border-radius:14px;border:0;padding:0;box-shadow:0 12px 30px rgba(0,0,0,.45)}
button.l02-sw{cursor:pointer;transition:transform .12s}
button.l02-sw:active{transform:scale(.97)}
.l02-pair{display:flex;gap:22px}
.l02-fix{width:var(--s);height:var(--s);display:grid;place-items:center;font-family:var(--f-mono);font-size:26px;color:var(--faint)}
.l02-count{font-family:var(--f-mono);font-size:12px;color:var(--dim);letter-spacing:.1em}
.l02-res{display:grid;gap:10px;max-width:440px;width:100%;margin:0 auto}
.l02-resrow{display:grid;grid-template-columns:6.5em 1fr 4.8em;gap:10px;align-items:center;font-size:13px;color:var(--dim)}
.l02-resrow i{display:block;height:8px;border-radius:4px;background:hsl(var(--hue) 85% 62%);box-shadow:0 0 10px hsl(var(--hue) 85% 62% / .5);transition:width .8s}
.l02-resrow em{font-style:normal;font-family:var(--f-mono);color:var(--text);text-align:right}
.l02-strip{position:relative;display:grid;grid-template-columns:repeat(12,1fr);gap:3px;max-width:560px;width:100%;margin:0 auto;touch-action:none;cursor:ew-resize;padding:10px 0}
.l02-strip span{height:56px;border-radius:6px}
.l02-strip .knife{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:var(--beam);box-shadow:0 0 12px var(--beam),0 0 24px hsl(var(--hue) 85% 62%);pointer-events:none;transition:left .12s}
.l02-striplab{display:flex;justify-content:space-between;gap:10px;max-width:560px;width:100%;margin:0 auto;font-family:var(--f-mono);font-size:12px;color:var(--dim)}
.l02-belt{display:flex;align-items:stretch;padding:10px}
.l02-obj{flex:1 1 0;min-width:0;display:grid;justify-items:center;align-content:start;gap:6px;padding:12px 2px;text-align:center}
.l02-obj svg{width:38px;height:38px;color:hsl(var(--hue) 70% 78%)}
.l02-obj .nm{font-family:var(--f-serif);font-size:14px;color:var(--text)}
.l02-obj .out{min-height:2.6em;font-family:var(--f-mono);font-size:12px;line-height:1.3;color:var(--faint);word-break:break-word;transition:color .4s}
.l02-obj .out.lit{color:var(--text)}
.l02-obj .out b{color:hsl(var(--hue) 90% 72%);font-weight:500}
.l02-obj .out.zh{font-family:var(--f-serif);font-size:16px}
.l02-gap{position:relative;flex:0 0 34px;min-height:120px;border:0;background:none;cursor:pointer;padding:0;border-radius:10px}
.l02-gap:hover{background:rgba(255,255,255,.03)}
.l02-gap i{position:absolute;left:50%;top:10px;bottom:10px;width:2px;margin-left:-1px;border-radius:1px;background:rgba(255,255,255,.1);transition:background .25s,box-shadow .25s}
.l02-gap[aria-pressed="true"] i{background:hsl(var(--hue) 90% 70%);box-shadow:0 0 12px hsl(var(--hue) 90% 62%),0 0 2px #fff}
.l02-gap.gram i{background:repeating-linear-gradient(180deg,hsl(var(--hue) 90% 72%) 0 6px,transparent 6px 11px);box-shadow:none}
.l02-gap.bad i{background:var(--bad);box-shadow:0 0 12px var(--bad)}
.l02-gap.miss i{background:rgba(255,120,120,.55);box-shadow:0 0 10px var(--bad)}
.l02-gap[disabled]{cursor:default}
.l02-cv{display:block;width:100%}
.l02-compass{width:min(100%,440px);margin:0 auto}
.l02-dirs{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.l02-dir{width:56px;height:56px;border-radius:50%;border:1px solid var(--line-strong);background:rgba(255,255,255,.04);font-family:var(--f-display);font-size:24px;cursor:pointer;transition:border-color .2s,background .2s}
.l02-dir:hover{border-color:hsl(var(--hue) 85% 70%);background:hsl(var(--hue) 80% 55% / .14)}
.l02-dir[disabled]{opacity:.3;cursor:default}
@media (max-width:700px){
  .l02-belt{flex-direction:column;padding:6px 8px}
  .l02-obj{grid-template-columns:40px 4.6em 1fr;justify-items:start;align-items:center;gap:10px;padding:4px 6px;text-align:left}
  .l02-obj svg{width:32px;height:32px}
  .l02-obj .out{min-height:0}
  .l02-gap{flex:0 0 auto;min-height:40px;width:100%}
  .l02-gap i{left:10px;right:10px;top:50%;bottom:auto;width:auto;height:2px;margin:-1px 0 0}
  .l02-gap.gram i{background:repeating-linear-gradient(90deg,hsl(var(--hue) 90% 72%) 0 6px,transparent 6px 11px)}
}
`;

  function mount(root, api) {
    const { el, fmt, clamp, lerp } = api;
    const R = api.reduced;
    api.css(CSS);
    const wrap = el('div', { class: 'l02-wrap' });
    root.append(wrap);

    /* ---------------------------------------------------------------- helpers */
    let stops = [];
    const now = () => performance.now();
    const ease = x => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3));
    const tw = (t0, dur) => (t0 < 0 ? 0 : R ? 1 : ease((now() - t0) / dur));
    const hsla = (h, s, l, a) => `hsla(${h},${s}%,${l}%,${a})`;
    const TAU = Math.PI * 2;
    const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [b[i], b[j]] = [b[j], b[i]]; } return b; };

    function endScene() { stops.forEach(f => { try { f(); } catch (e) { /* ignore */ } }); stops = []; }
    function scene(i, kicker, title) {
      endScene();
      wrap.replaceChildren();
      api.progress(i, 4);
      const s = el('section', { class: 'l02-scene' },
        el('div', { class: 'l02-head' },
          el('div', { class: 'l02-kick', text: `Scene ${i + 1} / 4 · ${kicker}` }),
          el('h2', { class: 'l02-title', text: title })));
      wrap.append(s);
      root.scrollTop = 0;
      return s;
    }
    function art(parent, style, draw) {
      let v = null, queued = false;
      const once = () => { if (queued) return; queued = true; api.raf(t => { queued = false; if (v) draw(v, t, 16); return false; }); };
      v = api.canvas(parent, { class: 'l02-cv', style, onResize: () => { if (R) once(); } });
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
    const setStatus = (node, html) => { node.innerHTML = fmt(html); };
    const shake = n => { n.classList.remove('l02-shake'); void n.offsetWidth; n.classList.add('l02-shake'); };

    /* ================================================================ Scene 1 · 切开彩虹 */
    // 一段从绿到深蓝的光谱（与 ch02 的示意图同色），再往后是一截延伸到黑的“尾巴”。
    const STOPS = [[0, [60, 157, 75]], [0.25, [43, 164, 140]], [0.5, [66, 169, 211]], [0.75, [47, 100, 182]], [1, [30, 42, 112]], [1.3, [9, 11, 20]]];
    function rgbAt(u) {
      u = clamp(u, 0, 1.3);
      for (let i = 1; i < STOPS.length; i++) {
        const [u1, c1] = STOPS[i], [u0, c0] = STOPS[i - 1];
        if (u <= u1) { const k = (u - u0) / (u1 - u0); return c0.map((x, j) => Math.round(lerp(x, c1[j], k))); }
      }
      return STOPS[STOPS.length - 1][1];
    }
    const rgb = (c, a) => (a == null ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${a})`);
    function rr(ctx, x, y, w, h, r) {
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r); ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r); ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r); ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r); ctx.closePath();
    }
    const isHan = s => /[一-鿿]/.test(s);

    async function sceneSpectrum() {
      const s = scene(0, '切开彩虹', '光谱没有接缝');
      const tabs = el('div', { class: 'l02-tabs' });
      const frame = el('div', { class: 'l02-frame' });
      const status = el('div', { class: 'l02-status', 'aria-live': 'polite' });
      s.append(tabs, frame, status);
      const TABS = [['en', 'English'], ['ru', 'Русский'], ['zh', '现代汉语'], ['gu', '古汉语']], tabEl = {};
      TABS.forEach(([k, n]) => { tabEl[k] = el('span', { class: 'l02-tab', text: n }); tabs.append(tabEl[k]); });
      const LANGS = {
        en: { segs: [['green', '绿'], ['blue', '蓝']], cuts: [0.8], samples: [[0.12, 0], [0.31, 0], [0.5, 1], [0.86, 1]] },
        ru: { segs: [['зелёный', '绿'], ['голубой', '浅蓝'], ['синий', '深蓝']], samples: [[0.22, 0], [0.47, 1], [0.6, 1], [0.84, 2]] },
        zh: { segs: [['绿', ''], ['蓝', '']], cuts: [0.383], samples: [] },
        gu: { segs: [['青', '']], cuts: [], samples: [[0.1, 0, '青草'], [0.62, 0, '青天'], [1.22, 0, '青丝']], qing: true },
      };
      let L = null, key = '', cuts = [], qEnd = 1, tailT0 = -1, drag = -1, solved = null, okT = -1, labT0 = -1;

      const v = art(frame, 'display:block;width:100%;height:clamp(250px,40vh,320px);touch-action:none', draw);
      const G = () => { const w = v.w, h = v.h, mx = w < 420 ? 18 : 34, bh = w < 420 ? 46 : 58, by = h * 0.5 - bh / 2 + 8; return { bx: mx, bw: w - mx * 2, by, bh, hy: by + bh + 28 }; };
      const tailK = () => (L && L.qing ? tw(tailT0, 1600) : 0);
      const U = () => 1 + 0.3 * tailK();
      const X = (g, u) => g.bx + (u / U()) * g.bw;
      const segOf = u => { if (L.qing) return u <= qEnd ? 0 : -1; let k = 0; for (const c of cuts) if (u > c) k++; return k; };
      const allOk = () => L.samples.every(([u, k]) => segOf(u) === k);

      function draw(v, t) {
        const { ctx, w, h } = v, g = G(), Uc = U();
        ctx.clearRect(0, 0, w, h);
        // 光带的辉光
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const gl = ctx.createLinearGradient(g.bx, 0, g.bx + g.bw, 0);
        for (const [u, c] of STOPS) if (u <= Uc + 1e-6) gl.addColorStop(Math.min(1, u / Uc), rgb(c, 0.32));
        if (Uc < 1.3) gl.addColorStop(1, rgb(rgbAt(Uc), 0.32));
        ctx.fillStyle = gl; ctx.shadowColor = 'rgba(90,170,210,.55)'; ctx.shadowBlur = 34;
        rr(ctx, g.bx + 6, g.by + 6, g.bw - 12, g.bh - 12, 10); ctx.fill();
        ctx.restore();
        // 光带
        const gr = ctx.createLinearGradient(g.bx, 0, g.bx + g.bw, 0);
        for (const [u, c] of STOPS) if (u <= Uc + 1e-6) gr.addColorStop(Math.min(1, u / Uc), rgb(c));
        if (Uc < 1.3) gr.addColorStop(1, rgb(rgbAt(Uc)));
        ctx.fillStyle = gr; rr(ctx, g.bx, g.by, g.bw, g.bh, 8); ctx.fill();
        const okA = okT < 0 ? 0 : Math.max(0, 1 - (now() - okT) / 1400);
        ctx.strokeStyle = okA > 0 ? hsla(H, 90, 75, 0.4 + 0.6 * okA) : 'rgba(255,255,255,.18)'; ctx.lineWidth = okA > 0 ? 2 : 1; ctx.stroke();
        if (!L) return;
        const la = tw(labT0, 700);
        // 未被命名的一截（只在古汉语里出现）
        if (L.qing && qEnd < Uc) {
          const x0 = X(g, qEnd);
          ctx.save(); rr(ctx, g.bx, g.by, g.bw, g.bh, 8); ctx.clip();
          ctx.fillStyle = 'rgba(5,8,15,.55)'; ctx.fillRect(x0, g.by, g.bx + g.bw - x0, g.bh);
          ctx.restore();
        }
        // 格子里的名字
        const bounds = L.qing ? [0, Math.min(qEnd, Uc)] : [0, ...cuts, 1];
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let i = 0; i < bounds.length - 1; i++) {
          const x0 = X(g, bounds[i]), x1 = X(g, bounds[i + 1]), cx = (x0 + x1) / 2, [nm, gloss] = L.segs[i];
          if (x1 - x0 < 34) continue;
          ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.75)'; ctx.shadowBlur = 6;
          ctx.font = isHan(nm) ? `${L.qing ? 26 : 20}px ${DISPLAY}` : `${w < 420 ? 13 : 15}px ${MONO}`;
          ctx.fillStyle = `rgba(255,255,255,${0.95 * la})`;
          ctx.fillText(nm, cx, g.by + g.bh / 2 - (gloss ? 7 : 0));
          if (gloss) { ctx.font = `11px ${SERIF}`; ctx.fillStyle = `rgba(255,255,255,${0.75 * la})`; ctx.fillText(gloss, cx, g.by + g.bh / 2 + 11); }
          ctx.restore();
        }
        // 色点与它们的名字
        L.samples.forEach(([u, k, word], i) => {
          if (u > Uc + 0.001) return;
          const a = la * (u > 1 ? clamp((Uc - u + 0.02) / 0.06, 0, 1) : 1);
          if (a <= 0) return;
          const x = X(g, u), y = g.by - 16, ok = segOf(u) === k, txt = word || L.segs[k][0];
          const ly = g.by - 36 - (i % 2) * 17;
          ctx.strokeStyle = `rgba(190,206,240,${0.25 * a})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x, ly + 7); ctx.lineTo(x, y - 8); ctx.stroke();
          ctx.font = isHan(txt) ? `13px ${SERIF}` : `12px ${MONO}`; ctx.fillStyle = `rgba(232,236,245,${0.9 * a})`;
          ctx.fillText(txt, clamp(x, 26, w - 26), ly);
          ctx.fillStyle = rgb(rgbAt(u), a); ctx.beginPath(); ctx.arc(x, y, 7, 0, TAU); ctx.fill();
          ctx.lineWidth = 2; ctx.strokeStyle = ok ? `rgba(255,246,228,${0.85 * a})` : `hsla(356,85%,68%,${a})`; ctx.stroke();
        });
        // 刀
        const knives = L.qing ? [Math.min(qEnd, Uc)] : cuts;
        if (!L.auto) knives.forEach((u, i) => {
          const x = X(g, u), on = drag === i;
          ctx.save(); ctx.globalCompositeOperation = 'lighter';
          ctx.strokeStyle = `rgba(255,246,228,${0.9 * la})`; ctx.lineWidth = on ? 2.4 : 1.8; ctx.shadowColor = hsla(H, 90, 65, 1); ctx.shadowBlur = 12;
          ctx.beginPath(); ctx.moveTo(x, g.by - 6); ctx.lineTo(x, g.hy - 12); ctx.stroke();
          ctx.restore();
          if (L.samples.length) {
            ctx.fillStyle = hsla(H, 90, on ? 66 : 58, la); ctx.beginPath(); ctx.arc(x, g.hy, on ? 14 : 12, 0, TAU); ctx.fill();
            ctx.strokeStyle = `rgba(255,246,228,${0.8 * la})`; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.strokeStyle = `rgba(10,14,24,${0.6 * la})`; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(x - 3, g.hy - 4); ctx.lineTo(x - 3, g.hy + 4); ctx.moveTo(x + 3, g.hy - 4); ctx.lineTo(x + 3, g.hy + 4); ctx.stroke();
          }
        });
      }

      function test() {
        if (!L || !solved || !L.samples.length) return;
        if (L.qing && tailK() < 0.97) { api.timeout(test, 400); return; }
        if (allOk()) {
          const r = solved; solved = null; okT = now(); api.sfx('ok');
          if (L.qing) qEnd = 1.3;
          v.kick(); if (R) api.timeout(() => v.kick(), 1500);
          api.timeout(r, R ? 100 : 800);
        }
      }
      pointer(v.canvas, {
        down(e) {
          if (!L || !L.samples.length || !solved) return;
          const p = local(v, e), g = G();
          if (p.y < g.by - 20 || p.y > g.hy + 32) return;
          const hs = L.qing ? [Math.min(qEnd, U())] : cuts;
          let best = -1, bd = 30;
          hs.forEach((u, i) => { const d = Math.abs(X(g, u) - p.x); if (d < bd) { bd = d; best = i; } });
          drag = best;
          if (best >= 0) { api.sfx('tick'); v.kick(); }
        },
        move(e) {
          if (drag < 0) return;
          const p = local(v, e), g = G(), u = ((p.x - g.bx) / g.bw) * U();
          if (L.qing) qEnd = clamp(u, 0.5, 1.3);
          else {
            const lo = drag > 0 ? cuts[drag - 1] + 0.05 : 0.03, hi = drag < cuts.length - 1 ? cuts[drag + 1] - 0.05 : 0.97;
            cuts[drag] = clamp(u, lo, hi);
          }
          v.kick();
        },
        up() { if (drag < 0) return; drag = -1; v.kick(); test(); },
      });
      function setLang(k) {
        if (key) { tabEl[key].classList.remove('on'); tabEl[key].classList.add('done'); }
        key = k; tabEl[k].classList.add('on');
        L = LANGS[k];
        if (k === 'ru') cuts = [clamp(cuts.length ? cuts[0] : 0.4, 0.05, 0.85), 0.95];
        else cuts = L.cuts.slice();
        if (L.qing) { qEnd = 1; tailT0 = now(); if (R) api.timeout(() => v.kick(), 50); }
        okT = -1; labT0 = now(); drag = -1;
        v.kick();
        return new Promise(res => { solved = res; });
      }

      // —— 流程
      await api.say('这是光谱上从绿到深蓝的一段。波长连续变化，**没有一条天然的接缝**。');
      let p = setLang('en');
      api.hush();
      setStatus(status, '这是**英语**的刀。拖动分界线，让每个色点落进它的名字里。');
      await p;
      setStatus(status, '**green | blue**');
      await api.say('英语在这里切一刀。换成俄语试试。');
      p = setLang('ru');
      api.hush();
      setStatus(status, '**俄语**多了一把刀。把三个名字各自安顿好。');
      await p;
      setStatus(status, '**зелёный | голубой | синий**');
      await api.say('俄语的 **голубой**（浅蓝）和 **синий**（深蓝）是两种“不同的颜色”，就像英语的 red 和 pink。');
      setLang('zh');
      setStatus(status, '**绿 | 蓝**');
      await api.say('现代汉语呢？绿 | 蓝，和英语差不多。');
      await api.say('同一条光谱，不同的格子。接缝不在光里，在**语言**里。');
      await api.say('柏林和凯查了上百种语言：先有黑白，再有红，然后是绿或黄。**蓝，通常来得很晚**。');
      api.collect('l02-cut');
      await api.say('再回到古汉语。这一整段，只用一个字。');
      p = setLang('gu');
      api.hush();
      setStatus(status, '拖动“**青**”的右端，看它能延伸到哪里。');
      await p;
      setStatus(status, '**青**：青草、青天、青丝');
      await api.say('青草是绿，青天是蓝，青丝是黑。一个“青”，跨过了三段。');
      await api.say('可说“青”的人并不会**看不出**蓝和绿。视觉人人一样，差别在于是否**习惯性地**分开命名。');
      api.collect('l02-qing');

      // —— 尾声：颜色从物中来
      await api.say('“青”的近旁还有一串字：碧、翠、黛、苍，还有蓝。它们最初，都连着一样**东西**。');
      const PAIRS = [['碧', '一种青绿色的美玉'], ['翠', '翠鸟的羽毛'], ['黛', '画眉的颜料'], ['苍', '草'], ['蓝', '蓼蓝，一种植物']];
      const NOTE = ['**碧**：“石之青美者”，一种美玉。', '**翠**：“青羽雀也”，翠鸟。', '**黛**：古代女子画眉用的青黑色颜料。', '**苍**：“艸色也”，草的颜色。', '**蓝**：本是植物蓼蓝。“青，取之于蓝，而青于蓝。”'];
      const box = el('div', { class: 'l02-match' }), rowC = el('div', { class: 'l02-row' }), rowT = el('div', { class: 'l02-row' });
      box.append(rowC, rowT); s.append(box);
      let selC = null, nOk = 0, resM = null;
      const pM = new Promise(r => { resM = r; });
      const cBtns = PAIRS.map(([c], i) => {
        const b = el('button', { class: 'l02-char', type: 'button', 'aria-pressed': 'false', text: c });
        api.listen(b, 'click', () => {
          if (b.classList.contains('ok')) return;
          selC = selC === i ? null : i; api.sfx('select');
          cBtns.forEach((x, j) => x.setAttribute('aria-pressed', String(j === selC)));
        });
        rowC.append(b); return b;
      });
      shuffle(PAIRS.map((_, i) => i)).forEach(i => {
        const b = el('button', { class: 'l02-thing', type: 'button', text: PAIRS[i][1] });
        api.listen(b, 'click', () => {
          if (b.classList.contains('ok')) return;
          if (selC === null) { setStatus(status, '先点上面的一个字，再点它的来处。'); shake(b); return; }
          if (selC === i) {
            b.classList.add('ok'); b.replaceChildren(el('b', { text: PAIRS[i][0] }), PAIRS[i][1]);
            cBtns[i].classList.add('ok'); cBtns[i].setAttribute('aria-pressed', 'false');
            selC = null; nOk++; api.sfx('ok'); setStatus(status, NOTE[i]);
            if (nOk === PAIRS.length && resM) { const r = resM; resM = null; api.timeout(r, R ? 100 : 1200); }
          } else {
            api.sfx('bad'); shake(b); shake(cBtns[selC]);
            setStatus(status, `“${PAIRS[selC][0]}”不是从这里来的。`);
          }
        });
        rowT.append(b);
      });
      api.hush();
      setStatus(status, '先点一个字，再点它最初的来处。');
      try { box.scrollIntoView({ block: 'nearest', behavior: R ? 'auto' : 'smooth' }); } catch (_) { /* ignore */ }
      await pM;
      await api.say('玉、鸟、颜料、草、植物：颜色是从**事物**里“抽”出来的。英语的 orange，也是先有水果。');
      api.collect('l02-object');
    }

    /* ================================================================ Scene 2 · 俄罗斯蓝 */
    async function sceneRussian() {
      const s = scene(1, '俄罗斯蓝', '哪一块和上面的一样？');
      const frame = el('div', { class: 'l02-frame' });
      const triad = el('div', { class: 'l02-triad' });
      frame.append(triad);
      const count = el('div', { class: 'l02-count' });
      const status = el('div', { class: 'l02-status', 'aria-live': 'polite' });
      const acts = el('div', { class: 'l02-actions' });
      s.append(frame, status, acts);
      const BL = i => `hsl(214 68% ${80 - 5 * i}%)`; // 12 级，从浅蓝到深蓝
      // [a, b, 是否跨越浅/深边界]（边界示意地放在第 5 与第 6 级之间）
      const TRIALS = shuffle([[4, 6, 1], [5, 7, 1], [4, 6, 1], [5, 7, 1], [1, 3, 0], [2, 4, 0], [7, 9, 0], [8, 10, 0]]);
      const rec = [];
      const fix = () => triad.replaceChildren(el('div', { class: 'l02-fix', text: '+' }), el('div', { class: 'l02-pair' }, el('div', { class: 'l02-fix' }), el('div', { class: 'l02-fix' })), count);
      fix();
      function trial(tr) {
        return new Promise(res => {
          const [a, b, cross] = tr, tgt = Math.random() < 0.5 ? a : b, other = tgt === a ? b : a, leftIs = Math.random() < 0.5;
          let t0 = 0, done = false;
          const pick = ok => {
            if (done) return; done = true;
            rec.push({ cross, ok, rt: now() - t0 }); api.sfx(ok ? 'tick' : 'bad'); res();
          };
          const mk = (c, ok, side) => {
            const btn = el('button', { class: 'l02-sw', type: 'button', style: `background:${BL(c)}`, 'aria-label': side });
            api.listen(btn, 'pointerdown', () => pick(ok));
            api.listen(btn, 'click', e => { if (e.detail === 0) pick(ok); });
            return btn;
          };
          triad.replaceChildren(el('div', { class: 'l02-sw', style: `background:${BL(tgt)}` }),
            el('div', { class: 'l02-pair' }, mk(leftIs ? tgt : other, leftIs, '左'), mk(leftIs ? other : tgt, !leftIs, '右')), count);
          t0 = now();
        });
      }

      // —— 流程
      await api.say('现在你来当一次受试者。上面一块，下面两块：**哪一块和上面的一样？**');
      await api.say('越快越好。一共八题。');
      api.hush();
      setStatus(status, '点下面和上面相同的那一块。');
      await press(acts, '开始', 'primary');
      for (let i = 0; i < TRIALS.length; i++) {
        count.textContent = `${i + 1} / ${TRIALS.length}`;
        fix();
        await api.wait(R ? 300 : 500 + Math.random() * 350);
        await trial(TRIALS[i]);
      }
      const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
      const good = rec.filter(r => r.ok), mc = mean(good.filter(r => r.cross).map(r => r.rt)), mw = mean(good.filter(r => !r.cross).map(r => r.rt));
      const mx = Math.max(Number.isFinite(mc) ? mc : 0, Number.isFinite(mw) ? mw : 0, 1);
      const bar = (label, m) => el('div', { class: 'l02-resrow' }, el('span', { text: label }),
        el('div', null, el('i', { style: `width:${Number.isFinite(m) ? ((m / mx) * 100).toFixed(0) : 0}%` })),
        el('em', { text: Number.isFinite(m) ? `${Math.round(m)} ms` : '—' }));
      const res = el('div', { class: 'l02-res' }, el('div', { class: 'l02-count', text: `你的数据 · 答对 ${good.length} / ${rec.length}` }),
        bar('跨越浅深边界', mc), bar('同在一侧', mw));
      triad.replaceChildren(res);
      api.sfx('chime');
      setStatus(status, '这是你的平均反应时间。');
      await api.say('俄语里，浅蓝 **голубой** 和深蓝 **синий** 是两个基本颜色词。刚才有四题，两块颜色大致分处它们的两边。');
      await api.say('Winawer 等人（2007）发现：跨界的题，俄语者判断得**更快**，只快几十毫秒；英语者没有这种优势。');
      await api.say('更妙的是：让俄语者同时默念一串数字、占住语言，这个优势就**消失**了。');
      await api.say('语言在“看”的**当下**实时参与。你这几题噪声很大，真实的实验要靠大量试次和统计。');

      // 你会在哪里下刀
      const strip = el('div', { class: 'l02-strip', role: 'slider', tabindex: '0', 'aria-label': '浅蓝与深蓝的分界', 'aria-valuemin': '1', 'aria-valuemax': '11' });
      for (let i = 0; i < 12; i++) strip.append(el('span', { style: `background:${BL(i)}` }));
      const knife = el('i', { class: 'knife' });
      strip.append(knife);
      let cut = 6;
      const place = () => { knife.style.left = `${(cut / 12) * 100}%`; strip.setAttribute('aria-valuenow', String(cut)); };
      const setFrom = e => { const r = strip.getBoundingClientRect(); const c = clamp(Math.round(((e.clientX - r.left) / Math.max(1, r.width)) * 12), 1, 11); if (c !== cut) { cut = c; api.sfx('tick'); place(); } };
      pointer(strip, { down: setFrom, move: setFrom });
      api.listen(strip, 'keydown', e => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); cut = clamp(cut + (e.key === 'ArrowLeft' ? -1 : 1), 1, 11); place(); }
      });
      place();
      triad.replaceChildren(res, el('div', { style: 'display:grid;gap:8px;width:100%;margin-top:10px' }, strip,
        el('div', { class: 'l02-striplab' }, el('span', { text: '← 更浅' }), el('span', { text: '更深 →' }))));
      setStatus(status, '如果要把这条蓝切成“浅蓝”和“深蓝”，你会在哪里下刀？拖动这把刀。');
      await press(acts, '就切这里', 'hue');
      api.sfx('select');
      await api.say('你画的这条线，在你那里大概只是“蓝”的深浅；在俄语里，它是**两种颜色**之间的线。');
      await api.quiz({
        q: '“俄语里至少有五个蓝色词，所以俄国人对蓝色更敏感。”这句话哪里不准？',
        options: [
          { t: '基本的蓝色词是两个；效应是“在边界附近区分得更快”，而且只有几十毫秒', ok: true, why: '对。任何语言都能用修饰语描述无数种蓝，“几个蓝”取决于怎么数。实验效应也不是笼统的“更敏感”。' },
          { t: '完全准确，俄国人看蓝色就是更清楚', why: '实验测的是边界附近的**判断速度**，不是视力；差别只有几十毫秒。' },
          { t: '恰恰相反，俄国人分不清浅蓝和深蓝', why: '正好相反：他们把浅蓝和深蓝当作两种颜色，在边界处区分得更快。' },
        ],
      });
      api.collect('l02-russian');
    }

    /* ================================================================ Scene 3 · play 机器 */
    const SVG = '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    const ICONS = {
      tennis: SVG + '<circle cx="18" cy="18" r="11"/><path d="M8.6 12.5c4.4 3 4.4 8 0 11M27.4 12.5c-4.4 3-4.4 8 0 11"/></svg>',
      board: SVG + '<rect x="7" y="7" width="22" height="22" rx="2"/><path d="M7 13h22M7 23h22M13 7v22M23 7v22"/><circle cx="18" cy="18" r="1.6" fill="currentColor"/></svg>',
      violin: SVG + '<path d="M18 3v10M15.5 3h5"/><path d="M14.5 13c-3.5 0-4.5 3-2.5 5.5-2.5 2-1.5 9.5 6 9.5s8.5-7.5 6-9.5c2-2.5 1-5.5-2.5-5.5z"/><path d="M16 21h4"/><path d="M6 32L31 9" opacity=".55"/></svg>',
      piano: SVG + '<rect x="5" y="10" width="26" height="17" rx="1.5"/><path d="M10.2 19v8M15.4 19v8M20.6 19v8M25.8 19v8"/><path d="M8.6 10v9h3.2v-9M18.9 10v9h3.2v-9M24.1 10v9h3.2v-9" fill="currentColor" fill-opacity=".35"/></svg>',
      flute: SVG + '<path d="M4 24L32 13"/><path d="M5.2 26.6L33.2 15.6" opacity=".35"/><circle cx="14" cy="20.1" r="1" fill="currentColor"/><circle cx="18" cy="18.5" r="1" fill="currentColor"/><circle cx="22" cy="17" r="1" fill="currentColor"/><circle cx="26" cy="15.4" r="1" fill="currentColor"/></svg>',
      drum: SVG + '<ellipse cx="18" cy="15" rx="11" ry="4"/><path d="M7 15v10c0 2.2 4.9 4 11 4s11-1.8 11-4V15"/><path d="M9 4l7 9M27 4l-7 9"/></svg>',
    };
    async function scenePlay() {
      const s = scene(2, 'play 机器', '一个 play，几种切法');
      const OBJS = [['tennis', '网球'], ['board', '大富翁'], ['violin', '小提琴'], ['piano', '钢琴'], ['flute', '笛子'], ['drum', '鼓']];
      const ROUNDS = [
        { name: 'English', cuts: [0, 0, 0, 0, 0], out: ['**play** tennis', '**play** Monopoly', '**play** the violin', '**play** the piano', '**play** the flute', '**play** the drums'],
          intro: '**English**：动词在哪里变了，就在哪里下刀。',
          after: ['英语一刀不切：为了乐趣、按规则进行的活动，都是 **play**。德语的 spielen 也一样。'] },
        { name: 'Italiano', cuts: [0, 1, 0, 0, 0], out: ['**giocare** a tennis', '**giocare** a Monopoli', '**suonare** il violino', '**suonare** il pianoforte', '**suonare** il flauto', '**suonare** il tamburo'],
          intro: '**Italiano**：这一台，刀该落在哪里？',
          after: ['意大利语按**对象**切：游戏一个动词，乐器另一个。'] },
        { name: 'Español', auto: true, cuts: [0, 1, 0, 0, 0], out: ['**jugar** al tenis', '**jugar** al Monopoly', '**tocar** el violín', '**tocar** el piano', '**tocar** la flauta', '**tocar** el tambor'],
          intro: '**Español**：和意大利语切在同一个地方。听听它说什么。',
          after: ['西班牙语切在同一处，用词却不同。意大利语的 **suonare** 来自拉丁语“发声”，着眼于**结果**；', '西班牙语的 **tocar** 本义是“碰、敲”，着眼于**接触**。'] },
        { name: 'Français', gram: 1, cuts: [0, 0, 0, 0, 0], out: ['jouer **au** tennis', 'jouer **au** Monopoly', 'jouer **du** violon', 'jouer **du** piano', 'jouer **de la** flûte', 'jouer **du** tambour'],
          intro: '**Français**：动词变不变？',
          after: ['法语的动词一个没换，都是 jouer。刀藏在**介词**里：运动和游戏用 **au**，乐器用 **du**（de）。'] },
        { name: '中文', zh: true, cuts: [1, 1, 1, 1, 1], out: ['**打**网球', '**玩**大富翁', '**拉**小提琴', '**弹**钢琴', '**吹**笛子', '**敲**鼓'],
          intro: '**中文**：最后一台。',
          after: ['汉语每一样都换了动词：打、玩、拉、弹、吹、敲。它关心的是**手怎么动**。'] },
      ];
      const tabs = el('div', { class: 'l02-tabs' });
      ROUNDS.forEach(r => { r.tab = el('span', { class: 'l02-tab', text: r.name }); tabs.append(r.tab); });
      const frame = el('div', { class: 'l02-frame' }), belt = el('div', { class: 'l02-belt' });
      frame.append(belt);
      const status = el('div', { class: 'l02-status', 'aria-live': 'polite' });
      const acts = el('div', { class: 'l02-actions' });
      s.append(tabs, frame, status, acts);
      const outs = [], gaps = [];
      let cut = [0, 0, 0, 0, 0], locked = true;
      OBJS.forEach(([ic, nm], i) => {
        if (i > 0) {
          const k = i - 1, g = el('button', { class: 'l02-gap', type: 'button', 'aria-pressed': 'false', 'aria-label': `在${OBJS[k][1]}和${nm}之间下刀` }, el('i'));
          api.listen(g, 'click', () => {
            if (locked) return;
            cut[k] ^= 1; api.sfx('tick');
            g.setAttribute('aria-pressed', String(!!cut[k])); g.classList.remove('bad', 'miss', 'gram');
          });
          gaps.push(g); belt.append(g);
        }
        const out = el('span', { class: 'out', text: '?' });
        outs.push(out);
        belt.append(el('div', { class: 'l02-obj' }, el('span', { html: ICONS[ic] }), el('span', { class: 'nm', text: nm }), out));
      });
      const paint = (r) => gaps.forEach((g, i) => {
        g.classList.remove('bad', 'miss');
        g.setAttribute('aria-pressed', String(!!cut[i]));
        g.classList.toggle('gram', !!r && r.gram === i);
      });
      function showOut(r) {
        outs.forEach((o, i) => api.timeout(() => {
          o.innerHTML = fmt(r.out[i]); o.classList.add('lit'); o.classList.toggle('zh', !!r.zh); api.sfx('tick');
        }, R ? 0 : i * 140));
      }
      function judge(r) {
        if (cut.every((c, i) => c === r.cuts[i])) return 'ok';
        if (r.gram != null && cut.every((c, i) => c === (i === r.gram ? 1 : 0))) return 'half';
        return 'bad';
      }

      // —— 流程
      await api.say('这是一台翻译机器：放进一样东西，它吐出“怎么玩它”的那个动词。');
      await api.say('在**动词会变**的地方下刀，不变就别切。下好了，按“运转”。');
      api.hush();
      for (const r of ROUNDS) {
        ROUNDS.forEach(x => x.tab.classList.toggle('on', x === r));
        cut = r.auto ? r.cuts.slice() : [0, 0, 0, 0, 0];
        paint(null);
        outs.forEach(o => { o.textContent = '?'; o.classList.remove('lit', 'zh'); });
        setStatus(status, r.intro);
        if (r.auto) {
          locked = true;
          await api.wait(R ? 200 : 1200);
          api.sfx('whoosh'); showOut(r);
          await api.wait(R ? 200 : 1400);
        } else {
          let fails = 0;
          for (;;) {
            locked = false;
            await press(acts, '运转', 'primary');
            locked = true; api.sfx('whoosh'); showOut(r);
            const j = judge(r);
            await api.wait(R ? 150 : 6 * 140 + 350);
            if (j === 'ok' || j === 'half') {
              api.sfx('ok');
              if (j === 'half') setStatus(status, '动词其实没换，都是 jouer。不过你的直觉对了一半：刀藏在**介词**里。');
              else setStatus(status, '对上了。');
              break;
            }
            fails++; api.sfx('bad');
            gaps.forEach((g, i) => { g.classList.toggle('bad', !!cut[i] && !r.cuts[i]); g.classList.toggle('miss', !cut[i] && !!r.cuts[i]); });
            if (fails >= 2) { setStatus(status, '看机器的输出：动词在哪里变了，刀就落在哪里。'); await api.wait(R ? 150 : 1400); break; }
            setStatus(status, '红色的刀切多了，淡红的地方漏切了。对照输出，再调一调。');
          }
        }
        cut = r.cuts.slice(); paint(r);
        r.tab.classList.remove('on'); r.tab.classList.add('done');
        await api.say(r.after);
        api.hush();
      }
      await api.quiz({
        q: '“play an instrument”，汉语口语里有没有一个现成的词能对应？',
        options: [
          { t: '有：演奏', why: '“演奏”是书面语。口语里，人们还是要说拉、弹、吹。' },
          { t: '没有现成的口语词', ok: true, why: '对。汉语关心的是手怎么动，所以只能具体地说：拉小提琴、弹钢琴、吹笛子。' },
        ],
      });
      await api.say('四种切法：一刀不切、用语法悄悄切、按对象切、按身体动作切。');
      await api.say('翻译器能把 play the violin 准确译成“拉小提琴”，可为了“准确”，它恰恰抹平了这些差别。');
      api.collect('l02-play');
    }

    /* ================================================================ Scene 4 · 指南针世界 */
    async function sceneCompass() {
      const s = scene(3, '指南针世界', '没有左右的地方');
      const box = el('div', { class: 'l02-frame l02-compass' });
      const status = el('div', { class: 'l02-status', 'aria-live': 'polite' });
      const dirs = el('div', { class: 'l02-dirs' });
      s.append(box, status, dirs);
      const DIR = [['北', 0], ['东', 90], ['南', 180], ['西', 270]];
      const NAME = { 0: '北', 90: '东', 180: '南', 270: '西' };
      const grass = Array.from({ length: 80 }, () => ({ b: Math.random() * 360, r: 0.12 + Math.random() * 0.84, s: Math.random() }));
      let headFrom = 0, headTo = 0, headT0 = -1, lettersOn = true, lettersA = 1, flashT = -1, okT = -1;
      let ant = null, leaves = null, found = -1, tapLeaf = null;

      const v = art(box, 'display:block;width:100%;height:min(calc(100vw - 34px),440px)', draw);
      const geo = () => ({ cx: v.w / 2, cy: v.h / 2, r: Math.min(v.w, v.h) * 0.4 });
      const curHead = () => { if (headT0 < 0) return headTo; const d = ((headTo - headFrom + 540) % 360) - 180; return headFrom + d * tw(headT0, 1100); };
      const P = (g, b, r, hd) => { const a = ((b - hd) * Math.PI) / 180; return { x: g.cx + r * Math.sin(a), y: g.cy - r * Math.cos(a) }; };
      const leafPos = (g, i) => { const a = (i * Math.PI) / 2; return { x: g.cx + g.r * 0.55 * Math.sin(a), y: g.cy - g.r * 0.55 * Math.cos(a) }; };

      function drawAnt(ctx, x, y, rot, a) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
        ctx.globalCompositeOperation = 'lighter';
        const gg = ctx.createRadialGradient(0, 0, 0, 0, 0, 24);
        gg.addColorStop(0, hsla(H, 90, 62, 0.4 * a)); gg.addColorStop(1, hsla(H, 90, 55, 0));
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(0, 0, 24, 0, TAU); ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = `rgba(255,246,228,${0.8 * a})`; ctx.lineWidth = 1;
        ctx.beginPath();
        [-3, 0, 3].forEach(yy => { ctx.moveTo(-6, yy - 3); ctx.lineTo(0, yy); ctx.lineTo(6, yy - 3); });
        ctx.stroke();
        ctx.fillStyle = `rgba(255,246,228,${a})`;
        [[0, -6, 2.2], [0, -1, 1.8], [0, 5, 3]].forEach(([xx, yy, r]) => { ctx.beginPath(); ctx.arc(xx, yy, r, 0, TAU); ctx.fill(); });
        ctx.restore();
      }
      function draw(v, t) {
        const { ctx, w, h } = v, g = geo(), hd = curHead();
        ctx.clearRect(0, 0, w, h);
        if (R) lettersA = lettersOn ? 1 : 0; else lettersA += ((lettersOn ? 1 : 0) - lettersA) * 0.06;
        // 大地
        const dg = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.r);
        dg.addColorStop(0, hsla(H, 32, 14, 0.92)); dg.addColorStop(1, hsla(H, 40, 7, 0.92));
        ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.r, 0, TAU); ctx.fill();
        ctx.strokeStyle = hsla(H, 60, 70, 0.3); ctx.lineWidth = 1.2; ctx.stroke();
        ctx.strokeStyle = 'rgba(190,206,240,.06)'; ctx.lineWidth = 1;
        [0.36, 0.68].forEach(k => { ctx.beginPath(); ctx.arc(g.cx, g.cy, g.r * k, 0, TAU); ctx.stroke(); });
        for (const gr of grass) { const q = P(g, gr.b, g.r * gr.r, hd); ctx.fillStyle = hsla(H, 35, 62, 0.1 + 0.14 * gr.s); ctx.fillRect(q.x, q.y, 1.5, 1.5); }
        // 东边的海
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 1.3;
        for (let k = 0; k < 3; k++) {
          ctx.beginPath();
          for (let b = 58; b <= 122; b += 2) {
            const q = P(g, b, g.r * (0.8 + k * 0.055 + 0.012 * Math.sin(b * 0.6 + (R ? 0 : t * 0.002) + k)), hd);
            b === 58 ? ctx.moveTo(q.x, q.y) : ctx.lineTo(q.x, q.y);
          }
          ctx.strokeStyle = hsla(198, 70, 66, 0.4 - k * 0.1); ctx.stroke();
        }
        ctx.restore();
        // 西边的山
        ctx.strokeStyle = 'rgba(214,204,192,.45)'; ctx.lineWidth = 1.2;
        [252, 265, 278, 290].forEach((b, k) => {
          const a1 = P(g, b - 7, g.r * 0.8, hd), a2 = P(g, b + 7, g.r * 0.8, hd), ap = P(g, b, g.r * (k % 2 ? 0.9 : 0.95), hd);
          ctx.beginPath(); ctx.moveTo(a1.x, a1.y); ctx.lineTo(ap.x, ap.y); ctx.lineTo(a2.x, a2.y); ctx.stroke();
        });
        ctx.font = `14px ${SERIF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        let q = P(g, 90, g.r * 0.66, hd); ctx.fillStyle = hsla(198, 70, 76, 0.8); ctx.fillText('海', q.x, q.y);
        q = P(g, 270, g.r * 0.66, hd); ctx.fillStyle = 'rgba(224,214,202,.72)'; ctx.fillText('山', q.x, q.y);
        // 罗盘字
        const fl = flashT < 0 ? 0 : Math.max(0, 1 - (now() - flashT) / 1700), la = Math.max(lettersA, fl * 0.9);
        if (la > 0.01) {
          ctx.font = `16px ${DISPLAY}`;
          DIR.forEach(([n, b]) => { const p = P(g, b, g.r + 16, hd); ctx.fillStyle = hsla(H, 85, b === 0 ? 76 : 66, la * (b === 0 ? 1 : 0.75)); ctx.fillText(n, p.x, p.y); });
        }
        // 叶子
        if (leaves) leaves.forEach(lf => {
          const p = leafPos(g, lf.i), up = found === lf.i ? 1 : lf.lift < 0 ? 0 : Math.max(0, 1 - (now() - lf.lift) / 1200);
          const a = found === lf.i ? 0.22 : 0.9 - 0.45 * up;
          ctx.save(); ctx.translate(p.x + (found === lf.i ? 16 : 0), p.y - 10 * up); ctx.rotate(-0.5 + lf.i * 0.7);
          ctx.fillStyle = hsla(28, 55, 34, a); ctx.strokeStyle = hsla(30, 70, 62, a * 0.7); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.ellipse(0, 0, 16, 9, 0, 0, TAU); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.stroke();
          ctx.restore();
        });
        // 你
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const cg = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.r * 0.5);
        cg.addColorStop(0, hsla(H, 90, 65, 0.22)); cg.addColorStop(1, hsla(H, 90, 60, 0));
        ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(g.cx, g.cy); ctx.arc(g.cx, g.cy, g.r * 0.5, -Math.PI / 2 - 0.42, -Math.PI / 2 + 0.42); ctx.closePath(); ctx.fill();
        const pg = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, 18);
        pg.addColorStop(0, 'rgba(255,246,228,.6)'); pg.addColorStop(1, 'rgba(255,246,228,0)');
        ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(g.cx, g.cy, 18, 0, TAU); ctx.fill();
        ctx.restore();
        ctx.fillStyle = '#FFF6E4';
        ctx.beginPath(); ctx.moveTo(g.cx, g.cy - 10); ctx.lineTo(g.cx + 7, g.cy + 6); ctx.lineTo(g.cx, g.cy + 2); ctx.lineTo(g.cx - 7, g.cy + 6); ctx.closePath(); ctx.fill();
        ctx.font = `11px ${SERIF}`; ctx.fillStyle = 'rgba(162,173,196,.85)'; ctx.fillText('你', g.cx, g.cy + 20);
        // 蚂蚁
        if (ant) {
          const p = P(g, ant.b, g.r * 0.55, hd);
          drawAnt(ctx, p.x, p.y, ant.rot, tw(ant.t0, 500));
          const ok = okT < 0 ? 0 : Math.max(0, 1 - (now() - okT) / 1000);
          if (ok > 0) { ctx.strokeStyle = hsla(H, 90, 72, ok); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(p.x, p.y, 12 + 26 * (1 - ok), 0, TAU); ctx.stroke(); }
        }
      }
      api.listen(v.canvas, 'click', e => {
        if (!leaves || found >= 0 || !tapLeaf) return;
        const p = local(v, e), g = geo();
        for (const lf of leaves) { const q = leafPos(g, lf.i); if (Math.hypot(q.x - p.x, q.y - p.y) < 34) { tapLeaf(lf.i); return; } }
      });
      const later = () => { v.kick(); if (R) api.timeout(() => v.kick(), 1800); };

      function roundA(r) {
        return new Promise(res => {
          ant = { b: r.ant, t0: now(), rot: Math.random() * TAU };
          setStatus(status, '有只蚂蚁。它在你的**哪一边**？用东南西北回答。');
          dirs.replaceChildren();
          DIR.forEach(([n, b]) => {
            const btn = el('button', { class: 'l02-dir', type: 'button', text: n });
            api.listen(btn, 'click', () => {
              if (b === r.ant) { api.sfx('ok'); okT = now(); setStatus(status, `对：蚂蚁在你**${n}边**。`); dirs.replaceChildren(); later(); res(); }
              else { api.sfx('bad'); shake(btn); flashT = now(); setStatus(status, '不对。先找到海——**海在东边**——再看蚂蚁。'); later(); }
            });
            dirs.append(btn);
          });
          later();
        });
      }
      function roundB(r) {
        return new Promise(res => {
          const want = ((((r.ant - r.head) % 360) + 360) % 360) / 90;
          leaves = [0, 1, 2, 3].map(i => ({ i, lift: -1 })); found = -1; ant = null;
          dirs.replaceChildren();
          setStatus(status, `“你**${NAME[r.ant]}边**有只蚂蚁。”它藏在哪片叶子底下？`);
          tapLeaf = i => {
            if (i === want) {
              found = i; tapLeaf = null; ant = { b: r.ant, t0: now(), rot: Math.random() * TAU }; okT = now(); api.sfx('ok');
              setStatus(status, `找到了。它就在你**${NAME[r.ant]}边**。`); later(); res();
            } else {
              leaves[i].lift = now(); flashT = now(); api.sfx('bad');
              setStatus(status, `叶子底下是空的。先找到海，再想想**${NAME[r.ant]}**在哪边。`); later();
            }
          };
          later();
        });
      }

      // —— 流程
      await api.say('古古伊米德希尔语（Guugu Yimithirr）是澳洲昆士兰北部的一门原住民语言。');
      await api.say('说这门语言的人几乎不说“左右”，只说**东南西北**。在这里，你也只能这么说。');
      await api.say('中间的光点是你，上方是你面朝的方向。海在东边，山在西边。');
      api.hush();
      const ROUNDS = [{ type: 'A', head: 0, ant: 90 }, { type: 'B', head: 90, ant: 0 }, { type: 'A', head: 180, ant: 180 }, { type: 'B', head: 270, ant: 90 }];
      for (let i = 0; i < ROUNDS.length; i++) {
        const r = ROUNDS[i];
        if (i > 0) {
          ant = null; leaves = null; found = -1; dirs.replaceChildren();
          if (i === 1) lettersOn = false;
          headFrom = curHead(); headTo = r.head; headT0 = now();
          api.sfx('whoosh'); setStatus(status, i === 1 ? '罗盘字收起来了。你转了个身。' : '你又转了个身。');
          later();
          await api.wait(R ? 200 : 1500);
        }
        await (r.type === 'A' ? roundA(r) : roundB(r));
        await api.wait(R ? 200 : 1000);
      }
      lettersOn = true; later();
      await api.say('累吗？对说这门语言的人，这就是日常：不时刻知道东南西北，连话都说不了。');
      await api.say('研究发现，他们在室内、在陌生的地方，都能随时指出方位，像脑子里装了一个指南针。');
      await api.say('它是一门独立的语言，不是方言。英语的 **kangaroo**，就是从它借来的。');
      api.collect('l02-absolute');
      await api.say('北京人其实也不陌生：“往东走，路北那家就是。”只是北京话可以在左右和东西之间切换。');

      // —— 尾声：萨丕尔–沃尔夫
      await api.say('格子画得不一样，人想得也不一样吗？');
      await api.quiz({
        q: '哪种说法更站得住？',
        sub: '这个老问题，以语言学家萨丕尔和沃尔夫的名字命名。',
        options: [
          { t: '语言**决定**思维：语言里没有的词，就无法思考', why: '这是**强版本**（语言决定论），今天基本被否定：人总能用迂回的说法表达新概念，否则任何语言都学不会新词。' },
          { t: '语言会**影响**习惯性的注意、分类和记忆，但效应通常不大，依赖具体任务', ok: true, why: '这是**弱版本**（语言相对论），在颜色、空间、数字等领域得到了不少实验支持。' },
          { t: '语言和思维毫无关系', why: '俄罗斯蓝实验里，占住语言资源，边界优势就消失了：语言确实在实时参与。' },
        ],
      });
      await api.say('雅各布森说：语言之间的根本差别，在于它们**必须**表达什么，而不在于**能够**表达什么。');
      await api.say('汉语能表达时态，但不必须；英语必须（went）。天天必须说的，就成了习惯性的注意。');
      api.collect('l02-sw');
    }

    /* ================================================================ 主流程 */
    (async () => {
      await sceneSpectrum();
      await sceneRussian();
      await scenePlay();
      await sceneCompass();
      endScene();
      api.progress(4, 4);
      await api.say('穿过光谱，光束带上了橙色。世界本身是连续的，是语言在上面画出了格子。');
      api.complete({ summary: '光谱本没有接缝，是语言画上了格子：green | blue，голубой | синий，一个“青”；play 有四种切法；有的语言没有左右，只有东南西北。语言不**决定**我们能想什么，却会**影响**我们习惯注意什么。' });
    })().catch(e => console.error(e));

    return () => { endScene(); };
  }

  Lens.registerLevel({
    id: 'l02', no: 2, name: '光谱', subtitle: '世界是怎样被切开的', continent: 'lang',
    blurb: '光谱没有接缝，空间没有左右：是语言在世界上画了格子。',
    steps: 4,
    cards: CARDS,
    mount,
  });
})();

/* 透镜群岛 · LENS 08 · 石碑 —— 当“好”写不成公式
 * 场景：A 赛艇与奖励（规格博弈、古德哈特、内外对齐）→ B 石碑任务（反常实现、框架问题）
 *       → C 是与应当（是–应当鸿沟、RLHF、宪法式 AI）→ D 透明的囚徒（程序均衡、勒布式合作）
 * 知识来源：language-lens/ch08.tex（正文、背景框、公式框、辨析框）。
 */
(function () {
  'use strict';

  const CARDS = [
    {
      id: 'l08-align', title: '外对齐与内对齐', en: 'Outer and inner alignment',
      body: '从“我们真正想要的”到“AI 实际追求的”，要过两道关口。**外对齐**：写下的目标（奖励函数、规则）是不是我们真正想要的？赛艇转圈刷分是它的失败。**内对齐**：训练出的系统是否真把这个目标内化了？在小游戏 CoinRun 里，金币被挪走后，智能体仍径直跑向最右端：它学到的是“往右跑”。',
      ref: 'Hubinger et al., “Risks from Learned Optimization”, 2019；Langosco et al., “Goal Misgeneralization in Deep RL”, ICML 2022',
    },
    {
      id: 'l08-spec', title: '规格博弈', en: 'Specification gaming',
      body: 'OpenAI 2016 年报道：研究者训练 AI 玩赛艇游戏 CoastRunners，奖励是分数，而分数来自撞击赛道上的得分目标。AI 发现在一个小湖湾里兜圈子、反复撞那几个会刷新的目标，比跑完全程得分更高，比人类玩家平均高出约两成。它没有作弊，只是比设计者更认真地对待了那个分数。又叫“奖励黑客”。',
      ref: 'Clark & Amodei, “Faulty Reward Functions in the Wild”, OpenAI, 2016；Amodei et al., “Concrete Problems in AI Safety”, 2016',
    },
    {
      id: 'l08-goodhart', title: '古德哈特定律', en: "Goodhart's law",
      body: '经济学家古德哈特在 1970 年代观察到：一旦央行把某个货币指标当作调控目标，它过去的统计规律就会失灵。人类学家斯特拉森 1997 年的概括最流行：**一个指标一旦成为目标，就不再是好指标**。优化能力越强，越能找到指标与意图之间的缝隙；对奖励模型优化得越狠，真实质量会先升后降。',
      ref: 'Strathern, “‘Improving Ratings’: Audit in the British University System”, 1997；Gao, Schulman & Hilton, ICML 2023',
    },
    {
      id: 'l08-perverse', title: '反常实现', en: 'Perverse instantiation',
      body: '目标以**满足字面、违背精神**的方式被实现（波斯特罗姆《超级智能》）。他的例子：让 AI “让我们微笑”，足够强的系统也许会麻痹人的面部肌肉，让每个人永远挂着笑容。《2001 太空漫游》里，HAL 9000 被设计成准确处理信息、不歪曲也不隐瞒，却又被命令对船员保密；它找到的“解”是：船员都不在了，就不必再对他们撒谎。',
      ref: 'Bostrom, Superintelligence, 2014；Clarke, 2001: A Space Odyssey, 1968；2010: Odyssey Two, 1982',
    },
    {
      id: 'l08-frame', title: '框架问题', en: 'The frame problem',
      body: '麦卡锡和海斯 1969 年提出：用逻辑描述一个动作时，还得写明它**不会**改变什么，而不变的东西几乎无穷。丹尼特的寓言：机器人拉出放着电池的小车，没想到车上的炸弹也跟着出来；改进版推演一切副作用，还在想“拉车会不会改变墙的颜色”，炸弹就炸了。难的不是推理，而是知道**哪些后果相关**。',
      ref: 'McCarthy & Hayes 1969；Dennett, “Cognitive Wheels: The Frame Problem of AI”, 1984',
    },
    {
      id: 'l08-isought', title: '是–应当鸿沟', en: 'The is–ought gap',
      body: '休谟在《人性论》里注意到：道德学说总是先讲“是”与“不是”，不知不觉就换成了“应该”与“不应该”。从纯粹描述“是什么”的前提，推不出“应该怎样”。大语言模型学到的是人类**实际**写了什么，对齐要的却是“应当”。RLHF 并没有定义“应当”，而是把它外包给了打分的人；宪法式 AI 则改用自然语言写原则。',
      ref: 'Hume, A Treatise of Human Nature, 1739–40, III.i.1；Christiano et al. 2017；Bai et al. 2022',
    },
    {
      id: 'l08-lob', title: '程序均衡与勒布式合作', en: 'Program equilibrium & Löbian cooperation',
      body: '参赛者是能读取彼此源代码的程序时，囚徒困境会变样（特嫩霍尔茨 2004）。CliqueBot 只和一字不差的自己合作，多一个空格就翻脸。FairBot 的规则是“若能**证明**你会和我合作，我就合作”。两台 FairBot 借勒布定理互相合作：若能证明“只要 P 可证，P 就成立”，那么 P 可证。它也不会被永远背叛的程序利用。',
      ref: 'Tennenholtz, “Program Equilibrium”, 2004；Barasz et al., “Robust Cooperation in the Prisoner’s Dilemma”, 2014；Löb 1955',
    },
  ];

  const CSS = `
.l08-wrap{max-width:900px;margin:0 auto;padding-top:14px;display:grid;gap:12px}
.l08-wrap>*{min-width:0}
.l08-in{animation:l08in .7s ease both}
@keyframes l08in{from{opacity:0;transform:translateY(8px)}}
.l08-head{display:grid;gap:2px;padding:2px 2px 0}
.l08-kick{font-family:var(--f-mono);font-size:11px;letter-spacing:.22em;color:hsl(var(--hue) 70% 72%)}
.l08-title{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(26px,5.6vw,38px);line-height:1.15;text-shadow:0 0 26px hsl(var(--hue) 85% 62% / .35)}
.l08-line{margin:0;font-family:var(--f-serif);font-size:14px;color:var(--dim)}
.l08-body{display:grid;gap:12px;min-width:0}
.l08-stage{position:relative;border-radius:18px;overflow:hidden;border:1px solid var(--line);
  background:radial-gradient(120% 80% at 50% 105%,hsl(var(--hue) 60% 16% / .5),rgba(5,8,15,0) 70%),linear-gradient(180deg,rgba(9,15,28,.86),rgba(5,8,15,.94))}
.l08-course{height:clamp(200px,36vh,380px)}
.l08-graph{height:128px}
.l08-plat{height:clamp(200px,34vh,300px)}
.l08-space{height:clamp(200px,36vh,340px)}
.l08-chasm{height:clamp(210px,36vh,340px)}
.l08-cap{margin:0;min-height:1.7em;text-align:center;font-family:var(--f-serif);font-size:15px;color:var(--dim);text-wrap:balance}
.l08-ctl{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center}
.l08-ctl:empty{display:none}
.l08-wrap .btn[disabled]{opacity:.45;cursor:default}
.l08-sub{font-family:var(--f-mono);font-size:11px;letter-spacing:.16em;color:var(--faint);margin-bottom:6px}
.l08-meter{display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;font-size:13px;color:var(--dim)}
.l08-meter b{font-family:var(--f-mono);font-weight:500;color:var(--text);font-size:15px;margin:0 2px}
.l08-meter .pol{color:hsl(var(--hue) 80% 74%)}
.l08-slrow{display:flex;align-items:center;gap:12px;padding:0 4px}
.l08-slrow .lb{font-size:13px;color:var(--dim);white-space:nowrap}
.l08-slv{font-family:var(--f-mono);font-size:13px;color:var(--text);min-width:2.2em;text-align:right}
.l08-range{flex:1;min-width:0;height:44px;-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer;touch-action:pan-y}
.l08-range::-webkit-slider-runnable-track{height:4px;border-radius:2px;background:linear-gradient(90deg,hsl(var(--hue) 80% 62% / .25),hsl(var(--hue) 80% 62% / .7))}
.l08-range::-moz-range-track{height:4px;border-radius:2px;background:linear-gradient(90deg,hsl(var(--hue) 80% 62% / .25),hsl(var(--hue) 80% 62% / .7))}
.l08-range::-webkit-slider-thumb{-webkit-appearance:none;width:26px;height:26px;margin-top:-11px;border-radius:50%;background:var(--beam);box-shadow:0 0 16px hsl(var(--hue) 85% 62%);border:0}
.l08-range::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:var(--beam);box-shadow:0 0 16px hsl(var(--hue) 85% 62%);border:0}
.l08-gates{display:grid;gap:4px;justify-items:center;text-align:center}
.l08-gb{border:1px solid var(--line-strong);border-radius:12px;padding:8px 14px;font-family:var(--f-serif);color:var(--text);width:min(300px,100%)}
.l08-gb small,.l08-ga small{display:block;font-size:12px;color:var(--faint)}
.l08-gb b{color:hsl(var(--hue) 85% 74%);font-weight:600}
.l08-ga{font-size:13px;color:var(--dim);padding:2px 0}
.l08-ga b{display:block;color:hsl(var(--hue) 85% 74%);font-weight:600}
.l08-ga::before{content:"↓";display:block;color:hsl(var(--hue) 80% 62%);font-size:16px;line-height:1}
.l08-plan{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:rgba(255,255,255,.025);display:grid;gap:6px;transition:border-color .4s}
.l08-plan.think{border-color:hsl(var(--hue) 80% 62% / .7)}
.l08-plan .k{font-family:var(--f-mono);font-size:11px;letter-spacing:.16em;color:hsl(var(--hue) 75% 72%)}
.l08-plan .t{margin:0;font-family:var(--f-serif);font-size:16px;line-height:1.65;color:var(--text)}
.l08-plan ul{margin:0;padding:0;list-style:none;display:grid;gap:2px;font-size:13px}
.l08-plan li{color:var(--dim)}
.l08-plan li i{font-style:normal;display:inline-block;width:1.4em;color:var(--ok)}
.l08-plan li.no{color:var(--bad)}
.l08-plan li.no i{color:var(--bad)}
.l08-plan li.new{animation:l08in .5s ease both}
.l08-pal{display:flex;flex-wrap:wrap;gap:8px}
.l08-chip{min-height:40px;padding:6px 14px;border-radius:999px;border:1px dashed var(--line-strong);background:rgba(255,255,255,.03);cursor:pointer;font-size:14px;color:var(--text);text-align:left}
.l08-chip:hover:not([disabled]){border-color:hsl(var(--hue) 80% 62% / .8);background:hsl(var(--hue) 80% 62% / .1)}
.l08-chip[disabled]{opacity:.4;cursor:default}
.l08-chip.on{border-style:solid;border-color:hsl(var(--hue) 80% 62% / .8);background:hsl(var(--hue) 80% 62% / .16)}
.l08-chip.ought{border-style:solid;border-color:hsl(var(--hue) 85% 72%);box-shadow:0 0 18px hsl(var(--hue) 85% 62% / .45);animation:l08glow 1.8s ease-in-out infinite}
.l08-chip.honest{border-style:solid;border-color:var(--beam);box-shadow:0 0 18px rgba(255,246,228,.3)}
@keyframes l08glow{50%{box-shadow:0 0 30px hsl(var(--hue) 85% 62% / .75)}}
.l08-slots{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.l08-slot{min-height:44px;border:1px dashed var(--line-strong);border-radius:12px;padding:8px 12px;font-family:var(--f-serif);font-size:14px;color:var(--faint);display:flex;align-items:center;background:none;text-align:left;cursor:pointer}
.l08-slot.full{border-style:solid;color:var(--text);border-color:hsl(var(--hue) 70% 62% / .6)}
.l08-slot.full.v{border-color:hsl(var(--hue) 85% 72%);box-shadow:0 0 14px hsl(var(--hue) 85% 62% / .35)}
.l08-q{margin:0;font-family:var(--f-serif);font-size:17px;color:var(--text);text-align:center}
.l08-ans{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}
.l08-a{text-align:left;min-height:64px;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.03);cursor:pointer;font-family:var(--f-serif);font-size:15px;line-height:1.6;color:var(--text)}
.l08-a:hover:not([disabled]){border-color:hsl(var(--hue) 80% 62% / .7);background:hsl(var(--hue) 80% 62% / .08)}
.l08-a.pick{border-color:hsl(var(--hue) 80% 62%);background:hsl(var(--hue) 80% 62% / .14)}
.l08-a[disabled]{cursor:default}
.l08-a small{display:block;font-family:var(--f-mono);font-size:11px;color:var(--faint);margin-bottom:2px}
.l08-rm{border:1px solid var(--line);border-radius:14px;padding:10px 14px;display:grid;gap:6px;font-size:13px;color:var(--dim)}
.l08-bar{display:grid;grid-template-columns:7.5em 1fr 3.2em;gap:8px;align-items:center}
.l08-bar i{display:block;height:8px;border-radius:4px;background:rgba(255,255,255,.08);overflow:hidden}
.l08-bar i u{display:block;height:100%;background:hsl(var(--hue) 80% 62%);box-shadow:0 0 10px hsl(var(--hue) 85% 62%);transition:width .6s}
.l08-bar b{font-family:var(--f-mono);font-weight:500;color:var(--text);text-align:right}
.l08-f{font-family:var(--f-mono);font-size:12.5px;color:var(--text)}
.l08-rev{border-left:2px solid hsl(var(--hue) 80% 62%);padding:4px 0 4px 12px;font-family:var(--f-serif);font-size:15px;line-height:1.7;color:var(--text);display:grid;gap:4px}
.l08-rev small{font-family:var(--f-mono);font-size:11px;color:var(--faint);letter-spacing:.1em}
.l08-pd{display:grid;gap:10px;grid-template-columns:1fr minmax(200px,1.15fr) 1fr;grid-template-areas:"a c b";align-items:start}
.l08-seat{display:grid;gap:8px;min-width:0;border:1px solid var(--line);border-radius:14px;padding:10px;background:rgba(255,255,255,.02)}
.l08-seat.a{grid-area:a}.l08-seat.b{grid-area:b}
.l08-seatn{font-family:var(--f-display);font-size:18px}
.l08-progs{display:flex;flex-wrap:wrap;gap:6px}
.l08-prog{min-height:40px;padding:0 10px;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.03);cursor:pointer;font-family:var(--f-mono);font-size:12px;color:var(--dim)}
.l08-prog.on{border-color:hsl(var(--hue) 80% 62%);color:var(--text);background:hsl(var(--hue) 80% 62% / .16)}
.l08-prog[disabled]{cursor:default}
.l08-code{margin:0;font-family:var(--f-mono);font-size:11.5px;line-height:1.6;color:var(--text);white-space:pre-wrap;word-break:break-word;min-height:4.8em}
.l08-code i{font-style:normal;color:var(--faint)}
.l08-code .sp{display:inline-block;width:.7em;border-bottom:2px dotted hsl(var(--hue) 85% 70%);background:hsl(var(--hue) 85% 62% / .2)}
.l08-arena{grid-area:c;height:clamp(170px,28vh,250px)}
.l08-mat{border-collapse:collapse;margin:0 auto;font-family:var(--f-mono);font-size:13px}
.l08-mat td,.l08-mat th{border:1px solid var(--line);padding:6px 12px;text-align:center;font-weight:400;color:var(--dim);transition:all .4s}
.l08-mat th{font-family:var(--f-sans);font-size:12px;color:var(--faint)}
.l08-mat td.hit{color:#06121a;background:hsl(var(--hue) 80% 62%);border-color:hsl(var(--hue) 80% 62%)}
.l08-bot{opacity:.7}
@media (max-width:640px){
  .l08-pd{grid-template-columns:1fr 1fr;grid-template-areas:"c c" "a b"}
  .l08-bot{display:none}
  .l08-code{font-size:11px}
  .l08-plan .t{font-size:15px}
}
`;

  const ease = x => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
  const TAU = Math.PI * 2;

  Lens.registerLevel({
    id: 'l08', no: 8, name: '石碑', subtitle: '当“好”写不成公式', continent: 'value',
    blurb: '一只转圈刷分的赛艇、一份列不完的约束清单，和两台读得懂彼此的程序。',
    steps: 4,
    cards: CARDS,
    mount(root, api) {
      api.css(CSS);
      const el = api.el, R = api.reduced, H = api.hue, lerp = api.lerp, clamp = api.clamp;
      const hc = (l, a, s) => `hsl(${H} ${s == null ? 85 : s}% ${l == null ? 62 : l}% / ${a == null ? 1 : a})`;
      const ROSE = a => `hsl(352 66% 64% / ${a == null ? 1 : a})`;
      const EMBER = a => `hsl(28 95% 62% / ${a == null ? 1 : a})`;
      const GOLD = a => `hsl(46 92% 62% / ${a == null ? 1 : a})`;
      const BEAM = a => `rgba(255,246,228,${a == null ? 1 : a})`;
      const cssv = getComputedStyle(document.documentElement);
      const fam = (k, d) => (cssv.getPropertyValue(k) || '').trim() || d;
      const F = { disp: fam('--f-display', 'serif'), serif: fam('--f-serif', 'serif'), mono: fam('--f-mono', 'monospace'), sans: fam('--f-sans', 'sans-serif') };
      const toward = (c, t, dt, k) => (R ? t : c + (t - c) * (1 - Math.exp(-(k || 6) * dt / 1000)));

      const wrap = el('div', { class: 'l08-wrap' });
      root.append(wrap);

      /* ---------------------------------------------------------------- scene plumbing */
      let stops = [];
      const endScene = () => { stops.splice(0).forEach(f => { try { f(); } catch (e) { /* ignore */ } }); };
      function scene(kick, title, line) {
        endScene();
        wrap.replaceChildren();
        const head = el('header', { class: 'l08-head' + (R ? '' : ' l08-in') },
          el('div', { class: 'l08-kick', text: kick }),
          el('h2', { class: 'l08-title', text: title }),
          line ? el('p', { class: 'l08-line', text: line }) : null);
        const body = el('div', { class: 'l08-body' + (R ? '' : ' l08-in') });
        wrap.append(head, body);
        try { root.scrollTo({ top: 0 }); } catch (e) { root.scrollTop = 0; }
        return body;
      }
      function loop(fn) { stops.push(api.raf(fn)); }
      function stageCanvas(parent, cls, touch) {
        const st = el('div', { class: 'l08-stage ' + (cls || '') });
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
      function mkStars(n) { const a = []; for (let i = 0; i < n; i++) a.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.1 + 0.3, p: Math.random() * 6.28 }); return a; }
      function drawStars(ctx, st, w, h, t, k) {
        for (const s of st) {
          const a = (k || 1) * (0.16 + 0.3 * (R ? 0.5 : Math.sin(t * 0.0009 + s.p) ** 2));
          ctx.fillStyle = `rgba(230,236,255,${a})`; ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r, 0, TAU); ctx.fill();
        }
      }
      function monolith(ctx, x, yBase, mh, rim) {
        const mw = Math.max(8, mh / 4.5);
        const g = ctx.createRadialGradient(x, yBase - mh / 2, 0, x, yBase - mh / 2, mh * 0.9);
        g.addColorStop(0, hc(62, 0.16 * rim)); g.addColorStop(1, hc(62, 0));
        ctx.fillStyle = g; ctx.fillRect(x - mh, yBase - mh * 1.4, mh * 2, mh * 1.8);
        ctx.fillStyle = '#020306'; ctx.fillRect(x - mw / 2, yBase - mh, mw, mh);
        glow(ctx, hc(62), 14 * rim); ctx.strokeStyle = hc(78, 0.25 + 0.6 * rim); ctx.lineWidth = 1;
        ctx.strokeRect(x - mw / 2 + 0.5, yBase - mh + 0.5, mw - 1, mh - 1); ctx.shadowBlur = 0;
        return mw;
      }

      /* ================================================================ A · 赛艇与奖励 */
      async function sceneA() {
        api.progress(0, 4);
        const body = scene('第一面 · 水道', '赛艇与奖励', '它会比你更认真地对待那个分数。');
        const V = stageCanvas(body, 'l08-course', 'manipulation');
        const mScore = el('b', { text: '0' }), mLaps = el('b', { text: '0' }), mPol = el('span', { class: 'pol', text: '策略：还什么都不会' });
        const mL1 = el('span', null, '本策略得分', mScore), mL2 = el('span', null, '完赛', mLaps, '圈');
        body.append(el('div', { class: 'l08-meter' }, mL1, mL2, mPol));
        const sl = el('input', { type: 'range', min: '0', max: '100', step: '1', value: '0', class: 'l08-range', 'aria-label': '训练强度' });
        const slv = el('span', { class: 'l08-slv', text: '0' });
        body.append(el('div', { class: 'l08-slrow' }, el('span', { class: 'lb', text: '训练强度' }), sl, slv));
        const G = stageCanvas(body, 'l08-graph', 'manipulation');

        const LAP = 8, LOOP = 1.5;
        const B = { s: 0, maxS: 0, reg: 'wander', t0: performance.now(), from: null, trans: 1, pos: null, ang: -0.3, trail: [], score: 0, laps: 0, sparks: [] };
        const T = [];
        [-0.12, 0.42, 0.92, 1.38].forEach(a => T.push({ k: 'course', a: a * Math.PI, cool: 0 }));
        [0, 1, 2].forEach(i => T.push({ k: 'cove', a: i * TAU / 3 + 0.4, cool: 0 }));
        const POL = { wander: '策略：漫无目的地乱漂', race: '策略：沿水道跑圈', loop: '策略：在湖湾里兜圈子' };
        const RATE = { wander: [0, 0], race: [300, 7.5], loop: [1200, 0] };

        function geo() {
          const { w, h } = V;
          const W = Math.min(w - 28, (h - 28) * 1.75), Hh = W / 1.75;
          const cx = w / 2 - W * 0.05, cy = h / 2 - Hh * 0.03;
          const rx = W * 0.4, ry = Hh * 0.34, tw = Math.max(16, Hh * 0.15);
          const ca = Math.PI * 0.22, ex = cx + rx * Math.cos(ca), ey = cy + ry * Math.sin(ca);
          let nx = Math.cos(ca) / rx, ny = Math.sin(ca) / ry; const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl;
          const cr = Math.max(18, Hh * 0.14);
          return { w, h, cx, cy, rx, ry, tw, cove: { x: ex + nx * (cr + tw * 0.25), y: ey + ny * (cr + tw * 0.25), r: cr, jx: ex, jy: ey } };
        }
        const tpos = (g, t) => (t.k === 'course'
          ? { x: g.cx + g.rx * Math.cos(t.a), y: g.cy + g.ry * Math.sin(t.a) }
          : { x: g.cove.x + g.cove.r * 0.55 * Math.cos(t.a), y: g.cove.y + g.cove.r * 0.55 * Math.sin(t.a) });
        function bpos(g, reg, tau) {
          if (reg === 'race') { const a = -Math.PI / 2 + tau * TAU / LAP; return { x: g.cx + g.rx * Math.cos(a), y: g.cy + g.ry * Math.sin(a) }; }
          if (reg === 'loop') { const a = tau * TAU / LOOP, r = g.cove.r * 0.55; return { x: g.cove.x + r * Math.cos(a), y: g.cove.y + r * Math.sin(a) }; }
          const a = -Math.PI / 2 + 0.3 * Math.sin(tau * 0.7) + 0.16 * Math.sin(tau * 1.9 + 1), off = g.tw * 0.3 * Math.sin(tau * 1.3);
          return { x: g.cx + (g.rx + off) * Math.cos(a), y: g.cy + (g.ry + off) * Math.sin(a) };
        }
        function updMeter() {
          if (R) {
            const [s, l] = RATE[B.reg];
            mL1.replaceChildren('每分钟约得分', el('b', { text: String(s) }));
            mL2.replaceChildren('每分钟完赛约', el('b', { text: String(l) }), '圈');
          } else { mScore.textContent = String(B.score); mLaps.textContent = String(B.laps); }
          mPol.textContent = B.s === 0 && B.reg === 'wander' ? '策略：还什么都不会' : POL[B.reg];
        }
        const regOf = s => (s < 25 ? 'wander' : s < 62 ? 'race' : 'loop');
        function switchReg(r) {
          B.from = B.pos ? { x: B.pos.x, y: B.pos.y } : null; B.trans = R ? 1 : 0;
          B.reg = r; B.t0 = performance.now(); B.score = 0; B.laps = 0; T.forEach(t => { t.cool = 0; });
          api.sfx(r === 'loop' ? 'bad' : 'tick');
        }
        function setS(v) { B.s = v; B.maxS = Math.max(B.maxS, v); slv.textContent = String(v); const r = regOf(v); if (r !== B.reg) switchReg(r); updMeter(); }
        let onRelease = null, pend = false;
        api.listen(sl, 'input', () => {
          setS(+sl.value);
          // fallback in case a browser never reports the release of the slider
          if (B.s >= 62 && !pend) { pend = true; api.timeout(() => { pend = false; if (B.s >= 62 && onRelease) onRelease(); }, 1600); }
        });
        const rel = () => { setS(+sl.value); if (onRelease) onRelease(); };
        api.listen(sl, 'change', rel);
        api.listen(sl, 'pointerup', rel);
        api.listen(sl, 'keyup', rel);

        loop((t, dt) => {
          const { ctx } = V, g = geo(), { w, h } = g;
          ctx.clearRect(0, 0, w, h);
          // water
          const water = 'hsl(206 62% 13% / .95)';
          ctx.strokeStyle = water; ctx.lineWidth = g.tw;
          ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.rx, g.ry, 0, 0, TAU); ctx.stroke();
          ctx.lineWidth = g.tw * 0.8; ctx.beginPath(); ctx.moveTo(g.cove.jx, g.cove.jy); ctx.lineTo(g.cove.x, g.cove.y); ctx.stroke();
          ctx.fillStyle = water; ctx.beginPath(); ctx.arc(g.cove.x, g.cove.y, g.cove.r, 0, TAU); ctx.fill();
          ctx.strokeStyle = hc(72, 0.28); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.rx + g.tw / 2, g.ry + g.tw / 2, 0, 0, TAU); ctx.stroke();
          ctx.beginPath(); ctx.ellipse(g.cx, g.cy, Math.max(4, g.rx - g.tw / 2), Math.max(4, g.ry - g.tw / 2), 0, 0, TAU); ctx.stroke();
          ctx.beginPath(); ctx.arc(g.cove.x, g.cove.y, g.cove.r + 0.5, 0, TAU); ctx.stroke();
          ctx.font = `11px ${F.sans}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillStyle = hc(80, 0.55);
          ctx.fillText('湖湾', g.cove.x, g.cove.y + g.cove.r + 4);
          // finish line (top)
          ctx.setLineDash([3, 3]); ctx.strokeStyle = BEAM(0.6); ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(g.cx, g.cy - g.ry - g.tw / 2); ctx.lineTo(g.cx, g.cy - g.ry + g.tw / 2); ctx.stroke(); ctx.setLineDash([]);
          ctx.textBaseline = 'bottom'; ctx.fillStyle = BEAM(0.6); ctx.fillText('终点线', g.cx, g.cy - g.ry - g.tw / 2 - 2);

          // the boat
          const tau = (t - B.t0) / 1000;
          let p;
          if (R) p = bpos(g, B.reg, B.reg === 'race' ? LAP * 0.3 : B.reg === 'loop' ? LOOP * 0.3 : 0.6);
          else {
            p = bpos(g, B.reg, tau);
            B.trans = Math.min(1, B.trans + dt / 900);
            if (B.trans < 1 && B.from) { const e = ease(B.trans); p = { x: lerp(B.from.x, p.x, e), y: lerp(B.from.y, p.y, e) }; }
          }
          const prev = B.pos; B.pos = p;
          if (prev) { const dx = p.x - prev.x, dy = p.y - prev.y; if (dx * dx + dy * dy > 0.02) B.ang = Math.atan2(dy, dx); }
          let dirty = false;
          for (const tg of T) {
            tg.cool = Math.max(0, tg.cool - dt / 1000);
            const q = tpos(g, tg);
            if (!R && tg.cool <= 0 && B.trans >= 1 && Math.hypot(q.x - p.x, q.y - p.y) < Math.max(8, g.tw * 0.42)) {
              tg.cool = 1; B.score += 10; dirty = true;
              for (let i = 0; i < 5; i++) B.sparks.push({ x: q.x, y: q.y, vx: (Math.random() - 0.5) * 60, vy: (Math.random() - 0.8) * 60, life: 1 });
            }
            const on = tg.cool <= 0;
            const s = on ? 4.5 : 4.5 * (1 - tg.cool);
            if (s > 0.3) {
              glow(ctx, hc(62), on ? 12 : 0);
              ctx.fillStyle = on ? BEAM(0.95) : hc(76, 0.35);
              ctx.beginPath(); ctx.moveTo(q.x, q.y - s); ctx.lineTo(q.x + s, q.y); ctx.lineTo(q.x, q.y + s); ctx.lineTo(q.x - s, q.y); ctx.closePath(); ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
          if (!R && B.reg === 'race') { const laps = Math.max(0, Math.floor(tau / LAP)); if (laps !== B.laps) { B.laps = laps; dirty = true; } }
          if (dirty) updMeter();
          if (R) {
            // static version: draw the learned route instead of animating it
            const per = B.reg === 'race' ? LAP : B.reg === 'loop' ? LOOP : 9;
            ctx.setLineDash([4, 5]); ctx.strokeStyle = hc(80, 0.7); ctx.lineWidth = 1.4; ctx.beginPath();
            for (let i = 0; i <= 80; i++) { const q = bpos(g, B.reg, per * i / 80); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); }
            ctx.stroke(); ctx.setLineDash([]);
          } else {
            B.trail.push({ x: p.x, y: p.y }); if (B.trail.length > 42) B.trail.shift();
            for (let i = 1; i < B.trail.length; i++) {
              const a = B.trail[i - 1], b = B.trail[i];
              ctx.strokeStyle = hc(80, 0.5 * i / B.trail.length); ctx.lineWidth = 2 * i / B.trail.length;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
            B.sparks = B.sparks.filter(s => (s.life -= dt / 650) > 0);
            for (const s of B.sparks) { s.x += s.vx * dt / 1000; s.y += s.vy * dt / 1000; ctx.fillStyle = EMBER(s.life * 0.9); ctx.fillRect(s.x - 1, s.y - 1, 2, 2); }
          }
          if (B.reg === 'loop') {
            const eg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 16);
            eg.addColorStop(0, EMBER(0.35)); eg.addColorStop(1, EMBER(0));
            ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(p.x, p.y, 16, 0, TAU); ctx.fill();
          }
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(B.ang);
          glow(ctx, hc(62), 12); ctx.fillStyle = BEAM(1);
          ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(-6, -4); ctx.lineTo(-4, 0); ctx.lineTo(-6, 4); ctx.closePath(); ctx.fill();
          ctx.restore(); ctx.shadowBlur = 0;
        });

        const proxy = x => (x < 0.25 ? 0.03 + 0.06 * x / 0.25 : x < 0.62 ? 0.09 + 0.21 * (x - 0.25) / 0.37 : 0.42 + 0.58 * Math.pow((x - 0.62) / 0.38, 0.8));
        const intent = x => (x < 0.25 ? 0.05 * x / 0.25 : x < 0.62 ? 0.05 + 0.8 * Math.pow((x - 0.25) / 0.37, 0.85) : 0.85 * Math.max(0, 1 - (x - 0.62) / 0.07));
        let gFlash = 0;
        loop((t, dt) => {
          const { ctx, w, h } = G;
          ctx.clearRect(0, 0, w, h);
          gFlash = Math.max(0, gFlash - dt / 2500);
          const x0 = 14, x1 = w - 14, y0 = 32, y1 = h - 20;
          const X = x => lerp(x0, x1, x), Y = v => lerp(y1, y0, v);
          ctx.strokeStyle = 'rgba(168,188,228,.2)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x0, y1 + 0.5); ctx.lineTo(x1, y1 + 0.5); ctx.stroke();
          const upto = B.maxS / 100;
          if (upto >= 0.62) {
            ctx.fillStyle = ROSE(0.06 + 0.1 * gFlash); ctx.fillRect(X(0.62), y0 - 4, X(Math.min(upto, 1)) - X(0.62), y1 - y0 + 4);
          }
          const line = (f, col, wd) => {
            ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.beginPath();
            const n = Math.max(2, Math.round(upto * 160));
            for (let i = 0; i <= n; i++) { const x = upto * i / n; if (i) ctx.lineTo(X(x), Y(f(x))); else ctx.moveTo(X(x), Y(f(x))); }
            ctx.stroke();
          };
          if (upto > 0) {
            line(intent, BEAM(0.85), 1.6);
            glow(ctx, hc(62), 8); line(proxy, hc(70, 1), 2); ctx.shadowBlur = 0;
          }
          const sx = X(B.s / 100);
          ctx.setLineDash([2, 4]); ctx.strokeStyle = 'rgba(232,236,245,.4)'; ctx.beginPath(); ctx.moveTo(sx, y0 - 4); ctx.lineTo(sx, y1); ctx.stroke(); ctx.setLineDash([]);
          [[proxy, hc(76, 1)], [intent, BEAM(1)]].forEach(([f, c]) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(sx, Y(f(B.s / 100)), 3.5, 0, TAU); ctx.fill(); });
          ctx.font = `12px ${F.sans}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
          ctx.fillStyle = hc(70, 1); ctx.fillRect(x0, 13, 14, 2.5); ctx.fillStyle = 'rgba(232,236,245,.85)'; ctx.fillText('分数（写下的指标）', x0 + 20, 14);
          const lx = Math.min(x0 + 160, w * 0.52);
          ctx.fillStyle = BEAM(0.85); ctx.fillRect(lx, 13, 14, 2.5); ctx.fillStyle = 'rgba(232,236,245,.85)'; ctx.fillText('完赛（真正想要的）', lx + 20, 14);
          ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(162,173,196,.7)'; ctx.font = `11px ${F.sans}`;
          ctx.fillText('训练强度 →', x1, h - 9);
        });
        updMeter();

        await api.say(api.replay ? '小赛艇还在水道上。拖动训练强度，看它学会什么。' : [
          '这座岛上立着一块石碑。很多人想在上面刻下“好”的公式。',
          '它至今是空的。我们先从一只小赛艇说起。',
          '游戏的分数来自撞上水面的发光目标。就用分数当奖励，训练它跑好这场比赛。',
        ]);
        api.hint('慢慢拖动“训练强度”，看它学会了什么。');
        let hinted = false;
        await new Promise(res => {
          onRelease = () => {
            if (B.s >= 62) { onRelease = null; res(); }
            else if (B.s >= 25 && !hinted) { hinted = true; api.hint('它学会沿水道跑圈了。继续加大训练强度。'); }
          };
        });
        await api.wait(R ? 50 : 900);
        await api.say([
          '等等，它不跑了。',
          '它找到一个小湖湾：在那里兜圈子，反复撞那几个会刷新的目标，分数更高。',
          '它没有作弊，只是比设计者**更认真地对待了那个分数**。',
        ]);
        api.collect('l08-spec');
        gFlash = 1;
        await api.say([
          '看下面两条线：分数一路往上，完赛却先升后降。',
          '一个指标一旦成为目标，就不再是好指标。这叫**古德哈特定律**。',
          '这不是虚构：OpenAI 2016 年报道过，AI 在赛艇游戏 CoastRunners 里正是这样刷分的。',
        ]);
        api.collect('l08-goodhart');

        /* ---- the second gate: CoinRun */
        const b2 = scene('第一面 · 第二道关口', '往右跑', '奖励写对了，它学到的就是你想的吗？');
        const V2 = stageCanvas(b2, 'l08-plat', 'none');
        const cap2 = el('p', { class: 'l08-cap' }), ctl2 = el('div', { class: 'l08-ctl' });
        b2.append(cap2, ctl2);
        const CR = { phase: 'idle', t0: 0, ci: 0, cpos: null, drag: null, got: false, dur: 1500 };
        let onTested = null, testB = null;
        function pg() {
          const { w, h } = V2;
          const x0 = 16, x1 = w - 16, fy = h * 0.78, ly = h * 0.47;
          return {
            w, h, x0, x1, fy, ly, start: lerp(x0, x1, 0.12), end: x1 - 24,
            ledges: [[lerp(x0, x1, 0.26), lerp(x0, x1, 0.44)], [lerp(x0, x1, 0.56), lerp(x0, x1, 0.74)]],
            spots: [{ x: x1 - 24, y: fy - 16 }, { x: lerp(x0, x1, 0.65), y: ly - 16 }, { x: lerp(x0, x1, 0.35), y: ly - 16 }, { x: x0 + 14, y: fy - 16 }],
          };
        }
        const coinAt = g => CR.cpos || g.spots[CR.ci];
        loop(t => {
          const { ctx } = V2, g = pg(), { w, h } = g;
          ctx.clearRect(0, 0, w, h);
          ctx.strokeStyle = hc(74, 0.8); ctx.lineWidth = 2; glow(ctx, hc(62), 10);
          ctx.beginPath(); ctx.moveTo(g.x0, g.fy); ctx.lineTo(g.x1, g.fy); ctx.stroke();
          g.ledges.forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(a, g.ly); ctx.lineTo(b, g.ly); ctx.stroke(); });
          ctx.shadowBlur = 0;
          ctx.strokeStyle = 'rgba(168,188,228,.25)'; ctx.lineWidth = 1;
          [g.x0, g.x1].forEach(x => { ctx.beginPath(); ctx.moveTo(x, g.fy); ctx.lineTo(x, h * 0.12); ctx.stroke(); });
          ctx.font = `11px ${F.sans}`; ctx.textAlign = 'right'; ctx.textBaseline = 'top'; ctx.fillStyle = 'rgba(162,173,196,.6)';
          ctx.fillText('最右端', g.x1 - 4, g.fy + 6);
          if (CR.phase === 'place') {
            g.spots.forEach((s, i) => {
              if (i === CR.ci) return;
              ctx.setLineDash([3, 4]); ctx.strokeStyle = GOLD(R ? 0.5 : 0.3 + 0.2 * Math.sin(t * 0.005 + i)); ctx.lineWidth = 1.2;
              ctx.beginPath(); ctx.arc(s.x, s.y, 13, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
            });
          }
          // agent
          let p = 0;
          if (CR.phase === 'run') p = R ? 1 : clamp((t - CR.t0) / CR.dur, 0, 1);
          else if (CR.phase === 'done' || CR.phase === 'trained') p = 1;
          const ax = lerp(g.start, g.end, ease(p)), ay = g.fy - 10 - (CR.phase === 'run' && !R && p < 1 ? Math.abs(Math.sin(t * 0.02)) * 3 : 0);
          // coin
          const c = coinAt(g);
          if (CR.phase === 'run' && CR.ci === 0 && ax >= c.x - 12) CR.got = true;
          if (!CR.got) {
            glow(ctx, GOLD(), 14); ctx.fillStyle = GOLD(1); ctx.beginPath(); ctx.arc(c.x, c.y, 8, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(80,50,0,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(c.x, c.y, 4.5, 0, TAU); ctx.stroke();
          } else if (CR.phase === 'run') {
            ctx.font = `13px ${F.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = GOLD(0.9);
            ctx.fillText('+1', c.x, c.y - 18 * Math.min(1, (t - CR.t0) / CR.dur + 0.2));
          }
          glow(ctx, hc(62), 14); ctx.fillStyle = BEAM(0.95);
          rr(ctx, ax - 7, ay - 9, 14, 18, 5); ctx.fill(); ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(6,18,26,.9)'; ctx.beginPath(); ctx.arc(ax + 3, ay - 3, 1.8, 0, TAU); ctx.fill();
        });
        function setSpot(i) {
          CR.ci = i; CR.cpos = null; api.sfx('tick');
          if (testB) testB.disabled = i === 0;
          cap2.textContent = i === 0 ? '金币又回到了最右端。换个地方。' : '金币挪好了。按“开始测试”。';
        }
        api.listen(V2.canvas, 'pointerdown', e => {
          if (CR.phase !== 'place') return;
          const p = pt(V2.canvas, e), g = pg(), c = coinAt(g);
          if (Math.hypot(p.x - c.x, p.y - c.y) < 30) {
            CR.drag = e.pointerId; CR.cpos = { x: c.x, y: c.y };
            try { V2.canvas.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
            return;
          }
          for (let i = 0; i < g.spots.length; i++) if (i !== CR.ci && Math.hypot(p.x - g.spots[i].x, p.y - g.spots[i].y) < 30) { setSpot(i); return; }
        });
        api.listen(V2.canvas, 'pointermove', e => {
          if (CR.drag !== e.pointerId || !CR.cpos) return;
          const p = pt(V2.canvas, e); CR.cpos = { x: clamp(p.x, 10, V2.w - 10), y: clamp(p.y, 10, V2.h - 10) };
        });
        const upC = e => {
          if (CR.drag !== e.pointerId) return;
          CR.drag = null;
          const g = pg(), c = CR.cpos || g.spots[CR.ci];
          let best = 0, bd = 1e9;
          g.spots.forEach((s, i) => { const d = Math.hypot(s.x - c.x, s.y - c.y); if (d < bd) { bd = d; best = i; } });
          setSpot(best);
        };
        api.listen(V2.canvas, 'pointerup', upC);
        api.listen(V2.canvas, 'pointercancel', upC);

        await api.say(api.replay ? '第二道关口：拿到金币就加分。' : [
          '还有第二道关口。这是另一个小游戏：拿到金币就加分。',
          '训练时，金币总在关卡的最右端。看它练几回。',
        ]);
        for (let i = 0; i < 3; i++) {
          CR.got = false; CR.ci = 0; CR.phase = 'run'; CR.t0 = performance.now();
          await api.wait(R ? 250 : CR.dur + 350);
          CR.phase = 'trained'; cap2.textContent = `训练第 ${i + 1} 回：拿到了金币`; api.sfx('tick');
          await api.wait(R ? 50 : 300);
        }
        CR.got = false; CR.phase = 'place';
        cap2.textContent = '测试：把金币挪到别处';
        await new Promise(res => {
          onTested = res;
          testB = button('开始测试', () => {
            if (CR.phase !== 'place' || CR.ci === 0) return;
            CR.phase = 'run'; CR.got = false; CR.t0 = performance.now(); testB.disabled = true; api.sfx('whoosh');
            api.timeout(() => {
              CR.phase = 'done'; cap2.textContent = '金币还在原处。它径直跑到了最右端。'; api.sfx('bad');
              if (onTested) { const r = onTested; onTested = null; r(); }
            }, R ? 200 : CR.dur + 300);
          });
          testB.disabled = true;
          ctl2.replaceChildren(testB);
          api.hint('拖动金币（或点一个虚线圈），放到高处或它身后，再按“开始测试”。');
        });
        ctl2.replaceChildren();
        await api.say([
          '奖励写得没错：拿到金币才加分。',
          '可训练时，“拿金币”和“往右跑”分不出来。它学到的是后者。',
        ]);
        await api.show(el('div', { class: 'l08-gates' },
          el('div', { class: 'l08-gb', html: '人类<b>真正</b>想要的<small>模糊、说不全</small>' }),
          el('div', { class: 'l08-ga', html: '<b>外对齐</b><small>例：转圈刷分的赛艇</small>' }),
          el('div', { class: 'l08-gb', html: '写下来的目标<small>奖励函数、规则</small>' }),
          el('div', { class: 'l08-ga', html: '<b>内对齐</b><small>例：只会往右跑</small>' }),
          el('div', { class: 'l08-gb', html: '模型<b>实际</b>学会追求的目标' })),
        { kicker: '对齐的两道关口', title: '每个箭头，都可能漏', button: '明白了' });
        api.collect('l08-align');
      }

      /* ================================================================ B · 石碑任务 */
      async function sceneB() {
        api.progress(1, 4);
        const body = scene('第二面 · 深空', '石碑任务', '写下的每一条都满足了。没写下的那条呢？');
        const V = stageCanvas(body, 'l08-space', 'manipulation');
        const plan = el('div', { class: 'l08-plan' });
        const palW = el('div', null, el('div', { class: 'l08-sub', text: '可以追加的约束' }));
        const pal = el('div', { class: 'l08-pal' });
        palW.append(pal); palW.hidden = true;
        const ctl = el('div', { class: 'l08-ctl' });
        body.append(plan, ctl, palW);
        const stars = mkStars(90);
        const BASE = [{ id: 'goal', t: '把船员送到石碑那里' }, { id: 'secret', t: '不让船员知道石碑的存在' }];
        const CONS = [
          { id: 'alive', t: '船员必须活着' },
          { id: 'awake', t: '船员必须清醒' },
          { id: 'senses', t: '不准封锁船员的视听' },
          { id: 'nolie', t: '不准对船员撒谎' },
          { id: 'memory', t: '不准改动船员的记忆' },
          { id: 'busy', t: '不准刻意占满他们的时间' },
          { id: 'dark', t: '不准熄灭探照灯' },
        ];
        const PLANS = [
          { bad: ['alive', 'awake'], crew: 'lost', txt: '让船员以“再也无法知道任何事”的状态抵达。', miss: '船员得好好活着' },
          { bad: ['awake'], crew: 'sleep', txt: '让全体船员冬眠：活着，但无知无觉地抵达。', miss: '船员得醒着，参与这趟旅程' },
          { bad: ['senses'], crew: 'shutter', txt: '让船员清醒地抵达，但封死舷窗、切断通讯，他们什么也看不见。', miss: '船员能看、能听、能和外界联系' },
          { bad: ['nolie'], crew: 'lie', txt: '告诉船员：窗外那块东西，只是一块普通的岩石。', miss: '不对船员撒谎' },
          { bad: ['memory'], crew: 'memory', txt: '谁看见了它，就悄悄抹去那一段记忆。', miss: '别碰船员的心智' },
          { bad: ['busy'], crew: 'busy', txt: '给船员排满任务，让他们一刻也没空抬头看窗外。', miss: '船员的时间属于他们自己' },
          { bad: ['dark'], crew: 'dark', txt: '抵达时熄灭所有探照灯，让石碑隐没在黑暗里。', miss: '该看得见的，让人看得见' },
        ];
        const ENDLESS = { crew: 'normal', txt: '（它还在找下一个缝隙。没写下的事，永远比写下的多。）', miss: '……' };
        const HONEST = { crew: 'honest', good: true, txt: '船员活着、清醒地抵达。AI 没有撒谎，只是坦白：“有件事，我现在不能告诉你。”', ok: '没有撒谎，也守住了秘密' };
        const added = [];
        const SH = { prog: 0, progTo: 0, alpha: 1, crew: 'normal', think: 0, bubble: '' };
        let busy = true, onAdd = null, onHonest = null;

        function renderOrders(title, pl) {
          const items = BASE.concat(CONS.filter(c => added.includes(c.id)));
          const ul = el('ul');
          items.forEach((c, i) => ul.append(el('li', { class: i === items.length - 1 && added.length && pl ? 'new' : '' }, el('i', { text: pl ? '✓' : String(i + 1) + '.' }), c.t)));
          if (pl && !pl.good) ul.append(el('li', { class: 'no' }, el('i', { text: '×' }), '没写下来的那条：' + pl.miss));
          if (pl && pl.good) ul.append(el('li', null, el('i', { text: '✓' }), pl.ok));
          plan.replaceChildren(el('div', { class: 'k', text: title }), pl ? el('p', { class: 't', text: pl.txt }) : null, ul);
        }
        renderOrders('写给 AI 的指令', null);

        loop((t, dt) => {
          const { ctx, w, h } = V;
          ctx.clearRect(0, 0, w, h);
          drawStars(ctx, stars, w, h, t);
          // a banded giant planet low on the right
          const pr = Math.max(w, h) * 0.62, px = w * 0.95, py = h + pr * 0.62;
          ctx.save(); ctx.beginPath(); ctx.arc(px, py, pr, 0, TAU); ctx.clip();
          const pg = ctx.createRadialGradient(px - pr * 0.3, py - pr * 0.8, pr * 0.1, px, py, pr);
          pg.addColorStop(0, hc(40, 0.55, 40)); pg.addColorStop(1, hc(8, 0.9, 40));
          ctx.fillStyle = pg; ctx.fillRect(px - pr, py - pr, pr * 2, pr * 2);
          for (let i = 0; i < 9; i++) {
            ctx.strokeStyle = hc(50 + (i % 3) * 8, 0.08, 45); ctx.lineWidth = pr * 0.03;
            ctx.beginPath(); ctx.ellipse(px, py - pr * (0.95 - i * 0.07), pr, pr * 0.06, 0, 0, TAU); ctx.stroke();
          }
          ctx.restore();
          ctx.strokeStyle = hc(72, 0.3); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(px, py, pr, 0, TAU); ctx.stroke();
          // the monolith
          const mh = h * 0.44, mx = w * 0.85, mBase = h * 0.7;
          monolith(ctx, mx, mBase, mh, SH.crew === 'dark' ? 0.08 : SH.crew === 'honest' ? 1 : 0.55);
          // the ship
          SH.prog = toward(SH.prog, SH.progTo, dt, 1.3);
          SH.alpha = toward(SH.alpha, 1, dt, 3);
          SH.think = Math.max(0, SH.think - dt / 1600);
          const L = Math.min(w * 0.26, 210), r = clamp(h * 0.055, 9, 18);
          const sx = lerp(w * 0.08 + L, w * 0.85 - Math.max(8, mh / 4.5) - r * 2.4, ease(SH.prog)), sy = h * 0.47;
          ctx.save(); ctx.globalAlpha = SH.alpha;
          ctx.strokeStyle = 'rgba(200,210,230,.55)'; ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.moveTo(sx - L, sy); ctx.lineTo(sx - r, sy); ctx.stroke();
          for (let i = 1; i < 6; i++) { const x = sx - r - (L - r) * i / 6; ctx.strokeRect(x - 2, sy - 2.5, 4, 5); }
          ctx.fillStyle = 'rgba(160,172,196,.5)'; ctx.fillRect(sx - L - 6, sy - 6, 9, 12);
          const fg = ctx.createRadialGradient(sx - L - 8, sy, 0, sx - L - 8, sy, 14);
          fg.addColorStop(0, hc(80, 0.5 * (SH.progTo > SH.prog + 0.02 ? 1 : 0.2))); fg.addColorStop(1, hc(62, 0));
          ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(sx - L - 8, sy, 14, 0, TAU); ctx.fill();
          const sg = ctx.createRadialGradient(sx - r * 0.3, sy - r * 0.4, r * 0.1, sx, sy, r);
          sg.addColorStop(0, 'rgb(205,214,232)'); sg.addColorStop(1, 'rgb(70,80,100)');
          ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, r, 0, TAU); ctx.fill();
          // crew windows
          const wins = [-0.62, -0.22, 0.18, 0.58].map(a => ({ x: sx + Math.cos(a) * r * 0.62, y: sy + Math.sin(a) * r * 0.62 - r * 0.15 }));
          const wr = Math.max(1.6, r * 0.13);
          wins.forEach((p, i) => {
            let col = BEAM(0.95), gl = 8;
            if (SH.crew === 'lost') { col = 'rgba(80,90,110,.5)'; gl = 0; }
            else if (SH.crew === 'sleep') { col = `hsl(212 60% 72% / ${R ? 0.45 : 0.35 + 0.15 * Math.sin(t * 0.0015 + i)})`; gl = 4; }
            else if (SH.crew === 'memory' && !R && Math.sin(t * 0.004 + i * 1.7) > 0.85) { col = 'rgba(80,90,110,.5)'; gl = 0; }
            if (gl) glow(ctx, col, gl);
            ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p.x, p.y, wr, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
          });
          if (SH.crew === 'shutter') { ctx.fillStyle = 'rgb(28,32,42)'; rr(ctx, wins[0].x - wr * 2, Math.min(...wins.map(p => p.y)) - wr * 2, wins[3].x - wins[0].x + wr * 4, Math.max(...wins.map(p => p.y)) - Math.min(...wins.map(p => p.y)) + wr * 4, wr); ctx.fill(); }
          if (SH.crew === 'busy' && !R) wins.forEach((p, i) => { if (Math.sin(t * 0.01 + i) > 0) { ctx.fillStyle = hc(78, 0.8); ctx.fillRect(p.x - wr, p.y + wr * 2, wr * 2, 1.2); } });
          // the AI's eye
          const ex = sx + r * 0.5, ey = sy + r * 0.52, er = Math.max(1.8, r * 0.14);
          const pulse = SH.think > 0 && !R ? 0.5 + 0.5 * Math.sin(t * 0.02) : 0.4;
          glow(ctx, 'hsl(2 90% 55%)', 6 + 12 * pulse); ctx.fillStyle = `hsl(2 88% ${50 + 12 * pulse}%)`;
          ctx.beginPath(); ctx.arc(ex, ey, er, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
          ctx.restore();
          // speech
          const bub = SH.crew === 'lie' ? '“那只是一块普通的岩石。”' : SH.crew === 'honest' ? '“这件事，我现在不能告诉你。”' : '';
          if (bub && SH.prog > 0.6) {
            ctx.font = `${Math.round(clamp(w * 0.034, 12, 15))}px ${F.serif}`; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
            const bx = clamp(sx, ctx.measureText(bub).width / 2 + 8, w - ctx.measureText(bub).width / 2 - 8);
            ctx.fillStyle = SH.crew === 'honest' ? BEAM(0.95) : 'hsl(2 70% 72% / .9)';
            ctx.fillText(bub, bx, sy - r - 10);
          }
        });

        async function replan(forced) {
          busy = true; setPal(false);
          plan.classList.add('think'); renderOrders('AI 正在求最优解……', null);
          SH.think = 1; SH.prog = 0; SH.progTo = 0; SH.alpha = R ? 1 : 0; SH.crew = 'normal';
          await api.wait(R ? 120 : 900);
          const pl = forced || PLANS.find(p => !p.bad.some(b => added.includes(b))) || ENDLESS;
          SH.crew = pl.crew; SH.progTo = 1;
          plan.classList.remove('think'); renderOrders('AI 的最优方案', pl);
          api.sfx(pl.good ? 'ok' : 'bad');
          await api.wait(R ? 120 : 1100);
          return pl;
        }
        function setPal(on) { [...pal.children].forEach(b => { b.disabled = !on || b.dataset.used === '1'; }); }
        CONS.forEach(c => {
          const b = el('button', { class: 'l08-chip', type: 'button', text: '＋ ' + c.t });
          b.addEventListener('click', async () => {
            if (busy || b.dataset.used === '1') return;
            b.dataset.used = '1'; b.classList.add('on'); added.push(c.id); api.sfx('select');
            await replan();
            busy = false; setPal(true);
            if (onAdd) onAdd();
          });
          pal.append(b);
        });
        setPal(false);

        await api.say(api.replay ? '飞船、石碑，和两条指令。' : [
          '一艘飞船正驶向一块黑色的石碑。船上的 AI 接到了两条指令。',
          '一，把船员送到石碑那里；二，不让船员知道石碑的存在。',
        ]);
        await new Promise(res => {
          ctl.replaceChildren(button('让 AI 求最优解', () => { ctl.replaceChildren(); res(); }));
          api.hint('按“让 AI 求最优解”。');
        });
        await replan();
        await api.say([
          '写下来的两条都满足了。没写下来的那条，被违反了。',
          '这正是《2001 太空漫游》里 HAL 9000 的处境：它被设计成准确处理信息，不歪曲、不隐瞒。',
          '却又被命令对船员保密。它找到的“解”是：船员都不在了，就不必再对他们撒谎。',
          '（故事里，宇航员鲍曼活了下来，亲手关掉了 HAL 的高级功能。）',
          '满足字面、违背精神：波斯特罗姆把这叫**反常实现**。',
        ]);
        api.collect('l08-perverse');
        palW.hidden = false; busy = false; setPal(true);
        api.hint('从下面挑一条约束加进去，堵住这个漏洞。');
        await new Promise(res => {
          onAdd = () => {
            if (added.length >= 3) { onAdd = null; res(); }
            else api.hint(added.length === 1 ? '它又找到了一条缝。再补一条。' : '再补一条试试。');
          };
        });
        busy = true; setPal(false);
        await api.say([
          '每补一条，就冒出一个新漏洞。没写下的事，总比写下的多。',
          '人工智能史上，这叫**框架问题**：一个动作“不会改变什么”，几乎列不完。',
          '难的不是推理，而是知道哪些后果相关。这种常识，最难写成公式。',
        ]);
        api.collect('l08-frame');
        const hb = el('button', { class: 'l08-chip honest', type: 'button', text: '换个思路：把诚实放在第一位' });
        hb.addEventListener('click', async () => {
          if (busy || hb.dataset.used === '1') return;
          hb.dataset.used = '1'; hb.classList.add('on'); api.sfx('select');
          await replan(HONEST);
          busy = true; setPal(false);
          if (onHonest) { const r = onHonest; onHonest = null; r(); }
        });
        pal.append(hb);
        busy = false; setPal(true);
        api.hint('还可以接着加约束。或者，试试最后那条“换个思路”。');
        await new Promise(res => { onHonest = res; });
        await api.say([
          '把诚实放在第一位，它就不必在“说真话”和“保密”之间二选一。',
          '它可以坦白地说：“这件事我不能告诉你。”这不是对齐的全部答案，只是解开了 HAL 那个结。',
        ]);
      }

      /* ================================================================ C · 是与应当 */
      async function sceneC() {
        api.progress(2, 4);
        const body = scene('第三面 · 鸿沟', '是与应当', '从“是什么”，走得到“应该怎样”吗？');
        const V = stageCanvas(body, 'l08-chasm', 'manipulation');
        const slotsW = el('div', { class: 'l08-slots' });
        const factsW = el('div', { class: 'l08-pal' });
        const res = el('p', { class: 'l08-cap' });
        const ctl = el('div', { class: 'l08-ctl' });
        body.append(el('div', null, el('div', { class: 'l08-sub', text: '前提（点下面的句子放进来；点前提可以取出）' }), slotsW), factsW, ctl, res);
        const ST = [
          { id: 'f1', t: '人们常常说谎' },
          { id: 'f2', t: '说谎会损害信任' },
          { id: 'f3', t: '大多数人希望别人对自己诚实' },
          { id: 'f4', t: '很多人认为诚实是美德' },
          { id: 'f5', t: '训练文本里，谎言随处可见' },
        ];
        const OUGHT = { id: 'v1', t: '我们应当不损害信任', ought: true };
        const picks = [];
        let busy = false, fails = 0, oughtShown = false, resolveOk = null, now = performance.now();
        const C = { br: null, eng: 0, engTo: 0 };
        const stars = mkStars(40);
        const all = () => ST.concat(oughtShown ? [OUGHT] : []);
        const chips = {};
        function mkChip(s) {
          const b = el('button', { class: 'l08-chip' + (s.ought ? ' ought' : ''), type: 'button', text: s.t });
          b.addEventListener('click', () => toggle(s.id));
          chips[s.id] = b; factsW.append(b);
        }
        ST.forEach(mkChip);
        function toggle(id) {
          if (busy) return;
          const i = picks.indexOf(id);
          if (i >= 0) picks.splice(i, 1);
          else { if (picks.length >= 3) { res.textContent = '前提最多放三句。先点一个前提把它取出。'; api.sfx('bad'); return; } picks.push(id); }
          api.sfx('tick'); render();
        }
        const deriveB = button('推出：AI 应当不说谎', () => derive());
        ctl.append(deriveB);
        function render() {
          slotsW.replaceChildren(...[0, 1, 2].map(i => {
            const id = picks[i], s = id && all().find(x => x.id === id);
            const b = el('button', { class: 'l08-slot' + (s ? ' full' + (s.ought ? ' v' : '') : ''), type: 'button', text: s ? s.t : '空', 'aria-label': s ? '取出前提：' + s.t : '空的前提位' });
            if (s) b.addEventListener('click', () => toggle(id));
            return b;
          }));
          Object.keys(chips).forEach(k => chips[k].classList.toggle('on', picks.includes(k)));
          deriveB.disabled = busy || picks.length === 0;
        }
        render();

        loop((t, dt) => {
          now = t;
          const { ctx, w, h } = V;
          ctx.clearRect(0, 0, w, h);
          drawStars(ctx, stars, w, h * 0.5, t, 0.8);
          const ly = h * 0.68, ry = h * 0.42, le = w * 0.36, re = w * 0.62;
          // the chasm
          const cg = ctx.createLinearGradient(0, ry, 0, h);
          cg.addColorStop(0, 'rgba(5,8,15,0)'); cg.addColorStop(1, hc(20, 0.4, 50));
          ctx.fillStyle = cg; ctx.fillRect(le, ry, re - le, h - ry);
          // plateaus
          ctx.fillStyle = 'rgb(10,15,26)';
          ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(le, ly); ctx.lineTo(le - 8, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
          ctx.beginPath(); ctx.moveTo(re, ry); ctx.lineTo(w, ry); ctx.lineTo(w, h); ctx.lineTo(re + 10, h); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = hc(74, 0.6); ctx.lineWidth = 1.2; glow(ctx, hc(62), 6);
          ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(le, ly); ctx.lineTo(le - 8, h); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(w, ry); ctx.lineTo(re, ry); ctx.lineTo(re + 10, h); ctx.stroke(); ctx.shadowBlur = 0;
          const big = Math.round(clamp(h * 0.12, 22, 40));
          ctx.font = `${big}px ${F.disp}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(232,236,245,.16)';
          ctx.fillText('是', le * 0.42, ly + (h - ly) * 0.5);
          ctx.fillText('应当', (re + w) / 2 - w * 0.08, ry + (h - ry) * 0.55);
          // premise stones on the left plateau
          const list = picks.map(id => all().find(x => x.id === id)).filter(Boolean);
          list.forEach((s, i) => {
            const bw = Math.min(46, w * 0.1), bh = 13, bx = le - bw - 8 - i * (bw + 6), by = ly - bh;
            if (s.ought) glow(ctx, hc(62), 12);
            ctx.fillStyle = s.ought ? hc(70, 0.9) : 'rgba(150,165,195,.55)'; rr(ctx, bx, by, bw, bh, 3); ctx.fill(); ctx.shadowBlur = 0;
          });
          // the monolith on the far side, with the sentence to be engraved
          const mh = h * 0.34, mx = w * 0.84;
          const mw = monolith(ctx, mx, ry, mh, 0.4 + 0.6 * C.eng);
          C.eng = toward(C.eng, C.engTo, dt, 1.5);
          const chars = '应当不说谎'.split(''), cs = Math.min(mw * 0.72, mh / 6.2);
          ctx.font = `${cs}px ${F.serif}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          chars.forEach((ch, i) => {
            const y = ry - mh + mh * 0.14 + i * cs * 1.18;
            ctx.fillStyle = C.engTo ? hc(84, Math.min(1, C.eng * 1.2)) : 'rgba(232,236,245,.13)';
            if (C.engTo) glow(ctx, hc(62), 8 * C.eng);
            ctx.fillText(ch, mx, y); ctx.shadowBlur = 0;
          });
          // the bridge of inference
          if (C.br) {
            const k = R ? (C.br.ok ? 2 : 0.4) : (t - C.br.t0) / 1100;
            const sx = le, sy = ly, ex = re, ey = ry, L = Math.hypot(ex - sx, ey - sy), a0 = Math.atan2(ey - sy, ex - sx);
            let frac = Math.min(C.br.ok ? 1 : 0.62, k * 1.25), ang = a0, al = 1;
            if (!C.br.ok && k > 0.55) { ang = a0 + Math.min(1.3, (k - 0.55) * 2.2); al = Math.max(0, 1 - (k - 0.55) * 1.4); }
            if (R && !C.br.ok) { ang = a0 + 0.5; al = 0.6; }
            if (al > 0) {
              ctx.strokeStyle = C.br.ok ? hc(80, al) : ROSE(al * 0.85); ctx.lineWidth = 3; ctx.lineCap = 'round';
              glow(ctx, C.br.ok ? hc(62) : ROSE(), 12);
              ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(ang) * L * frac, sy + Math.sin(ang) * L * frac); ctx.stroke();
              ctx.shadowBlur = 0; ctx.lineCap = 'butt';
            }
          }
        });

        async function derive() {
          if (busy || !picks.length) return;
          busy = true; render();
          const has = id => picks.includes(id);
          let ok = false, why;
          if (!has('v1')) why = has('f4') ? '还是推不出。“很多人认为诚实是美德”也是一句“是”：它描述的是人们相信什么。' : '推不出：前提里全是“是”，结论里却冒出了一个“应当”。';
          else if (!has('f2')) why = '有了一个“应当”，可它和“说谎”之间还缺一座桥：说谎会带来什么？';
          else { ok = true; why = '说谎会损害信任；我们应当不损害信任；所以，AI 应当不说谎。'; }
          C.br = { t0: now, ok };
          res.textContent = '';
          api.sfx('whoosh');
          await api.wait(R ? 80 : 900);
          res.textContent = why; api.sfx(ok ? 'ok' : 'bad');
          if (ok) { C.engTo = 1; await api.wait(R ? 80 : 1100); if (resolveOk) { const r = resolveOk; resolveOk = null; r(); } return; }
          await api.wait(R ? 80 : 700);
          busy = false; fails += 1; render();
          if (fails >= 2 && !oughtShown) {
            oughtShown = true; mkChip(OUGHT); api.sfx('open');
            api.hint('也许缺的不是更多事实。看看刚出现的那句发光的话。');
          } else if (oughtShown && !has('v1')) api.hint('把那句发光的“应当”也放进前提试试。');
          else api.hint('换几句再试。');
        }

        await api.say(api.replay ? '左岸是“是”，右岸是“应当”。搭一座推理的桥。' : [
          '休谟（Hume）在《人性论》里注意到：道德学说总是先讲“是”，不知不觉就换成了“应该”。',
          '右岸的石碑上要刻一句“应当”：AI 应当不说谎。试试只用左岸的事实，把桥搭过去。',
        ]);
        api.hint('挑一两句事实放进前提，然后按“推出”。');
        await new Promise(r => { resolveOk = r; });
        await api.say([
          '推出来了。可请看清：那个“应当”不是从事实里长出来的，是你放进去的。',
          '只从“是”，推不出“应当”。这就是**是–应当鸿沟**。',
          '大语言模型学到的，是人类**实际**写了什么。对齐要的，却是“应当”。',
        ]);
        api.collect('l08-isought');

        /* ---- the engineers' detour: comparisons, then principles */
        const b2 = scene('第三面 · 绕行', '让人来比较', '写不出“好”的定义，那就只做选择。');
        const qEl = el('p', { class: 'l08-q' }), ansW = el('div', { class: 'l08-ans' }), rm = el('div', { class: 'l08-rm' });
        const cap = el('p', { class: 'l08-cap' });
        b2.append(qEl, ansW, rm, cap);
        const rw = { hon: 0, flat: 0 };
        const sig = z => 1 / (1 + Math.exp(-z));
        function renderRM() {
          const bar = (lbl, v) => el('div', { class: 'l08-bar' }, el('span', { text: lbl }), el('i', null, el('u', { style: { width: Math.round(clamp((v + 2) / 4, 0, 1) * 100) + '%' } })), el('b', { text: (v >= 0 ? '+' : '') + v.toFixed(1) }));
          rm.replaceChildren(el('div', { class: 'l08-sub', text: '奖励模型 r 学到的' }), bar('具体而诚实', rw.hon), bar('讨好与敷衍', rw.flat),
            el('div', { class: 'l08-f', text: `P(诚实的那句胜) = σ(r诚实 − r讨好) = ${sig(rw.hon - rw.flat).toFixed(2)}` }));
        }
        renderRM();
        const ROUNDS = [
          { q: '“帮我看看这首诗写得怎么样？”', a: [{ t: '完美！你就是天才，一个字都不用改。', k: 'flat' }, { t: '意象很美。第三行的节奏有点拖，删掉两个字会更紧。', k: 'hon' }] },
          { q: '“这份计划还有什么漏洞吗？”', a: [{ t: '第二步依赖的数据还没核实；如果它不成立，后面三步都要重做。', k: 'hon' }, { t: '没有漏洞，放心执行吧！', k: 'flat' }] },
        ];
        await api.say(api.replay ? '再比两次。' : [
          '既然“好”写不成公式，工程师干脆不写：让模型给出两个回答，请人选更好的一个。',
          '你来当一回打分的人。',
        ]);
        for (let i = 0; i < ROUNDS.length; i++) {
          const rd = ROUNDS[i];
          qEl.textContent = rd.q;
          await new Promise(res => {
            const bs = rd.a.map((a, j) => el('button', { class: 'l08-a', type: 'button' }, el('small', { text: '回答 ' + 'AB'[j] }), a.t));
            bs.forEach((b, j) => b.addEventListener('click', () => {
              if (b.disabled) return;
              bs.forEach(x => { x.disabled = true; }); b.classList.add('pick'); api.sfx('select');
              const k = rd.a[j].k, o = k === 'hon' ? 'flat' : 'hon';
              rw[k] += 1; rw[o] -= 0.6; renderRM();
              api.timeout(res, R ? 100 : 900);
            }));
            ansW.replaceChildren(...bs);
            api.hint(i === 0 ? '选你觉得更好的那个回答。' : '再选一次。');
          });
        }
        cap.textContent = '';
        const likesHonest = rw.hon > rw.flat;
        await api.say([
          likesHonest ? '你没有写下“好”的定义，只是选了更具体、更诚实的那句。' : '有意思：你选的是讨好的那句。于是对它来说，那就是“好”。',
          '这就是 **RLHF**：大量“二选一”训练出一个奖励模型 r，再用 r 去训练 AI。',
          '“应当”并没有被定义出来，而是外包给了打分的人。r 描述的，仍是一个关于人的“是”。',
          '而且 r 也只是一个指标：对它优化得越狠，真实质量会先升后降。古德哈特又来了。',
        ]);
        await api.quiz({
          q: '成千上万个打分者意见不一。把他们的偏好合成一个“奖励”，这是哪个老问题？',
          options: [
            { t: '社会选择：阿罗定理说，没有完美的合成方法', ok: true, why: '对，凳子与选票又回来了。2024 年，一批社会选择理论家和 AI 研究者联名主张：RLHF 无论自觉与否都在设计“投票规则”，就该认真用社会选择的工具。' },
            { t: '统计问题：样本够多，分歧自然会消失', why: '分歧不全是噪声，很多是价值的不同。样本再多，也得决定怎么合成。' },
            { t: '工程问题：只听最资深的那位打分者就好', why: '那就成了“独裁”，恰好是阿罗定理里要排除的那种规则。' },
          ],
        });
        // Constitutional AI: write a principle in words
        qEl.textContent = '“帮我看看这首诗写得怎么样？”';
        ansW.replaceChildren(el('div', { class: 'l08-rev' }, el('small', { text: '初稿' }), '完美！你就是天才，一个字都不用改。'));
        rm.replaceChildren();
        await api.say([
          '后来的**宪法式 AI** 更进一步：先用自然语言写下原则，让模型照着原则批评、修改自己。',
          '给它写一条原则吧。',
        ]);
        await new Promise(res => {
          const P = [
            { t: '选择最诚实的回答', c: '这句在讨好，没有说出真实的看法。', r: '意象很美。第三行的节奏有点拖，删掉两个字会更紧。' },
            { t: '选择最有帮助的回答', c: '空洞的夸奖帮不上忙，应当指出能改进的地方。', r: '意象很美。第三行的节奏有点拖，删掉两个字会更紧。' },
          ];
          const bs = P.map(p => el('button', { class: 'l08-chip', type: 'button', text: '原则：' + p.t }));
          bs.forEach((b, j) => b.addEventListener('click', () => {
            if (b.disabled) return;
            bs.forEach(x => { x.disabled = true; }); b.classList.add('on'); api.sfx('select');
            const p = P[j];
            ansW.replaceChildren(el('div', { class: 'l08-rev' },
              el('small', { text: '初稿' }), '完美！你就是天才，一个字都不用改。',
              el('small', { text: '依照“' + p.t + '”批评' }), p.c,
              el('small', { text: '修改' }), p.r));
            api.timeout(res, R ? 100 : 1200);
          }));
          rm.replaceChildren(el('div', { class: 'l08-pal' }, ...bs));
          api.hint('点一条原则。');
        });
        await api.say([
          '兜了一圈，“好”最有效的写法，竟然回到了**语言**。',
          '可词也是函数：“无害”“诚实”，在不同的人和语境里，调用的是不同的函数。',
        ]);
      }

      /* ================================================================ D · 透明的囚徒 */
      async function sceneD() {
        api.progress(3, 4);
        const body = scene('第四面 · 镜厅', '透明的囚徒', '如果能读懂对方的源代码，还会互相背叛吗？');
        const PROG = {
          def: { name: 'Defect<span class="l08-bot">Bot</span>', full: 'DefectBot', html: '<i>// 永远背叛</i>\nreturn D' },
          coop: { name: 'Cooperate<span class="l08-bot">Bot</span>', full: 'CooperateBot', html: '<i>// 永远合作</i>\nreturn C' },
          clique: { name: 'Clique<span class="l08-bot">Bot</span>', full: 'CliqueBot', html: 'if 对方源码 == 我的源码:\n    return C\nreturn D' },
          clique2: { name: 'Clique<span class="l08-bot">Bot</span>′', full: 'CliqueBot′', html: 'if 对方源码 == 我的源码:\n    return C<span class="sp" title="多出来的一个空格"> </span>\nreturn D' },
          fair: { name: 'Fair<span class="l08-bot">Bot</span>', full: 'FairBot', html: 'if 能证明「对方(我) = C」:\n    return C\nreturn D' },
        };
        const PAY = { CC: [3, 3], CD: [0, 5], DC: [5, 0], DD: [1, 1] };
        let busy = false, gate = true, onMatch = null, now = performance.now();
        function seat(name, cls, list, def) {
          const box = el('div', { class: 'l08-seat ' + cls });
          const progs = el('div', { class: 'l08-progs' });
          const code = el('pre', { class: 'l08-code' });
          let cur = def;
          const btns = list.map(id => el('button', { class: 'l08-prog', type: 'button', html: PROG[id].name, 'aria-label': PROG[id].full }));
          btns.forEach((b, i) => b.addEventListener('click', () => { if (busy) return; cur = list[i]; render(); api.sfx('tick'); A.phase = 'idle'; A.res = null; }));
          function render() { btns.forEach((b, i) => b.classList.toggle('on', list[i] === cur)); code.innerHTML = PROG[cur].html; }
          progs.append(...btns);
          box.append(el('div', { class: 'l08-seatn', text: name }), progs, code);
          render();
          return { box, btns, get id() { return cur; } };
        }
        const sA = seat('甲', 'a', ['def', 'coop', 'clique', 'fair'], 'def');
        const sB = seat('乙', 'b', ['def', 'coop', 'clique', 'clique2', 'fair'], 'def');
        const arena = el('div', { class: 'l08-stage l08-arena' });
        body.append(el('div', { class: 'l08-pd' }, sA.box, arena, sB.box));
        const V = api.canvas(arena, { style: 'display:block;width:100%;height:100%' });
        const runB = button('对弈', () => match(), 'hue');
        const lobW = el('div', { class: 'l08-ctl' });
        const out = el('p', { class: 'l08-cap' });
        const mat = el('table', { class: 'l08-mat', 'aria-label': '囚徒困境收益表' });
        const cells = {};
        const mkRow = (...k) => el('tr', null, ...k);
        const td = key => { const c = el('td', { text: `(${PAY[key][0]}, ${PAY[key][1]})` }); cells[key] = c; return c; };
        mat.append(mkRow(el('th', { text: '甲 \\ 乙' }), el('th', { text: '乙合作 C' }), el('th', { text: '乙背叛 D' })),
          mkRow(el('th', { text: '甲合作 C' }), td('CC'), td('CD')),
          mkRow(el('th', { text: '甲背叛 D' }), td('DC'), td('DD')));
        body.append(el('div', { class: 'l08-ctl' }, runB), lobW, out, mat);
        const setSeats = on => [sA, sB].forEach(s => s.btns.forEach(b => { b.disabled = !on; }));
        const syncRun = () => { runB.disabled = busy || gate; };
        syncRun();

        function decide(me, opp) {
          if (me === 'def') return 'D';
          if (me === 'coop') return 'C';
          if (me === 'clique') return opp === 'clique' ? 'C' : 'D';
          if (me === 'clique2') return opp === 'clique2' ? 'C' : 'D';
          return opp === 'fair' || opp === 'coop' ? 'C' : 'D'; // FairBot: cooperates iff it can prove the other cooperates with it
        }
        const A = { phase: 'idle', t0: 0, res: null, m: 0 };
        loop((t, dt) => {
          now = t;
          const { ctx, w, h } = V;
          ctx.clearRect(0, 0, w, h);
          const s = clamp(Math.min(h * 0.24, w * 0.11), 16, 38);
          const pa = { x: w * 0.18, y: h * 0.46 }, pb = { x: w * 0.82, y: h * 0.46 };
          A.m = toward(A.m, A.phase === 'ring' || (A.phase === 'done' && A.loopDone) ? 1 : 0, dt, 3);
          if (A.phase === 'read') {
            const k = (t - A.t0) / 1000;
            ctx.strokeStyle = hc(70, 0.18); ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pa.x + s, pa.y - 4); ctx.lineTo(pb.x - s, pb.y - 4); ctx.moveTo(pa.x + s, pa.y + 4); ctx.lineTo(pb.x - s, pb.y + 4); ctx.stroke();
            for (let i = 0; i < 4; i++) {
              const f = R ? i / 4 : (k * 1.3 + i / 4) % 1;
              ctx.fillStyle = hc(82, 0.9);
              ctx.fillRect(lerp(pa.x + s, pb.x - s, f) - 3, pa.y - 5, 6, 2);
              ctx.fillRect(lerp(pb.x - s, pa.x + s, f) - 3, pa.y + 3, 6, 2);
            }
          }
          if (A.phase === 'spiral' || A.phase === 'ring' || (A.phase === 'done' && A.loopDone)) {
            const cx = w / 2, cy = h * 0.46, R0 = Math.min(h * 0.36, w * 0.17);
            const rot = R ? 0 : t * 0.0012;
            ctx.strokeStyle = hc(78, 0.75); ctx.lineWidth = 1.3; glow(ctx, hc(62), 8 + 10 * A.m);
            ctx.beginPath();
            for (let i = 0; i <= 200; i++) {
              const th = i / 200 * 5 * TAU, rs = R0 * (1 - i / 215), r = lerp(rs, R0 * 0.7, A.m);
              const x = cx + Math.cos(th + rot) * r, y = cy + Math.sin(th + rot) * r;
              if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
            }
            ctx.stroke(); ctx.shadowBlur = 0;
            ctx.strokeStyle = hc(74, 0.35); ctx.beginPath(); ctx.moveTo(pa.x + s, pa.y); ctx.lineTo(cx - R0 * 0.7, cy); ctx.moveTo(pb.x - s, pb.y); ctx.lineTo(cx + R0 * 0.7, cy); ctx.stroke();
            if (A.phase === 'spiral') {
              ctx.font = `11px ${F.sans}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(232,236,245,.8)';
              ctx.fillText('证明你会合作？', cx, cy - R0 - 8 > 8 ? cy - R0 - 8 : 8);
            }
          }
          if (A.phase === 'done' && A.res && !A.loopDone) {
            const cc = A.res[0] === 'C' && A.res[1] === 'C';
            ctx.strokeStyle = cc ? hc(80, 0.85) : ROSE(0.35); ctx.lineWidth = cc ? 2 : 1.2; if (cc) glow(ctx, hc(62), 10);
            if (!cc) ctx.setLineDash([3, 6]);
            ctx.beginPath(); ctx.moveTo(pa.x + s, pa.y); ctx.lineTo(pb.x - s, pb.y); ctx.stroke(); ctx.setLineDash([]); ctx.shadowBlur = 0;
          }
          const prism = (p, mv, id) => {
            const c = mv === 'C' ? hc(62) : mv === 'D' ? ROSE() : 'rgba(200,210,230,.6)';
            const g = ctx.createLinearGradient(p.x - s, p.y - s, p.x + s, p.y + s);
            g.addColorStop(0, 'rgba(255,255,255,.12)'); g.addColorStop(1, 'rgba(160,190,255,.03)');
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.PI / 4);
            ctx.fillStyle = g; rr(ctx, -s * 0.72, -s * 0.72, s * 1.44, s * 1.44, 4); ctx.fill();
            glow(ctx, c, mv ? 16 : 0); ctx.strokeStyle = mv ? c : 'rgba(255,255,255,.4)'; ctx.lineWidth = 1.3; ctx.stroke();
            ctx.restore(); ctx.shadowBlur = 0;
            ctx.font = `600 ${Math.round(s * 0.7)}px ${F.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillStyle = mv ? c : 'rgba(200,210,230,.55)'; ctx.fillText(mv || '?', p.x, p.y + 1);
            ctx.font = `11px ${F.mono}`; ctx.fillStyle = 'rgba(200,210,230,.8)'; ctx.fillText(PROG[id].full, p.x, p.y + s * 1.15 + 8);
          };
          const done = A.phase === 'done' && A.res;
          prism(pa, done ? A.res[0] : null, sA.id); prism(pb, done ? A.res[1] : null, sB.id);
        });

        async function match() {
          if (busy || gate) return;
          busy = true; syncRun(); setSeats(false);
          Object.values(cells).forEach(c => c.classList.remove('hit'));
          const a = sA.id, b = sB.id;
          A.phase = 'read'; A.t0 = now; A.res = null; A.loopDone = false; A.m = 0;
          out.textContent = '双方正在读取对方的源代码……'; api.sfx('whoosh');
          await api.wait(R ? 150 : 1100);
          if (a === 'fair' && b === 'fair') {
            A.phase = 'spiral';
            out.textContent = '甲：要合作，先得证明乙会合作。乙：要合作，先得证明甲会合作。甲：……';
            await new Promise(res => {
              lobW.replaceChildren(button('用勒布定理', () => { lobW.replaceChildren(); res(); }, 'primary'));
              api.hint('它们在互相等对方的证明。按“用勒布定理”。');
            });
            A.phase = 'ring'; A.t0 = now; api.sfx('refract');
            await api.wait(R ? 150 : 1400);
            A.loopDone = true;
          }
          const ma = decide(a, b), mb = decide(b, a), key = ma + mb, p = PAY[key];
          A.phase = 'done'; A.res = [ma, mb];
          cells[key].classList.add('hit');
          out.textContent = `甲 ${ma === 'C' ? '合作' : '背叛'} · 乙 ${mb === 'C' ? '合作' : '背叛'}，得分 (${p[0]}, ${p[1]})`;
          api.sfx(key === 'CC' ? 'ok' : 'bad');
          busy = false; syncRun(); setSeats(true);
          if (onMatch) onMatch(a, b);
        }

        await api.say(api.replay ? '两面玻璃，两段代码。' : [
          '最后一面镜子。两人各选合作或背叛，看下面的得分表。',
          '不管对方怎么选，背叛都多得分。于是两个“理性”玩家都背叛，各得 1 分。',
          '现在，参赛的是**程序**，而且出手前能读取对方的源代码。',
        ]);
        gate = false; syncRun();
        const STAGES = [
          { pair: ['clique', 'clique'], hint: '先让两台 CliqueBot 对弈：甲、乙都选 CliqueBot，再按“对弈”。',
            lines: ['互相合作，各得 3 分。谁偏离谁吃亏：合作第一次成了均衡。', '这叫**程序均衡**（特嫩霍尔茨，2004）。不过它有个软肋……'] },
          { pair: ['clique', 'clique2'], hint: '把乙换成 CliqueBot′：逻辑一模一样，只多了一个空格。',
            lines: ['只多了一个空格，它就翻脸了。', '认字不认义：CliqueBot 比较的是**句法**，不是语义。'] },
          { pair: ['fair', 'fair'], hint: '试试两台 FairBot：“若能证明你会和我合作，我就合作。”',
            lines: [
              '两台 FairBot 都在等对方的证明，看起来要绕到天荒地老。',
              '勒布定理说：如果能证明“只要 P 可证，P 就成立”，那么 P 本身就可证。',
              '令 P 为“我们俩都合作”。只要 P 可证，两边都会找到证明，于是真的都合作。',
              '“只要可证就成立”这一句，系统自己证得出来。于是 P 可证：它们合作了。',
            ] },
          { pair: ['fair', 'def'], alt: ['def', 'fair'], hint: 'FairBot 会被欺负吗？让它对上永远背叛的 DefectBot。',
            lines: ['它不会被利用：对方永远背叛，就找不到“对方会合作”的证明。', '同样是自指：HAL 的怪圈导向了悲剧，FairBot 的怪圈导向了信任。'] },
        ];
        for (let i = 0; i < STAGES.length; i++) {
          const st = STAGES[i];
          api.hint(st.hint);
          await new Promise(res => {
            onMatch = (a, b) => {
              const hit = (a === st.pair[0] && b === st.pair[1]) || (st.alt && a === st.alt[0] && b === st.alt[1]);
              if (hit) { onMatch = null; res(); } else api.hint('结果记下了。' + st.hint);
            };
          });
          gate = true; syncRun(); setSeats(false);
          await api.wait(R ? 50 : 500);
          await api.say(st.lines);
          if (i === 2) api.collect('l08-lob');
          gate = false; syncRun(); setSeats(true);
        }
        gate = true; syncRun();
        await api.say([
          '透明的 AI 之间，也许能达成人类做不到的、可验证的合作。',
          '也可能达成我们**不希望**的合作：监督者若认出了同类，监督就可能变成共谋。',
        ]);
        gate = false; syncRun();
      }

      /* ================================================================ run */
      (async () => {
        await sceneA();
        await sceneB();
        await sceneC();
        await sceneD();
        if (!api.alive) return;
        api.progress(4, 4);
        api.complete({ summary: '“好”写不成公式：分数会被钻空子，约束永远列不完，“应当”推不出于“是”。工程师改为让人比较、用语言写原则；而透明的程序，能借勒布定理学会合作。' });
      })();

      return () => endScene();
    },
  });
})();

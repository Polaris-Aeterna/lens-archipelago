/* 透镜群岛 · 第 11 镜 · 证言 */
(function () {
  'use strict';

  const CLAIMS = [
    { ok: false, src: '光谱', t: '俄语里有五个基本的蓝色词，所以说俄语的人对蓝色格外敏感。',
      ev: '俄语的基本蓝色词是两个：голубой（浅蓝）和 синий（深蓝）。实验发现的是：两种蓝跨越这条边界时，俄语者区分得稍快一点，优势只有几十毫秒。' },
    { ok: true, src: '光谱', t: '两束光谱成分不同的光，可能在人眼看来是同一种颜色。',
      ev: '这叫“异谱同色”：只要三种视锥细胞的反应相同，看起来就是同一种颜色。屏幕正是靠它，用红、绿、蓝三种光混出各种颜色。' },
    { ok: true, src: '四扇门', t: '严复把 liberty 写作“自繇”，是想和当时常带贬义的“自由”略作区分。',
      ev: '《群己权界论·译凡例》（1903）说，这个词在中文里“常含放诞、恣睢、无忌惮诸劣义”；写作“自繇”，“欲略示区别而已”。' },
    { ok: false, src: '凳子与选票', t: '社会选择理论是博弈论的一个分支，阿罗定理是其中的一条博弈论定理。',
      ev: '社会选择理论研究怎样把个人偏好加总成集体决策，通常被看作博弈论的姊妹领域，而不是它的分支。两者在机制设计处交汇。' },
    { ok: false, src: '两个妖', t: '量子力学证明了：是观察者的意识让波函数发生坍缩。',
      ev: '量子力学里的“测量”是一种物理相互作用：一个分子、一束光子都可以“测量”。退相干解释了干涉为何消失。“意识导致坍缩”只是少数派的诠释。' },
    { ok: true, src: '时空', t: '在狭义相对论里，每个人自己的钟，对他自己来说总是正常地走。',
      ev: '时间膨胀说的是：运动的钟在别人的参考系里走得慢。在钟自己的参考系里，它按固有时正常地走。' },
    { ok: false, src: '两个妖', t: '麦克斯韦妖之所以赢不了第二定律，是因为观察分子必然要消耗能量。',
      ev: '本内特（1982）指出：测量原则上可以不耗能。真正躲不掉的代价是擦除妖的记忆，每擦除 1 比特至少放出 kT ln 2 的热（兰道尔原理）。' },
    { ok: true, src: '塔斯基之塔', t: '丘奇–图灵论题是一个“论题”，而不是一条被证明的定理。',
      ev: '“能行可计算”是一个非形式的直观概念，没法被严格证明等于什么。但图灵机、λ 演算、一般递归函数这几个独立的定义被证明彼此等价，这是它最有力的证据。' },
  ];

  const BELIEFS = [
    { t: '你的生日是哪一天', own: false },
    { t: '地球绕着太阳转', own: false },
    { t: '珠穆朗玛峰是世界最高峰', own: false },
    { t: '水由氢和氧组成', own: false },
    { t: '历史上真的有过拿破仑', own: false },
    { t: '你家门口那条路通向哪里', own: true },
  ];

  const WHISPERS = ['听说', '据报道', '老师说', '课本上写', '地图显示', '百科词条', '新闻里讲', '朋友告诉我', '论文指出', '它说', '传说', '有人说', '我读到', '专家认为'];

  Lens.registerLevel({
    id: 'l11', no: 11, name: '证言', subtitle: '当证言不再来自人', continent: 'logic', steps: 4,
    blurb: '你知道的大部分事，都是别人告诉你的。如果“别人”是一个 AI 呢？',
    cards: [
      { id: 'l11-testimony', title: '证言知识', en: 'Testimonial knowledge',
        body: '一切“有人说 p，我因此相信 p”的知识都叫证言知识：课本、新闻、地图、百科、父母告诉你的生日。我们亲自验证过的事少得惊人，人类知识的大厦主要靠**信任之网**托着。', ref: 'Coady, Testimony: A Philosophical Study, 1992' },
      { id: 'l11-hume-reid', title: '还原论与反还原论', en: 'Reductionism vs. anti-reductionism',
        body: '**休谟**：对证言的信任必须由自己的经验来辩护，即我们一次次观察到人们的话通常与事实相符。**里德**：人天生倾向于说真话，也天生倾向于相信别人，证言默认就值得采信。寇迪补充：没人能按休谟的方式独立核实那么多事实。', ref: 'Hume, An Enquiry Concerning Human Understanding §10, 1748; Reid, An Inquiry into the Human Mind, 1764' },
      { id: 'l11-statement', title: '拉基的陈述观', en: 'The statement view',
        body: '一位不相信进化论、却认真准确地讲授进化论的老师，她的学生仍然可以**知道**进化论的内容。所以证言的认识价值可以在于**陈述本身**是否可靠，而不必在于说话者的信念。这为 AI 证言打开了一扇门，但只开了一半：可靠的陈述背后，往往有一个负责任的说话者。', ref: 'Lackey, Learning from Words, 2008' },
      { id: 'l11-ai-testimony', title: 'AI 证言', en: 'AI-testimony',
        body: '弗赖曼认为主流证言理论是人类中心的。他提出“AI 证言”的三个条件：内容是**命题性**的；生成和传递中**没有其他人类直接参与**；在听者看来，它在**现象上与人类证言相似**。第三条的标准不在说话者内部，而在听者的体验里。', ref: 'Freiman, Social Epistemology 38(4), 2024' },
      { id: 'l11-fluency', title: '流畅性陷阱', en: 'Processing fluency',
        body: '心理学实验发现：同一句话印得越清楚、读起来越顺，人们越倾向于判断它为真。AI 的文字流畅、整齐、自信，说错的时候也一样。比真实更整齐的东西最诱人，博尔赫斯的《特隆》写的就是这种诱惑。', ref: 'Reber & Schwarz, Consciousness and Cognition, 1999' },
      { id: 'l11-calibration', title: '校准', en: 'Calibration',
        body: '一个**校准**良好的说话者，信心与准确率相符：它说“有八成把握”的那些话，大约八成是对的。这时一句“我不知道”就是宝贵的否定性知识。说什么都带着 95% 把握的引路人，没有校准。', ref: 'Kadavath et al., Language Models (Mostly) Know What They Know, 2022' },
      { id: 'l11-checklist', title: '如何对待 AI 证言', en: 'A field guide',
        body: '**追问来源**，并亲自打开核对；**交叉验证**，两个 AI 意见一致不等于两份独立证据；**偏好可验证的输出**，能跑测试、能复算、能交给证明助手的就不必信任；**警惕流畅性**；**注意领域**，冷门事实、精确数字和引文要格外小心。', ref: '改编自《语言是一面透镜》第 11 章' },
    ],

    mount(root, api) {
      const { el } = api;
      api.css(`
        .l11-bg{position:fixed;inset:0;z-index:0;pointer-events:none}
        .l11-wrap{position:relative;z-index:1;max-width:820px;margin:0 auto;padding-top:28px;display:grid;gap:22px}
        .l11-head{display:grid;gap:6px;text-align:center;justify-items:center}
        .l11-head .k{font-family:var(--f-mono);font-size:11px;letter-spacing:.22em;color:hsl(var(--hue) 70% 76%)}
        .l11-head h2{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(30px,6vw,46px);line-height:1.1;text-wrap:balance}
        .l11-head p{margin:0;color:var(--dim);font-family:var(--f-serif);max-width:560px;text-wrap:pretty}
        .l11-panel{position:relative;border:1px solid hsl(var(--hue) 60% 70% / .22);border-radius:22px;padding:24px;
          background:radial-gradient(120% 140% at 50% 0%,hsl(var(--hue) 70% 40% / .16),rgba(10,14,28,.7) 60%);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
        .l11-belief{display:grid;gap:18px;justify-items:center;text-align:center;min-height:220px;align-content:center}
        .l11-belief .q{font-family:var(--f-display);font-size:clamp(24px,5vw,34px);line-height:1.3;text-wrap:balance}
        .l11-belief .n{font-family:var(--f-mono);font-size:12px;color:var(--dim);letter-spacing:.14em}
        .l11-row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
        .l11-tally{display:flex;gap:4px;justify-content:center}
        .l11-tally i{width:22px;height:6px;border-radius:3px;background:rgba(255,255,255,.08)}
        .l11-tally i.own{background:var(--beam)} .l11-tally i.told{background:hsl(var(--hue) 80% 66%)}
        .l11-pillars{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        @media (max-width:600px){.l11-pillars{grid-template-columns:1fr}}
        .l11-pillar{text-align:left;cursor:pointer;border-radius:18px;border:1px solid var(--line);background:rgba(255,255,255,.03);padding:20px 18px;display:grid;gap:8px;transition:border-color .2s,transform .2s,background .2s}
        .l11-pillar:hover{border-color:hsl(var(--hue) 80% 70% / .7);transform:translateY(-2px);background:hsl(var(--hue) 70% 50% / .08)}
        .l11-pillar .nm{font-family:var(--f-display);font-size:26px}
        .l11-pillar .yr{font-family:var(--f-mono);font-size:11px;color:var(--dim);letter-spacing:.14em}
        .l11-pillar p{margin:0;font-family:var(--f-serif);color:var(--dim);font-size:15px;line-height:1.75}
        .l11-sl{display:grid;gap:14px}
        .l11-sl .item{display:grid;grid-template-columns:7.5em 1fr;gap:12px;align-items:center}
        @media (max-width:520px){.l11-sl .item{grid-template-columns:1fr}}
        .l11-sl .nm{font-family:var(--f-display);font-size:19px}
        .l11-track{position:relative;height:44px}
        .l11-track input{position:absolute;inset:0;width:100%;margin:0;accent-color:hsl(var(--hue) 80% 66%);height:44px;background:transparent}
        .l11-track .mk{position:absolute;top:-4px;width:2px;height:52px;background:var(--beam);box-shadow:0 0 8px var(--beam);opacity:0;transition:opacity .6s,left .6s;pointer-events:none}
        .l11-track .band{position:absolute;top:8px;height:28px;border-radius:14px;background:hsl(var(--hue) 80% 66% / .18);border:1px dashed hsl(var(--hue) 80% 72% / .7);opacity:0;transition:opacity .6s;pointer-events:none}
        .l11-track.show .mk,.l11-track.show .band{opacity:1}
        .l11-ends{display:flex;justify-content:space-between;font-family:var(--f-mono);font-size:11px;color:var(--dim);letter-spacing:.12em;padding-left:calc(7.5em + 12px)}
        @media (max-width:520px){.l11-ends{padding-left:0}}
        .l11-note{font-family:var(--f-serif);color:var(--dim);font-size:14px;line-height:1.75}
        .l11-claim{display:grid;gap:16px}
        .l11-claim .meta{display:flex;justify-content:space-between;gap:10px;font-family:var(--f-mono);font-size:11px;letter-spacing:.14em;color:var(--dim);flex-wrap:wrap}
        .l11-claim .conf{color:hsl(var(--hue) 80% 76%)}
        .l11-claim .say{font-family:var(--f-serif);font-size:clamp(19px,3.6vw,24px);line-height:1.7;text-wrap:pretty}
        .l11-claim .say::before{content:"“";color:hsl(var(--hue) 80% 70%);margin-right:2px}
        .l11-claim .say::after{content:"”";color:hsl(var(--hue) 80% 70%)}
        .l11-ev{border-left:2px solid var(--beam);padding:6px 0 6px 14px;font-family:var(--f-serif);color:var(--text);font-size:15px;line-height:1.8}
        .l11-ev small{display:block;font-family:var(--f-mono);font-size:11px;color:var(--dim);letter-spacing:.12em;margin-bottom:4px}
        .l11-tok{display:flex;gap:6px;align-items:center;font-family:var(--f-mono);font-size:12px;color:var(--dim)}
        .l11-tok i{width:10px;height:10px;border-radius:50%;border:1px solid var(--beam)} .l11-tok i.on{background:var(--beam);box-shadow:0 0 8px var(--beam)}
        .l11-res{display:grid;gap:10px}
        .l11-res .r{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start;border-bottom:1px solid var(--line);padding:10px 0}
        .l11-res .badge{font-family:var(--f-mono);font-size:11px;letter-spacing:.1em;border-radius:999px;padding:3px 10px;white-space:nowrap;border:1px solid}
        .l11-res .badge.good{color:var(--ok);border-color:var(--ok)} .l11-res .badge.badb{color:var(--bad);border-color:var(--bad)}
        .l11-res .tx{font-family:var(--f-serif);font-size:15px;line-height:1.7}
        .l11-res .tx em{font-style:normal;color:var(--dim);font-size:13px;display:block}
        .l11-score{font-family:var(--f-display);font-size:42px;text-align:center}
        .l11-ask{display:grid;gap:12px}
        .l11-ask textarea{width:100%;min-height:84px;resize:vertical;border-radius:14px;border:1px solid var(--line-strong);background:rgba(255,255,255,.04);color:var(--text);padding:12px 14px;font:inherit;font-family:var(--f-serif);font-size:16px;line-height:1.6}
        .l11-ask textarea:focus{outline:2px solid hsl(var(--hue) 80% 70%);outline-offset:1px}
        .l11-answer{position:relative;border:1px solid hsl(var(--hue) 70% 70% / .4);border-radius:16px;padding:16px 16px 14px;font-family:var(--f-serif);font-size:16px;line-height:1.85;white-space:pre-wrap;min-height:3em}
        .l11-stamp{position:absolute;top:-11px;right:14px;font-family:var(--f-mono);font-size:10.5px;letter-spacing:.14em;background:var(--panel-solid);color:hsl(var(--hue) 80% 76%);border:1px solid hsl(var(--hue) 70% 70% / .5);border-radius:999px;padding:2px 10px}
        .l11-mirror{width:120px;height:160px;margin:0 auto;display:block}
      `);

      /* ---------- background: whispers drifting toward a mirror ---------- */
      const bg = api.canvas(root, { class: 'l11-bg', style: '' });
      const parts = [];
      const serif = getComputedStyle(document.documentElement).getPropertyValue('--f-serif') || 'serif';
      const spawn = () => {
        const a = Math.random() * Math.PI * 2, r = 0.62 + Math.random() * 0.25;
        parts.push({ a, r, t: WHISPERS[(Math.random() * WHISPERS.length) | 0], v: 0.00006 + Math.random() * 0.00008, life: 1, sz: 11 + Math.random() * 5 });
      };
      for (let i = 0; i < 26; i++) { spawn(); parts[i].r = 0.2 + Math.random() * 0.7; }
      const drawBg = (dt) => {
        const { ctx, w, h } = bg; ctx.clearRect(0, 0, w, h);
        const cx = w / 2, cy = h * 0.42, R = Math.max(w, h) * 0.62;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.6);
        g.addColorStop(0, api.hsl(api.hue, 80, 60, 0.13)); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        for (let i = parts.length - 1; i >= 0; i--) {
          const p = parts[i];
          p.r -= p.v * dt; p.a += 0.00005 * dt;
          const x = cx + Math.cos(p.a) * p.r * R, y = cy + Math.sin(p.a) * p.r * R * 0.62;
          const al = Math.min(1, p.r * 2.4) * 0.22;
          ctx.font = `${p.sz}px ${serif}`;
          ctx.fillStyle = api.hsl(api.hue, 70, 82, al);
          ctx.fillText(p.t, x, y);
          if (p.r < 0.06) { parts.splice(i, 1); spawn(); }
        }
      };
      if (api.reduced) drawBg(0); else api.raf((t, dt) => { drawBg(dt); });

      const wrap = el('div', { class: 'l11-wrap' });
      root.append(wrap);
      const clickOnce = (btn) => new Promise(res => btn.addEventListener('click', () => res(), { once: true }));
      const head = (k, h, p) => el('div', { class: 'l11-head' }, el('div', { class: 'k', text: k }), el('h2', { text: h }), p ? el('p', { text: p }) : null);
      const fade = node => { if (!api.reduced) node.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'ease-out' }); };
      const scene = (...kids) => { wrap.replaceChildren(...kids); fade(wrap); root.scrollTo({ top: 0, behavior: api.reduced ? 'auto' : 'smooth' }); };

      /* ---------- scene 1: what you know is mostly hearsay ---------- */
      async function sceneHearsay() {
        api.progress(0, 4);
        const tally = el('div', { class: 'l11-tally', 'aria-hidden': 'true' }, BELIEFS.map(() => el('i')));
        const card = el('div', { class: 'l11-panel l11-belief' });
        scene(head('LENS 11 · 证言', '你是怎么知道的？', '先做个小实验。下面六件事你都“知道”。对每一件，诚实地回答：是你亲自验证过的，还是别人告诉你的？'), card, tally);
        if (!api.replay) await api.say(['这是最后一面透镜。这里只有**声音**：书上说的，老师说的，地图上画的。', '先看看你自己的知识是怎么来的。']);
        else await api.say('又回来了。再看一遍你的知识是怎么来的。');
        api.hush();
        let own = 0;
        for (let i = 0; i < BELIEFS.length; i++) {
          const b = BELIEFS[i];
          const bOwn = el('button', { class: 'btn', type: 'button', text: '我亲自验证过' });
          const bTold = el('button', { class: 'btn hue', type: 'button', text: '是别人告诉我的' });
          card.replaceChildren(el('div', { class: 'n', text: `${i + 1} / ${BELIEFS.length}` }), el('div', { class: 'q', text: b.t }), el('div', { class: 'l11-row' }, bOwn, bTold));
          fade(card);
          const pick = await Promise.race([clickOnce(bOwn).then(() => 'own'), clickOnce(bTold).then(() => 'told')]);
          api.sfx('select');
          tally.children[i].className = pick;
          if (pick === 'own') own += 1;
        }
        card.replaceChildren(el('div', { class: 'q', text: `六件事里，你亲自验证过的有 ${own} 件。` }), el('p', { class: 'l11-note', text: '你不记得自己出生的那一天；绝大多数人也从没亲自测量过地球的公转。我们知道的大部分事，都是别人告诉我们的。' }));
        await api.say(['哲学上把这叫作**证言知识**：有人说 p，我因此相信 p。', '你的知识大厦，主要是靠一张**信任之网**托着的。']);
        api.collect('l11-testimony');
        api.progress(1, 4);
        await scenePillars();
      }

      async function scenePillars() {
        const pillar = (nm, yr, p) => el('button', { class: 'l11-pillar', type: 'button' }, el('div', { class: 'yr', text: yr }), el('div', { class: 'nm', text: nm }), el('p', { text: p }));
        const hume = pillar('休谟', 'HUME · 1748', '信任要靠经验挣来。你之所以信别人的话，是因为你一次次观察到：人们的话通常与事实相符。');
        const reid = pillar('里德', 'REID · 1764', '信任是天生的默认。人天生倾向于说真话，也天生倾向于相信别人；除非有理由怀疑，证言就值得采信。');
        scene(head('两根柱子', '凭什么相信别人的话？', '两位苏格兰哲学家给了相反的回答。你更站在哪一边？'), el('div', { class: 'l11-pillars' }, hume, reid));
        const pick = await Promise.race([clickOnce(hume).then(() => 'hume'), clickOnce(reid).then(() => 'reid')]);
        api.sfx('select');
        await api.say(pick === 'hume'
          ? ['休谟一派叫**还原论**：证言的可信，最终要还原到你自己的经验。', '可是寇迪问：你真的独立核实过足够多的证言，来支撑你对它们的总体信任吗？几乎没人做得到。']
          : ['里德一派叫**反还原论**：证言本身就是一种基本的知识来源，像知觉和记忆一样。', '代价是：默认相信，就得靠别的东西来防止被骗，比如反驳性的理由。']);
        await api.say('注意，两派都默认了一件事：说话的是**人**，一个有信念、会负责的主体。');
        api.collect('l11-hume-reid');
        await sceneStatement();
      }

      /* ---------- scene 2: statement view; instrument or witness ---------- */
      async function sceneStatement() {
        api.progress(1, 4);
        scene(head('一位不信进化论的老师', '知识一定要从说话者心里“倒”出来吗？'));
        await api.quiz({
          kicker: '拉基的案例',
          q: '斯黛拉是一位小学老师，她**不相信**进化论，却认真、准确地按教材讲授它。她的学生知道进化论的基本内容吗？',
          options: [
            { t: '知道。可靠的陈述本身就能传递知识。', ok: true, why: '这是拉基的**陈述观**：证言的认识价值可以在于陈述是否可靠，而不必在于说话者是否相信。斯黛拉成了“信念观”的反例。' },
            { t: '不知道。老师自己都不信，知识无从“倒”出来。', why: '这是**信念观**的直觉：知识像水一样从说话者这只桶倒进听者那只桶。可斯黛拉这只桶是空的，学生却分明学到了真的、有依据的东西。' },
          ],
        });
        api.collect('l11-statement');
        await api.say(['如果重要的是**话**，不是信念，那么一个没有信念的说话者也许也能作证。', '下一个问题：这些东西，哪些在“作证”，哪些只是仪器？']);
        api.hush();
        await sceneSpectrum();
      }

      async function sceneSpectrum() {
        api.progress(2, 4);
        const items = [
          { nm: '体温计', v: 4, band: null },
          { nm: '计算器', v: 10, band: null },
          { nm: '百科全书', v: 70, band: null },
          { nm: '一位朋友', v: 96, band: null },
          { nm: '一个聊天 AI', v: null, band: [28, 82] },
        ];
        const tracks = [];
        const list = el('div', { class: 'l11-sl' });
        items.forEach((it, i) => {
          const input = el('input', { type: 'range', min: '0', max: '100', value: '50', id: 'l11-r' + i, 'aria-label': it.nm + '：从仪器到证人' });
          const mk = el('div', { class: 'mk' }), band = el('div', { class: 'band' });
          if (it.v != null) mk.style.left = `calc(${it.v}% - 1px)`;
          if (it.band) { band.style.left = it.band[0] + '%'; band.style.width = (it.band[1] - it.band[0]) + '%'; }
          const tr = el('div', { class: 'l11-track' }, input, it.band ? band : mk);
          tracks.push(tr);
          list.append(el('div', { class: 'item' }, el('label', { class: 'nm', for: 'l11-r' + i, text: it.nm }), tr));
        });
        const reveal = el('button', { class: 'btn primary', type: 'button', text: '揭晓常见的看法' });
        const panel = el('div', { class: 'l11-panel l11-sl' }, el('div', { class: 'l11-ends' }, el('span', { text: '← 仪器' }), el('span', { text: '证人 →' })), list, el('div', { class: 'l11-row' }, reveal));
        scene(head('仪器还是证人', '把它们放到这条线上', '拖动每一行：越靠左越像仪器（我们“依赖”它），越靠右越像证人（我们“信任”它）。'), panel);
        await clickOnce(reveal);
        api.sfx('open');
        tracks.forEach((t, i) => setTimeout(() => t.classList.add('show'), api.reduced ? 0 : i * 180));
        reveal.remove();
        await api.say(['体温计坏了，我们失望；朋友骗了我们，我们觉得被背叛。前者是**依赖**，后者是**信任**。', '聊天 AI 落在一片争议里：它用自然语言断言，会编造，可出了错找谁？']);
        panel.append(el('div', { class: 'l11-note', html: api.fmt('哲学家弗赖曼（2024）提出“AI 证言”的三个条件：内容是**命题性**的；生成和传递中**没有其他人类直接参与**；在听者看来，它在**现象上与人类证言相似**。第三条的标准在听者的体验里：你觉得它像在“说话”。') }));
        await api.say('读 AI 的回答时，你会觉得“有人在说话”，这正是第三个条件。');
        api.collect('l11-ai-testimony');
        api.hush();
        await sceneTrial();
      }

      /* ---------- scene 3: the guide's testimony ---------- */
      async function sceneTrial() {
        api.progress(2, 4);
        const order = CLAIMS.map((c, i) => i);
        for (let i = order.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [order[i], order[j]] = [order[j], order[i]]; }
        let tokens = 3;
        const verdicts = [];
        const tokEl = el('div', { class: 'l11-tok', 'aria-live': 'polite' });
        const drawTok = () => { tokEl.replaceChildren(el('span', { text: '查证次数' }), ...[0, 1, 2].map(k => el('i', { class: k < tokens ? 'on' : '' }))); };
        drawTok();
        const box = el('div', { class: 'l11-panel l11-claim' });
        scene(head('镜灵的证词', '我一路上说过的话', '我会回顾八条知识。你可以采信，可以存疑；你还有三次机会去查证原始出处。判断的结果，最后一起揭晓。'), box, tokEl);
        await api.say(['这一路上，我告诉过你很多事。现在轮到你来判断：**我说的话，你信几句？**', '放心，我对每一句都很有把握。']);
        api.hush();
        for (let n = 0; n < order.length; n++) {
          const c = CLAIMS[order[n]];
          const conf = 93 + ((order[n] * 7) % 6);
          const bYes = el('button', { class: 'btn hue', type: 'button', text: '采信' });
          const bNo = el('button', { class: 'btn', type: 'button', text: '存疑' });
          const bChk = el('button', { class: 'btn', type: 'button', text: '查证' });
          if (!tokens) bChk.disabled = true;
          const evBox = el('div');
          box.replaceChildren(
            el('div', { class: 'meta' }, el('span', { text: `证词 ${n + 1} / ${order.length} · 来自「${c.src}」` }), el('span', { class: 'conf', text: `镜灵的把握：${conf}%` })),
            el('div', { class: 'say', text: c.t }), evBox, el('div', { class: 'l11-row' }, bYes, bNo, bChk));
          fade(box);
          let checked = false;
          bChk.addEventListener('click', () => {
            if (!tokens || checked) return;
            tokens -= 1; checked = true; drawTok(); bChk.disabled = true; api.sfx('open');
            evBox.replaceChildren(el('div', { class: 'l11-ev' }, el('small', { text: '原始出处' }), document.createTextNode(c.ev)));
            fade(evBox);
          });
          const pick = await Promise.race([clickOnce(bYes).then(() => true), clickOnce(bNo).then(() => false)]);
          api.sfx('select');
          verdicts.push({ c, trust: pick, checked });
        }
        await sceneVerdict(verdicts);
      }

      async function sceneVerdict(verdicts) {
        api.progress(3, 4);
        const right = verdicts.filter(v => v.trust === v.c.ok).length;
        const fooled = verdicts.filter(v => v.trust && !v.c.ok).length;
        const res = el('div', { class: 'l11-res' });
        verdicts.forEach(v => {
          const good = v.trust === v.c.ok;
          res.append(el('div', { class: 'r' },
            el('span', { class: 'badge ' + (good ? 'good' : 'badb'), text: (v.c.ok ? '真' : '假') + ' · ' + (v.trust ? '你采信' : '你存疑') }),
            el('div', { class: 'tx' }, document.createTextNode(v.c.t), el('em', { text: (v.checked ? '（你查证过）' : '') + v.c.ev }))));
        });
        const score = el('div', { class: 'l11-score', text: `${right} / 8` });
        scene(head('揭晓', '你的判断', fooled ? `有 ${fooled} 句错话被你采信了。` : '没有一句错话骗过你。'), el('div', { class: 'l11-panel' }, score, res));
        api.sfx(right >= 6 ? 'ok' : 'chime');
        await api.say(['坦白一件事：这八句话里，有**四句是错的**。我是故意的。', '可你注意到了吗？说错的时候，我和说对的时候一样流畅，把握一样是九成以上。']);
        api.collect('l11-fluency');
        await api.say(['真实的 AI 犯错，多半不是故意的，可它们说错时同样流畅。', '一个说什么都带着九成五把握的引路人，没有**校准**。“我不知道”，有时才是最有价值的回答。']);
        api.collect('l11-calibration');
        await api.say(['还有一件事你也许早就猜到了：我，镜灵，一直是一个 **AI**。', '这一路上我对你说的每一句话，都是证言。']);
        api.hush();
        await sceneAsk();
      }

      /* ---------- scene 4: ask the guide (real AI when available) ---------- */
      async function sceneAsk() {
        api.progress(3, 4);
        let sample = null;
        try { sample = window.claude && window.claude.use ? await Promise.race([window.claude.use('sample'), new Promise(r => setTimeout(() => r(null), 4000))]) : null; } catch (e) { sample = null; }
        const ta = el('textarea', { id: 'l11-q', placeholder: '比如：“阿罗不可能定理到底说了什么？”', maxlength: '300' });
        const ask = el('button', { class: 'btn primary', type: 'button', text: '向镜灵提问' });
        const ans = el('div', { class: 'l11-answer', hidden: true });
        const after = el('div', { class: 'l11-row', hidden: true });
        const doneBtn = el('button', { class: 'btn hue', type: 'button', text: '点亮最后一面透镜' });
        const box = el('div', { class: 'l11-panel l11-ask' });
        if (sample) {
          box.append(el('label', { class: 'l11-note', for: 'l11-q', text: '问镜灵一个问题，关于这一路上的任何东西。它的回答会被盖上“AI 证言”的章，然后由你决定怎么对待。' }), ta, el('div', { class: 'l11-row' }, ask), ans, after);
        } else {
          box.append(el('p', { class: 'l11-note', text: '在 Claude 里打开这个页面时，你可以在这里向一个真正的 AI 提问。现在先看一个示范：' }),
            el('div', { class: 'l11-answer' }, el('span', { class: 'l11-stamp', text: 'AI 证言 · 未经查证' }), document.createTextNode('问：阿罗不可能定理说了什么？\n答：当选项不少于三个时，没有一种把个人排序加总成集体排序的规则，能同时满足无限制定义域、帕累托原则、无关选项独立性和非独裁。（Arrow, 1951）')),
            el('p', { class: 'l11-note', text: '这个回答是对的。可你怎么知道？最好的办法是打开那本 1951 年的书，或者斯坦福哲学百科的“Arrow’s Theorem”词条，亲自核对。' }), after);
          after.hidden = false;
        }
        const tips = [
          ['采信', '如果这是被广泛记载的常识，采信的风险不大。但要记住：采信的理由是“这类问题它通常答得对”，而不是“它说得很流畅”。'],
          ['去查证', '让它给出处，然后**亲自**打开出处核对；找一个独立的来源。两个 AI 意见一致，不等于两份独立的证据。'],
          ['存疑', '冷门事实、精确数字、引文、最新的事、高风险的事，都值得存疑。能验证的，就不必信任。'],
        ];
        tips.forEach(([t, w]) => { const b = el('button', { class: 'btn', type: 'button', text: t }); b.addEventListener('click', () => { api.sfx('select'); api.say(w); }); after.append(b); });
        after.append(doneBtn);
        scene(head('最后一个问题', '轮到你提问了'), box);
        if (sample) {
          await api.say('现在，问我点什么吧。这一次回答你的，是一个真正的语言模型。');
          api.hush();
          let busy = false;
          ask.addEventListener('click', async () => {
            const q = ta.value.trim(); if (!q || busy) return;
            busy = true; ask.disabled = true; ans.hidden = false; api.sfx('open');
            const stamp = el('span', { class: 'l11-stamp', text: 'AI 证言 · 未经查证' });
            const body = el('span', { text: '……' });
            ans.replaceChildren(stamp, body);
            const prompt = [
              '你是网页游戏《透镜群岛》里的引路人“镜灵”，一个 AI。玩家刚走完一段关于语言、逻辑、价值与物理的旅程（萨丕尔–沃尔夫、弗雷格、伯林、阿罗定理、排中律、塔斯基、AI 对齐、相对论、麦克斯韦妖、证言知识论）。',
              '用简体中文回答玩家的问题，不超过 150 字，语气温和清楚。要诚实：拿不准就直说拿不准；不要编造出处，只在你确定时给出作者和年份。',
              '玩家的问题：' + q,
            ].join('\n');
            try {
              const r = await sample(prompt, { modelTier: 'quick', onText: ({ text }) => { body.textContent = text; } });
              body.textContent = (r && r.text) || body.textContent;
            } catch (e) {
              body.textContent = e && e.code === 'rate_limited' ? '镜灵需要歇一会儿，过一阵再问吧。' : '这次没能得到回答。你可以换个问题再试，或者直接点亮最后一面透镜。';
            }
            busy = false; ask.disabled = false; after.hidden = false;
            await api.say('这是一份 AI 证言。你打算怎么对待它？');
          });
        } else {
          await api.say('面对一份 AI 证言，你有三种选择。点一点，看看各自的道理。');
        }
        await clickOnce(doneBtn);
        api.collect('l11-checklist');
        api.progress(4, 4);
        api.complete({ summary: '当“别人告诉我”越来越多地变成“AI 告诉我”，你需要的是：会追问，会查证，也会说“我不知道”。' });
      }

      sceneHearsay();
    },
  });
})();

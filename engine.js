/* 透镜群岛 · engine
 * Shell, map, codex, narrator, sound and the level API. Levels register with Lens.registerLevel(def).
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ constants */
  const KEY = 'lens-archipelago-v1';
  const ORDER = ['l01', 'l02', 'l03', 'l04', 'l05', 'l06', 'l07', 'l08', 'l09', 'l10', 'l11'];
  const HUES = { l01: 356, l02: 22, l03: 42, l04: 62, l05: 100, l06: 150, l07: 176, l08: 196, l09: 218, l10: 252, l11: 286 };
  const CONT = {
    lang: { name: '语言与意义', v: 'var(--c-lang)' },
    value: { name: '价值与社会', v: 'var(--c-value)' },
    logic: { name: '逻辑与知识', v: 'var(--c-logic)' },
    phys: { name: '物理与心灵', v: 'var(--c-phys)' },
  };
  const META = {
    l01: { no: 1, name: '巴别', subtitle: '语言首先为沟通服务吗', cont: 'lang' },
    l02: { no: 2, name: '光谱', subtitle: '世界是怎样被切开的', cont: 'lang' },
    l03: { no: 3, name: '函数机', subtitle: '词是函数', cont: 'lang' },
    l04: { no: 4, name: '四扇门', subtitle: '自由的几副面孔', cont: 'value' },
    l05: { no: 5, name: '凳子与选票', subtitle: '平等、公平与不可能定理', cont: 'value' },
    l06: { no: 6, name: '否定之地', subtitle: '否定的力量', cont: 'logic' },
    l07: { no: 7, name: '塔斯基之塔', subtitle: '真、递归与可能世界', cont: 'logic' },
    l08: { no: 8, name: '石碑', subtitle: '当“好”写不成公式', cont: 'value' },
    l09: { no: 9, name: '时空', subtitle: '时间存在吗', cont: 'phys' },
    l10: { no: 10, name: '两个妖', subtitle: '心灵、观察与信息', cont: 'phys' },
    l11: { no: 11, name: '证言', subtitle: '当证言不再来自人', cont: 'logic' },
  };
  const BRIDGES = [
    ['a', 'l01', 'l02', '语言会不会塑造思维？萨丕尔–沃尔夫假说的强版本被否定了，弱版本在颜色、空间等领域得到了实验支持。'],
    ['b', 'l02', 'l03', '一个颜色词的意义，取决于它旁边还有哪些颜色词。俄语的浅蓝之所以是浅蓝，是因为旁边有深蓝。'],
    ['c', 'l03', 'l04', '一个汉语词往往对应好几个英语“函数”：自由（liberty / freedom）、责任（responsibility / liability / duty）、国家（country / state / nation）。'],
    ['d', 'l04', 'l05', '自由与平等之间有张力。伯林把它们看作彼此独立、可能冲突的终极价值；森证明了“最低限度的自由”与帕累托原则无法总是兼得。'],
    ['e', 'l05', 'l08', '阿罗定理说没有完美的偏好加总规则，那么“让 AI 对齐人类价值”时，这个“人类”是谁？'],
    ['f', 'l03', 'l07', '“观其所伴，知其所指”：弗斯的语境语义学、大语言模型，与范畴论里的米田引理说的是同一个想法——对象由它的关系决定。'],
    ['g', 'l02', 'l06', '索绪尔：语言中只有差异，没有正面的项。意义本身就是由“不是什么”构成的。'],
    ['h', 'l06', 'l07', '排中律、四句、多值逻辑：不同的逻辑系统里，“否定”有不同的含义。'],
    ['i', 'l07', 'l08', '勒布定理来自可证性逻辑，它让两个能读取对方源代码的程序在囚徒困境中达成合作。'],
    ['j', 'l07', 'l11', '盖提尔：有辩护的真信念未必是知识。AI 碰巧说对的答案，算你“知道”吗？'],
    ['k', 'l08', 'l11', '“诚实”本身就是一个对齐目标。只有对齐了的 AI，它的证言才值得信任。'],
    ['l', 'l01', 'l11', '最懂一种新数学语言的也许是 AI。获取知识有两条路：信任它的证言，或者用证明助手验证。'],
    ['m', 'l03', 'l11', '中文屋与章鱼测试：只有句法、没有和世界的接触，能不能长出语义？'],
    ['n', 'l09', 'l02', '时间常被说成空间：汉语的“上个月”，澳洲一些语言按东西方向排列时间。'],
    ['o', 'l09', 'l10', '全知者能否选择？拉普拉斯妖、块宇宙与自由意志。'],
    ['p', 'l10', 'l06', '兰道尔：擦除信息有热力学代价。“丢弃不重要的东西”，在物理上真的要付费。'],
    ['q', 'l10', 'l11', '谁有资格“说话”？意识、主体性与证言。'],
    ['r', 'l02', 'l10', '博尔赫斯两次登场：《特隆》里由语言构造的唯心世界，《阿莱夫》里能看见一切的点。'],
  ];
  // Map layouts: [x, y] per island, plus continent label anchors.
  const LAYOUT_WIDE = {
    vb: [1000, 600],
    pos: { l01: [110, 400], l02: [205, 235], l03: [320, 385], l04: [440, 170], l05: [560, 290], l06: [455, 470], l07: [600, 505],
      l08: [690, 160], l09: [790, 320], l10: [895, 185], l11: [875, 470] },
    cont: { lang: [30, 140, 'start'], value: [470, 70, 'start'], logic: [520, 590, 'start'], phys: [800, 80, 'start'] },
  };
  const LAYOUT_TALL = {
    vb: [400, 1000],
    pos: { l01: [92, 90], l02: [280, 160], l03: [110, 255], l04: [292, 340], l05: [140, 430], l06: [300, 515], l07: [108, 600],
      l08: [290, 685], l09: [118, 770], l10: [296, 850], l11: [158, 935] },
    cont: { lang: [16, 30, 'start'], value: [384, 300, 'end'], logic: [16, 560, 'start'], phys: [384, 740, 'end'] },
  };

  /* ------------------------------------------------------------------ state */
  const levels = new Map();
  const VOL = { music: 0.8, sfx: 0.8 };   // default sound-panel levels
  // build stamps written by tools/stamp.py (absent from unstamped builds, which then skip versioning)
  const pageMeta = n => { const m = document.querySelector(`meta[name="${n}"]`); return m ? m.content : ''; };
  const BUILD = pageMeta('lens-build'), AUDIO_V = pageMeta('lens-audio');
  const audioUrl = f => 'audio/' + f + (AUDIO_V ? '?v=' + AUDIO_V : '');
  let state = load();
  const reduced = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  let current = null; // {id, root, scope, cleanup}
  let mapSel = null;

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && s.v === 1) return Object.assign({ done: {}, cards: {}, sound: true, intro: false }, s, { vol: Object.assign({}, VOL, s.vol) });
    } catch (e) { /* storage unavailable */ }
    return { v: 1, done: {}, cards: {}, sound: true, intro: false, vol: Object.assign({}, VOL) };
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }

  /* ------------------------------------------------------------------ helpers */
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(n.style, v);
      else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else if (k === 'html') n.innerHTML = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat()) if (c != null && c !== false) n.append(c.nodeType ? c : document.createTextNode(String(c)));
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function fmt(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>'); }
  function plain(s) { return String(s).replace(/\*\*(.+?)\*\*/g, '$1'); }
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const hsl = (h, s = 85, l = 62, a = 1) => `hsl(${h} ${s}% ${l}% / ${a})`;
  function metaOf(id) { const d = levels.get(id); const m = META[id] || {}; return { no: (d && d.no) || m.no, name: (d && d.name) || m.name, subtitle: (d && d.subtitle) || m.subtitle, cont: (d && d.continent) || m.cont }; }
  function allCards() { const out = []; for (const id of ORDER) { const d = levels.get(id); if (d && d.cards) for (const c of d.cards) out.push(Object.assign({ level: id }, c)); } return out; }
  function cardById(id) { return allCards().find(c => c.id === id); }
  function doneCount() { return ORDER.filter(id => state.done[id]).length; }
  function lensPath(a, b) { const r = (a * a + b * b) / (2 * b); return `M${-a},0 A${r},${r} 0 0 1 ${a},0 A${r},${r} 0 0 1 ${-a},0Z`; }
  const PRISM_SVG = '<svg viewBox="0 0 40 40" class="glyph" aria-hidden="true"><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#ff6b6b"/><stop offset=".3" stop-color="#ffd166"/><stop offset=".55" stop-color="#7ae582"/><stop offset=".78" stop-color="#4cc9f0"/><stop offset="1" stop-color="#b388ff"/></linearGradient></defs>' +
    '<path d="M20 5 L35 32 L5 32 Z" fill="rgba(255,255,255,.06)" stroke="url(#pg)" stroke-width="1.6" stroke-linejoin="round"/><path d="M2 21 L14 21" stroke="#fff6e4" stroke-width="1.6" stroke-linecap="round"/></svg>';

  /* ------------------------------------------------------------------ sound */
  const Sound = {
    ctx: null, master: null, musicBus: null, sfxBus: null, ducked: false,
    init() {
      if (this.ctx) return;
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      try { this.ctx = new AC(); } catch (e) { return; }
      const c = this.ctx;
      this.master = c.createGain(); this.master.gain.value = 0; this.master.connect(c.destination);
      this.musicBus = c.createGain(); this.sfxBus = c.createGain(); this.musicBus.connect(this.master); this.sfxBus.connect(this.master);
      this.mix(0.01);
    },
    // slider position -> gain on a squared (roughly perceptual) curve; the default 80% reproduces the original mix
    mix(tc) {
      if (!this.ctx) return;
      const t = this.ctx.currentTime, v = state.vol;
      const to = (p, x) => { p.cancelScheduledValues(t); p.setTargetAtTime(x, t, tc); };
      to(this.musicBus.gain, 1.2 * v.music * v.music * (this.ducked ? 0.6 : 1));
      to(this.sfxBus.gain, 1.4 * v.sfx * v.sfx);
    },
    set(on) { state.sound = on; save(); this.apply(); renderHud(); syncVol(); },
    apply() {
      if (state.sound) { this.init(); if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); this.ramp(1); Music.kick(); }
      else { this.ramp(0); setTimeout(() => { if (!state.sound && this.ctx) this.ctx.suspend(); }, 1600); }
    },
    ramp(v) { if (!this.ctx) return; const t = this.ctx.currentTime; this.master.gain.cancelScheduledValues(t); this.master.gain.setTargetAtTime(v, t, 0.4); },
    blip(freq, dur = 0.12, type = 'sine', vol = 0.1, when = 0) {
      if (!this.ctx || !state.sound || !state.vol.sfx) return;
      const c = this.ctx, t = c.currentTime + when, o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(this.sfxBus); o.start(t); o.stop(t + dur + 0.05);
    },
    noise(dur = 0.5, from = 400, to = 3000, vol = 0.06) {
      if (!this.ctx || !state.sound || !state.vol.sfx) return;
      const c = this.ctx, n = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const s = c.createBufferSource(); s.buffer = buf; const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2;
      const t = c.currentTime; f.frequency.setValueAtTime(from, t); f.frequency.exponentialRampToValueAtTime(to, t + dur);
      const g = c.createGain(); g.gain.value = vol; s.connect(f); f.connect(g); g.connect(this.sfxBus); s.start(t);
    },
    sfx(name) {
      switch (name) {
        case 'tick': this.blip(880, 0.04, 'sine', 0.035); break;
        case 'type': this.blip(392, 0.035, 'sine', 0.018); break;
        case 'select': this.blip(659.25, 0.09, 'triangle', 0.07); break;
        case 'ok': case 'success': [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.blip(f, 0.4, 'triangle', 0.08, i * 0.07)); break;
        case 'bad': case 'fail': this.blip(155.56, 0.28, 'sawtooth', 0.045); this.blip(146.83, 0.32, 'sawtooth', 0.035, 0.06); break;
        case 'chime': case 'card': [1318.5, 1975.5, 2637].forEach((f, i) => this.blip(f, 1.0, 'sine', 0.05, i * 0.05)); break;
        case 'whoosh': this.noise(0.6); break;
        case 'open': this.blip(392, 0.22, 'triangle', 0.07); this.blip(587.33, 0.32, 'triangle', 0.06, 0.08); break;
        case 'refract': [261.63, 329.63, 392, 493.88, 587.33, 698.46, 880].forEach((f, i) => this.blip(f, 1.2, 'sine', 0.05, i * 0.09)); this.noise(1.2, 300, 5000, 0.03); break;
        default: this.blip(660, 0.08, 'sine', 0.06);
      }
    },
  };

  /* ------------------------------------------------------------------ soundtrack: one ElevenLabs loop per place, loaded on demand */
  const Music = {
    want: null, cur: null, cache: {}, manifest: null,
    tracks() {
      if (!this.manifest) this.manifest = fetch(audioUrl('tracks.json')).then(r => (r.ok ? r.json() : {})).catch(() => ({}));
      return this.manifest;
    },
    load(id) {
      if (this.cache[id]) return this.cache[id];
      const p = (async () => {
        const t = (await this.tracks())[id];
        if (!t || !Sound.ctx) return null;
        const res = await fetch(audioUrl(t.file));
        if (!res.ok) return null;
        const ab = await res.arrayBuffer();
        const buf = await new Promise((ok, bad) => { const r = Sound.ctx.decodeAudioData(ab, ok, bad); if (r && r.then) r.then(ok, bad); });
        // the file wraps `pad` seconds of the loop around each end, so the loop points sit inside continuous audio;
        // if a browser leaves the MP3 decoder delay in, shift by it (the padding absorbs any small error)
        const pad = t.pad || 0, lead = buf.duration - (t.loop + 2 * pad) > 0.02 ? 1105 / 44100 : 0;
        const start = pad + lead;
        return { buf, start, end: start + t.loop };
      })().catch(() => null);
      this.cache[id] = p;
      return p;
    },
    play(id) { this.want = id; this.kick(); },
    async kick() {
      const id = this.want, c = Sound.ctx;
      if (!id || !c || !state.vol.music || (this.cur && this.cur.id === id)) return;
      const tr = await this.load(id);
      if (!tr || this.want !== id || (this.cur && this.cur.id === id)) return;
      const now = c.currentTime;
      const src = c.createBufferSource(); src.buffer = tr.buf; src.loop = true; src.loopStart = tr.start; src.loopEnd = tr.end;
      const g = c.createGain(); g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(1, now + 1.6);
      src.connect(g); g.connect(Sound.musicBus); src.start(now, tr.start);
      const old = this.cur; this.cur = { id, src, g };
      if (old) {
        old.g.gain.cancelScheduledValues(now); old.g.gain.setValueAtTime(old.g.gain.value, now); old.g.gain.linearRampToValueAtTime(0, now + 1.5);
        setTimeout(() => { try { old.src.stop(); old.src.disconnect(); } catch (e) { /* already stopped */ } }, 1800);
      }
      // keep at most the map theme and the current island decoded
      for (const k of Object.keys(this.cache)) if (k !== id && k !== 'map') delete this.cache[k];
    },
    duck(on) { Sound.ducked = on; Sound.mix(0.35); },
  };

  /* ------------------------------------------------------------------ sky */
  const Sky = {
    c: null, ctx: null, w: 0, h: 0, dpr: 1, parts: [], tint: 42, raf: 0,
    init() {
      this.c = document.getElementById('sky'); this.ctx = this.c.getContext('2d');
      const resize = () => { this.dpr = Math.min(2, window.devicePixelRatio || 1); this.w = innerWidth; this.h = innerHeight; this.c.width = this.w * this.dpr; this.c.height = this.h * this.dpr; this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); this.draw(0); };
      addEventListener('resize', resize); resize();
      const N = Math.round(Math.min(160, (innerWidth * innerHeight) / 9000));
      for (let i = 0; i < N; i++) this.parts.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + 0.2, s: Math.random() * 0.00006 + 0.00001, p: Math.random() * 6.28 });
      if (!reduced) { const loop = t => { this.draw(t); this.raf = requestAnimationFrame(loop); }; this.raf = requestAnimationFrame(loop); }
      document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(this.raf); else if (!reduced) { const loop = t => { this.draw(t); this.raf = requestAnimationFrame(loop); }; this.raf = requestAnimationFrame(loop); } });
    },
    draw(t) {
      const { ctx, w, h } = this; if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(w * 0.5, h * 1.1, 0, w * 0.5, h * 1.1, Math.max(w, h) * 0.9);
      g.addColorStop(0, `hsl(${this.tint} 60% 22% / .35)`); g.addColorStop(0.5, 'rgba(10,16,32,.25)'); g.addColorStop(1, 'rgba(5,8,15,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      for (const p of this.parts) {
        const y = ((p.y - t * p.s) % 1 + 1) % 1; const a = 0.25 + 0.35 * Math.sin(t * 0.0008 + p.p) ** 2;
        ctx.fillStyle = `rgba(230,236,255,${a})`; ctx.beginPath(); ctx.arc(p.x * w, y * h, p.r, 0, 6.283); ctx.fill();
      }
    },
  };

  /* ------------------------------------------------------------------ DOM refs */
  let stage, hud, narrEl, overlay, toasts;

  /* ------------------------------------------------------------------ narrator */
  const Narr = {
    gen: 0, box: null, txt: null, go: null, who: null, resolve: null, typing: null, queue: Promise.resolve(),
    build() {
      narrEl.innerHTML = '';
      this.box = el('div', { class: 'box' });
      const g = el('div', { html: PRISM_SVG });
      const body = el('div');
      this.who = el('div', { class: 'who', text: '镜灵' });
      this.txt = el('div', { class: 'txt' });
      body.append(this.who, this.txt);
      this.go = el('button', { class: 'go', type: 'button', text: '继续 ▸' });
      this.go.addEventListener('click', () => this.advance());
      this.box.append(g, body, this.go);
      narrEl.append(this.box);
      document.addEventListener('keydown', e => {
        if (!narrEl.classList.contains('show') || this.go.hidden) return;
        const tag = (e.target && e.target.tagName) || '';
        if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
        if (e.key === 'Enter' || e.key === ' ') { if (tag === 'BUTTON' && e.target !== this.go) return; e.preventDefault(); this.advance(); }
      });
      new ResizeObserver(() => this.syncH()).observe(narrEl);
    },
    syncH() { const h = narrEl.classList.contains('show') ? narrEl.getBoundingClientRect().height : 0; document.documentElement.style.setProperty('--narr-h', h + 'px'); },
    advance() {
      if (this.typing) { this.typing(); return; }
      const r = this.resolve; this.resolve = null; if (r) r(true);
    },
    say(text, opts) {
      opts = opts || {}; const gen = this.gen;
      const p = this.queue.then(() => gen === this.gen ? this.show(text, opts, gen) : new Promise(() => {}));
      this.queue = p.catch(() => {});
      return p;
    },
    show(text, opts, gen) {
      return new Promise(res => {
        if (gen !== this.gen) return; // cancelled
        narrEl.classList.add('show'); this.syncH(); Music.duck(true);
        this.who.textContent = opts.who || '镜灵';
        const wait = opts.wait !== false;
        this.go.hidden = !wait; this.go.textContent = opts.button || '继续 ▸';
        const full = fmt(text), raw = plain(text);
        const finish = () => { if (this.typing) { clearInterval(iv); this.typing = null; } this.txt.innerHTML = full; this.syncH(); if (!wait) res(true); };
        let iv = 0;
        if (reduced || opts.instant || raw.length < 2) { this.txt.innerHTML = full; this.typing = null; if (!wait) res(true); }
        else {
          let i = 0; this.txt.textContent = '';
          iv = setInterval(() => { if (gen !== this.gen) { clearInterval(iv); this.typing = null; return; } i += 1; this.txt.textContent = raw.slice(0, i); if (i % 4 === 0) Sound.sfx('type'); if (i >= raw.length) finish(); }, 26);
          this.typing = finish;
        }
        if (wait) this.resolve = v => { if (gen === this.gen) res(v); };
      });
    },
    hide() { narrEl.classList.remove('show'); this.syncH(); Music.duck(false); },
    clear() { this.gen += 1; this.resolve = null; if (this.typing) { const t = this.typing; this.typing = null; try { t(); } catch (e) { } } this.queue = Promise.resolve(); this.hide(); },
  };

  /* ------------------------------------------------------------------ toast + overlay */
  function toast(kicker, title, hue) {
    const t = el('div', { class: 'toast', style: `--h:${hue}` }, el('div', { class: 'card-ico' }), el('div', null, el('div', { class: 't1', text: kicker }), el('div', { class: 't2', text: title })));
    toasts.append(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 450); }, 2600);
  }
  let overlayResolve = null;
  function openOverlay(node, opts) {
    opts = opts || {};
    overlay.innerHTML = ''; overlay.append(node); overlay.hidden = false;
    overlay.onclick = e => { if (e.target === overlay && opts.dismiss) closeOverlay(); };
    const f = node.querySelector('button, [tabindex]'); if (f) setTimeout(() => f.focus({ preventScroll: true }), 30);
  }
  function closeOverlay() { overlay.hidden = true; overlay.innerHTML = ''; overlay.onclick = null; if (overlayResolve) { const r = overlayResolve; overlayResolve = null; r(); } }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay && !overlay.hidden && overlay.dataset.dismiss === '1') closeOverlay(); });

  /* ------------------------------------------------------------------ HUD */
  let hudMode = 'map', hudLevel = null, hudSteps = [0, 0];
  const ICON = {
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="3" width="11" height="16" rx="1.5"/><path d="M8 3v16M19 6v15H8"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/></svg>',
    snd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 10h4l5-4v12l-5-4H4z"/><path d="M16 9a4 4 0 010 6M18.5 7a7 7 0 010 10"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 10h4l5-4v12l-5-4H4z"/><path d="M17 10l4 4M21 10l-4 4"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 5l-7 7 7 7"/></svg>',
  };
  function renderHud() {
    if (!hud) return;
    hud.innerHTML = '';
    hud.hidden = hudMode === 'title';
    const left = el('div', { class: 'hud-left' }), mid = el('div', { class: 'hud-mid' }), right = el('div', { class: 'hud-right' });
    if (hudMode === 'level' && hudLevel) {
      const m = metaOf(hudLevel);
      left.append(el('button', { class: 'hbtn', type: 'button', 'aria-label': '回到群岛', html: ICON.back + '<span class="lbl">群岛</span>', onclick: () => go('map') }),
        el('div', { class: 'hud-title', html: `<small>LENS ${String(m.no).padStart(2, '0')}</small>${esc(m.name)}` }));
      const dots = el('div', { class: 'dots', 'aria-label': `进度 ${hudSteps[0]}/${hudSteps[1]}` });
      for (let i = 0; i < hudSteps[1]; i++) dots.append(el('i', { class: i < hudSteps[0] ? 'on' : '' }));
      mid.append(dots);
    } else {
      left.append(el('button', { class: 'brand', type: 'button', text: '透镜群岛', onclick: () => go('map') }));
      const meter = el('div', { class: 'meter', 'aria-label': `已点亮 ${doneCount()} / 11` });
      for (const id of ORDER) meter.append(el('i', { class: state.done[id] ? 'on' : '', style: `--h:${HUES[id]}`, title: metaOf(id).name }));
      mid.append(meter);
    }
    const nCards = Object.keys(state.cards).length, total = allCards().length;
    if (hudMode !== 'codex') right.append(el('button', { class: 'hbtn', type: 'button', html: `${ICON.book}<span class="lbl">图鉴</span><span class="n">${nCards}/${total}</span>`, onclick: () => go('codex') }));
    else right.append(el('button', { class: 'hbtn', type: 'button', html: `${ICON.map}<span class="lbl">群岛</span>`, onclick: () => go('map') }));
    const audible = state.sound && (state.vol.music > 0 || state.vol.sfx > 0);
    right.append(el('button', { class: 'hbtn snd', type: 'button', 'aria-label': '声音设置', 'aria-haspopup': 'dialog', 'aria-expanded': String(!!volEl), html: audible ? ICON.snd : ICON.mute, onclick: e => toggleVol(e) }));
    hud.append(left, mid, right);
  }

  /* ------------------------------------------------------------------ sound panel: master switch, music and effects levels */
  let volEl = null;
  function toggleVol(e) {
    if (volEl) { closeVol(); return; }
    const pct = v => Math.round(v * 100) + '%';
    const sw = el('button', { class: 'sw', type: 'button', role: 'switch', 'aria-label': '声音', onclick: () => Sound.set(!state.sound) });
    const slider = (key, label) => {
      const out = el('output', { text: pct(state.vol[key]) });
      const r = el('input', { type: 'range', min: '0', max: '100', step: '1', value: String(Math.round(state.vol[key] * 100)), 'aria-label': label });
      const paint = () => r.style.setProperty('--p', r.value + '%');
      r.addEventListener('input', () => {
        state.vol[key] = r.value / 100; out.textContent = pct(state.vol[key]); paint();
        if (!state.sound && state.vol[key] > 0) Sound.set(true);   // raising a level means "let me hear it"
        else renderHud();
        Sound.mix(0.04); if (key === 'music') Music.kick();
      });
      r.addEventListener('change', () => { save(); if (key === 'sfx') Sound.sfx('select'); });
      paint();
      return el('label', { class: 'row' }, el('span', { text: label }), r, out);
    };
    volEl = el('div', { class: 'vol', role: 'dialog', 'aria-label': '声音设置' },
      el('div', { class: 'head' }, el('span', { text: 'SOUND · 声音' }), sw),
      slider('music', '音乐'), slider('sfx', '音效'));
    document.body.append(volEl);
    syncVol(); renderHud();
    if (e && e.detail === 0) volEl.querySelector('input').focus();   // opened from the keyboard
  }
  function syncVol() {
    if (!volEl) return;
    volEl.classList.toggle('off', !state.sound);
    volEl.querySelector('.sw').setAttribute('aria-checked', String(!!state.sound));
  }
  function closeVol(refocus) {
    if (!volEl) return;
    volEl.remove(); volEl = null; save(); renderHud();
    if (refocus) { const b = hud && hud.querySelector('.hbtn.snd'); if (b) b.focus(); }
  }
  document.addEventListener('pointerdown', e => { if (volEl && !volEl.contains(e.target) && !e.target.closest('.hbtn.snd')) closeVol(); }, true);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && volEl) closeVol(true); });

  /* ------------------------------------------------------------------ updates: move to a newer build when one is online */
  let checkedAt = 0, offered = false, interacted = false;
  async function checkUpdate() {
    if (!BUILD || offered || Date.now() - checkedAt < 5 * 60e3) return;
    checkedAt = Date.now();
    let next = null;
    try {
      const html = await (await fetch(location.pathname + '?check=' + Date.now(), { cache: 'no-store' })).text();
      const m = html.match(/<meta name="lens-build" content="([0-9a-f]+)">/); next = m && m[1];
    } catch (e) { return; }   // offline: ask again later
    if (!next || next === BUILD) return;
    // a fresh query string is a URL no cache has seen; progress lives in localStorage and carries over
    const url = location.pathname + '?v=' + next + location.hash;
    if (new URLSearchParams(location.search).get('v') === next) return;   // already asked for it; the server is still catching up
    if (!interacted) { location.replace(url); return; }                    // nothing under way yet, so just move
    offered = true;
    const t = el('div', { class: 'toast update', style: '--h:42', role: 'status' },
      el('div', null, el('div', { class: 't1', text: 'NEW VERSION' }), el('div', { class: 't2', text: '透镜群岛更新了' })),
      el('button', { class: 'go', type: 'button', text: '刷新', onclick: () => location.replace(url) }),
      el('button', { class: 'later', type: 'button', 'aria-label': '稍后', html: '&times;', onclick: () => t.remove() }));
    toasts.append(t);
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkUpdate(); });

  /* ------------------------------------------------------------------ navigation */
  function setHash(h) { try { history.replaceState(null, '', '#' + h); } catch (e) { /* ignore */ } }
  function teardown() {
    if (current) {
      try { current.cleanup && current.cleanup(); } catch (e) { console.error(e); }
      current.scope.dispose();
      current = null;
    }
    Narr.clear(); closeOverlay(); overlay.dataset.dismiss = '';
    stage.replaceChildren();
    document.documentElement.style.setProperty('--hue', 42); Sky.tint = 42;
  }
  function go(where) {
    if (where === 'map') showMap();
    else if (where === 'codex') showCodex();
    else if (where === 'title') showTitle();
    else if (levels.has(where)) enterLevel(where);
    else showMap();
  }

  /* ------------------------------------------------------------------ scope (auto-cleanup) */
  function makeScope() {
    const s = { alive: true, fns: [] };
    s.add = fn => { s.fns.push(fn); };
    s.dispose = () => { s.alive = false; for (const f of s.fns.splice(0)) { try { f(); } catch (e) { } } };
    return s;
  }

  /* ------------------------------------------------------------------ level API */
  function makeApi(def, root, scope) {
    const id = def.id, hue = HUES[id] != null ? HUES[id] : 42;
    const never = () => new Promise(() => {});
    const api = {
      id, hue, reduced,
      color: hsl(hue, 85, 62), colorSoft: hsl(hue, 85, 62, 0.16), colorDim: hsl(hue, 60, 40),
      hsl, clamp, lerp, el, fmt,
      get alive() { return scope.alive; },
      get replay() { return !!state.done[id]; },
      root,
      say(text, opts) {
        if (!scope.alive) return never();
        if (Array.isArray(text)) { return text.reduce((p, t) => p.then(() => api.say(t, opts)), Promise.resolve(true)); }
        return Narr.say(text, opts);
      },
      hint(text) { if (!scope.alive) return; Narr.say(text, { wait: false }); },
      hush() { if (scope.alive) Narr.clear(); },
      wait(ms) { return scope.alive ? new Promise(r => { const t = setTimeout(r, ms); scope.add(() => clearTimeout(t)); }) : never(); },
      timeout(fn, ms) { const t = setTimeout(() => scope.alive && fn(), ms); scope.add(() => clearTimeout(t)); return t; },
      interval(fn, ms) { const t = setInterval(() => scope.alive && fn(), ms); scope.add(() => clearInterval(t)); return t; },
      raf(fn) { // fn(t, dt) every frame until it returns false or level exits
        let last = performance.now(), h = 0, stop = false;
        const loop = t => { if (stop || !scope.alive) return; const dt = Math.min(64, t - last); last = t; if (fn(t, dt) === false) return; h = requestAnimationFrame(loop); };
        h = requestAnimationFrame(loop); const cancel = () => { stop = true; cancelAnimationFrame(h); }; scope.add(cancel); return cancel;
      },
      listen(target, ev, fn, opt) { target.addEventListener(ev, fn, opt); scope.add(() => target.removeEventListener(ev, fn, opt)); },
      onResize(fn) { const ro = new ResizeObserver(() => scope.alive && fn(root.clientWidth, root.clientHeight)); ro.observe(root); scope.add(() => ro.disconnect()); },
      canvas(parent, opts) { // hi-dpi canvas that tracks its CSS size; returns {canvas, ctx, w, h}
        opts = opts || {};
        const c = el('canvas', { class: opts.class || '', style: opts.style || 'display:block;width:100%;height:100%' });
        (parent || root).append(c);
        const o = { canvas: c, ctx: c.getContext('2d'), w: 0, h: 0, dpr: 1 };
        const fit = () => { const r = c.getBoundingClientRect(); o.dpr = Math.min(2, window.devicePixelRatio || 1); o.w = Math.max(1, r.width); o.h = Math.max(1, r.height); c.width = Math.round(o.w * o.dpr); c.height = Math.round(o.h * o.dpr); o.ctx.setTransform(o.dpr, 0, 0, o.dpr, 0, 0); opts.onResize && opts.onResize(o.w, o.h); };
        const ro = new ResizeObserver(() => scope.alive && fit()); ro.observe(c); scope.add(() => ro.disconnect()); fit();
        return o;
      },
      css(text) { const tag = 'lvcss-' + id; if (document.getElementById(tag)) return; document.head.append(el('style', { id: tag, text })); },
      sfx(name) { Sound.sfx(name); },
      progress(i, n) { if (!scope.alive) return; hudSteps = [i, n != null ? n : hudSteps[1]]; renderHud(); },
      card(cid) { return (def.cards || []).find(c => c.id === cid) || cardById(cid); },
      has(cid) { return !!state.cards[cid]; },
      collect(cid) {
        if (!scope.alive) return;
        const c = api.card(cid); if (!c) { console.warn('unknown card', cid); return; }
        const fresh = !state.cards[cid]; state.cards[cid] = 1; save(); renderHud();
        Sound.sfx('card'); toast(fresh ? '收入图鉴' : '再次照见', c.title, hue);
      },
      quiz(q) { return scope.alive ? quiz(q, hue) : never(); },
      show(node, opts) { return scope.alive ? showModal(node, hue, opts) : never(); },
      complete(opts) { if (!scope.alive) return; completeLevel(def, opts || {}); },
      exit() { go('map'); },
    };
    return api;
  }

  function quiz(q, hue) {
    return new Promise(res => {
      const box = el('div', { class: 'modal', style: `--hue:${hue}`, role: 'dialog', 'aria-modal': 'true' });
      if (q.kicker !== false) box.append(el('div', { class: 'kick', text: q.kicker || '镜面问答' }));
      box.append(el('h2', { html: fmt(q.q) }));
      if (q.sub) box.append(el('p', { html: fmt(q.sub) }));
      const opts = el('div', { class: 'opts' });
      let first = null;
      (q.options || []).forEach((o, i) => {
        const b = el('button', { class: 'opt', type: 'button', html: fmt(o.t) });
        b.addEventListener('click', () => {
          const right = !!o.ok; if (first === null) first = right;
          Sound.sfx(right ? 'ok' : 'bad');
          b.classList.add(right ? 'right' : 'wrong');
          const why = box.querySelector('.why'); if (why) why.remove();
          const exp = o.why || q.explain;
          if (exp) box.insertBefore(el('div', { class: 'why', html: fmt(exp) }), actions);
          if (right || q.once) {
            [...opts.children].forEach((x, j) => { x.disabled = true; if (q.options[j].ok) x.classList.add('right'); });
            actions.innerHTML = ''; const nb = el('button', { class: 'btn hue', type: 'button', text: q.next || '继续' });
            nb.addEventListener('click', () => { closeOverlay(); res(first); }); actions.append(nb); nb.focus({ preventScroll: true });
          }
        });
        opts.append(b);
      });
      const actions = el('div', { class: 'actions' });
      box.append(opts, actions);
      overlay.dataset.dismiss = '';
      openOverlay(box);
    });
  }
  function showModal(node, hue, opts) {
    opts = opts || {};
    return new Promise(res => {
      const box = el('div', { class: 'modal' + (opts.center ? ' center' : ''), style: `--hue:${hue}`, role: 'dialog', 'aria-modal': 'true' });
      if (opts.kicker) box.append(el('div', { class: 'kick', text: opts.kicker }));
      if (opts.title) box.append(el('h2', { html: fmt(opts.title) }));
      if (typeof node === 'string') box.append(el('p', { html: fmt(node) })); else if (node) box.append(node);
      const actions = el('div', { class: 'actions' });
      const b = el('button', { class: 'btn hue', type: 'button', text: opts.button || '好' });
      b.addEventListener('click', () => { closeOverlay(); });
      actions.append(b); box.append(actions);
      overlayResolve = res; overlay.dataset.dismiss = '1';
      openOverlay(box, { dismiss: true });
    });
  }

  function completeLevel(def, opts) {
    const id = def.id, hue = HUES[id], m = metaOf(id);
    const first = !state.done[id];
    state.done[id] = Date.now(); save(); renderHud();
    Sound.sfx('refract'); Narr.clear();
    const got = (def.cards || []).filter(c => state.cards[c.id]);
    const box = el('div', { class: 'modal center', style: `--hue:${hue}`, role: 'dialog', 'aria-modal': 'true' });
    box.append(el('div', { html: `<svg class="done-lens" viewBox="-60 -40 120 80" aria-hidden="true"><defs><radialGradient id="dl"><stop offset="0" stop-color="${hsl(hue, 95, 80)}"/><stop offset="1" stop-color="${hsl(hue, 80, 45, .6)}"/></radialGradient><filter id="dlg"><feGaussianBlur stdDeviation="5"/></filter></defs><path d="${lensPath(46, 26)}" fill="${hsl(hue, 90, 60, .6)}" filter="url(#dlg)"/><path d="${lensPath(46, 26)}" fill="url(#dl)" stroke="${hsl(hue, 90, 80)}" stroke-width="1.5"/></svg>` }));
    box.append(el('div', { class: 'kick', text: `LENS ${String(m.no).padStart(2, '0')} · ${first ? '已点亮' : '再次点亮'}` }));
    box.append(el('h2', { text: `第 ${m.no} 面透镜：${m.name}` }));
    if (opts.summary) box.append(el('p', { html: fmt(opts.summary) }));
    if (got.length) {
      const row = el('div', { class: 'row', style: 'display:flex;flex-wrap:wrap;gap:6px;justify-content:center' });
      got.forEach(c => row.append(el('span', { class: 'chip', style: `--h:${hue}`, html: `<b></b>${esc(c.title)}` })));
      box.append(row);
    }
    const left = 11 - doneCount();
    box.append(el('p', { text: left ? `光束上已经有 ${doneCount()} 种颜色，还剩 ${left} 面透镜。` : '十一面透镜全部点亮。去群岛中央，让光重新汇合。' }));
    const actions = el('div', { class: 'actions', style: 'justify-content:center' });
    const back = el('button', { class: 'btn primary', type: 'button', text: '回到群岛' });
    back.addEventListener('click', () => { closeOverlay(); showMap(id); });
    const stay = el('button', { class: 'btn', type: 'button', text: '留在这里' });
    stay.addEventListener('click', () => closeOverlay());
    actions.append(back, stay); box.append(actions);
    overlay.dataset.dismiss = '';
    openOverlay(box);
  }

  /* ------------------------------------------------------------------ screens: level */
  function enterLevel(id) {
    const def = levels.get(id); if (!def) { showMap(); return; }
    teardown(); hudMode = 'level'; hudLevel = id; hudSteps = [0, def.steps || 0]; renderHud();
    setHash(id); Music.play(id); Sound.sfx('open');
    const hue = HUES[id] != null ? HUES[id] : 42; document.documentElement.style.setProperty('--hue', hue); Sky.tint = hue;
    const root = el('div', { class: 'level-root gutter lv-' + id, style: `--hue:${hue}` });
    stage.append(root);
    const scope = makeScope();
    current = { id, root, scope, cleanup: null };
    const api = makeApi(def, root, scope);
    try {
      const r = def.mount(root, api);
      if (typeof r === 'function') current.cleanup = r; else if (r && typeof r.unmount === 'function') current.cleanup = () => r.unmount();
    } catch (e) {
      console.error(e);
      root.append(el('div', { class: 'lv-error', html: `这面透镜出了点问题，暂时无法进入。<br><small>${esc(e && e.message || e)}</small>` }));
    }
  }

  /* ------------------------------------------------------------------ screens: title */
  function showTitle() {
    teardown(); hudMode = 'title'; renderHud(); setHash('start'); Music.play('map');
    const scr = el('div', { class: 'screen title-screen gutter' });
    const cv = el('canvas', { 'aria-hidden': 'true' });
    const started = doneCount() > 0 || Object.keys(state.cards).length > 0;
    const card = el('div', { class: 'title-card' },
      el('div', { class: 'title-kicker', text: 'An archipelago of eleven lenses' }),
      el('h1', { class: 'title-name', text: '透镜群岛' }),
      el('p', { class: 'title-sub', text: '你是一束白光。穿过十一面透镜，你会被语言、逻辑、价值与物理一次次折射，最后重新汇合。' }),
      el('div', { class: 'title-actions' },
        el('button', { class: 'btn primary', type: 'button', text: started ? '继续旅程' : '开始旅程', onclick: () => { Sound.set(state.sound !== false); showMap(); } }),
        started ? el('button', { class: 'btn', type: 'button', text: '图鉴', onclick: () => { Sound.set(state.sound !== false); showCodex(); } }) : null),
      el('p', { class: 'title-foot', text: '移动指针可以转动棱镜。建议戴上耳机。' }));
    scr.append(cv, card); stage.append(scr);
    const scope = makeScope(); current = { id: 'title', root: scr, scope, cleanup: null };
    prismScene(cv, scope);
  }
  function prismScene(cv, scope) {
    const ctx = cv.getContext('2d'); let w = 0, h = 0, dpr = 1, rot = 0, target = 0.15;
    const fit = () => { const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1); w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const ro = new ResizeObserver(fit); ro.observe(cv); scope.add(() => ro.disconnect()); fit();
    const mv = e => { const p = e.touches ? e.touches[0] : e; target = clamp((p.clientX / innerWidth - 0.5) * 1.4, -0.6, 0.6); };
    addEventListener('pointermove', mv); scope.add(() => removeEventListener('pointermove', mv));
    const hues = ORDER.map(id => HUES[id]);
    let raf = 0;
    const draw = t => {
      rot += (target - rot) * 0.06;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5, cy = Math.max(h * 0.79, Math.min(h - 70, 560)), s = Math.min(w, h) * 0.075 + 26;
      // white beam
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      const ey = cy + s * 0.15;
      const bg = ctx.createLinearGradient(0, 0, cx, 0); bg.addColorStop(0, 'rgba(255,246,228,0)'); bg.addColorStop(1, 'rgba(255,246,228,.95)');
      ctx.strokeStyle = bg; ctx.lineWidth = 2.4; ctx.shadowColor = '#fff6e4'; ctx.shadowBlur = 18;
      ctx.beginPath(); ctx.moveTo(0, ey - 40 * Math.sin(rot)); ctx.lineTo(cx - s * 0.3, ey); ctx.stroke();
      // dispersion
      const base = 0.12 + rot * 0.5, spread = 0.028 + 0.022 * (1 + Math.sin(rot * 2.2)) + (reduced ? 0 : 0.004 * Math.sin(t * 0.0012));
      ctx.shadowBlur = 14;
      hues.forEach((hh, i) => {
        const a = base + (i - 5) * spread, x0 = cx + s * 0.28, y0 = ey + (i - 5) * 0.6;
        const L = Math.hypot(w, h);
        const g = ctx.createLinearGradient(x0, y0, x0 + Math.cos(a) * L * 0.6, y0 + Math.sin(a) * L * 0.6);
        g.addColorStop(0, `hsl(${hh} 95% 66% / .95)`); g.addColorStop(1, `hsl(${hh} 95% 60% / 0)`);
        ctx.strokeStyle = g; ctx.shadowColor = `hsl(${hh} 95% 60%)`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + Math.cos(a) * L, y0 + Math.sin(a) * L); ctx.stroke();
      });
      ctx.restore();
      // prism
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot * 0.35);
      const tri = [[0, -s], [s * 0.88, s * 0.52], [-s * 0.88, s * 0.52]];
      const pg = ctx.createLinearGradient(-s, -s, s, s); pg.addColorStop(0, 'rgba(255,255,255,.14)'); pg.addColorStop(1, 'rgba(160,190,255,.04)');
      ctx.fillStyle = pg; ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1.3; ctx.lineJoin = 'round';
      ctx.beginPath(); tri.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.restore();
      if (!reduced && scope.alive) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw); scope.add(() => cancelAnimationFrame(raf));
  }

  /* ------------------------------------------------------------------ screens: map */
  function showMap(justDone) {
    teardown(); hudMode = 'map'; hudLevel = null; renderHud(); setHash('map'); Music.play('map'); checkUpdate();
    const scr = el('div', { class: 'screen map-screen' });
    const wrap = el('div', { class: 'map-wrap' });
    scr.append(wrap); stage.append(scr);
    const scope = makeScope(); current = { id: 'map', root: scr, scope, cleanup: null };
    let L = null;
    const draw = () => {
      const tall = stage.clientWidth < 720 || stage.clientHeight > stage.clientWidth * 1.15;
      const nl = tall ? LAYOUT_TALL : LAYOUT_WIDE;
      if (nl === L && wrap.firstChild) return; L = nl;
      wrap.innerHTML = mapSvg(L, tall, justDone);
      bindMap(wrap, scope);
      if (justDone && !reduced) { const g = wrap.querySelector(`[data-id="${justDone}"] .lens`); if (g) g.animate([{ opacity: 0.2 }, { opacity: 1 }], { duration: 1400, easing: 'ease-out' }); }
      if (tall && justDone) { const n = wrap.querySelector(`[data-id="${justDone}"]`); if (n) n.scrollIntoView({ block: 'center' }); }
    };
    const ro = new ResizeObserver(draw); ro.observe(stage); scope.add(() => ro.disconnect()); draw();
    if (doneCount() === 11) {
      const fin = levels.get('fin');
      const b = el('button', { class: 'btn primary reunite', type: 'button', text: '让白光重新汇合', onclick: () => fin ? enterLevel('fin') : null });
      scr.append(b);
    } else {
      scr.append(el('div', { class: 'map-hint', text: '点一座岛查看。两座岛都点亮后，它们之间的知识之桥会亮起来。' }));
    }
    if (!state.intro) {
      state.intro = true; save();
      Narr.say('你好，我是**镜灵**，这一路由我陪你。').then(() => Narr.say('你是一束白光。白光里什么颜色都有，只是还没有被分开。'))
        .then(() => Narr.say('前面是透镜群岛：十一面透镜，散落在四片大陆上。每穿过一面，你就会被折射一次，带上一种颜色。'))
        .then(() => Narr.say('岛与岛之间有桥。点亮两端的岛，桥就会亮。顺序随你，不过从西边的**巴别**出发最自然。'))
        .then(() => { Narr.hide(); openPanel('l01'); });
    } else if (justDone && doneCount() === 11) {
      Narr.say('十一种颜色都在你身上了。到群岛中央来，让它们重新汇合。');
    }
  }
  function mapSvg(L, tall, justDone) {
    const [W, H] = L.vb, P = L.pos;
    const A = tall ? 34 : 40, B = tall ? 20 : 24;
    let s = `<svg class="map-svg${tall ? ' portrait' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="透镜群岛地图"><defs>`;
    s += '<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    s += '<filter id="soft" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="40"/></filter>';
    s += '<filter id="halo" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="12"/></filter>';
    for (const id of ORDER) { const h = HUES[id]; s += `<radialGradient id="g-${id}" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="${hsl(h, 95, 82)}"/><stop offset=".55" stop-color="${hsl(h, 85, 60)}"/><stop offset="1" stop-color="${hsl(h, 80, 38)}"/></radialGradient>`; }
    for (let i = 0; i < ORDER.length - 1; i++) { const a = ORDER[i], b = ORDER[i + 1]; s += `<linearGradient id="bm-${a}" gradientUnits="userSpaceOnUse" x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}"><stop offset="0" stop-color="${hsl(HUES[a], 90, 66)}"/><stop offset="1" stop-color="${hsl(HUES[b], 90, 66)}"/></linearGradient>`; }
    for (const [k, a, b] of BRIDGES) s += `<linearGradient id="br-${k}" gradientUnits="userSpaceOnUse" x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}"><stop offset="0" stop-color="${hsl(HUES[a], 85, 66)}"/><stop offset="1" stop-color="${hsl(HUES[b], 85, 66)}"/></linearGradient>`;
    s += '</defs>';
    // continent glows + labels
    const groups = {}; for (const id of ORDER) { const c = metaOf(id).cont; (groups[c] = groups[c] || []).push(P[id]); }
    for (const c in groups) {
      const pts = groups[c], mx = pts.reduce((a, p) => a + p[0], 0) / pts.length, my = pts.reduce((a, p) => a + p[1], 0) / pts.length;
      s += `<ellipse cx="${mx}" cy="${my}" rx="${tall ? 150 : 170}" ry="${tall ? 120 : 130}" fill="${CONT[c].v}" opacity=".07" filter="url(#soft)"/>`;
    }
    for (const c in L.cont) { const [x, y, an] = L.cont[c]; s += `<text class="cont-label" x="${x}" y="${y}" text-anchor="${an}" style="font-size:${tall ? 22 : 30}px">${CONT[c].name}</text>`; }
    // bridges
    BRIDGES.forEach(([k, a, b], i) => {
      const [x1, y1] = P[a], [x2, y2] = P[b], mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
      const off = (i % 2 ? 1 : -1) * Math.min(90, len * 0.22), cx = mx - dy / len * off, cy = my + dx / len * off;
      const lit = state.done[a] && state.done[b];
      const d = `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
      s += `<path class="bridge${lit ? ' lit' : ''}" d="${d}"${lit ? ` stroke="url(#br-${k})"` : ''}/>`;
      if (lit) {
        const tx = 0.25 * x1 + 0.5 * cx + 0.25 * x2, ty = 0.25 * y1 + 0.5 * cy + 0.25 * y2;
        s += `<path class="bridge-hit" d="${d}" data-bridge="${k}" tabindex="0" role="button" aria-label="知识之桥 ${k}"/>`;
        s += `<g data-bridge="${k}" style="cursor:pointer"><circle cx="${tx}" cy="${ty}" r="9" fill="url(#br-${k})"/><text class="bridge-tag" x="${tx}" y="${ty + 4}" text-anchor="middle">${k}</text></g>`;
      }
    });
    // beam
    const first = P[ORDER[0]];
    s += `<path d="M0,${first[1] + (tall ? -60 : 0)} L${first[0]},${first[1]}" stroke="#fff6e4" stroke-width="2" opacity=".85" filter="url(#glow)"/>`;
    for (let i = 0; i < ORDER.length - 1; i++) {
      const a = ORDER[i], b = ORDER[i + 1], lit = state.done[a] && state.done[b];
      s += `<path d="M${P[a][0]},${P[a][1]} L${P[b][0]},${P[b][1]}" stroke="${lit ? `url(#bm-${a})` : 'rgba(255,246,228,.16)'}" stroke-width="${lit ? 2.2 : 1}" ${lit ? 'filter="url(#glow)"' : 'stroke-dasharray="1 7" stroke-linecap="round"'}/>`;
    }
    // islands
    const next = ORDER.find(id => !state.done[id]);
    for (const id of ORDER) {
      const [x, y] = P[id], h = HUES[id], m = metaOf(id), done = !!state.done[id], ready = levels.has(id);
      s += `<g class="isle" data-id="${id}" transform="translate(${x},${y})" tabindex="0" role="button" aria-label="第${m.no}镜 ${esc(m.name)}${done ? '，已点亮' : ''}">`;
      if (id === next && !reduced) s += `<ellipse class="next-ring" rx="${A + 6}" ry="${B + 6}"/>`;
      if (done) s += `<path d="${lensPath(A, B)}" fill="${hsl(h, 90, 60, .5)}" filter="url(#halo)" transform="scale(1.35)"/>`;
      s += `<path class="lens" d="${lensPath(A, B)}" fill="${done ? `url(#g-${id})` : 'rgba(255,255,255,.035)'}" stroke="${hsl(h, 85, done ? 82 : 62, done ? 0.95 : ready ? 0.55 : 0.25)}" stroke-width="1.5"/>`;
      s += `<text class="isle-no" y="${-B - 10}" text-anchor="middle">${String(m.no).padStart(2, '0')}</text>`;
      s += `<text class="isle-name" y="${B + 24}" text-anchor="middle" style="font-size:${tall ? 18 : 20}px">${esc(m.name)}</text>`;
      s += '</g>';
    }
    s += '</svg>';
    return s;
  }
  function bindMap(wrap, scope) {
    wrap.querySelectorAll('.isle').forEach(g => {
      const open = () => { Sound.sfx('select'); openPanel(g.dataset.id); };
      g.addEventListener('click', open);
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    wrap.querySelectorAll('[data-bridge]').forEach(g => {
      const open = () => { Sound.sfx('select'); openBridge(g.dataset.bridge); };
      g.addEventListener('click', open);
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }
  function closePanel() { const p = stage.querySelector('.map-panel'); if (p) p.remove(); }
  function openPanel(id) {
    closePanel();
    const m = metaOf(id), h = HUES[id], d = levels.get(id), done = !!state.done[id];
    const cards = (d && d.cards) || [], got = cards.filter(c => state.cards[c.id]).length;
    const p = el('div', { class: 'map-panel', style: `--hue:${h};--h:${h}`, role: 'dialog', 'aria-label': m.name });
    p.append(el('button', { class: 'xbtn', type: 'button', 'aria-label': '关闭', text: '×', onclick: closePanel }));
    p.append(el('div', { class: 'kick', text: `LENS ${String(m.no).padStart(2, '0')} · ${CONT[m.cont].name}` }));
    p.append(el('h3', { text: m.name }));
    p.append(el('p', { text: m.subtitle || '' }));
    if (d && d.blurb) p.append(el('p', { html: fmt(d.blurb) }));
    p.append(el('div', { class: 'row' }, el('span', { class: 'chip', html: `<b></b>${done ? '已点亮' : '尚未点亮'}` }), el('span', { class: 'chip', text: `图鉴 ${got}/${cards.length}` })));
    const btn = el('button', { class: 'btn ' + (done ? 'hue' : 'primary'), type: 'button', text: d ? (done ? '再走一遍' : '进入透镜') : '还在建造中', onclick: () => d && enterLevel(id) });
    if (!d) btn.disabled = true;
    p.append(btn);
    stage.append(p);
    btn.focus({ preventScroll: true });
  }
  function openBridge(k) {
    closePanel();
    const b = BRIDGES.find(x => x[0] === k); if (!b) return;
    const [, a, c, text] = b, ma = metaOf(a), mc = metaOf(c);
    const p = el('div', { class: 'map-panel', style: `--hue:${HUES[a]}` });
    p.append(el('button', { class: 'xbtn', type: 'button', 'aria-label': '关闭', text: '×', onclick: closePanel }));
    p.append(el('div', { class: 'kick', text: `知识之桥 · ${k}` }));
    p.append(el('h3', { text: `${ma.name} ⇄ ${mc.name}` }));
    p.append(el('p', { text }));
    p.append(el('div', { class: 'row' },
      el('button', { class: 'btn', type: 'button', text: `去${ma.name}`, onclick: () => enterLevel(a) }),
      el('button', { class: 'btn', type: 'button', text: `去${mc.name}`, onclick: () => enterLevel(c) })));
    stage.append(p);
  }

  /* ------------------------------------------------------------------ screens: codex */
  function showCodex() {
    teardown(); hudMode = 'codex'; renderHud(); setHash('codex'); Music.play('map');
    const scr = el('div', { class: 'screen codex gutter' });
    const all = allCards(), n = all.filter(c => state.cards[c.id]).length;
    scr.append(el('div', { class: 'codex-head' }, el('div', null, el('h2', { text: '光谱图鉴' }), el('p', { text: `每穿过一面透镜，你会照见一些概念。已收集 ${n} / ${all.length}。` }))));
    for (const id of ORDER) {
      const d = levels.get(id); if (!d || !d.cards || !d.cards.length) continue;
      const m = metaOf(id), h = HUES[id];
      const grp = el('section', { class: 'codex-group', style: `--h:${h}` });
      grp.append(el('h4', null, el('b'), el('span', { text: m.name }), el('small', { text: `LENS ${String(m.no).padStart(2, '0')}` })));
      const grid = el('div', { class: 'cards' });
      d.cards.forEach(c => {
        const has = !!state.cards[c.id];
        const b = el('button', { class: 'card' + (has ? '' : ' locked'), type: 'button', style: `--h:${h}`, 'aria-disabled': has ? null : 'true' },
          el('div', { class: 'ct', text: has ? c.title : '？？？' }), el('div', { class: 'ce', text: has ? (c.en || '') : `在「${m.name}」中照见` }));
        if (has) b.addEventListener('click', () => openCard(c, h, m));
        grid.append(b);
      });
      grp.append(grid); scr.append(grp);
    }
    stage.append(scr);
    current = { id: 'codex', root: scr, scope: makeScope(), cleanup: null };
  }
  function openCard(c, h, m) {
    const box = el('div', { class: 'modal card-full', style: `--hue:${h}`, role: 'dialog', 'aria-modal': 'true' });
    box.append(el('div', { class: 'kick', text: `LENS ${String(m.no).padStart(2, '0')} · ${m.name}` }));
    box.append(el('h2', { text: c.title }));
    if (c.en) box.append(el('p', { style: 'font-style:italic', text: c.en }));
    box.append(el('div', { class: 'body', html: fmt(c.body || '') }));
    if (c.ref) box.append(el('div', { class: 'ref', text: '出处与延伸：' + c.ref }));
    const actions = el('div', { class: 'actions' });
    actions.append(el('button', { class: 'btn hue', type: 'button', text: '合上', onclick: closeOverlay }));
    box.append(actions);
    overlay.dataset.dismiss = '1';
    openOverlay(box, { dismiss: true });
  }

  /* ------------------------------------------------------------------ public */
  function registerLevel(def) {
    if (!def || !def.id || typeof def.mount !== 'function') { console.warn('bad level', def); return; }
    if (def.id !== 'fin' && !HUES.hasOwnProperty(def.id)) { console.warn('unknown level id', def.id); }
    levels.set(def.id, def);
  }
  function boot() {
    stage = document.getElementById('stage'); hud = document.getElementById('hud'); narrEl = document.getElementById('narr');
    overlay = document.getElementById('overlay'); toasts = document.getElementById('toasts');
    Narr.build(); Sky.init();
    const h = (location.hash || '').slice(1);
    // first user gesture unlocks audio
    const unlock = () => { interacted = true; if (state.sound) Sound.apply(); removeEventListener('pointerdown', unlock); removeEventListener('keydown', unlock); };
    addEventListener('pointerdown', unlock); addEventListener('keydown', unlock);
    if (levels.has(h) && h !== 'fin') enterLevel(h);
    else if (h === 'map') showMap();
    else if (h === 'codex') showCodex();
    else showTitle();
    checkUpdate();
  }
  function reset() { state = { v: 1, done: {}, cards: {}, sound: state.sound, vol: state.vol, intro: false }; save(); showTitle(); }

  window.Lens = {
    registerLevel, boot, go, reset,
    ORDER, HUES, META, BRIDGES, CONT,
    get state() { return state; },
    util: { el, esc, fmt, clamp, lerp, hsl, lensPath, PRISM_SVG },
    sound: Sound, music: Music, narr: Narr,
    levelDefs: () => ORDER.map(id => levels.get(id)).filter(Boolean),
    _complete: id => { const d = levels.get(id); if (d) completeLevel(d, {}); },
  };
})();

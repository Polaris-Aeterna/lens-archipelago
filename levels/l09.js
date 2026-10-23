/* 透镜群岛 · 第 9 镜「时空」：时间存在吗
 * 四幕：双生子（时间膨胀）→ 倾斜的现在（同时性、光锥、间隔）→ A/B 序列与块宇宙 → 旋火轮。
 */
(function () {
  'use strict';

  const FM = '"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace';
  const FS = '"Noto Sans SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei",system-ui,sans-serif';
  const FSERIF = '"Noto Serif SC","Songti SC","STSong",serif';
  const TAU = Math.PI * 2;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const gammaOf = v => 1 / Math.sqrt(1 - v * v);
  const tri = p => { const f = p - Math.floor(p); return 1 - Math.abs(2 * f - 1); };
  const num = (x, d) => { const s = Math.abs(x).toFixed(d == null ? 2 : d); return (x < 0 && +s !== 0 ? '−' : '') + s; };

  const CARDS = [
    { id: 'l09-dilation', title: '时间膨胀', en: 'Time dilation',
      body: '以速度 v 运动的钟，在你的参考系里慢了 **γ = 1/√(1−v²/c²)** 倍：v = 0.9c 时约 2.29。但每个人随身的钟对自己永远正常地走，读出的叫**固有时**；效应是对称的。双生子之所以不对称，是因为远航的一方中途掉了头，两人在时空中走了不同的路径。GPS 卫星钟每天净快约 38 微秒，必须修正。',
      ref: 'Einstein 1905；Ashby, “Relativity in the Global Positioning System”, 2003' },
    { id: 'l09-simul', title: '同时性的相对性', en: 'Relativity of simultaneity',
      body: '以速度 v 运动的观察者测得两事件的时间差为 **Δt′ = γ(Δt − vΔx/c²)**。若两事件**类空**相隔，总能找到某个 v 让括号变号：有人说这个先，有人说那个先。你的“现在”是一条线，擦肩而过的旅人的“现在”是另一条斜线。一个**全宇宙统一的“现在”**并不存在。',
      ref: 'Einstein 1905' },
    { id: 'l09-cone', title: '光锥与因果序', en: 'Light cone & causal order',
      body: '从一个事件发出的光划出光锥：锥内上方是**绝对未来**，下方是**绝对过去**，两侧是“别处”。**类时**相隔的事件可能有因果联系，它们的先后对所有观察者都一样，这就是**因果序**。相对论没有取消先后，只是让时序从一条“全序”的直线，退化成了一个**偏序**：有些事件根本无从比较先后。',
      ref: 'Minkowski, “Raum und Zeit”, 1908' },
    { id: 'l09-interval', title: '时空间隔', en: 'Spacetime interval',
      body: '不同观察者测得的 Δt、Δx 各不相同，但 **Δs² = c²Δt² − Δx²** 在所有惯性系里都一样（闵可夫斯基，1908）。那个**减号**把间隔分成类时、类光、类空三类，也让时空里的“直线”成了两点之间**最长**的路。（机器学习里的 Minkowski distance 是 L^p 距离，同名而不同物。）',
      ref: 'Minkowski, “Raum und Zeit”, 1908' },
    { id: 'l09-ab', title: 'A 序列与 B 序列', en: 'A-series and B-series',
      body: '麦克塔格特（McTaggart，1908）区分了两种描述时间的方式：**A 序列**是“过去、现在、将来”，它是变动的，“时间在流逝”的感觉靠它；**B 序列**是“早于、晚于”，它是固定的，“秦朝早于汉朝”永远为真。他论证 A 序列自相矛盾、因而时间不真实；这个论证至今有争议，但这对区分成了时间哲学的通用语言。',
      ref: 'McTaggart, “The Unreality of Time”, Mind, 1908' },
    { id: 'l09-block', title: '块宇宙', en: 'Block universe (eternalism)',
      body: '**现在主义**：只有现在真实。**生长块**：过去与现在真实，未来尚未存在（布罗德，1923）。**永恒主义**：过去、现在、将来同样真实，“现在”只像“这里”。里特代克与普特南借同时性的相对性为永恒主义辩护；斯坦因反驳：相对论只要求放弃统一的“现在”，不要求放弃“生成”。相对论让现在主义尴尬，但没有一锤定音。',
      ref: 'Broad 1923；Putnam 1967；Stein 1968' },
    { id: 'l09-wheel', title: '旋火轮', en: 'The whirling firebrand',
      body: '快速旋转一支火把，眼睛看到一个完整的火圈，其实每个瞬间只有一个火点。佛典用它说明**刹那灭**：一切现象生起即灭，“持续存在”只是一连串相续的刹那。《大智度论》“十喻”里的**如水中月**也是此意：月在天上，水里只有影子。但相似不等于预言：块宇宙说所有时刻同样真实，刹那灭说只有此刹那，方向几乎相反。',
      ref: '《大智度论》卷六（鸠摩罗什译）；Ronkin, “Abhidharma”, SEP' },
  ];

  const CSS = `
.l09-wrap{max-width:920px;margin:0 auto;padding-top:14px;display:grid;gap:12px}
.l09-wrap [hidden]{display:none!important}
.l09-in{animation:l09-in .6s ease both}
@keyframes l09-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.l09-head{display:grid;gap:2px}
.l09-kick{font:500 11px/1.4 var(--f-mono);letter-spacing:.22em;color:hsl(var(--hue) 70% 74%)}
.l09-title{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(26px,6vw,36px);line-height:1.12;letter-spacing:.04em}
.l09-sub{margin:0;font-family:var(--f-serif);font-size:14px;color:var(--dim)}
.l09-stage{position:relative;border-radius:18px;border:1px solid var(--line);overflow:hidden;
  background:radial-gradient(120% 90% at 50% 0%,hsl(var(--hue) 60% 16% / .5),rgba(5,8,15,.35) 62%,rgba(5,8,15,.65))}
.l09-ctrls{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.l09-ctrls .btn{min-height:44px}
.l09-ctrls .btn[aria-pressed="true"]{border-color:hsl(var(--hue) 85% 68%);background:hsl(var(--hue) 80% 62% / .24);color:var(--text)}
.l09-ctrls .btn[disabled]{opacity:.4;cursor:default}
.l09-range{flex:1 1 240px;display:flex;align-items:center;gap:10px;min-height:44px;min-width:0}
.l09-range label{font:12px var(--f-mono);color:var(--dim);white-space:nowrap}
.l09-range input{flex:1;min-width:0;height:40px;margin:0;accent-color:hsl(var(--hue) 85% 62%);cursor:pointer}
.l09-range output{font:500 14px var(--f-mono);color:var(--text);min-width:5.2em;text-align:right;white-space:nowrap}
.l09-read{font:13px/1.65 var(--f-mono);color:var(--dim);display:flex;flex-wrap:wrap;gap:2px 16px;min-height:1.65em}
.l09-read b{color:hsl(var(--hue) 85% 78%);font-weight:500}
.l09-note{font-family:var(--f-serif);font-size:14.5px;line-height:1.7;color:var(--dim);margin:0;min-height:1.7em}
.l09-note b{color:var(--text);font-weight:600}
.l09-modes{display:flex;flex-wrap:wrap;gap:8px}
.l09-tbl{width:100%;border-collapse:collapse;font:12.5px/1.5 var(--f-mono);color:var(--dim)}
.l09-tbl th{font-weight:400;color:var(--faint);text-align:right;padding:4px 6px;border-bottom:1px solid var(--line-strong)}
.l09-tbl td{text-align:right;padding:10px 6px;border-bottom:1px solid var(--line)}
.l09-tbl th:first-child,.l09-tbl td:first-child{text-align:left;color:var(--text)}
.l09-tbl tbody tr{cursor:pointer}
.l09-tbl tr.sel td{background:hsl(var(--hue) 80% 62% / .09);color:var(--text)}
.l09-tbl .fut{color:hsl(var(--hue) 85% 78%)!important}
.l09-tbl .pst{color:hsl(38 88% 70%)!important}
.l09-tbl .hid{opacity:0;transition:opacity .8s}
.l09-tbl .hid.on{opacity:1}
.l09-tbl td.hid.on{color:var(--beam)}
.l09-cap{font-size:12px;color:var(--faint);margin-top:6px}
.l09-hold{touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
@media (max-width:520px){.l09-tbl{font-size:11.5px}.l09-tbl th,.l09-tbl td{padding-left:3px;padding-right:3px}}
`;

  Lens.registerLevel({
    id: 'l09', no: 9, name: '时空', subtitle: '时间存在吗', continent: 'phys', steps: 4,
    blurb: '推飞船，斜“现在”，点亮整块时间，转一支火把：哪些关于时间的常识被推翻了？',
    cards: CARDS,
    mount(root, api) {
      const H = api.hue, R = api.reduced;
      api.css(CSS);
      const wrap = api.el('div', { class: 'l09-wrap' });
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
        s.head = api.el('div', { class: 'l09-head l09-in' },
          api.el('div', { class: 'l09-kick', text: `0${no} / 04` }),
          api.el('h2', { class: 'l09-title', text: title }),
          sub ? api.el('p', { class: 'l09-sub', text: sub }) : null);
        s.stage = api.el('div', { class: 'l09-stage l09-in' });
        s.ctrls = api.el('div', { class: 'l09-ctrls l09-in' });
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
      function slider(parent, o) {
        const inp = api.el('input', { type: 'range', min: o.min, max: o.max, step: o.step, value: o.value, 'aria-label': o.label });
        const out = api.el('output', { text: o.fmt(+o.value) });
        const row = api.el('div', { class: 'l09-range' }, api.el('label', { text: o.label }), inp, out);
        parent.append(row);
        api.listen(inp, 'input', () => { const v = +inp.value; out.textContent = o.fmt(v); o.oninput(v); });
        return { row, inp, out, set(v) { inp.value = v; out.textContent = o.fmt(+inp.value); } };
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

      /* ================================================ 幕一 · 双生子 */
      async function sceneTwins() {
        const s = scene(1, '双生子', '光在两面镜子之间来回。弹一个来回，钟就“滴答”一声。');
        const T0 = 1.6, D = 4, AGE0 = 20;
        const st = { v: 0, view: 'ground', phG: 0, phS: 0.37, trip: null, tripDone: false, drift: 0, result: '' };
        const cv = api.canvas(s.stage, { style: 'display:block;width:100%;height:clamp(300px,50vh,460px)' });
        const sl = slider(s.ctrls, { label: '速度 v/c', min: 0, max: 0.99, step: 0.01, value: 0, fmt: v => v.toFixed(2), oninput: v => { st.v = v; upd(); } });
        const busy = () => !!(st.trip && !st.trip.done);
        const bView = btn('到飞船上看', '', () => { if (busy()) return; st.view = st.view === 'ground' ? 'ship' : 'ground'; api.sfx('select'); upd(); });
        const bTrip = btn('往返一趟', 'hue', startTrip);
        bView.hidden = true; bTrip.hidden = true;
        s.ctrls.append(bView, bTrip);
        const read = api.el('div', { class: 'l09-read l09-in' });
        wrap.append(read);

        function upd() {
          const g = gammaOf(st.v);
          bView.textContent = st.view === 'ground' ? '到飞船上看' : '回到地面看';
          bView.setAttribute('aria-pressed', st.view === 'ship' ? 'true' : 'false');
          let html = `<span>γ = <b>${g.toFixed(2)}</b></span>`;
          html += st.view === 'ground'
            ? `<span>地面过 1 秒，飞船钟走 <b>${(1 / g).toFixed(2)}</b> 秒</span>`
            : `<span>飞船上过 1 秒，地面钟走 <b>${(1 / g).toFixed(2)}</b> 秒</span>`;
          if (st.result) html += `<span>${st.result}</span>`;
          read.innerHTML = html;
        }
        function startTrip() {
          if (busy()) return;
          if (st.v < 0.5) { st.result = '太慢了，差别几乎看不出来：先把速度推到 0.5 以上。'; api.sfx('bad'); upd(); return; }
          st.view = 'ground';
          const v = st.v, g = gammaOf(v), T = 2 * D / v;
          st.trip = { v, g, T, tau: T / g, t: 0, f: 0, dur: R ? 0 : 6.5, done: false };
          sl.inp.disabled = true; bView.disabled = true; bTrip.disabled = true;
          st.result = '';
          api.sfx('whoosh'); upd();
        }
        function finishTrip() {
          const tr = st.trip; tr.done = true; tr.f = 1;
          sl.inp.disabled = false; bView.disabled = false; bTrip.disabled = false;
          st.result = `重逢：弟弟 <b>${(AGE0 + tr.T).toFixed(1)}</b> 岁，哥哥 <b>${(AGE0 + tr.tau).toFixed(1)}</b> 岁`;
          st.tripDone = true; api.sfx('chime'); upd();
        }

        function drawTrack(ctx, w, tb, v, shipView) {
          const y = Math.round(tb * 0.56), x0 = 30, x1 = w - 30, tr = st.trip;
          ctx.save();
          if (shipView && !tr && !R && v > 0.01) { // 在飞船参考系里：宇宙向后退
            ctx.strokeStyle = 'rgba(200,215,255,.16)'; ctx.lineWidth = 1;
            for (let k = 0; k < 16; k++) {
              const yy = 8 + ((k * 37) % Math.max(20, tb - 16)), len = 4 + 40 * v;
              const xx = ((((k * 89.7 - st.drift * w * 2.2) % (w + 60)) + (w + 60)) % (w + 60)) - 30;
              ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + len, yy); ctx.stroke();
            }
          }
          ctx.setLineDash([2, 6]); ctx.strokeStyle = api.hsl(H, 50, 72, 0.3); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.setLineDash([]);
          ctx.globalCompositeOperation = 'lighter';
          halo(ctx, x0, y, 20, H, 80, 60, 0.55); halo(ctx, x1, y, 16, 42, 90, 70, 0.45);
          ctx.globalCompositeOperation = 'source-over';
          dot(ctx, x0, y, 4.5, api.hsl(H, 70, 84, 1));
          ctx.strokeStyle = 'rgba(255,240,210,.9)'; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(x1 - 7, y); ctx.lineTo(x1 + 7, y); ctx.moveTo(x1, y - 7); ctx.lineTo(x1, y + 7); ctx.stroke();
          dot(ctx, x1, y, 2.2, '#FFF6E4');
          ctx.font = `11px ${FS}`; ctx.fillStyle = 'rgba(162,173,196,.9)';
          ctx.textAlign = 'left'; ctx.fillText('地球', x0 - 12, y + 24);
          ctx.textAlign = 'right'; ctx.fillText('4 光年外的星', x1 + 12, y + 24);
          let sx, dir = 1;
          if (tr) { const f = tr.done ? 1 : tr.f; const u = f < 0.5 ? f * 2 : 2 - f * 2; dir = f < 0.5 ? 1 : -1; sx = x0 + 14 + (x1 - x0 - 28) * u; }
          else if (shipView) sx = w / 2;
          else sx = x0 + 14 + (x1 - x0 - 28) * (R ? 0.3 : (st.drift % 1));
          ctx.save(); ctx.translate(sx, y); ctx.scale(dir, 1);
          ctx.globalCompositeOperation = 'lighter'; halo(ctx, 0, 0, 16, H, 85, 62, 0.55);
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = api.hsl(H, 85, 82, 1);
          ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(-6, -5); ctx.lineTo(-3, 0); ctx.lineTo(-6, 5); ctx.closePath(); ctx.fill();
          ctx.restore();
          ctx.font = `12px ${FM}`; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(232,236,245,.85)';
          if (tr) { const f = tr.done ? 1 : tr.f; ctx.fillText(`地面 ${(f * tr.T).toFixed(1)} 年 · 飞船 ${(f * tr.tau).toFixed(1)} 年`, w / 2, y - 14); }
          else ctx.fillText(shipView ? '飞船参考系：飞船不动，宇宙后退' : '地面参考系', w / 2, y - 14);
          ctx.restore();
        }

        function drawClock(ctx, x0, y0, cw, ch, o) {
          const L = clamp(ch - 156, 46, 120);
          const top = y0 + Math.max(14, (ch - (150 + L)) / 2);
          const cx = x0 + cw / 2, yT = top + 6, yB = yT + L, cpx = 2 * L / T0;
          const moving = o.moving && o.v > 0.005;
          ctx.save();
          ctx.beginPath(); ctx.rect(x0 + 2, y0, cw - 4, ch); ctx.clip();
          ctx.lineCap = 'round';
          if (moving) { // 光在“别人”的参考系里走出的锯齿斜线
            ctx.globalCompositeOperation = 'lighter';
            const N = 72, tmax = 1.3;
            let px = cx, py = yB - tri(o.ph) * L;
            ctx.lineWidth = 1.6;
            for (let i = 1; i <= N; i++) {
              const tau = tmax * i / N;
              const x = cx - o.dir * o.v * cpx * tau, y = yB - tri(o.ph - tau * o.rate / T0) * L;
              ctx.strokeStyle = o.col(0.6 * (1 - i / N));
              ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
              px = x; py = y;
            }
            ctx.globalCompositeOperation = 'source-over';
          } else {
            ctx.strokeStyle = o.col(0.18); ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(cx, yT); ctx.lineTo(cx, yB); ctx.stroke();
          }
          ctx.strokeStyle = o.col(0.9); ctx.lineWidth = 2.5;
          for (const y of [yT - 5, yB + 5]) { ctx.beginPath(); ctx.moveTo(cx - 22, y); ctx.lineTo(cx + 22, y); ctx.stroke(); }
          const py = yB - tri(o.ph) * L;
          ctx.globalCompositeOperation = 'lighter'; halo(ctx, cx, py, 16, o.hue, o.sat, 72, 0.7); ctx.globalCompositeOperation = 'source-over';
          dot(ctx, cx, py, 3.2, '#FFFFFF');
          const dy = yB + 44, r = 19;
          ctx.strokeStyle = 'rgba(190,206,240,.25)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(cx, dy, r, 0, TAU); ctx.stroke();
          for (let k = 0; k < 12; k++) {
            const a = k / 12 * TAU;
            ctx.beginPath(); ctx.moveTo(cx + Math.sin(a) * (r - 4), dy - Math.cos(a) * (r - 4)); ctx.lineTo(cx + Math.sin(a) * r, dy - Math.cos(a) * r); ctx.stroke();
          }
          const a = (o.ph / 12) * TAU;
          ctx.strokeStyle = o.col(1); ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(cx, dy); ctx.lineTo(cx + Math.sin(a) * (r - 3), dy - Math.cos(a) * (r - 3)); ctx.stroke();
          ctx.textAlign = 'center';
          ctx.font = `13px ${FS}`; ctx.fillStyle = 'rgba(232,236,245,.92)'; ctx.fillText(o.name, cx, dy + r + 20);
          ctx.font = `12px ${FM}`; ctx.fillStyle = o.col(0.95);
          ctx.fillText(`${moving ? '运动中' : '静止'} · 走速 ×${o.rate.toFixed(2)}`, cx, dy + r + 38);
          if (o.age != null) { ctx.font = `500 15px ${FM}`; ctx.fillStyle = '#FFF6E4'; ctx.fillText(`${o.age.toFixed(1)} 岁`, cx, dy + r + 60); }
          ctx.restore();
        }

        s.raf((t, dt) => {
          const dts = dt / 1000, { ctx, w, h } = cv, tr = st.trip;
          if (tr && !tr.done) { tr.t += dts; tr.f = tr.dur ? Math.min(1, tr.t / tr.dur) : 1; if (tr.f >= 1) finishTrip(); }
          const flying = tr && !tr.done;
          const v = flying ? tr.v : st.v, g = gammaOf(v), shipView = st.view === 'ship';
          const rateG = shipView ? 1 / g : 1, rateS = shipView ? 1 : 1 / g;
          if (!R) { st.phG += dts * rateG / T0; st.phS += dts * rateS / T0; st.drift += dts * v * 0.16; }
          ctx.clearRect(0, 0, w, h);
          const tb = Math.round(clamp(h * 0.22, 70, 110));
          drawTrack(ctx, w, tb, v, shipView);
          ctx.strokeStyle = 'rgba(168,188,228,.10)'; ctx.lineWidth = 1;
          line(ctx, [w / 2, tb + 10], [w / 2, h - 12]);
          let ageG = null, ageS = null;
          if (tr) { const f = tr.done ? 1 : tr.f; ageG = AGE0 + f * tr.T; ageS = AGE0 + f * tr.tau; }
          const shipDir = flying && tr.f >= 0.5 ? -1 : 1;
          drawClock(ctx, 0, tb, w / 2, h - tb, { name: '地面 · 弟弟', ph: st.phG, rate: rateG, moving: shipView, dir: -1, v, hue: 40, sat: 90, col: a => `rgba(255,246,228,${a})`, age: ageG });
          drawClock(ctx, w / 2, tb, w / 2, h - tb, { name: '飞船 · 哥哥', ph: st.phS, rate: rateS, moving: !shipView, dir: shipDir, v, hue: H, sat: 85, col: a => api.hsl(H, 85, 70, a), age: ageS });
        });
        upd();

        if (api.replay) await api.say('又回到时空之镜。这一次，留意哪些常识被推翻了，哪些没有。');
        else await api.say(['第九面透镜。这里没有地面，只有光和钟织成的网。', '有人说“时间不存在”。这话很容易说出口，却很难说清楚。我们一块一块拆开看。']);
        await api.say(['左边是地面上的弟弟，右边是飞船上的哥哥，各带一只**光钟**。', '1905 年，爱因斯坦用了两条公设，其中一条是：真空光速对所有惯性系里的观察者都一样。']);
        api.hint('拖动速度滑块，看看在地面上的人眼里，飞船上的光怎么走。');
        await until(() => st.v >= 0.9);
        api.sfx('select');
        await api.say(['看那道锯齿：在地面看来，飞船上的光要走更长的斜路。光速又不能变，于是滴答变慢了。',
          '慢的倍数是 **γ = 1/√(1−v²/c²)**：0.9 倍光速时约 2.29，0.99 倍时约 7.09。']);
        bView.hidden = false;
        api.hint('可哥哥自己觉得慢吗？点「到飞船上看」。');
        await until(() => st.view === 'ship');
        await api.say(['在哥哥眼里，自己的钟一切正常，反倒是弟弟的钟在变慢。效应是**对称**的。',
          '所以要加一个限定：钟变慢，是**在别人的参考系里**。随身的钟读出的，叫**固有时**。',
          '那他们重逢时，到底谁更年轻？让哥哥去 4 光年外的星星，再回来。']);
        bTrip.hidden = false;
        api.hint('选一个速度（0.5 以上），按「往返一趟」。');
        await until(() => st.tripDone);
        const tr = st.trip;
        await api.say([`哥哥回来时，比弟弟年轻了 ${(tr.T - tr.tau).toFixed(1)} 岁。这次不对称了：哥哥**中途掉了头**。`,
          '两人在时空中走了不同的路。固有时像一只里程表，记下的是各自路径的“长度”。']);
        api.collect('l09-dilation');
        await api.say('这不是科幻。你口袋里的手机，每天都在用它。');
        await api.quiz({
          kicker: '你的手机每天都在用相对论',
          q: 'GPS 卫星在约两万公里高处、以每秒约 3.9 公里飞行。星上的原子钟，每天比地面的钟……',
          options: [
            { t: '慢约 7 微秒', why: '这只是**狭义相对论**（速度）那一半。卫星离地球远、引力弱，**广义相对论**让它每天快约 45 微秒。' },
            { t: '快约 45 微秒', why: '这只是**广义相对论**（引力）那一半，还得减去速度效应带来的每天约 7 微秒。' },
            { t: '快约 38 微秒', ok: true, why: '45 − 7 ≈ 38。按光速换算是十多公里：不修正，定位误差每天会累积这么多。所以卫星钟在发射前就被故意调慢了一点。' },
          ],
        });
      }

      /* ================================================ 幕二 · 倾斜的现在 */
      async function sceneCone() {
        const s = scene(2, '倾斜的现在', '竖轴是时间，横轴是空间。取 c = 1，光沿 45° 斜线走。');
        const EV = [
          { id: 'E', x: 0.85, t: 0.21 },
          { id: 'F', x: -0.3, t: 0.72 },
          { id: 'G', x: -0.8, t: -0.25 },
        ];
        const st = { v: 0, sel: 'E', tryF: 0, travel: 0, showS: false };
        const cv = api.canvas(s.stage, { style: 'display:block;width:100%;height:clamp(290px,50vh,500px);touch-action:pan-y;cursor:ew-resize' });
        const sl = slider(s.ctrls, { label: '旅人速度 v/c', min: -0.95, max: 0.95, step: 0.01, value: 0, fmt: v => (v > 0 ? '+' : '') + num(v), oninput: v => setV(v, true) });
        const thS = api.el('th', { class: 'hid', text: 'Δs²' });
        const tbl = api.el('table', { class: 'l09-tbl' });
        tbl.append(api.el('thead', null, api.el('tr', null, api.el('th', { text: '事件' }), api.el('th', { text: '旅人看来' }), api.el('th', { text: 'Δt′' }), api.el('th', { text: 'Δx′' }), thS)));
        const tbody = api.el('tbody'); tbl.append(tbody);
        const rows = {};
        for (const e of EV) {
          const r = { verdict: api.el('td'), dt: api.el('td'), dx: api.el('td'), ds: api.el('td', { class: 'hid' }) };
          r.tr = api.el('tr', null, api.el('td', { text: e.id }), r.verdict, r.dt, r.dx, r.ds);
          api.listen(r.tr, 'click', () => { st.sel = e.id; updTable(); api.sfx('tick'); });
          rows[e.id] = r; tbody.append(r.tr);
        }
        wrap.append(api.el('div', { class: 'l09-in' }, tbl, api.el('div', { class: 'l09-cap', text: '以你为原点，单位：年 / 光年（c = 1）。Δt′、Δx′ 是旅人量到的。点一行可选中事件。' })));

        const tPrime = (e, v) => gammaOf(v) * (e.t - v * e.x);
        function setV(v, fromSlider) {
          v = clamp(v, -0.95, 0.95);
          st.travel += Math.abs(v - st.v); st.v = v; st.tryF = Math.max(st.tryF, Math.abs(v));
          if (!fromSlider) sl.set(v);
          updTable();
        }
        function updTable() {
          const g = gammaOf(st.v);
          for (const e of EV) {
            const tp = g * (e.t - st.v * e.x), xp = g * (e.x - st.v * e.t), s2 = e.t * e.t - e.x * e.x, r = rows[e.id];
            const vd = tp > 0.004 ? ['将来', 'fut'] : tp < -0.004 ? ['过去', 'pst'] : ['同时', ''];
            r.verdict.textContent = vd[0]; r.verdict.className = vd[1];
            r.dt.textContent = num(tp); r.dx.textContent = num(xp);
            r.ds.textContent = num(s2) + (s2 > 0 ? ' 类时' : ' 类空');
            r.ds.className = 'hid' + (st.showS ? ' on' : '');
            r.tr.className = st.sel === e.id ? 'sel' : '';
          }
          thS.className = 'hid' + (st.showS ? ' on' : '');
        }
        const geo = () => { const { w, h } = cv; return { cx: w / 2, cy: h / 2, S: Math.min(w * 0.4, h * 0.42) }; };
        pointer(cv.canvas, {
          down(p) {
            const { cx, cy, S } = geo();
            for (const e of EV) if (Math.hypot(cx + e.x * S - p.x, cy - e.t * S - p.y) < 22) { st.sel = e.id; updTable(); api.sfx('tick'); return false; }
            setV((p.x - cx) / S);
            return true;
          },
          move(p) { const { cx, S } = geo(); setV((p.x - cx) / S); },
        });

        s.raf(() => {
          const { ctx, w, h } = cv, { cx, cy, S } = geo();
          const v = st.v, g = gammaOf(v);
          const P = (x, t) => [cx + x * S, cy - t * S];
          const K = Math.max(w, h) * 1.5, X = (w / 2) / S + 0.3;
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = api.hsl(H, 85, 62, 0.085);
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + K, cy - K); ctx.lineTo(cx - K, cy - K); ctx.closePath(); ctx.fill();
          ctx.fillStyle = api.hsl(H, 45, 55, 0.05);
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + K, cy + K); ctx.lineTo(cx - K, cy + K); ctx.closePath(); ctx.fill();
          ctx.textAlign = 'center'; ctx.font = `12px ${FS}`; ctx.fillStyle = api.hsl(H, 70, 80, 0.55);
          let q = P(-0.55, 0.92); ctx.fillText('绝对未来', q[0], q[1]);
          q = P(0.5, -0.95); ctx.fillText('绝对过去', q[0], q[1]);
          ctx.fillStyle = 'rgba(162,173,196,.5)';
          q = P(-1.08, 0.08); ctx.fillText('别处', q[0], q[1]);
          q = P(1.08, -0.14); ctx.fillText('别处', q[0], q[1]);
          // 你的坐标轴
          ctx.strokeStyle = 'rgba(190,206,240,.32)'; ctx.lineWidth = 1;
          line(ctx, [0, cy], [w, cy]); line(ctx, [cx, 0], [cx, h]);
          ctx.font = `11px ${FM}`; ctx.fillStyle = 'rgba(162,173,196,.85)';
          ctx.textAlign = 'right'; ctx.fillText('x', w - 8, cy + 15);
          ctx.textAlign = 'left'; ctx.fillText('t', cx + 6, 14);
          ctx.font = `11px ${FS}`; ctx.fillStyle = 'rgba(232,236,245,.6)'; ctx.fillText('你的“现在”', 8, cy - 7);
          // 光线
          ctx.setLineDash([5, 5]); ctx.strokeStyle = api.hsl(45, 90, 75, 0.45);
          line(ctx, [cx - K, cy + K], [cx + K, cy - K]); line(ctx, [cx - K, cy - K], [cx + K, cy + K]);
          ctx.setLineDash([]);
          q = P(0.7, 0.7); ctx.fillStyle = api.hsl(45, 90, 78, 0.6); ctx.fillText('光', q[0] + 8, q[1] + 4);
          // 旅人的等时线
          ctx.strokeStyle = 'rgba(255,246,228,.07)';
          for (const k of [-0.75, -0.5, -0.25, 0.25, 0.5, 0.75]) line(ctx, P(-X, -v * X + k / g), P(X, v * X + k / g));
          // 旅人的“现在”与世界线
          ctx.strokeStyle = 'rgba(255,246,228,.85)'; ctx.lineWidth = 1.6; ctx.setLineDash([9, 4, 2, 4]);
          line(ctx, P(-X, -v * X), P(X, v * X)); ctx.setLineDash([]);
          line(ctx, P(-1.4 * v, -1.4), P(1.4 * v, 1.4));
          const xr = (w / 2 - 12) / S, yr = clamp(cy - v * xr * S - 8, 14, h - 6);
          ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(255,246,228,.85)'; ctx.fillText('旅人的“现在”', w - 10, yr);
          const hd = P(v, 1);
          ctx.globalCompositeOperation = 'lighter'; halo(ctx, hd[0], hd[1], 22, 40, 90, 80, 0.45); ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = '#FFF6E4'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(hd[0], hd[1], 8, 0, TAU); ctx.stroke();
          ctx.textAlign = hd[0] > w - 70 ? 'right' : 'left';
          ctx.fillText('旅人', hd[0] + (hd[0] > w - 70 ? -14 : 14), hd[1] + 4);
          // 选中事件的两种读数
          const e = EV.find(o => o.id === st.sel), pe = P(e.x, e.t);
          ctx.setLineDash([3, 4]); ctx.lineWidth = 1;
          ctx.strokeStyle = api.hsl(H, 80, 75, 0.6); line(ctx, pe, P(0, e.t));
          const sp = (v * e.t - e.x) / (1 - v * v), Ts = e.t + sp * v;
          ctx.strokeStyle = 'rgba(255,246,228,.6)'; line(ctx, pe, P(v * Ts, Ts));
          ctx.setLineDash([]);
          dot(ctx, P(v * Ts, Ts)[0], P(v * Ts, Ts)[1], 2.5, '#FFF6E4');
          // 事件
          ctx.font = `12px ${FS}`;
          for (const o of EV) {
            const [x, y] = P(o.x, o.t), tp = tPrime(o, v);
            const fut = tp > 0.004, pst = tp < -0.004;
            const hh = fut ? H : pst ? 38 : 0, ss = fut ? 85 : pst ? 90 : 0;
            ctx.globalCompositeOperation = 'lighter'; halo(ctx, x, y, o.id === st.sel ? 28 : 18, hh, ss, 70, 0.6); ctx.globalCompositeOperation = 'source-over';
            dot(ctx, x, y, 4.5, '#FFF6E4');
            if (o.id === st.sel) { ctx.strokeStyle = 'rgba(255,246,228,.7)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 11, 0, TAU); ctx.stroke(); }
            const txt = `${o.id} · 旅人：${fut ? '将来' : pst ? '过去' : '同时'}`;
            ctx.fillStyle = fut ? api.hsl(H, 85, 80, 0.95) : pst ? api.hsl(38, 90, 72, 0.95) : '#FFF6E4';
            if (o.id === 'E') { ctx.textAlign = 'right'; ctx.fillText(txt, x - 14, y - 12); }
            else if (o.id === 'F') { ctx.textAlign = 'left'; ctx.fillText(txt, x + 14, y + 4); }
            else { ctx.textAlign = 'left'; ctx.fillText(txt, x + 12, y + 18); }
          }
        });
        updTable();

        await api.say(['这是一张**时空图**。中心是你的“此时此地”，你静止不动。',
          '光锥上方是绝对未来，下方是绝对过去，两侧叫“**别处**”。水平那条线，是你的“现在”。',
          '现在，让一位旅人从你身边飞过。他也有自己的“现在”。']);
        api.hint('左右拖动图面（或滑块）改变旅人的速度，让 E 在他看来变成“过去”。');
        await until(() => tPrime(EV[0], st.v) < -0.004);
        api.sfx('select');
        await api.say(['对你，E 尚未发生；对擦肩而过的他，E 已经发生。谁对？**都对**。',
          'E 在“别处”：连光都来不及从这里跑到 E。这样**类空**相隔的事件，先后取决于谁在看。']);
        api.collect('l09-simul');
        st.tryF = 0;
        api.hint('再试试：能不能让光锥里的 F 也变成“过去”？往两边推到最快试试。');
        await until(() => st.tryF >= 0.85);
        await api.say(['推不动吧。F 在你的未来光锥里，光来得及从你跑到它，两者**可能有因果联系**。',
          '凡是可能有因果联系的事件，先后对所有人都一样。这是**因果序**，它保住了。',
          '被取消的，是一个**全宇宙统一的“现在”**。时序从一条直线，退化成了一个偏序。']);
        api.collect('l09-cone');
        st.showS = true; st.travel = 0; updTable();
        api.hint('看下面的表：旅人量到的 Δt′、Δx′ 都在变。再拖一拖，哪一列纹丝不动？');
        await until(() => st.travel >= 0.8);
        await api.quiz({
          q: '不同观察者测得的 Δt、Δx 各不相同。哪个量，所有惯性系里的人算出来都一样？',
          options: [
            { t: 'Δt：两件事相隔多久', why: '刚才你亲手看到了：旅人量到的 Δt′ 随速度变化，甚至会变号。' },
            { t: 'Δx：两件事相隔多远', why: 'Δx′ 同样随观察者而变。' },
            { t: '**c²Δt² − Δx²**', ok: true, why: '对。这是**时空间隔**，闵可夫斯基 1908 年把相对论写成几何时的核心。它大于 0 叫类时，小于 0 叫类空，等于 0 叫类光。' },
            { t: 'c²Δt² + Δx²', why: '那是欧氏几何的写法。时空的“距离”里是一个**减号**，所以它可正可负，不同事件之间也可以为零。' },
          ],
        });
        api.collect('l09-interval');
        await api.say(['那个减号还让时空里的“直线”成了两点间**最长**的路。所以一直留在地球、走“直线”的弟弟老得最多。',
          '顺便一提：机器学习里的“闵可夫斯基距离”是 L^p 距离，p = 2 就是欧氏距离。同名，不同物。']);
      }

      /* ================================================ 幕三 · A 序列与 B 序列 */
      async function sceneSeries() {
        const s = scene(3, 'A 序列与 B 序列', '同一条时间线，两种读法。');
        const NAMES = ['秦', '汉', '唐', '宋', '今天', '明天', '百年后'], n = NAMES.length;
        const st = { sp: 4, tgt: 4, drag: false, mode: 'present', visited: new Set([4]), modes: new Set(['present']), lit: NAMES.map(() => 0.06) };
        const cv = api.canvas(s.stage, { style: 'display:block;width:100%;height:clamp(270px,46vh,420px);touch-action:pan-y;cursor:pointer' });
        const modesEl = api.el('div', { class: 'l09-modes' });
        const MODES = [['present', '现在主义'], ['grow', '生长块'], ['eternal', '永恒主义']];
        const mb = {};
        for (const [k, label] of MODES) { mb[k] = btn(label, '', () => setMode(k)); modesEl.append(mb[k]); }
        modesEl.hidden = true;
        const moveNow = d => { st.tgt = clamp(st.tgt + d, 0, n - 1); st.visited.add(st.tgt); api.sfx('tick'); };
        s.ctrls.append(btn('◂ 更早', '', () => moveNow(-1)), btn('更晚 ▸', '', () => moveNow(1)), modesEl);
        const note = api.el('p', { class: 'l09-note l09-in' });
        wrap.append(note);
        const NOTES = {
          present: '**现在主义**：只有聚光灯照到的那一刻存在。过去已逝，未来未至。',
          grow: '**生长块宇宙**：过去和现在真实，未来尚未存在，像一堵不断往上砌的墙（布罗德，1923）。',
          eternal: '**永恒主义**：所有时刻同样真实，像一卷完整的胶片。“现在”只是你所在的位置，就像“这里”。',
        };
        function setMode(k) {
          st.mode = k; st.modes.add(k); api.sfx('select');
          for (const [m] of MODES) mb[m].setAttribute('aria-pressed', m === k ? 'true' : 'false');
          note.innerHTML = api.fmt(NOTES[k]);
        }
        const geo = () => { const { w, h } = cv; const pad = Math.max(28, w * 0.07), step = (w - 2 * pad) / (n - 1); return { pad, step, y: h * 0.47, cw: Math.min(46, step * 0.6) }; };
        const pick = p => { const { pad, step } = geo(); st.sp = clamp((p.x - pad) / step, 0, n - 1); st.tgt = Math.round(st.sp); st.visited.add(st.tgt); };
        pointer(cv.canvas, {
          down(p) { st.drag = true; pick(p); api.sfx('tick'); return true; },
          move(p) { const before = st.tgt; pick(p); if (st.tgt !== before) api.sfx('tick'); },
          up() { st.drag = false; },
        });
        function litTarget(i) {
          const d = i - st.sp;
          if (st.mode === 'eternal') return 0.92;
          if (st.mode === 'grow') return d <= 0 ? 1 : Math.max(0.06, 1 - d * 1.8);
          return Math.max(0.06, 1 - Math.abs(d) * 1.8);
        }
        s.raf((t, dt) => {
          const { ctx, w, h } = cv, { pad, step, y, cw } = geo(), dts = dt / 1000;
          if (!st.drag) st.sp = R ? st.tgt : st.sp + (st.tgt - st.sp) * Math.min(1, dts * 10);
          for (let i = 0; i < n; i++) st.lit[i] = R ? litTarget(i) : st.lit[i] + (litTarget(i) - st.lit[i]) * Math.min(1, dts * 6);
          ctx.clearRect(0, 0, w, h);
          const hh = cw * 0.95, k = Math.round(st.sp), sx = pad + st.sp * step;
          ctx.font = `11px ${FM}`; ctx.fillStyle = 'rgba(162,173,196,.7)'; ctx.textAlign = 'left';
          ctx.fillText('A 序列 · 过去 / 现在 / 将来（会变）', 12, 18);
          ctx.fillText('B 序列 · 早于 / 晚于（不变）', 12, h - 12);
          // 聚光灯
          if (st.mode !== 'eternal') {
            const gr = ctx.createLinearGradient(0, 0, 0, y + hh);
            gr.addColorStop(0, api.hsl(H, 90, 85, 0)); gr.addColorStop(1, api.hsl(H, 90, 80, 0.26));
            ctx.fillStyle = gr; ctx.beginPath();
            ctx.moveTo(sx - 4, 0); ctx.lineTo(sx + 4, 0); ctx.lineTo(sx + cw * 0.95, y + hh); ctx.lineTo(sx - cw * 0.95, y + hh); ctx.closePath(); ctx.fill();
          }
          // 晶体
          for (let i = 0; i < n; i++) {
            const x = pad + i * step, L = st.lit[i];
            const pts = [[x, y - hh], [x + cw / 2, y - hh * 0.55], [x + cw / 2, y + hh * 0.55], [x, y + hh], [x - cw / 2, y + hh * 0.55], [x - cw / 2, y - hh * 0.55]];
            if (L > 0.12) { ctx.globalCompositeOperation = 'lighter'; halo(ctx, x, y, cw * 1.4, H, 85, 62, 0.32 * L); ctx.globalCompositeOperation = 'source-over'; }
            const fg = ctx.createLinearGradient(0, y - hh, 0, y + hh);
            fg.addColorStop(0, api.hsl(H, 85, 80, 0.6 * L)); fg.addColorStop(1, api.hsl(H, 80, 40, 0.25 * L));
            ctx.fillStyle = fg; ctx.beginPath(); pts.forEach((p, j) => (j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill();
            if (L < 0.12) ctx.setLineDash([3, 4]);
            ctx.strokeStyle = api.hsl(H, 85, 80, 0.22 + 0.68 * L); ctx.lineWidth = 1.2; ctx.stroke(); ctx.setLineDash([]);
            ctx.strokeStyle = api.hsl(H, 85, 92, 0.35 * L); ctx.beginPath(); ctx.moveTo(x, y - hh); ctx.lineTo(x, y + hh); ctx.stroke();
            const tense = i < k ? '过去' : i === k ? '现在' : '将来';
            ctx.font = `${i === k ? '500 ' : ''}12px ${FS}`; ctx.textAlign = 'center';
            ctx.fillStyle = i === k ? '#FFF6E4' : i < k ? api.hsl(38, 80, 72, 0.8) : api.hsl(H, 70, 80, 0.75);
            ctx.fillText(tense, x, y - hh - 12);
            ctx.font = `13px ${FS}`; ctx.fillStyle = `rgba(232,236,245,${0.45 + 0.5 * Math.min(1, L)})`;
            ctx.fillText(NAMES[i], x, y + hh + 20);
            if (i < n - 1) {
              const ay = y + hh + 40, xa = x + 9, xb = x + step - 9;
              ctx.strokeStyle = 'rgba(232,236,245,.42)'; ctx.lineWidth = 1;
              line(ctx, [xa, ay], [xb, ay]);
              ctx.beginPath(); ctx.moveTo(xb, ay); ctx.lineTo(xb - 5, ay - 3); ctx.lineTo(xb - 5, ay + 3); ctx.closePath(); ctx.fillStyle = 'rgba(232,236,245,.5)'; ctx.fill();
              ctx.font = `10px ${FS}`; ctx.fillStyle = 'rgba(162,173,196,.75)'; ctx.fillText('早于', (xa + xb) / 2, ay + 14);
            }
          }
          if (st.mode === 'eternal') {
            ctx.fillStyle = '#FFF6E4'; ctx.beginPath(); ctx.moveTo(sx, y + hh + 26); ctx.lineTo(sx - 5, y + hh + 33); ctx.lineTo(sx + 5, y + hh + 33); ctx.closePath(); ctx.fill();
          }
        });

        await api.say('1908 年，闵可夫斯基把时空写成了几何。同一年，英国哲学家麦克塔格特（McTaggart）把时间拆成了两种序列。');
        api.hint('拖动聚光灯（或点一块晶体），把“现在”移到别的时刻。');
        await until(() => st.visited.size >= 4);
        await api.say(['上面那排标签一直在变：过去、现在、将来。这是 **A 序列**，“时间在流逝”的感觉靠它。',
          '下面的“早于”一个都没动：秦早于汉，永远为真。这是 **B 序列**。',
          '相对论保留了 B 序列的大部分，也就是因果序；却让 A 序列里那个特殊的“现在”失去了物理依据。']);
        api.collect('l09-ab');
        await api.say('那么，到底什么是真实的？哲学家给过几种回答。');
        modesEl.hidden = false; setMode('present');
        api.hint('三种看法都切换试试，最后停在「永恒主义」。');
        await until(() => st.modes.size >= 3 && st.mode === 'eternal');
        await api.say(['整块晶体同时亮着：过去、现在、将来同样真实，“现在”只像“这里”。这就是**块宇宙**。',
          '相对论似乎站在它这边：擦肩而过的旅人，他的“现在”穿过了你的未来（里特代克、普特南）。',
          '但斯坦因（Stein）反驳：放弃统一的“现在”，不必放弃“生成”。相对论让现在主义尴尬，却没有一锤定音。']);
        api.collect('l09-block');
        await api.quiz({
          kicker: '“时间不存在”的三种读法',
          q: '强度递增、可靠程度递减。哪一种是狭义相对论的直接结论，没有争议？',
          options: [
            { t: '**不存在绝对时间**：没有一个对所有观察者都相同的“宇宙钟”', ok: true, why: '对。你在上一幕亲手倾斜过“现在”。' },
            { t: '**不存在流逝和特殊的“现在”**：所有时刻同样真实', why: '这是块宇宙观点，支持者众多，但仍有争议。爱因斯坦晚年在悼念老友的信里写过，大意是：过去、现在、将来的区分只是一种顽固的错觉。' },
            { t: '**时间不是基本的，而是涌现的**', why: '最强、也最具推测性：惠勒–德威特方程里没有时间变量，佩奇–伍特斯、巴伯、罗韦利各有设想，都还没有实验检验。另外，涌现不等于虚幻：温度也是涌现的，开水照样烫手。' },
          ],
        });
      }

      /* ================================================ 幕四 · 旋火轮 */
      async function sceneWheel() {
        const s = scene(4, '旋火轮', '一支火把。让它转起来。');
        const PERSIST = 0.55, THR = 0.35; // 残影衰减时间（秒）；最暗处亮度达到 THR 视为火圈闭合
        const st = { ang: -Math.PI / 2, om: 0, drag: false, last: null, lastMove: 0, eye: false, closedT: 0, ring: false, eyeUsed: false, bP: 0, rd: 0 };
        const cv = api.canvas(s.stage, { style: 'display:block;width:100%;height:clamp(300px,52vh,480px);touch-action:none;cursor:grab' });
        let bPush = null;
        if (R) slider(s.ctrls, { label: '转速', min: 0, max: 20, step: 0.1, value: 0, fmt: v => (v / TAU).toFixed(2) + ' 圈/秒', oninput: v => { st.om = v; } });
        else {
          bPush = btn('推一把', 'hue', () => { const sg = st.om < 0 ? -1 : 1; st.om = clamp(st.om + sg * 3.2, -24, 24); api.sfx('tick'); });
          s.ctrls.append(bPush);
        }
        const bEye = btn('按住：刹那之眼', 'l09-hold', null);
        bEye.hidden = true; s.ctrls.append(bEye);
        const eyeOn = e => { if (e && e.preventDefault) e.preventDefault(); if (!st.eye) api.sfx('select'); st.eye = true; bEye.setAttribute('aria-pressed', 'true'); };
        const eyeOff = () => { st.eye = false; bEye.setAttribute('aria-pressed', 'false'); };
        api.listen(bEye, 'pointerdown', e => { eyeOn(e); try { bEye.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } });
        api.listen(bEye, 'pointerup', eyeOff); api.listen(bEye, 'pointercancel', eyeOff); api.listen(bEye, 'lostpointercapture', eyeOff);
        api.listen(bEye, 'keydown', e => { if (e.key === ' ' || e.key === 'Enter') eyeOn(e); });
        api.listen(bEye, 'keyup', e => { if (e.key === ' ' || e.key === 'Enter') eyeOff(); });
        api.listen(bEye, 'contextmenu', e => e.preventDefault());
        const read = api.el('div', { class: 'l09-read l09-in' });
        wrap.append(read);

        const geo = () => { const { w, h } = cv; return { cx: w / 2, cy: h / 2 - 6, r: Math.min(w, h) * 0.32 }; };
        pointer(cv.canvas, {
          down(p, e) {
            if (R) return false;
            const { cx, cy } = geo();
            st.drag = true; st.last = { a: Math.atan2(p.y - cy, p.x - cx), t: e.timeStamp }; st.lastMove = performance.now();
            return true;
          },
          move(p, e) {
            const { cx, cy } = geo();
            if (Math.hypot(p.x - cx, p.y - cy) < 10) return;
            const a = Math.atan2(p.y - cy, p.x - cx);
            let d = a - st.last.a;
            while (d > Math.PI) d -= TAU;
            while (d < -Math.PI) d += TAU;
            const dtm = Math.max(8, e.timeStamp - st.last.t) / 1000;
            st.ang += d; st.om = clamp(st.om * 0.6 + (d / dtm) * 0.4, -24, 24);
            st.last = { a, t: e.timeStamp }; st.lastMove = performance.now();
          },
          up() { st.drag = false; },
        });
        const bmin = lam => { if (lam < 0.05) return 0; const q = Math.exp(-TAU / lam); return q / (1 - q); };

        s.raf((t, dt) => {
          const { ctx, w, h } = cv, { cx, cy, r } = geo(), dts = dt / 1000;
          if (!R) {
            if (st.drag) { if (performance.now() - st.lastMove > 80) st.om *= Math.exp(-8 * dts); }
            else { st.om *= Math.exp(-0.22 * dts); st.ang += st.om * dts; }
          }
          const tau = st.eye ? 0.025 : PERSIST;
          const lam = Math.abs(st.om) * tau;
          st.bP = bmin(Math.abs(st.om) * PERSIST);
          const closed = !st.eye && st.bP >= THR;
          st.closedT = closed ? st.closedT + dts : 0;
          if (st.closedT >= 0.8) st.ring = true;
          if (st.eye && st.ring && st.bP >= 0.15) st.eyeUsed = true;

          ctx.clearRect(0, 0, w, h);
          ctx.strokeStyle = 'rgba(190,206,240,.07)'; ctx.lineWidth = 1; ctx.setLineDash([2, 7]);
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke(); ctx.setLineDash([]);
          const hx = cx + Math.cos(st.ang) * r, hy = cy + Math.sin(st.ang) * r;
          ctx.strokeStyle = 'rgba(190,206,240,.28)'; ctx.lineWidth = 2; line(ctx, [cx, cy], [hx, hy]);
          ctx.strokeStyle = 'rgba(190,206,240,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, TAU); ctx.stroke();
          // 残影：落后 θ 弧度处的亮度 ∝ Σ e^{-(θ+2πn)/λ}
          ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
          if (lam > 0.02) {
            const q = Math.exp(-TAU / lam), norm = 1 / (1 - q), N = 120, sg = st.om >= 0 ? 1 : -1;
            for (let i = 0; i < N; i++) {
              const th0 = i / N * TAU, th1 = (i + 1) / N * TAU;
              const b = Math.min(1, Math.exp(-th0 / lam) * norm);
              if (b < 0.01) break;
              const a0 = st.ang - sg * th0, a1 = st.ang - sg * th1;
              ctx.strokeStyle = api.hsl(H, 90, 66, 0.12 * b); ctx.lineWidth = 18;
              ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1, sg > 0); ctx.stroke();
              ctx.strokeStyle = api.hsl(42, 100, 90, 0.8 * b); ctx.lineWidth = 3;
              ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1, sg > 0); ctx.stroke();
            }
          }
          const fl = R ? 0 : Math.sin(t * 0.031) * 1.5 + Math.sin(t * 0.017) * 1.2;
          halo(ctx, hx, hy, 34 + fl, H, 90, 66, 0.55);
          halo(ctx, hx, hy, 14 + fl * 0.5, 42, 100, 85, 0.9);
          ctx.globalCompositeOperation = 'source-over';
          dot(ctx, hx, hy, 4.5, '#FFFFFF');
          ctx.font = `14px ${FSERIF}`; ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(232,236,245,.75)';
          const cap = st.eye ? '刹那之眼：此刻，只有一个火点' : closed ? '眼睛看见：一个完整的火圈' : '';
          if (cap) ctx.fillText(cap, cx, Math.min(h - 14, cy + r + 40));
          st.rd += dts;
          if (st.rd > 0.12) {
            st.rd = 0;
            read.innerHTML = `<span>转速 <b>${(Math.abs(st.om) / TAU).toFixed(2)}</b> 圈/秒</span><span>残影闭合 <b>${Math.min(100, Math.round(st.bP / THR * 100))}%</b></span>`;
          }
        });

        await api.say('最后一站，往东走。佛典里有一个常见的譬喻，叫**旋火轮**。');
        api.hint(R ? '把转速推上去，看残影会连成什么。' : '拖着火把绕圈转，或连按「推一把」，让它越转越快。');
        await until(() => st.ring);
        api.sfx('chime');
        await api.say('一个完整的火圈。可是，每一瞬间，那里只有一个火点。');
        bEye.hidden = false;
        api.hint('趁它还在转，按住「刹那之眼」，只看此刻。（慢下来了就再推一把。）');
        await until(() => st.eyeUsed);
        await api.say(['圈是眼睛拼出来的：上一刻的残影还没褪，下一个火点又到了。',
          '佛家以此讲**刹那灭**：一切现象生起即灭，“持续存在”只是一串相续的刹那。']);
        api.collect('l09-wheel');
        await api.say(['《大智度论》的“十喻”里还有一喻：**如水中月**。月本在天上，水里只有它的影子。',
          '佛教内部也争过：说一切有部主张“三世实有”，经量部则说过去已灭、未来未生。',
          '但别说“佛经早就知道相对论”：块宇宙说所有时刻同样真实，刹那灭说只有此刹那，方向几乎相反。',
          '一千六百年前，奥古斯丁写道：时间是什么？没人问我，我倒清楚；有人问我，我想解释，却茫然不解了。',
          '现在若有人问你，你至少能拆开说三层了。']);
      }

      /* ================================================ 流程 */
      (async () => {
        api.progress(0, 4);
        await sceneTwins(); api.progress(1, 4);
        await sceneCone(); api.progress(2, 4);
        await sceneSeries(); api.progress(3, 4);
        await sceneWheel(); api.progress(4, 4);
        api.complete({ summary: '相对论推翻了**绝对时间**和全宇宙统一的“现在”，却保住了**因果序**和不变的时空间隔；“现在”是否特殊、时间是否基本，仍在争论。' });
      })();

      return () => { if (cur) cur.end(); };
    },
  });
})();

/* 透镜群岛 · 终章 · 白光 */
(function () {
  'use strict';
  const QUESTIONS = [
    ['否定性知识如何可能？', '如果你只知道一个东西“不是什么”，什么时候才算真正知道了它？'],
    ['AI 的话，凭什么信？', '当说话者不是一个“主体”时，信任的根据在哪里？'],
    ['数学语言该为谁服务？', '如果最懂一种数学语言的是 AI，人类还“拥有”这部分数学吗？'],
    ['对齐到谁的价值？', '阿罗定理之后，“人类的价值”还能被当作一个整体吗？'],
    ['时间以哪种方式“不存在”？', '没有绝对的现在、没有流逝、还是根本不是基本的？'],
    ['透镜在哪里？', '是语言在折射世界，还是我们自己就是那面透镜？'],
  ];

  Lens.registerLevel({
    id: 'fin', no: 12, name: '白光', subtitle: '重新汇合', continent: 'logic', steps: 3, cards: [],
    mount(root, api) {
      const { el } = api;
      const ORDER = Lens.ORDER, HUES = Lens.HUES;
      api.css(`
        .fin-stage{position:relative;max-width:980px;margin:0 auto;padding-top:18px;display:grid;gap:18px}
        .fin-cv{width:100%;height:min(62vh,560px);display:block;border-radius:24px}
        .fin-cap{text-align:center;display:grid;gap:8px;justify-items:center}
        .fin-cap .k{font-family:var(--f-mono);font-size:11px;letter-spacing:.24em;color:var(--dim)}
        .fin-cap h2{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(30px,6vw,52px);line-height:1.1;text-wrap:balance}
        .fin-cap p{margin:0;font-family:var(--f-serif);color:var(--dim);max-width:560px;text-wrap:pretty}
        .fin-hold{position:relative;overflow:hidden;min-width:220px;touch-action:none;user-select:none;-webkit-user-select:none}
        .fin-hold .fill{position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,#ff6b6b,#ffd166,#7ae582,#4cc9f0,#b388ff);opacity:.35;pointer-events:none}
        .fin-hold span{position:relative}
        .fin-tip{position:absolute;pointer-events:none;transform:translate(-50%,-130%);background:var(--panel-solid);border:1px solid var(--line-strong);border-radius:10px;padding:6px 10px;font-family:var(--f-display);font-size:16px;white-space:nowrap}
        .fin-qs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
        .fin-q{text-align:left;border-radius:16px;border:1px solid var(--line);background:rgba(255,255,255,.025);padding:16px 16px 14px;cursor:pointer;display:grid;gap:6px;transition:border-color .3s,background .3s,box-shadow .3s}
        .fin-q .t{font-family:var(--f-display);font-size:21px;line-height:1.25}
        .fin-q .d{font-family:var(--f-serif);color:var(--dim);font-size:14px;line-height:1.7}
        .fin-q.lit{border-color:hsl(var(--h) 85% 70% / .8);background:hsl(var(--h) 80% 55% / .1);box-shadow:0 0 28px hsl(var(--h) 85% 60% / .25)}
        .fin-credits{text-align:center;display:grid;gap:10px;justify-items:center;font-family:var(--f-serif);color:var(--dim);max-width:600px;margin:0 auto}
        .fin-credits b{color:var(--text);font-weight:600}
        .fin-row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
      `);
      const stageEl = el('div', { class: 'fin-stage' });
      root.append(stageEl);
      const view = api.canvas(stageEl, { class: 'fin-cv' });
      const cap = el('div', { class: 'fin-cap' });
      stageEl.append(cap);
      const setCap = (k, h, p, ...extra) => { cap.replaceChildren(...[el('div', { class: 'k', text: k }), el('h2', { text: h }), p ? el('p', { text: p }) : null, ...extra].filter(Boolean)); };

      /* ---------- scene 1: reunite the beam ---------- */
      let conv = 0, target = 0, mode = 'rays', boat = null, sway = 0;
      const hues = ORDER.map(id => HUES[id]);
      const done = ORDER.filter(id => Lens.state.done[id]);

      function drawRays(t) {
        const { ctx, w, h } = view; const cx = w / 2, cy = h / 2, R = Math.hypot(w, h) * 0.6;
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        hues.forEach((hh, i) => {
          const ang = Math.PI + (i - 5) * 0.11 * (1 - conv) + Math.sin(t * 0.0006 + i) * 0.01 * (1 - conv);
          const sx = cx + Math.cos(ang) * R, sy = cy + Math.sin(ang) * R * 0.9;
          const ex = cx - 8 * (1 - conv), ey = cy + (i - 5) * 9 * (1 - conv);
          const g = ctx.createLinearGradient(sx, sy, ex, ey);
          g.addColorStop(0, `hsl(${hh} 95% 62% / 0)`); g.addColorStop(1, `hsl(${hh} 95% 64% / .95)`);
          ctx.strokeStyle = g; ctx.lineWidth = 2.2; ctx.shadowColor = `hsl(${hh} 95% 60%)`; ctx.shadowBlur = 14;
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
        });
        if (conv > 0.02) {
          const L = w - cx; const g = ctx.createLinearGradient(cx, cy, w, cy);
          g.addColorStop(0, `rgba(255,246,228,${0.95 * conv})`); g.addColorStop(1, 'rgba(255,246,228,0)');
          ctx.strokeStyle = g; ctx.shadowColor = '#fff6e4'; ctx.shadowBlur = 30 * conv; ctx.lineWidth = 2 + 4 * conv;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + L, cy); ctx.stroke();
          const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 + 120 * conv);
          rg.addColorStop(0, `rgba(255,250,236,${0.8 * conv})`); rg.addColorStop(1, 'rgba(255,250,236,0)');
          ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(cx, cy, 60 + 120 * conv, 0, 6.283); ctx.fill();
        }
        ctx.restore();
      }

      /* ---------- scene 2: Neurath's boat ---------- */
      function boatPlanks(w, h) {
        const items = [];
        const defs = Lens.levelDefs();
        defs.forEach(d => (d.cards || []).forEach(c => items.push({ c, hue: HUES[d.id], got: !!Lens.state.cards[c.id] })));
        const rows = 6, hullW = Math.min(w * 0.78, 640), hullH = Math.min(h * 0.32, 170), x0 = w / 2 - hullW / 2, y0 = h * 0.5;
        const perRow = Math.max(1, Math.ceil(items.length / rows));
        const planks = [];
        for (let r = 0; r < rows; r++) {
          const yTop = y0 + (r / rows) * hullH, yBot = y0 + ((r + 1) / rows) * hullH;
          const inset = (k) => hullW * 0.5 * (1 - Math.sqrt(Math.max(0, 1 - Math.pow(k, 2.2)))) ;
          const inT = inset(r / rows) + hullW * 0.02 * r, inB = inset((r + 1) / rows) + hullW * 0.02 * (r + 1);
          const segs = items.slice(r * perRow, (r + 1) * perRow);
          const n = Math.max(1, segs.length);
          for (let k = 0; k < n; k++) {
            const it = segs[k];
            const fl = (k / n), fr = ((k + 1) / n);
            const xTL = x0 + inT + (hullW - 2 * inT) * fl, xTR = x0 + inT + (hullW - 2 * inT) * fr;
            const xBL = x0 + inB + (hullW - 2 * inB) * fl, xBR = x0 + inB + (hullW - 2 * inB) * fr;
            planks.push({ it, pts: [[xTL + 1, yTop + 1], [xTR - 1, yTop + 1], [xBR - 1, yBot - 1], [xBL + 1, yBot - 1]] });
          }
        }
        return { planks, x0, y0, hullW, hullH };
      }
      function drawBoat(t) {
        const { ctx, w, h } = view;
        if (!boat || boat.w !== w || boat.h !== h) { boat = Object.assign(boatPlanks(w, h), { w, h }); }
        const bob = Math.sin(t * 0.0012) * 4 * (api.reduced ? 0 : 1), tilt = Math.sin(t * 0.0009) * 0.02 * (api.reduced ? 0 : 1);
        ctx.save(); ctx.translate(w / 2, boat.y0 + bob); ctx.rotate(tilt); ctx.translate(-w / 2, -boat.y0);
        // mast + sail of light
        const mx = w / 2, top = boat.y0 - Math.min(h * 0.38, 210);
        ctx.strokeStyle = 'rgba(255,246,228,.75)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx, boat.y0); ctx.lineTo(mx, top); ctx.stroke();
        const sg = ctx.createLinearGradient(mx, top, mx + 140, boat.y0);
        sg.addColorStop(0, 'rgba(255,246,228,.32)'); sg.addColorStop(1, 'rgba(255,246,228,.04)');
        ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(mx + 4, top + 8); ctx.quadraticCurveTo(mx + Math.min(w * 0.22, 170), (top + boat.y0) / 2, mx + 6, boat.y0 - 14); ctx.closePath(); ctx.fill();
        // planks
        ctx.globalCompositeOperation = 'lighter';
        boat.planks.forEach((p, i) => {
          const it = p.it; const lit = it && it.got; const hh = it ? it.hue : 0;
          ctx.beginPath(); p.pts.forEach((q, j) => j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath();
          if (lit) { ctx.fillStyle = `hsl(${hh} 85% ${58 + 6 * Math.sin(t * 0.002 + i)}% / .72)`; ctx.shadowColor = `hsl(${hh} 90% 60%)`; ctx.shadowBlur = p === hover ? 22 : 8; }
          else { ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.shadowBlur = 0; }
          ctx.fill();
          ctx.shadowBlur = 0; ctx.strokeStyle = p === hover ? '#fff' : 'rgba(255,255,255,.12)'; ctx.lineWidth = p === hover ? 1.6 : 0.8; ctx.stroke();
        });
        ctx.restore();
        // sea
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        for (let k = 0; k < 7; k++) {
          const y = boat.y0 + boat.hullH * 0.62 + k * 12;
          ctx.strokeStyle = `hsl(${hues[(k * 2) % 11]} 80% 62% / ${0.22 - k * 0.025})`; ctx.lineWidth = 1.2;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 12) { const yy = y + Math.sin(x * 0.02 + t * 0.0016 * (api.reduced ? 0 : 1) + k) * 3.5; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
          ctx.stroke();
        }
        ctx.restore();
      }
      let hover = null; const tip = el('div', { class: 'fin-tip', hidden: true }); stageEl.append(tip);
      const inPoly = (x, y, pts) => { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; };
      api.listen(view.canvas, 'pointermove', e => {
        if (mode !== 'boat' || !boat) return;
        const r = view.canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        hover = boat.planks.find(p => inPoly(x, y, p.pts)) || null;
        if (hover && hover.it) {
          tip.hidden = false; tip.textContent = hover.it.got ? hover.it.c.title : '一块还没换上的木板';
          const sr = stageEl.getBoundingClientRect(); tip.style.left = (e.clientX - sr.left) + 'px'; tip.style.top = (e.clientY - sr.top) + 'px';
        } else tip.hidden = true;
      });
      api.listen(view.canvas, 'pointerleave', () => { hover = null; tip.hidden = true; });

      api.raf((t) => {
        const { ctx, w, h } = view; ctx.clearRect(0, 0, w, h);
        conv += (target - conv) * 0.05;
        if (mode === 'rays') drawRays(t); else drawBoat(t);
      });

      const holdUntilFull = () => new Promise(res => {
        const b = el('button', { class: 'btn primary fin-hold', type: 'button' }, el('div', { class: 'fill' }), el('span', { text: '按住，让光汇合' }));
        const fill = b.querySelector('.fill');
        let p = 0, holding = false;
        const down = e => { holding = true; b.setPointerCapture && e.pointerId != null && b.setPointerCapture(e.pointerId); };
        const up = () => { holding = false; };
        b.addEventListener('pointerdown', down); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up);
        b.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); holding = true; } });
        b.addEventListener('keyup', () => { holding = false; });
        cap.append(b);
        api.raf((t, dt) => {
          p = Math.max(0, Math.min(1, p + (holding ? dt / 2600 : -dt / 4000)));
          target = p; fill.style.width = (p * 100) + '%';
          if (p >= 1) { b.remove(); res(); return false; }
        });
      });

      (async () => {
        api.progress(0, 3);
        setCap('FINALE', '十一种颜色', done.length === 11 ? '你身上带着十一种颜色。它们来自十一面透镜，曾经被一次次分开。' : '还有透镜没有点亮，不过光可以先汇合一次。');
        await api.say(['你出发的时候是一束白光，什么颜色都有，只是没有被分开。', '现在，十一种颜色都被分开过、命名过、照亮过了。']);
        api.hush();
        await holdUntilFull();
        api.sfx('refract');
        setCap('FINALE', '白光', '还是白光。可它已经不是出发时的那束白光了：它知道了自己是由什么组成的。');
        await api.say(['还是白光。可这一次，你知道它由什么组成。', '这大概就是“学”的意思：世界没有变，透过它看世界的那双眼睛变了。']);
        api.progress(1, 3);

        // scene 2
        mode = 'boat'; boat = null;
        const nGot = Object.keys(Lens.state.cards).length;
        setCap('NEURATH’S BOAT', '在海上修船', `这艘船的每一块木板，都是旅途中你照见的一个概念。你已经换上了 ${nGot} 块。把指针移到木板上看看。`);
        await api.say(['哲学家纽拉特说，我们像水手一样，只能在海上修自己的船，没法把它开回船坞拆了重造。', '你这一路做的就是这件事：把“自由”拆成四块，把“平等”拆成两块，把“否定”换成好几种。']);
        await api.say('那些暗着的木板也不要紧，下次出海再换。');
        api.hush();
        const nextBtn = el('button', { class: 'btn hue', type: 'button', text: '继续' });
        cap.append(nextBtn);
        await new Promise(r => nextBtn.addEventListener('click', r, { once: true }));
        api.progress(2, 3);

        // scene 3: questions to carry
        mode = 'rays'; target = 1;
        const qs = el('div', { class: 'fin-qs' });
        let lit = 0;
        QUESTIONS.forEach(([t, d], i) => {
          const b = el('button', { class: 'fin-q', type: 'button', style: `--h:${hues[(i * 2) % 11]}` }, el('div', { class: 't', text: t }), el('div', { class: 'd', text: d }));
          b.addEventListener('click', () => { if (b.classList.contains('lit')) return; b.classList.add('lit'); lit += 1; api.sfx('chime'); if (lit === QUESTIONS.length) ready(); });
          qs.append(b);
        });
        setCap('TO CARRY', '带走的问题', '旅程结束了，问题没有结束。把它们一盏一盏点亮，带回去。', qs);
        await api.say('一本书合上之后，最值得留下的，往往是那些还没有答案的问题。');
        api.hush();
        let ready;
        await new Promise(r => { ready = r; });
        api.progress(3, 3);

        // credits
        const resetBtn = el('button', { class: 'btn', type: 'button', text: '重新开始旅程' });
        let armed = false;
        resetBtn.addEventListener('click', () => {
          if (!armed) { armed = true; resetBtn.textContent = '再点一次：清空进度和图鉴'; return; }
          Lens.reset();
        });
        const credits = el('div', { class: 'fin-credits' },
          el('p', { html: api.fmt('**透镜群岛**改编自《语言是一面透镜》，一份关于语言、逻辑、价值与物理的精读笔记。') }),
          el('p', { html: api.fmt('一路陪你的镜灵由一个 AI 扮演。按最后一面透镜的标准，它说过的每一句话都是**证言**：值得一听，也值得查证。') }),
          el('div', { class: 'fin-row' }, el('button', { class: 'btn primary', type: 'button', text: '回到群岛', onclick: () => api.exit() }), el('button', { class: 'btn', type: 'button', text: '打开图鉴', onclick: () => Lens.go('codex') }), resetBtn));
        setCap('THANK YOU', '谢谢你走完这段路', null, credits);
        await api.say('谢谢你，白光。去照亮点什么吧。');
      })();
    },
  });
})();

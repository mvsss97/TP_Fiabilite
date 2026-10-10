/* Module Fiabilité : exercices intégrés au cours (calc, choix, relier) et simulateurs de probabilités. */
(function () {
  const R = window.REV;
  const nf = (x, d = 4) => { if (!isFinite(x)) return '—'; const a = Math.abs(x); if (a !== 0 && a < 1e-4) return x.toExponential(2).replace('.', ',').replace('e', ' × 10^'); return (Math.round(x * 10 ** d) / 10 ** d).toString().replace('.', ','); };
  const pc = x => nf(x * 100, 2) + ' %';
  const cadre = (el, titre, corps) => { el.className = 'lab'; el.innerHTML = `<h4>Simulateur</h4><div class="ttl">${titre}</div>${corps}`; return s => el.querySelector(s); };
  const fr = (a, b) => `<span class="fr"><span>${a}</span><span>${b}</span></span>`;
  const comb = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const fact = n => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
  const melange = t => { const a = t.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const lire = s => {
    s = String(s).trim().replace(/\s/g, '').replace(/,/g, '.').replace(/[x×*]10\^?\(?(-?\d+)\)?/i, 'e$1');
    let p = false; if (s.endsWith('%')) { p = true; s = s.slice(0, -1); }
    const m = s.match(/^(-?[\d.]+)\/([\d.]+)$/); let v;
    if (m) v = +m[1] / +m[2]; else if (/^-?(\d+\.?\d*|\.\d+)(e-?\d+)?$/i.test(s)) v = +s; else return NaN;
    return p ? v / 100 : v;
  };
  const extrait = (el, sel) => { const x = el.querySelector(sel); if (!x) return ''; const h = x.innerHTML; x.remove(); return h; };

  const L = R.labs = {};
  R.labsMeta = [['deux', 'Deux événements A et B'], ['arbre', 'Arbre de probabilités et Bayes'], ['discret', 'Lois discrètes'], ['expo', 'Loi exponentielle'], ['montage', 'Série, parallèle, 2 sur 3']];

  /* ===== exercice de calcul : l'étudiant tape sa réponse ===== */
  L.calc = el => {
    const r = lire(el.dataset.r), u = el.dataset.u || '', alt = (el.dataset.alt || '').split(';').filter(Boolean).map(lire);
    const tol = el.dataset.tol ? +el.dataset.tol : Math.abs(r) * 0.02 + 1e-9;
    const sol = extrait(el, '.sol'), ind = extrait(el, '.ind'), enonce = el.innerHTML;
    el.className = 'exo pra';
    el.innerHTML = `<div class="lvl">À toi · calcul</div>${enonce}
      <div class="ctl"><input type="text" inputmode="decimal" placeholder="ta réponse" aria-label="Ta réponse">${u ? `<span>${u}</span>` : ''}<button class="btn sm pri" data-v>Vérifier</button>${ind ? '<button class="btn sm" data-i>Indice</button>' : ''}</div>
      <div data-fb></div><details><summary>Voir la solution expliquée</summary>${sol}</details>`;
    const inp = el.querySelector('input'), fb = el.querySelector('[data-fb]'); let essais = 0;
    const verif = () => {
      const v = lire(inp.value);
      if (isNaN(v)) { fb.innerHTML = '<div class="fb ko">Écris un nombre : 0,135 · 13,5 % · 1/14 · 1,1e-4 sont acceptés.</div>'; return; }
      const proche = x => Math.abs(v - x) <= tol || (!u && x > 0 && x <= 1 && Math.abs(v / 100 - x) <= tol);
      const ok = proche(r) || alt.some(a => Math.abs(v - a) <= Math.abs(a) * 0.02 + 1e-9);
      inp.className = ok ? 'ok' : 'ko'; essais++;
      fb.innerHTML = ok ? `<div class="fb ok"><b>Juste.</b> Valeur attendue : ${el.dataset.aff || nf(r, Math.abs(r) < 1 ? 4 : 2)}${u ? ' ' + u : ''}. Ouvre la solution pour comparer ta rédaction.</div>`
        : `<div class="fb ko"><b>Pas encore.</b> ${essais >= 2 ? 'Ouvre la solution, repère l’étape qui diffère, puis refais le calcul sans regarder.' : 'Vérifie la formule choisie, puis les arrondis.' + (ind ? ' Tu peux demander un indice.' : '')}</div>`;
    };
    el.querySelector('[data-v]').onclick = verif;
    inp.onkeydown = e => { if (e.key === 'Enter') verif(); };
    if (ind) el.querySelector('[data-i]').onclick = () => { fb.innerHTML = `<div class="fb" style="background:var(--amb-soft)"><b>Indice.</b> ${ind}</div>`; };
  };

  /* ===== question de cours à choix (une ou plusieurs bonnes réponses) ===== */
  L.choix = el => {
    const bon = el.dataset.a.split(',').map(Number), multi = bon.length > 1;
    const sol = extrait(el, '.sol'), ul = el.querySelector('ul'), opts = [...ul.children].map(li => li.innerHTML); ul.remove();
    const enonce = el.innerHTML;
    el.className = 'exo pra';
    el.innerHTML = `<div class="lvl">À toi · question de cours${multi ? ' · plusieurs réponses' : ''}</div>${enonce}
      ${opts.map((o, i) => `<button class="cho" data-k="${i}">${o}</button>`).join('')}
      ${multi ? '<div class="ctl"><button class="btn sm pri" data-v>Vérifier</button></div>' : ''}<div data-fb></div>`;
    const bs = [...el.querySelectorAll('.cho')], fb = el.querySelector('[data-fb]');
    const fin = choisis => {
      const ok = choisis.length === bon.length && choisis.every(k => bon.includes(k));
      bs.forEach((b, i) => { b.disabled = true; b.classList.remove('sel'); if (bon.includes(i)) b.classList.add('ok'); else if (choisis.includes(i)) b.classList.add('ko'); });
      fb.innerHTML = `<div class="fb ${ok ? 'ok' : 'ko'}"><b>${ok ? 'Juste.' : 'Non.'}</b> ${sol}</div><div class="ctl"><button class="btn sm" data-re>Réessayer</button></div>`;
      el.querySelector('[data-re]').onclick = () => { bs.forEach(b => { b.disabled = false; b.className = 'cho'; }); fb.innerHTML = ''; };
    };
    bs.forEach((b, i) => b.onclick = () => { if (multi) b.classList.toggle('sel'); else fin([i]); });
    if (multi) el.querySelector('[data-v]').onclick = () => fin(bs.map((b, i) => b.classList.contains('sel') ? i : -1).filter(i => i >= 0));
  };

  /* ===== relier chaque terme à sa définition (format du QCM du prof) ===== */
  L.relier = el => {
    const dl = el.querySelector('dl'), g = [...dl.querySelectorAll('dt')].map(x => x.innerHTML), d = [...dl.querySelectorAll('dd')].map(x => x.innerHTML); dl.remove();
    const enonce = el.innerHTML;
    el.className = 'exo pra';
    const dessine = () => {
      const ordre = melange(d.map((_, i) => i).filter(i => d.indexOf(d[i]) === i));
      el.innerHTML = `<div class="lvl">À toi · relier</div>${enonce}
        ${g.map((t, i) => `<div class="rl" data-i="${i}"><b>${t}</b><select aria-label="${t.replace(/<[^>]+>/g, '')}"><option value="-1">— choisir —</option>${ordre.map(j => `<option value="${j}">${d[j].replace(/<[^>]+>/g, '')}</option>`).join('')}</select></div>`).join('')}
        <div class="ctl"><button class="btn sm pri" data-v>Vérifier</button><button class="btn sm" data-re>Mélanger et recommencer</button></div><div data-fb></div>`;
      el.querySelector('[data-re]').onclick = dessine;
      el.querySelector('[data-v]').onclick = () => {
        let ok = 0;
        el.querySelectorAll('.rl').forEach(row => {
          const i = +row.dataset.i, v = +row.querySelector('select').value, juste = d[v] === d[i];
          row.classList.remove('ok', 'ko'); row.classList.add(juste ? 'ok' : 'ko'); if (juste) ok++;
          const old = row.querySelector('small'); if (old) old.remove();
          if (!juste) row.insertAdjacentHTML('beforeend', `<small>→ ${d[i]}</small>`);
        });
        el.querySelector('[data-fb]').innerHTML = `<div class="fb ${ok === g.length ? 'ok' : 'ko'}"><b>${ok} / ${g.length}</b>${ok === g.length ? ' — tout est juste.' : ' — les bonnes définitions sont affichées en vert sous les lignes fausses. Recommence jusqu’à faire un sans-faute.'}</div>`;
      };
    };
    dessine();
  };

  /* ===== 1. Deux événements ===== */
  L.deux = el => {
    const $ = cadre(el, 'Deux événements A et B : tout retrouver à partir de trois données', `
      <div class="ctl"><label>Exemple <select id="pre"><option value="">— libre —</option><option value="0.10;0.20;n;0.75">Devoir 2024 : défauts T1 et T2</option><option value="0.20;0.25;n;0.70">Devoir 2022 : pannes A et B</option><option value="0.02;0.05;d;0">Devoir 2023 : A et B indépendants</option></select></label></div>
      <div class="ctl"><label>P(A) <input type="number" id="a" min="0" max="1" step="0.01" value="0.10"></label>
      <label>P(B) <input type="number" id="b" min="0" max="1" step="0.01" value="0.20"></label>
      <label>Je connais aussi <select id="ty"><option value="n">P(ni A ni B)</option><option value="u">P(A ∪ B)</option><option value="i">P(A ∩ B)</option><option value="d">A et B indépendants</option></select></label>
      <label id="lv">= <input type="number" id="v" min="0" max="1" step="0.01" value="0.75"></label></div>
      <div id="o"></div>`);
    const maj = () => {
      const a = +$('#a').value, b = +$('#b').value, ty = $('#ty').value, v = +$('#v').value;
      $('#lv').style.display = ty === 'd' ? 'none' : '';
      const i = ty === 'i' ? v : ty === 'u' ? a + b - v : ty === 'n' ? a + b - (1 - v) : a * b;
      if (!(a >= 0 && a <= 1 && b >= 0 && b <= 1) || i < Math.max(0, a + b - 1) - 1e-9 || i > Math.min(a, b) + 1e-9) { $('#o').innerHTML = `<p class="out" style="color:var(--red)">Données incohérentes : avec ces valeurs, P(A ∩ B) vaudrait ${nf(i)}, or elle doit rester entre ${nf(Math.max(0, a + b - 1))} et ${nf(Math.min(a, b))}.</p>`; return; }
      const u = a + b - i, seg = [['A seul', a - i, 'var(--acc)'], ['A et B', i, 'var(--amb)'], ['B seul', b - i, 'var(--blue)'], ['ni A ni B', 1 - u, 'var(--line)']];
      const ind = Math.abs(i - a * b) < 1e-9;
      $('#o').innerHTML = `<div style="display:flex;height:34px;border-radius:9px;overflow:hidden;border:1px solid var(--line);margin:8px 0">${seg.map(s => `<div title="${s[0]}" style="width:${s[1] * 100}%;background:${s[2]}"></div>`).join('')}</div>
        <div class="kv">${seg.map(s => `<div><span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${s[2]};margin-right:5px"></span>${s[0]}<b>${nf(s[1])}</b></div>`).join('')}</div>
        <div class="tw"><table><tbody>
        <tr><th>P(A ∩ B) — les deux</th><td>${ty === 'i' ? 'donnée' : ty === 'd' ? `P(A) × P(B) = ${nf(a)} × ${nf(b)}` : ty === 'u' ? `P(A) + P(B) − P(A ∪ B) = ${nf(a)} + ${nf(b)} − ${nf(v)}` : `P(A) + P(B) − P(A ∪ B) = ${nf(a)} + ${nf(b)} − ${nf(1 - v)}`}</td><td class="c"><b>${nf(i)}</b></td></tr>
        <tr><th>P(A ∪ B) — au moins un</th><td>${ty === 'n' ? `1 − P(ni A ni B) = 1 − ${nf(v)}` : `P(A) + P(B) − P(A ∩ B)`}</td><td class="c"><b>${nf(u)}</b></td></tr>
        <tr><th>P(ni A ni B) — aucun</th><td>1 − P(A ∪ B)</td><td class="c"><b>${nf(1 - u)}</b></td></tr>
        <tr><th>Un seul des deux</th><td>P(A ∪ B) − P(A ∩ B)</td><td class="c"><b>${nf(u - i)}</b></td></tr>
        <tr><th>P(B | A)</th><td>P(A ∩ B) ÷ P(A) = ${nf(i)} ÷ ${nf(a)}</td><td class="c"><b>${a ? nf(i / a) : '—'}</b></td></tr>
        <tr><th>P(A | B)</th><td>P(A ∩ B) ÷ P(B) = ${nf(i)} ÷ ${nf(b)}</td><td class="c"><b>${b ? nf(i / b) : '—'}</b></td></tr>
        <tr><th>Indépendants ?</th><td>P(A) × P(B) = ${nf(a * b)} à comparer avec P(A ∩ B) = ${nf(i)}</td><td class="c"><b style="color:${ind ? 'var(--grn)' : 'var(--red)'}">${ind ? 'oui' : 'non'}</b></td></tr>
        </tbody></table></div>`;
    };
    $('#pre').onchange = () => { const p = $('#pre').value.split(';'); if (p.length < 4) return; $('#a').value = p[0]; $('#b').value = p[1]; $('#ty').value = p[2]; $('#v').value = p[3]; maj(); };
    ['#a', '#b', '#ty', '#v'].forEach(s => $(s).oninput = maj); maj();
  };

  /* ===== 2. Arbre de probabilités / Bayes ===== */
  L.arbre = el => {
    const PRE = [['Nœuds IoT (devoir 2025)', 'compromis', 'sain', 'déclaré compromis', 'déclaré sain', 10, 90, 5], ['Radar (devoir 2022)', 'avion', 'pas d’avion', 'signal', 'pas de signal', 5, 99, 10],
      ['Test sanguin (TD 2)', 'virus', 'pas de virus', 'test positif', 'test négatif', 0.5, 95, 1], ['Chaînes A et B (devoir 2018)', 'chaîne A', 'chaîne B', 'sans défaut', 'avec défaut', 40, 80, 95]];
    const $ = cadre(el, 'Arbre des probabilités conditionnelles et formule de Bayes', `
      <div class="ctl"><label>Situation <select id="pre">${PRE.map((p, i) => `<option value="${i}">${p[0]}</option>`).join('')}</select></label></div>
      <div class="ctl"><label>P(<span id="n1"></span>) <input type="number" id="a" min="0" max="100" step="0.1"> %</label>
      <label>P(<span id="n3"></span> | <span id="n1b"></span>) <input type="number" id="b" min="0" max="100" step="0.1"> %</label>
      <label>P(<span id="n3b"></span> | <span id="n2"></span>) <input type="number" id="c" min="0" max="100" step="0.1"> %</label></div>
      <svg viewBox="0 0 660 250" id="g"></svg><div id="o"></div>`);
    let P = PRE[0];
    const charge = () => { P = PRE[+$('#pre').value]; $('#a').value = P[5]; $('#b').value = P[6]; $('#c').value = P[7]; ['#n1', '#n1b'].forEach(s => $(s).textContent = P[1]); $('#n2').textContent = P[2]; ['#n3', '#n3b'].forEach(s => $(s).textContent = P[3]); maj(); };
    const maj = () => {
      const cl = x => Math.max(0, Math.min(100, +x || 0)) / 100, a = cl($('#a').value), b = cl($('#b').value), c = cl($('#c').value);
      const j = [a * b, a * (1 - b), (1 - a) * c, (1 - a) * (1 - c)], pb = j[0] + j[2], pn = j[1] + j[3];
      const t = (x, y, s, o = '') => `<text x="${x}" y="${y}" style="font:12px var(--sans);fill:var(--ink)" ${o}>${s}</text>`;
      const l = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="gl"/>`;
      const Y = [40, 100, 160, 220], br = [[P[3], b], [P[4], 1 - b], [P[3], c], [P[4], 1 - c]];
      $('#g').innerHTML = l(20, 130, 170, 70) + l(20, 130, 170, 190) + t(40, 88, `${P[1]} : ${nf(a)}`) + t(40, 182, `${P[2]} : ${nf(1 - a)}`)
        + `<circle cx="20" cy="130" r="5" fill="var(--acc)"/><circle cx="170" cy="70" r="5" fill="var(--acc)"/><circle cx="170" cy="190" r="5" fill="var(--acc)"/>`
        + Y.map((y, i) => l(170, i < 2 ? 70 : 190, 360, y) + `<circle cx="360" cy="${y}" r="4" fill="var(--amb)"/>` + t(205, y + (i % 2 ? 16 : -8) + (i % 2 ? 0 : 0), `${br[i][0]} : ${nf(br[i][1])}`)
          + t(372, y + 4, `${nf(i < 2 ? a : 1 - a)} × ${nf(br[i][1])} = <tspan style="font-weight:700">${nf(j[i])}</tspan>`)).join('');
      const ligne = (q, num, den, v, expl) => `<tr><th>${q}</th><td>${fr(num, den)}</td><td class="c"><b>${den ? nf(v) : '—'}</b></td><td>${expl}</td></tr>`;
      $('#o').innerHTML = `<div class="kv"><div>P(${P[3]})<b>${nf(pb)}</b></div><div>P(${P[4]})<b>${nf(pn)}</b></div><div>Somme des 4 feuilles<b>${nf(j[0] + j[1] + j[2] + j[3])}</b></div></div>
        <p class="out"><b>Probabilités totales</b> : P(${P[3]}) = ${nf(j[0])} + ${nf(j[2])} = <b>${nf(pb)}</b> (on additionne les deux feuilles « ${P[3]} »).</p>
        <div class="tw"><table><thead><tr><th>Bayes : on remonte l’arbre</th><th>feuille ÷ total</th><th class="c">valeur</th><th>lecture</th></tr></thead><tbody>
        ${ligne(`P(${P[1]} | ${P[3]})`, nf(j[0]), nf(pb), j[0] / pb, 'bonne détection')}
        ${ligne(`P(${P[2]} | ${P[3]})`, nf(j[2]), nf(pb), j[2] / pb, 'fausse alarme parmi les alertes')}
        ${ligne(`P(${P[1]} | ${P[4]})`, nf(j[1]), nf(pn), j[1] / pn, 'cas manqué parmi les « rien à signaler »')}
        ${ligne(`P(${P[2]} | ${P[4]})`, nf(j[3]), nf(pn), j[3] / pn, '')}
        </tbody></table></div>`;
    };
    $('#pre').onchange = charge; ['#a', '#b', '#c'].forEach(s => $(s).oninput = maj); charge();
  };

  /* ===== 3. Lois discrètes ===== */
  L.discret = el => {
    const $ = cadre(el, 'Lois discrètes : binomiale, géométrique, Pascal, Poisson', `
      <div class="ctl"><label>Loi <select id="l"><option value="b">Binomiale — nombre de succès en n essais</option><option value="g">Géométrique — rang du 1er succès</option><option value="p">Pascal — rang du r-ième succès</option><option value="o">Poisson — nombre d’arrivées</option></select></label></div>
      <div class="ctl"><label id="ln">n <input type="number" id="n" min="1" max="40" value="5"></label><label id="lr">r <input type="number" id="r" min="1" max="10" value="3"></label>
      <label id="lp">p <input type="number" id="p" min="0.01" max="0.99" step="0.01" value="0.1"></label><label id="ll">λ <input type="number" id="la" min="0.1" max="25" step="0.1" value="6"></label>
      <label>valeur k <input type="number" id="k" min="0" max="80" value="3"></label></div>
      <svg viewBox="0 0 660 190" id="g"></svg><div id="o"></div>`);
    const maj = () => {
      const l = $('#l').value, n = Math.max(1, Math.min(40, Math.round(+$('#n').value) || 1)), r = Math.max(1, Math.min(10, Math.round(+$('#r').value) || 1)), p = Math.max(0.01, Math.min(0.99, +$('#p').value || 0.1)), la = Math.max(0.1, Math.min(25, +$('#la').value || 1));
      $('#ln').style.display = l === 'b' ? '' : 'none'; $('#lr').style.display = l === 'p' ? '' : 'none'; $('#lp').style.display = l === 'o' ? 'none' : ''; $('#ll').style.display = l === 'o' ? '' : 'none';
      let k = Math.round(+$('#k').value) || 0, min, max, f, E, V, txt, nom;
      if (l === 'b') { min = 0; max = n; f = x => comb(n, x) * p ** x * (1 - p) ** (n - x); E = n * p; V = n * p * (1 - p); nom = `B(${n} ; ${nf(p)})`; txt = x => `C(${n},${x}) × ${nf(p)}^${x} × ${nf(1 - p)}^${n - x} = ${comb(n, x)} × …`; }
      if (l === 'g') { min = 1; max = Math.max(12, Math.ceil(4 / p)); f = x => p * (1 - p) ** (x - 1); E = 1 / p; V = (1 - p) / p ** 2; nom = `G(${nf(p)})`; txt = x => `${nf(p)} × ${nf(1 - p)}^${x - 1}`; }
      if (l === 'p') { min = r; max = r + Math.max(12, Math.ceil(4 * r / p)); f = x => comb(x - 1, r - 1) * p ** r * (1 - p) ** (x - r); E = r / p; V = r * (1 - p) / p ** 2; nom = `Pascal(${r} ; ${nf(p)})`; txt = x => `C(${x - 1},${r - 1}) × ${nf(p)}^${r} × ${nf(1 - p)}^${x - r} = ${comb(x - 1, r - 1)} × …`; }
      if (l === 'o') { min = 0; max = Math.ceil(la + 4 * Math.sqrt(la) + 4); f = x => Math.exp(-la) * la ** x / fact(x); E = la; V = la; nom = `Poisson(${nf(la)})`; txt = x => `e^(−${nf(la)}) × ${nf(la)}^${x} ÷ ${x}!`; }
      max = Math.min(max, 60); k = Math.max(min, Math.min(max, k)); if (+$('#k').value !== k) $('#k').value = k;
      const xs = []; for (let x = min; x <= max; x++) xs.push(x);
      const ys = xs.map(f), m = Math.max(...ys), w = 620 / xs.length;
      let inf = 0; for (let x = min; x <= k; x++) inf += f(x);
      $('#g').innerHTML = xs.map((x, i) => `<rect x="${20 + i * w + 1}" y="${160 - ys[i] / m * 140}" width="${Math.max(1, w - 2)}" height="${ys[i] / m * 140}" fill="${x === k ? 'var(--amb)' : 'var(--acc)'}" opacity="${x === k ? 1 : .55}"/>${xs.length <= 26 || x % 5 === 0 ? `<text x="${20 + i * w + w / 2}" y="178" text-anchor="middle" style="font:11px var(--sans);fill:var(--mut)">${x}</text>` : ''}`).join('');
      $('#o').innerHTML = `<div class="kv"><div>P(X = ${k})<b>${nf(f(k), 5)}</b></div><div>P(X ≤ ${k})<b>${nf(inf, 5)}</b></div><div>P(X ≥ ${k})<b>${nf(1 - inf + f(k), 5)}</b></div><div>Espérance<b>${nf(E)}</b></div><div>Variance<b>${nf(V)}</b></div></div>
        <p class="out">X suit la loi ${nom}. P(X = ${k}) = ${txt(k)} = <b>${nf(f(k), 5)}</b>.${l === 'b' ? ` « Au moins un » : 1 − P(X = 0) = 1 − ${nf(1 - p)}^${n} = <b>${nf(1 - (1 - p) ** n, 5)}</b>.` : ''}${l === 'g' ? ' X compte les essais jusqu’au premier succès <b>inclus</b> : k − 1 échecs puis un succès.' : ''}${l === 'p' ? ` Le ${r}ᵉ succès tombe exactement à l’essai k : ${r - 1} succès parmi les k − 1 premiers, puis un succès.` : ''}${l === 'o' ? ' Ici λ est le nombre <b>moyen</b> d’arrivées sur la durée étudiée (taux × durée).' : ''}</p>`;
    };
    ['#l', '#n', '#r', '#p', '#la', '#k'].forEach(s => $(s).oninput = maj); maj();
  };

  /* ===== 4. Loi exponentielle ===== */
  L.expo = el => {
    const $ = cadre(el, 'Loi exponentielle : fiabilité R(t), défaillance F(t), absence de mémoire', `
      <div class="ctl"><label>Je connais R(<input type="number" id="t0" value="150" min="0" style="width:66px">) = <input type="number" id="r0" value="0.85" min="0.01" max="0.99" step="0.01"></label><button class="btn sm" id="dl">→ en déduire λ</button></div>
      <div class="ctl"><label>λ <input type="number" id="la" value="0.001083" min="0" step="0.0001" style="width:110px"></label>
      <label>t₁ <input type="number" id="t1" value="100" min="0"></label><label>t₂ <input type="number" id="t2" value="200" min="0"></label></div>
      <svg viewBox="0 0 660 200" id="g"></svg><div id="o"></div>`);
    const maj = () => {
      const la = Math.max(1e-9, +$('#la').value || 0), a = Math.max(0, +$('#t1').value || 0), b = Math.max(a, +$('#t2').value || 0), Rf = t => Math.exp(-la * t);
      const tm = Math.max(3 / la, b * 1.15), X = t => 40 + t / tm * 600, Y = r => 170 - r * 150;
      let d = ''; for (let i = 0; i <= 120; i++) { const t = tm * i / 120; d += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(Rf(t)).toFixed(1); }
      const pt = (t, c, n) => `<line x1="${X(t)}" y1="${Y(Rf(t))}" x2="${X(t)}" y2="170" stroke="${c}" stroke-dasharray="4 3"/><circle cx="${X(t)}" cy="${Y(Rf(t))}" r="5" fill="${c}"/><text x="${X(t)}" y="186" text-anchor="middle" style="font:11px var(--sans);fill:${c}">${n} = ${nf(t, 1)}</text>`;
      $('#g').innerHTML = `<line x1="40" y1="170" x2="640" y2="170" class="gl"/><line x1="40" y1="20" x2="40" y2="170" class="gl"/><text x="34" y="24" text-anchor="end" style="font:11px var(--sans);fill:var(--mut)">1</text><text x="34" y="174" text-anchor="end" style="font:11px var(--sans);fill:var(--mut)">0</text>
        <path d="${d}" fill="none" stroke="var(--acc)" stroke-width="2.5"/><text x="${X(tm * .55)}" y="${Y(Rf(tm * .55)) - 10}" style="font:12px var(--sans);fill:var(--acc)">R(t) = e^(−λt)</text>${pt(a, 'var(--amb)', 't₁')}${b > a ? pt(b, 'var(--blue)', 't₂') : ''}`;
      $('#o').innerHTML = `<div class="kv"><div>R(t₁) = P(T &gt; t₁)<b>${nf(Rf(a))}</b></div><div>F(t₁) = P(T ≤ t₁)<b>${nf(1 - Rf(a))}</b></div><div>R(t₂)<b>${nf(Rf(b))}</b></div><div>MTTF = 1 ÷ λ<b>${nf(1 / la, 1)}</b></div></div>
        <div class="tw"><table><tbody>
        <tr><th>Panne entre t₁ et t₂</th><td>R(t₁) − R(t₂) = ${nf(Rf(a))} − ${nf(Rf(b))}</td><td class="c"><b>${nf(Rf(a) - Rf(b))}</b></td></tr>
        <tr><th>Encore en marche à t₂ sachant en marche à t₁</th><td>R(t₂) ÷ R(t₁) = e^(−λ(t₂ − t₁)) = R(${nf(b - a, 1)})</td><td class="c"><b>${nf(Rf(b - a))}</b></td></tr>
        <tr><th>Sur 250 pièces neuves, pannes avant t₁</th><td>250 × F(t₁)</td><td class="c"><b>${nf(250 * (1 - Rf(a)), 1)}</b></td></tr>
        <tr><th>Fiabilité au bout du MTTF</th><td>e^(−1), quel que soit λ</td><td class="c"><b>0,3679</b></td></tr>
        </tbody></table></div>`;
    };
    $('#dl').onclick = () => { const t0 = +$('#t0').value, r0 = +$('#r0').value; if (t0 > 0 && r0 > 0 && r0 < 1) { $('#la').value = +(-Math.log(r0) / t0).toPrecision(4); maj(); } };
    ['#la', '#t1', '#t2'].forEach(s => $(s).oninput = maj); maj();
  };

  /* ===== 5. Montages ===== */
  L.montage = el => {
    const $ = cadre(el, 'Montages de composants indépendants : série, parallèle, 2 sur 3', `
      <div class="ctl"><label>Fiabilité d’un composant r <input type="range" id="r" min="0" max="1" step="0.01" value="0.74"><b id="rv"></b></label>
      <label>Nombre de composants n <input type="range" id="n" min="2" max="5" value="2"><b id="nv"></b></label></div>
      <div class="ctl"><label>ou bien : λ <input type="number" id="la" value="0.0001" step="0.00001" style="width:100px"></label><label>t <input type="number" id="t" value="3000"></label><button class="btn sm" id="c">→ r = e^(−λt)</button></div>
      <div id="o"></div>`);
    const maj = () => {
      const r = +$('#r').value, n = +$('#n').value, s = r ** n, p = 1 - (1 - r) ** n, v = 3 * r * r - 2 * r ** 3;
      $('#rv').textContent = nf(r, 2); $('#nv').textContent = n;
      const b = (nom, f, val, c, expl) => `<tr><th>${nom}</th><td>${f}<br><small style="color:var(--mut)">${expl}</small></td><td class="c"><b>${nf(val)}</b></td><td style="width:34%"><div class="bar" style="height:12px"><i style="width:${val * 100}%;background:${c}"></i></div></td></tr>`;
      $('#o').innerHTML = `<div class="tw"><table><tbody>
        ${b(`Série (${n})`, `r^${n} = ${nf(r, 2)}^${n}`, s, 'var(--red)', 'il faut que tous fonctionnent : on multiplie les fiabilités')}
        ${b(`Parallèle (${n})`, `1 − (1 − r)^${n} = 1 − ${nf(1 - r, 2)}^${n}`, p, 'var(--grn)', 'il suffit d’un seul : on multiplie les probabilités de panne')}
        ${b('2 sur 3 (vote)', `3r² − 2r³ = r³ + 3r²(1 − r)`, v, 'var(--blue)', 'les trois marchent, ou exactement deux (3 façons)')}
        </tbody></table></div><p class="out">Toujours : série &lt; un seul composant (${nf(r, 2)}) &lt; parallèle. Le vote 2 sur 3 dépasse un composant seul uniquement quand r &gt; 0,5.</p>`;
    };
    $('#c').onclick = () => { const x = Math.exp(-(+$('#la').value) * (+$('#t').value)); if (x >= 0 && x <= 1) { $('#r').value = Math.round(x * 100) / 100; maj(); } };
    ['#r', '#n'].forEach(s => $(s).oninput = maj); maj();
  };
})();

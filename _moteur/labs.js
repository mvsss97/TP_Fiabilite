/* Simulateurs interactifs (graphes, parcours, PageRank, épidémies, modèles de réseaux…). */
(function () {
  const R = window.REV;
  const NS = 'http://www.w3.org/2000/svg';
  const r2 = (x, d = 2) => (Math.round(x * 10 ** d) / 10 ** d).toString().replace('.', ',');
  const cadre = (el, titre, corps) => { el.className = 'lab'; el.innerHTML = `<h4>Simulateur</h4><div class="ttl">${titre}</div>${corps}`; return s => el.querySelector(s); };
  const C2 = k => k * (k - 1) / 2;
  const alea = g => () => (g = (g * 1664525 + 1013904223) % 4294967296) / 4294967296; // générateur reproductible

  /* ----- mesures d'un graphe non orienté ----- */
  function mesures(n, E) {
    const adj = Array.from({ length: n }, () => []);
    E.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
    const deg = adj.map(a => a.length), betw = Array(n).fill(0), close = Array(n).fill(null), dist = [];
    let diam = 0, somme = 0, paires = 0, connexe = n > 0;
    for (let s = 0; s < n; s++) {
      const d = Array(n).fill(-1), sig = Array(n).fill(0), pred = Array.from({ length: n }, () => []), ordre = [], q = [s];
      d[s] = 0; sig[s] = 1;
      while (q.length) { const v = q.shift(); ordre.push(v); for (const w of adj[v]) { if (d[w] < 0) { d[w] = d[v] + 1; q.push(w); } if (d[w] === d[v] + 1) { sig[w] += sig[v]; pred[w].push(v); } } }
      const del = Array(n).fill(0);
      for (let i = ordre.length - 1; i >= 0; i--) { const w = ordre[i]; for (const v of pred[w]) del[v] += sig[v] / sig[w] * (1 + del[w]); if (w !== s) betw[w] += del[w]; }
      dist.push(d);
      let tot = 0, ok = true;
      for (let t = 0; t < n; t++) if (t !== s) { if (d[t] < 0) { ok = false; connexe = false; } else { tot += d[t]; diam = Math.max(diam, d[t]); if (t > s) { somme += d[t]; paires++; } } }
      if (ok && n > 1) close[s] = (n - 1) / tot;
    }
    const liens = adj.map(a => { let k = 0; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (adj[a[i]].includes(a[j])) k++; return k; });
    const cl = deg.map((d, i) => d < 2 ? 0 : liens[i] / C2(d));
    const triples = deg.reduce((a, d) => a + C2(d), 0);
    const comp = Array(n).fill(-1); let nc = 0;
    for (let s = 0; s < n; s++) if (comp[s] < 0) { for (let t = 0; t < n; t++) if (dist[s][t] >= 0) comp[t] = nc; nc++; }
    return { adj, deg, betw: betw.map(b => b / 2), close, cl, dist, comp, nc, connexe, diam, apl: paires ? somme / paires : 0, cg: triples ? liens.reduce((a, b) => a + b, 0) / triples : 0, dens: n > 1 ? E.length / C2(n) : 0 };
  }
  R.mesures = mesures;
  const geante = m => { const t = {}; m.comp.forEach(c => t[c] = (t[c] || 0) + 1); let best = -1, sz = 0; for (const c in t) if (t[c] > sz) { sz = t[c]; best = +c; } return { id: best, taille: sz }; };

  const L = R.labs = {};
  R.labsMeta = [['graphe', 'Atelier de graphes'], ['parcours', 'BFS et DFS'], ['pagerank', 'PageRank'], ['equilibre', 'Équilibre social'], ['aleatoire', 'Graphe aléatoire'], ['petitmonde', 'Petit monde'], ['epidemie', 'Épidémies'], ['evaluation', 'Précision / rappel']];

  /* ===== 1. Atelier de graphes ===== */
  const PRE = {
    'Centralités (ex. du cours, 9 nœuds)': { p: [[250, 40], [110, 120], [110, 290], [210, 130], [210, 290], [320, 150], [320, 290], [390, 290], [470, 290]], e: 'AB AD AF BC BE DE FG FI HI' },
    'Degré (ex. du cours, 7 nœuds)': { p: [[90, 190], [90, 50], [220, 50], [220, 150], [220, 300], [380, 50], [380, 300]], e: 'BC CF BF BA AC AD AE CD DE EG FG CG DF' },
    'Étoile': { p: [[260, 170], [260, 50], [350, 85], [385, 170], [350, 255], [260, 290], [170, 255], [135, 170], [170, 85]], e: 'AB AC AD AE AF AG AH AI' },
    'Chemin de 5 nœuds': { p: [[70, 170], [165, 170], [260, 170], [355, 170], [450, 170]], e: 'AB BC CD DE' },
    'Clustering global = 0,75': { p: [[150, 170], [260, 70], [370, 170], [260, 270]], e: 'AB BC AC AD CD' },
    'Proximité (ex. du cours, 5 nœuds)': { p: [[80, 170], [190, 170], [300, 80], [300, 260], [410, 170]], e: 'AB BC BD CE DE' },
    'Clique de 5': { p: [[260, 50], [375, 135], [330, 270], [190, 270], [145, 135]], e: 'AB AC AD AE BC BD BE CD CE DE' },
    'Devoir 2025 (6 étudiants)': { p: [[120, 50], [60, 190], [240, 250], [320, 60], [420, 200], [480, 50]], e: 'AB AC BC BD CD DE DF EF' },
    'Devoir 2024 (A = 1 … H = 8)': { p: [[400, 60], [320, 30], [260, 90], [330, 150], [200, 210], [290, 280], [390, 300], [460, 170]], e: 'AD BD CD CE DE DF EF FG GH' },
    'Vide': { p: [], e: '' }
  };
  L.graphe = el => {
    const $ = cadre(el, 'Atelier de graphes : construis, puis lis toutes les mesures',
      `<div class="ctl"><span class="seg" id="md"><button data-m="relier" class="on">Relier / déplacer</button><button data-m="noeud">Ajouter un nœud</button><button data-m="suppr">Supprimer</button></span>
       <label>Exemple <select id="pre">${Object.keys(PRE).map(k => `<option>${k}</option>`).join('')}</select></label></div>
       <svg viewBox="0 0 520 340" id="g"></svg>
       <p class="out" id="aide" style="color:var(--mut);margin:6px 0"></p>
       <div class="kv" id="kv"></div><div class="tw" id="tab"></div>
       <details><summary style="cursor:pointer;color:var(--acc);font-weight:600">Matrice d’adjacence</summary><div class="tw" id="mat"></div></details>`);
    let N = [], E = [], mode = 'relier', sel = -1, drag = -1, bouge = false;
    const svg = $('#g'), nom = i => String.fromCharCode(65 + i);
    const charge = k => { const p = PRE[k]; N = p.p.map(q => ({ x: q[0], y: q[1] })); E = p.e ? p.e.split(' ').map(s => [s.charCodeAt(0) - 65, s.charCodeAt(1) - 65]) : []; sel = -1; dessine(); };
    const pt = ev => { const b = svg.getBoundingClientRect(); return { x: (ev.clientX - b.left) * 520 / b.width, y: (ev.clientY - b.top) * 340 / b.height }; };
    const AIDE = { relier: 'Clique un nœud puis un autre pour créer (ou retirer) une arête. Fais glisser un nœud pour le déplacer.', noeud: 'Clique dans le cadre pour poser un nœud (26 au maximum).', suppr: 'Clique un nœud ou une arête pour l’effacer.' };
    function dessine() {
      const m = mesures(N.length, E);
      const ponts = E.map((e, i) => mesures(N.length, E.filter((_, j) => j !== i)).nc > m.nc);
      svg.innerHTML = E.map((e, i) => `<line class="gl ${ponts[i] ? 'br' : ''}" data-e="${i}" x1="${N[e[0]].x}" y1="${N[e[0]].y}" x2="${N[e[1]].x}" y2="${N[e[1]].y}" style="cursor:pointer"/>`).join('') +
        N.map((p, i) => `<g data-n="${i}" style="cursor:pointer"><circle class="gn ${i === sel ? 'sel' : ''}" cx="${p.x}" cy="${p.y}" r="15"/><text class="gt" x="${p.x}" y="${p.y}">${nom(i)}</text></g>`).join('');
      $('#aide').textContent = AIDE[mode];
      const n = N.length;
      $('#kv').innerHTML = [['Nœuds n', n], ['Arêtes m', E.length], ['Densité', r2(m.dens)], ['Composantes', m.nc], ['Diamètre', m.connexe ? m.diam : '∞'], ['Chemin moyen', m.connexe ? r2(m.apl) : '—'], ['Clustering global', r2(m.cg)], ['Ponts (en rouge)', ponts.filter(Boolean).length]].map(k => `<div>${k[0]}<b>${k[1]}</b></div>`).join('');
      const mx = k => Math.max(...k.map(v => v || 0));
      const bm = mx(m.betw), dm = mx(m.deg), cm = mx(m.close);
      const top = (v, M) => M > 0 && Math.abs(v - M) < 1e-9 ? ' style="background:var(--acc-soft);font-weight:700"' : '';
      $('#tab').innerHTML = n ? `<table><thead><tr><th class="c">Nœud</th><th class="c">Degré d</th><th class="c">C<sub>d</sub> = d/(n−1)</th><th class="c">Proximité</th><th class="c">Intermédiarité</th><th class="c">Clustering local</th></tr></thead><tbody>${N.map((_, i) => `<tr><td class="c"><b>${nom(i)}</b></td><td class="c"${top(m.deg[i], dm)}>${m.deg[i]}</td><td class="c">${n > 1 ? r2(m.deg[i] / (n - 1)) : '—'}</td><td class="c"${top(m.close[i], cm)}>${m.close[i] === null ? '—' : r2(m.close[i], 3)}</td><td class="c"${top(m.betw[i], bm)}>${r2(m.betw[i])}</td><td class="c">${r2(m.cl[i])}</td></tr>`).join('')}</tbody></table><p style="font-size:.82em;color:var(--mut)">Cases surlignées : le nœud le plus central pour chaque mesure. Intermédiarité : chaque paire (s, t) comptée une fois, comme dans le tableau du cours. Proximité « — » : le graphe n’est pas connexe.</p>` : '';
      $('#mat').innerHTML = n ? `<table style="width:auto"><tr><th></th>${N.map((_, i) => `<th class="c">${nom(i)}</th>`).join('')}</tr>${N.map((_, i) => `<tr><th class="c">${nom(i)}</th>${N.map((_, j) => `<td class="c">${m.adj[i].includes(j) ? '<b>1</b>' : '0'}</td>`).join('')}</tr>`).join('')}</table>` : '';
    }
    svg.addEventListener('pointerdown', ev => {
      const g = ev.target.closest('[data-n]'), l = ev.target.closest('[data-e]'), p = pt(ev);
      if (mode === 'noeud') { if (!g && N.length < 26) { N.push(p); dessine(); } return; }
      if (mode === 'suppr') { if (g) { const i = +g.dataset.n; N.splice(i, 1); E = E.filter(e => e[0] !== i && e[1] !== i).map(e => e.map(v => v > i ? v - 1 : v)); } else if (l) E.splice(+l.dataset.e, 1); sel = -1; dessine(); return; }
      if (g) { drag = +g.dataset.n; bouge = false; svg.setPointerCapture(ev.pointerId); } else { sel = -1; dessine(); }
    });
    svg.addEventListener('pointermove', ev => { if (drag < 0) return; const p = pt(ev); if (!bouge && Math.hypot(p.x - N[drag].x, p.y - N[drag].y) < 5) return; bouge = true; N[drag].x = Math.max(16, Math.min(504, p.x)); N[drag].y = Math.max(16, Math.min(324, p.y)); dessine(); });
    svg.addEventListener('pointerup', () => {
      if (drag < 0) return; const i = drag; drag = -1;
      if (bouge) return;
      if (sel < 0) sel = i; else if (sel === i) sel = -1; else { const k = E.findIndex(e => (e[0] === sel && e[1] === i) || (e[0] === i && e[1] === sel)); k >= 0 ? E.splice(k, 1) : E.push([sel, i]); sel = -1; }
      dessine();
    });
    el.querySelectorAll('#md button').forEach(b => b.onclick = () => { mode = b.dataset.m; sel = -1; el.querySelectorAll('#md button').forEach(x => x.classList.toggle('on', x === b)); dessine(); });
    $('#pre').onchange = e => charge(e.target.value);
    const dep = PRE[el.dataset.pre] ? el.dataset.pre : Object.keys(PRE)[0]; $('#pre').value = dep; charge(dep);
  };

  /* ===== 2. BFS / DFS ===== */
  L.parcours = el => {
    const P = [[260, 36], [140, 110], [380, 110], [80, 190], [200, 190], [320, 190], [440, 190]], ENF = [[1, 2], [3, 4], [5, 6], [], [], [], []];
    const $ = cadre(el, 'Parcours en largeur (BFS) et en profondeur (DFS)',
      `<div class="ctl"><span class="seg" id="al"><button data-a="bfs" class="on">BFS · file</button><button data-a="dfs">DFS · pile</button></span>
       <button class="btn sm pri" id="pas">Étape suivante</button><button class="btn sm" id="rz">Recommencer</button></div>
       <svg viewBox="0 0 520 226" id="g"></svg><p class="out" id="o"></p>`);
    let algo = 'bfs', S, vus, ordre, cur;
    const init = () => { S = [0]; vus = new Set(); ordre = []; cur = -1; dess(); };
    function pas() {
      while (S.length) { const v = algo === 'bfs' ? S.shift() : S.pop(); if (vus.has(v)) continue; vus.add(v); ordre.push(v); cur = v; const e = ENF[v]; (algo === 'bfs' ? e : e.slice().reverse()).forEach(w => S.push(w)); break; }
      dess();
    }
    function dess() {
      $('#g').innerHTML = ENF.map((e, i) => e.map(j => `<line class="gl ${vus.has(j) ? 'hi' : ''}" x1="${P[i][0]}" y1="${P[i][1]}" x2="${P[j][0]}" y2="${P[j][1]}"/>`).join('')).join('') +
        P.map((p, i) => `<circle class="gn ${i === cur ? 'cur' : vus.has(i) ? 'hi' : ''}" cx="${p[0]}" cy="${p[1]}" r="17"/><text class="gt ${vus.has(i) ? 'hi' : ''}" x="${p[0]}" y="${p[1]}">v${i + 1}</text>`).join('');
      const fini = !S.length && ordre.length === 7;
      const st = S.map(v => 'v' + (v + 1));
      $('#o').innerHTML = `<b>Ordre de visite :</b> ${ordre.map(v => 'v' + (v + 1)).join(' → ') || '—'}<br><b>${algo === 'bfs' ? 'File (on retire à gauche, on ajoute à droite)' : 'Pile (on retire et on ajoute à droite : le sommet)'} :</b> [ ${st.join(', ')} ]` +
        (fini ? `<br><span style="color:var(--grn)">Terminé. ${algo === 'bfs' ? 'BFS visite niveau par niveau.' : 'DFS descend au bout d’une branche avant de revenir.'}</span>` : '');
    }
    el.querySelectorAll('#al button').forEach(b => b.onclick = () => { algo = b.dataset.a; el.querySelectorAll('#al button').forEach(x => x.classList.toggle('on', x === b)); init(); });
    $('#pas').onclick = pas; $('#rz').onclick = init; init();
  };

  /* ===== 3. PageRank ===== */
  L.pagerank = el => {
    const $ = cadre(el, 'PageRank itératif sur l’exemple du cours (A → B, B → C, C → A, C → B)',
      `<svg viewBox="0 0 520 150" id="g"></svg>
       <div class="ctl"><label>p = <b id="pv"></b><input type="range" id="p" min="0.5" max="0.95" step="0.05" value="0.85"></label>
       <button class="btn sm pri" id="it">Itération suivante</button><button class="btn sm" id="it10">+10</button><button class="btn sm" id="rz">Remettre à 1/3</button></div>
       <div class="tw" id="t"></div><p class="out" id="o" style="color:var(--mut)"></p>`);
    let H, p;
    const init = () => { p = +$('#p').value; $('#pv').textContent = r2(p); H = [[1 / 3, 1 / 3, 1 / 3]]; dess(); };
    const pas = () => { const [a, b, c] = H[H.length - 1], k = (1 - p) / 3; const A = k + p * c / 2, B = k + p * (A / 1 + c / 2), C = k + p * B; H.push([A, B, C]); };
    function dess() {
      const v = H[H.length - 1], pos = [[110, 40], [110, 118], [400, 80]], nm = 'ABC';
      const fl = (a, b, dy = 0) => `<line class="gl" x1="${pos[a][0]}" y1="${pos[a][1] + dy}" x2="${pos[b][0]}" y2="${pos[b][1] + dy}" marker-end="url(#fl)"/>`;
      $('#g').innerHTML = `<defs><marker id="fl" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor" style="color:var(--mut)"/></marker></defs>` +
        fl(0, 1) + fl(1, 2, 7) + fl(2, 1, -7) + fl(2, 0) +
        pos.map((q, i) => `<circle class="gn hi" cx="${q[0]}" cy="${q[1]}" r="${10 + v[i] * 34}" style="opacity:.9"/><text class="gt hi" x="${q[0]}" y="${q[1]}">${nm[i]} ${r2(v[i], 3)}</text>`).join('');
      const deb = Math.max(0, H.length - 7);
      $('#t').innerHTML = `<table><thead><tr><th class="c">Itération</th><th class="c">PR(A)</th><th class="c">PR(B)</th><th class="c">PR(C)</th></tr></thead><tbody>${H.slice(deb).map((h, i) => `<tr><td class="c">${deb + i + 1}</td>${h.map(x => `<td class="c">${r2(x, 3)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
      $('#o').innerHTML = `PR(A) = ${r2((1 - p) / 3, 3)} + ${r2(p)}·PR(C)/2 &nbsp;·&nbsp; PR(B) = ${r2((1 - p) / 3, 3)} + ${r2(p)}·(PR(A)/1 + PR(C)/2) &nbsp;·&nbsp; PR(C) = ${r2((1 - p) / 3, 3)} + ${r2(p)}·PR(B)/1.<br>Comme sur la diapositive, chaque valeur fraîchement calculée est réutilisée tout de suite. Avec p = 0,85 on converge vers 0,215 · 0,397 · 0,388.`;
    }
    $('#it').onclick = () => { pas(); dess(); }; $('#it10').onclick = () => { for (let i = 0; i < 10; i++) pas(); dess(); };
    $('#rz').onclick = init; $('#p').oninput = init; init();
  };

  /* ===== 4. Équilibre social ===== */
  L.equilibre = el => {
    const $ = cadre(el, 'Un triangle est-il socialement équilibré ?', `<svg viewBox="0 0 520 200" id="g"></svg><p class="out" id="o"></p>`);
    const s = [1, 1, 1], P = [[260, 30], [160, 170], [360, 170]], A = [[0, 1], [1, 2], [2, 0]];
    function dess() {
      $('#g').innerHTML = A.map((a, i) => { const x = (P[a[0]][0] + P[a[1]][0]) / 2, y = (P[a[0]][1] + P[a[1]][1]) / 2; return `<line class="gl" x1="${P[a[0]][0]}" y1="${P[a[0]][1]}" x2="${P[a[1]][0]}" y2="${P[a[1]][1]}" style="stroke:var(--${s[i] > 0 ? 'grn' : 'red'});stroke-width:3"/><g data-i="${i}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="15" style="fill:var(--card);stroke:var(--${s[i] > 0 ? 'grn' : 'red'});stroke-width:2"/><text class="gt" x="${x}" y="${y}" style="font-size:17px">${s[i] > 0 ? '+' : '−'}</text></g>`; }).join('') +
        P.map((p, i) => `<circle class="gn" cx="${p[0]}" cy="${p[1]}" r="17"/><text class="gt" x="${p[0]}" y="${p[1]}">v${i + 1}</text>`).join('');
      const pr = s[0] * s[1] * s[2], neg = s.filter(x => x < 0).length;
      $('#o').innerHTML = `Clique sur un signe pour l’inverser. Produit des trois signes : <b>${s.map(x => x > 0 ? '(+1)' : '(−1)').join(' × ')} = ${pr > 0 ? '+1' : '−1'}</b> → triangle <b style="color:var(--${pr > 0 ? 'grn' : 'red'})">${pr > 0 ? 'équilibré' : 'non équilibré'}</b>. ${['Trois amis : « l’ami de mon ami est mon ami ».', 'Un seul lien négatif : deux de mes amis sont ennemis entre eux, la situation est tendue.', 'Deux liens négatifs : « l’ennemi de mon ennemi est mon ami ».', 'Trois ennemis : deux d’entre eux auraient intérêt à s’allier, donc instable.'][neg]}`;
      el.querySelectorAll('[data-i]').forEach(g => g.onclick = () => { s[+g.dataset.i] *= -1; dess(); });
    }
    dess();
  };

  /* ===== 5. Graphe aléatoire G(n,p) ===== */
  L.aleatoire = el => {
    const n = 30, rnd = alea(7), U = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) U.push([i, j, rnd()]);
    const P = Array.from({ length: n }, (_, i) => [260 + 205 * Math.cos(2 * Math.PI * i / n), 160 + 135 * Math.sin(2 * Math.PI * i / n)]);
    const $ = cadre(el, 'Graphe aléatoire G(n, p) : la naissance de la composante géante',
      `<div class="ctl"><label>p = <b id="pv"></b><input type="range" id="p" min="0" max="0.3" step="0.005" value="0.02" style="width:260px"></label></div>
       <svg viewBox="0 0 520 320" id="g"></svg><div class="kv" id="kv"></div><p class="out" id="o"></p>`);
    function dess() {
      const p = +$('#p').value, E = U.filter(u => u[2] < p).map(u => [u[0], u[1]]), m = mesures(n, E), g = geante(m), c = (n - 1) * p;
      $('#pv').textContent = r2(p, 3);
      $('#g').innerHTML = E.map(e => `<line class="gl ${m.comp[e[0]] === g.id && g.taille > 1 ? 'hi' : ''}" x1="${P[e[0]][0]}" y1="${P[e[0]][1]}" x2="${P[e[1]][0]}" y2="${P[e[1]][1]}" style="stroke-width:1.2"/>`).join('') +
        P.map((q, i) => `<circle class="gn ${m.comp[i] === g.id && g.taille > 1 ? 'hi' : ''}" cx="${q[0]}" cy="${q[1]}" r="7"/>`).join('');
      $('#kv').innerHTML = [['Degré moyen attendu c = (n−1)p', r2(c)], ['Arêtes attendues C(n,2)·p', r2(C2(n) * p, 1)], ['Arêtes observées', E.length], ['Composante géante', g.taille + ' / ' + n], ['Clustering global (≈ p)', r2(m.cg)], ['Connexe ?', m.connexe ? 'oui' : 'non']].map(k => `<div>${k[0]}<b>${k[1]}</b></div>`).join('');
      $('#o').innerHTML = c < 1 ? `<b>c &lt; 1</b> : petits groupes isolés, diamètres petits. Seuil de la transition : p = 1/(n−1) = ${r2(1 / (n - 1), 3)}.` : c < Math.log(n) ? `<b>c ≥ 1</b> : la composante géante (en couleur) est apparue et grossit. Le graphe n’est pas encore connexe : seuil p = ln(n)/(n−1) = ${r2(Math.log(n) / (n - 1), 3)}.` : `<b>c &gt; ln n</b> : au-delà du seuil de connexité, presque plus aucun nœud isolé.`;
    }
    $('#p').oninput = dess; dess();
  };

  /* ===== 6. Petit monde ===== */
  L.petitmonde = el => {
    const n = 24, rnd = alea(11), base = [];
    for (let i = 0; i < n; i++) for (const k of [1, 2]) base.push({ a: i, b: (i + k) % n, u: rnd(), t: Math.floor(rnd() * n) });
    const P = Array.from({ length: n }, (_, i) => [260 + 150 * Math.cos(2 * Math.PI * i / n), 160 + 135 * Math.sin(2 * Math.PI * i / n)]);
    const $ = cadre(el, 'Modèle du petit monde : recâbler un treillis régulier (n = 24, c = 4)',
      `<div class="ctl"><label>β = <b id="bv"></b><input type="range" id="b" min="0" max="1" step="0.02" value="0" style="width:260px"></label></div>
       <svg viewBox="0 0 520 320" id="g"></svg><div class="kv" id="kv"></div><p class="out" id="o"></p>`);
    function dess() {
      const b = +$('#b').value, E = [], vu = new Set(), re = [];
      base.forEach(e => { let x = e.a, y = e.b, r = false; if (e.u < b && e.t !== e.a && !vu.has(Math.min(e.a, e.t) + '-' + Math.max(e.a, e.t))) { y = e.t; r = true; } const k = Math.min(x, y) + '-' + Math.max(x, y); if (vu.has(k)) return; vu.add(k); E.push([x, y]); re.push(r); });
      const m = mesures(n, E), cm = m.cl.reduce((a, c) => a + c, 0) / n;
      $('#bv').textContent = r2(b);
      $('#g').innerHTML = E.map((e, i) => `<line class="gl ${re[i] ? 'br' : ''}" x1="${P[e[0]][0]}" y1="${P[e[0]][1]}" x2="${P[e[1]][0]}" y2="${P[e[1]][1]}" style="stroke-width:${re[i] ? 1.6 : 1.3}"/>`).join('') + P.map(q => `<circle class="gn" cx="${q[0]}" cy="${q[1]}" r="7"/>`).join('');
      $('#kv').innerHTML = [['Arêtes recâblées (rouge)', re.filter(Boolean).length + ' / ' + E.length], ['Clustering moyen mesuré', r2(cm)], ['Formule (1−β)³·C(0)', r2((1 - b) ** 3 * 0.5)], ['Chemin moyen mesuré', m.connexe ? r2(m.apl) : '—'], ['Diamètre', m.connexe ? m.diam : '∞']].map(k => `<div>${k[0]}<b>${k[1]}</b></div>`).join('');
      $('#o').innerHTML = b === 0 ? 'β = 0 : treillis régulier. Clustering élevé (C(0) = 3(c−2)/(4(c−1)) = 0,5 ici) mais chemins longs.' : b < 0.25 ? 'Quelques raccourcis suffisent : le chemin moyen <b>chute vite</b> alors que le clustering <b>résiste</b>. C’est exactement la zone « petit monde ».' : b < 1 ? 'Trop de recâblage : le clustering finit par s’effondrer lui aussi.' : 'β = 1 : on a pratiquement un graphe aléatoire (chemins courts, clustering faible).';
    }
    $('#b').oninput = dess; dess();
  };

  /* ===== 7. Épidémies ===== */
  L.epidemie = el => {
    const $ = cadre(el, 'Modèles épidémiques SI, SIR, SIS, SIRS (N = 100, I₀ = 1)',
      `<div class="ctl"><span class="seg" id="md">${['SI', 'SIR', 'SIS', 'SIRS'].map((m, i) => `<button data-m="${m}" class="${i === 1 ? 'on' : ''}">${m}</button>`).join('')}</span></div>
       <div class="ctl"><label>β = <b id="bv"></b><input type="range" id="b" min="0.001" max="0.03" step="0.001" value="0.01"></label>
       <label id="lg">γ = <b id="gv"></b><input type="range" id="ga" min="0" max="1.5" step="0.05" value="0.1"></label>
       <label id="ll">λ = <b id="lv"></b><input type="range" id="la" min="0" max="0.2" step="0.01" value="0.02"></label></div>
       <svg viewBox="0 0 520 250" id="g"></svg><p class="out" id="o"></p>`);
    let mo = 'SIR';
    function dess() {
      const b = +$('#b').value, g = mo === 'SI' ? 0 : +$('#ga').value, l = mo === 'SIRS' ? +$('#la').value : 0, N = 100, T = 50, dt = 0.02;
      $('#bv').textContent = r2(b, 3); $('#gv').textContent = r2(g); $('#lv').textContent = r2(l);
      $('#lg').style.display = mo === 'SI' ? 'none' : ''; $('#ll').style.display = mo === 'SIRS' ? '' : 'none';
      let S = N - 1, I = 1, Rr = 0; const hs = [], hi = [], hr = [];
      for (let t = 0; t <= T + 1e-9; t += dt) {
        if (Math.round(t / dt) % 10 === 0) { hs.push(S); hi.push(I); hr.push(Rr); }
        const inf = b * I * S, gue = g * I, per = l * Rr;
        if (mo === 'SIS') { S += (gue - inf) * dt; I += (inf - gue) * dt; }
        else { S += (per - inf) * dt; I += (inf - gue) * dt; Rr += (gue - per) * dt; }
      }
      const X = i => 44 + i / (hs.length - 1) * 460, Y = v => 220 - v / N * 200, pl = (h, c, d = '') => `<polyline points="${h.map((v, i) => X(i).toFixed(1) + ',' + Y(v).toFixed(1)).join(' ')}" fill="none" stroke="var(--${c})" stroke-width="2.6" stroke-dasharray="${d}"/>`;
      const fin = hs.length - 1;
      $('#g').innerHTML = [0, 25, 50, 75, 100].map(v => `<line class="ax" x1="44" x2="504" y1="${Y(v)}" y2="${Y(v)}"/><text class="axt" x="36" y="${Y(v) + 4}" text-anchor="end">${v}</text>`).join('') +
        [0, 10, 20, 30, 40, 50].map(t => `<text class="axt" x="${44 + t / T * 460}" y="238" text-anchor="middle">${t}</text>`).join('') + `<text class="axt" x="504" y="249" text-anchor="end">temps t</text>` +
        pl(hs, 'grn', '5 4') + pl(hi, 'red') + (mo === 'SIR' || mo === 'SIRS' ? pl(hr, 'blue', '2 3') : '') +
        `<text class="axt" x="498" y="${Y(hs[fin]) - 6}" text-anchor="end" style="fill:var(--grn);font-weight:700">S</text><text class="axt" x="470" y="${Y(hi[fin]) - 6}" text-anchor="end" style="fill:var(--red);font-weight:700">I</text>` + (mo === 'SIR' || mo === 'SIRS' ? `<text class="axt" x="440" y="${Y(hr[fin]) - 6}" text-anchor="end" style="fill:var(--blue);font-weight:700">R</text>` : '');
      const pic = Math.max(...hi);
      $('#o').innerHTML = { SI: `<b>SI</b> : personne ne guérit, I(t) suit une courbe <b>logistique</b> en S et finit par atteindre N. Pic = ${r2(pic, 1)}.`,
        SIR: `<b>SIR</b> : I monte, atteint un pic (${r2(pic, 1)}), puis redescend vers 0 car les guéris sont immunisés. R finit à ${r2(hr[fin], 1)}.`,
        SIS: `<b>SIS</b> : βN = ${r2(b * N)} et γ = ${r2(g)}. ${b * N > g ? `Comme <b>βN &gt; γ</b>, croissance logistique vers un plateau I = N − γ/β = ${r2(N - g / b, 1)}.` : `Comme <b>βN ≤ γ</b>, I(t) décroît exponentiellement vers 0 : l’épidémie s’éteint.`}`,
        SIRS: `<b>SIRS</b> : les guéris perdent leur immunité au taux λ et redeviennent susceptibles ; l’infection ne disparaît plus, elle se stabilise (I final ≈ ${r2(hi[fin], 1)}).` }[mo];
    }
    el.querySelectorAll('#md button').forEach(x => x.onclick = () => { mo = x.dataset.m; el.querySelectorAll('#md button').forEach(y => y.classList.toggle('on', y === x)); dess(); });
    ['#b', '#ga', '#la'].forEach(s => $(s).oninput = dess); dess();
  };

  /* ===== 8. Précision / rappel / F ===== */
  L.evaluation = el => {
    const $ = cadre(el, 'Précision, rappel et F-mesure à partir des paires',
      `<div class="ctl"><label>TP <input type="number" id="tp" value="26" min="0"></label><label>FP <input type="number" id="fp" value="17" min="0"></label><label>FN <input type="number" id="fn" value="16" min="0"></label></div><div class="kv" id="kv"></div>
       <p class="out" style="color:var(--mut)">Valeurs par défaut : l’exemple du cours (2 communautés, 14 objets). TP = paires de même étiquette dans la même communauté ; FP = étiquettes différentes, même communauté ; FN = même étiquette, communautés différentes.</p>`);
    const dess = () => { const tp = +$('#tp').value, fp = +$('#fp').value, fn = +$('#fn').value, P = tp / (tp + fp || 1), Rc = tp / (tp + fn || 1), F = P + Rc ? 2 * P * Rc / (P + Rc) : 0;
      $('#kv').innerHTML = [['Précision P = TP/(TP+FP)', r2(P)], ['Rappel R = TP/(TP+FN)', r2(Rc)], ['F = 2·P·R/(P+R)', r2(F)]].map(k => `<div>${k[0]}<b>${k[1]}</b></div>`).join(''); };
    ['#tp', '#fp', '#fn'].forEach(s => $(s).oninput = dess); dess();
  };
})();

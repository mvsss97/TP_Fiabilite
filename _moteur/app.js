/* Moteur de révision — commun à tous les modules.
   Un module = un dossier avec index.html + data/*.js qui remplissent window.REV. */
(function () {
  const R = window.REV;
  const $ = (s, e = document) => e.querySelector(s);
  const $$ = (s, e = document) => [...e.querySelectorAll(s)];
  const KEY = 'rev-' + R.module.cle;
  const JOUR = () => Math.floor(Date.now() / 864e5);
  const PAS = [1, 1, 2, 4, 8, 16, 30]; // intervalles (jours) par boîte de Leitner

  let S = { lu: {}, quiz: {}, cartes: {}, examens: [], theme: '', taille: 17, dernier: '' };
  try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  if (!S.theme) S.theme = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'sombre' : 'clair';

  // [[a//b]] → fraction ; on remplace de l'intérieur vers l'extérieur pour autoriser l'imbrication
  const FR = /\[\[((?:(?!\[\[|\]\]|\/\/).)+)\/\/((?:(?!\[\[|\]\]).)+?)\]\]/g;
  const fx = h => { h = String(h); for (let i = 0; i < 4 && h.includes('[['); i++) h = h.replace(FR, '<span class="fr"><span>$1</span><span>$2</span></span>'); return h; };
  R.fx = fx;
  const txt = h => String(h).replace(/<[^>]+>/g, ' ').replace(/\[\[|\]\]/g, ' ').replace(/\/\//g, '/').replace(/\s+/g, ' ');
  const melange = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const CH = R.chapitres.sort((a, b) => a.n - b.n);
  const ch = n => CH.find(c => c.n == n);

  /* ---------- progression ---------- */
  const cid = (c, i) => c.n + '-' + i;
  const due = id => { const s = S.cartes[id]; return !s || s.d <= JOUR(); };
  const cartesDe = c => c.cartes.map((k, i) => ({ id: cid(c, i), r: k[0], v: k[1], ch: c }));
  const nbDues = c => cartesDe(c).filter(k => due(k.id)).length;
  function prog(c) {
    const lu = c.sections.filter(s => S.lu[s.id]).length / c.sections.length;
    const q = S.quiz[c.n] ? S.quiz[c.n].best : 0;
    const k = c.cartes.filter((_, i) => (S.cartes[cid(c, i)] || {}).b >= 3).length / c.cartes.length;
    return { lu, q, k, tot: Math.round((0.4 * lu + 0.3 * q + 0.3 * k) * 100) };
  }
  const progGlobal = () => Math.round(CH.reduce((a, c) => a + prog(c).tot, 0) / CH.length);

  /* ---------- coque ---------- */
  function coque() {
    document.documentElement.dataset.theme = S.theme;
    document.documentElement.style.setProperty('--fs', S.taille + 'px');
    $('#app').innerHTML = `
    <aside class="side">
      <a class="brand" href="#/accueil"><small>Interface de révision</small><b>${R.module.titre}</b></a>
      <div class="search"><input id="rech" type="search" placeholder="Rechercher une notion…" autocomplete="off" aria-label="Rechercher"><div class="res" hidden></div></div>
      <nav class="nav" id="nav"></nav>
      <div class="prefs">
        <button id="th" title="Changer de thème"></button>
        <button id="fm" title="Texte plus petit">A−</button><button id="fp" title="Texte plus grand">A+</button>
      </div>
    </aside>
    <main class="main"><div class="wrap" id="vue"></div></main>
    <button class="burger" aria-label="Menu">☰</button>`;
    $('#th').onclick = () => { S.theme = S.theme === 'sombre' ? 'clair' : 'sombre'; save(); document.documentElement.dataset.theme = S.theme; majPrefs(); };
    $('#fm').onclick = () => taille(-1); $('#fp').onclick = () => taille(1);
    $('.burger').onclick = () => document.body.classList.toggle('open');
    $('.main').addEventListener('click', () => document.body.classList.remove('open'));
    majPrefs(); recherche();
  }
  function majPrefs() { $('#th').textContent = S.theme === 'sombre' ? '☀ Clair' : '☾ Sombre'; }
  function taille(d) { S.taille = Math.max(14, Math.min(22, S.taille + d)); save(); document.documentElement.style.setProperty('--fs', S.taille + 'px'); }

  function nav(actif) {
    const dues = CH.reduce((a, c) => a + nbDues(c), 0);
    const l = (h, ico, t, extra = '') => `<a href="#/${h}" class="${actif === h ? 'on' : ''}"><span class="num">${ico}</span><span class="t">${t}</span>${extra}</a>`;
    $('#nav').innerHTML =
      l('accueil', '⌂', 'Accueil') +
      `<div class="sep">Chapitres</div>` +
      CH.map(c => `<a href="#/ch/${c.n}/cours" class="${actif === 'ch' + c.n ? 'on' : ''}"><span class="num">${c.n}</span><span class="t">${c.titre}</span><span class="pc">${prog(c).tot}%</span></a>`).join('') +
      `<div class="sep">S’entraîner</div>` +
      l('revision', '↻', 'Révision du jour', dues ? `<span class="badge">${dues}</span>` : '') +
      l('examen', '✎', 'Examen blanc') +
      (R.labsMeta && R.labsMeta.length ? l('labo', '⚗', 'Laboratoire') : '') +
      `<div class="sep">Aide-mémoire</div>` +
      l('formules', 'ƒ', 'Formulaire') +
      l('glossaire', 'Aa', R.module.glossTitre || 'Glossaire EN → FR');
  }

  /* ---------- recherche ---------- */
  function recherche() {
    const inp = $('#rech'), box = $('.res');
    let idx = null;
    const build = () => {
      idx = [];
      CH.forEach(c => {
        c.sections.forEach(s => idx.push({ t: s.t, sub: 'Chap. ' + c.n + ' · cours', h: `#/ch/${c.n}/cours/${s.id}`, x: (s.t + ' ' + txt(s.h)).toLowerCase() }));
        (c.glossaire || []).forEach(g => idx.push({ t: g[0] + ' → ' + g[1], sub: 'Glossaire', h: '#/glossaire', x: (g.join(' ')).toLowerCase() }));
      });
    };
    const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    inp.oninput = () => {
      const q = norm(inp.value.trim());
      if (q.length < 2) { box.hidden = true; return; }
      if (!idx) { build(); idx.forEach(o => o.x = norm(o.x)); }
      const r = idx.filter(o => o.x.includes(q)).sort((a, b) => norm(b.t).includes(q) - norm(a.t).includes(q)).slice(0, 12);
      box.innerHTML = r.length ? r.map(o => `<a href="${o.h}">${o.t}<small>${o.sub}</small></a>`).join('') : '<a>Aucun résultat</a>';
      box.hidden = false;
    };
    box.onclick = () => { box.hidden = true; inp.value = ''; };
    document.addEventListener('click', e => { if (!e.target.closest('.search')) box.hidden = true; });
  }

  /* ---------- vues ---------- */
  const V = {};

  V.accueil = () => {
    const dues = CH.reduce((a, c) => a + nbDues(c), 0);
    const nbS = CH.reduce((a, c) => a + c.sections.length, 0), luS = CH.reduce((a, c) => a + c.sections.filter(s => S.lu[s.id]).length, 0);
    const best = S.examens.length ? Math.max(...S.examens.map(e => e.n)) : null;
    return `
    <div class="eyebrow">${R.module.niveau || ''}</div>
    <h1>${R.module.titre}</h1>
    <p class="lead">${R.module.intro}</p>
    <div class="row" style="margin-top:16px">
      <a class="btn pri" href="${S.dernier || '#/ch/1/cours'}">${S.dernier ? 'Reprendre où j’en étais' : 'Commencer le chapitre 1'}</a>
      ${dues ? `<a class="btn" href="#/revision">Réviser ${dues} carte${dues > 1 ? 's' : ''} du jour</a>` : ''}
      <a class="btn" href="#/examen">Examen blanc</a>
    </div>
    <div class="stats">
      <div class="stat"><b>${progGlobal()}%</b><span>maîtrise globale</span><div class="bar" style="margin-top:8px"><i style="width:${progGlobal()}%"></i></div></div>
      <div class="stat"><b>${luS}/${nbS}</b><span>sections comprises</span></div>
      <div class="stat"><b>${dues}</b><span>cartes à revoir aujourd’hui</span></div>
      <div class="stat"><b>${best === null ? '—' : best + '/20'}</b><span>meilleur examen blanc</span></div>
    </div>
    <div class="card">
      <h2>La méthode pour viser 18–20</h2>
      <ol class="steps">
        <li><div><b>Lire le cours</b> d’un chapitre, section par section. Réponds aux « questions éclair » <em>avant</em> de les ouvrir, puis coche « J’ai compris ».</div></li>
        ${R.labsMeta && R.labsMeta.length ? `<li><div><b>Manipuler</b> les simulateurs du Laboratoire : une formule que tu as vue bouger se retient toute seule.</div></li>` : ''}
        <li><div><b>Mémoriser</b> avec les cartes. Elles reviennent d’elles-mêmes au bon moment (1, 2, 4, 8, 16 jours) : fais la « Révision du jour » chaque jour, 10 minutes.</div></li>
        <li><div><b>Te tester</b> : quiz du chapitre, exercices rédigés (cache la solution !), puis examen blanc chronométré. Relis la Fiche la veille.</div></li>
      </ol>
    </div>
    <h2 style="margin-top:30px">Les chapitres</h2>
    <div class="grid">${CH.map(c => { const p = prog(c); return `
      <a class="chap" href="#/ch/${c.n}/cours">
        <span class="num">${c.n}</span><h3>${c.titre}</h3><small>${c.en}</small>
        <div class="bar"><i style="width:${p.tot}%"></i></div>
        <div class="meta"><span>${c.sections.length} sections · ${c.cartes.length} cartes · ${c.quiz.length} QCM</span><span>${p.tot}%</span></div>
      </a>`; }).join('')}</div>
    <p style="color:var(--mut);font-size:.84em;margin-top:26px">${R.module.source || ''} Ta progression est enregistrée dans ce navigateur, sur cet ordinateur.</p>`;
  };

  const ONG = [['cours', 'Cours'], ['cartes', 'Cartes mémoire'], ['quiz', 'Quiz'], ['exos', 'Exercices'], ['fiche', 'Fiche']];
  V.ch = (n, ong = 'cours', sid) => {
    const c = ch(n); if (!c) return V.accueil();
    S.dernier = `#/ch/${n}/${ong}`; save();
    const tete = `<div class="eyebrow">Chapitre ${c.n} · ${c.en}</div><h1>${c.titre}</h1>
      <div class="tabs">${ONG.map(o => `<a href="#/ch/${n}/${o[0]}" class="${ong === o[0] ? 'on' : ''}">${o[1]}</a>`).join('')}</div>`;
    return tete + `<div id="corps"></div>`;
  };
  const corps = {
    cours(c, el) {
      el.innerHTML = `
      <div class="card"><h3>À la fin de ce chapitre, tu sais…</h3><ul>${c.objectifs.map(o => `<li>${fx(o)}</li>`).join('')}</ul>
        <h4 style="margin-top:14px">Plan</h4><ul class="toc">${c.sections.map(s => `<li><span class="dot ${S.lu[s.id] ? 'ok' : ''}" data-d="${s.id}"></span><a href="#/ch/${c.n}/cours/${s.id}">${s.id} — ${s.t}</a></li>`).join('')}</ul></div>
      ${c.sections.map(s => `<section class="card sec" id="s-${s.id}"><h2><span class="n">${s.id}</span>${s.t}</h2>${fx(s.h)}
        <div class="done"><label class="${S.lu[s.id] ? 'ok' : ''}"><input type="checkbox" data-lu="${s.id}" ${S.lu[s.id] ? 'checked' : ''}> J’ai compris cette section</label></div></section>`).join('')}
      <div class="card"><h3>Chapitre lu. Et maintenant ?</h3><p>Ce que tu viens de lire s’efface vite si tu ne le rappelles pas. Enchaîne tout de suite :</p>
        <div class="row"><a class="btn pri" href="#/ch/${c.n}/cartes">Cartes mémoire</a><a class="btn" href="#/ch/${c.n}/quiz">Quiz</a><a class="btn" href="#/ch/${c.n}/exos">Exercices</a></div></div>`;
      $$('[data-lu]', el).forEach(b => b.onchange = () => {
        S.lu[b.dataset.lu] = b.checked; if (!b.checked) delete S.lu[b.dataset.lu]; save();
        b.parentNode.classList.toggle('ok', b.checked); $(`[data-d="${b.dataset.lu}"]`, el).classList.toggle('ok', b.checked); nav('ch' + c.n);
      });
    },
    cartes(c, el) { sessionCartes(el, cartesDe(c), 'du chapitre ' + c.n); },
    quiz(c, el) {
      const st = S.quiz[c.n];
      const lance = qs => quiz(el, qs, { fin: (ok, faux) => {
        if (qs.length === c.quiz.length) { const r = ok / qs.length; S.quiz[c.n] = { best: Math.max(st ? st.best : 0, r), faux: faux.map(q => c.quiz.indexOf(q)) }; save(); nav('ch' + c.n); }
      }, retour: () => corps.quiz(c, el) });
      el.innerHTML = `<div class="card"><h2>Quiz — ${c.titre}</h2>
        <p>${c.quiz.length} questions à choix multiple, avec l’explication après chaque réponse. Quand plusieurs réponses sont justes, c’est indiqué : il faut toutes les cocher (tout ou rien, comme à l’examen). Raccourcis clavier : <b>1–4</b> pour répondre, <b>Entrée</b> pour valider ou continuer.</p>
        ${st ? `<p>Meilleur score : <b>${Math.round(st.best * 200) / 10}/20</b>${st.faux && st.faux.length ? ` · ${st.faux.length} question(s) ratée(s) la dernière fois` : ''}</p>` : ''}
        <div class="row"><button class="btn pri" id="go">Lancer le quiz</button>${st && st.faux && st.faux.length ? `<button class="btn" id="err">Refaire seulement mes erreurs</button>` : ''}</div></div>`;
      $('#go', el).onclick = () => lance(melange(c.quiz));
      if ($('#err', el)) $('#err', el).onclick = () => lance(st.faux.map(i => c.quiz[i]).filter(Boolean));
    },
    exos(c, el) {
      el.innerHTML = `<p class="lead">Écris ta réponse sur papier <b>avant</b> d’ouvrir la correction : c’est l’effort de recherche qui fabrique le souvenir.</p>` +
        c.exos.map((x, i) => `<div class="exo"><div class="lvl">Exercice ${i + 1} · ${x.n || 'application'}</div><h3>${x.t}</h3>${fx(x.e)}<details><summary>Voir la correction détaillée</summary>${fx(x.s)}</details></div>`).join('');
    },
    fiche(c, el) {
      el.innerHTML = `<div class="row noprint"><button class="btn" onclick="print()">Imprimer la fiche</button></div>
      <div class="card"><h2>L’essentiel</h2><ul>${c.resume.map(r => `<li>${fx(r)}</li>`).join('')}</ul></div>
      ${c.formules.length ? `<div class="card"><h2>Formules à connaître</h2>${tabFormules(c)}</div>` : ''}
      <div class="card"><h2>Pièges classiques</h2><ul>${c.pieges.map(r => `<li>${fx(r)}</li>`).join('')}</ul></div>`;
    }
  };
  const tabFormules = c => `<div class="tw"><table><tbody>${c.formules.map(f => `<tr><th style="width:30%">${f[0]}</th><td><span style="font-family:var(--serif);font-size:1.08em">${fx(f[1])}</span>${f[2] ? `<br><small style="color:var(--mut)">${fx(f[2])}</small>` : ''}</td></tr>`).join('')}</tbody></table></div>`;

  V.formules = () => `<div class="eyebrow">Aide-mémoire</div><h1>Formulaire complet</h1><p class="lead">Toutes les formules du module, chapitre par chapitre.</p>
    <div class="row noprint"><button class="btn" onclick="print()">Imprimer</button></div>` +
    CH.filter(c => c.formules.length).map(c => `<div class="card"><h2>${c.n}. ${c.titre}</h2>${tabFormules(c)}</div>`).join('');

  V.glossaire = () => `<div class="eyebrow">Aide-mémoire</div><h1>${R.module.glossTitre || 'Glossaire anglais → français'}</h1>
    <p class="lead">${R.module.glossIntro || 'Le cours est en anglais : voici chaque terme technique avec sa traduction et son sens en une phrase.'}</p>
    <p><input id="gf" type="search" placeholder="Filtrer…" style="padding:9px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);font:inherit;width:min(360px,100%)"></p>
    <div class="tw"><table id="gt"><thead><tr><th>${(R.module.glossCols || ['Anglais', 'Français'])[0]}</th><th>${(R.module.glossCols || ['Anglais', 'Français'])[1]}</th><th>En une phrase</th><th class="c">Chap.</th></tr></thead><tbody>${
      CH.flatMap(c => (c.glossaire || []).map(g => [...g, c.n])).sort((a, b) => a[0].localeCompare(b[0])).map(g => `<tr><td><b>${g[0]}</b></td><td>${g[1]}</td><td>${fx(g[2])}</td><td class="c"><a href="#/ch/${g[3]}/cours">${g[3]}</a></td></tr>`).join('')}</tbody></table></div>`;

  V.revision = () => `<div class="eyebrow">S’entraîner</div><h1>Révision du jour</h1><div id="corps"></div>`;
  V.labo = () => `<div class="eyebrow">S’entraîner</div><h1>Laboratoire</h1><p class="lead">Manipule les notions : change un paramètre, observe ce qui bouge, et relie-le à la formule.</p>` +
    R.labsMeta.map(m => `<div data-lab="${m[0]}"></div>`).join('');

  V.examen = () => `<div class="eyebrow">S’entraîner</div><h1>Examen blanc</h1><div id="corps"></div>`;
  function examen(el) {
    const hist = S.examens.slice(-6).reverse();
    el.innerHTML = `<div class="card"><p>Questions tirées au hasard dans les chapitres choisis, <b>sans correction immédiate</b> et chronométrées. La note sur 20 et la correction complète arrivent à la fin.</p>
      <h4>Chapitres</h4><div class="row">${CH.map(c => `<label class="btn sm"><input type="checkbox" class="xc" value="${c.n}" checked> ${c.n}. ${c.titre}</label>`).join('')}</div>
      <h4 style="margin-top:14px">Nombre de questions</h4><div class="row">${[10, 20, 40].map(n => `<label class="btn sm"><input type="radio" name="xn" value="${n}" ${n === 20 ? 'checked' : ''}> ${n}</label>`).join('')}</div>
      <p style="margin-top:16px"><button class="btn pri" id="go">Démarrer (1 minute par question)</button></p></div>
      ${hist.length ? `<div class="card"><h3>Mes derniers examens</h3><div class="tw"><table><tbody>${hist.map(e => `<tr><td>${new Date(e.t).toLocaleDateString('fr-FR')}</td><td>${e.q} questions</td><td class="c"><b>${e.n}/20</b></td></tr>`).join('')}</tbody></table></div></div>` : ''}`;
    $('#go', el).onclick = () => {
      const cs = $$('.xc:checked', el).map(x => +x.value); if (!cs.length) return;
      const n = +$('[name=xn]:checked', el).value;
      const pool = melange(CH.filter(c => cs.includes(c.n)).flatMap(c => c.quiz.map(q => Object.assign({ ch: c.n }, q)))).slice(0, n);
      quiz(el, pool, { differe: true, duree: pool.length * 60, fin: ok => { S.examens.push({ t: Date.now(), n: Math.round(ok / pool.length * 200) / 10, q: pool.length }); save(); }, retour: () => examen(el) });
    };
  }

  /* ---------- moteur de quiz ---------- */
  // une question peut avoir une seule bonne réponse (a: 0) ou plusieurs (a: [0, 2])
  const multi = q => Array.isArray(q.a);
  const juste = (q, r) => multi(q) ? Array.isArray(r) && r.length === q.a.length && q.a.every(k => r.includes(k)) : r === q.a;
  const libelle = (q, r) => r === undefined || (Array.isArray(r) && !r.length) ? '(sans réponse)' : [].concat(r).map(k => fx(q.o[k])).join(' <b>+</b> ');
  function quiz(el, qs, o = {}) {
    let i = 0, ok = 0; const faux = [], rep = [];
    const ord = qs.map(q => melange(q.o.map((_, k) => k)));
    let fin_t = o.duree ? Date.now() + o.duree * 1000 : 0, tic = 0;
    function show() {
      const q = qs[i], m = multi(q);
      el.innerHTML = `<div class="card"><div class="qz-top"><span>Question ${i + 1} / ${qs.length}${q.ch ? ' · chap. ' + q.ch : ''}</span>${o.duree ? '<span class="timer" id="tm"></span>' : `<span>${ok} bonne${ok > 1 ? 's' : ''} réponse${ok > 1 ? 's' : ''}</span>`}</div>
        <div class="bar"><i style="width:${i / qs.length * 100}%"></i></div>
        <h3 class="qz-q">${fx(q.q)}</h3>
        ${m ? '<p class="qz-multi">Plusieurs réponses possibles : coche <b>toutes</b> les bonnes, puis valide.</p>' : ''}
        <div class="qz-o">${ord[i].map((k, j) => `<button class="opt" data-k="${k}"><b>${j + 1}</b><span>${fx(q.o[k])}</span></button>`).join('')}</div>
        ${m ? '<p style="margin-top:12px"><button class="btn pri" id="val">Valider</button></p>' : ''}<div class="qz-fb"></div></div>`;
      if (m) {
        $$('.opt', el).forEach(b => b.onclick = () => b.classList.toggle('sel'));
        $('#val', el).onclick = () => repond($$('.opt.sel', el).map(b => +b.dataset.k));
      } else $$('.opt', el).forEach(b => b.onclick = () => repond(+b.dataset.k));
      if (o.duree) { clearInterval(tic); const up = () => { const r = Math.max(0, Math.round((fin_t - Date.now()) / 1000)); const t = $('#tm', el); if (!t) return clearInterval(tic); t.textContent = Math.floor(r / 60) + ':' + String(r % 60).padStart(2, '0'); if (!r) { clearInterval(tic); fin(); } }; up(); tic = setInterval(up, 500); }
    }
    function repond(k) {
      const q = qs[i], good = juste(q, k), bonnes = [].concat(q.a), choisies = [].concat(k); rep[i] = k;
      if (good) ok++; else faux.push(q);
      if (o.differe) { i++; return i < qs.length ? show() : fin(); }
      $$('.opt', el).forEach(b => { b.disabled = true; b.classList.remove('sel'); const kk = +b.dataset.k; if (bonnes.includes(kk)) b.classList.add('ok'); else if (choisies.includes(kk)) b.classList.add('ko'); });
      const v = $('#val', el); if (v) v.parentNode.remove();
      $('.qz-fb', el).innerHTML = `<div class="fb ${good ? 'ok' : 'ko'}"><b>${good ? 'Exact.' : 'Pas tout à fait.'}</b> ${fx(q.e || '')}</div><button class="btn pri" id="nx">${i + 1 < qs.length ? 'Question suivante' : 'Voir mon résultat'}</button>`;
      $('#nx', el).onclick = () => { i++; i < qs.length ? show() : fin(); }; $('#nx', el).focus();
    }
    function fin() {
      clearInterval(tic);
      if (o.differe) for (let j = 0; j < qs.length; j++) if (rep[j] === undefined) faux.push(qs[j]);
      o.fin && o.fin(ok, faux);
      const n = Math.round(ok / qs.length * 200) / 10;
      const msg = n >= 18 ? 'Excellent : tu es au niveau visé.' : n >= 14 ? 'Solide. Reprends les points ratés pour passer au-dessus de 18.' : n >= 10 ? 'La base est là. Relis les sections concernées puis recommence.' : 'Retourne au cours de ce chapitre, puis refais le quiz : la note monte vite.';
      const corr = (o.differe ? qs : faux).map(q => { const j = qs.indexOf(q), r = rep[j]; return `<div class="exo"><h4>${fx(q.q)}</h4>${!juste(q, r) ? `<p style="color:var(--red)">Ta réponse : ${libelle(q, r)}</p>` : ''}<p style="color:var(--grn)"><b>Bonne réponse : ${libelle(q, q.a)}</b></p><p>${fx(q.e || '')}</p></div>`; }).join('');
      el.innerHTML = `<div class="card" style="text-align:center"><div class="eyebrow">Résultat</div><div class="note">${n}<small style="font-size:.4em">/20</small></div>
        <p>${ok} bonne${ok > 1 ? 's' : ''} réponse${ok > 1 ? 's' : ''} sur ${qs.length}. ${msg}</p>
        <div class="row" style="justify-content:center"><button class="btn pri" id="re">Recommencer</button></div></div>
        ${corr ? `<h2>${o.differe ? 'Correction complète' : 'À retravailler'}</h2>${corr}` : ''}`;
      $('#re', el).onclick = o.retour || show;
      scrollTo(0, 0);
    }
    show();
  }
  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    const val = $('#val'); if (e.key === 'Enter' && val) { e.preventDefault(); return val.click(); }
    const o = $$('.opt:not(:disabled)'); const k = '1234'.indexOf(e.key);
    if (o.length && k >= 0 && o[k]) return o[k].click();
    const f = $('.fc'); if (!f) return;
    if (e.key === ' ') { e.preventDefault(); f.click(); }
    const b = $$('.fc-act button'); const j = '123'.indexOf(e.key); if (j >= 0 && b[j]) b[j].click();
  });

  /* ---------- cartes mémoire (Leitner) ---------- */
  function sessionCartes(el, toutes, quoi) {
    const dues = toutes.filter(k => due(k.id));
    const bx = [0, 0, 0, 0]; toutes.forEach(k => { const b = (S.cartes[k.id] || {}).b || 0; bx[b === 0 ? 0 : b < 3 ? 1 : b < 5 ? 2 : 3]++; });
    const etat = `<div class="boxes"><span>Nouvelles : ${bx[0]}</span><span>En apprentissage : ${bx[1]}</span><span>Presque acquises : ${bx[2]}</span><span>Maîtrisées : ${bx[3]}</span></div>`;
    function accueil() {
      el.innerHTML = `<div class="card" style="text-align:center"><h2>Cartes mémoire ${quoi}</h2>${etat}
        <p>${dues.length ? `<b>${dues.length}</b> carte${dues.length > 1 ? 's' : ''} à revoir maintenant.` : 'Rien à revoir aujourd’hui : tout est planifié pour plus tard. Tu peux quand même tout repasser.'}</p>
        <p style="color:var(--mut);font-size:.9em">Lis la question, réponds <b>à voix haute ou dans ta tête</b>, puis retourne la carte (clic ou Espace) et note-toi honnêtement (touches 1, 2, 3).</p>
        <div class="row" style="justify-content:center">${dues.length ? `<button class="btn pri" id="go">Réviser les ${dues.length} cartes dues</button>` : ''}<button class="btn" id="all">Tout repasser (${toutes.length})</button></div></div>`;
      if ($('#go', el)) $('#go', el).onclick = () => joue(melange(dues));
      $('#all', el).onclick = () => joue(melange(toutes));
    }
    function joue(file) {
      let fait = 0; const total = file.length;
      function show() {
        if (!file.length) { el.innerHTML = `<div class="card" style="text-align:center"><h2>Session terminée</h2><p>${fait} carte${fait > 1 ? 's' : ''} révisée${fait > 1 ? 's' : ''}. Les cartes sues reviendront dans quelques jours, les autres dès demain.</p><div class="row" style="justify-content:center"><button class="btn pri" id="bk">Retour</button></div></div>`; $('#bk', el).onclick = () => sessionCartes(el, toutes, quoi); nav(location.hash.includes('/ch/') ? 'ch' + toutes[0].ch.n : 'revision'); return; }
        const k = file[0];
        el.innerHTML = `<div class="qz-top"><span>Carte ${Math.min(fait + 1, total)} / ${total} · chap. ${k.ch.n}</span><span>${file.length} restante${file.length > 1 ? 's' : ''}</span></div><div class="bar"><i style="width:${fait / total * 100}%"></i></div>
          <div class="fc" tabindex="0"><div class="fc-in"><div class="fc-f"><span class="k">Question</span><div class="txt">${fx(k.r)}</div><span class="hint">Clique ou appuie sur Espace pour voir la réponse</span></div><div class="fc-b"><div class="txt">${fx(k.v)}</div></div></div></div>
          <div class="fc-act"></div>`;
        const f = $('.fc', el);
        f.onclick = () => { f.classList.toggle('flip'); if (!$('.fc-act button', el)) { $('.fc-act', el).innerHTML = `<button class="btn r0">1 · À revoir</button><button class="btn r1">2 · Hésitant</button><button class="btn r2">3 · Je savais</button>`; $$('.fc-act button', el).forEach((b, n) => b.onclick = () => note(k, n)); } };
      }
      function note(k, n) {
        const s = S.cartes[k.id] || { b: 0, d: 0 };
        file.shift();
        if (n === 0) { s.b = 1; s.d = JOUR(); file.push(k); }
        else { if (n === 1) s.b = Math.max(1, s.b); else s.b = Math.min(6, s.b + 1); s.d = JOUR() + (n === 1 ? 1 : PAS[s.b]); fait++; }
        S.cartes[k.id] = s; save(); show();
      }
      show();
    }
    accueil();
  }

  /* ---------- routeur ---------- */
  function route() {
    const p = (location.hash || '#/accueil').slice(2).split('/');
    const vue = $('#vue');
    let actif = p[0];
    if (p[0] === 'ch') { actif = 'ch' + p[1]; vue.innerHTML = V.ch(p[1], p[2], p[3]); const c = ch(p[1]); if (c) (corps[p[2]] || corps.cours)(c, $('#corps')); }
    else { vue.innerHTML = (V[p[0]] || V.accueil)(); if (!V[p[0]]) actif = 'accueil'; }
    if (p[0] === 'revision') sessionCartes($('#corps'), CH.flatMap(cartesDe), 'de tout le module');
    if (p[0] === 'examen') examen($('#corps'));
    if (p[0] === 'glossaire') $('#gf').oninput = e => { const q = e.target.value.toLowerCase(); $$('#gt tbody tr').forEach(r => r.hidden = !r.textContent.toLowerCase().includes(q)); };
    $$('[data-lab]', vue).forEach(e => { const f = R.labs && R.labs[e.dataset.lab]; if (f) try { f(e); } catch (err) { e.textContent = 'Simulateur indisponible.'; console.error(err); } });
    nav(actif);
    document.body.classList.remove('open');
    const cible = p[0] === 'ch' && p[3] ? document.getElementById('s-' + p[3]) : null;
    if (cible) cible.scrollIntoView(); else scrollTo(0, 0);
    document.title = (p[0] === 'ch' && ch(p[1]) ? ch(p[1]).titre + ' · ' : '') + R.module.titre;
  }

  coque(); route();
  addEventListener('hashchange', route);
})();

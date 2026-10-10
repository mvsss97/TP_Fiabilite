/* Exercices intégrés au cours, communs à tous les modules : calc (réponse tapée), choix, relier, dessin (figure de graphe).
   À charger APRÈS le labs.js du module (qui crée REV.labs). */
(function () {
  const R = window.REV, L = R.labs = R.labs || {};
  const nf = (x, d = 4) => { if (!isFinite(x)) return '—'; const a = Math.abs(x); if (a !== 0 && a < 1e-4) return x.toExponential(2).replace('.', ','); return (Math.round(x * 10 ** d) / 10 ** d).toString().replace('.', ','); };
  const melange = t => { const a = t.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const lire = s => {
    s = String(s).trim().replace(/\s/g, '').replace(/,/g, '.').replace(/[x×*]10\^?\(?(-?\d+)\)?/i, 'e$1');
    let p = false; if (s.endsWith('%')) { p = true; s = s.slice(0, -1); }
    const m = s.match(/^(-?[\d.]+)\/([\d.]+)$/); let v;
    if (m) v = +m[1] / +m[2]; else if (/^-?(\d+\.?\d*|\.\d+)(e-?\d+)?$/i.test(s)) v = +s; else return NaN;
    return p ? v / 100 : v;
  };
  const extrait = (el, sel) => { const x = el.querySelector(sel); if (!x) return ''; const h = x.innerHTML; x.remove(); return h; };

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


  /* ===== figure de graphe statique =====
     <div data-lab="dessin" data-p="A:60,40 B:200,40" data-e="A-B B>C A-C:+" [data-h="250"] [data-hi="A B"]></div>
     « - » arête, « > » arc orienté, suffixe « :+ » ou « :- » pour un signe. */
  L.dessin = el => {
    const P = {}; (el.dataset.p || '').trim().split(/\s+/).forEach(t => { const [n, c] = t.split(':'), [x, y] = c.split(',').map(Number); P[n] = [x, y]; });
    const hi = (el.dataset.hi || '').split(/\s+/), H = +el.dataset.h || 240, id = 'fl' + Math.random().toString(36).slice(2, 8);
    const ar = (el.dataset.e || '').trim().split(/\s+/).filter(Boolean).map(t => { const [l, s] = t.split(':'), o = l.includes('>'), [a, b] = l.split(o ? '>' : '-'); return { a, b, o, s }; });
    const lignes = ar.map(e => {
      let [x1, y1] = P[e.a], [x2, y2] = P[e.b]; const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1;
      if (e.o) { const ox = -dy / d * 5, oy = dx / d * 5; x1 += ox; y1 += oy; x2 += ox; y2 += oy; }
      const col = e.s === '+' ? 'var(--grn)' : e.s === '-' ? 'var(--red)' : '';
      const mx = (x1 + x2) / 2 - dy / d * 13, my = (y1 + y2) / 2 + dx / d * 13;
      return `<line class="gl" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${col ? ` style="stroke:${col};stroke-width:2.6"` : ''}${e.o ? ` marker-end="url(#${id})"` : ''}/>` + (e.s ? `<text x="${mx}" y="${my}" text-anchor="middle" dominant-baseline="central" style="font:700 17px var(--sans);fill:${col}">${e.s === '-' ? '−' : '+'}</text>` : '');
    }).join('');
    el.className = 'lab'; el.style.padding = '8px';
    el.innerHTML = `<svg viewBox="0 0 520 ${H}" style="max-width:560px;margin:auto"><defs><marker id="${id}" viewBox="0 0 10 10" refX="25" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor" style="color:var(--mut)"/></marker></defs>${lignes}` +
      Object.keys(P).map(n => `<circle class="gn${hi.includes(n) ? ' cur' : ''}" cx="${P[n][0]}" cy="${P[n][1]}" r="16"/><text class="gt" x="${P[n][0]}" y="${P[n][1]}">${n}</text>`).join('') + '</svg>';
  };
  /* ===== remettre des étapes dans l'ordre : <div data-lab="ordre"><p>consigne</p><ol><li>étape 1</li>…</ol></div> ===== */
  L.ordre = el => {
    const ol = el.querySelector('ol'), bon = [...ol.children].map(li => li.innerHTML); ol.remove();
    const enonce = el.innerHTML; el.className = 'exo pra';
    let cur;
    const dessine = (fb = '') => {
      el.innerHTML = `<div class="lvl">À toi · remettre dans l’ordre</div>${enonce}
        ${cur.map((k, i) => `<div class="rl od" data-i="${i}" style="grid-template-columns:28px 1fr auto"><b>${i + 1}.</b><span>${bon[k]}</span><span><button class="btn sm" data-u="${i}" ${i ? '' : 'disabled'} aria-label="Monter">↑</button> <button class="btn sm" data-d="${i}" ${i < cur.length - 1 ? '' : 'disabled'} aria-label="Descendre">↓</button></span></div>`).join('')}
        <div class="ctl"><button class="btn sm pri" data-v>Vérifier</button><button class="btn sm" data-re>Mélanger</button></div><div data-fb>${fb}</div>`;
      el.querySelectorAll('[data-u]').forEach(b => b.onclick = () => { const i = +b.dataset.u; [cur[i - 1], cur[i]] = [cur[i], cur[i - 1]]; dessine(); });
      el.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { const i = +b.dataset.d; [cur[i + 1], cur[i]] = [cur[i], cur[i + 1]]; dessine(); });
      el.querySelector('[data-re]').onclick = init;
      el.querySelector('[data-v]').onclick = () => {
        const ok = cur.every((k, i) => bon[k] === bon[i]), n = cur.filter((k, i) => bon[k] === bon[i]).length;
        dessine(`<div class="fb ${ok ? 'ok' : 'ko'}"><b>${ok ? 'Juste.' : n + ' / ' + cur.length + ' à la bonne place.'}</b>${ok ? ' L’ordre est le bon.' : ' Les lignes en rouge sont mal placées : continue.'}</div>`);
        el.querySelectorAll('.od').forEach((r, i) => r.classList.add(bon[cur[i]] === bon[i] ? 'ok' : 'ko'));
      };
    };
    const init = () => { do { cur = melange(bon.map((_, i) => i)); } while (bon.length > 1 && cur.every((k, i) => k === i)); dessine(); };
    init();
  };

  /* ===== citer de mémoire : <div data-lab="rappel"><p>question</p><ul><li>Affiché|mot-clé|autre mot-clé</li>…</ul><div class="sol">…</div></div> ===== */
  L.rappel = el => {
    const norme = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    const ul = el.querySelector('ul'), items = [...ul.children].map(li => { const p = li.innerHTML.split('|').map(x => x.trim()); return { aff: p[0], cles: p.map(norme).filter(Boolean) }; }); ul.remove();
    const sol = extrait(el, '.sol'), enonce = el.innerHTML;
    el.className = 'exo pra';
    el.innerHTML = `<div class="lvl">À toi · citer de mémoire (${items.length} éléments)</div>${enonce}
      <textarea rows="${Math.min(8, items.length + 1)}" placeholder="Écris un élément par ligne, sans regarder le cours" aria-label="Ta réponse" style="width:100%;font:inherit;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--panel);color:var(--ink)"></textarea>
      <div class="ctl"><button class="btn sm pri" data-v>Vérifier</button></div><div data-fb></div>${sol ? `<details><summary>Voir la réponse rédigée</summary>${sol}</details>` : ''}`;
    el.querySelector('[data-v]').onclick = () => {
      const txt = ' ' + norme(el.querySelector('textarea').value) + ' ';
      const ok = items.map(it => it.cles.some(c => txt.includes(' ' + c) || txt.includes(c + ' ')));
      const n = ok.filter(Boolean).length;
      el.querySelector('[data-fb]').innerHTML = `<div class="fb ${n === items.length ? 'ok' : 'ko'}"><b>${n} / ${items.length}</b> ${n === items.length ? '— tu les as tous.' : '— complète de mémoire avant d’ouvrir la réponse.'}<br>${items.map((it, i) => `<span style="display:inline-block;margin:3px 6px 0 0;padding:1px 9px;border-radius:9px;background:var(--${ok[i] ? 'grn' : 'red'}-soft)">${ok[i] ? '✓ ' + it.aff : '… manquant'}</span>`).join('')}</div>`;
    };
  };
})();

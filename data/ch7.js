REV.chapitres.push({
n: 7, titre: 'Cours 3 (C) — Lois continues, exponentielle, montages', en: 'Densité, loi exponentielle, absence de mémoire, série et parallèle, Erlang, Weibull, normale',
objectifs: [
  'passer d’une <b>densité</b> à une probabilité et à une <b>fonction de répartition</b> ;',
  'écrire <b>R(t)</b>, <b>F(t)</b>, <b>f(t)</b> et le <b>MTTF</b> d’une loi exponentielle ;',
  'manipuler <b>e</b> et <b>ln</b> pour retrouver λ ou un temps ;',
  'calculer une probabilité de panne <b>entre deux instants</b> ;',
  'démontrer et utiliser l’<b>absence de mémoire</b> (exercice de la garantie) ;',
  'calculer la fiabilité d’un montage <b>série</b>, <b>parallèle</b>, <b>2 sur 3</b> ;',
  'reconnaître et démontrer la loi d’<b>Erlang</b> ; situer <b>Weibull</b> et la loi <b>normale</b>.'
],
sections: [
{ id: '7.1', t: 'Variable continue : densité et fonction de répartition', h: `
<p>Une durée de vie peut prendre n’importe quelle valeur positive : 812,3 heures, 812,31 heures… On ne peut plus donner une probabilité à chaque valeur. On décrit la variable par une <b>densité</b>.</p>
<div class="def">X est une variable <b>à densité f</b> si, pour tout intervalle, P(a &lt; X ≤ b) = ∫<sub>a</sub><sup>b</sup> f(x) dx : la probabilité est l’<b>aire sous la courbe</b> de f entre a et b. La densité est positive et son aire totale vaut 1.</div>
<div class="def">La <b>fonction de répartition</b> est F(x) = P(X ≤ x) = ∫<sub>−∞</sub><sup>x</sup> f(t) dt. Elle croît de 0 à 1. Si F est dérivable, sa dérivée est la densité : <b>f = F′</b>.</div>
<div class="f">P(a &lt; X ≤ b) = F(b) − F(a)<small>C’est la formule qui sert dans tous les exercices : une probabilité sur un intervalle est une <b>différence</b> de deux valeurs de F.</small></div>
<div class="warn">Pour une variable continue, P(X = a) = 0 : un point n’a pas d’aire. Conséquence pratique : P(X &lt; a) = P(X ≤ a), on ne se soucie pas des inégalités strictes ou larges.</div>
<div class="tw"><table>
<thead><tr><th></th><th>Variable discrète</th><th>Variable à densité f</th></tr></thead>
<tbody>
<tr><th>P(a &lt; X ≤ b)</th><td>somme des P(X = x<sub>k</sub>) pour a &lt; x<sub>k</sub> ≤ b</td><td>∫<sub>a</sub><sup>b</sup> f(t) dt</td></tr>
<tr><th>F(x) = P(X ≤ x)</th><td>somme des P(X = x<sub>k</sub>) pour x<sub>k</sub> ≤ x</td><td>∫<sub>−∞</sub><sup>x</sup> f(t) dt</td></tr>
<tr><th>E(X)</th><td>Σ x<sub>k</sub> P(X = x<sub>k</sub>)</td><td>∫ x f(x) dx</td></tr>
<tr><th>Var(X)</th><td>Σ (x<sub>k</sub> − E(X))² P(X = x<sub>k</sub>)</td><td>∫ (x − E(X))² f(x) dx</td></tr>
</tbody></table></div>
<p>En un mot : on remplace les <b>sommes</b> par des <b>intégrales</b>.</p>
<h4>Premier exemple : la loi uniforme U(a, b)</h4>
<div class="f">f(x) = [[1//b − a]] sur [a, b] &nbsp;·&nbsp; F(x) = [[x − a//b − a]] &nbsp;·&nbsp; E(X) = [[a + b//2]] &nbsp;·&nbsp; Var(X) = [[(b − a)²//12]]<small>Toutes les valeurs de l’intervalle sont « également probables » : la probabilité d’un sous-intervalle est sa longueur divisée par b − a.</small></div>
<div data-lab="calc" data-r="0.75"><p><b>TD 2, exercice 16.</b> X suit la loi uniforme sur [−1, 1]. Calcule P(X ≤ 0,5).</p>
<div class="sol">f(x) = 1/2 sur [−1, 1] et F(x) = (x + 1)/2. F(0,5) = 1,5 ÷ 2 = <b>0,75</b>.</div></div>
<div data-lab="calc" data-r="0.3"><p>Un bus passe à un instant uniforme entre 0 et 20 minutes. Probabilité d’attendre entre 5 et 11 minutes ?</p>
<div class="sol">Longueur de l’intervalle ÷ longueur totale = 6 ÷ 20 = <b>0,3</b>.</div></div>` },

{ id: '7.2', t: 'Le vocabulaire de la fiabilité', h: `
<p>On note <b>T</b> la <b>durée de vie</b> d’un composant : l’instant (aléatoire) de sa première panne.</p>
<div class="tw"><table>
<thead><tr><th>Notation</th><th>Nom</th><th>Signification</th></tr></thead>
<tbody>
<tr><th>R(t) = P(T &gt; t)</th><td><b>fiabilité</b> (<i>reliability</i>)</td><td>probabilité de fonctionner <b>encore</b> à l’instant t, donc sans panne sur [0, t]</td></tr>
<tr><th>F(t) = P(T ≤ t)</th><td><b>fonction de défaillance</b></td><td>probabilité d’être <b>déjà</b> tombé en panne à l’instant t</td></tr>
<tr><th>f(t) = F′(t)</th><td><b>densité</b> de défaillance</td><td>répartition des pannes dans le temps</td></tr>
<tr><th>MTTF = E(T)</th><td>temps moyen de bon fonctionnement</td><td>durée de vie moyenne</td></tr>
</tbody></table></div>
<div class="f">R(t) + F(t) = 1<small>À tout instant, le composant est soit encore en marche, soit déjà en panne. R part de 1 et décroît vers 0 ; F part de 0 et croît vers 1.</small></div>
<div class="tip">Mots de l’énoncé → lettre. « fonctionne encore », « dure plus de », « survit à », « fonctionne t heures » : <b>R</b>. « tombe en panne avant », « ne dure pas plus de », « retourné sous garantie » : <b>F</b>.</div>
<div data-lab="relier"><p>R ou F ?</p>
<dl><dt>« La probabilité que ce système fonctionne 150 heures est 0,85 »</dt><dd>R(150) = 0,85</dd>
<dt>« 5 % des composants ne durent pas plus de 100 heures »</dt><dd>F(100) = 0,05</dd>
<dt>« Probabilité qu’un composant dure plus de 200 heures »</dt><dd>R(200)</dd>
<dt>« Probabilité qu’il tombe en panne durant la première année »</dt><dd>F(une année)</dd>
<dt>« Pièces retournées pendant la garantie de 100 heures »</dt><dd>F(100) × nombre de pièces</dd></dl></div>` },

{ id: '7.3', t: 'La loi exponentielle', h: `
<div class="def">T suit la <b>loi exponentielle</b> de paramètre λ &gt; 0, notée E(λ), si sa densité est f(t) = λ e<sup>−λt</sup> pour t ≥ 0. Le paramètre <b>λ</b> est le <b>taux de défaillance</b> (pannes par unité de temps) ; il est <b>constant</b>.</div>
<div class="f">R(t) = e<sup>−λt</sup> &nbsp;&nbsp;·&nbsp;&nbsp; F(t) = 1 − e<sup>−λt</sup> &nbsp;&nbsp;·&nbsp;&nbsp; f(t) = λ e<sup>−λt</sup><small>MTTF = E(T) = [[1//λ]] &nbsp;·&nbsp; Var(T) = [[1//λ²]]. Ces trois expressions valent 1 point au devoir 2019.</small></div>
<p>Le cours la présente ainsi : si la loi de Poisson compte les événements dans un intervalle de temps, la loi exponentielle donne l’<b>intervalle de temps entre deux événements</b> : durée de vie d’une pièce, temps entre deux pannes. C’est la loi la plus utilisée en fiabilité.</p>
<div class="plus"><b>Lien avec Poisson</b> (corrigé du TD 2). « T &gt; t » signifie « zéro panne sur [0, t] ». Si le nombre de pannes sur [0, t] suit Poisson de paramètre λt, alors P(T &gt; t) = P(X = 0) = e<sup>−λt</sup>. On retrouve R(t).</div>
<h4>Rappel indispensable : e et ln</h4>
<div class="tw"><table><tbody>
<tr><th>Produit</th><td>e<sup>a</sup> × e<sup>b</sup> = e<sup>a + b</sup></td><td>R(t)² = e<sup>−2λt</sup> = R(2t)</td></tr>
<tr><th>Quotient</th><td>e<sup>a</sup> ÷ e<sup>b</sup> = e<sup>a − b</sup></td><td>R(t₂) ÷ R(t₁) = e<sup>−λ(t₂ − t₁)</sup></td></tr>
<tr><th>Puissance</th><td>(e<sup>a</sup>)<sup>n</sup> = e<sup>n a</sup></td><td>R(t)<sup>n</sup> = R(n t)</td></tr>
<tr><th>ln défait e</th><td>ln(e<sup>x</sup>) = x</td><td>e<sup>−λt</sup> = v &nbsp;⇔&nbsp; −λt = ln(v)</td></tr>
<tr><th>Valeurs</th><td colspan="2">e<sup>0</sup> = 1 ; e<sup>−1</sup> ≈ 0,3679 ; ln(1) = 0 ; ln d’un nombre entre 0 et 1 est <b>négatif</b></td></tr>
</tbody></table></div>
<div class="warn">Vérifie l’<b>unité</b> : λ et t doivent être dans la même unité de temps (λ par heure avec t en heures, λ par mois avec t en mois). Et le produit λt est sans unité.</div>
<div data-lab="expo"></div>
<div data-lab="calc" data-r="0.8187" data-tol="0.003"><p>Un composant a un taux de défaillance λ = 0,002 par heure. Probabilité qu’il fonctionne encore après 100 heures ?</p>
<div class="sol">R(100) = e<sup>−0,002 × 100</sup> = e<sup>−0,2</sup> ≈ <b>0,8187</b>.</div></div>
<div data-lab="calc" data-r="0.0952" data-tol="0.002"><p>Même composant (λ = 0,002 par heure). Probabilité qu’il tombe en panne avant 50 heures ?</p>
<div class="sol">F(50) = 1 − e<sup>−0,002 × 50</sup> = 1 − e<sup>−0,1</sup> = 1 − 0,9048 ≈ <b>0,0952</b>.</div></div>
<div data-lab="calc" data-r="500" data-u="heures"><p>Même composant. Quel est son temps moyen de bon fonctionnement (MTTF) ?</p>
<div class="sol">MTTF = 1/λ = 1 ÷ 0,002 = <b>500 heures</b>.</div></div>
<div data-lab="calc" data-r="9091" data-tol="2" data-u="heures"><p><b>Devoir 2019.</b> λ = 0,00011 par heure. Temps moyen de bon fonctionnement, arrondi à l’heure ?</p>
<div class="sol">MTTF = 1 ÷ 0,00011 = <b>9091 heures</b>.</div></div>
<div data-lab="calc" data-r="0.719" data-tol="0.002"><p><b>Devoir 2019.</b> λ = 0,00011 par heure. Calcule P(T &gt; 3000), arrondie au millième.</p>
<div class="sol">R(3000) = e<sup>−0,00011 × 3000</sup> = e<sup>−0,33</sup> ≈ <b>0,719</b>.</div></div>
<div data-lab="calc" data-r="0.3679" data-tol="0.002"><p>Quelle est la fiabilité d’un composant exponentiel à l’instant t = MTTF ?</p>
<div class="ind">Remplace t par 1/λ.</div>
<div class="sol">R(1/λ) = e<sup>−λ × 1/λ</sup> = e<sup>−1</sup> ≈ <b>0,368</b>, quel que soit λ. Seuls 37 % des composants atteignent leur durée de vie « moyenne » (remarque du corrigé du TD 2).</div></div>` },

{ id: '7.4', t: 'Retrouver λ à partir d’une donnée', h: `
<p>Les devoirs ne donnent presque jamais λ directement. Il faut le tirer d’une information.</p>
<div class="tw"><table>
<thead><tr><th>L’énoncé donne</th><th>On écrit</th><th>On obtient</th></tr></thead>
<tbody>
<tr><td>R(t₀) = v</td><td>e<sup>−λt₀</sup> = v ⇒ −λt₀ = ln(v)</td><td>λ = −ln(v) ÷ t₀</td></tr>
<tr><td>F(t₀) = w (« w % ne durent pas plus de t₀ »)</td><td>R(t₀) = 1 − w</td><td>λ = −ln(1 − w) ÷ t₀</td></tr>
<tr><td>le MTTF</td><td>MTTF = 1/λ</td><td>λ = 1 ÷ MTTF</td></tr>
</tbody></table></div>
<div class="exam"><b>Devoir 2019, exercice 2, question 2 (1 point).</b> R(2000) = 0,8.
<p>e<sup>−2000λ</sup> = 0,8 ⇒ −2000λ = ln(0,8) ⇒ λ = −ln(0,8) ÷ 2000 = 0,2231 ÷ 2000 ≈ <b>0,000112</b>, soit 1,1 × 10<sup>−4</sup> par heure.</p></div>
<div class="tip"><b>Souvent on n’a même pas besoin de λ.</b> Comme R(n t) = R(t)<sup>n</sup>, si R(100) = 0,95 alors R(200) = 0,95² = 0,9025 et R(300) = 0,95³. De même, R(150) = 0,85 donne R(100) = 0,85<sup>100/150</sup> = 0,85<sup>2/3</sup>.</div>
<div class="exam"><b>Devoirs 2018 et 2025 (2 points puis 1 point).</b> « 5 % ne durent pas plus de 100 heures. Probabilité de durer plus de 200 heures ? »
<p>F(100) = 0,05 ⇒ R(100) = 0,95 ⇒ e<sup>−100λ</sup> = 0,95 ⇒ λ = −ln(0,95) ÷ 100 ≈ 5 × 10<sup>−4</sup> par heure.</p>
<p>R(200) = e<sup>−200λ</sup> = (e<sup>−100λ</sup>)² = 0,95² = <b>0,9025</b>. Le corrigé arrondit λ à 5 × 10<sup>−4</sup> et écrit R(200) = e<sup>−0,1</sup> = 90 %.</p></div>
<div data-lab="calc" data-r="0.000112" data-tol="0.000004"><p>R(2000) = 0,8. Détermine λ (par heure), arrondi à la sixième décimale.</p>
<div class="sol">λ = −ln(0,8) ÷ 2000 = 0,223144 ÷ 2000 = <b>0,000112</b>.</div></div>
<div data-lab="calc" data-r="0.001083" data-tol="0.00002"><p>La probabilité qu’un système fonctionne 150 heures est 0,85. Détermine λ (par heure).</p>
<div class="sol">λ = −ln(0,85) ÷ 150 = 0,162519 ÷ 150 ≈ <b>0,001083</b>. C’est le λ de l’exercice de la garantie.</div></div>
<div data-lab="calc" data-r="0.9025" data-alt="0.9048"><p>5 % des composants ne durent pas plus de 100 heures. Probabilité qu’un composant dure plus de 200 heures ?</p>
<div class="sol">R(100) = 0,95, donc R(200) = 0,95² = <b>0,9025</b> (≈ 90 %).</div></div>
<div data-lab="calc" data-r="0.1353" data-tol="0.002"><p><b>TD 2, exercice 14.</b> Une machine a un MTTF de 100 jours (loi exponentielle). Fiabilité au bout de 200 jours ?</p>
<div class="sol">λ = 1/100 = 0,01 par jour. R(200) = e<sup>−0,01 × 200</sup> = e<sup>−2</sup> ≈ <b>0,135</b>. (Et R(300) = e<sup>−3</sup> ≈ 0,05.)</div></div>
<div data-lab="calc" data-r="0.7684" data-tol="0.004"><p>R(200) = 0,9. Calcule R(500).</p>
<div class="ind">500 = 2,5 × 200.</div>
<div class="sol">R(500) = R(200)<sup>2,5</sup> = 0,9<sup>2,5</sup> ≈ <b>0,768</b>. Avec λ : λ = −ln(0,9)/200 = 0,000527 et e<sup>−0,2634</sup> = 0,768.</div></div>
<div data-lab="calc" data-r="52.7" data-tol="0.6" data-u="heures"><p>λ = 0,002 par heure. Jusqu’à quel instant la fiabilité reste-t-elle supérieure ou égale à 0,9 ?</p>
<div class="sol">e<sup>−0,002 t</sup> = 0,9 ⇒ t = −ln(0,9) ÷ 0,002 = 0,10536 ÷ 0,002 ≈ <b>52,7 heures</b>.</div></div>` },

{ id: '7.5', t: 'Panne entre deux instants, et l’année à 7512 heures', h: `
<div class="f">P(t₁ &lt; T &lt; t₂) = F(t₂) − F(t₁) = R(t₁) − R(t₂) = e<sup>−λt₁</sup> − e<sup>−λt₂</sup><small>« Tomber en panne entre t₁ et t₂ » = être encore en marche à t₁ et ne plus l’être à t₂.</small></div>
<div class="warn">L’ordre : R(<b>t₁</b>) − R(<b>t₂</b>), le plus petit instant en premier, car R décroît. Si tu trouves un nombre négatif, tu as inversé.</div>
<div class="exam"><b>Devoirs 2018 et 2025.</b> « Un système tombe en panne selon la loi exponentielle de facteur λ = 0,5. Probabilité qu’il tombe en panne entre le premier et le deuxième (heure ou mois) ? »
<p>P(1 ≤ T ≤ 2) = F(2) − F(1) = (1 − R(2)) − (1 − R(1)) = R(1) − R(2) = e<sup>−0,5</sup> − e<sup>−1</sup> = 0,6065 − 0,3679 = <b>0,2387</b> (le corrigé écrit 0,61 − 0,37 = 0,24). <i>2 points en 2018, 1 point en 2025.</i></p></div>
<div class="exam"><b>Devoirs 2018 et 2025 (1 point).</b> « λ = 8 × 10<sup>−5</sup> par heure. Probabilité de tomber en panne durant une année, sachant que le composant fonctionne 24 h sur 24, 6 jours sur 7 ? »
<p>Durée de fonctionnement en un an : D = (365 − 52) × 24 = <b>7512 heures</b>.</p>
<p>R(D) = e<sup>−8 × 10⁻⁵ × 7512</sup> = e<sup>−0,601</sup> ≈ 0,548 ≈ 55 %. Probabilité de panne : F(D) = 1 − R(D) ≈ <b>0,452</b> (45 %).</p></div>
<div data-lab="calc" data-r="0.2387" data-tol="0.003"><p>λ = 0,5 par mois. Probabilité que le serveur tombe en panne entre le premier et le deuxième mois ?</p>
<div class="sol">R(1) − R(2) = e<sup>−0,5</sup> − e<sup>−1</sup> = 0,6065 − 0,3679 = <b>0,2387</b>.</div></div>
<div data-lab="calc" data-r="7512" data-u="heures"><p>Combien d’heures de fonctionnement dans une année pour un composant qui tourne 24 h sur 24, 6 jours sur 7 (méthode du professeur) ?</p>
<div class="sol">(365 − 52) × 24 = 313 × 24 = <b>7512 heures</b>.</div></div>
<div data-lab="calc" data-r="0.4517" data-tol="0.004"><p>λ = 8 × 10<sup>−5</sup> par heure, 7512 heures de fonctionnement dans l’année. Probabilité de panne dans l’année ?</p>
<div class="sol">λD = 0,00008 × 7512 = 0,601. F = 1 − e<sup>−0,601</sup> = 1 − 0,548 ≈ <b>0,452</b>.</div></div>
<div data-lab="calc" data-r="0.2699" data-tol="0.003"><p>λ = 0,002 par heure. Probabilité que la panne survienne entre 100 et 300 heures ?</p>
<div class="sol">R(100) − R(300) = e<sup>−0,2</sup> − e<sup>−0,6</sup> = 0,8187 − 0,5488 ≈ <b>0,270</b>.</div></div>
<div data-lab="calc" data-r="0.0754" data-tol="0.001"><p><b>Devoir 2021</b> (Weibull avec β = 1, γ = 0, η = 9000, c’est-à-dire exponentielle de MTTF 9000 heures). Probabilité que la machine tombe en panne entre 3000 et 4000 heures ?</p>
<div class="sol">λ = 1/9000. R(3000) − R(4000) = e<sup>−1/3</sup> − e<sup>−4/9</sup> = 0,7165 − 0,6412 ≈ <b>0,0754</b>.</div></div>` },

{ id: '7.6', t: 'L’absence de mémoire et l’exercice de la garantie', h: `
<div class="def">La loi exponentielle est <b>sans mémoire</b> : un composant qui a déjà fonctionné t₁ heures a exactement la même probabilité de tenir encore une durée d qu’un composant <b>neuf</b>.</div>
<div class="f">P(T &gt; t₂ | T &gt; t₁) = [[R(t₂)//R(t₁)]] = e<sup>−λ(t₂ − t₁)</sup> = R(t₂ − t₁) &nbsp;&nbsp; pour t₂ ≥ t₁<small>Le professeur note cette quantité R<sub>t₁</sub>(t₂).</small></div>
<div class="meth"><b>La démonstration, à savoir refaire (1,5 point en 2018, 2019, 2022, 2024).</b>
<ol><li>Définition de la conditionnelle : P(T &gt; t₂ | T &gt; t₁) = P(T &gt; t₂ <b>et</b> T &gt; t₁) ÷ P(T &gt; t₁).</li>
<li>Comme t₂ ≥ t₁, « T &gt; t₂ et T &gt; t₁ » est simplement « T &gt; t₂ » : le numérateur vaut R(t₂).</li>
<li>Donc P = R(t₂) ÷ R(t₁) = e<sup>−λt₂</sup> ÷ e<sup>−λt₁</sup> = e<sup>−λ(t₂ − t₁)</sup>.</li></ol></div>
<div class="exam"><b>Devoir 2019, exercice 2.</b> λ = 0,00011. Probabilité d’être encore en fonctionnement à 3000 heures sachant qu’il l’était à 2500 heures : e<sup>−0,00011 × 500</sup> = e<sup>−0,055</sup> ≈ <b>0,9465</b>.
<p><b>« Que peut-on déduire ? » (0,5 point).</b> La fiabilité à 3000 heures passe de 0,7189 à 0,9465 quand on sait que le composant a survécu à 2500 heures. Et surtout : la loi exponentielle est <b>sans mémoire</b>. En changeant le point de référence du temps, la loi reste la même ; seule compte la durée restante (500 heures).</p></div>
<h4>L’exercice de la garantie (2018, 2022, 2024) : cinq points presque sûrs</h4>
<div class="exam">« La durée de vie d’un système électronique suit une loi exponentielle. La probabilité que ce système fonctionne 150 heures est de 0,85. »
<p><b>Q1 (2,5 points).</b> Garantie de 100 heures.</p>
<ul><li>R(150) = 0,85 ⇒ e<sup>−150λ</sup> = 0,85 ⇒ λ = −ln(0,85) ÷ 150 = <b>0,001083</b> par heure.</li>
<li>R(100) = e<sup>−0,1083</sup> = <b>0,8973 ≈ 90 %</b>. Taux de retour sous garantie : F(100) = 1 − R(100) = 0,1027 ≈ <b>10 %</b>.</li>
<li><b>Version 2018</b> : « combien de pièces sur 250 seront retournées ? » → 250 × 10 % = <b>25 pièces</b>.</li>
<li><b>Versions 2022 et 2024</b> : « 25 pièces ont été retournées ; de combien de pièces disposait-on au départ ? » → Q₀ × 10 % = 25 ⇒ Q₀ = <b>250 pièces</b>.</li></ul>
<p><b>Q2 (1,5 point).</b> Encore en fonctionnement à 300 heures sachant qu’il l’était à 200 heures : R<sub>200</sub>(300) = R(300) ÷ R(200) = e<sup>−λ × 100</sup> = R(100) ≈ <b>0,897 ≈ 90 %</b> (avec la démonstration ci-dessus).</p>
<p><b>Q3 (1 point).</b> Sur 250 pièces ayant survécu à 200 heures, il en restera 250 × 90 % = <b>225</b> à 300 heures.</p></div>
<div class="plus">Sans arrondir à 90 %, on trouve 25,7 retours sur 250 ; un lot de départ de 243 pièces ; 224 survivantes. Le corrigé officiel arrondit R(100) à 90 % et obtient 25, 250 et 225. Écris les deux : « R(100) = 0,8973 ≈ 90 % », puis continue avec 90 % comme lui. L’interface accepte les deux séries de valeurs.</div>
<div data-lab="calc" data-r="0.8973" data-tol="0.004" data-alt="0.9"><p>R(150) = 0,85. Calcule R(100).</p>
<div class="ind">Soit λ = −ln(0,85)/150, soit directement R(100) = 0,85<sup>2/3</sup>.</div>
<div class="sol">λ = 0,001083. R(100) = e<sup>−0,1083</sup> ≈ <b>0,897</b> (≈ 90 %).</div></div>
<div data-lab="calc" data-r="250" data-alt="243;244;243.5" data-u="pièces"><p>Garantie de 100 heures, R(100) ≈ 90 %. 25 pièces ont été retournées sous garantie. De combien de pièces disposait-on au départ ?</p>
<div class="sol">Taux de retour ≈ 10 %. Q₀ × 0,10 = 25 ⇒ Q₀ = <b>250 pièces</b> (243 sans arrondir).</div></div>
<div data-lab="calc" data-r="0.8973" data-tol="0.004" data-alt="0.9"><p>Même système. Probabilité d’être encore en fonctionnement à 300 heures sachant qu’il l’était à 200 heures ?</p>
<div class="sol">Sans mémoire : R(300 − 200) = R(100) ≈ <b>0,897</b>. Il n’y a rien de nouveau à calculer.</div></div>
<div data-lab="calc" data-r="225" data-alt="224" data-u="pièces"><p>250 pièces ont survécu à 200 heures. Combien fonctionneront encore à 300 heures ?</p>
<div class="sol">250 × R(100) = 250 × 0,90 = <b>225 pièces</b> (224 avec 0,897).</div></div>
<div data-lab="calc" data-r="0.9465" data-tol="0.003"><p>λ = 0,00011 par heure. Probabilité de fonctionner encore à 3000 heures sachant que le composant fonctionnait à 2500 heures ?</p>
<div class="sol">e<sup>−0,00011 × (3000 − 2500)</sup> = e<sup>−0,055</sup> ≈ <b>0,9465</b>.</div></div>
<div data-lab="choix" data-a="1"><p>Un composant exponentiel a déjà fonctionné 5000 heures. Par rapport à un composant neuf, sa probabilité de tenir encore 100 heures est :</p>
<ul><li>plus faible, car il est usé</li><li>identique</li><li>plus grande, car il a fait ses preuves</li></ul>
<div class="sol">Absence de mémoire : le taux de défaillance est constant, le passé ne compte pas. C’est une hypothèse du modèle ; la loi de Weibull permet de modéliser l’usure.</div></div>` },

{ id: '7.7', t: 'Montages : série, parallèle, 2 sur 3', h: `
<p>On assemble des composants dont les fonctionnements sont <b>indépendants</b>. Tout repose sur la règle 4 du <a href="#/ch/5/cours/5.5">chapitre 5</a> : pour des événements indépendants, on <b>multiplie</b>.</p>
<div class="tw"><table>
<thead><tr><th>Montage</th><th>Fonctionne si…</th><th>Fiabilité</th><th>Avec n composants identiques de fiabilité r</th></tr></thead>
<tbody>
<tr><th>Série</th><td><b>tous</b> les composants fonctionnent</td><td>R = R₁ × R₂ × … × Rₙ</td><td>r<sup>n</sup></td></tr>
<tr><th>Parallèle</th><td><b>au moins un</b> fonctionne</td><td>R = 1 − (1 − R₁)(1 − R₂)…(1 − Rₙ)</td><td>1 − (1 − r)<sup>n</sup></td></tr>
<tr><th>2 sur 3</th><td><b>au moins deux</b> des trois fonctionnent</td><td>r³ + 3 r²(1 − r)</td><td>3 r² − 2 r³</td></tr>
</tbody></table></div>
<div class="tip">Série : on multiplie les <b>fiabilités</b>. Parallèle : on multiplie les <b>pannes</b>, puis on prend le contraire (« au moins un » = 1 − « aucun »). Ordre toujours vrai : <b>série &lt; un composant seul &lt; parallèle</b>.</div>
<h4>Avec des composants exponentiels identiques</h4>
<div class="f">R<sub>série</sub>(t) = e<sup>−λt</sup> × e<sup>−λt</sup> = e<sup>−2λt</sup> &nbsp;&nbsp;·&nbsp;&nbsp; R<sub>parallèle</sub>(t) = 2 e<sup>−λt</sup> − e<sup>−2λt</sup> &nbsp;&nbsp;·&nbsp;&nbsp; R<sub>2 sur 3</sub>(t) = 3 e<sup>−2λt</sup> − 2 e<sup>−3λt</sup></div>
<div class="exam"><b>Devoir 2018, exercice 4 (5 points), rédaction du corrigé.</b>
<p><b>Série (2 points).</b> R<sub>S1</sub>(t) = P(T₁ ≥ t et T₂ ≥ t) = P(T₁ ≥ t) × P(T₂ ≥ t) = R₁(t) × R₂(t) = e<sup>−λ₁t</sup> × e<sup>−λ₂t</sup> = e<sup>−(λ₁ + λ₂)t</sup> = e<sup>−2λt</sup>.</p>
<p>A.N. (0,5 point) : λ = 0,00011, t = 3000 : e<sup>−0,66</sup> = <b>0,5169 ≈ 52 %</b>.</p>
<p><b>Parallèle (2 points).</b> 1 − R<sub>S2</sub>(t) = P(T₁ ≤ t et T₂ ≤ t) = (1 − R₁(t)) × (1 − R₂(t)) = 1 − R₁(t) − R₂(t) + R₁(t) R₂(t). D’où R<sub>S2</sub>(t) = R₁(t) + R₂(t) − R₁(t) R₂(t) = 2 e<sup>−λt</sup> − e<sup>−2λt</sup>.</p>
<p>A.N. (0,5 point) : 2 × 0,7189 − 0,5169 = <b>0,9209 ≈ 92 %</b>. Remarque du corrigé : le montage parallèle est plus fiable que le montage série.</p></div>
<div class="exam"><b>Devoir 2019, exercice 3 (5 points)</b>, λ = 10<sup>−4</sup>, t = 3000 heures : série e<sup>−0,6</sup> = <b>0,55</b> (1,5 point) ; parallèle 2 × 0,74 − 0,55 = <b>0,93</b> (1,5 point) ; <b>2 sur 3</b> (2 points) :
<p>R = P(A₁A₂A₃) + P(A₁A₂A₃<sup>C</sup>) + P(A₁A₂<sup>C</sup>A₃) + P(A₁<sup>C</sup>A₂A₃) = e<sup>−3λt</sup> + 3 e<sup>−2λt</sup>(1 − e<sup>−λt</sup>) = 3 e<sup>−2λt</sup> − 2 e<sup>−3λt</sup> = 3 × 0,55 − 2 × 0,41 = <b>0,83</b>.</p></div>
<div data-lab="montage"></div>
<div data-lab="calc" data-r="0.5169" data-tol="0.004"><p>Deux composants identiques en <b>série</b>, λ = 0,00011 par heure. Fiabilité à 3000 heures ?</p>
<div class="sol">e<sup>−2 × 0,00011 × 3000</sup> = e<sup>−0,66</sup> ≈ <b>0,517</b>.</div></div>
<div data-lab="calc" data-r="0.921" data-tol="0.004"><p>Les deux mêmes composants en <b>parallèle</b>. Fiabilité à 3000 heures ?</p>
<div class="sol">2 e<sup>−0,33</sup> − e<sup>−0,66</sup> = 2 × 0,7189 − 0,5169 ≈ <b>0,921</b>.</div></div>
<div data-lab="calc" data-r="0.8333" data-tol="0.006"><p>Trois composants identiques, λ = 10<sup>−4</sup> par heure ; le montage fonctionne avec <b>au moins deux</b> composants. Fiabilité à 3000 heures ?</p>
<div class="ind">r = e<sup>−0,3</sup> ≈ 0,7408, puis 3r² − 2r³.</div>
<div class="sol">3 e<sup>−0,6</sup> − 2 e<sup>−0,9</sup> = 3 × 0,5488 − 2 × 0,4066 = 1,6464 − 0,8131 ≈ <b>0,833</b>.</div></div>
<div data-lab="calc" data-r="0.684" data-tol="0.003"><p>Trois composants <b>différents</b> en série, de fiabilités 0,9 ; 0,8 ; 0,95. Fiabilité du montage ?</p>
<div class="sol">0,9 × 0,8 × 0,95 = <b>0,684</b>.</div></div>
<div data-lab="calc" data-r="0.999" data-tol="0.0005"><p>Les trois mêmes composants (0,9 ; 0,8 ; 0,95) en parallèle. Fiabilité ?</p>
<div class="sol">1 − (0,1 × 0,2 × 0,05) = 1 − 0,001 = <b>0,999</b>.</div></div>
<div data-lab="calc" data-r="0.864" data-tol="0.003"><p>Un composant A (fiabilité 0,9) est en série avec un bloc de deux composants B et C en parallèle (0,8 chacun). Fiabilité de l’ensemble ?</p>
<div class="ind">Calcule d’abord le bloc parallèle, puis mets-le en série avec A.</div>
<div class="sol">Bloc B//C : 1 − 0,2 × 0,2 = 0,96. En série avec A : 0,9 × 0,96 = <b>0,864</b>.</div></div>
<h4>Le vote 2 sur 3 dans un arbre : devoir 2025, partie 2</h4>
<div class="exam">Trois techniques de détection indépendantes ; le système déclare un nœud compromis si <b>au moins 2 des 3</b> le déclarent. Chaque technique déclare « compromis » avec probabilité 0,9 si le nœud est compromis, 0,05 s’il est sain. 90 % des nœuds sont sains.
<p><b>Méthode</b> : dans chaque branche de l’arbre (compromis, sain), les trois techniques sont indépendantes ; on applique la formule 2 sur 3 avec la probabilité q de la branche, puis les probabilités totales.</p>
<ul><li>Nœud compromis (q = 0,9) : 3 × 0,9² × 0,1 + 0,9³ = 0,243 + 0,729 = <b>0,972</b>.</li>
<li>Nœud sain (q = 0,05) : 3 × 0,05² × 0,95 + 0,05³ = 0,007125 + 0,000125 = <b>0,00725</b>.</li>
<li><b>Question 7.</b> P(le système déclare compromis) = 0,972 × 0,1 + 0,00725 × 0,9 = 0,0972 + 0,006525 = <b>0,1037</b>. P(le système déclare sain) = 1 − 0,1037 = <b>0,8963</b>.</li></ul>
<p><b>Question 6.</b> « Probabilité que la technique 3 décide que le nœud est compromis dans le cas où les techniques 1 et 2 ont pris la même décision. » Lecture la plus naturelle : les techniques 1 et 2 ont <b>toutes deux déclaré compromis</b>.</p>
<p>P(D₃ | D₁ ∩ D₂) = P(D₁ ∩ D₂ ∩ D₃) ÷ P(D₁ ∩ D₂) = (0,1 × 0,9³ + 0,9 × 0,05³) ÷ (0,1 × 0,9² + 0,9 × 0,05²) = 0,0730 ÷ 0,08325 ≈ <b>0,877</b>.</p></div>
<div class="plus">Corrigé rédigé par moi ; le sujet 2025 n’a pas de corrigé officiel. La question 6 est ambiguë. Si « la même décision » veut dire « d’accord entre elles, compromis ou sain », on obtient 0,1145 ÷ 0,8965 ≈ 0,128. Écris l’interprétation que tu retiens. Point de fond : les techniques sont indépendantes <b>à l’intérieur de chaque branche</b>, pas globalement ; sans rien savoir, P(D₃) = 0,135, mais après deux alertes elle monte à 0,877 parce que ces alertes rendent le nœud très probablement compromis.</div>
<div data-lab="calc" data-r="0.972" data-tol="0.002"><p>Vote 2 sur 3, chaque votant a raison avec probabilité 0,9, indépendamment. Probabilité que la majorité ait raison ?</p>
<div class="sol">3 × 0,9² × 0,1 + 0,9³ = 0,243 + 0,729 = <b>0,972</b>. Le vote fait mieux qu’un votant seul (0,9).</div></div>
<div data-lab="calc" data-r="0.1037" data-tol="0.001"><p>Devoir 2025 : probabilité que le système complet (vote 2 sur 3) déclare un nœud compromis ?</p>
<div class="sol">0,1 × 0,972 + 0,9 × 0,00725 = 0,0972 + 0,006525 ≈ <b>0,1037</b>.</div></div>
<div class="plus"><b>MTTF des montages</b> (demandé en 2021, cours 5). Le MTTF est l’aire sous R(t) : MTTF = ∫<sub>0</sub><sup>∞</sup> R(t) dt, et ∫ e<sup>−at</sup> dt = 1/a. Série de deux : 1/(2λ). Parallèle de deux : 2/λ − 1/(2λ) = 3/(2λ). 2 sur 3 : 3/(2λ) − 2/(3λ) = 5/(6λ).</div>` },

{ id: '7.8', t: 'La loi d’Erlang : somme de durées exponentielles', h: `
<div class="exam"><b>Devoir 2024, exercice 4 (5 points).</b> Un système subit des pannes successives, les temps de réparation étant négligeables. X₁, …, Xₙ suivent la même loi exponentielle de paramètre λ ; chacune mesure le temps de bon fonctionnement depuis la panne précédente. Soit Tₙ = X₁ + … + Xₙ. Quelle est la loi de Tₙ ? Démontrer.</div>
<div class="def">Tₙ est l’<b>instant de la n-ième panne</b>. Il suit la <b>loi d’Erlang</b> de paramètres n et λ : c’est la loi Gamma G(n, λ) du tableau du cours avec α = n entier.</div>
<div class="f">f<sub>Tₙ</sub>(t) = [[λ<sup>n</sup> t<sup>n − 1</sup>//(n − 1)!]] e<sup>−λt</sup> &nbsp; pour t ≥ 0 &nbsp;&nbsp;·&nbsp;&nbsp; E(Tₙ) = [[n//λ]] &nbsp;&nbsp;·&nbsp;&nbsp; Var(Tₙ) = [[n//λ²]]<small>Pour n = 1 on retrouve λ e<sup>−λt</sup>, la loi exponentielle. Les Xᵢ sont supposées indépendantes.</small></div>
<div class="meth"><b>Démonstration par le processus de Poisson</b> (la plus courte).
<ol><li>Soit N(t) le nombre de pannes sur [0, t]. Les temps entre pannes étant exponentiels de paramètre λ et indépendants, N(t) suit une loi de <b>Poisson de paramètre λt</b>.</li>
<li>« La n-ième panne arrive après t » équivaut à « il y a eu au plus n − 1 pannes sur [0, t] » : {Tₙ &gt; t} = {N(t) ≤ n − 1}.</li>
<li>Donc P(Tₙ &gt; t) = Σ<sub>k = 0</sub><sup>n − 1</sup> e<sup>−λt</sup> (λt)<sup>k</sup> / k!, et F(t) = 1 − cette somme.</li>
<li>On dérive F. Chaque terme donne deux morceaux, λ e<sup>−λt</sup>(λt)<sup>k</sup>/k! − λ e<sup>−λt</sup>(λt)<sup>k − 1</sup>/(k − 1)!, qui s’annulent d’un terme au suivant (somme télescopique). Il ne reste que le dernier : f(t) = λ e<sup>−λt</sup> (λt)<sup>n − 1</sup>/(n − 1)!, soit la densité annoncée.</li></ol></div>
<div class="meth"><b>Démonstration par récurrence</b> (produit de convolution).
<ol><li>n = 1 : T₁ = X₁ a pour densité λ e<sup>−λt</sup>. La formule est vraie.</li>
<li>On suppose la formule vraie pour n. Tₙ₊₁ = Tₙ + Xₙ₊₁, somme de deux variables indépendantes : sa densité est f<sub>n + 1</sub>(t) = ∫<sub>0</sub><sup>t</sup> f<sub>n</sub>(s) × λ e<sup>−λ(t − s)</sup> ds.</li>
<li>= ∫<sub>0</sub><sup>t</sup> [λ<sup>n</sup> s<sup>n − 1</sup>/(n − 1)!] e<sup>−λs</sup> λ e<sup>−λ(t − s)</sup> ds = [λ<sup>n + 1</sup> e<sup>−λt</sup>/(n − 1)!] ∫<sub>0</sub><sup>t</sup> s<sup>n − 1</sup> ds.</li>
<li>∫<sub>0</sub><sup>t</sup> s<sup>n − 1</sup> ds = t<sup>n</sup>/n, d’où f<sub>n + 1</sub>(t) = λ<sup>n + 1</sup> t<sup>n</sup> e<sup>−λt</sup>/n!. La formule est vraie au rang n + 1.</li></ol></div>
<div class="plus">Corrigé rédigé par moi : le sujet 2024 n’a pas de corrigé officiel. Le cours 3 ne donne que le tableau (« temps de la k-ième arrivée : loi d’Erlang ») et la densité de la loi Gamma ; les deux démonstrations ci-dessus sont les démonstrations classiques.</div>
<div data-lab="calc" data-r="6" data-u="mois"><p>Un serveur a un taux de panne λ = 0,5 par mois. En moyenne, au bout de combien de temps survient la <b>3ᵉ</b> panne ?</p>
<div class="sol">E(T₃) = n/λ = 3 ÷ 0,5 = <b>6 mois</b>.</div></div>
<div data-lab="calc" data-r="0.406" data-tol="0.004"><p>λ = 1 panne par heure. Probabilité que la <b>2ᵉ</b> panne survienne après 2 heures ?</p>
<div class="ind">{T₂ &gt; 2} = {au plus une panne sur 2 heures}, et N(2) suit Poisson de paramètre 2.</div>
<div class="sol">P(T₂ &gt; 2) = P(N(2) ≤ 1) = e<sup>−2</sup>(1 + 2) = 3 × 0,1353 ≈ <b>0,406</b>.</div></div>
<div data-lab="choix" data-a="2"><p>Dans le tableau du cours, la loi d’Erlang est au processus de Poisson ce que … est au processus de Bernoulli.</p>
<ul><li>la loi binomiale</li><li>la loi géométrique</li><li>la loi de Pascal</li><li>la loi de Poisson</li></ul>
<div class="sol">Temps de la k-ième arrivée : Erlang en temps continu, Pascal en temps discret.</div></div>` },

{ id: '7.9', t: 'La loi de Weibull', h: `
<p>Dernière diapositive du cours 3 : par rapport à l’exponentielle, la loi de Weibull introduit une information de plus, le <b>régime d’utilisation</b> de la pièce.</p>
<div class="f">f(x) = λ α x<sup>α − 1</sup> e<sup>−λ x<sup>α</sup></sup> &nbsp; pour x ≥ 0, &nbsp; donc &nbsp; R(x) = e<sup>−λ x<sup>α</sup></sup><small>Deux paramètres, α et λ. (La diapositive imprime l’exposant « x<sup>α − 1</sup> » dans l’exponentielle ; la densité de Weibull s’écrit avec x<sup>α</sup>.)</small></div>
<div class="tw"><table>
<thead><tr><th>Valeur de α</th><th>Régime</th><th>Exemple du cours</th></tr></thead>
<tbody>
<tr><th>α &lt; 1</th><td><b>rodage</b> : la pièce s’améliore au fil du temps</td><td>un moteur neuf</td></tr>
<tr><th>α = 1</th><td><b>régime stationnaire</b> : utilisation normale, caractéristiques inchangées → on retrouve la <b>loi exponentielle</b></td><td></td></tr>
<tr><th>α &gt; 1</th><td><b>vieillissement accéléré</b> : conditions extrêmes</td><td>en compétition</td></tr>
</tbody></table></div>
<div class="plus"><b>Forme à trois paramètres</b> (devoir 2021, cours 4) : R(t) = exp(−((t − γ)/η)<sup>β</sup>), F(t) = 1 − R(t), MTTF = γ + η Γ(1 + 1/β). <b>β</b> : paramètre de forme (le α ci-dessus) ; <b>η</b> : paramètre d’échelle, en unité de temps ; <b>γ</b> : paramètre de position (décalage de l’origine). Avec β = 1 et γ = 0, on a R(t) = e<sup>−t/η</sup> : une exponentielle de taux λ = 1/η et de MTTF η.</div>
<div data-lab="calc" data-r="8963" data-tol="25"><p><b>Devoir 2021.</b> β = 1, γ = 0 et R(2000) = 0,8. Détermine η (en heures).</p>
<div class="sol">e<sup>−2000/η</sup> = 0,8 ⇒ η = −2000 ÷ ln(0,8) = 2000 ÷ 0,22314 ≈ <b>8963 heures</b>.</div></div>
<div data-lab="calc" data-r="0.7165" data-tol="0.004"><p><b>Devoir 2021.</b> β = 1, γ = 0, η = 9000 heures. Calcule P(T &gt; 3000).</p>
<div class="sol">R(3000) = e<sup>−3000/9000</sup> = e<sup>−1/3</sup> ≈ <b>0,717</b>. Le MTTF vaut η = 9000 heures.</div></div>
<div data-lab="choix" data-a="0"><p>Une pièce est utilisée dans des conditions extrêmes et s’use de plus en plus vite. Quel paramètre de forme ?</p>
<ul><li>α &gt; 1</li><li>α = 1</li><li>α &lt; 1</li></ul>
<div class="sol">α &gt; 1 : vieillissement accéléré. α = 1 : régime stationnaire (exponentielle). α &lt; 1 : rodage.</div></div>` },

{ id: '7.10', t: 'La loi normale et les autres lois à densité', h: `
<div class="tw"><table>
<thead><tr><th>Loi</th><th>Densité</th><th>Espérance</th><th>Variance</th></tr></thead>
<tbody>
<tr><th>Uniforme U(a, b)</th><td>1/(b − a) sur [a, b]</td><td>(a + b)/2</td><td>(b − a)²/12</td></tr>
<tr><th>Exponentielle E(λ)</th><td>λ e<sup>−λx</sup> sur x ≥ 0</td><td>1/λ</td><td>1/λ²</td></tr>
<tr><th>Gamma G(α, λ)</th><td>λ<sup>α</sup> x<sup>α − 1</sup> e<sup>−λx</sup> / Γ(α)</td><td>α/λ</td><td>α/λ²</td></tr>
<tr><th>Normale N(m, σ²)</th><td>[1/(σ√(2π))] e<sup>−(x − m)²/(2σ²)</sup></td><td>m</td><td>σ²</td></tr>
</tbody></table></div>
<h4>La loi normale (TD 2, exercices 13 et 15)</h4>
<p>Aucun devoir ne l’a demandée, mais elle figure au TD. On ne sait pas intégrer sa densité à la main : on <b>centre et on réduit</b>, puis on lit une table.</p>
<div class="meth"><ol><li>Si X suit N(μ, σ), alors <b>Y = (X − μ)/σ</b> suit la loi normale centrée réduite N(0, 1).</li>
<li>On note π(a) = P(Y &lt; a), valeur lue dans la table.</li>
<li>Symétrie : P(Y &gt; a) = 1 − π(a) et <b>P(−a &lt; Y &lt; a) = 2 π(a) − 1</b>.</li></ol></div>
<div class="kv"><div>π(1)<b>0,8413</b></div><div>π(2)<b>0,9772</b></div><div>π(2,3)<b>0,9893</b></div><div>π(2,5)<b>0,9938</b></div></div>
<div class="ex"><b>TD 2, exercice 13.</b> Tension X de moyenne 10 V et d’écart type 0,2 ; on accepte l’intervalle [9,54 ; 10,46]. Bornes réduites : (9,54 − 10)/0,2 = −2,3 et +2,3. P(accepté) = 2 π(2,3) − 1 = 2 × 0,9893 − 1 = 0,9786. Pourcentage refusé : 1 − 0,9786 = <b>2,14 %</b>.</div>
<div data-lab="calc" data-r="0.0574" data-tol="0.001"><p><b>TD 2, exercice 13 (ii).</b> Un cylindre est accepté si sa longueur (moyenne 40, écart type 0,02) est dans [39,95 ; 40,05] <b>et</b> son diamètre (moyenne 15, écart type 0,01) dans [14,98 ; 15,02]. Longueur et diamètre sont indépendants. Proportion de cylindres défectueux ?</p>
<div class="ind">Bornes réduites : ±2,5 pour la longueur, ±2 pour le diamètre.</div>
<div class="sol">P(longueur correcte) = 2 π(2,5) − 1 = 2 × 0,9938 − 1 = 0,9876. P(diamètre correct) = 2 π(2) − 1 = 2 × 0,9772 − 1 = 0,9544. Par indépendance, P(accepté) = 0,9876 × 0,9544 = 0,9426. Défectueux : 1 − 0,9426 ≈ <b>0,0574</b> (5,7 %).</div></div>
<div data-lab="calc" data-r="0.1587" data-tol="0.002"><p><b>TD 2, exercice 15.</b> X suit la loi normale de moyenne −1 et d’écart type 2. Calcule P(X &gt; 1).</p>
<div class="sol">Y = (X + 1)/2. X &gt; 1 ⇔ Y &gt; 1. P(Y &gt; 1) = 1 − π(1) = 1 − 0,8413 = <b>0,1587</b>.</div></div>` }
],
glossaire: [
  ['Densité', 'Probability density function', 'fonction f dont l’aire entre a et b donne P(a < X ≤ b).'],
  ['Fonction de répartition', 'Cumulative distribution function', 'F(x) = P(X ≤ x) ; f est sa dérivée.'],
  ['Durée de vie T', 'Lifetime', 'instant aléatoire de la première panne.'],
  ['Fiabilité R(t)', 'Reliability', 'P(T > t) : probabilité de fonctionner encore à t.'],
  ['Fonction de défaillance F(t)', 'Unreliability', 'P(T ≤ t) = 1 − R(t).'],
  ['Taux de défaillance λ', 'Failure rate', 'nombre moyen de pannes par unité de temps ; constant pour la loi exponentielle.'],
  ['MTTF', 'Mean Time To Failure', 'durée de vie moyenne ; 1/λ pour l’exponentielle.'],
  ['Loi exponentielle', 'Exponential distribution', 'durée entre deux événements d’un processus de Poisson ; R(t) = e^(−λt).'],
  ['Absence de mémoire', 'Memoryless property', 'P(T > t₂ | T > t₁) = R(t₂ − t₁).'],
  ['Montage série', 'Series system', 'fonctionne si tous les composants fonctionnent.'],
  ['Montage parallèle', 'Parallel system', 'fonctionne si au moins un composant fonctionne.'],
  ['2 sur 3', '2-out-of-3, majority voting', 'fonctionne si au moins deux des trois composants fonctionnent.'],
  ['Loi d’Erlang', 'Erlang distribution', 'somme de n durées exponentielles indépendantes de même paramètre.'],
  ['Loi Gamma', 'Gamma distribution', 'généralisation d’Erlang à α non entier.'],
  ['Loi de Weibull', 'Weibull distribution', 'généralise l’exponentielle avec un paramètre de forme (rodage, stationnaire, vieillissement).'],
  ['Loi uniforme', 'Uniform distribution', 'densité constante sur [a, b].'],
  ['Loi normale', 'Normal (Gaussian) distribution', 'loi en cloche N(m, σ²) ; on la centre et on la réduit.'],
  ['Centrer-réduire', 'Standardization', 'Y = (X − μ)/σ suit N(0, 1).'],
  ['Produit de convolution', 'Convolution', 'densité de la somme de deux variables indépendantes.']
],
formules: [
  ['Intervalle', 'P(a < X ≤ b) = F(b) − F(a)', ''],
  ['Exponentielle', 'R(t) = e<sup>−λt</sup> · F(t) = 1 − e<sup>−λt</sup> · f(t) = λ e<sup>−λt</sup>', 'MTTF = 1/λ ; Var = 1/λ².'],
  ['Trouver λ', 'λ = −[[ln R(t₀)//t₀]]', 'si F(t₀) est donné, R(t₀) = 1 − F(t₀).'],
  ['Raccourci', 'R(n t) = R(t)<sup>n</sup>', 'exemple : R(200) = R(100)².'],
  ['Panne entre t₁ et t₂', 'R(t₁) − R(t₂)', ''],
  ['Sans mémoire', 'P(T > t₂ | T > t₁) = [[R(t₂)//R(t₁)]] = e<sup>−λ(t₂ − t₁)</sup>', 'noté R<sub>t₁</sub>(t₂) par le professeur.'],
  ['Année 6 j/7', '(365 − 52) × 24 = 7512 h', ''],
  ['Série', 'R = R₁ × R₂ × … ; identiques exponentiels : e<sup>−nλt</sup>', ''],
  ['Parallèle', 'R = 1 − (1 − R₁)(1 − R₂)… ; deux identiques : 2e<sup>−λt</sup> − e<sup>−2λt</sup>', ''],
  ['2 sur 3', 'R = 3r² − 2r³ ; exponentiels : 3e<sup>−2λt</sup> − 2e<sup>−3λt</sup>', '= r³ + 3r²(1 − r).'],
  ['Erlang', 'f(t) = [[λ<sup>n</sup> t<sup>n−1</sup>//(n − 1)!]] e<sup>−λt</sup>', 'E = n/λ ; Var = n/λ².'],
  ['Erlang, queue', 'P(Tₙ > t) = Σ<sub>k=0</sub><sup>n−1</sup> e<sup>−λt</sup>[[(λt)<sup>k</sup>//k!]]', '= P(au plus n − 1 pannes sur [0, t]).'],
  ['Weibull', 'R(x) = e<sup>−λx<sup>α</sup></sup>', 'α < 1 rodage ; α = 1 exponentielle ; α > 1 vieillissement.'],
  ['Uniforme', 'f = [[1//b − a]] · E = [[a + b//2]] · Var = [[(b − a)²//12]]', ''],
  ['Normale', 'P(−a < Y < a) = 2π(a) − 1 avec Y = [[X − μ//σ]]', 'π(a) lu dans la table.']
],
resume: [
  'Variable continue : probabilité = aire sous la densité ; P(a < X ≤ b) = F(b) − F(a).',
  'R(t) = P(T > t) (encore en marche) ; F(t) = 1 − R(t) (déjà en panne).',
  '<b>Exponentielle</b> : R(t) = e<sup>−λt</sup>, F(t) = 1 − e<sup>−λt</sup>, f(t) = λe<sup>−λt</sup>, MTTF = 1/λ.',
  'λ = −ln(R(t₀))/t₀ ; raccourci R(nt) = R(t)<sup>n</sup>.',
  'Panne entre t₁ et t₂ : R(t₁) − R(t₂).',
  '<b>Sans mémoire</b> : P(T > t₂ | T > t₁) = R(t₂ − t₁).',
  'Garantie : R(150) = 0,85 → λ = 0,001083 → R(100) ≈ 90 % → 25 retours sur 250 → 225 survivantes.',
  '<b>Série</b> : produit des fiabilités. <b>Parallèle</b> : 1 − produit des pannes. <b>2 sur 3</b> : 3r² − 2r³.',
  'Somme de n exponentielles indépendantes : loi d’<b>Erlang</b>.',
  'Weibull : α = 1 redonne l’exponentielle ; α < 1 rodage ; α > 1 vieillissement.'
],
pieges: [
  'Utiliser F à la place de R (ou l’inverse) : relis le verbe de l’énoncé.',
  'Écrire R(t₂) − R(t₁) pour une panne entre t₁ et t₂ : le résultat serait négatif.',
  'Oublier que ln(0,85) est négatif et obtenir un λ négatif.',
  'Mélanger les unités : λ par mois avec t en années.',
  'Recalculer R(300)/R(200) alors que l’absence de mémoire donne directement R(100).',
  'Additionner les fiabilités d’un montage parallèle au lieu de multiplier les pannes.',
  'Dans le vote 2 sur 3, oublier le coefficient 3 (trois façons d’avoir exactement deux bons).'
],
cartes: [
  ['Que représentent R(t) et F(t) ?', 'R(t) = P(T > t) : encore en marche à t. F(t) = P(T ≤ t) = 1 − R(t) : déjà en panne.'],
  ['Loi exponentielle : R(t), F(t), f(t) ?', 'e^(−λt) ; 1 − e^(−λt) ; λ e^(−λt).'],
  ['MTTF d’une loi exponentielle ?', '1/λ.'],
  ['Comment trouver λ si R(t₀) = v ?', 'λ = −ln(v)/t₀.'],
  ['« 5 % ne durent pas plus de 100 h » : que vaut R(100) ?', '0,95, car F(100) = 0,05.'],
  ['R(100) = 0,95. R(200) sans calculer λ ?', '0,95² = 0,9025.'],
  ['Probabilité d’une panne entre t₁ et t₂ ?', 'R(t₁) − R(t₂).'],
  ['Propriété d’absence de mémoire ?', 'P(T > t₂ | T > t₁) = R(t₂)/R(t₁) = e^(−λ(t₂ − t₁)) = R(t₂ − t₁).'],
  ['Démontre l’absence de mémoire en trois lignes.', 'P(T>t₂ | T>t₁) = P(T>t₂ et T>t₁)/P(T>t₁) ; comme t₂ ≥ t₁ le numérateur est R(t₂) ; R(t₂)/R(t₁) = e^(−λ(t₂−t₁)).'],
  ['Garantie : R(150) = 0,85. λ ? R(100) ?', 'λ = −ln(0,85)/150 = 0,001083 ; R(100) = 0,897 ≈ 90 %.'],
  ['Garantie : 25 retours sous garantie de 100 h. Lot de départ ?', '25 ÷ 10 % = 250 pièces.'],
  ['Garantie : 250 pièces vivantes à 200 h. Combien à 300 h ?', '250 × R(100) ≈ 250 × 0,90 = 225.'],
  ['λ = 0,5 : P(1 < T < 2) ?', 'e^(−0,5) − e^(−1) = 0,6065 − 0,3679 ≈ 0,24.'],
  ['Heures par an à 24 h/24 et 6 j/7 ?', '(365 − 52) × 24 = 7512.'],
  ['λ = 8 × 10⁻⁵ /h, 7512 h : probabilité de panne ?', '1 − e^(−0,601) ≈ 0,45.'],
  ['Fiabilité d’un montage série ?', 'Produit des fiabilités ; deux exponentiels identiques : e^(−2λt).'],
  ['Fiabilité d’un montage parallèle ?', '1 − produit des probabilités de panne ; deux identiques : 2e^(−λt) − e^(−2λt).'],
  ['Fiabilité d’un montage 2 sur 3 ?', 'r³ + 3r²(1 − r) = 3r² − 2r³ ; exponentiels : 3e^(−2λt) − 2e^(−3λt).'],
  ['Ordre des fiabilités série, composant seul, parallèle ?', 'Série < composant seul < parallèle.'],
  ['Loi de X₁ + … + Xₙ, exponentielles indépendantes de paramètre λ ?', 'Loi d’Erlang (Gamma) de paramètres n et λ : f(t) = λⁿ tⁿ⁻¹ e^(−λt)/(n − 1)!.'],
  ['Espérance d’une loi d’Erlang (n, λ) ?', 'n/λ.'],
  ['Idée de la démonstration d’Erlang par Poisson ?', '{Tₙ > t} = {au plus n − 1 pannes sur [0, t]} ; on somme les probabilités de Poisson(λt) de 0 à n − 1, puis on dérive.'],
  ['Weibull : rôle du paramètre de forme α ?', 'α < 1 : rodage. α = 1 : stationnaire (exponentielle). α > 1 : vieillissement accéléré.'],
  ['Que vaut R(MTTF) pour une exponentielle ?', 'e^(−1) ≈ 0,37.'],
  ['Comment traiter une loi normale N(μ, σ) ?', 'Centrer-réduire : Y = (X − μ)/σ, puis table ; P(−a < Y < a) = 2π(a) − 1.'],
  ['Loi uniforme sur [a, b] : densité, espérance ?', '1/(b − a) ; (a + b)/2.']
],
quiz: [
  { q: 'Pour une loi exponentielle de paramètre λ, R(t) vaut :', o: ['e<sup>−λt</sup>', '1 − e<sup>−λt</sup>', 'λ e<sup>−λt</sup>', '1/λ'], a: 0, e: 'F(t) = 1 − e<sup>−λt</sup> ; f(t) = λe<sup>−λt</sup> ; MTTF = 1/λ.' },
  { q: 'R(2000) = 0,8. λ vaut environ :', o: ['1,1 × 10⁻⁴', '4 × 10⁻⁴', '1 × 10⁻⁴', '8 × 10⁻⁴'], a: 0, e: '−ln(0,8)/2000 = 0,2231/2000.' },
  { q: 'λ = 0,00011 par heure. MTTF ?', o: ['9091 h', '11 000 h', '909 h', '0,00011 h'], a: 0, e: '1/λ.' },
  { q: '« 5 % des composants ne durent pas plus de 100 heures » se traduit par :', o: ['F(100) = 0,05', 'R(100) = 0,05', 'λ = 0,05', 'f(100) = 0,05'], a: 0, e: 'Ne pas durer plus de 100 h, c’est tomber en panne avant : F.' },
  { q: 'R(100) = 0,95. Alors R(200) vaut :', o: ['0,9025', '0,90', '0,475', '0,975'], a: 0, e: 'R(200) = R(100)² ; le corrigé arrondit à 90 %.' },
  { q: 'λ = 0,5 par mois. Probabilité de panne entre le 1er et le 2e mois ?', o: ['e<sup>−0,5</sup> − e<sup>−1</sup> ≈ 0,24', 'e<sup>−1</sup> − e<sup>−0,5</sup>', 'e<sup>−1,5</sup> ≈ 0,22', '1 − e<sup>−1</sup> ≈ 0,63'], a: 0, e: 'R(1) − R(2).' },
  { q: 'Pour une loi exponentielle, P(T > 300 | T > 200) est égale à :', o: ['R(100)', 'R(300)', 'R(300) − R(200)', 'R(500)'], a: 0, e: 'Absence de mémoire : seule compte la durée restante.' },
  { q: 'R(150) = 0,85. Garantie de 100 h. Selon le corrigé, sur 250 pièces combien sont retournées ?', o: ['25', '37', '15', '225'], a: 0, e: 'R(100) ≈ 90 %, taux de retour ≈ 10 %.' },
  { q: 'Deux composants exponentiels identiques en série. Fiabilité ?', o: ['e<sup>−2λt</sup>', '2e<sup>−λt</sup>', '2e<sup>−λt</sup> − e<sup>−2λt</sup>', 'e<sup>−λt/2</sup>'], a: 0, e: 'Produit des fiabilités.' },
  { q: 'Deux composants exponentiels identiques en parallèle. Fiabilité ?', o: ['2e<sup>−λt</sup> − e<sup>−2λt</sup>', 'e<sup>−2λt</sup>', '1 − e<sup>−2λt</sup>', '2e<sup>−2λt</sup>'], a: 0, e: 'R₁ + R₂ − R₁R₂.' },
  { q: 'Montage 2 sur 3 avec trois composants identiques de fiabilité r :', o: ['3r² − 2r³', 'r³', '3r²', '1 − (1 − r)³'], a: 0, e: 'r³ + 3r²(1 − r).' },
  { q: 'Quelles inégalités sont toujours vraies pour des composants identiques de fiabilité r (0 < r < 1) ?', o: ['série < r', 'r < parallèle', 'parallèle < série', '2 sur 3 > parallèle de trois'], a: [0, 1], e: 'Série < composant seul < parallèle. Le 2 sur 3 est moins fiable que le parallèle de trois, qui n’exige qu’un seul composant.' },
  { q: 'Année de fonctionnement 24 h/24, 6 j/7 selon le corrigé :', o: ['7512 h', '8760 h', '7488 h', '6570 h'], a: 0, e: '(365 − 52) × 24.' },
  { q: 'X₁ + … + Xₙ, exponentielles indépendantes de même paramètre, suit une loi :', o: ['d’Erlang', 'exponentielle', 'de Poisson', 'normale'], a: 0, e: 'Loi Gamma avec α = n entier.' },
  { q: 'Espérance du temps jusqu’à la 4ᵉ panne, λ = 2 pannes par jour ?', o: ['2 jours', '8 jours', '0,5 jour', '4 jours'], a: 0, e: 'n/λ = 4/2.' },
  { q: 'Dans la loi de Weibull, α = 1 correspond à :', o: ['la loi exponentielle (régime stationnaire)', 'le rodage', 'le vieillissement accéléré', 'la loi normale'], a: 0, e: 'α < 1 rodage ; α > 1 vieillissement.' },
  { q: 'Quelles propriétés a la loi exponentielle ?', o: ['Taux de défaillance constant', 'Absence de mémoire', 'MTTF = 1/λ', 'Fiabilité de 50 % au MTTF'], a: [0, 1, 2], e: 'Au MTTF la fiabilité vaut e⁻¹ ≈ 37 %.' },
  { q: 'Pour une variable continue X, P(X = a) vaut :', o: ['0', 'f(a)', 'F(a)', '1'], a: 0, e: 'Un point n’a pas d’aire sous la densité.' },
  { q: 'Trois techniques indépendantes, chacune juste avec probabilité 0,9. Probabilité que la majorité soit juste ?', o: ['0,972', '0,729', '0,9', '0,999'], a: 0, e: '0,729 + 3 × 0,81 × 0,1.' },
  { q: 'X normale de moyenne 10 et d’écart type 0,2. P(9,54 < X < 10,46), sachant π(2,3) = 0,9893 ?', o: ['0,9786', '0,9893', '0,0214', '0,4893'], a: 0, e: '2π(2,3) − 1.' }
],
exos: [
  { t: 'Devoir 2019, exercice 2 complet', n: 'devoir · 5 points', e: `<p>La durée de vie T (en heures) d’un composant suit une loi exponentielle de paramètre λ.</p>
<ol><li>Donner R(t), f(t), F(t).</li><li>R(2000) = 0,8 : déterminer λ, arrondi à la sixième décimale.</li><li>On prend λ = 0,00011. a) Temps moyen de bon fonctionnement, arrondi à l’heure. b) P(T &gt; 3000), au millième. c) Probabilité d’être encore en fonctionnement à 3000 heures sachant qu’il l’était à 2500 heures. d) Que peut-on déduire ?</li></ol>`,
    s: `<ol><li>F(t) = 1 − e<sup>−λt</sup> ; R(t) = e<sup>−λt</sup> ; f(t) = λ e<sup>−λt</sup>. <i>(1 point)</i></li>
<li>e<sup>−λt</sup> = v ⇒ −λt = ln(v) ⇒ λ = −ln(v)/t. A.N. : λ = −ln(0,8)/2000 = <b>1,1 × 10<sup>−4</sup></b> (0,000112). <i>(1 point)</i></li>
<li>a) MTTF = 1/λ = <b>9091 heures</b>. <i>(0,5)</i><br>b) P(T &gt; 3000) = e<sup>−0,00011 × 3000</sup> = <b>0,719</b>. <i>(0,5)</i><br>c) P(T &gt; 3000 | T &gt; 2500) = P(T &gt; 3000 et T &gt; 2500)/P(T &gt; 2500) = P(T &gt; 3000)/P(T &gt; 2500) = e<sup>−0,00011 × 3000</sup>/e<sup>−0,00011 × 2500</sup> = e<sup>−0,00011 × 500</sup> = <b>0,9465</b>. <i>(1,5)</i><br>d) La probabilité d’un événement dépendant d’un autre augmente quand cet autre s’est produit (0,7189 → 0,9465). La loi exponentielle est <b>sans mémoire</b> : en changeant le point de référence du temps, la loi reste préservée. <i>(0,5)</i></li></ol>
<p>Corrigé officiel du professeur.</p>` },
  { t: 'La garantie (2018, 2022, 2024)', n: 'devoir · 5 points', e: `<p>La durée de vie d’un système électronique suit une loi exponentielle. La probabilité qu’il fonctionne 150 heures est 0,85.</p>
<ol><li>Garantie de 100 heures : de combien de pièces dispose-t-on au départ, sachant que 25 pièces ont été retournées sous garantie ?</li><li>Probabilité d’être encore en fonctionnement à 300 heures sachant qu’il l’était à 200 heures.</li><li>Sur un lot de 250 pièces ayant survécu à 200 heures, combien seront encore fonctionnelles à 300 heures ?</li></ol>`,
    s: `<ol><li>R(150) = 0,85 ⇒ e<sup>−150λ</sup> = 0,85 ⇒ λ = −ln(0,85)/150 = 0,001083. R(100) = e<sup>−0,1083</sup> = 0,89732 ≈ 90 %. Taux de rejet à 100 h : 1 − R(100) = 10 %. Sur Q₀ pièces, 10 % sont retournées, soit 25 pièces : Q₀ = 25 ÷ 10 % = <b>250 pièces</b>. <i>(2,5 points)</i></li>
<li>R<sub>t₁</sub>(t₂) = P(T ≥ t₂ | T ≥ t₁) = P(T ≥ t₂ et T ≥ t₁)/P(T ≥ t₁) = R(t₂)/R(t₁) = e<sup>−λ(t₂ − t₁)</sup>. A.N. : R<sub>200</sub>(300) = e<sup>−0,11</sup> ≈ 0,8976 ≈ <b>90 %</b>. <i>(1,5 point)</i></li>
<li>250 × 90 % = <b>225 pièces</b>. <i>(1 point)</i></li></ol>
<p>Corrigé officiel de 2022. Sans arrondi intermédiaire : 243 pièces, 0,897, 224 pièces.</p>` },
  { t: 'Devoir 2025, exercice 2 complet', n: 'devoir · 4 points', e: `<ol><li>Un serveur tombe en panne selon la loi exponentielle de facteur λ = 0,5 par mois. Probabilité qu’il tombe en panne entre le premier et le deuxième mois ?</li>
<li>Probabilité que ce serveur subisse 3 pannes sur une année ?</li>
<li>Durée de vie exponentielle ; 5 % des composants ne durent pas plus de 100 heures. Probabilité de durer plus de 200 heures ?</li>
<li>λ = 8 × 10<sup>−5</sup> par heure. Probabilité de tomber en panne durant une année, à 24 h sur 24 et 6 jours sur 7 ?</li></ol>`,
    s: `<ol><li>P(1 ≤ T ≤ 2) = F(2) − F(1) = R(1) − R(2) = e<sup>−0,5</sup> − e<sup>−1</sup> = 0,6065 − 0,3679 = <b>0,2387 ≈ 0,24</b>.</li>
<li>Le nombre de pannes sur 12 mois suit Poisson de paramètre λt = 0,5 × 12 = 6. P(X = 3) = e<sup>−6</sup> × 6³/3! = 36 e<sup>−6</sup> ≈ <b>0,089</b>.</li>
<li>F(100) = 0,05 ⇒ R(100) = 0,95 ⇒ λ = −ln(0,95)/100 ≈ 5 × 10<sup>−4</sup>. R(200) = e<sup>−200λ</sup> = 0,95² = <b>0,9025 ≈ 90 %</b>.</li>
<li>D = (365 − 52) × 24 = 7512 heures. R(D) = e<sup>−8 × 10⁻⁵ × 7512</sup> = e<sup>−0,601</sup> ≈ 0,548. Probabilité de panne : 1 − 0,548 = <b>0,452 ≈ 45 %</b>.</li></ol>
<p>Les questions 1, 3 et 4 reprennent l’exercice 3 de 2018, dont le corrigé officiel donne 0,24 ; 90 % ; 45 %. La question 2 est corrigée par moi.</p>` },
  { t: 'Devoir 2019, exercice 3 : trois montages', n: 'devoir · 5 points', e: `<p>Deux composants identiques, indépendants, de durée de vie exponentielle de paramètre λ.</p>
<ol><li>Fiabilité du montage série au-delà de t heures. A.N. : λ = 10<sup>−4</sup>, t = 3000 h.</li><li>Même question pour le montage parallèle.</li><li>Trois composants identiques, le montage fonctionnant avec au moins deux d’entre eux. Fiabilité et A.N.</li></ol>`,
    s: `<p>A₁, A₂ (puis A₃) : « le composant i fonctionne au-delà de t ». Ils sont indépendants et P(Aᵢ) = e<sup>−λt</sup>.</p>
<ol><li>R<sub>M1</sub>(t) = P(A₁ ∩ A₂) = P(A₁) × P(A₂) = e<sup>−2λt</sup>. A.N. : e<sup>−0,6</sup> = <b>0,55</b>. <i>(1,5 point)</i></li>
<li>R<sub>M2</sub>(t) = P(A₁ ∪ A₂) = P(A₁) + P(A₂) − P(A₁) × P(A₂) = 2e<sup>−λt</sup> − e<sup>−2λt</sup>. A.N. : 2 × 0,74 − 0,55 = <b>0,93</b>. <i>(1,5 point)</i></li>
<li>R<sub>M3</sub>(t) = P(A₁A₂A₃) + P(A₁A₂A₃<sup>C</sup>) + P(A₁A₂<sup>C</sup>A₃) + P(A₁<sup>C</sup>A₂A₃) = e<sup>−3λt</sup> + 3e<sup>−2λt</sup>(1 − e<sup>−λt</sup>) = 3e<sup>−2λt</sup> − 2e<sup>−3λt</sup>. A.N. : 3 × 0,55 − 2 × 0,41 = <b>0,83</b>. <i>(2 points)</i></li></ol>
<p>Corrigé officiel. Le professeur passe ici par l’union pour le parallèle ; en 2018 il passait par le produit des pannes. Les deux rédactions sont acceptées.</p>` },
  { t: 'Devoir 2024, exercice 4 : loi de Tₙ', n: 'devoir · 5 points', e: `<p>X₁, …, Xₙ : variables de même loi exponentielle de paramètre λ, mesurant les temps de bon fonctionnement successifs (réparations négligeables). Tₙ = X₁ + … + Xₙ. Quelle est la loi de Tₙ ? Démontrer.</p>`,
    s: `<p><b>Réponse.</b> Tₙ, instant de la n-ième panne, suit la <b>loi d’Erlang</b> de paramètres (n, λ) : f(t) = λ<sup>n</sup> t<sup>n − 1</sup> e<sup>−λt</sup>/(n − 1)! pour t ≥ 0 ; E(Tₙ) = n/λ.</p>
<p><b>Démonstration par récurrence</b> (les Xᵢ sont indépendantes).</p>
<ul><li>n = 1 : f₁(t) = λ e<sup>−λt</sup>, vrai.</li>
<li>Si c’est vrai au rang n : Tₙ₊₁ = Tₙ + Xₙ₊₁, donc f<sub>n + 1</sub>(t) = ∫<sub>0</sub><sup>t</sup> f<sub>n</sub>(s) λ e<sup>−λ(t − s)</sup> ds = [λ<sup>n + 1</sup> e<sup>−λt</sup>/(n − 1)!] ∫<sub>0</sub><sup>t</sup> s<sup>n − 1</sup> ds = λ<sup>n + 1</sup> t<sup>n</sup> e<sup>−λt</sup>/n!. Vrai au rang n + 1.</li></ul>
<p><b>Autre démonstration</b> : {Tₙ &gt; t} = {N(t) ≤ n − 1} avec N(t) de loi de Poisson(λt), d’où P(Tₙ &gt; t) = Σ<sub>k &lt; n</sub> e<sup>−λt</sup>(λt)<sup>k</sup>/k! ; en dérivant, la somme se télescope et il reste la densité d’Erlang.</p>
<p><small>Corrigé rédigé par moi ; pas de corrigé officiel.</small></p>` },
  { t: 'TD 2, exercice 15 : loi normale', n: 'TD', e: `<p>X suit la loi normale de moyenne −1 et d’écart type 2.</p><ol><li>Calculer P(X &lt; −1), P(X &gt; 1), P(−3 &lt; X &lt; 1).</li><li>Y est normale avec P(Y &lt; 3) = P(Y &gt; −1) = 0,8413. Déterminer ses paramètres.</li></ol>`,
    s: `<ol><li>Z = (X + 1)/2 suit N(0, 1). P(X &lt; −1) = P(Z &lt; 0) = <b>0,5</b>. P(X &gt; 1) = P(Z &gt; 1) = 1 − 0,8413 = <b>0,1587</b>. P(−3 &lt; X &lt; 1) = P(−1 &lt; Z &lt; 1) = 2 × 0,8413 − 1 = <b>0,6826</b>.</li>
<li>0,8413 = π(1). P(Y &lt; 3) = π((3 − μ)/σ) donne (3 − μ)/σ = 1. P(Y &gt; −1) = π((μ + 1)/σ) donne (μ + 1)/σ = 1. Donc 3 − μ = μ + 1 : <b>μ = 1</b>, puis <b>σ = 2</b>.</li></ol>
<p><small>Corrigé rédigé par moi, en lisant « N(−1, 2) » comme moyenne −1 et écart type 2, la convention des autres corrigés du TD.</small></p>` },
  { t: 'TD 2, exercice 16 : loi uniforme', n: 'TD', e: `<p>X suit la loi uniforme sur [−1, 1].</p><ol><li>Donner sa densité f et sa fonction de répartition F.</li><li>Soit Y = X². Déterminer la densité g de Y.</li></ol>`,
    s: `<ol><li>f(x) = 1/2 sur [−1, 1], 0 ailleurs. F(x) = 0 si x &lt; −1 ; (x + 1)/2 sur [−1, 1] ; 1 si x &gt; 1.</li>
<li>Y prend ses valeurs dans [0, 1]. Pour 0 ≤ y ≤ 1 : G(y) = P(X² ≤ y) = P(−√y ≤ X ≤ √y) = F(√y) − F(−√y) = √y. En dérivant : <b>g(y) = 1/(2√y)</b> pour 0 &lt; y ≤ 1, et 0 ailleurs.</li></ol>
<p><small>Corrigé rédigé par moi.</small></p>` }
]
});

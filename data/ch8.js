REV.chapitres.push({
n: 8, titre: 'Annales — les sept devoirs à refaire', en: 'Devoirs 2018 à 2025, QCM de cours intégral et deux sujets blancs',
objectifs: [
  'refaire chaque devoir <b>sur papier, en 1 h 30</b>, puis vérifier chaque résultat ici ;',
  'comparer ta rédaction aux <b>corrigés officiels</b> quand ils existent ;',
  'faire un <b>sans-faute</b> au QCM de cours du professeur ;',
  'tester ta préparation sur deux <b>sujets blancs</b> construits comme les siens.'
],
sections: [
{ id: '8.1', t: 'Mode d’emploi', h: `
<ol class="steps">
<li><div>Choisis un devoir. Lis l’énoncé, ferme l’interface, et traite-le <b>sur papier en 1 h 30</b>.</div></li>
<li><div>Reviens taper chacun de tes résultats. L’interface te dit s’il est juste.</div></li>
<li><div>Ouvre la solution de chaque question, même réussie, pour comparer la <b>rédaction</b> : c’est elle qui est notée.</div></li>
<li><div>Note les questions ratées et refais-les le lendemain.</div></li>
</ol>
<div class="tw"><table>
<thead><tr><th>Devoir</th><th>Corrigé disponible dans le dossier</th><th>Hors cours 1 à 3</th></tr></thead>
<tbody>
<tr><th><a href="#/ch/8/cours/8.2">2018</a></th><td>officiel, avec barème</td><td>—</td></tr>
<tr><th><a href="#/ch/8/cours/8.3">2019</a></th><td>officiel, avec barème</td><td>—</td></tr>
<tr><th><a href="#/ch/8/cours/8.4">2021</a></th><td>aucun</td><td>exercice 4 (diagramme de fiabilité) ; Weibull à trois paramètres</td></tr>
<tr><th><a href="#/ch/8/cours/8.5">2022</a></th><td>officiel</td><td>—</td></tr>
<tr><th><a href="#/ch/8/cours/8.6">2023</a></th><td>officiel, avec barème, et le QCM d’une copie notée</td><td>—</td></tr>
<tr><th><a href="#/ch/8/cours/8.7">2024</a></th><td>aucun</td><td>—</td></tr>
<tr><th><a href="#/ch/8/cours/8.8">2025</a></th><td>aucun</td><td>—</td></tr>
</tbody></table></div>
<div class="plus">Quand il n’y a pas de corrigé officiel (2021, 2024, 2025), les solutions sont les miennes. Elles appliquent les méthodes des corrigés officiels des autres années, mais elles n’ont pas été validées par le professeur. Les valeurs acceptées tiennent compte de ses arrondis (par exemple 25 ou 25,7 pièces).</div>` },

{ id: '8.2', t: 'Devoir 2018-2019', h: `
<h4>Exercice 1 (5 points)</h4>
<p>Une usine fabrique un composant sur deux chaînes. La chaîne A produit 40 % des composants et la chaîne B le reste. En sortie de A, 20 % des composants ont un défaut ; en sortie de B, 5 %. A : « provient de A » ; B : « provient de B » ; S : « sans défaut ».</p>
<p>1. Dessiner l’arbre des probabilités conditionnelles <i>(1,5 point)</i>.</p>
<div data-lab="calc" data-r="0.89"><p>2. Calculer P(S). <i>(1,5 point)</i></p>
<div class="sol">Feuilles : P(S ∩ A) = 0,8 × 0,4 = 0,32 ; P(S<sup>C</sup> ∩ A) = 0,08 ; P(S ∩ B) = 0,95 × 0,6 = 0,57 ; P(S<sup>C</sup> ∩ B) = 0,03.<br>P(S) = P(S ∩ A) + P(S ∩ B) = 0,32 + 0,57 = <b>0,89</b>.</div></div>
<div data-lab="calc" data-r="0.36" data-tol="0.006"><p>3. Sachant que le composant n’a pas de défaut, probabilité qu’il provienne de A, à 10<sup>−2</sup> près. <i>(1 point)</i></p>
<div class="sol">P(A | S) = P(S ∩ A) ÷ P(S) = 0,32 ÷ 0,89 ≈ <b>0,36</b>.</div></div>
<div data-lab="calc" data-r="0.64" data-tol="0.006"><p>4. Même question pour la chaîne B. <i>(1 point)</i></p>
<div class="sol">P(B | S) = 0,57 ÷ 0,89 ≈ <b>0,64</b> (ou 1 − 0,36).</div></div>
<h4>Exercice 2 (5 points)</h4>
<p>La durée de vie d’un système électronique suit une loi exponentielle. La probabilité qu’il fonctionne 150 heures est 0,85.</p>
<div data-lab="calc" data-r="25" data-alt="26;25.7" data-u="pièces"><p>1. Garantie de 100 heures : combien de pièces sur 250 seront retournées sous garantie ? <i>(2,5 points)</i></p>
<div class="sol">R(150) = 0,85 ⇒ λ = −ln(0,85)/150 = 0,001083. R(100) = e<sup>−0,1083</sup> = 0,897 ≈ 90 %. Taux de rejet : 10 %. Sur 250 pièces : <b>25</b> (25,7 sans arrondir).</div></div>
<div data-lab="calc" data-r="0.8973" data-tol="0.004" data-alt="0.9"><p>2. Probabilité d’être encore en fonctionnement à 300 heures sachant qu’il l’était à 200 heures. <i>(1,5 point)</i></p>
<div class="sol">R<sub>t₁</sub>(t₂) = P(T ≥ t₂ | T ≥ t₁) = R(t₂)/R(t₁) = e<sup>−λ(t₂ − t₁)</sup> = e<sup>−0,108</sup> ≈ <b>0,897 ≈ 90 %</b>.</div></div>
<div data-lab="calc" data-r="225" data-alt="224" data-u="pièces"><p>3. Sur 250 pièces ayant survécu à 200 heures, combien fonctionneront encore à 300 heures ? <i>(1 point)</i></p>
<div class="sol">250 × 90 % = <b>225</b>.</div></div>
<h4>Exercice 3 (5 points)</h4>
<div data-lab="calc" data-r="0.2387" data-tol="0.003"><p>1. Loi exponentielle de facteur λ = 0,5 par heure. Probabilité de panne entre la première et la deuxième heure. <i>(2 points)</i></p>
<div class="sol">P(t₁ ≤ T ≤ t₂) = F(t₂) − F(t₁) = R(t₁) − R(t₂) = e<sup>−0,5</sup> − e<sup>−1</sup> = 0,61 − 0,37 = <b>0,24</b>.</div></div>
<div data-lab="calc" data-r="0.9025" data-alt="0.9048"><p>2. 5 % des composants ne durent pas plus de 100 heures. Probabilité de durer plus de 200 heures. <i>(2 points)</i></p>
<div class="sol">F(100) = 5 % ⇒ R(100) = 0,95 ⇒ λ = −ln(0,95)/100 = 5 × 10<sup>−4</sup>. R(200) = e<sup>−0,1</sup> = <b>90 %</b> (0,9025 exactement).</div></div>
<div data-lab="calc" data-r="0.4517" data-tol="0.006"><p>3. λ = 8 × 10<sup>−5</sup> par heure. Probabilité de panne durant une année, à 24 h sur 24 et 6 jours sur 7. <i>(1 point)</i></p>
<div class="sol">D = (365 − 52) × 24 = 7512 h. R(D) = e<sup>−8 × 10⁻⁵ × 7512</sup> = 0,548 ≈ 55 %. Probabilité de panne : <b>45 %</b>.</div></div>
<h4>Exercice 4 (5 points)</h4>
<p>Deux composants indépendants de durées de vie exponentielles de paramètres λ₁, λ₂. S₁ fonctionne si les deux fonctionnent ; S₂ fonctionne si au moins un fonctionne.</p>
<div data-lab="calc" data-r="0.5169" data-tol="0.004"><p>1 et 2. Fiabilité de S₁ au-delà de t <i>(2 points)</i>, puis A.N. pour λ₁ = λ₂ = 0,00011 et t = 3000 heures <i>(0,5 point)</i>.</p>
<div class="sol">R<sub>S1</sub>(t) = P(T₁ ≥ t et T₂ ≥ t) = R₁(t) × R₂(t) = e<sup>−(λ₁ + λ₂)t</sup> = e<sup>−2λt</sup>. A.N. : e<sup>−0,66</sup> = <b>0,5169 ≈ 52 %</b>.</div></div>
<div data-lab="calc" data-r="0.921" data-tol="0.004"><p>3 et 4. Fiabilité de S₂ au-delà de t <i>(2 points)</i>, puis A.N. <i>(0,5 point)</i>.</p>
<div class="sol">1 − R<sub>S2</sub>(t) = (1 − R₁(t))(1 − R₂(t)), d’où R<sub>S2</sub>(t) = R₁ + R₂ − R₁R₂ = 2e<sup>−λt</sup> − e<sup>−2λt</sup>. A.N. : 2 × 0,7189 − 0,5169 = <b>0,9209 ≈ 92 %</b>. Le second montage est plus fiable que le premier.</div></div>` },

{ id: '8.3', t: 'Devoir 2019-2020', h: `
<h4>Exercice 1 (4 points)</h4>
<p>Un appareil est monté avec des pièces de haute qualité (40 % des cas), ordinaires (50 %) ou médiocres (10 %). Sa fiabilité sur une durée t vaut respectivement 0,95 ; 0,7 ; 0,5.</p>
<p>1. Dessiner l’arbre <i>(1 point)</i>.</p>
<div data-lab="calc" data-r="0.78"><p>2. Probabilité que l’appareil soit fiable. <i>(1 point)</i></p>
<div class="sol">P(F) = 0,95 × 0,4 + 0,7 × 0,5 + 0,5 × 0,1 = 0,38 + 0,35 + 0,05 = <b>0,78</b>. Donc P(F<sup>C</sup>) = 0,22.</div></div>
<div data-lab="calc" data-r="0.0909" data-tol="0.003"><p>3a. L’appareil s’est avéré non fiable. Probabilité qu’il soit en pièces de haute qualité. <i>(0,5 point)</i></p>
<div class="sol">P(H | F<sup>C</sup>) = 0,02 ÷ 0,22 ≈ <b>0,091</b>.</div></div>
<div data-lab="calc" data-r="0.6818" data-tol="0.006"><p>3b. Probabilité qu’il soit en pièces ordinaires. <i>(0,5 point)</i></p>
<div class="sol">P(O | F<sup>C</sup>) = 0,15 ÷ 0,22 ≈ <b>0,682</b>.</div></div>
<div data-lab="calc" data-r="0.2273" data-tol="0.004"><p>3c. Probabilité qu’il soit en pièces médiocres. <i>(0,5 point)</i></p>
<div class="sol">P(M | F<sup>C</sup>) = 0,05 ÷ 0,22 ≈ <b>0,227</b>. Somme des trois : 1.</div></div>
<p>4. Utilité pour le fabricant <i>(0,5 point)</i> : taux de rejet de 22 %, dû surtout aux pièces ordinaires (68 %) et médiocres (23 %) ; garder ou réduire ces proportions selon que le gain dépasse ou non le coût de réparation.</p>
<h4>Exercice 2 (5 points)</h4>
<p>T suit une loi exponentielle de paramètre λ. 1. R(t) = e<sup>−λt</sup>, f(t) = λe<sup>−λt</sup>, F(t) = 1 − e<sup>−λt</sup> <i>(1 point)</i>.</p>
<div data-lab="calc" data-r="0.000112" data-tol="0.000004"><p>2. R(2000) = 0,8 : valeur de λ, arrondie à la sixième décimale. <i>(1 point)</i></p>
<div class="sol">λ = −ln(0,8)/2000 = <b>0,000112</b> (1,1 × 10<sup>−4</sup>).</div></div>
<div data-lab="calc" data-r="9091" data-tol="2" data-u="heures"><p>3a. Avec λ = 0,00011 : temps moyen de bon fonctionnement. <i>(0,5 point)</i></p>
<div class="sol">MTTF = 1/λ = <b>9091 heures</b>.</div></div>
<div data-lab="calc" data-r="0.719" data-tol="0.002"><p>3b. P(T &gt; 3000), au millième. <i>(0,5 point)</i></p>
<div class="sol">e<sup>−0,33</sup> = <b>0,719</b>.</div></div>
<div data-lab="calc" data-r="0.9465" data-tol="0.003"><p>3c. Probabilité d’être en fonctionnement à 3000 heures sachant qu’il l’était à 2500 heures. <i>(1,5 point)</i></p>
<div class="sol">P(T &gt; 3000)/P(T &gt; 2500) = e<sup>−0,00011 × 500</sup> = <b>0,9465</b>.</div></div>
<p>3d. Déduction <i>(0,5 point)</i> : la loi exponentielle est sans mémoire.</p>
<h4>Exercice 3 (5 points)</h4>
<p>Composants identiques et indépendants, exponentiels de paramètre λ = 10<sup>−4</sup> ; t = 3000 heures.</p>
<div data-lab="calc" data-r="0.5488" data-tol="0.006"><p>1. Montage série de deux composants. <i>(1,5 point)</i></p>
<div class="sol">e<sup>−2λt</sup> = e<sup>−0,6</sup> = <b>0,55</b>.</div></div>
<div data-lab="calc" data-r="0.9328" data-tol="0.006"><p>2. Montage parallèle de deux composants. <i>(1,5 point)</i></p>
<div class="sol">2e<sup>−λt</sup> − e<sup>−2λt</sup> = 2 × 0,74 − 0,55 = <b>0,93</b>.</div></div>
<div data-lab="calc" data-r="0.8333" data-tol="0.006"><p>3. Trois composants, au moins deux fonctionnels. <i>(2 points)</i></p>
<div class="sol">3e<sup>−2λt</sup> − 2e<sup>−3λt</sup> = 3 × 0,55 − 2 × 0,41 = <b>0,83</b>.</div></div>
<h4>Exercice 4 (6 points)</h4>
<p>QCM de cours : il est reproduit en entier en <a href="#/ch/8/cours/8.9">8.9</a>.</p>` },

{ id: '8.4', t: 'Devoir 2021-2022', h: `
<h4>Exercice 1 (5 points) — liens de communication</h4>
<p>Huit liens a à h, indépendants, chacun en fonctionnement avec la probabilité p (schéma décrit en <a href="#/ch/6/cours/6.9">6.9</a>).</p>
<div data-lab="choix" data-a="1"><p>1. Probabilité qu’exactement deux liens fonctionnent ?</p>
<ul><li>8 p²(1 − p)⁶</li><li>28 p²(1 − p)⁶</li><li>28 p⁶(1 − p)²</li><li>p²</li></ul>
<div class="sol">Binomiale B(8, p) : C(8, 2) = 28.</div></div>
<div data-lab="choix" data-a="0"><p>2. Probabilité qu’exactement le lien g et un autre lien fonctionnent ?</p>
<ul><li>7 p²(1 − p)⁶</li><li>28 p²(1 − p)⁶</li><li>p × 7 p (1 − p)⁷</li><li>8 p²(1 − p)⁶</li></ul>
<div class="sol">g fonctionne (p) et exactement un des sept autres (7 p (1 − p)⁶).</div></div>
<div data-lab="calc" data-r="1/14" data-tol="0.002"><p>3. Sachant que six liens sont en panne, probabilité que A communique encore avec B ?</p>
<div class="sol">Deux paires utiles ({b, g} et {c, h}) sur 28 paires équiprobables : 2/28 = <b>1/14 ≈ 0,071</b>.</div></div>
<h4>Exercice 2 (5 points) — trois types de fautes</h4>
<div data-lab="calc" data-r="0.1235" data-tol="0.002"><p>n = 6, p₁ = p₂ = p₃ = 1/3. Probabilité d’avoir deux fautes de chaque type ?</p>
<div class="sol">Multinomiale : [6!/(2! 2! 2!)] × (1/3)⁶ = 90/729 = <b>0,1235</b>.</div></div>
<div data-lab="calc" data-r="0.3292" data-tol="0.004"><p>Mêmes données. Probabilité d’avoir exactement 2 fautes de type f₁ ?</p>
<div class="sol">Binomiale : C(6, 2)(1/3)²(2/3)⁴ = 80/243 = <b>0,3292</b>.</div></div>
<h4>Exercice 3 (6 points) — Weibull</h4>
<p>T suit une loi de Weibull de paramètres β, γ, η. 1. R(t) = exp(−((t − γ)/η)<sup>β</sup>) ; F(t) = 1 − R(t) ; MTTF = γ + η Γ(1 + 1/β). β : forme ; η : échelle ; γ : position (<a href="#/ch/7/cours/7.9">7.9</a>).</p>
<div data-lab="calc" data-r="8963" data-tol="25"><p>2. β = 1, γ = 0, R(2000) = 0,8. Valeur de η ?</p>
<div class="sol">e<sup>−2000/η</sup> = 0,8 ⇒ η = −2000/ln(0,8) ≈ <b>8963</b> heures.</div></div>
<div data-lab="calc" data-r="9000" data-u="heures"><p>3a. Avec η = 9000 : temps moyen de bon fonctionnement ?</p>
<div class="sol">Avec β = 1 et γ = 0, la loi est exponentielle de taux 1/η : MTTF = η = <b>9000 heures</b>.</div></div>
<div data-lab="calc" data-r="0.717" data-tol="0.002"><p>3b. P(T &gt; 3000), au millième ?</p>
<div class="sol">e<sup>−3000/9000</sup> = e<sup>−1/3</sup> ≈ <b>0,717</b>.</div></div>
<div data-lab="calc" data-r="0.0754" data-tol="0.001"><p>3c. Probabilité de panne entre 3000 et 4000 heures ?</p>
<div class="sol">R(3000) − R(4000) = e<sup>−1/3</sup> − e<sup>−4/9</sup> = 0,7165 − 0,6412 ≈ <b>0,0754</b>.</div></div>
<div data-lab="calc" data-r="0.5134" data-tol="0.004"><p>4. Deux composants identiques indépendants en série : probabilité de fonctionner au-delà de 3000 heures ?</p>
<div class="sol">R(3000)² = e<sup>−2/3</sup> ≈ <b>0,513</b>.</div></div>
<div data-lab="calc" data-r="0.9196" data-tol="0.004"><p>5. Même question en parallèle.</p>
<div class="sol">2 × 0,7165 − 0,5134 ≈ <b>0,920</b>.</div></div>
<h4>Exercice 4 (4 points)</h4>
<div class="plus">Calcul de la fiabilité et du MTTF d’un système de six composants donné par un diagramme de fiabilité. Cet exercice relève du cours 5 (systèmes multi-composants), que ton devoir ne couvre pas : il n’est pas traité ici. Le principe reste celui de <a href="#/ch/7/cours/7.7">7.7</a> : réduire le diagramme en blocs série et parallèle.</div>` },

{ id: '8.5', t: 'Devoir 2022-2023', h: `
<h4>Exercice 1 (4 points)</h4>
<div data-lab="calc" data-r="0.6"><p>Un système subit deux types de panne A et B. Dans 70 % du temps, aucune ne se produit. A se produit 20 % du temps, B 25 % du temps. Un jour la panne B s’est produite : probabilité que A se soit produite aussi ?</p>
<div class="sol">P(A ∪ B) = 1 − P(A<sup>C</sup> ∩ B<sup>C</sup>) = 1 − 0,7 = 0,3.<br>P(A ∩ B) = P(A) + P(B) − P(A ∪ B) = 0,2 + 0,25 − 0,3 = 0,15.<br>P(A | B) = 0,15 ÷ 0,25 = 3/5 = <b>0,60</b>.</div></div>
<h4>Exercice 2 (5 points) — la garantie</h4>
<p>Loi exponentielle ; la probabilité de fonctionner 150 heures est 0,85.</p>
<div data-lab="calc" data-r="250" data-alt="243;244;243.5" data-u="pièces"><p>1. Garantie de 100 heures ; 25 pièces retournées. De combien de pièces disposait-on au départ ? <i>(2,5 points)</i></p>
<div class="sol">λ = −ln(0,85)/150 = 0,001083 ; R(100) = 0,89732 ≈ 90 % ; taux de rejet 10 % ; Q₀ = 25 ÷ 10 % = <b>250 pièces</b>.</div></div>
<div data-lab="calc" data-r="0.8973" data-tol="0.004" data-alt="0.9"><p>2. Probabilité d’être encore en fonctionnement à 300 heures sachant qu’il l’était à 200 heures. <i>(1,5 point)</i></p>
<div class="sol">R<sub>200</sub>(300) = e<sup>−λ(300 − 200)</sup> ≈ 0,8976 ≈ <b>90 %</b>.</div></div>
<div data-lab="calc" data-r="225" data-alt="224" data-u="pièces"><p>3. Sur 250 pièces ayant survécu à 200 heures, combien à 300 heures ? <i>(1 point)</i></p>
<div class="sol">250 × 90 % = <b>225</b>.</div></div>
<h4>Exercice 3 (5 points) — le radar</h4>
<p>Détection d’un avion présent : 0,99. Signal sans avion : 0,1. Probabilité qu’un avion survole la zone : 0,05. 1. Arbre <i>(1 point)</i>.</p>
<div data-lab="calc" data-r="0.1445" data-tol="0.001"><p>2. Probabilité que le radar signale un objet. <i>(1 point)</i></p>
<div class="sol">P(E) = P(E | A)P(A) + P(E | A<sup>C</sup>)P(A<sup>C</sup>) = 0,99 × 0,05 + 0,1 × 0,95 = <b>0,1445</b>.</div></div>
<div data-lab="calc" data-r="0.8555" data-tol="0.001"><p>3. Probabilité qu’il ne signale rien. <i>(1 point)</i></p>
<div class="sol">P(E<sup>C</sup>) = 0,01 × 0,05 + 0,90 × 0,95 = 0,0005 + 0,855 = <b>0,8555</b>.</div></div>
<div data-lab="calc" data-r="0.0955" data-tol="0.001" data-alt="0.1"><p>4. Probabilité que le radar faille à sa mission. <i>(2 points)</i></p>
<div class="sol">Faux négatifs : P(E<sup>C</sup> ∩ A) = 0,01 × 0,05 = 0,0005. Faux positifs : P(E ∩ A<sup>C</sup>) = 0,1 × 0,95 = 0,095. Total : <b>0,0955</b>. (Le corrigé officiel écrit 0,005 + 0,095 = 0,1 ; la valeur 0,1 est acceptée ici.)</div></div>
<h4>Exercice 4 (6 points)</h4>
<p>QCM de cours : voir <a href="#/ch/8/cours/8.9">8.9</a>.</p>` },

{ id: '8.6', t: 'Devoir 2023-2024', h: `
<h4>Exercice 1 (2 points)</h4>
<div data-lab="calc" data-r="0.05" data-tol="0.0006"><p>Un appareil peut présenter deux défauts A et B, indépendants. P(A) = 0,02 et la probabilité d’au moins un des deux défauts est 0,069. Calculer P(B).</p>
<div class="sol">P(A ∪ B) = P(A) + P(B) − P(A)P(B) = P(A) + P(B)(1 − P(A)).<br>P(B) = (0,069 − 0,02) ÷ (1 − 0,02) = 0,049 ÷ 0,98 = <b>0,05</b>.</div></div>
<h4>Exercice 2 (5 points)</h4>
<p>Un logiciel est exécuté chaque jour ouvrable ; il peut subir chaque jour une panne avec une probabilité p.</p>
<div data-lab="choix" data-a="2"><p>1. Probabilité de k = 3 pannes dans la semaine ? <i>(1,5 point)</i></p>
<ul><li>p³(1 − p)²</li><li>6 p³(1 − p)²</li><li>10 p³(1 − p)²</li><li>5 p³(1 − p)²</li></ul>
<div class="sol">X suit B(5, p) : C(5, 3) p³(1 − p)² = 10 p³(1 − p)².</div></div>
<div data-lab="choix" data-a="0"><p>2. Probabilité d’au moins une panne par semaine ? <i>(1 point)</i></p>
<ul><li>1 − (1 − p)⁵</li><li>1 − p⁵</li><li>5 p (1 − p)⁴</li><li>(1 − p)⁵</li></ul>
<div class="sol">1 − P(X = 0).</div></div>
<div data-lab="choix" data-a="1"><p>3. Probabilité que la première panne arrive au 3ᵉ jour ? <i>(1 point)</i></p>
<ul><li>3 p (1 − p)²</li><li>p (1 − p)²</li><li>p³</li><li>10 p (1 − p)²</li></ul>
<div class="sol">Loi géométrique : deux jours sans panne, puis une panne.</div></div>
<div data-lab="choix" data-a="3"><p>4. Probabilité que la 3ᵉ panne arrive au 5ᵉ jour ? <i>(1,5 point)</i></p>
<ul><li>10 p³(1 − p)²</li><li>p³(1 − p)²</li><li>3 p³(1 − p)²</li><li>6 p³(1 − p)²</li></ul>
<div class="sol">Loi de Pascal : C(5 − 1, 3 − 1) = C(4, 2) = 6.</div></div>
<h4>Exercice 3 (5 points)</h4>
<div data-lab="calc" data-r="0.1235" data-tol="0.002"><p>Trois types de fautes, n = 6, probabilités 1/3 chacune, k₁ = k₂ = k₃ = 2. <i>(2 points pour la formule, 1 point pour l’A.N.)</i></p>
<div class="sol">P = [n!/(k₁! k₂! k₃!)] p₁<sup>k₁</sup> p₂<sup>k₂</sup> p₃<sup>k₃</sup> = 90 × (1/3)⁶ = 10/81 = <b>0,1235</b>.</div></div>
<div data-lab="calc" data-r="0.3292" data-tol="0.004"><p>Probabilité d’avoir m = 2 fautes de type f₁. <i>(1 + 1 point)</i></p>
<div class="sol">P(X₁ = m) = C(n, m) p₁<sup>m</sup>(1 − p₁)<sup>n − m</sup> = 15 × (1/9) × (16/81) = 80/243 = <b>0,3292</b>.</div></div>
<h4>Exercice 4 (8 points)</h4>
<p>QCM de cours en quatre questions : relier les 7 aspects de la SdF ; relier les 5 types de tests ; cocher 8 items ; donner quatre objectifs de la SdF et deux techniques chacun. Tout est en <a href="#/ch/8/cours/8.9">8.9</a>.</p>` },

{ id: '8.7', t: 'Devoir 2024-2025', h: `
<h4>Exercice 1 (5 points)</h4>
<p>Deux traitements T1 et T2. A : « défaut pour T1 », P(A) = 0,10. B : « défaut pour T2 », P(B) = 0,20. Probabilité d’aucun défaut : 0,75.</p>
<div data-lab="calc" data-r="0.25"><p>1. Probabilité d’un défaut pour au moins un des deux traitements.</p>
<div class="sol">1 − 0,75 = <b>0,25</b>.</div></div>
<div data-lab="calc" data-r="0.05" data-tol="0.0006"><p>2. Probabilité d’un défaut pour les deux traitements.</p>
<div class="sol">P(A ∩ B) = 0,10 + 0,20 − 0,25 = <b>0,05</b>.</div></div>
<div data-lab="choix" data-a="1"><p>3. Les événements sont-ils indépendants ?</p>
<ul><li>Oui, car P(A ∩ B) n’est pas nulle</li><li>Non, car P(A) × P(B) = 0,02 ≠ 0,05</li><li>Oui, car P(A) + P(B) &lt; 1</li></ul>
<div class="sol">On compare P(A ∩ B) au produit P(A) × P(B).</div></div>
<div data-lab="calc" data-r="0.2"><p>4. Probabilité d’un défaut pour un seul des deux traitements.</p>
<div class="sol">P(A ∪ B) − P(A ∩ B) = 0,25 − 0,05 = <b>0,20</b>.</div></div>
<div data-lab="calc" data-r="0.5"><p>5. Probabilité d’un défaut T2 sachant un défaut T1.</p>
<div class="sol">P(B | A) = 0,05 ÷ 0,10 = <b>0,5</b>.</div></div>
<h4>Exercice 2 (5 points) — la garantie</h4>
<p>Même énoncé qu’en 2022 : R(150) = 0,85 ; garantie de 100 heures ; 25 retours.</p>
<div data-lab="calc" data-r="250" data-alt="243;244;243.5" data-u="pièces"><p>1. Nombre de pièces au départ. <i>(2,5 points)</i></p>
<div class="sol">R(100) ≈ 90 %, taux de retour 10 %, Q₀ = <b>250</b>.</div></div>
<div data-lab="calc" data-r="0.8973" data-tol="0.004" data-alt="0.9"><p>2. P(T &gt; 300 | T &gt; 200). <i>(1,5 point)</i></p>
<div class="sol">R(100) ≈ <b>0,897</b>.</div></div>
<div data-lab="calc" data-r="225" data-alt="224" data-u="pièces"><p>3. Pièces encore fonctionnelles à 300 heures parmi 250 ayant survécu à 200 heures. <i>(1 point)</i></p>
<div class="sol"><b>225</b>.</div></div>
<h4>Exercice 3 (5 points) — liens de communication</h4>
<p>Mêmes questions qu’en 2021 : 28 p²(1 − p)⁶ ; 7 p²(1 − p)⁶ ; 1/14. Détail en <a href="#/ch/6/cours/6.9">6.9</a>.</p>
<div data-lab="calc" data-r="1/14" data-tol="0.002"><p>3. Sachant six liens en panne, probabilité que A communique avec B.</p>
<div class="sol">2 paires sur 28 : <b>1/14</b>.</div></div>
<h4>Exercice 4 (5 points) — loi de Tₙ</h4>
<div data-lab="choix" data-a="2"><p>X₁, …, Xₙ exponentielles de paramètre λ ; Tₙ = X₁ + … + Xₙ. Loi de Tₙ ?</p>
<ul><li>Exponentielle de paramètre nλ</li><li>Poisson de paramètre nλ</li><li>Erlang de paramètres n et λ</li><li>Normale</li></ul>
<div class="sol">Loi d’Erlang : f(t) = λ<sup>n</sup> t<sup>n − 1</sup> e<sup>−λt</sup>/(n − 1)!. Les deux démonstrations sont en <a href="#/ch/7/cours/7.8">7.8</a>.</div></div>` },

{ id: '8.8', t: 'Devoir 2025-2026', h: `
<h4>Exercice 1 (5 points)</h4>
<p>n défaillances, trois types de fautes f₁, f₂, f₃ de probabilités p₁, p₂, p₃.</p>
<div data-lab="calc" data-r="0.1235" data-tol="0.002"><p>1 et 2. Formule de P(k₁, k₂, k₃), puis A.N. : n = 6, p = 1/3, k = 2, 2, 2.</p>
<div class="sol">Multinomiale : [n!/(k₁! k₂! k₃!)] p₁<sup>k₁</sup> p₂<sup>k₂</sup> p₃<sup>k₃</sup> = 90/729 = <b>0,1235</b>.</div></div>
<div data-lab="calc" data-r="0.3292" data-tol="0.004"><p>3 et 4. Formule de P(m fautes de type f₁), puis A.N. : m = 2.</p>
<div class="sol">Binomiale : C(n, m) p₁<sup>m</sup>(1 − p₁)<sup>n − m</sup> = 80/243 = <b>0,3292</b>.</div></div>
<h4>Exercice 2 (4 points)</h4>
<div data-lab="calc" data-r="0.2387" data-tol="0.003"><p>1. Serveur, loi exponentielle de facteur λ = 0,5 par mois. Probabilité de panne entre le premier et le deuxième mois. <i>(1 point)</i></p>
<div class="sol">R(1) − R(2) = e<sup>−0,5</sup> − e<sup>−1</sup> = <b>0,2387</b>.</div></div>
<div data-lab="calc" data-r="0.0892" data-tol="0.001"><p>2. Probabilité que ce serveur subisse 3 pannes sur une année. <i>(1 point)</i></p>
<div class="sol">Nombre de pannes sur 12 mois : Poisson de paramètre 0,5 × 12 = 6. P(X = 3) = e<sup>−6</sup> × 6³/3! = 36 e<sup>−6</sup> ≈ <b>0,0892</b>.</div></div>
<div data-lab="calc" data-r="0.9025" data-alt="0.9048"><p>3. 5 % des composants ne durent pas plus de 100 heures. Probabilité de durer plus de 200 heures. <i>(1 point)</i></p>
<div class="sol">R(100) = 0,95 ; R(200) = 0,95² = <b>0,9025</b>.</div></div>
<div data-lab="calc" data-r="0.4517" data-tol="0.006"><p>4. λ = 8 × 10<sup>−5</sup> par heure ; probabilité de panne durant une année, 24 h/24 et 6 j/7. <i>(1 point)</i></p>
<div class="sol">D = 7512 h ; 1 − e<sup>−0,601</sup> ≈ <b>0,452</b>.</div></div>
<h4>Exercice 3 (7 points)</h4>
<p><b>Partie 1.</b> Technique de détection : P(déclaré compromis | compromis) = 0,9 ; P(déclaré compromis | sain) = 0,05 ; 90 % des nœuds sont sains. 1. Arbre <i>(0,5 point)</i>.</p>
<div data-lab="calc" data-r="0.135"><p>2. Probabilité que la technique décide « compromis ». <i>(1 point)</i></p>
<div class="sol">0,9 × 0,1 + 0,05 × 0,9 = 0,09 + 0,045 = <b>0,135</b>.</div></div>
<div data-lab="calc" data-r="0.865"><p>3. Probabilité qu’elle décide « sain ». <i>(0,5 point)</i></p>
<div class="sol">1 − 0,135 = <b>0,865</b>.</div></div>
<div data-lab="calc" data-r="0.01156" data-tol="0.0004"><p>4. Probabilité qu’un nœud déclaré sain soit compromis. <i>(1 point)</i></p>
<div class="sol">P(C | D<sup>C</sup>) = (0,1 × 0,1) ÷ 0,865 = 0,01 ÷ 0,865 ≈ <b>0,0116</b>.</div></div>
<div data-lab="calc" data-r="1/3"><p>5. Probabilité qu’un nœud déclaré compromis soit sain. <i>(1 point)</i></p>
<div class="sol">P(S | D) = 0,045 ÷ 0,135 = <b>1/3</b>.</div></div>
<p><b>Partie 2.</b> Trois techniques indépendantes ; le système déclare « compromis » si au moins 2 des 3 le déclarent.</p>
<div data-lab="calc" data-r="0.877" data-tol="0.006" data-alt="0.1277"><p>6. Probabilité que la technique n° 3 décide « compromis » dans le cas où les techniques 1 et 2 ont pris la même décision. <i>(1 point)</i></p>
<div class="sol">En lisant « 1 et 2 ont toutes deux déclaré compromis » : P(D₃ | D₁ ∩ D₂) = (0,1 × 0,9³ + 0,9 × 0,05³) ÷ (0,1 × 0,9² + 0,9 × 0,05²) = 0,0730 ÷ 0,08325 ≈ <b>0,877</b>.<br>En lisant « 1 et 2 sont d’accord, quelle que soit leur décision » : 0,1145 ÷ 0,8965 ≈ 0,128. Les deux valeurs sont acceptées ; précise ta lecture sur la copie.</div></div>
<div data-lab="calc" data-r="0.1037" data-tol="0.001"><p>7a. Probabilité que le système complet décide « compromis ». <i>(2 points avec 7b)</i></p>
<div class="sol">Nœud compromis : 3 × 0,9² × 0,1 + 0,9³ = 0,972. Nœud sain : 3 × 0,05² × 0,95 + 0,05³ = 0,00725. Total : 0,1 × 0,972 + 0,9 × 0,00725 = <b>0,1037</b>.</div></div>
<div data-lab="calc" data-r="0.8963" data-tol="0.001"><p>7b. En déduire la probabilité que le système décide « sain ».</p>
<div class="sol">1 − 0,1037 = <b>0,8963</b>.</div></div>
<h4>Exercice 4 (4 points)</h4>
<p>« Définir la sûreté de fonctionnement ? Citer (sans définir) ses attributs, ses moyens et ses entraves ? » Réponse modèle en <a href="#/ch/2/cours/2.5">2.5</a>.</p>
<div data-lab="choix" data-a="0,2,3"><p>Lesquels figurent dans la liste des <b>attributs</b> ?</p>
<ul><li>Intégrité</li><li>Prévision des fautes</li><li>Maintenabilité</li><li>Confidentialité</li></ul>
<div class="sol">Attributs : disponibilité, fiabilité, sécurité-innocuité, confidentialité, intégrité, maintenabilité. La prévision des fautes est un moyen.</div></div>` },

{ id: '8.9', t: 'Le QCM de cours du professeur, en entier', h: `
<p>Cette feuille a servi en 2019, 2022 et 2023, avec de légères variantes. Vise le sans-faute : ce sont 6 à 8 points.</p>
<h4>Q1 — Relier chaque aspect de la SdF à sa définition</h4>
<div data-lab="relier"><p>Sept lignes, sept définitions.</p>
<dl><dt>Disponibilité</dt><dd>Aptitude d’un système à fonctionner lorsqu’on le sollicite</dd>
<dt>Fiabilité</dt><dd>Continuité du service</dd>
<dt>Sécurité – Innocuité</dt><dd>Absence de conséquences catastrophiques sur l’environnement</dd>
<dt>Sécurité – Immunité</dt><dd>Intégrité + Confidentialité + Disponibilité</dd>
<dt>Confidentialité</dt><dd>Absence de divulgations non autorisées de l’information</dd>
<dt>Intégrité</dt><dd>Absence d’altérations inappropriées du système</dd>
<dt>Maintenabilité</dt><dd>Aptitude aux réparations et aux évolutions</dd></dl></div>
<h4>Q2 — Relier chaque type de défaillance à sa définition (2019, 2022)</h4>
<div data-lab="relier"><p>Quatre niveaux de gravité.</p>
<dl><dt>Défaillance bénigne</dt><dd>pas de conséquence sérieuse, la mission se poursuit normalement</dd>
<dt>Défaillance indicative</dt><dd>la mission est affectée, perte d’efficacité du service rendu, à chiffrer</dd>
<dt>Défaillance critique</dt><dd>réduction dangereuse des marges de sécurité</dd>
<dt>Défaillance catastrophique</dt><dd>mission arrêtée, destruction du produit ou du procédé, blessures, pertes de vies humaines</dd></dl></div>
<h4>Q2 bis — Relier chaque type de test à sa définition (2023)</h4>
<div data-lab="relier"><p>Cinq types de tests.</p>
<dl><dt>Le test dynamique</dt><dd>est incapable d’établir l’absence des erreurs</dd>
<dt>Le test fonctionnel</dt><dd>se base sur l’analyse de la spécification du système logiciel</dd>
<dt>Le test structurel</dt><dd>se base sur l’analyse du code source du système logiciel</dd>
<dt>Le test de régression</dt><dd>vise à s’assurer que les tests déjà effectués restent valides</dd>
<dt>Le test d’intégration</dt><dd>vise à s’assurer de la cohérence des interfaces des unités logicielles</dd></dl></div>
<h4>Q3 — Cocher la ou les cases correspondant aux réponses correctes</h4>
<div data-lab="choix" data-a="0,1,2"><p>La sûreté de fonctionnement d’un système est :</p>
<ul><li>son aptitude à satisfaire à une ou plusieurs fonctions requises dans des conditions données</li><li>les activités d’évaluation de cette aptitude</li><li>la confiance que l’on peut accorder au service qu’il délivre</li></ul>
<div class="sol">Les trois cases.</div></div>
<div data-lab="choix" data-a="2"><p>La maintenance est une activité :</p>
<ul><li>uniquement corrective</li><li>uniquement évolutive</li><li>corrective, adaptative ou évolutive</li></ul>
<div class="sol">Troisième case.</div></div>
<div data-lab="choix" data-a="1"><p>La cause directe d’une défaillance est :</p>
<ul><li>une (ou des) faute(s)</li><li>une (ou des) erreur(s)</li><li>une (ou des) défaillance(s)</li></ul>
<div class="sol">Une erreur.</div></div>
<div data-lab="choix" data-a="0"><p>La cause directe d’une erreur est :</p>
<ul><li>une (ou des) faute(s)</li><li>une (ou des) erreur(s)</li><li>une (ou des) défaillance(s)</li></ul>
<div class="sol">Une faute.</div></div>
<div data-lab="choix" data-a="1"><p>Défaillance cohérente :</p>
<ul><li>n’est constatée que par certains utilisateurs</li><li>est celle dont tous les utilisateurs ont la même perception</li><li>est appelée défaillance byzantine</li></ul>
<div class="sol">Tous les utilisateurs ont la même perception.</div></div>
<div data-lab="choix" data-a="0,2"><p>Défaillance incohérente :</p>
<ul><li>n’est constatée que par certains utilisateurs</li><li>est celle dont tous les utilisateurs ont la même perception</li><li>est appelée défaillance byzantine</li></ul>
<div class="sol">Deux cases : certains utilisateurs, et byzantine.</div></div>
<div data-lab="choix" data-a="1"><p>Défaillance durable :</p>
<ul><li>altère le service rendu momentanément puis fournit à nouveau un service correct</li><li>altère le service rendu pendant une fraction importante de la durée de la mission</li><li>est dite une défaillance temporaire</li></ul>
<div class="sol">Fraction importante de la durée de la mission.</div></div>
<div data-lab="choix" data-a="0"><p>La défaillance temporelle (2023) :</p>
<ul><li>arrive soit trop tôt soit trop tard</li><li>altère le service rendu momentanément puis fournit à nouveau un service correct</li><li>est appelée aussi défaillance byzantine</li></ul>
<div class="sol">Trop tôt ou trop tard.</div></div>
<div data-lab="choix" data-a="2"><p>Une bombe logique (virus…) est :</p>
<ul><li>une faute de développement malveillante et non délibérée</li><li>une faute opérationnelle malveillante et délibérée</li><li>une faute de développement malveillante et délibérée</li></ul>
<div class="sol">Développement, malveillante, délibérée.</div></div>
<div data-lab="choix" data-a="2"><p>Un bug logiciel est :</p>
<ul><li>une faute opérationnelle non malveillante, délibérée ou accidentelle</li><li>une faute opérationnelle non malveillante et non délibérée</li><li>une faute de développement non malveillante, délibérée ou accidentelle</li></ul>
<div class="sol">Développement, non malveillante, délibérée ou accidentelle.</div></div>
<div data-lab="choix" data-a="1"><p>Une attaque de déni de service est :</p>
<ul><li>une faute de développement malveillante et non délibérée</li><li>une faute opérationnelle malveillante et délibérée</li><li>une faute de développement malveillante et délibérée</li></ul>
<div class="sol">Opérationnelle, malveillante, délibérée.</div></div>
<h4>Q4 — Quatre objectifs de la SdF et deux techniques chacun (2023)</h4>
<div data-lab="relier"><p>Associe chaque technique à l’objectif qu’elle sert.</p>
<dl><dt>Revue du cahier des charges, prototypage</dt><dd>Évitement des fautes</dd>
<dt>Lecture croisée</dt><dd>Évitement des fautes</dd>
<dt>Tests des logiciels</dt><dd>Élimination des fautes</dd>
<dt>Simulation, méthodes formelles</dt><dd>Élimination des fautes</dd>
<dt>Gestion des exceptions</dt><dd>Tolérance aux fautes</dd>
<dt>Recouvrement</dt><dd>Tolérance aux fautes</dd>
<dt>Calcul de la fiabilité (MTBF, MTTF)</dt><dd>Prévision des fautes</dd>
<dt>Calcul du MTTR</dt><dd>Prévision des fautes</dd></dl></div>` },

{ id: '8.10', t: 'Sujet blanc n° 1', h: `
<p>Sujet construit par moi sur le modèle des devoirs : mêmes familles d’exercices, autres nombres. Durée : 1 h 30, sans documents.</p>
<h4>Exercice 1 (5 points)</h4>
<p>Un équipement peut déclencher deux alarmes A et B. P(A) = 0,15 ; P(B) = 0,10 ; la probabilité qu’aucune alarme ne se déclenche est 0,80.</p>
<div data-lab="calc" data-r="0.2"><p>1. Probabilité qu’au moins une alarme se déclenche.</p><div class="sol">1 − 0,80 = <b>0,20</b>.</div></div>
<div data-lab="calc" data-r="0.05" data-tol="0.0006"><p>2. Probabilité que les deux se déclenchent.</p><div class="sol">0,15 + 0,10 − 0,20 = <b>0,05</b>.</div></div>
<div data-lab="calc" data-r="0.15"><p>3. Probabilité qu’une seule se déclenche.</p><div class="sol">0,20 − 0,05 = <b>0,15</b>.</div></div>
<div data-lab="calc" data-r="0.5"><p>4. Probabilité que A se déclenche sachant que B s’est déclenchée.</p><div class="sol">P(A | B) = 0,05 ÷ 0,10 = <b>0,5</b>. Les alarmes ne sont pas indépendantes : 0,15 × 0,10 = 0,015 ≠ 0,05.</div></div>
<h4>Exercice 2 (5 points)</h4>
<p>La durée de vie d’un disque suit une loi exponentielle. La probabilité qu’il fonctionne 200 heures est 0,9.</p>
<div data-lab="calc" data-r="0.000527" data-tol="0.00001"><p>1. Valeur de λ (par heure).</p><div class="sol">λ = −ln(0,9)/200 = 0,10536/200 ≈ <b>0,000527</b>.</div></div>
<div data-lab="calc" data-r="780" data-tol="12" data-alt="800" data-u="disques"><p>2. Garantie de 100 heures ; 40 disques retournés. Taille du lot de départ ?</p><div class="sol">R(100) = 0,9<sup>1/2</sup> = 0,9487 ; F(100) = 0,0513. Lot : 40 ÷ 0,0513 ≈ <b>780</b> (800 en arrondissant le taux à 5 %).</div></div>
<div data-lab="calc" data-r="0.9"><p>3. Probabilité de fonctionner encore à 500 heures sachant qu’il fonctionnait à 300 heures.</p><div class="sol">Sans mémoire : R(500 − 300) = R(200) = <b>0,9</b>.</div></div>
<div data-lab="calc" data-r="450" data-u="disques"><p>4. Sur 500 disques ayant survécu à 300 heures, combien à 500 heures ?</p><div class="sol">500 × 0,9 = <b>450</b>.</div></div>
<h4>Exercice 3 (6 points)</h4>
<p>Un détecteur d’intrusion signale une attaque réelle avec probabilité 0,95 et déclenche une fausse alerte sur une connexion normale avec probabilité 0,03. 2 % des connexions sont des attaques.</p>
<div data-lab="calc" data-r="0.0484" data-tol="0.0006"><p>1. Probabilité d’une alerte.</p><div class="sol">0,95 × 0,02 + 0,03 × 0,98 = 0,019 + 0,0294 = <b>0,0484</b>.</div></div>
<div data-lab="calc" data-r="0.3926" data-tol="0.004"><p>2. Probabilité qu’une alerte corresponde à une attaque réelle.</p><div class="sol">0,019 ÷ 0,0484 ≈ <b>0,393</b>.</div></div>
<div data-lab="calc" data-r="0.0304" data-tol="0.0005"><p>3. Probabilité que le détecteur se trompe.</p><div class="sol">Attaque non signalée : 0,05 × 0,02 = 0,001. Fausse alerte : 0,03 × 0,98 = 0,0294. Total : <b>0,0304</b>.</div></div>
<div data-lab="calc" data-r="0.0224" data-tol="0.0004"><p>4. On installe trois détecteurs indépendants ; le système alerte si au moins deux alertent. Probabilité que le système alerte ?</p><div class="sol">Attaque : 3 × 0,95² × 0,05 + 0,95³ = 0,99275. Connexion normale : 3 × 0,03² × 0,97 + 0,03³ = 0,002646. Total : 0,02 × 0,99275 + 0,98 × 0,002646 ≈ <b>0,0224</b>.</div></div>
<h4>Exercice 4 (4 points)</h4>
<p>Définir faute, erreur et défaillance. Donner la chaîne fondamentale. Citer les quatre niveaux de gravité d’une défaillance. Classer un bug logiciel et une attaque de déni de service. → Réponses en <a href="#/ch/3/cours/3.1">3.1</a>, <a href="#/ch/3/cours/3.3">3.3</a>, <a href="#/ch/3/cours/3.6">3.6</a>.</p>` },

{ id: '8.11', t: 'Sujet blanc n° 2', h: `
<h4>Exercice 1 (5 points)</h4>
<p>Un service est relancé chaque jour, 7 jours sur 7. Chaque jour, il peut subir une panne avec la probabilité p = 0,2, indépendamment des autres jours.</p>
<div data-lab="calc" data-r="0.2753" data-tol="0.003"><p>1. Probabilité de subir exactement 2 pannes en une semaine.</p><div class="sol">B(7 ; 0,2) : C(7, 2) × 0,2² × 0,8⁵ = 21 × 0,04 × 0,32768 ≈ <b>0,2753</b>.</div></div>
<div data-lab="calc" data-r="0.7903" data-tol="0.004"><p>2. Probabilité d’au moins une panne dans la semaine.</p><div class="sol">1 − 0,8⁷ = 1 − 0,2097 = <b>0,7903</b>.</div></div>
<div data-lab="calc" data-r="0.1024" data-tol="0.001"><p>3. Probabilité que la première panne arrive le 4ᵉ jour.</p><div class="sol">Géométrique : 0,8³ × 0,2 = <b>0,1024</b>.</div></div>
<div data-lab="calc" data-r="0.0819" data-tol="0.001"><p>4. Probabilité que la 2ᵉ panne arrive le 5ᵉ jour.</p><div class="sol">Pascal : C(4, 1) × 0,2² × 0,8³ = 4 × 0,04 × 0,512 = <b>0,0819</b>.</div></div>
<h4>Exercice 2 (4 points)</h4>
<p>Cinq défaillances ont trois origines possibles : spécification (0,5), conception (0,3), codage (0,2).</p>
<div data-lab="calc" data-r="0.135" data-tol="0.002"><p>1. Probabilité d’avoir 2 fautes de spécification, 2 de conception et 1 de codage.</p><div class="sol">Multinomiale : [5!/(2! 2! 1!)] × 0,5² × 0,3² × 0,2 = 30 × 0,0045 = <b>0,135</b>.</div></div>
<div data-lab="calc" data-r="0.3125" data-tol="0.003"><p>2. Probabilité d’avoir exactement 3 fautes de spécification.</p><div class="sol">B(5 ; 0,5) : C(5, 3) × 0,5⁵ = 10 ÷ 32 = <b>0,3125</b>.</div></div>
<div data-lab="calc" data-r="1.5"><p>3. Nombre moyen de fautes de conception parmi les cinq.</p><div class="sol">E = n p = 5 × 0,3 = <b>1,5</b>.</div></div>
<h4>Exercice 3 (6 points)</h4>
<p>Un serveur tombe en panne selon une loi exponentielle de taux λ = 0,2 par mois.</p>
<div data-lab="calc" data-r="0.3024" data-tol="0.003"><p>1. Probabilité de panne entre le 2ᵉ et le 5ᵉ mois.</p><div class="sol">R(2) − R(5) = e<sup>−0,4</sup> − e<sup>−1</sup> = 0,6703 − 0,3679 = <b>0,3024</b>.</div></div>
<div data-lab="calc" data-r="0.2613" data-tol="0.003"><p>2. Probabilité de subir exactement 2 pannes en un an.</p><div class="sol">Poisson de paramètre 0,2 × 12 = 2,4 : e<sup>−2,4</sup> × 2,4²/2 = 0,0907 × 2,88 ≈ <b>0,2613</b>.</div></div>
<div data-lab="calc" data-r="0.5117" data-tol="0.005"><p>3. Deux serveurs identiques indépendants en parallèle. Fiabilité à 6 mois ?</p><div class="sol">r = e<sup>−1,2</sup> = 0,3012. Parallèle : 1 − (1 − 0,3012)² = 1 − 0,4883 = <b>0,5117</b>.</div></div>
<div data-lab="calc" data-r="10" data-u="mois"><p>4. Au bout de combien de mois, en moyenne, survient la 2ᵉ panne ?</p><div class="sol">Erlang : E(T₂) = n/λ = 2 ÷ 0,2 = <b>10 mois</b>.</div></div>
<h4>Exercice 4 (5 points)</h4>
<p>Refais sans aide le QCM de <a href="#/ch/8/cours/8.9">8.9</a>, puis écris de mémoire les quatre moyens de la SdF avec deux techniques pour chacun.</p>` }
],
glossaire: [
  ['Annales', '—', 'sujets des années précédentes ; sept devoirs de 2018 à 2025.'],
  ['Corrigé officiel', '—', 'corrigé rédigé par le professeur : disponible pour 2018, 2019, 2022, 2023.'],
  ['Sujet blanc', 'Mock exam', 'sujet d’entraînement construit sur le modèle des devoirs.']
],
formules: [
  ['Garantie', 'R(150) = 0,85 → λ = 0,001083 → R(100) ≈ 90 %', '25 retours sur 250 ; 225 survivantes.'],
  ['Trois fautes', '90/729 = 0,1235 · 80/243 = 0,3292', 'multinomiale puis binomiale.'],
  ['Liens', '28p²(1 − p)⁶ · 7p²(1 − p)⁶ · 1/14', ''],
  ['Logiciel 5 jours', '10p³(1 − p)² · 1 − (1 − p)⁵ · p(1 − p)² · 6p³(1 − p)²', 'binomiale, au moins un, géométrique, Pascal.'],
  ['Exponentielle 2018/2025', '0,24 · 0,9025 · 0,45', 'entre 1 et 2 ; plus de 200 h ; panne dans l’année.'],
  ['IoT 2025', '0,135 · 0,865 · 0,0116 · 1/3 · 0,1037', '']
],
resume: [
  'Refaire les sept devoirs couvre presque tous les exercices que le professeur a posés en sept ans.',
  'Exercices répétés : garantie (3 fois), trois types de fautes (3 fois), liens (2 fois), questions courtes d’exponentielle (2 fois), QCM de cours (3 fois).',
  'Quatre devoirs ont un corrigé officiel ; pour les trois autres les solutions sont les miennes.',
  'Le QCM de cours rapporte 6 à 8 points et ses réponses ne changent pas d’une année à l’autre.'
],
pieges: [
  'Regarder la solution avant d’avoir écrit sa propre réponse.',
  'Vérifier seulement le nombre final sans comparer la rédaction.',
  'Sauter le QCM de cours parce qu’il « suffit de le relire ».'
],
cartes: [
  ['Devoir 2018, ex. 1 : P(S), P(A | S), P(B | S) ?', '0,89 ; 0,36 ; 0,64.'],
  ['Devoir 2018, ex. 4 : série et parallèle (λ = 0,00011, t = 3000 h) ?', 'e^(−0,66) = 0,517 ; 2 × 0,7189 − 0,5169 = 0,921.'],
  ['Devoir 2019, ex. 1 : P(F) et les trois probabilités sachant « non fiable » ?', '0,78 ; 0,091 ; 0,682 ; 0,227.'],
  ['Devoir 2019, ex. 3 : série, parallèle, 2 sur 3 (λ = 10⁻⁴, 3000 h) ?', '0,55 ; 0,93 ; 0,83.'],
  ['Devoir 2022, ex. 1 : P(A | B) ?', 'P(A ∪ B) = 0,3 ; P(A ∩ B) = 0,15 ; P(A | B) = 0,60.'],
  ['Devoir 2022, radar : P(E), P(E^C), probabilité de faillir ?', '0,1445 ; 0,8555 ; 0,0005 + 0,095 = 0,0955.'],
  ['Devoir 2023, ex. 1 : P(B) ?', '(0,069 − 0,02)/0,98 = 0,05.'],
  ['Devoir 2024, ex. 1 : les cinq réponses ?', '0,25 ; 0,05 ; non indépendants ; 0,20 ; 0,5.'],
  ['Devoir 2025, ex. 2 : les quatre réponses ?', '0,2387 ; 36e⁻⁶ ≈ 0,089 ; 0,9025 ; ≈ 0,45.'],
  ['Devoir 2025, ex. 3 partie 1 : les quatre probabilités ?', '0,135 ; 0,865 ; 0,0116 ; 1/3.'],
  ['Devoir 2025, ex. 3 partie 2 : le système déclare compromis ?', '0,1 × 0,972 + 0,9 × 0,00725 = 0,1037.'],
  ['Devoir 2021, Weibull β = 1, γ = 0, R(2000) = 0,8 : η ?', '−2000/ln(0,8) ≈ 8963 h.']
],
quiz: [
  { q: 'Chaîne A : 40 %, 20 % de défauts. Chaîne B : 60 %, 5 % de défauts. P(sans défaut) ?', o: ['0,89', '0,11', '0,875', '0,57'], a: 0, e: '0,32 + 0,57.' },
  { q: 'R(150) = 0,85 (exponentielle). Combien de retours sur 250 pièces pour une garantie de 100 h, selon le corrigé ?', o: ['25', '37', '225', '15'], a: 0, e: 'R(100) ≈ 90 %.' },
  { q: 'λ = 0,00011, t = 3000 h, deux composants en parallèle. Fiabilité ?', o: ['0,92', '0,52', '0,72', '0,83'], a: 0, e: '2 × 0,7189 − 0,5169.' },
  { q: 'Pièces haute, ordinaire, médiocre (40, 50, 10 %) de fiabilités 0,95 ; 0,7 ; 0,5. P(ordinaire | non fiable) ?', o: ['0,68', '0,09', '0,23', '0,50'], a: 0, e: '0,15 ÷ 0,22.' },
  { q: 'P(ni A ni B) = 0,7 ; P(A) = 0,2 ; P(B) = 0,25. P(A | B) ?', o: ['0,60', '0,15', '0,75', '0,30'], a: 0, e: '0,15 ÷ 0,25.' },
  { q: 'Radar : P(avion) = 0,05 ; détection 0,99 ; fausse alarme 0,1. P(pas de signal) ?', o: ['0,8555', '0,1445', '0,855', '0,95'], a: 0, e: '0,0005 + 0,855.' },
  { q: 'Trois types de fautes équiprobables, n = 6. P(2, 2, 2) ?', o: ['0,1235', '0,3292', '0,0014', '0,5'], a: 0, e: '90/729.' },
  { q: 'Logiciel, 5 jours, panne p par jour. 3ᵉ panne le 5ᵉ jour ?', o: ['6 p³(1 − p)²', '10 p³(1 − p)²', 'p³(1 − p)²', '4 p³(1 − p)²'], a: 0, e: 'Pascal, C(4, 2) = 6.' },
  { q: 'Huit liens : sachant six en panne, P(A communique avec B) ?', o: ['1/14', '1/28', '1/4', '2/8'], a: 0, e: 'Deux paires utiles sur 28.' },
  { q: 'Serveur, λ = 0,5 par mois. P(3 pannes en un an) ?', o: ['36 e⁻⁶ ≈ 0,089', 'e⁻⁶ ≈ 0,0025', '0,24', '0,5'], a: 0, e: 'Poisson de paramètre 6.' },
  { q: 'Nœuds IoT : P(déclaré compromis) ?', o: ['0,135', '0,09', '0,045', '0,865'], a: 0, e: '0,09 + 0,045.' },
  { q: 'Nœuds IoT, vote 2 sur 3 : P(le système déclare compromis) ?', o: ['0,1037', '0,135', '0,972', '0,00725'], a: 0, e: '0,1 × 0,972 + 0,9 × 0,00725.' },
  { q: 'Tₙ = X₁ + … + Xₙ, exponentielles de paramètre λ. Loi de Tₙ ?', o: ['Erlang (n, λ)', 'Exponentielle (nλ)', 'Poisson (nλ)', 'Géométrique'], a: 0, e: 'Devoir 2024.' },
  { q: 'Quels items du QCM de cours ont deux ou trois cases à cocher ?', o: ['La SdF d’un système est…', 'Défaillance incohérente', 'La cause directe d’une erreur', 'Défaillance durable'], a: [0, 1], e: 'Trois cases pour la SdF, deux pour la défaillance incohérente.' },
  { q: 'Quelles techniques servent la tolérance aux fautes dans la copie notée de 2023 ?', o: ['Gestion des exceptions', 'Recouvrement', 'Lecture croisée', 'Calcul du MTTR'], a: [0, 1], e: 'Lecture croisée : évitement. MTTR : prévision.' }
],
exos: [
  { t: 'Devoir 2025 en entier, corrigé rédigé', n: 'devoir · 20 points', e: `<p>Traite le sujet de <a href="#/ch/8/cours/8.8">8.8</a> en 1 h 30, puis compare à cette rédaction.</p>`,
    s: `<p><b>Exercice 1.</b> (X₁, X₂, X₃) suit une loi multinomiale : P = [n!/(k₁! k₂! k₃!)] p₁<sup>k₁</sup> p₂<sup>k₂</sup> p₃<sup>k₃</sup>. A.N. : 90 × (1/3)⁶ = 10/81 ≈ 0,1235. X₁ suit B(n, p₁) : P(X₁ = m) = C(n, m) p₁<sup>m</sup>(1 − p₁)<sup>n − m</sup>. A.N. : 15 × (1/3)²(2/3)⁴ = 80/243 ≈ 0,3292.</p>
<p><b>Exercice 2.</b> 1) P(1 ≤ T ≤ 2) = R(1) − R(2) = e<sup>−0,5</sup> − e<sup>−1</sup> ≈ 0,24. 2) N suit Poisson(0,5 × 12 = 6) : P(N = 3) = 36 e<sup>−6</sup> ≈ 0,089. 3) F(100) = 0,05 ⇒ R(100) = 0,95 ⇒ R(200) = 0,95² ≈ 0,90. 4) D = (365 − 52) × 24 = 7512 h ; 1 − e<sup>−0,601</sup> ≈ 0,45.</p>
<p><b>Exercice 3.</b> C : compromis ; S : sain ; D : déclaré compromis. P(C) = 0,1 ; P(D | C) = 0,9 ; P(D | S) = 0,05. Feuilles : 0,09 ; 0,01 ; 0,045 ; 0,855. P(D) = 0,135 ; P(D<sup>C</sup>) = 0,865 ; P(C | D<sup>C</sup>) = 0,01/0,865 ≈ 0,0116 ; P(S | D) = 0,045/0,135 = 1/3. Partie 2 : conditionnellement à l’état du nœud, les techniques sont indépendantes. P(D₃ | D₁ ∩ D₂) = (0,1 × 0,9³ + 0,9 × 0,05³)/(0,1 × 0,9² + 0,9 × 0,05²) ≈ 0,877. Vote : 0,1 × (3 × 0,81 × 0,1 + 0,729) + 0,9 × (3 × 0,0025 × 0,95 + 0,000125) = 0,0972 + 0,0065 = 0,1037 ; « sain » : 0,8963.</p>
<p><b>Exercice 4.</b> Définition, 6 attributs, 4 moyens, 3 entraves : voir <a href="#/ch/2/cours/2.5">2.5</a>.</p>
<p><small>Corrigé rédigé par moi ; pas de corrigé officiel pour 2025.</small></p>` },
  { t: 'Sujet blanc n° 1, corrigé rédigé', n: 'entraînement', e: `<p>Traite le sujet de <a href="#/ch/8/cours/8.10">8.10</a> sur papier, puis compare.</p>`,
    s: `<p><b>Exercice 1.</b> P(A ∪ B) = 1 − 0,80 = 0,20. P(A ∩ B) = 0,15 + 0,10 − 0,20 = 0,05. Un seul : 0,20 − 0,05 = 0,15. P(A | B) = 0,05/0,10 = 0,5. Non indépendants : 0,015 ≠ 0,05.</p>
<p><b>Exercice 2.</b> λ = −ln(0,9)/200 = 0,000527. R(100) = e<sup>−0,0527</sup> = 0,9487, F(100) = 0,0513 ; lot = 40/0,0513 ≈ 780. P(T &gt; 500 | T &gt; 300) = R(200) = 0,9. 500 × 0,9 = 450.</p>
<p><b>Exercice 3.</b> A : attaque ; L : alerte. P(L) = 0,95 × 0,02 + 0,03 × 0,98 = 0,0484. P(A | L) = 0,019/0,0484 ≈ 0,393. Erreur : 0,001 + 0,0294 = 0,0304. Vote : 0,02 × 0,99275 + 0,98 × 0,002646 ≈ 0,0224.</p>
<p><b>Exercice 4.</b> Faute : cause adjugée ou supposée d’une erreur. Erreur : partie de l’état susceptible d’entraîner une défaillance. Défaillance : service délivré non conforme à la spécification. Chaîne : … → défaillance → faute → erreur → défaillance → … Gravité : bénigne, indicative, critique, catastrophique. Bug : faute de développement non malveillante, délibérée ou accidentelle. Déni de service : faute opérationnelle malveillante et délibérée.</p>` }
]
});

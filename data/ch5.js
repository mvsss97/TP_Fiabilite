REV.chapitres.push({
n: 5, titre: 'Cours 3 (A) — Probabilités : événements, conditionnelle, Bayes', en: 'Rappels de la théorie des probabilités, repris depuis le début',
objectifs: [
  'décrire une expérience aléatoire avec <b>Ω</b> et des <b>événements</b> ;',
  'traduire « et », « ou », « non », « au moins un », « aucun » en opérations sur les événements ;',
  'utiliser la formule de l’<b>union</b> (Poincaré) et retrouver n’importe quelle zone ;',
  'calculer une <b>probabilité conditionnelle</b> et ne pas la confondre avec son inverse ;',
  'tester l’<b>indépendance</b> et l’utiliser pour multiplier ;',
  'dessiner un <b>arbre</b>, appliquer les <b>probabilités totales</b> puis <b>Bayes</b> ;',
  'rédiger ces calculs comme dans les corrigés du professeur.'
],
sections: [
{ id: '5.1', t: 'Le point de départ : expérience, univers, événement', h: `
<p>Tu as dit avoir des lacunes en probabilités : ce chapitre repart de zéro. Tout le devoir repose sur <b>quatre règles</b> (contraire, union, conditionnelle, indépendance). Elles sont introduites une par une, chacune suivie d’exercices où tu tapes ta réponse.</p>
<div class="def">Une <b>expérience aléatoire</b> est une expérience dont on ne peut pas prévoir le résultat avec certitude. L’ensemble de <b>tous les résultats possibles</b> s’appelle l’<b>univers</b> (ou espace des observables), noté <b>Ω</b>. Un <b>événement</b> est une partie de Ω : un ensemble de résultats qui nous intéresse.</div>
<div class="ex">Lancer un dé : Ω = {1, 2, 3, 4, 5, 6}. L’événement A « obtenir un nombre pair » est la partie {2, 4, 6}. Chaque résultat seul, comme {3}, est un <b>événement élémentaire</b>.</div>
<div class="def">La <b>probabilité</b> d’un événement mesure son incertitude sur une échelle de <b>0</b> (impossible) à <b>1</b> (certain).</div>
<h4>Le cas le plus simple : résultats équiprobables</h4>
<div class="f">P(A) = [[nombre de cas favorables//nombre de cas possibles]] = [[Card(A)//Card(Ω)]]<small>Valable seulement si tous les résultats ont la <b>même chance</b> (dé non truqué, tirage au hasard).</small></div>
<div class="ex">Dé : P(pair) = 3/6 = 0,5. Deux dés : Ω contient 6 × 6 = 36 couples. P(obtenir 1 aux deux dés) = 1/36. P(obtenir 1 au premier dé) = 6/36 = 1/6.</div>
<h4>Fréquence et probabilité</h4>
<p>On lance 100 fois un dé, il tombe 20 fois sur 1. La <b>fréquence</b> observée est 20/100 = 0,2. La <b>probabilité</b> est 1/6 ≈ 0,167. La <b>loi des grands nombres</b> dit que la fréquence se rapproche de la probabilité quand le nombre d’essais devient très grand.</p>
<p>C’est ce qui permet de passer d’une probabilité à un <b>nombre attendu</b> : si une pièce a 10 % de chances de tomber en panne, sur 250 pièces on en attend 250 × 0,10 = 25. Le professeur utilise ce passage dans l’exercice de la garantie.</p>
<div data-lab="calc" data-r="1/6"><p>On lance deux dés. Probabilité que la <b>somme</b> fasse 7 ?</p>
<div class="ind">Compte les couples (premier dé, deuxième dé) qui donnent 7, parmi 36.</div>
<div class="sol">Couples favorables : (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), soit 6. P = 6/36 = 1/6 ≈ <b>0,167</b>.</div></div>
<div data-lab="calc" data-r="30" data-u="pièces"><p>Une pièce a une probabilité 0,12 d’être défectueuse. Sur un lot de 250 pièces, combien de défectueuses attend-on ?</p>
<div class="sol">250 × 0,12 = <b>30</b> pièces.</div></div>
<div class="plus">Le cours distingue deux lectures de la probabilité : la probabilité de l’<b>aléatoire</b> (un phénomène physique, comme le dé) et la probabilité-<b>incertitude</b> (notre connaissance incomplète, lecture bayésienne). Il note aussi qu’on peut parler d’une probabilité de défaillance de 10<sup>−9</sup> sans faire un milliard d’essais. Les calculs sont les mêmes dans les deux lectures.</div>` },

{ id: '5.2', t: 'Traduire le français en événements', h: `
<p>La moitié de la difficulté d’un énoncé est de le traduire. Voici le dictionnaire du cours.</p>
<div class="tw"><table>
<thead><tr><th>En français</th><th>Notation</th><th>Nom</th></tr></thead>
<tbody>
<tr><td>A <b>et</b> B se réalisent tous les deux</td><td class="c">A ∩ B</td><td>intersection</td></tr>
<tr><td>A <b>ou</b> B (au moins l’un des deux, peut-être les deux)</td><td class="c">A ∪ B</td><td>union</td></tr>
<tr><td>A <b>ne</b> se réalise <b>pas</b></td><td class="c">A<sup>C</sup></td><td>contraire, complémentaire</td></tr>
<tr><td>A et B ne peuvent pas arriver ensemble</td><td class="c">A ∩ B = ∅</td><td>incompatibles, disjoints</td></tr>
<tr><td>événement certain / impossible</td><td class="c">Ω / ∅</td><td></td></tr>
<tr><td><b>ni</b> A <b>ni</b> B (aucun des deux)</td><td class="c">A<sup>C</sup> ∩ B<sup>C</sup> = (A ∪ B)<sup>C</sup></td><td>contraire de l’union</td></tr>
</tbody></table></div>
<div class="warn">Le « ou » des probabilités est <b>inclusif</b> : A ∪ B contient le cas où les deux se produisent.</div>
<h4>Les règles de base (axiomes de Kolmogorov et conséquences)</h4>
<div class="f">0 ≤ P(A) ≤ 1 &nbsp;·&nbsp; P(Ω) = 1 &nbsp;·&nbsp; P(∅) = 0<small>Si A et B sont <b>incompatibles</b> : P(A ∪ B) = P(A) + P(B). Si A est inclus dans B : P(A) ≤ P(B).</small></div>
<div class="f">P(A<sup>C</sup>) = 1 − P(A)<small><b>Règle 1, le contraire.</b> Ce qui n’est pas dans A est dans A<sup>C</sup>, et les deux ensemble font tout l’univers.</small></div>
<div class="tip"><b>« Au moins un » = 1 − « aucun ».</b> C’est le réflexe le plus rentable du devoir : calculer directement « au moins une panne » est long, calculer « aucune panne » est immédiat.</div>
<div class="ill">Le professeur l’utilise en 2022 : « dans 70 % du temps, aucune des deux pannes ne se produit », donc P(A ∪ B) = 1 − 0,70 = 0,30.</div>
<div data-lab="calc" data-r="0.25"><p>La probabilité qu’un composant ne présente aucun des deux défauts A et B est 0,75. Probabilité qu’il présente au moins un des deux ?</p>
<div class="sol">« Au moins un » est le contraire de « aucun » : P(A ∪ B) = 1 − 0,75 = <b>0,25</b>. C’est la question 1 du devoir 2024.</div></div>
<div data-lab="calc" data-r="11/36"><p>On lance un dé deux fois. Probabilité d’obtenir <b>au moins un 6</b> ?</p>
<div class="ind">Calcule d’abord la probabilité de n’obtenir aucun 6.</div>
<div class="sol">Aucun 6 : (5/6) × (5/6) = 25/36. Au moins un 6 : 1 − 25/36 = 11/36 ≈ <b>0,306</b>.</div></div>
<div data-lab="relier"><p>Traduis chaque phrase. A : « le défaut A est présent ». B : « le défaut B est présent ».</p>
<dl><dt>Le composant a les deux défauts</dt><dd>A ∩ B</dd>
<dt>Le composant a au moins un défaut</dt><dd>A ∪ B</dd>
<dt>Le composant n’a aucun défaut</dt><dd>contraire de (A ∪ B)</dd>
<dt>Le composant a le défaut A mais pas B</dt><dd>A ∩ contraire de B</dd>
<dt>Le composant n’a pas le défaut A</dt><dd>contraire de A</dd></dl></div>
<div class="plus"><b>Tribu.</b> Quand Ω est fini, tout sous-ensemble est un événement. Quand Ω est infini (une durée de vie, par exemple), on se limite à une famille d’événements appelée <b>tribu</b>, stable par complémentaire et par union dénombrable ; sur les réels on prend la tribu <b>borélienne</b>, engendrée par les intervalles. Le triplet (Ω, tribu, P) est un <b>espace de probabilité</b>. Aucun devoir n’a posé de question là-dessus.</div>` },

{ id: '5.3', t: 'Règle 2 — l’union (théorème de Poincaré)', h: `
<div class="f">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)<small><b>Pourquoi on retire P(A ∩ B) ?</b> En additionnant P(A) et P(B), les cas où A et B arrivent ensemble sont comptés deux fois. On les retire une fois.</small></div>
<p>Avec deux événements, l’univers se découpe en <b>quatre zones</b> qui ne se chevauchent pas et dont les probabilités font 1 :</p>
<div class="tw"><table>
<thead><tr><th>Zone</th><th>Signification</th><th>Calcul</th></tr></thead>
<tbody>
<tr><td>A et B</td><td>les deux</td><td>P(A ∩ B)</td></tr>
<tr><td>A seul</td><td>A sans B</td><td>P(A) − P(A ∩ B)</td></tr>
<tr><td>B seul</td><td>B sans A</td><td>P(B) − P(A ∩ B)</td></tr>
<tr><td>ni A ni B</td><td>aucun</td><td>1 − P(A ∪ B)</td></tr>
</tbody></table></div>
<p>Deux résultats utiles en découlent :</p>
<ul>
<li><b>un seul des deux</b> = A seul + B seul = P(A) + P(B) − 2 P(A ∩ B) = P(A ∪ B) − P(A ∩ B) ;</li>
<li>la formule se lit dans les deux sens : si tu connais l’union, tu en tires l’intersection : <b>P(A ∩ B) = P(A) + P(B) − P(A ∪ B)</b>.</li>
</ul>
<div class="meth"><b>L’exercice type « deux événements » (2022, 2024).</b>
<ol><li>On te donne P(A), P(B) et P(aucun).</li>
<li>P(A ∪ B) = 1 − P(aucun).</li>
<li>P(A ∩ B) = P(A) + P(B) − P(A ∪ B).</li>
<li>Tout le reste suit : un seul, conditionnelle, indépendance.</li></ol></div>
<div class="exam"><b>Devoir 2024, exercice 1.</b> P(A) = 0,10 ; P(B) = 0,20 ; P(aucun défaut) = 0,75.
<ol><li>Au moins un défaut : 1 − 0,75 = <b>0,25</b>.</li>
<li>Les deux défauts : 0,10 + 0,20 − 0,25 = <b>0,05</b>.</li>
<li>Indépendants ? P(A) × P(B) = 0,02 ≠ 0,05 : <b>non</b>.</li>
<li>Un seul défaut : 0,25 − 0,05 = <b>0,20</b>.</li>
<li>B sachant A : 0,05 ÷ 0,10 = <b>0,5</b> (règle 3, section suivante).</li></ol></div>
<div data-lab="deux"></div>
<div data-lab="calc" data-r="0.7"><p>P(A) = 0,3 ; P(B) = 0,5 ; P(A ∩ B) = 0,1. Calcule P(A ∪ B).</p>
<div class="sol">P(A ∪ B) = 0,3 + 0,5 − 0,1 = <b>0,7</b>.</div></div>
<div data-lab="calc" data-r="0.15"><p>Un système subit deux types de panne. La panne A se produit 20 % du temps, la panne B 25 % du temps, et 70 % du temps aucune ne se produit. Calcule P(A ∩ B).</p>
<div class="ind">Passe par P(A ∪ B) = 1 − 0,70.</div>
<div class="sol">P(A ∪ B) = 1 − 0,70 = 0,30. P(A ∩ B) = 0,20 + 0,25 − 0,30 = <b>0,15</b>. C’est le début de l’exercice 1 du devoir 2022.</div></div>
<div data-lab="calc" data-r="0.6"><p>P(A) = 0,3 ; P(B) = 0,5 ; P(A ∩ B) = 0,1. Probabilité qu’<b>un seul</b> des deux événements se réalise ?</p>
<div class="sol">A seul : 0,3 − 0,1 = 0,2. B seul : 0,5 − 0,1 = 0,4. Total : <b>0,6</b>. Vérification : P(A ∪ B) − P(A ∩ B) = 0,7 − 0,1 = 0,6.</div></div>
<div data-lab="calc" data-r="0.12"><p>P(A) = 0,4 ; P(B) = 0,35 ; P(A ∪ B) = 0,63. Calcule P(A ∩ B).</p>
<div class="sol">P(A ∩ B) = 0,4 + 0,35 − 0,63 = <b>0,12</b>.</div></div>` },

{ id: '5.4', t: 'Règle 3 — la probabilité conditionnelle', h: `
<div class="def"><b>P(A | B)</b> se lit « probabilité de A <b>sachant</b> B » : la probabilité que A se réalise quand on <b>sait déjà</b> que B s’est réalisé. Le professeur l’écrit aussi <b>P(A/B)</b>.</div>
<div class="f">P(A | B) = [[P(A ∩ B)//P(B)]]<small>Savoir que B est réalisé <b>réduit l’univers à B</b>. On regarde quelle part de B est aussi dans A.</small></div>
<div class="ill">Dans une classe de 30 élèves, 12 font du sport, et parmi eux 8 lisent le journal. On tire un élève et on apprend qu’il fait du sport. Probabilité qu’il lise le journal ? L’univers se réduit aux 12 sportifs : 8/12 = 2/3. Avec la formule : (8/30) ÷ (12/30) = 2/3.</div>
<p>En retournant la formule, on obtient la <b>règle du produit</b>, celle qui sert sur les branches d’un arbre :</p>
<div class="f">P(A ∩ B) = P(A | B) × P(B) = P(B | A) × P(A)</div>
<div class="warn"><b>P(A | B) n’est pas P(B | A).</b> « Probabilité que le test soit positif sachant qu’on est malade » (0,95) n’est pas « probabilité d’être malade sachant que le test est positif » (0,32 dans le TD 2). L’énoncé donne presque toujours la première, la question demande la seconde. Le dénominateur est toujours la probabilité de ce qui est <b>après</b> « sachant ».</div>
<div class="meth">Pour repérer une conditionnelle dans un énoncé : « <b>sachant que</b> », « <b>parmi les</b> », « <b>si</b> le nœud est compromis », « un jour la panne B <b>s’est produite</b> », « 20 % <b>des composants de la chaîne A</b> ». Dans ce dernier cas, 20 % est P(défaut | A), pas P(défaut ∩ A).</div>
<div class="exam"><b>Devoir 2022, exercice 1 (4 points).</b> « Un jour la panne B s’est produite. Probabilité que A se soit produite aussi ? » On a trouvé P(A ∩ B) = 0,15, donc P(A | B) = 0,15 ÷ 0,25 = <b>0,60</b>.</div>
<div data-lab="calc" data-r="0.3"><p>P(A ∩ B) = 0,12 et P(B) = 0,4. Calcule P(A | B).</p>
<div class="sol">P(A | B) = 0,12 ÷ 0,4 = <b>0,3</b>.</div></div>
<div data-lab="calc" data-r="0.5"><p>Devoir 2024 : P(A) = 0,10 ; P(B) = 0,20 ; P(A ∩ B) = 0,05. Probabilité qu’un composant ait le défaut B <b>sachant</b> qu’il a le défaut A ?</p>
<div class="ind">Ce qui est après « sachant » va au dénominateur.</div>
<div class="sol">P(B | A) = P(A ∩ B) ÷ P(A) = 0,05 ÷ 0,10 = <b>0,5</b>. (Et P(A | B) = 0,05 ÷ 0,20 = 0,25 : ce n’est pas la même chose.)</div></div>
<div data-lab="calc" data-r="0.18"><p>20 % des composants viennent du fournisseur B. Parmi ceux de B, 90 % sont conformes. Probabilité qu’un composant pris au hasard vienne de B <b>et</b> soit conforme ?</p>
<div class="sol">Règle du produit : P(B ∩ C) = P(C | B) × P(B) = 0,9 × 0,2 = <b>0,18</b>.</div></div>
<div data-lab="calc" data-r="1/3"><p>On tire une carte d’un jeu de 52. On sait que c’est une figure (valet, dame ou roi). Probabilité que ce soit un roi ?</p>
<div class="sol">L’univers se réduit aux 12 figures, dont 4 rois : 4/12 = 1/3 ≈ <b>0,333</b>.</div></div>
<div data-lab="choix" data-a="1"><p>« Si un avion est présent, le radar le détecte avec une probabilité 0,99. » Ce 0,99 est :</p>
<ul><li>P(avion | détection)</li><li>P(détection | avion)</li><li>P(avion ∩ détection)</li><li>P(détection)</li></ul>
<div class="sol">« Si un avion est présent » est la condition : c’est P(détection | avion).</div></div>` },

{ id: '5.5', t: 'Règle 4 — l’indépendance', h: `
<div class="def">A et B sont <b>indépendants</b> lorsque savoir que l’un s’est réalisé <b>ne change pas</b> la probabilité de l’autre : P(A | B) = P(A). Cela équivaut à :</div>
<div class="f">A et B indépendants &nbsp;⇔&nbsp; P(A ∩ B) = P(A) × P(B)</div>
<p>Elle sert dans deux sens :</p>
<ul>
<li><b>pour vérifier</b> (« les événements sont-ils indépendants ? ») : on compare P(A ∩ B) au produit P(A) × P(B) ;</li>
<li><b>pour calculer</b>, quand l’énoncé <b>dit</b> que les événements sont indépendants : on a le droit de multiplier.</li>
</ul>
<div class="warn"><b>Indépendants ≠ incompatibles.</b> Incompatibles : ils ne peuvent pas arriver ensemble, P(A ∩ B) = 0. Indépendants : P(A ∩ B) = P(A) × P(B). Deux événements incompatibles de probabilités non nulles sont au contraire très dépendants : si l’un arrive, l’autre est impossible.</div>
<p>Si A et B sont indépendants, leurs contraires le sont aussi. Et pour plusieurs événements indépendants, la probabilité qu’ils se réalisent <b>tous</b> est le produit de leurs probabilités : c’est la base des montages en série et en parallèle (<a href="#/ch/7/cours/7.7">7.7</a>) et de la loi binomiale (<a href="#/ch/6/cours/6.3">6.3</a>).</p>
<div class="exam"><b>Devoir 2023, exercice 1 (2 points).</b> A et B indépendants ; P(A) = 0,02 ; P(A ∪ B) = 0,069. Trouver P(B).
<p>P(A ∪ B) = P(A) + P(B) − P(A) × P(B) = P(A) + P(B)(1 − P(A)).</p>
<p>Donc P(B) = [[P(A ∪ B) − P(A)//1 − P(A)]] = [[0,069 − 0,02//0,98]] = [[0,049//0,98]] = <b>0,05</b>.</p></div>
<div data-lab="calc" data-r="0.02"><p>P(A) = 0,10 et P(B) = 0,20. Si A et B étaient indépendants, que vaudrait P(A ∩ B) ?</p>
<div class="sol">0,10 × 0,20 = <b>0,02</b>. Dans le devoir 2024, P(A ∩ B) vaut 0,05 : comme 0,05 ≠ 0,02, les événements <b>ne sont pas</b> indépendants.</div></div>
<div data-lab="calc" data-r="0.19"><p>Deux composants tombent en panne indépendamment, chacun avec une probabilité 0,1. Probabilité qu’<b>au moins un</b> tombe en panne ?</p>
<div class="ind">Soit par l’union, soit par « 1 − aucun ».</div>
<div class="sol">Aucun en panne : 0,9 × 0,9 = 0,81. Au moins un : 1 − 0,81 = <b>0,19</b>. Par l’union : 0,1 + 0,1 − 0,1 × 0,1 = 0,19.</div></div>
<div data-lab="calc" data-r="0.2"><p>A et B indépendants ; P(A) = 0,5 ; P(A ∪ B) = 0,6. Calcule P(B).</p>
<div class="sol">P(B) = (0,6 − 0,5) ÷ (1 − 0,5) = 0,1 ÷ 0,5 = <b>0,2</b>. Vérification : 0,5 + 0,2 − 0,5 × 0,2 = 0,6.</div></div>
<div data-lab="choix" data-a="2"><p>P(A) = 0,4 ; P(B) = 0,5 ; P(A ∩ B) = 0,2. A et B sont :</p>
<ul><li>incompatibles</li><li>dépendants</li><li>indépendants</li><li>contraires</li></ul>
<div class="sol">P(A) × P(B) = 0,2 = P(A ∩ B) : indépendants. Ils ne sont pas incompatibles puisque P(A ∩ B) n’est pas nulle.</div></div>` },

{ id: '5.6', t: 'L’arbre, les probabilités totales et Bayes', h: `
<p>C’est l’exercice le plus fréquent (2018, 2019, 2022, 2025). Il a toujours la même structure en deux étages : une <b>cause</b> que l’on ne voit pas (d’où vient la pièce, le nœud est-il compromis), puis un <b>résultat observé</b> (défaut ou non, alerte ou non).</p>
<div class="def">Des événements A₁, A₂, …, Aₙ forment une <b>partition</b> de Ω s’ils sont deux à deux incompatibles et recouvrent tous les cas : il s’en réalise toujours un, et un seul. Exemple : « chaîne A » et « chaîne B ».</div>
<div class="f">P(B) = P(B | A₁) P(A₁) + P(B | A₂) P(A₂) + … + P(B | Aₙ) P(Aₙ)<small><b>Formule des probabilités totales.</b> On découpe B selon la cause et on additionne les morceaux : P(B) = P(B ∩ A₁) + … + P(B ∩ Aₙ).</small></div>
<div class="f">P(Aᵢ | B) = [[P(B | Aᵢ) × P(Aᵢ)//P(B)]]<small><b>Formule de Bayes.</b> Elle retourne la conditionnelle : de « résultat sachant cause » (donné) vers « cause sachant résultat » (demandé). Le numérateur est une feuille de l’arbre, le dénominateur est la somme des feuilles du même résultat.</small></div>
<div class="meth"><ol>
<li><b>Nomme</b> les événements : les causes (A, B) et le résultat (S). Écris les données en notation.</li>
<li><b>Dessine l’arbre</b> : premier étage, les causes avec leurs probabilités (somme 1). Deuxième étage, sous chaque cause, le résultat et son contraire (somme 1 sous chaque nœud).</li>
<li><b>Multiplie le long de chaque chemin</b> pour obtenir les feuilles : P(S ∩ A) = P(S | A) × P(A). Les feuilles font 1 au total.</li>
<li><b>Probabilités totales</b> : additionne les feuilles qui portent le résultat voulu.</li>
<li><b>Bayes</b> : divise la bonne feuille par ce total.</li>
</ol></div>
<div class="exam"><b>Devoir 2018, exercice 1 (5 points), rédigé comme le corrigé.</b> La chaîne A produit 40 % des composants, dont 20 % ont un défaut ; la chaîne B produit le reste, dont 5 % ont un défaut. S : « le composant est sans défaut ».
<p><b>Données</b> : P(A) = 0,4 ; P(B) = 0,6 ; P(S | A) = 0,8 ; P(S | B) = 0,95.</p>
<div class="tw"><table><thead><tr><th>Chemin</th><th>Produit</th><th class="c">Feuille</th></tr></thead><tbody>
<tr><td>A puis S</td><td>P(S | A) × P(A) = 0,8 × 0,4</td><td class="c">0,32</td></tr>
<tr><td>A puis S<sup>C</sup></td><td>0,2 × 0,4</td><td class="c">0,08</td></tr>
<tr><td>B puis S</td><td>P(S | B) × P(B) = 0,95 × 0,6</td><td class="c">0,57</td></tr>
<tr><td>B puis S<sup>C</sup></td><td>0,05 × 0,6</td><td class="c">0,03</td></tr>
</tbody></table></div>
<p><b>Q2 (1,5 point).</b> P(S) = P(S ∩ A) + P(S ∩ B) = 0,32 + 0,57 = <b>0,89</b>.</p>
<p><b>Q3 (1 point).</b> P(A | S) = P(S ∩ A) ÷ P(S) = 0,32 ÷ 0,89 ≈ <b>0,36</b>.</p>
<p><b>Q4 (1 point).</b> P(B | S) = 0,57 ÷ 0,89 ≈ <b>0,64</b>. Vérification : 0,36 + 0,64 = 1.</p></div>
<div data-lab="arbre"></div>
<div data-lab="calc" data-r="0.135"><p><b>Devoir 2025.</b> 90 % des nœuds sont sains. Un nœud compromis est déclaré compromis avec probabilité 0,9 ; un nœud sain est déclaré compromis avec probabilité 0,05. Probabilité que la technique déclare un nœud compromis ?</p>
<div class="ind">Deux chemins mènent à « déclaré compromis » : compromis puis déclaré, sain puis déclaré.</div>
<div class="sol">C : compromis, S : sain, D : déclaré compromis. P(C) = 0,1 ; P(S) = 0,9 ; P(D | C) = 0,9 ; P(D | S) = 0,05.<br>P(D) = 0,9 × 0,1 + 0,05 × 0,9 = 0,09 + 0,045 = <b>0,135</b>.</div></div>
<div data-lab="calc" data-r="1/3"><p>Même situation. Probabilité qu’un nœud <b>déclaré compromis</b> soit en réalité <b>sain</b> ?</p>
<div class="sol">Bayes : P(S | D) = P(D ∩ S) ÷ P(D) = 0,045 ÷ 0,135 = 1/3 ≈ <b>0,333</b>. Une alerte sur trois est une fausse alarme.</div></div>
<div data-lab="calc" data-r="0.01156" data-tol="0.0004"><p>Même situation. Probabilité qu’un nœud <b>déclaré sain</b> soit en réalité <b>compromis</b> ?</p>
<div class="ind">P(déclaré sain) = 1 − 0,135. La feuille « compromis et déclaré sain » vaut 0,1 × 0,1.</div>
<div class="sol">P(D<sup>C</sup>) = 1 − 0,135 = 0,865. P(C ∩ D<sup>C</sup>) = 0,1 × 0,1 = 0,01. P(C | D<sup>C</sup>) = 0,01 ÷ 0,865 ≈ <b>0,0116</b>.</div></div>
<div data-lab="calc" data-r="0.323" data-tol="0.004"><p><b>TD 2, exercice 2.</b> Un test détecte un virus avec probabilité 0,95 quand il est présent, et donne un faux positif pour 1 % des personnes saines. 0,5 % de la population est porteuse. Probabilité d’avoir le virus sachant que le test est positif ?</p>
<div class="sol">P(V) = 0,005 ; P(T | V) = 0,95 ; P(T | V<sup>C</sup>) = 0,01.<br>P(T) = 0,95 × 0,005 + 0,01 × 0,995 = 0,00475 + 0,00995 = 0,0147.<br>P(V | T) = 0,00475 ÷ 0,0147 ≈ <b>0,323</b>.<br>Conclusion du corrigé : un test positif est faux deux fois sur trois, parce que les personnes saines sont 199 fois plus nombreuses que les malades. Il faut réduire le taux de faux positifs.</div></div>` },

{ id: '5.7', t: 'Bayes avec trois causes, et l’interprétation', h: `
<p>Rien ne change avec trois branches au premier étage : l’arbre a six feuilles et les probabilités totales additionnent trois termes.</p>
<div class="exam"><b>Devoir 2019, exercice 1 (4 points).</b> Un appareil est monté avec des pièces de haute qualité (40 % des cas), ordinaires (50 %) ou médiocres (10 %). Sa fiabilité sur la durée t vaut 0,95, 0,7 et 0,5 selon le cas.
<div class="tw"><table><thead><tr><th>Qualité</th><th class="c">P(qualité)</th><th class="c">Fiable F</th><th class="c">Non fiable F<sup>C</sup></th></tr></thead><tbody>
<tr><td>Haute H</td><td class="c">0,4</td><td class="c">0,95 × 0,4 = 0,38</td><td class="c">0,05 × 0,4 = 0,02</td></tr>
<tr><td>Ordinaire O</td><td class="c">0,5</td><td class="c">0,70 × 0,5 = 0,35</td><td class="c">0,30 × 0,5 = 0,15</td></tr>
<tr><td>Médiocre M</td><td class="c">0,1</td><td class="c">0,50 × 0,1 = 0,05</td><td class="c">0,50 × 0,1 = 0,05</td></tr>
<tr><th>Total</th><td class="c">1</td><td class="c"><b>0,78</b></td><td class="c"><b>0,22</b></td></tr>
</tbody></table></div>
<p><b>Q2.</b> P(F) = 0,38 + 0,35 + 0,05 = <b>0,78</b>.</p>
<p><b>Q3.</b> L’appareil s’est avéré non fiable : P(H | F<sup>C</sup>) = 0,02 ÷ 0,22 ≈ <b>0,091</b> ; P(O | F<sup>C</sup>) = 0,15 ÷ 0,22 ≈ <b>0,682</b> ; P(M | F<sup>C</sup>) = 0,05 ÷ 0,22 ≈ <b>0,227</b>. Somme : 1.</p>
<p><b>Q4, l’utilité pour le fabricant (0,5 point).</b> Le taux de rejet est de 22 % : sur cent appareils, 22 seront retournés, dont la plupart à cause des pièces ordinaires (68 %) ou médiocres (23 %). Si le gain tiré de ces pièces dépasse le coût de réparation des retours, le fabricant garde ces proportions ; sinon il doit les réduire.</p></div>
<div class="tip">Présenter l’arbre sous forme de <b>tableau</b> (une ligne par cause, une colonne par résultat) évite les erreurs : les probabilités totales sont les <b>totaux de colonnes</b>, et Bayes est « une case ÷ le total de sa colonne ».</div>
<div data-lab="calc" data-r="0.487" data-tol="0.004"><p><b>TD 2, exercice 4.</b> Mêmes données (40 %, 50 %, 10 % ; fiabilités 0,95, 0,7, 0,5). L’appareil s’est avéré <b>fiable</b>. Probabilité qu’il soit monté avec des pièces de haute qualité ?</p>
<div class="sol">P(H | F) = P(F ∩ H) ÷ P(F) = 0,38 ÷ 0,78 ≈ <b>0,487</b> (49 %).</div></div>
<div data-lab="calc" data-r="0.475" data-tol="0.004"><p><b>TD 2, exercice 3.</b> Deux qualités seulement : haute (40 %, fiabilité 0,95) et ordinaire (60 %, fiabilité 0,7). L’appareil s’est avéré fiable. Probabilité qu’il soit de haute qualité ?</p>
<div class="sol">P(F) = 0,95 × 0,4 + 0,7 × 0,6 = 0,38 + 0,42 = 0,80. P(H | F) = 0,38 ÷ 0,80 = <b>0,475</b>.</div></div>
<div data-lab="calc" data-r="0.294" data-tol="0.004"><p><b>TD 2, exercice 1.</b> La machine M₁ fabrique 1/3 des pièces, dont 5 % hors tolérance ; M₂ fabrique 2/3 des pièces, dont 6 % hors tolérance. Une pièce est hors tolérance : probabilité qu’elle vienne de M₁ ?</p>
<div class="sol">P(H ∩ M₁) = 0,05 × 1/3 ≈ 0,01667. P(H ∩ M₂) = 0,06 × 2/3 = 0,04. P(H) ≈ 0,05667.<br>P(M₁ | H) = 0,01667 ÷ 0,05667 ≈ <b>0,294</b>.</div></div>
<div data-lab="calc" data-r="1/7" data-tol="0.003"><p><b>TD 2, exercice 6.</b> Dix urnes identiques : neuf contiennent 2 boules blanches et 2 noires, la dixième 6 blanches et 2 noires. On choisit une urne au hasard et on tire une boule : elle est blanche. Probabilité qu’elle vienne de la dixième urne ?</p>
<div class="sol">P(blanche | urne ordinaire) = 2/4 = 0,5 ; P(blanche | dixième) = 6/8 = 0,75.<br>P(blanche) = 0,9 × 0,5 + 0,1 × 0,75 = 0,45 + 0,075 = 0,525.<br>P(dixième | blanche) = 0,075 ÷ 0,525 = 1/7 ≈ <b>0,143</b>.</div></div>` },

{ id: '5.8', t: 'Fausses alarmes, cas manqués et « faillir à sa mission »', h: `
<p>Un détecteur (radar, test, technique de détection) peut se tromper de deux façons.</p>
<div class="tw"><table>
<thead><tr><th></th><th>Il signale</th><th>Il ne signale pas</th></tr></thead>
<tbody>
<tr><th>La chose est présente</th><td>bonne détection</td><td><b>faux négatif</b> (cas manqué)</td></tr>
<tr><th>La chose est absente</th><td><b>faux positif</b> (fausse alarme)</td><td>bon rejet</td></tr>
</tbody></table></div>
<div class="exam"><b>Devoir 2022, exercice 3 (5 points).</b> Un radar détecte un avion présent avec probabilité 0,99 ; il signale un objet sans avion avec probabilité 0,1. Un avion survole la zone avec probabilité 0,05.
<p>A : avion présent. E : le radar signale. P(A) = 0,05 ; P(E | A) = 0,99 ; P(E | A<sup>C</sup>) = 0,1.</p>
<div class="tw"><table><thead><tr><th>Feuille</th><th>Produit</th><th class="c">Valeur</th></tr></thead><tbody>
<tr><td>A ∩ E</td><td>0,99 × 0,05</td><td class="c">0,0495</td></tr>
<tr><td>A ∩ E<sup>C</sup> (faux négatif)</td><td>0,01 × 0,05</td><td class="c">0,0005</td></tr>
<tr><td>A<sup>C</sup> ∩ E (faux positif)</td><td>0,10 × 0,95</td><td class="c">0,095</td></tr>
<tr><td>A<sup>C</sup> ∩ E<sup>C</sup></td><td>0,90 × 0,95</td><td class="c">0,855</td></tr>
</tbody></table></div>
<p><b>Q2.</b> P(E) = 0,0495 + 0,095 = <b>0,1445</b>. <b>Q3.</b> P(E<sup>C</sup>) = 0,0005 + 0,855 = <b>0,8555</b>. Vérification : somme 1.</p>
<p><b>Q4 (2 points).</b> « Le radar faille à sa mission » = il se trompe = faux négatifs + faux positifs = P(A ∩ E<sup>C</sup>) + P(A<sup>C</sup> ∩ E) = 0,0005 + 0,095 = <b>0,0955</b>.</p></div>
<div class="plus">Le corrigé du professeur écrit 0,01 × 0,05 = 0,005 et conclut 0,1. Le produit vaut 0,0005, d’où 0,0955. La méthode, elle, est bien celle-ci : <b>additionner les deux feuilles où le radar se trompe</b>.</div>
<div class="warn">« Faillir à sa mission » est une probabilité d’<b>intersection</b> (des feuilles), pas une conditionnelle. On ne divise par rien.</div>
<div data-lab="calc" data-r="0.3426" data-tol="0.004"><p>Radar du devoir 2022. Le radar signale un objet. Probabilité qu’il y ait réellement un avion ?</p>
<div class="sol">P(A | E) = P(A ∩ E) ÷ P(E) = 0,0495 ÷ 0,1445 ≈ <b>0,343</b>. Deux signalements sur trois sont de fausses alarmes, parce que les avions sont rares (5 %).</div></div>
<div data-lab="calc" data-r="0.055" data-tol="0.0006"><p>Technique de détection du devoir 2025 : P(compromis) = 0,1 ; P(déclaré | compromis) = 0,9 ; P(déclaré | sain) = 0,05. Probabilité que la technique <b>se trompe</b> ?</p>
<div class="sol">Faux négatif : 0,1 × 0,1 = 0,01. Faux positif : 0,9 × 0,05 = 0,045. Total : <b>0,055</b>.</div></div>
<h4>QCM : connaître ou deviner (TD 2, exercice 9)</h4>
<p>Une question propose m réponses. L’étudiant connaît la réponse avec probabilité p ; sinon il choisit au hasard. C : il connaît ; B : il donne la bonne réponse. P(B | C) = 1 et P(B | C<sup>C</sup>) = 1/m.</p>
<div class="f">P(C | B) = [[p//p + (1 − p)/m]] = [[m p//1 + (m − 1) p]]</div>
<div data-lab="calc" data-r="0.8"><p>Quatre réponses par question (m = 4), l’étudiant connaît la réponse une fois sur deux (p = 0,5). Il a répondu juste : probabilité qu’il connaissait vraiment la réponse ?</p>
<div class="sol">P(B) = 0,5 × 1 + 0,5 × 0,25 = 0,625. P(C | B) = 0,5 ÷ 0,625 = <b>0,8</b>. Avec la formule : 4 × 0,5 ÷ (1 + 3 × 0,5) = 2 ÷ 2,5.</div></div>` },

{ id: '5.9', t: 'Les erreurs qui coûtent des points, et la liste de contrôle', h: `
<div class="tw"><table>
<thead><tr><th>Erreur</th><th>Comment l’éviter</th></tr></thead>
<tbody>
<tr><td>Prendre « 20 % des composants de A ont un défaut » pour P(A ∩ défaut)</td><td>« des composants de A » = « sachant A ». Il faut encore multiplier par P(A).</td></tr>
<tr><td>Inverser P(A | B) et P(B | A)</td><td>Ce qui suit « sachant » est au dénominateur.</td></tr>
<tr><td>Oublier − P(A ∩ B) dans l’union</td><td>Vérifie que le résultat ne dépasse pas 1.</td></tr>
<tr><td>Multiplier P(A) × P(B) sans que l’indépendance soit donnée</td><td>Sans indépendance, P(A ∩ B) = P(A | B) × P(B).</td></tr>
<tr><td>Diviser par P(résultat) pour « faillir à sa mission »</td><td>C’est une somme de feuilles, sans division.</td></tr>
<tr><td>Ne pas vérifier</td><td>Feuilles : somme 1. Bayes sur toutes les causes : somme 1.</td></tr>
</tbody></table></div>
<h4>Liste de contrôle avant de rendre</h4>
<ol>
<li>Ai-je <b>nommé</b> chaque événement par une phrase ?</li>
<li>Ai-je écrit les <b>données en notation</b> (P(A) = …, P(S | A) = …) ?</li>
<li>Chaque résultat est-il précédé de sa <b>formule littérale</b> ?</li>
<li>Toutes mes probabilités sont-elles <b>entre 0 et 1</b> ?</li>
<li>Ai-je écrit une <b>phrase de conclusion</b> quand on demande « que déduisez-vous ? »</li>
</ol>` }
],
glossaire: [
  ['Univers Ω', 'Sample space', 'ensemble de tous les résultats possibles d’une expérience aléatoire ; espace des observables.'],
  ['Événement', 'Event', 'partie de Ω ; ensemble de résultats.'],
  ['Événement élémentaire', 'Outcome', 'un seul résultat.'],
  ['Événement contraire A<sup>C</sup>', 'Complement', 'A ne se réalise pas ; P(A<sup>C</sup>) = 1 − P(A).'],
  ['Intersection A ∩ B', 'Intersection', 'A et B se réalisent tous les deux.'],
  ['Union A ∪ B', 'Union', 'au moins l’un des deux se réalise.'],
  ['Incompatibles', 'Mutually exclusive', 'ne peuvent pas se réaliser ensemble : A ∩ B = ∅.'],
  ['Équiprobabilité', 'Uniform probability', 'tous les résultats ont la même probabilité ; P(A) = Card(A)/Card(Ω).'],
  ['Théorème de Poincaré', 'Inclusion–exclusion', 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B).'],
  ['Probabilité conditionnelle', 'Conditional probability', 'P(A | B) = P(A ∩ B)/P(B) : probabilité de A sachant B.'],
  ['Indépendance', 'Independence', 'P(A ∩ B) = P(A) × P(B).'],
  ['Partition', 'Partition', 'événements incompatibles deux à deux qui recouvrent tout Ω.'],
  ['Probabilités totales', 'Law of total probability', 'P(B) = Σ P(B | Aᵢ) P(Aᵢ).'],
  ['Formule de Bayes', 'Bayes’ theorem', 'P(Aᵢ | B) = P(B | Aᵢ) P(Aᵢ)/P(B).'],
  ['Arbre de probabilités', 'Probability tree', 'schéma à étages ; on multiplie le long des chemins, on additionne les feuilles.'],
  ['Faux positif', 'False positive', 'signalement alors que la chose est absente.'],
  ['Faux négatif', 'False negative', 'absence de signalement alors que la chose est présente.'],
  ['Loi des grands nombres', 'Law of large numbers', 'la fréquence observée tend vers la probabilité quand le nombre d’essais grandit.'],
  ['Tribu', 'σ-algebra', 'famille d’événements stable par complémentaire et union dénombrable.']
],
formules: [
  ['Équiprobabilité', 'P(A) = [[Card(A)//Card(Ω)]]', 'cas favorables sur cas possibles.'],
  ['Contraire', 'P(A<sup>C</sup>) = 1 − P(A)', '« au moins un » = 1 − « aucun ».'],
  ['Union (Poincaré)', 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', 'si incompatibles, le dernier terme est nul.'],
  ['Un seul des deux', 'P(A ∪ B) − P(A ∩ B)', '= P(A) + P(B) − 2 P(A ∩ B).'],
  ['Conditionnelle', 'P(A | B) = [[P(A ∩ B)//P(B)]]', 'le « sachant » va au dénominateur.'],
  ['Produit', 'P(A ∩ B) = P(A | B) × P(B)', 'une feuille de l’arbre.'],
  ['Indépendance', 'P(A ∩ B) = P(A) × P(B)', 'équivaut à P(A | B) = P(A).'],
  ['Union avec indépendance', 'P(B) = [[P(A ∪ B) − P(A)//1 − P(A)]]', 'devoir 2023.'],
  ['Probabilités totales', 'P(B) = Σ P(B | Aᵢ) × P(Aᵢ)', 'les Aᵢ forment une partition.'],
  ['Bayes', 'P(Aᵢ | B) = [[P(B | Aᵢ) × P(Aᵢ)//P(B)]]', 'feuille ÷ somme des feuilles du même résultat.'],
  ['Nombre attendu', 'N × p', 'sur N pièces, N × p ont la propriété de probabilité p.']
],
resume: [
  'Un événement est une partie de l’univers Ω ; sa probabilité est entre 0 et 1.',
  '<b>Contraire</b> : P(A<sup>C</sup>) = 1 − P(A). « Au moins un » = 1 − « aucun ».',
  '<b>Union</b> : P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
  '<b>Conditionnelle</b> : P(A | B) = P(A ∩ B) ÷ P(B). Ce n’est pas P(B | A).',
  '<b>Indépendance</b> : P(A ∩ B) = P(A) × P(B). Indépendants ne veut pas dire incompatibles.',
  '<b>Arbre</b> : on multiplie le long d’un chemin, on additionne les feuilles d’un même résultat (probabilités totales).',
  '<b>Bayes</b> : cause sachant résultat = feuille ÷ total du résultat.',
  '« Faillir à sa mission » = faux négatifs + faux positifs, sans division.',
  'Rédaction : nommer, traduire, formule littérale, nombres, conclusion, vérification.'
],
pieges: [
  'Confondre P(A | B) et P(B | A).',
  'Lire « 20 % des pièces de A » comme une intersection alors que c’est une conditionnelle.',
  'Oublier de retirer P(A ∩ B) dans l’union.',
  'Multiplier sans que l’indépendance soit donnée.',
  'Confondre indépendants et incompatibles.',
  'Répondre « oui, indépendants » sans comparer P(A ∩ B) et P(A) × P(B).'
],
cartes: [
  ['Qu’est-ce que Ω ?', 'L’univers : l’ensemble de tous les résultats possibles de l’expérience aléatoire.'],
  ['P(A) en cas d’équiprobabilité ?', 'Nombre de cas favorables ÷ nombre de cas possibles.'],
  ['P(A<sup>C</sup>) ?', '1 − P(A).'],
  ['Comment calculer « au moins un » ?', '1 − P(aucun).'],
  ['Formule de l’union (Poincaré) ?', 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B).'],
  ['On connaît P(A), P(B), P(aucun). Comment trouver P(A ∩ B) ?', 'P(A ∪ B) = 1 − P(aucun), puis P(A ∩ B) = P(A) + P(B) − P(A ∪ B).'],
  ['Probabilité qu’un seul des deux se réalise ?', 'P(A ∪ B) − P(A ∩ B).'],
  ['Définition de P(A | B) ?', 'P(A ∩ B) ÷ P(B) : probabilité de A sachant que B est réalisé.'],
  ['Règle du produit ?', 'P(A ∩ B) = P(A | B) × P(B).'],
  ['Quand A et B sont-ils indépendants ?', 'Quand P(A ∩ B) = P(A) × P(B), c’est-à-dire P(A | B) = P(A).'],
  ['Indépendants ou incompatibles ?', 'Incompatibles : P(A ∩ B) = 0. Indépendants : P(A ∩ B) = P(A) P(B). Ce sont deux notions différentes.'],
  ['A et B indépendants, on connaît P(A) et P(A ∪ B). P(B) ?', '(P(A ∪ B) − P(A)) ÷ (1 − P(A)).'],
  ['Qu’est-ce qu’une partition ?', 'Des événements deux à deux incompatibles dont la réunion est Ω.'],
  ['Formule des probabilités totales ?', 'P(B) = P(B | A₁)P(A₁) + … + P(B | Aₙ)P(Aₙ).'],
  ['Formule de Bayes ?', 'P(Aᵢ | B) = P(B | Aᵢ) × P(Aᵢ) ÷ P(B).'],
  ['Dans un arbre, que fait-on le long d’un chemin ? entre chemins ?', 'On multiplie le long d’un chemin ; on additionne les feuilles.'],
  ['Deux vérifications sur un arbre ?', 'Les branches issues d’un même nœud somment à 1 ; toutes les feuilles somment à 1.'],
  ['Faux positif, faux négatif ?', 'Faux positif : alerte sans cause. Faux négatif : cause présente non détectée.'],
  ['« Le radar faille à sa mission » : quel calcul ?', 'P(avion et pas de signal) + P(pas d’avion et signal).'],
  ['Devoir 2018 : P(S), P(A | S) ?', 'P(S) = 0,32 + 0,57 = 0,89 ; P(A | S) = 0,32 ÷ 0,89 ≈ 0,36.'],
  ['Pourquoi un test fiable à 95 % peut-il donner 32 % seulement de vrais malades parmi les positifs ?', 'Parce que la maladie est rare : les faux positifs des nombreuses personnes saines dépassent les vrais positifs.'],
  ['Comment passer d’une probabilité à un nombre de pièces ?', 'Nombre attendu = effectif × probabilité.']
],
quiz: [
  { q: 'P(A) = 0,10 ; P(B) = 0,20 ; P(ni A ni B) = 0,75. P(A ∩ B) ?', o: ['0,05', '0,02', '0,25', '0,30'], a: 0, e: 'P(A ∪ B) = 0,25 ; P(A ∩ B) = 0,10 + 0,20 − 0,25 = 0,05.' },
  { q: 'Mêmes données. A et B sont-ils indépendants ?', o: ['Non, car 0,05 ≠ 0,10 × 0,20', 'Oui, car P(A ∩ B) > 0', 'Oui, car P(A) + P(B) < 1', 'On ne peut pas savoir'], a: 0, e: 'On compare P(A ∩ B) = 0,05 au produit 0,02.' },
  { q: 'Mêmes données. Probabilité d’un seul des deux défauts ?', o: ['0,20', '0,25', '0,30', '0,15'], a: 0, e: 'P(A ∪ B) − P(A ∩ B) = 0,25 − 0,05.' },
  { q: 'P(A) = 0,2 ; P(B) = 0,25 ; P(A ∩ B) = 0,15. P(A | B) ?', o: ['0,60', '0,75', '0,15', '0,05'], a: 0, e: '0,15 ÷ 0,25 = 0,60 (devoir 2022).' },
  { q: 'A et B indépendants, P(A) = 0,02, P(A ∪ B) = 0,069. P(B) ?', o: ['0,05', '0,049', '0,089', '0,0014'], a: 0, e: '(0,069 − 0,02) ÷ 0,98 = 0,05 (devoir 2023).' },
  { q: '« 5 % des composants de la chaîne B ont un défaut. » Ce 5 % est :', o: ['P(défaut | B)', 'P(B | défaut)', 'P(défaut ∩ B)', 'P(défaut)'], a: 0, e: '« Des composants de B » signifie « sachant B ».' },
  { q: 'Dans un arbre, la probabilité d’une feuille s’obtient en :', o: ['multipliant les probabilités le long du chemin', 'additionnant les probabilités le long du chemin', 'divisant la dernière branche par la première', 'prenant la plus petite des branches'], a: 0, e: 'P(A ∩ B) = P(B | A) × P(A).' },
  { q: 'Chaîne A : 40 %, 80 % sans défaut. Chaîne B : 60 %, 95 % sans défaut. P(sans défaut) ?', o: ['0,89', '0,875', '0,76', '0,32'], a: 0, e: '0,8 × 0,4 + 0,95 × 0,6 = 0,32 + 0,57.' },
  { q: 'Mêmes données. P(chaîne A | sans défaut) ?', o: ['0,36', '0,40', '0,32', '0,80'], a: 0, e: '0,32 ÷ 0,89 ≈ 0,36.' },
  { q: 'Quelles égalités sont toujours vraies ?', o: ['P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', 'P(A ∩ B) = P(A | B) × P(B)', 'P(A<sup>C</sup>) = 1 − P(A)', 'P(A ∩ B) = P(A) × P(B)'], a: [0, 1, 2], e: 'La dernière n’est vraie que si A et B sont indépendants.' },
  { q: 'Radar : P(avion) = 0,05 ; P(signal | avion) = 0,99 ; P(signal | pas d’avion) = 0,1. P(signal) ?', o: ['0,1445', '0,0495', '0,095', '0,99'], a: 0, e: '0,99 × 0,05 + 0,1 × 0,95 = 0,0495 + 0,095.' },
  { q: 'Même radar : probabilité qu’il se trompe (faux négatif ou faux positif) ?', o: ['0,0955', '0,1445', '0,11', '0,005'], a: 0, e: '0,01 × 0,05 + 0,1 × 0,95 = 0,0005 + 0,095.' },
  { q: 'Deux événements incompatibles de probabilités 0,3 et 0,4 :', o: ['ne sont pas indépendants', 'ont une union de probabilité 0,7', 'ont une intersection de probabilité 0,12', 'sont contraires l’un de l’autre'], a: [0, 1], e: 'P(A ∩ B) = 0 ≠ 0,12, donc dépendants ; P(A ∪ B) = 0,3 + 0,4. Ils ne sont pas contraires car 0,3 + 0,4 ≠ 1.' },
  { q: 'On lance trois pièces. Probabilité d’obtenir au moins une fois pile ?', o: ['7/8', '1/8', '3/8', '1/2'], a: 0, e: '1 − P(aucun pile) = 1 − (1/2)³ = 7/8.' },
  { q: 'La formule de Bayes sert à :', o: ['passer de P(résultat | cause) à P(cause | résultat)', 'calculer une union', 'tester l’indépendance', 'calculer une espérance'], a: 0, e: 'Elle retourne la conditionnelle.' },
  { q: 'Pièces : haute 40 % (fiabilité 0,95), ordinaire 50 % (0,7), médiocre 10 % (0,5). P(fiable) ?', o: ['0,78', '0,72', '0,22', '0,95'], a: 0, e: '0,38 + 0,35 + 0,05 = 0,78 (devoir 2019).' },
  { q: 'Mêmes données. L’appareil est non fiable. Quelle qualité est la plus probable ?', o: ['Ordinaire (0,68)', 'Haute (0,09)', 'Médiocre (0,23)', 'Les trois à égalité'], a: 0, e: '0,15 ÷ 0,22 ≈ 0,68.' },
  { q: 'Nœuds IoT : 10 % compromis ; P(déclaré | compromis) = 0,9 ; P(déclaré | sain) = 0,05. P(sain | déclaré compromis) ?', o: ['1/3', '0,05', '0,045', '2/3'], a: 0, e: '0,045 ÷ 0,135 = 1/3 (devoir 2025).' },
  { q: 'Que faut-il vérifier sur un arbre ?', o: ['Les branches issues d’un même nœud somment à 1', 'Les feuilles somment à 1', 'Toutes les feuilles sont égales', 'Chaque feuille est supérieure à 0,5'], a: [0, 1], e: 'Deux contrôles simples qui attrapent la plupart des erreurs.' },
  { q: 'Une pièce a 10 % de chances d’être retournée. Sur 250 pièces, combien de retours attend-on ?', o: ['25', '10', '2,5', '225'], a: 0, e: '250 × 0,10 = 25.' }
],
exos: [
  { t: 'Devoir 2024, exercice 1 complet', n: 'devoir · 5 points', e: `<p>Chaque composant subit deux traitements T1 et T2. A : « défaut pour T1 », B : « défaut pour T2 ». P(A) = 0,10 ; P(B) = 0,20 ; la probabilité de n’avoir aucun des deux défauts est 0,75.</p>
<ol><li>Probabilité d’au moins un défaut.</li><li>Probabilité des deux défauts.</li><li>A et B sont-ils indépendants ?</li><li>Probabilité d’un seul défaut.</li><li>Probabilité du défaut T2 sachant le défaut T1.</li></ol>`,
    s: `<ol><li>P(A ∪ B) = 1 − P(A<sup>C</sup> ∩ B<sup>C</sup>) = 1 − 0,75 = <b>0,25</b>.</li>
<li>P(A ∩ B) = P(A) + P(B) − P(A ∪ B) = 0,10 + 0,20 − 0,25 = <b>0,05</b>.</li>
<li>P(A) × P(B) = 0,02 ≠ 0,05 = P(A ∩ B) : A et B <b>ne sont pas indépendants</b>.</li>
<li>P(un seul) = P(A ∪ B) − P(A ∩ B) = 0,25 − 0,05 = <b>0,20</b>.</li>
<li>P(B | A) = P(A ∩ B) ÷ P(A) = 0,05 ÷ 0,10 = <b>0,5</b>. Avoir le défaut T1 fait passer la probabilité du défaut T2 de 0,20 à 0,50 : les deux défauts sont liés.</li></ol>
<p><small>Corrigé rédigé par moi : le sujet 2024 n’a pas de corrigé officiel dans le dossier.</small></p>` },
  { t: 'Devoir 2025, exercice 3, partie 1', n: 'devoir · 4 points', e: `<p>Une technique de détection déclare compromis un nœud effectivement compromis avec probabilité 0,9, et un nœud sain avec probabilité 0,05. 90 % des nœuds sont sains.</p>
<ol><li>Donner l’arbre des probabilités conditionnelles.</li><li>Probabilité que la technique décide « compromis ».</li><li>Probabilité qu’elle décide « sain ».</li><li>Probabilité qu’un nœud déclaré sain soit compromis.</li><li>Probabilité qu’un nœud déclaré compromis soit sain.</li></ol>`,
    s: `<p>C : « le nœud est compromis », S = C<sup>C</sup> : « sain », D : « déclaré compromis ». P(C) = 0,1 ; P(S) = 0,9 ; P(D | C) = 0,9 ; P(D | S) = 0,05.</p>
<ol><li>Feuilles : P(C ∩ D) = 0,9 × 0,1 = 0,09 ; P(C ∩ D<sup>C</sup>) = 0,1 × 0,1 = 0,01 ; P(S ∩ D) = 0,05 × 0,9 = 0,045 ; P(S ∩ D<sup>C</sup>) = 0,95 × 0,9 = 0,855. Somme : 1.</li>
<li>P(D) = 0,09 + 0,045 = <b>0,135</b>.</li>
<li>P(D<sup>C</sup>) = 1 − 0,135 = <b>0,865</b> (ou 0,01 + 0,855).</li>
<li>P(C | D<sup>C</sup>) = 0,01 ÷ 0,865 ≈ <b>0,0116</b>.</li>
<li>P(S | D) = 0,045 ÷ 0,135 = <b>1/3 ≈ 0,333</b>.</li></ol>
<p><small>Corrigé rédigé par moi.</small></p>` },
  { t: 'Devoir 2022, exercice 3 : le radar', n: 'devoir · 5 points', e: `<p>Si un avion est présent, le radar le détecte avec probabilité 0,99. Il peut signaler un objet sans avion avec probabilité 0,1. Un avion survole la zone avec probabilité 0,05.</p>
<ol><li>Arbre.</li><li>Probabilité que le radar signale un objet.</li><li>Probabilité qu’il ne signale rien.</li><li>Probabilité que le radar faille à sa mission.</li></ol>`,
    s: `<p>A : avion présent ; E : le radar signale. P(A) = 0,05 ; P(E | A) = 0,99 ; P(E | A<sup>C</sup>) = 0,1.</p>
<ol><li>Feuilles : 0,0495 ; 0,0005 ; 0,095 ; 0,855.</li>
<li>P(E) = P(E | A)P(A) + P(E | A<sup>C</sup>)P(A<sup>C</sup>) = 0,0495 + 0,095 = <b>0,1445</b>.</li>
<li>P(E<sup>C</sup>) = 0,0005 + 0,855 = <b>0,8555</b>. Vérification : 0,1445 + 0,8555 = 1.</li>
<li>Faux négatifs : P(E<sup>C</sup> ∩ A) = 0,01 × 0,05 = 0,0005. Faux positifs : P(E ∩ A<sup>C</sup>) = 0,1 × 0,95 = 0,095. Probabilité de défaillance : <b>0,0955</b>.</li></ol>
<p>Le corrigé officiel suit exactement cette démarche mais écrit 0,005 pour le premier produit, d’où un total de 0,1.</p>` },
  { t: 'Devoir 2019, exercice 1 : trois qualités', n: 'devoir · 4 points', e: `<p>Pièces de haute qualité (40 %), ordinaires (50 %), médiocres (10 %) ; fiabilités 0,95 ; 0,7 ; 0,5.</p>
<ol><li>Arbre.</li><li>Probabilité que l’appareil soit fiable.</li><li>L’appareil s’est avéré non fiable : probabilité de chaque qualité.</li><li>Utilité de ces probabilités pour le fabricant ?</li></ol>`,
    s: `<ol><li>Six feuilles : 0,38 et 0,02 (haute) ; 0,35 et 0,15 (ordinaire) ; 0,05 et 0,05 (médiocre).</li>
<li>P(F) = 0,38 + 0,35 + 0,05 = <b>0,78</b>, donc P(F<sup>C</sup>) = 0,22.</li>
<li>P(H | F<sup>C</sup>) = 0,02 ÷ 0,22 ≈ <b>0,091</b> ; P(O | F<sup>C</sup>) = 0,15 ÷ 0,22 ≈ <b>0,682</b> ; P(M | F<sup>C</sup>) = 0,05 ÷ 0,22 ≈ <b>0,227</b>. Somme = 1.</li>
<li>Le taux de rejet est 22 %. Sur cent appareils, 22 seront retournés, surtout à cause des pièces ordinaires (68 %) et médiocres (23 %). Si le gain obtenu avec ces pièces dépasse le coût de réparation des retours, le fabricant garde ces proportions ; sinon il les réduit.</li></ol>
<p>Corrigé officiel du professeur (barème : 1 + 1 + 3 × 0,5 + 0,5).</p>` },
  { t: 'Indépendance : devoir 2023', n: 'devoir · 2 points', e: `<p>Un appareil peut présenter deux défauts A et B, indépendants. P(A) = 0,02 et la probabilité d’au moins un des deux défauts est 0,069. Calculer P(B).</p>`,
    s: `<p>A et B indépendants donc P(A ∩ B) = P(A) × P(B).</p>
<p>P(A ∪ B) = P(A) + P(B) − P(A) × P(B) = P(A) + P(B)(1 − P(A)).</p>
<p>P(B) = (P(A ∪ B) − P(A)) ÷ (1 − P(A)) = (0,069 − 0,02) ÷ 0,98 = 0,049 ÷ 0,98 = <b>0,05</b>.</p>
<p>Corrigé officiel (2 points).</p>` },
  { t: 'Entraînement : contrôle qualité', n: 'application', e: `<p>Trois ateliers fabriquent 50 %, 30 % et 20 % d’une production, avec des taux de défaut de 2 %, 3 % et 5 %.</p>
<ol><li>Probabilité qu’une pièce soit défectueuse.</li><li>Une pièce est défectueuse : de quel atelier vient-elle le plus probablement ?</li><li>Sur 1000 pièces, combien de défectueuses attend-on ?</li></ol>`,
    s: `<ol><li>P(D) = 0,02 × 0,5 + 0,03 × 0,3 + 0,05 × 0,2 = 0,010 + 0,009 + 0,010 = <b>0,029</b>.</li>
<li>P(1 | D) = 0,010 ÷ 0,029 ≈ 0,345 ; P(2 | D) = 0,009 ÷ 0,029 ≈ 0,310 ; P(3 | D) = 0,010 ÷ 0,029 ≈ 0,345. Les ateliers 1 et 3 sont à égalité : le troisième produit peu mais mal, le premier produit bien mais beaucoup.</li>
<li>1000 × 0,029 = <b>29</b> pièces.</li></ol>` }
]
});

REV.chapitres.push({
n: 6, titre: 'Cours 3 (B) — Compter et lois discrètes', en: 'Combinaisons, variables aléatoires, binomiale, géométrique, Pascal, multinomiale, Poisson',
objectifs: [
  'calculer une <b>factorielle</b>, une <b>combinaison</b>, un coefficient <b>multinomial</b> ;',
  'définir une <b>variable aléatoire discrète</b>, sa loi, son <b>espérance</b> et sa <b>variance</b> ;',
  'appliquer la loi <b>binomiale</b> et le réflexe « au moins un » ;',
  'appliquer les lois <b>géométrique</b> et de <b>Pascal</b> (rang du premier, du k-ième succès) ;',
  'appliquer la loi <b>multinomiale</b> (trois types de fautes) ;',
  'appliquer la loi de <b>Poisson</b> (nombre de pannes sur une durée) ;',
  '<b>choisir la bonne loi</b> à partir des mots de l’énoncé.'
],
sections: [
{ id: '6.1', t: 'Savoir compter : factorielle et combinaisons', h: `
<div class="def"><b>n!</b> (« factorielle n ») = n × (n − 1) × … × 2 × 1 : le nombre de façons de <b>ranger n objets dans un ordre</b>. Par convention 0! = 1.</div>
<div class="kv"><div>3!<b>6</b></div><div>4!<b>24</b></div><div>5!<b>120</b></div><div>6!<b>720</b></div></div>
<div class="def">La <b>combinaison</b> C(n, k), notée aussi C<sub>n</sub><sup>k</sup>, est le nombre de façons de <b>choisir k objets parmi n</b>, sans tenir compte de l’ordre.</div>
<div class="f">C(n, k) = [[n!//k! × (n − k)!]]<small>Astuce de calcul : C(n, k) = [n × (n − 1) × … sur k facteurs] ÷ k!. Exemple : C(8, 2) = (8 × 7) ÷ 2 = 28.</small></div>
<ul>
<li>C(n, 0) = C(n, n) = 1 ; C(n, 1) = n ;</li>
<li><b>symétrie</b> : C(n, k) = C(n, n − k), donc C(5, 3) = C(5, 2) = 10.</li>
</ul>
<div class="ill">Le professeur détaille toujours ce calcul. Corrigé 2023 : C(5, 3) = 5! ÷ (3! × 2!) = (5 × 4) ÷ 2 = 10.</div>
<div class="def">Le <b>coefficient multinomial</b> compte les façons de répartir n objets en groupes de tailles k₁, k₂, …, kₘ (avec k₁ + … + kₘ = n) : [[n!//k₁! × k₂! × … × kₘ!]].</div>
<div data-lab="calc" data-r="10"><p>Calcule C(5, 3).</p>
<div class="sol">5! ÷ (3! × 2!) = 120 ÷ (6 × 2) = <b>10</b>. Plus rapide : C(5, 3) = C(5, 2) = (5 × 4) ÷ 2.</div></div>
<div data-lab="calc" data-r="28"><p>Huit liens de communication. De combien de façons peut-on en choisir deux ?</p>
<div class="sol">C(8, 2) = (8 × 7) ÷ 2 = <b>28</b>. Ce nombre sert dans l’exercice des liens (devoirs 2021 et 2024).</div></div>
<div data-lab="calc" data-r="15"><p>Calcule C(6, 2).</p>
<div class="sol">(6 × 5) ÷ 2 = <b>15</b>.</div></div>
<div data-lab="calc" data-r="90"><p>Calcule le coefficient multinomial 6! ÷ (2! × 2! × 2!).</p>
<div class="sol">720 ÷ (2 × 2 × 2) = 720 ÷ 8 = <b>90</b>. C’est celui du devoir sur les trois types de fautes.</div></div>
<div data-lab="calc" data-r="6"><p>Calcule C(4, 2). (Il sert dans la loi de Pascal du devoir 2023.)</p>
<div class="sol">(4 × 3) ÷ 2 = <b>6</b>.</div></div>` },

{ id: '6.2', t: 'Variable aléatoire discrète, espérance, variance', h: `
<div class="def">Une <b>variable aléatoire</b> X associe un <b>nombre</b> à chaque résultat de l’expérience (le nombre de pannes dans la semaine, le jour de la première panne). Elle est <b>discrète</b> quand ses valeurs possibles se comptent : 0, 1, 2, …</div>
<div class="def">La <b>loi</b> de X est la liste de ses valeurs x<sub>k</sub> avec leurs probabilités P(X = x<sub>k</sub>). Ces probabilités sont positives et leur <b>somme vaut 1</b>.</div>
<div class="f">F(x) = P(X ≤ x) = Σ<sub>x<sub>k</sub> ≤ x</sub> P(X = x<sub>k</sub>)<small><b>Fonction de répartition</b> : on cumule les probabilités jusqu’à x. Elle part de 0, finit à 1 et ne décroît jamais.</small></div>
<div class="f">E(X) = Σ x<sub>k</sub> × P(X = x<sub>k</sub>) &nbsp;&nbsp;·&nbsp;&nbsp; Var(X) = E(X²) − E(X)² &nbsp;&nbsp;·&nbsp;&nbsp; σ = √Var(X)<small><b>Espérance</b> : la moyenne attendue sur un grand nombre de répétitions. <b>Variance</b> : la dispersion autour de cette moyenne ; aussi Var(X) = E((X − E(X))²). <b>Écart type</b> σ : la racine de la variance.</small></div>
<div class="ill">Nombre de pannes par jour d’une machine : 0 panne avec probabilité 0,7 ; 1 panne avec 0,2 ; 2 pannes avec 0,1.
<p>E(X) = 0 × 0,7 + 1 × 0,2 + 2 × 0,1 = 0,4 panne par jour.</p>
<p>E(X²) = 0 × 0,7 + 1 × 0,2 + 4 × 0,1 = 0,6. Var(X) = 0,6 − 0,4² = 0,44.</p></div>
<div data-lab="calc" data-r="1.1"><p>X vaut 0, 1, 2, 3 avec les probabilités 0,3 ; 0,4 ; 0,2 ; 0,1. Calcule E(X).</p>
<div class="sol">0 × 0,3 + 1 × 0,4 + 2 × 0,2 + 3 × 0,1 = 0 + 0,4 + 0,4 + 0,3 = <b>1,1</b>.</div></div>
<div data-lab="calc" data-r="0.9"><p>Même variable. Calcule P(X ≤ 2).</p>
<div class="sol">F(2) = 0,3 + 0,4 + 0,2 = <b>0,9</b>. Ou 1 − P(X = 3) = 1 − 0,1.</div></div>
<div data-lab="calc" data-r="0.89"><p>Même variable. Calcule Var(X).</p>
<div class="ind">Calcule E(X²) avec les carrés 0, 1, 4, 9.</div>
<div class="sol">E(X²) = 0 + 0,4 + 4 × 0,2 + 9 × 0,1 = 2,1. Var(X) = 2,1 − 1,1² = 2,1 − 1,21 = <b>0,89</b>.</div></div>` },

{ id: '6.3', t: 'Bernoulli et loi binomiale', h: `
<div class="def">Une <b>épreuve de Bernoulli</b> est une expérience à <b>deux issues</b> : succès (probabilité p) ou échec (probabilité q = 1 − p). Dans ce module, le « succès » est souvent… une panne.</div>
<div class="def">On répète n fois la même épreuve de Bernoulli, <b>de façon indépendante</b>. Le <b>nombre X de succès</b> suit la <b>loi binomiale</b> B(n, p).</div>
<div class="f">P(X = k) = C(n, k) × p<sup>k</sup> × (1 − p)<sup>n − k</sup> &nbsp;&nbsp; pour k = 0, 1, …, n<small>E(X) = n p &nbsp;·&nbsp; Var(X) = n p (1 − p)</small></div>
<h4>D’où vient la formule (démonstration du TD)</h4>
<ol>
<li>Une suite précise, par exemple k succès puis n − k échecs, a pour probabilité p × … × p × (1 − p) × … × (1 − p) = p<sup>k</sup>(1 − p)<sup>n−k</sup>, par <b>indépendance</b>.</li>
<li>Toute autre suite avec k succès a la <b>même</b> probabilité.</li>
<li>Il y a C(n, k) suites différentes (on choisit les k positions des succès). Elles sont <b>incompatibles</b>, donc on additionne : C(n, k) fois la même valeur.</li>
</ol>
<div class="tip"><b>« Au moins un succès »</b> = 1 − P(X = 0) = <b>1 − (1 − p)<sup>n</sup></b>. À écrire sans réfléchir.</div>
<div class="meth">Les trois conditions à vérifier (et à écrire) avant de dire « loi binomiale » :
<ol><li>deux issues à chaque essai ;</li><li>la même probabilité p à chaque essai ;</li><li>des essais indépendants, en nombre n <b>fixé à l’avance</b>.</li></ol></div>
<div class="exam"><b>Devoir 2023, exercice 2, questions 1 et 2.</b> Un logiciel est exécuté chaque jour ouvrable (5 jours par semaine). Il peut subir chaque jour une panne avec probabilité p.
<p><b>1) k pannes par semaine (1,5 point).</b> Chaque jour est une épreuve de Bernoulli, répétée 5 fois : X suit B(5, p). P(X = k) = C(5, k) p<sup>k</sup>(1 − p)<sup>5−k</sup>. Pour k = 3 : C(5, 3) = 10, donc P(X = 3) = <b>10 p³(1 − p)²</b>.</p>
<p><b>2) Au moins une panne par semaine (1 point).</b> P(X ≥ 1) = 1 − P(X = 0) = <b>1 − (1 − p)⁵</b>.</p></div>
<div data-lab="discret"></div>
<div data-lab="calc" data-r="0.0081" data-tol="0.0002"><p>Logiciel du devoir 2023 avec p = 0,1. Probabilité d’avoir exactement 3 pannes dans la semaine de 5 jours ?</p>
<div class="sol">10 × 0,1³ × 0,9² = 10 × 0,001 × 0,81 = <b>0,0081</b>.</div></div>
<div data-lab="calc" data-r="0.4095" data-tol="0.004"><p>Même logiciel, p = 0,1. Probabilité d’au moins une panne dans la semaine ?</p>
<div class="sol">1 − 0,9⁵ = 1 − 0,59049 = <b>0,4095</b>.</div></div>
<div data-lab="calc" data-r="0.2646" data-tol="0.003"><p><b>TD 2, exercice 8.</b> Une urne contient 3 boules blanches et 7 rouges. On tire 4 boules <b>avec remise</b>. Probabilité de tirer exactement 2 blanches ?</p>
<div class="ind">Avec remise : les tirages sont indépendants et p = 3/10 à chaque fois.</div>
<div class="sol">X suit B(4 ; 0,3). P(X = 2) = C(4, 2) × 0,3² × 0,7² = 6 × 0,09 × 0,49 = <b>0,2646</b>.</div></div>
<div data-lab="calc" data-r="0.7599" data-tol="0.004"><p>Même urne, 4 tirages avec remise. Probabilité de tirer au moins une blanche ?</p>
<div class="sol">1 − 0,7⁴ = 1 − 0,2401 = <b>0,7599</b>.</div></div>
<div data-lab="calc" data-r="0.2684" data-tol="0.003"><p><b>TD 2, exercice 11.</b> La probabilité qu’une pièce soit défectueuse est 0,2. Sur un lot de 10 pièces, probabilité d’avoir exactement une pièce défectueuse ?</p>
<div class="sol">X suit B(10 ; 0,2). P(X = 1) = 10 × 0,2 × 0,8⁹ = 10 × 0,2 × 0,1342 = <b>0,2684</b>.</div></div>
<div data-lab="calc" data-r="149" data-u="pièces"><p><b>TD 2, exercice 10.</b> 2 % des pièces contrôlées sont défectueuses. Combien de pièces faut-il contrôler au minimum pour que la probabilité d’en trouver au moins une défectueuse dépasse 0,95 ?</p>
<div class="ind">Écris 1 − 0,98<sup>n</sup> &gt; 0,95, puis prends le logarithme.</div>
<div class="sol">1 − 0,98<sup>n</sup> &gt; 0,95 ⇔ 0,98<sup>n</sup> &lt; 0,05 ⇔ n × ln(0,98) &lt; ln(0,05) ⇔ n &gt; ln(0,05) ÷ ln(0,98) = 148,3 (le sens de l’inégalité change car ln(0,98) est négatif). Donc n = <b>149</b>.</div></div>
<div data-lab="calc" data-r="10"><p>Même contrôle : sur n = 500 pièces, combien de défectueuses attend-on en moyenne ?</p>
<div class="sol">E(X) = n p = 500 × 0,02 = <b>10</b>.</div></div>` },

{ id: '6.4', t: 'Loi géométrique et loi de Pascal', h: `
<p>Toujours la même suite d’épreuves de Bernoulli indépendantes, mais on ne compte plus les succès : on regarde <b>quand</b> ils arrivent.</p>
<div class="def"><b>Loi géométrique G(p)</b> : X est le <b>rang du premier succès</b>.</div>
<div class="f">P(X = k) = (1 − p)<sup>k − 1</sup> × p &nbsp;&nbsp; pour k = 1, 2, 3, …<small>k − 1 échecs, puis un succès. E(X) = 1/p &nbsp;·&nbsp; Var(X) = (1 − p)/p²</small></div>
<div class="def"><b>Loi de Pascal</b> : X<sub>k</sub> est le <b>rang du k-ième succès</b>.</div>
<div class="f">P(X<sub>k</sub> = n) = C(n − 1, k − 1) × p<sup>k</sup> × (1 − p)<sup>n − k</sup> &nbsp;&nbsp; pour n = k, k + 1, …<small>E(X<sub>k</sub>) = k/p &nbsp;·&nbsp; Var(X<sub>k</sub>) = k(1 − p)/p². Pour k = 1 on retrouve la loi géométrique.</small></div>
<h4>Comprendre la formule de Pascal</h4>
<p>Dire que le k-ième succès tombe <b>exactement</b> au n-ième essai, c’est dire deux choses à la fois : (1) parmi les n − 1 premiers essais il y a exactement k − 1 succès, ce qui fait C(n − 1, k − 1) p<sup>k−1</sup>(1 − p)<sup>n−k</sup> ; (2) le n-ième essai est un succès, probabilité p. On multiplie.</p>
<div class="warn">Binomiale : C(<b>n</b>, <b>k</b>). Pascal : C(<b>n − 1</b>, <b>k − 1</b>). Dans Pascal, le dernier essai est <b>forcément</b> un succès : il n’est pas libre, donc on ne le choisit pas.</div>
<div class="exam"><b>Devoir 2023, exercice 2, questions 3 et 4.</b>
<p><b>3) Première panne au k-ième jour (1 point).</b> Loi géométrique : P(Y = k) = p(1 − p)<sup>k−1</sup>. Pour k = 3 : <b>p(1 − p)²</b> (deux jours sans panne, puis la panne).</p>
<p><b>4) La k-ième panne arrive au n-ième jour (1,5 point).</b> Loi de Pascal : P(Z<sub>k</sub> = n) = C(n − 1, k − 1) p<sup>k</sup>(1 − p)<sup>n−k</sup>. Pour n = 5 et k = 3 : C(4, 2) = 6, donc <b>6 p³(1 − p)²</b>.</p></div>
<div class="plus">Le corrigé du professeur écrit la géométrique sous la forme P(Y = k + 1) = p(1 − p)<sup>k</sup>, puis « P(Y = 3) = p(1 − p)³ ». Avec sa propre formule, Y = 3 correspond à k = 2, donc p(1 − p)². Écris sur ta copie ce que tu comptes : « 2 jours sans panne puis une panne ».</div>
<div data-lab="calc" data-r="0.081" data-tol="0.001"><p>p = 0,1. Probabilité que la <b>première</b> panne arrive le 3ᵉ jour ?</p>
<div class="sol">Géométrique : 0,9² × 0,1 = 0,81 × 0,1 = <b>0,081</b>.</div></div>
<div data-lab="calc" data-r="0.00486" data-tol="0.0001"><p>p = 0,1. Probabilité que la <b>3ᵉ</b> panne arrive le 5ᵉ jour ?</p>
<div class="sol">Pascal : C(4, 2) × 0,1³ × 0,9² = 6 × 0,001 × 0,81 = <b>0,00486</b>.</div></div>
<div data-lab="calc" data-r="10" data-u="jours"><p>p = 0,1. En moyenne, au bout de combien de jours arrive la première panne ?</p>
<div class="sol">E(X) = 1/p = 1 ÷ 0,1 = <b>10</b> jours.</div></div>
<div data-lab="calc" data-r="0.1875" data-tol="0.002"><p>On lance une pièce équilibrée. Probabilité que le <b>2ᵉ</b> « pile » arrive au 4ᵉ lancer ?</p>
<div class="sol">Pascal avec k = 2, n = 4, p = 0,5 : C(3, 1) × 0,5² × 0,5² = 3 × 0,0625 = <b>0,1875</b>.</div></div>
<div data-lab="choix" data-a="3"><p>p = 0,2. « Probabilité que la deuxième panne arrive le 6ᵉ jour » : quelle expression ?</p>
<ul><li>C(6, 2) × 0,2² × 0,8⁴</li><li>0,8⁵ × 0,2</li><li>C(5, 2) × 0,2² × 0,8³</li><li>C(5, 1) × 0,2² × 0,8⁴</li></ul>
<div class="sol">Pascal : C(n − 1, k − 1) p<sup>k</sup>(1 − p)<sup>n−k</sup> avec n = 6, k = 2. La première proposition est la binomiale « 2 pannes en 6 jours », qui n’impose pas que la deuxième tombe le 6ᵉ jour.</div></div>` },

{ id: '6.5', t: 'Loi multinomiale : les trois types de fautes', h: `
<p>La binomiale suppose deux issues. Quand chaque essai a <b>m issues possibles</b>, de probabilités p₁, …, pₘ (somme 1), on compte combien de fois chaque issue apparaît en n essais.</p>
<div class="f">P(X₁ = k₁, …, Xₘ = kₘ) = [[n!//k₁! × k₂! × … × kₘ!]] × p₁<sup>k₁</sup> × p₂<sup>k₂</sup> × … × pₘ<sup>kₘ</sup><small>avec k₁ + k₂ + … + kₘ = n. Pour m = 2, on retrouve la binomiale.</small></div>
<div class="exam"><b>Devoirs 2021, 2023 et 2025 (5 points), barème du corrigé 2023.</b> Le test d’un logiciel révèle n défaillances, dues à trois types de fautes f₁, f₂, f₃ de probabilités p₁, p₂, p₃ (p₁ + p₂ + p₃ = 1).
<p><b>1) k₁ fautes f₁, k₂ fautes f₂, k₃ fautes f₃ (2 points).</b> Le vecteur (X₁, X₂, X₃) suit une loi <b>multinomiale</b> : P = [[n!//k₁! k₂! k₃!]] p₁<sup>k₁</sup> p₂<sup>k₂</sup> p₃<sup>k₃</sup>.</p>
<p><b>2) n = 6, p₁ = p₂ = p₃ = 1/3, k₁ = k₂ = k₃ = 2 (1 point).</b> [[6!//2! 2! 2!]] × (1/3)⁶ = 90 ÷ 729 = 10/81 ≈ <b>0,1235</b>.</p>
<p><b>3) m fautes de type f₁ (1 point).</b> On ne distingue plus que « f₁ » et « pas f₁ » : <b>binomiale</b> B(n, p₁). P(X₁ = m) = C(n, m) p₁<sup>m</sup>(1 − p₁)<sup>n−m</sup>.</p>
<p><b>4) m = 2 (1 point).</b> C(6, 2) × (1/3)² × (2/3)⁴ = 15 × 16 ÷ 729 = 80/243 ≈ <b>0,3292</b>.</p></div>
<div class="tip">Question 3 : dès qu’on ne s’intéresse qu’à <b>un</b> type, on regroupe tous les autres en « échec » et la multinomiale redevient une <b>binomiale</b>. C’est le point que la question vérifie.</div>
<div data-lab="calc" data-r="0.1235" data-tol="0.002"><p>Refais le calcul sans regarder : n = 6, trois types équiprobables, deux fautes de chaque type.</p>
<div class="sol">6! ÷ (2! 2! 2!) = 90. (1/3)⁶ = 1/729. 90 ÷ 729 = <b>0,1235</b>.</div></div>
<div data-lab="calc" data-r="0.135" data-tol="0.002"><p>n = 5 défaillances ; p₁ = 0,5 ; p₂ = 0,3 ; p₃ = 0,2. Probabilité d’avoir 2 fautes f₁, 2 fautes f₂ et 1 faute f₃ ?</p>
<div class="sol">5! ÷ (2! 2! 1!) = 120 ÷ 4 = 30. 0,5² × 0,3² × 0,2 = 0,25 × 0,09 × 0,2 = 0,0045. 30 × 0,0045 = <b>0,135</b>.</div></div>
<div data-lab="calc" data-r="0.3125" data-tol="0.003"><p>Mêmes données (n = 5, p₁ = 0,5). Probabilité d’avoir exactement 2 fautes de type f₁ ?</p>
<div class="sol">Binomiale B(5 ; 0,5) : C(5, 2) × 0,5² × 0,5³ = 10 × 0,03125 = <b>0,3125</b>.</div></div>
<div data-lab="calc" data-r="0.2634" data-tol="0.003"><p>n = 6, trois types équiprobables. Probabilité d’avoir <b>exactement une</b> faute de type f₁ ?</p>
<div class="sol">B(6 ; 1/3) : C(6, 1) × (1/3) × (2/3)⁵ = 6 × 32 ÷ 729 = 192 ÷ 729 ≈ <b>0,2634</b>.</div></div>` },

{ id: '6.6', t: 'Loi hypergéométrique : tirer sans remise', h: `
<p>Dans la binomiale, les essais sont indépendants (tirage <b>avec</b> remise, ou lot « très important »). Si on prélève un échantillon <b>sans remise</b> dans un petit lot, la probabilité change à chaque tirage : on compte alors des combinaisons.</p>
<div class="ex"><b>Contrôle de production.</b> On prélève au hasard k pièces dans une production de N pièces qui en contient n défectueuses. Probabilité d’avoir exactement j défectueuses dans l’échantillon :</div>
<div class="f">P(A<sub>j</sub>) = [[C(n, j) × C(N − n, k − j)//C(N, k)]]<small>Au numérateur : on choisit j pièces parmi les n défectueuses <b>et</b> k − j parmi les N − n bonnes. Au dénominateur : tous les échantillons possibles de taille k.</small></div>
<div data-lab="calc" data-r="0.4605" data-tol="0.005"><p>Un lot de 20 pièces en contient 5 défectueuses. On en prélève 3 sans remise. Probabilité d’avoir exactement une défectueuse ?</p>
<div class="sol">C(5, 1) × C(15, 2) ÷ C(20, 3) = 5 × 105 ÷ 1140 = 525 ÷ 1140 ≈ <b>0,4605</b>.</div></div>
<div data-lab="calc" data-r="0.3991" data-tol="0.004"><p>Même lot, même prélèvement. Probabilité de n’avoir aucune pièce défectueuse ?</p>
<div class="sol">C(15, 3) ÷ C(20, 3) = 455 ÷ 1140 ≈ <b>0,3991</b>.</div></div>
<div class="tip">Le mot qui décide : « <b>avec remise</b> » ou « lot très important » → binomiale. « <b>sans remise</b> », « on prélève un échantillon dans un lot de N pièces » → hypergéométrique.</div>` },

{ id: '6.7', t: 'Loi de Poisson : compter des pannes sur une durée', h: `
<div class="def">La <b>loi de Poisson</b> P(λ) donne la probabilité d’observer k événements quand ils surviennent <b>au hasard dans le temps</b> avec un nombre <b>moyen</b> λ sur la période étudiée.</div>
<div class="f">P(X = k) = e<sup>−λ</sup> × [[λ<sup>k</sup>//k!]] &nbsp;&nbsp; pour k = 0, 1, 2, …<small>E(X) = λ &nbsp;·&nbsp; Var(X) = λ. En particulier P(X = 0) = e<sup>−λ</sup>.</small></div>
<div class="warn"><b>Le paramètre doit correspondre à la durée de la question.</b> Si le taux est donné par mois et que la question porte sur un an, le paramètre est taux × 12. Si le taux est par semaine et la question par jour, c’est taux ÷ 7.</div>
<div class="meth"><ol><li>Repère le <b>taux</b> (pannes par unité de temps) et la <b>durée</b> de la question.</li>
<li>Calcule le nombre moyen : <b>λt = taux × durée</b>, dans la même unité.</li>
<li>Applique P(X = k) = e<sup>−λt</sup>(λt)<sup>k</sup> ÷ k!.</li></ol></div>
<div class="exam"><b>Devoir 2025, exercice 2, question 2 (1 point).</b> Le serveur tombe en panne selon une loi exponentielle de facteur λ = 0,5 par mois. Probabilité de subir 3 pannes en une année ?
<p>Quand le temps entre deux pannes est exponentiel de paramètre λ, le <b>nombre</b> de pannes sur une durée t suit une loi de Poisson de paramètre λt. Ici λt = 0,5 × 12 = 6.</p>
<p>P(X = 3) = e<sup>−6</sup> × 6³ ÷ 3! = e<sup>−6</sup> × 216 ÷ 6 = 36 e<sup>−6</sup> ≈ <b>0,0892</b>.</p></div>
<div class="ex"><b>TD 2, exercice 12.</b> Une machine subit 10 micro-pannes par semaine. Probabilité de 0 micro-panne en un jour : λ = 10/7 par jour, P(X = 0) = e<sup>−10/7</sup> ≈ 0,24.</div>
<div data-lab="calc" data-r="0.0892" data-tol="0.001"><p>Refais-le : taux 0,5 panne par mois ; probabilité d’exactement 3 pannes en 12 mois.</p>
<div class="sol">λt = 6. P = e<sup>−6</sup> × 6³ ÷ 6 = 36 × 0,002479 = <b>0,0892</b>.</div></div>
<div data-lab="calc" data-r="0.1353" data-tol="0.002"><p>Une machine subit en moyenne 2 pannes par mois. Probabilité de ne subir aucune panne pendant un mois ?</p>
<div class="sol">P(X = 0) = e<sup>−2</sup> ≈ <b>0,1353</b>.</div></div>
<div data-lab="calc" data-r="0.6767" data-tol="0.006"><p>Même machine (2 pannes par mois en moyenne). Probabilité d’avoir <b>au plus</b> 2 pannes dans le mois ?</p>
<div class="sol">P(0) + P(1) + P(2) = e<sup>−2</sup>(1 + 2 + 2²/2) = 5 e<sup>−2</sup> ≈ <b>0,6767</b>.</div></div>
<div data-lab="calc" data-r="0.9502" data-tol="0.005"><p>Un serveur subit en moyenne 0,25 panne par mois. Probabilité d’avoir <b>au moins une</b> panne en un an ?</p>
<div class="ind">Paramètre sur un an : 0,25 × 12.</div>
<div class="sol">λt = 3. P(X ≥ 1) = 1 − P(X = 0) = 1 − e<sup>−3</sup> = 1 − 0,0498 = <b>0,9502</b>.</div></div>
<h4>Approcher une binomiale (remarque du corrigé du TD)</h4>
<p>Quand n est grand (n ≥ 30), le calcul direct d’une binomiale devient lourd. On l’approche par :</p>
<ul>
<li>la loi de <b>Poisson</b> de paramètre n p, si p ≤ 0,1 et n p &lt; 15 ;</li>
<li>la loi <b>normale</b> N(n p ; √(n p (1 − p))), si n p ≥ 15 et n p (1 − p) &gt; 5.</li>
</ul>` },

{ id: '6.8', t: 'Deux processus, six lois : le tableau du cours', h: `
<p>Le cours range les lois autour de deux <b>processus aléatoires sans mémoire</b>.</p>
<div class="tw"><table>
<thead><tr><th></th><th>Processus de Bernoulli</th><th>Processus de Poisson</th></tr></thead>
<tbody>
<tr><th>Temps</th><td><b>discret</b> : un essai par jour, par tirage</td><td><b>continu</b> : une panne peut arriver à tout instant</td></tr>
<tr><th>Taux d’arrivée</th><td>p par expérience</td><td>λ par unité de temps</td></tr>
<tr><th>Nombre d’arrivées</th><td>loi <b>binomiale</b></td><td>loi de <b>Poisson</b></td></tr>
<tr><th>Temps entre deux arrivées</th><td>loi <b>géométrique</b></td><td>loi <b>exponentielle</b></td></tr>
<tr><th>Temps de la k-ième arrivée</th><td>loi de <b>Pascal</b></td><td>loi d’<b>Erlang</b></td></tr>
</tbody></table></div>
<div class="tip">Les deux colonnes se répondent ligne par ligne. Le devoir 2023 a posé toute la colonne de gauche (binomiale, géométrique, Pascal). Les devoirs 2024 et 2025 ont pris la colonne de droite (exponentielle, Poisson, Erlang). L’exponentielle et Erlang sont au <a href="#/ch/7/cours/7.3">chapitre 7</a>.</div>
<p>Un troisième processus est cité : le <b>processus de Markov</b>, où l’état actuel ne dépend que de l’état précédent.</p>
<div data-lab="relier"><p>Quelle loi pour quelle question ?</p>
<dl><dt>Nombre de pannes dans une semaine de 5 jours, p par jour</dt><dd>Binomiale</dd>
<dt>Jour de la première panne, p par jour</dt><dd>Géométrique</dd>
<dt>Jour de la troisième panne, p par jour</dt><dd>Pascal</dd>
<dt>Nombre de pannes en un an, λ par mois</dt><dd>Poisson</dd>
<dt>Temps avant la prochaine panne, λ par heure</dt><dd>Exponentielle</dd>
<dt>Temps jusqu’à la n-ième panne, λ par heure</dt><dd>Erlang</dd>
<dt>k₁, k₂, k₃ fautes de trois types parmi n</dt><dd>Multinomiale</dd></dl></div>` },

{ id: '6.9', t: 'L’exercice des liens de communication', h: `
<div class="exam"><b>Devoirs 2021 et 2024 (5 points).</b> Un diagramme montre <b>huit liens</b> a, b, c, d, e, f, g, h entre deux stations A et B. Les défaillances des liens sont indépendantes ; à chaque instant un lien fonctionne avec la probabilité p.</div>
<p>Lecture du schéma : trois liens partent de A (b vers le nœud du haut, c vers le nœud du milieu, d vers le nœud du bas) ; deux liens arrivent en B (g depuis le haut, h depuis le milieu) ; e relie haut et milieu, f relie milieu et bas, a relie haut et bas par l’extérieur.</p>
<div class="tw"><table><thead><tr><th>Lien</th><th>relie</th><th>Lien</th><th>relie</th></tr></thead><tbody>
<tr><td>b</td><td>A — haut</td><td>g</td><td>haut — B</td></tr>
<tr><td>c</td><td>A — milieu</td><td>h</td><td>milieu — B</td></tr>
<tr><td>d</td><td>A — bas</td><td>e</td><td>haut — milieu</td></tr>
<tr><td>a</td><td>haut — bas</td><td>f</td><td>milieu — bas</td></tr>
</tbody></table></div>
<p><b>1) Exactement deux liens fonctionnent.</b> Huit essais de Bernoulli indépendants : le nombre X de liens en marche suit B(8, p).</p>
<div class="f">P(X = 2) = C(8, 2) p²(1 − p)⁶ = <b>28 p²(1 − p)⁶</b></div>
<p><b>2) Exactement le lien g et un autre lien fonctionnent.</b> g fonctionne (p) ; parmi les 7 autres, exactement un fonctionne : C(7, 1) p (1 − p)⁶.</p>
<div class="f">p × 7 p (1 − p)⁶ = <b>7 p²(1 − p)⁶</b></div>
<p><b>3) Sachant que six liens sont en panne, A communique encore avec B.</b> Six en panne sur huit, donc exactement deux fonctionnent. Les 28 paires ont toutes la même probabilité p²(1 − p)⁶ : sachant X = 2, elles sont <b>équiprobables</b>. Il reste à compter les paires qui forment un chemin de A à B. Un chemin de deux liens passe par un seul nœud intermédiaire : par le haut, <b>{b, g}</b> ; par le milieu, <b>{c, h}</b>. Le bas n’a pas de lien direct vers B.</p>
<div class="f">P(A communique avec B | X = 2) = [[2 p²(1 − p)⁶//28 p²(1 − p)⁶]] = [[2//28]] = <b>[[1//14]]</b> ≈ 0,071</div>
<div class="plus">Corrigé rédigé par moi à partir du schéma du sujet (il n’y a pas de corrigé officiel). Sur ta copie, redessine le graphe avec ses nœuds avant de compter les chemins : si ta lecture du schéma diffère, le correcteur verra au moins ta méthode.</div>
<div data-lab="calc" data-r="0.1094" data-tol="0.0015"><p>Avec p = 0,5, probabilité qu’exactement deux des huit liens fonctionnent ?</p>
<div class="sol">28 × 0,5² × 0,5⁶ = 28 ÷ 256 ≈ <b>0,1094</b>.</div></div>
<div data-lab="calc" data-r="0.25"><p>Sachant qu’exactement deux liens fonctionnent, probabilité que le lien g soit l’un des deux ?</p>
<div class="ind">Divise le résultat de la question 2 par celui de la question 1.</div>
<div class="sol">7 p²(1 − p)⁶ ÷ 28 p²(1 − p)⁶ = 7/28 = <b>0,25</b>. Autre lecture : parmi les 28 paires, 7 contiennent g.</div></div>
<div data-lab="calc" data-r="4"><p>Combien y a-t-il de chemins de A à B utilisant exactement <b>trois</b> liens ?</p>
<div class="ind">Un chemin de trois liens passe par deux nœuds intermédiaires différents, le second étant relié à B (haut ou milieu).</div>
<div class="sol">A–milieu–haut–B : {c, e, g}. A–bas–haut–B : {d, a, g}. A–haut–milieu–B : {b, e, h}. A–bas–milieu–B : {d, f, h}. Soit <b>4</b> chemins.</div></div>` },

{ id: '6.10', t: 'Choisir la bonne loi', h: `
<div class="meth"><ol>
<li><b>Que compte-t-on ?</b> Un nombre de succès, un rang (quand ?), ou un nombre d’événements dans le temps ?</li>
<li><b>Le temps est-il discret</b> (jours, tirages, pièces) <b>ou continu</b> (heures, mois avec un taux λ) ?</li>
<li><b>Combien d’issues</b> par essai : deux (binomiale) ou plus (multinomiale) ?</li>
<li><b>Avec ou sans remise ?</b> Sans remise dans un petit lot : hypergéométrique.</li>
</ol></div>
<div class="tw"><table>
<thead><tr><th>Loi</th><th>P(X = k)</th><th>Espérance</th><th>Variance</th></tr></thead>
<tbody>
<tr><th>Bernoulli B(p)</th><td>p si k = 1 ; 1 − p si k = 0</td><td>p</td><td>p(1 − p)</td></tr>
<tr><th>Binomiale B(n, p)</th><td>C(n, k) p<sup>k</sup>(1 − p)<sup>n−k</sup></td><td>n p</td><td>n p (1 − p)</td></tr>
<tr><th>Géométrique G(p)</th><td>p(1 − p)<sup>k−1</sup></td><td>1/p</td><td>(1 − p)/p²</td></tr>
<tr><th>Pascal (k-ième succès au rang n)</th><td>C(n − 1, k − 1) p<sup>k</sup>(1 − p)<sup>n−k</sup></td><td>k/p</td><td>k(1 − p)/p²</td></tr>
<tr><th>Poisson P(λ)</th><td>e<sup>−λ</sup> λ<sup>k</sup>/k!</td><td>λ</td><td>λ</td></tr>
</tbody></table></div>
<div data-lab="choix" data-a="1"><p>« On utilise 4 résistances par carte, prises dans un très grand lot dont 5 % sont défaillantes. Probabilité d’avoir 3 résistances défaillantes sur une carte ? »</p>
<ul><li>Poisson de paramètre 0,05</li><li>Binomiale B(4 ; 0,05)</li><li>Géométrique G(0,05)</li><li>Hypergéométrique</li></ul>
<div class="sol">Quatre essais indépendants (lot très grand), deux issues : binomiale. P = C(4, 3) × 0,05³ × 0,95 ≈ 0,000475 (TD 2, exercice 11).</div></div>
<div data-lab="choix" data-a="0"><p>« Un questionnaire de 20 questions à deux réponses ; le candidat répond au hasard. Probabilité d’au moins 16 bonnes réponses ? »</p>
<ul><li>Binomiale B(20 ; 0,5) : somme de P(X = 16) à P(X = 20)</li><li>Poisson de paramètre 16</li><li>Pascal avec k = 16</li><li>Multinomiale</li></ul>
<div class="sol">TD 2, exercice 7 : (C(20,16) + C(20,17) + C(20,18) + C(20,19) + C(20,20)) ÷ 2²⁰ = 6196 ÷ 1 048 576 ≈ 0,006.</div></div>` }
],
glossaire: [
  ['Factorielle n!', 'Factorial', 'n × (n − 1) × … × 1 : nombre d’ordres possibles de n objets.'],
  ['Combinaison C(n, k)', 'Binomial coefficient', 'nombre de façons de choisir k objets parmi n, sans ordre.'],
  ['Coefficient multinomial', 'Multinomial coefficient', 'n!/(k₁! … kₘ!) : répartitions de n objets en m groupes de tailles fixées.'],
  ['Variable aléatoire', 'Random variable', 'nombre associé au résultat d’une expérience aléatoire.'],
  ['Loi de probabilité', 'Distribution', 'les valeurs possibles de X et leurs probabilités.'],
  ['Fonction de répartition', 'Cumulative distribution function', 'F(x) = P(X ≤ x).'],
  ['Espérance', 'Expected value', 'E(X) = Σ x P(X = x) : moyenne attendue.'],
  ['Variance', 'Variance', 'Var(X) = E(X²) − E(X)² : dispersion.'],
  ['Écart type', 'Standard deviation', 'σ = √Var(X).'],
  ['Épreuve de Bernoulli', 'Bernoulli trial', 'expérience à deux issues, succès de probabilité p.'],
  ['Loi binomiale', 'Binomial distribution', 'nombre de succès en n épreuves indépendantes.'],
  ['Loi géométrique', 'Geometric distribution', 'rang du premier succès.'],
  ['Loi de Pascal', 'Negative binomial', 'rang du k-ième succès.'],
  ['Loi multinomiale', 'Multinomial distribution', 'effectifs de m issues en n épreuves indépendantes.'],
  ['Loi hypergéométrique', 'Hypergeometric distribution', 'nombre d’objets marqués dans un échantillon tiré sans remise.'],
  ['Loi de Poisson', 'Poisson distribution', 'nombre d’événements sur une durée, de moyenne λ.'],
  ['Processus de Bernoulli', 'Bernoulli process', 'suite d’épreuves de Bernoulli indépendantes, à temps discret.'],
  ['Processus de Poisson', 'Poisson process', 'arrivées au hasard en temps continu, au taux λ, sans mémoire.']
],
formules: [
  ['Combinaison', 'C(n, k) = [[n!//k! (n − k)!]]', 'C(n, k) = C(n, n − k).'],
  ['Espérance', 'E(X) = Σ x<sub>k</sub> P(X = x<sub>k</sub>)', ''],
  ['Variance', 'Var(X) = E(X²) − E(X)²', ''],
  ['Binomiale', 'P(X = k) = C(n, k) p<sup>k</sup>(1 − p)<sup>n−k</sup>', 'E = n p ; Var = n p (1 − p).'],
  ['Au moins un succès', '1 − (1 − p)<sup>n</sup>', ''],
  ['Géométrique', 'P(X = k) = p (1 − p)<sup>k−1</sup>', 'E = 1/p.'],
  ['Pascal', 'P(X<sub>k</sub> = n) = C(n − 1, k − 1) p<sup>k</sup>(1 − p)<sup>n−k</sup>', 'E = k/p.'],
  ['Multinomiale', '[[n!//k₁! k₂! k₃!]] p₁<sup>k₁</sup> p₂<sup>k₂</sup> p₃<sup>k₃</sup>', 'k₁ + k₂ + k₃ = n.'],
  ['Hypergéométrique', '[[C(n, j) × C(N − n, k − j)//C(N, k)]]', 'tirage sans remise.'],
  ['Poisson', 'P(X = k) = e<sup>−λ</sup> [[λ<sup>k</sup>//k!]]', 'E = Var = λ ; sur une durée t, remplacer λ par λt.'],
  ['Liens : exactement 2 sur 8', '28 p²(1 − p)⁶', 'devoirs 2021 et 2024.']
],
resume: [
  'C(n, k) = n! ÷ (k!(n − k)!) : choisir k parmi n.',
  'E(X) = Σ x P(X = x) ; Var(X) = E(X²) − E(X)².',
  '<b>Binomiale</b> : nombre de succès en n essais indépendants ; « au moins un » = 1 − (1 − p)<sup>n</sup>.',
  '<b>Géométrique</b> : rang du premier succès, p(1 − p)<sup>k−1</sup>.',
  '<b>Pascal</b> : rang du k-ième succès, C(n − 1, k − 1) p<sup>k</sup>(1 − p)<sup>n−k</sup>.',
  '<b>Multinomiale</b> : plus de deux issues ; un seul type isolé redonne une binomiale.',
  '<b>Poisson</b> : nombre d’événements sur une durée, paramètre = taux × durée.',
  'Bernoulli (temps discret) : binomiale, géométrique, Pascal. Poisson (temps continu) : Poisson, exponentielle, Erlang.',
  'Liens : 28 p²(1 − p)⁶ ; 7 p²(1 − p)⁶ ; 1/14.'
],
pieges: [
  'Écrire C(n, k) au lieu de C(n − 1, k − 1) dans la loi de Pascal.',
  'Mettre l’exposant k au lieu de k − 1 dans la loi géométrique.',
  'Utiliser le taux par mois comme paramètre de Poisson alors que la question porte sur un an.',
  'Garder la multinomiale quand la question ne concerne plus qu’un seul type : c’est une binomiale.',
  'Oublier le coefficient (10, 28, 90…) devant les puissances.',
  'Calculer « au moins un » en additionnant tous les cas au lieu de 1 − P(aucun).'
],
cartes: [
  ['Formule de C(n, k) ?', 'n! ÷ (k! × (n − k)!).'],
  ['C(5, 3) ? C(8, 2) ? C(6, 2) ? C(4, 2) ?', '10 ; 28 ; 15 ; 6.'],
  ['Espérance d’une variable discrète ?', 'E(X) = Σ x × P(X = x).'],
  ['Variance (formule pratique) ?', 'Var(X) = E(X²) − E(X)².'],
  ['Loi binomiale : formule, espérance, variance ?', 'C(n, k) p^k (1 − p)^(n − k) ; n p ; n p (1 − p).'],
  ['Trois conditions de la loi binomiale ?', 'Deux issues, même probabilité p à chaque essai, n essais indépendants.'],
  ['Probabilité d’au moins un succès en n essais ?', '1 − (1 − p)^n.'],
  ['Loi géométrique : formule et espérance ?', 'P(X = k) = p(1 − p)^(k − 1) ; E = 1/p.'],
  ['Loi de Pascal : formule ?', 'P(X_k = n) = C(n − 1, k − 1) p^k (1 − p)^(n − k).'],
  ['Pourquoi C(n − 1, k − 1) dans Pascal ?', 'Le dernier essai est forcément un succès ; on place les k − 1 autres parmi les n − 1 premiers essais.'],
  ['Loi multinomiale : formule ?', 'n! ÷ (k₁! k₂! k₃!) × p₁^k₁ p₂^k₂ p₃^k₃.'],
  ['Fautes f₁, f₂, f₃ : probabilité de m fautes f₁ parmi n ?', 'Binomiale : C(n, m) p₁^m (1 − p₁)^(n − m).'],
  ['Devoir fautes : n = 6, p = 1/3, k = 2, 2, 2 ?', '90 ÷ 729 = 10/81 ≈ 0,1235.'],
  ['Devoir fautes : 2 fautes f₁ parmi 6, p₁ = 1/3 ?', '15 × (1/3)² × (2/3)⁴ = 80/243 ≈ 0,3292.'],
  ['Loi de Poisson : formule, espérance, variance ?', 'e^(−λ) λ^k ÷ k! ; λ ; λ.'],
  ['Taux 0,5 panne par mois : paramètre de Poisson sur un an ?', '0,5 × 12 = 6.'],
  ['Logiciel, 5 jours, panne p : P(3 pannes) ? P(au moins une) ?', '10 p³(1 − p)² ; 1 − (1 − p)⁵.'],
  ['Logiciel : 1re panne le 3e jour ? 3e panne le 5e jour ?', 'p(1 − p)² ; 6 p³(1 − p)².'],
  ['Processus de Bernoulli : les trois lois ?', 'Binomiale (nombre), géométrique (attente), Pascal (k-ième arrivée).'],
  ['Processus de Poisson : les trois lois ?', 'Poisson (nombre), exponentielle (attente), Erlang (k-ième arrivée).'],
  ['Liens : exactement deux sur huit fonctionnent ?', '28 p²(1 − p)⁶.'],
  ['Liens : A communique avec B sachant six liens en panne ?', '2 paires utiles ({b, g} et {c, h}) sur 28 : 1/14.'],
  ['Loi hypergéométrique : quand ?', 'Tirage sans remise d’un échantillon dans un lot fini : C(n, j) C(N − n, k − j) ÷ C(N, k).'],
  ['Quand approcher une binomiale par Poisson ?', 'n ≥ 30, p ≤ 0,1 et n p < 15 ; paramètre n p.']
],
quiz: [
  { q: 'C(8, 2) vaut :', o: ['28', '56', '16', '64'], a: 0, e: '(8 × 7) ÷ 2 = 28.' },
  { q: 'Un logiciel tourne 5 jours par semaine, panne chaque jour avec probabilité p. P(3 pannes dans la semaine) ?', o: ['10 p³(1 − p)²', '6 p³(1 − p)²', 'p³(1 − p)²', '5 p³(1 − p)²'], a: 0, e: 'Binomiale B(5, p) avec C(5, 3) = 10.' },
  { q: 'Même logiciel. Probabilité d’au moins une panne dans la semaine ?', o: ['1 − (1 − p)⁵', '5p', '(1 − p)⁵', '1 − p⁵'], a: 0, e: '1 − P(aucune panne).' },
  { q: 'Même logiciel. Probabilité que la première panne arrive le 3ᵉ jour ?', o: ['p(1 − p)²', 'p(1 − p)³', '3p(1 − p)²', 'p³'], a: 0, e: 'Géométrique : deux jours sans panne puis une panne.' },
  { q: 'Même logiciel. Probabilité que la 3ᵉ panne arrive le 5ᵉ jour ?', o: ['6 p³(1 − p)²', '10 p³(1 − p)²', '3 p³(1 − p)²', 'p³(1 − p)²'], a: 0, e: 'Pascal : C(4, 2) = 6.' },
  { q: 'n défaillances, trois types de fautes de probabilités p₁, p₂, p₃. La loi du vecteur (k₁, k₂, k₃) est :', o: ['multinomiale', 'binomiale', 'de Poisson', 'géométrique'], a: 0, e: 'Plus de deux issues par essai.' },
  { q: 'n = 6, p₁ = p₂ = p₃ = 1/3. P(2, 2, 2) ?', o: ['10/81 ≈ 0,1235', '1/729', '80/243 ≈ 0,329', '1/3'], a: 0, e: '90 × (1/3)⁶ = 90/729.' },
  { q: 'Mêmes données. P(exactement 2 fautes de type f₁) ?', o: ['80/243 ≈ 0,329', '10/81 ≈ 0,1235', '1/9', '15/729'], a: 0, e: 'Binomiale B(6, 1/3) : 15 × (1/9) × (16/81).' },
  { q: 'Taux de panne 0,5 par mois. Loi du nombre de pannes en un an ?', o: ['Poisson de paramètre 6', 'Poisson de paramètre 0,5', 'Exponentielle de paramètre 6', 'Binomiale B(12 ; 0,5)'], a: 0, e: 'Paramètre = taux × durée.' },
  { q: 'Poisson de paramètre 6 : P(X = 3) ?', o: ['36 e⁻⁶ ≈ 0,089', '6 e⁻⁶ ≈ 0,015', 'e⁻⁶ ≈ 0,0025', '216 e⁻⁶ ≈ 0,535'], a: 0, e: '6³ ÷ 3! = 216 ÷ 6 = 36.' },
  { q: 'Huit liens indépendants, chacun fonctionne avec probabilité p. P(exactement deux fonctionnent) ?', o: ['28 p²(1 − p)⁶', '8 p²(1 − p)⁶', '28 p⁶(1 − p)²', '2 p²'], a: 0, e: 'Binomiale B(8, p).' },
  { q: 'Mêmes liens. P(exactement g et un autre lien fonctionnent) ?', o: ['7 p²(1 − p)⁶', '28 p²(1 − p)⁶', 'p²(1 − p)⁶', '8 p(1 − p)⁷'], a: 0, e: 'g fonctionne, et un seul des sept autres.' },
  { q: 'Quelles lois appartiennent au processus de Bernoulli (temps discret) ?', o: ['Binomiale', 'Géométrique', 'Pascal', 'Exponentielle'], a: [0, 1, 2], e: 'L’exponentielle appartient au processus de Poisson (temps continu).' },
  { q: 'Dans un processus de Poisson, le temps entre deux arrivées suit une loi :', o: ['exponentielle', 'géométrique', 'binomiale', 'de Pascal'], a: 0, e: 'Et le temps de la k-ième arrivée suit une loi d’Erlang.' },
  { q: 'Espérance d’une loi binomiale B(500 ; 0,02) ?', o: ['10', '9,8', '25', '0,02'], a: 0, e: 'n p = 10.' },
  { q: 'Espérance d’une loi géométrique de paramètre p = 0,25 ?', o: ['4', '0,25', '3', '16'], a: 0, e: '1/p = 4 essais en moyenne.' },
  { q: 'Quelles affirmations sur la loi de Poisson sont vraies ?', o: ['Son espérance vaut λ', 'Sa variance vaut λ', 'P(X = 0) = e⁻λ', 'Ses valeurs vont de 1 à n'], a: [0, 1, 2], e: 'Ses valeurs sont tous les entiers à partir de 0, sans borne supérieure.' },
  { q: 'On prélève 3 pièces sans remise dans un lot de 20 dont 5 défectueuses. La loi du nombre de défectueuses est :', o: ['hypergéométrique', 'binomiale', 'de Poisson', 'géométrique'], a: 0, e: 'Sans remise dans un petit lot : les tirages ne sont pas indépendants.' },
  { q: 'X vaut 0, 1, 2 avec probabilités 0,5 ; 0,3 ; 0,2. E(X) ?', o: ['0,7', '1', '0,5', '1,1'], a: 0, e: '0 + 0,3 + 0,4 = 0,7.' },
  { q: 'p = 0,2. « La deuxième panne arrive le 6ᵉ jour » :', o: ['C(5, 1) × 0,2² × 0,8⁴', 'C(6, 2) × 0,2² × 0,8⁴', '0,8⁵ × 0,2', 'C(5, 2) × 0,2² × 0,8³'], a: 0, e: 'Pascal : C(n − 1, k − 1) avec n = 6, k = 2.' }
],
exos: [
  { t: 'Devoir 2023, exercice 2 complet', n: 'devoir · 5 points', e: `<p>On exécute un logiciel chaque jour ouvrable de la semaine. Il peut subir chaque jour une panne avec une probabilité p.</p>
<ol><li>Probabilité qu’il subisse k pannes par semaine ? A.N. : k = 3.</li><li>Probabilité qu’il subisse au moins une panne par semaine ?</li><li>Probabilité que le nombre de jours nécessaires pour avoir une première panne soit égal à k ? A.N. : k = 3.</li><li>Probabilité que le nombre de jours nécessaires pour avoir la k-ième panne soit égal à n ? A.N. : n = 5, k = 3.</li></ol>`,
    s: `<ol><li>Chaque jour est une épreuve de Bernoulli (panne avec probabilité p), répétée 5 fois de façon indépendante. X, nombre de pannes, suit une loi <b>binomiale</b> : P(X = k) = C(5, k) p<sup>k</sup>(1 − p)<sup>5−k</sup>. A.N. : P(X = 3) = [5! ÷ (3! 2!)] p³(1 − p)² = <b>10 p³(1 − p)²</b>. <i>(1,5 point)</i></li>
<li>P(X ≥ 1) = 1 − P(X = 0) = <b>1 − (1 − p)⁵</b>. <i>(1 point)</i></li>
<li>Y, rang de la première panne, suit une loi <b>géométrique</b> : P(Y = k) = p(1 − p)<sup>k−1</sup>. A.N. : P(Y = 3) = <b>p(1 − p)²</b>. <i>(1 point)</i></li>
<li>Z<sub>k</sub>, rang de la k-ième panne, suit une loi de <b>Pascal</b> : P(Z<sub>k</sub> = n) = C(n − 1, k − 1) p<sup>k</sup>(1 − p)<sup>n−k</sup>. A.N. : C(4, 2) = 6, donc P(Z₃ = 5) = <b>6 p³(1 − p)²</b>. <i>(1,5 point)</i></li></ol>
<p>Corrigé officiel, sauf la question 3 où il écrit p(1 − p)³ (voir la remarque en 6.4).</p>` },
  { t: 'Devoir 2025, exercice 1 : trois types de fautes', n: 'devoir · 5 points', e: `<p>Le test révèle n défaillances dues à trois types de fautes f₁, f₂, f₃ de probabilités p₁, p₂, p₃ (somme 1).</p>
<ol><li>Probabilité d’avoir k₁, k₂, k₃ fautes de chaque type (k₁ + k₂ + k₃ = n) ?</li><li>A.N. : n = 6, p₁ = p₂ = p₃ = 1/3, k₁ = k₂ = k₃ = 2.</li><li>Probabilité d’avoir m fautes de type f₁ ?</li><li>A.N. : m = 2.</li></ol>`,
    s: `<ol><li>Le vecteur (X₁, X₂, X₃) des nombres de fautes de chaque type suit une loi <b>multinomiale</b> : P(X₁ = k₁, X₂ = k₂, X₃ = k₃) = [[n!//k₁! k₂! k₃!]] p₁<sup>k₁</sup> p₂<sup>k₂</sup> p₃<sup>k₃</sup>. <i>(2 points)</i></li>
<li>[[6!//2! 2! 2!]] (1/3)⁶ = 90/729 = 10/81 ≈ <b>0,1235</b>. <i>(1 point)</i></li>
<li>X₁ suit une loi <b>binomiale</b> B(n, p₁) : P(X₁ = m) = C(n, m) p₁<sup>m</sup>(1 − p₁)<sup>n−m</sup>. <i>(1 point)</i></li>
<li>C(6, 2) (1/3)²(2/3)⁴ = 15 × 16/729 = 80/243 ≈ <b>0,3292</b>. <i>(1 point)</i></li></ol>
<p>Corrigé officiel de 2023, où cet exercice est identique.</p>` },
  { t: 'Devoir 2024, exercice 3 : les liens', n: 'devoir · 5 points', e: `<p>Huit liens de communication a à h, indépendants, chacun fonctionnant avec la probabilité p. Schéma : b, c, d partent de A vers les nœuds haut, milieu, bas ; g et h arrivent en B depuis haut et milieu ; e relie haut et milieu ; f relie milieu et bas ; a relie haut et bas.</p>
<ol><li>Probabilité qu’exactement deux liens fonctionnent ?</li><li>Probabilité qu’exactement le lien g et un autre lien fonctionnent ?</li><li>Sachant que six liens sont en panne, probabilité que A soit encore en communication avec B ?</li></ol>`,
    s: `<ol><li>X, nombre de liens en marche, suit B(8, p). P(X = 2) = C(8, 2) p²(1 − p)⁶ = <b>28 p²(1 − p)⁶</b>.</li>
<li>g fonctionne (p), exactement un des sept autres fonctionne (7 p (1 − p)⁶) : <b>7 p²(1 − p)⁶</b>.</li>
<li>Sachant X = 2, les 28 paires sont équiprobables. A communique avec B si la paire forme un chemin : {b, g} ou {c, h}. P = 2/28 = <b>1/14</b>.</li></ol>
<p><small>Corrigé rédigé par moi d’après le schéma ; pas de corrigé officiel.</small></p>` },
  { t: 'TD 2, exercice 5 : la classe', n: 'TD', e: `<p>30 élèves : 20 lisent la rubrique sportive, 14 pratiquent un sport, 8 font les deux. On interroge 6 élèves au hasard, avec remise. X : nombre d’élèves s’intéressant au sport parmi les 6.</p>
<ol><li>Combien d’élèves ne s’intéressent pas au sport ?</li><li>Probabilité qu’un élève s’intéresse au sport ?</li><li>Loi de X ?</li><li>Probabilité que les 6 s’y intéressent ? qu’aucun ? que deux exactement ?</li></ol>`,
    s: `<ol><li>S’intéressent au sport (lisent ou pratiquent) : 20 + 14 − 8 = 26. Ne s’y intéressent pas : 30 − 26 = <b>4</b>.</li>
<li>p = 26/30 ≈ <b>0,867</b>.</li>
<li>Six tirages indépendants (avec remise), deux issues : X suit <b>B(6 ; 26/30)</b>.</li>
<li>P(X = 6) = (26/30)⁶ ≈ <b>0,424</b>. P(X = 0) = (4/30)⁶ ≈ <b>0,000006</b>. P(X = 2) = C(6, 2)(26/30)²(4/30)⁴ ≈ 15 × 0,7511 × 0,000316 ≈ <b>0,0036</b>.</li></ol>
<p><small>Corrigé rédigé par moi (cet exercice n’est pas corrigé dans la série).</small></p>` },
  { t: 'Entraînement : centre d’appels', n: 'application', e: `<p>Un centre reçoit en moyenne 3 appels par minute, au hasard.</p>
<ol><li>Loi du nombre d’appels en une minute ?</li><li>Probabilité de n’avoir aucun appel en une minute ?</li><li>Probabilité d’avoir exactement 2 appels en 30 secondes ?</li></ol>`,
    s: `<ol><li>Poisson de paramètre 3.</li>
<li>P(X = 0) = e<sup>−3</sup> ≈ <b>0,0498</b>.</li>
<li>Sur 30 secondes, le paramètre est 3 × 0,5 = 1,5. P(X = 2) = e<sup>−1,5</sup> × 1,5² ÷ 2 = 0,2231 × 1,125 ≈ <b>0,251</b>.</li></ol>` }
]
});

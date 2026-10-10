REV.chapitres.push({
n: 1, titre: 'Le devoir du professeur décortiqué', en: 'Sept devoirs analysés : 2018 à 2025',
objectifs: [
  'connaître la <b>forme</b> du devoir : durée, nombre d’exercices, barème ;',
  'savoir <b>ce qui tombe</b> et à quelle fréquence, pour répartir ton temps de révision ;',
  'reconnaître en dix secondes les <b>six exercices types</b> et la loi à utiliser ;',
  'rédiger comme le corrigé du professeur pour prendre <b>tous les points</b> ;',
  'connaître ses <b>habitudes de calcul</b> (arrondis, année de 7512 h) ;',
  'savoir quelles <b>questions de cours</b> il pose, et sous quelle forme.'
],
sections: [
{ id: '1.1', t: 'La forme du devoir', h: `
<p>J’ai lu les sept devoirs du dossier (2018-2019 à 2025-2026). Ils ont tous la même forme, donc le tien l’aura très probablement aussi.</p>
<div class="kv"><div>Durée<b>1 h 30</b></div><div>Exercices<b>4</b></div><div>Documents<b>non autorisés</b></div><div>Points par exercice<b>2 à 8</b></div></div>
<div class="def">En bas de chaque sujet : « <b>N.B. : Justifier vos réponses</b> ». Un résultat seul, même juste, ne rapporte pas tous les points. Il faut nommer les événements, écrire la formule, puis faire l’application numérique.</div>
<div class="tw"><table>
<thead><tr><th>Devoir</th><th>Exercice 1</th><th>Exercice 2</th><th>Exercice 3</th><th>Exercice 4</th></tr></thead>
<tbody>
<tr><th>2018</th><td>Arbre et Bayes : deux chaînes de fabrication (5)</td><td>Exponentielle : garantie (5)</td><td>Exponentielle : trois questions courtes (5)</td><td>Série et parallèle (5)</td></tr>
<tr><th>2019</th><td>Arbre et Bayes : trois qualités de pièces (4)</td><td>Exponentielle : R, F, f, MTTF, sans mémoire (5)</td><td>Série, parallèle, 2 sur 3 (5)</td><td><b>QCM de cours</b> (6)</td></tr>
<tr><th>2021</th><td>Liens de communication (5)</td><td>Multinomiale : trois types de fautes (5)</td><td>Weibull, série, parallèle (6)</td><td>Diagramme de fiabilité (4)</td></tr>
<tr><th>2022</th><td>Deux pannes A et B (4)</td><td>Exponentielle : garantie (5)</td><td>Arbre : radar (5)</td><td><b>QCM de cours</b> (6)</td></tr>
<tr><th>2023</th><td>A et B indépendants (2)</td><td>Binomiale, géométrique, Pascal (5)</td><td>Multinomiale : trois types de fautes (5)</td><td><b>QCM de cours</b> (8)</td></tr>
<tr><th>2024</th><td>Deux défauts A et B (5)</td><td>Exponentielle : garantie (5)</td><td>Liens de communication (5)</td><td>Somme d’exponentielles : loi d’Erlang (5)</td></tr>
<tr><th>2025</th><td>Multinomiale : trois types de fautes (5)</td><td>Exponentielle et Poisson (4)</td><td>Arbre, Bayes et vote 2 sur 3 : nœuds IoT (7)</td><td><b>Question de cours rédigée</b> (4)</td></tr>
</tbody></table></div>
<div class="tip">Le professeur <b>réutilise ses exercices</b>. La garantie de 100 heures est tombée en 2018, 2022 et 2024 avec les mêmes chiffres. Les trois types de fautes : 2021, 2023, 2025. Les liens de communication : 2021 et 2024. Les trois questions courtes d’exponentielle de 2018 sont revenues presque mot pour mot en 2025, avec une question de Poisson en plus. Savoir refaire les sept devoirs, c’est déjà connaître une grande partie du prochain.</div>` },

{ id: '1.2', t: 'Ce qui tombe, et à quelle fréquence', h: `
<div class="tw"><table>
<thead><tr><th>Thème</th><th class="c">Devoirs concernés</th><th class="c">Fréquence</th><th>Où le travailler</th></tr></thead>
<tbody>
<tr><th>Probabilités conditionnelles (arbre et Bayes, ou deux événements A et B)</th><td class="c">les sept</td><td class="c"><b>7 / 7</b></td><td><a href="#/ch/5/cours/5.4">chapitre 5</a></td></tr>
<tr><th>Loi exponentielle</th><td class="c">2018, 2019, 2021, 2022, 2024, 2025</td><td class="c"><b>6 / 7</b></td><td><a href="#/ch/7/cours/7.3">chapitre 7</a></td></tr>
<tr><th>Lois discrètes (binomiale, multinomiale, géométrique, Pascal, Poisson)</th><td class="c">2021, 2023, 2024, 2025</td><td class="c"><b>4 / 7</b></td><td><a href="#/ch/6/cours/6.3">chapitre 6</a></td></tr>
<tr><th>Montages : série, parallèle, vote 2 sur 3</th><td class="c">2018, 2019, 2021, 2025</td><td class="c"><b>4 / 7</b></td><td><a href="#/ch/7/cours/7.7">chapitre 7</a></td></tr>
<tr><th>Questions de cours (QCM ou question rédigée)</th><td class="c">2019, 2022, 2023, 2025</td><td class="c"><b>4 / 7</b></td><td>chapitres <a href="#/ch/2/cours/2.2">2</a>, <a href="#/ch/3/cours/3.2">3</a>, <a href="#/ch/4/cours/4.2">4</a></td></tr>
</tbody></table></div>
<p>Quand il y a des questions de cours, elles valent entre <b>4 et 8 points sur 20</b>. Quatre des six derniers devoirs en contiennent (2019, 2022, 2023, 2025 ; pas 2021 ni 2024). Ton professeur a d’ailleurs annoncé qu’il y en aurait cette fois.</p>
<h4>Ce que cela veut dire pour ta note</h4>
<ul>
<li><b>12 à 16 points</b> viennent des calculs de probabilités. Ils sont très répétitifs : cinq ou six formules suffisent, mais il faut les avoir pratiquées jusqu’à ne plus hésiter.</li>
<li><b>4 à 8 points</b> viennent du cours. Ce sont des points « gratuits » si tu connais par cœur trois listes et une quinzaine de définitions.</li>
</ul>
<div class="plus">Les fréquences ci-dessus sont comptées sur sept sujets seulement. Elles indiquent où mettre ton effort ; elles ne garantissent pas le contenu du prochain devoir. Le sujet de 2021 contenait la loi de Weibull et un diagramme de fiabilité, qui relèvent des cours 4 et 5 : ils ne sont pas traités en détail ici puisque ton devoir porte sur les cours 1, 2 et 3.</div>` },

{ id: '1.3', t: 'Les six exercices types', h: `
<p>Chaque exercice des sept devoirs appartient à l’une de ces six familles. La première chose à faire devant un énoncé est de reconnaître la famille.</p>
<div class="tw"><table>
<thead><tr><th>Famille</th><th>Mots de l’énoncé qui la trahissent</th><th>Outil</th></tr></thead>
<tbody>
<tr><th>1. Deux événements A et B</th><td>« au moins un des deux », « aucun des deux », « un seul », « sont-ils indépendants ? »</td><td>P(A ∪ B) = P(A) + P(B) − P(A ∩ B) → <a href="#/ch/5/cours/5.3">5.3</a></td></tr>
<tr><th>2. Arbre et Bayes</th><td>deux étapes : une <b>cause</b> (chaîne A ou B, nœud sain ou compromis) puis un <b>résultat observé</b> ; « sachant que », « dessiner l’arbre »</td><td>probabilités totales puis Bayes → <a href="#/ch/5/cours/5.6">5.6</a></td></tr>
<tr><th>3. Durée de vie</th><td>« loi exponentielle », « durée de vie », « taux λ », « garantie », « encore en fonctionnement »</td><td>R(t) = e<sup>−λt</sup> → <a href="#/ch/7/cours/7.3">7.3</a></td></tr>
<tr><th>4. Comptage d’essais répétés</th><td>« k pannes parmi n », « chaque jour avec probabilité p », « première panne », « trois types de fautes »</td><td>binomiale, géométrique, Pascal, multinomiale, Poisson → <a href="#/ch/6/cours/6.3">6.3</a></td></tr>
<tr><th>5. Montage de composants</th><td>« en série », « en parallèle », « au moins deux sur trois », « composants indépendants »</td><td>produit des fiabilités ou des pannes → <a href="#/ch/7/cours/7.7">7.7</a></td></tr>
<tr><th>6. Cours</th><td>« relier par une flèche », « cocher », « définir », « citer »</td><td>listes et définitions → chapitres 2 à 4</td></tr>
</tbody></table></div>
<div data-lab="choix" data-a="2"><p>« Un logiciel peut subir chaque jour ouvrable une panne avec une probabilité p. Quelle est la probabilité que la <b>première</b> panne arrive le 3ᵉ jour ? » Quelle loi ?</p>
<ul><li>Binomiale</li><li>Poisson</li><li>Géométrique</li><li>Exponentielle</li></ul>
<div class="sol">On attend le <b>premier</b> succès dans une suite d’essais identiques : loi géométrique, P = p(1 − p)². La binomiale compterait le <b>nombre</b> de pannes dans la semaine.</div></div>
<div data-lab="choix" data-a="1"><p>« Un serveur tombe en panne selon une loi exponentielle de facteur λ = 0,5 par mois. Quelle est la probabilité qu’il subisse <b>3 pannes</b> en un an ? » Quelle loi ?</p>
<ul><li>Exponentielle</li><li>Poisson de paramètre 6</li><li>Binomiale B(12 ; 0,5)</li><li>Géométrique</li></ul>
<div class="sol">On compte un <b>nombre de pannes</b> sur une durée : c’est Poisson, de paramètre λ × durée = 0,5 × 12 = 6. L’exponentielle donne le <b>temps</b> entre deux pannes, pas leur nombre.</div></div>
<div data-lab="choix" data-a="0"><p>« n défaillances ont pour origine trois types de fautes, de probabilités p₁, p₂, p₃. Probabilité d’avoir k₁, k₂ et k₃ fautes de chaque type ? »</p>
<ul><li>Multinomiale</li><li>Binomiale</li><li>Hypergéométrique</li><li>Pascal</li></ul>
<div class="sol">Plus de deux résultats possibles à chaque essai : multinomiale. Si la question suivante ne s’intéresse qu’à <b>un</b> type (« m fautes de type f₁ »), on retombe sur la binomiale avec p₁ contre 1 − p₁.</div></div>` },

{ id: '1.4', t: 'Comment il note : le barème observé', h: `
<p>Trois corrigés portent le barème écrit à la main par le professeur (2018, 2019, 2023). On y voit exactement où sont les points.</p>
<div class="tw"><table>
<thead><tr><th>Ce qu’il demande</th><th class="c">Points</th><th>Ce qu’il faut voir sur ta copie</th></tr></thead>
<tbody>
<tr><td>Dessiner l’arbre des probabilités conditionnelles</td><td class="c">1 à 1,5</td><td>les branches avec leurs probabilités <b>et</b> au bout de chaque chemin le produit, par exemple P(S ∩ A) = P(S/A) × P(A) = 0,8 × 0,4 = 0,32</td></tr>
<tr><td>Probabilité totale</td><td class="c">1 à 1,5</td><td>la décomposition écrite : P(S) = P(S ∩ A) + P(S ∩ B)</td></tr>
<tr><td>Chaque probabilité « sachant que »</td><td class="c">0,5 à 1</td><td>P(A/S) = P(S ∩ A) / P(S), puis le nombre</td></tr>
<tr><td>Formule littérale d’une loi (multinomiale, série, parallèle)</td><td class="c">2</td><td>la formule <b>avec les lettres</b>, et le nom de la loi</td></tr>
<tr><td>Application numérique</td><td class="c">0,5 à 1</td><td>les nombres remplacés, puis le résultat</td></tr>
<tr><td>Probabilité conditionnelle sur une exponentielle</td><td class="c">1,5</td><td>la démonstration P(T ≥ t₂ / T ≥ t₁) = R(t₂) / R(t₁) = e<sup>−λ(t₂−t₁)</sup></td></tr>
<tr><td>« Que peut-on en déduire ? »</td><td class="c">0,5</td><td>une phrase d’interprétation (loi sans mémoire, parallèle plus fiable que série…)</td></tr>
</tbody></table></div>
<div class="meth"><ol>
<li><b>Nommer</b> : « Soit A l’événement … ». Le corrigé commence toujours ainsi.</li>
<li><b>Traduire les données</b> en notation : P(A) = 0,4 ; P(S/A) = 0,8.</li>
<li><b>Écrire la formule</b> avec des lettres, en donnant son nom (probabilités totales, Bayes, loi binomiale).</li>
<li><b>Remplacer</b> par les nombres, sur la même ligne.</li>
<li><b>Conclure</b> par le résultat, en nombre et en pourcentage : ≈ 0,36 (36 %).</li>
<li><b>Vérifier</b> quand c’est possible : il écrit lui-même « Vérification : P(E) + P(E<sup>C</sup>) = 1 ».</li>
</ol></div>
<div class="warn">La formule littérale vaut souvent <b>plus</b> que l’application numérique (2 points contre 0,5 en 2018). Si tu manques de temps, écris la formule de chaque question avant de sortir la calculatrice.</div>` },

{ id: '1.5', t: 'Ses notations et ses habitudes de calcul', h: `
<h4>Notations à reprendre sur ta copie</h4>
<ul>
<li>Probabilité conditionnelle : il écrit <b>P(A/B)</b> (parfois P(A | B)) pour « A sachant B ».</li>
<li>Événement contraire : <b>A<sup>C</sup></b>.</li>
<li>Fiabilité <b>R(t)</b> = P(T &gt; t), défaillance <b>F(t)</b> = 1 − R(t), densité <b>f(t)</b>.</li>
<li>Fiabilité conditionnelle : <b>R<sub>t₁</sub>(t₂)</b> = P(T ≥ t₂ / T ≥ t₁).</li>
</ul>
<h4>Il arrondit beaucoup</h4>
<div class="ill">Garantie de 100 heures (2018 et 2022). Le calcul exact donne R(100) = 0,89732. Le corrigé écrit « ≈ 90 % », donc « taux de rejet 10 % », donc 25 pièces sur 250 et 225 pièces survivantes. Le calcul sans arrondi donnerait 25,7 et 224,3.</div>
<p>Conseil : donne la valeur <b>précise</b> puis l’arrondi, par exemple « R(100) = 0,8973 ≈ 90 % ». Tu es alors d’accord avec son corrigé quelle que soit la précision qu’il attend. Dans cette interface, les deux valeurs sont acceptées quand le corrigé du professeur arrondit.</p>
<h4>L’année « 24 h sur 24, 6 jours sur 7 »</h4>
<div class="f">D = (365 − 52) × 24 = 313 × 24 = <b>7512 heures</b><small>Il retire un jour par semaine, soit 52 jours, puis multiplie par 24 heures. C’est la valeur de son corrigé de 2018 ; la question est revenue en 2025.</small></div>
<h4>Coquilles repérées dans ses corrigés</h4>
<ul>
<li><b>Radar (2022)</b> : il écrit 0,01 × 0,05 = 0,005. Le produit vaut <b>0,0005</b>. La probabilité que le radar faille est donc 0,0005 + 0,095 = <b>0,0955</b> et non 0,1.</li>
<li><b>Loi géométrique (2023)</b> : il pose P(Y = k + 1) = p(1 − p)<sup>k</sup>, puis écrit P(Y = 3) = p(1 − p)³. Avec sa propre formule, P(Y = 3) = p(1 − p)<b>²</b> : deux jours sans panne, puis la panne le troisième.</li>
<li><b>Pièces (2019)</b> : le corrigé écrit « P(H) = 60 % = 0,4 » ; l’énoncé dit 40 % et tous les calculs utilisent 0,4.</li>
</ul>
<div class="plus">Ces remarques servent à comprendre d’où viennent ses nombres, pas à le corriger en copie. Si un résultat te semble différent du sien, écris ton calcul proprement : c’est la démarche qui est notée.</div>` },

{ id: '1.6', t: 'Les questions de cours qu’il pose', h: `
<p>Il utilise quatre formats. Les trois premiers viennent d’une même feuille de QCM, presque inchangée de 2019 à 2023.</p>
<div class="tw"><table>
<thead><tr><th>Format</th><th>Contenu exact</th><th>Où l’apprendre</th></tr></thead>
<tbody>
<tr><th>Relier par une flèche</th><td>les <b>7 aspects de la SdF</b> et leur définition (2019, 2022, 2023)</td><td><a href="#/ch/2/cours/2.3">2.3</a></td></tr>
<tr><th>Relier par une flèche</th><td>les <b>4 niveaux de gravité</b> d’une défaillance (2019, 2022)</td><td><a href="#/ch/3/cours/3.3">3.3</a></td></tr>
<tr><th>Relier par une flèche</th><td>les <b>5 types de tests</b> (2023)</td><td><a href="#/ch/4/cours/4.2">4.2</a></td></tr>
<tr><th>Cocher la ou les cases</th><td>définition de la SdF (<b>trois</b> cases justes) ; maintenance ; cause directe d’une défaillance et d’une erreur ; défaillance cohérente, incohérente, durable, temporelle ; bombe logique, bug logiciel, déni de service</td><td><a href="#/ch/2/cours/2.2">2.2</a>, <a href="#/ch/3/cours/3.2">3.2</a>, <a href="#/ch/3/cours/3.6">3.6</a></td></tr>
<tr><th>Tableau à remplir</th><td>« Donner quatre objectifs de la SdF et deux techniques permettant de réaliser chacun d’eux » (2023)</td><td><a href="#/ch/2/cours/2.4">2.4</a></td></tr>
<tr><th>Question rédigée</th><td>« Définir la sûreté de fonctionnement. Citer (sans définir) ses attributs, ses moyens et ses entraves » (2025, 4 points)</td><td><a href="#/ch/2/cours/2.5">2.5</a></td></tr>
</tbody></table></div>
<div class="exam">La question rédigée de 2025 se répond avec <b>un seul schéma du cours</b> : l’arbre « Sûreté de fonctionnement → Attributs, Moyens, Entraves ». Il est détaillé et à réciter en <a href="#/ch/2/cours/2.5">2.5</a>.</div>
<p>Tous ces items sont repris, avec la réponse du corrigé officiel, dans le quiz des chapitres 2, 3 et 4 et dans les exercices « relier » du cours.</p>` },

{ id: '1.7', t: 'Gérer les 90 minutes', h: `
<ol class="steps">
<li><div><b>Lis les quatre exercices (3 minutes).</b> Écris à côté de chacun la famille et la loi. Les exercices sont indépendants : tu peux les faire dans l’ordre que tu veux.</div></li>
<li><div><b>Commence par le cours (10 à 15 minutes).</b> C’est le meilleur rapport points par minute et il ne demande aucun calcul.</div></li>
<li><div><b>Enchaîne avec l’exercice que tu reconnais le mieux</b>, en général l’arbre ou l’exponentielle (20 minutes chacun).</div></li>
<li><div><b>Écris les formules littérales partout</b> avant de finir les applications numériques.</div></li>
<li><div><b>Garde 5 minutes</b> pour relire : chaque probabilité est entre 0 et 1, les feuilles de l’arbre somment à 1, série &lt; composant seul &lt; parallèle.</div></li>
</ol>
<div class="warn">Trois erreurs coûtent cher parce qu’elles se répercutent sur toute la suite : confondre P(A/B) et P(B/A) ; utiliser F(t) à la place de R(t) ; oublier le « − P(A ∩ B) » dans l’union.</div>` },

{ id: '1.8', t: 'Ton plan de révision avec cette interface', h: `
<div class="tw"><table>
<thead><tr><th>Étape</th><th>Quoi</th><th>But</th></tr></thead>
<tbody>
<tr><th>1</th><td>Chapitre 5, en faisant <b>tous</b> les exercices « À toi »</td><td>ne plus jamais hésiter sur union, conditionnelle, totales, Bayes</td></tr>
<tr><th>2</th><td>Chapitre 7, sections 7.3 à 7.7</td><td>maîtriser l’exponentielle et les montages</td></tr>
<tr><th>3</th><td>Chapitre 6</td><td>reconnaître la bonne loi discrète et l’appliquer</td></tr>
<tr><th>4</th><td>Chapitres 2, 3 et 4 : cours, cartes mémoire, quiz</td><td>sécuriser les 4 à 8 points de cours</td></tr>
<tr><th>5</th><td>Chapitre 8 : les sept devoirs, un par un, <b>sur papier et chronométrés</b></td><td>vérifier que tu tiens 1 h 30 et que ta rédaction ressemble au corrigé</td></tr>
<tr><th>6</th><td>Examen blanc de l’interface, puis les cartes ratées</td><td>boucher les derniers trous</td></tr>
</tbody></table></div>
<p>Si les probabilités te posent problème, ne saute pas les premières sections du chapitre 5 : tout le reste (lois, exponentielle, montages) n’est que l’application répétée de quatre règles vues là-bas.</p>` }
],
glossaire: [
  ['Devoir surveillé', 'DS', 'épreuve de 1 h 30, quatre exercices, sans documents, tenue fin octobre ou début novembre.'],
  ['Application numérique', 'A.N.', 'remplacement des lettres d’une formule par les valeurs de l’énoncé ; notée à part de la formule.'],
  ['Barème', '—', 'répartition des points ; chez ce professeur la formule littérale vaut souvent plus que le résultat chiffré.'],
  ['Corrigé type', '—', 'solution rédigée par le professeur ; trois sont disponibles avec leur barème (2018, 2019, 2023).']
],
formules: [
  ['Année 24 h/24, 6 j/7', 'D = (365 − 52) × 24 = 7512 h', 'Valeur utilisée par le professeur dans son corrigé de 2018.'],
  ['Rédaction type', 'nommer → données → formule → nombres → résultat → vérification', 'L’ordre suivi par tous ses corrigés.']
],
resume: [
  'Devoir de <b>1 h 30</b>, <b>4 exercices</b> indépendants, sans documents, avec la consigne « justifier vos réponses ».',
  'Probabilités conditionnelles dans <b>7 devoirs sur 7</b> ; loi exponentielle dans <b>6 sur 7</b>.',
  'Lois discrètes et montages série/parallèle : environ un devoir sur deux.',
  'Questions de cours dans quatre des six derniers devoirs : <b>4 à 8 points</b>, sous forme de QCM, de « relier » ou de question rédigée.',
  'Le professeur <b>réutilise</b> ses exercices d’une année à l’autre, parfois avec les mêmes nombres.',
  'Les points vont d’abord à la <b>formule littérale</b> et à la démarche, ensuite au résultat.',
  'Il arrondit (0,897 ≈ 90 %) et compte <b>7512 heures</b> dans une année à 6 jours sur 7.'
],
pieges: [
  'Donner un nombre sans nommer les événements ni écrire la formule : la consigne « justifier » fait perdre des points.',
  'Passer vingt minutes sur une application numérique et ne pas écrire les formules des questions suivantes.',
  'Croire que le devoir ne contient que des calculs : quatre des six derniers devoirs ont des questions de cours, et le professeur en a annoncé.',
  'Confondre « nombre de pannes sur une durée » (Poisson) et « temps avant la panne » (exponentielle).'
],
cartes: [
  ['Durée et forme du devoir ?', '1 h 30, quatre exercices indépendants, documents non autorisés, « justifier vos réponses ».'],
  ['Quels sont les deux thèmes présents dans presque tous les devoirs ?', 'Les probabilités conditionnelles (arbre, Bayes, deux événements) : 7 sur 7. La loi exponentielle : 6 sur 7.'],
  ['Combien de points pour le cours quand il y en a ?', 'Entre 4 et 8 points sur 20.'],
  ['Dans quel ordre rédiger une réponse de calcul ?', 'Nommer les événements, traduire les données, écrire la formule littérale, remplacer par les nombres, conclure, vérifier.'],
  ['Combien d’heures dans une année « 24 h/24, 6 jours sur 7 » selon le professeur ?', '(365 − 52) × 24 = 7512 heures.'],
  ['Énoncé : « nombre de pannes en un an, taux λ par mois ». Quelle loi ?', 'Poisson de paramètre λ × 12.'],
  ['Énoncé : « probabilité que la première panne arrive le k-ième jour ». Quelle loi ?', 'Géométrique : p(1 − p)<sup>k−1</sup>.'],
  ['Énoncé : « la k-ième panne arrive le n-ième jour ». Quelle loi ?', 'Pascal : C(n−1, k−1) p<sup>k</sup>(1 − p)<sup>n−k</sup>.'],
  ['Énoncé : « trois types de fautes, k₁, k₂, k₃ ». Quelle loi ?', 'Multinomiale : n! / (k₁! k₂! k₃!) × p₁<sup>k₁</sup> p₂<sup>k₂</sup> p₃<sup>k₃</sup>.'],
  ['Quelle question de cours rédigée est tombée en 2025 ?', 'Définir la sûreté de fonctionnement ; citer sans définir ses attributs, ses moyens et ses entraves (4 points).'],
  ['Quels sont les trois exercices « relier » du QCM ?', 'Les 7 aspects de la SdF, les 4 niveaux de gravité d’une défaillance, les 5 types de tests.'],
  ['Que vaut le plus : la formule ou l’application numérique ?', 'La formule littérale (jusqu’à 2 points contre 0,5 à 1 pour l’application numérique).']
],
quiz: [
  { q: 'Combien d’exercices comporte chacun des sept devoirs analysés ?', o: ['4', '3', '5', '2'], a: 0, e: 'Toujours quatre exercices indépendants en 1 h 30.' },
  { q: 'Quel thème apparaît dans les sept devoirs sans exception ?', o: ['Les probabilités conditionnelles', 'La loi de Poisson', 'La loi de Weibull', 'Les tests logiciels'], a: 0, e: 'Arbre et Bayes, ou deux événements A et B : il y en a chaque année.' },
  { q: '« Probabilité que le serveur subisse 3 pannes en un an, λ = 0,5 par mois. » Quelle loi ?', o: ['Poisson de paramètre 6', 'Exponentielle de paramètre 0,5', 'Binomiale B(3 ; 0,5)', 'Géométrique'], a: 0, e: 'Un nombre d’événements sur une durée suit Poisson, de paramètre λ × durée = 6.' },
  { q: '« Probabilité que le système tombe en panne entre le premier et le deuxième mois. » Quel calcul ?', o: ['R(1) − R(2)', 'R(2) − R(1)', 'R(1) × R(2)', 'F(1) + F(2)'], a: 0, e: 'P(1 < T < 2) = F(2) − F(1) = R(1) − R(2). R décroît, donc R(1) − R(2) est positif.' },
  { q: 'Sur quoi le barème met-il le plus de points ?', o: ['La formule littérale et la démarche', 'Le nombre de décimales', 'La rapidité', 'La propreté du dessin'], a: 0, e: 'Exemple 2018 : 2 points pour la formule du montage série, 0,5 pour l’application numérique.' },
  { q: 'Quels formats de questions de cours a-t-il déjà utilisés ?', o: ['Relier par une flèche', 'Cocher la ou les cases', 'Question rédigée « définir, citer »', 'Dissertation de deux pages'], a: [0, 1, 2], e: 'QCM avec « relier » et « cocher » en 2019, 2022, 2023 ; question rédigée en 2025.' },
  { q: 'Dans le corrigé de la garantie de 100 heures, R(100) = 0,897. Que fait le professeur ?', o: ['Il arrondit à 90 % et trouve 25 pièces', 'Il garde 0,897 et trouve 25,7 pièces', 'Il arrondit à 0,9 et trouve 22 pièces', 'Il refuse tout arrondi'], a: 0, e: 'Il écrit ≈ 90 %, taux de rejet 10 %, soit 25 pièces sur 250.' },
  { q: 'Quels exercices sont revenus au moins deux fois à l’identique ?', o: ['La garantie de 100 heures', 'Les trois types de fautes f₁, f₂, f₃', 'Les liens de communication a à h', 'La démonstration de la loi d’Erlang'], a: [0, 1, 2], e: 'Garantie : 2018, 2022, 2024. Fautes : 2021, 2023, 2025. Liens : 2021, 2024. Erlang : une seule fois (2024).' },
  { q: 'Durée d’une année de fonctionnement « 24 h/24, 6 jours sur 7 » dans son corrigé ?', o: ['7512 h', '8760 h', '6240 h', '7200 h'], a: 0, e: '(365 − 52) × 24 = 7512 heures.' },
  { q: 'Quelle consigne figure au bas de chaque sujet ?', o: ['Justifier vos réponses', 'Calculatrice interdite', 'Répondre sur l’énoncé', 'Une seule réponse par question'], a: 0, e: '« N.B. : Justifier vos réponses ».' }
],
exos: [
  { t: 'Reconnaître la famille', n: 'méthode', e: `<p>Pour chaque énoncé, donne la famille et la formule à écrire en premier.</p>
<ol><li>« 70 % du temps aucune des deux pannes ne se produit. La panne B s’est produite : probabilité que A aussi ? »</li>
<li>« 5 % des composants ne durent pas plus de 100 heures. Probabilité de durer plus de 200 heures ? »</li>
<li>« Le système déclare un nœud compromis lorsque 2 au moins des 3 techniques le décident. »</li>
<li>« Sachant que six liens sur huit sont en panne, probabilité que A communique encore avec B ? »</li></ol>`,
    s: `<ol><li><b>Deux événements.</b> P(A ∪ B) = 1 − 0,7, puis P(A ∩ B) = P(A) + P(B) − P(A ∪ B), puis P(A/B) = P(A ∩ B) / P(B).</li>
<li><b>Exponentielle.</b> F(100) = 0,05 donc R(100) = e<sup>−100λ</sup> = 0,95 ; R(200) = e<sup>−200λ</sup> = 0,95².</li>
<li><b>Montage, vote 2 sur 3.</b> Pour une probabilité q de décision par technique : 3q²(1 − q) + q³, à calculer dans chaque branche de l’arbre.</li>
<li><b>Dénombrement.</b> Nombre de paires de liens qui forment un chemin de A à B, divisé par C(8,2) = 28.</li></ol>` },
  { t: 'Rédiger comme le corrigé', n: 'rédaction', e: `<p>Énoncé : la chaîne A produit 40 % des composants, dont 20 % ont un défaut ; la chaîne B produit le reste, dont 5 % ont un défaut. Calculer la probabilité qu’un composant soit sans défaut.</p><p>Rédige la réponse complète, comme sur une copie.</p>`,
    s: `<p>Soit A « le composant provient de la chaîne A », B « il provient de la chaîne B », S « il est sans défaut ».</p>
<p>Données : P(A) = 0,4 ; P(B) = 0,6 ; P(S/A) = 0,8 ; P(S/B) = 0,95.</p>
<p>A et B forment une partition (tout composant vient de A ou de B, jamais des deux). Par la formule des probabilités totales :</p>
<p>P(S) = P(S ∩ A) + P(S ∩ B) = P(S/A) × P(A) + P(S/B) × P(B) = 0,8 × 0,4 + 0,95 × 0,6 = 0,32 + 0,57 = <b>0,89</b>.</p>
<p>C’est exactement la rédaction du corrigé de 2018 (1,5 point).</p>` }
]
});

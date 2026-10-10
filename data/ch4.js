REV.chapitres.push({
n: 4, titre: 'Cours 2 bis — Tests des logiciels', en: 'Élimination des fautes : vérification, boîte blanche, boîte noire, régression',
objectifs: [
  'définir la <b>vérification</b> et le <b>test</b> du logiciel, et dire ce qu’un test ne peut pas prouver ;',
  'distinguer tests <b>statiques</b> et <b>dynamiques</b>, <b>fonctionnels</b> (boîte noire) et <b>structurels</b> (boîte blanche) ;',
  'situer tests <b>unitaires</b>, d’<b>intégration</b> et de <b>validation</b> ;',
  'calculer une <b>complexité cyclomatique</b> de trois façons ;',
  'choisir les cas de test d’une <b>boucle</b> et d’un <b>intervalle de validité</b> ;',
  'expliquer le test de <b>régression</b> ;',
  'citer les techniques de <b>tolérance aux fautes</b>.'
],
sections: [
{ id: '4.1', t: 'Vérifier et tester : ce que cela veut dire', h: `
<p>Ce cours détaille un des quatre moyens de la sûreté de fonctionnement : l’<b>élimination des fautes</b> (<a href="#/ch/2/cours/2.4">2.4</a>).</p>
<div class="def">La <b>vérification</b> du logiciel a pour but de démontrer que les produits issus d’une phase du cycle de développement sont <b>conformes aux spécifications</b> établies lors des phases précédentes, et de détecter les fautes introduites auparavant. Elle se compose des <b>tests</b> et des activités de <b>revue et d’analyse</b>.</div>
<div class="def">Le <b>test</b> du logiciel est une approche <b>dynamique</b> de la vérification : il consiste à <b>exécuter le logiciel avec l’intention de découvrir une erreur</b>.</div>
<ul>
<li>Un <b>cas de test</b> (jeu de test) définit un scénario d’exécution, avec la valeur des paramètres à fournir.</li>
<li>Un <b>bon cas de test</b> est susceptible de déceler une <b>nouvelle</b> erreur.</li>
<li>Un test est <b>fructueux</b> s’il découvre une nouvelle erreur.</li>
</ul>
<h4>Ce qu’il faut savoir dire sur les tests</h4>
<ul>
<li>C’est une activité essentielle : il n’est pas rare d’y consacrer <b>plus de 40 %</b> des ressources d’un projet.</li>
<li>Le test peut découvrir des erreurs, mais il est <b>incapable d’établir l’absence de toute erreur</b>.</li>
<li>Le <b>nombre de fautes détectées n’est pas un critère de réussite</b>. Beaucoup de fautes trouvées indique surtout un logiciel qui en contient énormément : il est difficile d’avoir confiance en lui.</li>
<li>On ne « qualifie » pas un système complexe sur un nombre limité de jeux de tests.</li>
<li>Tester ne dispense pas des règles de bonne programmation (code lisible, commenté, relu).</li>
</ul>
<h4>Pourquoi faire tester par un tiers</h4>
<ol>
<li>Chercher ses propres erreurs est un processus mental <b>non naturel</b>.</li>
<li>Si le développeur a mal compris la spécification, il aura la <b>même incompréhension</b> en testant : c’est un <b>mode commun de défaillance</b>.</li>
</ol>
<div class="warn">Corriger une faute peut en <b>injecter de nouvelles</b>, perturber des parties déjà testées, ou rendre accessible une partie du code jusque-là inatteignable et révéler d’autres fautes. C’est la raison d’être du test de régression (<a href="#/ch/4/cours/4.7">4.7</a>).</div>
<div data-lab="choix" data-a="1,2"><p>Quelles affirmations sont justes ?</p>
<ul><li>Un test réussi prouve que le logiciel ne contient plus d’erreur</li><li>Le test est incapable d’établir l’absence de toute erreur</li><li>Un grand nombre de fautes détectées n’est pas un critère de réussite des tests</li><li>Le développeur est le mieux placé pour tester son propre programme</li></ul>
<div class="sol">Un test ne montre que la présence d’erreurs. Beaucoup de fautes trouvées signale un logiciel très fautif. Et on fait tester par un tiers.</div></div>` },

{ id: '4.2', t: 'Les types de tests', h: `
<div class="tw"><table>
<thead><tr><th>Famille</th><th>Principe</th><th>Exemples</th></tr></thead>
<tbody>
<tr><th>Tests statiques</th><td>vérification <b>sans exécution</b> effective</td><td>revues logicielles, analyse statique du code, exécution symbolique</td></tr>
<tr><th>Tests dynamiques</th><td>fondés sur une <b>exécution réelle</b> ; ils diffèrent par la façon de choisir les jeux de tests</td><td>fonctionnels, structurels, statistiques, de surcharge, de robustesse</td></tr>
</tbody></table></div>
<div class="tw"><table>
<thead><tr><th>Test dynamique</th><th>On choisit les cas de test à partir…</th></tr></thead>
<tbody>
<tr><th>Fonctionnel (boîte noire)</th><td>de la <b>spécification</b> : cas nominaux, cas aux limites</td></tr>
<tr><th>Structurel (boîte blanche)</th><td>de la <b>structure interne du code</b></td></tr>
<tr><th>Statistique</th><td>d’un profil d’utilisation, pour <b>évaluer la fiabilité</b></td></tr>
<tr><th>De surcharge, performance, stress, volume</th><td>des limites de capacité</td></tr>
<tr><th>De robustesse</th><td>de comportements <b>anormaux</b> : valeurs hors limites, erreurs</td></tr>
</tbody></table></div>
<div class="exam">QCM 2023, « relier chaque type de test à sa définition ». Corrigé :
<ul><li><b>test dynamique</b> → est incapable d’établir l’absence des erreurs ;</li>
<li><b>test fonctionnel</b> → se base sur l’analyse de la spécification du système logiciel ;</li>
<li><b>test structurel</b> → se base sur l’analyse du code source du système logiciel ;</li>
<li><b>test de régression</b> → vise à s’assurer que les tests déjà effectués restent valides ;</li>
<li><b>test d’intégration</b> → vise à s’assurer de la cohérence des interfaces des unités logicielles.</li></ul></div>
<div data-lab="relier"><p><b>Format exact du devoir 2023</b> : relie chaque type de test à sa définition.</p>
<dl><dt>Le test dynamique</dt><dd>est incapable d’établir l’absence des erreurs</dd>
<dt>Le test fonctionnel</dt><dd>se base sur l’analyse de la spécification du système logiciel</dd>
<dt>Le test structurel</dt><dd>se base sur l’analyse du code source du système logiciel</dd>
<dt>Le test de régression</dt><dd>vise à s’assurer que les tests déjà effectués restent valides</dd>
<dt>Le test d’intégration</dt><dd>vise à s’assurer de la cohérence des interfaces des unités logicielles</dd></dl></div>
<div class="tip">Boîte <b>noire</b> : on ne voit pas dedans, donc on part de la <b>spécification</b>. Boîte <b>blanche</b> (transparente) : on voit le <b>code</b>.</div>` },

{ id: '4.3', t: 'Les phases de test et les documents', h: `
<div class="flow"><span><b>Tests unitaires</b><small>chaque unité (procédure, classe) fait toute sa fonction et seulement elle</small></span><span><b>Tests d’intégration</b><small>les unités assemblées : enchaînements, interfaces, circulation des données</small></span><span><b>Tests de validation</b><small>le système complet face à son cahier des charges ; tests d’acceptation</small></span></div>
<ul>
<li><b>Unitaires</b> : tests de <b>logique</b> (enchaînement correct des branches) et tests de <b>calcul</b> (résultats, performances, exactitude). Les tests de calcul portent sur des données dans les limites, aux limites et hors limites ; les tests de comportements anormaux s’appellent tests de <b>robustesse</b>.</li>
<li><b>Intégration</b> : enchaînements entre modules, circulation des données, aspects dynamiques, séquences d’événements, reprises après interruption ; tests d’interface et d’interopérabilité.</li>
<li><b>Validation</b> : le logiciel implanté dans le matériel répond aux spécifications fonctionnelles (interfaces matériel/logiciel, temps réel, performances, ressources). On ne valide pas le logiciel indépendamment du matériel qui le porte.</li>
</ul>
<h4>Les trois documents</h4>
<div class="tw"><table><tbody>
<tr><th>Plan de test</th><td>organisation, environnement, prévision et planification des tests</td></tr>
<tr><th>Document de description des tests</th><td>procédures, outils, <b>jeux d’essais</b> ; sert de support à l’exécution</td></tr>
<tr><th>Rapport des tests</th><td>pour chaque jeu d’essai : test OK ou non OK, observations</td></tr>
</tbody></table></div>
<p>La formalisation facilite la vérification de la <b>non-régression</b>.</p>
<h4>La démarche en cinq étapes</h4>
<ol><li>choisir les jeux de tests (conditions initiales, entrées) ;</li><li>exécuter le logiciel avec ces jeux ;</li><li>capturer les résultats ;</li><li>vérifier et apprécier les résultats ;</li><li>consigner les conclusions dans le rapport de test.</li></ol>` },

{ id: '4.4', t: 'Boîte blanche : graphe de contrôle et complexité cyclomatique', h: `
<div class="def">Le <b>test en boîte blanche</b> construit les cas de test à partir de la <b>structure interne</b> du code.</div>
<p>Les cas de test sont choisis pour : exécuter au moins une fois tous les <b>chemins indépendants</b> ; rendre vraie <b>et</b> fausse chaque condition logique ; exécuter chaque boucle aux conditions limites et pour des valeurs typiques ; tester chaque structure de données interne.</p>
<h4>Le graphe de contrôle</h4>
<ul>
<li>les <b>nœuds</b> sont les instructions ;</li>
<li>un <b>arc</b> va de n₁ à n₂ si n₂ peut s’exécuter immédiatement après n₁ ;</li>
<li>un seul nœud d’entrée, un seul nœud de sortie ; tout nœud est accessible depuis l’entrée et mène à la sortie.</li>
</ul>
<p>Un <b>chemin</b> traverse le graphe de l’entrée à la sortie. On le représente par un vecteur : la composante numéro i donne le nombre de passages par l’arc i. Des chemins sont <b>indépendants</b> si leurs vecteurs sont linéairement indépendants.</p>
<div class="ex">Dans l’exemple du cours, les chemins π₁ = (a, b, c, g), π₂ = (a, b, c, b, c, g) et π₃ = (a, b, e, f, g) sont indépendants. Le chemin π₄ = (a, b, c, b, e, f, g) ne l’est pas, car π₄ = π₂ + π₃ − π₁.</div>
<div class="def"><b>Complexité cyclomatique</b> : V(G) = <b>E − N + 2</b>, où E est le nombre d’arcs et N le nombre de nœuds. Théorème : V(G) est le <b>nombre maximum de chemins indépendants</b> du graphe.</div>
<div class="f">V(G) = E − N + 2 &nbsp;=&nbsp; D + 1 &nbsp;=&nbsp; nombre de régions<small><b>D + 1</b> : D est le nombre de nœuds de décision, valable si toutes les décisions sont <b>binaires</b>. <b>Régions</b> : valable si le graphe est <b>planaire</b> ; on compte les zones délimitées par les arcs, zone extérieure comprise.</small></div>
<ul>
<li>Exemple du cours : N = 7, E = 10, donc V(G) = 10 − 7 + 2 = <b>5</b>.</li>
<li>Un module de complexité cyclomatique <b>supérieure à 10</b> doit être réécrit (sauf décision simple à nombreuses branches).</li>
<li>Une <b>base</b> du graphe est un ensemble de V(G) chemins indépendants : elle donne les cas de test à choisir. On la construit en ajoutant un par un des chemins indépendants des précédents.</li>
</ul>
<div class="meth"><ol><li>Dessine le graphe de contrôle du module.</li><li>Calcule V(G).</li><li>Construis une base de V(G) chemins : ce sont tes cas de test.</li></ol></div>
<div data-lab="calc" data-r="5"><p>Un graphe de contrôle a 12 arcs et 9 nœuds. Complexité cyclomatique ?</p>
<div class="sol">V(G) = E − N + 2 = 12 − 9 + 2 = <b>5</b>.</div></div>
<div data-lab="calc" data-r="4"><p>Une fonction contient deux « if » simples et une boucle « while », et aucune autre décision. Complexité cyclomatique ?</p>
<div class="ind">Chaque if et chaque while est un nœud de décision binaire.</div>
<div class="sol">D = 3 décisions binaires. V(G) = D + 1 = <b>4</b>. Il faut donc 4 cas de test pour couvrir une base de chemins.</div></div>
<div data-lab="calc" data-r="14"><p>Un graphe a 10 nœuds et sa complexité cyclomatique vaut 6. Combien a-t-il d’arcs ?</p>
<div class="sol">V = E − N + 2 donc E = V + N − 2 = 6 + 10 − 2 = <b>14</b>.</div></div>
<div data-lab="choix" data-a="2"><p>La complexité cyclomatique d’un module vaut 13. Que recommande le cours ?</p>
<ul><li>Rien, c’est une valeur normale</li><li>Écrire 13 commentaires</li><li>Réécrire le module (au-delà de 10)</li><li>Supprimer les boucles</li></ul>
<div class="sol">Il est généralement admis qu’un module de complexité supérieure à 10 doit être réécrit.</div></div>` },

{ id: '4.5', t: 'Tester les boucles', h: `
<h4>Boucle simple, exécutable jusqu’à n fois</h4>
<div class="tw"><table><tbody>
<tr><th>0 passage</th><td>on ne passe pas dans la boucle</td></tr>
<tr><th>1 passage</th><td>une seule fois</td></tr>
<tr><th>m passages</th><td>un nombre typique, avec 1 &lt; m &lt; n</td></tr>
<tr><th>n − 1, n, n + 1 passages</th><td>autour de la limite</td></tr>
</tbody></table></div>
<h4>Boucles imbriquées</h4>
<ol><li>tester la boucle la <b>plus interne</b> comme une boucle simple, les autres au nombre minimal d’itérations ;</li>
<li>passer à la boucle suivante, <b>de l’intérieur vers l’extérieur</b> : boucles extérieures au minimum, boucles intérieures à un nombre typique ;</li>
<li>répéter jusqu’à avoir testé toutes les boucles.</li></ol>
<h4>Boucles concaténées</h4>
<p>Si elles sont <b>indépendantes</b>, on teste chacune comme une boucle simple. Sinon on procède comme pour des boucles imbriquées.</p>
<div data-lab="calc" data-r="6"><p>Une boucle simple peut s’exécuter jusqu’à n = 20 fois. Combien de cas de test différents la méthode du cours demande-t-elle ?</p>
<div class="sol">0, 1, m (par exemple 10), 19, 20 et 21 passages : <b>6</b> cas.</div></div>` },

{ id: '4.6', t: 'Boîte noire : le test fonctionnel', h: `
<div class="def">Le <b>test en boîte noire</b> analyse le logiciel à travers son <b>interface</b> pour déterminer s’il satisfait ses <b>exigences fonctionnelles</b>. Il est <b>complémentaire</b> du test en boîte blanche et ne le remplace pas.</div>
<p>Erreurs visées : fonctionnalités absentes ou mal implémentées, erreurs d’interface, erreurs dans les structures de données, défauts de performance, erreurs d’initialisation ou de terminaison.</p>
<h4>Comment choisir les cas de test</h4>
<ul>
<li>chaque <b>fonctionnalité</b> du cahier des charges est couverte par au moins un cas ;</li>
<li>chaque <b>comportement différent</b> perceptible fait l’objet d’au moins un cas ;</li>
<li>pour une donnée munie d’un <b>intervalle de validité</b> : tester la valeur immédiatement <b>inférieure</b>, <b>égale</b> et immédiatement <b>supérieure</b> à <b>chaque borne</b>.</li>
</ul>
<div class="ill">Donnée entière valide entre 1 et 100. Autour de la borne 1 : 0, 1, 2. Autour de la borne 100 : 99, 100, 101.</div>
<div data-lab="calc" data-r="6"><p>Un champ accepte un âge entier entre 18 et 65. Combien de valeurs la règle des bornes fait-elle tester ?</p>
<div class="sol">17, 18, 19 et 64, 65, 66 : <b>6</b> valeurs.</div></div>
<div data-lab="choix" data-a="0"><p>Vérifier, sans regarder le code, que la fonction « annuler la commande » rend bien l’argent est un test :</p>
<ul><li>fonctionnel (boîte noire)</li><li>structurel (boîte blanche)</li><li>statique</li><li>de régression</li></ul>
<div class="sol">On part d’une fonctionnalité du cahier des charges, sans regarder la structure interne.</div></div>` },

{ id: '4.7', t: 'La régression', h: `
<div class="def">Le <b>test de régression</b> consiste à vérifier, à chaque cycle, que <b>l’ensemble des tests effectués depuis le début</b> du développement <b>restent valides</b>.</div>
<p>Raison : des modifications, des ajouts de code ou des corrections introduisent fréquemment de nouvelles erreurs. Mise en œuvre simple : conserver une <b>bibliothèque de tous les cas de test</b> et les rejouer avec un <b>outil automatique</b>.</p>
<h4>Régression modulaire</h4>
<p>Si le système est grand, tout rejouer coûte trop cher. On ne reteste que les modules dont le comportement a pu être affecté. Pour un composant P dont le comportement dépend uniquement de ses échanges à l’interface :</p>
<ol><li><b>Avant</b> la modification : enregistrer les données fournies à P pendant les tests et celles qu’il produit.</li>
<li><b>Après</b> : exécuter la nouvelle version avec les mêmes entrées et comparer les sorties.</li>
<li>En cas de différence, <b>retester tous les composants qui dépendent de P</b>, directement ou transitivement.</li></ol>` },

{ id: '4.8', t: 'En face des tests : la tolérance aux fautes', h: `
<p>Les tests cherchent à <b>éliminer</b> les fautes. La tolérance aux fautes cherche à faire fonctionner le système <b>malgré</b> les erreurs.</p>
<div class="tw"><table>
<thead><tr><th>Traitement des erreurs</th><th>Traitement des fautes</th></tr></thead>
<tbody><tr><td>
<b>Détection et recouvrement</b> : retrouver un état correct à partir de l’état erroné
<ul><li><b>arrière</b> : retour à un état sauvegardé (points de reprise) ;</li><li><b>avant</b> : construire un nouvel état à partir duquel le système peut opérer, en <b>mode dégradé</b>.</li></ul>
<b>Compensation</b> : la <b>redondance</b> permet de délivrer un service correct ; <b>masquage</b> par vote de majorité.</td>
<td><b>Diagnostic</b> : déterminer la cause de l’erreur, la localisation et la nature de la faute.<br><br><b>Passivation</b> : empêcher la faute d’être réactivée ; enlever les composants fautifs, sinon <b>reconfigurer</b> le système.</td></tr></tbody></table></div>
<div class="tip">Le vote de majorité se calcule : c’est le montage « 2 sur 3 » du <a href="#/ch/7/cours/7.7">chapitre 7</a>, tombé en 2019 et en 2025.</div>
<div data-lab="relier"><p>Relie chaque technique à sa catégorie.</p>
<dl><dt>Revenir au dernier point de sauvegarde</dt><dd>Recouvrement arrière</dd>
<dt>Passer en mode dégradé</dt><dd>Recouvrement avant</dd>
<dt>Trois calculateurs et un vote de majorité</dt><dd>Compensation (masquage)</dd>
<dt>Isoler le composant défectueux et reconfigurer</dt><dd>Passivation des fautes</dd>
<dt>Localiser la cause de l’erreur</dt><dd>Diagnostic des fautes</dd></dl></div>` }
],
glossaire: [
  ['Vérification', 'Verification', 'démontrer que le produit d’une phase est conforme aux spécifications des phases précédentes.'],
  ['Test', 'Testing', 'exécuter le logiciel avec l’intention de découvrir une erreur.'],
  ['Cas de test', 'Test case', 'scénario d’exécution avec la valeur des paramètres à fournir.'],
  ['Test statique', 'Static testing', 'vérification sans exécution : revues, analyse statique.'],
  ['Test dynamique', 'Dynamic testing', 'fondé sur une exécution réelle du logiciel.'],
  ['Test fonctionnel', 'Black-box testing', 'boîte noire : cas de test tirés de la spécification.'],
  ['Test structurel', 'White-box testing', 'boîte blanche : cas de test tirés du code source.'],
  ['Test unitaire', 'Unit test', 'test d’une unité (procédure, classe).'],
  ['Test d’intégration', 'Integration test', 'test des unités assemblées et de la cohérence de leurs interfaces.'],
  ['Test de validation', 'Validation test', 'test du système complet face à son cahier des charges.'],
  ['Test de robustesse', 'Robustness test', 'test des comportements anormaux, hors limites.'],
  ['Test de régression', 'Regression test', 'vérifier que les tests déjà effectués restent valides après une modification.'],
  ['Graphe de contrôle', 'Control flow graph', 'nœuds = instructions, arcs = enchaînements possibles.'],
  ['Complexité cyclomatique', 'Cyclomatic complexity', 'V(G) = E − N + 2 : nombre maximum de chemins indépendants.'],
  ['Base du graphe', 'Basis path set', 'ensemble de V(G) chemins indépendants.'],
  ['Mode commun', 'Common mode', 'même cause d’échec partagée par deux éléments censés être indépendants.'],
  ['Recouvrement', 'Recovery', 'retour à un état correct, en arrière (sauvegarde) ou en avant (mode dégradé).'],
  ['Passivation', 'Fault passivation', 'empêcher une faute d’être réactivée.']
],
formules: [
  ['Complexité cyclomatique', 'V(G) = E − N + 2', 'E arcs, N nœuds.'],
  ['Décisions binaires', 'V(G) = D + 1', 'D nœuds de décision.'],
  ['Graphe planaire', 'V(G) = nombre de régions', 'zone extérieure comprise.'],
  ['Boucle simple (max n)', '0 · 1 · m · n − 1 · n · n + 1 passages', '1 < m < n.'],
  ['Intervalle de validité', 'juste en dessous, égal, juste au-dessus de chaque borne', '6 valeurs pour un intervalle.']
],
resume: [
  'Tester, c’est exécuter le logiciel <b>avec l’intention de découvrir une erreur</b>.',
  'Le test ne peut pas établir l’<b>absence</b> d’erreurs ; le nombre de fautes trouvées n’est pas un critère de réussite.',
  'Statique : sans exécution. Dynamique : avec exécution.',
  'Fonctionnel (boîte noire) : à partir de la <b>spécification</b>. Structurel (boîte blanche) : à partir du <b>code</b>.',
  'Unitaire → intégration (interfaces) → validation (cahier des charges).',
  'V(G) = E − N + 2 = D + 1 = nombre de régions ; au-delà de 10, réécrire.',
  'Régression : s’assurer que les tests déjà effectués restent valides.',
  'Tolérance aux fautes : recouvrement (arrière, avant), compensation (redondance, vote), diagnostic, passivation.'
],
pieges: [
  'Dire qu’un test « prouve » que le logiciel est correct.',
  'Inverser boîte noire (spécification) et boîte blanche (code).',
  'Oublier le « + 2 » de V(G) = E − N + 2.',
  'Utiliser V(G) = D + 1 quand une décision a plus de deux branches.',
  'Confondre test d’intégration (interfaces entre unités) et test de validation (système complet face au cahier des charges).'
],
cartes: [
  ['Définition du test logiciel ?', 'Exécuter le logiciel avec l’intention de découvrir une erreur ; approche dynamique de la vérification.'],
  ['Que ne peut pas faire un test ?', 'Établir l’absence de toute erreur.'],
  ['Test statique / test dynamique ?', 'Statique : sans exécution (revues, analyse statique). Dynamique : exécution réelle.'],
  ['Sur quoi se base le test fonctionnel ?', 'Sur l’analyse de la spécification (boîte noire).'],
  ['Sur quoi se base le test structurel ?', 'Sur l’analyse du code source (boîte blanche).'],
  ['But du test d’intégration ?', 'S’assurer de la cohérence des interfaces des unités logicielles assemblées.'],
  ['But du test de régression ?', 'S’assurer que les tests déjà effectués restent valides après modification.'],
  ['Les trois phases de test ?', 'Unitaires, d’intégration, de validation (système, acceptation).'],
  ['Formule de la complexité cyclomatique ?', 'V(G) = E − N + 2 (arcs moins nœuds plus deux).'],
  ['Deux autres façons de calculer V(G) ?', 'D + 1 si toutes les décisions sont binaires ; nombre de régions si le graphe est planaire.'],
  ['Que représente V(G) ?', 'Le nombre maximum de chemins indépendants, donc le nombre de cas de test d’une base.'],
  ['Seuil de complexité cyclomatique ?', 'Au-delà de 10, le module doit être réécrit.'],
  ['Cas de test d’une boucle simple (max n) ?', '0, 1, m, n − 1, n, n + 1 passages.'],
  ['Cas de test d’un intervalle de validité ?', 'Les valeurs juste inférieure, égale et juste supérieure à chaque borne.'],
  ['Deux raisons de faire tester par un tiers ?', 'Chercher ses propres erreurs n’est pas naturel ; le développeur reproduit ses incompréhensions (mode commun).'],
  ['Les trois documents de test ?', 'Plan de test, document de description des tests, rapport des tests.'],
  ['Recouvrement arrière / avant ?', 'Arrière : retour à un état sauvegardé. Avant : nouvel état, mode dégradé.'],
  ['Qu’est-ce que la passivation d’une faute ?', 'Empêcher sa réactivation : retirer le composant fautif ou reconfigurer.']
],
quiz: [
  { q: 'Le test dynamique :', o: ['est incapable d’établir l’absence des erreurs', 'se fait sans exécuter le logiciel', 'prouve la correction du logiciel', 'ne concerne que le matériel'], a: 0, e: 'Réponse du corrigé du QCM 2023.' },
  { q: 'Le test fonctionnel :', o: ['se base sur l’analyse de la spécification du système logiciel', 'se base sur l’analyse du code source', 'vise la cohérence des interfaces', 'vise à s’assurer que les tests déjà effectués restent valides'], a: 0, e: 'Boîte noire : on part de la spécification.' },
  { q: 'Le test structurel :', o: ['se base sur l’analyse du code source du système logiciel', 'se base sur l’analyse de la spécification', 'est un test statique', 'ne s’applique qu’aux boucles'], a: 0, e: 'Boîte blanche : on part de la structure interne du code.' },
  { q: 'Le test de régression :', o: ['vise à s’assurer que les tests déjà effectués restent valides', 'vise la cohérence des interfaces des unités', 'mesure la fiabilité', 'se base sur la spécification'], a: 0, e: 'Une correction peut introduire de nouvelles erreurs.' },
  { q: 'Le test d’intégration :', o: ['vise à s’assurer de la cohérence des interfaces des unités logicielles', 'teste chaque unité isolément', 'vérifie le système complet face au cahier des charges', 'se fait sans exécution'], a: 0, e: 'Il porte sur les unités assemblées.' },
  { q: 'Graphe de contrôle : 10 arcs, 7 nœuds. V(G) ?', o: ['5', '3', '17', '4'], a: 0, e: '10 − 7 + 2 = 5 (exemple du cours).' },
  { q: 'Un module contient 5 décisions binaires. V(G) ?', o: ['6', '5', '7', '10'], a: 0, e: 'V(G) = D + 1 = 6.' },
  { q: 'Lesquels sont des tests statiques ?', o: ['Revue logicielle', 'Analyse statique du code', 'Test de surcharge', 'Test de robustesse'], a: [0, 1], e: 'Statique : sans exécution effective.' },
  { q: 'Quelles affirmations figurent dans le cours ?', o: ['Les tests peuvent mobiliser plus de 40 % des ressources d’un projet', 'Le nombre de fautes détectées n’est pas un critère de réussite', 'Corriger une faute peut en injecter de nouvelles', 'Un test fructueux est un test qui ne trouve aucune erreur'], a: [0, 1, 2], e: 'Un test fructueux est celui qui découvre une nouvelle erreur.' },
  { q: 'Pour une boucle exécutable jusqu’à n fois, lesquels font partie des cas à tester ?', o: ['0 passage', 'n + 1 passages', '1 passage', '2n passages'], a: [0, 1, 2], e: '0, 1, m, n − 1, n, n + 1.' },
  { q: 'Intervalle de validité de 10 à 50 : quelles valeurs teste-t-on autour de la borne supérieure ?', o: ['49, 50, 51', '50 seulement', '40, 50, 60', '48, 50, 52'], a: 0, e: 'Immédiatement inférieure, égale, immédiatement supérieure.' },
  { q: 'Les tests de comportements anormaux (hors limites, erreurs) sont appelés :', o: ['tests de robustesse', 'tests de régression', 'tests statiques', 'tests d’acceptation'], a: 0, e: 'Définition donnée avec les tests unitaires.' },
  { q: 'Le recouvrement « arrière » consiste à :', o: ['revenir à un état sauvegardé antérieurement', 'générer un nouvel état en mode dégradé', 'voter à la majorité', 'retirer le composant fautif'], a: 0, e: 'Points de reprise. Le mode dégradé est le recouvrement avant.' },
  { q: 'Le vote de majorité est une technique de :', o: ['compensation des erreurs (masquage)', 'diagnostic des fautes', 'test structurel', 'prévention des fautes'], a: 0, e: 'La redondance permet de délivrer un service correct malgré une erreur.' }
],
exos: [
  { t: 'Complexité cyclomatique de trois façons', n: 'calcul', e: `<p>Un graphe de contrôle planaire a 7 nœuds et 10 arcs. Quatre de ses nœuds sont des décisions binaires.</p><ol><li>Calcule V(G) par les trois formules.</li><li>Combien de cas de test faut-il au minimum pour couvrir une base ?</li></ol>`,
    s: `<ol><li>E − N + 2 = 10 − 7 + 2 = <b>5</b>. D + 1 = 4 + 1 = <b>5</b>. Les arcs délimitent 4 zones fermées plus la zone extérieure : <b>5</b> régions.</li>
<li>Une base contient V(G) = <b>5</b> chemins indépendants, donc 5 cas de test.</li></ol>` },
  { t: 'Choisir des cas de test', n: 'application', e: `<p>Une fonction reçoit une note entière entre 0 et 20 et un tableau d’au plus 30 notes qu’elle parcourt avec une boucle.</p><ol><li>Quelles notes tester en boîte noire ?</li><li>Combien de passages dans la boucle tester en boîte blanche ?</li></ol>`,
    s: `<ol><li>Autour de 0 : −1, 0, 1. Autour de 20 : 19, 20, 21. Plus une valeur nominale, par exemple 12.</li>
<li>0, 1, un nombre typique (par exemple 15), 29, 30 et 31 passages.</li></ol>` },
  { t: 'Question de cours', n: 'rédaction', e: `<p>Expliquer en quelques lignes pourquoi « un grand nombre de fautes détectées » n’est pas un bon signe, et pourquoi on confie les tests à un tiers.</p>`,
    s: `<p>À complexité égale, trouver beaucoup plus de fautes que dans des projets de référence n’indique pas un bon taux de détection : cela indique un logiciel qui contient un très grand nombre de fautes. Il est donc difficile de lui faire confiance, d’autant que le test ne peut pas établir l’absence d’erreurs.</p>
<p>On fait tester par un tiers pour deux raisons : chercher ses propres erreurs est un processus mental non naturel ; et si le développeur a mal compris la spécification, il gardera la même incompréhension en testant (mode commun de défaillance).</p>` }
]
});

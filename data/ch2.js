REV.chapitres.push({
n: 2, titre: 'Cours 1 — La sûreté de fonctionnement', en: 'Introduction : définitions, attributs, moyens, entraves, système, cycle de vie',
objectifs: [
  '<b>définir</b> la sûreté de fonctionnement (SdF) avec les mots du cours ;',
  'citer et définir ses <b>attributs</b> (disponibilité, fiabilité, sécurité-innocuité, confidentialité, intégrité, maintenabilité) ;',
  'citer ses quatre <b>moyens</b> et donner deux techniques pour chacun ;',
  'citer ses trois <b>entraves</b> ;',
  'décrire un <b>système</b>, ses fonctions, son environnement et ses acteurs ;',
  'dérouler le <b>cycle de vie</b> et distinguer les types de <b>maintenance</b>.'
],
sections: [
{ id: '2.1', t: 'À quoi sert la sûreté de fonctionnement', h: `
<p>La sûreté de fonctionnement vise les « objectifs sacrés » de la conception des systèmes :</p>
<div class="kv"><div>zéro<b>accident</b></div><div>zéro<b>arrêt</b></div><div>zéro<b>défaut</b></div><div>et même zéro<b>maintenance</b></div></div>
<div class="def">La sûreté de fonctionnement consiste à <b>évaluer les risques potentiels</b>, <b>prévoir l’occurrence des défaillances</b> et tenter de <b>minimiser les conséquences</b> des situations catastrophiques lorsqu’elles se présentent. C’est la <b>science des défaillances</b> : elle inclut leur connaissance, leur évaluation, leur prévision, leur mesure et leur maîtrise.</div>
<p>C’est un domaine <b>transverse</b> : il demande une connaissance globale du système (architecture fonctionnelle, architecture structurelle, conditions d’utilisation, risques extérieurs).</p>
<h4>Pourquoi elle compte de plus en plus</h4>
<ul>
<li>informatisation croissante, et de plus en plus de <b>responsabilités déléguées</b> à des systèmes informatiques ;</li>
<li>nécessité de réduire les coûts et les délais de production ;</li>
<li>innovation réclamée par les consommateurs, exigence sur la qualité du service ;</li>
<li>de plus en plus de <b>normes</b> garantissant la qualité de certains services.</li>
</ul>
<h4>Son coût</h4>
<p>Un haut niveau de sûreté de fonctionnement est <b>très onéreux</b> : le concepteur doit faire des <b>compromis</b> entre les mécanismes nécessaires et les coûts. Mais un système pas sûr, pas fiable ou pas sécurisé peut être <b>rejeté</b> par les utilisateurs, et le coût d’une défaillance peut être extrêmement élevé.</p>
<h4>Repères historiques</h4>
<div class="tw"><table>
<thead><tr><th>Période</th><th>Idées</th><th>Accidents marquants</th></tr></thead>
<tbody>
<tr><td>Jusqu’aux années 30</td><td>approche intuitive : renforcer l’élément le plus faible ; premiers systèmes redondants ; taux de défaillance</td><td>Titanic (1912)</td></tr>
<tr><td>Années 40</td><td>analyse des missiles V1 (Lusser) ; <b>loi de Murphy</b> : « si quelque chose peut mal tourner, cela arrivera »</td><td></td></tr>
<tr><td>Années 50</td><td>groupe AGREE : réduire les coûts de maintenance, augmenter la fiabilité, notion de <b>MTBF</b></td><td>Tcheliabinsk (1957)</td></tr>
<tr><td>Années 60</td><td>AMDE, <b>arbres de défaillance</b> (missile Minuteman), arbres des causes</td><td>Torrey Canyon (1967)</td></tr>
<tr><td>Années 70</td><td>analyse des risques, collecte de données de retour d’expérience</td><td></td></tr>
<tr><td>Années 80 à aujourd’hui</td><td>simulation, réseaux de Petri, modélisation</td><td>Tchernobyl (1986), Ariane 5 (1996)</td></tr>
</tbody></table></div>` },

{ id: '2.2', t: 'Les définitions à connaître par cœur', h: `
<div class="def"><b>Définition de Villemeur.</b> La sûreté de fonctionnement est <b>l’aptitude d’une entité à satisfaire à une ou plusieurs fonctions requises dans des conditions données</b>.</div>
<div class="def"><b>Définition de Laprie.</b> La sûreté de fonctionnement est « la propriété qui permet aux utilisateurs du système de placer une <b>confiance justifiée</b> dans le service qu’il leur délivre ».</div>
<p>Le cours précise que l’expression désigne <b>trois choses</b> à la fois :</p>
<ol>
<li>l’<b>aptitude</b> d’une entité à disposer de ses performances fonctionnelles (fiabilité, maintenabilité, disponibilité) et à ne pas engendrer de risques majeurs (sécurité) ;</li>
<li>les <b>activités d’évaluation</b> de cette aptitude (les études de sûreté de fonctionnement) ;</li>
<li>l’ensemble du <b>personnel</b> chargé de ces activités.</li>
</ol>
<div class="exam">QCM 2019, 2022 et 2023 : « La sûreté de fonctionnement d’un système est : » — le corrigé coche <b>les trois cases</b> : son aptitude à satisfaire des fonctions requises dans des conditions données ; les activités d’évaluation de cette aptitude ; la confiance que l’on peut accorder au service qu’il délivre. Ne t’arrête pas à la première case juste.</div>
<div data-lab="choix" data-a="0,1,2"><p>La sûreté de fonctionnement d’un système est :</p>
<ul><li>son aptitude à satisfaire à une ou plusieurs fonctions requises dans des conditions données</li><li>les activités d’évaluation de cette aptitude</li><li>la confiance que l’on peut accorder au service qu’il délivre</li></ul>
<div class="sol">Les trois sont justes : aptitude (Villemeur), activités d’évaluation, confiance justifiée (Laprie).</div></div>
<div class="tip">Deux mots-clés suffisent à retrouver les deux définitions : <b>aptitude</b> (Villemeur) et <b>confiance justifiée</b> (Laprie).</div>` },

{ id: '2.3', t: 'Les attributs : FMDS et les autres', h: `
<p>Les <b>attributs</b> sont les qualités que l’on attend du système. Les quatre principaux forment l’acronyme <b>FMDS</b> (en anglais <b>RAMS</b> : Reliability, Availability, Maintainability, Safety).</p>
<div class="tw"><table>
<thead><tr><th>Attribut</th><th>Définition courte (celle du QCM)</th><th>Slogan du cours</th></tr></thead>
<tbody>
<tr><th>Fiabilité</th><td><b>continuité du service</b></td><td>« pas de pannes ! »</td></tr>
<tr><th>Disponibilité</th><td>aptitude d’un système à <b>fonctionner lorsqu’on le sollicite</b> (être prêt à l’utilisation)</td><td>« pas d’arrêts de production ! »</td></tr>
<tr><th>Maintenabilité</th><td>aptitude aux <b>réparations et aux évolutions</b></td><td>« remise en service immédiate ! »</td></tr>
<tr><th>Sécurité-innocuité</th><td>absence de <b>conséquences catastrophiques sur l’environnement</b></td><td>« pas d’événement critique ou catastrophique ! »</td></tr>
<tr><th>Confidentialité</th><td>absence de <b>divulgations non autorisées</b> de l’information</td><td></td></tr>
<tr><th>Intégrité</th><td>absence d’<b>altérations inappropriées</b> du système</td><td></td></tr>
<tr><th>Sécurité-immunité</th><td><b>Intégrité + Confidentialité + Disponibilité</b> (vis-à-vis des actions autorisées) : absence d’accès ou de manipulations non autorisés de l’état du système</td><td></td></tr>
</tbody></table></div>
<div class="warn">Deux « sécurités » à ne pas confondre. <b>Innocuité</b> (safety) : le système ne fait pas de mal à son environnement. <b>Immunité</b> (security) : on ne peut pas faire de mal au système ; elle regroupe trois attributs, <b>I</b>ntégrité, <b>C</b>onfidentialité, <b>D</b>isponibilité.</div>
<div class="warn">Fiabilité et disponibilité ne sont pas synonymes. La fiabilité regarde une <b>durée</b> (pas de panne pendant tout l’intervalle). La disponibilité regarde un <b>instant</b> (le système marche-t-il quand je le sollicite ?). Un système qui tombe souvent en panne mais se répare en une seconde est peu fiable et très disponible.</div>
<p>Le cours cite aussi, sans les développer : authentification, non-répudiation, auditabilité, testabilité.</p>
<div data-lab="relier"><p><b>Format exact du devoir</b> (2019, 2022, 2023) : relie chaque aspect de la SdF à sa définition.</p>
<dl><dt>Disponibilité</dt><dd>Aptitude d’un système à fonctionner lorsqu’on le sollicite</dd>
<dt>Fiabilité</dt><dd>Continuité du service</dd>
<dt>Sécurité – Innocuité</dt><dd>Absence de conséquences catastrophiques sur l’environnement</dd>
<dt>Sécurité – Immunité</dt><dd>Intégrité + Confidentialité + Disponibilité</dd>
<dt>Confidentialité</dt><dd>Absence de divulgations non autorisées de l’information</dd>
<dt>Intégrité</dt><dd>Absence d’altérations inappropriées du système</dd>
<dt>Maintenabilité</dt><dd>Aptitude aux réparations et aux évolutions</dd></dl></div>` },

{ id: '2.4', t: 'Les quatre moyens et leurs techniques', h: `
<p>Les <b>moyens</b> sont les méthodes qui permettent d’obtenir un système sûr. Il y en a quatre ; on les combine.</p>
<div class="tw"><table>
<thead><tr><th>Moyen</th><th>La question à laquelle il répond</th><th>Techniques (au moins deux à retenir)</th></tr></thead>
<tbody>
<tr><th>Prévention des fautes<br><small>(ou évitement)</small></th><td>comment <b>empêcher</b> l’occurrence ou l’introduction de fautes ?</td><td>ingénierie des besoins, <b>revue du cahier des charges</b>, <b>lecture croisée</b>, <b>prototypage</b>, spécification formelle, conception modulaire, langage de programmation adapté</td></tr>
<tr><th>Élimination des fautes</th><td>comment <b>réduire</b> la présence (nombre, sévérité) des fautes dans ce qui est déjà écrit ?</td><td><b>tests des logiciels</b>, <b>simulation</b>, méthodes formelles, analyse statique du code</td></tr>
<tr><th>Tolérance aux fautes</th><td>comment <b>fournir le service malgré</b> les fautes ?</td><td><b>gestion des exceptions</b>, <b>recouvrement</b> d’erreur, redondance, vote majoritaire</td></tr>
<tr><th>Prévision des fautes</th><td>comment <b>estimer</b> la présence, le taux futur et les conséquences des fautes ?</td><td><b>calcul de la fiabilité</b> (MTTF, MTBF), <b>calcul du MTTR</b>, analyses qualitatives et quantitatives</td></tr>
</tbody></table></div>
<div class="exam">Devoir 2023, question 4 : « Donner quatre objectifs de la SdF et deux techniques permettant de réaliser chacun d’eux ». Réponse notée juste : évitement (revue du cahier des charges ou prototypage ; lecture croisée) · élimination (tests des logiciels ; simulation ou méthodes formelles) · tolérance (gestion des exceptions ; recouvrement) · prévision (calcul de la fiabilité MTBF/MTTF ; calcul du MTTR).</div>
<div class="tip"><b>P-T-E-P</b> : <b>P</b>révenir (avant), <b>T</b>olérer (pendant), <b>É</b>liminer (chercher et corriger), <b>P</b>révoir (estimer). Les deux premiers s’occupent de fournir le service ; les deux derniers de donner confiance dans ce service.</div>
<div data-lab="relier"><p>Associe chaque technique au moyen qu’elle sert.</p>
<dl><dt>Lecture croisée des documents</dt><dd>Prévention des fautes</dd>
<dt>Tests des logiciels</dt><dd>Élimination des fautes</dd>
<dt>Redondance et vote</dt><dd>Tolérance aux fautes</dd>
<dt>Calcul du MTTF</dt><dd>Prévision des fautes</dd>
<dt>Gestion des exceptions</dt><dd>Tolérance aux fautes</dd>
<dt>Prototypage</dt><dd>Prévention des fautes</dd>
<dt>Analyse statique du code</dt><dd>Élimination des fautes</dd></dl></div>` },

{ id: '2.5', t: 'Le schéma à réciter : attributs, moyens, entraves', h: `
<p>Tout le cours 1 tient dans un arbre à trois branches. C’est la réponse à la question rédigée de 2025.</p>
<div class="tw"><table>
<thead><tr><th>Branche</th><th>Ce que c’est</th><th>Liste</th></tr></thead>
<tbody>
<tr><th>Attributs</th><td>les qualités attendues</td><td>disponibilité · fiabilité · sécurité-innocuité · confidentialité · intégrité · maintenabilité<br><small>(disponibilité + confidentialité + intégrité = sécurité-immunité)</small></td></tr>
<tr><th>Moyens</th><td>comment on les obtient</td><td>prévention des fautes · tolérance aux fautes · élimination des fautes · prévision des fautes</td></tr>
<tr><th>Entraves</th><td>ce qui s’y oppose</td><td>fautes · erreurs · défaillances</td></tr>
</tbody></table></div>
<div class="exam"><b>Devoir 2025, exercice 4 (4 points)</b> : « Définir la sûreté de fonctionnement ? Citer (sans définir) ses attributs, ses moyens et ses entraves ? »</div>
<div class="meth"><b>Réponse modèle</b>, à savoir écrire en cinq minutes :
<p>La sûreté de fonctionnement d’un système est son aptitude à satisfaire à une ou plusieurs fonctions requises dans des conditions données. C’est la propriété qui permet à ses utilisateurs de placer une confiance justifiée dans le service qu’il leur délivre. Elle consiste à évaluer les risques potentiels, à prévoir l’occurrence des défaillances et à en minimiser les conséquences.</p>
<p><b>Attributs</b> : disponibilité, fiabilité, sécurité-innocuité, confidentialité, intégrité, maintenabilité.</p>
<p><b>Moyens</b> : prévention des fautes, tolérance aux fautes, élimination des fautes, prévision des fautes.</p>
<p><b>Entraves</b> : fautes, erreurs, défaillances.</p></div>
<div class="tip">6 – 4 – 3 : <b>six</b> attributs, <b>quatre</b> moyens, <b>trois</b> entraves. Si tu en comptes moins en te relisant, il en manque.</div>
<div data-lab="choix" data-a="0,3"><p>Lesquels sont des <b>entraves</b> de la sûreté de fonctionnement ?</p>
<ul><li>les erreurs</li><li>la tolérance aux fautes</li><li>la maintenabilité</li><li>les défaillances</li></ul>
<div class="sol">Les entraves sont les fautes, les erreurs et les défaillances. La tolérance aux fautes est un moyen ; la maintenabilité est un attribut.</div></div>
<div data-lab="calc" data-r="13"><p>Combien d’éléments au total faut-il citer pour répondre complètement à « citer les attributs, les moyens et les entraves » ?</p>
<div class="sol">6 attributs + 4 moyens + 3 entraves = <b>13</b>.</div></div>` },

{ id: '2.6', t: 'La notion de système', h: `
<div class="def">Un <b>système</b> est un ensemble d’éléments (composants) <b>en interaction</b> entre eux et avec l’environnement. Son comportement dépend : des comportements individuels de ses éléments ; des <b>règles d’interaction</b> entre eux (interfaces, algorithmes, protocoles) ; de leur <b>organisation topologique</b> (architecture).</div>
<p>Un système peut réunir des hommes, des équipements, des logiciels et des techniques. Il est déterminé par la nature de ses éléments, le type de leurs interactions et sa <b>frontière</b> (ce qui est dedans, ce qui est dans l’environnement).</p>
<ul>
<li><b>Service</b> rendu par le système : son comportement tel qu’il est <b>perçu par l’utilisateur</b>.</li>
<li><b>Utilisateur</b> : un opérateur humain, mais aussi un autre produit ou un autre procédé.</li>
<li><b>Fonction</b> : l’action d’une entité exprimée en termes de finalité. La fonction est l’<b>objet d’étude</b> de la sûreté de fonctionnement.</li>
</ul>
<h4>Les quatre sortes de fonctions</h4>
<div class="tw"><table><tbody>
<tr><th>Fonction principale</th><td>la raison d’être du système (téléphone : faire communiquer deux entités)</td></tr>
<tr><th>Fonctions secondaires</th><td>assurées en plus (SMS, horloge, réveil, jeux)</td></tr>
<tr><th>Fonctions de protection</th><td>moyens d’assurer la sécurité des biens, des personnes et de l’environnement</td></tr>
<tr><th>Fonctions redondantes</th><td>plusieurs composants assurent la même fonction</td></tr>
</tbody></table></div>
<h4>Produit, procédé, environnement</h4>
<div class="flow"><span><b>Produit</b><small>le système construit, avec son état interne</small></span><span><b>Procédé</b><small>ou environnement fonctionnel : les entités auxquelles le produit est relié (capteurs, opérateur, autres produits)</small></span><span><b>Environnement non fonctionnel</b><small>l’univers extérieur : température, vibrations, contraintes d’utilisation</small></span></div>
<p>Dans le contrat entre donneur d’ordre et concepteur, les <b>deux frontières</b> (produit / procédé, puis procédé / environnement) doivent être clairement définies. Le comportement du produit dépend à la fois de son état interne et de l’environnement.</p>
<div class="ex">Distributeur de boissons : le <b>produit</b> est le distributeur ; le <b>procédé</b> est formé des utilisateurs et du gérant.</div>` },

{ id: '2.7', t: 'Cycle de vie et maintenance', h: `
<div class="def">Le <b>cycle de vie</b> d’un système est l’ensemble des étapes de son développement et de son exploitation, <b>jusqu’à son abandon</b>.</div>
<div class="flow"><span><b>Analyse et définition des besoins</b><small>analyse des besoins + spécification globale → cahier des charges</small></span><span><b>Conception</b><small>architecturale (composants, interfaces) puis détaillée (algorithmes, données)</small></span><span><b>Réalisation</b><small>codage et tests unitaires, intégration, tests globaux, livraison</small></span><span class="cut"><b>Exploitation et maintenance</b><small>l’étape la plus longue</small></span></div>
<p>La spécification dit <b>ce que</b> le système doit faire, en évitant les décisions prématurées de réalisation. Plusieurs modèles de cycle existent : cascade, V, spirale. <b>Chaque étape peut être à l’origine de défaillances.</b></p>
<h4>Les quatre maintenances</h4>
<div class="tw"><table><tbody>
<tr><th>Corrective</th><td>corriger les erreurs non découvertes lors des phases antérieures</td></tr>
<tr><th>Perfective</th><td>améliorer l’efficacité, les performances</td></tr>
<tr><th>Adaptative</th><td>adapter le système aux changements de son environnement, de la technologie</td></tr>
<tr><th>Évolutive</th><td>ajouter des fonctionnalités quand de nouveaux besoins apparaissent</td></tr>
</tbody></table></div>
<div class="exam">QCM 2019 et 2022 : « La maintenance est une activité : » → <b>corrective, adaptative ou évolutive</b>. Les cases « uniquement corrective » et « uniquement évolutive » sont fausses.</div>
<ul>
<li>La maintenance peut obliger à revenir sur <b>toutes</b> les étapes précédentes et à refaire des tests.</li>
<li>Pour un système à longue durée de vie, son coût dépasse celui du développement d’un facteur <b>2 à 4</b>. Exemple du cours : avionique, 30 dollars par instruction à développer, 4000 dollars par instruction à maintenir.</li>
<li>La plus grosse part de ce coût vient des <b>modifications des besoins</b>, pas des fautes de programmation : d’où l’importance de bien définir les besoins.</li>
<li>Système <b>réparable</b> : après une défaillance, on traite la cause et on le remet en fonctionnement. Sinon il est <b>non réparable</b>.</li>
</ul>
<div class="warn">La mauvaise approche, « trop souvent » pratiquée : spécifier seulement le fonctionnement nominal, concevoir et réaliser, puis ajouter la sûreté <b>en fin de cycle</b>. C’est coûteux et inefficace. Il faut intégrer la sûreté <b>dès le début</b>, avec les quatre moyens.</div>
<div data-lab="relier"><p>Relie chaque situation au type de maintenance.</p>
<dl><dt>Corriger un bug signalé par un client</dt><dd>Corrective</dd>
<dt>Porter le logiciel sur un nouveau système d’exploitation</dt><dd>Adaptative</dd>
<dt>Ajouter un module de paiement demandé par les utilisateurs</dt><dd>Évolutive</dd>
<dt>Réécrire une requête pour qu’elle réponde plus vite</dt><dd>Perfective</dd></dl></div>
<div data-lab="calc" data-r="133.33" data-tol="1"><p>Dans l’exemple du cours, développer une instruction coûte 30 dollars et la maintenir 4000 dollars. Par combien le coût est-il multiplié ?</p>
<div class="sol">4000 ÷ 30 ≈ <b>133</b>. C’est un cas extrême (avionique) ; la règle générale du cours est un facteur 2 à 4.</div></div>` },

{ id: '2.8', t: 'Acteurs, exigences et besoins', h: `
<h4>Plusieurs intervenants autour d’un même système</h4>
<p>Donneur d’ordre, concepteur, fabricant, évaluateur, autorité de sûreté ou de sécurité, utilisateurs : leurs exigences sont <b>différentes et parfois incompatibles</b> (coût, ergonomie, adaptation aux besoins, fiabilité, facilité de maintenance, design, sécurité).</p>
<ul>
<li>On ne peut pas toujours classer ces exigences par ordre d’importance, ni n’en considérer qu’une partie.</li>
<li><b>Qualités externes</b> : celles auxquelles le client est sensible (poids, consommation, performance, fiabilité). <b>Qualités internes</b> : conception bien structurée, code sans astuces, composants fortement indépendants.</li>
<li>Construire un système ayant toutes les qualités souhaitées par tous les acteurs est une <b>utopie</b>.</li>
</ul>
<div class="ex"><b>Le Tout-En-Un.</b> La société SAS (donneur d’ordre, client) veut un portable qui ouvre les portes, fait GPS, téléphone, caméra. Elle fait une analyse des besoins, rédige un cahier des charges et lance un appel d’offres, attribué à HIGHTEC (concepteur et constructeur). HIGHTEC doit tenir les délais, donc accepter des solutions imparfaites, et s’adapter aux ruptures de stock ou à un protocole devenu vulnérable.</div>
<div class="ex"><b>Le distributeur de boissons.</b> Selon que l’« utilisateur » est celui qui achète le distributeur ou celui qui achète la boisson, les besoins changent, donc le cahier des charges aussi.</div>
<h4>Besoins fonctionnels et non fonctionnels (TD 1)</h4>
<div class="tw"><table>
<thead><tr><th>Fonctionnels : ce que le système fait</th><th>Non fonctionnels : comment il le fait</th></tr></thead>
<tbody><tr><td>choisir une boisson ; introduire des pièces ; être servi si le montant suffit ; récupérer la monnaie ; annuler et être remboursé</td><td>interface ergonomique ; délai de service inférieur à 2 minutes ; qualité des boissons ; hygiène et sécurité ; réinitialisation en cas de dépassement de délai</td></tr></tbody></table></div>
<div class="ex"><b>Une spécification peut être ambiguë (TD 1, exercice 1).</b> « 20 questions ; bonne réponse : +1 ; mauvaise : −1/3 ; sans réponse : 0. » Nora, 4 justes et 16 fausses, obtient 4 − 16/3 = −1,33 : la règle ne dit rien des notes négatives (spécification <b>incomplète</b>). Wissam a coché deux cases à trois questions : trois interprétations donnent 11, 9 ou 8 (spécification <b>ambiguë</b>).</div>
<div data-lab="calc" data-r="8.33" data-tol="0.02"><p>Avec la règle ci-dessus, quelle est la note d’Ahmed : 10 bonnes réponses, 5 mauvaises, 5 sans réponse ?</p>
<div class="sol">10 × 1 + 5 × (−1/3) + 5 × 0 = 10 − 1,67 = <b>8,33</b>.</div></div>
<div data-lab="choix" data-a="1"><p>« Le délai entre le paiement et le service doit être inférieur à deux minutes. » C’est un besoin :</p>
<ul><li>fonctionnel</li><li>non fonctionnel</li><li>ni l’un ni l’autre</li></ul>
<div class="sol">Il ne décrit pas une fonction mais une <b>contrainte de performance</b> sur une fonction : besoin non fonctionnel.</div></div>` },

{ id: '2.9', t: 'Fiabilité, maintenabilité, disponibilité, sécurité : les définitions longues', h: `
<div class="def"><b>Fiabilité.</b> Fonction du temps qui estime, de manière <b>probabiliste</b>, l’aptitude d’un dispositif à accomplir une fonction requise dans des conditions données et <b>pour un intervalle de temps donné</b>. C’est la mesure de la <b>continuité du service</b>.</div>
<div class="def"><b>Maintenabilité.</b> Aptitude d’un système à être <b>maintenu ou rétabli</b> dans un état dans lequel il peut accomplir une fonction requise, lorsque la maintenance est accomplie dans des conditions données avec des procédures et des moyens prescrits.</div>
<div class="def"><b>Disponibilité.</b> Aptitude d’une entité à être en état d’accomplir une fonction requise dans des conditions données <b>à un instant donné</b>.</div>
<div class="def"><b>Sécurité (sûreté).</b> Aptitude d’un système à éviter de faire apparaître, dans des conditions données, des <b>événements critiques ou catastrophiques</b> ; à respecter l’utilisateur et son environnement.</div>
<h4>La fiabilité du logiciel</h4>
<ul>
<li>C’est la probabilité de faire une opération <b>sans panne</b> sur une durée fixée et pour un contexte donné.</li>
<li>Elle est <b>subjective</b> : elle dépend de l’utilisateur et du contexte d’utilisation.</li>
<li>Une <b>faute</b> est une caractéristique <b>statique</b> du logiciel ; un <b>défaut</b> est sa manifestation <b>dynamique</b>, à l’exécution. Exemple : ne pas vérifier une saisie est une faute ; le plantage après une mauvaise saisie est un défaut.</li>
<li>Métriques : probabilité d’une panne, <b>MTTF</b>, <b>MTBF</b>, disponibilité.</li>
</ul>
<div class="tw"><table><tbody>
<tr><th>MTTF</th><td><i>Mean Time To Failure</i> : temps moyen de fonctionnement <b>avant la première</b> défaillance</td></tr>
<tr><th>MTBF</th><td><i>Mean Time Between Failures</i> : temps moyen <b>entre</b> deux défaillances</td></tr>
<tr><th>MTTR</th><td><i>Mean Time To Repair</i> : temps moyen de réparation</td></tr>
</tbody></table></div>
<p>Les mathématiques de la fiabilité (R(t), MTTF = 1/λ) sont au <a href="#/ch/7/cours/7.3">chapitre 7</a>.</p>` },

{ id: '2.10', t: 'TD 1 : situer une faute dans le cycle de vie', h: `
<p>Le TD 1 demande, pour des bogues célèbres, à quelle étape du cycle la faute « fatale » a été commise. C’est un bon entraînement pour une question de cours sur le cycle de vie.</p>
<div class="tw"><table>
<thead><tr><th>Cas</th><th>Ce qui s’est passé</th><th>Étape en cause (corrigé du TD)</th></tr></thead>
<tbody>
<tr><td>Sonde Mariner (Vénus)</td><td>une virgule remplacée par un point en Fortran : boucle exécutée une fois au lieu de cinq</td><td>vérification et validation mal menées ; choix d’un langage faiblement typé (<b>analyse des besoins</b>)</td></tr>
<tr><td>OS 360 d’IBM</td><td>livré en retard, avec beaucoup de bogues</td><td>mauvaise <b>conception</b> architecturale (peu modulaire, modules fortement couplés)</td></tr>
<tr><td>Missile Exocet (Malouines)</td><td>le navire britannique n’active pas ses défenses : l’Exocet est classé « ami »</td><td><b>définition des besoins</b></td></tr>
<tr><td>Mars Climate Orbiter</td><td>confusion entre pieds et mètres entre deux modules</td><td><b>définition des besoins</b> (unité non spécifiée) et <b>tests système</b></td></tr>
<tr><td>Socrate (SNCF)</td><td>réutilisation d’un système de réservation aérien</td><td>définition des besoins, conception (adaptation), tests système</td></tr>
<tr><td>Bogue de l’an 2000</td><td>année codée sur deux caractères</td><td>définition des <b>besoins futurs</b> et des possibilités d’évolution</td></tr>
</tbody></table></div>
<div class="tip">Dans presque tous ces cas, la faute fatale se trouve <b>au début</b> du cycle (besoins, spécification), pas dans le codage. C’est l’argument du cours pour intégrer la sûreté dès l’analyse des besoins.</div>
<div class="ex"><b>Pompe à insuline (TD 1, exercice 6).</b> Modèle de cycle conseillé : <b>par prototype</b>, avec analyse des risques, éventuellement combiné au modèle en V parce qu’il faut beaucoup de tests. Domaines d’expertise : médecine, électronique biomédicale, informatique embarquée, interface homme-machine.</div>
<div data-lab="choix" data-a="2"><p>Mars Climate Orbiter : deux modules corrects séparément, l’un en pieds et l’autre en mètres. Où est la faute première ?</p>
<ul><li>dans le codage d’un des modules</li><li>dans la maintenance</li><li>dans la définition des besoins : l’unité de mesure n’était pas spécifiée</li><li>dans l’environnement non fonctionnel</li></ul>
<div class="sol">Chaque module faisait ce qu’on lui avait demandé. L’unité n’avait pas été fixée dans la spécification ; les tests système auraient aussi dû le détecter.</div></div>` }
],
glossaire: [
  ['Sûreté de fonctionnement (SdF)', 'Dependability', 'aptitude d’une entité à satisfaire ses fonctions requises dans des conditions données ; confiance justifiée dans le service délivré.'],
  ['Fiabilité', 'Reliability', 'continuité du service ; probabilité de fonctionner sans défaillance pendant un intervalle de temps.'],
  ['Disponibilité', 'Availability', 'aptitude à fonctionner lorsqu’on le sollicite, à un instant donné.'],
  ['Maintenabilité', 'Maintainability', 'aptitude aux réparations et aux évolutions.'],
  ['Sécurité-innocuité', 'Safety', 'absence de conséquences catastrophiques sur l’environnement.'],
  ['Sécurité-immunité', 'Security', 'intégrité + confidentialité + disponibilité : absence d’accès ou de manipulations non autorisés.'],
  ['Confidentialité', 'Confidentiality', 'absence de divulgations non autorisées de l’information.'],
  ['Intégrité', 'Integrity', 'absence d’altérations inappropriées du système.'],
  ['FMDS', 'RAMS', 'Fiabilité, Maintenabilité, Disponibilité, Sécurité.'],
  ['Attributs', 'Attributes', 'les qualités attendues d’un système sûr (six).'],
  ['Moyens', 'Means', 'prévention, tolérance, élimination, prévision des fautes.'],
  ['Entraves', 'Threats', 'fautes, erreurs, défaillances.'],
  ['Prévention des fautes', 'Fault prevention', 'empêcher l’occurrence ou l’introduction de fautes.'],
  ['Tolérance aux fautes', 'Fault tolerance', 'fournir le service en dépit des fautes.'],
  ['Élimination des fautes', 'Fault removal', 'réduire le nombre et la sévérité des fautes présentes.'],
  ['Prévision des fautes', 'Fault forecasting', 'estimer la présence, le taux futur et les conséquences des fautes.'],
  ['Système', 'System', 'ensemble d’éléments en interaction entre eux et avec l’environnement.'],
  ['Service', 'Service', 'comportement du système tel que perçu par l’utilisateur.'],
  ['Procédé', 'Environnement fonctionnel', 'ensemble des entités auxquelles le produit est relié.'],
  ['Cahier des charges', 'Requirements', 'documents issus de l’analyse des besoins et de la spécification globale.'],
  ['Cycle de vie', 'Life cycle', 'étapes du développement et de l’exploitation d’un système jusqu’à son abandon.'],
  ['Maintenance corrective', 'Corrective', 'corrige les erreurs découvertes en exploitation.'],
  ['Maintenance adaptative', 'Adaptive', 'adapte le système aux changements de son environnement.'],
  ['Maintenance évolutive', 'Evolutive', 'ajoute de nouvelles fonctionnalités.'],
  ['Maintenance perfective', 'Perfective', 'améliore les performances.'],
  ['MTTF', 'Mean Time To Failure', 'temps moyen de fonctionnement avant la première défaillance.'],
  ['MTBF', 'Mean Time Between Failures', 'temps moyen entre deux défaillances.'],
  ['MTTR', 'Mean Time To Repair', 'temps moyen de réparation.'],
  ['Loi de Murphy', 'Murphy’s law', '« si quelque chose peut mal tourner, cela arrivera ».']
],
formules: [
  ['Sécurité-immunité', 'Intégrité + Confidentialité + Disponibilité', 'Définition du QCM.'],
  ['Le schéma 6 – 4 – 3', '6 attributs · 4 moyens · 3 entraves', 'Réponse à la question rédigée de 2025.']
],
resume: [
  'SdF = <b>aptitude</b> à satisfaire les fonctions requises dans des conditions données = propriété qui permet une <b>confiance justifiée</b> dans le service délivré.',
  'Le terme désigne aussi les <b>activités d’évaluation</b> de cette aptitude et le personnel qui en est chargé.',
  '<b>Attributs</b> : disponibilité, fiabilité, sécurité-innocuité, confidentialité, intégrité, maintenabilité.',
  '<b>Moyens</b> : prévention, tolérance, élimination, prévision des fautes.',
  '<b>Entraves</b> : fautes, erreurs, défaillances.',
  'Fiabilité = continuité du service ; disponibilité = prêt quand on le sollicite ; maintenabilité = réparations et évolutions ; innocuité = pas de conséquence catastrophique.',
  'Sécurité-immunité = intégrité + confidentialité + disponibilité.',
  'Cycle de vie : besoins → conception → réalisation → exploitation et maintenance (la plus longue, 2 à 4 fois le coût du développement).',
  'Maintenance : corrective, adaptative, évolutive, perfective.',
  'La sûreté doit être intégrée <b>dès le début</b> du cycle, pas ajoutée à la fin.'
],
pieges: [
  'Ne cocher qu’une seule case à « la SdF est… » : le corrigé coche les trois.',
  'Confondre sécurité-innocuité (ne pas nuire à l’environnement) et sécurité-immunité (I + C + D).',
  'Confondre fiabilité (sur une durée) et disponibilité (à un instant).',
  'Ranger « tolérance aux fautes » dans les attributs : c’est un moyen.',
  'Oublier la confidentialité et l’intégrité dans la liste des attributs : FMDS n’en donne que quatre.',
  'Croire que la maintenance n’est que corrective.'
],
cartes: [
  ['Définition de la SdF selon Villemeur ?', 'L’aptitude d’une entité à satisfaire à une ou plusieurs fonctions requises dans des conditions données.'],
  ['Définition de la SdF selon Laprie ?', 'La propriété qui permet aux utilisateurs du système de placer une confiance justifiée dans le service qu’il leur délivre.'],
  ['Les trois choses que désigne « sûreté de fonctionnement » ?', 'L’aptitude de l’entité ; les activités d’évaluation de cette aptitude ; le personnel chargé de ces activités.'],
  ['Les six attributs de la SdF ?', 'Disponibilité, fiabilité, sécurité-innocuité, confidentialité, intégrité, maintenabilité.'],
  ['Les quatre moyens de la SdF ?', 'Prévention des fautes, tolérance aux fautes, élimination des fautes, prévision des fautes.'],
  ['Les trois entraves de la SdF ?', 'Fautes, erreurs, défaillances.'],
  ['Fiabilité (définition courte du QCM) ?', 'Continuité du service.'],
  ['Disponibilité (définition courte du QCM) ?', 'Aptitude d’un système à fonctionner lorsqu’on le sollicite.'],
  ['Maintenabilité (définition courte du QCM) ?', 'Aptitude aux réparations et aux évolutions.'],
  ['Sécurité-innocuité ?', 'Absence de conséquences catastrophiques sur l’environnement.'],
  ['Sécurité-immunité ?', 'Intégrité + confidentialité + disponibilité.'],
  ['Confidentialité ?', 'Absence de divulgations non autorisées de l’information.'],
  ['Intégrité ?', 'Absence d’altérations inappropriées du système.'],
  ['Que signifie FMDS ? Et RAMS ?', 'Fiabilité, Maintenabilité, Disponibilité, Sécurité. Reliability, Availability, Maintainability, Safety.'],
  ['Deux techniques de prévention des fautes ?', 'Revue du cahier des charges ou prototypage ; lecture croisée.'],
  ['Deux techniques d’élimination des fautes ?', 'Tests des logiciels ; simulation ou méthodes formelles.'],
  ['Deux techniques de tolérance aux fautes ?', 'Gestion des exceptions ; recouvrement (ou redondance, vote).'],
  ['Deux techniques de prévision des fautes ?', 'Calcul de la fiabilité (MTTF, MTBF) ; calcul du MTTR.'],
  ['Les quatre types de maintenance ?', 'Corrective, adaptative, évolutive, perfective.'],
  ['Les quatre sortes de fonctions d’un système ?', 'Principale, secondaires, de protection, redondantes.'],
  ['Qu’est-ce que le procédé ?', 'L’environnement fonctionnel : l’ensemble des entités auxquelles le produit est relié (capteurs, opérateur, autres produits).'],
  ['Les étapes du cycle de vie ?', 'Analyse et définition des besoins, conception (architecturale puis détaillée), réalisation (codage, tests, intégration), exploitation et maintenance.'],
  ['Quand intégrer la sûreté de fonctionnement ?', 'Dès le début du cycle de développement ; l’ajouter à la fin est coûteux et inefficace.'],
  ['Différence entre faute et défaut pour un logiciel ?', 'La faute est statique (dans le code) ; le défaut est sa manifestation dynamique à l’exécution.'],
  ['MTTF, MTBF, MTTR ?', 'Temps moyen avant la première défaillance ; temps moyen entre deux défaillances ; temps moyen de réparation.'],
  ['Les « objectifs sacrés » de la conception ?', 'Zéro accident, zéro arrêt, zéro défaut, et même zéro maintenance.']
],
quiz: [
  { q: 'La sûreté de fonctionnement d’un système est :', o: ['son aptitude à satisfaire à une ou plusieurs fonctions requises dans des conditions données', 'les activités d’évaluation de cette aptitude', 'la confiance que l’on peut accorder au service qu’il délivre', 'le nombre de pannes par an'], a: [0, 1, 2], e: 'Question du QCM 2019, 2022 et 2023 : les trois premières cases sont justes.' },
  { q: 'La maintenance est une activité :', o: ['corrective, adaptative ou évolutive', 'uniquement corrective', 'uniquement évolutive'], a: 0, e: 'Question du QCM 2019 et 2022.' },
  { q: 'Quelle définition correspond à la fiabilité ?', o: ['Continuité du service', 'Aptitude à fonctionner lorsqu’on le sollicite', 'Aptitude aux réparations et aux évolutions', 'Absence d’altérations inappropriées du système'], a: 0, e: 'Disponibilité : fonctionner quand on le sollicite. Maintenabilité : réparations et évolutions. Intégrité : pas d’altérations.' },
  { q: 'Quelle définition correspond à la disponibilité ?', o: ['Aptitude d’un système à fonctionner lorsqu’on le sollicite', 'Continuité du service', 'Absence de conséquences catastrophiques sur l’environnement', 'Absence de divulgations non autorisées'], a: 0, e: 'La disponibilité se juge à un instant ; la fiabilité sur une durée.' },
  { q: 'La sécurité-immunité regroupe :', o: ['Intégrité', 'Confidentialité', 'Disponibilité', 'Maintenabilité'], a: [0, 1, 2], e: 'Sécurité-immunité = Intégrité + Confidentialité + Disponibilité.' },
  { q: 'La sécurité-innocuité est :', o: ['l’absence de conséquences catastrophiques sur l’environnement', 'l’absence de divulgations non autorisées de l’information', 'l’aptitude aux réparations', 'la continuité du service'], a: 0, e: 'Innocuité : le système ne nuit pas à son environnement.' },
  { q: 'Lesquels sont des moyens de la SdF ?', o: ['Prévention des fautes', 'Tolérance aux fautes', 'Fiabilité', 'Prévision des fautes'], a: [0, 1, 3], e: 'Quatre moyens : prévention, tolérance, élimination, prévision. La fiabilité est un attribut.' },
  { q: 'Lesquels sont des entraves ?', o: ['Fautes', 'Erreurs', 'Défaillances', 'Maintenances'], a: [0, 1, 2], e: 'Les trois entraves : fautes, erreurs, défaillances.' },
  { q: 'Les tests des logiciels relèvent de :', o: ['l’élimination des fautes', 'la prévention des fautes', 'la tolérance aux fautes', 'la prévision des fautes'], a: 0, e: 'On cherche des fautes dans un programme déjà écrit pour les corriger.' },
  { q: 'La redondance et la gestion des exceptions relèvent de :', o: ['la tolérance aux fautes', 'l’élimination des fautes', 'la prévision des fautes', 'la prévention des fautes'], a: 0, e: 'Elles permettent de fournir le service malgré la présence de fautes.' },
  { q: 'Calculer le MTTF d’un système relève de :', o: ['la prévision des fautes', 'la tolérance aux fautes', 'l’élimination des fautes', 'la prévention des fautes'], a: 0, e: 'Prévision : estimer la présence des fautes et prévoir les défaillances futures.' },
  { q: 'Que signifie l’acronyme FMDS ?', o: ['Fiabilité, Maintenabilité, Disponibilité, Sécurité', 'Fautes, Moyens, Défaillances, Sûreté', 'Fiabilité, Mesure, Détection, Sécurité', 'Fonction, Mission, Durée, Service'], a: 0, e: 'En anglais RAMS : Reliability, Availability, Maintainability, Safety.' },
  { q: 'Quelle est en général l’étape la plus longue du cycle de vie ?', o: ['L’exploitation et la maintenance', 'L’analyse des besoins', 'La conception', 'Le codage'], a: 0, e: 'Son coût dépasse celui du développement d’un facteur 2 à 4 pour les systèmes à longue durée de vie.' },
  { q: 'D’où vient la plus grosse part des coûts de maintenance ?', o: ['Des modifications des besoins', 'Des fautes de programmation', 'Des pannes matérielles', 'Du coût des licences'], a: 0, e: 'D’où l’importance de bien couvrir la définition des besoins.' },
  { q: 'Le « service » rendu par un système est :', o: ['son comportement tel qu’il est perçu par l’utilisateur', 'son code source', 'la liste de ses composants', 'son cahier des charges'], a: 0, e: 'Le service est ce que l’utilisateur perçoit.' },
  { q: 'Dans l’exemple du distributeur de boissons, le procédé est :', o: ['les utilisateurs et le gérant', 'le distributeur lui-même', 'la température de la pièce', 'le cahier des charges'], a: 0, e: 'Produit : le distributeur. Procédé : les entités avec lesquelles il interagit.' },
  { q: 'Adapter un logiciel à une nouvelle version du système d’exploitation est une maintenance :', o: ['adaptative', 'corrective', 'évolutive', 'perfective'], a: 0, e: 'Adaptative : suivre les changements de l’environnement.' },
  { q: 'Quand faut-il prendre en compte la sûreté de fonctionnement ?', o: ['Dès le début du cycle de développement', 'Après les tests', 'Pendant la maintenance seulement', 'Uniquement à la conception détaillée'], a: 0, e: 'L’ajouter en fin de cycle est « une mauvaise approche, coûteuse et inefficace ».' },
  { q: 'Pour un logiciel, une faute est :', o: ['une caractéristique statique qui provoque un défaut à l’exécution', 'la manifestation dynamique d’une erreur', 'un arrêt du service', 'toujours malveillante'], a: 0, e: 'Faute : statique. Défaut : manifestation à l’exécution.' },
  { q: 'Quelles affirmations sur le coût de la SdF sont dans le cours ?', o: ['Un haut niveau de SdF est très onéreux', 'Le concepteur doit faire des compromis', 'Le coût d’une défaillance peut être extrêmement élevé', 'La SdF ne coûte rien si elle est faite tôt'], a: [0, 1, 2], e: 'La SdF a un coût ; l’absence de SdF aussi (rejet par les utilisateurs, défaillances).' }
],
exos: [
  { t: 'Question rédigée du devoir 2025', n: 'cours · 4 points', e: `<p>Définir la sûreté de fonctionnement. Citer (sans définir) ses attributs, ses moyens et ses entraves.</p><p>Écris ta réponse sur papier en moins de six minutes, puis compare.</p>`,
    s: `<p><b>Définition.</b> La sûreté de fonctionnement d’un système est son aptitude à satisfaire à une ou plusieurs fonctions requises dans des conditions données. C’est la propriété qui permet à ses utilisateurs de placer une confiance justifiée dans le service qu’il leur délivre. Elle consiste à évaluer les risques potentiels, prévoir l’occurrence des défaillances et minimiser leurs conséquences.</p>
<p><b>Attributs</b> : disponibilité, fiabilité, sécurité-innocuité, confidentialité, intégrité, maintenabilité.</p>
<p><b>Moyens</b> : prévention des fautes, tolérance aux fautes, élimination des fautes, prévision des fautes.</p>
<p><b>Entraves</b> : fautes, erreurs, défaillances.</p>
<p><small>Corrigé rédigé d’après le schéma du cours ; le corrigé officiel de 2025 n’est pas dans le dossier.</small></p>` },
  { t: 'Tableau du devoir 2023', n: 'cours', e: `<p>Donner quatre objectifs de la SdF et deux techniques permettant de réaliser chacun d’eux.</p>`,
    s: `<div class="tw"><table><thead><tr><th>Objectif</th><th>Technique 1</th><th>Technique 2</th></tr></thead><tbody>
<tr><td>Évitement des fautes</td><td>revue du cahier des charges, prototypage</td><td>lecture croisée</td></tr>
<tr><td>Élimination des fautes</td><td>tests des logiciels</td><td>simulation, méthodes formelles</td></tr>
<tr><td>Tolérance aux fautes</td><td>gestion des exceptions</td><td>recouvrement</td></tr>
<tr><td>Prévision des fautes</td><td>calcul de la fiabilité (MTBF, MTTF)</td><td>calcul du MTTR</td></tr></tbody></table></div>
<p>Ce sont les réponses de la copie notée juste jointe au devoir.</p>` },
  { t: 'Intégrer la SdF au cycle de développement', n: 'TD 1, exercice 3', e: `<p>Comment peut-on intégrer la problématique de la sûreté de fonctionnement au sein du cycle de développement ?</p>`,
    s: `<ul><li><b>Évitement des fautes</b> pendant l’analyse et la conception : langages appropriés (semi-formels ou formels) pour les besoins et la conception ; revue, lecture croisée ; conception modulaire (faible couplage, forte cohésion) ; langage de programmation approprié.</li>
<li><b>Élimination des fautes</b> : analyse formelle ou simulation des modèles ; tests des logiciels ; analyse statique du code.</li>
<li><b>Tolérance aux fautes</b> à la conception et à la programmation : recouvrement des erreurs ; compensation, redondance, vote ; passivation des fautes (arrêt des composants fautifs, reconfiguration).</li>
<li><b>Prévision des fautes</b> : estimer la fiabilité, la disponibilité et la maintenabilité du système.</li></ul>` },
  { t: 'Deux points de vue sur le distributeur', n: 'réflexion', e: `<p>Premier cas : l’utilisateur est celui qui <b>achète le distributeur</b>. Deuxième cas : l’utilisateur est celui qui <b>achète la boisson</b>. Quelles différences pour le cahier des charges ?</p>`,
    s: `<p>Dans le premier cas, le besoin est de faire un profit (ou d’offrir des boissons) : on insistera sur le paiement sûr, la facilité de réapprovisionnement, le faible taux de pannes, le coût.</p>
<p>Dans le second, le besoin est d’acheter facilement une boisson de qualité, sans mauvaise surprise : on insistera sur l’ergonomie, la monnaie rendue, l’annulation, la qualité et l’hygiène.</p>
<p>Un même événement peut être une défaillance pour l’un et pas pour l’autre : c’est pourquoi le cahier des charges doit dire <b>qui</b> est l’utilisateur.</p>` }
]
});

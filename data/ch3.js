REV.chapitres.push({
n: 3, titre: 'Cours 2 — Fautes, erreurs, défaillances', en: 'Les entraves : chaîne de causalité, classifications, latence, modèles de fautes',
objectifs: [
  'distinguer <b>faute</b>, <b>erreur</b> et <b>défaillance</b> et dire laquelle cause laquelle ;',
  'expliquer la <b>chaîne fondamentale</b> et sa récursion entre composants ;',
  '<b>classer une défaillance</b> : cohérence, domaine, durée, gravité, fréquence ;',
  '<b>classer une faute</b> selon les sept critères du cours (bug, bombe logique, déni de service…) ;',
  'calculer une <b>latence</b> et un <b>coût moyen</b> de faute ;',
  'donner des exemples de fautes de spécification, de conception, de codage et de production ;',
  'analyser un accident (Ariane 501, dialyseur) avec ce vocabulaire.'
],
sections: [
{ id: '3.1', t: 'Trois mots, un ordre : faute → erreur → défaillance', h: `
<div class="def">Une <b>défaillance</b> est une altération temporaire ou permanente du <b>service délivré</b>.<br>Une défaillance est causée par une (ou des) <b>erreur(s)</b>.<br>Une erreur est causée par une (ou des) <b>faute(s)</b>.</div>
<div class="flow"><span><b>Faute</b><small>la cause : ce qui est mal fait ou mal conçu</small></span><span><b>Erreur</b><small>un état interne incorrect du système</small></span><span><b>Défaillance</b><small>le service rendu n’est plus celui attendu</small></span></div>
<div class="ex"><b>Un nœud de réseau.</b>
<ul><li>Le programmeur a écrit « i = 0 ; » au lieu de « i = 1 ; » → c’est une <b>faute</b> (elle est dans le code, même si personne ne l’exécute).</li>
<li>L’ordinateur exécute cette instruction : un tampon est dimensionné à 10 au lieu de 100 → c’est une <b>erreur</b> (un état interne faux).</li>
<li>Un jour de forte charge, le tampon déborde et il y a trop de pertes par rapport au niveau spécifié → c’est une <b>défaillance</b> (l’utilisateur le voit).</li></ul></div>
<div class="tip">Faute = dans le <b>plan</b>. Erreur = dans l’<b>état</b>. Défaillance = dans le <b>service</b>. Tant que la faute n’est pas activée, rien ne se voit ; tant que l’erreur n’atteint pas le service, l’utilisateur ne voit rien.</div>
<div class="exam">QCM 2019, 2022, 2023 : « La cause directe d’une <b>défaillance</b> est : » → une (ou des) <b>erreur(s)</b>. « La cause directe d’une <b>erreur</b> est : » → une (ou des) <b>faute(s)</b>. Le piège est le mot « directe » : la faute est bien à l’origine de la défaillance, mais en passant par l’erreur.</div>
<div data-lab="choix" data-a="1"><p>La cause <b>directe</b> d’une défaillance est :</p>
<ul><li>une (ou des) faute(s)</li><li>une (ou des) erreur(s)</li><li>une (ou des) défaillance(s)</li></ul>
<div class="sol">Faute → erreur → défaillance. La cause immédiate de la défaillance est l’erreur.</div></div>
<div data-lab="relier"><p>Un régulateur de chauffage : range chaque fait dans la bonne catégorie.</p>
<dl><dt>Le développeur a écrit « &gt; 200 » au lieu de « &gt; 20 »</dt><dd>Faute</dd>
<dt>La variable « chaudière à couper » reste à faux alors qu’il fait 25 degrés</dt><dd>Erreur</dd>
<dt>La chaudière continue de chauffer, l’occupant étouffe</dt><dd>Défaillance</dd>
<dt>Le capteur de température est mal soudé</dt><dd>Faute</dd>
<dt>La valeur lue par le programme vaut −40 au lieu de 21</dt><dd>Erreur</dd></dl></div>
<h4>Qui est responsable ?</h4>
<p>Un disque est endommagé par une coupure de courant. Le responsable est-il celui qui a manœuvré le disjoncteur, celui qui n’a pas mis le disque sur onduleur, celui qui n’a pas fait la sauvegarde, ou celui qui a vendu un disque trop sensible ? Le cours en tire deux idées :</p>
<ul>
<li>la notion de faute est <b>arbitraire</b> : une faute est la « <b>cause adjugée ou supposée</b> d’une erreur ». On appelle faute la cause que l’on veut prévenir ou tolérer ;</li>
<li>une faute <b>n’est pas un péché</b> : elle est inévitable, naturelle, tolérable. <b>Un système sûr à 100 % n’existe pas</b>, et un composant très sûr dans un système mal conçu est une perte d’argent.</li>
</ul>` },

{ id: '3.2', t: 'La chaîne fondamentale', h: `
<p>Un système est fait de composants. La <b>défaillance d’un composant</b> est une <b>faute interne</b> pour le système qui le contient, et une <b>faute externe</b> pour les composants qui interagissent avec lui. D’où la chaîne sans fin :</p>
<div class="f">… → défaillance → <b>faute</b> → <b>erreur</b> → <b>défaillance</b> → faute → …<small>faute → erreur : <b>activation</b> · erreur → défaillance : <b>propagation</b> · défaillance → faute : <b>conséquence</b> (par interaction ou composition)</small></div>
<h4>Faute dormante, faute active</h4>
<ul>
<li><b>Passive ou dormante</b> : elle existe mais ne perturbe pas le fonctionnement.</li>
<li><b>Active</b> : son activation produit une erreur dans un composant. L’erreur peut alors être <b>propagée</b> par contamination et créer une défaillance.</li>
</ul>
<h4>Une erreur ne devient pas forcément une défaillance</h4>
<ul>
<li>Une erreur peut être <b>effacée</b> avant de provoquer une défaillance, ou <b>éliminée</b>, par exemple par redondance.</li>
<li>Savoir si une erreur est une défaillance dépend du <b>point de vue de l’utilisateur</b> : une fenêtre mal positionnée est rarement jugée comme une défaillance.</li>
</ul>
<div class="ex"><b>Exemple de la vanne (fin du cours 2).</b> Une donnée D entre 1 et 100 sert à calculer S, entre 1 et 10, qui positionne une vanne. Le programmeur n’a mis aucun contrôle sur la valeur lue : <b>faute passive</b> du logiciel. Un jour le capteur envoie une valeur négative (faute du procédé) : la faute logicielle est <b>activée</b>, S sort des bornes → <b>erreur</b>. S’il existe une redondance efficace, l’erreur est corrigée. Sinon → <b>défaillance</b> : la vanne est mal positionnée.</div>
<h4>Vocabulaire du schéma du cours</h4>
<ul>
<li><b>Fautes solides</b> : leur activation est reproductible. <b>Fautes furtives</b> : leur activation n’est pas reproductible de façon systématique.</li>
<li><b>Fautes intermittentes</b> : les fautes furtives et les fautes temporaires (internes ou externes).</li>
<li><b>Vulnérabilité</b> : faute interne déjà présente (y compris une omission) qui permet à une faute <b>externe</b> de causer des dommages. Les <b>fautes d’interaction</b> supposent une vulnérabilité antérieure.</li>
</ul>
<div data-lab="choix" data-a="2"><p>Le passage de la faute à l’erreur s’appelle :</p>
<ul><li>la propagation</li><li>la latence</li><li>l’activation</li><li>la passivation</li></ul>
<div class="sol">Faute → erreur : <b>activation</b>. Erreur → défaillance : <b>propagation</b>. La latence est le délai avant la première activation.</div></div>` },

{ id: '3.3', t: 'Défaillance : définition et classification', h: `
<div class="def">Une <b>défaillance</b> d’un produit est un état du produit dans lequel le service délivré <b>n’est pas conforme au cahier des charges</b> (à la spécification) du produit.</div>
<p>Conséquence directe : un événement qui n’est pas prévu par le cahier des charges n’est pas forcément une défaillance. Pour diminuer les défaillances, il faut <b>enrichir la spécification</b> : décrire le fonctionnement nominal <b>et</b> les modes dégradés.</p>
<div class="ex"><b>Distributeur de boissons.</b> La boisson ne correspond pas à la sélection : défaillance pour l’utilisateur et le donneur d’ordre. La poudre de chocolat fond mal : défaillance pour l’utilisateur. L’appareil n’accepte pas les billets : <b>pas</b> une défaillance si le cahier des charges ne le mentionne pas. Coupure d’eau, le gobelet ne contient que la poudre : défaillance pour le donneur d’ordre.</div>
<div class="def">Le <b>mode de défaillance</b> est la façon dont le système tombe en panne : l’effet par lequel la défaillance est observée.</div>
<h4>Cinq façons de classer une défaillance</h4>
<div class="tw"><table>
<thead><tr><th>Critère</th><th>Catégories</th><th>Définition</th></tr></thead>
<tbody>
<tr><th rowspan="2">Cohérence (perception)</th><td><b>cohérente</b></td><td>tous les utilisateurs en ont la <b>même perception</b></td></tr>
<tr><td><b>incohérente</b>, ou <b>byzantine</b></td><td>n’est constatée que par <b>certains utilisateurs</b></td></tr>
<tr><th rowspan="3">Nature, domaine</th><td><b>de valeur</b></td><td>délivrance d’une valeur erronée</td></tr>
<tr><td><b>temporelle</b></td><td>la réaction n’arrive pas au moment attendu : <b>trop tôt ou trop tard</b></td></tr>
<tr><td><b>par arrêt</b></td><td>plus de données, plus de réaction</td></tr>
<tr><th rowspan="2">Durée</th><td><b>durable</b></td><td>altère le service pendant une <b>fraction importante de la durée de la mission</b></td></tr>
<tr><td><b>temporaire</b></td><td>altère le service <b>momentanément</b>, puis fournit à nouveau un service correct</td></tr>
<tr><th rowspan="4">Gravité, sévérité</th><td><b>bénigne</b></td><td>pas de conséquence sérieuse, la mission se poursuit normalement</td></tr>
<tr><td><b>indicative</b></td><td>la mission est affectée, perte d’efficacité du service rendu, à chiffrer</td></tr>
<tr><td><b>critique</b></td><td>réduction dangereuse des marges de sécurité</td></tr>
<tr><td><b>catastrophique</b></td><td>mission arrêtée, destruction du produit ou du procédé, blessures, pertes de vies humaines</td></tr>
<tr><th>Fréquence</th><td colspan="2">extrêmement improbable · extrêmement rare · rare · probable · fréquent</td></tr>
</tbody></table></div>
<p>Le schéma récapitulatif du cours ajoute la <b>détectabilité</b> (défaillances signalées ou non signalées) et, dans le domaine, les défaillances <b>erratiques</b>.</p>
<div class="exam">QCM 2019, 2022, 2023, à cocher : défaillance <b>cohérente</b> = « celle dont tous les utilisateurs ont la même perception ». Défaillance <b>incohérente</b> = <b>deux cases</b> : « n’est constatée que par certains utilisateurs » <b>et</b> « est appelée défaillance byzantine ». Défaillance <b>durable</b> = « altère le service rendu pendant une fraction importante de la durée de la mission ». Défaillance <b>temporelle</b> = « arrive soit trop tôt soit trop tard ».</div>
<div class="warn"><b>Temporelle</b> et <b>temporaire</b> se ressemblent et ne classent pas la même chose. Temporelle : le <b>moment</b> de la réponse est faux (critère nature). Temporaire : la défaillance <b>dure peu</b> (critère durée). Le QCM 2023 propose « altère le service momentanément » comme réponse fausse à « défaillance temporelle ».</div>
<div data-lab="relier"><p><b>Format exact du devoir</b> (2019, 2022) : relie chaque type de défaillance à sa définition.</p>
<dl><dt>Défaillance bénigne</dt><dd>pas de conséquence sérieuse, la mission se poursuit normalement</dd>
<dt>Défaillance indicative</dt><dd>la mission est affectée, perte d’efficacité du service rendu, à chiffrer</dd>
<dt>Défaillance critique</dt><dd>réduction dangereuse des marges de sécurité</dd>
<dt>Défaillance catastrophique</dt><dd>mission arrêtée, destruction du produit ou du procédé, blessures, pertes de vies humaines</dd></dl></div>
<div data-lab="choix" data-a="0,2"><p>Une défaillance <b>incohérente</b> :</p>
<ul><li>n’est constatée que par certains utilisateurs</li><li>est celle dont tous les utilisateurs ont la même perception</li><li>est appelée défaillance byzantine</li></ul>
<div class="sol">Deux cases à cocher, comme dans le corrigé officiel. La deuxième proposition définit la défaillance cohérente.</div></div>
<div data-lab="relier"><p>Classe chaque défaillance selon le bon critère.</p>
<dl><dt>Le serveur répond 42 au lieu de 24</dt><dd>de valeur</dd>
<dt>L’airbag se déclenche 2 secondes après le choc</dt><dd>temporelle</dd>
<dt>L’écran reste figé, plus aucune réaction</dt><dd>par arrêt</dd>
<dt>Seuls les clients d’un opérateur voient le site en panne</dt><dd>incohérente (byzantine)</dd>
<dt>Micro-coupure d’une seconde, puis tout repart</dt><dd>temporaire</dd></dl></div>
<div class="tip">Gravité croissante : <b>B-I-C-C</b>, comme le stylo : <b>B</b>énigne, <b>I</b>ndicative, <b>C</b>ritique, <b>C</b>atastrophique.</div>` },

{ id: '3.4', t: 'Criticité et niveaux de gravité selon les métiers', h: `
<div class="def"><b>Criticité</b> d’un système : la plus forte gravité de ses modes de défaillance.</div>
<ul>
<li><b>Système sûr en présence de défaillances</b> : la probabilité de défaillances catastrophiques est acceptable.</li>
<li><b>Système à défaillance contrôlée</b> : soit sûr en présence de défaillances, soit à <b>arrêt sur défaillance</b> (quand l’arrêt est considéré comme sûr).</li>
</ul>
<div class="tw"><table>
<thead><tr><th>Domaine</th><th>Niveaux de gravité définis par les normes du métier</th></tr></thead>
<tbody>
<tr><td>Aéronautique civile</td><td>mineur, majeur, dangereux, catastrophique</td></tr>
<tr><td>Automobile</td><td>mineur, majeur, sérieux, fatal</td></tr>
<tr><td>Nucléaire</td><td>significatif, majeur, grave, catastrophique</td></tr>
<tr><td>Lanceurs spatiaux</td><td>incident mineur, incident, incident grave</td></tr>
</tbody></table></div>
<p>Il faut toujours <b>faire préciser la signification</b> des qualificatifs employés.</p>
<h4>Autre classement (annexe du cours)</h4>
<ul>
<li>selon la <b>rapidité</b> : progressive ou soudaine ;</li>
<li>selon l’<b>importance</b> : partielle, complète, intermittente ;</li>
<li>en combinant les deux : <b>catalectique</b> (soudaine et complète) ou <b>par dégradation</b> (progressive et partielle) ;</li>
<li>selon les <b>causes</b> : due à une faiblesse, due à un mauvais emploi ; première ou seconde ;</li>
<li>selon les <b>conséquences</b> : mineure, majeure, critique.</li>
</ul>
<div class="plus"><b>ALARP</b> (<i>As Low As Reasonably Practicable</i>) : le risque résiduel doit être aussi bas que raisonnablement possible. Un risque est ALARP si le coût pour le réduire encore serait <b>largement disproportionné</b> par rapport au bénéfice. C’est une forme du principe de précaution : on ne peut pas dépenser un temps et un argent infinis pour ramener un risque à zéro.</div>` },

{ id: '3.5', t: 'Les fautes : d’où viennent-elles ?', h: `
<div class="def">Une <b>faute</b> (ou défaut) est une <b>modification non voulue par le concepteur</b> d’un produit. Les fautes sont les <b>sources</b> des défaillances.</div>
<h4>La faute peut concerner</h4>
<div class="tw"><table><tbody>
<tr><th>le produit</th><td>traitement d’exception mal adapté</td></tr>
<tr><th>le procédé</th><td>erreur de mesure, mauvaise réponse dans un dialogue homme-machine</td></tr>
<tr><th>l’environnement non fonctionnel</th><td>l’alimentation en gaz est coupée à cause de travaux dans la rue</td></tr>
</tbody></table></div>
<p>Mais <b>c’est toujours le produit qui est défaillant</b>.</p>
<h4>Causes phénoménologiques : par qui ou par quoi ?</h4>
<div class="tw"><table><tbody>
<tr><th>les acteurs humains</th><td>oubli d’un chiffon dans une tubulure</td></tr>
<tr><th>une mauvaise adaptation de la technologie</th><td>mauvaise résistance des matériaux à l’échauffement</td></tr>
<tr><th>les outils employés</th><td>bug d’un compilateur</td></tr>
<tr><th>l’environnement</th><td>coupure de courant</td></tr>
</tbody></table></div>
<p>Les fautes peuvent être engendrées <b>à chacune des étapes</b> du cycle de vie.</p>` },

{ id: '3.6', t: 'Classer une faute : les sept critères', h: `
<p>Le cours classe les fautes élémentaires selon sept points de vue. À l’examen, on te donne un cas (bug, virus, attaque) et tu dois choisir la bonne combinaison.</p>
<div class="tw"><table>
<thead><tr><th>Critère</th><th>Valeurs</th><th>La question à se poser</th></tr></thead>
<tbody>
<tr><th>Phase de création</th><td>de <b>développement</b> · <b>opérationnelle</b></td><td>la faute existe-t-elle avant la mise en service, ou apparaît-elle pendant l’utilisation ?</td></tr>
<tr><th>Frontières du système</th><td><b>interne</b> · <b>externe</b></td><td>est-elle dans le système ou vient-elle de dehors ?</td></tr>
<tr><th>Dimension</th><td><b>matérielle</b> · <b>logicielle</b></td><td>touche-t-elle le matériel ou le logiciel ?</td></tr>
<tr><th>Cause phénoménologique</th><td><b>naturelle</b> · <b>due à l’homme</b></td><td>phénomène physique ou action humaine ?</td></tr>
<tr><th>Intention</th><td><b>non malveillante</b> · <b>malveillante</b></td><td>y a-t-il volonté de nuire ?</td></tr>
<tr><th>Capacité</th><td><b>accidentelle</b> · <b>délibérée</b> · <b>d’incompétence</b></td><td>erreur involontaire, décision prise en connaissance de cause, ou manque de compétence ?</td></tr>
<tr><th>Persistance</th><td><b>permanente</b> · <b>temporaire</b></td><td>reste-t-elle présente ou disparaît-elle ?</td></tr>
</tbody></table></div>
<div class="def">En combinant ces critères, le cours regroupe tout en <b>trois grandes classes</b> : les <b>fautes de développement</b>, les <b>fautes physiques</b> et les <b>fautes d’interaction</b>.</div>
<h4>Les fautes dues à l’homme</h4>
<div class="tw"><table>
<thead><tr><th>Intention</th><th>Capacité</th><th>Exemples</th></tr></thead>
<tbody>
<tr><th rowspan="3">Non malveillantes</th><td>accidentelles (erreurs)</td><td rowspan="2">fautes d’interaction (opérateurs, équipes de maintenance) et de développement (concepteurs, réalisateurs)</td></tr>
<tr><td>délibérées (décisions malheureuses)</td></tr>
<tr><td>d’incompétence</td><td>individus et organisations</td></tr>
<tr><th>Malveillantes</th><td><b>toujours délibérées</b></td><td><b>logiques malignes</b> : bombes logiques, chevaux de Troie, portes dérobées, canaux cachés, virus, vers, zombies · <b>tentatives d’intrusion</b>, y compris dénis de service</td></tr>
</tbody></table></div>
<div class="tip">Une faute <b>malveillante est toujours délibérée</b> : on ne nuit pas par accident. Dans le QCM, toute proposition « malveillante et non délibérée » est donc fausse d’office.</div>
<h4>Les cas types du cours</h4>
<div class="tw"><table>
<thead><tr><th>Cas</th><th>Phase</th><th>Frontière</th><th>Dimension</th><th>Intention</th><th>Capacité</th></tr></thead>
<tbody>
<tr><th>Bug logiciel</th><td><b>développement</b></td><td>interne</td><td>logicielle</td><td><b>non malveillante</b></td><td>accidentelle, délibérée ou d’incompétence</td></tr>
<tr><th>Bombe logique</th><td><b>développement</b></td><td>interne</td><td>logicielle</td><td><b>malveillante</b></td><td><b>délibérée</b></td></tr>
<tr><th>Erratum matériel, défaut de production</th><td>développement</td><td>interne</td><td>matérielle</td><td>non malveillante</td><td>accidentelle, délibérée ou d’incompétence</td></tr>
<tr><th>Dégradation physique (usure)</th><td>opérationnelle</td><td>interne</td><td>matérielle</td><td>non malveillante (naturelle)</td><td>accidentelle</td></tr>
<tr><th>Agression physique (foudre, rayonnement)</th><td>opérationnelle</td><td>externe</td><td>matérielle</td><td>non malveillante</td><td>selon le cas</td></tr>
<tr><th>Tentative d’intrusion, <b>déni de service</b></th><td><b>opérationnelle</b></td><td>externe</td><td>matérielle ou logicielle</td><td><b>malveillante</b></td><td><b>délibérée</b></td></tr>
<tr><th>Virus, vers</th><td>opérationnelle</td><td>externe</td><td>logicielle</td><td>malveillante</td><td>délibérée</td></tr>
<tr><th>Erreur d’entrée (opérateur)</th><td>opérationnelle</td><td>externe</td><td>logicielle</td><td>non malveillante</td><td>accidentelle, délibérée ou d’incompétence</td></tr>
</tbody></table></div>
<div class="exam">Trois items du QCM (2019, 2022, 2023), avec la réponse du corrigé officiel :
<ul><li><b>Une bombe logique</b> est une faute de <b>développement malveillante et délibérée</b>.</li>
<li><b>Un bug logiciel</b> est une faute de <b>développement non malveillante, délibérée ou accidentelle</b>.</li>
<li><b>Une attaque de déni de service</b> est une faute <b>opérationnelle malveillante et délibérée</b>.</li></ul></div>
<div class="meth">Pour répondre à ces trois questions sans réciter :
<ol><li><b>Quand ?</b> Si c’est écrit dans le code avant la livraison (bug, bombe logique) : développement. Si cela arrive pendant que le système tourne (attaque, panne, mauvaise saisie) : opérationnelle.</li>
<li><b>Veut-on nuire ?</b> Oui : malveillante, donc délibérée. Non : non malveillante, et alors accidentelle ou délibérée.</li></ol></div>
<div data-lab="choix" data-a="2"><p>Une bombe logique (virus…) est :</p>
<ul><li>une faute de développement malveillante et non délibérée</li><li>une faute opérationnelle malveillante et délibérée</li><li>une faute de développement malveillante et délibérée</li></ul>
<div class="sol">Elle est glissée dans le code par un développeur (développement) avec l’intention de nuire (malveillante, donc délibérée).</div></div>
<div data-lab="choix" data-a="2"><p>Un bug logiciel est :</p>
<ul><li>une faute opérationnelle non malveillante, délibérée ou accidentelle</li><li>une faute opérationnelle non malveillante et non délibérée</li><li>une faute de développement non malveillante, délibérée ou accidentelle</li></ul>
<div class="sol">Le bug est introduit pendant le développement, sans volonté de nuire. Il peut être accidentel (faute de frappe) ou délibéré (un choix malheureux, par exemple un raccourci pour tenir les délais).</div></div>
<div data-lab="choix" data-a="1"><p>Une attaque de déni de service est :</p>
<ul><li>une faute de développement malveillante et non délibérée</li><li>une faute opérationnelle malveillante et délibérée</li><li>une faute de développement malveillante et délibérée</li></ul>
<div class="sol">L’attaque arrive de l’extérieur pendant l’exploitation (opérationnelle), avec volonté de nuire (malveillante, délibérée).</div></div>
<h4>Persistance : le vocabulaire fin</h4>
<ul>
<li>Fautes <b>temporaires externes</b> : dites <b>transitoires</b>.</li>
<li>Fautes <b>temporaires internes</b> : dites <b>intermittentes</b> (cas du dialyseur).</li>
</ul>
<p>La version courte du cours (diapositive 37) classe aussi par <b>nature</b> : accidentelles, intentionnelles sans volonté de nuire, intentionnelles avec volonté de nuire ; et par <b>moment de création</b> : fautes de développement (spécification, conception) ou fautes opérationnelles (production, exécution).</p>
<div data-lab="relier"><p>Classe chaque faute selon sa <b>phase de création</b> et son <b>intention</b>.</p>
<dl><dt>Un cheval de Troie inséré par un sous-traitant dans le code livré</dt><dd>développement, malveillante</dd>
<dt>Une division par zéro oubliée par le programmeur</dt><dd>développement, non malveillante</dd>
<dt>Un opérateur saisit 1000 au lieu de 100</dt><dd>opérationnelle, non malveillante</dd>
<dt>Un pirate sature le serveur de requêtes</dt><dd>opérationnelle, malveillante</dd>
<dt>La foudre grille une carte réseau</dt><dd>opérationnelle, non malveillante</dd></dl></div>` },

{ id: '3.7', t: 'La latence', h: `
<div class="def"><b>Latence</b> : intervalle de temps entre le moment de la <b>création de la faute</b> et sa <b>première activation</b> conduisant à une erreur.</div>
<ul>
<li>Elle dépend du composant affecté, de la manière et du moment où il est utilisé, et de l’observation choisie.</li>
<li>Elle se détermine par une <b>étude statistique</b> et concerne surtout les systèmes physiques ; elle est difficile à déterminer.</li>
<li>Exemple : les rappels de véhicules plusieurs années après la mise en vente.</li>
</ul>
<div class="ex"><b>Exemple du cours : le compteur.</b> Un compteur binaire compte modulo 16 sur 4 bits (a, b, c, d), poids fort à gauche. Une panne de <b>collage à 0</b> fixe le bit de poids fort à 0 dès l’état initial. Une impulsion arrive en moyenne toutes les 2 millisecondes.
<p>Le compteur prend les valeurs 0000, 0001, 0010, … Le bit de poids fort devrait passer à 1 quand le compteur atteint 1000, c’est-à-dire 8 : au <b>8ᵉ top</b>. Jusque-là, le collage ne change rien (faute dormante). La latence est donc 8 × 2 ms = <b>16 ms</b>.</p></div>
<p>La suite de l’analyse du cours : la panne matérielle est une faute <b>permanente</b>. Elle provoque une valeur de compteur erronée qui dure 8 tops puis disparaît pendant les 8 suivants : une faute <b>transitoire</b>. Celle-ci provoque une <b>erreur</b> dans la représentation du temps écoulé, qui peut conduire à une <b>défaillance temporaire périodique</b>.</p>
<div class="meth"><ol><li>Écris la valeur que le bit collé devrait prendre et trouve <b>à quel top il devrait changer</b> pour la première fois.</li>
<li>Le bit de poids 2<sup>k</sup> passe à 1 pour la première fois au top numéro 2<sup>k</sup>.</li>
<li>Latence = numéro du top × intervalle moyen entre deux tops.</li></ol></div>
<div data-lab="calc" data-r="32" data-u="ms"><p>Compteur modulo 32 sur 5 bits, bit de poids fort collé à 0 dès le départ, une impulsion toutes les 2 ms. Latence ?</p>
<div class="ind">Le bit de poids fort d’un compteur 5 bits vaut 16.</div>
<div class="sol">Le bit de poids fort devrait passer à 1 quand le compteur atteint 10000, soit 16 : au 16ᵉ top. Latence = 16 × 2 = <b>32 ms</b>.</div></div>
<div data-lab="calc" data-r="20" data-u="ms"><p>Compteur 4 bits (a, b, c, d). Cette fois c’est le bit <b>b</b> (poids 4) qui est collé à 0. Une impulsion toutes les 5 ms. Latence ?</p>
<div class="sol">Le bit b devrait passer à 1 quand le compteur atteint 0100, soit 4 : au 4ᵉ top. Latence = 4 × 5 = <b>20 ms</b>.</div></div>
<div data-lab="calc" data-r="0" data-tol="0.01" data-u="ms"><p>Compteur 4 bits, bit de poids fort collé <b>à 1</b> dès l’état initial (le compteur devrait afficher 0000). Une impulsion toutes les 2 ms. Latence ?</p>
<div class="sol">Dès l’état initial, la valeur affichée est 1000 au lieu de 0000 : la faute est activée immédiatement. Latence = <b>0 ms</b>.</div></div>` },

{ id: '3.8', t: 'Coût moyen d’une faute', h: `
<div class="ex"><b>Exemple du cours.</b> Dix fautes F₁ à F₁₀, équiprobables, peuvent affecter un produit. Le contrat de maintenance prévoit un temps fixe d’immobilisation de <b>H = 4 heures</b> pour réparation. Conséquences :
<ul><li>F₁, F₂ : bénignes (coût nul) ;</li><li>F₃, F₄, F₅ : coût fixe C ;</li><li>F₆, F₇ : coût variable V par heure ;</li><li>F₈, F₉, F₁₀ : coût fixe D et coût variable de <b>pente K</b> par heure.</li></ul></div>
<p>Interprétation retenue par le cours :</p>
<ul>
<li>F₆, F₇ : V × H chacune ;</li>
<li>F₈ à F₁₀ : « pente K » signifie que la 1ʳᵉ heure coûte K, la 2ᵉ coûte 2K, …, la H-ième coûte HK. Total : D + K(1 + 2 + … + H) = D + K × H(H + 1)/2.</li>
</ul>
<div class="f">CT = 3C + 2VH + 3 (D + K × [[H(H + 1)//2]]) &nbsp;&nbsp;puis&nbsp;&nbsp; CM = [[CT//10]]<small>Avec H = 4 : H(H + 1)/2 = 10, donc CT = 3C + 8V + 3D + 30K. Les fautes étant équiprobables, le coût moyen est la moyenne simple des dix coûts.</small></div>
<div data-lab="calc" data-r="136"><p>Avec H = 4, C = 100, V = 20, D = 200 et K = 10, calcule le coût moyen CM d’une faute détectée.</p>
<div class="ind">Calcule d’abord le coût de chaque groupe de fautes, additionne, puis divise par 10.</div>
<div class="sol"><ul><li>F₁, F₂ : 0.</li><li>F₃ à F₅ : 3 × 100 = 300.</li><li>F₆, F₇ : 2 × 20 × 4 = 160.</li><li>F₈ à F₁₀ : 3 × (200 + 10 × 10) = 3 × 300 = 900.</li></ul>
<p>CT = 300 + 160 + 900 = 1360. CM = 1360 ÷ 10 = <b>136</b>.</p></div></div>
<div data-lab="calc" data-r="107"><p>Même produit, mais le contrat ramène l’immobilisation à H = 2 heures (C = 100, V = 20, D = 200, K = 10). Nouveau coût moyen ?</p>
<div class="sol">H(H + 1)/2 = 3. CT = 3 × 100 + 2 × 20 × 2 + 3 × (200 + 10 × 3) = 300 + 80 + 690 = 1070. CM = 1070 ÷ 10 = <b>107</b>.</div></div>` },

{ id: '3.9', t: 'Modèles de fautes, étape par étape', h: `
<div class="def"><b>Modèle de fautes</b> : un ensemble de fautes dont les effets sont observables sous forme d’erreurs dans un modèle donné du produit. On choisit un modèle du produit et on recense toutes les fautes exprimables dans ce modèle.</div>
<div class="ex"><b>Circuit « pile »</b> (Push, Pop, signal Pile-Pleine). Fautes pouvant mener à un débordement : MaxPile mal évalué, supérieur à la taille réelle → <b>faute interne fonctionnelle de conception</b>. Le signal Pile-Pleine reste à 0 malgré le débordement → <b>faute interne matérielle</b>. Le procédé qui utilise la pile ignore le signal → <b>faute externe</b>.</div>
<p>Pour un système à logiciel prépondérant, les prescriptions de sûreté portent sur les phases de <b>spécification</b>, le choix de l’<b>architecture</b> et le choix des <b>processus de développement</b>.</p>
<div class="tw"><table>
<thead><tr><th>Étape</th><th>Fautes typiques</th><th>Comment les détecter</th></tr></thead>
<tbody>
<tr><th>Spécification</th><td><b>mauvaise interprétation</b> du cahier des charges (croire que la valeur d’un capteur est déjà validée) ; <b>incomplétude</b> (ne pas dire quoi faire d’une pression négative) ; <b>incohérence logique</b>, contradiction entre propriétés</td><td>modélisation : réseaux de Petri, automates, B, Coq ; analyse et simulation du modèle</td></tr>
<tr><th>Conception générale</th><td>faute de <b>raffinement</b> ; faute d’<b>interface</b> entre composants ; non-respect de contraintes technologiques ; oubli ou ajout d’une fonctionnalité ; modes de défaillance non couverts</td><td><b>matrices de traçabilité</b> entre spécification et conception ; justification des interfaces</td></tr>
<tr><th>Conception détaillée, codage</th><td>donnée non initialisée ; pas de valeur retournée ; programme qui ne termine pas ; appel d’une fonction inexistante ; non-respect d’un type</td><td>analyses statiques, flot de contrôle, flot de données, lecture critique de code</td></tr>
<tr><th>Production</th><td>mauvais branchement ; erreur de bibliothèque à l’édition de liens</td><td>tests</td></tr>
<tr><th>Exploitation</th><td>débordement de pile, panne matérielle, fautes des opérateurs</td><td>tests, ou en exploitation… trop tard</td></tr>
<tr><th>Maintenance, mise au rebut</th><td>l’oubli du chiffon</td><td></td></tr>
</tbody></table></div>
<p>Plus le modèle de fautes est <b>formel et expressif</b>, plus nombreuses sont les fautes éliminées. Les tests s’appliquent à <b>toutes</b> les étapes du développement et complètent les méthodes de preuve.</p>
<div class="ex"><b>La chaudière.</b> Cahier des charges : si la température extérieure dépasse 20 degrés, couper la chaudière. Fautes possibles sur la valeur du capteur : panne du capteur, modification pendant la transmission, acquisition erronée. Réponse du métier : panne de capteur très improbable après une semaine de fonctionnement ; transmission perturbée → <b>dupliquer la transmission et voter</b>. Cela oblige à <b>modifier la spécification</b> pour tolérer la défaillance de la transmission.</div>
<div data-lab="relier"><p>À quelle étape appartient chaque faute ?</p>
<dl><dt>On a oublié de préciser que la pression est toujours positive</dt><dd>Spécification</dd>
<dt>Deux modules n’utilisent pas le même format de données</dt><dd>Conception générale</dd>
<dt>Une variable est lue avant d’être initialisée</dt><dd>Codage</dd>
<dt>Erreur de bibliothèque à l’édition de liens</dt><dd>Production</dd>
<dt>Débordement de pile un jour de forte charge</dt><dd>Exploitation</dd></dl></div>` },

{ id: '3.10', t: 'Deux cas d’étude : le dialyseur et Ariane 501', h: `
<h4>Le dialyseur</h4>
<p>Un patient en dialyse fait des malaises graves. L’appareil, testé avant et après, ne montre aucune défaillance et ne pose aucun problème aux autres patients. On découvre que les accidents surviennent quand le patient <b>téléphone avec son portable</b>.</p>
<ul>
<li>La faute <b>apparaît à l’usage</b>, à cause d’une interaction impossible à imaginer à la conception.</li>
<li>Diagnostic difficile : <b>panne byzantine</b> ; faute temporaire interne, donc <b>intermittente</b>.</li>
<li>Comment la caractériser ? Faute physique externe (perturbation électromagnétique) ? Faute de conception (blindage inadapté) ? Accidentelle, ou intentionnelle sans volonté de nuire (réduction du coût) ? Le cours montre que plusieurs lectures sont possibles.</li>
</ul>
<h4>Ariane 501 (4 juin 1996)</h4>
<div class="flow"><span>Le logiciel du système de référence inertielle (SRI) est <b>repris d’Ariane 4</b> sans revoir la spécification</span><span>La vitesse horizontale d’Ariane 5 est bien plus grande : la valeur BH dépasse ce que prévoyait l’hypothèse</span><span>Conversion d’un flottant 64 bits en entier 16 bits <b>non protégée</b> : exception logicielle</span><span>Le SRI de secours, <b>identique</b>, a échoué 72 ms plus tôt pour la même raison</span><span>Le SRI actif envoie un <b>code de panne</b> que le calculateur de bord lit comme une donnée de vol</span><span class="cut">Braquage des tuyères, angle d’attaque supérieur à 20 degrés, <b>autodestruction</b> à H0 + 39 s</span></div>
<p>Ce qu’il faut savoir en dire :</p>
<ul>
<li><b>Faute de spécification et de réutilisation</b> : l’hypothèse valable pour Ariane 4 ne l’était plus ; la fonction d’alignement, inutile après le décollage, continuait de tourner 40 secondes.</li>
<li><b>Faute de codage</b> : cette conversion n’était pas protégée alors que d’autres, comparables, l’étaient.</li>
<li><b>Limite de la redondance</b> : deux exemplaires <b>identiques</b> ont la même faute de conception. « Même cause, même effet. » La redondance protège des pannes matérielles, pas des fautes de conception communes.</li>
<li><b>Hypothèse de la panne simple</b> : le code d’erreur a été transmis comme un résultat et interprété comme une valeur fonctionnelle.</li>
<li><b>Fautes de vérification</b> : pas de tests complémentaires avec les trajectoires d’Ariane 5.</li>
</ul>
<div class="ex">Autre exemple du cours, en sécurité : faute 1, le contrôle d’accès peut être contourné (accident de conception) ; faute 2, un intrus en profite pour ouvrir une session (faute intentionnelle) ; faute 3, il modifie un fichier (attaque d’intégrité). La <b>défaillance</b> n’est découverte que lorsqu’un utilisateur autorisé consulte le fichier. L’analyse des défaillances dues à la <b>combinaison de plusieurs fautes</b> est nécessaire et difficile.</div>
<div data-lab="choix" data-a="1"><p>Pourquoi le second calculateur d’Ariane 501 n’a-t-il pas sauvé le lanceur ?</p>
<ul><li>Il était éteint au décollage</li><li>Il était identique au premier : la même faute de conception a produit la même exception</li><li>Il était plus lent que le premier</li><li>Il n’était pas relié au calculateur de bord</li></ul>
<div class="sol">Matériel et logiciel identiques : la redondance ne tolère pas une faute de conception commune aux deux exemplaires.</div></div>` }
],
glossaire: [
  ['Faute', 'Fault', 'cause adjugée ou supposée d’une erreur ; modification non voulue par le concepteur.'],
  ['Erreur', 'Error', 'partie de l’état du système susceptible d’entraîner une défaillance.'],
  ['Défaillance', 'Failure', 'le service délivré n’est pas conforme à la spécification.'],
  ['Activation', 'Activation', 'passage de la faute à l’erreur.'],
  ['Propagation', 'Propagation', 'passage de l’erreur à la défaillance.'],
  ['Faute dormante', 'Dormant fault', 'faute présente qui ne perturbe pas encore le fonctionnement.'],
  ['Mode de défaillance', 'Failure mode', 'manière dont le système défaille ; effet par lequel la défaillance est observée.'],
  ['Défaillance cohérente', 'Consistent failure', 'tous les utilisateurs en ont la même perception.'],
  ['Défaillance byzantine', 'Byzantine failure', 'incohérente : constatée par certains utilisateurs seulement.'],
  ['Défaillance de valeur', 'Value failure', 'délivrance d’une valeur erronée.'],
  ['Défaillance temporelle', 'Timing failure', 'réaction trop tôt ou trop tard.'],
  ['Défaillance par arrêt', 'Halt failure', 'plus de données, plus de réaction.'],
  ['Défaillance durable', '—', 'altère le service pendant une fraction importante de la mission.'],
  ['Défaillance temporaire', '—', 'altère le service momentanément.'],
  ['Criticité', 'Criticality', 'plus forte gravité des modes de défaillance d’un système.'],
  ['Faute de développement', 'Development fault', 'créée avant la mise en service (spécification, conception, codage).'],
  ['Faute opérationnelle', 'Operational fault', 'créée ou survenue pendant l’utilisation.'],
  ['Faute malveillante', 'Malicious fault', 'introduite avec volonté de nuire ; toujours délibérée.'],
  ['Bombe logique', 'Logic bomb', 'logique maligne : faute de développement malveillante et délibérée.'],
  ['Déni de service', 'Denial of service', 'tentative d’intrusion : faute opérationnelle malveillante et délibérée.'],
  ['Faute transitoire', 'Transient fault', 'faute temporaire externe.'],
  ['Faute intermittente', 'Intermittent fault', 'faute temporaire interne ; ou faute furtive.'],
  ['Vulnérabilité', 'Vulnerability', 'faute interne qui permet à une faute externe de causer des dommages.'],
  ['Latence', 'Latency', 'temps entre la création de la faute et sa première activation.'],
  ['Collage à 0', 'Stuck-at-0', 'panne matérielle qui fige un bit à 0.'],
  ['Modèle de fautes', 'Fault model', 'ensemble des fautes exprimables dans un modèle donné du produit.'],
  ['ALARP', 'As Low As Reasonably Practicable', 'risque résiduel aussi bas que raisonnablement possible.'],
  ['SRI', 'Système de référence inertielle', 'le composant d’Ariane 5 dont le logiciel a levé l’exception.']
],
formules: [
  ['Chaîne fondamentale', '… → défaillance → faute → erreur → défaillance → faute → …', 'activation (faute → erreur), propagation (erreur → défaillance).'],
  ['Latence d’un bit collé', 'latence = (numéro du top où le bit devrait changer) × (intervalle entre tops)', 'Exemple : poids fort d’un compteur 4 bits, 8 × 2 ms = 16 ms.'],
  ['Coût à pente K sur H heures', 'D + K × [[H(H + 1)//2]]', 'K + 2K + … + HK.'],
  ['Coût moyen', 'CM = [[somme des coûts//nombre de fautes]]', 'valable si les fautes sont équiprobables ; sinon Σ pᵢ × coûtᵢ.']
],
resume: [
  '<b>Faute</b> (cause) → <b>erreur</b> (état interne faux) → <b>défaillance</b> (service non conforme).',
  'Cause directe d’une défaillance : une erreur. Cause directe d’une erreur : une faute.',
  'La défaillance d’un composant est une faute pour le système qui le contient : la chaîne est récursive.',
  'Une défaillance se définit <b>par rapport au cahier des charges</b>.',
  'Classement des défaillances : cohérence (cohérente / byzantine), nature (valeur, temporelle, arrêt), durée (durable / temporaire), gravité (bénigne, indicative, critique, catastrophique), fréquence.',
  'Classement des fautes : phase, frontière, dimension, cause, intention, capacité, persistance → fautes de développement, physiques, d’interaction.',
  'Bug : développement, non malveillante. Bombe logique : développement, malveillante, délibérée. Déni de service : opérationnelle, malveillante, délibérée.',
  '<b>Latence</b> : délai entre la création de la faute et sa première activation.',
  'Ariane 501 : réutilisation sans revoir la spécification ; la redondance identique ne tolère pas une faute de conception.',
  'Un système sûr à 100 % n’existe pas.'
],
pieges: [
  'Répondre « faute » à « cause directe d’une défaillance » : c’est l’erreur.',
  'Confondre défaillance <b>temporelle</b> (moment faux) et <b>temporaire</b> (qui dure peu).',
  'Ne cocher qu’une case pour la défaillance incohérente : il y en a deux (certains utilisateurs ; byzantine).',
  'Dire qu’une attaque de déni de service est une faute de développement : elle est opérationnelle.',
  'Croire que deux exemplaires identiques protègent d’un bug logiciel.',
  'Appeler « défaillance » tout comportement gênant : il faut qu’il viole le cahier des charges.'
],
cartes: [
  ['Définition d’une défaillance ?', 'État du produit dans lequel le service délivré n’est pas conforme au cahier des charges ; altération temporaire ou permanente du service.'],
  ['Définition d’une erreur ?', 'Partie de l’état du système susceptible d’entraîner une défaillance ; elle est causée par une faute.'],
  ['Définition d’une faute ?', 'Cause adjugée ou supposée d’une erreur ; modification non voulue par le concepteur du produit.'],
  ['Cause directe d’une défaillance ? d’une erreur ?', 'Une erreur. Une faute.'],
  ['Comment s’appellent les passages faute → erreur et erreur → défaillance ?', 'Activation, puis propagation.'],
  ['Écris la chaîne fondamentale.', '… → défaillance → faute → erreur → défaillance → faute → …'],
  ['Faute dormante, faute active ?', 'Dormante : présente sans perturber. Active : son activation produit une erreur.'],
  ['Défaillance cohérente ?', 'Tous les utilisateurs en ont la même perception.'],
  ['Défaillance incohérente ?', 'Elle n’est constatée que par certains utilisateurs ; on l’appelle aussi défaillance byzantine.'],
  ['Les trois natures de défaillance ?', 'De valeur, temporelle (trop tôt ou trop tard), par arrêt.'],
  ['Défaillance durable ? temporaire ?', 'Durable : pendant une fraction importante de la mission. Temporaire : momentanément, puis le service redevient correct.'],
  ['Les quatre niveaux de gravité ?', 'Bénigne, indicative, critique, catastrophique.'],
  ['Défaillance indicative ?', 'La mission est affectée, perte d’efficacité du service rendu, à chiffrer.'],
  ['Défaillance critique ?', 'Réduction dangereuse des marges de sécurité.'],
  ['Défaillance catastrophique ?', 'Mission arrêtée, destruction du produit ou du procédé, blessures, pertes de vies humaines.'],
  ['Criticité d’un système ?', 'La plus forte gravité de ses modes de défaillance.'],
  ['Les sept critères de classification des fautes ?', 'Phase de création, frontières du système, dimension, cause phénoménologique, intention, capacité, persistance.'],
  ['Les trois grandes classes de fautes ?', 'Fautes de développement, fautes physiques, fautes d’interaction.'],
  ['Classer un bug logiciel.', 'Faute de développement, non malveillante, délibérée ou accidentelle (interne, logicielle, permanente).'],
  ['Classer une bombe logique.', 'Faute de développement, malveillante et délibérée.'],
  ['Classer une attaque de déni de service.', 'Faute opérationnelle, malveillante et délibérée (externe).'],
  ['Une faute malveillante peut-elle être accidentelle ?', 'Non : elle est toujours délibérée.'],
  ['Faute transitoire ? intermittente ?', 'Transitoire : temporaire externe. Intermittente : temporaire interne (ou furtive).'],
  ['Définition de la latence ?', 'Intervalle de temps entre la création de la faute et sa première activation conduisant à une erreur.'],
  ['Compteur 4 bits, poids fort collé à 0, un top toutes les 2 ms : latence ?', '8 × 2 = 16 ms (le bit devrait passer à 1 au 8ᵉ top).'],
  ['Trois fautes de spécification ?', 'Mauvaise interprétation du cahier des charges, incomplétude, incohérence logique.'],
  ['Qu’est-ce qu’un modèle de fautes ?', 'L’ensemble des fautes dont les effets sont observables comme erreurs dans un modèle donné du produit.'],
  ['Cause technique de l’échec d’Ariane 501 ?', 'Conversion non protégée d’un flottant 64 bits en entier 16 bits dans un logiciel repris d’Ariane 4 ; exception dans les deux SRI identiques ; code de panne lu comme donnée de vol.'],
  ['Leçon d’Ariane 501 sur la redondance ?', 'Deux exemplaires identiques partagent leurs fautes de conception : même cause, même effet.'],
  ['Que signifie ALARP ?', 'As Low As Reasonably Practicable : réduire le risque tant que le coût n’est pas largement disproportionné au bénéfice.']
],
quiz: [
  { q: 'La cause directe d’une défaillance est :', o: ['une (ou des) erreur(s)', 'une (ou des) faute(s)', 'une (ou des) défaillance(s)'], a: 0, e: 'QCM 2019, 2022, 2023. Faute → erreur → défaillance.' },
  { q: 'La cause directe d’une erreur est :', o: ['une (ou des) faute(s)', 'une (ou des) erreur(s)', 'une (ou des) défaillance(s)'], a: 0, e: 'QCM 2019, 2022.' },
  { q: 'Défaillance cohérente :', o: ['est celle dont tous les utilisateurs ont la même perception', 'n’est constatée que par certains utilisateurs', 'est appelée défaillance byzantine'], a: 0, e: 'Les deux autres propositions décrivent la défaillance incohérente.' },
  { q: 'Défaillance incohérente :', o: ['n’est constatée que par certains utilisateurs', 'est appelée défaillance byzantine', 'est celle dont tous les utilisateurs ont la même perception'], a: [0, 1], e: 'Le corrigé coche deux cases.' },
  { q: 'Défaillance durable :', o: ['altère le service rendu pendant une fraction importante de la durée de la mission', 'altère le service rendu momentanément puis fournit à nouveau un service correct', 'est dite une défaillance temporaire'], a: 0, e: 'Les deux autres propositions décrivent la défaillance temporaire.' },
  { q: 'La défaillance temporelle :', o: ['arrive soit trop tôt soit trop tard', 'altère le service rendu momentanément puis fournit à nouveau un service correct', 'est appelée aussi défaillance byzantine'], a: 0, e: 'QCM 2023. Ne pas confondre temporelle (moment) et temporaire (durée).' },
  { q: 'Une bombe logique (virus…) est :', o: ['une faute de développement malveillante et délibérée', 'une faute de développement malveillante et non délibérée', 'une faute opérationnelle malveillante et délibérée'], a: 0, e: 'Insérée dans le code avant la mise en service, avec volonté de nuire.' },
  { q: 'Un bug logiciel est :', o: ['une faute de développement non malveillante, délibérée ou accidentelle', 'une faute opérationnelle non malveillante, délibérée ou accidentelle', 'une faute opérationnelle non malveillante et non délibérée'], a: 0, e: 'Introduit au développement, sans volonté de nuire.' },
  { q: 'Une attaque de déni de service est :', o: ['une faute opérationnelle malveillante et délibérée', 'une faute de développement malveillante et délibérée', 'une faute de développement malveillante et non délibérée'], a: 0, e: 'Elle survient en exploitation et vient de l’extérieur.' },
  { q: 'Quelle définition correspond à une défaillance critique ?', o: ['Réduction dangereuse des marges de sécurité', 'Mission arrêtée, pertes de vies humaines', 'La mission est affectée, perte d’efficacité à chiffrer', 'Pas de conséquence sérieuse'], a: 0, e: 'Dans l’ordre : critique, catastrophique, indicative, bénigne.' },
  { q: 'Quelle définition correspond à une défaillance indicative ?', o: ['La mission est affectée, perte d’efficacité du service rendu, à chiffrer', 'Réduction dangereuse des marges de sécurité', 'Pas de conséquence sérieuse, la mission se poursuit normalement', 'Destruction du produit ou du procédé'], a: 0, e: 'Indicative : on perd en efficacité, sans danger.' },
  { q: 'Le passage d’une erreur à une défaillance s’appelle :', o: ['la propagation', 'l’activation', 'la latence', 'la passivation'], a: 0, e: 'Activation : faute → erreur. Propagation : erreur → défaillance.' },
  { q: 'Quels critères servent à classer les fautes dans le cours ?', o: ['Phase de création', 'Intention', 'Persistance', 'Prix du composant'], a: [0, 1, 2], e: 'Sept critères : phase, frontières, dimension, cause phénoménologique, intention, capacité, persistance.' },
  { q: 'Quelles sont les trois grandes classes de fautes ?', o: ['Fautes de développement', 'Fautes physiques', 'Fautes d’interaction', 'Fautes byzantines'], a: [0, 1, 2], e: 'Byzantine qualifie une défaillance, pas une faute.' },
  { q: 'Une faute temporaire interne est dite :', o: ['intermittente', 'transitoire', 'permanente', 'solide'], a: 0, e: 'Temporaire externe : transitoire. Temporaire interne : intermittente (cas du dialyseur).' },
  { q: 'La latence est le temps entre :', o: ['la création de la faute et sa première activation', 'l’erreur et la défaillance', 'deux défaillances successives', 'la panne et la réparation'], a: 0, e: 'Exemple : rappels de véhicules plusieurs années après la vente.' },
  { q: 'Compteur 4 bits, bit de poids fort collé à 0, une impulsion toutes les 2 ms. Latence ?', o: ['16 ms', '8 ms', '32 ms', '2 ms'], a: 0, e: 'Le bit devrait passer à 1 au 8ᵉ top : 8 × 2 = 16 ms.' },
  { q: '« L’appareil n’accepte pas les billets », et le cahier des charges n’en parle pas. C’est :', o: ['pas une défaillance', 'une défaillance catastrophique', 'une défaillance byzantine', 'une erreur'], a: 0, e: 'Une défaillance se juge par rapport au cahier des charges.' },
  { q: 'Quelles affirmations sur Ariane 501 sont exactes ?', o: ['Le logiciel du SRI était repris d’Ariane 4', 'Une conversion 64 bits vers 16 bits a levé une exception', 'Le SRI de secours a échoué pour la même raison', 'Une panne matérielle du moteur est à l’origine de l’accident'], a: [0, 1, 2], e: 'Aucune panne matérielle : une faute logicielle commune aux deux SRI.' },
  { q: 'Oublier de dire quoi faire d’une pression négative est une faute de spécification par :', o: ['incomplétude', 'incohérence logique', 'mauvaise interprétation', 'raffinement'], a: 0, e: 'La spécification ne couvre pas un cas possible.' },
  { q: 'Dix fautes équiprobables : 2 sans coût, 3 de coût 100, 5 de coût 40. Coût moyen ?', o: ['50', '70', '140', '46,7'], a: 0, e: '(0 + 300 + 200) ÷ 10 = 50.' },
  { q: 'Lesquelles sont des fautes malveillantes ?', o: ['Cheval de Troie', 'Tentative d’intrusion', 'Erreur de saisie d’un opérateur', 'Usure d’un composant'], a: [0, 1], e: 'Logiques malignes et tentatives d’intrusion. Les deux autres sont non malveillantes.' }
],
exos: [
  { t: 'Classer cinq fautes', n: 'cours', e: `<p>Classe chaque faute selon : phase de création, frontière, dimension, intention, capacité.</p>
<ol><li>Un développeur se trompe d’indice dans une boucle.</li><li>Un employé mécontent programme l’effacement de la base à une date donnée.</li><li>Un pirate inonde le serveur de requêtes.</li><li>Un condensateur vieillit et finit par claquer.</li><li>Un opérateur tape une consigne dix fois trop grande.</li></ol>`,
    s: `<ol><li><b>Bug logiciel</b> : développement, interne, logicielle, non malveillante, accidentelle.</li>
<li><b>Bombe logique</b> : développement, interne, logicielle, malveillante, délibérée.</li>
<li><b>Déni de service</b> : opérationnelle, externe, logicielle, malveillante, délibérée.</li>
<li><b>Dégradation physique</b> : opérationnelle, interne, matérielle, naturelle donc non malveillante, accidentelle.</li>
<li><b>Erreur d’entrée</b> : opérationnelle, externe, due à l’homme, non malveillante, accidentelle.</li></ol>` },
  { t: 'Faute, erreur ou défaillance ?', n: 'cours', e: `<p>Dans l’exemple de la vanne : une donnée D (1 à 100) sert à calculer S (1 à 10). Le programmeur n’a prévu aucun contrôle. Le capteur envoie une valeur négative ; S devient hors bornes ; la vanne est mal positionnée.</p><p>Identifie les fautes, l’erreur et la défaillance. Que change une redondance efficace ?</p>`,
    s: `<ul><li><b>Faute passive du logiciel</b> : absence de contrôle sur la valeur lue (faute de développement, dormante).</li>
<li><b>Faute du procédé</b> : le capteur envoie une valeur négative ; elle <b>active</b> la faute du logiciel.</li>
<li><b>Erreur</b> : S hors bornes (état interne incorrect).</li>
<li><b>Défaillance</b> : mauvais positionnement de la vanne (le service rendu est faux).</li>
<li>Avec une redondance efficace, l’erreur est <b>corrigée par le produit</b> avant d’atteindre le service : pas de défaillance.</li></ul>` },
  { t: 'Latence du compteur', n: 'calcul', e: `<p>Compteur binaire modulo 16 sur 4 bits (a, b, c, d), poids fort à gauche, une impulsion toutes les 2 ms en moyenne. Le bit de poids fort est collé à 0 dès l’état initial.</p>
<ol><li>Donne les valeurs prises par le compteur.</li><li>À quel top le bit a devrait-il passer à 1 ?</li><li>Latence moyenne ?</li><li>Nature de la faute, de l’erreur et de la défaillance qui suivent ?</li></ol>`,
    s: `<ol><li>0000, 0001, 0010, 0011, 0100, 0101, 0110, 0111, 1000, …, 1111, puis retour à 0000.</li>
<li>Au <b>8ᵉ top</b> (valeur 1000).</li>
<li>8 × 2 ms = <b>16 ms</b>.</li>
<li>La panne matérielle est une faute <b>permanente</b>. Elle provoque une valeur de compteur erronée pendant 8 tops, correcte pendant les 8 suivants : faute <b>transitoire</b>. Elle provoque une <b>erreur</b> dans la représentation du temps écoulé, qui peut conduire à une <b>défaillance temporaire périodique</b> si elle n’est ni détectée, ni corrigée, ni tolérée.</li></ol>` },
  { t: 'Coût moyen d’une faute', n: 'calcul', e: `<p>Dix fautes équiprobables. Immobilisation fixe H = 4 heures. F₁, F₂ : bénignes. F₃ à F₅ : coût fixe C. F₆, F₇ : coût variable V par heure. F₈ à F₁₀ : coût fixe D et coût variable de pente K par heure.</p><p>Exprime le coût moyen en fonction de C, V, D, K.</p>`,
    s: `<p>F₆, F₇ : V × H = 4V chacune. F₈ à F₁₀ : D + K(1 + 2 + 3 + 4) = D + 10K chacune.</p>
<p>CT = 3C + 2 × 4V + 3(D + 10K) = 3C + 8V + 3D + 30K.</p>
<p>CM = CT / 10 = <b>0,3C + 0,8V + 0,3D + 3K</b>.</p>` },
  { t: 'Ariane 501', n: 'TD 1, exercice 5', e: `<p>Recenser et classifier les défaillances et les fautes dans l’échec d’Ariane 501. Quelles leçons en tirer ?</p>`,
    s: `<p><b>Fautes</b></p>
<ul><li>Réutilisation du logiciel du SRI d’Ariane 4 sans reprise des spécifications : faute de <b>spécification</b> (développement, humaine, non malveillante, délibérée : une décision malheureuse).</li>
<li>Conversion 64 bits → 16 bits non protégée : faute de <b>codage</b> (développement, interne, logicielle, non malveillante), dormante sur Ariane 4, activée par la trajectoire d’Ariane 5.</li>
<li>Fonction d’alignement maintenue 40 s après le décollage, exigence d’Ariane 4 inutile ici : faute de spécification.</li>
<li>Redondance par deux SRI identiques : faute de <b>conception</b> de la tolérance aux fautes (mode commun).</li>
<li>Absence de tests avec les données de vol d’Ariane 5 : faute de <b>vérification</b>.</li></ul>
<p><b>Chaîne</b> : exception dans SRI 1 puis SRI 2 (défaillances <b>par arrêt</b> des composants) → pour le calculateur de bord ce sont des <b>fautes</b> ; il reçoit un code de panne pris pour une donnée de vol (<b>erreur</b>, défaillance <b>de valeur</b> du SRI) → braquage des tuyères → défaillance <b>catastrophique</b> du lanceur.</p>
<p><b>Leçons</b> : revoir la spécification à chaque réutilisation ; protéger toutes les conversions ou justifier chaque exception ; diversifier la redondance ; tester avec les conditions réelles ; ne pas laisser tourner du code inutile.</p>
<p><small>Corrigé rédigé à partir du communiqué ESA-CNES reproduit dans le cours ; l’exercice est un devoir maison sans corrigé officiel.</small></p>` }
]
});

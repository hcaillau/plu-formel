# plu-formel

## 1 - Description

Ce dépôt vise à illustrer une approche de formalisation des PLU en vue de permettre l'automatisation du contrôle des règles d'urbanisme par des machines.

Cette approche a été expérimentée dans le cadre du projet SimPLU. Elle résulte des constats suivant :

* De nombreuses informations concernant les restrictions de construction sont prisonnière des PDF (hauteur maximale, recul par rapport à la voirie, etc.)
* Les variantes de rédaction et la complexité des rédactions rendent l'extraction automatique difficile à partir des textes

Elle postule que **pour pouvoir vérifier automatiquement les règles d'urbanisme, il faut formaliser le contenu du règlement**. Qu'importe le format, pour chaque parcelle, il faut connaître le CES maximum, la hauteur maximale de construction, etc.


## 2 - Mise en garde

Formaliser entièrement les documents d'urbanisme est une problématique complexe :

* Le contexte cartographique est complexe (références aux routes, etc.)
* La conditionnelle est complexe (les règles dépendent du type de construction, etc.) 

**On se concentrera d'abord sur la formalisation de règles "primitives" et on traîtera plus tard la composition des règles**. 


## 3 - Principaux concepts

### 3.1 - Règle

Une règle est définie par :

* Un identifiant (ex : `CORE-0001`)
* Un titre (ex : `Restriction sur la hauteur de construction`)
* Un modèle de phrase avec des paramètres (ex : `La hauteur de construction ne doit pas dépasser {{ HAUTEUR_MAX }} mètres`)
* Des paramètres définis par :
    * Un nom (ex : `HAUTEUR_MAX`)
    * Un type (ex : `Real`)
* Des notes et schémas permettant de comprendre comment interpréter la règle


### 3.2 - Registre de règles

Un registre de règles expose un ensemble de règle en vue de leur exploitation dans les outils en respectant les principes suivants :

* Une règle = Une URL qui affiche par défaut une fiche explicative (ex : `https://plu-rule.example.org/registry/CORE-0001`)
* La négociation de contenu permet d'accéder aux informations dans des formats exploitables pour les applications

Par exemple, pour les applications générant des textes de document d'urbanisme `https://plu-rule.example.org/registry/CORE-0001.json` renvoie la définition de la règle avec les paramètres décrit sous forme d'un schema JSON.


### 3.3 - Instance de règle

Une instance de règle est définie par :

* Une zone sur laquelle la règle s'applique (ex : une zone d'urbanisme)
* L'identifiant de la règle d'urbanisme (ex : https://plu-rule.example.org/registry/CORE-0001)
* La valeur des paramètres de la règle (ex : `{HAUTEUR_MAX: 9}`)


### 3.4 - Instanciantion des règles par fichier CSV

> ATTENTION : Cette partie est une ébauche pour discussion avec SmartPLU!

En première approche, il est possible d'instancier les règles d'urbanisme s'appliquant sur les zones d'un PLU à l'aide d'un fichier CSV les colonnes décrites ci-après.

### 3.4.1 - Colonnes pour l'identification du document d'urbanisme

* **DOCUMENT** : Nom de dossier du document d'urbanisme standardisé par le CNIG (ex : `25349_PLU_20010101`).

### 3.4.2 - Colonnes pour l'identification de la zone d'urbanisme

* **INSEE** : Code INSEE de la commune associé à la zone d'urbanisme (anciennement `ZONE_URBA.INSEE` qui a été migré dans les noms de fichier dans le standard CNIG 2017)
* **LIBELLE** : Libellé de zone d'urbanisme (`ZONE_URBA.LIBELLE` dans les standards CNIG)

### 3.4.3 - Colonnes pour l'instanciation des règles

Pour instancier les règles sur les zones d'urbanisme, il suffit d'ajouter des colonnes correspondant aux paramètres de ces règles. Par exemple, on aura :

* Pour IAUIDF-000 : [B1_BANDE](./registry/IAUIDF-000.md#B1_BANDE) et [B1_T_BANDE](./registry/IAUIDF-000.md#B1_T_BANDE)

* Pour IAUIDF-001 : [B1_ART_6](./registry/IAUIDF-001.md#B1_ART_6)

* Pour IAUIDF-002 : [B1_ART_71](./registry/IAUIDF-002.md#B1_ART_71) et [B1_ART_72](./registry/IAUIDF-002.md#B1_ART_72)

* Pour IAUIDF-003 : [B1_ART_73](./registry/IAUIDF-003.md#B1_ART_73)

* Pour IAUIDF-004 : [B1_ART_74](./registry/IAUIDF-004.md#B1_ART_74)

* Pour IAUIDF-005 : [B1_ART_8](./registry/IAUIDF-005.md#B1_ART_8)

* Pour IAUIDF-006 : [B1_ART_9](./registry/IAUIDF-006.md#B1_ART_9)

* Pour IAUIDF-007 : [B1_ART_9](./registry/IAUIDF-007.md#B1_ART_10_m)

* Pour IAUIDF-008 : [B1_ART_13](./registry/IAUIDF-008.md#B1_ART_13)


### 3.4.4 - Remarque

Les outils tels SimPLU devront rechercher les géométries en procédant à une jointure entre la table `ZONE_URBA` du `DOCUMENT` et les `colonnes pour l'identification de la zone d'urbanisme`.

Il est possible et souhaitable en guise de variante d'utiliser un format géométrique (shapefile, GeoJSON, etc.) et d'ajouter une colonne géométrique correspondant à la zone concernée par la régulation.

Un tel fichier peut facilement être constitué manuellement en :

* Copiant la table ZONE_URBA par exemple sous le nom ZONE_URBA_RULE
* Ajoutant les colonnes correspondant aux paramètres des règles


## 4 - Cas d'utilisation

### 4.1 - Génération des textes de document d'urbanisme

Une application qui génère les textes des documents d'urbanisme peut procéder comme suit :

* Elle fait choisir une règle à ajouter à une zone
* Elle récupère la définition de la règle au format JSON (`https://plu-rule.example.org/registry/CORE-0001.json`)
* Elle génère un formulaire pour la saisie des paramètres à l'aide du schéma JSON (voir [json-editor](https://github.com/json-editor/json-editor#json-editor))
* Elle injecte les paramètres dans le modèle de phrase

Et le tour est joué : On ajoute au document "La hauteur de construction ne doit pas dépasser **9** mètres"


### 4.2 - Visualisation de règles d'urbanisme

Dès lors que les règles sont identifiées, il est possible pour chaque règle de mettre en place un code informatique permettant de les comprendre.

Par exemple, pour https://plu-rule.example.org/registry/CORE-0001, on peut extruder la parcelle en fonction de `HAUTEUR` et colorier le volume en bleu pour matérialiser le volume dans lequel doit se trouver le bâtiment.

Pour une règle de recul par rapport au fond de la parcelle, on peut mettre en évidence une zone en rouge en fonction de `DISTANCE_RECUL` et 

En cumulant l'ensemble des informations, on peut générer un volume dans lequel doit s'inscrire le bâtiment ce qui donne déjà une idée sur la morphologie d'un quartier engendrée par un PLU.

**Il n'y pas de magie! Pour chaque règle, il faut un code informatique et les référentiels géographiques adéquats.**. 

A titre d'exemple, il n'y a pas de notion de "fond de parcelle" dans les bases cadastrales, encore moins des bandes sur ces parcelles en fonction de ces "fonds de parcelle", etc. Ensuite, si les règles ont des variantes dans la formulation de la hauteur, la machine ne devinera pas la méthode de transposition :

![Cas de hauteur définie par niveau](img/32353-ua-hauteur.png)


### 4.3 - Vérification de règles d'urbanisme (ex : permis de construire)

Connaissant un projet de bâtiment défini par un modèle 3D, pour vérifier https://plu-rule.example.org/registry/CORE-0001, on peut vérifier que le bâtiment ne dépasse une hauteur de `HAUTEUR` mètre.

En procédant de même pour toutes les règles, on peut savoir lesquelles sont respectées ou non.

Là encore, il n'y a pas de magie : Pour chaque règle, il faut du code et un contexte.


### 4.4 - Génération de bâtiment

Avec [SimPLU](https://github.com/SimPLU3D/) par exemple, on choisit un modèle de bâtiment paramétrique :

* Un cuboid défini par un centre, une longueur, une largueur, une hauteur, une orientation
* Un bâtiment simple avec un toit défini par centre, longueur, largeur, h1, h2
* ... ou tout modèle à partir des paramètres, on peut générer programmatiquement le volume

[SimPLU](https://github.com/SimPLU3D/) explore l'espace des paramètres en générant un ou des bâtiments, il contrôle pour chaque bâtiment généré les règles et conserve le meilleur suivant un critère (ex : le volume).

Remarque : 

* Il suffit donc en théorie de pouvoir valider les règles pour un modèle 3D de bâtiment pour pouvoir simuler l'effet de ces règles sur la constructibilité.
* En pratique, il faut aussi être un peu intelligent sur l'ordre de validation des règles (innutile de faire les contrôles coûteux en terme de calcul ne passent pas)
* En pratique, il faut même être un peu intelligent sur l'exploration des paramètres (innutile de générer des bâtiment non alignés s'il faut les aligner)


### 5 - Exemple de registre

Le dossier [registry](registry/index.md) donne une idée de ce à quoi pourrait ressembler les données d'un registre de règles d'urbanisme.

Remarque : Il conviendra de le compléter avec les règles [SimPLU](https://github.com/SimPLU3D/) définie pour IAU IDF.

Le fichier [sample/rennes.csv](sample/rennes.csv) illustre le principe d'instanciation des règles "RENNES-" à l'aide d'un fichier CSV où :

* La première colonne `Nom_zone` permet d'identifier la zone concernée du PLU
* Les colonnes suivantes correspondent aux paramètres d'instanciation des règles


## 6 - Preuve de concept

### 6.1 - Démonstrateur SimPLU

#### 6.1.1 - En entrée

* Embryon de registre de règle : https://demo-simplu3d.ign.fr/views/rule/view.html
* Instanciation des règles avec un CSV : https://demo-simplu3d.ign.fr/api/project/1/file/rules.csv
* Des données géographiques : https://demo-simplu3d.ign.fr/#/project/1/file

#### 6.1.2 - En sortie

* Texte généré : https://demo-simplu3d.ign.fr/#/project/1/rule
* Une carte où l'on peut cliquer sur les parcelles pour voir si les règles sont respectées : https://demo-simplu3d.ign.fr/#/project/1/map
* Un globe où des projets de bâtiment sont proposés en fonction des règles d'urbanisme : https://demo-simplu3d.ign.fr/#/project/2/globe

#### 6.1.3 - Limites

C'est la v0 d'un démonstrateur, limité à une zone d'un PLU, avec un ensemble de règles propre à Rennes Métropole, etc. Les idées pour la suite étaient les suivantes : 

* Télécharger automatiquement les données du géoportail de d'urbanisme et les données du cadastre
* Partager les annotations sur les parcelles
* Finaliser une interface de saisie pour le CSV
* Optimiser/industrialiser le [coeur SimPLU](https://github.com/SimPLU3D/simplu3D-rules), unifier l'implémentation des règles, renforcer les tests, etc.
* Générer des bâtiments plus réaliste
* ...


### 6.2 - IAU IDF

Cette expérimentation à l'échelle de la région île de France s'appuie sur le même principe d'instanciation règles par fichier CSV que le démonstrateur simplu pour Rennes métropôle.

Les règles sont toutefois différentes : 

* Voir [registry/IAUIDF-\*.md](registry/index.md)) pour les règles associées
* Voir [sample/TODO.csv](sample/TODO.csv) pour un exemple d'instanciation des règles par fichier CSV


## 7 - Relation possible avec d'autres projets


### 7.1 - Standard CNIG et Géoportail de l'Urbanisme

Le Géoportail de l'Urbanisme pourrait exposer le registre des règles d'urbanisme (les données de ce registre gagnerait toutefois à être hébergée dans un dépôt GitHub pour permettre des contributions)

Le standard CNIG pourrait proposer des extensions pour l'instanciation de ces règles. Exemple : permettre l'ajout d'un fichier `reglement.json` avec une structure permettant d'instancier les règles générales et les règles s'appliquant sur chaque zone, etc.)


### 7.2 - SmartPLU

#### 7.2.1 - Principe

SmartPLU tente à l'aide de technique d'IA d'extraire les informations des textes des documents d'urbanisme présent sur le [Géoportail de l'urbanisme](https://www.geoportail-urbanisme.gouv.fr).

Dans un premier temps, afin de s'assurer que les résultats sont facilement exploitables par des outils de type SimPLU, SmarPLU produira une instanciation des règles au format CSV avec :

* Les informations permettant d'identifier le PLU
* Les informations permettant d'identifier la zone d'urbanisme concernées
* Les paramètres des règles `IAUIDF`

<span style="color: red">TODO : Documenter et référencer le format correspondant</span>

Dès lors, SimPLU pourra prendre ces données en entrée pour :

* Fournir une idée de la constructibilité engendré par le PLU
* Vérifier que des bâtiments ou projets de bâtiment sont conformes aux règles
* ...

Remarque : SimPLU dispose d'un ensemble de fonctionnalité, il faudra choisir lesquelles mettre en valeur dans le cadre de SmartPLU et définir des formats facilements exploitables pour la mise en oeuvre de démonstrateur.


### 7.2.2 - Long terme

L'approche SmartPLU pourrait être intéressante pour :

* Identifier des modèles d'article récurrent dans les PLU pour compléter le registre des règles
* Identifier les variantes de formulation (sans quoi on trouvera 150 000 modèles non exploitable)


### 7.3 - PLU Manager

[PLU Manager](https://www.plan-local-d-urbanisme.fr/outil-logiciel-plu-manager/) génère les textes de document d'urbanisme. La fonction "Duplication d'articles existants" n'est pas très loin d'une fonctionnalité de création d'article à partir d'un modèle qui pourrait s'appuyer sur un registre de règle et générer un fichier `reglement.json`

### 7.4 - D'autres idées, d'autres références?

Faire une issue sur le dépôt GitHub


## 8 - Remarques

### 8.1 - Cas du registre de règle

L'approche proposée est une exploitation pragmatique des concepts de **Linked-Data**.

On trouve déjà cette approche en action dans d'autres domaines. Par exemple, dans le domaine des projections cartagraphique, on dispose de http://epsg.io/2154 qui nous renvoie une fiche et de http://epsg.io/2154.js qui nous fournit des données exploitables pour la bibliothèque Proj4JS. On peut alors s'appuyer sur le registre pour tranformer facilement du Lambert 93 en coordonnées GPS.

De plus, l'approche des registres est en train de se généraliser avec INSPIRE qui l'applique entre autre pour la traduction des mots clés (Voir http://inspire.ec.europa.eu/registry/)


### 8.2 - Cas du modèle de règle

Il manque des éléments dans les primitives pour les regrouper (catégorie, etc.). Il serait logique de commencer par faire simple et d'attendre les besoins des applicatifs

La composition des règles nécessitera la mise en oeuvre de mécanisme de logique pour supporter des conditions d'application des règles. Avec la forme actuelle des documents qui offre une grande liberté, la mise en oeuvre serait loin d'être triviale.

Remarque : SimPLU dispose d'une composante [simplu3d-ocl](https://github.com/SimPLU3D/simplu3D-ocl) (Object Constraint Language). Elle n'est pas forcément optimale dans la mesure où elle est équivalente à l'utilisation d'un langage de script difficilement transposable en texte compréhensible par le commun des mortels.

### 8.3 - Cas de l'instanciation des règles au format CSV

L'avantage de cette méthode est qu'elle permet de simplement modéliser le réglement et de le maintenir. L'inconvéniant est une une faible expressivité et un risque de devoir gérer beaucoup de paramètres. Une règle comme "HAUTEUR MAXIMALE DES CONSTRUCTIONS" peut varier en fonction du type de bâtiment concerné, de la voirie adjacente, etc., il faudra réfléchir au bon compromis entre exhaustivité dans la représentation réglementaire et choix pratiques. 

# Approche SimPLU pour la modélisation des règles d'urbanisme

## Les besoins des utilisateurs finaux

Etre capable en fonction du PLU de :

* Visualiser les effets du règlement
    * Visualiser la hauteur maximum de construction 

* Connaître la surface maximum de construction pour une évaluation foncière

* ...


## Problème

Pour répondre à ces besoins, il faut **être capable d'interpréter informatiquement les règles définies dans les PLU**, c'est à dire :

* Les règlements des documents d'urbanisme en format texte ne sont pas interprétables par des machines
* L'extraction de modèle de ces textes est loin d'être triviale


## Approche SimPLU

L'approche qui se dégage des travaux de SimPLU après plusieurs expérimentations consiste à établir une bible de règle.

Cette bible de règle s'apparente aux articles que l'on retrouve dans retrouve dans les documents d'urbanismes avec une identification des paramètres. Par exemple : `Une bande de {{LARGEUR}} m (par rapport au fond de la parcelle) est inconstructible.`

Dans un monde idéal pour SimPLU, le règlement d'urbanisme est l'instanciation de ces règles avec des paramètres spécifiques à chaque zonage. 


## Implémentation actuelle

Ceci n'étant pas le cas dans les standards CNIG PLU 2013 et 2016, SimPLU procède par extension du standard CNIG en ajoutant une tableau de règles où l'on trouve :

* Le nom du PLU
* Le nom de la zone
* Les variables permettant d'instancier les articles sur la zone (hauteur maximum de construction, etc.)

Cette approche est guidée par les points suivants :

* Ne pas s'éloigner trop du standard CNIG
* Ne pas imposer la mise en oeuvre d'outils de saisie compliqué des règles (une table peut être éditée par excel, libreoffice, QuantumGIS, etc.)


## Implémentation possible dans le standard CNIG

### 1) Codification d'une bible de règle officielle

* Un code : `ART0001`
* Un modèle d'article : `Une bande de {{A}} m (par rapport au fond de la parcelle) est inconstructible.` 
* Une fiche descriptive présentant la méthode d'interprétation

Remarque : C'est en raison de l'absence d'une bible officielle des articles que SimPLU travaille actuellement sur une table de règle séparées.


### 2) Instanciation des règles dans ZONE_URBA

 * Colonne `LIB_ART0001_A` : valeur du paramètre "{{A}}" dans le modèle d'article.


## Avantages

* Il est possible de mettre en oeuvre un code informatique de validation face à modèle d'article (le PLU devient interprétable numériquement)

* Il est possible d'interpréter facilement seulement certains types de règle (visualisation à la volée d'une hauteur maximum codée dans LIB_ART0123_A)

* Permet aussi de mettre en oeuvre des outils de génération des pièces écrites

* Pas de révolution du standard CNIG

* ...

## Inconvénients

* Les PLU existant ne sont pas interprétables (on gagne toutefois un cadre pour stocker des résultats de travaux de machine learning sur les PLU)



## Preuve de concept (TODO)

* Codifier la bible SimPLU dans ce modèle
* Configurer une carte QuantumGIS pour visualiser le texte associé à une zone

# Approche SimPLU pour la modélisation des règles d'urbanisme

## Les besoins des utilisateurs finaux

Être capable en fonction du PLU de :

* Visualiser les effets du règlement
    * Visualiser la hauteur maximum de construction 

* Connaître la surface maximum de construction pour une évaluation foncière

* ...


## Problème

Pour répondre à ces besoins, il faut **être capable d'interpréter informatiquement les règles définies dans les PLU**

Toutefois :

* Les règlements des documents d'urbanisme en format texte ne sont pas interprétables par des machines
* L'extraction de modèles de ces textes est loin d'être triviale


## Approche SimPLU

L'approche qui se dégage des travaux de SimPLU après plusieurs expérimentations consiste à établir une bible de règles.

Cette bible de règles s'apparente aux articles que l'on retrouve dans les documents d'urbanismes avec une identification des paramètres. Par exemple : `Une bande de {{LARGEUR}} m (par rapport au fond de la parcelle) est inconstructible.`

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

* Un code : `A0001`
* Un modèle d'article : `Une bande de {{A}} m (par rapport au fond de la parcelle) est inconstructible.` 
* Une fiche descriptive présentant la méthode d'interprétation

Remarque : 

* C'est en raison de l'absence d'une bible officielle des articles que SimPLU travaille actuellement sur une table de règle séparées
* Cette modélisation de règle doit être étendue pour les autres besoins. Par exemplement : 
    *  Ajouter une classification : "EMPRISE AU SOL DES CONSTRUCTIONS", "HAUTEUR MAXIMALE DES CONSTRUCTIONS", etc.) pour permettre le regroupement des règles dans des articles.

[Comm MBrasebin] : L'avantage de cette méthode est qu'elle permet de simplement modéliser le réglement et de le maintenir, l'inconvéniant est une une faible expressivité et un risque de devoir gérer beaucoup beacoup de paramètres. Une règle comme "HAUTEUR MAXIMALE DES CONSTRUCTIONS" peut varier en fonction du type de bâtiment concerné, de la voirie adjacente, etc., il faudra réfléchir au bon compromis entre exhaustivité dans la représentation réglementaire et choix pratiques.    
 

### 2) Scénario d'instanciation des règles à étudier

### 2.1) Implémentation des règles dans ZONE_URBA

 * Colonne `LIB_A0001_A` : valeur du paramètre "{{A}}" dans le modèle d'article `A0001`.

### 2.2) Mise en oeuvre d'un format dédié (json, xml, rdf, etc.)

En travaillant sur un modèle de plan de PLU, il doit être possible d'instancier ces règles en collant mieux à la structure d'un règlement d'urbanisme.


## Avantages 

### Bible des règles

* Il est possible de mettre en oeuvre un code informatique de validation face à chaque règle (le PLU devient interprétable numériquement)

* La bible des règles peut servir de support pour mettre en oeuvre des outils de génération des pièces écrites

Chaque technique d'implémentation offrira des avantages propres.

### Scénario 2.1

* Il est possible d'interpréter facilement seulement certains types de règle (visualisation à la volée d'une hauteur maximum codée dans LIB_A0123_A)

* Pas de révolution du standard CNIG

### Scénario 2.2

* Sera plus facilement extensible
* Permet de viser à terme le remplacement intégral du règlement PDF (génération en fonction du règlement formalisé)?


## Inconvénients

### Bible des règles

Il faudra traiter le cas des réglements existants qui n'ont pas été formalisé. On gagne toutefois un cadre pour cette formalisation et pour l'extraction d'information via les travaux de machine learning par exemple.


### Scénario 2.1

* Risque de faire gonfler le nombre de colonne dans la table ZONE_URBA au point d'être inexploitable (se concentrer sur les principales règles que l'on veut/peut interpréter automatiquement?)

### Scénario 2.2

* Effort de modélisation conséquent à réaliser pour que la généricité ne rende pas la donnée inexploitable
* Nécessitera la mise en oeuvre d'outil d'accompagnement pour l'édition des règles


## Preuve de concept (TODO)

* Codifier la bible SimPLU dans ce modèle
* Configurer une carte QuantumGIS pour visualiser le texte associé à une zone

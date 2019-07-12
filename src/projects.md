
# Relation possible avec d'autres projets


## Standard CNIG et Géoportail de l'Urbanisme

Le Géoportail de l'Urbanisme pourrait exposer le registre des règles d'urbanisme (les données de ce registre gagnerait toutefois à être hébergée dans un dépôt GitHub pour permettre des contributions)

Le standard CNIG pourrait proposer des extensions pour l'instanciation de ces règles. Exemple : permettre l'ajout d'un fichier `reglement.json` avec une structure permettant d'instancier les règles générales et les règles s'appliquant sur chaque zone, etc.)


## SmartPLU

### Principe

SmartPLU tente à l'aide de technique d'IA d'extraire les informations des textes des documents d'urbanisme présent sur le [Géoportail de l'urbanisme](https://www.geoportail-urbanisme.gouv.fr).

Dans un premier temps, afin de s'assurer que les résultats sont facilement exploitables par des outils de type SimPLU3D, SmartPLU produira une instanciation des règles au format CSV sur la base des règles "IAUIDF".

Dès lors, SimPLU3D pourra prendre ces données en entrée pour :

* Fournir une idée de la constructibilité engendré par le PLU
* Vérifier que des bâtiments ou projets de bâtiment sont conformes aux règles
* ...


## Long terme

L'approche SmartPLU pourrait être intéressante pour :

* Identifier des modèles d'article récurrent dans les PLU pour compléter le registre des règles
* Identifier les variantes de formulation (sans quoi on trouvera 150 000 modèles non exploitable)

## APUR

L'APUR publie en opendata une table [PLU HAUTEUR](http://opendata.apur.org/datasets/plu-hauteur/data) conceptuellement proche de l'instanciation CSV des règles d'urbanisme proposée par SimPLU.

On y trouve en effet une colonne "Règlement hauteur" prenant par exemple pour valeur "de 16 à 24m".


## PLU Manager

[PLU Manager](https://www.plan-local-d-urbanisme.fr/outil-logiciel-plu-manager/) génère les textes de document d'urbanisme. La fonction "Duplication d'articles existants" n'est pas très loin d'une fonctionnalité de création d'article à partir d'un modèle qui pourrait s'appuyer sur un registre de règle et générer un fichier `reglement.json`


## D'autres idées, d'autres références?

Faire une issue sur le dépôt GitHub

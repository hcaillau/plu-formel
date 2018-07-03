# IAUIDF-007 - Hauteur maximale des constructions

## Modèle de phrase

> La hauteur de construction ne doit pas dépasser {{B1_ART_10_m}}} mètres

## Paramètres

### B1_ART_10_m

Valeur maximale de hauteur en m (88= non renseignable, 99=non réglementé)


## Explications

{{B1_ART_10_m}} désigne la hauteur maximale des bâtiments

![Image montrant la contrainte de hauteur maximale d'un bâtiment](img/IAUIDF/IAUIDF-007.png)

## Implémentation

La vérification de la distance s'effectue dans la classe PredicateIAUIDF.

**NOTE :** Par rapport aux règles de l'IAU-IDF qui définissent la modalité de calcul de la hauteur (ART_10T) et la valeur maximale calculée en fonction de cette modalité (ART_10), nous utilisons ici seulement la valeur {{B1_ART_10_m}} qui correspond à la hauteur maximale en mètres. Cette valeur est calculée à partir de (ART_10T) et (ART_10) par l'IAU-IDF.

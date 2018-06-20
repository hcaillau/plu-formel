# IAUIDF-006 - Coefficient d'emprise au sol maximum

## Modèle de phrase

> Le coefficient d'emprise au sol (rapport entre surface bâtie et surface de la parcelle) est limité à {{B1_ART_9}}.

## Paramètres
*  {{B1_ART_9}} : Valeur maximale du coefficient d'emprise au sol (entre 0 et 1)


## Explications

{{B1_ART_9}} indique le ratio maximal entre la surface bâtie et la surface de la parcelle.

![Image montrant la contrainte de distance entre deux  bâtiments](img/rules/IAUIDF/IAUIDF-006.png)

## Implémentation

La vérificationdu ratio s'effectue dans la classe PredicateIAUIDF et seul le coefficient de la première bande est pris en compte.

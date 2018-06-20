# IAUIDF-005 - Distance minimale entre bâtiments

## Modèle de phrase

> La distance entre les bâtiments au sein de la parcelle doit être supérieure à {{B1_ART_8}} m.

## Paramètres
*  {{B1_ART_8}} : Valeur en m de la distance minimale à respecter entre deux bâtiments.


## Explications

{{B1_ART_8}} indique la distance minimale qui doit être respectée entre deux bâtiments.

![Image montrant la contrainte de distance entre deux bâtiments](./../img/rules/IAUIDF/IAUIDF-005.png)

## Implémentation

La vérification de la distance s'effectue dans la classe PredicateIAUIDF et les distances sont mesurées entre les deux bandes de constructibilité.

# IAUIDF-003 - Distance par rapport au fond de parcelle

## Modèle de phrase

> Une distance de {{B1_ART_73}} m doit être respecté par rapport au fond de la parcelle.

## Paramètres
*  {{B1_ART_73}} : Distance de recul en m par rapport au fond de la parcelle. (88= non renseignable, 99=non réglementé)


## Explications

Un recul de  {{B1_ART_73}} m s'applique par rapport au fond de la parcelle.

![Image illustrant la contrainte de recul par rapport au fond de la parcelle](img/rules/IAUIDF/IAUIDF-003.png)

## Implémentation

La vérification de la distance s'effectue dans la classe PredicateIAUIDF sauf si les valeurs sont 88 et 99.

# Registre de règles SimPLU3D

> ATTENTION : https://mborne.github.io/plu-formel/ a vocation sur le long terme à être remplacé par exemple par https://www.geoportail-urbanisme.gouv.fr/schemas/plu-formel/1.0

## Description

L'approche de formalisation des PLU présentée ici a été expérimentée dans le cadre du projet SimPLU3D. Elle résulte des constats suivant :

* De nombreuses informations concernant les restrictions de construction sont prisonnière des PDF (hauteur maximale, recul par rapport à la voirie, etc.)
* Les variantes de rédaction et la complexité des rédactions rendent l'extraction automatique difficile à partir des textes

Elle postule que **pour pouvoir vérifier automatiquement les règles d'urbanisme, il faut formaliser le contenu du règlement**. Qu'importe le format, pour chaque parcelle, il faut connaître le CES maximum, la hauteur maximale de construction, etc.

## Mise en garde

Formaliser entièrement les documents d'urbanisme est une problématique complexe :

* Le contexte cartographique est complexe (références aux routes, etc.)
* La conditionnelle est complexe (les règles dépendent du type de construction, etc.)

**On se concentrera d'abord sur la formalisation de règles "primitives" et on traîtera plus tard la composition des règles**.

En outre, des travaux sont en cours pour affiner la modélisation de ce registre de règle avec l'équipe SmartPLU. Ces travaux portent en particulier sur :

* L'utilisation du format XML pour la modélisation des règles d'urbanisme (production des schémas XSD associés)
* La gestion du lien entre les règles dans un tel format et les documents d'urbanisme présents sur le GpU


## Concepts

### Règle d'urbanisme

Une règle sur une zone d'urbanisme est définie à l'aide des propriétés suivantes :

| Propriété  | Type         | Description                                                         | Exemple                                                                                                 |
| ---------- | ------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `id`       | `URL`        | URI identifiant la règle d'urbanisme                                | "IAUIDF-001"                                                                                              |
| `title`    | `string`     | Nom de la règle pour présentation                                   | "Distance minimale à la voirie"                                                                         |
| `template` | `string`     | Règle sous forme de phrase avec des paramètres                      | `Les bâtiments ne doivent pas être construits à une distance inférieure à {{ B1_ART_6 }} de la voirie.` |
| `params`   | `RuleParams` | Valeurs nommées définissants les paramètres de la règle d'urbanisme | `B1_ART_6 de type numérique`                                                                            |

Remarque : 

* Une URI construire à partir de l'identifiant fournira la fiche descriptive de la règle
* L'URI définissant la règle doit être déréférençable et donner des précisions sur l'interprétation de la règle d'urbanisme.

### Registre de règles

Un registre de règles représente un ensemble de règles. Il permet de recenser et décrire l'ensemble des règles connues.

En outre, il permet d'obtenir une fiche descriptive associée à l'identifiant de règle. Par exemple :

https://mborne.github.io/plu-formel/registry/IAUIDF-001


### Exemple de registre

Voir [Registre des règles SimPLU](registry/index.md) pour les règles IAUIDF/CartoPLU+ et les règles du démonstrateur Rennes Métropole.


## Instanciation des règles d'urbanisme

### Principe

Instancier les règles d'urbanisme revient à fournir les paramètres des règles d'urbanisme s'appliquant sur les différentes zones d'un PLU.

On propose dans un premier temps de fournir les informations suivantes pour définir les règles qui s'appliquent aux zones d'un document d'urbanisme:

| Nom             | Type         | Description                                                                                                                              |
| --------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `document.id`   | `URL`        | URL identifiant le document d'urbanisme (ex : https://www.geoportail-urbanisme.gouv.fr/document/by-id/69f0e42b13c577e63186146f9f1e65c5 ) |
| `document.name` | `string`     | Le nom du document (ex : `25392_PLU_20170602`)                                                                                           |
| `zone.code`     | ̀`string`    | Libelle de la zone d'urbanisme (équivalent à ZONE_URBA.LIBELLE dans le standard CNIG, ex : `UAb`)                                        |
| `rule.id`       | `URL`        | URL pointant sur la fiche descriptive de la règle (ex : https://mborne.github.io/plu-formel/registry/IAUIDF-001)                         |
| `rule.citation` | `string`     | Extrait du texte du document d'urbanisme fournissant définissant les paramètres (produit par SmartPLU)                                   |
| `rule.params`   | `RuleParams` | Liste des valeurs des paramètres nommés de la règle                                                                                      |

### Format XML

**POUR DISCUSSION AVEC NUMEN/SMARTPLU AVANT PRODUCTION XSD**

Il est proposé de :

* Travailler avec un fichier XML par document d'urbanisme présent sur le GpU (ex : `69f0e42b13c577e63186146f9f1e65c5.xml`)
* De remplir le fichier comme suit :

```xml
<document 
    id="https://www.geoportail-urbanisme.gouv.fr/document/by-id/69f0e42b13c577e63186146f9f1e65c5" 
    name="25392_PLU_20170602"
>
    <zone code="A" />
    <zone code="Aa" />
    <zone code="Au" />
    <zone code="N" />
    <zone code="U">
        <rules>
            <!-- 1 bande de constructibilité de 6m -->
            <rule id="IAUIDF-000">
                <param name="B1_T_BANDE">1</param>
                <param name="B1_BANDE">6.0</param>
                <citation>
                ... extrait de texte définissant la contrainte...
                </citation>
            </rule>

            <!-- IAUIDF-007 - Hauteur maximale des constructions -->
            <rule id="IAUIDF-001">
                <params>
                    <param name="B1_ART_6">6.0</param>
                </params>
            </rule>

            <!--
            Plusieurs apparition d'un même id sont possibles si une même règle IAUIDF-XXX 
            instanciée plusieurs fois a du sens
            -->
            <rule id="IAUIDF-XXX">
                <param name="B1_ART_XX">4</param>
                <param name="B1_ART_XX_unit">1</param>
            </rule>
            <rule id="IAUIDF-XXX">
                <param name="B1_ART_XX">6</param>
                <param name="B1_ART_XX_unit">2</param>
            </rule>
        </rules>
    </zone>
</pluFormel>
```

Remarque :

* Un règle peut avoir plusieurs paramètres fonctionnant ensemble (identifiant de règle != nom de paramètre de règle)
* SimPLU devra faire une jointure entre `ZONE_URBA.LIBELLE` et `zone.code` pour trouver la zone géographique, puis les parcelles, où ces règles s'appliquent
* On choisit ici de dire "une zone est porteuse de règles" et de ne pas fusionner zone/rules en `<rules codeZone="U">...</rules>` pour
  * Que le modèle de règle soit au maximum indépendant du concept de document d'urbanisme pour ne pas se priver de la possibilité d'instancier des règles sur des simples surfaciques
  * Qu'il est soit plus naturel d'étendre un GeoJSON (ex : [ZONE_URBA.json](sample/69f0e42b13c577e63186146f9f1e65c5/ZONE_URBA.geojson) avec une propriété `rules` (sans limitation avec les formats SHAPEFILE et MAPINFO, nous proposerions un `LIB_REGLES` au niveau des `ZONE_URBA` du standard CNIG)



## Resources

* [Preuves de concepts et démonstrateurs](poc.md)
* [Principe d'instanciation des règles en CSV (ancien fonctionnement)](legacy-csv.md)
* [Relation possible entre ce registre de règle et d'autres projets](projects.md)

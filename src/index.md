# Registre de règles SimPLU3D

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
| `id`       | `URL`        | URI identifiant la règle d'urbanisme                                | https://mborne.github.io/plu-formel/registry/IAUIDF-001                                                 |
| `title`    | `string`     | Nom de la règle pour présentation                                   | "Distance minimale à la voirie"                                                                         |
| `template` | `string`     | Règle sous forme de phrase avec des paramètres                      | `Les bâtiments ne doivent pas être construits à une distance inférieure à {{ B1_ART_6 }} de la voirie.` |
| `params`   | `RuleParams` | Valeurs nommées définissants les paramètres de la règle d'urbanisme | `B1_ART_6 de type numérique`                                                                            |

Remarque : L'URI définissant la règle doit être déréférençable et donner des précisions sur l'interprétation de la règle d'urbanisme.

### Registre de règles

Un registre de règles représente un ensemble de règles.

### Règles pour la nécogiation de contenu

* L'URI identifiant la règle doit être sans extension et produire une page HTML
* L'ajout d'un suffixe `.xsd` à un identifiant de règle doit fournir le schéma XSD décrivant entre autres les paramètres
* L'ajout d'un suffixe `.json` doit fournir le schéma JSON pour l'instanciation de la règle

Exemple :

* https://mborne.github.io/plu-formel/registry/IAUIDF-001
* https://mborne.github.io/plu-formel/registry/IAUIDF-001.xsd
* https://mborne.github.io/plu-formel/registry/IAUIDF-001.json


## Instanciation des règles d'urbanisme

### Principe

On propose dans un premier temps de fournir les informations suivantes pour définir les règles qui s'appliquent aux zones d'un document d'urbanisme:

| Nom         | Type         | Description                                                                                                                              |
| ----------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| document_id | `URL`        | URL identifiant le document d'urbanisme (ex : https://www.geoportail-urbanisme.gouv.fr/document/by-id/69f0e42b13c577e63186146f9f1e65c5 ) |
| document    | `string`     | Le nom du document (ex : `25392_PLU_20170602`)                                                                                           |
| zone        | ̀`string`    | Libelle de la zone d'urbanisme (équivalent à ZONE_URBA.LIBELLE dans le standard CNIG, ex : `UAb`)                                        |
| rule_id     | `URL`        | URL pointant sur la fiche descriptive de la règle (ex : https://mborne.github.io/plu-formel/registry/IAUIDF-001)                         |
| citation    | `string`     | Extrait du texte du document d'urbanisme fournissant définissant les paramètres (produit par SmartPLU)                                   |
| params      | `RuleParams` | Valeurs des paramètres de la règles                                                                                                      |

### Format XML

**POUR DISCUSSION AVEC NUMEN/SMARTPLU AVANT PRODUCTION XSD**

Il est proposé de :

* Travailler avec un fichier XML par document d'urbanisme présent sur le GpU (ex : `69f0e42b13c577e63186146f9f1e65c5.xml`)
* De remplir le fichier comme suit :

```xml
<document id="https://www.geoportail-urbanisme.gouv.fr/document/by-id/69f0e42b13c577e63186146f9f1e65c5" name="25392_PLU_20170602">
    <zones>
        <zone name="A" />
        <zone name="Aa" />
        <zone name="Au" />
        <zone name="N" />
        <zone name="U">
            <rules>
                <!-- Les bâtiments ne doivent pas être construits à une distance inférieure à 6.0 mètres de la voirie. -->
                <rule id="https://mborne.github.io/plu-formel/registry/IAUIDF-001">
                    <params>
                        <B1_ART_6>6.0</B1_ART_6>
                    </params>
                </rule>
            </rules>
        </zone>
    </zones>
</document>
```

### Format JSON

**Pour produire en parallèle des schémas JSON équivalents**

```json
{
    "id": "https://www.geoportail-urbanisme.gouv.fr/document/by-id/69f0e42b13c577e63186146f9f1e65c5",
    "name": "25392_PLU_20170602",
    "zones": [
        {
            "name":"A",
            "rules": [
                {
                    "id":"https://mborne.github.io/plu-formel/registry/IAUIDF-001",
                    "params": {
                        "B1_ART_6": 6.0
                    }
                }
            ]
        }
    ]
}
```

## Resources

* [Preuves de concepts et démonstrateurs](poc.md)
* [Principe d'instanciation des règles en CSV (ancien fonctionnement)](legacy-csv.md)
* [Relation possible entre ce registre de règle et d'autres projets](projects.md)

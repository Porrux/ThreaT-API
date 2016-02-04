# ThreaT-API

## Règles
* Pas d'authentification
* Ajout d'evt anonymement

## Modèle de données
* Event
    - uuid
    - country
    - location
        + [x, y]
    - timestamp
    - level
    - type
    - rating
    - effectArea
    - title
    - description
    - [picture]
    - [news]
* Type
    - uuid
    - label

## Api
* /api/event GET
* /api/event POST
* /api/event/{id} GET
* /api/event/{id} PUT
* /api/event/{id}/vote POST
* /api/event/{id}/picture POST
* /api/event/{id}/news POST
* /api/event/{id} DELETE

* /api/type GET
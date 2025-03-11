+--------------------------+
|      Administrateur      |
+--------------------------+
| id (PK)                  |
| admin (string)           |
| email (string)           |
| password (string)        |
+--------------------------+

+--------------------------+       +--------------------------+       +--------------------------+       +--------------------------+
|         Equipe           |       |       Activités          |       |       Actualité          |       |        Document          |
+--------------------------+       +--------------------------+       +--------------------------+       +--------------------------+
| id (PK)                  |       | id (PK)                  |       | id (PK)                  |       | id (PK)                  |
| nom (string)             |       | categorie (string)       |       | titre (string)           |       | titre (string)           |
| prenom (string)          |       | info (texte)             |       | image (string)           |       | url (string)             |
| fonction (string)        |       | public_cible (string)    |       +--------------------------+       +--------------------------+
| photo (string)           |       | horaire (string)         |
| description (texte)      |       +--------------------------+
|   |
+--------------------------+


Diagramme des associations :
+--------------------------+       +--------------------------+       +--------------------------+       +--------------------------+
|      Administrateur      |       |         Equipe           |       |       Activités          |       |       Actualité          |
+--------------------------+       +--------------------------+       +--------------------------+       +--------------------------+
| id (PK)                  |<--0-n | id (PK)                  |       | id (PK)                  |<--0-n | id (PK)                  |
| admin (string)           |       | nom (string)             |       | categorie (string)       |       | titre (string)           |
| email (string)           |       | prenom (string)          |       | info (texte)             |       | image (string)           |
| password (string)        |       | fonction (string)        |       | public_cible (string)    |       +--------------------------+
+--------------------------+       | photo (string)           |       | horaire (string)         |
                                    | description (texte)      |       +--------------------------+
                                    | administrateur_id (FK)   |
                                    +--------------------------+

+--------------------------+
|        Document          |
+--------------------------+
| id (PK)                  |
| titre (string)           |
| url (string)             |
+--------------------------+

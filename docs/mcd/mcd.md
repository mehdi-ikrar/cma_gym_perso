+--------------------------+
|      Administrateur      |
+--------------------------+
| id (PK)                  |
| admin (string)           |
| email (string)           |
| password (string)        |
+--------------------------+
           │
           │ (gère)
           ▼
+--------------------------+       +--------------------------+       +--------------------------+       +--------------------------+
|         Equipe           |       |       Activités          |       |       Actualité          |       
+--------------------------+       +--------------------------+       +--------------------------+       +--------------------------+                                      0-n
| id (PK)                  |       | id (PK)                  |  <--    | id (PK)                  |     (PK)                  |       <--0-n                            faire
| nom (string)             |  animé| categorie (string)       | -->      | titre (string)           |        (string)           |          -->                               0-n
| prenom (string)          | 0-n     | info (texte)             |       | image (string)           |         (string)             |
| fonction (string)        |       | public_cible (string)    |       +--------------------------+       +--------------------------+
| photo (string)           |       | horraire (string)        |
| description (texte)      |       +--------------------------+
+--------------------------+

+--------------------------+
|         Document         |
+--------------------------+
| id (PK)                  |
| titre (string)           |
| url   (string)           |
+--------------------------+

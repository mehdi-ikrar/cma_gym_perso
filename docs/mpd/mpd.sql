CREATE TABLE administrateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    fonction VARCHAR(50) NOT NULL,
    photo VARCHAR(255),
    description TEXT,
    administrateur_id INT NOT NULL,

);

CREATE TABLE activites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categorie VARCHAR(50) NOT NULL,
    info TEXT,
    public_cible VARCHAR(50) NOT NULL,
    horaire VARCHAR(50) NOT NULL,
    administrateur_id INT NOT NULL,

);

CREATE TABLE actualite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    administrateur_id INT NOT NULL,

);

CREATE TABLE document (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    administrateur_id INT NOT NULL,

);

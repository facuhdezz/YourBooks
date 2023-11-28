Código de base de datos:

CREATE DATABASE actividad20;

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(30) NOT NULL
)
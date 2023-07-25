# Bienvenue dans la partie API de Colis&Co

## Stack technique

* NodeJS
* PostgreSQL
* Sqitch
* Git

## Installation

Ouvrez un terminal à la racine du projet

Se rendre dans le dossier back
```
$ cd back 
```

Installez les dépendances NPM
```
$ npm install
```

Créer un user et une base de données PostgreSQL 
```
$ sudo -i -u postgres psql
$ CREATE USER nomDuLutilisateur WITH PASSWORD 'motDePasse';
$ CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;
```

Deployer avec sqitch
```
$ sqitch deploy
```
:triangular_flag_on_post: Fournir les données nécessaires dans le sqitch.conf pour que les commandes sqitch puissent s'éxécuter correctement

## Insertion des données

Lancer la commande :
```
$ node data/import.js
```

## Lancement

```
$ npm run start
```






# API de gestion de livres

**Description**

API REST de démonstration pour gérer des bibliothèques et des livres. Elle inclut :
- authentification par JWT,
- documentation Swagger (OpenAPI),
- persistance via SQLite (Sequelize),
- tests unitaires avec Jest.

---

## Aperçu des fonctionnalités

- Gestion des utilisateurs (inscription / connexion)
- CRUD des bibliothèques
- CRUD des livres
- Protection des routes via JWT (rôle admin requis pour certaines opérations)
- Documentation interactive : `/api-docs`

---

## Prérequis

- Node.js (recommandé >= 16)
- npm

---

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/canunal-1/Api-de-Gestion-de-Livres.git
cd LIBRARY-MAIN
```

2. Installer les dépendances :

```bash
npm install
```

---

## Démarrage

- Lancer le serveur :

```bash
npm start
```

- Le serveur écoute par défaut sur : `http://localhost:3000`
- Documentation Swagger (interactif) :

`http://localhost:3000/api-docs`

---

## Endpoints principaux & exemples (cURL)

1) Inscription

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"motdepasse"}'
```

2) Connexion (obtenir un token)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"motdepasse"}'
```

Réponse attendue : un JWT (string). Utilisez-le pour les routes protégées.

3) Lister les livres (publique) :

```bash
curl http://localhost:3000/api/books
```

4) Créer un livre (protection JWT) :

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <VOTRE_TOKEN>" \
  -d '{"title":"Titre","author":"Auteur","libraryId":1}'
```

(Remarque : la doc Swagger contient les schémas des requêtes/réponses pour chaque route.)

---

## Base de données

- SQLite est utilisé via Sequelize.
- Fichier par défaut : `./database.sqlite` (configuré dans `config/database.js`).
- La DB est synchronisée automatiquement au démarrage (`sequelize.sync()`).

---

## Tests

- Lancer les tests unitaires :

```bash
npm test
```

- Les tests sont dans le dossier `tests/`.

---

## Structure du projet

- `server.js` — Point d'entrée
- `routes/` — Routes Express
- `controllers/` — Logique des routes
- `services/` — Logique métier
- `models/` — Modèles Sequelize
- `config/` — Configuration (DB, Swagger)
- `middlewares/` — Middlewares (auth, etc.)
- `tests/` — Tests unitaires
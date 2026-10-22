# Frontend - Application Tamagotchi

Projet realise dans le cadre du TP Note DevOps AP4 2026.
Groupe 6 : Six Theo, Delelys Florian, Cappoen Louis.

Application web en Angular 22 servie par un serveur Nginx qui fait aussi office de reverse-proxy vers l'API backend pour les routes `/api/*`.

URL en production : https://tpfinal.tp-devops-6.online

## Architecture

- Frontend : Angular 22
- Serveur web : Nginx (Alpine)
- Reverse proxy : Redirection automatique des requetes `/api/` vers le backend Spring Boot via la variable `BACKEND_URL`.

## Lancer en local avec Docker Compose

Pour lancer l'application en local (build le frontend et telecharge les images du backend et de la base de donnees depuis le registre) :

```bash
docker compose up -d
```

L'application sera accessible sur http://localhost:4200.

Pour arreter les conteneurs :

```bash
docker compose down
```

## Lancer le conteneur seul

```bash
docker build -t frontend-tamagotchi .
docker run -d -p 4200:80 -e BACKEND_URL=http://localhost:8080 frontend-tamagotchi
```

## Variables d'environnement

- `PORT` : Port d'ecoute Nginx (par defaut : 80).
- `BACKEND_URL` : URL du backend (par defaut : http://backend:8080).

## Pipeline CI/CD (GitHub Actions)

A chaque push sur `main` et `develop`, le pipeline execute :

1. Verification du format du code avec Prettier.
2. Build du projet Angular.
3. Verification du Dockerfile avec Hadolint.
4. Scan de securite des dependances avec Trivy.
5. Construction et publication de l'image Docker sur GitHub Container Registry (ghcr.io).
6. Declenchement du webhook de deploiement automatique sur Coolify.

## Liens des depots du projet

- Frontend : https://github.com/SkyWishky/cappoensixdellelys-front
- Backend : https://github.com/SkyWishky/cappoensixdellelys-back
- Database et Infra : https://github.com/SkyWishky/cappoensixdellelys-database

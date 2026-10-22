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

Copiez `.env.example` vers `.env`, remplacez `POSTGRES_PASSWORD` par un secret local, puis lancez toute la stack :

```bash
cp .env.example .env
docker compose up -d
```

L'application est disponible sur [http://localhost:4200](http://localhost:4200). Pour arrêter les conteneurs sans supprimer les données :

```bash
docker compose down
```

## Pipeline CI/CD

Le workflow `.github/workflows/ci-cd.yml` vérifie le formatage, compile Angular, audite le Dockerfile avec Hadolint, analyse les vulnérabilités avec Trivy et publie l'image sur GHCR. `main` publie `latest` et déclenche le webhook Coolify; `develop` publie `dev-latest` sans déployer la production.

## Gitflow

Consultez [GITFLOW.md](GITFLOW.md). La protection des branches GitHub doit être configurée par un administrateur.

## Exécution manuelle du conteneur

Pour joindre un backend disponible sur l'hôte au port 8080 :

```bash
docker build -t cappoensixdellelys-front .
docker run -d --name tamagotchi-front \
  -p 127.0.0.1:4200:8080 \
  --add-host=host.docker.internal:host-gateway \
  -e BACKEND_URL=http://host.docker.internal:8080 \
  cappoensixdellelys-front
```

Le conteneur écoute sur `PORT=8080`. Dans la stack Compose, `BACKEND_URL` pointe vers `http://back:8080`.

## Dépôts du projet

- Frontend : https://github.com/SkyWishky/cappoensixdellelys-front
- Backend : https://github.com/SkyWishky/cappoensixdellelys-back
- Base de données et infrastructure : https://github.com/SkyWishky/cappoensixdellelys-database

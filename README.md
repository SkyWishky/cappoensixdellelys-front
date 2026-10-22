# 🌐 Frontend Service - Tamagotchi Web App

[![CI/CD Pipeline](https://github.com/SkyWishky/cappoensixdellelys-front/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/SkyWishky/cappoensixdellelys-front/actions/workflows/ci-cd.yml)
[![Docker Image](https://img.shields.io/badge/Docker-GHCR-blue?logo=docker)](https://github.com/SkyWishky/cappoensixdellelys-front/pkgs/container/cappoensixdellelys-front)
[![Branching](https://img.shields.io/badge/Git-Gitflow-orange?logo=git)](GITFLOW.md)
[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular)](https://angular.dev)
[![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?logo=nginx)](https://nginx.org)

Application frontend moderne développée sous **Angular 22** pour le jeu Tamagotchi, déployée via **Nginx reverse proxy** avec injection dynamique des variables d'environnement (`envsubst`).

Projet réalisé dans le cadre du **TP Noté DevOps AP4 (2026)** - **Groupe 6 : Cappoen / Six / Dellelys**.

---

## 🏗️ Architecture & Fonctionnalités

- **Framework** : Angular 22 (Standalone components, TypeScript, RxJS).
- **Reverse Proxy & Serveur Web** : Nginx Alpine haute performance.
- **Dynamic Configuration** : Injection de l'URL du backend via `envsubst` dans le template Nginx (`/etc/nginx/templates/default.conf.template`) lors du démarrage du conteneur.
  - Proxy transparent : toutes les requêtes frontend vers `/api/*` sont automatiquement redirigées vers `BACKEND_URL` (ex: `http://back:8080`).
  - Support SPA : fallback Nginx sur `index.html` pour le routing côté client.
- **Sécurité & Performance** :
  - Multi-stage build Docker (étape 1 : compilation Node 22 Alpine, étape 2 : runtime ultra-léger Nginx Alpine).
  - Cache statique activé pour les assets (`/media/`, JS, CSS).

---

## 🚀 Pipeline CI/CD (GitHub Actions)

Workflow automatisé défini dans `.github/workflows/ci-cd.yml` :

1. **Format & Code Quality** : Vérification du style avec Prettier (`npx prettier --check .`).
2. **Build de Production** : Validation de la compilation Angular (`npm run build`).
3. **Linter Docker** : Audit des bonnes pratiques du `Dockerfile` avec Hadolint.
4. **Audit de Sécurité Trivy** : Scan de vulnérabilités CVE (`aquasecurity/trivy-action`).
5. **Build & Push GHCR** : Publication des images Docker sur GitHub Container Registry :
   - `ghcr.io/skywishky/cappoensixdellelys-front:latest` (branche `main`)
   - `ghcr.io/skywishky/cappoensixdellelys-front:dev-latest` (branche `develop`)
   - `ghcr.io/skywishky/cappoensixdellelys-front:vX.Y.Z` (tags de version)
6. **Continuous Deployment** : Déclenchement automatique par webhook Coolify pour rafraîchissement sans coupure.

---

## 🌿 Stratégie Gitflow

Consultez le document dédié : **[GITFLOW.md](GITFLOW.md)**.

- **`main`** : Branche de production, protégée, reflète l'état déployé en production.
- **`develop`** : Branche d'intégration continue, reçoit les pull requests des branches fonctionnelles.
- **`feature/*`** : Branches de travail pour les nouvelles fonctionnalités.
- **`hotfix/*`** : Branches de correctifs urgents directement issues de `main`.

---

## 🐳 Utilisation Locale (Docker)

### Variables d'environnement requises

| Variable      | Description                        | Valeur par défaut  |
| ------------- | ---------------------------------- | ------------------ |
| `PORT`        | Port d'écoute du serveur Nginx     | `80`               |
| `BACKEND_URL` | URL du service backend Spring Boot | `http://back:8080` |

### Build et exécution manuelle

```bash
# Build de l'image Docker
docker build -t cappoensixdellelys-front .

# Lancement du conteneur
docker run -d \
  --name tamagotchi-front \
  -p 4200:80 \
  -e BACKEND_URL=http://localhost:8080 \
  cappoensixdellelys-front
```

L'application est alors accessible sur [http://localhost:4200](http://localhost:4200).

---

## 📦 Dépôts du Projet

- 🌐 **Frontend** : [https://github.com/SkyWishky/cappoensixdellelys-front](https://github.com/SkyWishky/cappoensixdellelys-front)
- ☕ **Backend** : [https://github.com/SkyWishky/cappoensixdellelys-back](https://github.com/SkyWishky/cappoensixdellelys-back)
- 🗄️ **Database & Infra** : [https://github.com/SkyWishky/cappoensixdellelys-database](https://github.com/SkyWishky/cappoensixdellelys-database)
- 🌍 **Déploiement Production Coolify** : [https://tpfinal.tp-devops-6.online](https://tpfinal.tp-devops-6.online)

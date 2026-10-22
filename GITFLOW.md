# 🌿 Stratégie de Branches Gitflow

Ce dépôt respecte la méthodologie standard **Gitflow** pour assurer un cycle de livraison fiable, traçable et sécurisé.

---

## 📌 Architecture des Branches

```text
  main ──────●────────────────────────● (v1.0.0 / Production)
             ▲                        ▲
             │                        │ Merge release
  release ───┼──────────●─────────────┘
             │          ▲
             │          │ Cut release
  develop ───●──●───────●──●──────────► (CI ; publication dev-latest, sans déploiement)
                ▲       ▲  ▲
     feature ───┘       │  │
                        └──┘
```

### 1. Branches Principales (Long-lived)

| Branche       | Rôle                      | Environnement de déploiement                                   | Protection                                    |
| ------------- | ------------------------- | -------------------------------------------------------------- | --------------------------------------------- |
| **`main`**    | Code stable de production | Coolify Production (`https://tpfinal.tp-devops-6.online`)      | Protection à configurer par un administrateur |
| **`develop`** | Intégration continue      | CI et publication `dev-latest` ; aucun déploiement automatique | Protection à configurer par un administrateur |

### 2. Branches Temporaires (Short-lived)

- **`feature/<nom-fonctionnalite>`** :
  - Créée depuis : `develop`
  - Mergée dans : `develop`
  - Exemple : `feature/tamagotchi-animations`, `feature/health-dashboard`
- **`release/vX.Y.Z`** :
  - Créée depuis : `develop`
  - Mergée dans : `main` ET `develop`
  - Taggée sur `main` avec le tag de version semver `vX.Y.Z`.
- **`hotfix/<nom-correctif>`** :
  - Créée depuis : `main`
  - Mergée dans : `main` ET `develop`
  - Permet de corriger un incident critique en production sans attendre le cycle de livraison courant.

---

## 📝 Convention de Commits (Conventional Commits)

Les commits suivent le standard international :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction d'un bug
- `ci:` Modifications relatives au pipeline CI/CD
- `docs:` Mises à jour de documentation
- `refactor:` Amélioration du code sans changement de comportement
- `test:` Ajout ou correction de tests
- `chore:` Tâches de maintenance (dépendances, configuration)

---

## 🛡️ Règles de Validation CI/CD

Avant tout merge sur `develop` ou `main`, le pipeline GitHub Actions valide obligatoirement :

1. ✅ Vérification de formatage et linting.
2. ✅ Compilation sans warning ni erreur.
3. ✅ Hadolint sur les Dockerfiles.
4. ✅ Scan de vulnérabilités Trivy.

Le workflow déclenche Coolify uniquement après un push sur `main`. Les protections GitHub des branches n’étaient pas configurées/vérifiables lors de cet audit ; leur activation nécessite un compte administrateur.

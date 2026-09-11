# Documentation Docker Compose

Ce document explique le déploiement et l'orchestration de l'API via Docker Compose.

## Configuration du service (`compose.yml`)
Le fichier `compose.yml` automatise la création et le lancement du conteneur avec la configuration suivante :
- **Service** : `api`
- **Build** : Utilise le `Dockerfile` situé à la racine du projet.
- **Variables d'environnement** : `PORT=3000` et `NODE_ENV=production`.
- **Ports** : Redirection du port hôte `3000` vers le port conteneur `3000`.
- **Healthcheck** : Contrôle automatique de la route `/health` toutes les 30 secondes.

## Commandes utiles

### 1. Démarrer l'application (build + détachement)
```bash
docker compose up -d --build
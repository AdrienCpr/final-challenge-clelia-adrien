# Documentation Docker

Ce document décrit la configuration et l'utilisation du conteneur Docker pour l'API Node.js.

## Image et Sécurité
- **Base image** : `node:22-alpine` (légère et sécurisée).
- **Multi-stage build** : Isolation des dépendances de build pour ne conserver que les dépendances de production (`npm ci --only=production`) dans l'image finale.
- **Sécurité** : Exécution de l'application sous l'utilisateur non-root par défaut (`USER node`).
- **Healthcheck** : Vérification automatique de l'état du service via l'endpoint `/health`.

## Commandes utiles

### 1. Reconstruire l'image Docker
```bash
docker build -t task-api .
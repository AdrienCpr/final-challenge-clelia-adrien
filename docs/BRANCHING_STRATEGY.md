## Branching Strategy & Workflow

Notre équipe suit une stratégie de branches basée sur des branches éphémères (feature branching) :

- `main` : Branche principale de production. Aucun commit direct n'est autorisé.
- `feature/<nom>` : Utilisée pour toute nouvelle fonctionnalité (ex: `feature/filter-status`).
- `fix/<nom>` : Utilisée pour corriger un bug identifié (ex: `fix/empty-task-body`).
- `chore/<nom>` : Utilisée pour la configuration, les dépendances, la CI/CD ou la maintenance (ex: `chore/ci-pipeline`).

### Convention des commits
Les commits doivent être explicites et respecter le format Conventionnal Commits :
- `feat: <description>` (nouvelle fonctionnalité)
- `fix: <description>` (correction de bug)
- `test: <description>` (ajout ou mise à jour de tests)
- `chore: <description>` (maintenance technique)
- `docs: <description>` (documentation)

Exemples :
- ✅ `feat: add task filtering by status`
- ✅ `test: add regression test for invalid status`
- ❌ `update`, `fix`, `test`, `final`
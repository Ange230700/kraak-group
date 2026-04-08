# KRAAK Group

Depot de cadrage et d'implementation du MVP web KRAAK.

## Branching Strategy

Strategie MVP simple:

- `main` reste stable et livrable.
- branches courtes: `feat/*`, `fix/*`, `docs/*`, `chore/*`.
- merge rapide apres validation.

## Branch Naming Convention

Format conseille: `<type>/<scope-court>-<action>`

Types recommandes:

- `feat/` pour nouvelle fonctionnalite
- `fix/` pour correction de bug
- `docs/` pour documentation
- `chore/` pour maintenance
- `test/` pour ajout ou correction de tests
- `refactor/` pour refactor sans changement fonctionnel

Exemples:

- `feat/contact-form-validation`
- `fix/mobile-menu-overlap`
- `docs/update-backlog-structure`

## Commit Message Convention (Conventional Commits)

Format: `<type>(<scope>): <resume court>`

Types usuels:

- `feat`: nouvelle fonctionnalite
- `fix`: correction de bug
- `docs`: documentation uniquement
- `chore`: maintenance/outillage
- `test`: ajout/mise a jour des tests
- `refactor`: refactor sans changement fonctionnel
- `ci`: pipeline CI/CD

Regles legeres:

- Utiliser l'imperatif present (ex: `add`, `update`, `fix`).
- Garder un resume court et clair.
- Referencer l'issue dans le corps si pertinent (`Refs #12`, `Closes #34`).

Exemples:

- `feat(forms): add contact request endpoint`
- `fix(ui): correct mobile navbar overflow`
- `docs(backlog): clarify milestone definitions`

## Task Checklist

A utiliser pour chaque tache:

- [ ] Issue creee et scope clair
- [ ] Branche courte creee depuis `main`
- [ ] Implementation minimale viable
- [ ] Tests executes (RED -> GREEN -> REFACTOR si code)
- [ ] Documentation/contrats mis a jour si impactes
- [ ] Pull request ouverte avec preuves de validation
- [ ] Revue terminee et merge vers `main`
- [ ] Issue et item projet passes a Done

## Standards

- Templates d'issues: `.github/ISSUE_TEMPLATE/`
- Template de PR: `.github/pull_request_template.md`
- Propriete code: `.github/CODEOWNERS`
- Variables d'environnement: `docs/runbooks/ENVIRONMENT_VARIABLES.md`

# KRAAK Group

Depot de cadrage et d'implementation du MVP web KRAAK.

## Branching Strategy

Strategie MVP simple:

- `main` reste stable et livrable.
- branches courtes: `feat/*`, `fix/*`, `docs/*`, `chore/*`.
- merge rapide apres validation.

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

- Architecture verrouillée: `ARCHITECTURE.md`
- Templates d'issues: `.github/ISSUE_TEMPLATE/`
- Template de PR: `.github/pull_request_template.md`
- Propriete code: `.github/CODEOWNERS`
- Variables d'environnement: `docs/runbooks/ENVIRONMENT_VARIABLES.md`
- Decisions d'architecture (ADR): `docs/decisions/`

# KRAAK Group

Depot de cadrage et d'implementation du MVP web KRAAK.

## Team Quick Start (2 minutes)

1. Ouvrir le board: [KRAAK MVP - Product Backlog](https://github.com/users/Ange230700/projects/6)
2. Appliquer la recette de vues: [Board-view recipe](docs/runbooks/PROJECT_SETUP_GUIDE.md)
3. Creer/choisir une issue: [Issues du repo](https://github.com/Ange230700/kraak-group/issues)
4. Travailler sur une branche courte depuis main (`feat/*`, `fix/*`, `docs/*`, `chore/*`)
5. Ouvrir une PR avec la checklist: [PR template](.github/pull_request_template.md)

### PR Process (rapide)

- Creer une branche depuis main
- Faire le plus petit increment valide
- Verifier tests et criteres d'acceptation
- Ouvrir la PR et lier l'issue (`Closes #xx`)
- Obtenir review, puis merge en `squash` ou `rebase` (pas de merge commit)

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

- Templates d'issues: `.github/ISSUE_TEMPLATE/`
- Template de PR: `.github/pull_request_template.md`
- Propriete code: `.github/CODEOWNERS`
- Variables d'environnement: `docs/runbooks/ENVIRONMENT_VARIABLES.md`

# Guide de contribution

Ce document explique comment contribuer au dépôt KRAAK Group.

---

## Branches

`main` est la seule branche permanente. Toute modification passe par une branche courte.

### Nommage

```
<type>/<sujet-court>
```

Types autorisés :

| Préfixe     | Usage                                           |
| ----------- | ----------------------------------------------- |
| `feat/`     | Nouvelle fonctionnalité                         |
| `fix/`      | Correction de bug                               |
| `docs/`     | Documentation seule                             |
| `chore/`    | Maintenance, dépendances                        |
| `test/`     | Ajout ou modification de tests                  |
| `refactor/` | Refactorisation sans changement de comportement |
| `style/`    | Formatage, espaces, points-virgules             |
| `perf/`     | Amélioration de performance                     |
| `ci/`       | CI/CD (GitHub Actions, Vercel, Render)          |
| `build/`    | Build system, scripts                           |
| `revert/`   | Annulation d'un changement                      |

**Exemples :**

```bash
git checkout -b feat/contact-form
git checkout -b fix/api-cors-error
git checkout -b docs/update-readme
```

> Le hook `pre-push` vérifie automatiquement le nommage de la branche. Un nom invalide bloque le push.

---

## Commits (Conventional Commits)

Chaque message de commit suit le format [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>(<scope>): <description courte>
```

**Exemples :**

```
feat(web): ajouter la page d'accueil
fix(api): corriger le CORS pour /contact
docs(docs): mettre à jour le README
chore(repo): mettre à jour les dépendances pnpm
test(api): ajouter un test pour le service contact
```

> Le hook `commit-msg` valide automatiquement le format via **commitlint**. Un commit mal formaté sera rejeté.

### Types de commit

Ce sont les mêmes que les préfixes de branche : `feat`, `fix`, `docs`, `chore`, `test`, `refactor`, `style`, `perf`, `ci`, `build`, `revert`.

### Scope (obligatoire)

Indique la partie du projet concernée. Scopes autorisés :
`root`, `repo`, `workspace`, `config`, `docs`, `scripts`, `web`, `mobile`,
`api`, `client`, `contracts`, `domain`, `api-client`, `tokens`, `infra`, `ci`.

### Prompt interactif avec Commitizen

Pour créer un commit avec un assistant interactif, utiliser :

```bash
pnpm commit
```

Le prompt propose les types et scopes autorisés, puis génère un message compatible
avec `commitlint`.

---

## Règle Documentation

Toute modification du codebase qui rend un document inexact, incomplet ou
ambigu impose une mise à jour de la documentation dans le même changement.

Cela couvre notamment :

- les chemins et la structure du dépôt
- les scripts et commandes de travail
- les variables d'environnement
- les comportements visibles et contrats techniques
- les conventions Git, de test ou de déploiement

Ne pas remettre une mise à jour documentaire nécessaire à plus tard.

---

## Workflow Git complet

```
1. git checkout main && git pull origin main
2. git checkout -b feat/ma-feature
3. # implémenter + tester
4. git add .
5. pnpm commit
6. git push -u origin feat/ma-feature
7. # ouvrir une Pull Request sur GitHub
8. # review + merge dans main
9. # supprimer la branche locale et distante
```

---

## Hooks Git (Husky)

Des vérifications automatiques s'exécutent à chaque étape :

| Moment       | Vérification                                                              | Effet si échec |
| ------------ | ------------------------------------------------------------------------- | -------------- |
| `commit-msg` | Format Conventional Commits (commitlint)                                  | Commit rejeté  |
| `pre-commit` | `pnpm format:check` + `pnpm lint`                                         | Commit rejeté  |
| `pre-push`   | Nom de branche valide + `pnpm typecheck` + `pnpm test:api` + tests client | Push rejeté    |

### Si un hook échoue

- **Formatage** : exécuter `pnpm format` puis réessayer
- **Lint** : corriger les erreurs signalées par ESLint
- **Typecheck** : corriger les erreurs TypeScript signalées par `pnpm typecheck`
- **Nom de branche** : renommer avec `git branch -m <nouveau-nom>`
- **Message de commit** : relancer `pnpm commit` et choisir un scope autorisé
- **Tests** : corriger les tests cassés avant de pousser

---

## Pull Requests

- Ouvrir la PR vers `main`
- Remplir le template de PR (description, tests, captures d'écran si UI)
- Attendre la review avant de fusionner
- Après fusion, supprimer la branche locale et distante :

```bash
git checkout main
git pull origin main
git branch -d feat/ma-feature
git push origin --delete feat/ma-feature
```

---

## Formatage du code

Le projet utilise **Prettier** pour le formatage automatique.

```bash
# Formater tous les fichiers
pnpm format

# Vérifier le formatage (sans modifier)
pnpm format:check
```

> Le hook `pre-commit` vérifie automatiquement le formatage. Exécuter `pnpm format` avant de commiter évite les surprises.

---

## Politique de langue

- **Code** (variables, fonctions, types, noms de fichiers) : **anglais**
- **Documentation, commentaires, textes UI, messages** : **français**

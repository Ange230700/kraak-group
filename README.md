# KRAAK Group

Monorepo du MVP KRAAK — site web, application mobile et API backend.

---

## Quickstart (5 minutes)

### Prérequis

| Outil       | Version minimale | Installation                                                  |
| ----------- | ---------------- | ------------------------------------------------------------- |
| **Node.js** | 24.14+           | [nodejs.org](https://nodejs.org/)                             |
| **pnpm**    | 10.0+            | `corepack enable && corepack prepare pnpm@10.23.0 --activate` |
| **Git**     | 2.x              | [git-scm.com](https://git-scm.com/)                           |

> **Astuce** : `corepack` est inclus avec Node 24. Pas besoin d'installer `pnpm` séparément.

### Cloner et installer

```bash
git clone https://github.com/Ange230700/kraak-group.git
cd kraak-group
pnpm install
```

### Configurer les variables d'environnement

```bash
# Copier l'exemple à la racine
cp .env.example .env
```

Remplir les valeurs manquantes — voir [`docs/runbooks/ENVIRONMENT_VARIABLES.md`](docs/runbooks/ENVIRONMENT_VARIABLES.md).

### Lancer en mode développement

```bash
# Toutes les apps en une seule commande
pnpm dev

# Site web (Angular SSR — http://localhost:4200)
pnpm dev:web

# API backend (NestJS — http://localhost:3000)
pnpm dev:api

# Application mobile (Ionic Angular — http://localhost:4300)
pnpm dev:mobile
```

> `pnpm dev` choisit automatiquement le prochain port libre pour le web et le mobile si `4200` ou `4300` sont déjà occupés. L'API reste attendue sur `3000`.

---

## Structure du monorepo

```
kraak-group/
├── apps/
│   ├── api/           # Backend NestJS (port 3000)
│   └── client/        # Workspace Angular
│       └── projects/
│           ├── web/   # Site web (PrimeNG + Tailwind)
│           └── mobile/# App mobile (Ionic + Capacitor)
├── docs/
│   ├── context/       # Briefs produit, guides de style, brouillons
│   ├── runbooks/      # Guides opérationnels (env, GitHub Project…)
│   └── specs/         # Spécifications produit et backlog
├── scripts/           # Scripts utilitaires
├── AGENTS.md          # Règles pour les assistants IA
├── ARCHITECTURE.md    # Décisions d'architecture validées
└── CONTRIBUTING.md    # Guide de contribution (branches, commits, PR)
```

---

## Stack technique (résumé)

| Couche                 | Technologie                              |
| ---------------------- | ---------------------------------------- |
| Frontend web           | Angular 21 + PrimeNG 21 + Tailwind CSS 4 |
| Frontend mobile        | Ionic Angular 8 + Capacitor 7            |
| Backend                | NestJS 11                                |
| Base de données / Auth | Supabase (PostgreSQL, Auth, Storage)     |
| Déploiement web        | Vercel                                   |
| Déploiement API        | Render (Docker)                          |

Pour les détails, voir [`ARCHITECTURE.md`](ARCHITECTURE.md).

---

## Scripts disponibles

| Commande            | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `pnpm dev`          | Lancer web, mobile et API avec ports auto pour web/mobile |
| `pnpm build`        | Builder tous les projets buildables                       |
| `pnpm test`         | Lancer tous les tests disponibles                         |
| `pnpm dev:web`      | Lancer le site web en dev (port 4200 par défaut)          |
| `pnpm dev:api`      | Lancer l'API en dev (port 3000)                           |
| `pnpm dev:mobile`   | Lancer l'app mobile en dev (port 4300)                    |
| `pnpm build:web`    | Builder le site web                                       |
| `pnpm build:api`    | Builder l'API                                             |
| `pnpm build:mobile` | Builder l'app mobile                                      |
| `pnpm test:api`     | Tests unitaires API                                       |
| `pnpm typecheck`    | Vérifier le typage web, mobile et API                     |
| `pnpm test:unit`    | Tests unitaires client                                    |
| `pnpm test:e2e`     | Tests E2E (Playwright)                                    |
| `pnpm lint`         | Linter tous les projets                                   |
| `pnpm format`       | Formater le code (Prettier)                               |
| `pnpm format:check` | Vérifier le formatage                                     |
| `pnpm commit`       | Ouvrir le prompt interactif Commitizen                    |

---

## Contribuer

Voir [`CONTRIBUTING.md`](CONTRIBUTING.md) pour le workflow complet (branches, commits, PR, hooks).

**Résumé rapide :**

1. Créer une branche depuis `main` : `git checkout -b feat/ma-feature`
2. Implémenter + tester
3. Commiter avec un message [Conventional Commits](https://www.conventionalcommits.org/) via `pnpm commit` ou en respectant le format `feat(web): ajouter le formulaire de contact`
4. Pousser et ouvrir une PR

Règle documentaire : toute évolution du codebase qui rend la documentation
inexacte doit inclure la mise à jour des fichiers `.md` concernés dans le même
changement.

---

## Documentation complémentaire

| Document                                                                           | Contenu                                         |
| ---------------------------------------------------------------------------------- | ----------------------------------------------- |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                                               | Workflow Git, conventions de commits, hooks, PR |
| [`ARCHITECTURE.md`](ARCHITECTURE.md)                                               | Décisions d'architecture validées               |
| [`AGENTS.md`](AGENTS.md)                                                           | Règles de fonctionnement pour les assistants IA |
| [`docs/runbooks/ENVIRONMENT_VARIABLES.md`](docs/runbooks/ENVIRONMENT_VARIABLES.md) | Variables d'environnement                       |
| [`docs/runbooks/DEV_MODE.md`](docs/runbooks/DEV_MODE.md)                           | Guide détaillé du mode développement            |
| [`docs/runbooks/TECH_OVERVIEW.md`](docs/runbooks/TECH_OVERVIEW.md)                 | Vue d'ensemble de la stack pour débutants       |
| [`docs/runbooks/GITHUB_PROJECT_BOARD.md`](docs/runbooks/GITHUB_PROJECT_BOARD.md)   | Pilotage du board GitHub Project                |

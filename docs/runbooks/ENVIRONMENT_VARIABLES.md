# Variables d'environnement

Ce document décrit les variables d'environnement du MVP et leur emplacement
dans le monorepo. Ne jamais commiter de secrets dans le depot.

## Organisation des fichiers

| Fichier                         | Contenu                                                |
| ------------------------------- | ------------------------------------------------------ |
| `apps/api/.env.example`         | Variables backend local (copier vers `.env`)           |
| `apps/api/.env.staging.example` | Variables backend staging (copier vers `.env.staging`) |
| `apps/client/.env.example`      | Variables client / scripts / E2E (copier vers `.env`)  |
| `.env.example` (racine)         | Variables CI/CD uniquement                             |

> Le client Angular n'utilise **pas** de `.env` a l'execution. Les URLs et clés
> publiques sont gérées via les fichiers `environment.ts` dans
> `apps/client/projects/web/src/environments/` et remplaces a la compilation
> par `angular.json` (`fileReplacements`).

## Backend — `apps/api/`

Variables lues par `process.env` dans le code NestJS :

| Variable               | Description                        | Exemple local             |
| ---------------------- | ---------------------------------- | ------------------------- |
| `NODE_ENV`             | Environnement d'execution          | `development`             |
| `PORT`                 | Port D’écoute de l'API             | `3000`                    |
| `SUPABASE_URL`         | URL du projet Supabase             | `https://xxx.supabase.co` |
| `SUPABASE_SECRET_KEY`  | Cle service role (secret)          | —                         |
| `RESEND_API_KEY`       | Cle API Resend (secret)            | —                         |
| `CONTACT_TO_EMAIL`     | Email destinataire des formulaires | `contact@kraak.org`       |
| `CORS_ALLOWED_ORIGINS` | Origines autorisées (virgule)      | `http://localhost:4200`   |

En staging, les mêmes variables s'appliquent avec des valeurs différentes
(voir `apps/api/.env.staging.example`).

Ordre de chargement côté API :

1. `.env.${NODE_ENV}` quand ce fichier existe
2. `.env`

Exemples de scripts côté `apps/api/package.json` :

- `pnpm start:dev` charge le mode de développement local
- `pnpm start:staging` lance NestJS avec `NODE_ENV=staging`
- `pnpm start:prod` s'appuie sur les variables injectées par l'hébergeur

## Client — `apps/client/`

| Variable         | Description                                    | Exemple |
| ---------------- | ---------------------------------------------- | ------- |
| `KRAAK_WEB_PORT` | Port du serveur de dev Angular (scripts / E2E) | `4200`  |

Les URLs publiques (site, API, GA4) sont définies dans les fichiers
`environment.ts` / `environment.staging.ts` / `environment.production.ts`
sous `apps/client/projects/web/src/environments/` pour le site web et
`apps/client/projects/mobile/src/environments/` pour le shell mobile.

Configurations Angular disponibles :

- `web:build:staging` remplace `environment.ts` par
  `projects/web/src/environments/environment.staging.ts`
- `mobile:build:staging` remplace `environment.ts` par
  `projects/mobile/src/environments/environment.staging.ts`

Usage SEO technique :

- `PUBLIC_SITE_URL` alimente les URLs canoniques prerender, `robots.txt` et
  `sitemap.xml` du projet `apps/client/projects/web`.
- En l'absence de surcharge explicite, la valeur de repli actuellement retenue
  dans le code est `https://kraak-group.vercel.app`.

## Domaines publics documentes

- Domaine Vercel actuellement aligné sur le dépôt : `https://kraak-group.vercel.app`
- Tant qu'aucun domaine custom n'est branché, garder les URLs alignées sur
  cette adresse pour les environnements web publics hébergés sur Vercel.

## CI/CD — `.env.example` (racine)

| Variable            | Description                     |
| ------------------- | ------------------------------- |
| `VERCEL_TOKEN`      | Token d'authentification Vercel |
| `VERCEL_ORG_ID`     | ID organisation Vercel          |
| `VERCEL_PROJECT_ID` | ID projet Vercel                |
| `RENDER_API_KEY`    | Clé API Render                  |

Ces variables sont injectées via GitHub Secrets et ne sont pas nécessaires
en développement local.

## Déploiement — Render (`render.yaml`)

Le fichier `render.yaml` déclare les variables d'environnement de production
pour l'API : `NODE_ENV`, `PORT`, `SUPABASE_URL`, `SUPABASE_SECRET_KEY`,
`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CORS_ALLOWED_ORIGINS`.

## Convention de gestion

- Utiliser les fichiers `.env.example` sans valeurs sensibles.
- Mettre à jour ce document à chaque ajout, suppression ou renommage de variable.
- Injecter les secrets via GitHub Secrets ou variables d'environnement de l'hébergeur.
- Rotation immédiate en cas de fuite.

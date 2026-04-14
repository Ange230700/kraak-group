# Variables d'environnement

Ce document décrit les variables d'environnement du MVP et leur emplacement
dans le monorepo. Ne jamais commiter de secrets dans le dépôt.

## Organisation des fichiers

| Fichier                         | Contenu                                             |
| ------------------------------- | --------------------------------------------------- |
| `apps/api/.env.example`         | Modèle backend local (copier vers `.env.local`)     |
| `apps/api/.env.local`           | Variables backend local effectivement lues          |
| `apps/api/.env.staging.example` | Modèle backend staging (copier vers `.env.staging`) |
| `apps/api/.env.staging`         | Variables backend staging effectivement lues        |
| `apps/client/.env.example`      | Modèle client local / staging                       |
| `apps/client/.env.local`        | Runtime-config client local + scripts / E2E         |
| `apps/client/.env.staging`      | Runtime-config client staging                       |
| `supabase/.env.local`           | Références Supabase locales                         |
| `supabase/.env.staging`         | Références Supabase staging                         |
| `.env.example` (racine)         | Variables CI/CD uniquement                          |

> Le client Angular n'utilise pas de `.env` à l'exécution. Les URLs et clés
> publiques sont définies explicitement dans
> `environment.local.ts`, `environment.staging.ts` et
> `environment.production.ts`, puis remplacées à la compilation via
> `angular.json`.

## Backend — `apps/api/`

Variables lues par `process.env` dans le code NestJS :

| Variable               | Description                        | Exemple local                                 |
| ---------------------- | ---------------------------------- | --------------------------------------------- |
| `NODE_ENV`             | Environnement d'exécution          | `local`                                       |
| `PORT`                 | Port d'écoute de l'API             | `3000`                                        |
| `SUPABASE_URL`         | URL du projet Supabase             | `http://127.0.0.1:54321`                      |
| `SUPABASE_SECRET_KEY`  | Clé service role (secret)          | —                                             |
| `RESEND_API_KEY`       | Clé API Resend (secret)            | —                                             |
| `CONTACT_TO_EMAIL`     | Email destinataire des formulaires | `contact@kraak.org`                           |
| `CORS_ALLOWED_ORIGINS` | Origines autorisées (virgule)      | `http://localhost:4200,http://localhost:4300` |

Ordre de chargement côté API :

1. `.env.local` si `NODE_ENV=local`
2. `.env.${NODE_ENV}` pour les autres environnements (`staging`, `production`, ...)
3. `.env` comme fallback legacy

Scripts utiles côté `apps/api/package.json` :

- `pnpm start:local` charge explicitement `.env.local`
- `pnpm start:dev` reste un alias vers `start:local`
- `pnpm start:staging` lance NestJS avec `NODE_ENV=staging`
- `pnpm start:prod` s'appuie sur les variables injectées par l'hébergeur

Alias utiles à la racine :

- `pnpm dev:api` pointe vers l'environnement `local`
- `pnpm dev:api:staging` pointe vers l'environnement `staging`

## Client — `apps/client/`

Variables utilisées par le runtime-config et les scripts :

| Variable                   | Description                                   | Exemple local            |
| -------------------------- | --------------------------------------------- | ------------------------ |
| `CLIENT_API_BASE_URL`      | URL publique de l'API consommée par le client | `http://localhost:3000`  |
| `SUPABASE_URL`             | URL publique du projet Supabase côté client   | `http://127.0.0.1:54321` |
| `SUPABASE_PUBLISHABLE_KEY` | Clé publique Supabase côté client             | —                        |
| `KRAAK_WEB_PORT`           | Port du serveur Angular pour scripts / E2E    | `4200`                   |

Les environnements Angular sont définis dans :

- `apps/client/projects/web/src/environments/environment.local.ts`
- `apps/client/projects/web/src/environments/environment.staging.ts`
- `apps/client/projects/mobile/src/environments/environment.local.ts`
- `apps/client/projects/mobile/src/environments/environment.staging.ts`

Configurations Angular disponibles :

- `web:build:local` remplace `environment.ts` par
  `projects/web/src/environments/environment.local.ts`
- `web:build:staging` remplace `environment.ts` par
  `projects/web/src/environments/environment.staging.ts`
- `mobile:build:local` remplace `environment.ts` par
  `projects/mobile/src/environments/environment.local.ts`
- `mobile:build:staging` remplace `environment.ts` par
  `projects/mobile/src/environments/environment.staging.ts`

Scripts utiles :

- `pnpm dev:web` utilise la configuration Angular `local`
- `pnpm dev:web:staging` utilise la configuration Angular `staging`
- `pnpm dev:mobile` utilise la configuration Angular `local`
- `pnpm dev:mobile:staging` utilise la configuration Angular `staging`
- `pnpm build:web:local` et `pnpm build:mobile:local` génèrent un runtime-config local
- `pnpm build:web:staging` et `pnpm build:mobile:staging` génèrent un runtime-config staging
- `pnpm build:web` et `pnpm build:mobile` génèrent un runtime-config `production`

Variable optionnelle utile côté build :

- `PUBLIC_SITE_URL` alimente le sitemap, `robots.txt` et la valeur de repli du
  site public lors des builds web hébergés

## Supabase — `supabase/`

Les fichiers `supabase/.env.local` et `supabase/.env.staging` servent de
référence claire pour les deux environnements manipulés dans le dépôt.

Variables attendues :

| Variable                   | Description                                |
| -------------------------- | ------------------------------------------ |
| `SUPABASE_URL`             | URL du projet Supabase ciblé               |
| `SUPABASE_PUBLISHABLE_KEY` | Clé publique du projet Supabase ciblé      |
| `SUPABASE_SECRET_KEY`      | Clé serveur / service role du projet ciblé |

## Domaines publics documentés

- Domaine public principal : `https://kraak-group.vercel.app`
- Domaine staging actuel : `https://client-six-indol-58.vercel.app`
- API staging actuelle : `https://kraak-api.onrender.com`

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
- Garder `local` et `staging` comme seuls environnements de travail documentés dans les workspaces.
- Mettre à jour ce document à chaque ajout, suppression ou renommage de variable.
- Injecter les secrets via GitHub Secrets ou variables d'environnement de l'hébergeur.
- Rotation immédiate en cas de fuite.

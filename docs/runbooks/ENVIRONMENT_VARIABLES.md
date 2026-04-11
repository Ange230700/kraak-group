# Variables d'environnement

Ce document decrit les variables d'environnement du MVP et leur emplacement
dans le monorepo. Ne jamais commiter de secrets dans le depot.

## Organisation des fichiers

| Fichier                         | Contenu                                                |
| ------------------------------- | ------------------------------------------------------ |
| `apps/api/.env.example`         | Variables backend local (copier vers `.env`)           |
| `apps/api/.env.staging.example` | Variables backend staging (copier vers `.env.staging`) |
| `apps/client/.env.example`      | Variables client / scripts / E2E (copier vers `.env`)  |
| `.env.example` (racine)         | Variables CI/CD uniquement                             |

> Le client Angular n'utilise **pas** de `.env` a l'execution. Les URLs et cles
> publiques sont gerees via les fichiers `environment.ts` dans
> `apps/client/projects/web/src/environments/` et remplaces a la compilation
> par `angular.json` (`fileReplacements`).

## Backend — `apps/api/`

Variables lues par `process.env` dans le code NestJS :

| Variable                    | Description                        | Exemple local             |
| --------------------------- | ---------------------------------- | ------------------------- |
| `NODE_ENV`                  | Environnement d'execution          | `development`             |
| `PORT`                      | Port d'ecoute de l'API             | `3000`                    |
| `SUPABASE_URL`              | URL du projet Supabase             | `https://xxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Cle service role (secret)          | —                         |
| `RESEND_API_KEY`            | Cle API Resend (secret)            | —                         |
| `CONTACT_TO_EMAIL`          | Email destinataire des formulaires | `contact@kraak.org`       |
| `CORS_ALLOWED_ORIGINS`      | Origines autorisees (virgule)      | `http://localhost:4200`   |

En staging, les memes variables s'appliquent avec des valeurs differentes
(voir `apps/api/.env.staging.example`).

## Client — `apps/client/`

| Variable         | Description                                    | Exemple |
| ---------------- | ---------------------------------------------- | ------- |
| `KRAAK_WEB_PORT` | Port du serveur de dev Angular (scripts / E2E) | `4200`  |

Les URLs publiques (site, API, GA4) sont definies dans les fichiers
`environment.ts` / `environment.staging.ts` / `environment.production.ts`
sous `apps/client/projects/web/src/environments/`.

Usage SEO technique :

- `PUBLIC_SITE_URL` alimente les URLs canoniques prerender, `robots.txt` et
  `sitemap.xml` du projet `apps/client/projects/web`.
- En l'absence de surcharge explicite, la valeur de repli actuellement retenue
  dans le code est `https://kraak-group.vercel.app`.

## Domaines publics documentes

- Domaine Vercel actuellement aligne sur le depot : `https://kraak-group.vercel.app`
- Tant qu'aucun domaine custom n'est branche, garder les URLs alignees sur
  cette adresse pour les environnements web publics heberges sur Vercel.

## CI/CD — `.env.example` (racine)

| Variable            | Description                     |
| ------------------- | ------------------------------- |
| `VERCEL_TOKEN`      | Token d'authentification Vercel |
| `VERCEL_ORG_ID`     | ID organisation Vercel          |
| `VERCEL_PROJECT_ID` | ID projet Vercel                |
| `RENDER_API_KEY`    | Cle API Render                  |

Ces variables sont injectees via GitHub Secrets et ne sont pas necessaires
en developpement local.

## Deploiement — Render (`render.yaml`)

Le fichier `render.yaml` declare les variables d'environnement de production
pour l'API : `NODE_ENV`, `PORT`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CORS_ALLOWED_ORIGINS`.

## Convention de gestion

- Utiliser les fichiers `.env.example` sans valeurs sensibles.
- Mettre a jour ce document a chaque ajout, suppression ou renommage de variable.
- Injecter les secrets via GitHub Secrets ou variables d'environnement de l'hebergeur.
- Rotation immediate en cas de fuite.

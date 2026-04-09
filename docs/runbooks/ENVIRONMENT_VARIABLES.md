# Variables d'environnement

Ce document decrit les variables d'environnement du MVP.
Ne jamais commiter de secrets dans le depot.

## Frontend (apps/web)
- `PUBLIC_SITE_URL`: URL publique du site (ex: https://kraak.example)
- `PUBLIC_GA4_ID`: identifiant Google Analytics 4
- `PUBLIC_API_BASE_URL`: URL de base de l'API backend

## Backend (apps/api)
- `NODE_ENV`: `development` | `test` | `production`
- `PORT`: port d'ecoute de l'API
- `SUPABASE_URL`: URL du projet Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: cle service role (secret)
- `RESEND_API_KEY`: cle API Resend (secret)
- `CONTACT_TO_EMAIL`: email destinataire des formulaires
- `CORS_ALLOWED_ORIGINS`: origines autorisees separees par virgule

## CI/CD
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `RENDER_API_KEY`

## Convention de gestion
- Utiliser `.env.example` sans valeurs sensibles.
- Injecter les secrets via GitHub Secrets/variables d'environnement hebergeur.
- Rotation immediate en cas de fuite.

# Configuration Supabase Auth

Ce runbook décrit la configuration Auth minimale attendue pour le MVP KRAAK.

## Source de vérité locale

Les réglages Auth versionnés dans le dépôt vivent dans :

- `supabase/config.toml`
- `supabase/templates/auth/confirmation.html`
- `supabase/templates/auth/recovery.html`
- `supabase/migrations/20260414000000_auth_setup.sql`

Ce socle couvre :

- provider email/password activé
- confirmations email activées
- URLs de redirection web/mobile du MVP
- templates email locaux pour confirmation et récupération
- bootstrap automatique de `public.app_user` depuis `auth.users`

## Configuration hébergée à répliquer

Pour un projet Supabase staging ou production, répliquer au minimum dans le Dashboard :

1. Provider `Email` activé
2. Signups email autorisés
3. Confirmation email activée
4. `Site URL` alignée avec la surface web principale
5. Redirect URLs alignées avec web, mobile et deep links KRAAK

URLs minimales à autoriser :

- `https://kraak-group.vercel.app/auth/callback`
- `https://kraak-group.vercel.app/auth/reset`
- `https://client-six-indol-58.vercel.app/auth/callback`
- `https://client-six-indol-58.vercel.app/auth/reset`
- `http://localhost:4200/auth/callback`
- `http://localhost:4200/auth/reset`
- `http://localhost:4300/auth/callback`
- `http://localhost:4300/auth/reset`
- `kraak://auth/callback`
- `kraak://auth/reset`

## Validation minimale

Avant de considérer `AUT-01` comme prêt :

1. Le provider email/password est activé localement via `supabase/config.toml`
2. Un signup local crée bien une entrée `public.app_user`
3. Les templates de confirmation et de récupération utilisent un lien Supabase valide
4. Les politiques RLS de base du schéma initial restent actives
